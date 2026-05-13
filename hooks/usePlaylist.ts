"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DoublyLinkedList, Song } from "@/lib/DoublyLinkedList";

export type PlaylistNode = {
  index: number;
  title: string;
  artist: string;
  isHead: boolean;
  isTail: boolean;
  isCurrent: boolean;
};

export type PlaylistState = {
  currentSong: Song | null;
  currentIndex: number;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  songs: Song[];
  nodes: PlaylistNode[];
  canGoNext: boolean;
  canGoPrev: boolean;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  selectIndex: (index: number) => void;
  addSong: (song: Song) => void;
};

export function usePlaylist(songs: Song[]): PlaylistState {
  const [playlistSongs, setPlaylistSongs] = useState(songs);
  
  const list = useMemo(() => {
    const created = new DoublyLinkedList<Song>();
    playlistSongs.forEach((song) => created.append(song));
    return created;
  }, [playlistSongs]);

  const [currentIndex, setCurrentIndex] = useState(() => list.getCurrentIndex());
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(isPlaying);

  const nodes = list.getNodes();
  const currentSong = nodes[currentIndex]?.value ?? null;

  useEffect(() => {
    setCurrentIndex(list.getCurrentIndex());
    setIsPlaying(false);
    setDuration(0);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [list]);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!currentSong) {
      return;
    }

    const audio = audioRef.current ?? new Audio();
    audio.pause();
    audio.src = currentSong.audioFile;
    audioRef.current = audio;

    audio.load();
    audio.currentTime = 0;
    setCurrentTime(0);
    setDuration(0);

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleMetadata = () => {
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    };

    const handleEnded = () => {
      const nextNode = list.goNext();
      if (nextNode) {
        setCurrentIndex(nextNode.index);
      } else {
        setIsPlaying(false);
        audio.currentTime = 0;
        setCurrentTime(0);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("ended", handleEnded);

    if (isPlayingRef.current) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, list]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const next = useCallback(() => {
    const nextNode = list.goNext();
    if (nextNode) {
      setCurrentIndex(nextNode.index);
    }
  }, [list]);

  const prev = useCallback(() => {
    const prevNode = list.goPrev();
    if (prevNode) {
      setCurrentIndex(prevNode.index);
    }
  }, [list]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const selectIndex = useCallback(
    (index: number) => {
      const node = list.setCurrentByIndex(index);
      if (node) {
        setCurrentIndex(node.index);
      }
    },
    [list]
  );

  const addSong = useCallback(
    (song: Song) => {
      list.append(song);
      setPlaylistSongs(list.getNodes().map((node) => node.value));
    },
    [list]
  );

  const visualNodes: PlaylistNode[] = nodes.map((node, index) => ({
    index,
    title: node.value.title,
    artist: node.value.artist,
    isHead: index === 0,
    isTail: index === nodes.length - 1,
    isCurrent: index === currentIndex,
  }));

  return {
    currentSong,
    currentIndex,
    isPlaying,
    duration,
    currentTime,
    songs: playlistSongs,
    nodes: visualNodes,
    canGoNext: currentIndex < nodes.length - 1,
    canGoPrev: currentIndex > 0,
    play,
    pause,
    togglePlay,
    addSong,
    next,
    prev,
    seek,
    selectIndex,
  };
}

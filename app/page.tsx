"use client";

import LinkedListVisualizer from "@/components/LinkedListVisualizer";
import SpotifyPlayer from "@/components/SpotifyPlayer";
import { usePlaylist } from "@/hooks/usePlaylist";
import type { Song } from "@/lib/DoublyLinkedList";

const availableTemplates: Song[] = [
  {
    id: "template-01",
    title: "WAGWAN",
    artist: "Centrall Cee",
    album: "All roads lead home",
    coverImage: "/wagwan-album.png",
    audioFile: "/wagwan.mp3",
  },
  {
    id: "template-02",
    title: "BOOGA",
    artist: "Centrall Cee",
    album: "Single by Central Cee",
    coverImage: "/booga.png",
    audioFile: "/wagwan.mp3",
  },
  {
    id: "template-03",
    title: "Heartless",
    artist: "The Weeknd",
    album: "Single by The Weeknd",
    coverImage: "/heartless.png",
    audioFile: "/wagwan.mp3",
  },
  {
    id: "template-04",
    title: "Passionfruit",
    artist: "Drake",
    album: "More Life",
    coverImage: "/passionfruit.png",
    audioFile: "/passionfruit.mp3",
  },
  {
    id: "template-05",
    title: "One Dance",
    artist: "Drake",
    album: "track from Drake's",
    coverImage: "/one-dance.png",
    audioFile: "/one-dance.mp3",
  },
];

const initialQueue: Song[] = [];

export default function Home() {
  const {
    songs: queueSongs,
    currentSong,
    currentIndex,
    isPlaying,
    duration,
    currentTime,
    nodes,
    canGoNext,
    canGoPrev,
    togglePlay,
    next,
    prev,
    seek,
    selectIndex,
    addSong,
  } = usePlaylist(initialQueue);

  const handleAddSong = (song: Song) => {
    const newSong: Song = {
      ...song,
      id: `${song.id}-${Date.now()}`,
    };
    addSong(newSong);
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-neutral-950 text-white">
      <div className="fixed inset-0 pointer-events-none -z-10">
        {currentSong && (
          <img
            src={currentSong.coverImage}
            alt=""
            className="h-full w-full scale-110 object-cover blur-3xl opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.25),_transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />
      </div>
      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-10 px-6 py-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">
              Linked List Playlist
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Spotify Fullscreen Mode
            </h1>
            <p className="mt-2 text-sm text-white/60">
              DISCLAIMER: This is a demo project to visualize a doubly linked list data 
            </p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/60">
            Doubly Linked List
          </div>
        </header>

        <SpotifyPlayer
          songs={queueSongs}
          availableSongs={availableTemplates}
          currentSong={currentSong}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          duration={duration}
          currentTime={currentTime}
          canGoNext={canGoNext}
          canGoPrev={canGoPrev}
          onTogglePlay={togglePlay}
          onNext={next}
          onPrev={prev}
          onSeek={seek}
          onSelectIndex={selectIndex}
          onAddSong={handleAddSong}
        />
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
        <div className="text-xs uppercase tracking-[0.4em] text-emerald-200/70">
          Playlist Logic
        </div>
        <h2 className="mt-4 text-2xl font-semibold">
          Doubly Linked List Navigator
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-white/60">
          Each song is a node with a pointer to the previous and next track.
          The player moves across nodes when you tap next or previous.
        </p>
        <div className="mt-6 grid gap-4 text-sm text-white/70 grid-cols-1 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
              Head
            </div>
            <div className="mt-2 font-medium">First song in the list.</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
              Current
            </div>
            <div className="mt-2 font-medium">Node playing right now.</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.3em] text-white/50">
              Tail
            </div>
            <div className="mt-2 font-medium">Last song in the list.</div>
          </div>
        </div>
      </div>

        <LinkedListVisualizer nodes={nodes} />
      </div>
    </div>
  );
}

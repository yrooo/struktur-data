"use client";
import type { Song } from "@/lib/DoublyLinkedList";
import { Pause, Play, Plus, SkipBack, SkipForward } from "lucide-react";

const formatTime = (value: number) => {
  if (!Number.isFinite(value)) {
    return "0:00";
  }

  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export type SpotifyPlayerProps = {
  songs: Song[];
  availableSongs: Song[];
  currentSong: Song | null;
  currentIndex: number;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (time: number) => void;
  onSelectIndex: (index: number) => void;
  onAddSong: (song: Song) => void;
};

export default function SpotifyPlayer({
  songs,
  availableSongs,
  currentSong,
  currentIndex,
  isPlaying,
  duration,
  currentTime,
  canGoNext,
  canGoPrev,
  onTogglePlay,
  onNext,
  onPrev,
  onSeek,
  onSelectIndex,
  onAddSong,
}: SpotifyPlayerProps) {
  const progress = duration ? Math.min((currentTime / duration) * 100, 100) : 0;

  return (
    <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col gap-6">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-emerald-200/80">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Now Playing
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-neutral-900">
              {currentSong ? (
                <img
                  src={currentSong.coverImage}
                  alt={`${currentSong.title} cover`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-white/60">
                  No cover
                </div>
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/50" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-3xl font-semibold tracking-tight">
                {currentSong?.title ?? "Select a track"}
              </div>
              <div className="text-lg text-white/70">
                {currentSong?.artist ?? "--"}
              </div>
              <div className="text-sm uppercase tracking-[0.3em] text-emerald-200/70">
                {currentSong?.album ?? ""}
              </div>
              <div className="mt-6 flex items-center gap-4">
                <button
                  type="button"
                  onClick={onPrev}
                  disabled={!canGoPrev}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous"
                >
                  <SkipBack size={20} />
                </button>
                <button
                  type="button"
                  onClick={onTogglePlay}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-400 text-black shadow-[0_12px_30px_rgba(16,185,129,0.45)] transition hover:bg-emerald-300"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                <button
                  type="button"
                  onClick={onNext}
                  disabled={!canGoNext}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next"
                >
                  <SkipForward size={20} />
                </button>
              </div>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={currentTime}
                  onChange={(event) => onSeek(Number(event.target.value))}
                  className="range-slider w-full"
                  style={{
                    background: `linear-gradient(to right, #34d399 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-[0.4em] text-white/50">
            Queue
          </div>
          <div className="mt-5 grid gap-3">
            {songs.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-6 text-sm text-white/60">
                Queue is empty. Add a song from the list.
              </div>
            ) : (
              songs.map((song, index) => {
                const isActive = index === currentIndex;
                return (
                  <button
                    key={song.id}
                    type="button"
                    onClick={() => onSelectIndex(index)}
                    className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? "border-emerald-300/60 bg-emerald-400/10 text-white"
                        : "border-white/10 bg-white/0 text-white/70 hover:border-white/30 hover:bg-white/10"
                    }`}
                  >
                    <div>
                      <div className="text-base font-medium">
                        {song.title}
                      </div>
                      <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                        {song.artist}
                      </div>
                    </div>
                    <span className="text-xs text-white/40">
                      {isActive ? "Playing" : `#${index + 1}`}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-[0.4em] text-white/50">
            Available Songs
          </div>
          <div className="mt-5 grid gap-3 max-h-[600px] overflow-y-auto">
            {availableSongs.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/30 hover:bg-white/10"
              >
                <div>
                  <div className="text-base font-medium text-white">
                    {song.title}
                  </div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/50">
                    {song.artist}
                  </div>
                </div>
                <button
                  onClick={() => onAddSong(song)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/50 bg-emerald-400/10 text-emerald-400 transition hover:bg-emerald-400/20"
                  aria-label="Add to queue"
                >
                  <Plus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

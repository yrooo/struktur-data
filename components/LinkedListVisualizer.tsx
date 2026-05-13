"use client";

import type { PlaylistNode } from "@/hooks/usePlaylist";

export type LinkedListVisualizerProps = {
  nodes: PlaylistNode[];
};

export default function LinkedListVisualizer({ nodes }: LinkedListVisualizerProps) {
  return (
    <section className="rounded-[28px] border border-white/10 bg-white/5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.4em] text-white/50">
            Linked List Visualizer
          </div>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Nodes and Pointers
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Current
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/40" /> Head
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white/20" /> Tail
          </span>
        </div>
      </div>
      <div className="mt-6 flex gap-4 overflow-x-auto pb-4">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1;
          return (
            <div key={`${node.title}-${node.index}`} className="flex items-center gap-4">
              <div
                className={`min-w-[200px] rounded-2xl border px-4 py-4 transition ${
                  node.isCurrent
                    ? "border-emerald-300/70 bg-emerald-400/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/50">
                  <span>Node {node.index + 1}</span>
                  {node.isHead && <span>Head</span>}
                  {node.isTail && <span>Tail</span>}
                </div>
                <div className="mt-3 text-base font-semibold text-white">
                  {node.title}
                </div>
                <div className="mt-1 text-xs text-white/60">{node.artist}</div>
                <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.35em] text-white/40">
                  <span>Prev</span>
                  <span>Next</span>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="h-[3px] w-12 rounded-full bg-white/20" />
                  <div className="h-[3px] w-12 rounded-full bg-white/20" />
                </div>
              </div>
              {!isLast && (
                <div className="flex flex-col items-center text-xs uppercase tracking-[0.4em] text-white/40">
                  <div className="h-px w-14 bg-white/20" />
                  <span className="mt-2">Next</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

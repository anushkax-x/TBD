"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function IntroVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      await video.play();
      setPlaying(true);
    } catch {
      // Autoplay/policy failures — native controls remain available.
    }
  };

  return (
    <section
      id="watch"
      className="border-b border-border bg-surface"
      aria-labelledby="intro-video-heading"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            Watch
          </p>
          <h2
            id="intro-video-heading"
            className="mt-3 font-display text-3xl text-ink sm:text-4xl"
          >
            See how FlowMint turns disconnected work into a system.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate">
            A short look at what we build—automation, integrations, AI, and the
            tools your team already uses.
          </p>
        </Reveal>

        <Reveal delayMs={80} className="mt-10">
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="relative aspect-video w-full bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src="/videos/flowmint-intro.mp4"
                poster="/videos/flowmint-intro-poster.jpg"
                controls={playing}
                playsInline
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
              />

              {!playing && (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/55 via-black/20 to-transparent transition hover:from-black/45"
                  aria-label="Play FlowMint introduction video"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-surface shadow-lg shadow-accent/30 transition hover:bg-accent-hover sm:h-20 sm:w-20">
                    <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
                  </span>
                </button>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-muted sm:text-left">
            16:9 · ~32 seconds · Sound on recommended
          </p>
        </Reveal>
      </div>
    </section>
  );
}

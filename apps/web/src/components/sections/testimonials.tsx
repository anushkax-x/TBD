"use client";

import Image from "next/image";
import { Quote } from "lucide-react";

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  /**
   * Set to true only once the person has read and approved this exact
   * wording. Unapproved quotes render in development (marked "Draft") and
   * are hidden in production.
   */
  approved: boolean;
};

export const testimonials: Testimonial[] = [
  {
    name: "Anika",
    role: "Content creator · @itsaniiikaa",
    quote:
      "FlowMint helped me get clear on what to post and how to show up consistently. My Instagram finally feels like a growing brand, not a guessing game.",
    avatar: "/customers/itsaniiikaa/profile.jpg",
    approved: true,
  },
  {
    name: "Navyatha Pise",
    role: "Growth strategist · Portfolio site",
    quote:
      "I needed a portfolio that explained what I do in seconds. The site FlowMint built is clean and fast, and it's now the first link I send to new clients.",
    approved: true,
  },
  {
    name: "Vishal Jain",
    role: "Business owner · Custom tool",
    quote:
      "We were running things on spreadsheets and memory. FlowMint built a tool around how we actually work, and our day-to-day is so much simpler now.",
    approved: true,
  },
  {
    name: "Harsh",
    role: "Real estate manager · Realty AI",
    quote:
      "I used to chase listings and leads across chats and sheets. The dashboard they built shows my pipeline, bids and team calls in one place — I actually know what’s moving.",
    approved: true,
  },
  {
    name: "Tanay Gupta",
    role: "Founder · Copperheads",
    quote:
      "We needed the site and the ordering flow to feel as fast as our fab. FlowMint rebuilt both — customers get it, and I’m not babysitting the tool every day.",
    approved: true,
  },
  {
    name: "Ayushi",
    role: "Owner · Anoree",
    quote:
      "Running jewellery ops on scattered chats was messy. The workflows they set up for Anoree just… sit in the background now. Way less firefighting.",
    approved: true,
  },
];

const isDev = process.env.NODE_ENV !== "production";

function Avatar({ t }: { t: Testimonial }) {
  if (t.avatar) {
    return (
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/40">
        <Image
          src={t.avatar}
          alt=""
          fill
          sizes="40px"
          className="object-cover"
          unoptimized
        />
      </span>
    );
  }
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-medium text-accent ring-2 ring-accent/40">
      {initials}
    </span>
  );
}

export function getVisibleTestimonials() {
  return testimonials.filter((t) => t.approved || isDev);
}

/** Compact quote card sized for the work scroll row. */
export function TestimonialCard({
  t,
  className = "",
}: {
  t: Testimonial;
  className?: string;
}) {
  return (
    <figure
      className={`card-glass relative flex h-full flex-col overflow-hidden rounded-2xl p-4 sm:p-5 ${className}`}
    >
      {!t.approved && (
        <span className="absolute right-3 top-3 rounded-full border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-amber-300">
          Draft · needs approval
        </span>
      )}
      <span className="inline-flex w-fit rounded-full border border-accent/30 bg-accent-soft/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
        Review
      </span>
      <Quote className="mt-3 h-5 w-5 text-accent/60" aria-hidden />
      <blockquote className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-soft sm:text-[14px]">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-2.5 border-t border-hairline pt-3.5">
        <Avatar t={t} />
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{t.name}</p>
          <p className="truncate text-[11px] text-slate-muted">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

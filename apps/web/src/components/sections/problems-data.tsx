import type { CSSProperties, ReactNode } from "react";

/* Problem illustrations, animated via .problem-card[data-active] CSS in globals.css */

const svgProps = {
  viewBox: "0 0 120 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-7 w-full",
  "aria-hidden": true,
};

const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function DataEntryArt() {
  return (
    <svg {...svgProps}>
      <rect x="6" y="6" width="30" height="36" rx="3" />
      <line x1="12" y1="15" x2="30" y2="15" />
      <line x1="12" y1="22" x2="30" y2="22" />
      <line x1="12" y1="29" x2="24" y2="29" />
      <line
        x1="42"
        y1="24"
        x2="78"
        y2="24"
        strokeDasharray="2 4"
        opacity="0.5"
      />
      <rect
        className="pa-travel"
        x="40"
        y="20"
        width="8"
        height="8"
        rx="1.5"
        fill="currentColor"
        stroke="none"
      />
      <rect x="84" y="6" width="30" height="36" rx="3" />
      <line
        className="pa-fill"
        style={delay(0)}
        x1="90"
        y1="15"
        x2="108"
        y2="15"
      />
      <line
        className="pa-fill"
        style={delay(0.3)}
        x1="90"
        y1="22"
        x2="108"
        y2="22"
      />
      <line
        className="pa-fill"
        style={delay(0.6)}
        x1="90"
        y1="29"
        x2="102"
        y2="29"
      />
    </svg>
  );
}

function FollowUpArt() {
  return (
    <svg {...svgProps}>
      <circle cx="24" cy="24" r="15" />
      <line
        className="pa-spin"
        style={{ transformOrigin: "24px 24px" }}
        x1="24"
        y1="24"
        x2="24"
        y2="13"
      />
      <line x1="24" y1="24" x2="31" y2="24" />
      <rect x="50" y="8" width="52" height="13" rx="6.5" />
      <line x1="57" y1="14.5" x2="86" y2="14.5" opacity="0.6" />
      <g className="pa-missed">
        <rect
          x="60"
          y="27"
          width="52"
          height="13"
          rx="6.5"
          strokeDasharray="3 3"
        />
        <circle cx="76" cy="33.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="82" cy="33.5" r="1.2" fill="currentColor" stroke="none" />
        <circle cx="88" cy="33.5" r="1.2" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

function RepetitiveArt() {
  return (
    <svg {...svgProps}>
      {[6, 22].map((x, i) => (
        <rect
          key={x}
          className="pa-stamp"
          style={delay(i * 0.35)}
          x={x}
          y="18"
          width="12"
          height="12"
          rx="2"
        />
      ))}
      <g
        className="pa-spin pa-spin-slow"
        style={{ transformOrigin: "60px 24px" }}
      >
        <path d="M60 10 A14 14 0 1 1 46 24" />
        <path d="M42.5 27 L46 23.5 L49.5 27" />
      </g>
      <rect x="55" y="19" width="10" height="10" rx="1.5" />
      {[86, 102].map((x, i) => (
        <rect
          key={x}
          className="pa-stamp"
          style={delay(0.7 + i * 0.35)}
          x={x}
          y="18"
          width="12"
          height="12"
          rx="2"
        />
      ))}
    </svg>
  );
}

function DisconnectedArt() {
  return (
    <svg {...svgProps}>
      <rect x="6" y="17" width="16" height="14" rx="3" />
      <rect x="52" y="6" width="16" height="14" rx="3" />
      <rect
        className="pa-pulse-soft"
        x="98"
        y="20"
        width="16"
        height="14"
        rx="3"
      />
      <line
        className="pa-dash"
        x1="22"
        y1="22"
        x2="52"
        y2="15"
        strokeDasharray="3 3"
      />
      <line x1="68" y1="15" x2="78" y2="18.7" />
      <line x1="88" y1="22.3" x2="98" y2="26" />
      <path className="pa-pulse" d="M80.5 18 L85.5 23 M85.5 18 L80.5 23" />
      <line
        x1="14"
        y1="31"
        x2="14"
        y2="40"
        opacity="0.4"
        strokeDasharray="2 3"
      />
      <line
        x1="14"
        y1="40"
        x2="100"
        y2="40"
        opacity="0.4"
        strokeDasharray="2 3"
      />
    </svg>
  );
}

function ReportingArt() {
  const bars = [
    { x: 14, y: 26, h: 16 },
    { x: 30, y: 18, h: 24 },
    { x: 46, y: 30, h: 12 },
    { x: 62, y: 12, h: 30 },
    { x: 78, y: 22, h: 20 },
  ];
  return (
    <svg {...svgProps}>
      <line x1="8" y1="42" x2="92" y2="42" />
      {bars.map((b, i) => (
        <rect
          key={b.x}
          className="pa-bar"
          style={delay(i * 0.15)}
          x={b.x}
          y={b.y}
          width="10"
          height={b.h}
          rx="1.5"
        />
      ))}
      <rect x="98" y="10" width="16" height="22" rx="2" />
      <line x1="102" y1="17" x2="110" y2="17" opacity="0.6" />
      <line x1="102" y1="22" x2="110" y2="22" opacity="0.6" />
      <line x1="102" y1="27" x2="107" y2="27" opacity="0.6" />
    </svg>
  );
}

function InterfaceArt() {
  return (
    <svg {...svgProps}>
      {/* Cluttered before */}
      <rect x="4" y="6" width="42" height="36" rx="3" opacity="0.55" />
      <line x1="10" y1="14" x2="38" y2="14" opacity="0.45" />
      <line x1="10" y1="20" x2="34" y2="20" opacity="0.35" />
      <rect x="10" y="26" width="12" height="8" rx="1" opacity="0.4" />
      <rect x="26" y="26" width="12" height="8" rx="1" opacity="0.4" />
      <path
        className="pa-dash"
        d="M50 24 H70"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      {/* Clean after */}
      <rect x="74" y="6" width="42" height="36" rx="3" />
      <line
        className="pa-fill"
        style={delay(0)}
        x1="82"
        y1="16"
        x2="106"
        y2="16"
      />
      <line
        className="pa-fill"
        style={delay(0.25)}
        x1="82"
        y1="24"
        x2="98"
        y2="24"
        opacity="0.7"
      />
      <rect
        className="pa-stamp"
        style={delay(0.4)}
        x="82"
        y="30"
        width="22"
        height="7"
        rx="1.5"
      />
    </svg>
  );
}

export const problems: {
  title: string;
  body: string;
  fix: string;
  art: ReactNode;
}[] = [
  {
    title: "Manual data entry",
    body: "Hours lost copying between sheets, inboxes and CRMs.",
    fix: "Data syncs itself",
    art: <DataEntryArt />,
  },
  {
    title: "Missed follow-ups",
    body: "Leads go cold because nobody had time to reply.",
    fix: "Every lead followed up, automatically",
    art: <FollowUpArt />,
  },
  {
    title: "Repetitive admin",
    body: "Skilled people stuck doing work software should do.",
    fix: "Routine tasks run on autopilot",
    art: <RepetitiveArt />,
  },
  {
    title: "Disconnected tools",
    body: "Your website, CRM, payments and email don't talk.",
    fix: "One connected system",
    art: <DisconnectedArt />,
  },
  {
    title: "Manual reporting",
    body: "Someone rebuilds the same report every week.",
    fix: "Live dashboards, zero compiling",
    art: <ReportingArt />,
  },
  {
    title: "Dated or confusing UI",
    body: "Cluttered screens make customers bounce.",
    fix: "Clear interfaces that convert",
    art: <InterfaceArt />,
  },
];

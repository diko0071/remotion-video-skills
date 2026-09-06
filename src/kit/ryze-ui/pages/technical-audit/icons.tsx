import React from "react";

const LUCIDE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const RefreshIcon: React.FC = () => (
  <svg {...LUCIDE}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

export const HelpIcon: React.FC = () => (
  <svg {...LUCIDE}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

export const InfoIcon: React.FC = () => (
  <svg {...LUCIDE}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

export const PageIcon: React.FC = () => (
  <svg {...LUCIDE}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </svg>
);

export const ChecksIcon: React.FC = () => (
  <svg {...LUCIDE}>
    <path d="m3 17 2 2 4-4" />
    <path d="m3 7 2 2 4-4" />
    <path d="M13 6h8" />
    <path d="M13 12h8" />
    <path d="M13 18h8" />
  </svg>
);

export const SortIcon: React.FC<{ dir?: "asc" | "desc" }> = ({ dir }) => (
  <svg {...LUCIDE}>
    {dir === "asc" ? (
      <>
        <path d="m5 12 7-7 7 7" />
        <path d="M12 19V5" />
      </>
    ) : (
      <>
        <path d="m21 16-4 4-4-4" />
        <path d="M17 20V4" />
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </>
    )}
  </svg>
);

export const ChevronRight: React.FC = () => (
  <svg {...LUCIDE}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const ChevronLeft: React.FC = () => (
  <svg {...LUCIDE}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

export const CheckBox: React.FC<{ on?: boolean }> = ({ on }) => (
  <span className={`ta-box${on ? " on" : ""}`}>
    {on ? (
      <svg {...LUCIDE}>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ) : null}
  </span>
);

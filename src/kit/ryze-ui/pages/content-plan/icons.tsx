import React from "react";

export const SettingsIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 7h-9M14 17H5M17 3v8M7 13v8" />
  </svg>
);

export const ListViewIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
  </svg>
);

export const CalendarViewIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9.5h18M8 3v3M16 3v3" />
  </svg>
);

export const RefreshIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.7-3M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.7 3" />
    <path d="M21 3v6h-6M3 21v-6h6" />
  </svg>
);

export const HelpIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.8c0 1.7-2.4 2-2.4 3.4M12 17.2h.01" />
  </svg>
);

export const SortIcon: React.FC<{ dir?: "asc" | "desc" }> = ({ dir }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {dir === "asc" ? (
      <path d="M12 19V5M6 11l6-6 6 6" />
    ) : dir === "desc" ? (
      <path d="M12 5v14M18 13l-6 6-6-6" />
    ) : (
      <path d="M8 4v16M8 20l-3-3M16 20V4M16 4l3 3" />
    )}
  </svg>
);

export const ArrowTiny: React.FC<{ up?: boolean }> = ({ up }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {up ? (
      <path d="M12 19V6M6 12l6-6 6 6" />
    ) : (
      <path d="M12 5v13M18 12l-6 6-6-6" />
    )}
  </svg>
);

import React from "react";

const S: React.FC<{ children: React.ReactNode; size?: number; stroke?: number }> = ({ children, size = 20, stroke = 1.8 }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const PlusIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={2}>
    <path d="M12 5v14M5 12h14" />
  </S>
);
export const MicIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </S>
);
export const SearchIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.5-3.5" />
  </S>
);
export const CollapseIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <rect x="3" y="4" width="18" height="16" rx="3" />
    <path d="M9.5 4v16" />
  </S>
);
export const MonitorIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8M12 16v4" />
  </S>
);
export const GearIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
  </S>
);
export const ChevronsIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="m6 6 6 6-6 6M13 6l6 6-6 6" />
  </S>
);
export const ClockIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={2}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </S>
);
export const PlugIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v5" />
  </S>
);

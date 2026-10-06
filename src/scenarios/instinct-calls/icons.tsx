import React from "react";

type IconProps = { size: number; color?: string };

export const HandsetIcon: React.FC<IconProps & { down?: boolean }> = ({ size, color = "#fff", down = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: down ? "rotate(135deg)" : undefined }}>
    <path
      d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"
      fill={color}
    />
  </svg>
);

export const MicOffIcon: React.FC<IconProps> = ({ size, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="12" rx="3" />
    <path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4" />
    <path d="M3 3l18 18" />
  </svg>
);

export const KeypadIcon: React.FC<IconProps> = ({ size, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    {[4, 12, 20].flatMap((y) => [4, 12, 20].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r={2.2} />))}
  </svg>
);

export const SpeakerIcon: React.FC<IconProps> = ({ size, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9v6h4l5 4V5L8 9H4z" fill={color} />
    <path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12" />
  </svg>
);

export const ChevronLeftIcon: React.FC<IconProps> = ({ size, color = "#007AFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4l-8 8 8 8" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ size, color = "#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const MessagesAppIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 40 40">
    <rect width="40" height="40" rx="9" fill="#34C759" />
    <path d="M20 9c-7.2 0-13 4.8-13 10.8 0 3.4 1.9 6.4 4.8 8.4-.2 1.7-1.1 3.5-2.6 4.8 3.1-.1 5.7-1.3 7.4-2.6 1.1.2 2.2.3 3.4.3 7.2 0 13-4.8 13-10.9S27.2 9 20 9z" fill="#fff" />
  </svg>
);

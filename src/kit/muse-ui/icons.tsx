import React from "react";

const S: React.FC<{ children: React.ReactNode; size?: number; stroke?: number }> = ({ children, size = 24, stroke = 1.7 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const ChatIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="M12 3.5c-4.7 0-8.5 3.2-8.5 7.2 0 2.1 1 4 2.7 5.3L5.5 20l4.2-1.6c.7.2 1.5.3 2.3.3 4.7 0 8.5-3.2 8.5-7.2S16.7 3.5 12 3.5Z" />
  </S>
);
export const SearchIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-3.8-3.8" />
  </S>
);
export const NotesIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <rect x="4" y="3.5" width="16" height="17" rx="3" />
    <path d="M8 8.5h8M8 12h8M8 15.5h5" />
  </S>
);
export const BulbIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="M9 18h6M10 21h4M8.5 14.5A6 6 0 1 1 15.5 14.5c-.6.5-1 1.4-1 2.5h-5c0-1.1-.4-2-1-2.5Z" />
  </S>
);
export const TaskIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <rect x="4" y="4" width="16" height="16" rx="4" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </S>
);
export const AppsIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="M7.5 3.5 11 9H4l3.5-5.5Z" />
    <rect x="13.5" y="4" width="6.5" height="5" rx="1.5" />
    <circle cx="7.5" cy="16.5" r="3" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </S>
);
export const MenuIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={2}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </S>
);
export const EqualsIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={2}>
    <path d="M5 9.5h14M5 14.5h14" />
  </S>
);
export const GiftIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <rect x="3.5" y="8" width="17" height="4" rx="1" />
    <path d="M5 12v8h14v-8M12 8v12M12 8c-1.5-.5-4-1-4-3a2 2 0 0 1 4 0M12 8c1.5-.5 4-1 4-3a2 2 0 0 0-4 0" />
  </S>
);
export const PlusIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={1.8}>
    <path d="M12 5v14M5 12h14" />
  </S>
);
export const MicIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <rect x="9" y="3" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M9 21h6" />
  </S>
);
export const ArrowUpIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={2.2}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </S>
);
export const CloseIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={1.8}>
    <path d="M6 6l12 12M18 6 6 18" />
  </S>
);
export const CheckCircleIcon: React.FC<{ size?: number; color?: string; stroke?: number }> = ({ size = 24, color = "currentColor", stroke = 1.7 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12.3 2.6 2.6L16 9.7" />
  </svg>
);
export const CheckBadgeIcon: React.FC<{ size?: number; color?: string }> = ({ size = 20, color = "#1FA463" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="10" fill={color} />
    <path d="m7.5 12.3 3 3L16.5 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const PanelIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <rect x="3.5" y="4.5" width="17" height="15" rx="3" />
    <path d="M9 4.5v15" />
  </S>
);
export const ListIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={2}>
    <path d="M9 7h11M9 12h11M9 17h11M4 7h.5M4 12h.5M4 17h.5" />
  </S>
);
export const ShieldIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="M12 3.5 5 6v5.5c0 4 3 7.5 7 9 4-1.5 7-5 7-9V6l-7-2.5Z" />
    <path d="m9.5 12 2 2 3.5-3.5" />
  </S>
);
export const HistoryIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="M4 12a8 8 0 1 0 2.5-5.8M4 5v4h4M12 8v4.5l3 1.8" />
  </S>
);
export const FingerprintIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="M6 10a6 6 0 0 1 12 0v2M9 10a3 3 0 0 1 6 0v4a6 6 0 0 1-2 4.5M12 10v5a3 3 0 0 0 3 3M6 14c0 2.5 1 4.5 2.5 6" />
  </S>
);
export const GlobeIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h17M12 3.5c2.5 2.5 2.5 14.5 0 17M12 3.5c-2.5 2.5-2.5 14.5 0 17" />
  </S>
);
export const PencilIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="m4 20 4-1L19 8l-3-3L5 16l-1 4ZM14 7l3 3" />
  </S>
);
export const ToolsIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="m4 20 6-6M14 4l6 6M9.5 9.5 4.5 4.5l-1 3 3 3 3-1ZM14.5 14.5l5 5 1-3-3-3-3 1Z" />
  </S>
);
export const CartIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={2}>
    <path d="M3 4h2.5l2.2 10.5h10.5L20.5 7H7" />
    <circle cx="9.5" cy="19" r="1.4" />
    <circle cx="17" cy="19" r="1.4" />
  </S>
);
export const CardIcon: React.FC<{ size?: number }> = ({ size }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="#2B2D8F" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 10h19M7 15h4" />
  </svg>
);
export const ChevronIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="m9 6 6 6-6 6" />
  </S>
);
export const ExpandIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size}>
    <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" />
  </S>
);
export const LinkPayIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <circle cx="12" cy="12" r="11" fill="#1AE45A" />
    <path d="m10 7 5 5-5 5" fill="none" stroke="#0A2A12" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const PauseIcon: React.FC<{ size?: number }> = ({ size }) => (
  <S size={size} stroke={2.2}>
    <path d="M8 5v14M16 5v14" />
  </S>
);

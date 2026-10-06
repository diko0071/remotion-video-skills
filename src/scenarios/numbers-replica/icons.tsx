import React from "react";

type P = { size?: number; color?: string; stroke?: number };

const Svg: React.FC<P & { children: React.ReactNode }> = ({ size = 24, color = "currentColor", stroke = 1.8, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
    {children}
  </svg>
);

export const IconBubble: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M5 17.5 4 21l4-1.6A8 8 0 1 0 5 17.5Z" />
  </Svg>
);
export const IconPhone: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M7 3.5 9.5 3l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5-.5 2.5a2 2 0 0 1-2 1.5A16 16 0 0 1 5.5 5.5 2 2 0 0 1 7 3.5Z" />
  </Svg>
);
export const IconVideo: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x={3} y={6.5} width={12.5} height={11} rx={2.5} />
    <path d="m15.5 11 5-3v8l-5-3" />
  </Svg>
);
export const IconDots: React.FC<P> = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
    {[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => <circle key={`${r}${c}`} cx={6 + c * 6} cy={5 + r * 6} r={1.7} fill={color} />))}
    <circle cx={12} cy={23} r={0} fill={color} />
  </svg>
);
export const IconInbox: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M4 13.5 6.5 5h11l2.5 8.5V19H4Z" />
    <path d="M4 13.5h4.5l1 2h5l1-2H20" />
  </Svg>
);
export const IconUnread: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M20 12a8 8 0 1 1-4-6.9" />
    <circle cx={19} cy={5} r={2.2} />
  </Svg>
);
export const IconPin: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m14 3 7 7-3 1-4 4 .5 4.5L10 15l-5 5M9.5 14.5 4.5 10 9 10.5l4-4Z" />
  </Svg>
);
export const IconPeople: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx={9} cy={8} r={3.2} />
    <path d="M3 19c.6-3.2 3-5 6-5s5.4 1.8 6 5" />
    <circle cx={17} cy={9} r={2.4} />
    <path d="M16.5 14.2c2.3.2 3.9 1.8 4.5 4.3" />
  </Svg>
);
export const IconArchive: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x={3.5} y={4} width={17} height={4.5} rx={1} />
    <path d="M5 8.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8.5M10 12.5h4" />
  </Svg>
);
export const IconGear: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx={12} cy={12} r={3} />
    <path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7" />
  </Svg>
);
export const IconCheckAll: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m2.5 12.5 4 4 8-9M11 16l1 .5 8.5-9" />
  </Svg>
);
export const IconCheck: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </Svg>
);
export const IconChevron: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);
export const IconSearch: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx={11} cy={11} r={6.5} />
    <path d="m16 16 4.5 4.5" />
  </Svg>
);
export const IconBack: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </Svg>
);
export const IconLock: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x={5} y={10.5} width={14} height={10} rx={2} />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
  </Svg>
);
export const IconPlus: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const IconMic: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x={9} y={3} width={6} height={11} rx={3} />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" />
  </Svg>
);
export const IconRefresh: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4.5h-4.5" />
  </Svg>
);
export const IconCopy: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x={8} y={8} width={12} height={12} rx={2.5} />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Svg>
);
export const IconHome: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4Z" />
  </Svg>
);
export const IconBell: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15ZM10 20.5h4" />
  </Svg>
);
export const IconBackspace: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="m15 6-6 6 6 6" />
  </Svg>
);

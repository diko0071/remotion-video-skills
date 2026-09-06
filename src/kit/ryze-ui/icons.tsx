import React from "react";

type IconProps = {
  size?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
};

const base = (
  paths: React.ReactNode,
  { size = 16, strokeWidth = 2, style }: IconProps = {},
) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0, ...style }}
  >
    {paths}
  </svg>
);

export const SparkIcon = (p: IconProps = {}) =>
  base(
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />,
    p,
  );

export const SlashIcon = (p: IconProps = {}) =>
  base(<path d="M16 3.549L7.12 20.600" />, { strokeWidth: 1, ...p });

export const ChevronsUpDown = (p: IconProps = {}) =>
  base(
    <>
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </>,
    p,
  );

export const CreditsIcon = (p: IconProps = {}) =>
  base(
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </>,
    p,
  );

export const SearchIcon = (p: IconProps = {}) =>
  base(
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>,
    p,
  );

export const BookIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </>,
    p,
  );

export const SmileIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M12 6V2H8" />
      <path d="M15 11v.01" />
      <path d="M9 11v.01" />
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" transform="translate(0,1) scale(0.92)" />
    </>,
    p,
  );

export const HomeIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const ApprovalsIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m3 17 2 2 4-4" />
      <path d="m3 7 2 2 4-4" />
      <path d="M13 6h8" />
      <path d="M13 12h8" />
      <path d="M13 18h8" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const ChatIcon = (p: IconProps = {}) =>
  base(<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />, { strokeWidth: 1.5, ...p });

export const HistoryIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const ClockIcon = (p: IconProps = {}) =>
  base(
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const ShieldIcon = (p: IconProps = {}) =>
  base(
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />,
    { strokeWidth: 1.5, ...p },
  );

export const ReportIcon = (p: IconProps = {}) =>
  base(
    <>
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const PlugIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const TrendIcon = (p: IconProps = {}) =>
  base(
    <>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const PlusIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </>,
    p,
  );

export const MicIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </>,
    p,
  );

export const ArrowUpIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </>,
    { strokeWidth: 2.3, ...p },
  );

export const ExpandIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M15 3h6v6" />
      <path d="m21 3-7 7" />
      <path d="m3 21 7-7" />
      <path d="M9 21H3v-6" />
    </>,
    p,
  );

export const CloseIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </>,
    p,
  );

export const CheckIcon = (p: IconProps = {}) =>
  base(<path d="M20 6 9 17l-5-5" />, p);

export const ChevronRight = (p: IconProps = {}) =>
  base(<path d="m9 18 6-6-6-6" />, p);

export const ChevronDownIcon = (p: IconProps = {}) =>
  base(<path d="m6 9 6 6 6-6" />, p);

export const MessageSquarePlusIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M12 7v6" />
      <path d="M9 10h6" />
    </>,
    p,
  );

export const GiftIcon = (p: IconProps = {}) =>
  base(
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </>,
    p,
  );

export const ArrowLeftIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </>,
    p,
  );

export const GlobeIcon = (p: IconProps = {}) =>
  base(
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </>,
    p,
  );

export const BagIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>,
    p,
  );

export const MenuDotsIcon = (p: IconProps = {}) =>
  base(
    <>
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </>,
    p,
  );

export const CopyIcon = (p: IconProps = {}) =>
  base(
    <>
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </>,
    p,
  );

export const DownloadIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </>,
    p,
  );

export const ArrowRightIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>,
    p,
  );

export const ArrowUpRightIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </>,
    p,
  );

export const AlertIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </>,
    p,
  );

export const NetworkIcon = (p: IconProps = {}) =>
  base(
    <>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <path d="M11 18H8a2 2 0 0 1-2-2V9" />
    </>,
    p,
  );

export const AnnotateIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </>,
    p,
  );

export const ExpandDiagIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </>,
    p,
  );

export const StarIcon = ({ size = 14, style }: IconProps = {}) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
    stroke="none"
    style={{ flexShrink: 0, ...style }}
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
);

export const ListChecksIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M13 5h8" />
      <path d="M13 12h8" />
      <path d="M13 19h8" />
      <path d="m3 17 2 2 4-4" />
      <path d="m3 7 2 2 4-4" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const BarChart3Icon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M3 3v16a2 2 0 0 0 2 2h16" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const ImagesIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m22 11-1.296-1.296a2.4 2.4 0 0 0-3.408 0L11 16" />
      <path d="M4 8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2" />
      <circle cx="13" cy="7" r="1" fill="currentColor" />
      <rect x="8" y="2" width="14" height="14" rx="2" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const LayoutTemplateIcon = (p: IconProps = {}) =>
  base(
    <>
      <rect width="18" height="7" x="3" y="3" rx="1" />
      <rect width="9" height="7" x="3" y="14" rx="1" />
      <rect width="5" height="7" x="16" y="14" rx="1" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const TelescopeIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
      <path d="m13.56 11.747 4.332-.924" />
      <path d="m16 21-3.105-6.21" />
      <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
      <path d="m6.158 8.633 1.114 4.456" />
      <path d="m8 21 3.105-6.21" />
      <circle cx="12" cy="13" r="2" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const LayoutDashboardIcon = (p: IconProps = {}) =>
  base(
    <>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const Settings2Icon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M14 17H5" />
      <path d="M19 7h-9" />
      <circle cx="17" cy="17" r="3" />
      <circle cx="7" cy="7" r="3" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const GaugeIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const FilesIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M15 2h-4a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
      <path d="M5 7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.732-1" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const NewspaperIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M15 18h-5" />
      <path d="M18 14h-8" />
      <rect width="8" height="4" x="10" y="6" rx="1" />
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const KeyRoundIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
    </>,
    { strokeWidth: 1.5, ...p },
  );

export const MessageSquareIcon = (p: IconProps = {}) =>
  base(
    <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />,
    { strokeWidth: 1.5, ...p },
  );

export const PencilIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
      <path d="m15 5 4 4" />
    </>,
    p,
  );

export const ImagePlusIcon = (p: IconProps = {}) =>
  base(
    <>
      <path d="M16 5h6" />
      <path d="M19 2v6" />
      <path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      <circle cx="9" cy="9" r="2" />
    </>,
    p,
  );

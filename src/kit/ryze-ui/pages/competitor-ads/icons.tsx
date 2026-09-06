import React from "react";

const Glyph: React.FC<{ children: React.ReactNode; strokeWidth?: number }> = ({
  children,
  strokeWidth = 1.8,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const RefreshGlyph: React.FC = () => (
  <Glyph>
    <path d="M21 12a9 9 0 1 1-3.5-7.1" />
    <path d="M21 3v6h-6" />
  </Glyph>
);

export const BellGlyph: React.FC = () => (
  <Glyph>
    <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
  </Glyph>
);

export const BellOffGlyph: React.FC = () => (
  <Glyph>
    <path d="M8.7 3A6 6 0 0 1 18 8c0 2.4.4 4.2 1 5.5" />
    <path d="M17 17H3s3-2 3-9a6 6 0 0 1 .3-1.9" />
    <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    <path d="m2 2 20 20" />
  </Glyph>
);

export const TrashGlyph: React.FC = () => (
  <Glyph>
    <path d="M3 6h18" />
    <path d="M8 6V4h8v2" />
    <path d="M6 6v14h12V6" />
  </Glyph>
);

export const BookmarkPlusGlyph: React.FC = () => (
  <Glyph>
    <path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    <path d="M12 7v6" />
    <path d="M9 10h6" />
  </Glyph>
);

export const BookmarkFilledGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

export const ExternalLinkGlyph: React.FC = () => (
  <Glyph>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </Glyph>
);

export const WandGlyph: React.FC = () => (
  <Glyph>
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
    <path d="m14 7 3 3" />
    <path d="M5 6v4" />
    <path d="M19 14v4" />
    <path d="M10 2v2" />
    <path d="M7 8H3" />
    <path d="M21 16h-4" />
    <path d="M11 3H9" />
  </Glyph>
);

export const SparklesGlyph: React.FC = () => (
  <Glyph>
    <path d="M12 3v0l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
    <path d="M19 17v4" />
    <path d="M17 19h4" />
  </Glyph>
);

export const CheckGlyph: React.FC = () => (
  <Glyph strokeWidth={2.2}>
    <path d="m5 12 5 5L20 7" />
  </Glyph>
);

export const CloseGlyph: React.FC = () => (
  <Glyph strokeWidth={2}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Glyph>
);

export const SpinnerGlyph: React.FC = () => (
  <Glyph strokeWidth={2}>
    <path d="M21 12a9 9 0 1 1-6.2-8.56" />
  </Glyph>
);

export const ChevronDownGlyph: React.FC = () => (
  <Glyph strokeWidth={2}>
    <path d="m6 9 6 6 6-6" />
  </Glyph>
);

export const ChevronLeftIcon: React.FC = () => (
  <Glyph strokeWidth={2}>
    <path d="m15 18-6-6 6-6" />
  </Glyph>
);

export const ChevronRightIcon: React.FC = () => (
  <Glyph strokeWidth={2}>
    <path d="m9 18 6-6-6-6" />
  </Glyph>
);

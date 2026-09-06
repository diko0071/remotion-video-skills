import React from "react";
import { Img, staticFile } from "remotion";
import { useClickPress } from "../../core/press-context";
import {
  ArrowLeftIcon,
  BarChart3Icon,
  BookIcon,
  ChatIcon,
  ChevronRight,
  ClockIcon,
  FilesIcon,
  GaugeIcon,
  HistoryIcon,
  HomeIcon,
  ImagesIcon,
  KeyRoundIcon,
  LayoutDashboardIcon,
  LayoutTemplateIcon,
  ListChecksIcon,
  MessageSquareIcon,
  NewspaperIcon,
  PlugIcon,
  ReportIcon,
  Settings2Icon,
  ShieldIcon,
  TelescopeIcon,
  TrendIcon,
} from "./icons";

export type RailEntry =
  | {
      kind: "item";
      label: string;
      icon: React.ReactNode;
      badge?: number;
      drillIn?: boolean;
    }
  | { kind: "group"; label: string };

const dashboardEntries: RailEntry[] = [
  { kind: "item", label: "Home", icon: <HomeIcon /> },
  { kind: "item", label: "Approvals", icon: <ListChecksIcon />, badge: 9 },
  { kind: "group", label: "AI Marketer" },
  { kind: "item", label: "New chat", icon: <ChatIcon /> },
  { kind: "item", label: "Chat History", icon: <HistoryIcon /> },
  { kind: "item", label: "Schedules", icon: <ClockIcon /> },
  { kind: "item", label: "Templates", icon: <BookIcon strokeWidth={1.5} /> },
  { kind: "group", label: "Workspace" },
  { kind: "item", label: "Brand", icon: <ShieldIcon /> },
  { kind: "item", label: "Reports", icon: <ReportIcon /> },
  { kind: "item", label: "Integrations", icon: <PlugIcon /> },
  { kind: "group", label: "Paid Ads" },
  { kind: "item", label: "Dashboard", icon: <BarChart3Icon /> },
  { kind: "item", label: "Ad Creatives", icon: <ImagesIcon /> },
  { kind: "item", label: "Ad Templates", icon: <LayoutTemplateIcon /> },
  { kind: "item", label: "Competitor Ads", icon: <TelescopeIcon /> },
  { kind: "item", label: "SEO", icon: <TrendIcon />, drillIn: true },
];

const seoEntries: RailEntry[] = [
  { kind: "group", label: "Overview" },
  { kind: "item", label: "Home", icon: <HomeIcon /> },
  { kind: "item", label: "Dashboard", icon: <LayoutDashboardIcon /> },
  { kind: "item", label: "Settings", icon: <Settings2Icon /> },
  { kind: "group", label: "On-page" },
  { kind: "item", label: "Technical Audit", icon: <GaugeIcon /> },
  { kind: "item", label: "Content Plan", icon: <FilesIcon /> },
  { kind: "item", label: "Blog Studio", icon: <NewspaperIcon /> },
  { kind: "group", label: "Off-page" },
  { kind: "item", label: "Queries", icon: <KeyRoundIcon /> },
  { kind: "item", label: "Mentions", icon: <MessageSquareIcon /> },
];

const ITEM_H = 32;
const GAP = 2;
const GROUP_H = 24;
const GROUP_MARGIN = 6;
const RAIL_PAD_TOP = 8;
const SECTION_HEAD_H = 40;

export type RailSection = "dashboard" | "seo";

export const railEntries = (section: RailSection): RailEntry[] =>
  section === "seo" ? seoEntries : dashboardEntries;

export const railItemY = (
  label: string,
  section: RailSection = "dashboard",
): number => {
  let y = RAIL_PAD_TOP + (section === "seo" ? SECTION_HEAD_H : 0);
  for (const entry of railEntries(section)) {
    if (entry.kind === "group") {
      y += GROUP_H + GROUP_MARGIN + GAP;
      continue;
    }
    if (entry.label === label) return y + ITEM_H / 2;
    y += ITEM_H + GAP;
  }
  return y;
};

const RailItem: React.FC<{
  entry: Extract<RailEntry, { kind: "item" }>;
  section: RailSection;
  active: string;
}> = ({ entry, section, active }) => {
  const scale = useClickPress(`nav.${section}.${entry.label}`);
  return (
    <span
      data-click={`nav.${section}.${entry.label}`}
      className={`rail-item${entry.label === active ? " active" : ""}`}
      style={{ scale: String(scale) }}
    >
      {entry.icon}
      <span className="rail-label">{entry.label}</span>
      {entry.badge ? <span className="rail-badge">{entry.badge}</span> : null}
      {entry.drillIn ? (
        <span className="rail-chev">
          <ChevronRight />
        </span>
      ) : null}
    </span>
  );
};

export const Rail: React.FC<{
  active?: string;
  expanded?: boolean;
  section?: RailSection;
}> = ({ active = "New chat", expanded = false, section = "dashboard" }) => (
  <aside className={`app-rail${expanded ? " expanded" : ""}`}>
    <div className="rail-panel">
      <div className="rail-bg-img">
        <Img src={staticFile("sidebar-bg.webp")} />
      </div>
      <div className="rail-bg-gradient" />
      <div className="rail-items">
        {section === "seo" ? (
          <span className="rail-section-head">
            <span className="rail-back" data-click="rail.back">
              <ArrowLeftIcon />
            </span>
            <span className="rail-label">SEO</span>
          </span>
        ) : null}
        {railEntries(section).map((it, i) =>
          it.kind === "group" ? (
            <span key={i} className="rail-group">
              <span className="divider" />
              <span className="glabel">{it.label}</span>
            </span>
          ) : (
            <RailItem key={i} entry={it} section={section} active={active} />
          ),
        )}
      </div>
      <div className="rail-footer">
        <span className="rail-avatar">DK</span>
        <span className="rail-user">
          <b>Dmitry Korzhov</b>
          <i>dmitry@example.com</i>
        </span>
      </div>
    </div>
  </aside>
);

import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import {
  SLACK_CAST,
  type SidebarRow,
  SlackMention,
  SlackMessage,
} from "../../kit/slack-ui";

const { sarah, priya, marcus, tom, james, elena, ryze } = SLACK_CAST;

export const rowsFor = (
  selected: string,
  badge?: { name: string; count: number },
): SidebarRow[] =>
  SIDEBAR_ROWS.map((row) =>
    row.kind === "channel"
      ? {
          ...row,
          id: `sidebar.${row.name}`,
          selected: row.name === selected,
          unread: badge?.name === row.name,
          badge: badge?.name === row.name ? badge.count : row.name === "product" ? row.badge : undefined,
        }
      : row,
  );

export const SIDEBAR_ROWS: SidebarRow[] = [
  { kind: "link", icon: "threads", name: "Threads" },
  { kind: "link", icon: "headphones", name: "Huddles" },
  { kind: "link", icon: "send-filled", name: "Drafts & sent" },
  { kind: "heading", name: "Channels" },
  { kind: "channel", name: "general" },
  { kind: "channel", name: "marketing", selected: true },
  { kind: "channel", name: "marketing-analytics" },
  { kind: "channel", name: "clients" },
  { kind: "channel", name: "ask-ryze" },
  { kind: "channel", name: "product", unread: true, badge: 2 },
  { kind: "channel", name: "social" },
  { kind: "heading", name: "Direct Messages" },
  { kind: "dm", name: sarah.name, avatar: sarah.avatar },
  { kind: "heading", name: "Agents & apps" },
  { kind: "dm", name: "Ryze AI", avatar: ryze.avatar },
  { kind: "dm", name: "Slackbot" },
];


export const SIDEBAR_ROWS_ANALYTICS: SidebarRow[] = SIDEBAR_ROWS.map((row) =>
  row.kind === "channel"
    ? { ...row, selected: row.name === "marketing-analytics" }
    : row,
);
export const ContextMessages: React.FC = () => (
  <>
    <SlackMessage avatar={james.avatar} sender={james.name} time="9:04 AM">
      Shipped the new landing page copy last night, feedback welcome
    </SlackMessage>
    <SlackMessage avatar={elena.avatar} sender={elena.name} time="9:08 AM">
      Nice. I'll link it from the newsletter this week
    </SlackMessage>
    <SlackMessage avatar={marcus.avatar} sender={marcus.name} time="9:12 AM">
      Morning team — Q3 numbers review at 2 PM, don't forget
    </SlackMessage>
    <SlackMessage avatar={sarah.avatar} sender={sarah.name} time="9:14 AM">
      Meta CPA jumped again this week… anyone looked at it?
    </SlackMessage>
    <SlackMessage avatar={priya.avatar} sender={priya.name} time="9:15 AM">
      Saw it too. Creatives are fatiguing on the top ad set
    </SlackMessage>
    <SlackMessage avatar={tom.avatar} sender={tom.name} time="9:16 AM">
      <SlackMention>@Ryze AI</SlackMention> can you take a look before we burn
      more budget?
    </SlackMessage>
  </>
);

export const ApprovalCard: React.FC<{ approvedP: number; clickScale: number }> = ({
  approvedP,
  clickScale,
}) => (
  <div
    data-click="slack.approval.card"
    style={{
      marginTop: 8,
      width: 640,
      border: "1px solid #DDDDDD",
      borderRadius: 12,
      padding: "14px 16px",
      background: "#FFFFFF",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <Img
        src={staticFile("integrations/meta-ads.svg")}
        style={{ width: 22, height: 22, display: "block" }}
      />
      <span style={{ fontWeight: 700, fontSize: 15 }}>
        Pause ad set &ldquo;Prospecting — Broad&rdquo;?
      </span>
    </div>
    <div style={{ fontSize: 14, color: "#616061", marginTop: 6, lineHeight: 1.45 }}>
      $412 spent this week, 0 conversions. Pausing stops the leak — your other
      ad sets are unaffected.
    </div>
    <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
      <span
        data-click="slack.approve"
        style={{
          background: "#007A5A",
          color: "#FFFFFF",
          borderRadius: 5,
          padding: "8px 20px",
          fontSize: 14,
          fontWeight: 700,
          transform: `scale(${clickScale})`,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {approvedP > 0.5 ? "Approved" : "Approve"}
      </span>
      <span
        style={{
          border: "1px solid #BBBABB",
          color: "#1D1C1D",
          borderRadius: 5,
          padding: "8px 20px",
          fontSize: 14,
          fontWeight: 700,
          opacity: interpolate(approvedP, [0, 1], [1, 0.4]),
        }}
      >
        Skip
      </span>
    </div>
  </div>
);

export const REPORT_STATS = [
  { label: "SPEND", value: "$8,420", delta: "-5%" },
  { label: "ROAS", value: "3.8x", delta: "+12%" },
  { label: "CPA", value: "$19.40", delta: "-9%" },
];

export const ReportCard: React.FC<{ at: number; width?: number }> = ({ at, width = 700 }) => {
  const draw = useSpringAt(at, SPRINGS.smooth, 40);
  const chartW = width - 36;
  return (
    <div
      style={{
        marginTop: 8,
        width,
        border: "1px solid #DDDDDD",
        borderRadius: 12,
        padding: "16px 18px",
        background: "#FFFFFF",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Weekly performance — Aug 8–15</div>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 12,
            fontWeight: 700,
            color: "#007A5A",
            background: "rgba(0,122,90,0.1)",
            borderRadius: 6,
            padding: "3px 10px",
          }}
        >
          Healthy
        </span>
      </div>
      <div style={{ display: "flex", gap: 30, marginTop: 14 }}>
        {REPORT_STATS.map((s) => (
          <div key={s.label}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#616061" }}>{s.label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, marginTop: 2 }}>
              {s.value}{" "}
              <span style={{ fontSize: 13, color: "#007A5A" }}>{s.delta}</span>
            </div>
          </div>
        ))}
      </div>
      <svg
        width={chartW}
        height={110}
        viewBox="0 0 320 64"
        preserveAspectRatio="none"
        style={{ marginTop: 14, display: "block" }}
      >
        {[10, 28, 46].map((y) => (
          <line key={y} x1={0} y1={y} x2={320} y2={y} stroke="rgba(23,19,16,0.07)" strokeWidth={0.6} />
        ))}
        <path
          d="M0,50 C30,46 50,48 80,40 C110,32 130,36 160,28 C190,22 210,26 240,18 C270,12 290,16 320,10 L320,64 L0,64 Z"
          fill="rgba(0,122,90,0.08)"
          opacity={draw}
        />
        <path
          d="M0,50 C30,46 50,48 80,40 C110,32 130,36 160,28 C190,22 210,26 240,18 C270,12 290,16 320,10"
          fill="none"
          stroke="#007A5A"
          strokeWidth={2.2}
          strokeDasharray={400}
          strokeDashoffset={interpolate(draw, [0, 1], [400, 0])}
        />
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          color: "#9B9A9B",
          marginTop: 4,
        }}
      >
        {["Fri 8", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri 15"].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: "1px solid rgba(23,19,16,0.07)",
          fontSize: 14,
          color: "#616061",
          lineHeight: 1.45,
        }}
      >
        CPA down 9% after pausing &ldquo;Prospecting — Broad&rdquo; — best week
        since June. Retargeting is carrying growth at 4.1x ROAS.
      </div>
    </div>
  );
};

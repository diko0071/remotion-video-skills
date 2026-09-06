import React from "react";
import { Img, interpolate, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { AMP, CONNECTORS } from "../timings";

const { fontFamily } = loadFont();
export const AMP_FONT = fontFamily;

export const Hero: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <div style={{ textAlign: "center", fontFamily: AMP_FONT, opacity }}>
    <div style={{ color: AMP.blue, fontSize: 30, fontWeight: 600, letterSpacing: "0.01em" }}>
      Let&apos;s dive in
    </div>
    <div
      style={{
        color: AMP.ink,
        fontSize: 66,
        fontWeight: 600,
        letterSpacing: "-0.015em",
        marginTop: 10,
      }}
    >
      What do you want to know?
    </div>
  </div>
);

export const Composer: React.FC<{
  width?: number;
  text?: string;
  placeholder?: boolean;
  icons?: number;
  caret?: boolean;
}> = ({ width = 1180, text = "", placeholder = false, icons = 0, caret = false }) => (
  <div
    style={{
      width,
      borderRadius: 14,
      border: `1.6px solid ${AMP.blue}`,
      background: "#FFFFFF",
      boxShadow: "0 14px 34px rgba(33,96,240,0.10)",
      padding: "22px 22px 16px",
      fontFamily: AMP_FONT,
    }}
  >
    <div style={{ minHeight: 42, fontSize: 28, color: text ? AMP.ink : "#A6AEBD" }}>
      {text || (placeholder ? "Analyze, learn, or build anything..." : "")}
      {caret ? (
        <span
          style={{
            display: "inline-block",
            width: 1.6,
            height: 30,
            background: AMP.ink,
            marginLeft: 2,
            transform: "translateY(3px)",
          }}
        />
      ) : null}
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 42, height: 42, borderRadius: 11,
            border: `1.4px solid ${AMP.line}`,
            display: "grid",
            placeItems: "center",
            color: AMP.inkSoft,
            fontSize: 26,
          }}
        >
          +
        </div>
        {CONNECTORS.slice(0, Math.max(0, Math.round(icons))).map((c) => (
          <Img
            key={c.name}
            src={staticFile(`amplitude/icons/${c.icon}`)}
            style={{ width: 32, height: 32, borderRadius: 7, objectFit: "contain" }}
          />
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div
          style={{
            width: 42, height: 42, borderRadius: 999,
            border: `1.4px solid ${AMP.line}`,
            display: "grid",
            placeItems: "center",
            color: AMP.inkSoft,
            fontSize: 21,
          }}
        >
          ↓
        </div>
        <div
          style={{
            width: 42, height: 42, borderRadius: 999,
            background: text ? AMP.blue : "#EDF0F6",
            display: "grid",
            placeItems: "center",
            color: text ? "#fff" : "#A6AEBD",
            fontSize: 21,
          }}
        >
          ↑
        </div>
      </div>
    </div>
  </div>
);

export const ConnectorTooltip: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 13,
      background: "#FFFFFF",
      borderRadius: 13,
      boxShadow: "0 16px 44px rgba(22,24,29,0.16)",
      padding: "20px 30px 20px 22px",
      fontFamily: AMP_FONT,
      opacity,
    }}
  >
    <div
      style={{
        width: 46, height: 46, borderRadius: 999,
        border: `1.8px solid ${AMP.inkSoft}`,
        display: "grid",
        placeItems: "center",
        color: AMP.inkSoft,
        fontSize: 24,
      }}
    >
      ⊕
    </div>
    <div>
      <div style={{ fontSize: 26, fontWeight: 700, color: AMP.ink }}>Connectors</div>
      <div style={{ fontSize: 23, color: AMP.inkSoft, marginTop: 2 }}>
        Connect to your other apps
      </div>
    </div>
  </div>
);

export const ConnectorsPanel: React.FC<{
  width?: number;
  connected: number;
  hover?: number;
}> = ({ width = 900, connected, hover = -1 }) => (
  <div
    style={{
      width,
      background: "#FFFFFF",
      borderRadius: 14,
      boxShadow: "0 22px 60px rgba(22,24,29,0.13)",
      padding: "26px 24px",
      fontFamily: AMP_FONT,
    }}
  >
    <div style={{ fontSize: 32, fontWeight: 600, color: AMP.ink, marginBottom: 22 }}>
      Connectors
    </div>
    {CONNECTORS.map((c, i) => {
      const isConnected = i < connected;
      return (
        <div
          key={c.name}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            padding: "21px 18px",
            borderRadius: 12,
            background: i < connected ? "#DFE7FB" : i === hover ? AMP.blueSoft : "transparent",
          }}
        >
          <Img
            src={staticFile(`amplitude/icons/${c.icon}`)}
            style={{ width: 46, height: 46, borderRadius: 10, objectFit: "contain" }}
          />
          <div style={{ fontSize: 29, color: AMP.ink, flex: 1 }}>{c.name}</div>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              padding: "9px 22px",
              borderRadius: 999,
              background: isConnected ? AMP.blue : "#EFF2F8",
              color: isConnected ? "#FFFFFF" : AMP.inkSoft,
            }}
          >
            {isConnected ? "Connected" : "Connect"}
          </div>
        </div>
      );
    })}
  </div>
);

export const PromptChip: React.FC<{ text: string; style?: React.CSSProperties }> = ({
  text,
  style,
}) => (
  <div
    style={{
      display: "inline-block",
      background: AMP.blueSoft,
      color: AMP.blue,
      borderRadius: 999,
      padding: "11px 22px",
      fontSize: 21,
      fontWeight: 500,
      fontFamily: AMP_FONT,
      ...style,
    }}
  >
    {text}
  </div>
);

export const BugsTable: React.FC<{
  rows: { id: string; text: string; sev: string }[];
  visible: number;
  highlight?: number;
  titleOnly?: boolean;
}> = ({ rows, visible, highlight = -1, titleOnly = false }) => (
  <div style={{ width: 1060, fontFamily: AMP_FONT }}>
    <div style={{ fontSize: 30, fontWeight: 600, color: AMP.ink, marginBottom: 16 }}>
      Active / In-Progress Bugs with Error Impact
    </div>
    {titleOnly ? null : (
      <div
        style={{
          border: `1px solid ${AMP.line}`,
          borderRadius: 10,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            background: "#F4F6FA",
            padding: "12px 19px",
            fontSize: 19,
            color: AMP.inkSoft,
            fontWeight: 600,
          }}
        >
          <div style={{ width: 210 }}>Ticket</div>
          <div>Error Impact</div>
        </div>
        {rows.slice(0, Math.max(0, Math.round(visible))).map((r, i) => (
          <div
            key={r.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "15px 19px",
              borderTop: `1px solid ${AMP.line}`,
              background: "#fff",
              outline: i === highlight ? `2.4px solid ${AMP.blue}` : undefined,
              outlineOffset: -2.4,
              borderRadius: i === highlight ? 10 : 0,
              boxShadow: i === highlight ? "0 10px 30px rgba(33,96,240,0.16)" : undefined,
              position: i === highlight ? "relative" : undefined,
              zIndex: i === highlight ? 2 : undefined,
            }}
          >
            <div style={{ width: 210, color: AMP.blue, fontSize: 21, fontWeight: 600 }}>
              {r.id}
            </div>
            <div style={{ fontSize: 21, color: AMP.ink, flex: 1 }}>{r.text}</div>
            <div
              style={{
                width: 14, height: 14,
                borderRadius: 999,
                background:
                  r.sev === "red" ? AMP.red : r.sev === "yellow" ? AMP.yellow : AMP.green,
              }}
            />
          </div>
        ))}
      </div>
    )}
  </div>
);

export const NotionCard: React.FC<{ step: number }> = ({ step }) => {
  const items = ["Search release pages", "Fetch Dashboard Export PRD", "Summarize findings"];
  return (
    <div
      style={{
        width: 860,
        border: `1px solid ${AMP.line}`,
        borderRadius: 12,
        background: "#fff",
        padding: "14px 16px",
        fontFamily: AMP_FONT,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
        <Img
          src={staticFile("amplitude/icons/notion.png")}
          style={{ width: 30, height: 30, borderRadius: 7 }}
        />
        <span style={{ fontSize: 22, fontWeight: 600, color: AMP.ink }}>Notion</span>
      </div>
      {items.map((label, i) => {
        const state = step > i ? "done" : step === i ? "run" : "wait";
        return (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "6px 2px",
              opacity: state === "wait" ? 0.45 : 1,
            }}
          >
            <span style={{ fontSize: 19, color: state === "done" ? AMP.green : AMP.inkSoft }}>
              {state === "done" ? "✓" : state === "run" ? "◌" : "○"}
            </span>
            <span style={{ fontSize: 21, color: AMP.ink, flex: 1 }}>{label}</span>
            <span style={{ color: "#B9BFCB", fontSize: 15 }}>›</span>
          </div>
        );
      })}
    </div>
  );
};

export const FinishedCard: React.FC<{ reveal: number }> = ({ reveal }) => {
  const on = (k: number) => ({
    opacity: interpolate(reveal, [k, k + 0.18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  });
  return (
    <div
      style={{
        width: 1000,
        border: `1px solid ${AMP.line}`,
        borderRadius: 12,
        background: "#fff",
        padding: "20px 24px",
        fontFamily: AMP_FONT,
        fontSize: 21,
        color: AMP.ink,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ color: AMP.green, fontSize: 15 }}>✓</span>
        <span style={{ fontWeight: 600 }}>Finished working</span>
        <span style={{ marginLeft: "auto", color: "#B9BFCB" }}>⌃</span>
      </div>
      <div style={{ marginTop: 9, ...on(0) }}>I&apos;ll fetch the PRD details.</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 7, ...on(0.15) }}>
        <span style={{ color: AMP.green, fontSize: 14 }}>✓</span>
        <Img
          src={staticFile("amplitude/icons/notion.png")}
          style={{ width: 24, height: 24, borderRadius: 5 }}
        />
        <span>Notion – PRD read</span>
      </div>
      <div style={{ marginTop: 9, color: AMP.inkSoft, lineHeight: 1.5, ...on(0.3) }}>
        Dashboard export was built to let users share live reports with stakeholders without
        logging in. Users are seeing errors right before the share link is generated.
      </div>
      <div style={{ marginTop: 11, ...on(0.55) }}>
        <div style={{ fontWeight: 600 }}>I suggest:</div>
        <div style={{ color: AMP.inkSoft, marginTop: 4, lineHeight: 1.5 }}>
          Reprioritize SPRINT-212 to P0 based on error volume.
          <br />
          Send a weekly ticket health Slack update to #product-sprint
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 13, ...on(0.8) }}>
        {["Update to P0", "Send weekly Slack update"].map((b) => (
          <div
            key={b}
            style={{
              border: `1.4px solid ${AMP.line}`,
              borderRadius: 999,
              padding: "9px 20px",
              fontSize: 19,
              fontWeight: 500,
              color: AMP.ink,
            }}
          >
            {b}
          </div>
        ))}
      </div>
    </div>
  );
};

export const AmplitudeMark: React.FC<{ size: number; draw?: number; color?: string }> = ({
  size,
  draw = 1,
  color = AMP.blue,
}) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 100 50" fill="none">
    <path
      d="M4 42 C 22 42, 24 8, 38 8 C 52 8, 50 42, 62 42 C 70 42, 72 30, 78 30"
      stroke={color}
      strokeWidth={7}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={draw - 1}
    />
  </svg>
);

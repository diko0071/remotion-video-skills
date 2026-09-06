import React from "react";
import { Img, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { SLACK_AVATARS, SLACK_CAST, SlackIcon } from "../../kit/slack-ui";
import { HuddleLine } from "./channel";
import { COPY, T } from "./timings";

const { sarah, ryze } = SLACK_CAST;

const Tile: React.FC<{ avatar: string; name: string; speaking?: boolean; style?: React.CSSProperties }> = ({ avatar, name, speaking, style }) => (
  <div
    style={{
      position: "relative",
      borderRadius: 18,
      overflow: "hidden",
      background: "#2b2f36",
      boxShadow: speaking ? "0 0 0 3px #2bac76" : "0 0 0 1px rgba(255,255,255,0.08)",
      ...style,
    }}
  >
    <Img src={staticFile(avatar)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <div style={{ position: "absolute", left: 16, bottom: 14, background: "rgba(0,0,0,0.55)", color: "#fff", fontSize: 15, fontWeight: 700, padding: "5px 10px", borderRadius: 8, display: "flex", alignItems: "center", gap: 7 }}>
      <SlackIcon name="microphone" size={13} color="#fff" />
      {name}
    </div>
  </div>
);

const Ctl: React.FC<{ icon: string; on?: boolean; red?: boolean; label?: string }> = ({ icon, on, red, label }) => (
  <div
    style={{
      height: 46,
      minWidth: 46,
      padding: label ? "0 16px" : 0,
      borderRadius: 12,
      background: red ? "#e01e5a" : on ? "#fff" : "rgba(255,255,255,0.12)",
      color: red ? "#fff" : on ? "#1a1d21" : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      fontSize: 14,
      fontWeight: 800,
    }}
  >
    <SlackIcon name={icon} size={20} color={red ? "#fff" : on ? "#1a1d21" : "#fff"} />
    {label}
  </div>
);

export const CallWindow: React.FC<{ frame: number; compact?: boolean; transcriptFade?: number }> = ({ frame, compact, transcriptFade = 1 }) => {
  const two = useSpringAt(T.tile2, SPRINGS.panel, 30);
  const ctl = useSpringAt(T.controls, SPRINGS.card, 26);
  const tr = useSpringAt(T.transcript, SPRINGS.panel, 32);
  const panelW = 560;
  const speakingSarah = Math.floor(frame / 40) % 2 === 0;
  const areaW = compact ? 1920 : 1920 - tr * panelW * transcriptFade;
  return (
    <div style={{ position: "absolute", inset: 0, background: "#1a1d21", fontFamily: "Lato, sans-serif", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: 0, right: 0, height: 56, display: "flex", alignItems: "center", padding: "0 24px", gap: 10, color: "#fff", fontWeight: 900, fontSize: 16 }}>
        <SlackIcon name="headphones" size={18} color="#fff" />
        Huddle · #marketing
        <span style={{ marginLeft: 10, fontSize: 13, color: "rgba(255,255,255,0.55)", fontWeight: 700 }}>02:14</span>
      </div>
      <div style={{ position: "absolute", left: 24, top: 70, width: areaW - 48, bottom: compact ? 24 : 100, display: "flex", gap: 16 }}>
        <Tile avatar={SLACK_AVATARS.dmitry} name="Dmitry" speaking={!speakingSarah} style={{ flex: 1 }} />
        <Tile
          avatar={sarah.avatar}
          name="Sarah"
          speaking={speakingSarah}
          style={{ flex: two, opacity: two, transform: `translateX(${(1 - two) * 80}px)`, minWidth: 0 }}
        />
      </div>
      {!compact ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            width: areaW,
            bottom: 24,
            display: "flex",
            justifyContent: "center",
            gap: 10,
            opacity: ctl,
            transform: `translateY(${(1 - ctl) * 40}px)`,
          }}
        >
          <Ctl icon="microphone" on />
          <Ctl icon="video" />
          <Ctl icon="canvas-browser" />
          <Ctl icon="emoji" />
          <Ctl icon="threads" on={tr > 0.5} label="Transcript" />
          <Ctl icon="close" red label="Leave" />
        </div>
      ) : null}
      {!compact ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: panelW,
            background: "#fff",
            transform: `translateX(${(1 - tr) * panelW}px)`,
            opacity: transcriptFade,
            borderLeft: "1px solid rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 20px", fontWeight: 900, fontSize: 15, color: "#1d1c1d", borderBottom: "1px solid #eee" }}>
            Live transcript
            <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: 4, background: "#e01e5a", marginLeft: 8 }} />
            <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#616061", fontWeight: 700 }}>
              <Img src={staticFile(ryze.avatar)} style={{ width: 18, height: 18, borderRadius: 4 }} />
              Ryze AI is listening
            </span>
          </div>
          <div style={{ padding: "8px 4px" }}>
            {COPY.lines.map((l, i) => (
              <HuddleLine key={i} who={l.who} text={l.text} at={T.transcript + 6 + i * 34} to={T.transcript + 6 + i * 34 + 60} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

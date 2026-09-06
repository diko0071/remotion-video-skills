import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { SLACK_AVATARS } from "../../kit/slack-ui";
import { type SettlePart, SettleLine } from "../../kit/settle-text";

const INK = "#171310";

const words = (line: string, from: number, step = 4): SettlePart[] =>
  line.split(" ").map((w, i) => ({ word: w, at: from + i * step }));

const ClusterAvatar: React.FC<{ avatar: string; index: number }> = ({ avatar, index }) => {
  const p = useSpringAt(26 + index * 5, SPRINGS.pop, 26);
  const big = index === 0;
  return (
    <Img
      src={staticFile(avatar)}
      style={{
        width: big ? 112 : 92,
        height: big ? 112 : 92,
        borderRadius: 26,
        boxShadow: big ? "0 0 0 4px #171310, 0 18px 40px rgba(0,0,0,0.18)" : "0 14px 32px rgba(0,0,0,0.14)",
        transform: `scale(${p}) translateY(${(1 - p) * 30}px)`,
        opacity: p,
        alignSelf: "center",
      }}
    />
  );
};

export const Beat: React.FC<{ lines: readonly [string, string]; cluster?: boolean; len: number }> = ({ lines, cluster, len }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [len - 14, len - 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const parts: SettlePart[] = [...words(lines[0], 2), { br: true }, ...words(lines[1], 2 + lines[0].split(" ").length * 4)];
  const avatars = [SLACK_AVATARS.ryze, SLACK_AVATARS.sarah, SLACK_AVATARS.dmitry, SLACK_AVATARS.marcus, SLACK_AVATARS.priya];
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <AbsoluteFill style={{ transform: cluster ? "translateY(60px)" : undefined }}>
        <SettleLine size={112} ink={INK} weight={800} maxWidth={1700} lineHeight={1.12} parts={parts} />
      </AbsoluteFill>
      {cluster ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 260, display: "flex", justifyContent: "center", gap: 18 }}>
          {avatars.map((a, i) => (
            <ClusterAvatar key={a} avatar={a} index={i} />
          ))}
        </div>
      ) : null}
      <AbsoluteFill style={{ background: "#fff", opacity: Math.max(interpolate(frame, [0, 10], [1, 0], { extrapolateRight: "clamp" }), out) }} />
    </AbsoluteFill>
  );
};

export const Endcard: React.FC<{ text: string; len: number }> = ({ text, len }) => {
  const frame = useCurrentFrame();
  const out = interpolate(frame, [len - 14, len - 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#fff" }}>
      <SettleLine size={104} ink={INK} weight={800} maxWidth={1700} lineHeight={1.15} parts={words(text, 4, 5)} />
      <AbsoluteFill style={{ background: "#fff", opacity: out }} />
    </AbsoluteFill>
  );
};

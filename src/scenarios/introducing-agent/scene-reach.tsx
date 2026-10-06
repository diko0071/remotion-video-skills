import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SANS } from "./font";
import { mix } from "./headline";
import { CUT, GREY, INK, PURPLE, r } from "./timings";

const ROWS = [
  { icon: "integrations/gmail.png", text: "ryze@get-ryze.ai", at: r(506) },
  { icon: "integrations/slack.svg", text: "@ryze", at: r(516) },
  { icon: "icons/ai/claude.png", text: "Ryze MCP", at: r(522) },
  { icon: "integrations/x.svg", text: "@ryze in Grok Bot", at: r(526) },
] as const;

const eo = Easing.out(Easing.cubic);
const clamp = (frame: number, a: number, b: number) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: eo });

export const ReachScene: React.FC = () => {
  const frame = useCurrentFrame();
  const base = CUT.reach;
  const tone = clamp(frame, r(494) - base, r(502) - base);
  const zoom = 1 + 0.06 * clamp(frame, r(554) - base, r(558) - base);
  const rowH = 108;
  let visible = 0;
  for (const row of ROWS) visible += clamp(frame, row.at - base, row.at - base + 6);
  const blockH = 120 + visible * rowH;
  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div style={{ position: "absolute", top: 540 - blockH / 2, width: 1300, fontFamily: SANS, transform: `scale(${zoom})`, transformOrigin: "50% 50%" }}>
        <div style={{ fontSize: 96, fontWeight: 400, color: mix(PURPLE, GREY, tone), letterSpacing: "-0.02em", opacity: clamp(frame, 0, 6), transform: `translateY(${(1 - clamp(frame, 0, 6)) * 12}px)`, height: 120 }}>and is always reachable</div>
        {ROWS.map((row, i) => {
          const p = clamp(frame, row.at - base, row.at - base + 6);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, height: rowH, fontSize: 84, fontWeight: 500, color: INK, letterSpacing: "-0.02em", opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
              <Img src={staticFile(row.icon)} style={{ width: 76, height: 76, objectFit: "contain" }} />
              {row.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

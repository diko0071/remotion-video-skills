import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Cursor } from "../../kit/cursor";
import { ramp } from "../../core/motion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { SLACK, SLACK_MSG } from "./claude-timings";

const { fontFamily: INTER } = loadFont();

const F = (t: number) => t - SLACK.from + SLACK.slide;

export const SlackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const move = interpolate(frame, [0, F(SLACK.land)], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const tc = { x: SLACK.tile.x + SLACK.tile.size / 2, y: SLACK.tile.y + SLACK.tile.size / 2 };
  const dx = SLACK.docFrom.x + (tc.x + 34 - SLACK.docFrom.x) * move;
  const dy = SLACK.docFrom.y + (tc.y + 26 - SLACK.docFrom.y) * move;
  const absorb = ramp(frame, F(SLACK.absorb[0]), F(SLACK.absorb[1]));
  const docAlpha = frame >= F(SLACK.land) && frame < F(SLACK.absorb[1]) ? 1 : 0;
  const logoDim = frame >= F(SLACK.land) && frame < F(SLACK.absorb[1]) ? 0.35 : 1;
  const badge = 1 - Math.pow(1 - ramp(frame, F(SLACK.badgeAt), F(SLACK.badgeAt) + 8), 3);
  const pressed = frame >= F(SLACK.land) - 2 && frame <= F(SLACK.land) + 2;
  const ex = 1 - Math.pow(1 - ramp(frame, F(SLACK.expand[0]), F(SLACK.expand[1])), 3);
  const c = SLACK.card;
  const boxX = SLACK.tile.x + (c.x - SLACK.tile.x) * ex;
  const boxY = SLACK.tile.y + (c.y - SLACK.tile.y) * ex;
  const boxW = SLACK.tile.size + (c.w - SLACK.tile.size) * ex;
  const boxH = SLACK.tile.size + (c.h - SLACK.tile.size) * ex;
  const radius = SLACK.tile.radius + (c.radius - SLACK.tile.radius) * ex;
  const iconSize = SLACK.tile.size + (c.icon - SLACK.tile.size) * ex;
  const pad = (c.h - c.icon) / 2;
  const iconLeft = 0 + (pad - 0) * ex;
  const iconTop = 0 + (pad - 0) * ex;
  const badgeAlpha = badge * (1 - ramp(frame, F(SLACK.expand[0]), F(SLACK.expand[0]) + 6));
  return (
    <AbsoluteFill style={{ background: SLACK.bg }}>
      <div style={{ position: "absolute", left: boxX, top: boxY, width: boxW, height: boxH, borderRadius: radius, background: "#FFFFFF", boxShadow: `0 24px 50px rgba(20,30,60,${0.25 - 0.1 * ex})`, transform: `scale(${pressed ? 0.96 : 1})`, overflow: "visible" }}>
        <div style={{ position: "absolute", left: iconLeft, top: iconTop, width: iconSize, height: iconSize, borderRadius: SLACK.tile.radius * (iconSize / SLACK.tile.size), background: "#1B1D21", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Img src={staticFile("integrations/slack.svg")} style={{ width: iconSize * 0.52, height: iconSize * 0.52, display: "block", opacity: logoDim }} />
        </div>
        {frame >= F(SLACK.badgeAt) && badgeAlpha > 0.01 ? (
          <div style={{ position: "absolute", right: -16, top: -16, width: 60, height: 60, borderRadius: 30, background: "#FF3B30", color: "#FFFFFF", fontFamily: INTER, fontSize: 34, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.4 + 0.6 * badge})`, opacity: badgeAlpha, boxShadow: "0 6px 16px rgba(255,59,48,0.35)" }}>
            2
          </div>
        ) : null}
        {ex > 0.3 ? (
          <div style={{ position: "absolute", left: pad + c.icon + 44, top: 0, bottom: 0, right: 48, display: "flex", flexDirection: "column", justifyContent: "center", opacity: ramp(frame, F(SLACK.lines[0]) - 4, F(SLACK.lines[0]) + 4), fontFamily: INTER, color: "#1B1D21" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 36, fontWeight: 600, marginBottom: 10, letterSpacing: "-0.01em" }}>
              <span>{SLACK_MSG.title}</span>
              <span style={{ fontSize: 30, fontWeight: 400, color: "#8A8A8E" }}>{SLACK_MSG.when}</span>
            </div>
            {SLACK_MSG.lines.map((l, i) => {
              const p = ramp(frame, F(SLACK.lines[i + 1]) - 2, F(SLACK.lines[i + 1]) + 6);
              return (
                <div key={i} style={{ fontSize: 29, lineHeight: 1.4, opacity: p, transform: `translateY(${(1 - p) * 6}px)` }}>
                  {l}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      {docAlpha > 0 ? (
        <div style={{ position: "absolute", left: dx - 71, top: dy - 95, width: 142, height: 190, transform: `scale(${1 - 0.55 * absorb})`, filter: "drop-shadow(0 14px 26px rgba(20,30,60,0.3))", opacity: docAlpha }}>
          <Img src={staticFile("integrations/google-docs.svg")} style={{ width: 142, height: 190, display: "block" }} />
        </div>
      ) : null}
      <Cursor
        scale={2.2}
        appearAt={F(SLACK.land)}
        stops={[
          { x: tc.x + 44, y: tc.y + 46, at: F(SLACK.land), click: true },
          { x: tc.x + 44, y: tc.y + 46, at: F(SLACK.cursorOut) },
          { x: 1500, y: 1120, at: F(SLACK.cursorOut) + 14 },
        ]}
      />
    </AbsoluteFill>
  );
};

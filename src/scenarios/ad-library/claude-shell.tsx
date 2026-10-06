import React from "react";
import { AbsoluteFill, Easing, interpolateColors, useCurrentFrame } from "remotion";
import { grotesk, Starburst } from "../../kit/claude-ui";
import "../../kit/claude-ui/claude.css";
import { ComposerBody } from "./composer-body";
import { composerRect, tileCenters } from "./geometry";
import { Layout, useLayout } from "./layout";
import { arrivals } from "./stream";
import { CLAUDE_ACCENT, CLAUDE_ICON_FILL, iconShadow } from "./theme";
import { clamp01, glide, lerp, ramp, T } from "./timeline";

export const shellAt = (l: Layout, f: number) => {
  const tile = tileCenters(l).claude;
  const comp = composerRect(l);
  const size = l.tile.size;
  const morph = glide(f, T.morph, 140);
  const bump = Math.min(0.12, arrivals(f) * 0.06) * (1 - morph);
  const float = Math.sin(f / 16) * 7;
  return {
    morph,
    bump,
    cx: lerp(tile.x, comp.x + comp.w / 2, morph),
    cy: lerp(tile.y + float, comp.y + comp.h / 2, morph),
    w: lerp(size, comp.w, morph) * (1 + bump),
    h: lerp(size, comp.h, morph) * (1 + bump),
    radius: lerp(size * 0.24, 20 * l.composerUi, morph),
  };
};

const starAt = (l: Layout, f: number) => {
  const s = shellAt(l, f);
  const comp = composerRect(l);
  const lift = glide(f, T.morph + 3, 130);
  return {
    lift,
    x: lerp(s.cx, l.vis.cx, lift),
    y: lerp(s.cy, comp.y - 48 * l.composerUi, lift),
    size: lerp(l.tile.size * 0.56 * (1 + s.bump * 1.5), 40 * l.composerUi, lift),
  };
};

export const ClaudeShell: React.FC = () => {
  const f = useCurrentFrame();
  const l = useLayout();
  const ui = l.composerUi;
  const s = shellAt(l, f);
  const star = starAt(l, f);
  const drop = ramp(f, T.bubble, 10, Easing.in(Easing.cubic));
  const starOut = ramp(f, T.send - 2, 6);
  const content = clamp01((s.morph - 0.5) / 0.4);
  const tile = 1 - clamp01(s.morph * 2.4);
  if (f > T.bubble + 12) return null;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: s.cx - s.w / 2,
          top: s.cy - s.h / 2,
          width: s.w,
          height: s.h,
          zIndex: 7,
          opacity: 1 - drop,
          transform: `translateY(${drop * 300}px)`,
        }}
      >
        <div
          className="claude-ui"
          style={{
            position: "relative",
            width: s.w / ui,
            height: s.h / ui,
            transform: `scale(${ui})`,
            transformOrigin: "0 0",
            background: "transparent",
            fontFamily: grotesk,
          }}
        >
          <div
            className="cl-composer"
            style={{
              position: "relative",
              width: s.w / ui,
              height: s.h / ui,
              borderRadius: s.radius / ui,
              overflow: "hidden",
              boxShadow: `0 4px 20px rgba(0,0,0,${0.035 * s.morph}), 0 0 0 0.5px rgba(20,20,19,${0.12 * s.morph}), ${iconShadow(tile, 1 / ui, "150,58,30")}`,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: CLAUDE_ICON_FILL,
                boxShadow: "inset 0 2px 0 rgba(255,255,255,0.28)",
                opacity: tile,
              }}
            />
            <div style={{ opacity: content, transform: `translateY(${(1 - content) * 10}px)` }}>
              <ComposerBody f={f} />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: star.x - star.size / 2,
          top: star.y - star.size / 2,
          width: star.size,
          height: star.size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: interpolateColors(clamp01(star.lift * 1.6), [0, 1], ["#ffffff", CLAUDE_ACCENT]),
          zIndex: 8,
          opacity: 1 - starOut,
          transform: `rotate(${f * 1.1}deg)`,
        }}
      >
        <Starburst size={star.size} />
      </div>
    </AbsoluteFill>
  );
};

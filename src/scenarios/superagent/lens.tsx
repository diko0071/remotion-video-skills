import React from "react";
import { Easing, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { LENS } from "./timings";
import { lineLayout, TypeLine } from "./type-line";

const ICONS: Record<string, string> = { gemini: "ai/gemini.png", claude: "ai/claude.png", perplexity: "ai/perplexity.webp", openai: "ai/chatgpt.png" };

const IconTile: React.FC<{ id: string }> = ({ id }) => (
  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 96, height: 96, borderRadius: 24, background: "#FFFFFF", boxShadow: "0 6px 18px rgba(0,0,0,0.12)" }}>
    <Img src={staticFile(ICONS[id])} style={{ width: 54, height: 54, display: "block", objectFit: "contain" }} />
  </span>
);

export const Lens: React.FC = () => {
  const frame = useCurrentFrame();
  const enter = ramp(frame, LENS.enter[0], LENS.enter[1], Easing.out(Easing.cubic));
  const exit = ramp(frame, LENS.exit[0], LENS.exit[1], Easing.in(Easing.cubic));
  const exitPrev = ramp(frame - 1, LENS.exit[0], LENS.exit[1], Easing.in(Easing.cubic));
  const L = lineLayout(frame);
  const cx = (frame < LENS.enter[1] ? 960 : L.aiCenter) - exit * 700;
  const cy = LENS.cy + (1 - enter) * 780 + exit * 800;
  const current = LENS.cycle.find((c) => frame >= c.from && frame < c.to);
  if (frame < LENS.enter[0] || frame > LENS.exit[1]) return null;
  const r = LENS.r;
  return (
    <DirectionalBlur id="sa-lens" y={(Math.abs(enter - (frame > LENS.enter[0] ? ramp(frame - 1, LENS.enter[0], LENS.enter[1], Easing.out(Easing.cubic)) : 0)) * 780 + Math.abs(exit - exitPrev) * 800) * 0.3} style={{ position: "absolute", left: 0, top: 0 }}>
      <div style={{ position: "absolute", left: cx - r, top: cy - r, width: r * 2, height: r * 2 }}>
        <div style={{ position: "absolute", left: r - 34, top: r * 2 - 40, width: 68, height: 360, transformOrigin: "34px 0", transform: "rotate(-42deg)", borderRadius: 34, background: "linear-gradient(90deg, #0E0E0E, #3A3A3A 45%, #0E0E0E)" }} />
        <div style={{ position: "absolute", left: r - 44, top: r * 2 - 52, width: 88, height: 74, transformOrigin: "44px 0", transform: "rotate(-42deg)", borderRadius: 14, background: "linear-gradient(90deg, #6E6E6E, #F2F2F2 40%, #8A8A8A 70%, #4A4A4A)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", background: "#F6F4E8" }}>
          <div style={{ position: "absolute", left: -(cx - r), top: -(cy - r), width: 1920, height: 1080, transform: `scale(${LENS.magnify})`, transformOrigin: `${cx}px ${cy}px` }}>
            <TypeLine aiOverride={current ? <IconTile id={current.id} /> : undefined} />
          </div>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "radial-gradient(circle at 35% 30%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 45%)" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", boxShadow: "inset 0 0 0 6px #202020, inset 0 0 0 9px rgba(255,255,255,0.75), 0 20px 50px rgba(0,0,0,0.18)" }} />
      </div>
    </DirectionalBlur>
  );
};

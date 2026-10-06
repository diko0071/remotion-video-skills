import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { HEADLINE_FONT } from "../../kit/headline";
import { RiseLetters } from "../../kit/rise-letters";
import { CORAL, GROUND, HOOK, INK } from "./timings";

const SIZE = 118;

const YearDigit: React.FC = () => {
  const frame = useCurrentFrame();
  const p = ramp(frame, HOOK.flip, HOOK.flip + HOOK.flipLen, Easing.inOut(Easing.cubic));
  const prev = ramp(frame - 1, HOOK.flip, HOOK.flip + HOOK.flipLen, Easing.inOut(Easing.cubic));
  const blur = Math.abs(p - prev) * 60;
  const inP = ramp(frame, HOOK.line1 + 10, HOOK.line1 + 17, Easing.out(Easing.cubic));
  return (
    <span style={{ display: "inline-block", position: "relative", height: "1.05em", overflow: "hidden", verticalAlign: "top", opacity: inP, transform: `translateY(${(1 - inP) * 0.35}em)` }}>
      <span style={{ display: "block", transform: `translateY(${-p * 1.05}em)`, filter: blur > 0.3 ? `blur(${blur}px)` : undefined }}>
        <span style={{ display: "block", height: "1.05em", color: INK }}>5</span>
        <span style={{ display: "block", height: "1.05em", color: CORAL }}>6</span>
      </span>
    </span>
  );
};

const FlipTile: React.FC = () => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(4, SPRINGS.pop, 16);
  const turn = ramp(frame, HOOK.flip, HOOK.flip + HOOK.flipLen, Easing.inOut(Easing.cubic));
  const angle = turn * 180;
  const back = angle > 90;
  const glow = ramp(frame, HOOK.flip + HOOK.flipLen, HOOK.flip + HOOK.flipLen + 8) * (1 - ramp(frame, HOOK.flip + 30, HOOK.flip + 50));
  return (
    <span style={{ display: "inline-block", width: HOOK.tile + 34, height: HOOK.tile, verticalAlign: "-0.28em", perspective: 900 }}>
      <span style={{ display: "block", marginLeft: 34, width: HOOK.tile, height: HOOK.tile, borderRadius: 30, overflow: "hidden", transform: `scale(${pop}) rotateY(${back ? angle - 180 : angle}deg)`, opacity: Math.min(1, pop * 1.5), boxShadow: `0 18px 40px rgba(23,19,16,0.16), 0 0 0 ${5 * glow}px rgba(193,95,60,${glow})` }}>
        <Img src={staticFile(back ? "sell-agents/meme-gpu.jpg" : "sell-agents/meme-human.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </span>
    </span>
  );
};

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const out = ramp(frame, HOOK.out[0], HOOK.out[1], Easing.in(Easing.cubic));
  const outPrev = ramp(frame - 1, HOOK.out[0], HOOK.out[1], Easing.in(Easing.cubic));
  const push = interpolate(frame, [0, HOOK.len], [1, 1.05]);
  const T = HOOK.line2;
  return (
    <AbsoluteFill style={{ background: GROUND, fontFamily: HEADLINE_FONT, color: INK }}>
      <DirectionalBlur id="sa-hook-out" x={Math.abs(out - outPrev) * 1900 * 0.28} style={{ position: "absolute", inset: 0, transform: `translateX(${-out * 1900}px) scale(${push})` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 410, transform: "translateY(-50%)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: SIZE, fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05, whiteSpace: "pre" }}>
          <RiseLetters text={["Your", " customer", " in", " 202"]} from={[HOOK.line1, HOOK.line1 + 3, HOOK.line1 + 6, HOOK.line1 + 9]} len={7} rise={0.35} blur={12} />
          <YearDigit />
          <FlipTile />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 640, transform: "translateY(-50%)", textAlign: "center", fontSize: SIZE, fontWeight: 500, letterSpacing: "-0.02em", whiteSpace: "pre" }}>
          <RiseLetters text={["Sell", " what", " AI", " agents", " want."]} from={[T, T + 2, T + 4, T + 6, T + 9]} len={7} rise={0.35} blur={12} letterStyle={(_, i) => (i === 2 || i === 3 ? { color: CORAL } : {})} />
        </div>
      </DirectionalBlur>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Lockup } from "../../kit/lockup";
import { Deco } from "./deco";
import { SANS } from "./font";
import { Headline, textWidth } from "./headline";
import { BLUE, CUT, GREEN, GROUND, INK, ORANGE, PINK, r } from "./timings";

const SURFACES = [
  { icon: "integrations/slack.svg", word: "Slack", at: r(977) },
  { icon: "icons/ai/claude.png", word: "Claude", at: r(986) },
  { icon: "integrations/x.svg", word: "Grok Bot", at: r(1001) },
  { icon: "integrations/gmail.png", word: "Gmail", at: r(1014) },
] as const;

const back = Easing.out(Easing.back(1.6));
const clamp = (frame: number, a: number, b: number, easing = Easing.out(Easing.cubic)) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

export const WithinScene: React.FC = () => {
  const frame = useCurrentFrame();
  const b = CUT.within;
  let idx = -1;
  for (let i = 0; i < SURFACES.length; i++) if (frame >= SURFACES[i].at - b) idx = i;
  const cur = idx >= 0 ? SURFACES[idx] : null;
  const swap = cur ? clamp(frame, cur.at - b, cur.at - b + 6, back) : 0;
  const line2 = clamp(frame, r(977) - b, r(983) - b);
  return (
    <AbsoluteFill style={{ fontFamily: SANS, color: INK }}>
      <Headline
        size={140}
        y={540 - line2 * 90}
        lines={[{ at: 0, words: [{ text: "all" }, { text: "inside" }, { text: "your", at: r(970) - b }, { text: "own", at: r(970) - b }], decos: [{ kind: "tick", color: ORANGE, at: r(980) - b, word: 1, rotate: 90, dx: 6 }, { kind: "arc", color: PINK, at: r(991) - b, word: 3, rotate: 60 }, { kind: "under", color: GREEN, at: r(1003) - b, word: 0 }] }]}
      />
      {cur ? (
        <div style={{ position: "absolute", left: 0, right: 0, top: 610, display: "flex", justifyContent: "center", alignItems: "center", gap: 34, fontSize: 140, fontWeight: 500, letterSpacing: "-0.02em", transform: `scale(${Math.max(0, swap)})`, opacity: swap > 0 ? 1 : 0 }}>
          <Img src={staticFile(cur.icon)} style={{ width: 130, height: 130, objectFit: "contain" }} />
          <span style={{ position: "relative", display: "inline-block" }}>
            {cur.word}
            <Deco kind="under" color={BLUE} at={cur.at - b + 4} x={0} y={150} width={textWidth(cur.word, 140, 500)} />
          </span>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

const URL = "get-ryze.ai";

export const TryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const b = CUT.tryAt;
  const p = clamp(frame, 0, 6);
  const typed = Math.min(URL.length, Math.floor(Math.max(0, frame - (r(1032) - b)) / 1.5));
  const caretOn = frame >= r(1030) - b && frame < r(1052) - b;
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", fontFamily: SANS, color: INK }}>
      <div style={{ fontSize: 120, fontWeight: 500, letterSpacing: "-0.02em", whiteSpace: "pre", opacity: p, transform: `translateY(${(1 - p) * 16}px)` }}>
        try at {URL.slice(0, typed)}
        <span style={{ display: "inline-block", width: 4, height: 110, background: INK, marginLeft: 8, verticalAlign: "-14px", opacity: caretOn && Math.floor(frame / 8) % 2 === 0 ? 1 : 0 }} />
      </div>
    </AbsoluteFill>
  );
};

export const LockupScene: React.FC = () => <Lockup mark="ryze-sun.png" word="Ryze AI" background={GROUND} ink={INK} />;

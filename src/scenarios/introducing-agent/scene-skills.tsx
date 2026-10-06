import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { DirectionalBlur } from "../../kit/directional-blur";
import { SANS } from "./font";
import { Headline } from "./headline";
import { BLUE, CUT, GREEN, INK, ORANGE, PINK, r } from "./timings";

const SKILLS = [
  { icon: "integrations/slack.svg", label: "Slack etiquette", x: 250, y: 420, rot: -6, at: r(916) },
  { icon: "integrations/google-docs.svg", label: "Slop detector", x: 1180, y: 380, rot: 4, at: r(919) },
  { icon: "integrations/google-analytics.svg", label: "Key KPIs", x: 1450, y: 300, rot: 3, at: r(922) },
  { icon: "meta-ads.svg", label: "Creative specs", x: 1120, y: 560, rot: -5, at: r(925) },
  { icon: "integrations/github.svg", label: "Blog publishing", x: 150, y: 640, rot: 3, at: r(928) },
  { icon: "integrations/hubspot.svg", label: "Lead scoring", x: 1400, y: 470, rot: -8, at: r(934) },
  { icon: "integrations/wordpress.svg", label: "Formula guide", x: 560, y: 560, rot: 7, at: r(937) },
  { icon: "integrations/google-drive.svg", label: "Brand voice", x: 860, y: 520, rot: -3, at: r(941) },
  { icon: "integrations/google-search-console.svg", label: "Keyword research", x: 80, y: 500, rot: 5, at: r(944) },
  { icon: "integrations/shopify-color.svg", label: "Product catalog", x: 700, y: 640, rot: -7, at: r(947) },
  { icon: "integrations/ahrefs.svg", label: "Backlink rules", x: 1030, y: 680, rot: 4, at: r(949) },
  { icon: "integrations/klaviyo.svg", label: "Email cadence", x: 300, y: 720, rot: -4, at: r(951) },
  { icon: "integrations/google-ads.webp", label: "Bid strategy", x: 1300, y: 640, rot: 6, at: r(955) },
  { icon: "integrations/linkedin-ads.svg", label: "Candidate filter", x: 1560, y: 560, rot: -6, at: r(958) },
  { icon: "integrations/gmail.png", label: "CEO tone of voice", x: 640, y: 380, rot: -4, at: r(963) },
  { icon: "integrations/webflow.svg", label: "Quarterly reviews", x: 380, y: 300, rot: 8, at: r(967) },
  { icon: "integrations/posthog.svg", label: "Retention playbook", x: 1000, y: 260, rot: -5, at: r(970) },
] as const;

const back = Easing.out(Easing.back(1.7));

export const SkillsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const base = CUT.skills;
  const dim = interpolate(frame, [r(918) - base, r(924) - base], [1, 0.32], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitAt = r(960) - base;
  const ex = interpolate(frame, [exitAt, exitAt + 5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  return (
    <AbsoluteFill>
      <div style={{ opacity: dim * (1 - ex) }}>
        <Headline
          size={116}
          y={520}
          lines={[
            { at: 0, words: [{ text: "Ryze" }, { text: "has" }, { text: "access" }, { text: "to" }, { text: "all" }], decos: [{ kind: "tick", color: ORANGE, at: r(907) - base, word: 0, rotate: 90, dx: 6 }, { kind: "under", color: GREEN, at: r(920) - base, word: 4 }] },
            { at: r(898) - base, words: [{ text: "brand" }, { text: "knowledge" }, { text: "and" }, { text: "skills" }], decos: [{ kind: "arc", color: PINK, at: r(912) - base, word: 3, rotate: 60 }, { kind: "under", color: BLUE, at: r(926) - base, word: 1, chars: [0, 4] }] },
          ]}
        />
      </div>
      <DirectionalBlur id="skills-exit" x={ex * 30} style={{ position: "absolute", inset: 0, transform: `scale(${1 - ex * 0.5})`, transformOrigin: "0 0", opacity: 1 - ex }}>
        {SKILLS.map((k, i) => {
          const p = interpolate(frame, [k.at - base, k.at - base + 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: back });
          return (
            <div key={i} style={{ position: "absolute", left: k.x, top: k.y, transform: `rotate(${k.rot}deg) scale(${Math.max(0, p)}) translateY(${(1 - p) * 30}px)`, opacity: p > 0 ? 1 : 0 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 14, background: "#FFF", border: "1px solid #E4E4E4", boxShadow: "0 10px 30px rgba(23,19,16,0.12)", borderRadius: 12, padding: "16px 30px 16px 20px", fontFamily: SANS, fontSize: 40, fontWeight: 500, color: INK, whiteSpace: "nowrap" }}>
                <Img src={staticFile(k.icon)} style={{ width: 40, height: 40, objectFit: "contain" }} />
                {k.label}
              </span>
            </div>
          );
        })}
      </DirectionalBlur>
    </AbsoluteFill>
  );
};

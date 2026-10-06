import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, bump, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P } from "../../kit/product-ui";
import { ENGINES, EngineRow, PromptRow } from "../../kit/ryze-ui/pages/geo-queries";
import { GlobeIcon } from "../../kit/ryze-ui/icons";
import { COMPETITORS, NAMED, PROMPTS, SOURCES } from "./data";
import { K_PROMPTS as K } from "./timings";

const S = 1.9;
const W = 780;
const DARK = [false, false, false, false] as const;
const HEAD = ["", "Prompt", "Mentioned", "Position", "Assistants", "Last run", ""] as const;
const ROW_PAD = "16px 16px";
const H_A = 40 + 18 + 44 + 22 + 45 + PROMPTS.length * 53;
const S_B = 2.0;
const W_B = 640;
const H_B = 380;
const SWAP = K.namedLine - 4;

const SiteChip: React.FC<{ site: string; at: number; tone?: "you" | "plain" }> = ({ site, at, tone = "plain" }) => (
  <Pop at={at} from={0.7} rise={8}>
    <span className="pg-card" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px", fontFamily: FONT, fontSize: 13, fontWeight: 600, color: tone === "you" ? P.brandDeep : P.fg, whiteSpace: "nowrap" }}>
      <span style={{ display: "flex", color: tone === "you" ? P.brandDeep : P.mutedFg }}>{GlobeIcon({ size: 14 })}</span>
      {site}
    </span>
  </Pop>
);

const EngineTile: React.FC<{ i: number; at: number }> = ({ i, at }) => {
  const f = useCurrentFrame();
  const glow = bump(f, at);
  const e = ENGINES[i];
  return (
    <Pop at={at - 2} from={0.5} rise={10}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 12px 7px 8px", borderRadius: P.radius, background: P.card, boxShadow: `0 0 0 1px rgba(15,23,42,0.1)${glow > 0.01 ? `, 0 0 0 ${3 * glow}px color-mix(in srgb, ${P.brand} ${45 * glow}%, transparent)` : ""}`, fontFamily: FONT, fontSize: 13, fontWeight: 600, color: P.fg }}>
        <Img src={staticFile(e.icon)} style={{ width: 22, height: 22, objectFit: "contain" }} />
        {e.label}
      </span>
    </Pop>
  );
};

const NamedRow: React.FC<{ i: number }> = ({ i }) => {
  const f = useCurrentFrame();
  const n = NAMED[i];
  const you = "you" in n && n.you;
  const hl = you ? ramp(f, K.named + 10, K.named + 18) : ramp(f, K.competitor - 2, K.competitor + 6) * (i === 0 ? 1 : 0);
  return (
    <Pop at={SWAP + 8 + i * 4} from={0.96} rise={8}>
      <div style={{ width: W_B - 32, height: 44, display: "flex", alignItems: "center", gap: 12, borderTop: i === 0 ? "none" : `1px solid ${P.border}`, background: `color-mix(in srgb, ${you ? P.brand : "#f43f5e"} ${10 * hl}%, transparent)`, fontFamily: FONT, padding: "0 8px", boxSizing: "border-box" }}>
        <span style={{ width: 22, fontSize: 13, fontWeight: 700, color: P.mutedFg, fontVariantNumeric: "tabular-nums" }}>#{i + 1}</span>
        <span style={{ flex: 1, fontSize: 14, fontWeight: you ? 700 : 500, color: you ? P.brandDeep : P.fg }}>{n.site}</span>
        <span style={{ fontSize: 12, fontWeight: 600, color: you ? P.brandDeep : P.mutedFg }}>{you ? "You" : "Competitor"}</span>
      </div>
    </Pop>
  );
};

export const PromptsScene: React.FC = () => {
  const f = useCurrentFrame();
  const out = ramp(f, SWAP - 2, SWAP + 6);
  const bIn = useSpringAt(SWAP + 2, SPRINGS.card, 14);
  const lit = f >= K.refresh - 4;
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={4} text="It finds what people ask AI" at={-8} out={SWAP} keepEyebrow />
        {f >= SWAP ? <StepTitle step={4} text="Who gets named, and from which sources" at={SWAP + 2} eyebrowAt={-100} /> : null}
        <div style={{ position: "absolute", inset: 0, opacity: 1 - out, transform: `translateY(${-40 * out}px)` }}>
          <Zoom w={W} s={S} top={zoneTop(H_A * S)}>
            <div style={{ position: "relative", width: W }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, height: 40, fontFamily: FONT }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: P.mutedFg, opacity: ramp(f, K.competitors - 6, K.competitors) }}>Competitors</span>
                {COMPETITORS.map((c, i) => (
                  <SiteChip key={c} site={c} at={K.competitors - 4 + i * 3} />
                ))}
              </div>
              <div style={{ marginTop: 18, display: "flex", justifyContent: "center", gap: 12, height: 44 }}>
                {ENGINES.map((e, i) => (
                  <EngineTile key={e.key} i={i} at={K.engines[i]} />
                ))}
              </div>
              <div style={{ marginTop: 22 }}>
                <Pop at={K.questions - 6} from={0.94} rise={10}>
                  <div className="pg-card" style={{ width: W, fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)", overflow: "hidden" }}>
                    <div className="gq-row gq-thead" style={{ padding: "13px 16px" }}>
                      {HEAD.map((h, i) => (
                        <span key={`${h}-${i}`} className={i >= 2 && i <= 5 ? "gq-num" : undefined}>
                          {h}
                        </span>
                      ))}
                    </div>
                    {PROMPTS.map((p, i) => (
                      <Pop key={p.text} at={K.questions + i * 4} from={0.96} rise={8}>
                        <div style={{ width: W }}>
                          <PromptRow prompt={lit ? p : { ...p, engines: [...DARK], position: null }} style={{ padding: ROW_PAD }} />
                        </div>
                      </Pop>
                    ))}
                  </div>
                </Pop>
              </div>
            </div>
          </Zoom>
        </div>
        <div style={{ position: "absolute", inset: 0, opacity: bIn, transform: `translateY(${40 * (1 - bIn)}px)` }}>
          <Zoom w={W_B} s={S_B} top={zoneTop(H_B * S_B)}>
            <div className="pg-card" style={{ width: W_B, height: H_B, boxSizing: "border-box", padding: "0 16px", fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
              <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${P.border}` }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: P.fg }}>“{PROMPTS[0].text}”</span>
                <EngineRow engines={PROMPTS[0].engines} />
              </div>
              <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: P.mutedFg }}>Named in answers</div>
              <div style={{ marginTop: 6 }}>
                {NAMED.map((n, i) => (
                  <NamedRow key={n.site} i={i} />
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: P.mutedFg, opacity: ramp(f, K.sources - 6, K.sources) }}>Sources cited</div>
              <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                {SOURCES.map((s, i) => (
                  <SiteChip key={s} site={s} at={K.sources - 2 + i * 3} />
                ))}
              </div>
            </div>
          </Zoom>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

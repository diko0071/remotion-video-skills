import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P } from "../../kit/product-ui";
import { UserMessage } from "../../kit/ryze-ui/message";
import { CreativeTile } from "../../kit/ryze-ui/pages/creatives";
import { CREATIVE_META, CREATIVE_PROMPT, NEW_CREATIVE, WINNING_TEMPLATE, YOUR_VERSION } from "./data";
import { K_CREATIVES as K } from "./timings";

const S = 1.8;
const W = 760;
const TILE = 240;
const H = 60 + 18 + 380;
const TOP = zoneTop(H * S);
const SWAP = K.start - 6;
const META_AT = [K.hook, K.image, K.size] as const;

export const CreativesScene: React.FC = () => {
  const f = useCurrentFrame();
  const out = ramp(f, SWAP - 2, SWAP + 6);
  const bIn = useSpringAt(SWAP + 2, SPRINGS.card, 14);
  const ready = f >= K.makes + 12;
  const yours = f >= K.winning + 8;
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <StepTitle step={1} text="Creatives on request" at={-8} out={SWAP} keepEyebrow />
      {f >= SWAP ? <StepTitle step={1} text="Or start from a winning ad" at={SWAP + 2} eyebrowAt={-100} /> : null}
      <div style={{ position: "absolute", inset: 0, opacity: 1 - out, transform: `translateY(${-40 * out}px)` }}>
        <Zoom w={W} s={S} top={TOP}>
          <div style={{ width: W, fontFamily: FONT }}>
            <Pop at={2} from={0.92} rise={10}>
              <div style={{ width: W }}>
                <UserMessage>{CREATIVE_PROMPT}</UserMessage>
              </div>
            </Pop>
            <div style={{ marginTop: 18, display: "flex", gap: 24, alignItems: "flex-start" }}>
              <Pop at={8} from={0.9} rise={12}>
                <div style={{ width: TILE }}>
                  <CreativeTile creative={{ ...NEW_CREATIVE, status: ready ? "completed" : "generating" }} />
                </div>
              </Pop>
              <div className="pg-card" style={{ flex: 1, padding: "8px 18px", boxShadow: "0 0 0 1px rgba(15,23,42,0.1)", opacity: ramp(f, 10, 16) }}>
                {CREATIVE_META.map((m, i) => (
                  <div key={m.label} style={{ width: W - TILE - 24 - 36, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: i === 0 ? "none" : `1px solid ${P.border}` }}>
                    <span style={{ fontSize: 13, color: P.mutedFg }}>{m.label}</span>
                    <span style={{ position: "relative", display: "inline-block" }}>
                      <span style={{ position: "absolute", right: 0, top: "50%", width: 110, height: 9, marginTop: -4.5, borderRadius: 2, background: "rgba(122,114,106,0.16)", opacity: 1 - ramp(f, META_AT[i] - 2, META_AT[i] + 4) }} />
                      <Pop at={META_AT[i] - 2} from={0.94} rise={8}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: P.fg }}>{m.value}</span>
                      </Pop>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Zoom>
      </div>
      <div style={{ position: "absolute", inset: 0, opacity: bIn, transform: `translateY(${40 * (1 - bIn)}px)` }}>
        <Zoom w={W} s={S} top={TOP + 40}>
          <div style={{ width: W, display: "flex", alignItems: "center", justifyContent: "center", gap: 36, fontFamily: FONT }}>
            <Pop at={K.winning - 4} from={0.9} rise={12}>
              <div style={{ width: TILE, display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: P.mutedFg }}>Winning ad in your niche</span>
                <Img src={staticFile(`ad-templates/${WINNING_TEMPLATE.file}`)} style={{ width: TILE, height: TILE * 1.25, objectFit: "cover", objectPosition: "50% 30%", borderRadius: P.radius, boxShadow: "0 0 0 1px rgba(15,23,42,0.1)" }} />
              </div>
            </Pop>
            <svg width={60} height={24} viewBox="0 0 60 24" style={{ opacity: ramp(f, K.winning + 4, K.winning + 10) }}>
              <path d="M2 12h52m-10-9 10 9-10 9" fill="none" stroke={P.brand} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Pop at={K.winning + 8} from={0.9} rise={12}>
              <div style={{ width: TILE, display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: P.brandDeep }}>Your version</span>
                <CreativeTile creative={{ ...YOUR_VERSION, status: yours && f >= K.yours - 2 ? "completed" : "generating" }} />
              </div>
            </Pop>
          </div>
        </Zoom>
      </div>
    </AbsoluteFill>
  );
};

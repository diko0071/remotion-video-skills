import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, bump, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P } from "../../kit/product-ui";
import { CompetitorAdCard, CompetitorChips } from "../../kit/ryze-ui/pages/competitor-ads";
import { ADS_LONGEST, ADS_NEWEST, ALERT_BRAND, BRANDS } from "./data";
import { K_COMP as K } from "./timings";

const S = 1.5;
const CARD = 180;
const GAP = 14;
const W = CARD * 4 + GAP * 3;
const H = 40 + 14 + 40 + 16 + 24 + 300;
const TOP = zoneTop(H * S);
const PLATFORMS = [
  { label: "Google", icon: "integrations/google-ads.webp" },
  { label: "Meta", icon: "integrations/meta-ads.svg" },
  { label: "LinkedIn", icon: "integrations/linkedin-ads.svg" },
] as const;
const SWAP_SORT = K.sort + 4;
const SWAP_ALERT = K.email - 6;

const PlatformTile: React.FC<{ i: number }> = ({ i }) => {
  const f = useCurrentFrame();
  const p = PLATFORMS[i];
  const glow = bump(f, K.platforms[i]);
  return (
    <Pop at={6 + i * 2} from={0.6} rise={6}>
      <span className="pg-card" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px 6px 8px", fontFamily: FONT, fontSize: 13, fontWeight: 600, color: P.fg, boxShadow: `0 0 0 1px rgba(15,23,42,0.1)${glow > 0.01 ? `, 0 0 0 ${3 * glow}px color-mix(in srgb, ${P.brand} ${45 * glow}%, transparent)` : ""}` }}>
        <Img src={staticFile(p.icon)} style={{ width: 18, height: 18, objectFit: "contain" }} />
        {p.label}
      </span>
    </Pop>
  );
};

export const CompetitorsScene: React.FC = () => {
  const f = useCurrentFrame();
  const sorted = f >= SWAP_SORT;
  const swap = ramp(f, SWAP_SORT - 4, SWAP_SORT + 6);
  const alert = useSpringAt(SWAP_ALERT, SPRINGS.card, 16);
  const brands = BRANDS.map((b) => (b.name === ALERT_BRAND.name ? { ...b, notify: f >= K.email } : b));
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <StepTitle step={2} text="See every ad your competitors run" at={-8} out={SWAP_SORT - 2} keepEyebrow />
      {f >= SWAP_SORT - 2 && f < SWAP_ALERT ? <StepTitle step={2} text="See what actually works" at={SWAP_SORT} out={SWAP_ALERT - 2} keepEyebrow eyebrowAt={-100} /> : null}
      {f >= SWAP_ALERT - 2 ? <StepTitle step={2} text="Know when they launch something new" at={SWAP_ALERT} eyebrowAt={-100} /> : null}
      <Zoom w={W} s={S} top={TOP}>
        <div style={{ position: "relative", width: W, fontFamily: FONT }}>
          <Pop at={2} from={0.94} rise={8}>
            <div style={{ width: W, height: 40, display: "flex", alignItems: "center" }}>
              <CompetitorChips brands={brands} />
            </div>
          </Pop>
          <div style={{ marginTop: 14, height: 40, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ display: "flex", gap: 8 }}>
              {PLATFORMS.map((p, i) => (
                <PlatformTile key={p.label} i={i} />
              ))}
            </span>
            <Pop at={K.sort - 4} from={0.8} rise={6}>
              <span className="pg-card" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", fontSize: 13, fontWeight: 600, color: sorted ? P.brandDeep : P.fg }}>
                Sort: {sorted ? "Running longest" : "Newest"}
              </span>
            </Pop>
          </div>
          <div style={{ position: "relative", marginTop: 16 }}>
            {[ADS_NEWEST, ADS_LONGEST].map((list, li) => (
              <div key={li} style={{ position: li === 0 ? "relative" : "absolute", left: 0, top: 0, display: "flex", gap: GAP, alignItems: "flex-start", opacity: li === 0 ? 1 - swap : swap, transform: `translateY(${li === 0 ? -14 * swap : 14 * (1 - swap)}px)` }}>
                {list.slice(0, 4).map((a, i) => (
                  <Pop key={i} at={10 + i * 3} from={0.92} rise={12}>
                    <div style={{ width: CARD, display: "flex", flexDirection: "column", gap: 6 }}>
                      <span style={{ alignSelf: "flex-start", padding: "3px 7px", borderRadius: 2, background: li === 1 ? P.emeraldSoft : P.muted, color: li === 1 ? "#047857" : P.mutedFg, fontSize: 11, fontWeight: 700, opacity: ramp(f, 16, 22) }}>
                        Running {a.runningDays} days
                      </span>
                      <CompetitorAdCard ad={a} />
                    </div>
                  </Pop>
                ))}
              </div>
            ))}
          </div>
          <div style={{ position: "absolute", right: -10, top: 134, width: 360, opacity: alert, transform: `translateY(${(1 - alert) * 30}px)` }}>
            <div className="pg-card" style={{ padding: 16, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 18px 40px rgba(15,23,42,0.14)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: P.mutedFg }}>
                <Img src={staticFile("ryze-sun.png")} style={{ width: 16, height: 16 }} />
                Ryze · new-ad alert
              </div>
              <div style={{ marginTop: 8, fontSize: 15, fontWeight: 700, color: P.fg }}>{ALERT_BRAND.name} launched new ads</div>
              <div style={{ marginTop: 4, fontSize: 12.5, color: P.mutedFg }}>Open in Competitor Ads →</div>
            </div>
          </div>
        </div>
      </Zoom>
    </AbsoluteFill>
  );
};

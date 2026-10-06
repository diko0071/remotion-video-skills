import React from "react";
import { Img, interpolateColors, staticFile, useCurrentFrame } from "remotion";
import { ramp, useReveal } from "../../core/motion";
import { ChainArrow } from "../../kit/chain-arrow";
import { Pop } from "../../kit/pop";
import { WidgetCard } from "../../kit/ryze-ui/widget-card";
import { ScanBeam } from "../../kit/scan-beam";
import { ScoreRing } from "../../kit/score-ring";
import { TileImg } from "../../kit/tile-img";
import { BROWSER_BAR, SiteCard } from "./site-card";
import { GREEN, INK, PILE, PUBLISHERS, SITE } from "./timings";

const MINI = { w: 560, h: 360 } as const;

export const FixPreview: React.FC<{ at: number; wipe: readonly [number, number]; ring: readonly [number, number]; from: number; to: number; frozen?: boolean }> = ({ at, wipe, ring, from, to, frozen }) => {
  const frame = useCurrentFrame();
  const style = useReveal(at, 60, 24);
  const w = frozen ? 1 : ramp(frame, wipe[0], wipe[1]);
  const sp = frozen ? 1 : ramp(frame, ring[0], ring[1]);
  const score = Math.round(from + (to - from) * sp);
  const color = interpolateColors(sp, [0, 1], ["#DC2626", GREEN]);
  if (!frozen && frame < at - 2) return null;
  return (
    <div style={frozen ? { width: 860 } : { ...style, width: 860 }}>
      <WidgetCard title={SITE.domain} subtitle={w >= 1 ? "Fixes applied · live" : "Applying fixes"}>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <SiteCard image={SITE.before} w={MINI.w} h={MINI.h} radius={12} shadow={false}>
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 ${(1 - w) * 100}% 0)` }}>
              <div style={{ marginTop: -BROWSER_BAR }}>
                <SiteCard image={SITE.after} w={MINI.w} h={MINI.h} radius={0} shadow={false} />
              </div>
            </div>
            {frozen ? null : <ScanBeam axis="y" at={wipe[0]} span={MINI.h - BROWSER_BAR} len={wipe[1] - wipe[0]} />}
          </SiteCard>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <ScoreRing score={score} size={200} appearAt={-1000} color={color} />
            <div style={{ fontSize: 18, fontWeight: 700, color: "rgba(23,19,16,0.6)" }}>SEO score</div>
          </div>
        </div>
      </WidgetCard>
    </div>
  );
};

const COLS = 4;
const CARD = { w: 190, h: 64, gapX: 16, gapY: 16 } as const;
const GRID = { w: COLS * CARD.w + (COLS - 1) * CARD.gapX, h: 3 * CARD.h + 2 * CARD.gapY } as const;

const Check: React.FC<{ at: number; frozen?: boolean }> = ({ at, frozen }) => {
  const frame = useCurrentFrame();
  const p = frozen ? 1 : ramp(frame, at, at + 5);
  return (
    <span style={{ marginLeft: "auto", width: 20, height: 20, borderRadius: 10, background: `rgba(5,150,105,${p})`, border: `1.5px solid ${p > 0 ? GREEN : "rgba(23,19,16,0.15)"}`, display: "inline-flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + 0.3 * Math.sin(p * Math.PI)})`, flexShrink: 0 }}>
      <svg width="11" height="11" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: p }}>
        <path d="M2 5.5 L4 7.5 L8 3" />
      </svg>
    </span>
  );
};

const Publisher: React.FC<{ index: number; at: number; checkAt: number; frozen?: boolean }> = ({ index, at, checkAt, frozen }) => {
  const p = PUBLISHERS[index];
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const body = (
    <div style={{ width: CARD.w, height: CARD.h, background: "#FFFFFF", borderRadius: 10, border: "1px solid rgba(23,19,16,0.08)", boxShadow: "0 1px 2px rgba(20,15,10,0.05), 0 8px 20px rgba(20,15,10,0.07)", padding: "0 12px", display: "flex", alignItems: "center", gap: 10, boxSizing: "border-box" }}>
      <Img src={staticFile(`appicons/${p.domain}.png`)} style={{ width: 22, height: 22, borderRadius: 6, display: "block" }} />
      <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <span style={{ fontSize: 13.5, fontWeight: 700, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.domain}</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: "#0F6B4F" }}>DR {p.dr}</span>
      </span>
      <Check at={checkAt} frozen={frozen} />
    </div>
  );
  return (
    <div style={{ position: "absolute", left: col * (CARD.w + CARD.gapX), top: row * (CARD.h + CARD.gapY) }}>
      {frozen ? body : <Pop at={at} from={0.6} rise={12}>{body}</Pop>}
    </div>
  );
};

export const PlacementsGrid: React.FC<{ at: number; popStep: number; arrowsAt: readonly number[]; checks: readonly number[]; frozen?: boolean }> = ({ at, popStep, arrowsAt, checks, frozen }) => {
  const frame = useCurrentFrame();
  const style = useReveal(at, 40, 18);
  if (!frozen && frame < at - 2) return null;
  return (
    <div data-click="links.grid" style={frozen ? { width: 860 } : { ...style, width: 860 }}>
      <WidgetCard title="Backlink placements" subtitle="12 publications · do-follow · placed through the exchange">
        <div style={{ position: "relative", width: GRID.w, height: GRID.h }}>
          {PUBLISHERS.map((_, i) => (
            <Publisher key={i} index={i} at={at + 6 + i * popStep} checkAt={checks[i]} frozen={frozen} />
          ))}
          {[0, 1, 2].map((row) =>
            [0, 1, 2].map((k) => (
              <ChainArrow key={`${row}-${k}`} at={frozen ? -100 : arrowsAt[row] + k * 2} y={row * (CARD.h + CARD.gapY) + CARD.h / 2} fromX={k * (CARD.w + CARD.gapX) + CARD.w - 3} toX={(k + 1) * (CARD.w + CARD.gapX) + 3} lift={22} width={2.5} head={8} stage={{ w: GRID.w, h: GRID.h }} />
            )),
          )}
        </div>
      </WidgetCard>
    </div>
  );
};

const Published: React.FC<{ at: number; frozen?: boolean }> = ({ at, frozen }) => {
  const pill = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: GREEN, background: "rgba(5,150,105,0.12)", borderRadius: 6, padding: "3px 9px" }}>
      <span style={{ width: 6, height: 6, borderRadius: 3, background: GREEN }} />
      Published
    </span>
  );
  return frozen ? pill : <Pop at={at} from={0.6} rise={6}>{pill}</Pop>;
};

const PILE_CARD = { w: 404, h: 78 } as const;

export const ArticlePile: React.FC<{ marks: readonly number[]; frozen?: boolean }> = ({ marks, frozen }) => {
  const frame = useCurrentFrame();
  if (!frozen && frame < marks[0] - 2) return null;
  return (
    <div data-click="content.pile" style={{ display: "grid", gridTemplateColumns: `${PILE_CARD.w}px ${PILE_CARD.w}px`, gap: "12px 16px", width: 860 }}>
      {PILE.map((p, i) => {
        const card = (
          <div style={{ width: PILE_CARD.w, height: PILE_CARD.h, background: "#FFFFFF", borderRadius: 10, border: "1px solid rgba(23,19,16,0.08)", boxShadow: "0 1px 2px rgba(20,15,10,0.05), 0 8px 20px rgba(20,15,10,0.07)", display: "flex", alignItems: "center", gap: 12, overflow: "hidden", boxSizing: "border-box" }}>
            <div style={{ width: 104, height: "100%", flexShrink: 0 }}>
              <TileImg file={p.image} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, minWidth: 0, paddingRight: 12 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: INK, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</span>
              <Published at={marks[i] + 4} frozen={frozen} />
            </div>
          </div>
        );
        return (
          <div key={i}>{frozen ? card : <Pop at={marks[i]} from={0.7} rise={14}>{card}</Pop>}</div>
        );
      })}
    </div>
  );
};

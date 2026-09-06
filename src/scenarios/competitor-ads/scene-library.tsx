import React from "react";
import { TileImg } from "../../kit/tile-img";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useReveal, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SparkBurst } from "../../kit/kinetic-text";
import { SfxTrack } from "../../kit/sfx";

const RAIN_AT = -10;
const INDUSTRY_CLICK = 88;
const INDUSTRY_PICK = 106;
const PLATFORM_CLICK = 134;
const PLATFORM_PICK = 152;
const DURATION_CLICK = 180;
const DURATION_PICK = 194;
const WINNERS_AT = 232;
export const LIBRARY_TOTAL = 292;

type Tile = {
  file: string;
  brand: string;
  favicon?: string;
  days: number;
  wellness: boolean;
  meta: boolean;
  headline?: string;
  body?: string;
  ratio: number;
};

const T = (
  file: string,
  brand: string,
  days: number,
  wellness: boolean,
  meta: boolean,
  favicon?: string,
  headline?: string,
  body?: string,
  ratio = 1,
): Tile => ({ file: `apps/${file}`, brand, days, wellness, meta, favicon, headline, body, ratio });

const TILES: Tile[] = [
  T("wispr-flow_top-s1-23d.jpg", "wisprflow.ai", 412, true, true, "appicons/wisprflow.ai.png", "Talk. It types.", "Voice to text, everywhere.", 0.562),
  T("granola_top-2-30d.jpg", "granola.ai", 187, true, true, "appicons/granola.ai.png", "Notes write themselves", undefined, 0.562),
  T("rocket-money_top-s3.jpg", "rocketmoney.com", 264, false, true, "appicons/rocketmoney.com.png", "Cancel what you forgot", "$312 in dead subscriptions.", 0.562),
  T("cluely_top-4-11d.jpg", "cluely.com", 143, true, true, "appicons/cluely.com.png", "Notes you'll actually read", undefined, 0.562),
  T("perplexity_top-4-75d.jpg", "perplexity.ai", 156, true, true, "appicons/perplexity.ai.png", "Ask anything, get sources", undefined, 1.0),
  T("suno_top-2-61d.jpg", "suno.com", 128, true, false, "appicons/suno.com.png", "A song from one sentence", undefined, 1.0),
  T("heygen_top-1-42d.jpg", "heygen.com", 119, true, true, "appicons/heygen.com.png", "Speaks 40 languages", undefined, 1.0),
  T("whoop_top-1-53d.jpg", "whoop.com", 231, false, true, "appicons/whoop.com.png", "Sleep is a skill", "Recovery, strain, rest.", 0.562),
  T("eight-sleep_top-7-29d.jpg", "eightsleep.com", 174, false, true, "appicons/eightsleep.com.png", "The bed that cools itself", undefined, 0.8),
  T("chime_top-s9.jpg", "chime.com", 203, false, true, "appicons/chime.com.png", "Get paid two days early", undefined, 0.8),
  T("cleo_top-2-45d.jpg", "meetcleo.com", 98, false, true, "appicons/meetcleo.com.png", "Your money, roasted", undefined, 0.562),
  T("todoist_top-1-6d.jpg", "todoist.com", 92, true, true, "appicons/todoist.com.png", "Everything on your plate", undefined, 0.562),
  T("akiflow_top-1-73d.jpg", "akiflow.com", 141, true, false, "appicons/akiflow.com.png", "One inbox for every task", undefined, 0.562),
  T("lovable_top-4-23d.jpg", "lovable.dev", 167, true, true, "appicons/lovable.dev.png", "Describe it, get an app", undefined, 0.8),
  T("base44_top-1-131d.jpg", "base44.com", 212, true, true, "appicons/base44.com.png", "Ship without a dev team", undefined, 0.8),
  T("replit_top-8-5d.jpg", "replit.com", 134, true, true, "appicons/replit.com.png", "Build from your phone", undefined, 0.8),
  T("cursor_top-3-2d.jpg", "cursor.com", 88, true, true, "appicons/cursor.com.png", "It codes with you", undefined, 0.562),
  T("elevenlabs_top-2-154d.jpg", "elevenlabs.io", 249, true, true, undefined, "Any voice, any language", undefined, 0.75),
  T("synthesia_top-1-18d.jpg", "synthesia.io", 118, true, true, "appicons/synthesia.io.png", "Video without a camera", undefined, 0.8),
  T("capcut_top-6-114d.jpg", "capcut.com", 226, false, true, "appicons/capcut.com.png", "Edit like a studio", undefined, 0.8),
  T("nanit_top-2-23d.jpg", "nanit.com", 109, false, true, "appicons/nanit.com.png", "See how they sleep", undefined, 0.562),
  T("owlet_top-2-6d.jpg", "owlet.com", 76, false, true, "appicons/owlet.com.png", "Peace of mind, all night", undefined, 0.562),
  T("hatch_top-1-39d.jpg", "hatch.co", 158, false, true, "appicons/hatch.co.png", "Wake up without an alarm", undefined, 0.8),
  T("artistly-ai_top-1-446d.jpg", "artistly.ai", 446, true, true, undefined, "Art from a prompt", undefined, 1.0),
  T("starface_top-8-30d.jpg", "starface.world", 104, false, true, undefined, "Skincare that shows up", undefined, 0.562),
  T("wispr-flow_top-s5-24d.jpg", "wisprflow.ai", 121, true, true, "appicons/wisprflow.ai.png", "Write at the speed of talking", undefined, 0.562),
];

type Rect = { x: number; y: number; w: number; h: number };

const FOOTER_H = 58;
const EDGE = 150;
const GRID_W = 1920 - EDGE * 2;
const GAP = 28;

const mediaHeight = (tile: Tile, colW: number) => Math.min(colW / tile.ratio, colW * 1.5);

const cardHeight = (tile: Tile, colW: number) => {
  let h = mediaHeight(tile, colW) + FOOTER_H;
  if (tile.headline) h += 18 + 21;
  if (tile.body) h += 8 + 16;
  return h;
};

const masonry = (indices: number[], cols: number, top: number): Map<number, Rect> => {
  const colW = (GRID_W - (cols - 1) * GAP) / cols;
  const heights = new Array<number>(cols).fill(top);
  const m = new Map<number, Rect>();
  for (const idx of indices) {
    let shortest = 0;
    for (let i = 1; i < cols; i += 1) if (heights[i] < heights[shortest]) shortest = i;
    const h = cardHeight(TILES[idx], colW);
    m.set(idx, { x: EDGE + shortest * (colW + GAP), y: heights[shortest], w: colW, h });
    heights[shortest] += h + GAP;
  }
  return m;
};

const ALL = TILES.map((_, i) => i);
const WELLNESS = ALL.filter((i) => TILES[i].wellness);
const WELLNESS_META = WELLNESS.filter((i) => TILES[i].meta);
const LONG = WELLNESS_META.filter((i) => TILES[i].days >= 90)
  .sort((a, b) => TILES[b].days - TILES[a].days)
  .slice(0, 8);

const PHASES: { at: number; rects: Map<number, Rect> }[] = [
  { at: 0, rects: masonry(ALL, 6, 320) },
  { at: INDUSTRY_PICK, rects: masonry(WELLNESS, 5, 320) },
  { at: PLATFORM_PICK, rects: masonry(WELLNESS_META, 5, 320) },
  { at: DURATION_PICK, rects: masonry(LONG, 4, 320) },
];

const LibraryTile: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const tile = TILES[index];
  const rain = useSpringAt(RAIN_AT + (index % 6) * 2 + Math.floor(index / 6) * 3, SPRINGS.card, 18);

  const phase1 = useSpringAt(PHASES[1].at, SPRINGS.smooth, 24);
  const phase2 = useSpringAt(PHASES[2].at, SPRINGS.smooth, 24);
  const phase3 = useSpringAt(PHASES[3].at, SPRINGS.smooth, 24);
  const phaseSprings = [0, phase1, phase2, phase3];

  let rect = PHASES[0].rects.get(index)!;
  let visible = 1;
  for (let i = 1; i < PHASES.length; i += 1) {
    const s = phaseSprings[i];
    const next = PHASES[i].rects.get(index);
    if (next) {
      rect = {
        x: rect.x + (next.x - rect.x) * s,
        y: rect.y + (next.y - rect.y) * s,
        w: rect.w + (next.w - rect.w) * s,
        h: rect.h + (next.h - rect.h) * s,
      };
    } else {
      visible *= 1 - s;
    }
  }
  const isWinner = LONG.includes(index) && frame >= WINNERS_AT;
  const win = useSpringAt(WINNERS_AT + Math.max(LONG.indexOf(index), 0) * 3, SPRINGS.pop, 18);
  if (visible < 0.01) return null;
  const bigBadge = frame >= DURATION_PICK + 16 && LONG.includes(index);

  return (
    <div
      style={{
        position: "absolute",
        left: rect.x,
        top: rect.y,
        width: rect.w,
        height: rect.h,
        borderRadius: 10,
        overflow: "hidden",
        background: "#FFFFFF",
        border: isWinner ? "3px solid #C19767" : "1px solid rgba(23,19,16,0.08)",
        boxShadow: isWinner
          ? "0 0 0 6px rgba(193,151,103,0.18), 0 20px 46px rgba(193,151,103,0.4)"
          : "0 1px 2px rgba(74,53,29,0.05)",
        opacity: rain * visible,
        transform: `translateY(${interpolate(rain, [0, 1], [40, 0])}px) scale(${
          isWinner ? 1 + (1 - Math.abs(1 - win * 2)) * 0.04 : 1
        })`,
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <TileImg file={tile.file} height={mediaHeight(tile, rect.w)} />
      {tile.headline || tile.body ? (
        <div style={{ padding: "18px 20px 0", display: "flex", flexDirection: "column", gap: 8 }}>
          {tile.headline ? (
            <span
              style={{
                fontSize: 16.5,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                lineHeight: "20px",
                color: "#1a0e06",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {tile.headline}
            </span>
          ) : null}
          {tile.body ? (
            <span
              style={{
                fontSize: 13.5,
                lineHeight: "15px",
                color: "rgba(23,19,16,0.5)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {tile.body}
            </span>
          ) : null}
        </div>
      ) : null}
      <div
        style={{
          height: FOOTER_H,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {tile.favicon ? (
          <Img
            src={staticFile(tile.favicon)}
            style={{ width: 17, height: 17, borderRadius: 4, opacity: 0.85 }}
          />
        ) : null}
        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "rgba(23,19,16,0.5)",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {tile.brand}
        </span>
        <span
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "baseline",
            gap: 4,
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              fontSize: bigBadge ? 20 : 15,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: bigBadge ? "#A87C46" : "rgba(23,19,16,0.62)",
            }}
          >
            {tile.days}
          </span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: bigBadge ? "rgba(168,124,70,0.75)" : "rgba(23,19,16,0.38)",
            }}
          >
            days
          </span>
        </span>
      </div>
      {isWinner && LONG.indexOf(index) < 4 ? (
        <SparkBurst at={WINNERS_AT + LONG.indexOf(index) * 3} />
      ) : null}
    </div>
  );
};

const SelectPill: React.FC<{
  id?: string;
  label: string;
  swapTo?: string;
  swapAt?: number;
  active?: boolean;
}> = ({ id, label, swapTo, swapAt, active }) => {
  const frame = useCurrentFrame();
  const swapped = swapTo != null && swapAt != null && frame >= swapAt;
  const pop = useSpringAt(swapAt ?? 100000, SPRINGS.pop, 14);
  return (
    <span
      data-click={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 42,
        background: swapped || active ? "#171310" : "#FFFFFF",
        color: swapped || active ? "#FFFFFF" : "rgba(23,19,16,0.72)",
        border: "1px solid rgba(23,19,16,0.12)",
        borderRadius: 11,
        padding: "0 16px",
        fontSize: 16,
        fontWeight: 700,
        whiteSpace: "nowrap",
        transform: swapAt != null ? `scale(${1 + (1 - Math.abs(1 - pop * 2)) * 0.08})` : undefined,
      }}
    >
      {swapped ? swapTo : label}
      <svg width="11" height="7" viewBox="0 0 11 7" fill="none">
        <path d="M1 1l4.5 4.5L10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </span>
  );
};

const Dropdown: React.FC<{
  openAt: number;
  closeAt: number;
  x: number;
  items: string[];
  pickIndex: number;
  pickId: string;
}> = ({ openAt, closeAt, x, items, pickIndex, pickId }) => {
  const frame = useCurrentFrame();
  const inn = useSpringAt(openAt, SPRINGS.card, 16);
  if (frame < openAt || frame > closeAt + 4) return null;
  const out = frame > closeAt ? (frame - closeAt) / 4 : 0;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 262,
        width: 250,
        background: "#FFFFFF",
        borderRadius: 12,
        border: "1px solid rgba(23,19,16,0.1)",
        boxShadow: "0 24px 60px rgba(23,19,16,0.18)",
        padding: 7,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        opacity: inn * (1 - out),
        transform: `translateY(${interpolate(inn, [0, 1], [-10, 0])}px)`,
        fontFamily: "'Plus Jakarta Sans'",
        zIndex: 5,
      }}
    >
      {items.map((item, i) => (
        <span
          key={item}
          data-click={i === pickIndex ? pickId : undefined}
          style={{
            padding: "9px 13px",
            borderRadius: 8,
            fontSize: 16,
            fontWeight: 700,
            color: "#171310",
            background: i === pickIndex && frame > closeAt - 8 ? "#F6EEDF" : "transparent",
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
};

const CHIPS: { label: string; favicon?: string }[] = [
  { label: "All brands" },
  { label: "granola.ai", favicon: "appicons/granola.ai.png" },
  { label: "cluely.com", favicon: "appicons/cluely.com.png" },
  { label: "wisprflow.ai", favicon: "appicons/wisprflow.ai.png" },
  { label: "rocketmoney.com", favicon: "appicons/rocketmoney.com.png" },
  { label: "whoop.com", favicon: "appicons/whoop.com.png" },
  { label: "lovable.dev", favicon: "appicons/lovable.dev.png" },
];

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1.0 },
  { at: WINNERS_AT, target: "winners", zoom: 1.08 },
];

export const LibraryScene: React.FC = () => {
  const headIn = useReveal(-12, 18, 16);
  const barIn = useReveal(-8, 16, 16);
  return (
    <AbsoluteFill style={{ background: "var(--background)", fontFamily: "'Plus Jakarta Sans'" }}>
      <CameraRig shots={SHOTS} bounds>
        <div style={{ ...headIn, position: "absolute", left: 150, top: 70, right: 150, display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", color: "#171310" }}>
              Competitor Ads
            </span>
            <span style={{ fontSize: 18, fontWeight: 600, color: "rgba(23,19,16,0.55)" }}>
              Live ads from your industry and the competitors you track.
            </span>
          </div>
          <span
            style={{
              marginLeft: "auto",
              display: "inline-flex",
              alignItems: "center",
              height: 42,
              background: "#171310",
              color: "#FFFFFF",
              borderRadius: 11,
              padding: "0 20px",
              fontSize: 16,
              fontWeight: 800,
            }}
          >
            Track competitor
          </span>
        </div>

        <div style={{ ...barIn, position: "absolute", left: 150, top: 172, right: 150, display: "flex", alignItems: "center", gap: 10 }}>
          {CHIPS.map((chip, i) => (
            <span
              key={chip.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                height: 38,
                background: i === 0 ? "#171310" : "#FFFFFF",
                color: i === 0 ? "#FFFFFF" : "#171310",
                border: "1px solid rgba(23,19,16,0.1)",
                borderRadius: 99,
                padding: "0 15px",
                fontSize: 15,
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
              {chip.favicon ? (
                <Img src={staticFile(chip.favicon)} style={{ width: 18, height: 18, borderRadius: 5 }} />
              ) : null}
              {chip.label}
            </span>
          ))}
        </div>

        <div style={{ ...barIn, position: "absolute", left: 150, top: 240, right: 150, display: "flex", alignItems: "center", gap: 10 }}>
          <SelectPill id="f.industry" label="All industries" swapTo="AI & Productivity" swapAt={INDUSTRY_PICK} />
          <SelectPill id="f.platform" label="All platforms" swapTo="Meta" swapAt={PLATFORM_PICK} />
          <SelectPill label="All formats" />
          <SelectPill id="f.duration" label="Any duration" swapTo="90+ days" swapAt={DURATION_PICK} />
          <span style={{ marginLeft: "auto" }}>
            <SelectPill label="Trending" active />
          </span>
        </div>

        <div data-click="winners" style={{ position: "absolute", left: 200, top: 320, right: 200, height: 600 }} />

        {ALL.map((i) => (
          <LibraryTile key={i} index={i} />
        ))}

        <Dropdown
          openAt={INDUSTRY_CLICK}
          closeAt={INDUSTRY_PICK}
          x={150}
          items={["All industries", "Health & Fitness", "AI & Productivity", "Finance & Fintech"]}
          pickIndex={2}
          pickId="dd.industry"
        />
        <Dropdown
          openAt={PLATFORM_CLICK}
          closeAt={PLATFORM_PICK}
          x={392}
          items={["All platforms", "Google", "Meta", "LinkedIn"]}
          pickIndex={2}
          pickId="dd.platform"
        />
        <Dropdown
          openAt={DURATION_CLICK}
          closeAt={DURATION_PICK}
          x={726}
          items={["Any duration", "Under 30 days", "30–90 days", "90+ days"]}
          pickIndex={3}
          pickId="dd.duration"
        />

        <SceneCursor
          from={{ x: 1620, y: 1010 }}
          moves={[
            { target: "f.industry", at: INDUSTRY_CLICK, travel: 30 },
            { target: "dd.industry", at: INDUSTRY_PICK, travel: 14 },
            { target: "f.platform", at: PLATFORM_CLICK, travel: 24 },
            { target: "dd.platform", at: PLATFORM_PICK, travel: 14 },
            { target: "f.duration", at: DURATION_CLICK, travel: 22 },
            { target: "dd.duration", at: DURATION_PICK, travel: 14 },
          ]}
        />
      </CameraRig>
      <SfxTrack
        hits={[
          { name: "mouse-click", at: INDUSTRY_CLICK },
          { name: "mouse-click", at: INDUSTRY_PICK },
          { name: "mouse-click", at: PLATFORM_CLICK },
          { name: "mouse-click", at: PLATFORM_PICK },
          { name: "mouse-click", at: DURATION_CLICK },
          { name: "mouse-click", at: DURATION_PICK },
        ]}
      />
    </AbsoluteFill>
  );
};

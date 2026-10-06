import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { CHARACTER_TILES, MUSIC_TILES, SUBTITLE_TILES, type GridTile } from "./assets";
import { INTER } from "./font";
import { COMPOSE, GREEN, INK } from "./timings";
import { cardRect, slotRect, type Rect } from "./compose-card";

export const tileRect = (col: number, row: number): Rect => {
  const g = COMPOSE.grid;
  return { x: g.x + col * (g.size + g.gap), y: g.y + row * (g.size + g.gap), w: g.size, h: g.size };
};

export const activeTab = (frame: number) => {
  const p = [...COMPOSE.picks].reverse().find((k) => frame >= k.at);
  return p ? p.tab : 0;
};

export const TileFace: React.FC<{ tile: GridTile }> = ({ tile }) => {
  if (tile.kind === "img") return <Img src={staticFile(tile.file)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />;
  if (tile.kind === "disc") {
    return (
      <div style={{ width: "100%", height: "100%", background: "#121212", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "94%", height: "94%", borderRadius: "50%", position: "relative", background: `radial-gradient(circle at 35% 30%, ${tile.a} 0%, ${tile.b} 45%, ${tile.c} 100%)` }}>
          <div style={{ position: "absolute", left: "50%", top: "50%", width: 16, height: 16, marginLeft: -8, marginTop: -8, borderRadius: 8, background: "#111" }} />
          <div style={{ position: "absolute", left: "16%", top: "18%", width: 36, height: "64%", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.85) 2px, transparent 2.5px)", backgroundSize: "9px 9px" }} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height: "100%", background: "#0E0E0E", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 18, fontFamily: tile.serif ? "'Source Serif 4', Georgia, serif" : INTER, fontStyle: tile.italic ? "italic" : "normal", fontWeight: tile.weight ?? 700, fontSize: tile.size ?? 44, color: tile.color ?? "#EDEDED", lineHeight: 1.05, letterSpacing: tile.tracking ?? "-0.02em", whiteSpace: "pre-line" }}>
      {tile.text}
    </div>
  );
};

const tilesFor = (tab: number): readonly GridTile[] => (tab === 0 ? CHARACTER_TILES : tab === 1 ? MUSIC_TILES : SUBTITLE_TILES);

export const tileFile = (tab: number, col: number, row: number) => {
  const t = tilesFor(tab)[row * COMPOSE.grid.cols + col];
  return t;
};

export const PickGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const tab = activeTab(frame);
  const tiles = tilesFor(tab);
  const gridIn = ramp(frame, COMPOSE.pick.gridIn[0], COMPOSE.pick.gridIn[1]);
  const gridOut = 1 - ramp(frame, COMPOSE.pick.gridOut[0], COMPOSE.pick.gridOut[1]);
  const pick = COMPOSE.picks[tab];
  const g = COMPOSE.grid;
  const hovered = frame >= pick.hover && frame < pick.chip[1];
  return (
    <div style={{ position: "absolute", inset: 0, opacity: gridIn * gridOut }}>
      {tiles.slice(0, g.cols * g.rows).map((tile, i) => {
        const col = i % g.cols;
        const row = Math.floor(i / g.cols);
        const r = tileRect(col, row);
        const sel = hovered && col === pick.tile.col && row === pick.tile.row;
        return (
          <div key={`${tab}-${i}`} style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: 14, overflow: "hidden", opacity: sel ? 1 : g.dim }}>
            <TileFace tile={tile} />
          </div>
        );
      })}
    </div>
  );
};

export const Tabs: React.FC = () => {
  const frame = useCurrentFrame();
  const tab = activeTab(frame);
  const t = COMPOSE.tabs;
  const gridIn = ramp(frame, COMPOSE.pick.gridIn[0], COMPOSE.pick.gridIn[1]);
  const gridOut = 1 - ramp(frame, COMPOSE.pick.gridOut[0], COMPOSE.pick.gridOut[1]);
  const widths = [166, 118, 168];
  const lefts = [8, 186, 316];
  const prevTab = Math.max(0, tab - 1);
  const switchAt = COMPOSE.picks[tab].at;
  const p = ramp(frame, switchAt, switchAt + 6);
  const hlX = lefts[prevTab] + (lefts[tab] - lefts[prevTab]) * p;
  const hlW = widths[prevTab] + (widths[tab] - widths[prevTab]) * p;
  return (
    <div style={{ position: "absolute", left: t.x, top: t.y, width: t.w, height: t.h, borderRadius: 22, background: "#fff", opacity: gridIn * gridOut, fontFamily: INTER, fontSize: 30, color: INK }}>
      <div style={{ position: "absolute", left: hlX, top: 8, width: hlW, height: t.h - 16, borderRadius: 16, background: GREEN }} />
      {t.items.map((label, i) => (
        <div key={label} style={{ position: "absolute", left: lefts[i], top: 0, width: widths[i], height: t.h, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {label}
        </div>
      ))}
    </div>
  );
};

export const ChipFlights: React.FC = () => {
  const frame = useCurrentFrame();
  const card = cardRect(frame);
  return (
    <>
      {COMPOSE.picks.map((pick, i) => {
        if (frame < pick.chip[0] || frame >= pick.chip[1]) return null;
        const p = ramp(frame, pick.chip[0], pick.chip[1]);
        const e = 1 - Math.pow(1 - p, 3);
        const from = tileRect(pick.tile.col, pick.tile.row);
        const to = slotRect(card, i);
        const r = { x: from.x + (to.x - from.x) * e, y: from.y + (to.y - from.y) * e, w: from.w + (to.w - from.w) * e, h: from.h + (to.h - from.h) * e };
        const tile = tileFile(pick.tab, pick.tile.col, pick.tile.row);
        return (
          <div key={i} style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, borderRadius: 14 + 4 * e, overflow: "hidden", zIndex: 40 }}>
            <TileFace tile={tile} />
          </div>
        );
      })}
    </>
  );
};

export const chipsAt = (frame: number): (GridTile | null)[] =>
  COMPOSE.picks.map((pick) => (frame >= pick.chip[1] ? tileFile(pick.tab, pick.tile.col, pick.tile.row) : null));

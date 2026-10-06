import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS, springAt } from "../../core/motion";
import { DirectionalBlur } from "../../kit/directional-blur";
import type { ExtView } from "../../kit/ext-ui";
import { Headline, HEADLINE_FONT, textWidth } from "../../kit/headline";
import { PanelRise } from "./panel-rise";
import { CursorArrow, cursorAt } from "../../core/stage";
import { ChromeFrame } from "../../kit/chrome-ui";
import { CORAL, GREEN, HBAR_TILE_IN_PANEL, HERO_TILE_IN_PANEL, INK, PANEL, PANEL_X, PINK, SR, SR_SCHEDULE } from "./timings";

const eo = Easing.out(Easing.cubic);
const back = Easing.out(Easing.back(1.5));
const clamp = (frame: number, a: number, b: number, easing = eo) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

const SIZE = 140;
const WEIGHT = 500;
const NODE_W = 96;
const NODE_AT = 10;
const LINE_H = SIZE * 1.2;
const line2 = "next to   it.";
const nodeLeft = () => {
  const before = textWidth("next to  ", SIZE, WEIGHT);
  const full = textWidth(line2, SIZE, WEIGHT) + NODE_W;
  return 960 - full / 2 + before + NODE_W / 2 - 4;
};
const NODE_Y = 540 + LINE_H / 2 + 4;

const Tile: React.FC<{ src: string; size: number; radius: number }> = ({ src, size, radius }) => (
  <div style={{ width: size, height: size, borderRadius: radius, background: "#FFF", boxShadow: "0 14px 36px rgba(23,19,16,.10), 0 0 0 1.5px rgba(23,19,16,.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Img src={staticFile(src)} style={{ width: size * 0.52, height: size * 0.52, borderRadius: size * 0.12 }} />
  </div>
);

const EDGES = [
  { x: -1300, y: 0 },
  { x: 400, y: -900 },
  { x: 1300, y: 200 },
  { x: 200, y: 900 },
  { x: -1300, y: 500 },
  { x: -600, y: -900 },
] as const;

const arcPath = (r: number, a0: number, a1: number) => {
  const x0 = Math.cos(a0) * r;
  const y0 = Math.sin(a0) * r;
  const x1 = Math.cos(a1) * r;
  const y1 = Math.sin(a1) * r;
  return `M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

const Constellation: React.FC<{ view: ExtView }> = ({ view }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (frame < NODE_AT || frame >= SR.list + 12) return null;
  const F = SR.orbit;
  const nodeIn = clamp(frame, NODE_AT, NODE_AT + 7, back);
  const move = clamp(frame, SR.headOut, SR.headOut + 16, Easing.inOut(Easing.cubic));
  const carry = clamp(frame, SR.carry, SR.carry + SR.carryLen, Easing.inOut(Easing.cubic));
  const carryPrev = clamp(frame - 1, SR.carry, SR.carry + SR.carryLen, Easing.inOut(Easing.cubic));
  const hero = { x: PANEL_X + HERO_TILE_IN_PANEL.x * PANEL.scale, y: SR.panelTop + HERO_TILE_IN_PANEL.y * PANEL.scale, size: HERO_TILE_IN_PANEL.size * PANEL.scale };
  const center = { x: interpolate(move, [0, 1], [nodeLeft(), F.cx]), y: interpolate(move, [0, 1], [NODE_Y, F.cy]) };
  const hubX = interpolate(carry, [0, 1], [center.x, hero.x]);
  const hubY = interpolate(carry, [0, 1], [center.y, hero.y]);
  const hubSize = interpolate(move, [0, 1], [NODE_W, F.hub]) * interpolate(carry, [0, 1], [1, hero.size / F.hub]);
  const hubFade = 1 - clamp(frame, SR.list - 2, SR.list + 4);
  const items = view.citedWith.slice(0, EDGES.length);
  const n = items.length;
  const spin = Math.max(0, frame - SR.field) * 0.014 + clamp(frame, SR.carry - 10, SR.carry + 6, Easing.in(Easing.quad)) * 0.6;
  const pos = (i: number) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2 + spin;
    const to = { x: center.x + Math.cos(a) * F.r, y: center.y + Math.sin(a) * F.r };
    const at = SR.field + i * SR.step;
    const fly = springAt(frame, fps, at, SPRINGS.card, 22);
    const flyPrev = springAt(frame - 1, fps, at, SPRINGS.card, 22);
    const row = { x: PANEL_X + HBAR_TILE_IN_PANEL.x * PANEL.scale, y: SR.panelTop + (HBAR_TILE_IN_PANEL.y + i * HBAR_TILE_IN_PANEL.step) * PANEL.scale };
    const ax = interpolate(fly, [0, 1], [center.x + EDGES[i].x, to.x]);
    const ay = interpolate(fly, [0, 1], [center.y + EDGES[i].y, to.y]);
    const x = interpolate(carry, [0, 1], [ax, row.x]);
    const y = interpolate(carry, [0, 1], [ay, row.y]);
    const px = interpolate(flyPrev, [0, 1], [center.x + EDGES[i].x, to.x]);
    const py = interpolate(flyPrev, [0, 1], [center.y + EDGES[i].y, to.y]);
    return { x, y, at, fly, a, vx: Math.abs(ax - px), vy: Math.abs(ay - py) };
  };
  const nodes = items.map((_, i) => pos(i));
  const tileSize = F.tile * interpolate(carry, [0, 1], [1, (HBAR_TILE_IN_PANEL.size * PANEL.scale) / F.tile]);
  const ringFade = 1 - carry;
  const gap = (F.tile / 2 + 14) / F.r;
  return (
    <AbsoluteFill style={{ fontFamily: HEADLINE_FONT, color: INK }}>
      <svg width={1} height={1} style={{ position: "absolute", left: center.x, top: center.y, overflow: "visible", opacity: ringFade }}>
        {nodes.map((b, i) => {
          const a = nodes[(i + n - 1) % n];
          const at = i === 0 ? nodes[n - 1].at + 24 : b.at + 14;
          const p = clamp(frame, at, at + 10);
          if (p <= 0) return null;
          const a0 = a.a + gap;
          const a1 = a0 + (b.a + (i === 0 ? Math.PI * 2 : 0) - gap - a0) * p;
          return <path key={i} d={arcPath(F.r, a0, a1)} fill="none" stroke="#CFCBC4" strokeWidth={3} strokeLinecap="round" />;
        })}
      </svg>
      {items.map((s, i) => {
        const nd = nodes[i];
        if (frame < nd.at) return null;
        const scale = interpolate(nd.fly, [0, 1], [0.6, 1]);
        const gone = 1 - clamp(frame, SR.list + 2 + i, SR.list + 6 + i);
        return (
          <DirectionalBlur key={s.key} id={`src-node-${i}`} x={nd.vx * 0.25 + Math.abs(carry - carryPrev) * 400} y={nd.vy * 0.25 + Math.abs(carry - carryPrev) * 300} style={{ position: "absolute", left: nd.x, top: nd.y, transform: `translate(-50%, -50%) scale(${Math.max(0, scale)})`, opacity: Math.min(1, nd.fly * 2) * gone }}>
            <Tile src={s.favicon} size={tileSize} radius={tileSize * 0.24} />
          </DirectionalBlur>
        );
      })}
      <DirectionalBlur id="src-hub" x={Math.abs(carry - carryPrev) * 400} y={Math.abs(carry - carryPrev) * 300} style={{ position: "absolute", left: hubX - hubSize / 2, top: hubY - hubSize / 2, transform: `scale(${Math.max(0, nodeIn)})`, opacity: hubFade }}>
        <Tile src={view.favicon} size={hubSize} radius={hubSize * 0.24} />
      </DirectionalBlur>
    </AbsoluteFill>
  );
};

const TabClick: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const at = SR.overviewAt;
  if (frame < at - 18 || frame > at + 10) return null;
  const tab = { x: PANEL_X + (12 + 16 + 34) * PANEL.scale, y: SR.panelTop + (56 + 24) * PANEL.scale };
  const pos = cursorAt([{ x: 1300, y: 1150, at: at - 18 }, { x: tab.x + 8, y: tab.y + 6, at: at }], frame, fps);
  const dip = interpolate(frame, [at - 3, at, at + 5], [1, 0.78, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const out = clamp(frame, at + 5, at + 12);
  return (
    <div style={{ position: "absolute", left: pos.x, top: pos.y, transform: `scale(${1.5 * dip})`, transformOrigin: "0 0", opacity: 1 - out, filter: "drop-shadow(0 4px 10px rgba(0,0,0,.25))" }}>
      <CursorArrow />
    </div>
  );
};

export const SourcesStory: React.FC<{ view: ExtView; shot: string; title: string }> = ({ view, shot, title }) => {
  const frame = useCurrentFrame();
  const bg = clamp(frame, SR.dock.at, SR.dock.at + SR.dock.len);
  return (
    <AbsoluteFill>
      {bg > 0 ? (
        <AbsoluteFill style={{ opacity: bg }}>
          <ChromeFrame host={view.domain} tab={{ title, favicon: view.favicon }} badge={{ text: String(view.cites), color: "#b54708", at: 0 }}>
            <Img src={staticFile(shot)} />
          </ChromeFrame>
        </AbsoluteFill>
      ) : null}
      {frame <= SR.headOut + 8 ? (
        <Headline
          size={SIZE}
          weight={WEIGHT}
          exitAt={SR.headOut}
          lines={[
            { at: 0, words: [{ text: "Who" }, { text: "AI" }, { text: "names" }], decos: [{ kind: "arc", color: PINK, at: 14, word: 2, rotate: -20, dy: 16 }] },
            { at: 3, words: [{ text: "next" }, { text: "to " }, { text: " it.", color: CORAL, node: <span style={{ display: "inline-block", width: NODE_W - 8, height: NODE_W }} />, nodeAt: NODE_AT }], decos: [{ kind: "under", color: GREEN, at: 20, word: 2, chars: [0, 3] }] },
          ]}
        />
      ) : null}
      <PanelRise at={SR.panelIn} top={SR.panelTop} view={view} t={{ head: 0, tabs: 0, rating: 0, gauge: 0, metrics: 0, rows: [0, 0, 0], analyze: 0, chatgpt: 0, scroll1: 9999, aio: 0, scroll2: 9999, brand: 0, explore: 0 }} tab="sources" sources={SR_SCHEDULE} dock={SR.dock} overviewAt={SR.overviewAt} parts={2} />
      <Constellation view={view} />
      <TabClick />
    </AbsoluteFill>
  );
};

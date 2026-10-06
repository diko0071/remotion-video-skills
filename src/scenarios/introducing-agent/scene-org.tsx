import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Bot, blinkTrack } from "./bot";
import { BotKey, BOTS, GREY_BOT, ROLE_LABELS } from "./bots";
import { CLUSTER_Y, SEARCH_CAM_X, SHRINK_S, SHRINK_X, SHRINK_Y } from "./curves";
import { KeyedRig } from "../../kit/keyed-rig";
import { Deco } from "./deco";
import { SANS } from "./font";
import { Headline } from "./headline";
import { BLUE, CUT, GREEN, GREY, INK, ORANGE, PINK, PURPLE, r, sample } from "./timings";

const eo = Easing.out(Easing.cubic);
const back = Easing.out(Easing.back(1.6));
const clamp = (frame: number, a: number, b: number, easing = eo) => interpolate(frame, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing });

export const OrgLine: React.FC = () => (
  <Headline
    size={140}
    lines={[
      { at: 0, words: [{ text: "Ryze" }, { text: "manages" }], decos: [{ kind: "tick", color: ORANGE, at: r(274) - CUT.org, word: 0, rotate: 90, dx: 6 }] },
      { at: r(265) - CUT.org, words: [{ text: "agents" }, { text: "across" }, { text: "your" }], decos: [{ kind: "arc", color: PINK, at: r(278) - CUT.org, word: 0, rotate: -20, dy: 20 }, { kind: "under", color: GREEN, at: r(283) - CUT.org, word: 2 }] },
      { at: r(268) - CUT.org, words: [{ text: "entire" }, { text: "organization" }], decos: [{ kind: "under", color: BLUE, at: r(286) - CUT.org, word: 0 }] },
    ]}
  />
);

const TEAM: { kind: Exclude<BotKey, "hero">; x: number; y: number; size: number; label: { x: number; y: number; rot: number } }[] = [
  { kind: "ads", x: -150, y: -60, size: 150, label: { x: -560, y: -230, rot: -12 } },
  { kind: "sales", x: -190, y: 40, size: 210, label: { x: -590, y: -40, rot: -6 } },
  { kind: "creative", x: 170, y: 40, size: 200, label: { x: 310, y: -20, rot: 8 } },
  { kind: "geo", x: 150, y: -70, size: 120, label: { x: 300, y: -230, rot: 10 } },
];

export const Cluster: React.FC<{ at: number; cx: number; cy: number; scale: number; labels?: boolean; legsAt?: number; hopAt?: number; scatter?: number }> = ({ at, cx, cy, scale, labels = true, legsAt, hopAt, scatter = 0 }) => {
  const frame = useCurrentFrame();
  const hop = hopAt !== undefined ? interpolate(frame, [hopAt, hopAt + 3, hopAt + 7], [0, -46, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.quad) }) : 0;
  const legs = legsAt !== undefined ? clamp(frame, legsAt, legsAt + 6) * (hopAt !== undefined && frame >= hopAt ? 0 : 1) : 0;
  const heroS = clamp(frame, at, at + 6, back);
  return (
    <div style={{ position: "absolute", left: cx, top: cy + hop * scale, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
      {legs > 0
        ? [-80, -28, 30, 84].map((lx, i) => <div key={i} style={{ position: "absolute", left: lx, top: 150, width: 4, height: 110 * legs, background: "#D9D9D9", borderRadius: 2, transform: `rotate(${(i - 1.5) * 9}deg)`, transformOrigin: "top" }} />)
        : null}
      {TEAM.map((t, i) => {
        const s = clamp(frame, at + 2 + i * 2, at + 8 + i * 2, back);
        const sx = t.x * (1 + scatter * 1.6);
        const sy = t.y * (1 + scatter * 1.2) + scatter * 40 * (i % 2 ? 1 : -1);
        return (
          <div key={t.kind} style={{ position: "absolute", left: sx - t.size / 2, top: sy - t.size / 2, transform: `scale(${Math.max(0, s)})`, opacity: s > 0 ? 1 : 0 }}>
            <Bot kind={t.kind} size={t.size} gaze={{ x: Math.sin((frame + i * 9) / 22) * 0.5, y: 0 }} blink={blinkTrack(frame, [at + 40 + i * 6])} />
          </div>
        );
      })}
      <div style={{ position: "absolute", left: -197, top: -200, transform: `scale(${Math.max(0, heroS)})`, opacity: heroS > 0 ? 1 : 0 }}>
        <Bot kind="hero" size={394} gaze={{ x: Math.sin(frame / 16) * 0.5, y: 0.1 }} blink={blinkTrack(frame, [at + 26, at + 30, at + 70])} />
      </div>
      {labels
        ? TEAM.map((t, i) => {
            const s = clamp(frame, at + 8 + i * 2, at + 14 + i * 2, back);
            return (
              <div key={t.kind} style={{ position: "absolute", left: t.label.x, top: t.label.y, transform: `rotate(${t.label.rot}deg) scale(${Math.max(0, s)})`, opacity: s > 0 ? 1 : 0 }}>
                <span style={{ display: "inline-block", background: BOTS[t.kind].color, color: "#FFF", fontFamily: SANS, fontSize: 30, fontWeight: 600, padding: "6px 16px", borderRadius: 6, whiteSpace: "nowrap" }}>{ROLE_LABELS[t.kind]}</span>
              </div>
            );
          })
        : null}
    </div>
  );
};

const CHIPS = [
  { icon: "integrations/slack.svg", text: "#growth › weekly report is ready", at: r(309), dx: 0 },
  { icon: "integrations/google-search-console.svg", text: "Search Console › 12 keywords moved to page 1", at: r(313), dx: 14 },
  { icon: "integrations/shopify-color.svg", text: "Shopify › 38 orders from organic today", at: r(317), dx: 28 },
  { icon: "integrations/gmail.png", text: "Alex Kim › Q3 launch assets are attached", at: r(320), dx: 40 },
] as const;

const GRID = { cols: 22, rows: 4, px: 330, py: 300, size: 190, x0: -1400, y0: -60 } as const;
const CELL = { col: 4, row: 1 } as const;
const cellCenter = (col: number, row: number) => ({ x: GRID.x0 + col * GRID.px + GRID.px / 2, y: GRID.y0 + row * GRID.py + GRID.py / 2 });
const CHIP_SCALE = 0.3;
const SEARCH = "Searching…";
const PILL = { left: 484, top: 292, w: 2060, h: 499 } as const;
const CLUSTER_CX = 3725;
const POPS: { kind: BotKey; x: number; y: number; at: number }[] = [
  { kind: "sales", x: 383, y: 375, at: r(356) },
  { kind: "ads", x: 872, y: 145, at: r(366) },
  { kind: "creative", x: 1390, y: 953, at: r(375) },
  { kind: "geo", x: 1725, y: 145, at: r(382) },
];

const ChipStack: React.FC<{ base: number }> = ({ base }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "relative", width: 1200 }}>
      {CHIPS.map((c, i) => {
        const at = c.at - base;
        const p = clamp(frame, at, at + 9, back);
        return (
          <div key={i} style={{ position: "relative", height: 150, opacity: p > 0 ? Math.min(1, p * 2) : 0, transform: `translateY(${(1 - p) * -80}px)` }}>
            <div style={{ position: "absolute", left: c.dx, top: 0, display: "inline-flex", alignItems: "center", gap: 16, background: "#FFF", border: "1.5px solid #E7E7E7", borderRadius: 999, padding: "24px 64px 24px 34px", fontFamily: SANS, fontSize: 50, color: INK, boxShadow: "0 8px 24px rgba(23,19,16,0.06)", whiteSpace: "nowrap" }}>
              <Img src={staticFile(c.icon)} style={{ width: 46, height: 46, objectFit: "contain" }} />
              {c.text}
            </div>
          </div>
        );
      })}
      <Deco kind="tick" color={ORANGE} at={r(318) - base} x={-46} y={520} rotate={-90} />
      <Deco kind="under" color={BLUE} at={r(320) - base} x={300} y={-14} width={130} />
      <Deco kind="arc" color={PINK} at={r(322) - base} x={1000} y={120} rotate={70} />
      <Deco kind="under" color={GREEN} at={r(326) - base} x={900} y={370} width={110} />
    </div>
  );
};

export const OrgStage: React.FC = () => {
  const frame = useCurrentFrame();
  const base = CUT.chips;
  const t = (f: number) => r(f) - base;
  const cell = cellCenter(CELL.col, CELL.row);
  const keys = [
    { at: 0, zoom: 1 / CHIP_SCALE, x: cell.x, y: cell.y + 30 },
    { at: t(336), zoom: 1 / CHIP_SCALE, x: cell.x, y: cell.y + 30 },
    ...SEARCH_CAM_X.map((x, i) => ({ at: t(341 + i), zoom: 1, x, y: 540 })),
    { at: t(437), zoom: 1, x: CLUSTER_CX - 5, y: 540 },
  ];
  const clusterTop = sample(CLUSTER_Y, frame, t(397));
  const typed = Math.min(SEARCH.length, Math.floor(Math.max(0, frame - t(345)) / 1.6));
  const gridIn = clamp(frame, t(337), t(342), Easing.linear);
  const pillIn = clamp(frame, t(340), t(341), Easing.linear);
  return (
    <AbsoluteFill>
      <KeyedRig id="org-rig" keys={keys} bg="#FDFDFD">
        <div style={{ opacity: gridIn }}>
          {Array.from({ length: GRID.cols * GRID.rows }, (_, i) => {
            const col = i % GRID.cols;
            const row = Math.floor(i / GRID.cols);
            const c = cellCenter(col, row);
            const kinds: BotKey[] = ["hero", "sales", "geo", "creative", "ads"];
            const isChipCell = col === CELL.col && row === CELL.row;
            return (
              <div key={i} style={{ position: "absolute", left: c.x - GRID.px / 2, top: c.y - GRID.py / 2, width: GRID.px, height: GRID.py, border: "1px dashed #E8E8EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {isChipCell ? null : <Bot kind={kinds[(i * 7 + row) % 5]} size={GRID.size} color={GREY_BOT} eyeColor="#FDFDFD" />}
              </div>
            );
          })}
        </div>
        <div style={{ position: "absolute", left: cell.x - 600 * CHIP_SCALE, top: cell.y - 300 * CHIP_SCALE, transform: `scale(${CHIP_SCALE})`, transformOrigin: "0 0", opacity: 1 - clamp(frame, t(341), t(344), Easing.linear) }}>
          <ChipStack base={base} />
        </div>
        {POPS.map((p, i) => {
          const s = clamp(frame, p.at - base, p.at - base + 8, back);
          return (
            <div key={i} style={{ position: "absolute", left: p.x - 75, top: p.y - 75, transform: `scale(${Math.max(0, s)})`, opacity: s > 0 ? 1 : 0 }}>
              <Bot kind={p.kind} size={150} gaze={{ x: Math.sin((frame + i * 9) / 24) * 0.5, y: 0 }} blink={blinkTrack(frame, [p.at - base + 30])} />
            </div>
          );
        })}
        <div style={{ position: "absolute", left: PILL.left, top: PILL.top, width: PILL.w, height: PILL.h, borderRadius: PILL.h / 2, background: "#FFF", boxShadow: "0 18px 70px rgba(23,19,16,0.14), 0 0 0 1px rgba(23,19,16,0.05)", display: "flex", alignItems: "center", gap: 110, padding: "0 0 0 177px", overflow: "hidden", opacity: pillIn }}>
          <Bot kind="hero" size={241} gaze={{ x: Math.sin(frame / 14) * 0.9, y: 0.1 }} blink={blinkTrack(frame, [t(352), t(356), t(376)])} />
          <span style={{ fontFamily: SANS, fontSize: 176, fontWeight: 400, letterSpacing: "-0.02em", whiteSpace: "pre", color: INK }}>
            {SEARCH.split("").map((ch, i) => (
              <span key={i} style={{ color: i < typed ? (i >= typed - 3 ? GREY : INK) : "transparent" }}>{ch}</span>
            ))}
          </span>
        </div>
        <Cluster at={t(397)} cx={CLUSTER_CX} cy={clusterTop + 200} scale={1} legsAt={t(402)} hopAt={t(408)} />
      </KeyedRig>
    </AbsoluteFill>
  );
};

const TASKS: { text: string; kind: Exclude<BotKey, "hero">; at: number }[] = [
  { text: "writing 12 blog articles…", kind: "sales", at: r(453) },
  { text: "reviewing ad creatives…", kind: "geo", at: r(462) },
  { text: "checking AI mentions…", kind: "creative", at: r(470) },
  { text: "publishing to Shopify…", kind: "ads", at: r(478) },
];

const Arrow: React.FC<{ x: number; y: number; at: number }> = ({ x, y, at }) => {
  const frame = useCurrentFrame();
  const s = clamp(frame, at, at + 6, back);
  return (
    <div style={{ position: "absolute", left: x, top: y, transform: `scale(${Math.max(0, s)})`, opacity: s > 0 ? 1 : 0 }}>
      <svg width={100} height={112} viewBox="0 0 70 78"><path d="M6 4 L64 40 L38 46 L52 72 L40 76 L26 50 L6 68 Z" fill={PURPLE} stroke="#FFF" strokeWidth={4} strokeLinejoin="round" /></svg>
      <div style={{ position: "absolute", left: 46, top: 62 }}>
        <Bot kind="hero" size={60} gaze={{ x: 0.3, y: 0.2 }} />
      </div>
    </div>
  );
};

export const TasksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const base = CUT.tasks;
  const sx = sample(SHRINK_X, frame, r(438) - base);
  const sy = sample(SHRINK_Y, frame, r(438) - base);
  const ss = sample(SHRINK_S, frame, r(438) - base) / 394;
  const scatter = clamp(frame, r(445) - base, r(456) - base);
  const clusterGone = frame >= r(456) - base;
  return (
    <AbsoluteFill>
      {!clusterGone ? <Cluster at={-100} cx={sx + 197 * ss} cy={sy + 200 * ss} scale={ss} labels={false} scatter={scatter} /> : null}
      <div style={{ position: "absolute", left: 120, top: 250, fontFamily: SANS, color: INK }}>
        <div style={{ fontSize: 92, fontWeight: 500, letterSpacing: "-0.02em", opacity: clamp(frame, r(440) - base, r(446) - base) }}>today’s tasks</div>
        {TASKS.map((t, i) => {
          const at = t.at - base;
          const typed = Math.min(t.text.length, Math.floor(Math.max(0, frame - at) / 0.45));
          const done = at + Math.ceil(t.text.length * 0.45);
          const land = clamp(frame, done, done + 8, back);
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 30, marginTop: 22, height: 82 }}>
              <span style={{ width: 40, height: 40, borderRadius: 20, border: "2px solid #DCDCDC", opacity: clamp(frame, r(441) - base + i * 2, r(447) - base + i * 2) }} />
              <span style={{ fontSize: 64, fontWeight: 500, letterSpacing: "-0.02em", whiteSpace: "pre", minWidth: 900 }}>
                {t.text.split("").map((ch, k) => (
                  <span key={k} style={{ color: k < typed ? (k > typed - 7 ? GREY : INK) : "transparent" }}>{ch}</span>
                ))}
              </span>
              <div style={{ transform: `scale(${Math.max(0, land)})`, opacity: land > 0 ? 1 : 0 }}>
                <Bot kind={t.kind} size={68} />
              </div>
            </div>
          );
        })}
      </div>
      <Arrow x={1180} y={210} at={r(445) - base} />
    </AbsoluteFill>
  );
};

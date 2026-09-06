import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { KineticBeats } from "../../kit/kinetic-beats";
import { FlipWall, GlowPlate, flipConfig } from "../../kit/flip-wall";
import { PromoPlayer } from "../../engine/promo/player";
import { PromoScenario } from "../../engine/promo/scenario";
import { T, FOOTAGE, sec } from "./timings";
import { WALL } from "./wall";

export const YT_FULL_TOTAL = T.total;

type ShaunState = "full" | "pip" | "hidden";
const SHAUN_KEYS: { at: number; state: ShaunState }[] = [
  { at: 0, state: "full" },
  { at: T.insert1At, state: "hidden" },
  { at: T.face2At, state: "full" },
  { at: T.auditAt, state: "pip" },
  { at: T.face3At, state: "full" },
  { at: T.articlesAt, state: "pip" },
  { at: T.insert2At, state: "hidden" },
  { at: T.adsAt, state: "pip" },
  { at: T.face4At, state: "full" },
  { at: T.approvalsAt, state: "pip" },
  { at: T.face5At, state: "full" },
  { at: T.outroAt, state: "hidden" },
];

const PIP = { x: 1920 - 424 - 28, y: 1080 - 238 - 28, w: 424, h: 238, r: 18 };
const RECTS: Record<ShaunState, { x: number; y: number; w: number; h: number; r: number; o: number }> = {
  full: { x: 0, y: 0, w: 1920, h: 1080, r: 0, o: 1 },
  pip: { ...{ x: PIP.x, y: PIP.y, w: PIP.w, h: PIP.h }, r: PIP.r, o: 1 },
  hidden: { ...{ x: PIP.x, y: PIP.y + 300, w: PIP.w, h: PIP.h }, r: PIP.r, o: 0 },
};

const ShaunLayer: React.FC = () => {
  const frame = useCurrentFrame();
  let idx = 0;
  for (let i = 0; i < SHAUN_KEYS.length; i++) if (frame >= SHAUN_KEYS[i].at) idx = i;
  const cur = SHAUN_KEYS[idx];
  const prev = SHAUN_KEYS[Math.max(0, idx - 1)];
  const spring = useSpringAt(cur.at, SPRINGS.panel, 24);
  const p = idx === 0 ? 1 : spring;
  const a = RECTS[prev.state];
  const b = RECTS[cur.state];
  const x = interpolate(p, [0, 1], [a.x, b.x]);
  const y = interpolate(p, [0, 1], [a.y, b.y]);
  const w = interpolate(p, [0, 1], [a.w, b.w]);
  const h = interpolate(p, [0, 1], [a.h, b.h]);
  const r = interpolate(p, [0, 1], [a.r, b.r]);
  const o = interpolate(p, [0, 1], [a.o, b.o]);
  const framed = w < 1900;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: r,
        overflow: "hidden",
        opacity: o,
        boxShadow: framed ? "0 18px 60px rgba(0,0,0,0.45)" : "none",
        border: framed ? "1px solid rgba(255,255,255,0.16)" : "none",
      }}
    >
      <OffthreadVideo
        src={staticFile("yt/shaun-full.mp4")}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

const b = (t: number) => sec(t) - T.insert1At;
const INSERT1_BEATS = [
  {
    at: b(23.0),
    words: [
      { t: "50", at: b(23.6), hl: true },
      { t: "browser", at: b(23.9), hl: true },
      { t: "tabs.", at: b(24.2), hl: true },
    ],
  },
  {
    at: b(25.4),
    words: [
      { t: "An", at: b(25.6) },
      { t: "agency", at: b(25.9) },
      { t: "at", at: b(26.2) },
      { t: "$5,000", at: b(26.6), hl: true, sparks: true },
      { t: "a", at: b(27.1), hl: true },
      { t: "month.", at: b(27.3), hl: true },
    ],
  },
  {
    at: b(28.6),
    words: [
      { t: "Weekends", at: b(29.0) },
      { t: "lost", at: b(29.5), hl: true },
      { t: "to", at: b(29.9), hl: true },
      { t: "tutorials.", at: b(30.2), hl: true },
    ],
  },
  {
    at: b(31.8),
    size: 128,
    words: [
      { t: "The", at: b(32.0) },
      { t: "new", at: b(32.3), hl: true, sparks: true },
      { t: "way:", at: b(32.6), hl: true },
      { t: "one", at: b(33.6), hl: true },
      { t: "chat", at: b(33.9), hl: true },
      { t: "box.", at: b(34.2), hl: true },
    ],
  },
];

const InsertOldWay: React.FC = () => (
  <AbsoluteFill>
    <KineticBeats beats={INSERT1_BEATS} total={T.face2At - T.insert1At} sfx={false} />
  </AbsoluteFill>
);

const InsertWall: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, T.adsAt - T.insert2At], [1.06, 1.0]);
  return (
    <AbsoluteFill style={{ background: "#171310", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: -160, transform: `rotate(-4deg) scale(${zoom})` }}>
        <FlipWall
          cfg={flipConfig({ size: 252, gap: 14, cols: 9, rows: 6, left: -60, top: -120 })}
          fronts={WALL.slice()}
          backs={[[{ kind: "ad", title: "", meta: "" }]]}
          appearFrom={0}
          appearStep={0.9}
          flipAts={[]}
        />
      </div>
      <GlowPlate opacity={0.5} />
    </AbsoluteFill>
  );
};

const ApprovalsKenBurns: React.FC = () => {
  const frame = useCurrentFrame();
  const len = T.face5At - T.approvalsAt;
  const scale = interpolate(frame, [0, len], [1.05, 1.22]);
  const ty = interpolate(frame, [0, len], [0, -140]);
  return (
    <AbsoluteFill style={{ background: "#FDFAF3", overflow: "hidden" }}>
      <Img
        src={staticFile("yt/approvals-full.png")}
        style={{ width: 1920, transform: `scale(${scale}) translateY(${ty}px)`, transformOrigin: "50% 30%" }}
      />
    </AbsoluteFill>
  );
};

const OUTRO: PromoScenario = {
  id: "yt-full-outro",
  format: "wide",
  background: "#FDFAF3",
  ink: "#171310",
  transition: "cut",
  scenes: [
    {
      kind: "lockup",
      background: "#FDFAF3",
      mark: "ryze-sun.png",
      word: "Ryze AI",
      tagline: "Put your marketing on autopilot at get-ryze.ai",
    },
  ],
};

const Clip: React.FC<{ src: string; from: number }> = ({ src, from }) => (
  <OffthreadVideo
    muted
    src={staticFile(src)}
    startFrom={from}
    style={{ width: 1920, height: 1080, objectFit: "cover" }}
  />
);

export const YtFull: React.FC = () => (
  <AbsoluteFill style={{ background: "#0e0f11" }}>
    <Sequence from={T.auditAt - 8} durationInFrames={T.auditJumpAt - T.auditAt + 8}>
      <Clip src={FOOTAGE.audit.src} from={FOOTAGE.audit.fromA} />
    </Sequence>
    <Sequence from={T.auditJumpAt} durationInFrames={T.face3At - T.auditJumpAt}>
      <Clip src={FOOTAGE.audit.src} from={FOOTAGE.audit.fromB} />
    </Sequence>

    <Sequence from={T.articlesAt - 8} durationInFrames={T.blogStudioAt - T.articlesAt + 8}>
      <Clip src={FOOTAGE.tour.src} from={FOOTAGE.tour.fromA} />
    </Sequence>
    <Sequence from={T.blogStudioAt} durationInFrames={T.insert2At - T.blogStudioAt}>
      <Clip src={FOOTAGE.tour.src} from={FOOTAGE.tour.fromB} />
    </Sequence>

    <Sequence from={T.insert2At} durationInFrames={T.adsAt - T.insert2At}>
      <InsertWall />
    </Sequence>

    <Sequence from={T.adsAt} durationInFrames={T.compAdsAt - T.adsAt}>
      <Clip src={FOOTAGE.ads.src} from={FOOTAGE.ads.fromA} />
    </Sequence>
    <Sequence from={T.compAdsAt} durationInFrames={T.creativesAt - T.compAdsAt}>
      <Clip src={FOOTAGE.ads.src} from={FOOTAGE.ads.fromB} />
    </Sequence>
    <Sequence from={T.creativesAt} durationInFrames={T.face4At - T.creativesAt}>
      <Clip src={FOOTAGE.ads.src} from={FOOTAGE.ads.fromC} />
    </Sequence>

    <Sequence from={T.approvalsAt} durationInFrames={T.face5At - T.approvalsAt}>
      <ApprovalsKenBurns />
    </Sequence>

    <Sequence from={T.insert1At} durationInFrames={T.face2At - T.insert1At}>
      <InsertOldWay />
    </Sequence>

    <Sequence from={T.outroAt}>
      <PromoPlayer scenario={OUTRO} />
    </Sequence>

    <ShaunLayer />
  </AbsoluteFill>
);

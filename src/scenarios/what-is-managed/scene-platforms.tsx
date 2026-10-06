import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { Pop } from "../../kit/pop";
import { COPY, PLATFORMS } from "./data";
import { K_PLATFORMS as K } from "./timings";
import { OPTION, OptionCard } from "./ui/option-card";
import { StepTitle, Zoom, bump, zoneTop, zoomPoint } from "../../kit/explainer";
import { P } from "../../kit/product-ui";

const S = 2.2;
const COL_W = 300;
const GAP_X = 12;
const GAP_Y = 8;
const GRID_W = COL_W * 2 + GAP_X;
const GRID_H = OPTION.rowH * 4 + GAP_Y * 3 + OPTION.openH;
const TOP = zoneTop(GRID_H * S);
const META_AT = K.pick + 2;
const GOOGLE_AT = K.run;
const CLICK_AT = [META_AT, GOOGLE_AT] as const;

const CHECK_X = COL_W - 12 - 8;
const checkbox = (i: number) => zoomPoint(GRID_W, S, TOP, (i % 2) * (COL_W + GAP_X) + CHECK_X, OPTION.rowH / 2);

const Cell: React.FC<{ i: number; colShift: number }> = ({ i, colShift }) => {
  const f = useCurrentFrame();
  const p = PLATFORMS[i];
  const clickAt = i < 2 ? CLICK_AT[i] : 100000;
  const sel = useSpringAt(clickAt, SPRINGS.smooth, 10);
  const open = useSpringAt(clickAt + 3, SPRINGS.card, 18);
  const named = i < 4 ? K.names[i] : K.four;
  const glow = bump(f, named);
  const row = Math.floor(i / 2);
  return (
    <div style={{ position: "absolute", left: (i % 2) * (COL_W + GAP_X), top: row * (OPTION.rowH + GAP_Y) + (row > 0 ? colShift : 0), width: COL_W }}>
      <Pop at={K.connect - 2 + i * 2} from={0.85} rise={12}>
        <div style={{ width: COL_W }}>
          <OptionCard label={p.label} logo={p.logo} sel={p.picked ? sel : 0} open={p.picked ? open : 0} glow={glow} account={COPY.account} />
        </div>
      </Pop>
    </div>
  );
};

export const PlatformsScene: React.FC = () => {
  const openMeta = useSpringAt(META_AT + 3, SPRINGS.card, 18);
  const openGoogle = useSpringAt(GOOGLE_AT + 3, SPRINGS.card, 18);
  const f = useCurrentFrame();
  const shifts = [OPTION.openH * openMeta, OPTION.openH * openGoogle];
  const meta = checkbox(0);
  const google = checkbox(1);
  const cursorFade = 1 - ramp(f, GOOGLE_AT + 10, GOOGLE_AT + 18);
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={1} text="Pick where your ads run" at={-8} />
        <Zoom w={GRID_W} s={S} top={TOP} style={{ height: GRID_H }}>
          {PLATFORMS.map((p, i) => (
            <Cell key={p.label} i={i} colShift={shifts[i % 2]} />
          ))}
        </Zoom>
        <div style={{ position: "absolute", inset: 0, opacity: cursorFade }}>
        <Cursor
          appearAt={META_AT - 16}
          scale={1.7}
          stops={[
            { x: 1560, y: 980, at: META_AT - 16 },
            { x: meta.x - 4, y: meta.y - 4, at: META_AT, click: true },
            { x: google.x - 4, y: google.y - 4, at: GOOGLE_AT, click: true },
            { x: google.x + 150, y: google.y + 40, at: GOOGLE_AT + 22 },
          ]}
        />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const PLATFORM_CLICKS = CLICK_AT;

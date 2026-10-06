import React from "react";
import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { Figures, type FigureShot } from "./figure";
import { Check, Labels, type LabelSpec } from "./labels";
import { WordCaption } from "./word-caption";
import { Endcard, RyzeLockup } from "./endcard";
import { GROUND, W } from "./theme";
import { T, TOTAL, WORDS } from "./timings";

const SHOTS: FigureShot[] = [
  { pose: "base", from: T.hook },
  { pose: "desk-sad", from: T.zero },
  { pose: "idea", from: T.idea },
  { pose: "overwhelmed", from: T.overwhelmed, scale: 0.72, dy: 60 },
  { pose: "desk-confused", from: T.confused },
  { pose: "money", from: T.money },
  { pose: "standing", from: T.ryze },
  { pose: "relaxed", from: T.relaxed },
  { pose: "typing", from: T.typing },
  { pose: "thumbs-up", from: T.thumbs, dx: -110, dy: 40 },
  { pose: "walking", from: T.walking },
  { pose: "sleeping", from: T.sleeping },
  { pose: "phone", from: T.phone },
  { pose: "clock", from: T.clock },
  { pose: "crowd", from: T.crowd, scale: 1.04 },
];

const LABELS: LabelSpec[] = [
  { text: "Founder", from: T.hook, until: T.zero, x: 150, y: 330, size: 48, arrow: { x1: 240, y1: 410, x2: 400, y2: 600, curve: -70 } },
  { text: "On autopilot.", from: T.autopilotLabel, until: T.overwhelmed, x: 0, y: 300, size: 48, align: "center" },
  { text: "Fresh content", from: T.labelContent, until: T.confused, x: 90, y: 700, size: 40, arrow: { x1: 200, y1: 770, x2: 380, y2: 900 } },
  { text: "Backlinks", from: T.labelBacklinks, until: T.confused, x: 0, y: 470, size: 40, align: "center", arrow: { x1: 540, y1: 545, x2: 540, y2: 720 } },
  { text: "AI Visibility", from: T.labelAi, until: T.confused, x: 990, y: 700, size: 40, align: "right", arrow: { x1: 880, y1: 770, x2: 700, y2: 900 } },
  { text: "Daily SEO\noptimized articles", from: T.check1, until: T.walking, x: 0, y: 250, size: 40, align: "center" },
  { text: "+\nBuilds backlinks automatically", from: T.check2, until: T.walking, x: 0, y: 360, size: 40, align: "center" },
  { text: "+ AI Visibility so\ncustomers find you\non ChatGPT and more", from: T.check3, until: T.walking, x: 0, y: 1320, size: 40, align: "center" },
  { text: "3,000+", from: T.crowd + 6, until: T.endcard, x: 0, y: 330, size: 56, align: "center" },
];

const CHECK_X = 690;

export const AutopilotFounder: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND }}>
    <Sequence durationInFrames={T.endcard} layout="none">
      <Figures shots={SHOTS} total={T.endcard} />
      <Labels labels={LABELS} />
      <Sequence from={T.ryze} durationInFrames={T.relaxed - T.ryze} layout="none">
        <div style={{ position: "absolute", left: 0, width: W, top: 300, textAlign: "center" }}>
          <RyzeLockup at={2} size={84} />
        </div>
        <div style={{ position: "absolute", left: 640, top: 760 }}>
          <AutopilotBadge />
        </div>
      </Sequence>
      <Sequence from={T.thumbs} durationInFrames={T.walking - T.thumbs} layout="none">
        <Check at={T.check1 - T.thumbs} x={CHECK_X} y={760} />
        <Check at={T.check2 - T.thumbs} x={CHECK_X} y={900} />
        <Check at={T.check3 - T.thumbs} x={CHECK_X} y={1040} />
      </Sequence>
      <WordCaption words={WORDS} until={T.endcard} />
    </Sequence>
    <Sequence from={T.endcard} durationInFrames={TOTAL - T.endcard}>
      <Endcard />
    </Sequence>
    <Sequence layout="none">
      <Audio src={staticFile("vo/autopilot-founder/_take.mp3")} />
    </Sequence>
  </AbsoluteFill>
);

import { Pop } from "../../kit/pop";
import { FONT, INK } from "./theme";

const AutopilotBadge: React.FC = () => (
  <Pop at={10} from={0.4} rise={0}>
    <svg width={190} height={190} viewBox="0 0 190 190">
      <circle cx={95} cy={95} r={86} stroke={INK} strokeWidth={4.5} fill="none" />
      <text x={95} y={82} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={INK} letterSpacing={1}>
        AUTO
      </text>
      <text x={95} y={118} textAnchor="middle" fontFamily={FONT} fontWeight={800} fontSize={30} fill={INK} letterSpacing={1}>
        PILOT
      </text>
    </svg>
  </Pop>
);

export const AUTOPILOT_FOUNDER_TOTAL = TOTAL;

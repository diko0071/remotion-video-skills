import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame } from "remotion";
import { CamKey } from "../../core/stage";
import { KeyedRig } from "../../kit/keyed-rig";
import { C, CornerLockup, LaunchHeadline, LaunchLine, SANS, UrlPlateEndCard } from "../../kit/launch";
import { CAST } from "./cast";
import { Crowd } from "./crowd";
import { EndRow } from "./end";
import { OClose } from "./o-close";
import { PLATE } from "./theme";
import { ToolShot } from "./tool-shot";
import { HEAD_ENDS, HEAD_STARTS, O_TOTAL, SHOTS, T } from "./timings";

export { O_TOTAL } from "./timings";

const HEADLINES: LaunchLine[] = [
  { words: ["Your", "marketing", "stack,", "every", "morning."], plate: [3, 4] },
  { words: ["Then", "your", "dot", "showed", "up."], plate: [1, 2] },
  { words: ["Ryze", "connects", "it", "to", "every", "tool."], plate: [4, 5] },
  { words: ["It", "fixes", "them,", "tool", "by", "tool."], plate: [3, 5] },
  { words: ["Your", "stack,", "finally", "calm."], plate: [2, 3] },
];

const lin = (t: number) => t;

type CrowdShotSpec = { from: number; len: number; keys: CamKey[]; shake?: number };

const CROWD_SHOTS: CrowdShotSpec[] = [
  {
    from: SHOTS.chaos.from,
    len: T.gazeCut - SHOTS.chaos.from,
    shake: 1.6,
    keys: [
      { at: 0, zoom: 1.12, x: 960, y: 600 },
      { at: T.gazeCut - SHOTS.chaos.from, zoom: 1.18, x: 960, y: 600, ease: lin },
    ],
  },
  {
    from: T.gazeCut,
    len: SHOTS.oClose.from - T.gazeCut,
    keys: [
      { at: 0, zoom: 1.3, x: 960, y: 600 },
      { at: SHOTS.oClose.from - T.gazeCut, zoom: 1.38, x: 960, y: 610, ease: lin },
    ],
  },
  {
    from: SHOTS.lines.from,
    len: SHOTS.lines.len,
    keys: [
      { at: 0, zoom: 1.06, x: 960, y: 610 },
      { at: SHOTS.lines.len, zoom: 1.12, x: 960, y: 610, ease: lin },
    ],
  },
  {
    from: SHOTS.cascade.from,
    len: SHOTS.cascade.len,
    keys: [
      { at: 0, zoom: 1, x: 960, y: 610 },
      { at: 60, zoom: 1.03, x: 960, y: 610, ease: lin },
      { at: SHOTS.cascade.len, zoom: 1.1, x: 960, y: 570 },
    ],
  },
];

const CrowdShot: React.FC<{ spec: CrowdShotSpec; index: number }> = ({ spec, index }) => {
  const f = useCurrentFrame();
  return (
    <KeyedRig id={`o-crowd-${index}`} keys={spec.keys} bg={C.cream}>
      <Crowd g={f + spec.from} shake={spec.shake} />
    </KeyedRig>
  );
};

const fixLocal = (k: number, from: number) => CAST[k].fixAt - from;

export const OMarketing: React.FC = () => (
  <AbsoluteFill style={{ background: C.cream, fontFamily: SANS, overflow: "hidden" }}>
    <Sequence from={SHOTS.metaPanic.from} durationInFrames={SHOTS.metaPanic.len}>
      <ToolShot t={CAST[0]} len={SHOTS.metaPanic.len} mode="panic" enter={false} />
    </Sequence>
    <Sequence from={SHOTS.gadsPanic.from} durationInFrames={SHOTS.gadsPanic.len}>
      <ToolShot t={CAST[1]} len={SHOTS.gadsPanic.len} mode="panic" />
    </Sequence>
    <Sequence from={SHOTS.shopPanic.from} durationInFrames={SHOTS.shopPanic.len}>
      <ToolShot t={CAST[2]} len={SHOTS.shopPanic.len} mode="panic" />
    </Sequence>
    <Sequence from={SHOTS.gaPanic.from} durationInFrames={SHOTS.gaPanic.len}>
      <ToolShot t={CAST[3]} len={SHOTS.gaPanic.len} mode="panic" />
    </Sequence>
    {CROWD_SHOTS.map((spec, i) => (
      <Sequence key={spec.from} from={spec.from} durationInFrames={spec.len}>
        <CrowdShot spec={spec} index={i} />
      </Sequence>
    ))}
    <Sequence from={SHOTS.oClose.from} durationInFrames={SHOTS.oClose.len}>
      <OClose />
    </Sequence>
    <Sequence from={SHOTS.metaFix.from} durationInFrames={SHOTS.metaFix.len}>
      <ToolShot t={CAST[0]} len={SHOTS.metaFix.len} mode="fix" fixLocal={fixLocal(0, SHOTS.metaFix.from)} />
    </Sequence>
    <Sequence from={SHOTS.gadsFix.from} durationInFrames={SHOTS.gadsFix.len}>
      <ToolShot t={CAST[1]} len={SHOTS.gadsFix.len} mode="fix" fixLocal={fixLocal(1, SHOTS.gadsFix.from)} />
    </Sequence>
    <Sequence from={SHOTS.shopFix.from} durationInFrames={SHOTS.shopFix.len}>
      <ToolShot t={CAST[2]} len={SHOTS.shopFix.len} mode="fix" fixLocal={fixLocal(2, SHOTS.shopFix.from)} />
    </Sequence>
    <Sequence from={SHOTS.end.from} durationInFrames={SHOTS.end.len}>
      <EndRow />
    </Sequence>
    <UrlPlateEndCard lead="Let your dot run your marketing:" url="ryze.ai/gpt" at={T.url} total={O_TOTAL} plate={PLATE} />
    <LaunchHeadline lines={HEADLINES} starts={HEAD_STARTS} ends={HEAD_ENDS} plate={PLATE} />
    <CornerLockup pulseAt={T.slap} />
  </AbsoluteFill>
);

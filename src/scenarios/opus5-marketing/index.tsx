import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { FilterDefs } from "../../kit/directional-blur";
import { KeyedRig } from "../../kit/keyed-rig";
import { Lockup } from "../../kit/lockup";
import { CaseScene } from "./cases";
import { ProblemScene } from "./problem";
import { ProofScene } from "./proof";
import { RevealScene } from "./reveal";
import { WelcomeScene } from "./scene-welcome";
import { ThreadScene } from "./scene-thread";
import { CAM_T, CAM_W, CASES, CASES_FROM, CLAUDE_BG, CLOSE_FROM, CLOSE_LEN, DARK, INK, PAPER, PROOF, PROOF_FROM, REVEAL, THREAD, TOTAL } from "./timings";

export const OPUS5_MARKETING_TOTAL = TOTAL;

const caseStarts = CASES.reduce<number[]>((acc, c, i) => [...acc, i === 0 ? CASES_FROM : acc[i - 1] + CASES[i - 1].len], []);

export const Opus5Marketing: React.FC = () => (
  <AbsoluteFill style={{ background: DARK }}>
    <FilterDefs />
    <Sequence durationInFrames={REVEAL.from}>
      <ProblemScene />
    </Sequence>
    <Sequence from={REVEAL.from} durationInFrames={REVEAL.cut - REVEAL.from}>
      <Sequence from={-REVEAL.from} layout="none">
        <RevealScene />
      </Sequence>
    </Sequence>
    <Sequence from={REVEAL.cut} durationInFrames={THREAD.from - REVEAL.cut}>
      <Sequence from={-REVEAL.cut} layout="none">
        <KeyedRig id="o5-rig-w" keys={CAM_W} bg={CLAUDE_BG}>
          <WelcomeScene />
        </KeyedRig>
      </Sequence>
    </Sequence>
    <Sequence from={THREAD.from} durationInFrames={THREAD.len}>
      <KeyedRig id="o5-rig-t" keys={CAM_T} bg={CLAUDE_BG}>
        <ThreadScene />
      </KeyedRig>
    </Sequence>
    {CASES.map((c, i) => (
      <Sequence key={c.label} from={caseStarts[i]} durationInFrames={c.len}>
        <CaseScene index={i} />
      </Sequence>
    ))}
    <Sequence from={PROOF_FROM} durationInFrames={PROOF.len}>
      <ProofScene />
    </Sequence>
    <Sequence from={CLOSE_FROM} durationInFrames={CLOSE_LEN}>
      <Lockup mark="ryze-sun.png" word="Ryze AI" background={PAPER} ink={INK} tagline="Opus 5 for Marketing" />
    </Sequence>
  </AbsoluteFill>
);

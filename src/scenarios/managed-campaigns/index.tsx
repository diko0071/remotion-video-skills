import React from "react";
import { AbsoluteFill, Easing, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { ramp } from "../../core/motion";
import { CornerLockup } from "../../kit/launch";
import { Lockup } from "../../kit/lockup";
import { ASK_BOX, ASK_TIMES } from "./body-ask";
import { CampaignCard, HEADER_H } from "./campaign-card";
import { Pointer } from "./parts";
import { FormScene } from "./scene-form";
import { IntroScene } from "./scene-intro";
import { StepTitle } from "./step-title";
import { CARD, GROUND, STAGE_ORIGIN, STAGE_SCALE } from "./theme";
import { T, VO_LINES } from "./timings";

export { MC_TOTAL } from "./timings";

const SEND_POINT = { x: CARD.x + CARD.w / 2 - 40 - 12 - ASK_BOX.button / 2 + 30, y: CARD.top + HEADER_H + ASK_BOX.top + ASK_BOX.h / 2 - 4 };
const CLICKS = [T.step1.create - 4, ASK_TIMES.send] as const;

const Push: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  const s = STAGE_SCALE + 0.02 * ramp(f, T.step1.at, T.close.cut, Easing.linear);
  return <AbsoluteFill style={{ transform: `scale(${s})`, transformOrigin: `${STAGE_ORIGIN.x}px ${STAGE_ORIGIN.y}px` }}>{children}</AbsoluteFill>;
};

export const ManagedCampaigns: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: GROUND, overflow: "hidden" }}>
      <IntroScene />
      {f < T.close.cut ? (
        <Push>
          <FormScene />
          <CampaignCard />
          <Pointer
            from={ASK_TIMES.send - 22}
            until={ASK_TIMES.send + 10}
            click={ASK_TIMES.send}
            stops={[
              { x: 1640, y: 1040, at: ASK_TIMES.send - 22 },
              { x: SEND_POINT.x, y: SEND_POINT.y, at: ASK_TIMES.send - 6 },
            ]}
          />
        </Push>
      ) : (
        <Sequence from={T.close.cut} layout="none">
          <Lockup mark="ryze-sun.png" word="Ryze AI" tagline="Put your marketing on autopilot at ryze.ai" background={GROUND} />
        </Sequence>
      )}
      <StepTitle />
      {f < T.close.cut ? <CornerLockup /> : null}
      {VO_LINES.map((l) => (
        <Sequence key={l.key} from={l.at} layout="none">
          <Audio src={staticFile(`vo/managed-campaigns/${l.key}.mp3`)} />
        </Sequence>
      ))}
      {CLICKS.map((at) => (
        <Sequence key={at} from={at - 1} durationInFrames={20} layout="none">
          <Audio src={staticFile("sfx/mouse-click.wav")} volume={0.7} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

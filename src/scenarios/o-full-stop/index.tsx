import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { CornerLockup } from "../../kit/launch";
import { CAMERA, shakeAt, tiltAt } from "./camera";
import { Crew } from "./crew-view";
import { EndCard } from "./end-card";
import { useFontReady } from "./font";
import { TiltRig } from "../../kit/tilt-rig";
import { ChartScene } from "./scene-chart";
import { StoreScene } from "./scene-store";
import { TermsScene } from "./scene-terms";
import { Soundtrack } from "./soundtrack";
import { statement } from "./stage";
import { Storm } from "./storm";
import { PAPER } from "./theme";
import { END, STORM } from "./timings";

export { FS_TOTAL } from "./timings";

export const OFullStop: React.FC = () => {
  const ready = useFontReady();
  const f = useCurrentFrame();
  if (!ready) return <AbsoluteFill style={{ background: PAPER }} />;
  return (
    <AbsoluteFill style={{ background: PAPER }}>
      {f < END.cut ? (
        <TiltRig id="fs-rig" keys={CAMERA} tilt={tiltAt} shake={shakeAt} bg={PAPER} blur={0.5}>
          <Storm statement={statement()} />
          <ChartScene />
          <TermsScene />
          <StoreScene />
          <Crew />
        </TiltRig>
      ) : (
        <EndCard />
      )}
      <AbsoluteFill style={{ opacity: ramp(f, STORM.land + 4, STORM.land + 14) }}>
        <CornerLockup />
      </AbsoluteFill>
      <Soundtrack />
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CornerLockup } from "../../kit/launch";
import { Land, Sky } from "./backdrop";
import { Cast, SkySun } from "./cast-view";
import { Chips, EndCard, LevelChip, Tracker } from "./hud";
import { Soundtrack } from "./soundtrack";
import { Stage } from "./stage";
import { GREY_FILTER, PALETTE } from "./theme";
import { Wave, waveDone } from "./wave";
import { WorldBack, WorldFront } from "./world";

export { LO_TOTAL } from "./timings";

export const OLockedOut: React.FC = () => {
  const f = useCurrentFrame();
  const grey = !waveDone(f);
  return (
    <AbsoluteFill style={{ background: PALETTE.sky.grey }}>
      {grey ? <Sky mode="grey" /> : null}
      <Wave>
        <Sky mode="color" />
      </Wave>
      <Stage id="lo-sky">
        <SkySun />
      </Stage>
      {grey ? <Land mode="grey" /> : null}
      <Wave>
        <Land mode="color" />
      </Wave>
      {grey ? (
        <Stage id="lo-back-grey" filter={GREY_FILTER}>
          <WorldBack />
        </Stage>
      ) : null}
      <Wave>
        <Stage id="lo-back">
          <WorldBack />
        </Stage>
      </Wave>
      <Stage id="lo-cast">
        <Cast />
      </Stage>
      {grey ? (
        <Stage id="lo-front-grey" filter={GREY_FILTER}>
          <WorldFront />
        </Stage>
      ) : null}
      <Wave>
        <Stage id="lo-front">
          <WorldFront />
        </Stage>
      </Wave>
      <Chips />
      <LevelChip />
      <Tracker />
      <EndCard />
      <CornerLockup />
      <Soundtrack />
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill } from "remotion";
import { TiltRig } from "../../kit/tilt-rig";
import { CAMERA, noTilt, shakeAt } from "./camera";

export const Stage: React.FC<{ id: string; filter?: string; children: React.ReactNode }> = ({ id, filter, children }) => (
  <AbsoluteFill style={{ filter }}>
    <TiltRig id={id} keys={CAMERA} tilt={noTilt} shake={shakeAt} blur={0.8}>
      {children}
    </TiltRig>
  </AbsoluteFill>
);

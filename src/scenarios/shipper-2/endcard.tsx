import React from "react";
import { AbsoluteFill } from "remotion";
import { SERIF } from "./fonts";
import { Scramble } from "./scramble";
import { CUT_END, END_SCRAMBLE, INK } from "./timings";

export const EndcardScene: React.FC = () => (
  <AbsoluteFill style={{ background: "#FCFCFC", alignItems: "center", justifyContent: "center" }}>
    <div style={{ fontFamily: SERIF, fontSize: 110, fontWeight: 700, color: INK, letterSpacing: "-0.02em" }}>
      <Scramble text="Shipper" from={END_SCRAMBLE.from - CUT_END} to={END_SCRAMBLE.to - CUT_END} />
    </div>
  </AbsoluteFill>
);

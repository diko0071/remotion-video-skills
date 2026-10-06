import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { RiseLetters } from "../../kit/rise-letters";
import { SettleLine } from "../../kit/settle-text";
import { SANS } from "./font";
import { CREAM, DARK, GOLD, PROOF } from "./timings";

export const ProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const count = Math.round(PROOF.countStart + (5000 - PROOF.countStart) * ramp(frame, PROOF.countFrom, PROOF.countTo, Easing.out(Easing.cubic)));
  const beat1Out = ramp(frame, PROOF.beat2 - 6, PROOF.beat2);
  const pop = ramp(frame, PROOF.countFrom, PROOF.countFrom + 10, Easing.out(Easing.back(1.6)));
  return (
    <AbsoluteFill style={{ background: DARK, fontFamily: SANS }}>
      {frame < PROOF.beat2 ? (
        <AbsoluteFill style={{ opacity: 1 - beat1Out, filter: beat1Out > 0.02 ? `blur(${beat1Out * 12}px)` : undefined }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 440, transform: `translateY(-50%) scale(${0.7 + 0.3 * pop})`, textAlign: "center", fontSize: 300, fontWeight: 600, letterSpacing: "-0.05em", color: GOLD, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {count.toLocaleString("en-US")}+
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 690, transform: "translateY(-50%)", textAlign: "center", fontSize: 76, fontWeight: 500, letterSpacing: "-0.02em" }}>
            <RiseLetters text={["marketers", " already", " run", " on", " it"]} from={[PROOF.subAt, PROOF.subAt + 3, PROOF.subAt + 6, PROOF.subAt + 8, PROOF.subAt + 10]} len={10} color={CREAM} />
          </div>
        </AbsoluteFill>
      ) : null}
      {frame >= PROOF.beat2 - 6 ? (
        <SettleLine
          size={150}
          ink={CREAM}
          fontFamily={SANS}
          weight={600}
          lineHeight={1.08}
          parts={[
            { word: "Thousands", at: PROOF.beat2 - 4 },
            { word: "of", at: PROOF.beat2 },
            { word: "ads", at: PROOF.beat2 + 4 },
            { br: true },
            { word: "live", at: PROOF.beat2 + 12, dim: true },
            { word: "every", at: PROOF.beat2 + 16, dim: true },
            { word: "week.", at: PROOF.beat2 + 20, dim: true },
          ]}
        />
      ) : null}
    </AbsoluteFill>
  );
};

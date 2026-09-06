import React from "react";
import { AbsoluteFill } from "remotion";
import { useReveal } from "../../core/motion";
import { HighlightWord, InlineTile } from "../../kit/kinetic-text";
import { KineticBeats } from "../../kit/kinetic-beats";
import { K1_BEATS, K2_BEATS, K3_BEATS } from "./timings";

export const KineticHook: React.FC<{ total: number }> = ({ total }) => (
  <KineticBeats beats={K1_BEATS} total={total} sfx={false} />
);
export const KineticGuess: React.FC<{ total: number }> = ({ total }) => (
  <KineticBeats beats={K2_BEATS} total={total} sfx={false} />
);
export const KineticTurn: React.FC<{ total: number }> = ({ total }) => (
  <KineticBeats beats={K3_BEATS} total={total} sfx={false} />
);

export const MoodboardHook: React.FC = () => {
  const style = useReveal(4, 40, 20);
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <div
        style={{
          ...style,
          maxWidth: 1640,
          textAlign: "center",
          fontSize: 108,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.35,
          color: "#171310",
        }}
      >
        100,000 winners become
        <br />
        <InlineTile src="dusk/dusk-sq-1.png" at={12} tilt={-3} cover size={220} />
        your{" "}
        <HighlightWord at={18}>moodboard</HighlightWord>.
      </div>
    </AbsoluteFill>
  );
};

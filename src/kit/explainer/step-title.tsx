import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { SettleLine } from "../settle-text";
import { FONT, P } from "../product-ui/tokens";
import { STAGE } from "./stage";

const STAGGER = 3;

export const StepTitle: React.FC<{ step?: number; text: string; at: number; out?: number; eyebrowAt?: number; keepEyebrow?: boolean }> = ({
  step,
  text,
  at,
  out,
  eyebrowAt,
  keepEyebrow,
}) => {
  const f = useCurrentFrame();
  const gone = out === undefined ? 0 : ramp(f, out, out + 6);
  const eyebrowStart = eyebrowAt ?? at;
  const eyebrow = ramp(f, eyebrowStart, eyebrowStart + 10) * (keepEyebrow ? 1 : 1 - gone);
  const words = text.split(" ").map((word, i) => ({ word, at: at + i * STAGGER }));
  return (
    <>
      {step ? (
        <div
          style={{
            position: "absolute",
            top: STAGE.titleTop - 46,
            width: STAGE.w,
            textAlign: "center",
            fontFamily: FONT,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.01em",
            color: P.brandDeep,
            opacity: eyebrow,
          }}
        >
          Step {step}
        </div>
      ) : null}
      <div style={{ position: "absolute", top: STAGE.titleTop, left: 0, width: STAGE.w, height: 110, opacity: 1 - gone, transform: `translateY(${-14 * gone}px)` }}>
        <SettleLine parts={words} size={72} weight={700} ink={P.fg} fontFamily={FONT} lineHeight={1.3} />
      </div>
    </>
  );
};

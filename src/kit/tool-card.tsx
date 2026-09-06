import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";
import { CheckIcon } from "./ryze-ui/icons";
import { ToolFlow, ToolSpec } from "./tool-flow";
import { CARD_STYLE } from "./promo-blocks";

export const ToolCard: React.FC<{
  tools: ToolSpec[];
  appearAt?: number;
  doneLine?: { at: number; text: string };
  width?: number;
}> = ({ tools, appearAt = 0, doneLine, width }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(appearAt, SPRINGS.card);
  const doneP = useSpringAt(doneLine?.at ?? 0, SPRINGS.smooth, 22);
  if (frame < appearAt) return null;
  return (
    <div
      style={{
        width,
        ...CARD_STYLE,
        padding: "28px 30px",
        opacity: Math.min(1, p * 1.3),
        transform: `translateY(${interpolate(p, [0, 1], [40, 0])}px)`,
      }}
    >
      <ToolFlow tools={tools} />
      {doneLine && frame >= doneLine.at ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 18,
            fontSize: 22,
            fontWeight: 700,
            color: "#059669",
            opacity: doneP,
            transform: `translateY(${interpolate(doneP, [0, 1], [12, 0])}px)`,
          }}
        >
          <CheckIcon size={20} /> {doneLine.text}
        </div>
      ) : null}
    </div>
  );
};

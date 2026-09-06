import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { Pulse, Shimmer, SPRINGS, useSpringAt } from "../../core/motion";
import type { ChatReasoning } from "./types";

const BrainIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    width={16}
    height={16}
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ flexShrink: 0 }}
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
  </svg>
);

export const ReasoningRow: React.FC<{
  reasoning: ChatReasoning;
  start: number;
  doneAt: number;
  frozen: boolean;
}> = ({ reasoning, start, doneAt, frozen }) => {
  const p = useSpringAt(start, SPRINGS.smooth, 14);
  const frame = useCurrentFrame();
  const done = frozen || frame >= doneAt;
  const label = done
    ? reasoning.seconds > 1
      ? `Thought for ${Math.round(reasoning.seconds)}s`
      : "Thought"
    : "Thinking…";

  if (!frozen && frame < start) return null;

  return (
    <div
      className="tool-row"
      style={
        frozen
          ? undefined
          : { opacity: p, transform: `translateY(${interpolate(p, [0, 1], [-4, 0])}px)` }
      }
    >
      <span className="chev" style={{ position: "relative", top: -1 }}>
        {done ? (
          <BrainIcon />
        ) : (
          <Pulse>
            <BrainIcon />
          </Pulse>
        )}
      </span>
      {done ? <span className="label">{label}</span> : <Shimmer text={label} />}
    </div>
  );
};

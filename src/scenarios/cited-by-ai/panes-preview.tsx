import React from "react";
import { AbsoluteFill } from "remotion";
import { ChatgptPane, ClaudePane, GeminiPane, PerplexityPane } from "./ai-panes";
import { QUESTION } from "./timings";

const Q = { typed: QUESTION, caret: true };

export const PanesPreview: React.FC = () => (
  <AbsoluteFill style={{ background: "#E8E4DC" }}>
    {[ChatgptPane, ClaudePane, PerplexityPane, GeminiPane].map((Pane, i) => (
      <div
        key={i}
        style={{
          position: "absolute",
          left: (i % 2) * 960 + 8,
          top: Math.floor(i / 2) * 540 + 8,
          width: 944,
          height: 524,
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        <div style={{ transform: "scale(0.4917)", transformOrigin: "top left" }}>
          <Pane {...Q} />
        </div>
      </div>
    ))}
  </AbsoluteFill>
);

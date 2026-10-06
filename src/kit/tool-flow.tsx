import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Shimmer, SPRINGS, useSpringAt } from "../core/motion";
import { CheckIcon, ChevronRight } from "./ryze-ui/icons";

export type ToolSpec = { label: string; detail?: string; logos?: string[]; start: number; done: number };

const ToolRow: React.FC<{ tool: ToolSpec; size: number; ink: string; dim: string }> = ({
  tool,
  size,
  ink,
  dim,
}) => {
  const frame = useCurrentFrame();
  const appear = useSpringAt(tool.start, SPRINGS.smooth, 22);
  const doneP = useSpringAt(tool.done, SPRINGS.smooth, 20);
  if (frame < tool.start) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        opacity: appear,
        transform: `translateY(${interpolate(appear, [0, 1], [14, 0])}px)`,
      }}
    >
      <span
        style={{
          position: "relative",
          display: "flex",
          width: 30,
          height: 30,
          flexShrink: 0,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: `rgba(${doneP > 0.5 ? "5,150,105" : "193,151,103"},${interpolate(doneP, [0, 1], [0.15, 0.1])})`,
        }}
      >
        <span
          style={{
            position: "absolute",
            display: "inline-flex",
            color: "#9a6e38",
            opacity: 1 - doneP,
            transform: `scale(${interpolate(doneP, [0, 1], [1, 0.5])})`,
          }}
        >
          <ChevronRight size={16} />
        </span>
        <span
          style={{
            position: "absolute",
            display: "inline-flex",
            color: "#059669",
            opacity: doneP,
            transform: `scale(${interpolate(doneP, [0, 1], [0.4, 1])})`,
          }}
        >
          <CheckIcon size={16} />
        </span>
      </span>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span
          style={{
            position: "relative",
            fontSize: size,
            fontWeight: 600,
            lineHeight: 1.4,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          {tool.logos?.map((logo) => (
            <Img
              key={logo}
              src={staticFile(logo)}
              style={{ width: size, height: size, objectFit: "contain", display: "block" }}
            />
          ))}
          <span style={{ position: "relative", display: "inline-block" }}>
            <span style={{ opacity: 1 - doneP, position: doneP > 0.99 ? "absolute" : "relative", left: 0, top: 0 }}>
              {doneP < 0.99 ? <Shimmer text={tool.label} /> : null}
            </span>
            <span
              style={{
                color: ink,
                opacity: doneP,
                position: doneP > 0.99 ? "relative" : "absolute",
                left: 0,
                top: 0,
                whiteSpace: "nowrap",
              }}
            >
              {tool.label}
            </span>
          </span>
        </span>
        {tool.detail ? (
          <span
            style={{
              fontSize: size * 0.72,
              color: dim,
              overflow: "hidden",
              maxHeight: interpolate(doneP, [0, 1], [0, size * 1.3]),
              opacity: doneP,
            }}
          >
            {tool.detail}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export const ToolFlow: React.FC<{
  tools: ToolSpec[];
  size?: number;
  ink?: string;
  dim?: string;
  gap?: number;
}> = ({ tools, size = 20, ink = "#171310", dim = "rgba(23,19,16,0.5)", gap = 14 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap }}>
    {tools.map((tool) => (
      <ToolRow key={tool.label} tool={tool} size={size} ink={ink} dim={dim} />
    ))}
  </div>
);

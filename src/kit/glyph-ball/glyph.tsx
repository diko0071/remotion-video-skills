import React from "react";

export type Eyes = "star" | "plus" | "o" | "happy" | "flat" | "wink" | "x" | "squint" | "dot";

export const Glyph: React.FC<{ kind: Eyes; side: -1 | 1; color: string }> = ({ kind, side, color }) => {
  const s = { stroke: color, strokeWidth: 6.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  if (kind === "star")
    return (
      <g {...s}>
        <line x1={0} y1={-8.5} x2={0} y2={8.5} />
        <line x1={-7.4} y1={-4.25} x2={7.4} y2={4.25} />
        <line x1={-7.4} y1={4.25} x2={7.4} y2={-4.25} />
      </g>
    );
  if (kind === "plus")
    return (
      <g {...s}>
        <line x1={0} y1={-8} x2={0} y2={8} />
        <line x1={-8} y1={0} x2={8} y2={0} />
      </g>
    );
  if (kind === "x")
    return (
      <g {...s}>
        <line x1={-6.2} y1={-6.2} x2={6.2} y2={6.2} />
        <line x1={-6.2} y1={6.2} x2={6.2} y2={-6.2} />
      </g>
    );
  if (kind === "squint") return <polyline points={side < 0 ? "-5.5,-6.5 5.5,0 -5.5,6.5" : "5.5,-6.5 -5.5,0 5.5,6.5"} {...s} />;
  if (kind === "o") return <circle r={6.6} {...s} strokeWidth={5.4} />;
  if (kind === "dot")
    return (
      <g>
        <ellipse rx={4.6} ry={6.2} fill={color} />
        <circle cx={-1.5} cy={-2.6} r={1.5} fill="#FFFFFF" opacity={0.85} />
      </g>
    );
  if (kind === "happy" || (kind === "wink" && side < 0)) return <polyline points="-8,4.5 0,-4.5 8,4.5" {...s} />;
  return <line x1={-8} y1={0} x2={8} y2={0} {...s} />;
};

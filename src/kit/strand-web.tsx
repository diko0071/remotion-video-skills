import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";

export type WebNode = { x: number; y: number; at: number; el: React.ReactNode };

export type WebRoot = {
  x: number;
  y: number;
  rect?: { l: number; r: number; t: number; b: number };
};

const SVG_PAD = 3200;

const exitPoint = (root: WebRoot, tx: number, ty: number) => {
  if (!root.rect) return { x: root.x, y: root.y };
  const dx = tx - root.x;
  const dy = ty - root.y;
  const cand: number[] = [];
  if (dx !== 0) cand.push((dx > 0 ? root.rect.r - root.x : root.rect.l - root.x) / dx);
  if (dy !== 0) cand.push((dy > 0 ? root.rect.b - root.y : root.rect.t - root.y) / dy);
  const t = Math.min(...cand.filter((v) => v > 0));
  return { x: root.x + dx * t, y: root.y + dy * t };
};

const geom = (nodes: WebNode[], root: WebRoot, parentOf: (i: number) => number | null, i: number) => {
  const { x, y } = nodes[i];
  const par = parentOf(i);
  const from = par === null ? exitPoint(root, x, y) : { x: nodes[par].x, y: nodes[par].y };
  const mx = (from.x + x) / 2 + (y - from.y) * 0.22;
  const my = (from.y + y) / 2 - (x - from.x) * 0.22;
  return { x, y, from, mx, my };
};

const Line: React.FC<{
  nodes: WebNode[];
  root: WebRoot;
  parentOf: (i: number) => number | null;
  index: number;
  color: string;
}> = ({ nodes, root, parentOf, index, color }) => {
  const frame = useCurrentFrame();
  const at = nodes[index].at;
  const p = useSpringAt(at, SPRINGS.card, 18);
  const { x, y, from, mx, my } = geom(nodes, root, parentOf, index);
  if (frame < at) return null;
  return (
    <svg
      width={1920 + SVG_PAD * 2}
      height={1080 + SVG_PAD * 2}
      style={{ position: "absolute", left: -SVG_PAD, top: -SVG_PAD }}
    >
      <path
        d={`M ${from.x + SVG_PAD} ${from.y + SVG_PAD} Q ${mx + SVG_PAD} ${my + SVG_PAD} ${x + SVG_PAD} ${y + SVG_PAD}`}
        stroke={color}
        strokeWidth={2.5}
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - p}
        opacity={0.7}
      />
    </svg>
  );
};

const Plate: React.FC<{ node: WebNode; index: number }> = ({ node, index }) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(node.at + 8, SPRINGS.pop, 16);
  if (frame < node.at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        transform: `translate(-50%, -50%) scale(${interpolate(pop, [0, 1], [0.5, 1])}) rotate(${((index % 5) - 2) * 2.5}deg)`,
        opacity: pop,
      }}
    >
      {node.el}
    </div>
  );
};

export const StrandWeb: React.FC<{
  nodes: WebNode[];
  root: WebRoot;
  parentOf?: (i: number) => number | null;
  color?: string;
}> = ({ nodes, root, parentOf, color = "#C19767" }) => {
  const parent = parentOf ?? ((i: number) => (i < 13 ? null : i - 13));
  return (
    <>
      {nodes.map((_, i) => (
        <Line key={`l${i}`} nodes={nodes} root={root} parentOf={parent} index={i} color={color} />
      ))}
      {nodes.map((node, i) => (
        <Plate key={`p${i}`} node={node} index={i} />
      ))}
    </>
  );
};

export const webPositions = (
  count: number,
  cx: number,
  cy: number,
  spread = 120,
  xStretch = 1.25,
): { x: number; y: number }[] =>
  Array.from({ length: count }, (_, i) => {
    const r = spread * Math.sqrt(i + 7.5);
    const th = i * 2.39996;
    return { x: cx + Math.cos(th) * r * xStretch, y: cy + Math.sin(th) * r };
  });

export const webSchedule = (count: number, from: number, span = 132, decay = 0.982): number[] =>
  Array.from({ length: count }, (_, i) => from + span * (1 - Math.pow(decay, i)));

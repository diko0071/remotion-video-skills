import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { PlusIcon } from "./icons";

export type PlusMenuRow = { label: string; logo: string; onAt?: number };

export const PlusMenu: React.FC<{
  openAt: number;
  closeAt?: number;
  title?: string;
  rows: PlusMenuRow[];
}> = ({ openAt, closeAt, title = "Connectors", rows }) => {
  const frame = useCurrentFrame();
  const open = useSpringAt(openAt, SPRINGS.panel, 18);
  const close = useSpringAt(closeAt ?? 1e6, SPRINGS.panel, 14);
  const presence = open * (1 - close);
  const hidden = frame < openAt - 2 || (closeAt !== undefined && frame > closeAt + 16);
  return (
    <div
      className="plus-menu"
      style={{
        opacity: hidden ? 0 : Math.min(1, presence * 1.6),
        transform: `translateY(${interpolate(presence, [0, 1], [10, 0])}px) scale(${interpolate(
          presence,
          [0, 1],
          [0.97, 1],
        )})`,
      }}
    >
      <div className="plus-menu-head">
        <span className="plus-menu-glyph">
          <PlusIcon />
        </span>
        <span>{title}</span>
      </div>
      {rows.map((row) => (
        <PlusMenuRowView key={row.label} row={row} />
      ))}
    </div>
  );
};

const PlusMenuRowView: React.FC<{ row: PlusMenuRow }> = ({ row }) => {
  const frame = useCurrentFrame();
  const on = row.onAt !== undefined && frame >= row.onAt;
  const knob = useSpringAt(row.onAt ?? 1e6, SPRINGS.pop, 16);
  return (
    <div className="plus-menu-row">
      <span className="plus-menu-logo">
        <Img src={staticFile(row.logo)} />
      </span>
      <span className="plus-menu-label">{row.label}</span>
      <span
        className={`plus-menu-switch${on ? " on" : ""}`}
        data-click={`connector.${row.label}`}
      >
        <i style={{ transform: `translateX(calc(var(--knob-travel, 16px) * ${(on ? knob : 0).toFixed(4)}))` }} />
      </span>
    </div>
  );
};

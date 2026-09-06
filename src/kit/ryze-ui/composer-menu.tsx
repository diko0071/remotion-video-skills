import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { useClickPress } from "../../core/press-context";

export type ComposerMenuItem = { label: string; clickId?: string };

const MenuRow: React.FC<{ item: ComposerMenuItem }> = ({ item }) => {
  const scale = useClickPress(item.clickId ?? "");
  return (
    <span
      className={`composer-menu-item${item.clickId ? " active" : ""}`}
      {...(item.clickId
        ? { "data-click": item.clickId, style: { scale: String(scale) } }
        : {})}
    >
      {item.label}
    </span>
  );
};

export const ComposerMenu: React.FC<{
  openAt: number;
  closeAt?: number;
  items: ComposerMenuItem[];
}> = ({ openAt, closeAt, items }) => {
  const frame = useCurrentFrame();
  const open = useSpringAt(openAt, SPRINGS.panel, 16);
  const close = useSpringAt(closeAt ?? 1e6, SPRINGS.panel, 12);
  const presence = open * (1 - close);
  const hidden = frame < openAt - 2 || (closeAt !== undefined && frame > closeAt + 14);
  return (
    <div
      className="composer-menu"
      style={{
        opacity: hidden ? 0 : Math.min(1, presence * 1.6),
        transform: `translateY(${interpolate(presence, [0, 1], [8, 0])}px)`,
      }}
    >
      {items.map((item) => (
        <MenuRow key={item.label} item={item} />
      ))}
    </div>
  );
};

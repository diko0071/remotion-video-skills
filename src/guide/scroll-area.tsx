import React from "react";
import { SPRINGS, useSpringAt } from "../core/motion";
import { inVisibleLayer, resolveTarget } from "../core/stage/objects";

export type GuideScrollStop = {
  at: number;
  to: string;
  align?: "start" | "end";
  margin?: number;
};

export type GuideScrollWindow = { from: number; until?: number };

const offsetWithin = (el: HTMLElement, container: HTMLElement): number => {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== container && container.contains(node)) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
};

const targetY = (outer: HTMLDivElement, stop: GuideScrollStop): number => {
  const limit = Math.max(0, outer.scrollHeight - outer.clientHeight);
  const { el } = resolveTarget(stop.to);
  if (!el) {
    throw new Error(
      `guide-scroll: target "${stop.to}" not found — broken id or wrong layer scope`,
    );
  }
  const top = offsetWithin(el, outer);
  const margin = stop.margin ?? 16;
  const raw =
    stop.align === "end"
      ? top + el.offsetHeight + margin - outer.clientHeight
      : top - margin;
  return Math.min(Math.max(0, raw), limit);
};

export const useScrollStops = (
  scrolls: GuideScrollStop[],
  window?: GuideScrollWindow,
): GuideScrollStop[] =>
  window
    ? scrolls.filter(
        (s) =>
          s.at >= window.from &&
          (window.until === undefined || s.at < window.until),
      )
    : scrolls;

const STOP_SLOTS = 6;
const NEVER = Number.MAX_SAFE_INTEGER;

const slotAt = (stops: GuideScrollStop[], i: number): number =>
  i < stops.length ? stops[i].at : NEVER;

export const GuideScrollArea: React.FC<{
  id: string;
  stops?: GuideScrollStop[];
  className?: string;
  contentClassName?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ id, stops = [], className, contentClassName, style, children }) => {
  const outer = React.useRef<HTMLDivElement>(null);

  const s0 = useSpringAt(slotAt(stops, 0), SPRINGS.smooth, 55);
  const s1 = useSpringAt(slotAt(stops, 1), SPRINGS.smooth, 55);
  const s2 = useSpringAt(slotAt(stops, 2), SPRINGS.smooth, 55);
  const s3 = useSpringAt(slotAt(stops, 3), SPRINGS.smooth, 55);
  const s4 = useSpringAt(slotAt(stops, 4), SPRINGS.smooth, 55);
  const s5 = useSpringAt(slotAt(stops, 5), SPRINGS.smooth, 55);
  const springs = [s0, s1, s2, s3, s4, s5];

  if (stops.length > STOP_SLOTS) {
    throw new Error(`guide-scroll: "${id}" has ${stops.length} stops — max ${STOP_SLOTS}`);
  }

  React.useLayoutEffect(() => {
    if (!outer.current || !stops.length) return;
    if (!inVisibleLayer(outer.current)) return;
    let y = 0;
    let prev = 0;
    for (let i = 0; i < stops.length; i++) {
      if (springs[i] === 0) break;
      const target = targetY(outer.current, stops[i]);
      y += springs[i] * (target - prev);
      prev = target;
    }
    outer.current.scrollTop = y;
  });

  return (
    <div
      ref={outer}
      className={className}
      style={{ minHeight: 0, overflow: "hidden", ...style }}
    >
      <div className={contentClassName}>{children}</div>
    </div>
  );
};

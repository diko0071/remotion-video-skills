import { SPRINGS, useSpringAt } from "../core/motion";

export type ScrollStop = { at: number; px: number };

export type ScrollWindow = { from: number; until?: number };

const STOP_SLOTS = 8;
const NEVER = Number.MAX_SAFE_INTEGER;

const slotAt = (stops: ScrollStop[], i: number): number =>
  i < stops.length ? stops[i].at : NEVER;

export const useGuideScroll = (
  stops: ScrollStop[],
  window?: ScrollWindow,
): number => {
  const scoped = window
    ? stops.filter(
        (s) =>
          s.at >= window.from &&
          (window.until === undefined || s.at < window.until),
      )
    : stops;

  const s0 = useSpringAt(slotAt(scoped, 0), SPRINGS.smooth, 55);
  const s1 = useSpringAt(slotAt(scoped, 1), SPRINGS.smooth, 55);
  const s2 = useSpringAt(slotAt(scoped, 2), SPRINGS.smooth, 55);
  const s3 = useSpringAt(slotAt(scoped, 3), SPRINGS.smooth, 55);
  const s4 = useSpringAt(slotAt(scoped, 4), SPRINGS.smooth, 55);
  const s5 = useSpringAt(slotAt(scoped, 5), SPRINGS.smooth, 55);
  const s6 = useSpringAt(slotAt(scoped, 6), SPRINGS.smooth, 55);
  const s7 = useSpringAt(slotAt(scoped, 7), SPRINGS.smooth, 55);

  if (scoped.length > STOP_SLOTS) {
    throw new Error(`guide-scroll: ${scoped.length} stops — max ${STOP_SLOTS}`);
  }

  const springs = [s0, s1, s2, s3, s4, s5, s6, s7];
  let value = 0;
  let prev = 0;
  for (let i = 0; i < scoped.length; i++) {
    value += springs[i] * (scoped[i].px - prev);
    prev = scoped[i].px;
  }
  return value;
};

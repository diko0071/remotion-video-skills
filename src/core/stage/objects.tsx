import React from "react";
import { useCurrentFrame } from "remotion";
export const STAGE_ATTR = "data-camera-stage";
export const SCOPE_ATTR = "data-stage-layer";
export const SCOPE_SEP = "//";

export type ObjectRect = { x: number; y: number; width: number; height: number };

export const scopedId = (scope: string | number, target: string) =>
  `${scope}${SCOPE_SEP}${target}`;

const selectorFor = (id: string): string => {
  const at = id.indexOf(SCOPE_SEP);
  if (at < 0) return `[data-click="${id}"]`;
  const scope = id.slice(0, at);
  const target = id.slice(at + SCOPE_SEP.length);
  return `[${SCOPE_ATTR}="${scope}"] [data-click="${target}"]`;
};

const measureIn = (el: HTMLElement, stage: HTMLElement): ObjectRect => {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== stage) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(el.offsetWidth),
    height: Math.round(el.offsetHeight),
  };
};

export const inVisibleLayer = (el: HTMLElement): boolean => {
  let node: HTMLElement | null = el;
  while (node) {
    if (node.hasAttribute(SCOPE_ATTR) && node.style.opacity === "0") return false;
    node = node.parentElement;
  }
  return true;
};

export type ResolvedTarget = { el: HTMLElement | null; count: number };

export const resolveTarget = (id: string): ResolvedTarget => {
  const stage = document.querySelector(`[${STAGE_ATTR}]`) as HTMLElement | null;
  if (!stage) return { el: null, count: 0 };
  const candidates = Array.from(
    stage.querySelectorAll(selectorFor(id)),
  ).filter(
    (el): el is HTMLElement =>
      el instanceof HTMLElement && el.offsetWidth > 0 && inVisibleLayer(el),
  );
  return { el: candidates[0] ?? null, count: candidates.length };
};

export const measureObjects = (ids: readonly string[]): Record<string, ObjectRect> => {
  const stage = document.querySelector(`[${STAGE_ATTR}]`) as HTMLElement | null;
  const out: Record<string, ObjectRect> = {};
  if (!stage) return out;
  for (const id of ids) {
    const { el } = resolveTarget(id);
    if (el) out[id] = measureIn(el, stage);
  }
  return out;
};

export const useObjectRects = (
  ids: readonly string[],
  live = false,
): Record<string, ObjectRect> => {
  const frame = useCurrentFrame();
  const cache = React.useRef<Record<string, ObjectRect>>({});
  const [, force] = React.useState(0);

  if (typeof document !== "undefined") {
    const wanted = live ? ids : ids.filter((id) => !cache.current[id]);
    if (wanted.length) {
      const measured = measureObjects(wanted);
      if (Object.keys(measured).length) {
        cache.current = { ...cache.current, ...measured };
      }
    }
  }

  React.useLayoutEffect(() => {
    const pending = ids.filter((id) => !cache.current[id]);
    if (!pending.length) return;
    const measured = measureObjects(pending);
    if (Object.keys(measured).length) {
      cache.current = { ...cache.current, ...measured };
      force((n) => n + 1);
    }
  }, [ids, frame]);

  return cache.current;
};

export const rectCenter = (rect: ObjectRect) => ({
  x: rect.x + rect.width / 2,
  y: rect.y + rect.height / 2,
});

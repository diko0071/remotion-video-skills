import { Layout } from "./layout";
import { LIBRARY_ADS } from "./library-ads";
import { glide, lerp, ramp, T } from "./timeline";

export const COMPOSER_W = 720;

export const composerRect = (l: Layout) => {
  const w = COMPOSER_W * l.composerUi;
  const h = l.prompt.h * l.composerUi;
  return { x: l.vis.cx - w / 2, y: l.vis.cy - h / 2 - 10, w, h };
};

export const tileCenters = (l: Layout) => ({ claude: l.tile.claude, meta: l.tile.meta });

export const CHAT = { w: 720, toolY: 62, widgetY: 112 } as const;

export const WIDGET = {
  w: 720,
  pad: 12,
  border: 1,
  bar: 40,
  cols: 4,
  gap: 8,
  meta: 70,
} as const;

export const COL_W = (WIDGET.w - 2 * WIDGET.border - 2 * WIDGET.pad - (WIDGET.cols - 1) * WIDGET.gap) / WIDGET.cols;

export type CardBox = { x: number; y: number; w: number; mediaH: number; h: number };

export const MASONRY: CardBox[] = (() => {
  const heights = Array(WIDGET.cols).fill(0);
  return LIBRARY_ADS.map((ad) => {
    const col = heights.indexOf(Math.min(...heights));
    const mediaH = Math.round((COL_W * ad.h) / ad.w);
    const h = mediaH + WIDGET.meta + 2;
    const box = {
      x: WIDGET.pad + col * (COL_W + WIDGET.gap),
      y: WIDGET.pad + WIDGET.bar + heights[col],
      w: COL_W,
      mediaH,
      h,
    };
    heights[col] += h + WIDGET.gap;
    return box;
  });
})();

export const chatScroll = (f: number) => glide(f, T.scroll, 130);

export const chatTop = (l: Layout, f: number) => l.vis.top - chatScroll(f) * CHAT.widgetY * l.chatUi;

export const widgetOrigin = (l: Layout, f: number) => ({
  x: l.vis.cx - (WIDGET.w * l.chatUi) / 2,
  y: chatTop(l, f) + CHAT.widgetY * l.chatUi,
});

export const widgetPush = (f: number) => 1 + 0.06 * ramp(f, T.push, T.lift - T.push);

export const widgetToScreen = (l: Layout, f: number, x: number, y: number) => {
  const o = widgetOrigin(l, f);
  const push = widgetPush(f);
  const half = (WIDGET.w * l.chatUi) / 2;
  return {
    x: o.x + half + (x * l.chatUi - half) * push,
    y: o.y + y * l.chatUi * push,
    s: l.chatUi * push,
  };
};

export const winnerCardIndex = (k: number) => LIBRARY_ADS.findIndex((a) => a.winner === k);

export const winnerLiftFrom = (l: Layout, k: number) => {
  const box = MASONRY[winnerCardIndex(k)];
  const at = T.lift + k * 3;
  const tl = widgetToScreen(l, at, box.x + WIDGET.border + 1, box.y + WIDGET.border + 1);
  return { cx: tl.x + (box.w * tl.s) / 2, cy: tl.y + (box.mediaH * tl.s) / 2, w: box.w * tl.s };
};

export const lerpPoint = (a: { x: number; y: number }, b: { x: number; y: number }, t: number) => ({
  x: lerp(a.x, b.x, t),
  y: lerp(a.y, b.y, t),
});

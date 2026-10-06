import { useVideoConfig } from "remotion";

type Point = { x: number; y: number };

export type Layout = {
  w: number;
  h: number;
  vis: { cx: number; cy: number; top: number; bottom: number };
  composerUi: number;
  prompt: { size: number; h: number };
  chatUi: number;
  tile: { size: number; label: number; claude: Point; meta: Point; arc: number; sides: number; card: number };
  winners: { w: number; at: Point[]; plate: number };
  source: { at: Point; w: number };
  arrow: { from: Point; to: Point };
  panel: { x: number; y: number; w: number; h: number };
  rebuild: { w: number; at: Point[] };
};

const WIDE: Layout = {
  w: 1920,
  h: 1080,
  vis: { cx: 960, cy: 660, top: 282, bottom: 1040 },
  composerUi: 2.3,
  prompt: { size: 17, h: 124 },
  chatUi: 1.75,
  tile: { size: 320, label: 40, claude: { x: 420, y: 690 }, meta: { x: 1500, y: 690 }, arc: 230, sides: 1, card: 1 },
  winners: {
    w: 340,
    plate: 50,
    at: [
      { x: 402, y: 700 },
      { x: 774, y: 700 },
      { x: 1146, y: 700 },
      { x: 1518, y: 700 },
    ],
  },
  source: { at: { x: 450, y: 690 }, w: 440 },
  arrow: { from: { x: 700, y: 690 }, to: { x: 912, y: 690 } },
  panel: { x: 930, y: 300, w: 918, h: 740 },
  rebuild: {
    w: 250,
    at: [
      { x: 1109, y: 500 },
      { x: 1389, y: 500 },
      { x: 1669, y: 500 },
      { x: 1249, y: 845 },
      { x: 1529, y: 845 },
    ],
  },
};

const FEED: Layout = {
  w: 1080,
  h: 1350,
  vis: { cx: 540, cy: 800, top: 340, bottom: 1310 },
  composerUi: 1.4,
  prompt: { size: 30, h: 124 },
  chatUi: 1.4,
  tile: { size: 250, label: 32, claude: { x: 230, y: 860 }, meta: { x: 850, y: 860 }, arc: 250, sides: 1, card: 0.8 },
  winners: {
    w: 300,
    plate: 42,
    at: [
      { x: 380, y: 610 },
      { x: 700, y: 610 },
      { x: 380, y: 1020 },
      { x: 700, y: 1020 },
    ],
  },
  source: { at: { x: 540, y: 490 }, w: 210 },
  arrow: { from: { x: 540, y: 636 }, to: { x: 540, y: 716 } },
  panel: { x: 40, y: 730, w: 1000, h: 590 },
  rebuild: {
    w: 222,
    at: [
      { x: 200, y: 880 },
      { x: 540, y: 880 },
      { x: 880, y: 880 },
      { x: 370, y: 1170 },
      { x: 710, y: 1170 },
    ],
  },
};

const STORY: Layout = {
  w: 1080,
  h: 1920,
  vis: { cx: 540, cy: 1040, top: 520, bottom: 1800 },
  composerUi: 1.4,
  prompt: { size: 30, h: 124 },
  chatUi: 1.4,
  tile: { size: 280, label: 34, claude: { x: 540, y: 1360 }, meta: { x: 540, y: 690 }, arc: 400, sides: 2, card: 0.9 },
  winners: {
    w: 380,
    plate: 50,
    at: [
      { x: 330, y: 800 },
      { x: 750, y: 800 },
      { x: 330, y: 1330 },
      { x: 750, y: 1330 },
    ],
  },
  source: { at: { x: 540, y: 690 }, w: 300 },
  arrow: { from: { x: 540, y: 895 }, to: { x: 540, y: 985 } },
  panel: { x: 40, y: 1000, w: 1000, h: 860 },
  rebuild: {
    w: 280,
    at: [
      { x: 210, y: 1205 },
      { x: 540, y: 1205 },
      { x: 870, y: 1205 },
      { x: 375, y: 1605 },
      { x: 705, y: 1605 },
    ],
  },
};

export const layoutFor = (w: number, h: number): Layout => {
  if (w > h) return WIDE;
  return h / w > 1.5 ? STORY : FEED;
};

export const useLayout = () => {
  const { width, height } = useVideoConfig();
  return layoutFor(width, height);
};

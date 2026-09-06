import { SPRINGS, useSpringAt } from "../core/motion";

export const GUIDE_PANEL_WIDTH = 480;

export type PanelMove = { open: number; close?: number };

const MOVE_SLOTS = 4;
const NEVER = Number.MAX_SAFE_INTEGER;

const openAt = (moves: PanelMove[], i: number): number =>
  i < moves.length ? moves[i].open + 5 : NEVER;

const closeAt = (moves: PanelMove[], i: number): number =>
  i < moves.length && moves[i].close !== undefined ? moves[i].close! + 3 : NEVER;

export const usePanelSlide = (moves: PanelMove[]): number => {
  const open0 = useSpringAt(openAt(moves, 0), SPRINGS.smooth, 26);
  const close0 = useSpringAt(closeAt(moves, 0), SPRINGS.smooth, 20);
  const open1 = useSpringAt(openAt(moves, 1), SPRINGS.smooth, 26);
  const close1 = useSpringAt(closeAt(moves, 1), SPRINGS.smooth, 20);
  const open2 = useSpringAt(openAt(moves, 2), SPRINGS.smooth, 26);
  const close2 = useSpringAt(closeAt(moves, 2), SPRINGS.smooth, 20);
  const open3 = useSpringAt(openAt(moves, 3), SPRINGS.smooth, 26);
  const close3 = useSpringAt(closeAt(moves, 3), SPRINGS.smooth, 20);

  if (moves.length > MOVE_SLOTS) {
    throw new Error(`guide-panel: ${moves.length} moves — max ${MOVE_SLOTS}`);
  }

  const opens = [open0, open1, open2, open3];
  const closes = [close0, close1, close2, close3];
  let progress = 0;
  for (let i = 0; i < moves.length; i++) {
    progress += opens[i] * (1 - closes[i]);
  }
  return Math.min(1, progress);
};

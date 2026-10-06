import { useVideoConfig } from "remotion";

export type LaunchFrame = {
  w: number;
  h: number;
  logo: { x: number; y: number; icon: number; text: number };
  head: { x: number; y: number; size: number; maxW: number };
  url: { lead: number; size: number; cy: number };
};

export const LAUNCH_WIDE: LaunchFrame = {
  w: 1920,
  h: 1080,
  logo: { x: 72, y: 56, icon: 40, text: 30 },
  head: { x: 72, y: 122, size: 100, maxW: 1776 },
  url: { lead: 104, size: 170, cy: 590 },
};

export const LAUNCH_FEED: LaunchFrame = {
  w: 1080,
  h: 1350,
  logo: { x: 64, y: 56, icon: 38, text: 28 },
  head: { x: 64, y: 118, size: 92, maxW: 952 },
  url: { lead: 84, size: 92, cy: 690 },
};

export const LAUNCH_STORY: LaunchFrame = {
  w: 1080,
  h: 1920,
  logo: { x: 64, y: 110, icon: 40, text: 30 },
  head: { x: 64, y: 180, size: 104, maxW: 952 },
  url: { lead: 92, size: 92, cy: 960 },
};

export const launchFrameFor = (w: number, h: number): LaunchFrame => {
  if (w > h) return LAUNCH_WIDE;
  return h / w > 1.5 ? LAUNCH_STORY : LAUNCH_FEED;
};

export const useLaunchFrame = () => {
  const { width, height } = useVideoConfig();
  return launchFrameFor(width, height);
};

export const logoCenter = (fr: LaunchFrame) => ({
  x: fr.logo.x + fr.logo.icon / 2,
  y: fr.logo.y + fr.logo.icon / 2,
});

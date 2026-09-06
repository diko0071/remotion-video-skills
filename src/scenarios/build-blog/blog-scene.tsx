import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadPlexMono } from "@remotion/google-fonts/IBMPlexMono";
import { ArtifactSceneProps } from "../../engine/demo/scenario";
import { buildScrollAt, ScrollStop } from "../../kit/build-scroll";
import "./graza.css";

loadFraunces();
loadPlexMono();
import { FactStrip, Hero, SiteFooter, SiteHeader, Ticker, Toc } from "./shell";
import {
  ClosingSections,
  HeatSection,
  Intro,
  PeopleSection,
  RankSection,
  TableSection,
  Tldr,
  WhySection,
} from "./sections";

const PAGE_W = 1240;
const PANEL_FRACTION = 0.56;

const BLOG_STOPS: ScrollStop[] = [
  { f: 0, y: 0 },
  { f: 0.025, y: 0 },
  { f: 0.1, y: 1650 },
  { f: 0.16, y: 1650 },
  { f: 0.235, y: 3300 },
  { f: 0.295, y: 3300 },
  { f: 0.37, y: 4750 },
  { f: 0.43, y: 4750 },
  { f: 0.5, y: 5700 },
  { f: 0.555, y: 5700 },
  { f: 0.625, y: 6800 },
  { f: 0.675, y: 6800 },
  { f: 0.74, y: 7700 },
  { f: 0.79, y: 7700 },
  { f: 0.87, y: 8800 },
  { f: 0.91, y: 8800 },
  { f: 1, y: 0 },
];

const BuildIn: React.FC<{
  scroll: number;
  at: number;
  frame: number;
  frameStart?: number;
  children: React.ReactNode;
}> = ({ scroll, at, frame, frameStart, children }) => {
  const scrollP = interpolate(scroll, [at - 1520, at - 1120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const frameP =
    frameStart === undefined
      ? 0
      : interpolate(frame, [frameStart, frameStart + 22], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
  const p = Math.max(scrollP, frameP);
  return (
    <div style={{ opacity: p, transform: `translateY(${((1 - p) * 46).toFixed(1)}px)` }}>
      {children}
    </div>
  );
};

export const BlogScene: React.FC<ArtifactSceneProps> = ({
  revealStart,
  scrollStart,
  scrollEnd,
  scrollDistance,
}) => {
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const scale = (width * PANEL_FRACTION) / PAGE_W;

  const scroll = buildScrollAt(frame, scrollStart, scrollEnd, BLOG_STOPS, scrollDistance);

  const appear = interpolate(frame, [revealStart, revealStart + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="graza-page"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "var(--paper)",
        opacity: appear,
      }}
    >
      <div
        style={{
          width: PAGE_W,
          transform: `scale(${scale}) translateY(${-scroll}px)`,
          transformOrigin: "top left",
        }}
      >
        <Ticker />
        <SiteHeader />
        <Hero localStart={revealStart} />
        <BuildIn scroll={scroll} at={830} frame={frame} frameStart={revealStart + 26}>
          <FactStrip />
        </BuildIn>
        <div className="layout">
          <BuildIn scroll={scroll} at={950} frame={frame} frameStart={revealStart + 40}>
            <Toc />
          </BuildIn>
          <article>
            <BuildIn scroll={scroll} at={950} frame={frame} frameStart={revealStart + 52}>
              <Tldr />
            </BuildIn>
            <BuildIn scroll={scroll} at={1350} frame={frame} frameStart={revealStart + 66}>
              <Intro />
            </BuildIn>
            <BuildIn scroll={scroll} at={1750} frame={frame}>
              <WhySection />
            </BuildIn>
            <BuildIn scroll={scroll} at={2650} frame={frame}>
              <RankSection />
            </BuildIn>
            <BuildIn scroll={scroll} at={5050} frame={frame}>
              <TableSection />
            </BuildIn>
            <BuildIn scroll={scroll} at={5950} frame={frame}>
              <HeatSection />
            </BuildIn>
            <BuildIn scroll={scroll} at={7050} frame={frame}>
              <PeopleSection />
            </BuildIn>
            <BuildIn scroll={scroll} at={7950} frame={frame}>
              <ClosingSections />
            </BuildIn>
          </article>
        </div>
        <BuildIn scroll={scroll} at={9150} frame={frame}>
          <SiteFooter />
        </BuildIn>
      </div>
    </div>
  );
};

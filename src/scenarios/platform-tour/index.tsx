import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ClickCursor } from "../../kit/click-cursor";
import { SfxTrack } from "../../kit/sfx";
import { ShellOverrideProvider } from "../../kit/ryze-ui/app-shell";
import { STOPS, stopClickTarget, type Stop } from "./stops";

const TRAVEL = 22;
const DEFAULT_HOLD = 48;
const SWAP = 3;
const FADE = 7;
const INTRO = 26;

type Beat = { stop: Stop; start: number; click: number; appear: number; end: number };

const BEATS: Beat[] = (() => {
  const beats: Beat[] = [];
  let cursorFrame = INTRO;
  for (const stop of STOPS) {
    const start = cursorFrame;
    const click = start + TRAVEL;
    const appear = click + SWAP;
    const end = appear + (stop.hold ?? DEFAULT_HOLD);
    beats.push({ stop, start, click, appear, end });
    cursorFrame = end;
  }
  return beats;
})();

export const PLATFORM_TOUR_TOTAL = BEATS[BEATS.length - 1].end + 40;

const CLICKS = BEATS.map(({ click }) => ({ name: "mouse-click" as const, at: click }));

const PageLayer: React.FC<{ beat: Beat; index: number }> = ({ beat, index }) => {
  const frame = useCurrentFrame();
  const next = BEATS[index + 1];
  const inP = interpolate(frame, [beat.appear, beat.appear + FADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outP = next
    ? interpolate(frame, [next.appear, next.appear + FADE], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;
  const opacity = Math.min(inP, outP);
  if (opacity <= 0.001) return null;
  const Page = beat.stop.Component;
  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `translateY(${interpolate(inP, [0, 1], [16, 0])}px) scale(${interpolate(
          inP,
          [0, 1],
          [0.994, 1],
        )})`,
        transformOrigin: "50% 45%",
      }}
    >
      <ShellOverrideProvider
        value={{
          expanded: true,
          nav: beat.stop.nav,
          section: beat.stop.section,
        }}
      >
        <Page />
      </ShellOverrideProvider>
    </AbsoluteFill>
  );
};

export const PlatformTour: React.FC = () => {
  const frame = useCurrentFrame();
  const active = BEATS.reduce((acc, beat, i) => (frame >= beat.appear ? i : acc), -1);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      {BEATS.map((beat, i) =>
        i === active || i === active - 1 || (active === -1 && i === 0 && frame >= beat.appear) ? (
          <PageLayer key={i} beat={beat} index={i} />
        ) : null,
      )}
      {active === -1 ? (
        <AbsoluteFill>
          <ShellOverrideProvider value={{ expanded: true, nav: "Home" }}>
            {React.createElement(BEATS[0].stop.Component)}
          </ShellOverrideProvider>
        </AbsoluteFill>
      ) : null}
      {BEATS.map((beat, i) => {
        const target = stopClickTarget(beat.stop);
        return target ? <ClickCursor key={`cur-${i}`} target={target} at={beat.click} /> : null;
      })}
      <SfxTrack hits={CLICKS} />
    </AbsoluteFill>
  );
};

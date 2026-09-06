import React from "react";
import { AbsoluteFill, Audio, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { ClickCursor } from "./click-cursor";
import { SfxTrack } from "./sfx";
import { ShellOverrideProvider, type RailSection } from "./ryze-ui/app-shell";

export type WalkthroughBeat = {
  vo: string;
  seconds: number;
  nav: string;
  section?: RailSection;
  Component: React.FC;
  click?: string | null;
  lead?: number;
  tail?: number;
  minFrames?: number;
};

export type WalkthroughStep = {
  beat: WalkthroughBeat;
  start: number;
  click: number;
  appear: number;
  voStart: number;
  end: number;
};

const FPS = 30;
const TRAVEL = 12;
const SWAP = 3;
const FADE = 1;
const VO_GAP = 10;

export const buildSteps = (
  beats: WalkthroughBeat[],
  intro = 24,
): WalkthroughStep[] => {
  const steps: WalkthroughStep[] = [];
  let cursor = intro;
  for (const beat of beats) {
    const start = cursor;
    const click = start + TRAVEL;
    const appear = click + SWAP;
    const voStart = appear + (beat.lead ?? 6);
    const end = Math.max(
      voStart + Math.ceil(beat.seconds * FPS) + (beat.tail ?? VO_GAP),
      appear + (beat.minFrames ?? 0),
    );
    steps.push({ beat, start, click, appear, voStart, end });
    cursor = end;
  }
  return steps;
};

export const beatClickTarget = (beat: WalkthroughBeat): string | null =>
  beat.click === undefined ? `nav.${beat.section ?? "dashboard"}.${beat.nav}` : beat.click;

const PageLayer: React.FC<{ step: WalkthroughStep; next?: WalkthroughStep }> = ({ step, next }) => {
  const frame = useCurrentFrame();
  const inP = interpolate(frame, [step.appear, step.appear + FADE], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gone = next ? frame >= next.appear + FADE : false;
  if (gone) return null;
  const Page = step.beat.Component;
  return (
    <AbsoluteFill
      style={{ opacity: inP }}
    >
      <Sequence from={step.appear} layout="none">
        <ShellOverrideProvider
          value={{ expanded: true, nav: step.beat.nav, section: step.beat.section }}
        >
          <Page />
        </ShellOverrideProvider>
      </Sequence>
    </AbsoluteFill>
  );
};

export const WalkthroughPlayer: React.FC<{
  steps: WalkthroughStep[];
  voDir: string;
  voVolume?: number;
}> = ({ steps, voDir, voVolume = 1 }) => {
  const frame = useCurrentFrame();
  const active = steps.reduce((acc, step, i) => (frame >= step.appear ? i : acc), 0);
  const first = steps[0];
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      {first && frame < first.appear + FADE ? (
        <AbsoluteFill>
          <ShellOverrideProvider
            value={{ expanded: true, nav: first.beat.nav, section: first.beat.section }}
          >
            <first.beat.Component />
          </ShellOverrideProvider>
        </AbsoluteFill>
      ) : null}
      {steps.map((step, i) =>
        i === active || i === active - 1 ? (
          <PageLayer key={i} step={step} next={steps[i + 1]} />
        ) : null,
      )}
      {steps.map((step, i) => {
        const target = beatClickTarget(step.beat);
        return target ? (
          <ClickCursor key={`cur-${i}`} target={target} at={step.click} />
        ) : null;
      })}
      <SfxTrack
        hits={steps
          .filter((step) => beatClickTarget(step.beat) !== null)
          .map((step) => ({ name: "mouse-click" as const, at: step.click }))}
      />
      {steps.map((step, i) => (
        <Sequence key={`vo-${i}`} from={step.voStart} layout="none">
          <Audio src={staticFile(`${voDir}/${step.beat.vo}`)} volume={voVolume} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const walkthroughDuration = (steps: WalkthroughStep[], outro = 40): number =>
  steps[steps.length - 1].end + outro;

import React from "react";
import { useCurrentFrame, AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { ClickPressProvider } from "../core/press-context";
import { CameraRig } from "../core/stage";
import { resolveTarget } from "../core/stage/objects";
import { SfxTrack } from "../kit/sfx";
import { GuideIntro, GuideOutro, type GuideTitle } from "./bookends";
import "./guide.css";
import { CursorVeil } from "./cursor-veil";
import { GuideCursor } from "./cursor";
import type { GuideTimeline } from "./script";

const APPROACH = 26;

const ClickAssert: React.FC<{
  clicks: { target: string; at: number }[];
}> = ({ clicks }) => {
  const frame = useCurrentFrame();
  React.useLayoutEffect(() => {
    for (const click of clicks) {
      if (frame < click.at - APPROACH || frame >= click.at) continue;
      const { el, count } = resolveTarget(click.target);
      const phase =
        frame >= click.at - 2 ? `click frame ${click.at}` : `approach frame ${frame} (click at ${click.at})`;
      if (!el) {
        throw new Error(
          `guide: click target "${click.target}" is NOT visible at ${phase} — broken id, wrong layer scope, hidden layer, or the layout changed under the cursor`,
        );
      }
      if (count > 1) {
        throw new Error(
          `guide: click target "${click.target}" resolves to ${count} visible elements at ${phase} — ambiguous id, add a layer scope`,
        );
      }
      const rect = el.getBoundingClientRect();
      if (rect.top < -50000) continue;
      const viewH = el.ownerDocument.defaultView?.innerHeight ?? 0;
      if (viewH && (rect.bottom < 0 || rect.top > viewH)) {
        throw new Error(
          `guide: click target "${click.target}" is OUTSIDE the viewport at ${phase} (top ${Math.round(rect.top)}, viewport ${viewH}, el ${el.className}, parent ${el.parentElement?.className ?? ""}) — a scroll pushed it off screen; scroll less or click a visible element`,
        );
      }
    }
  }, [frame, clicks]);
  return null;
};

export const GuidePlayer: React.FC<{
  timeline: GuideTimeline;
  voDir: string;
  voVolume?: number;
  cursorFrom?: { x: number; y: number };
  title?: GuideTitle;
  titleUntil?: number;
  titleVo?: string;
  outroAt?: number;
  tagline?: string;
  children: React.ReactNode;
}> = ({
  timeline,
  voDir,
  voVolume = 1,
  cursorFrom = { x: 1480, y: 940 },
  title,
  titleUntil = 0,
  titleVo,
  outroAt,
  tagline,
  children,
}) => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    <CameraRig shots={[{ at: 0, zoom: 1 }]} drift={0}>
      <ClickPressProvider clicks={timeline.clicks}>
        {children}
      </ClickPressProvider>
      <div style={{ position: "absolute", inset: 0, zIndex: 90 }}>
        <CursorVeil clicks={timeline.clicks}>
          <GuideCursor from={cursorFrom} clicks={timeline.clicks} />
          <ClickAssert clicks={timeline.clicks} />
        </CursorVeil>
      </div>
    </CameraRig>
    {title ? <GuideIntro title={title} outAt={titleUntil} /> : null}
    {outroAt !== undefined ? (
      <GuideOutro at={outroAt} tagline={tagline} />
    ) : null}
    <SfxTrack
      hits={timeline.clicks
        .filter((c) => c.press !== false)
        .map((c) => ({ name: "mouse-click" as const, at: c.at }))}
    />
    {titleVo ? (
      <Sequence from={10} layout="none">
        <Audio src={staticFile(`${voDir}/${titleVo}`)} volume={voVolume} />
      </Sequence>
    ) : null}
    {timeline.cues.map((cue, i) => (
      <Sequence key={i} from={cue.start} layout="none">
        <Audio
          src={staticFile(`${voDir}/${cue.act.vo}.mp3`)}
          volume={voVolume}
        />
      </Sequence>
    ))}
  </AbsoluteFill>
);

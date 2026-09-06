import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { FocusCamera } from "../../kit/focus-camera";
import { Lockup } from "../../kit/lockup";
import { Beat, Endcard } from "./beats";
import { ChannelApp } from "./channel";
import { CallWindow } from "./huddle";
import { Sky } from "./sky";
import { COPY, S, T, TOTAL } from "./timings";
import { toScreen } from "./window";

export const ANDO_JAMS_TOTAL = TOTAL;

export const L = {
  composer: { x: 1111, y: 660 },
  composer2: { x: 863, y: 660 },
  huddleBtn: { x: 1420, y: 250 },
  huddleClick: { x: 1844, y: 70 },
  dock: { x: 996, y: 105, w: 380, h: 214 },
};

const CENTER = { x: 960, y: 540 };
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const useCamera = () => {
  const c = (p: { x: number; y: number }) => toScreen(p.x, p.y);
  const start = { zoom: 1.6, focus: c(L.composer) };
  const stops = [
    { at: T.pushHuddle, zoom: 2.4, focus: c(L.huddleBtn) },
    { at: T.dissolve - 6, zoom: 1, focus: CENTER },
    { at: T.pushTranscript, zoom: 1.6, focus: c(L.composer2) },
  ];
  const p0 = useSpringAt(stops[0].at, SPRINGS.drift, 70);
  const p1 = useSpringAt(stops[1].at, SPRINGS.drift, 70);
  const p2 = useSpringAt(stops[2].at, SPRINGS.drift, 70);
  const springs = [p0, p1, p2];

  let zoom = start.zoom;
  let fx = start.focus.x;
  let fy = start.focus.y;
  let prev = start;
  for (let i = 0; i < stops.length; i++) {
    const s = stops[i];
    const p = springs[i];
    zoom += (s.zoom - prev.zoom) * p;
    fx += (s.focus.x - prev.focus.x) * p;
    fy += (s.focus.y - prev.focus.y) * p;
    prev = s;
  }
  return { zoom, focus: { x: fx, y: fy } };
};

export const AndoJams: React.FC = () => {
  const frame = useCurrentFrame();
  const cam = useCamera();
  const win = useSpringAt(T.windowIn, SPRINGS.panel, 34);
  const toCall = useSpringAt(T.dissolve, SPRINGS.drift, 44);
  const dockP = useSpringAt(T.dock, SPRINGS.drift, 60);
  const docked = frame >= T.dock;

  const full = { x: 960 - 960 * S, y: 540 - 540 * S, w: 1920 * S, h: 1080 * S };
  const dockScreen = toScreen(L.dock.x, L.dock.y);
  const callRect = {
    x: interpolate(dockP, [0, 1], [full.x, dockScreen.x]),
    y: interpolate(dockP, [0, 1], [full.y, dockScreen.y]),
    w: interpolate(dockP, [0, 1], [full.w, L.dock.w * S]),
  };
  const callScale = callRect.w / 1920;

  const screenPt = (p: { x: number; y: number }) => {
    const s = toScreen(p.x, p.y);
    return { x: 960 + (s.x - cam.focus.x) * cam.zoom, y: 540 + (s.y - cam.focus.y) * cam.zoom };
  };
  const hud = screenPt(L.huddleClick);

  const slackOpacity = docked ? Math.min(1, dockP * 1.6) : win * (1 - toCall);
  const callOpacity = toCall;
  const whiteA = interpolate(frame, [T.white1 - 20, T.white1, T.backToApp - 1, T.backToApp + 14], [0, 1, 1, 0], clamp);
  const whiteB = interpolate(frame, [T.white2 - 20, T.white2], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ background: "#fff", fontFamily: "'Plus Jakarta Sans'" }}>
      <Sky />
      <FocusCamera zoom={cam.zoom} focus={cam.focus}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1920,
            height: 1080,
            transformOrigin: "50% 50%",
            transform: `translateY(${(1 - win) * 60}px) scale(${S * interpolate(win, [0, 1], [0.94, 1])})`,
            opacity: slackOpacity,
            filter: win < 0.98 ? `blur(${(1 - win) * 12}px)` : undefined,
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 40px 120px rgba(20,30,60,0.28), 0 0 0 1px rgba(0,0,0,0.06)",
          }}
        >
          <ChannelApp frame={frame} huddle={docked} thread={docked} />
        </div>
        {frame >= T.dissolve ? (
          <div
            style={{
              position: "absolute",
              left: callRect.x,
              top: callRect.y,
              width: 1920,
              height: 1080,
              transformOrigin: "0 0",
              transform: `translate(${(1 - toCall) * -140}px, ${(1 - toCall) * 120}px) rotate(${(1 - toCall) * -4}deg) scale(${callScale * (0.94 + 0.06 * toCall)})`,
              opacity: callOpacity,
              filter: toCall < 0.97 ? `blur(${(1 - toCall) * 8}px)` : undefined,
              borderRadius: 16 / callScale,
              overflow: "hidden",
              boxShadow: "0 40px 120px rgba(20,30,60,0.35)",
            }}
          >
            <CallWindow frame={frame} compact={dockP > 0.6} transcriptFade={1 - Math.min(1, dockP * 2)} />
          </div>
        ) : null}
      </FocusCamera>
      {frame >= T.cursorIn && frame < T.dissolve ? (
        <Cursor
          scale={1.3}
          stops={[
            { x: 1700, y: 1000, at: T.cursorIn },
            { x: hud.x + 4, y: hud.y + 6, at: T.click - 18 },
            { x: hud.x + 4, y: hud.y + 6, at: T.click, click: true },
          ]}
        />
      ) : null}
      <AbsoluteFill style={{ background: "#fff", pointerEvents: "none", opacity: Math.max(whiteA, whiteB) }} />
      <Sequence from={T.beat1 - 30} durationInFrames={T.beat2 - T.beat1 + 30} layout="none">
        <Beat lines={COPY.beats[0]} len={T.beat2 - T.beat1 + 30} />
      </Sequence>
      <Sequence from={T.beat2} durationInFrames={T.beat3 - T.beat2} layout="none">
        <Beat lines={COPY.beats[1]} len={T.beat3 - T.beat2} />
      </Sequence>
      <Sequence from={T.beat3} durationInFrames={T.backToApp - T.beat3} layout="none">
        <Beat lines={COPY.beats[2]} cluster len={T.backToApp - T.beat3} />
      </Sequence>
      <Sequence from={T.endcard} durationInFrames={T.lockup - T.endcard + 10} layout="none">
        <Endcard text={COPY.endcard} len={T.lockup - T.endcard + 10} />
      </Sequence>
      <Sequence from={T.lockup} durationInFrames={TOTAL - T.lockup} layout="none">
        <Lockup mark="ryze-sun-white.png" word="Ryze AI" partner={{ word: "Slack", mark: "integrations/slack.svg", showWord: true }} background="#ffffff" ink="#171310" />
      </Sequence>
    </AbsoluteFill>
  );
};

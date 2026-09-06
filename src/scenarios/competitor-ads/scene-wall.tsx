import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { SfxTrack } from "../../kit/sfx";
import { TileImg } from "../../kit/tile-img";
import MANIFEST from "../../../public/creative-wall/manifest.json";
import { CLICK_AT, ExpandedAd, Notification, NOTIF_AT } from "./scene-notify";

const TILE = 196;
const GAP = 12;
const STEP = TILE + GAP;
const ROWS = 8;
const COLS = 22;
const TOP = 540 - (ROWS * STEP - GAP) / 2;

type Arrival = { at: number; row: number; slot: number; file: string; brand: string };

const ARRIVALS: Arrival[] = [
  { at: 10, row: 3, slot: 8, file: "apps/wispr-flow_top-s1-23d.jpg", brand: "wisprflow.ai" },
  { at: 24, row: 5, slot: 11, file: "apps/whoop_top-1-53d.jpg", brand: "whoop.com" },
  { at: 38, row: 2, slot: 6, file: "apps/granola_top-2-30d.jpg", brand: "granola.ai" },
  { at: 52, row: 6, slot: 9, file: "apps/cluely_top-4-11d.jpg", brand: "cluely.com" },
  { at: 66, row: 1, slot: 12, file: "apps/heygen_top-1-42d.jpg", brand: "heygen.com" },
  { at: 80, row: 4, slot: 4, file: "apps/rocket-money_top-s3.jpg", brand: "rocketmoney.com" },
  { at: 94, row: 7, slot: 13, file: "apps/base44_top-2-43d.jpg", brand: "base44.com" },
  { at: 108, row: 0, slot: 7, file: "apps/todoist_top-1-6d.jpg", brand: "todoist.com" },
  { at: 122, row: 3, slot: 15, file: "apps/capcut_top-6-114d.jpg", brand: "capcut.com" },
  { at: 136, row: 5, slot: 5, file: "apps/lovable_top-4-23d.jpg", brand: "lovable.dev" },
  { at: 150, row: 2, slot: 13, file: "apps/cursor_top-3-2d.jpg", brand: "cursor.com" },
  { at: 164, row: 6, slot: 3, file: "apps/eight-sleep_top-7-29d.jpg", brand: "eightsleep.com" },
  { at: 178, row: 1, slot: 5, file: "apps/nanit_top-3-4d.jpg", brand: "nanit.com" },
  { at: 192, row: 4, slot: 16, file: "apps/chime_top-4-10d.jpg", brand: "chime.com" },
  { at: 206, row: 7, slot: 6, file: "apps/akiflow_top-1-73d.jpg", brand: "akiflow.com" },
  { at: 220, row: 0, slot: 14, file: "apps/elevenlabs_top-2-154d.jpg", brand: "elevenlabs.io" },
  { at: 234, row: 3, slot: 3, file: "apps/hatch_top-1-39d.jpg", brand: "hatch.co" },
  { at: 248, row: 5, slot: 16, file: "apps/cleo_top-2-45d.jpg", brand: "meetcleo.com" },
  { at: 262, row: 2, slot: 17, file: "apps/artistly-ai_top-2-38d.jpg", brand: "artistly.ai" },
  { at: 276, row: 6, slot: 15, file: "apps/heygen_top-2-42d.jpg", brand: "heygen.com" },
  { at: 290, row: 1, slot: 9, file: "apps/lovable_top-10-2d.jpg", brand: "lovable.dev" },
  { at: 304, row: 4, slot: 10, file: "apps/capcut_top-10-89d.jpg", brand: "capcut.com" },
  { at: 318, row: 7, slot: 10, file: "apps/chime_top-s9.jpg", brand: "chime.com" },
  { at: 332, row: 0, slot: 11, file: "apps/base44_top-3-33d.jpg", brand: "base44.com" },
];

const rowFiles = (r: number): string[] =>
  Array.from({ length: COLS }, (_, k) => MANIFEST[(r * 37 + k * 13) % MANIFEST.length]);

const rowDir = (r: number) => (r % 2 === 0 ? 1 : -1);
const rowSpeed = (r: number) => 0.55 + (r % 3) * 0.18;

const Badge: React.FC<{ brand: string; at: number }> = ({ brand, at }) => {
  const inn = useSpringAt(at + 6, SPRINGS.pop, 16);
  return (
    <div
      style={{
        position: "absolute",
        top: -16,
        left: 10,
        transform: `scale(${inn})`,
        transformOrigin: "left center",
        display: "flex",
        alignItems: "center",
        gap: 7,
        background: "#171310",
        color: "#FFFFFF",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 15,
        fontWeight: 700,
        fontFamily: "'Plus Jakarta Sans'",
        boxShadow: "0 8px 22px rgba(23,19,16,0.3)",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 8, height: 8, borderRadius: 4, background: "#C19767" }} />
      NEW · {brand}
    </div>
  );
};

const ARRIVAL_SLOTS = 4;
const NEVER = Number.MAX_SAFE_INTEGER;

const WallRow: React.FC<{ r: number; frame: number }> = ({ r, frame }) => {
  const slide = rowDir(r) * rowSpeed(r) * frame - ((r * 7) % 4) * (STEP / 3) - STEP;
  const events = ARRIVALS.filter((a) => a.row === r);
  const files = rowFiles(r);
  const e0 = useSpringAt(events[0]?.at ?? NEVER, SPRINGS.card, 26);
  const e1 = useSpringAt(events[1]?.at ?? NEVER, SPRINGS.card, 26);
  const e2 = useSpringAt(events[2]?.at ?? NEVER, SPRINGS.card, 26);
  const e3 = useSpringAt(events[3]?.at ?? NEVER, SPRINGS.card, 26);

  if (events.length > ARRIVAL_SLOTS) {
    throw new Error(`wall row ${r}: ${events.length} arrivals — max ${ARRIVAL_SLOTS}`);
  }

  const eventSprings = [e0, e1, e2, e3];
  const shifts = events.map((a, i) => ({ a, p: eventSprings[i] }));
  const xFor = (slot: number, own?: Arrival) => {
    let x = slide + slot * STEP;
    for (const { a, p } of shifts) {
      if (a === own) continue;
      if (slot >= a.slot) x += STEP * p;
    }
    return x;
  };
  return (
    <>
      {files.map((file, k) => (
        <div
          key={`b-${k}`}
          style={{
            position: "absolute",
            left: xFor(k),
            top: TOP + r * STEP,
            width: TILE,
            height: TILE,
            borderRadius: 10,
            overflow: "hidden",
            background: "#fff",
            boxShadow: "0 1px 2px rgba(23,19,16,0.12)",
          }}
        >
          <TileImg file={`creative-wall/${file}`} />
        </div>
      ))}
      {shifts.map(({ a, p }) => {
        const drop = interpolate(p, [0, 1], [-260, 0]);
        return (
          <div
            key={a.brand + a.at}
            style={{
              position: "absolute",
              left: xFor(a.slot, a),
              top: TOP + r * STEP + drop,
              width: TILE,
              height: TILE,
              borderRadius: 10,
              overflow: "visible",
              opacity: Math.min(1, p * 2),
            }}
          >
            <div
              style={{
                width: TILE,
                height: TILE,
                borderRadius: 10,
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 18px 44px rgba(74,53,29,0.3)",
                outline: "3px solid #C19767",
                outlineOffset: -1,
              }}
            >
              <TileImg file={a.file} />
            </div>
            <Badge brand={a.brand} at={a.at} />
          </div>
        );
      })}
    </>
  );
};

export const LiveWall: React.FC<{ dim?: number }> = ({ dim = 0 }) => {
  const frame = useCurrentFrame();
  const zoom =
    frame < 300
      ? 1.45 * Math.pow(0.8 / 1.45, frame / 300)
      : 0.8 * Math.pow(0.96, (frame - 300) / 400);
  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 1 - dim }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${zoom}) rotate(-4deg)`,
            transformOrigin: "960px 540px",
          }}
        >
          {Array.from({ length: ROWS }, (_, r) => (
            <WallRow key={r} r={r} frame={frame} />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const WALL_PREROLL = 360;

export const WallNotifyStage: React.FC<{ preRoll: number }> = ({ preRoll }) => {
  const frame = useCurrentFrame();
  const dim = interpolate(frame, [preRoll, preRoll + 14], [0, 0.62], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fade = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shots: CameraShot[] = [
    { at: 0, zoom: 1.02 },
    { at: preRoll + NOTIF_AT + 4, target: "notif", zoom: 1.32, align: { y: 0.42 } },
    { at: preRoll + CLICK_AT + 8 + 4, target: "ad", zoom: 1.16 },
  ];
  return (
    <AbsoluteFill style={{ background: "var(--background)", opacity: fade }}>
      <CameraRig shots={shots}>
        <LiveWall dim={dim} />
        <Sequence from={preRoll} layout="none">
          <Notification />
          <ExpandedAd />
          <SceneCursor
            from={{ x: 1560, y: 980 }}
            appearAt={NOTIF_AT + 20}
            moves={[{ target: "notif", at: CLICK_AT, travel: 30 }]}
          />
        </Sequence>
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: preRoll + CLICK_AT }]} />
    </AbsoluteFill>
  );
};

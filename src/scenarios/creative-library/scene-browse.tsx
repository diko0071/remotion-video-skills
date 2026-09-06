import React from "react";
import { TileImg } from "../../kit/tile-img";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { blink, press, SPRINGS, typing, useSpringAt } from "../../core/motion";
import { CameraRig, SceneCursor, type CameraShot } from "../../core/stage";
import { AttachmentSlots, FlyToSlot } from "../../kit/fly-to-input";
import { Composer } from "../../kit/ryze-ui/composer";
import { SfxTrack } from "../../kit/sfx";
import MANIFEST from "../../../public/creative-wall/manifest.json";
import "../../kit/chat/chat.css";
import {
  BROWSE_COMPOSER_AT,
  BROWSE_FLY_AT,
  BROWSE_FLY_STAGGER,
  BROWSE_POPS,
  BROWSE_SEND,
  BROWSE_TYPE_FROM,
  BROWSE_TYPE_TO,
  FAVORITES,
  PLANET_SPIN_RATE,
  PROMPT,
  WALL_END_SPIN,
} from "./timings";

const GOLDEN = 2.39996;
const PLANET_TILES = 880;
const PLANET_C = 18.7;
const PLANET_TILE = 34;
const PLANET_CX = 960;
const PLANET_CY = 540;

const CARD = { x: 650, y: 120, size: 620 };
const PARK_SIZE = 250;
const PARK_GAP = 28;
const PARK_X = (1920 - (PARK_SIZE * 4 + PARK_GAP * 3)) / 2;
const PARK_Y = 120;
const PARK_TILT = [-2.5, 1.8, -1.2, 2.6];

const SHOTS: CameraShot[] = [
  { at: 0, zoom: 1 },
  { at: BROWSE_FLY_AT - 4, target: "composer", zoom: 1.26, align: { y: 0.55 } },
  { at: BROWSE_SEND - 22, target: "composer.send", zoom: 1.55, align: { x: 0.75 }, axis: "x" },
];

export const Planet: React.FC = () => {
  const frame = useCurrentFrame();
  const spin = WALL_END_SPIN + frame * PLANET_SPIN_RATE;
  const lift = useSpringAt(BROWSE_COMPOSER_AT, SPRINGS.panel, 40);
  const shift = interpolate(lift, [0, 1], [0, -320]);
  const scale = interpolate(lift, [0, 1], [1, 0.74]);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        transform: `translateY(${shift}px) scale(${scale})`,
        transformOrigin: `${PLANET_CX}px ${PLANET_CY}px`,
      }}
    >
      {Array.from({ length: PLANET_TILES }, (_, i) => {
        const r = PLANET_C * Math.sqrt(i + 0.5);
        const th = i * GOLDEN + spin;
        const size = PLANET_TILE;
        const file = MANIFEST[(i * 31) % MANIFEST.length];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: PLANET_CX + r * Math.cos(th) - size / 2,
              top: PLANET_CY + r * Math.sin(th) - size / 2,
              width: size,
              height: size,
              borderRadius: 6,
              overflow: "hidden",
              background: "#FFFFFF",
              boxShadow: "0 3px 10px rgba(74,53,29,0.12)",
              transform: `rotate(${(spin * 180) / Math.PI}deg)`,
            }}
          >
            <TileImg file={`creative-wall/${file}`} />
          </div>
        );
      })}
    </div>
  );
};

const BrowseCard: React.FC<{ file: string; index: number }> = ({ file, index }) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(BROWSE_POPS[index], SPRINGS.card, 30);
  const parkAt = index < BROWSE_POPS.length - 1 ? BROWSE_POPS[index + 1] : BROWSE_COMPOSER_AT;
  const park = useSpringAt(parkAt, SPRINGS.card, 28);
  const hidden = frame >= BROWSE_FLY_AT + index * BROWSE_FLY_STAGGER;
  const fromPlanet = { x: PLANET_CX - 17, y: PLANET_CY - 17, size: 34 };
  const parked = { x: PARK_X + index * (PARK_SIZE + PARK_GAP), y: PARK_Y, size: PARK_SIZE };
  const x = interpolate(park, [0, 1], [interpolate(pop, [0, 1], [fromPlanet.x, CARD.x]), parked.x]);
  const y = interpolate(park, [0, 1], [interpolate(pop, [0, 1], [fromPlanet.y, CARD.y]), parked.y]);
  const size = interpolate(
    park,
    [0, 1],
    [interpolate(pop, [0, 1], [fromPlanet.size, CARD.size]), parked.size],
  );
  const tilt = interpolate(park, [0, 1], [0, PARK_TILT[index]]);
  if (frame < BROWSE_POPS[index]) return null;
  return (
    <div
      data-click={`fav.${index}`}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: 18,
        overflow: "hidden",
        background: "#FFFFFF",
        boxShadow: "0 24px 60px rgba(74,53,29,0.25)",
        border: "1px solid rgba(255,255,255,0.7)",
        transform: `rotate(${tilt}deg)`,
        opacity: hidden ? 0 : pop,
        zIndex: 6,
      }}
    >
      <TileImg file={file} />
    </div>
  );
};

export const BrowseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, BROWSE_TYPE_FROM, BROWSE_TYPE_TO);
  const caret = frame < BROWSE_SEND && blink(frame, 22);
  const composerIn = useSpringAt(BROWSE_COMPOSER_AT - 14, SPRINGS.smooth, 16);

  return (
    <AbsoluteFill style={{ background: "var(--background)" }}>
      <CameraRig shots={SHOTS} drift={0}>
        <Planet />
        <div className="chat-bare" style={{ justifyContent: "flex-end", paddingBottom: 190, background: "transparent" }}>
          <div
            style={{
              width: 1200,
              maxWidth: "100%",
              opacity: composerIn,
              transform: `translateY(${interpolate(composerIn, [0, 1], [60, 0])}px)`,
            }}
          >
            <Composer
              typed={typed}
              cursor={caret}
              sendScale={press(frame, BROWSE_SEND)}
              revealAt={BROWSE_COMPOSER_AT}
              placeholder="Message Agent…"
              flatRing
              attachment={<AttachmentSlots count={FAVORITES.length} />}
            />
          </div>
        </div>
        {FAVORITES.map((file, i) => (
          <BrowseCard key={file} file={file} index={i} />
        ))}
        {FAVORITES.map((file, i) => (
          <FlyToSlot
            key={`fly-${file}`}
            image={file}
            slotId={`chip.${i}`}
            fromSlotId={`fav.${i}`}
            appearAt={BROWSE_FLY_AT + i * BROWSE_FLY_STAGGER}
            flyAt={BROWSE_FLY_AT + i * BROWSE_FLY_STAGGER}
          />
        ))}
        <SceneCursor
          from={{ x: 1700, y: 1160 }}
          moves={[{ target: "composer.send", at: BROWSE_SEND, travel: 34 }]}
        />
      </CameraRig>
      <SfxTrack hits={[{ name: "mouse-click", at: BROWSE_SEND }]} />
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, blink, press, typing, useSpringAt } from "../../core/motion";
import { STAGE_ATTR, SceneCursor, useObjectRects } from "../../core/stage";
import { AttachmentSlots } from "../../kit/fly-to-input";
import { Composer } from "../../kit/ryze-ui/composer";
import { SfxTrack } from "../../kit/sfx";
import { TileImg } from "../../kit/tile-img";
import MANIFEST from "../../../public/creative-wall/manifest.json";
import "../../kit/chat/chat.css";
import {
  CLICK_AT,
  EXIT_AT,
  FLY_AT,
  FLY_COUNT,
  FLY_STAGGER,
  FLY_TRAVEL,
  LAND_AT,
  SNAP_AT,
  SNAP_TOTAL,
  SPIN_FROM,
  TYPE_FROM,
  TYPE_TEXT,
  TYPE_TO,
  ZOOM_OUT_FROM,
  ZOOM_OUT_TO,
} from "./timings";

const BG = "#171310";
const WORLD_W = 6000;
const CX = 960;
const CY = 540;

const GOLDEN = 2.39996;
const TILES = 900;
const PLANET_C = 19;
const PLANET_TILE = 34;
const SPIN_RATE = 0.0026;

const HERO_INDEX = 0;
const heroPos = (() => {
  const r = PLANET_C * Math.sqrt(HERO_INDEX + 0.5);
  const th = HERO_INDEX * GOLDEN;
  return { x: CX + r * Math.cos(th), y: CY + r * Math.sin(th) };
})();

const FLY_INDICES = [3, 7, 11];
const CARD_FULL = 330;
const CHIP = 72;
const ARC = [150, -40, 90];

const FINAL_CAM_X = WORLD_W - 1920;
const COMPOSER_W = 1200;

const zoomEase = (t: number) => 0.1 * t + 0.9 * Math.pow(t, 4.2);
const camEase = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const flyEase = (t: number) => 1 - Math.pow(1 - t, 1.9);

const flyP = (frame: number, index: number) => {
  const at = FLY_AT + index * FLY_STAGGER;
  return flyEase(
    interpolate(frame, [at, at + FLY_TRAVEL], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
};

const HERO_FILE = "apps/lovable_top-4-23d.jpg";
const FLY_FILES = [
  "creative-wall/notion_top-3-52d.jpg",
  "creative-wall/superhuman_top-2-35d.jpg",
  "creative-wall/zapier_top-4-598d.jpg",
];

const tileFile = (i: number) => {
  if (i === HERO_INDEX) return HERO_FILE;
  const fly = FLY_INDICES.indexOf(i);
  if (fly >= 0) return FLY_FILES[fly];
  return `creative-wall/${MANIFEST[(i * 31) % MANIFEST.length]}`;
};

const planetPos = (i: number, spin: number) => {
  const r = PLANET_C * Math.sqrt(i + 0.5);
  const th = i * GOLDEN + spin;
  return { x: CX + r * Math.cos(th), y: CY + r * Math.sin(th) };
};

const Tile: React.FC<{ i: number; spin: number }> = ({ i, spin }) => {
  const { x, y } = planetPos(i, spin);
  if (i === HERO_INDEX) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x - PLANET_TILE / 2,
        top: y - PLANET_TILE / 2,
        width: PLANET_TILE,
        height: PLANET_TILE,
        borderRadius: 6,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 3px 10px rgba(0,0,0,0.35)",
        transform: `rotate(${(spin * 180) / Math.PI}deg)`,
      }}
    >
      <TileImg file={tileFile(i)} />
    </div>
  );
};


const HeroTile: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: heroPos.x - PLANET_TILE / 2,
      top: heroPos.y - PLANET_TILE / 2,
      width: PLANET_TILE,
      height: PLANET_TILE,
      borderRadius: 6,
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 3px 10px rgba(0,0,0,0.35)",
    }}
  >
    <TileImg file={tileFile(HERO_INDEX)} />
  </div>
);

const FlyingCard: React.FC<{
  i: number;
  index: number;
  frame: number;
  slot?: { x: number; y: number; width: number };
}> = ({ i, index, frame, slot }) => {
  const at = FLY_AT + index * FLY_STAGGER;
  const p = flyP(frame, index);
  if (frame < at) return null;
  const from = planetPos(i, (at - SPIN_FROM) * SPIN_RATE);
  const to = slot
    ? { x: slot.x + slot.width / 2, y: slot.y + slot.width / 2, size: slot.width }
    : { x: FINAL_CAM_X + 460 + index * 86, y: 420, size: CHIP };
  const grow = interpolate(p, [0, 0.22], [PLANET_TILE, CARD_FULL], {
    extrapolateRight: "clamp",
  });
  const shrink = interpolate(p, [0.78, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const size = interpolate(shrink, [0, 1], [grow, to.size]);
  const x = interpolate(p, [0, 1], [from.x, to.x]) - size / 2;
  const y =
    interpolate(p, [0, 1], [from.y, to.y]) - Math.sin(p * Math.PI) * ARC[index] - size / 2;
  const tilt = Math.sin(p * Math.PI) * (index % 2 === 0 ? 6 : -5);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: interpolate(p, [0, 0.25, 1], [6, 18, 10]),
        overflow: "hidden",
        background: "#fff",
        border: "1px solid rgba(255,255,255,0.65)",
        boxShadow: `0 ${14 + 26 * Math.sin(p * Math.PI)}px ${40 + 40 * Math.sin(p * Math.PI)}px rgba(0,0,0,0.4)`,
        transform: `rotate(${tilt}deg)`,
        zIndex: 10 + index,
      }}
    >
      <TileImg file={tileFile(i)} />
    </div>
  );
};

export const SceneGlobe: React.FC = () => {
  const frame = useCurrentFrame();

  const t = interpolate(frame, [ZOOM_OUT_FROM, ZOOM_OUT_TO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const preSnapScale = interpolate(zoomEase(t), [0, 1], [58, 1.18]);
  const snap = useSpringAt(SNAP_AT, SPRINGS.pop, SNAP_TOTAL);
  const scale = interpolate(snap, [0, 1], [preSnapScale, 1]);

  const spin = frame < SPIN_FROM ? 0 : (frame - SPIN_FROM) * SPIN_RATE;

  const slots = useObjectRects(["chip.0", "chip.1", "chip.2"]);

  const camX =
    FINAL_CAM_X *
    camEase(
      interpolate(frame, [FLY_AT + 2, LAND_AT], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );

  const exit = useSpringAt(EXIT_AT, SPRINGS.panel, 16);

  const typed = typing(frame, TYPE_TEXT, TYPE_FROM, TYPE_TO);
  const caret = frame >= TYPE_FROM && frame < CLICK_AT && blink(frame, 18);

  return (
    <AbsoluteFill style={{ background: BG, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          translate: `${-exit * exit * 2300}px 0`,
        }}
      >
        <div
          {...{ [STAGE_ATTR]: "" }}
          style={{
            position: "absolute",
            width: WORLD_W,
            height: 1080,
            translate: `${-camX}px 0`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `scale(${scale})`,
              transformOrigin: `${heroPos.x}px ${heroPos.y}px`,
            }}
          >
            {Array.from({ length: TILES }, (_, i) => {
              const flyIndex = FLY_INDICES.indexOf(i);
              if (flyIndex >= 0 && frame >= FLY_AT + flyIndex * FLY_STAGGER) return null;
              return <Tile key={i} i={i} spin={spin} />;
            })}
            <HeroTile />
          </div>


          <div
            className="chat-bare"
            style={{
              position: "absolute",
              left: FINAL_CAM_X,
              top: 0,
              width: 1920,
              height: 1080,
              background: "transparent",
            }}
          >
            <div style={{ width: COMPOSER_W, maxWidth: "100%" }}>
              <Composer
                typed={typed}
                cursor={caret}
                sendScale={press(frame, CLICK_AT)}
                revealAt={-120}
                placeholder="Message Agent…"
                flatRing
                attachment={<AttachmentSlots count={FLY_COUNT} />}
              />
            </div>
          </div>

          {FLY_INDICES.map((i, index) => (
            <FlyingCard
              key={i}
              i={i}
              index={index}
              frame={frame}
              slot={slots[`chip.${index}`]}
            />
          ))}

          <SceneCursor
            appearAt={LAND_AT + 4}
            from={{ x: FINAL_CAM_X + 1660, y: 1010 }}
            moves={[{ target: "composer.send", at: CLICK_AT, travel: 34 }]}
          />
        </div>
      </div>

      <SfxTrack hits={[{ name: "mouse-click", at: CLICK_AT, volume: 0.5 }]} />
    </AbsoluteFill>
  );
};

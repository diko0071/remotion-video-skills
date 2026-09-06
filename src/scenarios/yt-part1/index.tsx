import React from "react";
import { AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { noise2D } from "@remotion/noise";
import { KineticBeats, type KineticBeat } from "../../kit/kinetic-beats";

const FPS = 30;
const sec = (s: number) => Math.round(s * FPS);

const C1 = sec(21.6);
const C2 = sec(12.1);
const C3 = sec(5.7);
export const YT_PART1_TOTAL = C1 + C2 + C3;

const w = (t: string, s: number, hl?: boolean) => ({ t, at: sec(s), hl });

const beats: KineticBeat[] = [
  {
    at: 0,
    words: [w("The", 0), w("old", 0.5), w("way:", 0.86, true)],
  },
  {
    at: sec(1.48),
    words: [w("50", 1.48, true), w("browser", 1.76, true), w("tabs", 2.12, true)],
  },
  {
    at: sec(2.72),
    words: [w("an", 2.72), w("agency", 2.94), w("at", 3.34), w("$5,000/mo", 3.9, true)],
  },
  {
    at: sec(5.08),
    words: [w("weekends", 5.24), w("lost", 5.7, true), w("to", 5.88), w("tutorials", 6.02)],
  },
  {
    at: sec(7.52),
    words: [w("The", 7.72), w("new", 8.16, true), w("way:", 8.3, true)],
  },
  {
    at: sec(8.84),
    words: [w("one", 8.84, true), w("chat", 9.02, true), w("box", 9.26, true)],
  },
  {
    at: sec(9.86),
    words: [
      w("you", 9.86),
      w("type,", 9.98),
      w("the", 10.98),
      w("agent", 11.16),
      w("does", 11.46, true),
      w("it", 11.66, true),
    ],
  },
];

type Cut = { at: number; src: string; scale: number };

const C1_CUTS: Cut[] = [
  { at: 0, src: "yt/f-c1.mp4", scale: 1 },
  { at: sec(4.6), src: "yt/p1-c1.mp4", scale: 1.1 },
  { at: sec(9.2), src: "yt/f-c1.mp4", scale: 1.12 },
  { at: sec(13.6), src: "yt/p1-c1.mp4", scale: 1 },
  { at: sec(17.4), src: "yt/f-c1.mp4", scale: 1.08 },
];

const C3_CUTS: Cut[] = [
  { at: 0, src: "yt/f-c3.mp4", scale: 1 },
  { at: sec(3.1), src: "yt/p1-c3.mp4", scale: 1.12 },
];

const GRAIN_TILE = 512;

const GrainField: React.FC<{ gx: number; gy: number }> = ({ gx, gy }) => {
  const { width, height } = useVideoConfig();
  const cols = Math.ceil(width / GRAIN_TILE) + 1;
  const rows = Math.ceil(height / GRAIN_TILE) + 1;
  const offsetX = (((width - GRAIN_TILE) * gx) / 100) % GRAIN_TILE;
  const offsetY = (((height - GRAIN_TILE) * gy) / 100) % GRAIN_TILE;
  const cells = Array.from({ length: cols * rows }, (_, i) => i);
  return (
    <AbsoluteFill style={{ overflow: "hidden", opacity: 0.055, mixBlendMode: "overlay" }}>
      {cells.map((i) => (
        <Img
          key={i}
          src={staticFile("yt/grain.png")}
          style={{
            position: "absolute",
            width: GRAIN_TILE,
            height: GRAIN_TILE,
            left: offsetX - GRAIN_TILE + (i % cols) * GRAIN_TILE,
            top: offsetY - GRAIN_TILE + Math.floor(i / cols) * GRAIN_TILE,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const FilmLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const gx = (noise2D("gx", frame * 7.3, 0) * 0.5 + 0.5) * 100;
  const gy = (noise2D("gy", 0, frame * 7.7) * 0.5 + 0.5) * 100;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <GrainField gx={gx} gy={gy} />
      <AbsoluteFill
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 62%, rgba(0,0,0,0.22) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};

const MultiCam: React.FC<{ cuts: Cut[]; total: number }> = ({ cuts, total }) => {
  const frame = useCurrentFrame();
  const dx = noise2D("camx", frame * 0.013, 0) * 7;
  const dy = noise2D("camy", 0, frame * 0.011) * 5;
  return (
    <AbsoluteFill style={{ background: "#0e0f11" }}>
      {cuts.map((cut, i) => {
        const end = i + 1 < cuts.length ? cuts[i + 1].at : total;
        return (
          <Sequence key={i} from={cut.at} durationInFrames={end - cut.at}>
            <AbsoluteFill
              style={{
                transform: `scale(${cut.scale * 1.02}) translate(${dx}px, ${dy}px)`,
              }}
            >
              <OffthreadVideo
                src={staticFile(cut.src)}
                startFrom={cut.at}
                style={{ width: 1920, height: 1080, objectFit: "cover" }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}
      <FilmLayer />
    </AbsoluteFill>
  );
};

export const YtPart1: React.FC = () => (
  <AbsoluteFill style={{ background: "#F2F0EB" }}>
    <Sequence durationInFrames={C1}>
      <MultiCam cuts={C1_CUTS} total={C1} />
      <Audio src={staticFile("yt/roomtone.mp3")} volume={0.14} />
    </Sequence>
    <Sequence from={C1} durationInFrames={C2}>
      <KineticBeats beats={beats} sfx={false} total={C2} />
      <Audio src={staticFile("yt/p1-c2.mp3")} />
    </Sequence>
    <Sequence from={C1 + C2} durationInFrames={C3}>
      <MultiCam cuts={C3_CUTS} total={C3} />
      <Audio src={staticFile("yt/roomtone.mp3")} volume={0.14} />
    </Sequence>
  </AbsoluteFill>
);

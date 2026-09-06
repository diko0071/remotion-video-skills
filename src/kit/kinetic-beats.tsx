import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { KineticLine, type KineticPart } from "./kinetic-text";
import { SfxTrack, type SfxName } from "./sfx";

export type KineticBeat = {
  at: number;
  accent?: boolean;
  highlight?: boolean;
  size?: number;
  y?: number;
  words: { t: string; at: number; hl?: boolean; sparks?: boolean }[];
  emojis?: { e: string; at: number }[];
  tiles?: { image: string; tilt: number; at: number }[];
};

const beatParts = (beat: KineticBeat): { parts: KineticPart[]; marks: number[] } => {
  const parts: KineticPart[] = [];
  const marks: number[] = [];
  let run: { word: string; at: number }[] = [];
  let runSparks = false;
  const flushRun = () => {
    if (!run.length) return;
    parts.push({ group: run, sparks: runSparks });
    marks.push(run[0].at);
    run = [];
    runSparks = false;
  };
  for (const w of beat.words) {
    if (beat.highlight || w.hl) {
      run.push({ word: w.t, at: w.at - beat.at });
      runSparks = runSparks || Boolean(w.sparks);
    } else {
      flushRun();
      parts.push({ word: w.t });
      marks.push(w.at - beat.at);
    }
  }
  flushRun();
  for (const e of beat.emojis ?? []) {
    parts.push({ emoji: e.e });
    marks.push(e.at - beat.at);
  }
  for (const t of beat.tiles ?? []) {
    parts.push({ image: t.image, tilt: t.tilt, cover: true, size: 150 });
    marks.push(t.at - beat.at);
  }
  return { parts, marks };
};

const TILE_SFX: SfxName[] = ["pop", "paper-flick", "whip"];
const MONEY = "\u{1F4B8}";

const beatHits = (beats: KineticBeat[]): Array<{ name: SfxName; at: number; volume?: number }> => {
  let tileCount = 0;
  return beats.flatMap((beat) => {
    const hits: Array<{ name: SfxName; at: number; volume?: number }> = [];
    const hl = beat.words.find((w) => w.hl || w.sparks) ?? (beat.highlight ? beat.words[0] : null);
    if (hl) hits.push({ name: "whoosh", at: hl.at + 4 });
    const sparksWord = beat.words.find((w) => w.sparks);
    if (sparksWord) hits.push({ name: "sparkle", at: sparksWord.at + 8, volume: 0.28 });
    for (const w of beat.words) {
      if (w.t === MONEY) hits.push({ name: "cash", at: w.at });
      else if (/\p{Extended_Pictographic}/u.test(w.t))
        hits.push({ name: "pop", at: w.at, volume: 0.4 });
    }
    for (const e of beat.emojis ?? []) hits.push({ name: "pop", at: e.at, volume: 0.4 });
    for (const t of beat.tiles ?? []) {
      hits.push({ name: TILE_SFX[tileCount % TILE_SFX.length], at: t.at, volume: 0.35 });
      tileCount += 1;
    }
    return hits;
  });
};

export const KineticBeats: React.FC<{
  beats: KineticBeat[];
  total: number;
  sfx?: boolean;
  ink?: string;
  accent?: string;
  hlInk?: string;
  background?: string;
}> = ({ beats, total, sfx = true, ink, accent, hlInk, background }) => (
  <AbsoluteFill style={{ background: background ?? "var(--background)" }}>
    {beats.map((beat, i) => {
      const end = i < beats.length - 1 ? beats[i + 1].at : total;
      const { parts, marks } = beatParts(beat);
      return (
        <Sequence key={i} from={beat.at} durationInFrames={end - beat.at}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateY(${beat.y ?? 0}px)`,
            }}
          >
            <KineticLine
              at={2}
              span={0}
              marks={marks}
              size={beat.size ?? 124}
              maxWidth={1700}
              parts={parts}
              ink={ink}
              accent={accent}
              hlInk={hlInk}
            />
          </div>
        </Sequence>
      );
    })}
    {sfx ? <SfxTrack hits={beatHits(beats)} /> : null}
  </AbsoluteFill>
);


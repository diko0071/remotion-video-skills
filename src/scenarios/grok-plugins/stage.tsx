import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { CameraRig } from "../../core/stage";
import { grokFont, FEED, FeedBotLine, FeedCard, FeedLogo, FeedUserLine, feedReveal, feedRise } from "../../kit/grok-ui";
import { RYZE } from "./app";
import { BLOCK_AT, CASES, DONE_AT, FILM_TOTAL, GREEN, GROUND, INK, LABELS, MUTED, REPLY_AT, STAGE_FULL, STAGE_IN } from "./timings";
import type { CaseSpec } from "./timings";

const COL_W = 940;
const COL_X = 900;
const FEED_TOP = 140;
const INDENT = FEED.indent;
const BORDER = FEED.border;

const Check: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.pop, 14);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: INK, ...feedRise(Math.min(1, p * 1.5), 10) }}>
      <span style={{ width: 26, height: 26, borderRadius: 13, background: GREEN, display: "inline-flex", alignItems: "center", justifyContent: "center", transform: `scale(${interpolate(p, [0, 1], [0.4, 1])})` }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5l2.6 2.6L11 4.5" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </span>
      {children}
      {frame < at ? null : null}
    </div>
  );
};

const Thumbs: React.FC<{ files: string[]; size: number; at: number }> = ({ files, size, at }) => (
  <div style={{ display: "flex", gap: 12 }}>
    {files.map((f, i) => (
      <Thumb key={f} file={f} size={size} at={at + i * 4} />
    ))}
  </div>
);

const Thumb: React.FC<{ file: string; size: number; at: number }> = ({ file, size, at }) => {
  const p = useSpringAt(at, SPRINGS.pop, 16);
  return (
    <div style={{ width: size, height: size, borderRadius: 14, overflow: "hidden", border: BORDER, transform: `scale(${interpolate(p, [0, 1], [0.6, 1])})`, opacity: Math.min(1, p * 2) }}>
      <Img src={staticFile(file)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
    </div>
  );
};

const EngineRow: React.FC<{ file: string; name: string; score: string; delta: string; at: number; first: boolean }> = ({ file, name, score, delta, at, first }) => {
  const p = useSpringAt(at, SPRINGS.card, 14);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "56px 1fr 120px 70px", alignItems: "center", padding: "12px 14px", fontSize: 24, color: INK, background: first ? "rgba(60,194,106,0.12)" : "transparent", borderTop: first ? undefined : BORDER, borderRadius: first ? 12 : 0, fontWeight: first ? 600 : 400, ...feedRise(Math.min(1, p * 1.5), 10) }}>
      <FeedLogo file={file} size={40} />
      <span>{name}</span>
      <span>{score}</span>
      <span style={{ color: delta.startsWith("+") ? GREEN : MUTED }}>{delta}</span>
    </div>
  );
};

const LiveCard: React.FC<{ name: string; budget: string; at: number }> = ({ name, budget, at }) => {
  const p = useSpringAt(at, SPRINGS.pop, 16);
  return (
    <div style={{ border: BORDER, borderRadius: 16, padding: "14px 18px", fontSize: 22, color: INK, background: "#101012", transform: `scale(${interpolate(p, [0, 1], [0.7, 1])})`, opacity: Math.min(1, p * 2) }}>
      <div style={{ fontWeight: 600, display: "flex", alignItems: "center" }}><FeedLogo file="integrations/meta-ads.svg" size={30} />{name}</div>
      <div style={{ color: MUTED, marginTop: 4 }}>{budget}</div>
      <div style={{ color: GREEN, marginTop: 6 }}>● Live</div>
    </div>
  );
};

const Artifact: React.FC<{ c: CaseSpec; at: number }> = ({ c, at }) => {
  switch (c.artifact) {
    case "creatives":
      return <Thumbs files={c.files ?? []} size={220} at={at} />;
    case "live":
      return (
        <div style={{ display: "flex", gap: 14 }}>
          {[["Summer Sale, Broad", "$60 / day"], ["Summer Sale, Retarget", "$40 / day"], ["Summer Sale, Lookalike", "$20 / day"]].map(([n, b], i) => (
            <LiveCard key={n} name={n} budget={b} at={at + i * 5} />
          ))}
        </div>
      );
    case "fixes":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {["/collections/summer-sale: title rewritten", "/products/linen-shirt: content expanded", "/blog/care-guide: canonical fixed", "/pages/about: H1 added", "8 more pages resubmitted"].map((r, i) => (
            <Check key={r} at={at + i * 5}>
              {r}
            </Check>
          ))}
        </div>
      );
    case "leaderboard":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 0, width: 700 }}>
          {[["ai-engines/chatgpt.png", "ChatGPT", "4 / 20", "+3"], ["ai-engines/perplexity.png", "Perplexity", "3 / 20", "+2"], ["ai-engines/claude.png", "Claude", "2 / 20", "+2"], ["ai-engines/gemini.png", "Gemini", "1 / 20", "0"]].map((r, i) => (
            <EngineRow key={r[1]} file={r[0]} name={r[1]} score={r[2]} delta={r[3]} at={at + i * 5} first={i === 0} />
          ))}
        </div>
      );
    case "paused":
      return (
        <div style={{ display: "flex", gap: 14 }}>
          {["Summer Sale, Broad", "Summer Sale, Retarget"].map((n) => (
            <div key={n} style={{ border: BORDER, borderRadius: 16, padding: "14px 18px", fontSize: 22, color: INK, background: "#101012" }}>
              <div style={{ fontWeight: 600, display: "flex", alignItems: "center" }}><FeedLogo file="integrations/meta-ads.svg" size={30} />{n}</div>
              <div style={{ color: "#E0A030", marginTop: 6 }}>● Paused</div>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
};

const Block: React.FC<{ c: CaseSpec; index: number }> = ({ c, index }) => {
  const frame = useCurrentFrame();
  const at = BLOCK_AT(index);
  if (frame < at - 6) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div data-click={`block.${index}`} style={{ height: 0 }} />
      <div style={{ height: 40 }} />
      <div style={{ fontSize: 22, color: MUTED, paddingLeft: INDENT, ...feedRise(feedReveal(frame, at, 10), 8) }}>Ryze AI</div>
      <FeedBotLine at={at} avatar={RYZE} gaze={{ x: 0.2, y: 0.05 }} logo={c.logo}>
        {c.bot}
      </FeedBotLine>
      <FeedUserLine at={at + REPLY_AT}>{c.reply}</FeedUserLine>
      <FeedBotLine at={at + DONE_AT} avatar={RYZE} gaze={{ x: -0.15, y: 0.2 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 24, height: 24, borderRadius: 12, background: GREEN, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M3 7.5l2.6 2.6L11 4.5" stroke="#0A0A0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
          {c.done}
          {c.doneLogos ? c.doneLogos.map((f) => <FeedLogo key={f} file={f} size={32} />) : null}
        </span>
      </FeedBotLine>
      <FeedCard at={at + DONE_AT + 8}>
        <Artifact c={c} at={at + DONE_AT + 12} />
      </FeedCard>
    </div>
  );
};

const Feed: React.FC = () => (
  <div data-click="feed" style={{ position: "absolute", left: COL_X, top: FEED_TOP, width: COL_W, display: "flex", flexDirection: "column" }}>
    {CASES.map((c, i) => (
      <Block key={c.reply} c={c} index={i} />
    ))}
  </div>
);

const SHOTS = [
  { at: 0, zoom: 1 },
  ...CASES.map((_, i) => ({ at: BLOCK_AT(i) - STAGE_IN - 4, target: `block.${i}`, zoom: 1, align: { y: 0.3 }, axis: "y" as const, chase: { stiffness: 0.02, damping: 0.3 } })),
];

const ROLL_H = 150;

const Roller: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pos = LABELS.reduce((acc, _, i) => (i === 0 ? 0 : acc + spring({ frame: frame - (BLOCK_AT(i) - 4), fps, config: SPRINGS.smooth, durationInFrames: 30 })), 0);
  const enter = feedReveal(frame, STAGE_IN + 4, 14);
  return (
    <div
      style={{
        position: "absolute",
        left: 100,
        top: 0,
        bottom: 0,
        width: 740,
        overflow: "hidden",
        opacity: enter,
        maskImage: "linear-gradient(180deg, rgba(0,0,0,0) 8%, #000 30%, #000 70%, rgba(0,0,0,0) 92%)",
        WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0) 8%, #000 30%, #000 70%, rgba(0,0,0,0) 92%)",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 540 - ROLL_H / 2, transform: `translateY(${-pos * ROLL_H}px)` }}>
        {LABELS.map((l, i) => {
          const d = Math.min(2, Math.abs(i - pos));
          const w = 1 - d / 2;
          const alpha = interpolate(d, [0, 1, 2], [1, 0.22, 0.1]);
          return (
            <div key={l} style={{ height: ROLL_H, display: "flex", alignItems: "center", fontSize: 88, fontWeight: 600, letterSpacing: "-0.03em", whiteSpace: "nowrap", color: `rgba(241,241,243,${alpha})`, transform: `scale(${0.9 + 0.1 * w})`, transformOrigin: "left center" }}>
              {l}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const RelayStage: React.FC = () => {
  const frame = useCurrentFrame();
  const bg = feedReveal(frame, STAGE_IN, STAGE_FULL - STAGE_IN);
  if (frame < STAGE_IN || frame >= FILM_TOTAL) return null;
  return (
    <AbsoluteFill style={{ fontFamily: grokFont }}>
      <AbsoluteFill style={{ background: GROUND, opacity: bg }} />
      <Sequence from={STAGE_IN} layout="none">
        <CameraRig shots={SHOTS} drift={0} bounds={false}>
          <Sequence from={-STAGE_IN} layout="none">
            <Feed />
          </Sequence>
        </CameraRig>
      </Sequence>
      <Roller />
    </AbsoluteFill>
  );
};


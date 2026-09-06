import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { SceneCursor, STAGE_ATTR } from "../../core/stage";
import {
  Bloub,
  BLOUB_INK,
  blinkTrack,
  GrokBubble,
  GrokComposer,
  GrokDay,
  GrokFrame,
  GrokHeader,
  GrokInlineBot,
  GrokMembers,
  GrokPanel,
  GrokRoutinesEmpty,
  GrokSidebar,
  GrokSystemRow,
  GrokThread,
  sidebarAvatarRect,
} from "../../kit/grok-ui";
import { RelayStage } from "./relay";
import type { GrokBotRow } from "../../kit/grok-ui";
import { SfxTrack } from "../../kit/sfx";
import {
  APP_IN,
  APP_OFF,
  APP_SCALE,
  CREAM,
  CENTER,
  COLLAPSE_FROM,
  COLLAPSE_TO,
  DROP_BLINK,
  DROP_MARKS,
  HERO_BLINKS,
  HERO_SIZE,
  LANDED_BLINK,
  LIFT_AT,
  MORPH_FROM,
  MORPH_TO,
  PANEL_OPEN,
  RING_R,
  RYZE_BOTS,
  SQUASH_AT,
  STAGE_FULL,
  STAGE_IN,
  SWALLOW_BLINK,
  THREAD_CLICK,
  THREAD_DROP,
  TILE,
  TOOL_MARKS,
  TOOLS,
  TOOLS_FROM,
} from "./timings";

const GROK_AVATAR = { shape: "circle" as const, color: BLOUB_INK };
const PANEL_W = 340;
const BOT_AVATARS = RYZE_BOTS.map((b) => ({ shape: b.shape, color: b.color }));
const THREAD_CLUSTER = [BOT_AVATARS[0], BOT_AVATARS[1]];
const ID = {
  hero: "hero",
  threadRow: "row.marketing",
};

const ringPhase = (frame: number) =>
  interpolate(frame, [TOOLS_FROM, COLLAPSE_FROM, COLLAPSE_TO], [0, 1.5, 4.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.35, 0, 0.7, 1),
  });

const ringRadius = (frame: number) =>
  interpolate(frame, [COLLAPSE_FROM, COLLAPSE_TO], [RING_R, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.6, 0, 0.9, 0.4),
  });

const ToolTile: React.FC<{ file: string; index: number }> = ({ file, index }) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(TOOL_MARKS[index], SPRINGS.pop, 22);
  const angle = (index / TOOLS.length) * Math.PI * 2 - Math.PI / 2 + ringPhase(frame);
  const r = ringRadius(frame);
  const collapse = interpolate(frame, [COLLAPSE_FROM + 10, COLLAPSE_TO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(pop, [0, 1], [0.3, 1]) * (1 - collapse * 0.45);
  const opacity =
    pop * interpolate(r, [40, 110], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame < TOOL_MARKS[index] || frame > COLLAPSE_TO) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: CENTER + Math.cos(angle) * r - TILE / 2,
        top: CENTER + Math.sin(angle) * r * 0.82 - TILE / 2,
        width: TILE,
        height: TILE,
        borderRadius: 20,
        background: "#fff",
        border: "1px solid rgba(17,17,19,0.08)",
        boxShadow: "0 10px 30px rgba(17,17,19,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <Img src={staticFile(file)} style={{ width: 42, height: 42, objectFit: "contain", display: "block" }} />
    </div>
  );
};

const heroRect = (frame: number) => {
  const p = interpolate(frame, [MORPH_FROM, MORPH_TO], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.5, 0, 0.15, 1),
  });
  const slot = sidebarAvatarRect(0);
  const to = { x: APP_OFF + slot.x * APP_SCALE, y: APP_OFF + slot.y * APP_SCALE, size: slot.size * APP_SCALE };
  const from = { x: CENTER - HERO_SIZE / 2, y: CENTER - HERO_SIZE / 2, size: HERO_SIZE };
  return {
    x: interpolate(p, [0, 1], [from.x, to.x]),
    y: interpolate(p, [0, 1], [from.y, to.y]),
    size: interpolate(p, [0, 1], [from.size, to.size]),
  };
};

const HeroLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(0, SPRINGS.pop, 26);
  const squash = useSpringAt(SQUASH_AT, SPRINGS.pop, 22);
  const rect = heroRect(frame);
  const phase = ringPhase(frame) + Math.PI / 2;
  const tracking = interpolate(
    frame,
    [TOOLS_FROM, TOOLS_FROM + 20, COLLAPSE_TO - 10, COLLAPSE_TO],
    [0, 0.85, 0.85, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const gaze = { x: Math.cos(phase) * tracking, y: Math.sin(phase) * tracking * 0.7 };
  const blink = blinkTrack(frame, [...HERO_BLINKS, SWALLOW_BLINK, LANDED_BLINK]);
  const bump = Math.sin(Math.min(1, squash) * Math.PI);
  return (
    <>
      {TOOLS.map((file, i) => (
        <ToolTile key={file} file={file} index={i} />
      ))}
      <div
        data-click={ID.hero}
        style={{
          position: "absolute",
          left: rect.x,
          top: rect.y,
          width: rect.size,
          height: rect.size,
          transform: `scale(${interpolate(pop, [0, 1], [0.2, 1]) * (1 + bump * 0.12)}, ${interpolate(pop, [0, 1], [0.2, 1]) * (1 - bump * 0.1)})`,
          opacity: frame > MORPH_TO ? 0 : pop,
        }}
      >
        <Bloub size={rect.size} gaze={gaze} blink={blink} />
      </div>
    </>
  );
};

const dropStyle = (p: number): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${interpolate(p, [0, 1], [-46, 0])}px)`,
});

const useRows = (): GrokBotRow[] => {
  const frame = useCurrentFrame();
  const d0 = useSpringAt(DROP_MARKS[0], SPRINGS.pop, 26);
  const d1 = useSpringAt(DROP_MARKS[1], SPRINGS.pop, 26);
  const d2 = useSpringAt(DROP_MARKS[2], SPRINGS.pop, 26);
  const d3 = useSpringAt(DROP_MARKS[3], SPRINGS.pop, 26);
  const dt = useSpringAt(THREAD_DROP, SPRINGS.pop, 26);
  const drops = [d0, d1, d2, d3];
  const threadOpen = frame >= THREAD_CLICK;
  const lastMsg = "SEO Optimizer, Paid Ads Optimizer, GEO Optimizer, Creatives";
  return [
    {
      name: "Ryze AI",
      preview: "How can I help you with marketing?",
      time: "Now",
      active: !threadOpen,
      avatar: GROK_AVATAR,
      avatarHidden: frame < MORPH_TO,
      blink: blinkTrack(frame, [LANDED_BLINK]),
    },
    ...RYZE_BOTS.map((b, i) => ({
      name: b.name,
      preview: b.ready,
      time: "Now",
      avatar: BOT_AVATARS[i],
      blink: blinkTrack(frame, [DROP_MARKS[i] + DROP_BLINK]),
      style: frame < DROP_MARKS[i] ? { opacity: 0 } : dropStyle(drops[i]),
    })),
    {
      name: "Marketing",
      preview: lastMsg,
      time: "Now",
      active: threadOpen,
      avatar: BOT_AVATARS[0],
      cluster: THREAD_CLUSTER,
      id: ID.threadRow,
      style: frame < THREAD_DROP ? { opacity: 0 } : dropStyle(dt),
    },
  ];
};

const GrokChat: React.FC = () => (
  <GrokThread>
    <GrokDay text="Today" />
    <GrokBubble>How can I help you with marketing?</GrokBubble>
  </GrokThread>
);

const BotLine: React.FC<{ i: number }> = ({ i }) => (
  <GrokInlineBot avatar={BOT_AVATARS[i]} name={RYZE_BOTS[i].name} />
);

const MarketingThread: React.FC = () => (
  <GrokThread anchored>
    <GrokDay text="Today" />
    <GrokSystemRow>
      Added <BotLine i={0} /> <BotLine i={1} /> <BotLine i={2} /> <BotLine i={3} />
    </GrokSystemRow>
  </GrokThread>
);

const AppLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const appIn = useSpringAt(APP_IN, SPRINGS.panel, 30);
  const rows = useRows();
  const dissolve = interpolate(frame, [STAGE_IN, STAGE_FULL], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const threadOpen = frame >= THREAD_CLICK;
  const panelOpen = frame >= PANEL_OPEN;
  if (frame < APP_IN || frame >= STAGE_FULL) return null;
  return (
    <AbsoluteFill
      style={{
        opacity: appIn * (1 - dissolve),
        transform: `scale(${APP_SCALE * interpolate(appIn, [0, 1], [0.965, 1]) * (1 + dissolve * 0.05)})`,
        filter: dissolve > 0.02 ? `blur(${dissolve * 10}px)` : undefined,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(23,19,16,0.16), 0 0 0 1px rgba(23,19,16,0.06)",
        background: "#fff",
      }}
    >
      <GrokFrame
        sidebar={<GrokSidebar rows={rows} />}
        panel={
          panelOpen ? (
            <GrokPanel width={PANEL_W} innerWidth={PANEL_W} tools={false}>
              <GrokMembers members={RYZE_BOTS.map((b, i) => ({ name: b.name, avatar: BOT_AVATARS[i] }))} />
              <GrokRoutinesEmpty />
            </GrokPanel>
          ) : null
        }
      >
        {threadOpen ? (
          <GrokHeader name="Marketing" avatar={BOT_AVATARS[0]} cluster={THREAD_CLUSTER} panelTools />
        ) : (
          <GrokHeader name="Ryze AI" avatar={GROK_AVATAR} blink={blinkTrack(frame, [LANDED_BLINK])} />
        )}
        {threadOpen ? <MarketingThread /> : <GrokChat />}
        <div style={{ opacity: frame >= LIFT_AT ? 0 : 1 }}>
          <GrokComposer placeholder={threadOpen ? "Message Marketing" : "Message Ryze AI"} />
        </div>
      </GrokFrame>
      <Sequence durationInFrames={STAGE_IN} layout="none">
        <SceneCursor
          from={{ x: 760, y: 1120 }}
          appearAt={THREAD_DROP}
          wander={0}
          moves={[{ target: ID.threadRow, at: THREAD_CLICK, travel: 26 }]}
        />
      </Sequence>
    </AbsoluteFill>
  );
};

export const GrokBotFilm: React.FC = () => (
  <AbsoluteFill style={{ background: CREAM }} {...{ [STAGE_ATTR]: "" }}>
    <AppLayer />
    <HeroLayer />
    <RelayStage />
    <SfxTrack hits={[{ name: "mouse-click", at: THREAD_CLICK }]} />
  </AbsoluteFill>
);

import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { lerpRect, SPRINGS, typing, useSpringAt } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { CameraRig, SceneCursor } from "../../core/stage";
import { Bloub, grokFont, MicIcon, PlusIcon, SB_W } from "../../kit/grok-ui";
import type { BotAvatar } from "../../kit/grok-ui";
import { SfxTrack } from "../../kit/sfx";
import {
  ADS_APPROVE,
  ADS_AT,
  ADS_LEN,
  APP_OFF,
  APP_SCALE,
  BUBBLE_LEN,
  CREAM,
  CREATIVES_AT,
  LIFT_AT,
  LIFT_LEN,
  PROMPT,
  RYZE_BOTS,
  SEND,
  SEO_AT,
  STAGE_FULL,
  STAGE_IN,
  TYPE_FROM,
  TYPE_TO,
  TYPING_AT,
  TYPING_STAGGER,
  WALL_AT,
  WALL_GAPS,
} from "./timings";

const INK = "#111113";
const MUTED = "#6E6E73";
const FILL = "#FFFFFF";
const FILL_BORDER = "1px solid #E6E6E8";
const FILL_2 = "#E7E7E9";
const GREEN = "#1C8A5A";
const ORANGE = "#D9822B";
const COL_W = 900;
const COL_X = 90;
const FEED_TOP = 210;
const AVATAR = 64;
const INDENT = AVATAR + 18;
const APP_PANEL_W = 340;

type Bot = { name: string; avatar: BotAvatar };
const bot = (i: number): Bot => ({ name: RYZE_BOTS[i].name, avatar: { shape: RYZE_BOTS[i].shape, color: RYZE_BOTS[i].color } });
const SEO = bot(0);
const ADS = bot(1);
const GEO = bot(2);
const CREATIVES = bot(3);
const CONTENT: Bot = { name: "Content Writer", avatar: { shape: "circle", color: "#7A5AF8" } };
const BACKLINKS: Bot = { name: "Backlink Exchange", avatar: { shape: "triangle", color: "#E0457B" } };
const EMAIL: Bot = { name: "Email", avatar: { shape: "square", color: "#0EA5E9" } };
const REPORTS: Bot = { name: "Reports", avatar: { shape: "circle", color: "#B8860B" } };
const GADS: Bot = { name: "Google Ads Manager", avatar: { shape: "square", color: "#4285F4" } };
const META: Bot = { name: "Meta Ads Manager", avatar: { shape: "circle", color: "#0866FF" } };
const SHOP: Bot = { name: "Shopify Optimizer", avatar: { shape: "triangle", color: "#5E8E3E" } };
const LANDING: Bot = { name: "Landing Pages", avatar: { shape: "square", color: "#E85D04" } };
const COMPET: Bot = { name: "Competitor Watch", avatar: { shape: "circle", color: "#D7263D" } };
const REVIEWS: Bot = { name: "Reviews", avatar: { shape: "triangle", color: "#F2B705" } };

const reveal = (frame: number, at: number, span = 12) =>
  interpolate(frame, [at, at + span], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const riseStyle = (p: number, distance = 26): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * distance}px)`,
});

const APP_COMPOSER = {
  x: APP_OFF + (SB_W + 22) * APP_SCALE,
  y: APP_OFF + (1080 - 80) * APP_SCALE,
  w: (1080 - SB_W - APP_PANEL_W - 44) * APP_SCALE,
  h: 60 * APP_SCALE,
};
const STAGE_COMPOSER = { x: COL_X, y: 492, w: COL_W, h: 96 };
const BUBBLE = { w: 640, h: 78 };
const BUBBLE_RECT = { x: 1080 - COL_X - BUBBLE.w, y: 96, w: BUBBLE.w, h: BUBBLE.h };

const rectAt = (frame: number) => {
  const lift = interpolate(frame, [LIFT_AT, LIFT_AT + LIFT_LEN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const morph = interpolate(frame, [SEND, SEND + BUBBLE_LEN], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });
  const a = lerpRect(lift, { x: APP_COMPOSER.x, y: APP_COMPOSER.y, size: APP_COMPOSER.w }, { x: STAGE_COMPOSER.x, y: STAGE_COMPOSER.y, size: STAGE_COMPOSER.w });
  const ha = interpolate(lift, [0, 1], [APP_COMPOSER.h, STAGE_COMPOSER.h]);
  const b = lerpRect(morph, { x: a.x, y: a.y, size: a.size }, { x: BUBBLE_RECT.x, y: BUBBLE_RECT.y, size: BUBBLE_RECT.w });
  const h = interpolate(morph, [0, 1], [ha, BUBBLE_RECT.h]);
  return { x: b.x, y: b.y, w: b.size, h, lift, morph };
};

const StagePrompt: React.FC = () => {
  const frame = useCurrentFrame();
  const r = rectAt(frame);
  const typed = typing(frame, PROMPT, TYPE_FROM, TYPE_TO);
  const caret = frame >= TYPE_FROM - 6 && frame < SEND && Math.floor(frame / 14) % 2 === 0;
  const fontSize = interpolate(r.lift, [0, 1], [16, 32]);
  const ink = r.morph;
  const chrome = 1 - Math.min(1, r.morph * 2.2);
  const press = interpolate(frame, [SEND - 3, SEND, SEND + 5], [1, 0.82, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const circle = interpolate(r.lift, [0, 1], [40, 60]);
  return (
    <div
      data-click="prompt"
      style={{
        position: "absolute",
        left: r.x,
        top: r.y,
        width: r.w,
        height: r.h,
        borderRadius: interpolate(ink, [0, 1], [r.h / 2, 30]),
        borderBottomRightRadius: interpolate(ink, [0, 1], [r.h / 2, 10]),
        background: `rgb(${255 - ink * 238}, ${255 - ink * 238}, ${255 - ink * 236})`,
        border: `1px solid rgba(230,230,232,${1 - ink})`,
        boxShadow: `0 2px 10px rgba(0,0,0,${0.05 * (1 - ink)})`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: `0 ${interpolate(ink, [0, 1], [10, 32])}px`,
        overflow: "hidden",
        fontFamily: grokFont,
      }}
    >
      <span
        style={{
          width: circle * chrome,
          height: circle,
          borderRadius: 999,
          background: FILL_2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: INK,
          flexShrink: 0,
          opacity: chrome,
          overflow: "hidden",
        }}
      >
        <PlusIcon size={circle * 0.5} />
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontSize,
          fontWeight: interpolate(ink, [0, 1], [400, 500]),
          color: `rgb(${17 + ink * 238}, ${17 + ink * 238}, ${19 + ink * 236})`,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        {typed.length === 0 && frame < SEND ? <span style={{ color: "#9A9A9F" }}>Message Marketing</span> : typed || PROMPT}
        {caret ? <span style={{ display: "inline-block", width: 2, height: fontSize * 1.1, background: INK, verticalAlign: -4, marginLeft: 2 }} /> : null}
      </span>
      <span
        style={{
          width: circle * chrome,
          height: circle,
          borderRadius: 999,
          background: INK,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          opacity: chrome,
          transform: `scale(${press})`,
          overflow: "hidden",
        }}
      >
        <MicIcon size={circle * 0.5} />
      </span>
    </div>
  );
};

const Dots: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <span style={{ display: "inline-flex", gap: 8, alignItems: "center", height: 20 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 12,
            height: 12,
            borderRadius: 999,
            background: MUTED,
            opacity: 0.35 + 0.65 * Math.max(0, Math.sin((frame - i * 5) / 4)),
          }}
        />
      ))}
    </span>
  );
};

const Pill: React.FC<{ color: string; children: React.ReactNode; size?: number }> = ({ color, children, size = 22 }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      height: size * 1.9,
      padding: `0 ${size * 0.75}px`,
      borderRadius: 999,
      background: FILL_2,
      fontSize: size,
      color,
      flexShrink: 0,
      whiteSpace: "nowrap",
    }}
  >
    <span style={{ width: size * 0.4, height: size * 0.4, borderRadius: 999, background: "currentColor" }} />
    {children}
  </span>
);

const Button: React.FC<{ primary?: boolean; children: React.ReactNode; id?: string; size?: number }> = ({ primary, children, id, size = 26 }) => (
  <span
    data-click={id}
    style={{
      height: size * 2.4,
      padding: `0 ${size * 1.2}px`,
      borderRadius: 16,
      background: primary ? INK : "#fff",
      color: primary ? "#fff" : INK,
      border: primary ? "none" : "1px solid #E6E6E8",
      fontSize: size,
      fontWeight: 500,
      display: "inline-flex",
      alignItems: "center",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const Expand: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const p = useSpringAt(at, SPRINGS.card, 26);
  return (
    <div style={{ overflow: "hidden", maxHeight: interpolate(p, [0, 1], [0, 1400]), opacity: Math.min(1, p * 1.6) }}>
      {children}
    </div>
  );
};

const Speaker: React.FC<{
  bot: Bot;
  typingAt: number;
  speakAt: number;
  id?: string;
  seed?: number;
  text: React.ReactNode;
  card?: React.ReactNode;
  cardAt?: number;
  compact?: boolean;
}> = ({ bot: b, typingAt, speakAt, id, seed = 0, text, card, cardAt, compact }) => {
  const frame = useCurrentFrame();
  const rowIn = reveal(frame, typingAt, 10);
  const speaking = frame >= speakAt;
  const bubbleIn = useSpringAt(speakAt, SPRINGS.card, 20);
  const dots = 1 - reveal(frame, speakAt, 5);
  const gaze = speaking
    ? { x: 0.35 + Math.sin((frame + seed) / 22) * 0.12, y: 0.25 + Math.cos((frame + seed) / 19) * 0.06 }
    : { x: Math.sin((frame - typingAt) / 12 + seed) * 0.4, y: 0.2 + Math.cos((frame - typingAt) / 14) * 0.1 };
  void id;
  const nameSize = compact ? 22 : 26;
  const textSize = compact ? 26 : 32;
  const av = compact ? 52 : AVATAR;
  const ind = av + 18;
  if (frame < typingAt) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, ...riseStyle(rowIn, 18) }}>
      <div style={{ fontSize: nameSize, fontWeight: 600, color: b.avatar.color, paddingLeft: ind }}>{b.name}</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 18 }}>
        <span style={{ flexShrink: 0, marginBottom: 6 }}>
          <Bloub size={av} shape={b.avatar.shape} color={b.avatar.color} gaze={gaze} />
        </span>
        {speaking ? (
          <div
            style={{
              background: FILL,
              border: FILL_BORDER,
              borderRadius: 28,
              padding: compact ? "16px 22px" : "20px 28px",
              fontSize: textSize,
              lineHeight: 1.35,
              color: INK,
              maxWidth: COL_W - ind,
              transform: `scale(${interpolate(bubbleIn, [0, 1], [0.9, 1])})`,
              transformOrigin: "left bottom",
              opacity: Math.min(1, bubbleIn * 1.5),
            }}
          >
            {text}
          </div>
        ) : (
          <span style={{ background: FILL, border: FILL_BORDER, borderRadius: 26, padding: "20px 26px", display: "inline-flex", opacity: dots }}>
            <Dots />
          </span>
        )}
      </div>
      {card && cardAt !== undefined ? (
        <div style={{ marginLeft: ind }}>
          <Expand at={cardAt}>{card}</Expand>
        </div>
      ) : null}
    </div>
  );
};

const ResultCard: React.FC<{
  title: string;
  pill: string;
  pillColor?: string;
  children?: React.ReactNode;
  description?: React.ReactNode;
  primary?: string;
  secondary?: string;
  compact?: boolean;
}> = ({ title, pill, pillColor = GREEN, children, description, primary, secondary, compact }) => (
  <div
    style={{
      width: COL_W - (compact ? 70 : INDENT),
      background: FILL,
      border: FILL_BORDER,
      borderRadius: 28,
      padding: compact ? 18 : 24,
      display: "flex",
      flexDirection: "column",
      gap: compact ? 12 : 18,
      marginTop: 4,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <span style={{ fontSize: compact ? 26 : 30, fontWeight: 600, color: INK, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</span>
      <Pill color={pillColor} size={compact ? 19 : 22}>
        {pill}
      </Pill>
    </div>
    {children}
    {description ? <div style={{ fontSize: compact ? 22 : 26, color: MUTED, lineHeight: 1.4 }}>{description}</div> : null}
    {primary || secondary ? (
      <div style={{ display: "flex", gap: 12 }}>
        {primary ? <Button primary size={compact ? 22 : 26}>{primary}</Button> : null}
        {secondary ? <Button size={compact ? 22 : 26}>{secondary}</Button> : null}
      </div>
    ) : null}
  </div>
);

const Check: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.pop, 20);
  const t = reveal(frame, at, 8);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, color: INK, ...riseStyle(t, 12) }}>
      <span
        style={{
          width: 34,
          height: 34,
          borderRadius: 999,
          background: GREEN,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${interpolate(p, [0, 1], [0.4, 1])})`,
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
          <path d="m5 12.5 4.5 4.5L19 7.5" />
        </svg>
      </span>
      {children}
    </div>
  );
};

const Thumb: React.FC<{ file: string; w: number; h: number; at: number; tilt?: number }> = ({ file, w, h, at, tilt = 0 }) => {
  const p = useSpringAt(at, SPRINGS.pop, 22);
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E6E6E8",
        background: "#fff",
        boxShadow: "0 12px 30px rgba(17,17,19,0.12)",
        transform: `scale(${interpolate(p, [0, 1], [0.6, 1])}) rotate(${interpolate(p, [0, 1], [tilt * 3, tilt])}deg)`,
        opacity: p,
        flexShrink: 0,
      }}
    >
      <Img src={staticFile(file)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
    </div>
  );
};

const Handoff: React.FC<{ at: number; to: Bot }> = ({ at, to }) => {
  const frame = useCurrentFrame();
  const p = reveal(frame, at, 10);
  if (frame < at) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 26, color: MUTED, paddingLeft: INDENT, ...riseStyle(p, 10) }}>
      Messaged
      <Bloub size={30} shape={to.avatar.shape} color={to.avatar.color} />
      <span style={{ color: INK, fontWeight: 500 }}>{to.name}</span>
    </div>
  );
};

const SEO_FIXES = ["Rewrote 31 title tags", "Fixed 14 broken links", "LCP 4.1s → 1.8s on product pages", "Schema added to 120 pages", "6 articles written, publishing daily"];
const SEO_MARKS = cascade(SEO_AT + 26, [8, 7, 6, 6]);

const ApprovalCard: React.FC = () => {
  const frame = useCurrentFrame();
  const approved = frame >= ADS_APPROVE + 2;
  const live = frame >= ADS_APPROVE + 18;
  const liveIn = useSpringAt(ADS_APPROVE + 18, SPRINGS.pop, 20);
  return (
    <div style={{ width: COL_W - INDENT, background: FILL, border: FILL_BORDER, borderRadius: 28, padding: 24, display: "flex", flexDirection: "column", gap: 16, marginTop: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ fontSize: 30, fontWeight: 600, color: INK, flex: 1 }}>The Bot wants to run a task</span>
        <Pill color={approved ? GREEN : ORANGE}>{approved ? "Approved" : "Approval required"}</Pill>
      </div>
      <div style={{ fontSize: 26, color: MUTED, lineHeight: 1.4 }}>Launch the campaign: 3 ad sets, 6 creatives, $120 a day on Meta.</div>
      <div style={{ fontSize: 24, color: MUTED }}>› Show the details</div>
      <div style={{ display: "flex", gap: 12, height: 62, alignItems: "center" }}>
        {approved ? (
          <span style={{ fontSize: 28, color: GREEN, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 14 }}>
            Approved. Launching.
            {live ? (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  height: 44,
                  padding: "0 18px",
                  borderRadius: 999,
                  background: GREEN,
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: 600,
                  transform: `scale(${interpolate(liveIn, [0, 1], [0.6, 1])})`,
                }}
              >
                <span style={{ width: 9, height: 9, borderRadius: 999, background: "#fff" }} />
                Live
              </span>
            ) : null}
          </span>
        ) : (
          <>
            <Button primary id="relay.approve">
              Approve
            </Button>
            <Button>Deny</Button>
          </>
        )}
      </div>
    </div>
  );
};

type WallItem = { bot: Bot; text: string; card?: { title: string; pill: string; file?: string } };

const POOL: WallItem[] = [
  { bot: CONTENT, text: "Wrote 'Best mint chocolate protein' and 4 more.", card: { title: "5 articles", pill: "Scheduled", file: "deck-gen/slides/marketing-audit-00.png" } },
  { bot: GADS, text: "Search campaign rebuilt: 12 ad groups, exact match.", card: { title: "Google Ads", pill: "Live", file: "dashboard-templates/previews/paid-performance.webp" } },
  { bot: BACKLINKS, text: "Exchanged 3 backlinks with DR 40+ sites this week." },
  { bot: META, text: "Retargeting set relaunched, 1.9x ROAS in 48h.", card: { title: "Meta retargeting", pill: "Live" } },
  { bot: EMAIL, text: "Win-back email drafted for 1,240 lapsed customers.", card: { title: "Win-back flow", pill: "Draft" } },
  { bot: SHOP, text: "Collection pages reordered by margin.", card: { title: "Shopify", pill: "Done" } },
  { bot: REPORTS, text: "Weekly report: revenue +18%, ROAS 4.2x.", card: { title: "Weekly report", pill: "Ready", file: "deck-gen/slides/quarterly-review-00.png" } },
  { bot: LANDING, text: "New landing page for the launch set.", card: { title: "Landing page", pill: "Published", file: "deck-gen/slides/landing-teardown-00.png" } },
  { bot: COMPET, text: "Competitor cut prices 15%. Ad copy adjusted." },
  { bot: REVIEWS, text: "Replied to 23 reviews, 4.7 average." },
  { bot: SEO, text: "Fixed 9 new 404s from yesterday's crawl." },
  { bot: CREATIVES, text: "3 video ads rendered for the launch set.", card: { title: "Video ads", pill: "3 ready", file: "kachava/top-2-36d.jpg" } },
  { bot: ADS, text: "Paused 1 ad set at 0.7x ROAS, budget moved." },
  { bot: GEO, text: "Perplexity now cites 2 of your comparison pages." },
  { bot: CONTENT, text: "Product page copy refreshed for 40 SKUs.", card: { title: "Product copy", pill: "40 pages" } },
  { bot: EMAIL, text: "Post-purchase flow rewritten, 3 emails." },
  { bot: GADS, text: "Negative keywords added: 140 terms." },
  { bot: REPORTS, text: "Daily digest sent to Slack.", card: { title: "Daily digest", pill: "Sent" } },
  { bot: BACKLINKS, text: "2 new partner sites joined the exchange." },
  { bot: SHOP, text: "Abandoned cart discount tested, +6% recovery." },
];

const WALL_COLS = 15;
const WALL_CENTER = 7;
const WALL_COL_GAP = 36;
const WALL_TOP = -4600;
const WALL_MARKS = cascade(WALL_AT + 30, WALL_GAPS);

const WallMessage: React.FC<{ item: WallItem; at: number; seed: number }> = ({ item, at, seed }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(at, SPRINGS.card, 20);
  const card = item.card;
  if (frame < at) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, ...riseStyle(p, 40) }}>
      <Speaker bot={item.bot} typingAt={at - 1} speakAt={at} seed={seed} compact text={item.text} />
      {card ? (
        <div style={{ marginLeft: 70 }}>
          <ResultCard compact title={card.title} pill={card.pill}>
            {card.file ? (
              <div style={{ width: 220, height: 124, borderRadius: 12, overflow: "hidden", border: "1px solid #E6E6E8" }}>
                <Img src={staticFile(card.file)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
              </div>
            ) : null}
          </ResultCard>
        </div>
      ) : null}
    </div>
  );
};

const sideEntries = (c: number) => {
  const offset = (c * 7) % POOL.length;
  return Array.from({ length: 84 }, (_, i) => {
    const item = POOL[(offset + i) % POOL.length];
    const at = i < 72 ? WALL_AT - 40 + (i % 9) : WALL_MARKS[Math.min(i - 72, WALL_MARKS.length - 1)] + ((c * 5 + i * 3) % 7) - 3;
    return { item, at, seed: c * 31 + i * 7 };
  });
};

const SIDE_COLUMNS = Array.from({ length: WALL_COLS }, (_, c) => (c === WALL_CENTER ? [] : sideEntries(c)));
const CENTER_TAIL = Array.from({ length: 56 }, (_, i) => ({ item: POOL[(i * 3 + 1) % POOL.length], at: WALL_MARKS[Math.min(i, WALL_MARKS.length - 1)] + Math.max(0, i - WALL_MARKS.length + 1) * 2, seed: 100 + i * 11 }));

const Block: React.FC<{ id: string; mountAt: number; children: React.ReactNode; top?: number }> = ({ id, mountAt, children, top = 70 }) => {
  const frame = useCurrentFrame();
  if (frame < mountAt) return null;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <div data-click={id} style={{ height: 0 }} />
      <div style={{ height: top }} />
      {children}
    </div>
  );
};

const TypingBlock: React.FC = () => {
  const frame = useCurrentFrame();
  const collapse = reveal(frame, SEO_AT - 8, 8);
  if (frame >= SEO_AT) return null;
  const bots = [CREATIVES, ADS, GEO];
  return (
    <div style={{ overflow: "hidden", maxHeight: interpolate(collapse, [0, 1], [480, 0]), opacity: 1 - collapse, display: "flex", flexDirection: "column", gap: 22, paddingTop: 22 }}>
      {bots.map((b, i) => (
        <Speaker key={b.name} bot={b} typingAt={TYPING_AT + (i + 1) * TYPING_STAGGER} speakAt={1e9} seed={(i + 1) * 17} text={null} />
      ))}
    </div>
  );
};

const CenterFeed: React.FC = () => (
  <div data-click="feed" style={{ position: "absolute", left: COL_X, top: FEED_TOP, width: COL_W, display: "flex", flexDirection: "column", gap: 0 }}>
    <Block id="seo.block" mountAt={TYPING_AT} top={10}>
      <Speaker
        bot={SEO}
        typingAt={TYPING_AT}
        speakAt={SEO_AT}
        text="Optimized your website. Here is the result."
        cardAt={SEO_AT + 14}
        card={
          <ResultCard title="Website optimization" pill="Done" description="Site is ready for ads." primary="View report" secondary="Open site">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SEO_FIXES.map((f, i) => (
                <Check key={f} at={SEO_MARKS[i]}>
                  {f}
                </Check>
              ))}
            </div>
          </ResultCard>
        }
      />
      <TypingBlock />
      <Handoff at={SEO_AT + 68} to={CREATIVES} />
    </Block>
    <Block id="creatives.block" mountAt={CREATIVES_AT - 6}>
      <Speaker
        bot={CREATIVES}
        typingAt={CREATIVES_AT - 6}
        speakAt={CREATIVES_AT}
        seed={40}
        text="Site is ready. Made 6 creatives in your brand style."
        cardAt={CREATIVES_AT + 14}
        card={
          <ResultCard title="New creatives" pill="6 ready" description="Ready to launch." primary="Open" secondary="Regenerate">
            <div style={{ display: "flex", gap: 14 }}>
              <Thumb file="kachava/top-1-36d.jpg" w={250} h={250} at={CREATIVES_AT + 16} tilt={-2} />
              <Thumb file="kachava/top-2-36d.jpg" w={250} h={250} at={CREATIVES_AT + 22} tilt={1.5} />
              <Thumb file="kachava/top-7-17d.jpg" w={250} h={250} at={CREATIVES_AT + 28} tilt={-1} />
            </div>
          </ResultCard>
        }
      />
      <Handoff at={CREATIVES_AT + 62} to={ADS} />
    </Block>
    <Block id="ads.block" mountAt={ADS_AT - 6}>
      <Speaker
        bot={ADS}
        typingAt={ADS_AT - 6}
        speakAt={ADS_AT}
        seed={80}
        text="Launching the campaign. I need your approval."
        cardAt={ADS_AT + 14}
        card={<ApprovalCard />}
      />
    </Block>
    <Block id="geo.block" mountAt={WALL_AT - 6}>
      <Speaker
        bot={GEO}
        typingAt={WALL_AT - 6}
        speakAt={WALL_AT}
        seed={120}
        text="ChatGPT cites you in 38% of answers, competitors in 61%. Drafting 12 comparison pages."
        cardAt={WALL_AT + 10}
        card={
          <ResultCard title="AI visibility" pill="Report" primary="Open report">
            <div style={{ width: 420, height: 236, borderRadius: 14, overflow: "hidden", border: "1px solid #E6E6E8" }}>
              <Img src={staticFile("dashboard-templates/previews/ai-traffic.webp")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }} />
            </div>
          </ResultCard>
        }
      />
    </Block>
    {CENTER_TAIL.map((e, i) => (
      <WallMessage key={i} item={e.item} at={e.at} seed={e.seed} />
    ))}
  </div>
);

const SideColumns: React.FC = () => {
  const frame = useCurrentFrame();
  const sides = reveal(frame, WALL_AT + 6, 40);
  if (frame < WALL_AT) return null;
  return (
    <>
      {SIDE_COLUMNS.map((entries, c) =>
        c === WALL_CENTER ? null : (
          <div
            key={c}
            style={{
              position: "absolute",
              left: COL_X + (c - WALL_CENTER) * (COL_W + WALL_COL_GAP),
              top: WALL_TOP + ((c * 137) % 260) - 130,
              width: COL_W,
              display: "flex",
              flexDirection: "column",
              gap: 22,
              opacity: sides,
            }}
          >
            {entries.map((e, i) => (
              <WallMessage key={i} item={e.item} at={e.at} seed={e.seed} />
            ))}
          </div>
        ),
      )}
    </>
  );
};

const TOP = 0;
const SHOTS = [
  { at: 0, zoom: 1 },
  { at: SEO_AT - STAGE_IN, target: "seo.block", zoom: 1, align: { y: TOP }, snap: true },
  { at: CREATIVES_AT - 6 - STAGE_IN, target: "creatives.block", zoom: 1, align: { y: TOP }, snap: true },
  { at: ADS_AT - 6 - STAGE_IN, target: "ads.block", zoom: 1, align: { y: TOP }, snap: true },
  { at: WALL_AT - 6 - STAGE_IN, target: "geo.block", zoom: 0.09, align: { y: 0.45 }, chase: { stiffness: 0.009, damping: 0.19 } },
];

export const RelayStage: React.FC = () => {
  const frame = useCurrentFrame();
  const bg = reveal(frame, STAGE_IN, STAGE_FULL - STAGE_IN);
  if (frame < STAGE_IN) return null;
  return (
    <AbsoluteFill style={{ fontFamily: grokFont }}>
      <AbsoluteFill style={{ background: CREAM, opacity: bg }} />
      <Sequence from={STAGE_IN} layout="none">
        <CameraRig shots={SHOTS} drift={0} bounds={false}>
          <Sequence from={-STAGE_IN} layout="none">
            <SideColumns />
            <CenterFeed />
            <StagePrompt />
            <Sequence from={ADS_AT} durationInFrames={ADS_LEN + 8} layout="none">
              <SceneCursor
                from={{ x: 860, y: 1120 }}
                appearAt={14}
                wander={0}
                moves={[
                  { target: "relay.approve", at: ADS_APPROVE - ADS_AT, travel: 34 },
                  { target: "relay.approve", at: ADS_APPROVE - ADS_AT + 22, travel: 14, press: false, nudge: { x: 260, y: 160 } },
                ]}
              />
            </Sequence>
          </Sequence>
        </CameraRig>
      </Sequence>
      <SfxTrack hits={[{ name: "mouse-click", at: SEND }, { name: "mouse-click", at: ADS_APPROVE }]} />
    </AbsoluteFill>
  );
};

import React from "react";
import { blink, press, ramp, typing } from "../../core/motion";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Cursor } from "../../kit/cursor";
import { ClaudeComposer, ClaudeFrame, ClaudeUserBubble, ClaudeWelcome, Starburst } from "../../kit/claude-ui";
import { DirectionalBlur } from "../../kit/directional-blur";
import { Ellipsis, FillCard, FillRow, StreamText } from "../../kit/agent-answer";
import { SkeletonBar } from "../../kit/skeleton-bar";
import { DocCard, ReportCard } from "./report-card";
import { ANSWER, ANSWER2, CARDS, CHAT, COMPOSER, CURSOR3, CURSOR4, CURSOR5, DRAG, NEW, PROMPT, PROMPT2, PULLING, REPORT, ROWS, SCORE, SEND, TILE_AT_CUT, TYPE, UI, UI_SCALE, WELCOME } from "./claude-timings";

const STAR_SCREEN_SIZE = 34 * UI_SCALE;

const ACCENT = "#D97757";
const SERIF = "var(--cl-serif, Georgia, serif)";

const WelcomePhase: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT, TYPE.from, TYPE.to);
  const focused = frame >= TYPE.click;
  const pressed = press(frame, SEND.press, 0.9);
  const hoverIn = ramp(frame, SEND.hover, SEND.hover + 8);
  const breathe = 0.42 + 0.18 * Math.sin((frame - SEND.hover) * 0.42);
  const hoverGlow = hoverIn * breathe;
  const pressGlow = frame >= SEND.press ? 1 - ramp(frame, SEND.press + 2, SEND.press + 14) : 0;
  const glow = Math.max(hoverGlow, pressGlow);
  const shine = frame >= SEND.press ? 1 - ramp(frame, SEND.press, SEND.press + 10) : frame >= SEND.hover ? ((frame - SEND.hover) % 26) / 26 : 0;
  const textIn = ramp(frame, 4, 16);
  const rise = 1 - Math.pow(1 - ramp(frame, 2, 18), 3);
  const starReady = frame >= WELCOME.morphLen;
  return (
    <div className={starReady ? undefined : "mh-nostar"} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <style>{".mh-nostar .cl-welcome .star { opacity: 0; }"}</style>
      <div style={{ position: "absolute", top: WELCOME.y, opacity: textIn, transform: `translateX(${(1 - textIn) * 14}px)`, filter: textIn < 0.98 ? `blur(${(1 - textIn) * 6}px)` : undefined }}>
        <ClaudeWelcome text="Welcome" />
      </div>
      <div style={{ position: "absolute", top: COMPOSER.y + (1 - rise) * 260, width: COMPOSER.w, opacity: rise, filter: rise < 0.98 ? `blur(${(1 - rise) * 10}px)` : undefined }}>
        <ClaudeComposer typed={typed} cursor={focused && frame < SEND.press && blink(frame)} placeholder={focused ? "" : "How can I help you today?"} send={typed.length > 0} sendPressed={pressed} sendGlow={glow} sendShine={shine} model="Fable 5" modelVariant="Max" />
      </div>
    </div>
  );
};

const Answer: React.FC<{ text: string; from: number; to: number }> = ({ text, from, to }) => (
  <StreamText text={text} from={from} to={to} color="#141413" tint={ACCENT} hidden="transparent" weight={[600, 500]} />
);

const Card: React.FC<{ index: number }> = ({ index }) => {
  const c = CARDS[index];
  return (
    <FillCard at={CHAT.cards[index]} style={{ flex: 1, minHeight: 120, borderRadius: 10, border: "0.5px solid rgba(20,20,19,0.16)", background: "#FFFFFF", padding: "14px 14px" }}>
      <div style={{ width: 14, height: 14, borderRadius: 4, background: c.color, opacity: 0.85, marginBottom: 8 }} />
      <div style={{ fontFamily: SERIF, fontSize: 12, fontWeight: 600, color: "#141413", marginBottom: 6 }}>{c.title}</div>
      <div style={{ fontFamily: SERIF, fontSize: 10.5, lineHeight: 1.45, color: "#5E5D59" }}>
        <Answer text={c.body} from={CHAT.cards[index] + 4} to={CHAT.cards[index] + 22} />
      </div>
    </FillCard>
  );
};

const Bar: React.FC<{ w: string; delay: number }> = ({ w, delay }) => (
  <SkeletonBar w={w} h={9} radius={5} base="#F3B7A6" highlight="#F7D1C6" speed={3} delay={delay} />
);

const Row: React.FC<{ index: number }> = ({ index }) => {
  const r = ROWS[index];
  return (
    <FillRow
      at={CHAT.rows[index]}
      fill={[CHAT.fills[index], CHAT.fills[index] + 8]}
      style={{ position: "relative", height: 46, borderRadius: 8, border: "0.5px solid rgba(20,20,19,0.14)", background: "#FFFFFF", padding: "0 12px", overflow: "hidden", display: "flex", alignItems: "center" }}
      skeletonStyle={{ position: "absolute", left: 12, right: 12, top: 0, bottom: 0, display: "flex", flexDirection: "column", justifyContent: "center", gap: 7 }}
      skeleton={
        <>
          <Bar w="100%" delay={index * 9} />
          <Bar w="60%" delay={index * 9 + 20} />
        </>
      }
      contentStyle={{ display: "flex", gap: 9, alignItems: "center" }}
    >
      <span style={{ width: 13, height: 13, borderRadius: 3, border: "1.5px solid #B8B6AF", display: "inline-block", flex: "none" }} />
      <span style={{ fontFamily: SERIF, fontSize: 12, lineHeight: 1.3, color: "#141413" }}>
        <b style={{ fontWeight: 600 }}>{r.title}</b>
        <br />
        <span style={{ color: "#2FA36B" }}>{r.value.split(" ")[0]}</span> {r.value.split(" ").slice(1).join(" ")}
      </span>
    </FillRow>
  );
};

const ChatPhase: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = 1 - Math.pow(1 - ramp(frame, CHAT.composerRise[0], CHAT.composerRise[1]), 3);
  const scoreP = ramp(frame, CHAT.scoreAt, CHAT.scoreAt + 8);
  const scroll = 1 - Math.pow(1 - ramp(frame, CHAT.scrollAt, CHAT.scrollAt + 12), 3);
  const scrollPrev = 1 - Math.pow(1 - ramp(frame - 1, CHAT.scrollAt, CHAT.scrollAt + 12), 3);
  const initP = 1 - Math.pow(1 - ramp(frame, CHAT.initAt, CHAT.initAt + 8), 3);
  const showInit = frame >= CHAT.initAt - 2;
  const scroll2 = 1 - Math.pow(1 - ramp(frame, CHAT.scoreScroll, CHAT.scoreScroll + 12), 3);
  const scroll2Prev = 1 - Math.pow(1 - ramp(frame - 1, CHAT.scoreScroll, CHAT.scoreScroll + 12), 3);
  const scoreIn = 1 - Math.pow(1 - ramp(frame, SCORE.showAt, SCORE.showAt + 10), 3);
  const cp = ramp(frame, SCORE.countFrom, SCORE.countTo);
  const eased = cp < 0.5 ? 2 * cp * cp : 1 - Math.pow(-2 * cp + 2, 2) / 2;
  const value = Math.round(SCORE.from + (SCORE.to - SCORE.from) * eased);
  const green = ramp(frame, SCORE.greenAt, SCORE.greenAt + 4);
  const flash = frame >= SCORE.greenAt ? 1 - ramp(frame, SCORE.greenAt + 2, SCORE.greenAt + 16) : 0;
  const numColor = green < 1 ? ACCENT : "#2FA36B";
  const typed2 = frame < NEW.dock[0] ? typing(frame, PROMPT2, NEW.typeFrom, NEW.typeTo) : "";
  const focused2 = frame >= NEW.click && frame < NEW.dock[0];
  const scroll3 = 1 - Math.pow(1 - ramp(frame, NEW.dock[0], NEW.dock[1]), 3);
  const scroll3Prev = 1 - Math.pow(1 - ramp(frame - 1, NEW.dock[0], NEW.dock[1]), 3);
  const scroll4 = 1 - Math.pow(1 - ramp(frame, REPORT.at, REPORT.at + 12), 3);
  const scroll4Prev = 1 - Math.pow(1 - ramp(frame - 1, REPORT.at, REPORT.at + 12), 3);
  const reportHead = 1 - Math.pow(1 - ramp(frame, REPORT.at + 2, REPORT.at + 10), 3);
  const readyIn = 1 - Math.pow(1 - ramp(frame, REPORT.readyAt, REPORT.readyAt + 10), 3);
  const composerGone = ramp(frame, REPORT.at, REPORT.at + 10);
  const dragging = frame >= DRAG.grab;
  const bubble2 = 1 - Math.pow(1 - ramp(frame, NEW.bubbleAt, NEW.bubbleAt + 10), 3);
  const pull = 1 - Math.pow(1 - ramp(frame, NEW.pullAt, NEW.pullAt + 8), 3);
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center" }}>
      <DirectionalBlur id="mh-chat-scroll" y={Math.abs(scroll - scrollPrev) * CHAT.scrollBy * 0.4 + Math.abs(scroll2 - scroll2Prev) * CHAT.scoreScrollBy * 0.4 + Math.abs(scroll3 - scroll3Prev) * NEW.scrollBy * 0.4 + Math.abs(scroll4 - scroll4Prev) * REPORT.scrollBy * 0.4} style={{ position: "absolute", top: 70 - scroll * CHAT.scrollBy - scroll2 * CHAT.scoreScrollBy - scroll3 * NEW.scrollBy - scroll4 * REPORT.scrollBy, width: 600, display: "flex", flexDirection: "column", gap: 16 }}>
        <ClaudeUserBubble>{PROMPT}</ClaudeUserBubble>
        <div style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.45, color: "#141413", maxWidth: 520 }}>
          <Answer text={ANSWER} from={CHAT.streamFrom} to={CHAT.streamTo} />
        </div>
        <div style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 500, color: ACCENT, opacity: scoreP, transform: `translateY(${(1 - scoreP) * 8}px)` }}>
          Your AI Visibility Score: 34% — here's how I'll fix it:
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {CARDS.map((_, i) => (
            <Card key={i} index={i} />
          ))}
        </div>
        {showInit ? (
          <div style={{ marginTop: 20, opacity: initP, transform: `translateY(${(1 - initP) * 14}px)` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: SERIF, fontSize: 34, fontWeight: 500, color: "#141413", marginBottom: 14 }}>
              <span style={{ color: ACCENT, display: "inline-flex" }}>
                <Starburst size={40} />
              </span>
              <span>
                Initiating Actions
                <Ellipsis width={40} letterSpacing={2} />
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
              {ROWS.map((_, i) => (
                <Row key={i} index={i} />
              ))}
            </div>
            {frame >= SCORE.showAt ? (
              <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 8, fontFamily: SERIF, fontSize: 26, fontWeight: 500, color: "#141413", opacity: scoreIn, transform: `translateY(${(1 - scoreIn) * 10}px)` }}>
                <span>Your AI Visibility Score:</span>
                <span style={{ color: numColor, opacity: cp > 0 || frame >= SCORE.countFrom ? 1 : 0.5, textShadow: flash > 0 ? `0 0 ${18 * flash}px rgba(47,163,107,${0.9 * flash}), 0 0 ${36 * flash}px rgba(47,163,107,${0.6 * flash})` : undefined, transform: `scale(${1 + 0.18 * flash})`, display: "inline-block", minWidth: 60 }}>
                  {value}%
                </span>
              </div>
            ) : null}
          </div>
        ) : null}
        {frame >= NEW.bubbleAt ? (
          <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ opacity: bubble2, transform: `translateY(${(1 - bubble2) * 10}px)` }}>
              <ClaudeUserBubble>{PROMPT2}</ClaudeUserBubble>
            </div>
            <div style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.45, color: "#141413", maxWidth: 520 }}>
              <Answer text={ANSWER2} from={NEW.answerFrom} to={NEW.answerTo} />
            </div>
            {frame >= NEW.pullAt && frame < REPORT.at + 6 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: pull * (1 - ramp(frame, REPORT.at, REPORT.at + 6)), transform: `translateY(${(1 - pull) * 8}px)`, height: frame >= REPORT.at ? 0 : undefined, overflow: "hidden" }}>
                <span style={{ color: ACCENT, display: "inline-flex" }}>
                  <Starburst size={26} />
                </span>
                <span style={{ fontFamily: SERIF, fontSize: 19, fontStyle: "italic", color: "#5E5D59" }}>
                  <Answer text={PULLING} from={NEW.pullAt + 2} to={NEW.pullTo} />
                </span>
              </div>
            ) : null}
            {frame >= REPORT.at ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 0 }}>
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 500, color: "#141413", opacity: reportHead, transform: `translateY(${(1 - reportHead) * 8}px)` }}>
                  Live report <span style={{ color: ACCENT }}>progress done</span>
                </div>
                <ReportCard />
                {frame >= REPORT.readyAt ? (
                  <div style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 500, color: "#141413", marginTop: 12, opacity: readyIn, transform: `translateY(${(1 - readyIn) * 8}px)` }}>
                    Ready to <span style={{ color: ACCENT }}>drop in Slack</span>
                  </div>
                ) : null}
                {frame >= REPORT.docAt ? <DocCard hideIcon={dragging} /> : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </DirectionalBlur>
      <div style={{ position: "absolute", bottom: 62 + (1 - rise) * -260 - composerGone * 220, width: 600, opacity: rise * (1 - composerGone), filter: rise < 0.95 ? `blur(${(1 - rise) * 8}px)` : undefined }}>
        <ClaudeComposer typed={typed2} cursor={focused2 && blink(frame)} placeholder={focused2 ? "" : "Reply…"} send={typed2.length > 0} model="Fable 5" modelVariant="Max" />
      </div>
    </div>
  );
};

export const ClaudeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const inNew = frame >= NEW.cut;
  const inChat = frame >= CHAT.from;
  return (
    <AbsoluteFill style={{ background: "#FAF9F5" }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: UI.w, height: UI.h, transform: `scale(${UI_SCALE})`, transformOrigin: "0 0" }}>
      <ClaudeFrame header={false} style={{ background: "#FAF9F5" }}>
        <div style={{ position: "relative", flex: 1 }}>
          {inChat ? <ChatPhase /> : <WelcomePhase />}
          {inNew ? (
            <Cursor
              scale={1.4}
              appearAt={NEW.cut + 4}
              stops={[
                { x: CURSOR4.from.x, y: CURSOR4.from.y, at: NEW.cut + 4 },
                { x: CURSOR4.toComposer.x, y: CURSOR4.toComposer.y, at: CURSOR4.toComposer.at },
                { x: CURSOR4.click.x, y: CURSOR4.click.y, at: CURSOR4.click.at, click: true },
                { x: CURSOR4.leave.x, y: CURSOR4.leave.y, at: CURSOR4.leave.at },
              ]}
            />
          ) : null}
          {inNew ? (
            <div style={{ opacity: frame >= DRAG.grab ? 0 : 1 }}>
            <Cursor
              scale={1.4}
              appearAt={DRAG.cursorIn}
              stops={[
                { x: CURSOR5.from.x, y: CURSOR5.from.y, at: DRAG.cursorIn },
                { x: CURSOR5.doc.x, y: CURSOR5.doc.y, at: DRAG.toDoc },
                { x: CURSOR5.doc.x, y: CURSOR5.doc.y, at: DRAG.grab, click: true },
                { x: CURSOR5.lift.x, y: CURSOR5.lift.y, at: DRAG.lift },
              ]}
            />
            </div>
          ) : null}
          {!inChat && !inNew ? (
            <Cursor
              scale={1.4}
              stops={[
                { x: CURSOR3.start.x, y: CURSOR3.start.y, at: 0 },
                { x: CURSOR3.carry.x, y: CURSOR3.carry.y, at: CURSOR3.carry.at },
                { x: CURSOR3.toComposer.x, y: CURSOR3.toComposer.y, at: CURSOR3.toComposer.at },
                { x: CURSOR3.click.x, y: CURSOR3.click.y, at: CURSOR3.click.at, click: true },
                { x: CURSOR3.toSend.x, y: CURSOR3.toSend.y, at: CURSOR3.toSend.at },
                { x: CURSOR3.toSend.x, y: CURSOR3.toSend.y, at: CURSOR3.press, click: true },
              ]}
            />
          ) : null}
        </div>
      </ClaudeFrame>
      </div>
    </AbsoluteFill>
  );
};

export const TileMorph: React.FC<{ star: { x: number; y: number } }> = ({ star }) => {
  const frame = useCurrentFrame();
  const p = 1 - Math.pow(1 - ramp(frame, 0, WELCOME.morphLen), 3);
  if (frame >= WELCOME.morphLen) return null;
  const size = TILE_AT_CUT.size + (STAR_SCREEN_SIZE - TILE_AT_CUT.size) * p;
  const x = TILE_AT_CUT.x + (star.x - TILE_AT_CUT.x) * p;
  const y = TILE_AT_CUT.y + (star.y - TILE_AT_CUT.y) * p;
  const bg = 1 - ramp(frame, 5, 15);
  const tint = ramp(frame, 4, 14);
  const r = Math.round(255 + (217 - 255) * tint);
  const g = Math.round(255 + (119 - 255) * tint);
  const b = Math.round(255 + (87 - 255) * tint);
  return (
    <div style={{ position: "absolute", left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: TILE_AT_CUT.radius * (size / TILE_AT_CUT.size), background: `rgba(20,20,20,${bg})`, boxShadow: `0 18px 40px rgba(0,0,0,${0.22 * bg})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Starburst size={size * 0.58} color={`rgb(${r},${g},${b})`} />
    </div>
  );
};

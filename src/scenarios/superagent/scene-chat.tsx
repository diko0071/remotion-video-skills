import React from "react";
import { useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/SourceSerif4";
import { blink, ramp, typing } from "../../core/motion";
import { Ellipsis, FillCard, FillRow, StreamText } from "../../kit/agent-answer";
import { Cursor } from "../../kit/cursor";
import { SkeletonBar } from "../../kit/skeleton-bar";
import { KeyedRig } from "../../kit/keyed-rig";
import { glowShadow } from "../../kit/rise-letters";
import { ACTIONS, AGENT_LINE1, AGENT_LINE2, CAM_CHAT, CHATX, GAPS, PROMPT_TEXT, THREAD_Y } from "./chat-timings";

const { fontFamily: SERIF } = loadFont();
const UI = "Inter, -apple-system, sans-serif";
const INK = "#2B2118";
const MUTED = "#8A7F73";
const PURPLE = "#8B6CF0";
const ease = (p: number) => 1 - Math.pow(1 - p, 3);
const L = (t: number) => t - CHATX.from;

const Orb: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: "radial-gradient(circle at 50% 35%, #7A5A3A 0%, #2B1E14 55%, #120C08 100%)", boxShadow: `0 0 ${size * 0.3}px rgba(193,151,103,0.5)`, position: "relative", overflow: "hidden", flex: "none" }}>
    <div style={{ position: "absolute", left: "8%", right: "8%", top: "40%", height: "22%", borderRadius: "50%", background: "linear-gradient(90deg, rgba(255,230,200,0) 0%, #F6DDB8 30%, #FFF2E0 50%, #F6DDB8 70%, rgba(255,230,200,0) 100%)", filter: "blur(2px)" }} />
  </div>
);

const Stream: React.FC<{ text: string; range: readonly [number, number]; color: string; tint?: string }> = ({ text, range, color, tint = "#E9A0B8" }) => (
  <StreamText text={text} from={range[0]} to={range[1]} color={color} tint={tint} tintAt={[3, 12]} reveal={5} blur={6} />
);

const Skeleton: React.FC<{ w: number; delay: number }> = ({ w, delay }) => (
  <SkeletonBar w={w} h={34} radius={17} base="#ECE9DA" highlight="#F6F4EA" speed={2.5} delay={delay} />
);

const GapCard: React.FC<{ index: number }> = ({ index }) => {
  const g = GAPS[index];
  return (
    <FillCard
      at={L(CHATX.cardsAt) + index * 3}
      rise={14}
      fill={[L(CHATX.cardFill[index]), L(CHATX.cardFill[index]) + 8]}
      style={{ position: "absolute", left: 275 + index * 452, top: THREAD_Y.cards, width: 430, height: 410, borderRadius: 30, background: "#FFFFFF", boxShadow: "0 0 0 2px #E8E4CF, 0 10px 0 -4px #EDEADB", padding: "46px 46px" }}
      skeletonStyle={{ position: "absolute", inset: 46, display: "flex", flexDirection: "column", gap: 40 }}
      skeleton={
        <>
          <Skeleton w={110} delay={index * 9} />
          <Skeleton w={210} delay={index * 9 + 20} />
          <Skeleton w={310} delay={index * 9 + 40} />
        </>
      }
      contentStyle={{ fontFamily: SERIF }}
    >
      <svg width={56} height={40} viewBox="0 0 56 40" fill="none" stroke="#E8623E" strokeWidth={3} strokeLinecap="round"><path d="M6 34 L50 8 M8 36 h32" /></svg>
      <div style={{ fontSize: 30, fontWeight: 600, color: INK, marginTop: 16, lineHeight: 1.2 }}>{g.title}</div>
      <div style={{ fontSize: 28, color: MUTED, marginTop: 22, lineHeight: 1.3 }}>
        <Stream text={g.body} range={[L(CHATX.cardFill[index]) + 4, L(CHATX.cardFill[index]) + 18]} color={MUTED} />
      </div>
    </FillCard>
  );
};

const ActionRow: React.FC<{ index: number }> = ({ index }) => {
  const a = ACTIONS[index];
  const col = index % 2;
  const row = Math.floor(index / 2);
  return (
    <FillRow
      at={L(CHATX.rowsAt) + index * 3}
      len={10}
      rise={10}
      fill={[L(CHATX.rowFill[index]), L(CHATX.rowFill[index]) + 8]}
      style={{ position: "absolute", left: 190 + col * 790, top: THREAD_Y.rows + row * 150, width: 770, height: 130, borderRadius: 14, background: "#FFFFFF", boxShadow: "0 0 0 1.5px #E0DAF5", padding: "22px 24px", display: "flex", gap: 18 }}
      skeletonStyle={{ position: "absolute", left: 60, right: 40, top: 30, display: "flex", flexDirection: "column", gap: 18 }}
      skeleton={
        <>
          <div style={{ height: 20, width: "70%", borderRadius: 10, background: "linear-gradient(90deg, #C9B8FF, #F3B8D8, #FFD9C2)" }} />
          <div style={{ height: 20, width: "45%", borderRadius: 10, background: "linear-gradient(90deg, #C9B8FF, #F3B8D8)" }} />
        </>
      }
    >
      {(fill) => (
        <>
          <span style={{ width: 36, height: 36, borderRadius: 18, background: "#E8DFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", opacity: fill, flex: "none" }}>
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={PURPLE} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7" /></svg>
          </span>
          <div style={{ fontFamily: SERIF, fontSize: 27, lineHeight: 1.25, color: INK, opacity: fill }}>
            <div style={{ fontWeight: 600 }}>{a.title}</div>
            <div>
              <Stream text={a.body} range={[L(CHATX.rowFill[index]) + 2, L(CHATX.rowFill[index]) + 16]} color={INK} />
            </div>
          </div>
        </>
      )}
    </FillRow>
  );
};

const Composer: React.FC<{ typed: string; caret: boolean; docked: boolean }> = ({ typed, caret, docked }) => (
  <div style={{ width: 1390, height: docked ? 180 : 200, borderRadius: 26, background: "#FFFFFF", boxShadow: "0 0 0 2px #E8E4CF, 0 18px 40px rgba(60,50,20,0.08)", padding: "30px 34px", fontFamily: UI, fontSize: 32, color: typed ? "#222" : "#8A7A5A", position: "relative", whiteSpace: "pre" }}>
    {typed || "How can I help you today?"}
    {caret ? <span style={{ display: "inline-block", width: 2, height: 36, background: "#222", marginLeft: 3, verticalAlign: "-6px" }} /> : null}
    <div style={{ position: "absolute", right: 30, bottom: 26, display: "flex", gap: 14, alignItems: "center" }}>
      {docked ? <span style={{ width: 24, height: 24, borderRadius: 12, border: "4px solid #2F6BFF", borderRightColor: "#E8E4CF", display: "inline-block" }} /> : <span style={{ width: 20, height: 20, borderRadius: 10, background: "#2F6BFF", display: "inline-block" }} />}
      <span style={{ width: 40, height: 40, borderRadius: 20, background: "#F1EFE0", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </span>
    </div>
  </div>
);

export const ChatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, PROMPT_TEXT, L(CHATX.type[0]), L(CHATX.type[1]));
  const focused = frame >= L(CHATX.click);
  const inThread = frame >= L(CHATX.thread);
  const chip = ease(ramp(frame, L(CHATX.chipAt), L(CHATX.chipAt) + 10));
  const head = ease(ramp(frame, L(CHATX.headAt), L(CHATX.headAt) + 10));
  const ask = ease(ramp(frame, L(CHATX.askAt), L(CHATX.askAt) + 10));
  const yes = ease(ramp(frame, L(CHATX.yesAt), L(CHATX.yesAt) + 8));
  const init = ease(ramp(frame, L(CHATX.initAt), L(CHATX.initAt) + 12));
  const counterIn = ease(ramp(frame, L(CHATX.counterLine), L(CHATX.counterLine) + 10));
  const cp = ramp(frame, L(CHATX.counter[0]), L(CHATX.counter[1]));
  const value = Math.round(15 + 55 * cp);
  const flash = frame >= L(CHATX.flashAt) ? 1 - ramp(frame, L(CHATX.flashAt) + 4, L(CHATX.flashAt) + 22) : 0;
  const composerOut = ramp(frame, L(CHATX.scroll2), L(CHATX.scroll2) + 10);
  return (
    <KeyedRig id="sa-chat-rig" keys={CAM_CHAT} bg="#FDFDFB">
      {!inThread ? (
        <>
          <div style={{ position: "absolute", left: 928, top: 118 }}>
            <Orb size={64} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 230, textAlign: "center", fontFamily: UI, fontSize: 40, fontWeight: 500, color: "#222" }}>Good Evening, Dmitry!</div>
          <div style={{ position: "absolute", left: 265, top: 320 }}>
            <Composer typed={typed} caret={focused && frame < L(CHATX.send) && blink(frame)} docked={false} />
            <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
              {["AI Search", "SEO Growth", "Account", "Cleanup"].map((c) => (
                <span key={c} style={{ fontFamily: UI, fontSize: 24, color: "#333", padding: "12px 22px", borderRadius: 12, border: "1px solid rgba(60,50,20,0.18)", background: "#FFFFFF" }}>
                  {c} <span style={{ marginLeft: 14, color: "#888" }}>+</span>
                </span>
              ))}
            </div>
          </div>
          <Cursor scale={1.6} appearAt={L(CHATX.cursorIn)} stops={[{ x: 1300, y: 900, at: L(CHATX.cursorIn) }, { x: 560, y: 372, at: L(CHATX.click) - 6 }, { x: 560, y: 372, at: L(CHATX.click), click: true }, { x: 1250, y: 980, at: L(CHATX.click) + 26 }]} />
        </>
      ) : (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 2400 }}>
          <div style={{ position: "absolute", right: 250, top: -40, background: "#F3F1E4", borderRadius: 14, padding: "12px 22px", fontFamily: SERIF, fontSize: 22, color: INK, opacity: chip, transform: `translateY(${(1 - chip) * 10}px)` }}>{PROMPT_TEXT}</div>
          <div style={{ position: "absolute", left: 245, top: THREAD_Y.line1 - 15 }}>
            <Orb size={60} />
          </div>
          <div style={{ position: "absolute", left: 320, top: THREAD_Y.line1, fontFamily: SERIF, fontSize: 40, lineHeight: 1.4, color: MUTED }}>
            <Stream text={AGENT_LINE1} range={[L(CHATX.line1[0]), L(CHATX.line1[1])]} color={MUTED} />
            <br />
            {frame >= L(CHATX.line2[0]) ? <Stream text={AGENT_LINE2} range={[L(CHATX.line2[0]), L(CHATX.line2[1])]} color={INK} /> : null}
          </div>
          <div style={{ position: "absolute", left: 320, top: THREAD_Y.head, fontFamily: SERIF, fontSize: 44, color: INK, opacity: head, transform: `translateY(${(1 - head) * 8}px)` }}>Three gaps are keeping you invisible:</div>
          {GAPS.map((_, i) => (frame >= L(CHATX.cardsAt) ? <GapCard key={i} index={i} /> : null))}
          <div style={{ position: "absolute", left: 275, top: THREAD_Y.ask, fontFamily: SERIF, fontSize: 40, color: INK, opacity: ask }}>Want me to fix these gaps for you?</div>
          <div style={{ position: "absolute", right: 310, top: THREAD_Y.ask + 8, background: "#F3F1E4", borderRadius: 14, padding: "16px 28px", fontFamily: SERIF, fontSize: 30, color: INK, opacity: yes, transform: `scale(${0.7 + 0.3 * yes})` }}>Yess pls</div>
          <div style={{ position: "absolute", left: 190, top: THREAD_Y.init, display: "flex", alignItems: "center", gap: 36, opacity: init, transform: `translateX(${(1 - init) * -20}px)` }}>
            <Orb size={116} />
            <span style={{ fontFamily: SERIF, fontSize: 96, fontWeight: 600, color: "#3B2A1E", letterSpacing: "-0.01em" }}>
              Initiating Actions <Ellipsis width={90} letterSpacing={4} />
            </span>
          </div>
          {ACTIONS.map((_, i) => (frame >= L(CHATX.rowsAt) ? <ActionRow key={i} index={i} /> : null))}
          <div style={{ position: "absolute", left: 190, top: THREAD_Y.counter, display: "flex", alignItems: "center", gap: 30, opacity: counterIn }}>
            <Orb size={80} />
            <span style={{ fontFamily: SERIF, fontSize: 44, color: INK }}>
              Your visibility is already moving:{"\u00a0"}
              <span style={{ display: "inline-block", minWidth: 120, marginLeft: 8, color: cp > 0 ? INK : "transparent", textShadow: glowShadow(flash, "150,110,240", "255,240,255", "220,180,255"), transform: `scale(${1 + 0.2 * flash})` }}>{value}%</span>
            </span>
          </div>
          <div style={{ position: "absolute", left: 265, top: 900 + composerOut * 500, opacity: 1 - composerOut }}>
            <Composer typed="Why isn't my brand showing up in Chatgpt?" caret={false} docked />
            <div style={{ textAlign: "center", fontFamily: UI, fontSize: 16, color: "#8A7A5A", marginTop: 12 }}>AI can make mistakes - please double-check</div>
          </div>
        </div>
      )}
    </KeyedRig>
  );
};

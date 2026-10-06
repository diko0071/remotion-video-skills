import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StreamText } from "../../kit/agent-answer";
import { SettleLine } from "../../kit/settle-text";
import { SANS } from "./font";
import { CASE, CASES, CLAUDE_BG, CORAL, FAVICON, GREEN, INK } from "./timings";

const SERIF = "var(--cl-serif, Georgia, serif)";

export const CaseScene: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const c = CASES[index];
  const card = useSpringAt(CASE.cardAt, SPRINGS.card, 18);
  const replyAt = Math.round(c.len * CASE.replyAt);
  const doneAt = Math.round(c.len * CASE.doneAt);
  const reply = useSpringAt(replyAt, SPRINGS.pop, 14);
  const done = useSpringAt(doneAt, SPRINGS.pop, 14);
  const push = 1 + 0.035 * ramp(frame, 0, c.len);
  const check = ramp(frame, doneAt, doneAt + 6);
  return (
    <AbsoluteFill style={{ background: CLAUDE_BG, fontFamily: SANS, transform: `scale(${push})` }}>
      <div style={{ position: "absolute", left: 60, top: 0, width: 760, height: 1080 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 330, display: "flex", justifyContent: "center", alignItems: "center", gap: 14, fontSize: 30, color: "#8C8A83", opacity: ramp(frame, CASE.labelAt, CASE.labelAt + 8) }}>
          <Img src={staticFile(c.logo)} style={{ width: 36, height: 36 }} />
          {`0${index + 1}`}
        </div>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
          <div style={{ position: "relative", width: 760, height: 320 }}>
            <SettleLine size={124} ink={INK} fontFamily={SANS} weight={600} lineHeight={1.04} maxWidth={760} parts={c.label.split(" ").map((w, i) => ({ word: w, at: CASE.labelAt + i * 4 }))} />
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", left: 860, top: 270, width: 1000, borderRadius: 32, background: "#FFFFFF", border: "1px solid rgba(20,20,19,0.08)", boxShadow: "0 30px 70px rgba(74,53,29,0.12)", padding: "40px 46px", opacity: Math.min(1, card * 1.4), transform: `translateY(${(1 - card) * 60}px) scale(${0.96 + 0.04 * card})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 30, fontWeight: 600, color: INK }}>
          <Img src={staticFile(FAVICON)} style={{ width: 38, height: 38, borderRadius: 9 }} />
          Ryze AI
          <span style={{ fontSize: 24, fontWeight: 500, color: "#8C8A83" }}>on Opus 5</span>
        </div>
        <div style={{ marginTop: 20, fontFamily: SERIF, fontSize: 42, lineHeight: 1.34, color: "#141413" }}>
          <StreamText text={c.msg} from={CASE.msgFrom} to={CASE.msgFrom + CASE.msgSpan} color="#141413" tint={CORAL} hidden="transparent" />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 26, height: 74 }}>
          <div style={{ background: "#2E2D2A", color: "#FFFFFF", fontSize: 34, fontWeight: 500, padding: "14px 30px", borderRadius: 22, opacity: Math.min(1, reply * 1.5), transform: `translateY(${(1 - reply) * 14}px) scale(${0.85 + 0.15 * reply})`, transformOrigin: "right center" }}>{c.reply}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 22, height: 52, fontSize: 34, fontWeight: 600, color: GREEN, opacity: Math.min(1, done * 1.5), transform: `translateY(${(1 - done) * 12}px)` }}>
          <span style={{ width: 42, height: 42, borderRadius: 21, background: GREEN, display: "inline-flex", alignItems: "center", justifyContent: "center", transform: `scale(${0.5 + 0.5 * check})` }}>
            <svg width="18" height="18" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 5.5 L4 7.5 L8 3" />
            </svg>
          </span>
          {c.done}
        </div>
      </div>
    </AbsoluteFill>
  );
};

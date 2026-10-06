import React from "react";
import { Img, useCurrentFrame } from "remotion";
import { typing } from "../../core/motion";
import { AD_GREEN } from "../../kit/ad-objects";
import { C } from "../../kit/launch";
import { blinkOn, Caret, CheckIcon, pressScale, useIn } from "./parts";
import { LOGOS, SOFT } from "./theme";
import { T } from "./timings";

const QUESTION = "Before I scale it: lead with free shipping, or with 20% off?";
const ANSWER = "Free shipping";
export const ASK_TIMES = {
  question: T.asks.needs,
  typeFrom: T.asks.needs + 22,
  typeTo: T.asks.needs + 38,
  send: T.asks.asks - 8,
} as const;

export const ASK_BOX = { top: 296, h: 96, button: 236 } as const;

export const AskBody: React.FC = () => {
  const f = useCurrentFrame();
  const sent = f >= ASK_TIMES.send + 2;
  const answer = sent ? "" : typing(f, ANSWER, ASK_TIMES.typeFrom, ASK_TIMES.typeTo);
  return (
    <div style={{ position: "relative", padding: "30px 40px 0", height: "100%", boxSizing: "border-box" }}>
      <div style={useIn(T.asks.at + 2)}>
        <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em" }}>The agent needs your input</div>
        <div style={{ fontSize: 22, fontWeight: 600, color: C.mutedFg, marginTop: 4 }}>It stopped work until you answer — reply below and it picks right back up.</div>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginTop: 26, ...useIn(ASK_TIMES.question) }}>
        <Img src={LOGOS.sun} style={{ width: 46, height: 46, flex: "none", marginTop: 6 }} />
        <div style={{ padding: "18px 24px", borderRadius: 18, background: SOFT, fontSize: 32, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.25, maxWidth: 900 }}>
          {QUESTION}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: ASK_BOX.top,
          height: ASK_BOX.h,
          borderRadius: 16,
          border: `2px solid ${C.border}`,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          padding: "0 12px 0 26px",
          ...useIn(ASK_TIMES.question + 10),
        }}
      >
        <span style={{ fontSize: 32, fontWeight: 700, color: answer ? C.ink : "rgba(15,23,42,0.3)", flex: 1 }}>
          {answer || "Answer the agent's questions…"}
          <Caret on={!sent && blinkOn(f, ASK_TIMES.typeFrom - 6, ASK_TIMES.send)} />
        </span>
        <div
          style={{
            width: ASK_BOX.button,
            height: 68,
            borderRadius: 12,
            background: C.ink,
            color: C.white,
            fontSize: 26,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${pressScale(f, ASK_TIMES.send)})`,
          }}
        >
          Send answer
        </div>
      </div>
      <div style={{ position: "absolute", left: 40, top: ASK_BOX.top + ASK_BOX.h + 22, display: "flex", alignItems: "center", gap: 12, fontSize: 25, fontWeight: 800, color: "#0F7A3A", ...useIn(ASK_TIMES.send + 3, 14) }}>
        <div style={{ width: 32, height: 32, borderRadius: 16, background: AD_GREEN, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckIcon size={20} />
        </div>
        Answer sent — the agent is back on it.
      </div>
    </div>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { useObjectRects } from "../../core/stage";
import { MuseBubble, MuseComposer, MuseDay, MuseFloat, MuseFrame, MuseTopbar } from "../../kit/muse-ui";
import { MESSAGES } from "./messages";

const GROUND = "#FDFDFD";
const COL_ID = "mu.col";
const VIEW_H = 1080 - 98 - 16;
const TOP_PAD = 120;
const FIRST_AT = 36;
const GAPS = [21, 20, 20, 19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 16, 15, 15, 15, 15, 15, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14];

export const MUSE_CHATLOG_TOTAL = FIRST_AT + GAPS.reduce((a, b) => a + b, 0) + 70;

const marks = (() => {
  const out: number[] = [];
  let t = FIRST_AT;
  for (const g of GAPS) {
    out.push(t);
    t += g;
  }
  return out;
})();

const Scroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const rects = useObjectRects([COL_ID]);
  const colH = rects[COL_ID]?.height ?? 6000;
  const maxOff = Math.max(0, colH + TOP_PAD - VIEW_H);
  const springs = marks.map((m, i) => ({ m, i }));
  let done = 0;
  for (const s of springs) done += interpolate(frame, [s.m, s.m + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: (t) => 1 - Math.pow(1 - t, 3) });
  const off = (maxOff * done) / springs.length;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: TOP_PAD, display: "flex", justifyContent: "center", transform: `translateY(${-off}px)` }}>
      <div className="mu-col" data-click={COL_ID}>{children}</div>
    </div>
  );
};

export const MuseChatlog: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND }} data-camera-stage="">
    <MuseFrame>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", bottom: 98 }}>
        <Scroll>
          <MuseBubble>Good morning. What can I take off your plate?</MuseBubble>
          <MuseDay text="6:34 PM" />
          {MESSAGES.map((m, i) => (
            <React.Fragment key={i}>
              <MuseBubble user={m.user}>{m.body}</MuseBubble>
              {m.react ? <span className="mu-react">{m.react}</span> : null}
            </React.Fragment>
          ))}
        </Scroll>
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 130, background: `linear-gradient(${GROUND} 55%, rgba(253,253,253,0))`, pointerEvents: "none" }} />
      <MuseTopbar />
      <MuseFloat />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
        <MuseComposer />
      </div>
    </MuseFrame>
  </AbsoluteFill>
);

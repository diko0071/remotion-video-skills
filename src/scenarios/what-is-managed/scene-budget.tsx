import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { blink, press, ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { Pop } from "../../kit/pop";
import { breakdownLine, COPY, FEE_STEPS, GOALS } from "./data";
import { K_BUDGET as K } from "./timings";
import { SELECT, SelectList, SelectTrigger } from "./ui/select";
import { StepTitle, Zoom, zoneTop, zoomPoint } from "../../kit/explainer";
import { FONT, P, PrimaryButton } from "../../kit/product-ui";

const S = 2.1;
const CARD_W = 560;
const PAD = 24;
const Y = { label: 24, big: 44, breakdown: 110, goalLabel: 150, trigger: 176, button: 236, h: 296 } as const;
const INNER_W = CARD_W - PAD * 2;
const TOP = zoneTop(Y.h * S);
const OPEN_AT = K.goal - 4;
const PICK_AT = K.sales;
const CREATE_AT = K.create;
const LIST_TOP = Y.trigger + SELECT.h + 4;
const LIST_GOALS = GOALS.slice(0, 3);
const LIST_H = SELECT.pad * 2 + SELECT.itemH * LIST_GOALS.length + 2;
const FIELD_AT = K.budget - 8;

const pt = (x: number, y: number) => zoomPoint(CARD_W, S, TOP, x, y);

export const BudgetScene: React.FC = () => {
  const f = useCurrentFrame();
  const digits = f >= K.budget + 2 ? "50" : f >= K.budget - 2 ? "5" : "";
  const valid = digits.length > 0;
  const caret = f >= FIELD_AT && f < K.budget + 10 && blink(f - FIELD_AT, 8);
  const breakdown = ramp(f, K.budget + 6, K.budget + 14);
  const listIn = useSpringAt(OPEN_AT, SPRINGS.card, 12);
  const listOut = ramp(f, PICK_AT + 4, PICK_AT + 9);
  const listOpen = listIn * (1 - listOut);
  const chosen = f >= PICK_AT;
  const hover = f >= PICK_AT - 8 ? 0 : -1;
  const focus = ramp(f, OPEN_AT, OPEN_AT + 4) * (1 - ramp(f, PICK_AT + 8, PICK_AT + 16));
  const field = pt(PAD + 80, Y.big + 30);
  const trigger = pt(PAD + 190, Y.trigger + SELECT.h / 2);
  const item = pt(PAD + 120, LIST_TOP + SELECT.pad + SELECT.itemH / 2);
  const button = pt(PAD + INNER_W / 2 + 30, Y.button + 18);
  const s0 = FEE_STEPS[0];
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={2} text="Set a budget and a goal" at={-8} />
        <Zoom w={CARD_W} s={S} top={TOP}>
          <Pop at={-6} from={0.9} rise={10}>
            <div
              className="pg-card"
              style={{ position: "relative", width: CARD_W, height: Y.h, boxSizing: "border-box", fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}
            >
              <div style={{ position: "absolute", left: PAD, top: Y.label, fontSize: 12, color: P.mutedFg }}>{COPY.budgetLabel}</div>
              <div style={{ position: "absolute", left: PAD, top: Y.big, display: "flex", alignItems: "baseline", gap: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.025em", color: valid ? P.fg : "rgba(122,114,106,0.4)" }}>$</span>
                <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.025em", color: P.fg, fontVariantNumeric: "tabular-nums", display: "inline-flex", alignItems: "center" }}>
                  {digits}
                  <span style={{ display: "inline-block", width: 3, height: 44, marginLeft: 2, background: P.fg, opacity: caret ? 1 : 0, alignSelf: "center" }} />
                </span>
                <span style={{ marginLeft: 4, fontSize: 18, fontWeight: 600, color: P.mutedFg }}>/ {COPY.daily}</span>
              </div>
              <div style={{ position: "absolute", left: PAD, top: Y.breakdown, fontSize: 14, fontWeight: 500, color: "rgba(15,23,42,0.8)", opacity: breakdown }}>
                {breakdownLine(s0.spend, s0.rate, s0.fee)}
              </div>
              <div style={{ position: "absolute", left: PAD, top: Y.goalLabel, fontSize: 14, fontWeight: 500, color: P.fg }}>{COPY.goalLabel}</div>
              <div style={{ position: "absolute", left: PAD, top: Y.trigger, width: INNER_W }}>
                <SelectTrigger value={chosen ? GOALS[0].friendly : null} meta={GOALS[0].event} placeholder="Select the conversion event to optimize for" focus={focus} />
              </div>
              <div style={{ position: "absolute", left: PAD, top: Y.button, width: INNER_W }}>
                <PrimaryButton label={COPY.submit} press={press(f, CREATE_AT, 0.96)} />
              </div>
              <div
                style={{
                  position: "absolute",
                  left: PAD,
                  top: LIST_TOP,
                  width: INNER_W,
                  zIndex: 5,
                  height: LIST_H * listOpen,
                  overflow: "hidden",
                  opacity: listOpen > 0.02 ? 1 : 0,
                }}
              >
                <SelectList items={LIST_GOALS} hover={hover} chosen={chosen ? 0 : null} />
              </div>
            </div>
          </Pop>
        </Zoom>
        <Cursor
          appearAt={FIELD_AT - 16}
          scale={1.7}
          stops={[
            { x: 1560, y: 1000, at: FIELD_AT - 16 },
            { x: field.x, y: field.y, at: FIELD_AT, click: true },
            { x: trigger.x, y: trigger.y, at: OPEN_AT, click: true },
            { x: item.x, y: item.y, at: PICK_AT, click: true },
            { x: button.x, y: button.y, at: CREATE_AT, click: true },
          ]}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

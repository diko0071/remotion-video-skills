import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ArrowUp, Check, Circle, Mic, Plus } from "lucide-react";
import { Spinner } from "./icons";
import { clickDip, Pointer, pointerPath } from "./pointer";
import { BAR, BAR_DIVIDER_X, BAR_LEFT, BAR_WIDTH, barSegments, COMPOSER, PROMPT, PROMPT_TRACK } from "./story";
import { C, R } from "./theme";
import { clamp01, glide, lerp, pop, ramp, T } from "./timeline";

const TYPE_START = [T.line1, T.line2, T.line3];
const TYPE_SPEED = [1.1, 1.15, 1.2];
const STEP_WINDOWS: Array<[number, number]> = [
  [T.morph + 12, T.findDone],
  [T.fan, T.makeDone],
  [T.panel, T.live],
];
const SEND = {
  x: COMPOSER.left + COMPOSER.width - COMPOSER.padX + 8 - COMPOSER.button / 2,
  y: COMPOSER.top + COMPOSER.height - 34 - COMPOSER.button / 2,
};

const typedCount = (f: number, i: number) =>
  Math.min(PROMPT[i].length, Math.max(0, Math.floor((f - TYPE_START[i]) * TYPE_SPEED[i])));

const typingLine = (f: number) => {
  for (let i = PROMPT.length - 1; i >= 0; i--) if (f >= TYPE_START[i]) return i;
  return 0;
};

const TodoIcon: React.FC<{ i: number; f: number }> = ({ i, f }) => {
  const [start, done] = STEP_WINDOWS[i];
  if (f >= done) {
    const p = pop(f, done, 10, 240);
    return (
      <div style={{ transform: `scale(${lerp(0.3, 1, p)})`, display: "flex" }}>
        <Check size={BAR.iconSize} color={C.brand} strokeWidth={2.4} />
      </div>
    );
  }
  if (f >= start) return <Spinner size={BAR.iconSize} frame={f} color={C.brand} strokeWidth={2.4} />;
  return <Circle size={BAR.iconSize} color={C.mutedFg} strokeWidth={2} style={{ opacity: 0.6 }} />;
};

const composerShadow = (m: number) =>
  [
    `0 0 0 1.5px rgba(15,23,42,${lerp(0.14, 0.1, m)})`,
    `0 ${lerp(24, 14, m)}px ${lerp(70, 40, m)}px rgba(20,40,80,${lerp(0.28, 0.2, m)})`,
  ].join(", ");

export const Composer: React.FC = () => {
  const f = useCurrentFrame();
  const cardIn = pop(f, T.composerIn, 16, 140);
  const mx = glide(f, T.morph, 240);
  const my = glide(f, T.morph + 6, 130);
  const m = (mx + my) / 2;
  const exit = ramp(f, T.push, 8);
  const chrome = 1 - ramp(f, T.morph - 2, 8);
  const head = ramp(f, T.morph + 8, 8);

  const left = lerp(COMPOSER.left, BAR_LEFT, mx);
  const top = lerp(COMPOSER.top, BAR.top, my);
  const width = lerp(COMPOSER.width, BAR_WIDTH, mx);
  const height = lerp(COMPOSER.height, BAR.height, my);
  const radius = lerp(COMPOSER.radius, R.card + 4, my);

  const press = clickDip(f, T.send);
  const glow = ramp(f, T.send, 14);
  const caretLine = typingLine(f);
  const isTyping = f < TYPE_START[caretLine] + PROMPT[caretLine].length / TYPE_SPEED[caretLine] + 2;
  const caretOn = f < T.send && (isTyping || Math.floor(f / 8) % 2 === 0);
  const cursor = pointerPath(f, { x: 1640, y: 1000 }, { x: SEND.x + 4, y: SEND.y + 6 }, T.cursorIn);
  const cursorOpacity = ramp(f, T.cursorIn, 6) * (1 - ramp(f, T.send + 8, 8));
  const doneCount = STEP_WINDOWS.filter(([, done]) => f >= done).length;

  return (
    <AbsoluteFill
      style={{
        opacity: clamp01(cardIn * 2) * (1 - exit),
        transform: `translateY(${(1 - cardIn) * 40 - exit * 60}px) scale(${lerp(0.93, 1, cardIn)})`,
        transformOrigin: "960px 555px",
      }}
    >
      <div
        style={{
          position: "absolute",
          left,
          top,
          width,
          height,
          borderRadius: radius,
          background: C.paper,
          boxShadow: composerShadow(m),
        }}
      >
        <div
          style={{
            position: "absolute",
            left: COMPOSER.padX - 16,
            right: COMPOSER.padX - 8,
            bottom: 34,
            height: COMPOSER.button,
            display: "flex",
            alignItems: "center",
            gap: 8,
            opacity: chrome,
          }}
        >
          <div style={{ width: COMPOSER.button, height: COMPOSER.button, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Plus size={28} color={C.mutedFg} strokeWidth={2} />
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ width: COMPOSER.button, height: COMPOSER.button, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Mic size={28} color={C.mutedFg} strokeWidth={2} />
          </div>
          <div
            style={{
              width: COMPOSER.button,
              height: COMPOSER.button,
              borderRadius: R.lg * 1.2,
              background: C.ink,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${1 - 0.12 * press})`,
              boxShadow: `0 2px 4px rgba(15,23,42,0.10), 0 0 0 ${10 * glow}px rgba(15,23,42,${0.22 * (1 - glow)})`,
            }}
          >
            <ArrowUp size={28} color={C.paper} strokeWidth={2.3} />
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: COMPOSER.left + COMPOSER.padX,
          top: COMPOSER.top + COMPOSER.padTop,
          fontSize: COMPOSER.fontSize,
          fontWeight: 400,
          lineHeight: 1,
          color: C.placeholder,
          letterSpacing: `${PROMPT_TRACK}em`,
          opacity: (1 - ramp(f, T.line1 - 2, 3)) * clamp01(cardIn * 2),
        }}
      >
        Describe a task for the agent…
      </div>

      <div
        style={{
          position: "absolute",
          left: BAR_LEFT + BAR.padX,
          top: BAR.top + (BAR.height - BAR.headSize * 1.2) / 2,
          display: "flex",
          alignItems: "baseline",
          gap: BAR.headGap,
          opacity: head,
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: BAR.headSize, lineHeight: 1.2, fontWeight: 600, color: C.ink }}>Tasks</span>
        <span
          style={{
            width: BAR.countW,
            fontSize: BAR.countSize,
            fontWeight: 500,
            color: C.mutedFg,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {doneCount}/{PROMPT.length}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          left: BAR_DIVIDER_X,
          top: BAR.top + BAR.height / 2 - 16,
          width: 1.5,
          height: 32,
          background: C.border,
          opacity: head,
        }}
      />

      {PROMPT.map((text, i) => {
        const x0 = COMPOSER.left + COMPOSER.padX;
        const y0 = COMPOSER.top + COMPOSER.padTop + i * COMPOSER.lineStep;
        const x1 = barSegments[i].textLeft;
        const y1 = BAR.top + BAR.height / 2 - BAR.fontSize / 2;
        const scale = lerp(1, BAR.fontSize / COMPOSER.fontSize, m);
        const [start, done] = STEP_WINDOWS[i];
        const active = f >= start && f < done;
        const color = f < T.morph + 4 || active ? C.ink : C.mutedFg;
        const strike = ramp(f, done, 8);
        const shown = f >= T.send ? text : text.slice(0, typedCount(f, i));
        return (
          <div
            key={text}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${lerp(x0, x1, mx)}px, ${lerp(y0, y1, my)}px) scale(${scale})`,
              transformOrigin: "0 0",
              fontSize: COMPOSER.fontSize,
              fontWeight: 400,
              lineHeight: 1,
              whiteSpace: "nowrap",
              letterSpacing: `${PROMPT_TRACK}em`,
              color,
            }}
          >
            <span style={{ position: "relative" }}>
              {shown}
              {strike > 0 ? (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "54%",
                    height: 3.2,
                    width: `${strike * 100}%`,
                    background: C.mutedFg,
                    borderRadius: 2,
                  }}
                />
              ) : null}
            </span>
            {i === caretLine && caretOn ? (
              <span
                style={{
                  display: "inline-block",
                  width: 3,
                  height: COMPOSER.fontSize * 1.05,
                  marginLeft: 3,
                  verticalAlign: "top",
                  background: C.ink,
                }}
              />
            ) : null}
          </div>
        );
      })}

      {barSegments.map((seg, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: seg.iconLeft,
            top: BAR.top + (BAR.height - BAR.iconSize) / 2,
            height: BAR.iconSize,
            display: "flex",
            opacity: ramp(f, T.morph + 10, 8),
          }}
        >
          <TodoIcon i={i} f={f} />
        </div>
      ))}

      <Pointer x={cursor.x} y={cursor.y} dip={press} opacity={cursorOpacity} />
    </AbsoluteFill>
  );
};

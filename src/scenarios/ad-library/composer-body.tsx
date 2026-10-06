import React from "react";
import { Img } from "remotion";
import { ArrowUp, ChevronDown, PlusIcon } from "../../kit/claude-ui/icons";
import { useLayout } from "./layout";
import { PROMPT_HEAD, PROMPT_TAIL, SLOT_BRANDS } from "./story";
import { C } from "../../kit/launch";
import { ACCENT_RGB, asset } from "./theme";
import { clamp01, lerp, pop, ramp, T } from "./timeline";

const FAV = 1.05;
const FAV_GAP = 0.3;
const SLOT_PAD = 0.12;
const TYPE_SPEED = 1.4;

const slotWidthEm = (brand: (typeof SLOT_BRANDS)[number]) => SLOT_PAD * 2 + FAV + FAV_GAP + brand.em;

const slotState = (f: number) => {
  const n = SLOT_BRANDS.length;
  const k = Math.max(0, Math.min(n - 1, Math.floor((f - T.slotStart) / T.slotStep)));
  const local = f - T.slotStart - k * T.slotStep;
  const t = k === 0 ? 1 : 1 - Math.pow(1 - clamp01(local / 4), 3);
  return { pos: k === 0 ? 0 : k - 1 + t, k };
};

const Slot: React.FC<{ f: number }> = ({ f }) => {
  const { pos } = slotState(f);
  const i0 = Math.floor(pos);
  const i1 = Math.min(SLOT_BRANDS.length - 1, i0 + 1);
  const width = lerp(slotWidthEm(SLOT_BRANDS[i0]), slotWidthEm(SLOT_BRANDS[i1]), pos - i0);
  const appear = pop(f, T.slotStart, 14, 240);
  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        width: `${width * clamp01(appear * 1.3)}em`,
        height: "1.5em",
        verticalAlign: "-0.42em",
        overflow: "hidden",
        background: `rgba(${ACCENT_RGB},0.34)`,
        borderRadius: "0.18em",
      }}
    >
      <span style={{ position: "absolute", left: 0, top: 0, transform: `translateY(${-pos * 1.5}em)` }}>
        {SLOT_BRANDS.map((b) => (
          <span key={b.name} style={{ display: "flex", alignItems: "center", gap: `${FAV_GAP}em`, height: "1.5em", paddingLeft: `${SLOT_PAD}em`, whiteSpace: "nowrap" }}>
            <Img src={asset(b.fav)} style={{ width: `${FAV}em`, height: `${FAV}em`, borderRadius: "0.2em", objectFit: "cover" }} />
            {b.name}
          </span>
        ))}
      </span>
    </span>
  );
};

const Caret: React.FC<{ on: boolean }> = ({ on }) => (
  <span
    style={{
      display: "inline-block",
      width: "0.1em",
      height: "1.15em",
      marginLeft: "0.05em",
      verticalAlign: "-0.22em",
      background: C.ink,
      opacity: on ? 1 : 0,
    }}
  />
);

const PromptText: React.FC<{ f: number }> = ({ f }) => {
  const head = PROMPT_HEAD.slice(0, Math.max(0, Math.floor((f - T.typeStart) * TYPE_SPEED)));
  const tail = PROMPT_TAIL.slice(0, Math.max(0, Math.floor((f - T.typeRest) * TYPE_SPEED)));
  const caretOn = f < T.typeRest + PROMPT_TAIL.length / TYPE_SPEED + 2 || Math.floor(f / 8) % 2 === 0;
  return (
    <span style={{ fontWeight: 500 }}>
      {head}
      {f >= T.slotStart ? <Slot f={f} /> : null}
      {tail}
      <Caret on={caretOn} />
    </span>
  );
};

export const ComposerBody: React.FC<{ f: number }> = ({ f }) => {
  const l = useLayout();
  const press = ramp(f, T.send - 3, 3) - ramp(f, T.send, 6);
  const glow = ramp(f, T.send - 10, 8) * (1 - ramp(f, T.send + 2, 8));
  return (
    <>
      <div className="cl-composer-input" style={{ fontSize: l.prompt.size, minHeight: (l.prompt.h - 66) }}>
        {f >= T.typeStart ? <PromptText f={f} /> : <div className="ph">How can I help you today?</div>}
      </div>
      <div className="cl-composer-bar">
        <span className="cl-plus">
          <PlusIcon />
        </span>
        <span className="cl-segment">
          <span className="seg on">Chat</span>
          <span className="seg">Cowork</span>
        </span>
        <span style={{ flex: 1 }} />
        <span className="cl-model">
          Opus 5<span className="variant">High</span>
          <span style={{ color: "var(--cl-text-3)", display: "inline-flex", marginLeft: 2 }}>
            <ChevronDown />
          </span>
        </span>
        <span
          className="cl-send"
          style={{
            transform: `scale(${1 - 0.14 * press})`,
            boxShadow: `0 0 ${18 * glow}px rgba(217,119,87,${0.7 * glow})`,
          }}
        >
          <ArrowUp />
        </span>
      </div>
    </>
  );
};

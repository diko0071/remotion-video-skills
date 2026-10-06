import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Sparkle } from "lucide-react";
import { thumbPos } from "./generated-ads";
import { FacebookIcon, InstagramLogo, MetaLogo, RyzeMark, Spinner } from "./icons";
import { APPROVAL, CAMPAIGN_FIELDS, CREATIVES, PANEL, THUMB } from "./story";
import { C, R, S, SHADOW } from "./theme";
import { clamp01, lerp, pop, ramp, T } from "./timeline";

const COL = { left: PANEL.left + 44, width: 460 };
const FIELD_TOP = PANEL.top + PANEL.header + 34;
const FIELD_PITCH = 104;
const INPUT_H = 36 * S;
const BTN_H = 28 * S;

export const approveButtonCenter = () => {
  const right = APPROVAL.cx + APPROVAL.width / 2 - 16 * S;
  return { x: right - 64, y: APPROVAL.top + APPROVAL.height / 2 };
};

const fieldAt = (i: number) => T.fields + i * 8;
const toggleAt = (k: number) => T.toggles + k * 5;

const StatusPill: React.FC<{ f: number }> = ({ f }) => {
  const live = f >= T.live;
  const publishing = f >= T.approve + 2 && !live;
  const dot = live ? C.emerald : publishing ? C.sky : C.slate;
  const livePop = live ? pop(f, T.live, 11, 200) : 1;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        minWidth: 86 * S,
        padding: `${2 * S}px ${8 * S}px`,
        borderRadius: 2 * S,
        background: C.muted,
        color: C.ink,
        fontSize: 11 * S,
        fontWeight: 500,
        letterSpacing: "0.025em",
        transform: `scale(${lerp(0.85, 1, livePop)})`,
      }}
    >
      {publishing ? (
        <Spinner size={14} frame={f} color={C.sky} strokeWidth={3} />
      ) : (
        <span style={{ width: 6 * S, height: 6 * S, borderRadius: 10, background: dot }} />
      )}
      {live ? "Active" : publishing ? "Publishing" : "Draft"}
    </span>
  );
};

const FieldValue: React.FC<{ i: number; f: number }> = ({ i, f }) => {
  const field = CAMPAIGN_FIELDS[i];
  const at = fieldAt(i);
  const focus = ramp(f, at, 3) * (1 - ramp(f, at + 12, 10));
  const filled = f >= at;
  let content: React.ReactNode = null;
  if (filled && field.value === "placements") {
    const a = pop(f, at, 12, 200);
    const b = pop(f, at + 3, 12, 200);
    content = (
      <div style={{ display: "flex", gap: 22 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 9, transform: `scale(${a})` }}>
          <FacebookIcon size={24} />
          Facebook
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 9, transform: `scale(${b})` }}>
          <InstagramLogo size={24} />
          Instagram
        </span>
      </div>
    );
  } else if (filled && field.label === "Daily budget") {
    content = `$${Math.round(150 * ramp(f, at, 10))}`;
  } else if (filled) {
    content = field.value.slice(0, Math.ceil((f - at + 1) * 2.4));
  }
  return (
    <div
      style={{
        position: "relative",
        height: INPUT_H,
        borderRadius: R.lg,
        border: `1.5px solid ${focus > 0.02 ? C.ring : C.border}`,
        boxShadow: `0 0 0 ${3 * S * focus}px rgba(166,159,153,0.3)`,
        display: "flex",
        alignItems: "center",
        padding: `0 ${12 * S}px`,
        fontSize: 14 * S,
        fontWeight: 500,
        color: C.ink,
        whiteSpace: "nowrap",
        overflow: "hidden",
        background: C.paper,
      }}
    >
      {content}
      {focus > 0.02 ? (
        <div style={{ position: "absolute", right: 14, top: (INPUT_H - 24) / 2 - 1.5, opacity: focus }}>
          <RyzeMark size={24} />
        </div>
      ) : null}
    </div>
  );
};

const Toggle: React.FC<{ k: number; f: number }> = ({ k, f }) => {
  const on = pop(f, toggleAt(k), 14, 220);
  const checked = f >= toggleAt(k);
  const t = thumbPos(k);
  const w = 32 * S;
  const h = 18.4 * S;
  const knob = 16 * S;
  return (
    <div
      style={{
        position: "absolute",
        left: t.x - THUMB.w / 2,
        top: t.y + THUMB.h / 2 + 12,
        width: THUMB.w,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 12 * S,
        fontWeight: 500,
        color: C.ink,
      }}
    >
      <div style={{ width: w, height: h, borderRadius: h, background: checked ? C.primary : C.border, position: "relative", flexShrink: 0 }}>
        <div
          style={{
            position: "absolute",
            top: (h - knob) / 2,
            left: (h - knob) / 2 + (w - h) * clamp01(on),
            width: knob,
            height: knob,
            borderRadius: knob,
            background: C.paper,
          }}
        />
      </div>
      Ad {k + 1}
      <div style={{ flex: 1 }} />
      {f >= T.live ? (
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.ink }}>
          <span style={{ width: 8, height: 8, borderRadius: 8, background: C.emerald }} />
          Live
        </span>
      ) : null}
    </div>
  );
};

const Button: React.FC<{ variant: "default" | "outline" | "ghost"; children: React.ReactNode; dip?: number }> = ({
  variant,
  children,
  dip = 0,
}) => (
  <span
    style={{
      height: BTN_H,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: `0 ${10 * S}px`,
      borderRadius: R.md,
      border: `1.5px solid ${variant === "outline" ? C.border : "transparent"}`,
      background: variant === "default" ? C.primary : variant === "outline" ? C.cream : "transparent",
      color: variant === "default" ? "#fafafa" : C.ink,
      fontSize: 12.8 * S,
      fontWeight: 500,
      whiteSpace: "nowrap",
      transform: `translateY(${dip * 1.6}px)`,
    }}
  >
    {children}
  </span>
);

const ApprovalPanel: React.FC<{ f: number }> = ({ f }) => {
  const up = ramp(f, T.approvalIn, 11, (x) => 1 - Math.pow(1 - x, 3));
  const away = ramp(f, T.approve + 6, 10, (x) => x * x);
  const travel = 1080 - APPROVAL.top + 20;
  const dip = ramp(f, T.approve - 3, 3) - ramp(f, T.approve, 5);
  if (f < T.approvalIn) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: APPROVAL.cx - APPROVAL.width / 2,
        top: APPROVAL.top,
        width: APPROVAL.width,
        height: APPROVAL.height,
        transform: `translateY(${(1 - up) * travel + away * travel}px)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18 * S,
          background: C.paper,
          boxShadow: "0 0 0 1.5px rgba(15,23,42,0.14), 0 18px 40px rgba(10,20,40,0.35)",
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: `0 ${16 * S}px`,
        }}
      >
        <Sparkle size={16 * S} color={C.brand} strokeWidth={2} />
        <span style={{ fontSize: 13.5 * S, fontWeight: 600, color: C.ink, whiteSpace: "nowrap" }}>Agent wants to run 8 tools</span>
        <div style={{ flex: 1 }} />
        <Button variant="ghost">Review</Button>
        <Button variant="outline">Deny all</Button>
        <Button variant="default" dip={dip}>
          Approve all
        </Button>
      </div>
    </div>
  );
};

export const CampaignPanel: React.FC = () => {
  const f = useCurrentFrame();
  const build = pop(f, T.panel - 4, 16, 150);
  const leave = ramp(f, T.phone - 2, 14, (x) => x * x * x);
  if (f < T.panel || f >= T.phone + 14) return null;
  const shown = clamp01(build * 2);
  return (
    <AbsoluteFill style={{ transform: `translateY(${-leave * 1150}px)` }}>
      <div
        style={{
          position: "absolute",
          left: PANEL.left,
          top: PANEL.top,
          width: PANEL.width,
          height: PANEL.height,
          borderRadius: R.card,
          background: C.paper,
          border: `1.5px solid ${C.border}`,
          boxShadow: SHADOW.card,
          opacity: shown,
          transform: `scale(${lerp(0.96, 1, build)})`,
        }}
      >
        <div style={{ position: "absolute", left: 44, right: 36, top: 0, height: PANEL.header, display: "flex", alignItems: "center", gap: 16 }}>
          <MetaLogo width={46} />
          <div style={{ fontSize: 16 * S, fontWeight: 600, color: C.ink }}>New campaign</div>
          <div style={{ fontSize: 14 * S, fontWeight: 500, color: C.mutedFg }}>Meta Ads · Fishwife</div>
          <div style={{ flex: 1 }} />
          <StatusPill f={f} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: PANEL.header, height: 1.5, background: C.border }} />
        <div style={{ position: "absolute", left: COL.width + 44 + 36, top: PANEL.header, bottom: 0, width: 1.5, background: C.border }} />
        <div
          style={{
            position: "absolute",
            left: THUMB.colX[0] - THUMB.w / 2 - PANEL.left,
            top: PANEL.header + 26,
            display: "flex",
            alignItems: "baseline",
            gap: 10,
          }}
        >
          <span style={{ fontSize: 13 * S, fontWeight: 600, color: C.ink }}>Ads</span>
          <span style={{ fontSize: 11 * S, fontWeight: 500, color: C.mutedFg }}>
            {CREATIVES.length} new
          </span>
        </div>
      </div>
      <div style={{ opacity: shown }}>
        {CAMPAIGN_FIELDS.map((field, i) => (
          <div key={field.label} style={{ position: "absolute", left: COL.left, top: FIELD_TOP + i * FIELD_PITCH, width: COL.width }}>
            <div style={{ fontSize: 11 * S, fontWeight: 500, color: C.label, marginBottom: 8 }}>{field.label}</div>
            <FieldValue i={i} f={f} />
          </div>
        ))}
        {CREATIVES.map((_, k) => (
          <Toggle key={k} k={k} f={f} />
        ))}
      </div>
      <ApprovalPanel f={f} />
    </AbsoluteFill>
  );
};

import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { ScoreRing } from "../../kit/score-ring";
import { CheckIcon, CloseIcon } from "../../kit/ryze-ui/icons";
import { CARD_STYLE } from "../../kit/promo-blocks";

export type AuditItem = { label: string; ok: boolean };

export const AuditCard: React.FC<{
  score: number;
  color: string;
  items: AuditItem[];
  appearAt: number;
  hideAt?: number;
}> = ({ score, color, items, appearAt, hideAt }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(appearAt, SPRINGS.card);
  const out =
    hideAt !== undefined
      ? interpolate(frame, [hideAt, hideAt + 12], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 1;
  if (frame < appearAt || (hideAt !== undefined && frame > hideAt + 14)) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 40,
        ...CARD_STYLE,
        padding: "34px 40px",
        opacity: Math.min(1, p * 1.3) * out,
        transform: `translateY(${interpolate(p, [0, 1], [40, 0]) + interpolate(out, [0, 1], [-14, 0])}px) scale(${interpolate(out, [0, 1], [0.97, 1])})`,
      }}
    >
      <ScoreRing score={score} size={200} appearAt={appearAt + 6} color={color} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((item, i) => (
          <AuditRow key={item.label} item={item} start={appearAt + 20 + i * 9} />
        ))}
      </div>
    </div>
  );
};

const AuditRow: React.FC<{ item: AuditItem; start: number }> = ({ item, start }) => {
  const frame = useCurrentFrame();
  const p = useSpringAt(start, SPRINGS.smooth, 20);
  if (frame < start) return null;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontSize: 20,
        fontWeight: 600,
        color: "#171310",
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [12, 0])}px)`,
      }}
    >
      <span
        style={{
          display: "flex",
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          background: item.ok ? "rgba(5,150,105,0.1)" : "rgba(225,29,72,0.09)",
          color: item.ok ? "#059669" : "#e11d48",
          flexShrink: 0,
        }}
      >
        {item.ok ? <CheckIcon size={16} /> : <CloseIcon size={15} />}
      </span>
      {item.label}
    </div>
  );
};

import React from "react";
import { useCurrentFrame } from "remotion";
import { ramp } from "../../../core/motion";
import { Pop } from "../../../kit/pop";
import { FONT, P } from "../../../kit/product-ui";

const CHIP = { h: 24, top: 4, bottom: 64 } as const;
const SETS = [32, 114, 196] as const;

const Chip: React.FC<{ label: string; w: number; strong?: boolean }> = ({ label, w, strong }) => (
  <span
    style={{
      width: w,
      height: CHIP.h,
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: P.radius,
      border: `1px solid ${P.border}`,
      background: strong ? P.primary : P.card,
      color: strong ? "#fafafa" : P.fg,
      fontFamily: FONT,
      fontSize: 11,
      fontWeight: 600,
    }}
  >
    {label}
  </span>
);

const Ghost: React.FC<{ x: number; y: number; w: number }> = ({ x, y, w }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: CHIP.h, boxSizing: "border-box", borderRadius: P.radius, border: `1.5px dashed ${P.border}`, background: P.muted }} />
);

export const MiniTree: React.FC<{ at: number }> = ({ at }) => {
  const f = useCurrentFrame();
  const draw = ramp(f, at + 3, at + 11);
  return (
    <div style={{ position: "relative", width: 228, height: 96 }}>
      <Ghost x={114 - 48} y={CHIP.top} w={96} />
      {SETS.map((x) => (
        <Ghost key={x} x={x - 32} y={CHIP.bottom} w={64} />
      ))}
      <svg width={228} height={96} style={{ position: "absolute", inset: 0 }}>
        {SETS.map((x) => (
          <path
            key={x}
            d={`M114 ${CHIP.top + CHIP.h} V46 H${x} V${CHIP.bottom}`}
            fill="none"
            stroke={P.border}
            strokeWidth={1.5}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - draw}
          />
        ))}
      </svg>
      <div style={{ position: "absolute", left: 114 - 48, top: CHIP.top }}>
        <Pop at={at} from={0.7} rise={6}>
          <Chip label="Campaign" w={96} strong />
        </Pop>
      </div>
      {SETS.map((x, i) => (
        <div key={x} style={{ position: "absolute", left: x - 32, top: CHIP.bottom }}>
          <Pop at={at + 7 + i * 3} from={0.7} rise={6}>
            <Chip label="Ad set" w={64} />
          </Pop>
        </div>
      ))}
    </div>
  );
};

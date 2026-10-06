import React from "react";
import { interpolateColors, useCurrentFrame } from "remotion";
import { ramp } from "../../../core/motion";
import { Pop } from "../../../kit/pop";
import { FONT, P } from "../../../kit/product-ui";
import { ARTICLES, PICKED_KEYWORDS } from "../data";

export const ContentBody: React.FC<{ at: number; kdAt: number }> = ({ at, kdAt }) => {
  const f = useCurrentFrame();
  const kd = ramp(f, kdAt, kdAt + 8);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, fontFamily: FONT }}>
      {ARTICLES.slice(0, 3).map((a, i) => {
        const k = PICKED_KEYWORDS[i];
        return (
          <Pop key={a.url} at={at + i * 4} from={0.92} rise={10}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: P.fg, lineHeight: "18px" }}>{a.title}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, color: P.mutedFg }}>
                {k.text}
                <span
                  style={{
                    padding: "1px 6px",
                    borderRadius: 2,
                    fontWeight: 600,
                    background: interpolateColors(kd, [0, 1], [P.muted, P.emeraldSoft]),
                    color: interpolateColors(kd, [0, 1], [P.mutedFg, "#047857"]),
                  }}
                >
                  KD {k.difficulty}
                </span>
              </span>
            </div>
          </Pop>
        );
      })}
    </div>
  );
};

import React from "react";
import { Img } from "remotion";
import { Pop } from "../../../kit/pop";
import { BUILD_ROWS, COPY } from "../data";
import { ad } from "../theme";
import { GeneratingStrip } from "../ui/generating-strip";
import { DoneIcon, FONT, P } from "../../../kit/product-ui";

export const BUILD_BODY = { rowY: [62, 94, 126], thumbsY: 154 } as const;

export type BuildRow = { start: number; done: number };

export const BuildBody: React.FC<{ rows: readonly BuildRow[]; thumbsAt: number; inner: number }> = ({ rows, thumbsAt, inner }) => (
  <div style={{ position: "relative", width: inner }}>
    <GeneratingStrip label={COPY.settingUp} />
    {rows.map((r, i) => (
      <div key={BUILD_ROWS[i]} style={{ position: "absolute", left: 0, top: BUILD_BODY.rowY[i] }}>
        <Pop at={r.start} from={0.9} rise={8}>
          <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: FONT, fontSize: 14, fontWeight: 500, color: P.fg, lineHeight: "20px" }}>
            <DoneIcon start={r.start} done={r.done} size={16} />
            {BUILD_ROWS[i]}
          </span>
        </Pop>
      </div>
    ))}
    <div style={{ position: "absolute", left: 26, top: BUILD_BODY.thumbsY, display: "flex", gap: 8 }}>
      {[0, 1, 2, 3, 4, 5].map((n) => (
        <Pop key={n} at={thumbsAt + n * 2} from={0.6} rise={10}>
          <Img src={ad(n)} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: P.radius, boxShadow: "0 0 0 1px rgba(15,23,42,0.08)" }} />
        </Pop>
      ))}
      <Pop at={thumbsAt + 13} from={0.8} rise={6}>
        <span style={{ width: 64, height: 64, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: P.radius, background: P.muted, fontFamily: FONT, fontSize: 14, fontWeight: 600, color: P.mutedFg }}>+12</span>
      </Pop>
    </div>
  </div>
);

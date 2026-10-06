import React from "react";
import { Img } from "remotion";
import { Pop } from "../../../kit/pop";
import { ad } from "../theme";
import { P } from "../../../kit/product-ui";

export const MiniCreatives: React.FC<{ at: number }> = ({ at }) => (
  <div style={{ display: "flex", gap: 12, height: 96, alignItems: "center" }}>
    {[0, 1, 2].map((i) => (
      <div key={i} style={{ position: "relative", width: 68, height: 68, borderRadius: P.radius, border: `1.5px dashed ${P.border}`, boxSizing: "border-box", background: P.muted }}>
        <div style={{ position: "absolute", inset: -1.5 }}>
          <Pop at={at + i * 4} from={0.6} rise={10}>
            <Img src={ad(i)} style={{ width: 68, height: 68, objectFit: "cover", borderRadius: P.radius, boxShadow: "0 0 0 1px rgba(15,23,42,0.08)" }} />
          </Pop>
        </div>
      </div>
    ))}
  </div>
);

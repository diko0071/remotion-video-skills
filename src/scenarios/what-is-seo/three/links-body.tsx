import React from "react";
import { Pop } from "../../../kit/pop";
import { FONT, P } from "../../../kit/product-ui";
import { BACKLINKS } from "../data";

export const LinksBody: React.FC<{ at: number }> = ({ at }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 14, fontFamily: FONT }}>
    {BACKLINKS.map((b, i) => (
      <Pop key={b.site} at={at + i * 4} from={0.92} rise={10}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, color: P.fg, lineHeight: "18px" }}>
            {b.site}
            <span style={{ padding: "1px 6px", borderRadius: 2, background: P.muted, color: P.mutedFg, fontSize: 11, fontWeight: 600 }}>DR {b.dr}</span>
          </span>
          <span style={{ fontSize: 11, color: P.mutedFg }}>Links to your site</span>
        </div>
      </Pop>
    ))}
  </div>
);

import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { StepTitle, Zoom, zoneTop, zoomPoint } from "../../kit/explainer";
import { Cursor } from "../../kit/cursor";
import { Pop } from "../../kit/pop";
import { P } from "../../kit/product-ui";
import { IntegrationCard } from "../../kit/ryze-ui/pages/integrations";
import { INTEGRATIONS } from "./data";
import { K_CONNECT as K } from "./timings";

const S = 2.0;
const CARD_W = 384;
const CARD_H = 148;
const GAP = 24;
const ROW_W = CARD_W * 2 + GAP;
const TOP = zoneTop(CARD_H * S);
const BUTTON = { x: CARD_W - 20 - 40, y: CARD_H - 20 - 14 } as const;
const CLICK_AT = [K.website, K.console] as const;

const button = (i: number) => zoomPoint(ROW_W, S, TOP, i * (CARD_W + GAP) + BUTTON.x, BUTTON.y);

export const ConnectScene: React.FC = () => {
  const f = useCurrentFrame();
  const a = button(0);
  const b = button(1);
  const fade = 1 - ramp(f, CLICK_AT[1] + 10, CLICK_AT[1] + 18);
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={1} text="Connect your site" at={-8} />
        <Zoom w={ROW_W} s={S} top={TOP}>
          <div style={{ display: "flex", gap: GAP }}>
            {INTEGRATIONS.map((item, i) => (
              <Pop key={item.name} at={-6 + i * 3} from={0.9} rise={12}>
                <div style={{ width: CARD_W, height: CARD_H }}>
                  <IntegrationCard item={{ ...item, state: f >= CLICK_AT[i] + 2 ? "connected" : "none" }} style={{ height: CARD_H, boxSizing: "border-box", justifyContent: "space-between" }} />
                </div>
              </Pop>
            ))}
          </div>
        </Zoom>
        <div style={{ position: "absolute", inset: 0, opacity: fade }}>
          <Cursor
            appearAt={0}
            scale={1.7}
            stops={[
              { x: 1500, y: 960, at: 0 },
              { x: a.x, y: a.y, at: CLICK_AT[0], click: true },
              { x: b.x, y: b.y, at: CLICK_AT[1], click: true },
              { x: b.x + 120, y: b.y + 120, at: CLICK_AT[1] + 20 },
            ]}
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

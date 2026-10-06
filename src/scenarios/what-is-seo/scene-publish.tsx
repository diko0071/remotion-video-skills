import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P } from "../../kit/product-ui";
import { PublishingModeControl } from "../../kit/ryze-ui/pages/seo-settings";
import { CAL, WeekCalendar } from "./articles/week-calendar";
import { Chip } from "./articles/chip";
import { K_PUBLISH as K } from "./timings";

const CAL_S = 1.72;
const CAL_H = 410;
const CARD_AT = (d: number, s: number) => 2 + d * 3 + s * 2;
const PUBLISH_AT = (d: number, s: number) => K.publishes + d * 3 + s;
const SWAP = K.approve - 6;

export const PublishScene: React.FC = () => {
  const f = useCurrentFrame();
  const ninety = useSpringAt(K.ninety - 2, SPRINGS.pop, 16);
  const mode = useSpringAt(SWAP + 2, SPRINGS.pop, 16);
  const chipOut = ramp(f, SWAP - 2, SWAP + 4);
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={7} text="It publishes them on schedule" at={-8} out={SWAP} keepEyebrow />
        {f >= SWAP ? <StepTitle step={7} text="Or you approve each one" at={SWAP + 2} eyebrowAt={-100} /> : null}
        <Zoom w={CAL.w} s={CAL_S} top={zoneTop(CAL_H * CAL_S)}>
          <div style={{ position: "relative" }}>
            <Pop at={-6} from={0.94} rise={10}>
              <WeekCalendar cardAt={CARD_AT} published={(d, s) => f >= PUBLISH_AT(d, s)} />
            </Pop>
            <div style={{ position: "absolute", left: "50%", top: 20, transform: "translateX(-50%)", opacity: 1 - chipOut }}>
              <Chip text="Up to 90 articles / month" on={ninety} />
            </div>
            <div style={{ position: "absolute", left: "50%", top: 12, transform: `translateX(-50%) scale(${0.9 + 0.1 * mode})`, opacity: mode, display: "flex", alignItems: "center", gap: 8, fontFamily: FONT, fontSize: 12, fontWeight: 600, color: P.mutedFg, whiteSpace: "nowrap" }}>
              Publishing mode
              <PublishingModeControl mode={f >= K.approve ? "manual" : "auto"} />
            </div>
          </div>
        </Zoom>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

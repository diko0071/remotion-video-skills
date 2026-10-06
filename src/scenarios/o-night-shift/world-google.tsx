import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { clamp01, ramp } from "../../core/motion";
import { Card, CardHead, LogoTile, SparkCard, TermRow } from "../../kit/ad-objects";
import { ChannelBall } from "./channel-ball";
import { ONote } from "./note";
import { Piece } from "./piece";
import { integration } from "./theme";
import { GOOGLE } from "./timings";

const LOGO = integration("google-ads.webp");
const TERMS = [
  { term: "candle making class", spend: "$118" },
  { term: "free candle samples", spend: "$104" },
  { term: "candlelight dinner near me", spend: "$97" },
  { term: "how to fix candle tunneling", spend: "$91" },
] as const;

const eo = Easing.out(Easing.cubic);

const Term: React.FC<{ term: string; spend: string; at: number; last: boolean }> = ({ term, spend, at, last }) => {
  const f = useCurrentFrame();
  return <TermRow term={term} spend={spend} strike={eo(ramp(f, at, at + 7))} tag={clamp01((f - at - 3) / 5)} last={last} />;
};

export const GoogleWorld: React.FC = () => {
  const f = useCurrentFrame();
  const t = eo(ramp(f, GOOGLE.tweenFrom, GOOGLE.tweenTo));
  const wasted = Math.round(410 * (1 - t));
  const good = t > 0.98;
  return (
    <>
      <ONote time="3:40 AM" text="14 search terms spent $410 with zero sales. Blocked them." eyes={[{ at: -99, eyes: "star" }, { at: GOOGLE.happy, eyes: "happy" }]} />
      <Piece id="ns-g-wasted" at={3} exit={GOOGLE.exit} x={560} y={188} z={2}>
        <SparkCard
          logo={LOGO}
          title="Google Ads"
          sub="Wasted spend"
          value={`$${wasted}/day`}
          good={good}
          chip={good ? "Stopped" : undefined}
          values={good ? [0.5, 0.52, 0.49, 0.55, 0.6, 0.35, 0.12, 0.02, 0] : [0.35, 0.38, 0.42, 0.4, 0.5, 0.58, 0.7, 0.86, 1]}
        />
      </Piece>
      <Piece id="ns-g-logo" at={2} exit={GOOGLE.exit + 1} x={1420} y={224} z={2}>
        <LogoTile src={LOGO} />
      </Piece>
      <Piece id="ns-g-terms" at={6} exit={GOOGLE.exit + 3} x={250} y={598} z={3}>
        <Card w={720} pad="24px 30px 12px">
          <CardHead logo={LOGO} title="Search terms" sub="Last 7 days" />
          <div style={{ marginTop: 8 }}>
            {TERMS.map((r, i) => (
              <Term key={r.term} term={r.term} spend={r.spend} at={GOOGLE.strikes[i]} last={i === TERMS.length - 1} />
            ))}
          </div>
        </Card>
      </Piece>
      <Piece id="ns-g-ball" at={9} exit={GOOGLE.exit + 4} x={1430} y={650} z={12} rise={60}>
        <ChannelBall ball="green" size={250} logo={LOGO} stress="squint" happyAt={GOOGLE.happy} />
      </Piece>
    </>
  );
};

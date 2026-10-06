import React from "react";
import { Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { Eyes, GlyphBallName } from "../../kit/glyph-ball";
import { Card, CardHead, Thumb } from "../../kit/ad-objects";
import { ChannelBall } from "./channel-ball";
import { ONote } from "./note";
import { Piece } from "./piece";
import { integration, store } from "./theme";

const eo = Easing.out(Easing.cubic);

type Flash = { key: string; time: string; text: string; ball: GlyphBallName; logo: string; stress: Eyes; eyeColor?: string };

export const FLASHES: Record<"ga" | "tiktok" | "gsc", Flash> = {
  ga: { key: "ga", time: "5:41 AM", text: "Fixed purchase tracking.", ball: "orange", logo: integration("google-analytics.svg"), stress: "flat" },
  tiktok: { key: "tt", time: "6:12 AM", text: "Shipped 5 new creatives.", ball: "dark", logo: integration("tiktok-ads.svg"), stress: "x", eyeColor: "#FFFFFF" },
  gsc: { key: "gsc", time: "6:55 AM", text: "Rewrote 6 slipping pages.", ball: "sky", logo: integration("google-search-console.svg"), stress: "squint" },
};

const Counter: React.FC<{ to: number; from?: number }> = ({ to, from = 0 }) => {
  const f = useCurrentFrame();
  const t = eo(ramp(f, 2, 14));
  return <>{Math.round(from + (to - from) * t)}</>;
};

export const FlashWorld: React.FC<{ which: keyof typeof FLASHES }> = ({ which }) => {
  const x = FLASHES[which];
  return (
    <>
      <ONote time={x.time} text={x.text} eyes={[{ at: -99, eyes: "happy" }]} size={40} />
      {which === "tiktok" ? (
        ["banner-candles.jpg", "product-1.jpg", "product-3.jpg"].map((img, i) => (
          <Piece key={img} id={`ns-f-t${i}`} at={-3 + i * 2} x={560 + i * 200} y={196 - (i % 2) * 24} z={1}>
            <Thumb src={store(img)} size={180} />
          </Piece>
        ))
      ) : (
        <Piece id={`ns-f-${x.key}-card`} at={-3} x={560} y={206} z={2}>
          <Card w={520} pad="24px 30px">
            <div style={{ display: "flex", alignItems: "center" }}>
              <CardHead logo={x.logo} title={which === "ga" ? "GA4" : "Search Console"} sub={which === "ga" ? "Purchases tracked" : "Pages rewritten"} />
              <span style={{ marginLeft: "auto", fontSize: 50, fontWeight: 800, letterSpacing: "-0.035em", fontVariantNumeric: "tabular-nums" }}>
                <Counter to={which === "ga" ? 58 : 6} />
              </span>
            </div>
          </Card>
        </Piece>
      )}
      <Piece id={`ns-f-${x.key}-ball`} at={-2} x={1430} y={640} z={12} rise={60}>
        <ChannelBall ball={x.ball} size={250} logo={x.logo} stress={x.stress} happyAt={4} eyeColor={x.eyeColor} />
      </Piece>
    </>
  );
};

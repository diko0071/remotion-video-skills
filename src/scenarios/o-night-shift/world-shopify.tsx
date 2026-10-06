import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { C } from "../../kit/launch";
import { AD_GREEN, LogoTile, ProductTile } from "../../kit/ad-objects";
import { ChannelBall } from "./channel-ball";
import { ONote } from "./note";
import { Piece } from "./piece";
import { integration, store } from "./theme";
import { SHOPIFY } from "./timings";

const LOGO = integration("shopify-color.svg");
const PRODUCTS = [
  { name: "Amber Linen", img: "product-1.jpg" },
  { name: "Black Fig", img: "product-2.jpg" },
  { name: "Winter Pine", img: "product-3.jpg" },
  { name: "Fireside Trio", img: "hero-candles.jpg" },
] as const;

const Product: React.FC<{ name: string; img: string; flipAt: number }> = ({ name, img, flipAt }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return <ProductTile name={name} src={store(img)} live={f >= flipAt + 1} pop={springAt(f, fps, flipAt, { damping: 12, stiffness: 210, mass: 0.6 })} />;
};

export const ShopifyWorld: React.FC = () => {
  const f = useCurrentFrame();
  const more = clamp01((f - SHOPIFY.more) / 5);
  return (
    <>
      <ONote time="5:05 AM" text="37 product pages were showing 404. Fixed the links." eyes={[{ at: -99, eyes: "star" }, { at: SHOPIFY.happy, eyes: "happy" }]} />
      <Piece id="ns-s-logo" at={2} exit={SHOPIFY.exit} x={560} y={236} z={2}>
        <LogoTile src={LOGO} />
      </Piece>
      {PRODUCTS.map((p, i) => (
        <Piece key={p.name} id={`ns-s-p${i}`} at={4 + i * 2} exit={SHOPIFY.exit + 1 + i} x={480 + i * 244} y={660} z={3}>
          <Product name={p.name} img={p.img} flipAt={SHOPIFY.flips[i]} />
        </Piece>
      ))}
      <Piece id="ns-s-more" at={SHOPIFY.more} exit={SHOPIFY.exit + 5} x={1464} y={800} z={3}>
        <span style={{ padding: "10px 18px 12px", borderRadius: 12, background: AD_GREEN, color: C.white, fontSize: 24, fontWeight: 800, opacity: more }}>+33 more live</span>
      </Piece>
      <Piece id="ns-s-ball" at={8} exit={SHOPIFY.exit + 3} x={1440} y={150} z={12} rise={60}>
        <ChannelBall ball="purple" size={240} logo={LOGO} stress="o" happyAt={SHOPIFY.happy} lookX={-0.7} />
      </Piece>
    </>
  );
};

import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { clamp01, springAt } from "../../core/motion";
import { C } from "../../kit/launch";
import { AD_RED, Card, CardHead, LogoTile, SparkCard, Thumb, Toggle } from "../../kit/ad-objects";
import { ChannelBall } from "./channel-ball";
import { ONote } from "./note";
import { Piece } from "./piece";
import { integration, store } from "./theme";
import { META } from "./timings";

const LOGO = integration("meta-ads.svg");
const ROWS = [
  { name: "Fall scents · Broad", cpa: "$94" },
  { name: "Gift guide · Interests", cpa: "$88" },
  { name: "Lookalike 3%", cpa: "$81" },
] as const;

const Row: React.FC<{ name: string; cpa: string; offAt: number; last: boolean }> = ({ name, cpa, offAt, last }) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = clamp01(springAt(f, fps, offAt, { damping: 18, stiffness: 200, mass: 0.6 }));
  const knob = clamp01(springAt(f, fps, offAt, { damping: 16, stiffness: 220, mass: 0.6 }));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderBottom: last ? "none" : `1.5px solid ${C.border}` }}>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2, opacity: 1 - 0.5 * p }}>
        <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>{name}</span>
        <span style={{ fontSize: 19, fontWeight: 700, color: AD_RED }}>CPA {cpa}</span>
      </div>
      <span style={{ marginLeft: "auto", fontSize: 19, fontWeight: 700, color: C.mutedFg, opacity: p }}>Paused</span>
      <Toggle p={knob} />
    </div>
  );
};

export const MetaWorld: React.FC = () => {
  const f = useCurrentFrame();
  const [s0, s1, s2] = META.switches;
  const dim = (at: number) => clamp01((f - at) / 6);
  return (
    <>
      <ONote time="1:14 AM" text="Cost per purchase jumped 38% on 3 ad sets. Paused them." popAt={-2} eyes={[{ at: -99, eyes: "star" }, { at: META.happy, eyes: "happy" }]} />
      <Piece id="ns-m-logo" at={2} exit={META.exit} x={560} y={236} z={2}>
        <LogoTile src={LOGO} />
      </Piece>
      <Piece id="ns-m-t1" at={5} exit={META.exit + 2} x={716} y={186} z={1}>
        <Thumb src={store("hero-candles.jpg")} size={176} dim={dim(s0)} />
      </Piece>
      <Piece id="ns-m-t2" at={7} exit={META.exit + 3} x={918} y={226} z={1}>
        <Thumb src={store("product-2.jpg")} size={150} dim={dim(s1)} />
      </Piece>
      <Piece id="ns-m-cpa" at={4} exit={META.exit + 1} x={1204} y={194} z={2}>
        <SparkCard logo={LOGO} title="Meta Ads" sub="Cost per purchase" value="$80" good={false} chip="▲ 38% tonight" values={[0.22, 0.26, 0.21, 0.25, 0.23, 0.3, 0.45, 0.78, 1]} />
      </Piece>
      <Piece id="ns-m-sets" at={8} exit={META.exit + 4} x={250} y={596} z={3}>
        <Card w={660} pad="24px 30px 14px">
          <CardHead logo={LOGO} title="Ad sets" sub="Spending with no sales" />
          <div style={{ marginTop: 10 }}>
            {ROWS.map((r, i) => (
              <Row key={r.name} name={r.name} cpa={r.cpa} offAt={[s0, s1, s2][i]} last={i === ROWS.length - 1} />
            ))}
          </div>
        </Card>
      </Piece>
      <Piece id="ns-m-ball" at={11} exit={META.exit + 5} x={1430} y={650} z={12} rise={60}>
        <ChannelBall ball="blue" size={250} logo={LOGO} stress="x" happyAt={META.happy} />
      </Piece>
    </>
  );
};

import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P } from "../../kit/product-ui";
import { ContentBody } from "./three/content-body";
import { HealthBody } from "./three/health-body";
import { LinksBody } from "./three/links-body";
import { PILLAR, PillarCard } from "./three/pillar-card";
import { K_THREE as K } from "./timings";

const S = 1.85;
const GAP = 28;
const ROW_W = PILLAR.w * 3 + GAP * 2;
const TOP = zoneTop(PILLAR.h * S) + 24;
const SWAP = K.ryze - 4;

export const ThreeScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle text="SEO comes down to three things" at={-8} out={SWAP} />
        {f >= SWAP ? <StepTitle text="Ryze does all three" at={SWAP + 2} /> : null}
        <Zoom w={ROW_W} s={S} top={TOP}>
          <div style={{ position: "relative", display: "flex", gap: GAP }}>
            <Pop at={K.three - 10} from={0.88} rise={14}>
              <PillarCard title="A healthy website" tickAt={K.does}>
                <HealthBody at={K.healthy} />
              </PillarCard>
            </Pop>
            <Pop at={K.three - 6} from={0.88} rise={14}>
              <PillarCard title="Relevant content" tickAt={K.all}>
                <ContentBody at={K.relevant} kdAt={K.relevant + 14} />
              </PillarCard>
            </Pop>
            <Pop at={K.three - 2} from={0.88} rise={14}>
              <PillarCard title="Backlinks" tickAt={K.threeEnd}>
                <LinksBody at={K.backlinks} />
              </PillarCard>
            </Pop>
            <div style={{ position: "absolute", left: ROW_W / 2, top: -46, transform: "translateX(-50%)" }}>
              <Pop at={K.ryze} from={0.5} rise={8}>
                <span className="pg-card" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 12px", fontFamily: FONT, fontSize: 14, fontWeight: 700, color: P.fg, whiteSpace: "nowrap" }}>
                  <Img src={staticFile("ryze-sun.png")} style={{ width: 18, height: 18 }} />
                  Ryze
                </span>
              </Pop>
            </div>
          </div>
        </Zoom>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

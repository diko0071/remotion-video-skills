import React from "react";
import { AbsoluteFill } from "remotion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { Pop } from "../../kit/pop";
import { FONT, P } from "../../kit/product-ui";
import { KINDS } from "./data";
import { K_WRITE as K } from "./timings";
import { ARTICLE, ArticleCard } from "./write/article-card";

const S = 1.9;
const CHIPS_H = 34;
const GAP = 18;
const H = CHIPS_H + GAP + ARTICLE.h;
const TOP = zoneTop(H * S);
const TITLES = [
  { at: 0, title: "7 best soy candles for small apartments", slug: "best-soy-candles-small-apartments" },
  { at: K.kinds[1] - 2, title: "Soy wax vs paraffin: what actually burns cleaner", slug: "soy-vs-paraffin" },
  { at: K.kinds[2] - 2, title: "Best alternatives to paraffin candles", slug: "paraffin-candle-alternatives" },
  { at: K.kinds[3] - 2, title: "How long should a candle burn the first time?", slug: "first-burn-time" },
  { at: K.summary - 14, title: "Soy wax vs paraffin: what actually burns cleaner", slug: "soy-vs-paraffin" },
] as const;

export const WriteScene: React.FC = () => (
  <AbsoluteFill style={{ background: P.bg }}>
    <AbsoluteFill>
      <StepTitle step={5} text="It writes the articles" at={-8} />
      <Zoom w={ARTICLE.w} s={S} top={TOP}>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, height: CHIPS_H }}>
          {KINDS.map((k, i) => (
            <Pop key={k} at={K.kinds[i] - 2} from={0.7} rise={8}>
              <span className="pg-card" style={{ display: "inline-flex", alignItems: "center", padding: "6px 12px", fontFamily: FONT, fontSize: 13, fontWeight: 600, color: P.fg, whiteSpace: "nowrap" }}>{k}</span>
            </Pop>
          ))}
        </div>
        <div style={{ marginTop: GAP }}>
          <Pop at={-4} from={0.94} rise={10}>
            <ArticleCard titles={TITLES} summaryAt={K.summary} faqAt={K.faq} imageAt={K.images} linksAt={K.links} />
          </Pop>
        </div>
      </Zoom>
    </AbsoluteFill>
  </AbsoluteFill>
);

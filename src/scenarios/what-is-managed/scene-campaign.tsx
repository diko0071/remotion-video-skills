import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { Pop } from "../../kit/pop";
import { AD_ROW, AdSetRow } from "./campaign/ad-set-row";
import { BuildBody } from "./campaign/build-body";
import { CampaignCard, CARD } from "./campaign/card";
import { WeekRow } from "./campaign/week-row";
import { AD_SETS } from "./data";
import { ad } from "./theme";
import { K_BUILD as B, K_RUN as R0, SCENE } from "./timings";
import { StepTitle, Zoom, bump, zoneTop } from "../../kit/explainer";
import { FONT, P } from "../../kit/product-ui";

const S = 2.05;
const RUN0 = SCENE.run - SCENE.build;
const R = Object.fromEntries(Object.entries(R0).map(([k, v]) => [k, v + RUN0])) as { [K in keyof typeof R0]: number };
const BORDER = 1;
const INNER = CARD.w - BORDER * 2 - CARD.pad * 2;
const CLIP_TOP = 66;
const H = { base: 136, rows: [36, 32, 32] as const, thumbs: 72, week: 182, sets: 258 } as const;
const CHIP_FLY = 14;

const BUILD_ROWS_AT = [
  { start: B.studies - 2, done: B.history + 6 },
  { start: B.builds - 2, done: B.campaign + 8 },
  { start: B.makes - 4, done: B.ads + 2 },
] as const;
const THUMBS_AT = B.makes - 2;

export const CampaignScene: React.FC = () => {
  const f = useCurrentFrame();
  const r0 = useSpringAt(BUILD_ROWS_AT[0].start, SPRINGS.card, 14);
  const r1 = useSpringAt(BUILD_ROWS_AT[1].start, SPRINGS.card, 14);
  const r2 = useSpringAt(BUILD_ROWS_AT[2].start, SPRINGS.card, 14);
  const rt = useSpringAt(THUMBS_AT, SPRINGS.card, 14);
  const toWeek = useSpringAt(RUN0 - 2, SPRINGS.card, 16);
  const toSets = useSpringAt(R.swap - 2, SPRINGS.card, 16);
  const buildH = H.base + H.rows[0] * r0 + H.rows[1] * r1 + H.rows[2] * r2 + H.thumbs * rt;
  const height = buildH + (H.week - buildH) * toWeek + (H.sets - H.week) * toSets;
  const buildOut = ramp(f, RUN0 - 4, RUN0 + 4);
  const weekIn = useSpringAt(RUN0 + 2, SPRINGS.card, 14);
  const weekOut = ramp(f, R.swap - 6, R.swap + 1);
  const live = useSpringAt(R.launches, SPRINGS.smooth, 12);
  const weekMarks = cascade(R.checks, [7, 6, 6, 5, 4, 4]);
  const off = useSpringAt(R.pauses + 2, SPRINGS.smooth, 10);
  const fly = ramp(f, R.moves, R.moves + CHIP_FLY);
  const landed = f >= R.moves + CHIP_FLY;
  const best = useSpringAt(R.sells, SPRINGS.pop, 16);
  const rowY = (i: number) => CARD.bodyTop - 8 - CLIP_TOP + i * AD_ROW.h;
  const chipY = rowY(2) + AD_ROW.budgetDy + (rowY(0) - rowY(2)) * fly - 30 * Math.sin(Math.PI * fly);
  const chipOpacity = ramp(f, R.moves - 2, R.moves + 2) * (1 - ramp(f, R.moves + CHIP_FLY, R.moves + CHIP_FLY + 4));
  const budgets = [landed ? "$30 / day" : "$20 / day", "$20 / day", f >= R.moves ? "Budget moved" : "$10 / day"];
  const body = CARD.bodyTop - CLIP_TOP;
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={3} text="The agent builds it" at={-8} out={RUN0 - 4} />
        {f >= RUN0 - 4 ? <StepTitle step={4} text="It launches and checks every day" at={RUN0 - 2} out={R.swap - 4} keepEyebrow /> : null}
        {f >= R.swap - 4 ? <StepTitle step={4} text="Cuts losers, feeds winners" at={R.swap - 2} eyebrowAt={-100} /> : null}
        <Zoom w={CARD.w} s={S} top={zoneTop(height * S)}>
          <CampaignCard live={live} height={height}>
            <div style={{ position: "absolute", left: CARD.pad, right: CARD.pad, top: CLIP_TOP, bottom: 0, overflow: "hidden" }}>
              <div style={{ position: "absolute", left: 0, top: body, opacity: 1 - buildOut, transform: `translateY(${-36 * buildOut}px)` }}>
                <BuildBody rows={BUILD_ROWS_AT} thumbsAt={THUMBS_AT} inner={INNER} />
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, top: body, opacity: weekIn * (1 - weekOut), transform: `translateY(${30 * (1 - weekIn) - 28 * weekOut}px)` }}>
                <WeekRow marks={weekMarks} />
              </div>
              <div style={{ position: "absolute", left: 0, right: 0, top: body - 8 }}>
                {AD_SETS.map((s, i) => (
                  <Pop key={s.name} at={R.swap + 1 + i * 3} from={0.94} rise={18}>
                    <div style={{ width: INNER }}>
                      <AdSetRow
                        name={s.name}
                        img={ad(s.ad)}
                        budget={budgets[i]}
                        budgetBump={i === 0 ? bump(f, R.moves + CHIP_FLY - 2) : 0}
                        cpa={s.cpa}
                        on={i === 2 ? 1 - off : 1}
                        best={i === 0 ? best : 0}
                        first={i === 0}
                      />
                    </div>
                  </Pop>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  left: AD_ROW.budgetX + 74,
                  top: chipY - 16,
                  opacity: chipOpacity,
                  padding: "2px 7px",
                  borderRadius: 2,
                  background: P.emeraldSoft,
                  color: "#047857",
                  fontFamily: FONT,
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 10px rgba(4,120,87,0.15)",
                }}
              >
                +$10 / day
              </div>
            </div>
          </CampaignCard>
        </Zoom>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

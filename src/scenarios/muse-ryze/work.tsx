import React from "react";
import { AbsoluteFill, Img, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { SceneCursor } from "../../core/stage";
import {
  MuseApprovalCard,
  MuseArtifactDoc,
  MuseArtifactPanel,
  MuseBubble,
  MuseComposer,
  MuseDay,
  MuseDone,
  MuseFloat,
  MuseFrame,
  MuseThread,
  MuseTopbar,
  MuseTyping,
  type DocLeak,
} from "../../kit/muse-ui";
import { ALLOW_AT, APPROVED_AT, CARD_AT, DONE_AT, ID, LEAK_MARKS, PANEL_AT, PANEL_W, PROMPT, STATS_AT, WORK_IN, WORK_OUT, YES2_AT } from "./timings";

const LEAKS: DocLeak[] = [
  { name: "Lookalike 5% has zero purchases in 14 days", sub: "seo-scan-broad · $640/week", amount: "$1,280", severity: "high", fix: "Pause" },
  { name: "Interests ad set CPA is 6x account average", sub: "seo-scan-broad · CPA $388", amount: "$820", severity: "high", fix: "Pause" },
  { name: "Retargeting frequency above 6", sub: "seo-scan-leads · 30-day window", amount: "$380", severity: "mid", fix: "Cap frequency" },
  { name: "Two creatives fatigued (CTR fell 41%)", sub: "seo-scan-broad · running 23 days", amount: "$930", severity: "mid", fix: "Refresh" },
];

const META = "integrations/meta-ads.svg";
const metaThumb = <Img src={staticFile(META)} style={{ width: 34 }} />;

const count = (frame: number, at: number, to: number, len = 26) =>
  Math.round(interpolate(frame, [at, at + len], [0, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }));

const money = (n: number) => "$" + n.toLocaleString("en-US");

const Rise: React.FC<{ at: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ at, children, style }) => {
  const frame = useCurrentFrame();
  const s = useSpringAt(at, SPRINGS.card, 22);
  return (
    <div style={{ opacity: s, transform: `translateY(${(1 - s) * 26}px)`, visibility: frame >= at ? "visible" : "hidden", ...style }}>{children}</div>
  );
};

const AuditDoc: React.FC = () => {
  const frame = useCurrentFrame();
  const leaks = LEAKS.filter((_, i) => frame >= LEAK_MARKS[i]);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <MuseArtifactDoc
        title="Meta Ads Audit"
        sub="Last 14 days · 3 campaigns · via Ryze"
        logo={META}
        stats={[
          { label: "Spend", value: money(count(frame, STATS_AT, 26137)), delta: "+12% vs prior 14d" },
          { label: "Purchases", value: String(count(frame, STATS_AT, 418)), delta: "−6%", tone: "bad" },
          { label: "CPA", value: "$" + (count(frame, STATS_AT, 6250) / 100).toFixed(2), delta: "+19%", tone: "bad" },
          { label: "Wasted", value: money(count(frame, STATS_AT, 3410)), delta: "13% of spend", tone: "bad" },
        ]}
        leaks={leaks}
      />
    </div>
  );
};

const status = (frame: number) => {
  if (frame >= DONE_AT) return { text: "Done", icon: "✅" };
  if (frame >= APPROVED_AT) return { text: "Pausing 4 ad sets", icon: "⏸️" };
  if (frame >= CARD_AT) return { text: "Waiting for permission", icon: "\u{1F512}" };
  return { text: "Auditing Meta Ads", icon: "\u{1F50D}" };
};

export const WorkLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const panel = useSpringAt(PANEL_AT, SPRINGS.panel, 34);
  const approved = frame >= APPROVED_AT;
  const st = status(frame);
  const workIn = interpolate(frame, [WORK_IN, WORK_IN + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (frame < WORK_IN || frame >= WORK_OUT) return null;
  return (
    <AbsoluteFill style={{ opacity: workIn }}>
      <MuseFrame
        panel={
          <div style={{ width: PANEL_W * panel, height: "100%", overflow: "hidden", flexShrink: 0 }}>
            <MuseArtifactPanel title="Meta Ads Audit" width={PANEL_W}>
              <AuditDoc />
            </MuseArtifactPanel>
          </div>
        }
      >
        <MuseTopbar />
        <MuseFloat mood="working" status={st.text} statusIcon={<span style={{ fontSize: 13 }}>{st.icon}</span>} />
        <MuseThread anchored>
          <MuseDay text="Today" />
          <MuseBubble user style={{ maxWidth: 520 }}>{PROMPT}</MuseBubble>
          <MuseBubble>Yes. Connecting Ryze and auditing your Meta Ads now.</MuseBubble>
          <Rise at={CARD_AT} style={{ alignSelf: "flex-start" }}>
            <MuseApprovalCard
              id={ID.card}
              logo="ryze-sun.png"
              title="Muse found 4 opportunities"
              sub="Ryze found $1,430 a week going to ad sets with zero purchases in 14 days. Pause them?"
              items={[
                { thumb: metaThumb, name: "Lookalike 5%", sub: "$640/wk · no sales" },
                { thumb: metaThumb, name: "Interests", sub: "$410/wk · no sales" },
                { thumb: metaThumb, name: "Retarget 30d", sub: "$190/wk · freq 6.1" },
                { thumb: metaThumb, name: "Broad 25-54", sub: "$190/wk · no sales" },
              ]}
              totalLabel="Weekly savings"
              total="$1,430"
              allowId={ID.allow}
              approved={approved}
            />
          </Rise>
          <Rise at={YES2_AT} style={{ alignSelf: "flex-start" }}>
            <MuseBubble>Yes! Paused 4 ad sets. That is $1,430 a week back.</MuseBubble>
          </Rise>
          <Rise at={DONE_AT} style={{ alignSelf: "flex-start", padding: "6px 0 10px" }}>
            <MuseDone size={34} />
          </Rise>
          <div style={{ visibility: frame >= CARD_AT ? "hidden" : "visible", height: frame >= CARD_AT ? 0 : undefined, overflow: "hidden" }}>
            <MuseTyping frame={frame} />
          </div>
        </MuseThread>
        <MuseComposer sending={frame < DONE_AT} width={Math.min(976, 1920 - 100 - PANEL_W * panel - 80)} />
      </MuseFrame>
      <Sequence from={CARD_AT} layout="none">
        <SceneCursor from={{ x: 420, y: 760 }} appearAt={0} wander={0} moves={[{ target: ID.allow, at: ALLOW_AT - CARD_AT, travel: 22 }]} />
      </Sequence>
    </AbsoluteFill>
  );
};

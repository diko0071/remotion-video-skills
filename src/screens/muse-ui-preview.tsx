import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  MuseArtifactDoc,
  MuseArtifactPanel,
  MuseArtifactThumb,
  MuseBubble,
  MuseComposer,
  MuseDay,
  MuseFloat,
  MuseFrame,
  MuseProfilePanel,
  MuseSuggestCard,
  MuseThread,
  MuseTopbar,
  MuseTyping,
  MuseApprovalCard,
  type ActivityRow,
} from "../kit/muse-ui";
import { Img, staticFile } from "remotion";

const ROWS: ActivityRow[] = [
  { title: "Search tools updated", sub: "Loaded widget namespace with 3 functions", time: "10:02 am" },
  { title: "Check artifact status", sub: "Rebuilt artifact and presented completion widget", time: "12:58 am" },
  { title: "Check data after skill fix", sub: "Built and presented the Meta Ads Audit artifact with data available", time: "12:55 am" },
  { title: "Update Ryze MCP binary", sub: "Updated Ryze MCP binary and SKILL.md", time: "12:47 am", kind: "note" },
  { title: "Debug Ryze MCP slow runtime", sub: "Resolved Cloudflare 403 and validated MCP session caching", time: "12:43 am" },
  { title: "Find MCP method for Ryze Meta", sub: "Found Ryze MCP connector, but firewall blocked access", time: "12:34 am", kind: "web" },
];

export const MuseChatPreview: React.FC = () => (
  <AbsoluteFill>
    <MuseFrame panel={<MuseProfilePanel rows={ROWS} />}>
      <MuseTopbar />
      <MuseThread anchored>
        <MuseBubble>Fixed. The report was rebuilt and published again. Try opening it now.</MuseBubble>
        <MuseDay text="Sep 20 at 10:02 AM" />
        <MuseBubble>Good morning.</MuseBubble>
        <MuseSuggestCard
          icon={<Img src={staticFile("muse/calc.png")} />}
          title="I can flag your Meta spend leaks every day"
          body="Every morning, I can pull your Meta Ads spend, CPA, and ad-level waste through the Ryze connector and compare them against your audit baseline...."
        />
        <MuseDay text="Sep 20 at 12:53 PM" />
        <MuseBubble>
          <div className="mu-bubble-title">Tip 1: put a task on a schedule and I take it from there</div>
          <p>This week I will share a few tips on what else I can do. Starting with scheduled tasks.</p>
          <p>I can own recurring work on a schedule: a morning briefing, price drops on Marketplace, or a monthly order for your approval.</p>
          <p>Want to start with the morning briefing? I can have it ready for tomorrow.</p>
        </MuseBubble>
        <MuseArtifactThumb file="muse/artifact-thumb.png" />
      </MuseThread>
      <MuseComposer />
    </MuseFrame>
  </AbsoluteFill>
);

export const MuseWorkingPreview: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <MuseFrame>
        <MuseTopbar />
        <MuseFloat mood="working" status="Waiting for permission" statusIcon={<span style={{ fontSize: 13 }}>{"\u{1F512}"}</span>} />
        <MuseThread anchored>
          <MuseBubble>
            <p>By campaign:</p>
            <ul>
              <li><b>seo-scan-broad</b> — $22,089.34 (84.5%)</li>
              <li><b>seo-scan-leads</b> — $3,795.71 (14.5%)</li>
              <li><b>Meta | Start trial [Managed by Ryze]</b> — $252.60 (~1%)</li>
            </ul>
            <p>seo-scan-ic had no delivery in this window, so it&apos;s not in the numbers.</p>
          </MuseBubble>
          <MuseBubble user>Can you find where I&apos;m wasting money in Meta Ads?</MuseBubble>
          <MuseApprovalCard
            logo="ryze-sun.png"
            title="Muse wants to pause 4 ad sets"
            sub="Ryze found $1,430 a week going to ad sets with zero purchases in 14 days. Review the list before approving."
            items={[
              { thumb: <Img src={staticFile("integrations/meta-ads.svg")} style={{ width: 34 }} />, name: "Lookalike 5%", sub: "$640/wk · no sales" },
              { thumb: <Img src={staticFile("integrations/meta-ads.svg")} style={{ width: 34 }} />, name: "Interests", sub: "$410/wk · no sales" },
              { thumb: <Img src={staticFile("integrations/meta-ads.svg")} style={{ width: 34 }} />, name: "Retarget 30d", sub: "$190/wk · freq 6.1" },
              { thumb: <Img src={staticFile("integrations/meta-ads.svg")} style={{ width: 34 }} />, name: "Broad 25-54", sub: "$190/wk · no sales" },
            ]}
            totalLabel="Weekly savings"
            total="$1,430"
          />
          <MuseTyping frame={frame} />
        </MuseThread>
        <MuseComposer sending />
      </MuseFrame>
    </AbsoluteFill>
  );
};

export const MuseArtifactPreview: React.FC = () => (
  <AbsoluteFill>
    <MuseFrame
      panel={
        <MuseArtifactPanel title="Meta Ads Audit">
          <MuseArtifactDoc
            title="Meta Ads Audit"
            sub="Last 14 days · 3 campaigns · via Ryze"
            logo="integrations/meta-ads.svg"
            stats={[
              { label: "Spend", value: "$26,137", delta: "+12% vs prior 14d" },
              { label: "Purchases", value: "418", delta: "−6%", tone: "bad" },
              { label: "CPA", value: "$62.50", delta: "+19%", tone: "bad" },
              { label: "Wasted", value: "$3,410", delta: "13% of spend", tone: "bad" },
            ]}
            leaks={[
              { name: "Lookalike 5% has zero purchases in 14 days", sub: "seo-scan-broad · $640/week", amount: "$1,280", severity: "high", fix: "Pause" },
              { name: "Interests ad set CPA is 6x account average", sub: "seo-scan-broad · CPA $388", amount: "$820", severity: "high", fix: "Pause" },
              { name: "Retargeting frequency above 6", sub: "seo-scan-leads · 30-day window", amount: "$380", severity: "mid", fix: "Cap frequency" },
              { name: "Two creatives fatigued (CTR fell 41%)", sub: "seo-scan-broad · running 23 days", amount: "$930", severity: "mid", fix: "Refresh" },
            ]}
          />
        </MuseArtifactPanel>
      }
    >
      <MuseTopbar invite />
      <MuseFloat />
      <MuseThread anchored>
        <MuseBubble user style={{ maxWidth: 420 }}>can you check last news about grok bot?</MuseBubble>
        <MuseBubble style={{ maxWidth: 500 }}>
          <p>Grok Bot — that&apos;s SpaceXAI&apos;s always-on agent product. Latest developments:</p>
          <ul>
            <li><b>Android launch</b>: about two and a half weeks ago SpaceXAI announced Grok Bot is now on Android.</li>
            <li>Each Bot gets its own persistent cloud computer and finishes multi-step work end to end.</li>
          </ul>
        </MuseBubble>
      </MuseThread>
      <MuseComposer width={560} />
    </MuseFrame>
  </AbsoluteFill>
);

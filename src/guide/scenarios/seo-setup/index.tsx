import React from "react";
import { useCurrentFrame } from "remotion";
import { RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { IntegrationsBody } from "../../../kit/ryze-ui/pages/integrations";
import { GateEmptyState, GateGenerating, RunSetupButton } from "../../../kit/ryze-ui/pages/pipeline-gate";
import { QueriesShell } from "../../../kit/ryze-ui/pages/geo-queries/queries-shell";
import { KeywordsTable } from "../../../kit/ryze-ui/pages/geo-queries/keywords-table";
import { TOPICS } from "../../../kit/ryze-ui/pages/geo-queries/data";
import { TopicsTable } from "../../../kit/ryze-ui/pages/geo-queries/topics-table";
import { TechnicalAuditBody } from "../../../kit/ryze-ui/pages/technical-audit";
import { GeoDashboardSections } from "../../../kit/ryze-ui/pages/seo-dashboard";
import { ContentPlanBody } from "../../../kit/ryze-ui/pages/content-plan";
import { MentionsBody } from "../../../kit/ryze-ui/pages/backlinks";
import { DashboardShell, SeoDashboardSections } from "../../../kit/ryze-ui/pages/seo-dashboard";
import { PageLayer } from "../../page-layer";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS } from "./acts";
import {
  EMPTY_QUERY_KPIS,
  FOCUS_KEYWORDS,
  FOCUS_KEYWORD_TABS,
  FOCUS_KPIS,
  FOCUS_PROMPT_TABS,
  EMPTY_QUERY_TABS,
  MENTION_KPIS_FRESH,
  MENTION_ROWS_FRESH,
  MENTION_TABS_FRESH,
  PLAN_KPIS_FRESH,
  PLAN_KPIS_LIVE,
  PLAN_ROWS_FRESH,
  PLAN_ROWS_LIVE,
  PLAN_TABS_FRESH,
  PLAN_TABS_LIVE,
} from "./data";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const GSC_AT = timeline.at("gsc");
const GA_AT = timeline.at("ga");
const COMMERCE_AT = timeline.at("commerce");
const SHOPIFY_AT = timeline.at("shopify");
const SEO_RAIL_AT = timeline.at("seoRail");
const QUERIES_AT = timeline.at("queries");
const RUN_AT = timeline.at("run");
const KEYWORDS_AT = timeline.at("keywords");
const PROMPTS_AT = timeline.at("prompts");
const PLAN_AT = timeline.at("plan");
const MENTIONS_AT = timeline.at("mentions");
const AUDIT_AT = timeline.at("audit");
const DASH_AT = timeline.at("dash");
const GEO_AT = timeline.at("geo");
const PLAN_AGAIN_AT = timeline.at("planAgain");
const PUBLISHED_AT = timeline.at("published");
const OUTRO_AT = timeline.total - 4;

export const GUIDE_SEO_SETUP_TOTAL = OUTRO_AT + 110;

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onI1 = frame < COMMERCE_AT;
  const onI2 = frame >= COMMERCE_AT && frame < QUERIES_AT;
  const onQ = frame >= QUERIES_AT && frame < PROMPTS_AT;
  const onQ2 = frame >= PROMPTS_AT && frame < PLAN_AT;
  const onC1 = frame >= PLAN_AT && frame < MENTIONS_AT;
  const onM1 = frame >= MENTIONS_AT && frame < AUDIT_AT;
  const onA1 = frame >= AUDIT_AT && frame < DASH_AT;
  const onD1 = frame >= DASH_AT && frame < GEO_AT;
  const onG1 = frame >= GEO_AT && frame < PLAN_AGAIN_AT;
  const onC2 = frame >= PLAN_AGAIN_AT && frame < PUBLISHED_AT + 6;
  const onC3 = frame >= PUBLISHED_AT + 6;

  const onIntegrations = onI1 || onI2;
  const nav = onIntegrations
    ? frame >= SEO_RAIL_AT
      ? "SEO"
      : "Integrations"
    : onQ || onQ2
      ? "Queries"
      : onM1
        ? "Mentions"
        : onA1
          ? "Technical Audit"
          : onD1 || onG1
            ? "Dashboard"
            : "Content Plan";
  const section = frame < SEO_RAIL_AT ? "dashboard" : "seo";
  const page = onIntegrations ? "Integrations" : nav;

  const gscState = frame >= GSC_AT + 10 ? "connected" : "none";
  const gaState = frame >= GA_AT + 10 ? "connected" : "none";
  const shopifyState = frame >= SHOPIFY_AT + 10 ? "connected" : "none";

  const running = frame >= RUN_AT;
  const generating = frame >= RUN_AT + 30 && frame < KEYWORDS_AT;
  const gotKeywords = frame >= KEYWORDS_AT;

  return (
    <ShellOverrideProvider value={{ expanded: true, nav, section }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp workspace="ember-and-oak" page={page} nav={nav} credits="4,180" stretch>
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onI1} scope="i1">
              <IntegrationsBody
                category="Analytics"
                stateOverrides={{
                  "Google Search Console": gscState,
                  "Google Analytics 4": gaState,
                  Semrush: "none",
                  Ahrefs: "none",
                }}
              />
            </PageLayer>
            <PageLayer visible={onI2} scope="i2">
              <IntegrationsBody
                category="Commerce & CMS"
                stateOverrides={{ Shopify: shopifyState }}
              />
            </PageLayer>
            <PageLayer visible={onQ} scope="q1">
              {gotKeywords ? (
                <QueriesShell bare tabs={FOCUS_KEYWORD_TABS} kpis={FOCUS_KPIS}>
                  <KeywordsTable keywords={FOCUS_KEYWORDS} />
                </QueriesShell>
              ) : (
                <QueriesShell bare tabs={EMPTY_QUERY_TABS} kpis={EMPTY_QUERY_KPIS}>
                  {generating ? (
                    <GateGenerating
                      text="Picking keywords for your site"
                      hint="They appear here as research completes — you can close this page."
                    />
                  ) : (
                    <GateEmptyState
                      title="Run setup first"
                      description="Setup prepares your keywords — everything here builds on them."
                      action={<RunSetupButton pending={running} />}
                    />
                  )}
                </QueriesShell>
              )}
            </PageLayer>
            <PageLayer visible={onQ2} scope="q2">
              <QueriesShell bare tabs={FOCUS_PROMPT_TABS} kpis={FOCUS_KPIS}>
                <TopicsTable topics={TOPICS} />
              </QueriesShell>
            </PageLayer>
            <PageLayer visible={onC1} scope="c1">
              <ContentPlanBody rows={PLAN_ROWS_FRESH} tabs={PLAN_TABS_FRESH} kpis={PLAN_KPIS_FRESH} publishNowVisible={false} />
            </PageLayer>
            <PageLayer visible={onM1} scope="m1">
              <MentionsBody rows={MENTION_ROWS_FRESH} kpis={MENTION_KPIS_FRESH} tabs={MENTION_TABS_FRESH} activeTab="All" />
            </PageLayer>
            <PageLayer visible={onA1} scope="a1">
              <TechnicalAuditBody />
            </PageLayer>
            <PageLayer visible={onD1} scope="d1">
              <DashboardShell tab="SEO" sub="Live SEO performance across Search, Analytics, and connected stores." bare>
                <SeoDashboardSections />
              </DashboardShell>
            </PageLayer>
            <PageLayer visible={onG1} scope="g1">
              <DashboardShell tab="GEO" sub="Live SEO performance across Search, Analytics, and connected stores." bare>
                <GeoDashboardSections />
              </DashboardShell>
            </PageLayer>
            <PageLayer visible={onC2} scope="c2">
              <ContentPlanBody rows={PLAN_ROWS_FRESH} tabs={PLAN_TABS_FRESH} kpis={PLAN_KPIS_FRESH} publishNowVisible={false} />
            </PageLayer>
            <PageLayer visible={onC3} scope="c3">
              <ContentPlanBody rows={PLAN_ROWS_LIVE} tabs={PLAN_TABS_LIVE} kpis={PLAN_KPIS_LIVE} publishNowVisible={false} />
            </PageLayer>
          </div>
        </RyzeApp>
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideSeoSetup: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-seo-setup"
    title={{ title: "How to set up SEO in Ryze", accent: "SEO" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);

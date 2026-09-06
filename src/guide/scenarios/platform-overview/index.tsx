import React from "react";
import { useCurrentFrame } from "remotion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { IntegrationsBody } from "../../../kit/ryze-ui/pages/integrations";
import { OrgHomePage } from "../../../kit/ryze-ui/pages/org-home";
import { AdTemplatesPage } from "../../../kit/ryze-ui/pages/ad-templates";
import { CompetitorAdsPage } from "../../../kit/ryze-ui/pages/competitor-ads";
import { ContentPlanBody } from "../../../kit/ryze-ui/pages/content-plan";
import { CreativesPage } from "../../../kit/ryze-ui/pages/creatives";
import { PaidAdsDashboardPage } from "../../../kit/ryze-ui/pages/paid-ads-dashboard";
import { SeoDashboardGeoPage, SeoDashboardPage } from "../../../kit/ryze-ui/pages/seo-dashboard";
import { TechnicalAuditPage } from "../../../kit/ryze-ui/pages/technical-audit";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS } from "./acts";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);
const OUTRO_AT = timeline.total - 4;

export const GUIDE_PLATFORM_OVERVIEW_TOTAL = OUTRO_AT + 110;

const INT_AT = timeline.at("integrations");
const PANEL_AT = timeline.at("panelOpen");
const PANEL_CLOSE_AT = timeline.at("panelClosed");
const PDASH_AT = timeline.at("paidDash");
const CRV_AT = timeline.at("crv");
const TPL_AT = timeline.at("tpl");
const COMP_AT = timeline.at("comp");
const SEO_AT = timeline.at("seoRail");
const SEODASH_AT = timeline.at("seoDash");
const GEO_AT = timeline.at("geoTab");
const CP_AT = timeline.at("contentPlan");
const TA_AT = timeline.at("techAudit");
const BACK_AT = timeline.at("railBack");
const HOME2_AT = timeline.at("homeAgain");

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onHome = frame < INT_AT + 4;
  const onIntegrations = frame >= INT_AT + 4 && frame < PDASH_AT + 4;
  const onPaid = frame >= PDASH_AT + 4 && frame < CRV_AT + 4;
  const onCrv = frame >= CRV_AT + 4 && frame < TPL_AT + 4;
  const onTpl = frame >= TPL_AT + 4 && frame < COMP_AT + 4;
  const onComp = frame >= COMP_AT + 4 && frame < SEODASH_AT + 4;
  const onSeoDash = frame >= SEODASH_AT + 4 && frame < GEO_AT + 4;
  const onGeo = frame >= GEO_AT + 4 && frame < CP_AT + 4;
  const onCp = frame >= CP_AT + 4 && frame < TA_AT + 4;
  const onTa = frame >= TA_AT + 4 && frame < HOME2_AT + 4;
  const onHomeAgain = frame >= HOME2_AT + 4;

  const panelProgress = usePanelSlide([{ open: PANEL_AT, close: PANEL_CLOSE_AT }]);
  const agentPanel = <AgentPanel width={GUIDE_PANEL_WIDTH} progress={panelProgress} />;

  const compSeoRail = frame >= SEO_AT + 2;
  const taMainRail = frame >= BACK_AT + 2;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <PageLayer visible={onHome} scope="h1">
        <OrgHomePage />
      </PageLayer>
      <PageLayer visible={onIntegrations} scope="i1">
        <RyzeApp
          workspace="ember-and-oak"
          page="Integrations"
          nav="Integrations"
          stretch
          panel={agentPanel}
        >
          <IntegrationsBody />
        </RyzeApp>
      </PageLayer>
      <PageLayer visible={onPaid} scope="p1">
        <ShellOverrideProvider value={{ section: "dashboard", nav: "Dashboard" }}>
          <PaidAdsDashboardPage />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onCrv} scope="v1">
        <CreativesPage />
      </PageLayer>
      <PageLayer visible={onTpl} scope="t1">
        <AdTemplatesPage />
      </PageLayer>
      <PageLayer visible={onComp} scope="c1">
        <ShellOverrideProvider
          value={
            compSeoRail
              ? { section: "seo", nav: "" }
              : { section: "dashboard", nav: "Competitor Ads" }
          }
        >
          <CompetitorAdsPage />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onSeoDash} scope="d1">
        <ShellOverrideProvider value={{ section: "seo", nav: "Dashboard" }}>
          <SeoDashboardPage />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onGeo} scope="g1">
        <ShellOverrideProvider value={{ section: "seo", nav: "Dashboard" }}>
          <SeoDashboardGeoPage />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onCp} scope="cp1">
        <ShellOverrideProvider value={{ section: "seo", nav: "Content Plan" }}>
          <RyzeApp workspace="ember-and-oak" page="Content Plan" nav="Content Plan" stretch>
            <ContentPlanBody />
          </RyzeApp>
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onTa} scope="ta1">
        <ShellOverrideProvider
          value={
            taMainRail ? { section: "dashboard", nav: "" } : { section: "seo", nav: "Technical Audit" }
          }
        >
          <TechnicalAuditPage />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onHomeAgain} scope="h2">
        <ShellOverrideProvider value={{ section: "dashboard", nav: "Home" }}>
          <OrgHomePage />
        </ShellOverrideProvider>
      </PageLayer>
    </div>
  );
};

export const GuidePlatformOverview: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-platform-overview"
    title={{ title: "Ryze in ninety seconds", accent: "Ryze" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);

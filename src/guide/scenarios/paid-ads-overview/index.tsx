import React from "react";
import { useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { Composer } from "../../../kit/ryze-ui/composer";
import { AdTemplatesPage } from "../../../kit/ryze-ui/pages/ad-templates";
import { ApprovalsBody } from "../../../kit/ryze-ui/pages/approvals";
import { CompetitorAdsPage } from "../../../kit/ryze-ui/pages/competitor-ads";
import { CreativesPage } from "../../../kit/ryze-ui/pages/creatives";
import { IntegrationsBody } from "../../../kit/ryze-ui/pages/integrations";
import { PaidAdsDashboardPage } from "../../../kit/ryze-ui/pages/paid-ads-dashboard";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { GuideThread, type ThreadEntry } from "../../thread";
import { ACTS } from "./acts";
import { OVERSPEND_TURN, Q_OVERSPEND } from "./turns";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);
const OUTRO_AT = timeline.total - 4;

export const GUIDE_PAID_ADS_OVERVIEW_TOTAL = OUTRO_AT + 110;

const INT_AT = timeline.at("integrations");
const ADSTAB_AT = timeline.at("adsTab");
const DASH2_AT = timeline.at("dashAgain");
const PANEL_AT = timeline.at("panelOpen");
const FOCUS1_AT = timeline.at("focus1");
const SENT1_AT = timeline.at("sent1");
const APPR_AT = timeline.at("approvals");
const CRV_AT = timeline.at("crv");
const TPL_AT = timeline.at("tpl");
const COMP_AT = timeline.at("comp");

const PANEL_THREAD: ThreadEntry[] = [{ turn: OVERSPEND_TURN, at: SENT1_AT }];

const BottomThread: React.FC<{ entries: ThreadEntry[] }> = ({ entries }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      flex: 1,
      minHeight: 0,
      overflow: "hidden",
    }}
  >
    <GuideThread entries={entries} />
  </div>
);

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onDash1 = frame < INT_AT + 4;
  const onIntegrations = frame >= INT_AT + 4 && frame < DASH2_AT + 4;
  const onDash2 = frame >= DASH2_AT + 4 && frame < APPR_AT + 4;
  const onApprovals = frame >= APPR_AT + 4 && frame < CRV_AT + 4;
  const onCrv = frame >= CRV_AT + 4 && frame < TPL_AT + 4;
  const onTpl = frame >= TPL_AT + 4 && frame < COMP_AT + 4;
  const onComp = frame >= COMP_AT + 4;

  const panelProgress = usePanelSlide([{ open: PANEL_AT, close: OUTRO_AT + 40 }]);

  const typed1 = frame < SENT1_AT ? typing(frame, Q_OVERSPEND, FOCUS1_AT + 4, SENT1_AT - 8) : "";

  const agentPanel = (
    <AgentPanel
      width={GUIDE_PANEL_WIDTH}
      progress={panelProgress}
      title="New chat"
      composer={
        <Composer
          fill
          placeholder="Message Agent…"
          typed={typed1}
          cursor={frame >= FOCUS1_AT && frame < SENT1_AT}
        />
      }
    >
      {frame < SENT1_AT ? undefined : <BottomThread entries={PANEL_THREAD} />}
    </AgentPanel>
  );

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <PageLayer visible={onDash1} scope="d1">
        <ShellOverrideProvider value={{ section: "dashboard", nav: "Dashboard" }}>
          <PaidAdsDashboardPage />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onIntegrations} scope="i1">
        <RyzeApp workspace="ember-and-oak" page="Integrations" nav="Integrations" stretch>
          <IntegrationsBody category={frame >= ADSTAB_AT + 2 ? "Advertising" : "All"} />
        </RyzeApp>
      </PageLayer>
      <PageLayer visible={onDash2} scope="d2">
        <ShellOverrideProvider value={{ section: "dashboard", nav: "Dashboard" }}>
          <PaidAdsDashboardPage panel={agentPanel} />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onApprovals} scope="a1">
        <RyzeApp
          workspace="ember-and-oak"
          page="Approvals"
          nav="Approvals"
          stretch
          panel={agentPanel}
        >
          <ApprovalsBody view="board" />
        </RyzeApp>
      </PageLayer>
      <PageLayer visible={onCrv} scope="v1">
        <ShellOverrideProvider value={{ section: "dashboard", nav: "Ad Creatives" }}>
          <CreativesPage panel={agentPanel} />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onTpl} scope="t1">
        <ShellOverrideProvider value={{ section: "dashboard", nav: "Ad Templates" }}>
          <AdTemplatesPage panel={agentPanel} />
        </ShellOverrideProvider>
      </PageLayer>
      <PageLayer visible={onComp} scope="c1">
        <ShellOverrideProvider value={{ section: "dashboard", nav: "Competitor Ads" }}>
          <CompetitorAdsPage panel={agentPanel} />
        </ShellOverrideProvider>
      </PageLayer>
    </div>
  );
};

export const GuidePaidAdsOverview: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-paid-ads-overview"
    title={{ title: "Paid ads, on autopilot", accent: "Paid ads" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);

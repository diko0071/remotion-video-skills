import React from "react";
import { useCurrentFrame } from "remotion";
import { useClickPress } from "../../../core/press-context";
import { SCOPE_ATTR } from "../../../core/stage";
import {
  AgentPanel,
  RyzeApp,
  ShellOverrideProvider,
} from "../../../kit/ryze-ui/app-shell";
import { Composer } from "../../../kit/ryze-ui/composer";
import {
  DASHBOARDS,
  DECKS,
  TemplatePreviewDialog,
  TemplatesBody,
} from "../../../kit/ryze-ui/pages/templates";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS } from "./acts";
import { DECK_TURN, PanelThread, WASTE_TURN } from "./panel-chat";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);

const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const MONITOR_AT = timeline.at("monitor");
const DASH_DLG_AT = timeline.at("dashDlg");
const DASH_SCROLL_AT = timeline.at("dashScroll");
const DASH_CLOSED_AT = timeline.at("dashClosed");
const CREATE_AT = timeline.at("create");
const OPTIMIZE_AT = timeline.at("optimize");
const WASTE_AT = timeline.at("wastePanel");
const PANEL_CLOSED_AT = timeline.at("panelClosed");
const AUTOMATE_AT = timeline.at("automate");
const REPORT_AT = timeline.at("report");
const DECK_DLG_AT = timeline.at("deckDlg");
const DECK_SCROLL_AT = timeline.at("deckScroll");
const DECK_PANEL_AT = timeline.at("deckPanel");
const DECK_PANEL_CLOSED_AT = timeline.at("deckPanelClosed");
const OUTRO_AT = timeline.total - 4;

const DialogButton: React.FC<{
  id: string;
  className: string;
  children: React.ReactNode;
}> = ({ id, className, children }) => {
  const scale = useClickPress(id);
  return (
    <span
      className={className}
      data-click={id}
      style={{ scale: String(scale) }}
    >
      {children}
    </span>
  );
};

export const GUIDE_TEMPLATES_TOTAL = OUTRO_AT + 110;

const DECK_SLIDES = [0, 1, 2, 3, 4, 5].map(
  (i) => `deck-gen/slides/monthly-report-0${i}.png`,
);
const DASH_ITEM = DASHBOARDS.find(
  (d) => d.title === "Organic Traffic Overview",
)!;
const DECK_ITEM = DECKS.find((d) => d.title === "Monthly Client Report")!;

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const panelProgress = usePanelSlide([
    { open: WASTE_AT, close: PANEL_CLOSED_AT },
    { open: DECK_PANEL_AT, close: DECK_PANEL_CLOSED_AT },
  ]);

  const onIntro = frame < MONITOR_AT;
  const onMonitor = frame >= MONITOR_AT && frame < CREATE_AT;
  const onCreate = frame >= CREATE_AT && frame < OPTIMIZE_AT;
  const onOptimize = frame >= OPTIMIZE_AT && frame < AUTOMATE_AT;
  const onAutomate = frame >= AUTOMATE_AT && frame < REPORT_AT;
  const onReport = frame >= REPORT_AT;
  const dashDlgOpen = frame >= DASH_DLG_AT && frame < DASH_CLOSED_AT;
  const deckDlgOpen = frame >= DECK_DLG_AT && frame < DECK_PANEL_AT + 4;
  const deckTurn = frame >= DECK_PANEL_AT;

  return (
    <ShellOverrideProvider value={{ expanded: true, nav: "Templates" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <RyzeApp
          workspace="ember-and-oak"
          page="Templates"
          nav="Templates"
          credits="4,180"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={panelProgress}
              title={
                deckTurn ? "Monthly Client Report" : "Find Google Ads waste"
              }
              composer={<Composer placeholder="Message Agent…" fill />}
            >
              <PanelThread
                turn={deckTurn ? DECK_TURN : WASTE_TURN}
                from={(deckTurn ? DECK_PANEL_AT : WASTE_AT) + 14}
              />
            </AgentPanel>
          }
        >
          <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
            <PageLayer visible={onIntro} scope="intro">
              <TemplatesBody />
            </PageLayer>
            <PageLayer visible={onMonitor} scope="m">
              <TemplatesBody active="Monitor" only={["Monitor"]} />
            </PageLayer>
            <PageLayer visible={onCreate} scope="c">
              <TemplatesBody active="Create" only={["Create"]} />
            </PageLayer>
            <PageLayer visible={onOptimize} scope="o">
              <TemplatesBody active="Optimize" only={["Optimize"]} cols={4} />
            </PageLayer>
            <PageLayer visible={onAutomate} scope="a">
              <TemplatesBody active="Automate" only={["Automate"]} />
            </PageLayer>
            <PageLayer visible={onReport} scope="r">
              <TemplatesBody active="Report" only={["Report"]} cols={4} />
            </PageLayer>
          </div>
        </RyzeApp>
        <div {...{ [SCOPE_ATTR]: "dg1" }}>
          <TemplatePreviewDialog
            at={DASH_DLG_AT}
            visible={dashDlgOpen}
            image="deck-gen/dash/organic-pulse.png"
            scrollAt={DASH_SCROLL_AT}
            scrollBy={1010}
            title={DASH_ITEM.title}
            description={DASH_ITEM.description}
            actions={
              <DialogButton id="dlg.use" className="btn-primary">
                Use template
              </DialogButton>
            }
          />
        </div>
        <TemplatePreviewDialog
          at={DECK_DLG_AT}
          visible={deckDlgOpen}
          slides={DECK_SLIDES}
          scrollAt={DECK_SCROLL_AT}
          scrollBy={2510}
          title={DECK_ITEM.title}
          description={DECK_ITEM.description}
          hint="The agent pulls this workspace's live data and builds your version of this deck in Reports."
          actions={
            <>
              <span className="btn-outline">Copy prompt</span>
              <DialogButton id="dlg.build" className="btn-primary">
                Build with agent
              </DialogButton>
            </>
          }
        />
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideTemplates: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-templates"
    title={{ title: "How to use templates", accent: "templates" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);

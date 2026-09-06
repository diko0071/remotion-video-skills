import React from "react";
import { useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import { AgentPanel, RyzeApp } from "../../../kit/ryze-ui/app-shell";
import { ReportTop } from "../../../kit/ryze-ui/pages/report-detail";
import { GUIDE_PANEL_WIDTH } from "../../panel";
import { Composer } from "../../../kit/ryze-ui/composer";
import {
  ArtifactShell,
  DashboardArtifact,
  DeckArtifact,
} from "../../../kit/ryze-ui/pages/chat-artifact";
import {
  REPORT_ROWS,
  ReportsList,
  ReportsPageHead,
  ReportsSearch,
} from "../../../kit/ryze-ui/pages/reports";
import "../../../kit/ryze-ui/pages/reports/reports.css";
import { TemplatesBody } from "../../../kit/ryze-ui/pages/templates";
import "../../../kit/ryze-ui/pages/templates/templates.css";
import { PageLayer } from "../../page-layer";
import { GuideScrollArea, useScrollStops } from "../../scroll-area";
import { usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { GuideThread, type ThreadEntry } from "../../thread";
import { ACTS } from "./acts";
import { SendEmailDialog } from "./email-dialog";
import "./reports-guide.css";
import {
  DASH_ASK,
  DASH_TURN,
  EDIT_ASK,
  EDIT_TURN,
  REPORT_ASK,
  REPORT_TURN,
  UPDATE_SEED_TURN,
} from "./turns";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);
const OUTRO_AT = timeline.total - 4;

export const GUIDE_REPORTS_TOTAL = OUTRO_AT + 110;

const FOCUS1_AT = timeline.at("focus1");
const SENT1_AT = timeline.at("sent1");
const DECK_AT = timeline.at("deckOpen");
const FOCUS2_AT = timeline.at("focus2");
const SENT2_AT = timeline.at("sent2");
const DETAIL_AT = timeline.at("detail");
const PDFTOAST_AT = timeline.at("pdfToast");
const EMAILDLG_AT = timeline.at("emailDialog");
const EMAILSENT_AT = timeline.at("emailSent");
const UPD_AT = timeline.at("updPanel");
const FOCUS3_AT = timeline.at("focus3");
const SENT3_AT = timeline.at("sent3");
const EDIT_APPLIED_AT = SENT3_AT + 90;
const DASH_AT = timeline.at("dashOpen");
const LIST_AT = timeline.at("listPage");
const TPL_AT = timeline.at("tplPage");
const TPLREPORT_AT = timeline.at("tplReport");

const THREAD: ThreadEntry[] = [
  { turn: REPORT_TURN, at: SENT1_AT },
  { turn: DASH_TURN, at: SENT2_AT },
];

const DETAIL_THREAD: ThreadEntry[] = [
  { turn: UPDATE_SEED_TURN, at: UPD_AT + 6 },
  { turn: EDIT_TURN, at: SENT3_AT },
];

const ReportsLayer: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Reports" nav="Reports" stretch>
    <div className="pg">
      <div className="pg-scroll" style={{ overflow: "hidden" }}>
        <div className="pg-inner wide">
          <ReportsPageHead />
          <ReportsSearch />
          <ReportsList rows={REPORT_ROWS} />
        </div>
      </div>
    </div>
  </RyzeApp>
);

const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onChat = frame < LIST_AT + 4;
  const onList = frame >= LIST_AT + 4 && frame < DETAIL_AT + 4;
  const onDetail = frame >= DETAIL_AT + 4 && frame < TPL_AT + 4;
  const onTplAll = frame >= TPL_AT + 4 && frame < TPLREPORT_AT + 2;
  const onTplReport = frame >= TPLREPORT_AT + 2;

  const panelProgress = usePanelSlide([{ open: DECK_AT, close: OUTRO_AT + 40 }]);
  const updSlide = usePanelSlide([{ open: UPD_AT, close: OUTRO_AT + 40 }]);

  const typed1 = frame < SENT1_AT ? typing(frame, REPORT_ASK, FOCUS1_AT + 4, SENT1_AT - 8) : "";
  const typed2 =
    frame >= SENT1_AT && frame < SENT2_AT
      ? typing(frame, DASH_ASK, FOCUS2_AT + 4, SENT2_AT - 8)
      : "";
  const typed3 = frame < SENT3_AT ? typing(frame, EDIT_ASK, FOCUS3_AT + 4, SENT3_AT - 8) : "";

  const deckStops = useScrollStops(timeline.scrollStops, { from: DECK_AT, until: DASH_AT });
  const dashStops = useScrollStops(timeline.scrollStops, { from: DASH_AT, until: LIST_AT });

  const onDeck = frame < DASH_AT;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <PageLayer visible={onChat} scope="c1">
        <RyzeApp workspace="ember-and-oak" page="Chat" nav="New chat" stretch>
          <ArtifactShell
            chatTitle="Monthly performance report"
            name={onDeck ? "Ember & Oak — August performance review" : "Search Console live dashboard"}
            progress={panelProgress}
            composer={
              <Composer
                fill
                placeholder="Message Agent…"
                typed={frame < SENT1_AT ? typed1 : typed2}
                cursor={
                  (frame >= FOCUS1_AT && frame < SENT1_AT) ||
                  (frame >= FOCUS2_AT && frame < SENT2_AT)
                }
              />
            }
            chat={<GuideThread entries={THREAD} />}
          >
            <GuideScrollArea
              key={onDeck ? "deck" : "dash"}
              id={onDeck ? "deck" : "dash"}
              stops={onDeck ? deckStops : dashStops}
              style={{ height: "100%" }}
            >
              {onDeck ? <DeckArtifact /> : <DashboardArtifact />}
            </GuideScrollArea>
          </ArtifactShell>
        </RyzeApp>
      </PageLayer>
      <PageLayer visible={onList} scope="l1">
        <ReportsLayer />
      </PageLayer>
      <PageLayer visible={onDetail} scope="r1">
        <RyzeApp
          workspace="ember-and-oak"
          page="Reports"
          nav="Reports"
          stretch
          panel={
            <AgentPanel
              width={GUIDE_PANEL_WIDTH}
              progress={updSlide}
              title="Update report"
              composer={
                <Composer
                  fill
                  placeholder="Message Agent…"
                  typed={typed3}
                  cursor={frame >= FOCUS3_AT && frame < SENT3_AT}
                />
              }
            >
              <GuideThread entries={DETAIL_THREAD} />
            </AgentPanel>
          }
        >
          <div className="pg">
            <GuideScrollArea id="detail" className="pg-scroll rd-scroll" contentClassName="pg-inner rd-inner" style={{ flex: 1 }}>
              <ReportTop />
              <DeckArtifact
                coverTitle={
                  frame >= EDIT_APPLIED_AT ? <>September growth plan</> : undefined
                }
                style={{ marginTop: 18 }}
              />
            </GuideScrollArea>
          </div>
        </RyzeApp>
        {frame >= PDFTOAST_AT && frame < PDFTOAST_AT + 70 ? (
          <div className="repx-toast" style={{ top: 118 }}>PDF downloaded</div>
        ) : null}
        {frame >= EMAILDLG_AT ? (
          <SendEmailDialog at={EMAILDLG_AT} visible={frame < EMAILSENT_AT + 4} />
        ) : null}
        {frame >= EMAILSENT_AT + 8 && frame < EMAILSENT_AT + 80 ? (
          <div className="repx-toast" style={{ top: 118 }}>Report sent</div>
        ) : null}
      </PageLayer>
      <PageLayer visible={onTplAll} scope="t1">
        <RyzeApp workspace="ember-and-oak" page="Templates" nav="Templates" stretch>
          <TemplatesBody />
        </RyzeApp>
      </PageLayer>
      <PageLayer visible={onTplReport} scope="t2">
        <RyzeApp workspace="ember-and-oak" page="Templates" nav="Templates" stretch>
          <TemplatesBody active="Report" only={["Report"]} />
        </RyzeApp>
      </PageLayer>
    </div>
  );
};

export const GuideReports: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-reports"
    title={{ title: "Reports in Ryze, made by asking", accent: "Reports" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);

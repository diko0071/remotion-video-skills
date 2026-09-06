import React from "react";
import { useCurrentFrame } from "remotion";
import { AgentPanel, RyzeApp, ShellOverrideProvider } from "../../../kit/ryze-ui/app-shell";
import { Composer } from "../../../kit/ryze-ui/composer";
import {
  EditScheduleDialog,
  ScheduleDetailBody,
  ScheduleRowMenu,
  SchedulesBody,
  SCHEDULES,
  SCHEDULE_RUNS,
  SCHEDULE_TASK_TEXT,
  type ScheduleRun,
} from "../../../kit/ryze-ui/pages/schedules";
import { PageLayer } from "../../page-layer";
import { GUIDE_PANEL_WIDTH, usePanelSlide } from "../../panel";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { PanelThread, setWidgetFrames } from "./panel-chat";
import { RunChatBody } from "./run-chat";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const EXISTING = SCHEDULES.slice(1);
const CREATED = SCHEDULES[0];
const RUN_ROW: ScheduleRun = { when: "Just now", status: "Running", tone: "warn" };
const RECIPIENTS = {
  channels: ["#growth", "#marketing"],
  emails: ["you@example.com", "team@example.com"],
  addToWorkspace: true,
};

const TITLE_HOLD = titleHold(VO);

import { ACTS } from "./acts";

const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);

const PANEL_AT = timeline.at("panel");
const ASK_FROM = PANEL_AT + 8;

const SUBMIT_AT = timeline.at("submit");
const CREATE_FROM = SUBMIT_AT + 8;

setWidgetFrames({
  task: timeline.clicks.find((c) => c.target === "q.task")!.at,
  freq: timeline.clicks.find((c) => c.target === "q.freq")!.at,
  dest: timeline.clicks.find((c) => c.target === "q.dest")!.at,
  submit: SUBMIT_AT,
});

const CREATED_AT = timeline.at("created");
const MENU_AT = timeline.at("menu");
const DIALOG_AT = timeline.at("dialog");
const RECIPIENT_AT = timeline.at("recipient");
const SAVED_AT = timeline.at("saved");
const DIALOG_CLOSE = SAVED_AT + 22;
const DETAIL_AT = timeline.at("detail");
const RUN_NOW_AT = timeline.at("running");
const RUN_CHAT_AT = timeline.at("runChat");
const OUTRO_AT = timeline.total - 6;

export const GUIDE_SCHEDULES_TOTAL = OUTRO_AT + 110;

const Session: React.FC = () => {
  const frame = useCurrentFrame();
  const panelProgress = usePanelSlide([{ open: PANEL_AT + 2 }]);
  const created = frame >= CREATED_AT;
  const onDetail = frame >= DETAIL_AT;
  const onRunChat = frame >= RUN_CHAT_AT;
  const running = frame >= RUN_NOW_AT;
  const menuOpen = frame >= MENU_AT && frame < DIALOG_AT;
  const dialogOpen = frame >= DIALOG_AT && frame < DIALOG_CLOSE;
  const emails =
    frame >= RECIPIENT_AT ? RECIPIENTS.emails : RECIPIENTS.emails.slice(0, 1);

  return (
    <ShellOverrideProvider
      value={{ expanded: true, nav: onRunChat ? "Chat History" : "Schedules" }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
      <RyzeApp
        workspace="ember-and-oak"
        page={onRunChat ? "Chat" : "Scheduled tasks"}
        nav={onRunChat ? "Chat History" : "Schedules"}
        credits="4,180"
        stretch
        panel={
          <AgentPanel
            width={GUIDE_PANEL_WIDTH}
            progress={panelProgress}
            title="Scheduled task setup"
            composer={<Composer placeholder="Message Agent…" fill />}
          >
            <PanelThread askFrom={ASK_FROM} createFrom={CREATE_FROM} />
          </AgentPanel>
        }
      >
        <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
          <PageLayer visible={!onDetail && !onRunChat}>
            <SchedulesBody
              rows={created ? [CREATED, ...EXISTING] : EXISTING}
              revealAt={created ? CREATED_AT : undefined}
              firstMenu={<ScheduleRowMenu at={MENU_AT} editHover visible={menuOpen} />}
            />
          </PageLayer>
          <PageLayer visible={onDetail && !onRunChat}>
            <ScheduleDetailBody
              cardsFrom={DETAIL_AT}
              running={running}
              runs={running ? [RUN_ROW, ...SCHEDULE_RUNS] : SCHEDULE_RUNS}
              runRevealAt={running ? RUN_NOW_AT + 4 : undefined}
            />
          </PageLayer>
          <PageLayer visible={onRunChat}>
            <RunChatBody />
          </PageLayer>
        </div>
      </RyzeApp>
      <EditScheduleDialog
        at={DIALOG_AT}
        name={CREATED.name}
        task={SCHEDULE_TASK_TEXT}
        frequency="Every week"
        time="08:00"
        timezone="America/Los_Angeles"
        recipients={{ ...RECIPIENTS, emails }}
        addedEmailAt={RECIPIENT_AT}
        saved={frame >= SAVED_AT}
        visible={dialogOpen}
      />
      </div>
    </ShellOverrideProvider>
  );
};

export const GuideSchedules: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-schedules"
    title={{ title: "How to set up scheduled tasks", accent: "scheduled tasks" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);

import React from "react";
import { useReveal } from "../../../../core/motion";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "./schedules.css";
import {
  SCHEDULE_DETAIL_NAME,
  SCHEDULE_DETAIL_NEXT_RUN,
  SCHEDULE_DETAIL_REPEATS,
  SCHEDULE_RUNS,
  SCHEDULE_TASK_TEXT,
} from "./data";
import { ScheduleDetailCard } from "./detail-card";
import { ScheduleBackLink, ScheduleDetailHead } from "./detail-head";
import { ScheduleRuns } from "./runs-list";
import type { ScheduleRun } from "./types";

const CASCADE = 14;

export const ScheduleDetailBody: React.FC<{
  cardsFrom?: number;
  running?: boolean;
  runs?: ScheduleRun[];
  runRevealAt?: number;
}> = ({ cardsFrom, running, runs = SCHEDULE_RUNS, runRevealAt }) => {
  const settled = cardsFrom ?? -1e6;
  const head = useReveal(settled, 14);
  const instructions = useReveal(settled + CASCADE, 18);
  const repeats = useReveal(settled + CASCADE * 2, 18);
  const recent = useReveal(settled + CASCADE * 3, 18);
  return (
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <ScheduleBackLink />
          <ScheduleDetailHead
            name={SCHEDULE_DETAIL_NAME}
            running={running}
            style={head}
          />
          <ScheduleDetailCard title="Instructions" style={instructions}>
            <p className="sch-instructions" data-click="sch.instructions">
              {SCHEDULE_TASK_TEXT}
            </p>
          </ScheduleDetailCard>
          <ScheduleDetailCard
            title="Repeats"
            style={repeats}
            clickId="sch.repeats"
          >
            <p className="sch-repeats">{SCHEDULE_DETAIL_REPEATS}</p>
            <p className="sch-nextrun">{SCHEDULE_DETAIL_NEXT_RUN}</p>
          </ScheduleDetailCard>
          <ScheduleDetailCard
            title="Recent runs"
            style={recent}
            clickId="sch.runs"
          >
            <ScheduleRuns
              runs={runs}
              name={SCHEDULE_DETAIL_NAME}
              revealAt={runRevealAt}
            />
          </ScheduleDetailCard>
        </div>
      </div>
    </div>
  );
};

export const ScheduleDetailPage: React.FC<{
  cardsFrom?: number;
  running?: boolean;
  runs?: ScheduleRun[];
  runRevealAt?: number;
}> = ({ cardsFrom, running, runs = SCHEDULE_RUNS, runRevealAt }) => {
  const settled = cardsFrom ?? -1e6;
  const head = useReveal(settled, 14);
  const instructions = useReveal(settled + CASCADE, 18);
  const repeats = useReveal(settled + CASCADE * 2, 18);
  const recent = useReveal(settled + CASCADE * 3, 18);
  return (
    <RyzeApp
      workspace="ember-and-oak"
      page="Scheduled tasks"
      nav="Schedules"
      credits="4,180"
      stretch
    >
      <div className="pg">
        <div className="pg-scroll">
          <div className="pg-inner wide">
            <ScheduleBackLink />
            <ScheduleDetailHead
              name={SCHEDULE_DETAIL_NAME}
              running={running}
              style={head}
            />
            <ScheduleDetailCard title="Instructions" style={instructions}>
              <p className="sch-instructions" data-click="sch.instructions">
                {SCHEDULE_TASK_TEXT}
              </p>
            </ScheduleDetailCard>
            <ScheduleDetailCard
              title="Repeats"
              style={repeats}
              clickId="sch.repeats"
            >
              <p className="sch-repeats">{SCHEDULE_DETAIL_REPEATS}</p>
              <p className="sch-nextrun">{SCHEDULE_DETAIL_NEXT_RUN}</p>
            </ScheduleDetailCard>
            <ScheduleDetailCard
              title="Recent runs"
              style={recent}
              clickId="sch.runs"
            >
              <ScheduleRuns
                runs={runs}
                name={SCHEDULE_DETAIL_NAME}
                revealAt={runRevealAt}
              />
            </ScheduleDetailCard>
          </div>
        </div>
      </div>
    </RyzeApp>
  );
};

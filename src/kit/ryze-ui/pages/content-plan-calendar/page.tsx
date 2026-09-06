import React from "react";
import { RyzeApp } from "../../app-shell";
import "../../pages.css";
import "../content-plan/content-plan.css";
import "./content-plan-calendar.css";
import {
  CALENDAR_CHIP,
  CALENDAR_KPIS,
  CALENDAR_MONTH,
  CALENDAR_RANGE,
  CALENDAR_WEEK,
} from "./data";
import { CalendarKpis } from "./kpis";
import { CalendarPageHead } from "./page-head";
import { CalendarWeekGrid } from "./week-grid";

export const ContentPlanCalendarPage: React.FC = () => (
  <RyzeApp workspace="ember-and-oak" page="Content Plan" nav="SEO" stretch>
    <div className="pg">
      <div className="pg-scroll">
        <div className="pg-inner wide">
          <CalendarPageHead />
          <CalendarKpis items={CALENDAR_KPIS} />
          <CalendarWeekGrid
            week={CALENDAR_WEEK}
            month={CALENDAR_MONTH}
            range={CALENDAR_RANGE}
            chip={CALENDAR_CHIP}
          />
        </div>
      </div>
    </div>
  </RyzeApp>
);

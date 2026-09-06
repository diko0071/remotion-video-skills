import React from "react";
import "../../ryze-ui/pages/chat-artifact/chat-artifact.css";
import { ChartFigure } from "../results/chart";
import type { DashboardSpec, DashboardWidget } from "../types";

const Widget: React.FC<{ widget: DashboardWidget }> = ({ widget }) => (
  <div className="rd-card">
    <div className="rd-card-head">
      <h2 className="rd-widget-title">{widget.title}</h2>
    </div>
    <div className="rd-widget-body">
      <ChartFigure spec={widget.chart} />
    </div>
  </div>
);

export const DashboardArtifact: React.FC<{ dashboard: DashboardSpec }> = ({ dashboard }) => {
  const full = dashboard.widgets.filter((w) => !w.half);
  const half = dashboard.widgets.filter((w) => w.half);
  return (
    <div className="ca-frame">
      <div className="ca-dash">
        <div className="rd-page">
          <header className="rd-card rd-head">
            <div>
              <h1>{dashboard.title}</h1>
              <div className="rd-context">{dashboard.context}</div>
            </div>
            <div className="rd-head-side">
              <div className="rd-pickers">
                {dashboard.pickers.map((p) => (
                  <span key={p} className="rd-picker-btn">
                    {p}
                    <span className="rd-chev" />
                  </span>
                ))}
              </div>
            </div>
          </header>

          <section className="rd-kpi-grid">
            {dashboard.kpis.map((k) => (
              <div key={k.label} className={k.hero ? "rd-card rd-kpi-hero" : "rd-card"}>
                <div className="rd-label">{k.label}</div>
                <div className="rd-value">{k.value}</div>
                <div className="rd-delta up">
                  {k.delta} {k.note ? <span className="rd-vs">{k.note}</span> : null}
                </div>
              </div>
            ))}
          </section>

          {full.map((w) => (
            <section key={w.title}>
              <Widget widget={w} />
            </section>
          ))}

          {half.length ? (
            <section className="rd-two-col">
              {half.map((w) => (
                <Widget key={w.title} widget={w} />
              ))}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
};

import React from "react";
import "../../pages.css";
import "./chat-artifact.css";
import { BucketsPlot } from "./buckets-plot";
import {
  BUCKET_WEEKS,
  CLICKS,
  IMPRESSIONS,
  KPIS,
  MOVERS,
  STRIKING,
  TREND_LABELS,
} from "./data";
import { TrendPlot } from "./trend-plot";
import { Kpi, Mover, Striking } from "./types";

export const DashboardArtifact: React.FC<{
  kpis?: Kpi[];
  movers?: Mover[];
  striking?: Striking[];
  clicks?: number[];
  impressions?: number[];
  trendLabels?: string[];
  bucketWeeks?: number[][];
  style?: React.CSSProperties;
}> = ({
  kpis = KPIS,
  movers = MOVERS,
  striking = STRIKING,
  clicks = CLICKS,
  impressions = IMPRESSIONS,
  trendLabels = TREND_LABELS,
  bucketWeeks = BUCKET_WEEKS,
  style,
}) => (
  <div className="ca-frame" style={style}>
    <div className="ca-dash">
      <div className="rd-page">
        <header className="rd-card rd-head">
          <div>
            <h1>Organic Traffic Overview</h1>
            <div className="rd-context">
              How your organic clicks, impressions and positions are moving
            </div>
          </div>
          <div className="rd-head-side">
            <div className="rd-pickers">
              <span className="rd-picker-btn">
                Last 28 days
                <span className="rd-chev" />
              </span>
              <span className="rd-picker-btn">
                ember-and-oak.com
                <span className="rd-chev" />
              </span>
            </div>
          </div>
        </header>

        <section className="rd-kpi-grid">
          {kpis.map((k) => (
            <div
              key={k.label}
              className={k.hero ? "rd-card rd-kpi-hero" : "rd-card"}
            >
              <div className="rd-label">{k.label}</div>
              <div className="rd-value">{k.value}</div>
              <div className="rd-delta up">
                {k.delta} <span className="rd-vs">vs prior 28d</span>
              </div>
            </div>
          ))}
        </section>

        <section className="rd-card">
          <div className="rd-card-head">
            <h2 className="rd-widget-title">
              Clicks and impressions, 90-day trend
            </h2>
            <div className="rd-legend">
              <span>
                <i style={{ background: "var(--rd-chart-1)" }} />
                Clicks
              </span>
              <span>
                <i style={{ background: "var(--rd-chart-2)" }} />
                Impressions
              </span>
            </div>
          </div>
          <div className="rd-widget-body">
            <TrendPlot
              clicks={clicks}
              impressions={impressions}
              labels={trendLabels}
            />
          </div>
        </section>

        <section className="rd-two-col">
          <div className="rd-card">
            <div className="rd-card-head">
              <h2 className="rd-widget-title">
                Query counts by position bucket, 12 weeks
              </h2>
              <div className="rd-legend">
                <span>
                  <i style={{ background: "var(--rd-chart-1)" }} />
                  1–3
                </span>
                <span>
                  <i style={{ background: "var(--rd-chart-2)" }} />
                  4–10
                </span>
                <span>
                  <i style={{ background: "var(--rd-chart-3)" }} />
                  11–20
                </span>
                <span>
                  <i style={{ background: "var(--rd-chart-4)" }} />
                  21+
                </span>
              </div>
            </div>
            <div className="rd-widget-body">
              <BucketsPlot weeks={bucketWeeks} />
            </div>
          </div>
          <div className="rd-card">
            <div className="rd-card-head">
              <h2 className="rd-widget-title">
                Biggest query swings, winners and losers
              </h2>
            </div>
            <div className="rd-widget-body">
              <table className="rd-table">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th className="num">Clicks</th>
                    <th className="num">Δ Clicks</th>
                    <th className="num">Δ Position</th>
                  </tr>
                </thead>
                <tbody>
                  {movers.map((m) => (
                    <tr key={m.q}>
                      <td className="rd-row-name">{m.q}</td>
                      <td className="num">{m.clicks}</td>
                      <td
                        className={
                          m.dc.startsWith("-") ? "num rd-down" : "num rd-up"
                        }
                      >
                        {m.dc}
                      </td>
                      <td
                        className={
                          m.dp.startsWith("-") ? "num rd-down" : "num rd-up"
                        }
                      >
                        {m.dp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="rd-card" data-click="dash.queries-table">
          <div className="rd-card-head">
            <h2 className="rd-widget-title">
              Queries at 4–10 with clicks left on the table
            </h2>
          </div>
          <div className="rd-widget-body">
            <table className="rd-table">
              <thead>
                <tr>
                  <th>Query</th>
                  <th className="num">Pos</th>
                  <th className="num">Impr</th>
                  <th className="num">Clicks</th>
                  <th className="num">Clicks left</th>
                </tr>
              </thead>
              <tbody>
                {striking.map((s) => (
                  <tr key={s.q}>
                    <td className="rd-row-name">{s.q}</td>
                    <td className="num">{s.pos}</td>
                    <td className="num">{s.impr}</td>
                    <td className="num">{s.clicks}</td>
                    <td className="num rd-up">{s.left}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </div>
);

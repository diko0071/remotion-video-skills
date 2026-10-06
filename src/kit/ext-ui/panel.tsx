import "./ext.css";
import React from "react";
import { Easing, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/PlusJakartaSans";
import { ramp, SPRINGS, springAt } from "../../core/motion";
import type { Bar, ExtSchedule, ExtTab, ExtTabSchedule, ExtView, Metric } from "./types";

const { fontFamily } = loadFont();

export const EXT_ASSETS = {
  sun: "chrome-ext/icons/sun-white.png",
  chatgpt: "chrome-ext/icons/ai/chatgpt.png",
  google: "chrome-ext/icons/ai/google.svg",
  perplexity: "chrome-ext/icons/ai/perplexity.png",
  claude: "chrome-ext/icons/ai/claude.png",
  gemini: "chrome-ext/icons/ai/gemini.png",
  grok: "chrome-ext/icons/ai/grok.png",
} as const;
const ASSISTANTS = [EXT_ASSETS.chatgpt, EXT_ASSETS.google, EXT_ASSETS.perplexity, EXT_ASSETS.claude, EXT_ASSETS.gemini];

const GAUGE = { size: 96, ticks: 36, inner: 30, outer: 46 } as const;
const CHART = { width: 440, gap: 6, height: 120, sparkHeight: 72, axisHeight: 22, labelBaseline: 6, minBar: 2, radius: 4, dotRadius: 4 } as const;
const COUNT = 14;
const SCROLL_LEN = 13;

const compact = (n: number) => (n >= 999.5 ? `${(n / 1000).toFixed(n >= 9995 ? 0 : 1)}K` : String(n));
const fmt = (n: number) => (n >= 999_500 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 100_000 ? `${Math.round(n / 1000)}K` : n.toLocaleString("en-US"));
const easeOut = Easing.out(Easing.cubic);

const useRise = (at: number, distance = 14) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = springAt(frame, fps, at, SPRINGS.card, 22);
  return { opacity: ramp(frame, at, at + 5), transform: `translateY(${(1 - s) * distance}px)` };
};

const Rise: React.FC<{ at: number; distance?: number; className?: string; style?: React.CSSProperties; children: React.ReactNode }> = ({ at, distance, className, style, children }) => {
  const rise = useRise(at, distance);
  return (
    <div className={className} style={{ ...rise, ...style }}>
      {children}
    </div>
  );
};

const PopIn: React.FC<{ at: number; className?: string; style?: React.CSSProperties; clickId?: string; children: React.ReactNode }> = ({ at, className, style, clickId, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = springAt(frame, fps, at, SPRINGS.pop, 20);
  return (
    <span className={className} data-click={clickId} style={{ display: "inline-flex", opacity: ramp(frame, at, at + 4), transform: `scale(${0.6 + 0.4 * s})`, ...style }}>
      {children}
    </span>
  );
};

const Count: React.FC<{ value: number; at: number; dur?: number; suffix?: string }> = ({ value, at, dur = COUNT, suffix }) => {
  const frame = useCurrentFrame();
  const n = Math.round(value * ramp(frame, at, at + dur, easeOut));
  return (
    <>
      {fmt(n)}
      {suffix}
    </>
  );
};

const Logo: React.FC<{ src: string }> = ({ src }) => (
  <span className="logo-img">
    <Img src={staticFile(src)} />
  </span>
);

const LogoStack: React.FC = () => (
  <span className="stack-logos">
    {ASSISTANTS.map((a) => (
      <Logo key={a} src={a} />
    ))}
  </span>
);

const Svg: React.FC<{ d: string; size?: number }> = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

export const Gauge: React.FC<{ value: number; at: number; size?: number; instant?: boolean; step?: number; anchor?: string }> = ({ value, at, size = GAUGE.size, instant = false, step = 1, anchor }) => {
  const frame = useCurrentFrame();
  const cx = GAUGE.size / 2;
  const filled = Math.round((Math.max(0, Math.min(100, value)) / 100) * GAUGE.ticks);
  return (
    <svg className="gauge" viewBox={`0 0 ${GAUGE.size} ${GAUGE.size}`} width={size} height={size} style={{ flex: "0 0 auto" }} data-click={anchor}>
      {Array.from({ length: GAUGE.ticks }, (_, i) => {
        const a = -Math.PI / 2 + (i / GAUGE.ticks) * Math.PI * 2;
        const on = i < filled && (instant ? frame >= at : frame >= at + i * step);
        return <line key={i} className={`tick${on ? " on" : ""}`} stroke={on ? "#0F172A" : "#e8e3d8"} strokeWidth={3.5} strokeLinecap="round" x1={cx + GAUGE.inner * Math.cos(a)} y1={cx + GAUGE.inner * Math.sin(a)} x2={cx + GAUGE.outer * Math.cos(a)} y2={cx + GAUGE.outer * Math.sin(a)} />;
      })}
    </svg>
  );
};

const Delta: React.FC<{ change: number | null; at: number }> = ({ change, at }) => {
  if (change === null || change === 0) return <PopIn at={at} className="d dim">0%</PopIn>;
  const up = change > 0;
  return (
    <PopIn at={at} className={`d ${up ? "up" : "down"}`}>
      {up ? "▲" : "▼"} {Math.abs(change)}%
    </PopIn>
  );
};

const MetricRow: React.FC<{ icon: React.ReactNode; label: string; metric: Metric; at: number; countAt?: number; dur?: number }> = ({ icon, label, metric, at, countAt, dur = COUNT }) => (
  <Rise at={at} className="mrow" distance={10}>
    <span className="k">
      {icon}
      <span>{label}</span>
    </span>
    <span className="r">
      <Count value={metric.value} at={(countAt ?? at) + 2} dur={dur} />
      <Delta change={metric.change} at={(countAt ?? at) + dur + 2} />
    </span>
  </Rise>
);

const MonthlyBars: React.FC<{ bars: Bar[]; at: number; step?: number }> = ({ bars, at, step = 3 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const n = Math.max(1, bars.length);
  const max = Math.max(1, ...bars.map((b) => b.value));
  const w = (CHART.width - CHART.gap * (n - 1)) / n;
  const plot = CHART.height - CHART.axisHeight;
  return (
    <svg viewBox={`0 0 ${CHART.width} ${CHART.height}`} width="100%" height={CHART.height}>
      {bars.map((b, i) => {
        const s = springAt(frame, fps, at + i * step, SPRINGS.pop, 22);
        const h = Math.max(CHART.minBar, (b.value / max) * (plot - CHART.radius)) * s;
        const x = i * (w + CHART.gap);
        const last = i === n - 1;
        return (
          <g key={i}>
            <rect x={x} y={plot - h} width={w} height={h} rx={CHART.radius} fill={b.on ? "#0F172A" : "#94A3B8"} opacity={b.partial && !b.on ? 0.4 : 1} />
            {b.show ? (
              <text className="ax" x={last ? x + w : x + w / 2} y={CHART.height - CHART.labelBaseline} textAnchor={last ? "end" : "middle"} style={{ fontFamily }} opacity={ramp(frame, at + i * step + 6, at + i * step + 12)}>
                {b.label}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};

const Spark: React.FC<{ monthly: number[]; at: number; len: number }> = ({ monthly, at, len }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pad = 8;
  const max = Math.max(1, ...monthly);
  const min = Math.min(...monthly);
  const span = Math.max(1, max - min);
  const pts = monthly.map((v, i) => [pad + (i / Math.max(1, monthly.length - 1)) * (CHART.width - pad * 2), pad + (1 - (v - min) / span) * (CHART.sparkHeight - pad * 2)] as const);
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${CHART.sparkHeight} L${pts[0][0].toFixed(1)},${CHART.sparkHeight} Z`;
  const p = ramp(frame, at, at + len, easeOut);
  const dot = springAt(frame, fps, at + len - 2, SPRINGS.pop, 18);
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${CHART.width} ${CHART.sparkHeight}`} width="100%" height={CHART.sparkHeight}>
      <defs>
        <clipPath id="ext-spark-clip">
          <rect x={0} y={0} width={pad + p * (CHART.width - pad * 2) + 2} height={CHART.sparkHeight} />
        </clipPath>
      </defs>
      <path d={area} fill="#0F172A" fillOpacity={0.08} clipPath="url(#ext-spark-clip)" />
      <path d={line} fill="none" stroke="#1E293B" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <circle cx={last[0]} cy={last[1]} r={CHART.dotRadius * dot} fill="#0F172A" />
    </svg>
  );
};

const ChartCard: React.FC<{ label: string; value: number; at: number; unit?: string; axis?: [string, string]; axisAt?: number; countAt?: number; children: React.ReactNode }> = ({ label, value, at, unit, axis, axisAt, countAt, children }) => (
  <Rise at={at} className="chart">
    <div className="top">
      <span className="l">{label}</span>
      <span className="v">
        <Count value={value} at={(countAt ?? at) + 4} dur={countAt === undefined ? 20 : 8} />
        {unit ? <small>{unit}</small> : null}
      </span>
    </div>
    {children}
    {axis ? (
      <Rise at={axisAt ?? at} className="ax" distance={0}>
        <span>{axis[0]}</span>
        <span>{axis[1]}</span>
      </Rise>
    ) : null}
  </Rise>
);

const Section: React.FC<{ title: string; sub: string; icon?: React.ReactNode; at: number }> = ({ title, sub, icon, at }) => (
  <Rise at={at} className="sec">
    <div className="t">
      {icon}
      <span>{title}</span>
    </div>
    <div className="s">{sub}</div>
  </Rise>
);

const useScroll = (steps: Array<{ at: number; by: number }>) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return steps.reduce((sum, s) => sum + s.by * springAt(frame, fps, s.at, SPRINGS.card, SCROLL_LEN + 8), 0);
};

export type ExtParts = 0 | 1 | 2;

const TABS: Array<{ id: ExtTab; label: string; x: number; w: number }> = [
  { id: "overview", label: "Overview", x: 16, w: 68 },
  { id: "questions", label: "Questions", x: 100, w: 72 },
  { id: "sources", label: "Sources", x: 188, w: 58 },
];

const QuestionsView: React.FC<{ view: ExtView; q: ExtTabSchedule }> = ({ view, q }) => {
  const first = view.questionList[0];
  return (
    <div className="body">
      <Rise at={q.hero} className="box">
        <div className="hero">
          <span className="tile">
            <Img src={staticFile(EXT_ASSETS.chatgpt)} />
          </span>
          <div className="t">
            <div className="a">{view.questions} questions</div>
            <div className="b">Biggest: “{first?.question}”</div>
          </div>
          <div className="n">
            <div className="v">{compact(view.askVolume)}</div>
            <div className="u">AI asks / mo</div>
          </div>
        </div>
      </Rise>
      <div className="stats">
        {[
          ["Questions", String(view.questions)],
          ["Asks / mo", compact(view.askVolume)],
          ["Last seen", view.lastSeen],
        ].map(([l, v], i) => (
          <Rise key={l} at={q.stats + i * 3} className="stat">
            <div className="l">{l}</div>
            <div className="v">{v}</div>
          </Rise>
        ))}
      </div>
      <Section at={q.list - 4} title="Top questions" sub="By monthly AI asks" />
      <div className="list">
        {view.questionList.slice(0, 8).map((m, i) => (
          <Rise key={m.question} at={q.list + i * 2} className="item" distance={6}>
            <div className="t">
              <div className="a">{m.question}</div>
            </div>
            <span className="v">
              {fmt(m.volume)}
              <small>/ mo</small>
            </span>
          </Rise>
        ))}
      </div>
    </div>
  );
};

const SourcesView: React.FC<{ view: ExtView; q: ExtTabSchedule }> = ({ view, q }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const max = Math.max(1, ...view.citedWith.map((s) => s.mentions));
  return (
    <div className="body">
      <Rise at={q.hero} className="box">
        <div className="hero">
          <span className="tile">
            <Img src={staticFile(view.favicon)} />
          </span>
          <div className="t">
            <div className="a">{view.domain}</div>
            <div className="b">Homepage</div>
          </div>
          <div className="n">
            <div className="v">{view.homepageMentions}</div>
            <div className="u">answers</div>
          </div>
        </div>
      </Rise>
      <div className="stats two">
        {[
          ["Cited pages", compact(view.citedPagesTotal)],
          ["Answers", compact(view.linkedAnswers)],
        ].map(([l, v], i) => (
          <Rise key={l} at={q.stats + i * 3} className="stat">
            <div className="l">{l}</div>
            <div className="v">{v}</div>
          </Rise>
        ))}
      </div>
      <Section at={q.list - 4} title="Cited alongside" sub={`Domains that share answers with ${view.domain}`} />
      <Rise at={q.list} className="hbars">
        {view.citedWith.map((s, i) => {
          const p = springAt(frame, fps, q.list + 2 + i * 2, SPRINGS.card, 22);
          return (
            <div key={s.key} className="hb">
              <span className="tile">
                <Img src={staticFile(s.favicon)} />
              </span>
              <span className="nm">{s.key}</span>
              <span className="tr">
                <i style={{ width: `${(s.mentions / max) * 100 * p}%` }} />
              </span>
              <span className="n">{fmt(s.mentions)}</span>
            </div>
          );
        })}
      </Rise>
    </div>
  );
};

export const ExtPanel: React.FC<{ view: ExtView; t: ExtSchedule; scroll: Array<{ at: number; by: number }>; parts?: ExtParts; gaugeInstant?: boolean; tab?: ExtTab; questions?: ExtTabSchedule; sources?: ExtTabSchedule; overviewAt?: number; numbersAt?: number }> = ({ view, t, scroll, parts = 2, gaugeInstant = false, tab = "overview", questions, sources, overviewAt, numbersAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const offset = useScroll(scroll);
  const back = overviewAt !== undefined && frame >= overviewAt;
  const onQuestions = !back && tab === "questions" && questions !== undefined && frame >= questions.tabAt;
  const onSources = !back && tab === "sources" && sources !== undefined && frame >= sources.tabAt;
  const active = onSources ? TABS[2] : onQuestions ? TABS[1] : TABS[0];
  const sched = onSources ? sources : questions;
  const barS = back && overviewAt !== undefined ? 1 - springAt(frame, fps, overviewAt, SPRINGS.card, 18) : sched ? springAt(frame, fps, sched.tabAt, SPRINGS.card, 18) : 0;
  const fromTab = back ? (tab === "sources" ? TABS[2] : TABS[1]) : active;
  const barX = onQuestions || onSources || back ? TABS[0].x + (fromTab.x - TABS[0].x) * barS : TABS[0].x;
  const barW = onQuestions || onSources || back ? TABS[0].w + (fromTab.w - TABS[0].w) * barS : TABS[0].w;
  const gaugeAt = numbersAt ?? t.gauge;
  const countDur = numbersAt !== undefined ? 8 : COUNT;
  const score = Math.round(view.rating * ramp(frame, gaugeAt, gaugeAt + (numbersAt !== undefined ? 10 : gaugeInstant ? 1 : 34), easeOut));
  const boxIn = springAt(frame, fps, t.rating, SPRINGS.card, 24);
  return (
    <div className="ext" style={{ fontFamily }}>
      <Img className="tex" src={staticFile("chrome-ext/sidebar-bg.webp")} />
      <Rise at={t.head} className="head" distance={-8}>
        <span className="logo">
          <Img src={staticFile(EXT_ASSETS.sun)} />
        </span>
        <span className="name">Ryze AI</span>
        <span className="ic"><Svg d="M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" size={18} /></span>
        <span className="ic"><Svg d="M18 6 6 18M6 6l12 12" size={18} /></span>
      </Rise>
      <div className="frame">
        <div className="tabs">
          {TABS.map((item, i) => (
            <PopIn key={item.id} at={t.tabs + i * 3} className={item.id === active.id ? "on" : ""} style={{ display: "inline-block" }} clickId={`ext.tab.${item.id}`}>
              {item.label}
            </PopIn>
          ))}
          <div className="bar" style={{ left: barX, width: barW, opacity: ramp(frame, t.tabs, t.tabs + 4) }} />
        </div>
        <div className="scroll" style={{ transform: `translateY(${-offset}px)` }}>
          {onQuestions && questions ? <QuestionsView view={view} q={questions} /> : null}
          {onSources && sources ? <SourcesView view={view} q={sources} /> : null}
          <div className="body" style={{ display: parts === 0 || onQuestions || onSources ? "none" : undefined }}>
            <div className="box" style={{ opacity: ramp(frame, t.rating, t.rating + 5), transform: `translateY(${(1 - boxIn) * 18}px) scale(${0.96 + 0.04 * boxIn})` }}>
              <div className="rating">
                <span data-click="ext.gauge" style={{ display: "inline-flex", width: 96, height: 96, flex: "0 0 auto" }}><Gauge value={view.rating} at={gaugeAt} instant={gaugeInstant} /></span>
                <div className="t">
                  <Rise at={t.rating + 3} className="site" distance={8}>
                    <span className="tile">
                      <Img src={staticFile(view.favicon)} />
                    </span>
                    <span>{view.domain}</span>
                  </Rise>
                  <div className="score" style={{ opacity: ramp(frame, gaugeAt, gaugeAt + 6) }}>
                    {score}
                    <small>/ 100</small>
                  </div>
                </div>
              </div>
              <Rise at={t.metrics} className="metrics" distance={12}>
                <div className="cap">{view.period} · vs month before</div>
                <MetricRow icon={<Logo src={EXT_ASSETS.chatgpt} />} label="ChatGPT cites" metric={view.chatgpt} at={t.rows[0]} countAt={numbersAt} dur={countDur} />
                <MetricRow icon={<Logo src={EXT_ASSETS.google} />} label="AI Overviews" metric={view.aio} at={t.rows[1]} countAt={numbersAt === undefined ? undefined : numbersAt + 2} dur={countDur} />
                <MetricRow icon={<LogoStack />} label="AI asks" metric={view.asks} at={t.rows[2]} countAt={numbersAt === undefined ? undefined : numbersAt + 4} dur={countDur} />
              </Rise>
            </div>
            {parts >= 2 ? (
            <>
            <Rise at={t.analyze} className="btn">
              <span className="ic"><Svg d="m9 18 6-6-6-6" size={14} /></span>
              Analyze in Ryze AI
            </Rise>
            <Section at={t.chatgpt} title="ChatGPT" sub="Answers that link to the site" icon={<Logo src={EXT_ASSETS.chatgpt} />} />
            <ChartCard at={t.chatgpt + 4} label={view.chatgptBars.last} value={view.chatgptBars.value} countAt={numbersAt}>
              <MonthlyBars bars={view.chatgptBars.bars} at={numbersAt ?? t.chatgpt + 8} step={numbersAt !== undefined ? 1 : 3} />
            </ChartCard>
            <Section at={t.aio} title="Google AI Overviews" sub="AI Overviews that link to the site · all countries" icon={<Logo src={EXT_ASSETS.google} />} />
            <ChartCard at={t.aio + 4} label={view.aioBars.last} value={view.aioBars.value} countAt={numbersAt === undefined ? undefined : numbersAt + 2}>
              <MonthlyBars bars={view.aioBars.bars} at={numbersAt === undefined ? t.aio + 8 : numbersAt + 2} step={numbersAt !== undefined ? 1 : 2} />
            </ChartCard>
            <Section at={t.brand} title={`AI asks for “${view.brand}”`} sub="People asking AI about the brand by name · US" icon={<LogoStack />} />
            <ChartCard at={t.brand + 4} label="AI asks per month" value={view.brandTrend.volume} unit="/ mo" axis={view.brandTrend.axis} axisAt={numbersAt === undefined ? t.brand + 30 : -100} countAt={numbersAt === undefined ? undefined : numbersAt + 4}>
              <Spark monthly={view.brandTrend.monthly} at={numbersAt === undefined ? t.brand + 8 : numbersAt + 4} len={numbersAt === undefined ? 28 : 12} />
            </ChartCard>
            <Section at={t.explore} title="Explore" sub="Where the numbers come from" />
            <div className="teasers">
              <Rise at={t.explore + 4} className="teaser">
                <div className="h">
                  <span>Questions</span>
                  <Svg d="m9 18 6-6-6-6" />
                </div>
                <div className="n">
                  <Count value={view.questions} at={numbersAt === undefined ? t.explore + 6 : numbersAt + 6} dur={numbersAt === undefined ? COUNT : 8} />
                </div>
              </Rise>
              <Rise at={t.explore + 8} className="teaser">
                <div className="h">
                  <span>Sources</span>
                  <Svg d="m9 18 6-6-6-6" />
                </div>
                <div className="fan">
                  {view.sourceFavicons.slice(0, 3).map((src, i) => (
                    <PopIn key={src} at={t.explore + 12 + i * 3} className="sq" style={{ left: i * 20, transform: `rotate(${[-8, -1, 7][i]}deg)` }}>
                      <Img src={staticFile(src)} />
                    </PopIn>
                  ))}
                </div>
              </Rise>
            </div>
            </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="foot">
        <div className="cta">
          <div className="t">
            <span className="a">Connect Ryze to Claude &amp; Grok Bot</span>
            <span className="b">One click, your marketing team in the chat</span>
          </div>
          <div className="links">
            <span>
              <Img src={staticFile(EXT_ASSETS.claude)} />
            </span>
            <span>
              <Img src={staticFile(EXT_ASSETS.grok)} />
            </span>
          </div>
        </div>
        <div className="legal">
          <span>Twitter</span>
          <span className="dot">·</span>
          <span>Log out</span>
          <span className="dot">·</span>
          <span>Terms</span>
          <span className="dot">·</span>
          <span>Privacy</span>
        </div>
      </div>
    </div>
  );
};

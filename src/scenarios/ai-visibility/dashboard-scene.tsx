import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { PageFrame } from "../../kit/page-frame";
import { RyzeApp } from "../../kit/ryze-ui/app-shell";
import { D } from "./timings";

const INK = "#0f172a";
const RED = "#e11d48";
const GREEN = "#059669";
const MUTED = "#8a8377";
const BORDER = "#e7e1d4";


type Mood = "red" | "green";

const MOODS = {
  red: {
    accent: RED,
    score: 23,
    scoreLabel: "LOW · CRITICAL",
    weekPill: "▼ 4 this week",
    weekTone: RED,
    mentions: "3 of 24 answers mention you",
    questionsAsked: "8,412",
    trendSub: "Yankee Candle keeps taking your questions",
    youPath: "M0,50 L44,56 L88,48 L132,60 L176,55 L220,68 L264,60 L308,74 L352,66 L396,82 L440,76 L484,92 L528,86 L572,101 L620,98",
    youEndY: 98,
    youLabel: "you · 23",
    compLabel: "Yankee · 61",
    compTop: -4,
    youTop: "44%",
    share: "8%",
    shareTone: RED,
    donut: [
      { label: "Yankee Candle", pct: "38%", color: INK, len: 141, off: 0, w: 19 },
      { label: "Brooklyn Candle", pct: "23%", color: "#5b6472", len: 85, off: -145, w: 19 },
      { label: "Others", pct: "31%", color: "#b6bcc6", len: 100, off: -234, w: 19 },
      { label: "Ember & Oak", pct: "8%", color: RED, len: 29, off: -338, w: 27 },
    ],
    youLegend: RED,
    button: { text: "Fix with Agent", badge: "7 fixes ready", badgeBg: RED },
    platforms: [
      { name: "ChatGPT", logo: "ai/chatgpt.png", asked: 6, hits: 1, chip: "INVISIBLE", tone: RED, bars: [24, 20, 23, 15, 17, 9, 7] },
      { name: "Claude", logo: "ai/claude.png", asked: 5, hits: 1, chip: "FLAT", tone: INK, bars: [16, 18, 15, 18, 15, 17, 16] },
      { name: "Perplexity", logo: "ai/perplexity.webp", asked: 5, hits: 2, chip: "RISING", tone: GREEN, bars: [8, 10, 9, 15, 17, 23, 27] },
      { name: "Gemini", logo: "ai/gemini.png", asked: 4, hits: 0, chip: "INVISIBLE", tone: RED, bars: [14, 11, 13, 9, 10, 7, 6] },
      { name: "AI Overviews", logo: "ai/google.svg", asked: 4, hits: 0, chip: "INVISIBLE", tone: RED, bars: [19, 16, 17, 11, 12, 8, 7] },
    ],
    questions: [
      { q: "best hand-poured candles", vol: "1.9k/mo", hits: {} as Record<number, string> },
      { q: "candle gift sets under $50", vol: "2.4k/mo", hits: { 2: "#4" } },
      { q: "soy candles that smell like a cabin", vol: "880/mo", hits: {} },
      { q: "non-toxic candles for apartments", vol: "1.2k/mo", hits: {} },
      { q: "long-burning candles worth it", vol: "640/mo", hits: { 1: "#6" } },
      { q: "ember & oak reviews", vol: "210/mo", hits: { 0: "#1", 2: "#2" } },
    ],
    revenueTitle: "Revenue from AI recommendations",
    revenueSub: <>Competitors take an estimated <b style={{ color: INK }}>$53k/mo</b> of AI-driven sales in your niche</>,
    tag: { text: <>You’re leaving <b style={{ fontWeight: 800 }}>$8,200/mo</b> on the table</>, bg: "rgba(225,29,72,0.08)", color: RED },
    revenue: [
      { label: "Yankee", sub: "Candle", val: "$34k", h: 160, color: INK },
      { label: "Brooklyn", sub: "Candle", val: "$19k", h: 90, color: "#5b6472" },
      { label: "You", sub: "today", val: "$2.1k", h: 11, color: RED },
      { label: "You", sub: "after fixes", val: "$11.4k", h: 54, color: "ghost" },
    ],
  },
  green: {
    accent: GREEN,
    score: 99,
    scoreLabel: "EXCELLENT",
    weekPill: "▲ 12 this week",
    weekTone: GREEN,
    mentions: "23 of 24 answers mention you",
    questionsAsked: "9,914",
    trendSub: "You overtook Yankee Candle three weeks ago",
    youPath: "M0,112 L44,108 L88,102 L132,96 L176,88 L220,82 L264,72 L308,66 L352,56 L396,50 L440,42 L484,38 L528,32 L572,28 L620,22",
    youEndY: 22,
    youLabel: "you · 99",
    compLabel: "Yankee · 61",
    compTop: 56,
    youTop: -4,
    share: "41%",
    shareTone: GREEN,
    donut: [
      { label: "Ember & Oak", pct: "41%", color: GREEN, len: 152, off: 0, w: 27 },
      { label: "Yankee Candle", pct: "24%", color: INK, len: 89, off: -156, w: 19 },
      { label: "Brooklyn Candle", pct: "14%", color: "#5b6472", len: 52, off: -249, w: 19 },
      { label: "Others", pct: "21%", color: "#b6bcc6", len: 66, off: -305, w: 19 },
    ],
    youLegend: GREEN,
    button: { text: "Agent monitoring", badge: "0 issues", badgeBg: GREEN },
    platforms: [
      { name: "ChatGPT", logo: "ai/chatgpt.png", asked: 6, hits: 6, chip: "RANKED #1", tone: GREEN, bars: [7, 10, 13, 17, 21, 25, 28] },
      { name: "Claude", logo: "ai/claude.png", asked: 5, hits: 5, chip: "RANKED #1", tone: GREEN, bars: [9, 12, 15, 18, 21, 24, 27] },
      { name: "Perplexity", logo: "ai/perplexity.webp", asked: 5, hits: 5, chip: "RANKED #1", tone: GREEN, bars: [12, 15, 17, 20, 22, 25, 28] },
      { name: "Gemini", logo: "ai/gemini.png", asked: 4, hits: 3, chip: "RISING", tone: GREEN, bars: [5, 8, 10, 14, 17, 21, 24] },
      { name: "AI Overviews", logo: "ai/google.svg", asked: 4, hits: 4, chip: "RANKED #2", tone: GREEN, bars: [6, 9, 12, 16, 19, 23, 26] },
    ],
    questions: [
      { q: "best hand-poured candles", vol: "1.9k/mo", hits: { 0: "#1", 1: "#2", 2: "#1", 3: "#3", 4: "#2" } as Record<number, string> },
      { q: "candle gift sets under $50", vol: "2.4k/mo", hits: { 0: "#2", 1: "#1", 2: "#1", 3: "#4", 4: "#3" } },
      { q: "soy candles that smell like a cabin", vol: "880/mo", hits: { 0: "#1", 1: "#1", 2: "#2", 4: "#1" } },
      { q: "non-toxic candles for apartments", vol: "1.2k/mo", hits: { 0: "#3", 1: "#2", 2: "#4", 3: "#2", 4: "#5" } },
      { q: "long-burning candles worth it", vol: "640/mo", hits: { 0: "#2", 1: "#1", 2: "#3", 4: "#2" } },
      { q: "ember & oak reviews", vol: "210/mo", hits: { 0: "#1", 1: "#1", 2: "#1", 3: "#1", 4: "#1" } },
    ],
    revenueTitle: "Revenue from AI recommendations",
    revenueSub: <>You now take <b style={{ color: INK }}>$21.8k/mo</b> of AI-driven sales — the biggest share in your niche</>,
    tag: { text: <>Up <b style={{ fontWeight: 800 }}>+$19,700/mo</b> since the fixes</>, bg: "rgba(5,150,105,0.1)", color: GREEN },
    revenue: [
      { label: "You", sub: "today", val: "$21.8k", h: 160, color: GREEN },
      { label: "Yankee", sub: "Candle", val: "$18k", h: 128, color: INK },
      { label: "Brooklyn", sub: "Candle", val: "$9k", h: 62, color: "#5b6472" },
      { label: "You", sub: "next quarter", val: "$30k", h: 210, color: "ghost" },
    ],
  },
};

type DashData = (typeof MOODS)[Mood];

const card: React.CSSProperties = {
  background: "#fff",
  border: `1px solid ${BORDER}`,
  borderRadius: 4.2,
  boxShadow: "0 1px 2px rgba(36,29,22,0.04)",
};

const kLabel: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: MUTED,
};

const Rise: React.FC<{ at?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({
  children,
  style,
}) => <div style={style}>{children}</div>;

const Gauge: React.FC<{ d: DashData }> = ({ d }) => {
  const p = 1;
    const ticks = [];
  for (let i = 0; i <= 20; i++) {
    const a = Math.PI * (1 + i / 20);
    const r1 = 96;
    const r2 = i % 5 === 0 ? 87 : 91;
    ticks.push(
      <line
        key={i}
        x1={140 + r1 * Math.cos(a)}
        y1={150 + r1 * Math.sin(a)}
        x2={140 + r2 * Math.cos(a)}
        y2={150 + r2 * Math.sin(a)}
      />,
    );
  }
  return (
    <Rise style={{ ...card, padding: "16px 22px 12px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ ...kLabel, alignSelf: "flex-start" }}>Visibility score</div>
      <div style={{ position: "relative", width: 280, height: 166, marginTop: 2 }}>
        <svg width={280} height={166} viewBox="0 0 280 168">
          <g stroke="#ddd6c6" strokeWidth={2}>{ticks}</g>
          <path d="M 30 150 A 110 110 0 0 1 250 150" fill="none" stroke="#efe9db" strokeWidth={16} strokeLinecap="round" />
          <path
            d="M 30 150 A 110 110 0 0 1 250 150"
            fill="none"
            stroke={d.accent}
            strokeWidth={16}
            strokeLinecap="round"
            strokeDasharray={`${346 * (d.score / 100) * p} 346`}
          />
          <text x={30} y={166} fontSize={11} fill={MUTED} fontWeight={600}>0</text>
          <text x={236} y={166} fontSize={11} fill={MUTED} fontWeight={600}>100</text>
        </svg>
        <div style={{ position: "absolute", left: 0, right: 0, top: 66, textAlign: "center" }}>
          <div style={{ fontSize: 66, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums", color: INK }}>
            {Math.round(d.score * p)}
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "0.14em", color: d.accent, marginTop: 2 }}>
            {d.scoreLabel}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 6, fontSize: 13, color: MUTED, alignItems: "center" }}>
        <span style={{ background: d.weekTone === GREEN ? "rgba(5,150,105,0.1)" : "rgba(225,29,72,0.08)", color: d.weekTone, borderRadius: 999, padding: "4px 12px", fontSize: 13, fontWeight: 700 }}>
          {d.weekPill}
        </span>
        <span>{d.mentions}</span>
      </div>
    </Rise>
  );
};

const TREND_COMP = "M0,40 L88,34 L176,42 L264,33 L352,38 L440,28 L528,33 L620,24";

const Trend: React.FC<{ d: DashData }> = ({ d }) => {
  const draw = 1;
  const labels = 1;
  const L = 900;
  return (
    <Rise style={{ ...card, padding: "16px 22px", position: "relative", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 800, color: INK }}>Visibility — last 30 days</div>
          <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{d.trendSub}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={kLabel}>Questions asked</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: INK }}>
            {d.questionsAsked}<span style={{ fontSize: 12, color: MUTED, fontWeight: 600 }}>/mo</span>
          </div>
        </div>
      </div>
      <div style={{ position: "relative", marginTop: 14 }}>
        <svg width="100%" height={150} viewBox="0 0 620 150" preserveAspectRatio="none">
          <g stroke="#f1ece1">
            <line x1={0} y1={30} x2={620} y2={30} />
            <line x1={0} y1={70} x2={620} y2={70} />
            <line x1={0} y1={110} x2={620} y2={110} />
          </g>
          <path d={d.youPath} fill="none" stroke={d.accent} strokeWidth={3} strokeLinejoin="round" strokeDasharray={L} strokeDashoffset={L - L * draw} />
          <path d={TREND_COMP} fill="none" stroke={INK} strokeWidth={2.5} strokeDasharray="7 5" opacity={0.85 * draw} />
          <circle cx={620} cy={d.youEndY} r={4.5} fill={d.accent} opacity={labels} />
        </svg>
        <div style={{ position: "absolute", right: 8, top: d.youTop, opacity: labels, background: "#fff", borderRadius: 3, padding: "4px 10px", fontSize: 13, fontWeight: 800, color: d.accent, boxShadow: "0 4px 12px rgba(36,29,22,0.12)" }}>
          {d.youLabel}
        </div>
        <div style={{ position: "absolute", right: 8, top: d.compTop, opacity: labels, background: "#fff", borderRadius: 3, padding: "4px 10px", fontSize: 13, fontWeight: 800, color: INK, boxShadow: "0 4px 12px rgba(36,29,22,0.12)" }}>
          {d.compLabel}
        </div>
      </div>
    </Rise>
  );
};

const Donut: React.FC<{ d: DashData }> = ({ d }) => {
  const p = 1;
  return (
    <Rise style={{ ...card, padding: "16px 22px", display: "flex", flexDirection: "column", width: 390 }}>
      <div style={kLabel}>Share of AI voice — your niche</div>
      <div style={{ display: "flex", alignItems: "center", gap: 22, flex: 1 }}>
        <div style={{ position: "relative", width: 150, height: 150, flexShrink: 0 }}>
          <svg width={150} height={150} viewBox="0 0 150 150" style={{ transform: "rotate(-90deg)" }}>
            <circle cx={75} cy={75} r={59} fill="none" stroke="#efe9db" strokeWidth={13} />
            {d.donut.map((seg, i) => (
              <circle
                key={i}
                cx={75}
                cy={75}
                r={59}
                fill="none"
                stroke={seg.color}
                strokeWidth={seg.w}
                strokeDasharray={`${seg.len * p} 371`}
                strokeDashoffset={seg.off}
              />
            ))}
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: d.shareTone }}>{d.share}</div>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: MUTED, letterSpacing: "0.06em" }}>YOUR SHARE</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
          {d.donut.map((li) => (
            <div key={li.label} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 14, color: li.label === "Ember & Oak" ? d.youLegend : INK, fontWeight: li.label === "Ember & Oak" ? 800 : 500 }}>
              <span style={{ width: 11, height: 11, borderRadius: 3, background: li.color, flexShrink: 0 }} />
              {li.label}
              <b style={{ marginLeft: "auto", fontSize: 15 }}>{li.pct}</b>
            </div>
          ))}
        </div>
      </div>
    </Rise>
  );
};

const PlatCard: React.FC<{ plat: DashData["platforms"][number] }> = ({ plat }) => {
  const grow = 1;
  const chipBg = plat.tone === RED ? "rgba(225,29,72,0.09)" : plat.tone === GREEN ? "rgba(5,150,105,0.1)" : "rgba(15,23,42,0.07)";
  const shown = plat.hits;
  return (
    <Rise style={{ ...card, padding: "16px 18px", display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Img src={staticFile(plat.logo)} style={{ width: 44, height: 44, objectFit: "contain", flexShrink: 0 }} />
        <span style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.2, paddingTop: 2, color: INK }}>
          {plat.name}
          <small style={{ display: "block", fontSize: 11, color: MUTED, fontWeight: 600, marginTop: 2 }}>{plat.asked} questions</small>
        </span>
        <span style={{ marginLeft: "auto", fontSize: 10.5, fontWeight: 800, letterSpacing: "0.05em", borderRadius: 999, padding: "4px 9px", background: chipBg, color: plat.tone }}>
          {plat.chip}
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
        <b style={{ fontSize: 30, fontWeight: 800, lineHeight: 1, fontVariantNumeric: "tabular-nums", color: INK }}>{shown}</b>
        <span style={{ fontSize: 12.5, color: MUTED, fontWeight: 600 }}>/ {plat.asked} answers</span>
      </div>
      <div style={{ height: 34, display: "flex", alignItems: "flex-end", gap: 5 }}>
        {plat.bars.map((h, i) => (
          <i
            key={i}
            style={{
              flex: 1,
              height: h * grow,
              borderRadius: "2px 2px 0 0",
              background: plat.tone,
              opacity: i === plat.bars.length - 1 ? 1 : 0.8,
            }}
          />
        ))}
      </div>
    </Rise>
  );
};

const Heatmap: React.FC<{ d: DashData }> = ({ d }) => {
  return (
    <Rise style={{ ...card, overflow: "hidden", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 20px", borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>What customers ask · where you show up</div>
        <div style={{ display: "flex", gap: 14, fontSize: 12, color: MUTED, alignItems: "center" }}>
          <span><span style={{ display: "inline-block", width: 9, height: 9, borderRadius: 2, marginRight: 5, background: GREEN }} />Top mention</span>
          <span><span style={{ display: "inline-block", width: 9, height: 9, borderRadius: 2, marginRight: 5, background: "rgba(5,150,105,0.35)" }} />Mentioned</span>
          <span><span style={{ display: "inline-block", width: 9, height: 9, borderRadius: 2, marginRight: 5, background: "#e8e2d4" }} />Missing</span>
        </div>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ fontSize: 11, fontWeight: 700, color: MUTED, padding: "9px 8px 9px 20px", borderBottom: `1px solid ${BORDER}`, textAlign: "left", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Customer question
            </th>
            {d.platforms.map((pl) => (
              <th key={pl.name} style={{ fontSize: 12, fontWeight: 700, color: INK, padding: "9px 8px", borderBottom: `1px solid ${BORDER}`, textAlign: "center" }}>
                <Img src={staticFile(pl.logo)} style={{ width: 22, height: 22, verticalAlign: -6, marginRight: 6, objectFit: "contain" }} />
                {pl.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {d.questions.map((row) => (
            <tr key={row.q}>
              <td style={{ padding: "9px 8px 9px 20px", borderBottom: "1px solid #f4efe4", fontWeight: 700, fontSize: 14, color: INK }}>
                {row.q}
                <span style={{ color: MUTED, fontWeight: 500, fontSize: 11.5, marginLeft: 8 }}>{row.vol}</span>
              </td>
              {d.platforms.map((_, c) => {
                const on = true;
                const hit = (row.hits as Record<number, string>)[c];
                const top = hit === "#1";
                return (
                  <td key={c} style={{ padding: 8, borderBottom: "1px solid #f4efe4", textAlign: "center" }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 48,
                        height: 26,
                        borderRadius: 3,
                        fontWeight: 800,
                        fontSize: 13,
                        opacity: on ? 1 : 0,
                        transform: on ? "none" : "translateY(8px)",
                        background: hit ? (top ? GREEN : "rgba(5,150,105,0.12)") : "#f6f2ea",
                        color: hit ? (top ? "#fff" : GREEN) : "#c7beac",
                        boxShadow: top && on ? "0 4px 10px rgba(5,150,105,0.35)" : undefined,
                      }}
                    >
                      {hit ?? "—"}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Rise>
  );
};

const RevenueBars: React.FC<{ d: DashData }> = ({ d }) => {
  const grow = 1;
  const tag = 1;
  return (
    <Rise style={{ ...card, padding: "18px 24px", display: "flex", flexDirection: "column", height: 330, flexShrink: 0 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>{d.revenueTitle}</div>
<div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{d.revenueSub}</div>
        </div>
        <div style={{ background: d.tag.bg, color: d.tag.color, borderRadius: 3, padding: "8px 14px", fontSize: 14, fontWeight: 600, whiteSpace: "nowrap", opacity: tag, transform: `scale(${interpolate(tag, [0, 1], [0.85, 1])})` }}>
          {d.tag.text}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-around", gap: 24, padding: "10px 30px 0" }}>
        {d.revenue.map((bar) => (
          <div key={bar.label + bar.sub} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flex: 1, maxWidth: 150 }}>
            <div style={{ fontSize: 21, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: bar.color === "ghost" ? GREEN : bar.color === RED || bar.color === GREEN ? bar.color : INK }}>
              {bar.val}
            </div>
            <div
              style={{
                width: "100%",
                height: Math.max(2, bar.h * grow),
                borderRadius: "3px 3px 0 0",
                background: bar.color === "ghost" ? "rgba(5,150,105,0.15)" : bar.color,
                border: bar.color === "ghost" ? `2.5px dashed ${GREEN}` : undefined,
              }}
            />
            <div style={{ fontSize: 12, color: MUTED, textAlign: "center", lineHeight: 1.3 }}>
              <b style={{ display: "block", color: INK, fontSize: 13 }}>{bar.label}</b>
              {bar.sub}
            </div>
          </div>
        ))}
      </div>
    </Rise>
  );
};

const DashboardContent: React.FC<{ mood?: Mood }> = ({ mood = "red" }) => {
  const d = MOODS[mood];
  return (
  <div style={{ padding: "22px 32px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 26, fontWeight: 800, color: INK, display: "flex", alignItems: "center", gap: 12 }}>
          AI Visibility
          <span style={{ fontSize: 11, fontWeight: 700, color: GREEN, background: "rgba(5,150,105,0.09)", borderRadius: 999, padding: "4px 10px", letterSpacing: "0.04em" }}>
            ● CHECKED 7:00 AM
          </span>
        </div>
        <div style={{ fontSize: 14, color: MUTED, marginTop: 3 }}>Where customers meet your store inside AI assistants.</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: INK,
          color: "#fff",
          borderRadius: 3,
          padding: "13px 20px",
          fontSize: 15,
          fontWeight: 700,
          boxShadow: "0 10px 28px rgba(15,23,42,0.22)",
        }}
      >
        {d.button.text}
        <span style={{ background: d.button.badgeBg, color: "#fff", borderRadius: 999, fontSize: 12, fontWeight: 800, padding: "2px 9px" }}>{d.button.badge}</span>
        →
      </div>
    </div>
    <div style={{ display: "flex", gap: 14 }}>
      <Gauge d={d} />
      <Trend d={d} />
      <Donut d={d} />
    </div>
    <div style={{ display: "flex", gap: 14 }}>
      {d.platforms.map((plat) => (
        <PlatCard key={plat.name} plat={plat} />
      ))}
    </div>
    <Heatmap d={d} />
    <RevenueBars d={d} />
  </div>
  );
};

export const DashboardPage: React.FC = () => (
  <PageFrame height={1620}>
    <RyzeApp workspace="emberandoak" stretch>
      <DashboardContent />
    </RyzeApp>
  </PageFrame>
);

export const DashboardGreenPage: React.FC = () => (
  <PageFrame height={1620}>
    <RyzeApp workspace="emberandoak" stretch>
      <DashboardContent mood="green" />
    </RyzeApp>
  </PageFrame>
);

export const DashboardScene: React.FC = () => {
  const sc = useSpringAt(D.scrollAt, SPRINGS.smooth, 34);
  const scrollY = D.scrollDist * sc;
  return (
    <AbsoluteFill>
      <RyzeApp workspace="emberandoak">
        <div style={{ height: "100%", overflow: "hidden" }}>
          <div style={{ transform: `translateY(${-scrollY}px)` }}>
            <DashboardContent />
          </div>
        </div>
      </RyzeApp>
    </AbsoluteFill>
  );
};

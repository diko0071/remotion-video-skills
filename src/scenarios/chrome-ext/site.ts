import data from "./data.json";
import more from "./sites.json";
import type { Bar, ExtView, Metric } from "../../kit/ext-ui";

type MonthPoint = { year: number; month: number; mentions: number; volume: number };
type Overview = { rating?: number; metrics: { mentions: number; volume: number; sources: { key: string; mentions: number }[] }; history: MonthPoint[] };
type Summary = { total: number; lastSeen: string | null; pagesTotal: number; pages: { key: string; mentions: number }[]; questions: { question: string; volume: number; seenAt: string }[] };
type Entry = { chatgpt: Overview; google: Overview; summary?: Summary; volumes?: Record<string, { volume: number; monthly: number[] }> };
const EMPTY_SUMMARY: Summary = { total: 0, lastSeen: null, pagesTotal: 0, pages: [], questions: [] };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const NOW = { year: 2026, month: 9 };
const FAVICONS: Record<string, string> = { "notion.so": "notion", "clickup.com": "clickup", "hubspot.com": "hubspot", "reddit.com": "reddit", "atlassian.com": "atlassian", "microsoft.com": "microsoft", "asana.com": "asana", "trello.com": "trello", "techradar.com": "techradar", "monday.com": "monday", "slack.com": "slack", "stripe.com": "stripe", "shopify.com": "shopify", "figma.com": "figma", "canva.com": "canva", "airbnb.com": "airbnb", "webflow.com": "webflow", "linear.app": "linear", "zapier.com": "zapier" };

const shortDate = (iso: string) => {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  return m ? `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}` : "";
};

const favicon = (domain: string) => `chrome-ext/favicons/${FAVICONS[domain] ?? "notion"}.png`;

const fillGaps = (points: MonthPoint[]) =>
  points.map((p, i) => {
    if (p.mentions > 0 || i === 0 || i === points.length - 1) return p;
    const prev = points[i - 1];
    const next = points[i + 1];
    if (prev.mentions === 0 || next.mentions === 0) return p;
    return { ...p, mentions: Math.round((prev.mentions + next.mentions) / 2), volume: Math.round((prev.volume + next.volume) / 2) };
  });

const complete = (points: MonthPoint[]) => points.filter((p) => p.year * 12 + p.month < NOW.year * 12 + NOW.month);
const pct = (value: number, prev: number | null) => (prev === null || prev === 0 ? null : Math.round(((value - prev) / prev) * 100));
const label = (p: MonthPoint) => `${MONTHS[p.month - 1]} ${String(p.year).slice(2)}`;
const fullLabel = (p: MonthPoint) => `${MONTHS[p.month - 1]} ${p.year}`;

const metric = (points: MonthPoint[]): Metric => {
  const done = complete(points);
  const last = done[done.length - 1];
  const prev = done[done.length - 2];
  return { value: last?.mentions ?? 0, change: last ? pct(last.mentions, prev ? prev.mentions : null) : null };
};

const bars = (points: MonthPoint[]) => {
  const done = complete(points);
  const last = done[done.length - 1];
  const n = points.length;
  const list: Bar[] = points.map((p, i) => {
    const on = last !== undefined && p.year === last.year && p.month === last.month;
    const isLast = i === n - 1;
    const nextToOn = [points[i - 1], points[i + 1]].some((q) => q && last && q.year === last.year && q.month === last.month);
    return { label: label(p), value: p.mentions, on, partial: isLast, show: on || (isLast && !nextToOn) || (i % 2 === 1 && !(n % 2 === 1 && i === n - 2) && !nextToOn) };
  });
  return { last: last ? fullLabel(last) : "No full month yet", value: last?.mentions ?? 0, bars: list };
};

export const siteView = (domain: string): ExtView => {
  const entry = ({ ...(more as Record<string, Entry>), ...(data as Record<string, Entry>) })[domain];
  const summary = entry.summary ?? EMPTY_SUMMARY;
  const brand = domain.split(".")[0];
  const gpt = fillGaps(entry.chatgpt.history);
  const aio = fillGaps(entry.google.history);
  const g = complete(gpt);
  const a = complete(aio);
  const gl = g[g.length - 1];
  const gp = g[g.length - 2];
  const al = a[a.length - 1];
  const ap = a[a.length - 2];
  const asks = (gl?.volume ?? 0) + (al?.volume ?? 0);
  const asksPrev = gp || ap ? (gp?.volume ?? 0) + (ap?.volume ?? 0) : null;
  const trend = entry.volumes?.[brand] ?? { volume: 0, monthly: Array.from({ length: 12 }, () => 0) };
  const monthly = trend.monthly;
  const endM = ((NOW.month - 2 + 12) % 12) + 1;
  const endY = NOW.month - 1 <= 0 ? NOW.year - 1 : NOW.year;
  const startIndex = endY * 12 + endM - (monthly.length - 1);
  const startY = Math.floor((startIndex - 1) / 12);
  const startM = ((startIndex - 1) % 12) + 1;
  return {
    domain,
    brand: brand.charAt(0).toUpperCase() + brand.slice(1),
    favicon: favicon(domain),
    rating: entry.chatgpt.rating ?? 0,
    cites: entry.chatgpt.metrics.mentions,
    period: gl ? fullLabel(gl) : "No full month yet",
    chatgpt: metric(gpt),
    aio: metric(aio),
    asks: { value: asks, change: pct(asks, asksPrev) },
    chatgptBars: bars(gpt),
    aioBars: bars(aio),
    brandTrend: { volume: trend.volume, monthly, axis: [`${MONTHS[startM - 1]} ${startY}`, `${MONTHS[endM - 1]} ${endY}`] },
    questions: summary.total,
    questionList: summary.questions.slice(0, 12).map((q) => ({ question: q.question, volume: q.volume })),
    askVolume: entry.chatgpt.metrics.volume,
    lastSeen: shortDate(summary.questions.map((q) => q.seenAt).sort().pop() ?? ""),
    sourceFavicons: entry.chatgpt.metrics.sources.filter((s) => !s.key.endsWith(domain) && FAVICONS[s.key]).slice(0, 3).map((s) => favicon(s.key)),
    homepageMentions: summary.pages.find((p) => p.key === domain)?.mentions ?? 0,
    citedPagesTotal: summary.pagesTotal,
    linkedAnswers: summary.total,
    citedWith: entry.chatgpt.metrics.sources.filter((s) => !s.key.endsWith(brand + ".so") && !s.key.endsWith(brand + ".com") && FAVICONS[s.key]).slice(0, 6).map((s) => ({ key: s.key, mentions: s.mentions, favicon: favicon(s.key) })),
  };
};

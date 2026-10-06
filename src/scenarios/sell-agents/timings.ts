import type { CamKey } from "../../core/stage";

export const GROUND = "#FDFDFD";
export const INK = "#171310";
export const GREY = "#8E8A84";
export const CORAL = "#C15F3C";
export const APP_BG = "#FDFAF3";

export const HOOK = { len: 138, line1: -8, flip: 46, flipLen: 12, line2: 64, out: [124, 138] as const, tile: 190 } as const;
export const SWARM = { len: 84, from: 4, first: 7, last: 1, count: 22, counterAt: 6, dim: [70, 84] as const } as const;
export const SHARE = { len: 96, count: [0, 18] as const, roll: 54, rollLen: 10 } as const;
export const CHECK = { len: 186, head: -6, headOut: [38, 48] as const, from: 42, first: 5, last: 1, pillAt: 128, suck: [160, 178] as const } as const;
export const CONNECT = { len: 54, line2: 16 } as const;
export const FIX = {
  len: 168,
  cursorIn: 2,
  click: 26,
  ringsFrom: 36,
  ringsTo: 88,
  checksFrom: 98,
  checkFirst: 10,
  checkLast: 4,
} as const;
export const TAIL = { dark: [0, 4] as const, lineAt: 6, line2At: 16, pillAt: 30, urlType: [32, 50] as const, end: 108, url: "ryze.ai/agents" } as const;

export const STARTS = (() => {
  const lens = [HOOK.len, SWARM.len, SHARE.len, CHECK.len, CONNECT.len, FIX.len, TAIL.end];
  return lens.reduce<number[]>((acc, _, i) => [...acc, i === 0 ? 0 : acc[i - 1] + lens[i - 1]], []);
})();
export const TOTAL = STARTS[6] + TAIL.end;

export const AGENTS = ["chrome-ext/icons/ai/chatgpt.png", "chrome-ext/icons/ai/claude.png", "chrome-ext/icons/ai/perplexity.png", "chrome-ext/icons/ai/gemini.png", "chrome-ext/icons/ai/grok.png"];

export const CAM_SWARM: readonly CamKey[] = [
  { at: 0, zoom: 1.02, x: 960, y: 560 },
  { at: SWARM.len, zoom: 1.16, x: 960, y: 600 },
];


export const ITEMS = [
  "Markdown version of pages", "llms.txt file", "Allow AI crawlers", "Prices in code", "API catalog file", "MCP server card", "security.txt file", "Public status page",
  "Agent-friendly checkout", "Works without JavaScript", "Content in raw HTML", "Question-style page titles", "Direct answer first", "FAQ schema", "Organization schema",
  "Product schema with prices", "Article schema", "Breadcrumb schema", "“Last updated” dates", "Clean XML sitemap", "IndexNow pings", "Canonical URLs", "No text in images",
  "Alt text everywhere", "HTML tables", "Readable stable URLs", "No login walls", "No blocking cookie walls", "No CAPTCHAs", "Public pricing", "Competitor comparison pages",
  "“When not to use”", "Founders and company facts", "Findable contact email", "Public API docs", "OpenAPI spec", "Agent-ready OAuth sign-in", "Public changelog",
];

import type { ChatTurn } from "../../../kit/chat";
import type { ArticleBodyBlock } from "../../../kit/ryze-ui/pages/article-editor/types";
import { ARTICLE_EDITOR_BODY } from "../../../kit/ryze-ui/pages/article-editor/data";

export const Q_REVENUE = "Where did our organic revenue come from last month?";
export const Q_BRAND = "Rewrite our tone of voice — warmer, more handmade";
export const Q_ARTICLE = "Shorten the intro";
export const Q_CREATIVE = "Make an autumn ad";
export const Q_SCHEDULE = "Send a performance recap every Monday";

export const REVENUE_TURN: ChatTurn = {
  prompt: Q_REVENUE,
  instant: true,
  reasoning: { seconds: 2 },
  tools: {
    summary: "Checked 3 sources",
    rows: [
      { name: "Google search console run raw search analytics" },
      { name: "Google analytics run report" },
      { name: "Shopify get shop summary" },
    ],
  },
  answer: [
    {
      kind: "p",
      text: "$11,900 in organic revenue last month — up 18%. Three quarters of it came from collection pages, and one query family, hand poured soy candles, drove $4,200 on its own.",
    },
  ],
  result: {
    kind: "chart",
    title: "Organic revenue by page group — last month",
    chart: {
      kind: "bar",
      data: [
        { group: "Collection pages", rev: 8900 },
        { group: "Product pages", rev: 1800 },
        { group: "Blog & guides", rev: 1200 },
      ],
      series: [{ key: "rev", label: "Revenue" }],
      xKey: "group",
      max: 9000,
      format: "usd",
      valueLabels: true,
    },
  },
};

export const NEW_VOICE =
  "Warm and handmade, like a note from the studio bench. We talk about wax under our fingernails, the crackle of a wooden wick, the hour a jar spends cooling by the window. Short sentences. Real details — burn hours, wax percentage, who poured it. Never luxury, never elevate; if a claim can't be checked, it doesn't ship. Discounts are mentioned once, quietly, like telling a friend.";

export const BRAND_TURN: ChatTurn = {
  prompt: Q_BRAND,
  instant: true,
  reasoning: { seconds: 1 },
  tools: { summary: "Updated your brand", rows: [{ name: "Update brand" }] },
  answer: [
    { kind: "p", text: "Rewritten — warmer, more studio-bench. It's live on the page." },
  ],
};

export const ARTICLE_TURN: ChatTurn = {
  prompt: Q_ARTICLE,
  instant: true,
  reasoning: { seconds: 1 },
  tools: { summary: "Edited the draft", rows: [{ name: "Update article" }] },
  answer: [{ kind: "p", text: "Trimmed the intro to one tight sentence." }],
};

export const CREATIVE_TURN: ChatTurn = {
  prompt: Q_CREATIVE,
  instant: true,
  reasoning: { seconds: 1 },
  tools: { summary: "Generated an ad creative", rows: [{ name: "Generate ad creative" }] },
  answer: [{ kind: "p", text: "One autumn cut, in your palette — saved to your library." }],
  result: {
    kind: "creatives",
    title: "Autumn set",
    items: [
      { file: "creatives/autumn-02.jpg", name: "the-autumn-set", caption: "Set shot, cream plate." },
    ],
  },
};

export const SCHEDULE_TURN: ChatTurn = {
  prompt: Q_SCHEDULE,
  instant: true,
  reasoning: { seconds: 1 },
  tools: { summary: "Created a scheduled task", rows: [{ name: "Create schedule" }] },
  answer: [
    {
      kind: "p",
      text: "Done — every Monday at 9:00 I'll run the recap and send it to your email.",
    },
  ],
};

export const SHORT_INTRO: ArticleBodyBlock[] = [
  {
    kind: "p",
    text: "A tunnelled candle burns a narrow shaft down the centre and wastes the wax you paid for.",
  },
  ...ARTICLE_EDITOR_BODY.slice(1),
];

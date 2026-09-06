# kit/chat — conversations as data

A conversation is `ChatTurn[]`. Nothing about a turn is hand-timed: every frame
mark is derived from the data by `timings.ts`, so adding a tool row or a longer
prompt re-times the turn automatically.

```
types.ts        the authoring contract (ChatTurn, ChatToolRun, ChatResult, ChatArtifact)
timings.ts      turnMarks / turnDuration / conversationMarks / conversationDuration
tool-run.tsx    the product's tool group: summary line + indented prettified rows + states
reasoning.tsx   "Thinking…" -> "Thought for Ns"
answer.tsx      markdown-ish answer blocks (p / bullets / heading, **bold** inline)
results/        one file per result kind: chart, creatives, proposal, metrics, article
artifacts/      panel bodies: browser (live site), dashboard, deck + the in-message card
turn.tsx        one turn: user bubble -> reasoning -> tools -> answer -> result -> artifact card
conversation.tsx the player: shell, typed composer, frozen history, auto-scroll, artifact panel
```

## Authoring a conversation

```tsx
import { ChatConversation, turnDuration, type ChatTurn } from "../../kit/chat";

export const TURNS: ChatTurn[] = [
  {
    prompt: "How did my campaigns do last week?",
    reasoning: { seconds: 4 },
    tools: {
      summary: "Checked Google Ads 2 times, checked Meta ads",
      rows: [
        { name: "google_ads__list_campaigns" },
        { name: "google_ads__run_report" },
        { name: "meta_ads__get_insights", state: "error", error: "Token expired" },
      ],
    },
    answer: [
      { kind: "p", text: "You spent **$9,000** and made back three and a half times that." },
      { kind: "bullets", items: ["Brand search earns the most", "TikTok the least"] },
    ],
    result: {
      kind: "chart",
      title: "Spend by campaign",
      chart: { kind: "bar", data: [{ label: "Brand", spend: 1260 }], series: [{ key: "spend", label: "Spend" }], max: 3600, format: "usd" },
    },
  },
];

export const FRAMES = TURNS.map(turnDuration);
export const Turn1: React.FC = () => (
  <ChatConversation title="Autumn Cabin — ads" turns={TURNS} active={0} />
);
```

## Rules

- `tools.rows[].name` is the RAW tool name. `prettifyToolName` (ported from
  `lib/utils/chat/tool-summary.ts`) turns it into the label, and the row renders
  `Running X` while it runs, `Ran X` once settled. `skill: true` switches to
  `Uploading Skill: X` / `Loaded Skill: X`.
- `tools.summary` is the line `summarizeToolRun` would produce
  ("Checked Google Search Console 2 times, checked Google Ads"). While tools are
  still running the group shows `Running <active tool>` instead, like the product.
- Row states: default settles to `done`; `state: "error"` settles destructive and
  prints `error` in a destructive block; `state: "running"` never settles.
- Chart kinds: `line`, `area`, `column` (vertical, stackable), `bar` (horizontal
  ranked), `donut`, `stat_list`, `table`. Palette is the product's
  `CHAT_CHART_PALETTE`.
- `artifact` on a turn puts the panel next to the chat and drops an artifact card
  into the message. Kinds: `browser` (real page content inside), `dashboard`,
  `deck`, `custom`.
- A scenario asks "how long is this turn" with `turnDuration(turn)`, and
  "how long is the whole thread" with `conversationDuration(turns)`.

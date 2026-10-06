export const GROUND = "#FDFDFD";
export const PROMPT = "Why did our purchases drop this week?";
export const TYPE_FROM = 8;
export const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT.length / 1.1);
export const SEND = TYPE_TO + 8;
export const BUBBLE_AT = SEND + 2;
export const RUN_AT = BUBBLE_AT + 8;

export type Status = { text: string; icon: string };
export const WORKING: Status = { text: "is working", icon: "\u{1F6E0}️" };
export const RYZE: Status = { text: "Checking Ryze", icon: "\u{1F4CA}" };
export const LANDING: Status = { text: "Checking landing page", icon: "\u{1F310}" };
export const GITHUB: Status = { text: "Checking GitHub", icon: "\u{1F4BB}" };
export const RESPONDING: Status = { text: "is responding", icon: "≡" };

export type Beat =
  | { kind: "status"; at: number; status: Status }
  | { kind: "message"; at: number; text: string; rate?: number };

export const BEATS: Beat[] = [
  { kind: "status", at: RUN_AT, status: WORKING },
  { kind: "status", at: RUN_AT + 40, status: RYZE },
  { kind: "status", at: RUN_AT + 230, status: RESPONDING },
  { kind: "message", at: RUN_AT + 238, text: "Pulled the last 14 days from Meta and your pixel. Spend, clicks and CTR are flat. Purchases fell 38% since Tuesday. People click and do not buy." },
  { kind: "status", at: RUN_AT + 350, status: RYZE },
  { kind: "status", at: RUN_AT + 600, status: RESPONDING },
  { kind: "message", at: RUN_AT + 608, text: "Interesting. Pixel purchases went to zero on Tuesday at 3:40 PM, while Meta still attributes some from its own data. Let me check the landing page." },
  { kind: "status", at: RUN_AT + 720, status: LANDING },
  { kind: "status", at: RUN_AT + 930, status: RESPONDING },
  { kind: "message", at: RUN_AT + 938, text: "Page loads. Add to cart works. Checkout works. Hmm. Let me check GitHub." },
  { kind: "status", at: RUN_AT + 1010, status: GITHUB },
  { kind: "status", at: RUN_AT + 1260, status: RESPONDING },
  { kind: "message", at: RUN_AT + 1268, text: "Found it. A deploy on Tuesday at 3:31 PM moved the thank-you page to a new template, and the Purchase pixel call is not in it. Orders did not drop. The tracking did. I can restore the event through Ryze and backfill the four missing days. Want me to?" },
];

export const IDLE_AT = RUN_AT + 1268 + 150;
export const TOTAL = IDLE_AT + 70;

export const ID = { send: "mu.send" };

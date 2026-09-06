export const FPS = 30;
export const S = 0.74;
export const GROUND = "#f4f7fb";

export const T = {
  windowIn: 14,
  typeFrom: 44,
  typeTo: 190,
  send: 202,
  reply: 222,
  pushHuddle: 282,
  cursorIn: 344,
  click: 418,
  dissolve: 432,
  tile2: 474,
  controls: 504,
  transcript: 562,
  dock: 662,
  hold: 704,
  white1: 762,
  beat1: 792,
  beat2: 862,
  beat3: 962,
  backToApp: 1082,
  pushTranscript: 1112,
  askRyze: 1202,
  ryzeReply: 1250,
  white2: 1318,
  endcard: 1336,
  lockup: 1410,
} as const;

export const TOTAL = 1490;

export const COPY = {
  typed: "Q4 launch brief is ready. Can we jam on the ad angles before Friday?",
  reply: "Yes. Huddle now?",
  lines: [
    { who: "sarah", text: "Okay so for Q4 I'd lead with the bundle offer, it did 3.1x last year." },
    { who: "dmitry", text: "Agreed. And a second angle around free shipping for the holiday crowd." },
    { who: "sarah", text: "Ryze, can you pull which angle won on Meta last quarter?" },
  ],
  ask: "@Ryze AI which ad angle won on Meta in Q3?",
  ryze: "Bundle offer won: 3.1x ROAS on $42k, vs 2.2x for free shipping. Want me to draft Q4 variations?",
  beats: [
    ["Huddle it out", "together."],
    ["Huddles,", "transcribed live."],
    ["Your agent", "follows along."],
  ],
  endcard: "Ryze AI is in the huddle.",
} as const;

import type { ChatTurn } from "../../../kit/chat";

export const SEED = "I want to create a creative. Recommend me something.";
export const ASK =
  "Four ads for our autumn collection — cosy, lived-in, wood and amber tones.";
export const WARMER = "Make the whole set warmer — more amber, less grey.";
export const TEMPLATE_SEED =
  "Here are some ads I love. Help me create something like these for my brand, and give me a few angles for how to run with them.";
export const COMPETITOR_SEED =
  "Help me iterate on this competitor ad — create my own version of it.";

export const AUTUMN = [
  { file: "creatives/autumn-01.jpg", name: "autumn-poured-slowly", caption: "Hero pour, dark plate headline." },
  {
    file: "creatives/autumn-02.jpg",
    name: "the-autumn-set",
    caption: "Set shot, cream plate, three scents.",
    annotateId: "crv.annotate",
  },
  { file: "creatives/autumn-03.jpg", name: "made-for-long-evenings", caption: "Lifestyle hold, amber plate." },
  { file: "creatives/autumn-04.jpg", name: "poured-by-hand", caption: "Studio table, founder proof." },
];

export const SEED_TURN: ChatTurn = {
  prompt: SEED,
  instant: true,
  reasoning: { seconds: 2 },
  tools: { summary: "Read your brand profile", rows: [{ name: "get_brand" }] },
  answer: [
    {
      kind: "p",
      text: "I can build a set around your autumn scents — amber jars, linen, warm light. What are we pushing, and do you have product photos I should use?",
    },
  ],
};

export const ASK_TURN: ChatTurn = {
  prompt: ASK,
  instant: true,
  attachments: ["product-1.jpg", "product-3.jpg"],
  reasoning: { seconds: 2 },
  tools: { summary: "Generated four ad creatives", rows: [{ name: "generate_ad_creative" }] },
  answer: [
    {
      kind: "p",
      text: "Four autumn cuts, built from your photos and brand palette. All saved to your library.",
    },
  ],
  result: { kind: "creatives", title: "Autumn collection — 4 variants", items: AUTUMN },
};

export const ANNOTATE_TURN: ChatTurn = {
  prompt:
    "Feedback on the circled areas:\n1) make the headline bigger\n2) swap this to the amber jar",
  instant: true,
  attachments: ["creatives/autumn-02.jpg"],
  reasoning: { seconds: 2 },
  tools: { summary: "Rebuilt that creative", rows: [{ name: "generate_ad_creative" }] },
  answer: [
    { kind: "p", text: "Headline scaled up, amber jar swapped in — everything else untouched." },
  ],
  result: {
    kind: "creatives",
    title: "Updated creative",
    tile: 340,
    items: [
      {
        file: "creatives/autumn-02-v2.jpg",
        name: "the-autumn-set-v2",
        caption: "Headline scaled up, amber jar swapped in.",
      },
    ],
  },
};

export const WARMER_TURN: ChatTurn = {
  prompt: WARMER,
  instant: true,
  reasoning: { seconds: 1 },
  tools: { summary: "Regenerated the set", rows: [{ name: "generate_ad_creative" }] },
  answer: [{ kind: "p", text: "Warmer grade across the set — amber lifted, greys pulled out." }],
  result: {
    kind: "creatives",
    title: "Warmer pass",
    items: [
      { file: "creatives/autumn-03.jpg", name: "autumn-warm-01", caption: "Warmer grade, amber lifted." },
      { file: "creatives/autumn-01.jpg", name: "autumn-warm-02", caption: "Same set, warmer light." },
    ],
  },
};

export const TEMPLATE_TURN: ChatTurn = {
  prompt: TEMPLATE_SEED,
  instant: true,
  attachments: ["ad-templates/homesick_top-1-22d.jpg", "ad-templates/otherland_top-2-107d.jpg"],
  reasoning: { seconds: 1 },
  tools: { summary: "Rebuilt both references for Ember & Oak", rows: [{ name: "generate_ad_creative" }] },
  answer: [
    {
      kind: "p",
      text: "Took both layouts and rebuilt them with your jars, your palette and your voice. Two angles: the memory hook, and the quiet-evening ritual.",
    },
  ],
  result: {
    kind: "creatives",
    title: "From your references",
    items: [
      { file: "creatives/gen-home.jpg", name: "smells-like-home", caption: "Memory hook, your palette." },
      { file: "creatives/gen-ritual.jpg", name: "the-evening-ritual", caption: "Ritual angle, quiet tone." },
    ],
  },
};

export const COMPETITOR_TURN: ChatTurn = {
  prompt: COMPETITOR_SEED,
  instant: true,
  attachments: ["comp-ads/yankee-living.jpg"],
  reasoning: { seconds: 1 },
  tools: { summary: "Generated your version", rows: [{ name: "generate_ad_creative" }] },
  answer: [
    {
      kind: "p",
      text: "Same promise — a room that smells finished — but in your amber-and-linen style, with your jar front and centre.",
    },
  ],
  result: {
    kind: "creatives",
    title: "Your version",
    items: [
      { file: "creatives/gen-room.jpg", name: "a-room-that-smells-finished", caption: "Their promise, your style." },
    ],
  },
};

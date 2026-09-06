import { generateImageToFile } from "../src/services/openai/client";

const BRAND =
  "Ad creative for 'Ember & Oak', a small-batch hand-poured soy candle studio from Portland. " +
  "Art direction copied from top DTC home-fragrance ad creatives (P.F. Candle Co., Otherland, Homesick): " +
  "warm amber glass jars with wooden lids, cream linen, oak table, real candle flame, cosy autumn light. " +
  "Palette: warm amber #C1763A, deep espresso #2B211A, cream #F6EFE4, muted sage. " +
  "Typography: clean confident sans-serif on FLAT solid color plates, small 'EMBER & OAK' wordmark. " +
  "Photorealistic product photography, honest editorial light. " +
  "NO purple, NO gradients, NO glow, no watermarks, no gibberish text.";

const JOBS: { file: string; prompt: string; size: "1024x1280" | "1024x1536" }[] = [
  {
    file: "public/creatives/autumn-01.jpg",
    prompt: `${BRAND} Vertical ad: three lit amber candles on an oak table by a window at golden hour, cream throw blanket behind. Flat espresso plate bottom-left with cream headline "AUTUMN, POURED SLOWLY" and small line "60-hour burn · soy wax".`,
    size: "1024x1280",
  },
  {
    file: "public/creatives/autumn-02.jpg",
    prompt: `${BRAND} Vertical ad: a stack of three closed amber jars with wooden lids on cream linen, one open jar showing wax, soft side light. Flat cream plate with espresso headline "THE AUTUMN SET" and small line "Three scents. One ritual.".`,
    size: "1024x1280",
  },
  {
    file: "public/creatives/autumn-03.jpg",
    prompt: `${BRAND} Vertical ad: hands holding a lit amber candle jar in a cosy living room, knit sweater sleeves, fireplace bokeh behind. Flat amber plate with cream headline "MADE FOR LONG EVENINGS".`,
    size: "1024x1280",
  },
  {
    file: "public/creatives/autumn-04.jpg",
    prompt: `${BRAND} Vertical ad: candle-making studio table flat lay — poured jars, wax flakes, wooden wicks, labels, warm daylight from a window. Flat espresso plate with cream headline "POURED BY HAND, IN PORTLAND".`,
    size: "1024x1280",
  },
  {
    file: "public/creatives/autumn-02-v2.jpg",
    prompt: `${BRAND} Vertical ad: a stack of three AMBER GLASS jars with wooden lids on cream linen, one open jar showing wax, soft side light. Flat cream plate with a VERY LARGE bold espresso headline "THE AUTUMN SET" filling most of the plate, small line under it "Three scents. One ritual.".`,
    size: "1024x1280",
  },
];

for (const job of JOBS) {
  const out = await generateImageToFile(job.prompt, job.file, { size: job.size as never });
  console.log("wrote", out);
}

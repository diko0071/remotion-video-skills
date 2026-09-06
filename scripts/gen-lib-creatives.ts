import { generateImageToFile } from "../src/services/openai/client";

const BRAND =
  "Ad creative for 'Ember & Oak', a small-batch hand-poured soy candle studio from Portland. " +
  "Art direction copied from top DTC home-fragrance ad creatives (P.F. Candle Co., Otherland, Homesick): " +
  "warm amber glass jars with wooden lids, cream linen, oak table, real candle flame, cosy autumn light. " +
  "Palette: warm amber #C1763A, deep espresso #2B211A, cream #F6EFE4, muted sage. " +
  "Typography: clean confident sans-serif on FLAT solid color plates, small 'EMBER & OAK' wordmark. " +
  "Photorealistic product photography, honest editorial light. " +
  "NO purple, NO gradients, NO glow, no watermarks, no gibberish text.";

const JOBS: { file: string; prompt: string }[] = [
  {
    file: "public/creatives/lib-01.jpg",
    prompt: `${BRAND} Vertical ad: slow pour of molten wax into an amber jar on a cabin table, fairy lights bokeh. Flat espresso plate top with cream headline "CABIN SEASON IS LIT" and small line "Hand-poured soy · Portland".`,
  },
  {
    file: "public/creatives/lib-02.jpg",
    prompt: `${BRAND} Vertical ad: single amber jar with wooden lid on cream linen, morning side light. Flat cream plate bottom with large espresso headline "AMBER & ASH" and small line "The story of a slow morning".`,
  },
  {
    file: "public/creatives/lib-03.jpg",
    prompt: `${BRAND} Square ad: gift trio of three amber jars in a kraft gift box with ribbon, sage sprigs. Flat amber plate with cream headline "THE GIFT TRIO — $89" and small line "Three scents, ready to give".`,
  },
  {
    file: "public/creatives/lib-04.jpg",
    prompt: `${BRAND} Vertical ad: open jar showing clean white soy wax and a wooden wick, macro detail. Flat sage plate with espresso headline "100% SOY. 0% NONSENSE." and three small checkmark lines "no paraffin · no dyes · 60-hr burn".`,
  },
  {
    file: "public/creatives/lib-05.jpg",
    prompt: `${BRAND} Vertical ad: bold graphic layout — black matte jar centered on flat amber background, hard shadow. VERY LARGE cream headline "LIGHT IT. LIVE IN IT." across the top, small CTA plate "Shop the drop".`,
  },
  {
    file: "public/creatives/lib-06.jpg",
    prompt: `${BRAND} Vertical ad: lifestyle photo of a person reading on a sofa, lit candle on the side table, evening warmth. Small flat espresso plate bottom-left with cream line "Your 8pm, upgraded" and tiny wordmark.`,
  },
  {
    file: "public/creatives/lib-07.jpg",
    prompt: `${BRAND} Vertical ad: two amber jars with a kraft delivery box, one jar tipped against it. Flat cream plate with espresso headline "NEVER RUN OUT" and small line "Subscribe & save 15%", small CTA button plate "Start ritual".`,
  },
  {
    file: "public/creatives/lib-08.jpg",
    prompt: `${BRAND} Vertical ad: big numeric layout — flat espresso background, huge cream number "60" with small "hour burn" under it, single lit amber candle photo inset bottom-right. Small line "Twice the evenings per jar".`,
  },
  {
    file: "public/creatives/lib-09.jpg",
    prompt: `${BRAND} Vertical ad: founder's hands labelling a jar at the studio bench, wax flakes and tools around. Flat cream plate with espresso headline "POURED BY TWO HANDS" and small line "Small batch #214, made this week".`,
  },
  {
    file: "public/creatives/lib-10.jpg",
    prompt: `${BRAND} Vertical ad: holiday teaser — amber jar with a sprig of fir and a single warm string light, deep espresso backdrop. Flat amber plate with cream headline "THE WINTER POUR IS COMING" and small line "Early access for subscribers".`,
  },
];

for (const job of JOBS.slice(5)) {
  const out = await generateImageToFile(job.prompt, job.file, { size: "1024x1536" as never });
  console.log("wrote", out);
}

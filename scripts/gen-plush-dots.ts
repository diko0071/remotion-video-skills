import { existsSync } from "node:fs";
import path from "node:path";
import { editImageToFile, generateImageToFile } from "../src/services/openai/client";

const DIR = "public/plush-dots";
const MODEL = process.env.O_MODEL ?? "gpt-image-2.5-sunburst";

const DOTS: Record<string, { shape: string; color: string; extra: string }> = {
  hero: { shape: "a perfectly round ball", color: "lime green (#B6EE3A)", extra: "no accessories at all" },
  boxer: { shape: "a chunky cube with very soft, rounded corners and edges", color: "bright orange (#FF7A1A)", extra: "wearing a white terry-cloth sweatband around its forehead" },
  builder: { shape: "an egg shape that is wider at the bottom", color: "cobalt blue (#2D6BFF)", extra: "wearing a small glossy yellow construction hard hat on top" },
  skater: { shape: "a small soft pebble shape, slightly wider than tall", color: "mint teal (#2EC4B6)", extra: "wearing a red baseball cap turned backwards" },
  star: { shape: "a soft five-pointed star with very rounded, puffy points", color: "bubblegum pink (#FF6FB5)", extra: "wearing a small white satin bow on its top point" },
};

const SHAPED: Record<string, { ref: string; color: string }> = {
  sun: { ref: "references/ryze-sun/silhouette.png", color: "warm sunny orange-gold (#FF9F1C)" },
};

const shapedPrompt = (d: { color: string }) =>
  `Turn this exact black silhouette into a single cute plush toy character for an animated product film: a sun made of soft fuzzy felt with fine visible fur fibers, solid vivid ${d.color} color. Keep the silhouette exactly: the round body and every one of the thick wobbly rays with their uneven lengths and directions, nothing added or removed. The rays are soft puffy stuffed felt with rounded tips. Soft studio lighting from the upper left, gentle ambient occlusion where the rays meet the body, premium 3D render. The face is completely blank: no eyes, no mouth, no nose, no cheeks. No text, no logo, no ground shadow, no background elements. Isolated on a transparent background, centered, front view, the character fills about 85% of the frame.`;

const prompt = (d: { shape: string; color: string; extra: string }) =>
  `A single cute plush toy character for an animated product film, ${d.shape}, made of soft fuzzy felt with fine visible fur fibers, solid vivid ${d.color} color, ${d.extra}. Soft studio lighting from the upper left, gentle ambient occlusion, premium 3D render. The face is completely blank: no eyes, no mouth, no nose, no cheeks. No text, no logo, no ground shadow, no background elements. Isolated on a transparent background, centered, front view, the character fills about 80% of the frame.`;

const run = async () => {
  const jobs = Object.entries(DOTS).filter(([name]) => process.argv.includes("--force") || !existsSync(path.join(DIR, `${name}.png`)));
  const shaped = Object.entries(SHAPED).filter(([name]) => process.argv.includes("--force") || !existsSync(path.join(DIR, `${name}.png`)));
  await Promise.all([
    ...jobs.map(async ([name, d]) => {
      const out = path.join(DIR, `${name}.png`);
      await generateImageToFile(prompt(d), out, { model: MODEL, size: "1024x1024", quality: "high", background: "transparent" });
      console.log(`saved ${out}`);
    }),
    ...shaped.map(async ([name, d]) => {
      const out = path.join(DIR, `${name}.png`);
      await editImageToFile(shapedPrompt(d), [d.ref], out, { model: MODEL, size: "1024x1024", quality: "high", background: "transparent" });
      console.log(`saved ${out}`);
    }),
  ]);
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

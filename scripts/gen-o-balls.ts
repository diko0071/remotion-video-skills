import { existsSync } from "node:fs";
import path from "node:path";
import { generateImageToFile } from "../src/services/openai/client";

const DIR = "public/glyph-balls";
const MODEL = process.env.O_MODEL ?? "gpt-image-2.5-sunburst";

const BALLS: Record<string, string> = {
  o: "soft warm white (#EDEDED)",
  blue: "vivid royal blue (#0868F0)",
  green: "vivid green (#10D048)",
  purple: "vivid violet purple (#8838F0)",
  orange: "vivid orange (#F06820)",
  dark: "deep charcoal black (#26282C)",
  sky: "bright sky blue (#57A0FF)",
  lime: "vivid lime green (#B6EE3A)",
};

const prompt = (color: string) =>
  `A single perfectly round 3D ball, solid ${color} color, soft-touch satin plastic material like a premium toy, one soft specular highlight at the upper left, gentle ambient occlusion toward the bottom edge, soft studio lighting from the top left, clean product render. No face, no eyes, no mouth, no text, no logo, no pattern, no ground shadow, no background elements. Isolated on a transparent background, centered, the ball fills about 80% of the frame.`;

const run = async () => {
  const jobs = Object.entries(BALLS).filter(([name]) => process.argv.includes("--force") || !existsSync(path.join(DIR, `ball-${name}.png`)));
  await Promise.all(
    jobs.map(async ([name, color]) => {
      const out = path.join(DIR, `ball-${name}.png`);
      await generateImageToFile(prompt(color), out, { model: MODEL, size: "1024x1024", quality: "high", background: "transparent" });
      console.log(`saved ${out}`);
    }),
  );
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

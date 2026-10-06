import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { editImageToFile } from "../src/services/openai/client";

const DIR = "public/managed-campaigns/ads";
const MODEL = process.env.O_MODEL ?? "gpt-image-2.5-sunburst";
const REFS = ["public/prompt-to-meta/brand/fishwife-product.jpg", "public/prompt-to-meta/gen/c2.jpg"];

const SCENES: Record<string, string> = {
  a01: "the sardine tin standing on a sunny saturated yellow background with lemon halves, big bold headline at the top: 'Tinned fish, but make it gold.'",
  a02: "overhead flat lay of a wooden board with sourdough toast topped with sardines, capers and lemon, the open tin beside it, headline at the top: 'Lunch in 3 minutes.'",
  a03: "a hand holding the open sardine tin at a sunny beach, sea in the background, headline at the top: 'Beach snack, upgraded.'",
  a04: "the smoked salmon tin on a candle-lit table with two glasses of red wine and crackers, headline at the top: 'Date night, sorted.'",
  a05: "casual phone photo of a kitchen counter with five tins stacked, a handwritten paper note reading 'Restocked!' stuck to the cabinet, natural window light",
  a06: "split image, left a sad plastic desk salad, right a plate of sardine toast with the tin, headline across the top: 'Your desk lunch called.'",
  a07: "an open kraft gift box with tins, red ribbon and tissue paper, headline at the top: 'The gift foodies actually want.'",
  a08: "eight tins arranged in a neat grid on a teal background, top-down, headline at the top: 'Pick your tin.'",
  a09: "extreme close-up of a fork lifting smoked salmon out of the black and gold tin, headline at the top: 'Smoked salmon, but make it gold.'",
  a10: "overhead picnic blanket in the park with bread, olives, a bottle of white wine and two open tins, headline at the top: 'Picnic hero.'",
  a11: "the tins on a bright tomato red background, a white sticker badge reading 'Free shipping over $50', headline at the top: 'Stock the pantry.'",
  a12: "a cast iron skillet of spaghetti with sardines, lemon zest and parsley, the open tin beside it, headline at the top: 'Weeknight pasta hero.'",
  a13: "a canvas tote bag at a farmers market with tins peeking out next to lemons and flowers, headline at the top: 'Pantry, but prettier.'",
  a14: "a road trip car dashboard with an open sardine tin and crackers, sunny highway through the windshield, headline at the top: 'Snack stop, sorted.'",
  a15: "a cozy sofa with a blanket, a movie on the TV in the background, a plate of smoked salmon on crackers and the black tin, headline at the top: 'Movie night, upgraded.'",
  a16: "a kitchen windowsill with herbs, a stack of five tins tied with twine, morning light, headline at the top: 'Your new pantry staple.'",
  a17: "a white tiled bathroom-free kitchen island with a chopping board, sardines on rye with radish and dill, the open tin, headline at the top: 'Protein, but make it pretty.'",
};

const prompt = (scene: string) =>
  `A square Instagram feed ad for the tinned fish brand shown in the reference images. Keep the tin packaging exactly as in the references: the blue and gold 'Sardines with Preserved Lemon' tin and the black and gold 'Smoked Salmon' tin, same illustration, same label art. Scene: ${scene}. Photographic, bright natural colours, appetising food styling, crisp clean sans-serif ad typography where the scene asks for text, spelled exactly as written. No purple, no gradients, no watermark, no extra logos.`;

const run = async () => {
  mkdirSync(DIR, { recursive: true });
  const jobs = Object.entries(SCENES).filter(([name]) => process.argv.includes("--force") || !existsSync(path.join(DIR, `${name}.jpg`)));
  await Promise.all(
    jobs.map(async ([name, scene]) => {
      const out = path.join(DIR, `${name}.png`);
      await editImageToFile(prompt(scene), REFS, out, { model: MODEL, size: "1024x1024", quality: "medium" });
      console.log(`saved ${out}`);
    }),
  );
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});

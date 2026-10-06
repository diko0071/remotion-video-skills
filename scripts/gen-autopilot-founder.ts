import { existsSync } from "node:fs";
import path from "node:path";
import { generateImageToFile } from "../src/services/gemini/client";

const DIR = "public/autopilot-founder";
const BASE = path.join(DIR, "base.png");
const STYLE =
  "Draw the SAME stick figure character as in the reference image: identical head, dot eyes, tiny circle ears, small oval hands, same thin uniform black ink line (about 3px). Minimal hand-drawn line art, pure white background, no shading, no color, no text, no letters, no labels, no watermark. Centered, generous white margin. ";

const JOBS: Record<string, string> = {
  "desk-sad":
    "Side view: the character sits slumped on a simple office chair at a plain desk with an open laptop, shoulders down, sad frowning face.",
  idea: "Standing, facing the viewer, pointing one finger up, happy smile, a small glowing lightbulb drawn in line art above the head.",
  overwhelmed:
    "Standing small, facing the viewer, both hands pressed to the sides of the head, worried face with a small frown, elbows out.",
  "desk-confused":
    "Side view: the character sits on an office chair at a desk with a desktop monitor, one hand on chin, puzzled face, three question marks drawn above the head.",
  money:
    "Standing, facing the viewer, pulling both trouser pockets inside out, worried face, several small dollar-sign bills flying away to the upper right.",
  standing: "Standing straight, facing the viewer, arms relaxed at the sides, calm confident smile.",
  relaxed:
    "Side view: the character leans back in an office chair with both feet up on the desk, hands behind the head, relaxed smile, a closed laptop on the desk.",
  typing:
    "Side view: the character sits upright at a desk typing on an open laptop, focused face, small motion lines near the hands.",
  "thumbs-up": "Standing, facing the viewer, one arm raised with a thumbs up, big happy smile.",
  walking:
    "Side view: the character walks away from a desk with a closed laptop, mid-stride, relaxed, hands swinging.",
  sleeping:
    "Side view: the character sits leaning back in an office chair at a desk with a laptop, eyes closed, mouth open, three Z letters floating above the head.",
  phone:
    "Standing, facing the viewer, holding a smartphone up in one hand and looking at it, surprised face with round open mouth, a small rising line chart drawn on the phone screen, small sparkle lines around the phone.",
  clock:
    "A large round wall clock drawn in line art with speed motion lines on its left, and the character standing small to the right of the clock, arms up cheering, happy.",
  crowd:
    "A group of about twenty identical small stick figure characters standing together in a loose cluster on the right, all smiling, and one character on the left walking toward them along a dotted path.",
  invoice:
    "Standing, facing the viewer, holding up a very long paper receipt with both hands that unrolls all the way down to the floor and curls there, shocked face with round open mouth. The receipt has only plain horizontal lines, no writing.",
  spreadsheet:
    "Standing, facing the viewer, holding up one single sheet of paper with a simple empty grid drawn on it, blank unimpressed face with one eyebrow raised.",
  "phone-bored":
    "Standing, facing the viewer, holding a phone to one ear, other hand on the hip, bored face with half-closed eyes, a small wavy line of sound coming from the phone.",
  "laptop-shock":
    "Side view: the character sits at a desk with an open laptop and leans back in shock, both hands raised, jaw dropped, small shock lines around the head.",
  "competitor-trophy":
    "Two identical stick figure characters side by side. The one on the right stands tall holding a big trophy cup above his head, big smile, a few short rays around the trophy. The one on the left stands a little smaller, sad frowning face, looking at him.",
  "desk-night":
    "Side view: the character sits hunched at a desk typing on an open laptop, tired droopy eyes, three coffee cups on the desk, and a window behind him showing a crescent moon and two small stars.",
  facedown:
    "Side view: the character sits on an office chair with his head lying face-down on the desk next to an open laptop, arms hanging down limp, exhausted.",
  "bed-sleeping":
    "Side view: the character lies in a simple bed under a blanket, head on a pillow, eyes closed, peaceful smile, three small Z shapes floating above the head.",
  wakeup:
    "Standing next to a simple bed, facing the viewer, stretching both arms up high, happy fresh face, a small sun with short rays in the upper left corner.",
  "coffee-happy":
    "Side view: the character sits at a desk in front of an open laptop holding a coffee mug, delighted surprised smile, a few small sparkle lines near the laptop screen.",
  "panic-agency":
    "Standing, facing the viewer, wearing a necktie, panicking with both hands up by the face, wide eyes, open worried mouth, three sweat drops flying off the head.",
  chat:
    "Side view: the character sits upright at a desk typing on an open laptop, calm smile, and a large empty rounded speech bubble floats above the laptop. The bubble is completely empty.",
};

const only = process.argv.slice(2);
const keys = Object.keys(JOBS).filter((k) => !only.length || only.includes(k));
await Promise.all(
  keys.map(async (key) => {
    const out = path.join(DIR, `${key}.png`);
    if (existsSync(out) && !process.argv.includes("--force")) return;
    await generateImageToFile(STYLE + JOBS[key], out, { references: [BASE], aspectRatio: "1:1" });
    console.log("saved", key);
  }),
);

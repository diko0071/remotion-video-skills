import { generateImageToFile } from "../src/services/openai/client";

const FLAT =
  "Flat design social ad for 'dusk', an AI sleep coach app. Art direction copied from top playful app brands: " +
  "SOLID flat colors only — deep navy #14213D, warm cream #FFF6E9, amber-orange #F4A63A, sky-dusk blue #4A7BD0. " +
  "A cute minimal flat crescent-moon mascot with a sleepy smiling face and closed eyes, simple bold geometric shapes, " +
  "little flat stars, thick friendly rounded sans-serif typography, generous negative space, small 'dusk' wordmark. " +
  "Absolutely NO gradients, NO purple, NO glow, NO 3D — pure flat vector shapes. Premium, playful, expensive-looking.";

const PHOTO =
  "Photorealistic lifestyle photograph for an ad of 'dusk', an AI sleep coach app. Natural realistic light, honest " +
  "editorial photography like a premium brand campaign shot on medium format. Overlaid text sits on clean FLAT solid " +
  "color plates (navy or cream), thick rounded sans-serif. NO gradients, NO purple tones, NO artificial glow. No watermarks.";

const EDITORIAL =
  "Editorial poster-style ad for 'dusk', an AI sleep coach app. Large elegant serif typography as the hero over a " +
  "flat navy background with a subtle repeating hand-drawn line pattern (stars, moons, sleeping figures) in slightly " +
  "lighter navy. Refined, literary, like a Rise Sleep or high-fashion wellness poster. NO gradients, NO purple, no glow.";

const P: Record<string, { prompt: string; size: "1024x1024" | "1024x1536" | "1536x1024" }> = {
  "approvals/c1-a.png": { size: "1024x1024", prompt: `${FLAT} Square ad. Big flat cream circle score badge with navy number 82 and the word "tonight" under it, the moon mascot peeking from behind it. Headline in thick navy type on cream: "YOUR NIGHT, SCORED". Small line "First 14 nights free".` },
  "approvals/c1-b.png": { size: "1024x1024", prompt: `${PHOTO} A woman in cozy pajamas sitting in bed in the morning, stretching happily, warm sunlight on linen. A flat navy plate with cream text: "I stopped counting sheep".` },
  "approvals/c1-c.png": { size: "1024x1024", prompt: `${FLAT} Square ad split in two flat halves: left navy with a scribbled tangled white line and word "RESTLESS." — right cream with one smooth calm amber arc and word "RESTED." The moon mascot sleeping on the calm arc like a hammock.` },
  "approvals/c2-a.png": { size: "1024x1024", prompt: `${FLAT} Square offer ad on amber background. Giant navy headline "TWO MONTHS ON US" with subtext "on the annual plan", the moon mascot lounging on the words, three tiny flat stars.` },
  "approvals/c2-b.png": { size: "1024x1024", prompt: `${FLAT} Square testimonial ad on cream. A flat navy rounded quote card: "I sleep through the night now." — MAYA R. with five small amber stars. The moon mascot asleep on top edge of the card like a cat.` },
  "approvals/c2-c.png": { size: "1024x1024", prompt: `${FLAT} Square ad on navy. Headline in cream "ONE YEAR OF BETTER SLEEP". A flat grid calendar of 12 months where passed months are solid amber squares, one square is the moon mascot's face. Subtext "members since last winter".` },
  "approvals/c3-a.png": { size: "1024x1024", prompt: `${PHOTO} Night shot of a hand putting a phone face-down on a nightstand next to a warm lamp and a book. Flat cream plate with navy text: "My phone used to keep me awake".` },
  "approvals/c3-b.png": { size: "1024x1024", prompt: `${PHOTO} A man opening bedroom curtains to bright morning light, seen from behind, rested posture, real apartment. Flat amber plate with navy text: "Woke up before my alarm".` },
  "approvals/c3-c.png": { size: "1024x1024", prompt: `${EDITORIAL} Poster headline "3AM SCROLLING ENDS HERE." in large white serif, the pattern behind made of tiny hand-drawn phones with crossed-out screens and crescent moons. Small caption "Recover lost hours. Start free tonight." and a tiny moon glyph.` },
  "approvals/c4-a.png": { size: "1024x1024", prompt: `${PHOTO} A traveler asleep against an airplane window in daylight, cozy hoodie, honest documentary style. Flat navy plate with cream text: "Beat jet lag in three nights".` },
  "approvals/c4-b.png": { size: "1024x1024", prompt: `${FLAT} Square ad on sky-dusk blue. Bold cream headline "SLEEP IN ANY TIME ZONE" above three flat clock faces in cream, one clock's hands replaced by the sleeping moon mascot.` },
  "approvals/c4-c.png": { size: "1024x1024", prompt: `${FLAT} Square ad on cream. Headline in navy "RESET YOUR BODY CLOCK". A big flat 24-hour dial ring drawn in navy with a flat amber sun at day side and the moon mascot at night side.` },
  "approvals/c5-a.png": { size: "1024x1024", prompt: `${EDITORIAL} B2B poster: large white serif headline "TIRED TEAMS MISS DEADLINES." over navy with a subtle pattern of tiny hand-drawn coffee cups and paper stacks. Caption "Sleep coaching for teams — dusk".` },
  "approvals/c5-b.png": { size: "1024x1024", prompt: `${PHOTO} Three colleagues laughing at a bright office table with morning coffee, genuine energy, daylight. Flat navy plate with cream text: "Sleep is a team benefit".` },
  "approvals/c5-c.png": { size: "1024x1024", prompt: `${FLAT} Square ad on cream. Giant navy headline "COFFEE IS NOT A STRATEGY" with a flat amber coffee cup whose steam curls into a crescent moon shape. Subtext "Sleep coaching for teams".` },
  "approvals/c6-a.png": { size: "1024x1024", prompt: `${PHOTO} Macro of a wrist with a smartwatch on a duvet in soft morning light, watch face showing a simple flat navy chart. Flat cream plate with navy text: "Your watch data, decoded".` },
  "approvals/c6-b.png": { size: "1024x1024", prompt: `${FLAT} Square ad on navy. Cream headline "SEE EVERY SLEEP STAGE". A flat amber step-line hypnogram across the frame with flat cream labels AWAKE, REM, LIGHT, DEEP — drawn as crisp solid lines, the moon mascot sliding down one step.` },
  "approvals/c6-c.png": { size: "1024x1024", prompt: `${FLAT} Square ad on cream. Navy headline "YOUR WATCH TRACKS. DUSK COACHES." Two flat panels: left a simple navy watch glyph, right the moon mascot holding a tiny clipboard like a coach with a whistle.` },
  "chatgpt/b1.png": { size: "1024x1024", prompt: `${PHOTO} A phone on a wooden nightstand at night beside a warm lamp, book and ceramic cup, cozy real bedroom, no purple cast — warm amber and deep neutral navy shadows only. No text.` },
  "chatgpt/b2.png": { size: "1024x1024", prompt: `${PHOTO} A wrist with a smartwatch resting on a linen duvet, warm bedside lamp light, honest textures. No text.` },
  "chatgpt/b3.png": { size: "1024x1024", prompt: `${PHOTO} A calm bedroom at evening: made bed, warm lamp, deep blue sky through the window, premium interior photography. No text.` },
  "chatgpt/b4.png": { size: "1024x1024", prompt: `${PHOTO} A hand holding a phone in bed at night, warm screen light on the duvet, face out of frame, intimate documentary feel. No text.` },
  "chatgpt/g1.png": { size: "1024x1024", prompt: `${FLAT} Square ad on navy. Cream elegant headline "A calmer way to fall asleep" with the flat moon mascot lying in a flat cream hammock strung between two stars.` },
  "chatgpt/g2.png": { size: "1024x1024", prompt: `${FLAT} Square ad on cream. Navy headline "Your sleep score, week by week" above a flat rising bar chart in navy with the last bar amber and the moon mascot sitting on top of it.` },
  "chatgpt/g3.png": { size: "1024x1024", prompt: `${FLAT} Square offer ad on amber. Bold navy headline "Try the first fourteen nights" above two rows of seven flat circles, thirteen navy and the last one the sleeping moon mascot's face.` },
  "content/post-01.png": { size: "1536x1024", prompt: `${PHOTO} A cozy bed with a warm lamp on the nightstand, deep blue evening outside the window. No text.` },
  "content/post-02.png": { size: "1536x1024", prompt: `${PHOTO} Empty city street at blue hour with warm shop windows, calm end-of-day mood. No text.` },
  "content/post-03.png": { size: "1536x1024", prompt: `${PHOTO} A phone and smartwatch on a wooden dresser at night beside keys and a plant, minimal still life, warm lamp. No text.` },
  "content/post-04.png": { size: "1536x1024", prompt: `${PHOTO} Hands closing a laptop at night beside a warm desk lamp and a mug, end-of-work ritual. No text.` },
  "content/post-05.png": { size: "1536x1024", prompt: `${PHOTO} Steam rising from a coffee cup on a kitchen counter in early morning light through blinds. No text.` },
  "content/post-06.png": { size: "1536x1024", prompt: `${PHOTO} An unmade bed in soft dawn light, wrinkled linen textures, peaceful. No text.` },
  "content/post-07.png": { size: "1536x1024", prompt: `${PHOTO} Airplane window seat at dusk, warm clouds, a hand holding a drink, travel calm. No text.` },
  "content/post-08.png": { size: "1536x1024", prompt: `${PHOTO} Bedroom window with sheer curtains and evening trees outside, quiet mood. No text.` },
  "content/post-09.png": { size: "1536x1024", prompt: `${PHOTO} Close texture of duvet and pillows in warm lamp light and deep neutral shadow. No text.` },
  "content/post-10.png": { size: "1536x1024", prompt: `${PHOTO} Running shoes by the bed in pre-dawn light, warm lamp meets blue morning. No text.` },
  "content/post-11.png": { size: "1536x1024", prompt: `${PHOTO} A hand reaching to switch off a bedside lamp, half-dark cozy bedroom. No text.` },
  "content/post-12.png": { size: "1536x1024", prompt: `${PHOTO} Evening bedroom with a small plant, warm lamp, deep blue dusk through the window. No text.` },
  "dusk-ad-1.png": { size: "1024x1536", prompt: `${FLAT} Vertical story ad on navy. Cream headline "Sleep like it's your whole job." A big flat cream phone shape showing a flat navy app screen: large amber 87 in a flat ring, simple flat bars below. The moon mascot leaning on the phone. Flat amber pill "Download free". Footer "dusk.app".` },
  "dusk-ad-2.png": { size: "1024x1536", prompt: `${FLAT} Vertical story ad on cream. Navy headline "Same 7 hours. Completely different night." Two flat panels: top navy with a tangled scribble line labeled BEFORE, bottom amber with one smooth arc labeled AFTER 30 NIGHTS, the moon mascot sleeping on the arc.` },
  "dusk-ad-3.png": { size: "1024x1536", prompt: `${FLAT} Vertical story ad on navy. Cream headline "One number. Your whole night." A huge flat amber circle with navy 87 and the word RESTED, three small flat cream chips below: "Deep 1h 24m", "REM 1h 51m", "Awake 9m". Flat pill "Get Dusk free".` },
  "dusk-ad-4.png": { size: "1024x1536", prompt: `Native-format ad that looks exactly like an iPhone Notes app note, clean white background, realistic iOS interface. Note title "why i'm keeping dusk 🌙" and a checklist in casual lowercase handwriting-typed style: "slept through the night 41 times", "no more 3am doom scroll", "wake up before my alarm now", "deep sleep +41 min", last line "TRY 14 NIGHTS FREE 🌙". Authentic UGC energy, no gradients, no purple.` },
  "dusk-sq-1.png": { size: "1024x1024", prompt: `${FLAT} Square hero ad on navy. Cream headline "Your night, scored by morning." A flat cream phone shape with flat navy screen: big amber 87 in a simple flat ring over a flat dusk-blue hill and the moon mascot. Footer "dusk — AI sleep coach".` },
  "dusk-sq-2.png": { size: "1024x1024", prompt: `${PHOTO} A phone lying face-up on the edge of a bed at night, warm lamp bokeh, honest photography. Flat navy plate with cream text: "Put it down. It takes it from here."` },
  "dusk-sq-3.png": { size: "1024x1024", prompt: `${FLAT} Square data ad on cream. Navy headline "+41 minutes of deep sleep in 30 nights." A flat navy step hypnogram with the deep segments in solid amber, flat labels Awake, Light, REM, Deep. Footnote "measured across 180,000 sleepers".` },
  "dusk-sq-4.png": { size: "1024x1024", prompt: `${FLAT} Square offer ad on amber. Giant navy headline "First 14 nights free." with the moon mascot hanging off the F, tiny flat stars. Small navy pill with cream text "Download Dusk", footnote "No card. iPhone + Apple Watch."` },
  "dusk-sq-5.png": { size: "1024x1024", prompt: `${FLAT} Square social-proof ad on navy. Five flat amber stars, huge cream "4.9 out of 5", subtext "180,000 sleepers". Cream italic quote "I stopped guessing why I woke up tired." The moon mascot holding one of the stars.` },
  "gen/ask1.png": { size: "1024x1024", prompt: `${PHOTO} A woman peacefully asleep in a real bed at night, warm lamp off, calm honest photo. Flat amber plate with navy text: "Ninety-one. My best night yet".` },
  "gen/ask2.png": { size: "1024x1024", prompt: `${PHOTO} A hand holding a phone showing a simple flat navy chart in a dark cozy bedroom. Flat navy plate with cream text: "I finally saw my deep sleep".` },
  "gen/ask3.png": { size: "1024x1024", prompt: `${PHOTO} A man smiling over morning coffee at a bright kitchen table, rested, warm sun. Flat cream plate with navy text: "Two weeks free changed my mornings".` },
  "gen/lib1.png": { size: "1024x1024", prompt: `${FLAT} Square ad on navy. Elegant cream serif headline "THE NIGHT YOU EARNED" above a flat amber circle with navy 91, two tiny flat stars, the moon mascot asleep against the circle.` },
  "gen/lib2.png": { size: "1024x1024", prompt: `${FLAT} Square ad on sky-dusk blue. Bold cream headline "DEEP SLEEP, MEASURED" with a thin amber underline, above a flat navy step hypnogram with cream labels REM, LIGHT, DEEP.` },
  "gen/lib3.png": { size: "1024x1024", prompt: `${FLAT} Square offer ad: top amber band with bold navy "FIRST 14 NIGHTS ON US" and a small moon-and-stars glyph; bottom navy field with "DUSK.APP" in spaced cream capitals and the moon mascot waving.` },
  "launch/h1.png": { size: "1024x1024", prompt: `${FLAT} Square ad on navy. Bold cream headline "SCORE YOUR NIGHT" above a large flat amber ring with cream 74 inside, subtext "Sleep coaching, nightly", three tiny flat stars.` },
  "launch/h2.png": { size: "1024x1024", prompt: `${EDITORIAL} Poster: white serif "NOISY NIGHTS." above a hand-drawn scribble line, then "CALM NIGHTS." where the line becomes one smooth stroke ending in a small crescent moon. Navy background with subtle star pattern.` },
  "launch/h3.png": { size: "1024x1024", prompt: `${PHOTO} A street-level photo of a real sidewalk A-frame sign in a city morning, people walking past; the sign face is flat navy with cream text "Best forty dollars I ever spent on sleep. — Jordan P." and a small flat moon mascot at the bottom of the sign.` },
  "launch/n1.png": { size: "1024x1024", prompt: `${FLAT} Square ad on sky-dusk blue. Navy serif headline "BETTER SLEEP STARTS TONIGHT" above the flat moon mascot lying on a flat navy hill with two flat stars.` },
  "launch/n2.png": { size: "1024x1024", prompt: `${FLAT} Square offer ad on navy. Giant flat amber condensed headline "FIRST 14 NIGHTS FREE" above a flat cream phone outline with the sleeping moon mascot on its screen.` },
  "launch/n3.png": { size: "1024x1024", prompt: `${PHOTO} A woman in a cozy bright kitchen holding her phone toward the camera with a genuine smile, morning light. Flat amber plate with navy text: "This app fixed my nights".` },
};

const entries = Object.entries(P);
const only = process.argv[2];
const list = only ? entries.filter(([k]) => k.includes(only)) : entries;

const pool = 4;
let i = 0;
const worker = async () => {
  while (i < list.length) {
    const idx = i++;
    const [file, cfg] = list[idx];
    const out = `public/dusk-new2/${file}`;
    try {
      await generateImageToFile(cfg.prompt, out, { size: cfg.size, quality: "high" });
      console.log(`[${idx + 1}/${list.length}] ok ${file}`);
    } catch (e) {
      console.error(`[${idx + 1}/${list.length}] FAIL ${file}: ${(e as Error).message.slice(0, 200)}`);
    }
  }
};
await Promise.all(Array.from({ length: pool }, () => worker()));
console.log("DONE");

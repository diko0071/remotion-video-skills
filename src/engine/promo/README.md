# Promo scenes

A promo video is data: a `PromoScenario` with a list of scenes. Two of the
scene kinds are the approved brand idents — use them, do not rebuild them.

## Statement

Text on the left, a photo in the middle, one word on the right, sitting on
three different levels. Three fields is the whole scene:

```ts
{
  kind: "statement",
  background: "#171310",
  left: "marketing\nwas built for",
  image: "product-1.jpg",
  right: "teams",
}
```

- `background` / `ink` — per scene. The house pair is `#171310` (dark) and
  `#F2F0EB` (cream); alternate them.
- `image` — any file in `public/`, swapped by changing this one string.
  `imageHeight` (default 300) if a shot needs to be bigger.
- The caption plate at the bottom is set ONCE on the scenario (`caption`) and
  never animates — it is the same plate on every scene. `captionBackground` /
  `captionInk` override its colours per scene.
- `parts` is the escape hatch: pass an explicit list of
  `{ kind: "text" | "image", align: "top" | "middle" | "bottom" }` when a
  statement needs more than three pieces.

## Lockup (the ident)

The mark spins in the centre of frame and slides left as the wordmark unfurls
from behind it; the tagline fades in after the word has landed.

```ts
{
  kind: "lockup",
  mark: "ryze-sun.png",
  word: "Ryze",
  tagline: "Put your marketing on autopilot at get-ryze.ai",
}
```

- The wordmark renders in Cabinet Grotesk (the logo font, `public/fonts/`),
  loaded through `kit/brand-font`. Everything else stays on Plus Jakarta.
- The mark is deliberately smaller than the word; its start position is
  derived from the measured word width, so any word stays centred.
- `partner: { word, mark }` renders a `Brand × Partner` lockup.
- `background` / `ink` per scene; default is white on ink.

## Making a new video

```ts
export const myPromo: PromoScenario = {
  id: "my-promo",
  format: "wide",
  caption: "One line that stays on every scene.",
  scenes: [ ...statements, lockup ],
};
```

Register it in `src/scenarios/index.tsx`, then
`bun run video -- my-promo` (renders and mixes music from `music.json`),
`bun run sheet -- my-promo`, and read the sheet before shipping.

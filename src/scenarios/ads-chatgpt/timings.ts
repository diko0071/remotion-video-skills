export const PROMPT = "Create and launch my ads in ChatGPT.";

export const CARDS_AT = 4;
export const CARD_STAGGER = 6;
export const COMPOSER_AT = -26;
export const FLY_AT = 64;
export const FLY_STAGGER = 6;
export const PLUS_CLICK = 108;
export const MENU_OPEN = PLUS_CLICK + 4;
export const TOGGLE = MENU_OPEN + 26;
export const MENU_CLOSE = TOGGLE + 26;
export const TYPE_FROM = MENU_CLOSE + 10;
export const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT.length / 1.35);
export const SEND = TYPE_TO + 26;
export const INPUT_TOTAL = SEND + 28;

export const AWAY_PHOTOS = [
  "dusk/chatgpt/b1.png",
  "dusk/chatgpt/b2.png",
  "dusk/chatgpt/b3.png",
];

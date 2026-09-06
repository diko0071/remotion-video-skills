export const PROMPT = "Make a Q2 review deck for Cedar & Pine.";

export const COMPOSER_AT = -26;
export const PLUS_CLICK = 22;
export const MENU_OPEN = PLUS_CLICK + 4;
export const TOGGLE_GOOGLE = MENU_OPEN + 24;
export const TOGGLE_META = TOGGLE_GOOGLE + 20;
export const MENU_CLOSE = TOGGLE_META + 24;
export const TYPE_FROM = MENU_CLOSE + 10;
export const TYPE_TO = TYPE_FROM + Math.ceil(PROMPT.length / 1.35);
export const SEND = TYPE_TO + 22;
export const INPUT_TOTAL = SEND + 26;

export const SLIDE_W = 1280;
export const SLIDE_H = 720;
export const STAGE_SLIDE = { x: 240, y: 96, w: 1440, h: 810 };

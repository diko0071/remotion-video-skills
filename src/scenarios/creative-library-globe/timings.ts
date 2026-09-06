export const F = (s: number) => Math.ceil(s * 30);

export const ZOOM_HOLD = 0;
export const ZOOM_OUT_FROM = 0;
export const ZOOM_OUT_TO = 96;
export const SNAP_AT = ZOOM_OUT_TO;
export const SNAP_TOTAL = 10;
export const SPIN_FROM = SNAP_AT;

export const FLY_COUNT = 3;
export const FLY_AT = SNAP_AT + 36;
export const FLY_STAGGER = 7;
export const FLY_TRAVEL = 72;
export const LAND_AT = FLY_AT + (FLY_COUNT - 1) * FLY_STAGGER + FLY_TRAVEL;

export const TYPE_TEXT = "recreate for my brand";
export const TYPE_FROM = LAND_AT + 4;
export const TYPE_TO = TYPE_FROM + Math.ceil(TYPE_TEXT.length / 1.3);
export const CLICK_AT = TYPE_TO + 10;

export const EXIT_AT = CLICK_AT + 18;
export const GLOBE_TOTAL = EXIT_AT + 16;

export const INK_DARK = "#171310";
export const CREAM = "#FDFAF3";

export const TEXT_BEAT_2_AT = 72;
export const TEXT_TOTAL = 168;

export const STACK_MARKS = [8, 26, 40, 52, 62, 71, 79, 86, 92, 97, 102, 106, 110, 113, 116, 119];
export const STACK_EXTRA_MARKS = [122, 124, 126, 128, 130, 132];
export const STACK_TOTAL = 154;

import { refFrame, sampleRef } from "../../core/measure";

const REF_FPS = 25;

export const at30 = (frame25: number) => refFrame(frame25, REF_FPS);

export const sample = (values: readonly number[], frame: number, start30: number) => sampleRef(values, frame, start30, REF_FPS);

export const CAPSULE_TOP = [1022, 894, 766, 638, 509, 388, 347, 330, 337, 356, 377, 396, 407, 412, 412] as const;
export const CAPSULE_W = [463, 555, 637, 721, 803, 887, 967, 1007, 1025, 1021, 1003, 981, 960, 945, 938] as const;

export const BIG_LEFT = [860, 840, 827, 799, 779, 759, 734, 704, 668, 623, 570, 503, 420, 311, 166, 0, -400, -1100, -1900] as const;

export const LINE2_LEFT = [627, 613, 601, 590, 581, 573, 566, 559, 554, 549, 545, 541, 538, 536, 534, 533, 532, 531] as const;
export const LINE2_LIFT = [0, 3, 7, 12, 18, 28, 42, 63, 100, 150] as const;

export const LINE1_SHIFT = [0, -2, -4, -6, -9, -14, -21, -30, -42, -61, -90, -140] as const;

export const MCP_SCALE = [0.22, 0.43, 0.62, 0.82, 1.01, 1.1, 1.13, 1.12, 1.08, 1.03, 0.99, 0.96, 0.95, 0.95, 0.96, 0.98, 1.0, 1.0] as const;

export const CLUSTER_SPREAD = [0, 0.16, 0.33, 0.49, 0.62, 0.74, 0.84, 0.93, 1.0, 1.04, 1.06, 1.05, 1.03, 1.01, 1.0, 1.0] as const;

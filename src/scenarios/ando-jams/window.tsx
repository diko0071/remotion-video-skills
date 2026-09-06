import { S } from "./timings";

export const toScreen = (lx: number, ly: number) => ({ x: 960 + (lx - 960) * S, y: 540 + (ly - 540) * S });

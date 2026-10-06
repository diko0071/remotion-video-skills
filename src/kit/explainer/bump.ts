import { ramp } from "../../core/motion";

export const bump = (f: number, at: number) => ramp(f, at, at + 5) * (1 - ramp(f, at + 9, at + 22));

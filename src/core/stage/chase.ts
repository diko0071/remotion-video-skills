export type ChaseConfig = { stiffness: number; damping: number };

export const CHASE = {
  camera: { stiffness: 0.019, damping: 0.276 },
  snap: { stiffness: 0.14, damping: 0.75 },
  cursor: { stiffness: 0.06, damping: 0.49 },
} as const satisfies Record<string, ChaseConfig>;

export const chase = (
  targetAt: (frame: number) => number,
  frame: number,
  config: (frame: number) => ChaseConfig,
): { value: number; velocity: number } => {
  let value = targetAt(0);
  let velocity = 0;
  for (let k = 1; k <= frame; k += 1) {
    const target = targetAt(k);
    const cfg = config(k);
    const accel = cfg.stiffness * (target - value) - cfg.damping * velocity;
    const before = value;
    velocity += accel;
    value += velocity;
    const crossed =
      (before <= target && value > target) || (before >= target && value < target);
    if (crossed) {
      value = target;
      velocity = 0;
    }
  }
  return { value, velocity };
};

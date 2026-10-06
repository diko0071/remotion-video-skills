export type Kind = "drop" | "word" | "period" | "stomp" | "punch" | "hop" | "land" | "slide";
export type Stop = { at: number; lift: number; x: number; y: number; size: number; kind: Kind; arc?: number };
export type DotPath = { stops: Stop[]; dropFrom: number; drop: number; arc: (a: Stop, b: Stop) => number };

const smooth = (s: number) => s * s * (3 - 2 * s);

export const pathAt = (path: DotPath, f: number) => {
  const { stops } = path;
  const first = stops[0];
  if (f < path.dropFrom) return null;
  if (f < first.at) {
    const s = (f - path.dropFrom) / (first.at - path.dropFrom);
    return { x: first.x, y: first.y - path.drop * (1 - s * s), size: first.size };
  }
  for (let i = 0; i < stops.length; i++) {
    const a = stops[i];
    const b = stops[i + 1];
    if (f <= a.lift || !b) return { x: a.x, y: a.y, size: a.size };
    if (f < b.at) {
      const s = (f - a.lift) / (b.at - a.lift);
      const h = b.arc ?? path.arc(a, b);
      return {
        x: a.x + (b.x - a.x) * s,
        y: a.y + (b.y - a.y) * s - 4 * h * s * (1 - s),
        size: a.size + (b.size - a.size) * smooth(s),
      };
    }
  }
  const last = stops[stops.length - 1];
  return { x: last.x, y: last.y, size: last.size };
};

export const nextStop = (path: DotPath, f: number) => path.stops.find((s) => s.at > f) ?? null;

const AMP: Record<Kind, number> = { drop: 0.36, period: 0.24, word: 0.13, stomp: 0.34, punch: -0.26, hop: 0.14, land: 0.2, slide: 0 };

export const squashAt = (path: DotPath, f: number) =>
  path.stops.reduce((acc, s) => {
    const d = f - s.at;
    if (d < 0 || d > 14) return acc;
    return acc + AMP[s.kind] * Math.exp(-d / 3) * Math.cos(d * 0.95);
  }, 0);

export type Mark = { at: number; x: number; y: number; kind: Kind; arc?: number; until?: number; size?: number };

export const buildPath = (size: number, marks: readonly Mark[], dropFrom: number, arc: (a: Stop, b: Stop) => number, drop = 0): DotPath => ({
  stops: marks.map((m) => ({ at: m.at, lift: m.until ?? m.at, x: m.x, y: m.y, size: m.size ?? size, kind: m.kind, arc: m.arc })),
  dropFrom,
  drop,
  arc,
});

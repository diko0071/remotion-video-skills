export type Pt = { x: number; y: number };

export const polyline = (pts: readonly Pt[]) => pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");

export const pointAt = (pts: readonly Pt[], t: number): Pt & { seg: number; u: number } => {
  const lens = pts.slice(1).map((p, i) => Math.hypot(p.x - pts[i].x, p.y - pts[i].y));
  const total = lens.reduce((a, b) => a + b, 0);
  let d = Math.min(1, Math.max(0, t)) * total;
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1) {
      const u = lens[i] === 0 ? 0 : Math.min(1, d / lens[i]);
      return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * u, y: pts[i].y + (pts[i + 1].y - pts[i].y) * u, seg: i, u };
    }
    d -= lens[i];
  }
  return { ...pts[pts.length - 1], seg: pts.length - 2, u: 1 };
};

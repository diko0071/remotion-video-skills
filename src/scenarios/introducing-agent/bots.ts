export type BotKey = "hero" | "sales" | "ads" | "geo" | "creative";
export type EyeMood = "open" | "happy";

export type Eye = { cx: number; cy: number; rx: number; ry: number; happy?: boolean };

export type BotSpec = { color: string; path: string; eyes: readonly Eye[]; aspect: number };

const dome = (w: number, h: number, r: number) => {
  const x0 = -w / 2;
  const y1 = h / 2;
  const y0 = -h / 2;
  return `M${x0} ${y1 - r}L${x0} ${y0 + w / 2}A${w / 2} ${w / 2} 0 0 1 ${-x0} ${y0 + w / 2}L${-x0} ${y1 - r}A${r} ${r} 0 0 1 ${-x0 - r} ${y1}L${x0 + r} ${y1}A${r} ${r} 0 0 1 ${x0} ${y1 - r}Z`;
};

const squircle = (s: number, r: number) => {
  const a = s / 2;
  return `M${-a + r} ${-a}L${a - r} ${-a}Q${a} ${-a} ${a} ${-a + r}L${a} ${a - r}Q${a} ${a} ${a - r} ${a}L${-a + r} ${a}Q${-a} ${a} ${-a} ${a - r}L${-a} ${-a + r}Q${-a} ${-a} ${-a + r} ${-a}Z`;
};

const circle = (r: number) => `M${-r} 0A${r} ${r} 0 1 0 ${r} 0A${r} ${r} 0 1 0 ${-r} 0Z`;

const clover = (s: number, k: number) => {
  const a = s / 2;
  const n = a - k;
  return `M${-n} ${-a}Q0 ${-a + k * 0.9} ${n} ${-a}Q${a} ${-a} ${a} ${-n}Q${a - k * 0.9} 0 ${a} ${n}Q${a} ${a} ${n} ${a}Q0 ${a - k * 0.9} ${-n} ${a}Q${-a} ${a} ${-a} ${n}Q${-a + k * 0.9} 0 ${-a} ${-n}Q${-a} ${-a} ${-n} ${-a}Z`;
};

const blob = (w: number, h: number) => {
  const a = w / 2;
  const b = h / 2;
  return `M${-a} ${b * 0.3}C${-a} ${-b * 0.9} ${-a * 0.5} ${-b} 0 ${-b}C${a * 0.6} ${-b} ${a} ${-b * 0.8} ${a} ${-b * 0.1}C${a} ${b * 0.7} ${a * 0.7} ${b} 0 ${b}C${-a * 0.6} ${b} ${-a} ${b * 0.9} ${-a} ${b * 0.3}Z`;
};

export const BOTS: Record<BotKey, BotSpec> = {
  hero: { color: "#9302EF", path: dome(200, 200, 26), aspect: 1.0, eyes: [{ cx: -28, cy: -24, rx: 17.7, ry: 25 }, { cx: 28, cy: -24, rx: 17.7, ry: 25 }] },
  sales: { color: "#1AADF5", path: blob(200, 196), aspect: 1.02, eyes: [{ cx: -31, cy: -21, rx: 22, ry: 12.7, happy: true }, { cx: 37, cy: -29, rx: 22, ry: 13.4, happy: true }] },
  geo: { color: "#E82D99", path: circle(100), aspect: 1.0, eyes: [{ cx: -24.6, cy: -18.3, rx: 16.2, ry: 18.3 }, { cx: 21.8, cy: -18.3, rx: 16.2, ry: 18.3 }] },
  creative: { color: "#27C153", path: clover(200, 30), aspect: 1.05, eyes: [{ cx: -23, cy: -1, rx: 13.5, ry: 16.2 }, { cx: 23, cy: -2, rx: 13.5, ry: 16.2 }, { cx: -30, cy: -36, rx: 20, ry: 10, happy: true }, { cx: 28, cy: -44, rx: 19, ry: 10.8, happy: true }] },
  ads: { color: "#F2A008", path: squircle(200, 44), aspect: 1.0, eyes: [{ cx: -34.5, cy: -23.6, rx: 16.4, ry: 20.9 }, { cx: 36.4, cy: -26.4, rx: 21.8, ry: 10.9 }] },
};

export const ROLE_LABELS: Record<Exclude<BotKey, "hero">, string> = {
  sales: "SEO agents",
  ads: "Ads agents",
  geo: "GEO agents",
  creative: "Creative agents",
};

export const GREY_BOT = "#ECEBF3";

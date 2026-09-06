import { guideCursorPath, CURSOR_REST, type GuideClick } from "../src/guide/cursor";

const points = {
  a: { x: 400, y: 300 },
  b: { x: 1200, y: 700 },
  c: { x: 300, y: 900 },
};
const clicks: GuideClick[] = [
  { target: "a", at: 100 },
  { target: "b", at: 160 },
  { target: "c", at: 400 },
];
const from = { x: 1480, y: 940 };

let failures = 0;
for (const click of clicks) {
  const arrive = click.at - CURSOR_REST;
  const target = points[click.target as keyof typeof points];
  for (let f = arrive; f <= click.at + 5; f++) {
    const p = guideCursorPath(clicks, points, from, f);
    if (p.x !== target.x || p.y !== target.y) {
      console.error(`FAIL: cursor not frozen on target at frame ${f} (click ${click.at})`);
      failures++;
    }
  }
  let last = Infinity;
  for (let f = arrive - 12; f < arrive; f++) {
    const p1 = guideCursorPath(clicks, points, from, f);
    const p2 = guideCursorPath(clicks, points, from, f + 1);
    const speed = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    if (speed > last + 0.01) {
      console.error(`FAIL: speed rises during final approach at frame ${f} (${speed.toFixed(2)} > ${last.toFixed(2)})`);
      failures++;
    }
    last = speed;
  }
}
if (failures) {
  console.error(`guide-cursor-check: ${failures} failures`);
  process.exit(1);
}
console.log("guide-cursor-check: clean (frozen at clicks, monotonic deceleration)");

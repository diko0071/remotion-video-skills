import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { press, ramp, SPRINGS, useSpringAt } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { Cursor } from "../../kit/cursor";
import { DirectionalBlur } from "../../kit/directional-blur";
import { GlobeIcon, SparkIcon } from "../../kit/ryze-ui/icons";
import { AuditIssueLine, AuditScoreRing } from "../../kit/ryze-ui/pages/technical-audit";
import { FIX, GROUND } from "./timings";

const AGENT_CHECKS = [
  { name: "llms.txt missing", fix: "Create llms.txt describing your site structure and key pages." },
  { name: "AI crawlers blocked in robots.txt", fix: "Allow GPTBot, ClaudeBot and PerplexityBot to read your pages." },
  { name: "No Markdown version of pages", fix: "Serve a clean .md copy of every product and article page." },
  { name: "Prices not in page code", fix: "Render prices in the HTML so agents can compare them." },
  { name: "Product schema without prices", fix: "Add Product JSON-LD with price, currency and availability." },
  { name: "Checkout needs JavaScript", fix: "Give agents a checkout path that works without scripts." },
  { name: "No MCP server card", fix: "Publish an MCP card so agents can act on your store." },
];

const gaps = AGENT_CHECKS.slice(1).map((_, i) => Math.max(FIX.checkLast, Math.round(FIX.checkFirst - (FIX.checkFirst - FIX.checkLast) * (i / (AGENT_CHECKS.length - 2)))));
const MARKS = cascade(FIX.checksFrom, gaps);
const RINGS_OUT = [FIX.checksFrom - 10, FIX.checksFrom] as const;

const tone = (v: number) => (v >= 80 ? { tone: "#059669", stroke: "#10b981" } : v >= 50 ? { tone: "#d97706", stroke: "#f59e0b" } : { tone: "#e11d48", stroke: "#f43f5e" });

const CARD: React.CSSProperties = { background: "#FFFFFF", borderRadius: 22, boxShadow: "0 30px 80px rgba(15,23,42,0.14), 0 0 0 1px rgba(15,23,42,0.06)" };

const FixButton: React.FC = () => {
  const frame = useCurrentFrame();
  const inP = useSpringAt(-6, SPRINGS.pop, 16);
  const out = ramp(frame, FIX.click + 4, FIX.click + 14, Easing.in(Easing.cubic));
  const glow = frame >= FIX.click ? 1 - ramp(frame, FIX.click, FIX.click + 12) : 0.35 + 0.2 * Math.sin(frame / 4);
  if (out >= 1) return null;
  return (
    <div style={{ position: "absolute", left: 960, top: 540, transform: `translate(-50%, -50%) scale(${3.4 * inP * press(frame, FIX.click, 0.9) * (1 - 0.5 * out)}) translateY(${-out * 60}px)`, opacity: 1 - out, filter: out > 0.02 ? `blur(${out * 6}px)` : undefined }}>
      <span className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: 6, boxShadow: `0 0 ${24 * glow}px rgba(193,95,60,${0.7 * glow}), 0 10px 26px rgba(15,23,42,0.25)` }}>
        <SparkIcon />
        Fix with agent
      </span>
    </div>
  );
};

const RingCard: React.FC<{ x: number; at: number; scale: number; from: number; to: number; label: string; sub: string }> = ({ x, at, scale, from, to, label, sub }) => {
  const frame = useCurrentFrame();
  const pop = useSpringAt(at, SPRINGS.pop, 16);
  const v = Math.round(interpolate(frame, [FIX.ringsFrom, FIX.ringsTo], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }));
  const out = ramp(frame, RINGS_OUT[0] + (x > 960 ? 2 : x < 960 ? 0 : 1), RINGS_OUT[1], Easing.in(Easing.cubic));
  const outPrev = ramp(frame - 1, RINGS_OUT[0] + (x > 960 ? 2 : x < 960 ? 0 : 1), RINGS_OUT[1], Easing.in(Easing.cubic));
  const bob = Math.sin((frame + at * 7) / 18) * 6;
  if (frame < at - 1 || out >= 1) return null;
  return (
    <DirectionalBlur id={`sa-ring-${x}`} y={Math.abs(out - outPrev) * 900 * 0.3} style={{ position: "absolute", left: x, top: 540 + bob - out * 900, transform: `translate(-50%, -50%) scale(${scale * (0.6 + 0.4 * pop)}) rotate(${(x - 960) / 200}deg)`, opacity: Math.min(1, pop * 1.6) }}>
      <div style={{ ...CARD, width: 230 }}>
        <AuditScoreRing value={v} {...tone(v)} label={label} sub={sub} />
      </div>
    </DirectionalBlur>
  );
};

const ChecksCard: React.FC = () => {
  const frame = useCurrentFrame();
  const rise = ramp(frame, FIX.checksFrom - 8, FIX.checksFrom + 6, Easing.out(Easing.cubic));
  const risePrev = ramp(frame - 1, FIX.checksFrom - 8, FIX.checksFrom + 6, Easing.out(Easing.cubic));
  const fixed = MARKS.filter((m) => frame >= m).length;
  const score = Math.round(interpolate(fixed, [0, AGENT_CHECKS.length], [31, 100]));
  const scoreTone = score >= 80 ? "#059669" : score >= 50 ? "#d97706" : "#e11d48";
  const push = interpolate(frame, [FIX.checksFrom, FIX.len], [1.72, 1.8], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  if (rise <= 0) return null;
  return (
    <DirectionalBlur id="sa-checks" y={Math.abs(rise - risePrev) * 900 * 0.3} style={{ position: "absolute", left: 960, top: 540 + (1 - rise) * 900, transform: `translate(-50%, -50%) scale(${push})` }}>
      <div style={{ ...CARD, width: 760, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", borderBottom: "1px solid rgba(15,23,42,0.08)", fontSize: 15, fontWeight: 600, color: "var(--foreground)" }}>
          <GlobeIcon />
          Agent checks
          <span style={{ marginLeft: "auto", fontFamily: "ui-monospace, Menlo, monospace", fontSize: 14, fontWeight: 600, color: scoreTone }}>
            {score}
            <span style={{ fontWeight: 400, color: "var(--muted-foreground)" }}>/100</span>
          </span>
        </div>
        <div style={{ padding: "6px 20px 12px" }}>
          {AGENT_CHECKS.map((c, i) => {
            const on = frame >= MARKS[i];
            const bump = ramp(frame, MARKS[i], MARKS[i] + 6);
            return <AuditIssueLine key={c.name} name={c.name} severity={on ? undefined : "warning"} fix={c.fix} passed={on} style={{ transform: `scale(${1 + 0.04 * Math.sin(bump * Math.PI)})`, transformOrigin: "left center" }} />;
          })}
        </div>
      </div>
    </DirectionalBlur>
  );
};

export const AuditScene: React.FC = () => (
  <AbsoluteFill style={{ background: GROUND }}>
    <FixButton />
    <RingCard x={430} at={FIX.click + 6} scale={1.7} from={48} to={88} label="Page Speed Score" sub="Core Web Vitals from real Chrome users" />
    <RingCard x={960} at={FIX.click + 9} scale={2.25} from={57} to={96} label="LLM Optimization Score" sub="llms.txt, AI crawlers, structured data" />
    <RingCard x={1490} at={FIX.click + 12} scale={1.7} from={74} to={95} label="SEO Optimization Score" sub="Meta tags, links, sitemap, canonicals" />
    <ChecksCard />
    <Cursor stops={[{ x: 1500, y: 900, at: FIX.cursorIn }, { x: 1010, y: 560, at: FIX.click - 3 }, { x: 1010, y: 560, at: FIX.click, click: true }, { x: 2150, y: 1300, at: FIX.click + 24 }]} appearAt={FIX.cursorIn} scale={1.8} />
  </AbsoluteFill>
);

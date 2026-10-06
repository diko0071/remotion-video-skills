import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { cascade } from "../../core/schedule";
import { FillRow, StreamText } from "../../kit/agent-answer";
import { ClaudeFrame, ClaudeSidebar, ClaudeToolRows, ClaudeUserBubble } from "../../kit/claude-ui";
import { ClaudeLineChart, ClaudeSparkStatus, ClaudeStatCards, ClaudeVizCard } from "../../kit/claude-ui/viz";
import { Pop } from "../../kit/pop";
import { ScoreRing } from "../../kit/score-ring";
import { TileImg } from "../../kit/tile-img";
import { SANS } from "./font";
import { BLOCK, BLOCKS, CLAUDE_BG, PROMPT, UI, UI_SCALE } from "./timings";

const SERIF = "var(--cl-serif, Georgia, serif)";
const ACCENT = "#D97757";
const GREEN = "#2FA36B";

const CREATIVES = ["ad-templates/crown-affair_top-10-2d.jpg", "ad-templates/dandelion-chocolate_top-2-55d.jpg", "ad-templates/atoms_top-5-6d.jpg", "creative-wall/momofuku-goods_top-2-79d.jpg", "ad-templates/salt-stone_top-10-38d.jpg", "creative-wall/baxter-of-california_top-1-9d.jpg"];
const FIXES = ["Missing meta description on 6 pages", "Duplicate H1 on /collections/all", "Broken canonical on 3 product pages", "Images without alt text"];
const AUDIT = ["Indexation", "Core Web Vitals", "Structured data", "Internal links", "Sitemap", "Robots", "Redirect chains", "Mobile usability"];
const POINTS = [{ label: "W1", value: 1240 }, { label: "W2", value: 1380 }, { label: "W3", value: 1310 }, { label: "W4", value: 1520 }, { label: "W5", value: 1780 }, { label: "W6", value: 2460 }];

const Card: React.FC<{ at: number; children: React.ReactNode }> = ({ at, children }) => (
  <FillRow at={at} len={10} rise={14} style={{ borderRadius: 12, border: "0.5px solid rgba(20,20,19,0.16)", background: "#fff", padding: 16 }}>
    {children}
  </FillRow>
);

const Ads: React.FC<{ frame: number }> = ({ frame }) => {
  const at = BLOCK.resultAt;
  const roas = 1 + 2.4 * ramp(frame, at + 10, at + 30);
  return (
    <Card at={at}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: SANS }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Campaigns live</div>
          <div style={{ fontSize: 12, color: "#7A7873", marginTop: 2 }}>2 campaigns · 6 ad sets · $120/day</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Img src={staticFile("claude/int-meta.png")} style={{ width: 22, height: 22, borderRadius: 5 }} />
          <Img src={staticFile("claude/int-google.png")} style={{ width: 22, height: 22, borderRadius: 5 }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        {CREATIVES.slice(0, 4).map((f, i) => (
          <Pop key={f} at={at + 12 + i * 2} from={0.7} rise={8}>
            <div style={{ width: 92, height: 92, borderRadius: 8, overflow: "hidden" }}>
              <TileImg file={f} />
            </div>
          </Pop>
        ))}
        <div style={{ marginLeft: "auto", textAlign: "right", fontFamily: SANS }}>
          <div style={{ fontSize: 12, color: "#7A7873" }}>ROAS</div>
          <div style={{ fontSize: 30, fontWeight: 600, color: GREEN }}>{roas.toFixed(1)}x</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: GREEN, marginTop: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: GREEN }} />
            Live
          </div>
        </div>
      </div>
    </Card>
  );
};

const Creatives: React.FC = () => {
  const at = BLOCK.resultAt;
  return (
    <Card at={at}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
        {CREATIVES.map((f, i) => (
          <Pop key={f} at={at + 8 + i * 3} from={0.6} rise={12}>
            <div style={{ width: 84, height: 84, borderRadius: 8, overflow: "hidden" }}>
              <TileImg file={f} />
            </div>
          </Pop>
        ))}
      </div>
    </Card>
  );
};

const Dashboards: React.FC = () => {
  const at = BLOCK.resultAt;
  return (
    <ClaudeVizCard appName="Ryze" appInitial="R" appearAt={at}>
      <div style={{ padding: 14 }}>
        <ClaudeStatCards appearAt={at + 6} stats={[{ label: "Clicks", value: "12,480", delta: "+38%", up: true }, { label: "Impressions", value: "402k", delta: "+21%", up: true }, { label: "Avg. position", value: "6.2", delta: "-1.4", up: true }]} />
        <div style={{ marginTop: 12 }}>
          <ClaudeLineChart points={POINTS} drawAt={at + 12} height={120} color={ACCENT} title="Organic clicks" subtitle="Last 6 weeks" />
        </div>
      </div>
    </ClaudeVizCard>
  );
};

const Seo: React.FC<{ frame: number }> = ({ frame }) => {
  const at = BLOCK.resultAt;
  const marks = cascade(at + 10, [7, 6, 5]);
  return (
    <Card at={at}>
      <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 9, fontFamily: SANS, fontSize: 13 }}>
          {FIXES.map((f, i) => {
            const done = ramp(frame, marks[i], marks[i] + 5);
            return (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 18, height: 18, borderRadius: 9, border: `1.5px solid ${done > 0 ? GREEN : "#C9C7C0"}`, background: `rgba(47,163,107,${done})`, display: "inline-flex", alignItems: "center", justifyContent: "center", transform: `scale(${1 + 0.25 * Math.sin(done * Math.PI)})` }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: done }}>
                    <path d="M2 5.5 L4 7.5 L8 3" />
                  </svg>
                </span>
                <span style={{ color: done > 0.5 ? "#7A7873" : "#141413", textDecoration: done > 0.5 ? "line-through" : "none" }}>{f}</span>
              </div>
            );
          })}
        </div>
        <div style={{ transform: "scale(0.6)", transformOrigin: "center", width: 150, height: 150, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <ScoreRing score={92} appearAt={at + 8} size={240} />
        </div>
      </div>
    </Card>
  );
};

const Audit: React.FC<{ frame: number }> = ({ frame }) => {
  const at = BLOCK.resultAt;
  const marks = cascade(at + 6, [6, 5, 5, 4, 4, 3, 3]);
  const score = Math.round(92 * ramp(frame, at + 8, at + 30));
  return (
    <Card at={at}>
      <div style={{ display: "flex", gap: 18 }}>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 14px", fontFamily: SANS, fontSize: 13 }}>
          {AUDIT.map((a, i) => {
            const p = ramp(frame, marks[i], marks[i] + 4);
            return (
              <div key={a} style={{ display: "flex", alignItems: "center", gap: 8, opacity: 0.3 + 0.7 * p, transform: `translateY(${(1 - p) * 6}px)` }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: p > 0.5 ? GREEN : "#C9C7C0" }} />
                {a}
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", fontFamily: SANS }}>
          <div style={{ fontSize: 12, color: "#7A7873" }}>Site health</div>
          <div style={{ fontSize: 40, fontWeight: 600, color: GREEN, lineHeight: 1.1 }}>{score}</div>
        </div>
      </div>
    </Card>
  );
};

export const Block: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const b = BLOCKS[index];
  const rows = b.rows.filter((_, i) => frame >= BLOCK.rowsFrom + i * BLOCK.rowStep).map(([label, tool]) => ({ label, tool, favicon: "claude/favicon-ryze.png" }));
  const status = ramp(frame, BLOCK.statusAt, BLOCK.statusAt + 6);
  const result = index === 0 ? <Ads frame={frame} /> : index === 1 ? <Creatives /> : index === 2 ? <Dashboards /> : index === 3 ? <Seo frame={frame} /> : <Audit frame={frame} />;
  return (
    <AbsoluteFill style={{ background: CLAUDE_BG }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: UI.w, height: UI.h, transform: `scale(${UI_SCALE})`, transformOrigin: "0 0" }}>
        <ClaudeFrame header={false} sidebar={<ClaudeSidebar activeNav="New" />} style={{ background: CLAUDE_BG }}>
          <div style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: 40, width: 600, display: "flex", flexDirection: "column", gap: 14 }}>
              <ClaudeUserBubble>{PROMPT}</ClaudeUserBubble>
              <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", color: "#91908A" }}>{b.title.toUpperCase()}</div>
              {rows.length > 0 && <ClaudeToolRows items={rows} />}
              <div style={{ opacity: status, transform: `translateY(${(1 - status) * 6}px)` }}>
                <ClaudeSparkStatus text={`${b.title} done`} />
              </div>
              <div style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.45, color: "#141413", maxWidth: 540 }}>
                <StreamText text={b.answer} from={BLOCK.streamFrom} to={BLOCK.streamTo} color="#141413" tint={ACCENT} hidden="transparent" weight={[600, 500]} />
              </div>
              {frame >= BLOCK.resultAt - 2 && result}
            </div>
          </div>
        </ClaudeFrame>
      </div>
    </AbsoluteFill>
  );
};

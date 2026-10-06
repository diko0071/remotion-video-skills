import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { StreamText } from "../../kit/agent-answer";
import { CampaignPanel } from "../../kit/campaign-panel";
import { ClaudeFrame, ClaudeSidebar, ClaudeToolRows, ClaudeUserBubble } from "../../kit/claude-ui";
import { ClaudeSparkStatus } from "../../kit/claude-ui/viz";
import { Cursor } from "../../kit/cursor";
import { Pop } from "../../kit/pop";
import { TileImg } from "../../kit/tile-img";
import { CLAUDE_BG, CORAL, CREATIVES, FAVICON, PROMPT, THREAD, UI, UI_SCALE } from "./timings";

const SERIF = "var(--cl-serif, Georgia, serif)";
const COL_W = 600;
const FEED_H = 1100;

export const LAUNCH_CURSOR = [
  { x: 860, y: 650, at: THREAD.panelAt + 14 },
  { x: 936, y: 558, at: THREAD.clickAt - 4 },
  { x: 936, y: 558, at: THREAD.clickAt, click: true },
  { x: 1010, y: 640, at: THREAD.clickAt + 22 },
];

const Answer: React.FC<{ text: string; from: number; to: number }> = ({ text, from, to }) => (
  <div style={{ fontFamily: SERIF, fontSize: 18, lineHeight: 1.45, color: "#141413", maxWidth: 560 }}>
    <StreamText text={text} from={from} to={to} color="#141413" tint={CORAL} hidden="transparent" weight={[600, 500]} />
  </div>
);

export const ThreadScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = THREAD.rows.filter((_, i) => frame >= THREAD.rowsFrom + i * THREAD.rowStep).map(([label, tool]) => ({ label, tool, favicon: FAVICON }));
  const status = ramp(frame, THREAD.statusAt, THREAD.statusAt + 6);
  const ask = ramp(frame, THREAD.askAt, THREAD.askAt + 8);
  return (
    <AbsoluteFill style={{ background: CLAUDE_BG }}>
      <div style={{ position: "absolute", left: 0, top: 0, width: UI.w, height: FEED_H, transform: `scale(${UI_SCALE})`, transformOrigin: "0 0" }}>
        <ClaudeFrame header={false} sidebar={<ClaudeSidebar activeNav="New" />} style={{ background: CLAUDE_BG, height: FEED_H }}>
          <div style={{ position: "relative", flex: 1, display: "flex", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: 40, width: COL_W, display: "flex", flexDirection: "column", gap: 14 }}>
              <ClaudeUserBubble>{PROMPT}</ClaudeUserBubble>
              {rows.length > 0 ? <ClaudeToolRows items={rows} /> : null}
              <div style={{ opacity: status, transform: `translateY(${(1 - status) * 6}px)` }}>
                <ClaudeSparkStatus text={THREAD.status} />
              </div>
              <Answer text={THREAD.answer} from={THREAD.streamFrom} to={THREAD.streamTo} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
                {CREATIVES.map((f, i) => (
                  <Pop key={f} at={THREAD.creativesAt + i * 3} from={0.6} rise={12}>
                    <div style={{ width: 112, height: 112, borderRadius: 8, overflow: "hidden", opacity: frame >= THREAD.creativesAt + i * 3 - 1 ? 1 : 0 }}>
                      <TileImg file={f} />
                    </div>
                  </Pop>
                ))}
              </div>
              <div style={{ minHeight: 120 }}>
                <CampaignPanel
                  appearAt={THREAD.panelAt}
                  clickAt={THREAD.clickAt}
                  liveAt={THREAD.liveAt}
                  title="Spring campaign"
                  meta="3 ad sets · 5 creatives · $100/day"
                  liveMeta="Live on Meta · 3 ad sets · $100/day"
                  logos={["integrations/meta-ads.svg"]}
                  thumbs={[]}
                  width={COL_W}
                />
              </div>
              <div style={{ alignSelf: "flex-end", opacity: ask, transform: `translateY(${(1 - ask) * 10}px)` }}>
                <ClaudeUserBubble>{THREAD.ask}</ClaudeUserBubble>
              </div>
              <Answer text={THREAD.reply} from={THREAD.replyFrom} to={THREAD.replyTo} />
            </div>
          </div>
        </ClaudeFrame>
        <Cursor stops={LAUNCH_CURSOR} appearAt={THREAD.panelAt + 14} scale={1} />
      </div>
    </AbsoluteFill>
  );
};

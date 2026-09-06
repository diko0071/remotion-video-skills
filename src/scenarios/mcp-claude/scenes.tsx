import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { blink, press, SPRINGS, typing, useSpringAt } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { SfxTrack } from "../../kit/sfx";
import {
  ClaudeComposer,
  ClaudeDisclaimer,
  ClaudeFrame,
  ClaudeToolRows,
  ClaudeUserBubble,
  ClaudeWelcome,
  McpPopup,
  McpSettingsDialog,
} from "../../kit/claude-ui";
import {
  ClaudeAreaChart,
  ClaudeBarChart,
  ClaudeDonut,
  ClaudeLineChart,
  ClaudeMiniTable,
  ClaudeSparkStatus,
  ClaudeStatCards,
  ClaudeVizCard,
} from "../../kit/claude-ui/viz";
import { CHAT, POPUP, SETTINGS } from "./timings";

const URL_TEXT = "https://connector.get-ryze.ai/mcp";
const PROMPT = "how are my Meta ads doing? give me the full picture";

export const SettingsScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        transform: "scale(0.92)",
        transformOrigin: "top center",
      }}
    >
      <SfxTrack hits={[{ name: "mouse-click", at: SETTINGS.addPress }]} />
      <div style={{ position: "relative" }}>
        <Cursor
          appearAt={SETTINGS.cursorIn}
          stops={[
            { x: 430, y: 420, at: SETTINGS.cursorIn },
            { x: 806, y: 34, at: SETTINGS.cursorIn + 10, click: false },
            { x: 806, y: 34, at: SETTINGS.addPress, click: true },
          ]}
        />
        <McpSettingsDialog
        width={880}
        rows={[
          {
            name: "GitHub Integration",
            type: "Web",
            connected: true,
            favicon: "claude/favicon-github.png",
          },
        ]}
          addPressed={press(frame, SETTINGS.addPress)}
        />
      </div>
    </div>
  );
};

export const PopupScene: React.FC = () => {
  const frame = useCurrentFrame();
  const typed = typing(frame, URL_TEXT, POPUP.urlType[0], POPUP.urlType[1]);
  const pressed = frame >= POPUP.addPress;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SfxTrack hits={[{ name: "mouse-click", at: POPUP.addPress }]} />
      <div style={{ position: "relative", transform: `scale(${press(frame, POPUP.addPress, 0.985)})` }}>
        <Cursor
          appearAt={POPUP.urlType[1]}
          stops={[
            { x: 250, y: 300, at: POPUP.urlType[1] },
            { x: 420, y: 336, at: POPUP.urlType[1] + 8 },
            { x: 420, y: 336, at: POPUP.addPress, click: true },
          ]}
        />
        <McpPopup name="Ryze AI" url={typed} cursorInUrl={!pressed && blink(frame)} />
      </div>
    </div>
  );
};

const SPEND_POINTS = [
  { label: "Mon", value: 34 },
  { label: "Tue", value: 61 },
  { label: "Wed", value: 78 },
  { label: "Thu", value: 96 },
  { label: "Fri", value: 118 },
  { label: "Sat", value: 126 },
  { label: "Sun", value: 138 },
];

export const ChatScene: React.FC = () => {
  const frame = useCurrentFrame();
  const inChat = frame >= CHAT.bubbleIn;
  const typed = typing(frame, PROMPT, CHAT.promptType[0], CHAT.promptType[1]);
  const bubbleP = useSpringAt(CHAT.bubbleIn, SPRINGS.smooth, 18);
  const sparkIn = useSpringAt(CHAT.sparkDone, SPRINGS.smooth, 16);
  const textInP = useSpringAt(CHAT.textIn, SPRINGS.smooth, 16);

  const tools = [
    { label: "Meta ads", tool: "getInsights" },
    { label: "Meta ads", tool: "getCampaigns" },
    { label: "Google analytics", tool: "runReport" },
    { label: "visualize", tool: "show_widget", claudeIcon: true },
  ].slice(
    0,
    frame >= CHAT.tool4 ? 4 : frame >= CHAT.tool3 ? 3 : frame >= CHAT.tool2 ? 2 : frame >= CHAT.tool1 ? 1 : 0,
  );

  const s1 = useSpringAt(CHAT.statsIn, SPRINGS.smooth, 13);
  const s2 = useSpringAt(CHAT.rowIn, SPRINGS.smooth, 13);
  const s3 = useSpringAt(CHAT.areaIn, SPRINGS.smooth, 13);
  const s4 = useSpringAt(CHAT.stats2In, SPRINGS.smooth, 13);
  const s5 = useSpringAt(CHAT.tableIn, SPRINGS.smooth, 13);
  const s6 = useSpringAt(CHAT.readyIn, SPRINGS.smooth, 14);
  const readyP = useSpringAt(CHAT.readyIn, SPRINGS.smooth, 18);
  const scrollY = 180 * s1 + 330 * s2 + 300 * s3 + 240 * s4 + 320 * s5 + 90 * s6;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <SfxTrack hits={[{ name: "mouse-click", at: CHAT.send }]} />
      <div
        style={{
          width: 920,
          height: 700,
          borderRadius: 18,
          overflow: "hidden",
          boxShadow: "0 1px 2px rgba(20,15,10,0.05), 0 30px 80px rgba(20,15,10,0.16)",
        }}
      >
        <ClaudeFrame>
          {!inChat ? (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 34,
                transform: "translateY(-4%)",
              }}
            >
              <ClaudeWelcome />
              <div style={{ width: 640 }}>
                <ClaudeComposer typed={typed} cursor={frame < CHAT.send && blink(frame)} />
              </div>
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: 720,
                  flex: 1,
                  minHeight: 0,
                  overflow: "hidden",
                  opacity: bubbleP,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 15,
                    paddingTop: 6,
                    transform: `translateY(${interpolate(bubbleP, [0, 1], [10, 0]) - scrollY}px)`,
                  }}
                >
                <ClaudeUserBubble>{PROMPT}</ClaudeUserBubble>
                {tools.length > 0 ? <ClaudeToolRows items={tools} /> : null}
                {frame >= CHAT.sparkDone ? (
                  <div style={{ opacity: sparkIn }}>
                    <ClaudeSparkStatus text="Ran a full Meta deep-dive across spend, campaigns and placements" />
                  </div>
                ) : null}
                {frame >= CHAT.textIn ? (
                  <div style={{ opacity: textInP, fontFamily: "var(--cl-serif, Georgia, serif)", fontSize: 15.5, color: "#141413" }}>
                    Now I have all the data — building your chart.
                  </div>
                ) : null}
                {frame >= CHAT.vizIn ? (
                  <ClaudeVizCard appearAt={CHAT.vizIn}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                      <ClaudeLineChart
                        points={SPEND_POINTS}
                        drawAt={CHAT.chartDraw}
                        height={200}
                        title="Meta ads — daily spend"
                        subtitle="Last 7 days · act_ryze_ai"
                      />
                      {frame >= CHAT.statsIn ? (
                        <ClaudeStatCards
                          appearAt={CHAT.statsIn}
                          stats={[
                            { label: "Spend", value: "$651", delta: "+18%", up: true },
                            { label: "Clicks", value: "8,214", delta: "+12%", up: true },
                            { label: "CTR", value: "2.9%", delta: "+0.4pp", up: true },
                            { label: "ROAS", value: "4.2", delta: "+0.6", up: true },
                          ]}
                        />
                      ) : null}
                      {frame >= CHAT.rowIn ? (
                        <div style={{ display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 18 }}>
                          <ClaudeBarChart
                            drawAt={CHAT.rowIn}
                            height={190}
                            title="Spend by campaign"
                            bars={[
                              { label: "Prospect", value: 284 },
                              { label: "Retarget", value: 176 },
                              { label: "Lookalike", value: 121 },
                              { label: "Brand", value: 70 },
                            ]}
                          />
                          <ClaudeDonut
                            drawAt={CHAT.rowIn + 8}
                            size={170}
                            title="Placements"
                            centerLabel="$651"
                            segments={[
                              { label: "Feed", value: 46, color: "#D97757" },
                              { label: "Reels", value: 31, color: "#3A3028" },
                              { label: "Stories", value: 23, color: "#C9A227" },
                            ]}
                          />
                        </div>
                      ) : null}
                      {frame >= CHAT.areaIn ? (
                        <ClaudeAreaChart
                          drawAt={CHAT.areaIn}
                          points={[
                            { label: "Mon", value: 980 },
                            { label: "Tue", value: 1130 },
                            { label: "Wed", value: 1245 },
                            { label: "Thu", value: 1310 },
                            { label: "Fri", value: 1480 },
                            { label: "Sat", value: 1390 },
                            { label: "Sun", value: 1620 },
                          ]}
                          title="Daily clicks"
                          subtitle="All campaigns"
                        />
                      ) : null}
                      {frame >= CHAT.stats2In ? (
                        <ClaudeStatCards
                          appearAt={CHAT.stats2In}
                          stats={[
                            { label: "CPC", value: "$0.61", delta: "-9%", up: true },
                            { label: "CPM", value: "$14.2", delta: "-4%", up: true },
                            { label: "Frequency", value: "1.8", delta: "stable", up: true },
                            { label: "Reach", value: "212,400", delta: "+21%", up: true },
                          ]}
                        />
                      ) : null}
                      {frame >= CHAT.tableIn ? (
                        <ClaudeMiniTable
                          appearAt={CHAT.tableIn}
                          title="Top campaigns"
                          headers={["Campaign", "Spend", "ROAS", "CPA"]}
                          rows={[
                            ["Prospecting — Broad", "$284", "3.8", "$11.20"],
                            ["Retargeting — 30d", "$176", "6.1", "$7.40"],
                            ["Lookalike 2%", "$121", "4.4", "$9.80"],
                            ["Brand terms", "$70", "8.2", "$4.10"],
                          ]}
                        />
                      ) : null}
                    </div>
                  </ClaudeVizCard>
                ) : null}
                {frame >= CHAT.readyIn ? (
                  <div
                    style={{
                      fontFamily: "var(--cl-serif, Georgia, serif)",
                      fontSize: 15.5,
                      lineHeight: 1.6,
                      color: "#141413",
                      opacity: readyP,
                    }}
                  >
                    Your dashboard is ready — spend is healthy and ROAS is climbing. Want this as a
                    weekly report?
                  </div>
                ) : null}
                </div>
              </div>
              <div style={{ width: 720, paddingBottom: 10 }}>
                <ClaudeComposer placeholder="Write a message…" />
                <ClaudeDisclaimer />
              </div>
            </div>
          )}
        </ClaudeFrame>
      </div>
    </div>
  );
};

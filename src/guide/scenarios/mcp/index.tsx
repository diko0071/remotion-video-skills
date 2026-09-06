import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { typing } from "../../../core/motion";
import {
  ClaudeComposer,
  ClaudeFrame,
  ClaudeResponse,
  ClaudeSidebar,
  ClaudeThinking,
  ClaudeToolRows,
  ClaudeUserBubble,
  ClaudeWelcome,
  McpPopup,
  McpSettingsDialog,
} from "../../../kit/claude-ui";
import { RyzeApp } from "../../../kit/ryze-ui/app-shell";
import { IntegrationsBody } from "../../../kit/ryze-ui/pages/integrations";
import { PageLayer } from "../../page-layer";
import { GuidePlayer } from "../../player";
import { buildTimeline, titleHold, type VoMarks } from "../../script";
import { ACTS } from "./acts";
import { ConnectMcpDialog, MCP_URL } from "./connect-dialog";
import MARKS from "./vo-marks.json";
import VO from "./vo-durations.json";

const TITLE_HOLD = titleHold(VO);
const timeline = buildTimeline(ACTS, MARKS as VoMarks, VO, TITLE_HOLD);
const OUTRO_AT = timeline.total - 4;

export const GUIDE_MCP_TOTAL = OUTRO_AT + 110;

const DIALOG_AT = timeline.at("dialog");
const COPIED_AT = timeline.at("copied");
const SETTINGS_AT = timeline.at("claudeSettings");
const POPUP_AT = timeline.at("popup");
const PASTED_AT = timeline.at("pasted");
const CONNECTED_AT = timeline.at("connected");
const CHAT_AT = timeline.at("claudeChat");
const FOCUS1_AT = timeline.at("focus1");
const SENT1_AT = timeline.at("sent1");

const Q_CLAUDE = "How is my organic traffic this week?";


const Session: React.FC = () => {
  const frame = useCurrentFrame();

  const onRyze = frame < SETTINGS_AT + 4;
  const onClaude = frame >= SETTINGS_AT + 4;
  const dialogOpacity = interpolate(frame, [CHAT_AT - 14, CHAT_AT - 2], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const typedUrl = frame >= POPUP_AT ? typing(frame, MCP_URL, PASTED_AT, PASTED_AT + 26) : "";
  const typedQ = frame < SENT1_AT ? typing(frame, Q_CLAUDE, FOCUS1_AT + 4, SENT1_AT - 10) : "";

  const rows =
    frame >= CONNECTED_AT + 6
      ? [
          { name: "GitHub Integration", type: "Web", connected: true, favicon: "claude/favicon-github.png" },
          { name: "Ryze AI", type: "Custom", connected: true },
        ]
      : [{ name: "GitHub Integration", type: "Web", connected: true, favicon: "claude/favicon-github.png" }];

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <PageLayer visible={onRyze} scope="i1">
        <div style={{ position: "absolute", inset: 0 }}>
          <RyzeApp workspace="ember-and-oak" page="Integrations" nav="Integrations" stretch>
            <IntegrationsBody />
          </RyzeApp>
          {frame >= DIALOG_AT ? (
            <ConnectMcpDialog
              at={DIALOG_AT}
              visible={frame < SETTINGS_AT + 2}
              copiedAt={COPIED_AT}
            />
          ) : null}
        </div>
      </PageLayer>
      <PageLayer visible={onClaude} scope="c1">
        <AbsoluteFill>
          <ClaudeFrame
            sidebar={
              <ClaudeSidebar
                activeNav={frame < SENT1_AT ? "New" : null}
                prependRecent={
                  frame >= SENT1_AT ? { title: Q_CLAUDE, active: true } : undefined
                }
              />
            }
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: 0,
              }}
            >
              <div
                style={{
                  width: 760,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: frame < SENT1_AT ? "center" : "flex-start",
                  gap: 18,
                  paddingTop: frame < SENT1_AT ? 0 : 26,
                  minHeight: 0,
                  overflow: "hidden",
                }}
              >
                {frame < SENT1_AT ? (
                  <>
                    <ClaudeWelcome />
                    <ClaudeComposer typed={typedQ} cursor={frame >= FOCUS1_AT} />
                  </>
                ) : (
                  <>
                    <ClaudeUserBubble>{Q_CLAUDE}</ClaudeUserBubble>
                    {frame >= SENT1_AT + 20 ? (
                      <ClaudeToolRows
                        items={[
                          { label: "Search analytics", tool: "google_search_console__run_raw_search_analytics", favicon: "claude/favicon-ryze.png" },
                          { label: "Traffic report", tool: "google_analytics__run_report", favicon: "claude/favicon-ryze.png" },
                        ]}
                      />
                    ) : (
                      <ClaudeThinking text="Checking your Ryze connector" />
                    )}
                    {frame >= SENT1_AT + 120 ? (
                      <ClaudeResponse>
                        <p>
                          Your organic traffic is up <b>18% week over week</b> — 2,140 clicks
                          against 1,810 last week. Three quarters of the growth came from your
                          collection pages, and the query <i>hand poured soy candles</i> moved
                          from position 9 to 6.
                        </p>
                        <p>Want me to dig into any of those pages?</p>
                      </ClaudeResponse>
                    ) : null}
                  </>
                )}
              </div>
              {frame >= SENT1_AT ? (
                <div style={{ width: 760, paddingBottom: 18 }}>
                  <ClaudeComposer placeholder="Reply to Claude…" />
                </div>
              ) : null}
            </div>
          </ClaudeFrame>
          {dialogOpacity > 0 ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(30,26,20,0.4)",
                opacity: dialogOpacity,
              }}
            >
              <McpSettingsDialog
                rows={rows}
                highlightRow={frame >= CONNECTED_AT + 6 ? "Ryze AI" : undefined}
              />
            </div>
          ) : null}
          {frame >= POPUP_AT ? (
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(30,26,20,0.35)",
                opacity: frame < CONNECTED_AT + 2 ? 1 : 0,
              }}
            >
              <McpPopup
                name={frame >= PASTED_AT ? "Ryze AI" : ""}
                url={typedUrl}
                cursorInUrl={frame >= PASTED_AT && frame < PASTED_AT + 30}
              />
            </div>
          ) : null}
        </AbsoluteFill>
      </PageLayer>
    </div>
  );
};

export const GuideMcp: React.FC = () => (
  <GuidePlayer
    timeline={timeline}
    voDir="vo/guide-mcp"
    title={{ title: "Ryze inside Claude", accent: "Claude" }}
    titleUntil={TITLE_HOLD - 14}
    titleVo="00-title.mp3"
    outroAt={OUTRO_AT}
  >
    <Session />
  </GuidePlayer>
);

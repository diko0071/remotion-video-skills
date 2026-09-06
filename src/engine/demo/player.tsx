import React from "react";
import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { RyzeApp } from "../../kit/ryze-ui/app-shell";
import {
  AssistantMessage,
  ChatHeader,
  Composer,
  Markdown,
  UserMessage,
} from "../../kit/ryze-ui/chat";
import { CheckIcon, CloseIcon, ExpandIcon, GlobeIcon, SparkIcon } from "../../kit/ryze-ui/icons";
import { AttachmentChip } from "../../kit/ryze-ui/attachment-chip";
import { ToolBeatRow } from "../../kit/ryze-ui/tool-beat-row";
import { blink, press, Shimmer, SPRINGS, typing, useReveal, window01 } from "../../core/motion";
import { SfxTrack } from "../../kit/sfx";
import { Scenario } from "./scenario";
import { buildTimeline, TimedBeat } from "./timeline";

const Reveal: React.FC<{ start: number; children: React.ReactNode }> = ({ start, children }) => {
  const style = useReveal(start, 12, 20);
  const frame = useCurrentFrame();
  if (frame < start) return null;
  return <div style={style}>{children}</div>;
};

export const DemoPlayer: React.FC<{ scenario: Scenario }> = ({ scenario }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  const tl = React.useMemo(() => buildTimeline(scenario), [scenario]);

  const promptBeat = tl.beats.find((b): b is TimedBeat & { beat: Extract<typeof b.beat, { kind: "prompt" }> } =>
    b.beat.kind === "prompt",
  );
  const artifactBeat = tl.beats.find(
    (b): b is TimedBeat & { beat: Extract<typeof b.beat, { kind: "artifact" }> } =>
      b.beat.kind === "artifact",
  );

  const inChat = frame >= tl.chatStart;

  let composerTyped = "";
  let cursorOn = false;
  let sendScale = 1;
  if (promptBeat && !inChat) {
    const { typeStart, typeEnd, sendPress } = promptBeat.marks;
    composerTyped = typing(frame, promptBeat.beat.text, typeStart, typeEnd);
    cursorOn = blink(frame);
    sendScale = press(frame, sendPress);
  }

  const panelFraction = artifactBeat?.beat.width ?? 0.56;
  const panelTarget = width * panelFraction;
  const panelP = artifactBeat
    ? spring({
        frame: frame - artifactBeat.marks.openAt,
        fps,
        config: { damping: 26, mass: 1, stiffness: 120 },
      })
    : 0;
  const panelWidth = interpolate(panelP, [0, 1], [0, panelTarget]);

  const artifactReady = tl.artifact ? frame >= tl.artifact.scrollEnd : false;
  const ArtifactScene = artifactBeat?.beat.scene;

  const panel = artifactBeat ? (
    <aside
      style={{
        flexShrink: 0,
        width: panelWidth,
        overflow: "hidden",
        background: "var(--background)",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "100%",
          width: panelTarget,
          marginLeft: "auto",
          flexDirection: "column",
          borderLeft: "1px solid var(--border)",
        }}
      >
        <div className="agent-header">
          <span className="spark">
            <SparkIcon />
          </span>
          <span className="agent-title-btn">
            <span>{artifactBeat.beat.title}</span>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 12,
              fontWeight: 600,
              borderRadius: 999,
              padding: "4px 10px",
              marginLeft: 8,
              background: artifactReady ? "rgba(5,150,105,0.1)" : "rgba(193,151,103,0.15)",
              color: artifactReady ? "var(--emerald-700)" : "var(--brand-deep)",
            }}
          >
            {artifactReady ? (
              <>
                <CheckIcon size={12} /> Ready
              </>
            ) : (
              <>
                <GlobeIcon size={12} /> Generating…
              </>
            )}
          </span>
          <span className="agent-spacer" />
          <span className="agent-hbtn">
            <ExpandIcon />
          </span>
          <span className="agent-hbtn">
            <CloseIcon />
          </span>
        </div>
        <div style={{ position: "relative", flex: 1, minHeight: 0 }}>
          {ArtifactScene && tl.artifact ? (
            <ArtifactScene
              revealStart={tl.artifact.revealStart}
              scrollStart={tl.artifact.scrollStart}
              scrollEnd={tl.artifact.scrollEnd}
              scrollDistance={tl.artifact.scrollDistance}
            />
          ) : null}
        </div>
      </div>
    </aside>
  ) : null;

  const chatIn = spring({ frame: frame - tl.chatStart, fps, config: SPRINGS.smooth, durationInFrames: 20 });

  const sfxHits = promptBeat
    ? [{ name: "mouse-click" as const, at: promptBeat.marks.sendPress }]
    : [];

  return (
    <RyzeApp workspace={scenario.workspace} panel={panel}>
      {scenario.sfx === false ? null : <SfxTrack hits={sfxHits} />}
      {!inChat ? (
        <div className="empty-wrap">
          <div className="empty-inner">
            <div className="welcome">
              <h1>{scenario.welcome ?? "What should we look at today?"}</h1>
            </div>
            <Composer
              typed={composerTyped}
              cursor={cursorOn}
              sendScale={sendScale}
              attachment={
                promptBeat?.beat.attachments?.length ? (
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {promptBeat.beat.attachments.map((att, i) => (
                      <AttachmentChip
                        key={att.name}
                        name={att.name}
                        image={att.image}
                        meta={att.meta}
                        start={promptBeat.marks.attachIn + i * 8}
                      />
                    ))}
                  </div>
                ) : null
              }
            />
          </div>
        </div>
      ) : (
        <div
          className="chat-page"
          style={{
            opacity: chatIn,
            transform: `translateY(${interpolate(chatIn, [0, 1], [14, 0])}px)`,
          }}
        >
          <ChatHeader title={scenario.chatTitle} />
          <div className="chat-scroll">
            <div className="chat-messages">
              {promptBeat ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  {promptBeat.beat.attachments?.length ? (
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      {promptBeat.beat.attachments.map((att) => (
                        <Img
                          key={att.name}
                          src={staticFile(att.image)}
                          style={{
                            width: 190,
                            height: 130,
                            objectFit: "cover",
                            borderRadius: 12,
                            border: "1px solid var(--border)",
                            display: "block",
                          }}
                        />
                      ))}
                    </div>
                  ) : null}
                  <UserMessage>{promptBeat.beat.text}</UserMessage>
                </div>
              ) : null}

              {tl.beats.map((tb, i) => {
                switch (tb.beat.kind) {
                  case "thinking":
                    return frame >= tb.start && frame < tb.end + 10 ? (
                      <div
                        key={i}
                        className="thinking"
                        style={{
                          opacity: window01(frame, tb.start, tb.end, 8),
                          maxHeight: interpolate(frame, [tb.end, tb.end + 10], [28, 0], {
                            extrapolateLeft: "clamp",
                            extrapolateRight: "clamp",
                          }),
                          overflow: "hidden",
                        }}
                      >
                        <Shimmer text="Thinking…" />
                      </div>
                    ) : null;
                  case "tool":
                    return (
                      <ToolBeatRow
                        key={i}
                        label={tb.beat.label}
                        start={tb.marks.startAt ?? tb.start}
                        doneAt={tb.marks.doneAt}
                      />
                    );
                  case "say":
                    return frame >= tb.start ? (
                      <AssistantMessage key={i}>
                        <Reveal start={tb.start}>
                          <Markdown>
                            <p>{tb.beat.text}</p>
                          </Markdown>
                        </Reveal>
                      </AssistantMessage>
                    ) : null;
                  case "widget":
                    return frame >= tb.start ? (
                      <Reveal key={i} start={tb.start}>
                        {tb.beat.node}
                      </Reveal>
                    ) : null;
                  default:
                    return null;
                }
              })}
            </div>
          </div>
          <Composer />
        </div>
      )}
    </RyzeApp>
  );
};

export const scenarioDuration = (scenario: Scenario): number =>
  buildTimeline(scenario).duration;

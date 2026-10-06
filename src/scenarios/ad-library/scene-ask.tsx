import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { Shimmer } from "../../core/motion";
import { grotesk } from "../../kit/claude-ui";
import { CheckIcon } from "../../kit/claude-ui/icons";
import "../../kit/claude-ui/claude.css";
import { Cursor } from "../../kit/cursor";
import { CHAT, chatScroll, chatTop, composerRect } from "./geometry";
import { useLayout } from "./layout";
import { PROMPT_HEAD, PROMPT_TAIL } from "./story";
import { C } from "../../kit/launch";
import { asset } from "./theme";
import { clamp01, glide, pop, ramp, T } from "./timeline";

export const sendButtonScreen = (l: ReturnType<typeof useLayout>) => {
  const r = composerRect(l);
  return { x: r.x + r.w - (14 + 16) * l.composerUi, y: r.y + r.h - (14 + 16) * l.composerUi };
};

export const SceneAsk: React.FC = () => {
  const f = useCurrentFrame();
  const l = useLayout();
  const send = sendButtonScreen(l);
  const cursorOpacity = 1 - ramp(f, T.send + 8, 8);
  const bubbleIn = glide(f, T.bubble, 170);
  const toolIn = pop(f, T.bubble + 8, 14, 200);
  const done = f >= T.toolDone;
  const scroll = chatScroll(f);
  if (f < T.cursorIn - 2 || f > T.scroll + 24) return null;
  const chatX = l.vis.cx - (CHAT.w * l.chatUi) / 2;
  return (
    <AbsoluteFill>
      {f >= T.bubble ? (
        <div
          className="claude-ui"
          style={{
            position: "absolute",
            left: chatX,
            top: chatTop(l, f),
            width: CHAT.w,
            fontFamily: grotesk,
            background: "transparent",
            transformOrigin: "0 0",
            transform: `scale(${l.chatUi})`,
            opacity: 1 - clamp01(scroll * 2),
          }}
        >
          <div className="cl-user-row" style={{ opacity: clamp01(bubbleIn * 2), transform: `translateY(${(1 - bubbleIn) * 60}px)` }}>
            <div className="cl-user-bubble" style={{ fontSize: 15 }}>
              {PROMPT_HEAD}
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, verticalAlign: "-0.22em" }}>
                <Img src={asset("brand/fav/brex.com.png")} style={{ width: 17, height: 17, borderRadius: 3 }} />
                Brex's
              </span>
              {PROMPT_TAIL}
            </div>
          </div>
          <div className="cl-tools" style={{ position: "absolute", left: 0, top: CHAT.toolY, opacity: clamp01(toolIn * 2), transform: `translateY(${(1 - toolIn) * 14}px)` }}>
            <div className="cl-tool-row">
              <Img src={staticFile("claude/favicon-ryze.png")} />
              <span>
                {done ? <b>Ryze AI</b> : <Shimmer text="Ryze AI" rgb="20,20,19" />}{" "}
                <span>search_ad_library</span>
              </span>
              {done ? (
                <span style={{ color: C.emerald, display: "inline-flex", marginLeft: 4 }}>
                  <CheckIcon size={16} />
                </span>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div style={{ position: "absolute", inset: 0, opacity: cursorOpacity, zIndex: 9 }}>
        <Cursor
          appearAt={T.cursorIn}
          scale={l.composerUi * 0.8}
          stops={[
            { x: l.w * 0.8, y: l.h + 30, at: T.cursorIn },
            { x: send.x + 4, y: send.y + 6, at: T.send, click: true },
          ]}
        />
      </div>
    </AbsoluteFill>
  );
};

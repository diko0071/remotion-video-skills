import React from "react";
import "./claude.css";
import { ArrowUp, ChevronDown, MicIcon, PlusIcon, VoiceBars, Caret } from "./icons";

export const ClaudeComposer: React.FC<{
  typed?: string;
  cursor?: boolean;
  placeholder?: string;
  hint?: string | undefined;
  model?: string;
  modelVariant?: string;
  width?: number | string;
  send?: boolean;
  sendPressed?: number;
  sendGlow?: number;
  sendShine?: number;
}> = ({
  typed = "",
  cursor = false,
  placeholder = "How can I help you today?",
  hint,
  model = "Opus 5",
  modelVariant = "High",
  width = "100%",
  send = false,
  sendPressed = 1,
  sendGlow = 0,
  sendShine,
}) => (
  <div className="cl-composer" data-click="cl.composer" style={{ width }}>
    <div className="cl-composer-input">
      {typed.length === 0 ? (
        <>
          <div className="ph">{placeholder}</div>
          {hint ? (
            <div className="ph" style={{ fontSize: 13, marginTop: 6, color: "#C2C0B6" }}>
              {hint}
            </div>
          ) : null}
        </>
      ) : (
        <span>
          {typed}
          <Caret on={cursor} />
        </span>
      )}
    </div>
    <div className="cl-composer-bar">
      <span className="cl-plus">
        <PlusIcon />
      </span>
      <span className="cl-segment">
        <span className="seg on">Chat</span>
        <span className="seg">Cowork</span>
      </span>
      <span style={{ flex: 1 }} />
      <span className="cl-model">
        {model}
        <span className="variant">{modelVariant}</span>
        <span style={{ color: "var(--cl-text-3)", display: "inline-flex", marginLeft: 2 }}>
          <ChevronDown />
        </span>
      </span>
      {send ? (
        <span
          className="cl-send"
          data-click="cl.send"
          style={{
            transform: `scale(${sendPressed})`,
            boxShadow: sendGlow > 0.01 ? `0 0 ${26 * sendGlow}px rgba(217,119,87,${0.75 * sendGlow}), 0 0 ${8 * sendGlow}px rgba(255,220,200,${0.8 * sendGlow})` : undefined,
            filter: sendGlow > 0.01 ? `brightness(${1 + 0.28 * sendGlow})` : undefined,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <ArrowUp />
          {sendGlow > 0.01 ? (
            <span style={{ position: "absolute", inset: 0, background: `linear-gradient(115deg, rgba(255,255,255,0) 30%, rgba(255,255,255,${0.55 * sendGlow}) 50%, rgba(255,255,255,0) 70%)`, transform: `translateX(${((sendShine ?? sendGlow) - 0.5) * 160}%)` }} />
          ) : null}
        </span>
      ) : (
        <>
          <span className="cl-icon-btn" style={{ width: 28 }}>
            <MicIcon />
          </span>
          <span className="cl-voicebars">
            <VoiceBars />
          </span>
        </>
      )}
    </div>
  </div>
);

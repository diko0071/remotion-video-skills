import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { GrokBubble, GrokDay, GrokFrame, GrokHeader, GrokPluginsModal, GrokSidebar, GrokThread, PluginCard, PluginSection } from "../../kit/grok-ui";
import type { BotAvatar, GrokBotRow } from "../../kit/grok-ui";
import { Cursor } from "../../kit/cursor";
import { SfxTrack } from "../../kit/sfx";
import { addWindow } from "./hero";
import { ADDED_AT, APP_SCALE, CURSOR, MODAL, MODAL_SCALE, MORPH, SLOT, STAGE_FULL, STAGE_IN } from "./timings";

export const RYZE: BotAvatar = { shape: "circle", color: "#C19767" };
const IDEN: BotAvatar = { shape: "circle", color: "#4C8DFF" };

export const AppLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const m = interpolate(frame, [MORPH.at, MORPH.at + MORPH.len], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
  const add = addWindow();
  const dissolve = interpolate(frame, [STAGE_IN, STAGE_FULL], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const appIn = interpolate(m, [0, 0.75], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const modalIn = interpolate(m, [0.15, 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rows: GrokBotRow[] = [
    { name: "Iden", preview: "Approval required: run the campaign", time: "3:41 PM", avatar: IDEN, active: true },
    { name: "LinkedIn", preview: "Vex: Meta just cut coding…", time: "8:27 AM", avatar: { shape: "triangle", color: "#0F9D7A" } },
    { name: "Vex", preview: "Approval required: Run …", time: "Yesterday", avatar: { shape: "square", color: "#4C8DFF" } },
    { name: "Ink", preview: "Listing. Doorman/lift…", time: "Tuesday", avatar: { shape: "circle", color: "#0F9D7A" } },
  ];
  if (frame < MORPH.at || frame >= STAGE_FULL) return null;
  return (
    <AbsoluteFill
      style={{
        opacity: appIn * (1 - dissolve),
        transform: `scale(${APP_SCALE * interpolate(appIn, [0, 1], [1.05, 1]) * (1 + dissolve * 0.06)})`,
        filter: dissolve > 0.02 ? `blur(${dissolve * 12}px)` : undefined,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
        background: "#0C0C0E",
      }}
    >
      <GrokFrame dark sidebar={<GrokSidebar rows={rows} />}>
        <GrokHeader name="Iden" avatar={IDEN} />
        <GrokThread>
          <GrokDay text="Today" />
          <GrokBubble>Morning. Two approvals are waiting: the Q4 forecast and the vendor contract.</GrokBubble>
          <GrokBubble user>Approve the forecast, hold the contract until legal replies.</GrokBubble>
          <GrokBubble>Done. Forecast approved, contract on hold. I pinged legal and will nudge them tomorrow.</GrokBubble>
        </GrokThread>
      </GrokFrame>
      <AbsoluteFill style={{ background: `rgba(0,0,0,${0.55 * modalIn})`, pointerEvents: "none" }} />
      <div
        style={{
          position: "absolute",
          left: MODAL.x,
          top: MODAL.y,
          transformOrigin: "top left",
          transform: `scale(${MODAL_SCALE * interpolate(modalIn, [0, 1], [0.94, 1])})`,
          opacity: Math.min(1, modalIn * 1.5),
        }}
      >
        <GrokPluginsModal dark query="ryze" installed={["grok-plugins/gmail.png", "grok-plugins/calendar.png", "grok-plugins/granola.png", "grok-plugins/drive.png"]}>
          <PluginSection title="Results">
            <div data-click="slot" style={{ width: SLOT.w, height: SLOT.h }} />
            <PluginCard icon="grok-plugins/typeform.png" name="Typeform" blurb="Build forms, analyze responses, and manage workspaces" />
            <PluginCard icon="grok-plugins/sonarsource.png" name="SonarQube" blurb="Automatically enforce SonarQube code quality gates" />
          </PluginSection>
          <PluginSection title="Featured">
            <PluginCard icon="grok-plugins/gmail.png" name="Gmail" blurb="Search, read, draft, and manage email." added />
            <PluginCard icon="grok-plugins/calendar.png" name="Google Calendar" blurb="Search events and schedule meetings." added />
            <PluginCard icon="grok-plugins/drive.png" name="Google Drive" blurb="Search, read, create, and share files." />
            <PluginCard icon="grok-plugins/granola.png" name="Granola" blurb="Your meetings in your workflow. Granola notes, transcripts and more." added iconBg="#B7D66A" />
          </PluginSection>
          <PluginSection title="Agent Orchestration">
            <PluginCard icon="grok-plugins/arize.png" name="Arize" blurb="Add Arize AX observability to LLM applications." />
            <PluginCard icon="grok-plugins/atlan.png" name="Atlan" blurb="Atlan is the context layer for enterprise AI. Connect your data." />
            <PluginCard icon="grok-plugins/aws.png" name="AWS Agents" blurb="Build, deploy, and operate AI agents on AWS." />
            <PluginCard icon="grok-plugins/aws.png" name="AWS SageMaker" blurb="Build, train, and deploy AI models with deep integration." />
          </PluginSection>
        </GrokPluginsModal>
      </div>
      <Cursor stops={[{ x: 1560, y: 1060, at: CURSOR.from }, { x: add.x, y: add.y, at: CURSOR.at, click: true }]} appearAt={CURSOR.from} scale={2.4} fill="#F1F1F3" stroke="#0C0C0E" />
      <SfxTrack hits={[{ name: "mouse-click", at: ADDED_AT }]} />
    </AbsoluteFill>
  );
};

import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";

export const MetaMark: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <Img src={staticFile("meta-ads.svg")} style={{ width: size, height: size }} />
);

export const ApprovalCard: React.FC<{
  id: string;
  at: number;
  approveAt: number;
  leaveAt?: number;
  channel: string;
  title: string;
  evidence: string;
  impact: string;
  y: number;
  height?: number;
  extra?: React.ReactNode;
}> = ({ id, at, approveAt, leaveAt, channel, title, evidence, impact, y, height, extra }) => {
  const frame = useCurrentFrame();
  const inn = useSpringAt(at, SPRINGS.card, 24);
  const press = useSpringAt(approveAt, SPRINGS.pop, 14);
  const leave = useSpringAt(leaveAt ?? 1e6, SPRINGS.smooth, 20);
  const approved = frame >= approveAt + 3;
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 232,
        right: 232,
        top: y,
        height,
        background: "#FFFFFF",
        borderRadius: 12,
        border: `1px solid rgba(23,19,16,${approved ? 0.06 : 0.1})`,
        boxShadow: "0 14px 40px rgba(74,53,29,0.12)",
        padding: "26px 30px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        fontFamily: "'Plus Jakarta Sans'",
        opacity: inn * (1 - leave),
        transform: `translateY(${interpolate(inn, [0, 1], [24, 0]) - leave * 90}px) scale(${
          1 - press * 0.012
        })`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <MetaMark size={17} />
        <span style={{ fontSize: 15, fontWeight: 500, color: "rgba(23,19,16,0.45)" }}>
          {channel}
        </span>
        <span
          style={{ marginLeft: "auto", fontSize: 15, fontWeight: 500, color: "rgba(23,19,16,0.32)" }}
        >
          {impact}
        </span>
      </div>
      <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", color: "#171310" }}>
        {title}
      </span>
      <span style={{ fontSize: 18, fontWeight: 500, lineHeight: 1.45, color: "rgba(23,19,16,0.55)" }}>
        {evidence}
      </span>
      {extra}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }}>
        <span
          data-click={id}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            height: 46,
            padding: "0 22px",
            borderRadius: 10,
            background: approved ? "#F1EFE9" : "#171310",
            color: approved ? "rgba(23,19,16,0.5)" : "#FFFFFF",
            fontSize: 17,
            fontWeight: 700,
            transform: `scale(${1 - press * 0.06 + (approved ? 0 : 0)})`,
          }}
        >
          {approved ? (
            <>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: "#12A150" }} />
              Approved
            </>
          ) : (
            "Approve"
          )}
        </span>
        {approved ? null : (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 46,
              padding: "0 20px",
              borderRadius: 10,
              border: "1px solid rgba(23,19,16,0.12)",
              color: "rgba(23,19,16,0.55)",
              fontSize: 17,
              fontWeight: 600,
            }}
          >
            Reject
          </span>
        )}
      </div>
    </div>
  );
};

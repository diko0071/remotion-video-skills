import React from "react";
import { interpolate } from "remotion";
import { SPRINGS, useSpringAt } from "../core/motion";
import { CheckIcon } from "./ryze-ui/icons";

export const CARD_STYLE: React.CSSProperties = {
  borderRadius: 22,
  background: "#ffffff",
  boxShadow: "0 1px 2px rgba(20,15,10,0.05), 0 24px 70px rgba(20,15,10,0.13)",
};

export const Heading: React.FC<{
  text: string;
  check?: boolean;
  start: number;
  ink: string;
}> = ({ text, check, start, ink }) => {
  const p = useSpringAt(start, SPRINGS.smooth, 22);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        fontSize: 60,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        color: ink,
        opacity: p,
        transform: `translateY(${interpolate(p, [0, 1], [18, 0])}px)`,
      }}
    >
      {check ? <CheckIcon size={34} strokeWidth={3} style={{ color: "#059669" }} /> : null}
      <span>{text}</span>
    </div>
  );
};

export const CardShell: React.FC<{
  children: React.ReactNode;
  width: number;
  start: number;
}> = ({ children, width, start }) => {
  const p = useSpringAt(start, SPRINGS.card);
  return (
    <div
      style={{
        ...CARD_STYLE,
        width,
        overflow: "hidden",
        opacity: Math.min(1, p * 1.3),
        transform: `translateY(${interpolate(p, [0, 1], [46, 0])}px) scale(${interpolate(p, [0, 1], [0.96, 1])})`,
      }}
    >
      {children}
    </div>
  );
};

export const BareShell: React.FC<{
  children: React.ReactNode;
  width: number;
  start: number;
}> = ({ children, width, start }) => {
  const p = useSpringAt(start, SPRINGS.card);
  return (
    <div
      style={{
        width,
        opacity: Math.min(1, p * 1.3),
        transform: `translateY(${interpolate(p, [0, 1], [46, 0])}px) scale(${interpolate(p, [0, 1], [0.96, 1])})`,
      }}
    >
      {children}
    </div>
  );
};

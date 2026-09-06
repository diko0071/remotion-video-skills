import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";
import { SPRINGS, useSpringAt } from "../../../core/motion";

const IOS_FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif";

const cardBase: React.CSSProperties = {
  margin: "0 24px",
  borderRadius: 26,
  background: "rgba(250,252,250,0.82)",
  backdropFilter: "blur(28px) saturate(1.5)",
  WebkitBackdropFilter: "blur(28px) saturate(1.5)",
  boxShadow: "0 8px 26px rgba(0,0,0,0.14)",
  fontFamily: IOS_FONT,
  color: "#0B0B0F",
};

const Notification: React.FC = () => {
  return (
    <div style={{ ...cardBase, padding: "13px 15px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 11 }}>
        <Img
          src={staticFile("shipper/icons/chase-app.png")}
          style={{ width: 40, height: 40, borderRadius: 9, marginTop: 2 }}
        />
        <div style={{ flex: 1, lineHeight: 1.28 }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>Chase Bank</div>
          <div style={{ fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em" }}>
            goodboi waits for Cursor
          </div>
        </div>
        <div style={{ fontSize: 17, color: "rgba(60,60,67,0.6)", marginTop: 2 }}>now</div>
      </div>
    </div>
  );
};

const DepositCard: React.FC<{ at: number }> = ({ at }) => {
  const p = useSpringAt(at, SPRINGS.card, 16);
  return (
    <div
      style={{
        ...cardBase,
        padding: "12px 15px",
        display: "flex",
        alignItems: "center",
        gap: 11,
        transform: `translateY(${interpolate(p, [0, 1], [-68, 9])}px)`,
        opacity: Math.min(1, p * 2),
      }}
    >
      <Img
        src={staticFile("shipper/icons/chase-app.png")}
        style={{ width: 40, height: 40, borderRadius: 9 }}
      />
      <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em" }}>
        +$158.43 Deposit received.
      </div>
    </div>
  );
};

export const PhoneShot: React.FC<{ amountAt?: number }> = ({ amountAt = 30 }) => (
  <AbsoluteFill style={{ background: "#F4F4F4", alignItems: "center", justifyContent: "flex-end" }}>
    <div
      style={{
        width: 826,
        height: 1560,
        borderRadius: 112,
        background:
          "linear-gradient(100deg,#C9CDD2 0%,#8B9098 22%,#EDEFF2 52%,#7E838B 78%,#C4C8CE 100%)",
        padding: 11,
        transform: "translate(-58px, -70px) rotate(-3.5deg)",
        boxShadow: "0 50px 110px rgba(0,0,0,0.26)",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 102,
          background: "#0B0B0B",
          padding: 9,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 94,
            overflow: "hidden",
            background:
              "linear-gradient(180deg,#0B1A3A 0%,#0F4468 20%,#1AA37E 46%,#3F9A6E 70%,#1E3D26 100%)",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingBottom: 232,
          }}
        >
          <AbsoluteFill
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, rgba(255,255,255,0.26) 0px, rgba(255,255,255,0.26) 3px, transparent 3px, transparent 10px)",
            }}
          />
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", zIndex: 2 }}>
              <Notification />
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <DepositCard at={amountAt} />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 44,
              display: "flex",
              justifyContent: "space-between",
              padding: "0 62px",
              color: "rgba(255,255,255,0.95)",
              fontSize: 38,
            }}
          >
            <span>◍</span>
            <span>◎</span>
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              bottom: 16,
              transform: "translateX(-50%)",
              width: 270,
              height: 7,
              borderRadius: 999,
              background: "rgba(255,255,255,0.9)",
            }}
          />
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

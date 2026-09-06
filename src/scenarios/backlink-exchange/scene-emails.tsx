import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";

export const CoffeeIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z" />
  </svg>
);

export const LinenIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9c2-2 4-2 6 0s4 2 6 0 4-2 6 0M3 15c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
  </svg>
);

export const CandleIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 13l4 4L20 5" />
    <path d="M4 20h16" />
  </svg>
);

export const ChainIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="M9.5 14.5 14.5 9.5M8 12l-2.3 2.3a3.8 3.8 0 0 0 5.4 5.4L13.4 17M16 12l2.3-2.3a3.8 3.8 0 0 0-5.4-5.4L10.6 7" />
  </svg>
);


const EMAILS = [
  { to: "hello@thedailybrew.blog", subject: "Quick link swap?", at: 4, x: 120, y: 96, tilt: -2 },
  { to: "editor@homeandhearth.com", subject: "Loved your gift guide", at: 12, x: 700, y: 64, tilt: 1.5 },
  { to: "team@slowlivingjournal.com", subject: "Feature request", at: 20, x: 1290, y: 100, tilt: -1 },
  { to: "press@craftandcarry.co", subject: "Collab idea", at: 28, x: 150, y: 420, tilt: 1 },
  { to: "hi@morningtable.com", subject: "Our sleep data story", at: 35, x: 720, y: 400, tilt: -1.5 },
  { to: "media@thepantryedit.com", subject: "Would you link to us?", at: 42, x: 1310, y: 430, tilt: 2 },
  { to: "editor@brewandbean.co", subject: "Guest post pitch", at: 49, x: 430, y: 720, tilt: -1 },
  { to: "team@thehomefeed.com", subject: "Following up (again)", at: 55, x: 1020, y: 740, tilt: 1.5 },
];

const REPLIES = ["No reply", "No reply", "Declined", "No reply", "Ignored", "No reply", "Declined", "No reply"];
const REPLIES_FROM = 62;
const INVOICE_AT = 92;
export const EMAILS_TOTAL = 152;

const Email: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { to, subject, at, x, y, tilt } = EMAILS[index];
  const pop = useSpringAt(at, SPRINGS.card, 18);
  const replyAt = REPLIES_FROM + index * 3;
  const reply = useSpringAt(replyAt, SPRINGS.pop, 16);
  const dim = interpolate(frame, [INVOICE_AT, INVOICE_AT + 14], [1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  if (frame < at) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 500,
        background: "#FFFFFF",
        borderRadius: 12,
        boxShadow: "0 16px 40px rgba(74,53,29,0.14)",
        border: "1px solid rgba(23,19,16,0.07)",
        padding: "18px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        opacity: pop * dim,
        transform: `translateY(${interpolate(pop, [0, 1], [26, 0])}px) rotate(${tilt}deg)`,
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: "#8A6A3F",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CoffeeIcon size={15} />
        </span>
        <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(23,19,16,0.5)" }}>
          you@dusk.app → {to}
        </span>
      </div>
      <span style={{ fontSize: 19, fontWeight: 800, color: "#171310" }}>{subject}</span>
      <span style={{ fontSize: 15, lineHeight: 1.5, color: "rgba(23,19,16,0.65)" }}>
        Hi! Big fan of your blog. Any chance you'd link to our site in your next post? Happy
        to return the favor...
      </span>
      <span
        style={{
          alignSelf: "flex-end",
          fontSize: 13,
          fontWeight: 800,
          color: REPLIES[index] === "No reply" ? "rgba(23,19,16,0.45)" : "#B4232A",
          background: REPLIES[index] === "No reply" ? "rgba(23,19,16,0.06)" : "#FBE7E8",
          borderRadius: 6,
          padding: "3px 10px",
          opacity: reply,
          transform: `scale(${interpolate(reply, [0, 1], [0.6, 1])})`,
        }}
      >
        {REPLIES[index]}
      </span>
    </div>
  );
};

const Invoice: React.FC = () => {
  const frame = useCurrentFrame();
  const drop = useSpringAt(INVOICE_AT, SPRINGS.pop, 24);
  if (frame < INVOICE_AT) return null;
  return (
    <div
      style={{
        position: "absolute",
        left: 960 - 280,
        top: 280,
        width: 560,
        background: "#FFFFFF",
        borderRadius: 16,
        boxShadow: "0 40px 90px rgba(23,19,16,0.3)",
        border: "1px solid rgba(23,19,16,0.08)",
        overflow: "hidden",
        opacity: drop,
        transform: `scale(${interpolate(drop, [0, 1], [1.25, 1])}) rotate(${interpolate(drop, [0, 1], [-4, -1])}deg)`,
        fontFamily: "'Plus Jakarta Sans'",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "22px 30px",
          borderBottom: "1px solid rgba(23,19,16,0.08)",
        }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "#635BFF",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ChainIcon size={22} />
        </span>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 19, fontWeight: 800, color: "#171310" }}>
            LinkReach Agency
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(23,19,16,0.5)" }}>
            Invoice #0417 · Due Sep 1
          </span>
        </div>
      </div>
      <div style={{ padding: "22px 30px", display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 17 }}>
          <span style={{ color: "rgba(23,19,16,0.7)", fontWeight: 600 }}>
            Do-follow backlink × 1
          </span>
          <span style={{ color: "#171310", fontWeight: 700 }}>$200.00</span>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(23,19,16,0.08)",
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: "rgba(23,19,16,0.5)" }}>
            Total due
          </span>
          <span style={{ fontSize: 34, fontWeight: 800, color: "#171310" }}>$200.00</span>
        </div>
        <div
          style={{
            height: 52,
            borderRadius: 10,
            background: "#635BFF",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          Pay invoice
        </div>
      </div>
    </div>
  );
};

export const EmailsScene: React.FC = () => (
  <AbsoluteFill style={{ background: "var(--background)" }}>
    {EMAILS.map((_, i) => (
      <Email key={i} index={i} />
    ))}
    <Invoice />
  </AbsoluteFill>
);

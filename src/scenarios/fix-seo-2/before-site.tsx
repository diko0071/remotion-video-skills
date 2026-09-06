import React from "react";
import { AbsoluteFill } from "remotion";

const SANS = "Arial, Helvetica, sans-serif";
const INK = "#3d3d3d";
const MUTED = "#7a7a7a";
const LINE = "#e2e2e2";
const BTN = "#6f82a4";
const SCREEN = "#dfe4ec";

const NAV = ["Home", "Features", "Pricing", "Blog", "Contact"];

const FEATURES: { title: string; desc: string; icon: "moon" | "chart" | "bell" }[] = [
  {
    title: "Sleep Tracking",
    desc: "Track your sleep every night and see your results in the app dashboard.",
    icon: "moon",
  },
  {
    title: "Reports & Charts",
    desc: "View weekly and monthly reports about your sleep quality and habits.",
    icon: "chart",
  },
  {
    title: "Smart Alarm",
    desc: "Wake up at the best time in the morning with our smart alarm feature.",
    icon: "bell",
  },
];

const FeatureIcon: React.FC<{ icon: "moon" | "chart" | "bell" }> = ({ icon }) => (
  <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth={1.6}>
    {icon === "moon" ? <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" /> : null}
    {icon === "chart" ? (
      <>
        <path d="M4 20V10" />
        <path d="M10 20V5" />
        <path d="M16 20v-7" />
        <path d="M21 20H3" />
      </>
    ) : null}
    {icon === "bell" ? (
      <>
        <path d="M18 15V10a6 6 0 1 0-12 0v5l-2 3h16Z" />
        <path d="M10 21h4" />
      </>
    ) : null}
  </svg>
);

const PhoneMock: React.FC = () => (
  <div
    style={{
      width: 138,
      height: 214,
      margin: "0 auto",
      border: `2px solid #b9bfc9`,
      borderRadius: 12,
      background: "#ffffff",
      padding: 6,
      boxSizing: "border-box",
    }}
  >
    <div style={{ height: "100%", background: SCREEN, position: "relative", overflow: "hidden" }}>
      <div style={{ height: 34, background: "#c3cbd8" }} />
      <div style={{ padding: "10px 12px" }}>
        <div style={{ height: 8, width: "70%", background: "#c8cfda" }} />
        <div style={{ height: 8, width: "45%", background: "#c8cfda", marginTop: 7 }} />
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 62, marginTop: 12 }}>
          {[28, 42, 21, 50, 36, 56, 31].map((h, i) => (
            <div key={i} style={{ width: 10, height: h, background: "#a9b4c6" }} />
          ))}
        </div>
        <div style={{ height: 8, width: "60%", background: "#c8cfda", marginTop: 18 }} />
        <div style={{ height: 8, width: "38%", background: "#c8cfda", marginTop: 7 }} />
      </div>
    </div>
  </div>
);

const FeatureCell: React.FC<{ title: string; desc: string; icon: "moon" | "chart" | "bell" }> = ({
  title,
  desc,
  icon,
}) => (
  <div style={{ width: 240, textAlign: "center", border: `1px solid ${LINE}`, padding: "18px 14px 18px" }}>
    <div
      style={{
        width: 62,
        height: 62,
        margin: "0 auto",
        border: `1px solid ${LINE}`,
        background: "#f6f6f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FeatureIcon icon={icon} />
    </div>
    <div style={{ fontSize: 15, marginTop: 12, fontWeight: 700, color: INK }}>{title}</div>
    <div style={{ fontSize: 13, marginTop: 7, lineHeight: 1.45, color: MUTED }}>{desc}</div>
    <div style={{ fontSize: 12, marginTop: 10, color: BTN, textDecoration: "underline" }}>Learn More</div>
  </div>
);

export const BeforeSite: React.FC = () => (
  <AbsoluteFill style={{ background: "#ffffff" }}>
    <div
      style={{
        width: 1040,
        height: 1016,
        overflow: "hidden",
        background: "#ffffff",
        fontFamily: SANS,
        color: INK,
      }}
    >
      <div
        style={{
          background: "#f7f7f5",
          borderBottom: `1px solid ${LINE}`,
          textAlign: "center",
          fontSize: 12,
          color: MUTED,
          padding: "7px 0",
        }}
      >
        Download the app today and get 50% off Premium
      </div>

      <div style={{ textAlign: "center", padding: "16px 0 10px" }}>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 1, color: "#4a5570" }}>DUSK</div>
        <div style={{ fontSize: 11, color: MUTED, marginTop: 3, letterSpacing: 1 }}>SLEEP TRACKING APP</div>
      </div>

      <div
        style={{
          borderTop: `1px solid ${LINE}`,
          borderBottom: `1px solid ${LINE}`,
          textAlign: "center",
          padding: "10px 0",
          fontSize: 13,
        }}
      >
        {NAV.map((n, i) => (
          <span key={n}>
            {i > 0 ? <span style={{ color: LINE, margin: "0 14px" }}>|</span> : null}
            <span style={{ color: INK }}>{n}</span>
          </span>
        ))}
      </div>

      <div style={{ background: "#f2f2ef", textAlign: "center", padding: "10px 0 12px" }}>
        <PhoneMock />
        <div style={{ fontSize: 25, fontWeight: 700, marginTop: 14, color: "#4a4a4a" }}>
          Welcome to Dusk Sleep Tracking App
        </div>
        <div style={{ fontSize: 14, color: MUTED, marginTop: 8, lineHeight: 1.5 }}>
          We offer a high quality mobile application for tracking your sleep every night.
          <br />
          Download our app today and start improving your sleep and daily habits.
        </div>
        <div
          style={{
            marginTop: 16,
            display: "inline-block",
            background: BTN,
            color: "#fff",
            fontSize: 13,
            padding: "9px 26px",
            borderRadius: 3,
          }}
        >
          Download Now
        </div>
      </div>

      <div style={{ textAlign: "center", padding: "18px 0 4px" }}>
        <div style={{ fontSize: 19, fontWeight: 700 }}>Our Features</div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 5 }}>Browse the main features of our app below</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "8px 0 10px" }}>
        {FEATURES.map((f) => (
          <FeatureCell key={f.title} {...f} />
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${LINE}`, textAlign: "center", padding: "14px 0 12px" }}>
        <div style={{ fontSize: 17, fontWeight: 700 }}>About Our App</div>
        <div style={{ fontSize: 13, color: MUTED, marginTop: 9, lineHeight: 1.6, width: 640, margin: "9px auto 0" }}>
          Dusk was founded with a simple mission: to help people get better sleep with the help of
          artificial intelligence. Our application is available on iPhone and Apple Watch. We are
          committed to customer satisfaction and quality service.
        </div>
        <div style={{ fontSize: 13, color: BTN, marginTop: 10, textDecoration: "underline" }}>Read More</div>
      </div>

      <div
        style={{
          background: "#f7f7f5",
          borderTop: `1px solid ${LINE}`,
          textAlign: "center",
          padding: "16px 0 14px",
          fontSize: 12,
          color: MUTED,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          {["Support", "Refund Policy", "Terms of Service", "Privacy Policy"].map((l, i) => (
            <span key={l}>
              {i > 0 ? <span style={{ margin: "0 10px", color: LINE }}>|</span> : null}
              <span>{l}</span>
            </span>
          ))}
        </div>
        <div>Copyright 2024 Dusk Sleep Tracking App. All Rights Reserved.</div>
      </div>
    </div>
  </AbsoluteFill>
);

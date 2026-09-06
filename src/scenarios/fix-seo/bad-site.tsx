import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: JAKARTA } = loadJakarta();

const INK = "#12132B";
const MUTED = "rgba(18,19,43,0.58)";
const ACCENT = "#6C5CE7";
const NIGHT = "#141634";
const CREAM = "#FFFFFF";

const BRAND = "Driftly";
const DOMAIN = "driftly.app";

const NAV = ["Features", "Science", "Pricing", "Blog"];

const FEATURES: { title: string; body: string; icon: React.ReactNode }[] = [
  {
    title: "Smart wind-down",
    body: "Driftly learns when you actually fall asleep and starts your wind-down at the right minute.",
    icon: (
      <path
        d="M20 5.5a10 10 0 1 0 8.5 15.2A11 11 0 0 1 20 5.5Z"
        fill="none"
        stroke={ACCENT}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: "Sleep score",
    body: "Driftly learns when you actually fall asleep and starts your wind-down at the right minute.",
    icon: (
      <>
        <circle cx={20} cy={20} r={11} fill="none" stroke={ACCENT} strokeWidth={2.4} />
        <path d="M20 20V12" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
        <path d="M20 20l6 4" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Morning report",
    body: "One card every morning: how deep you slept, what moved the needle, what to try tonight.",
    icon: (
      <>
        <path d="M9 24h22" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
        <path d="M14 24v-6M20 24v-11M26 24v-8" stroke={ACCENT} strokeWidth={2.4} strokeLinecap="round" />
      </>
    ),
  },
];

const FAQ: [string, string][] = [
  ["Does Driftly work without a wearable?", "Yes. The phone on your nightstand is enough."],
  ["Is my sleep data private?", "It stays on device unless you turn on sync."],
  ["Can I try it first?", "Seven nights free, then $6.99 a month."],
];

const STAGES = [
  { h: 26, c: "rgba(255,255,255,0.28)" },
  { h: 48, c: "rgba(140,124,255,0.85)" },
  { h: 34, c: "rgba(255,255,255,0.28)" },
  { h: 62, c: "rgba(140,124,255,0.85)" },
  { h: 40, c: "rgba(255,255,255,0.28)" },
  { h: 54, c: "rgba(140,124,255,0.85)" },
  { h: 30, c: "rgba(255,255,255,0.28)" },
  { h: 46, c: "rgba(140,124,255,0.85)" },
];

const StoreButton: React.FC<{ top: string; bottom: string; glyph: React.ReactNode }> = ({
  top,
  bottom,
  glyph,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      background: INK,
      color: "#FFFFFF",
      borderRadius: 10,
      padding: "9px 18px 9px 14px",
    }}
  >
    <svg width={22} height={22} viewBox="0 0 24 24">
      {glyph}
    </svg>
    <div style={{ lineHeight: 1.15 }}>
      <div style={{ fontSize: 10, opacity: 0.72, letterSpacing: 0.3 }}>{top}</div>
      <div style={{ fontSize: 15, fontWeight: 700 }}>{bottom}</div>
    </div>
  </div>
);

const Phone: React.FC = () => (
  <div
    style={{
      width: 268,
      height: 442,
      borderRadius: 40,
      background: "#08091A",
      padding: 9,
      boxShadow: "0 28px 60px rgba(18,19,43,0.28)",
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 32,
        background: `linear-gradient(180deg, ${NIGHT} 0%, #241B4C 58%, #3A2668 100%)`,
        overflow: "hidden",
        position: "relative",
        padding: "18px 20px",
        color: "#FFFFFF",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 10,
          width: 84,
          height: 20,
          marginLeft: -42,
          borderRadius: 12,
          background: "#08091A",
        }}
      />
      <div style={{ marginTop: 24, fontSize: 12, opacity: 0.6 }}>Tonight</div>
      <div style={{ fontSize: 19, fontWeight: 700, marginTop: 2 }}>Wind-down at 22:40</div>
      <div
        style={{
          marginTop: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width={146} height={146} viewBox="0 0 168 168">
          <circle cx={84} cy={84} r={70} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={14} />
          <circle
            cx={84}
            cy={84}
            r={70}
            fill="none"
            stroke="#A79BFF"
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 70 * 0.86} ${2 * Math.PI * 70}`}
            transform="rotate(-90 84 84)"
          />
          <text
            x={84}
            y={90}
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily={JAKARTA}
            fontSize={46}
            fontWeight={700}
          >
            86
          </text>
          <text
            x={84}
            y={112}
            textAnchor="middle"
            fill="rgba(255,255,255,0.6)"
            fontFamily={JAKARTA}
            fontSize={13}
          >
            sleep score
          </text>
        </svg>
      </div>
      <div style={{ marginTop: 12, fontSize: 12, opacity: 0.6 }}>Last night by stage</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 58, marginTop: 8 }}>
        {STAGES.map((s, i) => (
          <div
            key={i}
            style={{ flex: 1, height: s.h, borderRadius: 4, background: s.c }}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 12,
          background: "rgba(255,255,255,0.12)",
          borderRadius: 12,
          padding: "10px 14px",
          fontSize: 12,
          lineHeight: 1.35,
        }}
      >
        You fell asleep 24 min faster on nights you dimmed the lights before 22:00.
      </div>
    </div>
  </div>
);

export const BadSite: React.FC = () => (
  <AbsoluteFill style={{ background: CREAM, fontFamily: JAKARTA, color: INK }}>
    <div style={{ width: 1040, height: 1016, overflow: "hidden", background: CREAM }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 44px",
          borderBottom: "1px solid rgba(18,19,43,0.07)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width={26} height={26} viewBox="0 0 26 26">
            <rect width={26} height={26} rx={8} fill={ACCENT} />
            <path
              d="M16.8 7.4A6.2 6.2 0 1 0 19 16.9a6.8 6.8 0 0 1-2.2-9.5Z"
              fill="#FFFFFF"
            />
          </svg>
          <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: -0.3 }}>{BRAND}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 26, fontSize: 14, color: MUTED }}>
          {NAV.map((n) => (
            <span key={n}>{n}</span>
          ))}
          <span
            style={{
              background: ACCENT,
              color: "#FFFFFF",
              fontWeight: 700,
              borderRadius: 8,
              padding: "8px 16px",
            }}
          >
            Get the app
          </span>
        </div>
      </div>

      <div style={{ display: "flex", gap: 34, padding: "24px 44px 0" }}>
        <div style={{ width: 520, paddingTop: 22 }}>
          <div
            style={{
              display: "inline-block",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 0.6,
              color: ACCENT,
              background: "rgba(108,92,231,0.1)",
              borderRadius: 6,
              padding: "6px 12px",
            }}
          >
            AI SLEEP COACH
          </div>
          <h2
            style={{
              fontSize: 52,
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: -1.6,
              margin: "18px 0 0",
            }}
          >
            Fall asleep faster,
            <br />
            night after night.
          </h2>
          <p style={{ fontSize: 17, color: MUTED, margin: "14px 0 0" }}>Sleep better with AI.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
            <StoreButton
              top="Download on the"
              bottom="App Store"
              glyph={
                <path
                  d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9-.7 0-1.8-.9-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6 0 0-2.5-1-2.5-3.6ZM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 0 2.1-.5 2.7-1.3Z"
                  fill="#FFFFFF"
                />
              }
            />
            <StoreButton
              top="Get it on"
              bottom="Google Play"
              glyph={
                <>
                  <path d="M4 3.2v17.6l9.4-8.8L4 3.2Z" fill="#FFFFFF" />
                  <path d="M15.4 10.2 5.6 2.4l11.6 6.6-1.8 1.2Z" fill="rgba(255,255,255,0.75)" />
                  <path d="M15.4 13.8 5.6 21.6l11.6-6.6-1.8-1.2Z" fill="rgba(255,255,255,0.75)" />
                  <path d="M17.2 11.2 21 13.3c.9.5.9 1.4 0 1.9l-3.8 2.1-2-3.1 2-3Z" fill="rgba(255,255,255,0.55)" />
                </>
              }
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 24 }}>
            <div style={{ display: "flex" }}>
              {["#6C5CE7", "#8E7BF2", "#B0A4FA", "#D3CCFF"].map((c, i) => (
                <span
                  key={c}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    background: c,
                    border: "2px solid #FFFFFF",
                    marginLeft: i === 0 ? 0 : -10,
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: 14, color: MUTED }}>
              <span style={{ fontWeight: 700, color: INK }}>4.8</span> from 12,400 sleepers
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 40,
              fontSize: 12,
              color: "rgba(18,19,43,0.4)",
            }}
          >
            <span style={{ letterSpacing: 0.8, fontWeight: 700 }}>AS SEEN IN</span>
            <div
              style={{
                width: 132,
                height: 34,
                border: "1px solid rgba(18,19,43,0.18)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                color: "rgba(18,19,43,0.35)",
              }}
            >
              press-logos-final(1).png
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Phone />
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, padding: "22px 44px 0" }}>
        {FEATURES.map((f) => (
          <div
            key={f.title}
            style={{
              flex: 1,
              background: "#F8F7FF",
              border: "1px solid rgba(108,92,231,0.12)",
              borderRadius: 14,
              padding: "14px 20px",
            }}
          >
            <svg width={40} height={40} viewBox="0 0 40 40">
              {f.icon}
            </svg>
            <h4 style={{ fontSize: 18, fontWeight: 700, margin: "10px 0 6px" }}>{f.title}</h4>
            <div style={{ fontSize: 13, lineHeight: 1.45, color: MUTED }}>{f.body}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 20, padding: "16px 44px 0" }}>
        <div
          style={{
            width: 420,
            background: NIGHT,
            color: "#FFFFFF",
            borderRadius: 14,
            padding: "20px 24px",
          }}
        >
          <div style={{ fontSize: 15, lineHeight: 1.5 }}>
            “I stopped scrolling at midnight because Driftly kept showing me what it cost me the
            next morning.”
          </div>
          <div style={{ marginTop: 12, fontSize: 13, opacity: 0.62 }}>Maya R. — Lisbon</div>
          <div
            style={{
              marginTop: 18,
              paddingTop: 14,
              borderTop: "1px solid rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 12,
              opacity: 0.68,
            }}
          >
            <svg width={86} height={16} viewBox="0 0 86 16">
              {[0, 1, 2, 3, 4].map((i) => (
                <path
                  key={i}
                  d="M8 1.4l2 4.1 4.5.6-3.3 3.2.8 4.5L8 11.7 3.9 13.8l.8-4.5L1.5 6.1 6 5.5 8 1.4Z"
                  fill="#FFD37A"
                  transform={`translate(${i * 17.5} 0)`}
                />
              ))}
            </svg>
            <span>Editors&apos; pick, Health &amp; Fitness</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 10px" }}>Questions</h1>
          {FAQ.map(([q, a]) => (
            <div
              key={q}
              style={{
                borderTop: "1px solid rgba(18,19,43,0.09)",
                padding: "9px 0",
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700 }}>{q}</div>
              <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          margin: "14px 44px 0",
          borderTop: "1px solid rgba(18,19,43,0.09)",
          paddingTop: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: 13,
          color: MUTED,
        }}
      >
        <div>© 2021 {BRAND} Inc. · {DOMAIN}</div>
        <div style={{ display: "flex", gap: 20 }}>
          <span>Blog</span>
          <span>Press kit</span>
          <span>Privacy</span>
          <span>Support</span>
        </div>
      </div>
    </div>
  </AbsoluteFill>
);

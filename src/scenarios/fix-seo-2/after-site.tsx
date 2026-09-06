import React from "react";
import { AbsoluteFill } from "remotion";
import { loadFont as loadFraunces } from "@remotion/google-fonts/Fraunces";
import { loadFont as loadJakarta } from "@remotion/google-fonts/PlusJakartaSans";

const { fontFamily: DISPLAY } = loadFraunces();
const { fontFamily: TEXT } = loadJakarta();

const NIGHT = "#0A0E22";
const NIGHT_SOFT = "#101636";
const NIGHT_CARD = "#161C40";
const CREAM = "#F2EFE6";
const IRIS = "#8E8CFF";
const IRIS_DEEP = "#6A67E8";
const PEACH = "#F6C88A";
const DIM = "rgba(242,239,230,0.62)";
const HAIR = "rgba(142,140,255,0.20)";

const NAV = ["Sleep score", "The science", "Stories", "Pricing"];

const STAGES: { label: string; color: string }[] = [
  { label: "Deep", color: IRIS_DEEP },
  { label: "REM", color: IRIS },
  { label: "Light", color: "rgba(142,140,255,0.45)" },
  { label: "Awake", color: PEACH },
];

const HYPNO = [3, 3, 2, 0, 0, 1, 2, 1, 0, 0, 1, 2, 3, 2, 1, 1, 0, 1, 2, 2, 1, 2, 3, 3];
const DEBT = [62, 48, 71, 40, 55, 82, 74];
const DEBT_DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const STREAK = [
  1, 1, 1, 0, 1, 1, 1,
  1, 1, 1, 1, 1, 0, 1,
  1, 1, 1, 1, 1, 1, 1,
  0, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 2,
];

const Moon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path
      d="M20.2 14.8A8.6 8.6 0 1 1 9.4 3.9a6.9 6.9 0 0 0 10.8 10.9Z"
      fill={color}
    />
  </svg>
);

const Wordmark: React.FC<{ size: number }> = ({ size }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
    <Moon size={size * 0.72} color={IRIS} />
    <div
      style={{
        fontFamily: DISPLAY,
        fontWeight: 800,
        fontSize: size,
        letterSpacing: -0.6,
        color: CREAM,
        lineHeight: 1,
      }}
    >
      dusk
    </div>
  </div>
);

const Nav: React.FC = () => (
  <div
    style={{
      height: 64,
      background: NIGHT,
      display: "flex",
      alignItems: "center",
      padding: "0 34px",
      gap: 40,
      borderBottom: `1px solid ${HAIR}`,
    }}
  >
    <Wordmark size={28} />
    <div style={{ display: "flex", gap: 26, fontFamily: TEXT, fontSize: 14, color: "rgba(242,239,230,0.78)" }}>
      {NAV.map((n) => (
        <div key={n}>{n}</div>
      ))}
    </div>
    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ fontFamily: TEXT, fontSize: 13, color: DIM }}>iOS · watchOS</div>
      <div
        style={{
          fontFamily: TEXT,
          fontSize: 13,
          fontWeight: 700,
          color: NIGHT,
          background: IRIS,
          padding: "9px 18px",
          borderRadius: 8,
        }}
      >
        Get Dusk
      </div>
    </div>
  </div>
);

const ScoreRingArt: React.FC = () => (
  <div style={{ position: "relative", width: 116, height: 116 }}>
    <svg width={116} height={116} viewBox="0 0 116 116">
      <circle cx={58} cy={58} r={49} fill="none" stroke="rgba(142,140,255,0.18)" strokeWidth={9} />
      <circle
        cx={58}
        cy={58}
        r={49}
        fill="none"
        stroke={IRIS}
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={`${2 * Math.PI * 49 * 0.87} ${2 * Math.PI * 49}`}
        transform="rotate(-90 58 58)"
      />
    </svg>
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 40, color: CREAM, lineHeight: 1 }}>87</div>
      <div style={{ fontFamily: TEXT, fontSize: 10, letterSpacing: 1.6, color: PEACH, marginTop: 4 }}>
        RESTED
      </div>
    </div>
  </div>
);

const hypnoPath = (w: number, h: number) => {
  const step = w / (HYPNO.length - 1);
  const band = h / 4;
  return HYPNO.map((v, i) => {
    const x = i * step;
    const y = band * v + band / 2;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
};

const Hypnogram: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const d = hypnoPath(w, h);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <defs>
        <linearGradient id="hypnoFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={IRIS} stopOpacity={0.34} />
          <stop offset="100%" stopColor={IRIS} stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={0}
          y1={(h / 4) * i + h / 8}
          x2={w}
          y2={(h / 4) * i + h / 8}
          stroke="rgba(242,239,230,0.08)"
          strokeWidth={1}
        />
      ))}
      <path d={`${d} L${w} ${h} L0 ${h} Z`} fill="url(#hypnoFill)" />
      <path d={d} fill="none" stroke={IRIS} strokeWidth={2.4} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

const PhoneScreen: React.FC = () => (
  <div
    style={{
      width: 250,
      height: 386,
      borderRadius: 32,
      background: "linear-gradient(170deg, #1A2150 0%, #0A0E22 62%)",
      border: "1px solid rgba(242,239,230,0.16)",
      boxShadow: "0 34px 80px rgba(5,7,20,0.65), inset 0 1px 0 rgba(242,239,230,0.14)",
      padding: 14,
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontFamily: TEXT, fontSize: 10.5, color: DIM, fontWeight: 600 }}>7:12</div>
      <div style={{ width: 62, height: 5, borderRadius: 3, background: "rgba(242,239,230,0.22)" }} />
      <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
        {[4, 6, 8].map((h) => (
          <div key={h} style={{ width: 3, height: h, background: "rgba(242,239,230,0.5)", borderRadius: 1 }} />
        ))}
      </div>
    </div>

    <div style={{ marginTop: 12, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 20, color: CREAM }}>Last night</div>
      <div style={{ fontFamily: TEXT, fontSize: 10.5, color: PEACH, letterSpacing: 0.6 }}>7h 41m</div>
    </div>

    <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
      <ScoreRingArt />
    </div>

    <div
      style={{
        marginTop: 12,
        background: "rgba(242,239,230,0.05)",
        border: `1px solid ${HAIR}`,
        borderRadius: 14,
        padding: "10px 12px 8px",
      }}
    >
      <div style={{ fontFamily: TEXT, fontSize: 9.5, letterSpacing: 1.4, color: DIM, fontWeight: 700 }}>
        SLEEP STAGES
      </div>
      <div style={{ marginTop: 6 }}>
        <Hypnogram w={198} h={62} />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        {STAGES.map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: s.color }} />
            <div style={{ fontFamily: TEXT, fontSize: 8.5, color: DIM }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
      {[
        { k: "Deep", v: "1h 24m" },
        { k: "REM", v: "1h 51m" },
        { k: "Awake", v: "9m" },
      ].map((s) => (
        <div
          key={s.k}
          style={{
            flex: 1,
            background: "rgba(142,140,255,0.10)",
            borderRadius: 11,
            padding: "8px 9px",
          }}
        >
          <div style={{ fontFamily: TEXT, fontSize: 8.5, color: DIM, letterSpacing: 0.8 }}>{s.k}</div>
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: 13.5,
              color: CREAM,
              marginTop: 2,
              whiteSpace: "nowrap",
            }}
          >
            {s.v}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HeroCopy: React.FC = () => (
  <div
    style={{
      width: 596,
      height: 470,
      background: NIGHT,
      padding: "36px 30px 0 34px",
      position: "relative",
      overflow: "hidden",
      boxSizing: "border-box",
    }}
  >
    <div
      style={{
        position: "absolute",
        left: -140,
        bottom: -220,
        width: 460,
        height: 460,
        borderRadius: 999,
        background: "radial-gradient(circle at 50% 50%, rgba(142,140,255,0.20), rgba(142,140,255,0) 70%)",
      }}
    />
    <div
      style={{
        fontFamily: TEXT,
        fontSize: 11.5,
        letterSpacing: 2.4,
        color: PEACH,
        fontWeight: 700,
        textTransform: "uppercase",
        position: "relative",
      }}
    >
      AI sleep coach · iPhone + Watch
    </div>
    <div
      style={{
        fontFamily: DISPLAY,
        fontWeight: 800,
        fontSize: 68,
        lineHeight: 0.94,
        color: CREAM,
        marginTop: 18,
        letterSpacing: -1.8,
        position: "relative",
      }}
    >
      Sleep like
      <br />
      it&rsquo;s your
      <br />
      <span style={{ position: "relative", display: "inline-block" }}>
        <span style={{ fontStyle: "italic", color: IRIS }}>whole job.</span>
        <div
          style={{
            position: "absolute",
            left: 2,
            right: -6,
            bottom: 4,
            height: 6,
            background: IRIS_DEEP,
            borderRadius: 3,
            opacity: 0.6,
          }}
        />
      </span>
    </div>
    <div
      style={{
        fontFamily: TEXT,
        fontSize: 15.5,
        lineHeight: 1.55,
        color: "rgba(242,239,230,0.7)",
        marginTop: 18,
        width: 434,
        position: "relative",
      }}
    >
      Dusk reads last night the way a coach would: one score, the stages behind
      it, and a single change to make tonight. No dashboards to decode, no
      streak guilt at 2am.
    </div>
    <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center", position: "relative" }}>
      <div
        style={{
          fontFamily: TEXT,
          fontSize: 15,
          fontWeight: 700,
          color: NIGHT,
          background: IRIS,
          padding: "14px 26px",
          borderRadius: 10,
        }}
      >
        Download free · 14 nights
      </div>
      <div
        style={{
          fontFamily: TEXT,
          fontSize: 15,
          fontWeight: 600,
          color: CREAM,
          border: "1px solid rgba(242,239,230,0.32)",
          padding: "13px 22px",
          borderRadius: 10,
        }}
      >
        Read the science
      </div>
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 18,
        position: "relative",
        fontFamily: TEXT,
        fontSize: 12.5,
        color: DIM,
      }}
    >
      <div style={{ display: "flex", gap: 2 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} width={12} height={12} viewBox="0 0 24 24" fill={PEACH}>
            <path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L3.6 9.4l6.5-.9z" />
          </svg>
        ))}
      </div>
      <div>4.9 on the App Store · 180,000 sleepers</div>
    </div>
  </div>
);

const HeroArt: React.FC = () => (
  <div
    style={{
      width: 444,
      height: 470,
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(200deg, #1B2354 0%, #0C1129 55%, #070A1A 100%)",
      borderLeft: `1px solid ${HAIR}`,
    }}
  >
    <div
      style={{
        position: "absolute",
        top: -110,
        right: -80,
        width: 340,
        height: 340,
        borderRadius: 999,
        background: "radial-gradient(circle at 50% 50%, rgba(246,200,138,0.22), rgba(246,200,138,0) 68%)",
      }}
    />
    {[
      { x: 46, y: 62, r: 1.6, o: 0.7 },
      { x: 104, y: 34, r: 1.1, o: 0.5 },
      { x: 388, y: 108, r: 1.7, o: 0.6 },
      { x: 348, y: 44, r: 1.2, o: 0.45 },
      { x: 62, y: 214, r: 1.3, o: 0.4 },
      { x: 402, y: 296, r: 1.5, o: 0.5 },
      { x: 30, y: 348, r: 1.2, o: 0.38 },
      { x: 156, y: 18, r: 1.4, o: 0.42 },
    ].map((s) => (
      <div
        key={`${s.x}-${s.y}`}
        style={{
          position: "absolute",
          left: s.x,
          top: s.y,
          width: s.r * 2,
          height: s.r * 2,
          borderRadius: 999,
          background: CREAM,
          opacity: s.o,
        }}
      />
    ))}
    <div style={{ position: "absolute", left: 140, top: 44 }}>
      <PhoneScreen />
    </div>
    <div
      style={{
        position: "absolute",
        left: 10,
        top: 300,
        width: 152,
        background: "rgba(10,14,34,0.86)",
        border: `1px solid ${HAIR}`,
        borderRadius: 14,
        padding: "11px 14px",
        boxShadow: "0 18px 40px rgba(5,7,20,0.5)",
      }}
    >
      <div style={{ fontFamily: TEXT, fontSize: 9.5, letterSpacing: 1.4, color: PEACH, fontWeight: 700 }}>
        TONIGHT
      </div>
      <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 17, color: CREAM, marginTop: 3 }}>
        Lights out 10:40
      </div>
      <div style={{ fontFamily: TEXT, fontSize: 11, color: DIM, marginTop: 2 }}>+38 min deep sleep</div>
    </div>
  </div>
);

const CardShell: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div
    style={{
      width: 312,
      height: 212,
      background: NIGHT_CARD,
      border: `1px solid ${HAIR}`,
      borderRadius: 16,
      padding: "16px 18px 16px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <div style={{ fontFamily: TEXT, fontSize: 9.5, letterSpacing: 1.6, fontWeight: 700, color: PEACH }}>
      {label.toUpperCase()}
    </div>
    {children}
  </div>
);

const StreakCard: React.FC = () => (
  <CardShell label="Streak">
    <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, color: CREAM, marginTop: 6, lineHeight: 1 }}>
      34 nights
    </div>
    <div style={{ fontFamily: TEXT, fontSize: 12, color: DIM, marginTop: 4 }}>in the window you set</div>
    <div
      style={{
        marginTop: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gap: 6,
      }}
    >
      {STREAK.map((v, i) => (
        <div
          key={i}
          style={{
            height: 15,
            borderRadius: 5,
            background: v === 2 ? PEACH : v === 1 ? IRIS : "rgba(142,140,255,0.16)",
            opacity: v === 1 ? 0.55 + (i / STREAK.length) * 0.45 : 1,
          }}
        />
      ))}
    </div>
  </CardShell>
);

const DebtCard: React.FC = () => (
  <CardShell label="Sleep debt">
    <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 34, color: CREAM, marginTop: 6, lineHeight: 1 }}>
      −2h 10m
    </div>
    <div style={{ fontFamily: TEXT, fontSize: 12, color: DIM, marginTop: 4 }}>down from −6h last week</div>
    <div style={{ marginTop: "auto", display: "flex", alignItems: "flex-end", gap: 10, height: 78 }}>
      {DEBT.map((h, i) => (
        <div key={DEBT_DAYS[i] + i} style={{ flex: 1, textAlign: "center" }}>
          <div
            style={{
              height: h,
              borderRadius: 6,
              background:
                i === DEBT.length - 1
                  ? `linear-gradient(180deg, ${PEACH}, rgba(246,200,138,0.35))`
                  : `linear-gradient(180deg, ${IRIS}, rgba(142,140,255,0.25))`,
            }}
          />
          <div style={{ fontFamily: TEXT, fontSize: 9, color: DIM, marginTop: 5 }}>{DEBT_DAYS[i]}</div>
        </div>
      ))}
    </div>
  </CardShell>
);

const CoachCard: React.FC = () => (
  <CardShell label="Coach">
    <div
      style={{
        fontFamily: DISPLAY,
        fontWeight: 700,
        fontStyle: "italic",
        fontSize: 21,
        lineHeight: 1.25,
        color: CREAM,
        marginTop: 8,
      }}
    >
      “Your deep sleep drops every night you train after 8pm.”
    </div>
    <div style={{ fontFamily: TEXT, fontSize: 12, color: DIM, marginTop: 8, lineHeight: 1.45 }}>
      Six weeks of your own data, one sentence long.
    </div>
    <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
      <div
        style={{
          fontFamily: TEXT,
          fontSize: 11.5,
          fontWeight: 700,
          color: NIGHT,
          background: IRIS,
          padding: "8px 13px",
          borderRadius: 8,
        }}
      >
        Move it to 6pm
      </div>
      <div
        style={{
          fontFamily: TEXT,
          fontSize: 11.5,
          fontWeight: 600,
          color: CREAM,
          border: "1px solid rgba(242,239,230,0.28)",
          padding: "8px 13px",
          borderRadius: 8,
        }}
      >
        Not this week
      </div>
    </div>
  </CardShell>
);

const Band: React.FC = () => (
  <div style={{ height: 300, background: NIGHT_SOFT, padding: "0 34px", boxSizing: "border-box" }}>
    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "20px 0 14px" }}>
      <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, color: CREAM, letterSpacing: -0.8 }}>
        What you actually open it for
      </div>
      <div style={{ fontFamily: TEXT, fontSize: 13, color: DIM }}>Free forever · Premium $6/mo</div>
    </div>
    <div style={{ display: "flex", gap: 18 }}>
      <StreakCard />
      <DebtCard />
      <CoachCard />
    </div>
  </div>
);

const PROOF: { value: string; label: string }[] = [
  { value: "+41 min", label: "average deep sleep after 30 nights" },
  { value: "3.2×", label: "fewer 3am wake-ups reported" },
  { value: "12 sec", label: "to read your night, on the lock screen" },
];

const Proof: React.FC = () => (
  <div
    style={{
      height: 120,
      background: NIGHT,
      borderTop: `1px solid ${HAIR}`,
      display: "flex",
      alignItems: "center",
      padding: "0 34px",
      boxSizing: "border-box",
    }}
  >
    {PROOF.map((p, i) => (
      <div
        key={p.value}
        style={{
          flex: 1,
          paddingLeft: i === 0 ? 0 : 28,
          borderLeft: i === 0 ? "none" : `1px solid ${HAIR}`,
        }}
      >
        <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, color: IRIS, letterSpacing: -1 }}>
          {p.value}
        </div>
        <div style={{ fontFamily: TEXT, fontSize: 12.5, color: DIM, marginTop: 5 }}>{p.label}</div>
      </div>
    ))}
  </div>
);

const Footer: React.FC = () => (
  <div
    style={{
      height: 62,
      background: NIGHT,
      display: "flex",
      alignItems: "center",
      padding: "0 34px",
      borderTop: `1px solid ${HAIR}`,
      boxSizing: "border-box",
    }}
  >
    <Wordmark size={20} />
    <div
      style={{
        marginLeft: 28,
        display: "flex",
        gap: 22,
        fontFamily: TEXT,
        fontSize: 12.5,
        color: DIM,
      }}
    >
      {["Sleep library", "Apple Health", "Press", "Support", "Privacy"].map((l) => (
        <div key={l}>{l}</div>
      ))}
    </div>
    <div style={{ marginLeft: "auto", fontFamily: TEXT, fontSize: 12, color: "rgba(242,239,230,0.45)" }}>
      Built in Lisbon · Your data never leaves the device
    </div>
  </div>
);

export const AfterSite: React.FC = () => (
  <AbsoluteFill style={{ background: NIGHT }}>
    <div style={{ width: 1040, height: 1016, overflow: "hidden", background: NIGHT }}>
      <Nav />
      <div style={{ display: "flex" }}>
        <HeroCopy />
        <HeroArt />
      </div>
      <Band />
      <Proof />
      <Footer />
    </div>
  </AbsoluteFill>
);

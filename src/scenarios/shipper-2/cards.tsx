import React from "react";
import { Img, staticFile } from "remotion";
import { INTER } from "./fonts";
import { GREEN, INK } from "./timings";

const MUTED = "#6B7280";
const LINE = "#E5E7EB";

const Shell: React.FC<{ w: number; h: number; children: React.ReactNode; pad?: number }> = ({ w, h, children, pad = 26 }) => (
  <div style={{ width: w, height: h, background: "#fff", borderRadius: 16, boxShadow: "0 18px 50px rgba(0,0,0,0.14)", overflow: "hidden", fontFamily: INTER, color: INK, padding: pad, boxSizing: "border-box", position: "relative" }}>
    {children}
  </div>
);

const Row: React.FC<{ label: string; value: string; last?: boolean }> = ({ label, value, last }) => (
  <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0", borderBottom: last ? "none" : `1px solid ${LINE}`, fontSize: 18 }}>
    <span style={{ color: MUTED }}>{label}</span>
    <span style={{ fontWeight: 500 }}>{value}</span>
  </div>
);

const Button: React.FC<{ label: string; w?: number }> = ({ label, w }) => (
  <div style={{ width: w, padding: "12px 22px", background: GREEN, color: "#fff", borderRadius: 8, fontSize: 18, fontWeight: 500, textAlign: "center" }}>{label}</div>
);

const Field: React.FC<{ label: string; value?: string; dots?: boolean }> = ({ label, value, dots }) => (
  <div style={{ marginBottom: 18 }}>
    <div style={{ fontSize: 15, color: MUTED, marginBottom: 6 }}>{label}</div>
    <div style={{ height: 46, border: `1px solid ${LINE}`, borderRadius: 8, padding: "0 14px", display: "flex", alignItems: "center", fontSize: 17, letterSpacing: dots ? "0.3em" : undefined }}>{dots ? "••••••••••" : value}</div>
  </div>
);

export const InterfaceCard: React.FC = () => (
  <Shell w={520} h={560} pad={0}>
    <div style={{ position: "relative", height: 330 }}>
      <Img src={staticFile("shipper-2/car-hero.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", left: 24, top: 22, color: "#fff", fontSize: 44, fontWeight: 700, letterSpacing: "0.08em", textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}>ELOVA</div>
      <div style={{ position: "absolute", left: 24, bottom: 22, color: "#fff", fontSize: 20, fontWeight: 500, textShadow: "0 2px 10px rgba(0,0,0,0.45)" }}>Drive the road less travelled.</div>
    </div>
    <div style={{ padding: 24 }}>
      <div style={{ fontSize: 15, color: MUTED, marginBottom: 12 }}>Popular cars by body type</div>
      <div style={{ display: "flex", gap: 12 }}>
        {["Sports", "SUV", "Convertible", "Electric"].map((t, i) => (
          <div key={t} style={{ flex: 1, height: 74, borderRadius: 10, background: i === 0 ? GREEN : "#F3F4F6", color: i === 0 ? "#fff" : INK, display: "flex", alignItems: "flex-end", padding: 10, boxSizing: "border-box", fontSize: 14, fontWeight: 500 }}>{t}</div>
        ))}
      </div>
    </div>
  </Shell>
);

export const AnalyticsCard: React.FC = () => (
  <Shell w={620} h={520}>
    <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Analytics</div>
    <div style={{ fontSize: 15, color: MUTED, marginBottom: 22 }}>Live rental traffic, last 30 days</div>
    <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
      {[["Visitors", "105,381"], ["Bookings", "285,933"], ["Revenue", "$159.2k"], ["Avg. trip", "3.2d"]].map(([k, v]) => (
        <div key={k} style={{ flex: 1, border: `1px solid ${LINE}`, borderRadius: 10, padding: 14 }}>
          <div style={{ fontSize: 13, color: MUTED }}>{k}</div>
          <div style={{ fontSize: 22, fontWeight: 600, marginTop: 6 }}>{v}</div>
        </div>
      ))}
    </div>
    <div style={{ fontSize: 15, color: MUTED, marginBottom: 10 }}>Visit trend</div>
    <svg width="568" height="190" viewBox="0 0 568 190">
      <polyline fill="none" stroke={GREEN} strokeWidth="3" points="0,160 60,140 120,150 180,110 240,120 300,80 360,95 420,55 480,70 568,30" />
      <polygon fill="rgba(31,169,113,0.12)" points="0,160 60,140 120,150 180,110 240,120 300,80 360,95 420,55 480,70 568,30 568,190 0,190" />
    </svg>
  </Shell>
);

export const BackendCard: React.FC = () => (
  <Shell w={620} h={520}>
    <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Bookings</div>
    <div style={{ fontSize: 15, color: MUTED, marginBottom: 18 }}>PostgreSQL · 12,480 rows</div>
    <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr", fontSize: 14, color: MUTED, padding: "8px 0", borderBottom: `1px solid ${LINE}` }}>
      <span>Customer</span><span>Car</span><span>Dates</span><span>Status</span>
    </div>
    {[["Maya Chen", "Roma Coupe", "Sep 4 – 7", "Paid"], ["Luis Ortega", "Model S", "Sep 5 – 9", "Paid"], ["Ava Patel", "911 Targa", "Sep 6 – 8", "Pending"], ["Noah Kim", "Range Rover", "Sep 7 – 12", "Paid"], ["Emma Rossi", "Defender", "Sep 9 – 10", "Paid"]].map((r) => (
      <div key={r[0]} style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr", fontSize: 16, padding: "14px 0", borderBottom: `1px solid ${LINE}` }}>
        <span style={{ fontWeight: 500 }}>{r[0]}</span><span>{r[1]}</span><span style={{ color: MUTED }}>{r[2]}</span>
        <span style={{ color: r[3] === "Paid" ? GREEN : "#B45309", fontWeight: 500 }}>{r[3]}</span>
      </div>
    ))}
  </Shell>
);

export const MediaCard: React.FC = () => (
  <Shell w={440} h={520}>
    <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 4 }}>Media Library</div>
    <div style={{ fontSize: 15, color: MUTED, marginBottom: 18 }}>48 files · 1.2 GB</div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{ height: 104, borderRadius: 8, overflow: "hidden", background: "#F3F4F6" }}>
          {i % 2 === 0 ? <Img src={staticFile("shipper-2/car-hero.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: `${(i * 37) % 100}% 50%`, display: "block" }} /> : null}
        </div>
      ))}
    </div>
    <div style={{ marginTop: 18 }}><Button label="Upload" /></div>
  </Shell>
);

export const LoginCard: React.FC = () => (
  <Shell w={440} h={520} pad={32}>
    <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 26 }}>Welcome back</div>
    <Field label="Email" value="maya@elova.app" />
    <Field label="Password" dots />
    <Button label="Sign in" />
    <div style={{ marginTop: 16, fontSize: 15, color: MUTED }}>Forgot password?</div>
    <div style={{ marginTop: 26, borderTop: `1px solid ${LINE}`, paddingTop: 18 }}>
      <div style={{ height: 46, border: `1px solid ${LINE}`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, gap: 10 }}>
        <Img src={staticFile("claude/int-google.png")} style={{ width: 20, height: 20 }} /> Continue with Google
      </div>
    </div>
  </Shell>
);

export const PaymentsCard: React.FC = () => (
  <Shell w={620} h={340} pad={30}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 20, fontWeight: 600, marginBottom: 22 }}>
      Enable Stripe Payments
      <span style={{ width: 20, height: 20, borderRadius: 10, background: GREEN, color: "#fff", fontSize: 13, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>i</span>
    </div>
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
      <div style={{ flex: 1 }}><Field label="Secret key" dots /></div>
      <div style={{ marginBottom: 18 }}><Button label="Submit" /></div>
    </div>
    <div style={{ fontSize: 16, color: MUTED }}>Create Stripe Key (1-click) ↗</div>
    <Row label="Currency" value="USD" />
    <Row label="Payouts" value="Weekly" last />
  </Shell>
);

export const CARD_BY_LABEL: Record<string, React.FC> = {
  "Beautiful Interface": InterfaceCard,
  Analytics: AnalyticsCard,
  "Back-End": BackendCard,
  "Media Library": MediaCard,
  Login: LoginCard,
  Payments: PaymentsCard,
};

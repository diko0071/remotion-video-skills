import React from "react";
import { AbsoluteFill } from "remotion";
import { PALETTE } from "../timings";
import { UI_FONT } from "./composer";

const CARDS = [
  { title: "AKKEN ZERO", grad: "linear-gradient(150deg,#155A84,#2FA07E,#123A55)" },
  { title: "", grad: "linear-gradient(150deg,#1B8A70,#9FEBC2,#0F5A46)" },
  { title: "DRAW-TO-VIDEO", grad: "linear-gradient(150deg,#3A3A3A,#A8AEB4,#1A1A1A)" },
  { title: "", grad: "linear-gradient(150deg,#E8E8E8,#FFFFFF)" },
];

const Dock: React.FC = () => (
  <div
    style={{
      position: "absolute",
      left: "50%",
      bottom: 14,
      transform: "translateX(-50%)",
      display: "flex",
      gap: 10,
      padding: "9px 14px",
      borderRadius: 18,
      background: "rgba(60,60,60,0.55)",
      border: "1px solid rgba(255,255,255,0.12)",
    }}
  >
    {new Array(14).fill(0).map((_, i) => (
      <div
        key={i}
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: `hsl(${(i * 47) % 360} 62% 55%)`,
        }}
      />
    ))}
  </div>
);

export const HiggsfieldSite: React.FC = () => (
  <AbsoluteFill style={{ background: "#0A0A0A", fontFamily: UI_FONT }}>
    <div
      style={{
        position: "absolute",
        inset: "34px 60px 88px",
        background: "#0D0D0D",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #202020",
      }}
    >
      <div
        style={{
          height: 46,
          background: "#161616",
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "0 16px",
        }}
      >
        <div style={{ display: "flex", gap: 7 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
            <div key={c} style={{ width: 13, height: 13, borderRadius: 999, background: c }} />
          ))}
        </div>
        <div
          style={{
            marginLeft: 20,
            background: "#0E0E0E",
            borderRadius: 8,
            padding: "6px 22px",
            color: "#8A8A8A",
            fontSize: 17,
          }}
        >
          www.higgsfield.ai/?ref=ads
        </div>
      </div>
      <div style={{ height: 8, background: PALETTE.lime }} />
      <div style={{ padding: 26 }}>
        <div style={{ display: "flex", gap: 18, color: "#9A9A9A", fontSize: 16, marginBottom: 22 }}>
          {[
            "Explore",
            "Create",
            "Products",
            "Speak",
            "Marketing Tools",
            "Store",
            "Pricing",
            "APPS",
          ].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {CARDS.map((c, i) => (
            <div
              key={i}
              style={{
                height: 300,
                borderRadius: 12,
                background: c.grad,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 16,
                  bottom: 16,
                  color: "#fff",
                  fontSize: 26,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                {c.title}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr 1fr 1fr",
            gap: 16,
            marginTop: 16,
          }}
        >
          <div
            style={{
              height: 210,
              borderRadius: 12,
              background: "#12C2E9",
              padding: 20,
              color: "#04202A",
            }}
          >
            <div
              style={{
                background: "#FF2D9B",
                color: "#fff",
                display: "inline-block",
                padding: "3px 10px",
                fontSize: 15,
                fontWeight: 700,
              }}
            >
              50% OFF
            </div>
            <div style={{ fontSize: 30, fontWeight: 800, marginTop: 12, lineHeight: 1.05 }}>
              SIGN UP AND GET
              <br />
              YOUR
            </div>
            <div
              style={{
                marginTop: 16,
                background: "#0B1D24",
                color: "#fff",
                borderRadius: 8,
                padding: "9px 16px",
                fontSize: 16,
                display: "inline-block",
              }}
            >
              Sign up and get your discount
            </div>
          </div>
          {["Nano Banana Pro", "Seedance 1.5", "MCP & CLI"].map((t) => (
            <div
              key={t}
              style={{
                height: 210,
                borderRadius: 12,
                background: "#151515",
                border: "1px solid #232323",
                padding: 18,
                color: "#D6D6D6",
                fontSize: 18,
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <div style={{ color: "#8A8A8A", fontSize: 18, marginTop: 22, letterSpacing: "0.05em" }}>
          HIGGSFIELD APPS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 14, marginTop: 12 }}>
          {new Array(8).fill(0).map((_, i) => (
            <div
              key={i}
              style={{
                height: 150,
                borderRadius: 10,
                background: `linear-gradient(150deg, hsl(${(i * 47 + 180) % 360} 30% 30%), hsl(${(i * 47 + 205) % 360} 26% 13%))`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
    <Dock />
  </AbsoluteFill>
);

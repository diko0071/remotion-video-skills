import React from "react";
import { AbsoluteFill, Easing, Img, useCurrentFrame } from "remotion";
import { ChevronRight } from "lucide-react";
import { creativeSrc } from "./creative";
import { MetaMark } from "./icons";
import { MOSAIC_GRID, MOSAICS } from "./mosaic-data";
import { anchorScreen, MosaicView } from "./mosaic-view";
import { PHONE } from "./story";
import { C, R } from "./theme";
import { clamp01, lerp, logZoom, pop, PROMPT_TO_META_TOTAL, PUSH_END_SCALE, ramp, T } from "./timeline";

const LOGO = MOSAICS.logo;
const START_Z = 20;
const TILE = { w: MOSAIC_GRID.k * START_Z * 1.2, h: MOSAIC_GRID.k * START_Z * 1.2 * MOSAIC_GRID.unitH };
const ZOOM_EASE = Easing.bezier(0.55, 0, 0.2, 1);
const HANDOFF_ID = "c2";
const IMAGE = { w: 864, h: 1080 };
const REEL_COVER = Math.max((PHONE.w - PHONE.bezel * 2) / IMAGE.w, (PHONE.h - PHONE.bezel * 2) / IMAGE.h);
const FRAME_COVER = Math.max(1920 / IMAGE.w, 1080 / IMAGE.h);
const HANDOFF_ZOOM = (PUSH_END_SCALE * REEL_COVER) / FRAME_COVER;

export const finaleZoom = (f: number) =>
  f < T.zoomOut2
    ? START_Z
    : logZoom(f, T.zoomOut2, T.zoomEnd2, START_Z, 1, ZOOM_EASE) *
      (1 + 0.04 * ramp(f, T.zoomEnd2, PROMPT_TO_META_TOTAL - T.zoomEnd2, Easing.linear));

const Line: React.FC<{ at: number; f: number; children: React.ReactNode }> = ({ at, f, children }) => {
  const p = pop(f, at, 15, 150);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        fontSize: 88,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        lineHeight: 1.1,
        color: C.paper,
        whiteSpace: "nowrap",
        opacity: clamp01(p * 1.8),
        transform: `translateY(${(1 - p) * 44}px)`,
        filter: `blur(${(1 - clamp01(p)) * 10}px)`,
        textShadow: "0 6px 34px rgba(0,10,40,0.55)",
      }}
    >
      {children}
    </div>
  );
};

export const Finale: React.FC = () => {
  const f = useCurrentFrame();
  if (f < T.handoff) return null;
  const s = anchorScreen(LOGO);
  const shrink = ramp(f, T.handoff, T.shrinkEnd - T.handoff, Easing.inOut(Easing.cubic));
  const adFade = ramp(f, T.shrinkEnd, 4);
  const cx = lerp(960, s.x, shrink);
  const cy = lerp(540, s.y, shrink);
  const width = lerp(1920, TILE.w, shrink);
  const height = lerp(1080, TILE.h, shrink);
  const inner = lerp(HANDOFF_ZOOM, 1, shrink);
  const button = pop(f, T.endButton, 14, 170);
  const shine = ramp(f, T.endHit - 2, 16, Easing.linear);
  const hitScale = f >= T.endHit ? 1 + 0.06 * Math.sin(Math.min(1, (f - T.endHit) / 10) * Math.PI) : 1;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <MosaicView mosaic={LOGO} z={finaleZoom(f)} />
      {adFade < 1 ? (
        <div
          style={{
            position: "absolute",
            left: cx - width / 2,
            top: cy - height / 2,
            width,
            height,
            overflow: "hidden",
            opacity: 1 - adFade,
            boxShadow: `0 ${30 * shrink}px ${70 * shrink}px rgba(0,10,30,${0.45 * shrink})`,
          }}
        >
          <Img
            src={creativeSrc(HANDOFF_ID)}
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${inner})` }}
          />
        </div>
      ) : null}
      {f >= T.endText ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 646,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Line at={T.endText} f={f}>
            One prompt.
          </Line>
          <Line at={T.endText + 7} f={f}>
            Ads live on
            <MetaMark size={84} color={C.paper} style={{ marginTop: 6, filter: "drop-shadow(0 6px 30px rgba(0,10,40,0.5))" }} />
            Meta.
          </Line>
          <div
            style={{
              marginTop: 30,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "20px 32px",
              borderRadius: R.md * 2,
              background: C.primary,
              color: "#fafafa",
              fontSize: 34,
              fontWeight: 500,
              opacity: clamp01(button * 2),
              transform: `translateY(${(1 - button) * 26}px) scale(${lerp(0.9, 1, button) * hitScale})`,
              boxShadow: "0 20px 50px rgba(0,10,40,0.45)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                width: 90,
                left: `${lerp(-30, 130, shine)}%`,
                background: "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                transform: "skewX(-18deg)",
              }}
            />
            get-ryze.ai
            <ChevronRight size={32} color="#fafafa" strokeWidth={2.2} />
          </div>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

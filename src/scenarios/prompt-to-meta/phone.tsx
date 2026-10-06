import React from "react";
import { AbsoluteFill, Img, useCurrentFrame } from "remotion";
import { AdCreative } from "./creative";
import { Bookmark, ChevronRight, Heart, MessageCircle, Send } from "lucide-react";
import { InstagramLogo } from "./icons";
import { CREATIVES, PHONE } from "./story";
import { asset, C, R, SHADOW } from "./theme";
import { clamp01, glide, lerp, pop, ramp, T } from "./timeline";

const SCREEN_W = PHONE.w - PHONE.bezel * 2;
const SCREEN_H = PHONE.h - PHONE.bezel * 2;
const STATUS_H = 54;
const MEDIA_H = Math.round((SCREEN_W * 5) / 4);
const POST_H = 60 + MEDIA_H + 48 + 46 + 50;
const FEED = [CREATIVES[0], CREATIVES[2]];
const STORY = CREATIVES[3];
const REEL = CREATIVES[1];
const LIKE_AT = T.like;

const PLACEMENTS = [
  { at: T.phone + 18, text: "Instagram · Feed" },
  { at: T.stories, text: "Instagram · Stories" },
  { at: T.reels, text: "Instagram · Reels" },
] as const;

const Avatar: React.FC<{ size: number; ring?: string }> = ({ size, ring = "#e1306c" }) => (
  <div style={{ width: size, height: size, borderRadius: size, overflow: "hidden", boxShadow: `0 0 0 2px ${C.paper}, 0 0 0 3.5px ${ring}` }}>
    <Img src={asset("brand/fishwife-product.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
  </div>
);

const Post: React.FC<{ id: string; copy: string; liked: boolean }> = ({ id, copy, liked }) => (
  <div style={{ width: SCREEN_W, height: POST_H, background: C.paper }}>
    <div style={{ height: 60, display: "flex", alignItems: "center", gap: 12, padding: "0 14px" }}>
      <Avatar size={38} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>fishwife</div>
        <div style={{ fontSize: 13, fontWeight: 500, color: C.mutedFg }}>Sponsored</div>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ fontSize: 22, fontWeight: 800, color: C.ink, letterSpacing: 1 }}>···</div>
    </div>
    <div style={{ position: "relative", width: SCREEN_W, height: MEDIA_H }}>
      <AdCreative id={id} copy={copy} width={SCREEN_W} radius={0} />
    </div>
    <div
      style={{
        height: 48,
        background: "#eff1f4",
        display: "flex",
        alignItems: "center",
        padding: "0 14px",
        fontSize: 16,
        fontWeight: 700,
        color: C.ink,
      }}
    >
      Shop now
      <div style={{ flex: 1 }} />
      <ChevronRight size={20} strokeWidth={2.2} color={C.ink} />
    </div>
    <div style={{ height: 46, display: "flex", alignItems: "center", gap: 16, padding: "0 14px" }}>
      <Heart size={27} strokeWidth={2} color={liked ? "#ff3040" : C.ink} fill={liked ? "#ff3040" : "none"} />
      <MessageCircle size={26} strokeWidth={2} color={C.ink} />
      <Send size={25} strokeWidth={2} color={C.ink} />
      <div style={{ flex: 1 }} />
      <Bookmark size={25} strokeWidth={2} color={C.ink} />
    </div>
    <div style={{ height: 50, padding: "0 14px", fontSize: 15, color: C.ink, lineHeight: 1.3 }}>
      <span style={{ fontWeight: 700 }}>fishwife</span> {copy}
    </div>
  </div>
);

const FeedScreen: React.FC<{ f: number }> = ({ f }) => {
  const scroll = glide(f, T.feedScroll, 150);
  const liked = f >= LIKE_AT;
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: SCREEN_W, height: SCREEN_H, background: C.paper, overflow: "hidden" }}>
      <div style={{ position: "absolute", left: 0, top: STATUS_H, transform: `translateY(${-scroll * POST_H}px)` }}>
        {FEED.map((c, i) => (
          <Post key={c.id} id={c.id} copy={c.copy} liked={i === 0 && liked} />
        ))}
      </div>
    </div>
  );
};

const FullBleed: React.FC<{ id: string; copy: string; kind: "story" | "reel"; f: number; start: number; chrome?: number }> = ({
  id,
  copy,
  kind,
  f,
  start,
  chrome = 1,
}) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: SCREEN_W, height: SCREEN_H, background: C.ink, overflow: "hidden" }}>
    <div style={{ position: "absolute", left: 0, top: 0, width: SCREEN_W, height: SCREEN_H - (kind === "reel" ? 0 : 24) }}>
      <AdCreative id={id} copy={copy} width={SCREEN_W} radius={0} copyOpacity={chrome} />
    </div>
    {kind === "story" ? (
      <div style={{ position: "absolute", left: 12, right: 12, top: STATUS_H + 6, display: "flex", gap: 4 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: "rgba(255,255,255,0.4)", overflow: "hidden" }}>
            <div style={{ width: i === 0 ? `${100 * clamp01((f - start) / 40)}%` : "0%", height: "100%", background: C.paper }} />
          </div>
        ))}
      </div>
    ) : null}
    <div
      style={{
        position: "absolute",
        left: 14,
        top: kind === "story" ? STATUS_H + 20 : STATUS_H + 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: C.paper,
        textShadow: "0 1px 8px rgba(0,0,0,0.35)",
        opacity: chrome,
      }}
    >
      <Avatar size={34} ring={C.paper} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 15, fontWeight: 700 }}>fishwife</div>
        <div style={{ fontSize: 12, fontWeight: 500, opacity: 0.85 }}>Sponsored</div>
      </div>
    </div>
    {kind === "reel" ? (
      <div
        style={{
          position: "absolute",
          right: 14,
          bottom: 190,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          alignItems: "center",
          filter: "drop-shadow(0 1px 6px rgba(0,0,0,0.4))",
          opacity: chrome,
        }}
      >
        <Heart size={30} strokeWidth={2} color={C.paper} />
        <MessageCircle size={29} strokeWidth={2} color={C.paper} />
        <Send size={28} strokeWidth={2} color={C.paper} />
      </div>
    ) : null}
  </div>
);

const PlacementTag: React.FC<{ f: number }> = ({ f }) => {
  const idx = PLACEMENTS.reduce((acc, p, i) => (f >= p.at ? i : acc), 0);
  const p = PLACEMENTS[idx];
  const show = pop(f, PLACEMENTS[0].at, 14, 180);
  const swap = idx === 0 ? 1 : pop(f, p.at, 14, 220);
  return (
    <div
      style={{
        position: "absolute",
        right: 1920 - (PHONE.cx - PHONE.w / 2) + 26,
        top: PHONE.cy - PHONE.h / 2 + 96,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "14px 18px",
        borderRadius: R.md,
        border: `1px solid ${C.border}`,
        background: C.paper,
        boxShadow: `${SHADOW.chip}, 0 18px 44px rgba(10,30,80,0.3)`,
        fontSize: 22,
        fontWeight: 700,
        color: C.ink,
        letterSpacing: "-0.01em",
        whiteSpace: "nowrap",
        opacity: clamp01(show * 2),
        transform: `translateX(${(1 - show) * 30}px) scale(${lerp(0.92, 1, swap)})`,
        transformOrigin: "100% 50%",
      }}
    >
      <InstagramLogo size={26} />
      <span style={{ opacity: lerp(0.2, 1, swap) }}>{p.text}</span>
      <div style={{ width: 10, height: 10, borderRadius: 10, background: C.emerald, marginLeft: 4 }} />
    </div>
  );
};

export const Phone: React.FC = () => {
  const f = useCurrentFrame();
  const rise = pop(f, T.phone, 15, 120);
  const slide = glide(f, T.stories, 200) + glide(f, T.reels, 200);
  const dark = clamp01(slide);
  const likePop = f >= LIKE_AT ? pop(f, LIKE_AT, 9, 260) : 0;
  if (f < T.phone || f >= T.handoff) return null;
  return (
    <AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: PHONE.cx - PHONE.w / 2,
          top: PHONE.cy - PHONE.h / 2,
          width: PHONE.w,
          height: PHONE.h,
          borderRadius: 64,
          background: C.ink,
          boxShadow: "0 60px 140px rgba(0,20,60,0.45), inset 0 0 0 2px #2a2c31",
          transform: `translateY(${lerp(1000, 0, rise)}px) rotate(${lerp(8, 0, rise)}deg)`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: PHONE.bezel,
            top: PHONE.bezel,
            width: SCREEN_W,
            height: SCREEN_H,
            borderRadius: 50,
            overflow: "hidden",
            background: C.paper,
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 0, width: SCREEN_W * 3, height: SCREEN_H, transform: `translateX(${-slide * SCREEN_W}px)` }}>
            <div style={{ position: "absolute", left: 0, top: 0 }}>
              <FeedScreen f={f} />
            </div>
            <div style={{ position: "absolute", left: SCREEN_W, top: 0 }}>
              <FullBleed id={STORY.id} copy={STORY.copy} kind="story" f={f} start={T.stories} />
            </div>
            <div style={{ position: "absolute", left: SCREEN_W * 2, top: 0 }}>
              <FullBleed id={REEL.id} copy={REEL.copy} kind="reel" f={f} start={T.reels} chrome={1 - ramp(f, T.push, 10)} />
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: STATUS_H,
              background: `rgba(255,255,255,${1 - dark})`,
              display: "flex",
              alignItems: "center",
              padding: "6px 30px 0",
              fontSize: 17,
              fontWeight: 700,
              color: dark > 0.5 ? C.paper : C.ink,
            }}
          >
            9:41
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", gap: 5, alignItems: "flex-end" }}>
              {[7, 10, 13, 16].map((h) => (
                <div key={h} style={{ width: 4, height: h, borderRadius: 1, background: dark > 0.5 ? C.paper : C.ink }} />
              ))}
              <div
                style={{
                  width: 27,
                  height: 13,
                  borderRadius: 4,
                  border: `2px solid ${dark > 0.5 ? C.paper : C.ink}`,
                  marginLeft: 6,
                  padding: 1.5,
                }}
              >
                <div style={{ width: "80%", height: "100%", borderRadius: 2, background: dark > 0.5 ? C.paper : C.ink }} />
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: SCREEN_W / 2 - 62, top: 11, width: 124, height: 36, borderRadius: 20, background: C.ink }} />
          {f >= LIKE_AT && f < LIKE_AT + 22 ? (
            <div
              style={{
                position: "absolute",
                left: SCREEN_W / 2 - 60,
                top: STATUS_H + 60 + MEDIA_H / 2 - 60,
                width: 120,
                height: 120,
                opacity: 1 - ramp(f, LIKE_AT + 12, 10),
                transform: `scale(${lerp(0.2, 1.1, likePop)})`,
                filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.35))",
              }}
            >
              <Heart size={120} strokeWidth={1.5} color={C.paper} fill={C.paper} />
            </div>
          ) : null}
        </div>
      </div>
      <PlacementTag f={f} />
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, Easing, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { ramp, springAt, SPRINGS } from "../../core/motion";
import { MOSAIC_TILES } from "./assets";
import { INTER } from "./font";
import { DARK, WELCOME } from "./timings";

const DOT_GRID: React.CSSProperties = {
  backgroundImage: "radial-gradient(circle, #2a2a2a 1.6px, transparent 1.9px)",
  backgroundSize: "48px 48px",
  backgroundPosition: "24px 24px",
};

const Word: React.FC<{ text: string; size: number; italic?: boolean; weight?: number; color?: string }> = ({ text, size, italic, weight = 400, color = "#fff" }) => (
  <div style={{ position: "absolute", left: 0, right: 0, top: 529 - size * 0.62, textAlign: "center", fontFamily: INTER, fontSize: size, fontWeight: weight, fontStyle: italic ? "italic" : "normal", color, letterSpacing: "-0.01em" }}>
    {text}
  </div>
);

const Tile: React.FC<{ index: number }> = ({ index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = MOSAIC_TILES[index];
  const at = WELCOME.mosaic.at + index * WELCOME.mosaic.step;
  const pop = springAt(frame, fps, at, SPRINGS.pop, 18);
  const collapse = ramp(frame, WELCOME.mosaic.collapse[0], WELCOME.mosaic.collapse[1], Easing.in(Easing.cubic));
  const s = Math.max(0, 0.3 + 0.7 * pop) * (1 - collapse);
  const cx = t.x + t.w / 2;
  const cy = t.y + t.h / 2;
  return (
    <>
      {[2, 1, 0].map((e) => (
        <div
          key={e}
          style={{
            position: "absolute",
            left: t.x + t.echo.dx * e,
            top: t.y + t.echo.dy * e,
            width: t.w,
            height: t.h,
            overflow: "hidden",
            opacity: e === 0 ? 1 : 0.85,
            transform: `scale(${s})`,
            transformOrigin: `${cx - t.x - t.echo.dx * e}px ${cy - t.y - t.echo.dy * e}px`,
          }}
        >
          <Img src={staticFile(t.file)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
      ))}
    </>
  );
};

const GridTile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = springAt(frame, fps, WELCOME.grid.at, SPRINGS.pop, 18);
  const collapse = ramp(frame, WELCOME.mosaic.collapse[0], WELCOME.mosaic.collapse[1], Easing.in(Easing.cubic));
  const s = Math.max(0, pop) * (1 - collapse);
  return (
    <div style={{ position: "absolute", left: 0, top: 600, width: 290, height: 480, transform: `scale(${s})`, transformOrigin: "145px 240px", backgroundImage: "linear-gradient(#fff 2px, transparent 2px), linear-gradient(90deg, #fff 2px, transparent 2px)", backgroundSize: "40px 40px", opacity: 0.9 }} />
  );
};

const Matrix: React.FC = () => {
  const frame = useCurrentFrame();
  const cells = Math.floor(Math.max(0, frame - WELCOME.matrix.at) * 9);
  const collapse = ramp(frame, WELCOME.mosaic.collapse[0], WELCOME.mosaic.collapse[1]);
  const cols = 22;
  return (
    <div style={{ position: "absolute", right: 60, bottom: 40, width: cols * 14, height: 8 * 14, display: "grid", gridTemplateColumns: `repeat(${cols}, 14px)`, opacity: 1 - collapse }}>
      {Array.from({ length: cols * 8 }, (_, i) => (
        <div key={i} style={{ width: 10, height: 10, background: i < cells ? "#fff" : "transparent" }} />
      ))}
    </div>
  );
};

export const Welcome: React.FC = () => {
  const frame = useCurrentFrame();
  const w = WELCOME.welcome;
  const mosaicOn = frame >= WELCOME.mosaic.at;
  const veedOn = frame >= WELCOME.veed.at;
  return (
    <AbsoluteFill style={{ background: DARK, ...DOT_GRID }}>
      {frame >= w.at && frame < w.flashUntil && <Word text="Welcome" size={w.flashSize} italic weight={800} />}
      {frame >= w.flashUntil && frame < w.thinUntil && <Word text="Welcome" size={w.thinSize} weight={300} color="#B9B9B9" />}
      {frame >= w.thinUntil && frame < w.until && <Word text="Welcome" size={w.size} />}
      {frame >= WELCOME.to.at && frame < WELCOME.to.until && <Word text="to" size={w.size} />}
      {mosaicOn && (
        <>
          {MOSAIC_TILES.map((_, i) => (
            <Tile key={i} index={i} />
          ))}
          <GridTile />
          <Matrix />
        </>
      )}
      {veedOn && (
        <>
          <div style={{ position: "absolute", left: 0, right: 0, top: 529 - WELCOME.veed.size * 0.62, textAlign: "center", fontFamily: INTER, fontSize: WELCOME.veed.size, fontWeight: 900, color: "#fff", letterSpacing: "0.02em", transform: "scaleX(1.22)", zIndex: 10 }}>
            VEED
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};

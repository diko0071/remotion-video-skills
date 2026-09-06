import React from "react";
import { AbsoluteFill, Easing, useCurrentFrame } from "remotion";
import { ramp } from "../../core/motion";
import { Cursor } from "../../kit/cursor";
import { DirectionalBlur } from "../../kit/directional-blur";
import { DASH } from "./dash-timings";
import { BarRows, Bars, Bells, Card, CardHead, Chip, Counter, Gauge, ModelTiles, SourceRows, ThickLine } from "./widgets";

const W = DASH.window;
const PAGE_OFFSET = { x: W.x + 40, y: W.y + W.bar + 24 };
const WHIP_ORIGIN = { x: 100, y: 83 };
const CLOSE = { x: W.x + 22, y: W.y + 22 };

const pageTransform = (frame: number) => {
  const p = ramp(frame, W.at, W.at + W.len, Easing.inOut(Easing.cubic));
  const s = 1 + (W.scale - 1) * p;
  return { s, tx: PAGE_OFFSET.x * p, ty: PAGE_OFFSET.y * p, p };
};

const Window: React.FC<{ p: number }> = ({ p }) => (
  <div style={{ position: "absolute", left: W.x, top: W.y, width: W.w, height: W.h, borderRadius: 18, background: "#F4F2E6", boxShadow: "0 40px 90px rgba(40,30,10,0.22), 0 0 0 1px rgba(0,0,0,0.08)", opacity: p, transform: `scale(${1.08 - 0.08 * p})`, overflow: "hidden" }}>
    <div style={{ height: W.bar, background: "#1E1E1E", display: "flex", alignItems: "center", padding: "0 18px", gap: 10 }}>
      {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
        <span key={c} style={{ width: 16, height: 16, borderRadius: 8, background: c, display: "inline-block" }} />
      ))}
      <span style={{ flex: 1, textAlign: "center", color: "#8A8A8A", fontFamily: "Inter, sans-serif", fontSize: 14 }}>Ryze — AI Visibility</span>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const { s, tx, ty, p } = pageTransform(frame);
  const tilt = ramp(frame, DASH.tilt[0], DASH.tilt[1], Easing.inOut(Easing.cubic));
  const whip = ramp(frame, DASH.whip[0], DASH.whip[1], Easing.inOut(Easing.cubic));
  const whipPrev = ramp(frame - 1, DASH.whip[0], DASH.whip[1], Easing.inOut(Easing.cubic));
  const zoom = 1 + 0.04 * tilt + (2.3 - 1.04) * whip;
  const rx = 6 * tilt * (1 - whip);
  const ry = -9 * tilt * (1 - whip);
  const closeScreen = { x: WHIP_ORIGIN.x + (CLOSE.x - WHIP_ORIGIN.x) * 2.3, y: WHIP_ORIGIN.y + (CLOSE.y - WHIP_ORIGIN.y) * 2.3 };
  return (
    <AbsoluteFill style={{ perspective: 2600, perspectiveOrigin: "50% 40%" }}>
      <DirectionalBlur id="sa-dash-whip" x={Math.abs(whip - whipPrev) * 300} y={Math.abs(whip - whipPrev) * 300} style={{ position: "absolute", inset: 0 }}>
        <div style={{ position: "absolute", inset: 0, transformOrigin: `${WHIP_ORIGIN.x}px ${WHIP_ORIGIN.y}px`, transform: `scale(${zoom}) rotateX(${rx}deg) rotateY(${ry}deg)`, transformStyle: "preserve-3d" }}>
          {frame >= W.at ? <Window p={p} /> : null}
          {frame >= DASH.click ? <div style={{ position: "absolute", left: CLOSE.x - 8, top: CLOSE.y - 8, width: 16, height: 16, borderRadius: 8, background: "#FF5F57", boxShadow: "0 0 0 8px rgba(255,95,87,0.35)" }} /> : null}
          <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1400, transform: `translate(${tx}px, ${ty}px) scale(${s})`, transformOrigin: "0 0" }}>
            <Card id="sa-cardA" {...DASH.cardA} scaleFrom={1.15}>
              <div style={{ padding: "34px 36px" }}>
                <CardHead title="LLM Visibility Score &" sub="Your Brand visibility & ranking in AI" at={DASH.cardA.at + 2} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 40 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <Counter from={0} to={10} range={DASH.counter} />
                    {frame >= DASH.chipAt ? (
                      <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <Chip at={DASH.chipAt} label="↑ 0.48" />
                        <span style={{ fontSize: 24, color: "#444", opacity: ramp(frame, DASH.chipAt + 4, DASH.chipAt + 12) }}>vs previous</span>
                      </span>
                    ) : null}
                  </div>
                  {frame >= DASH.rankAt ? (
                    <div style={{ textAlign: "right", opacity: ramp(frame, DASH.rankAt, DASH.rankAt + 8) }}>
                      <div style={{ fontSize: 48, fontWeight: 600 }}>#8</div>
                      <div style={{ fontSize: 24, color: "#444" }}>Your rank</div>
                    </div>
                  ) : null}
                </div>
                <div style={{ position: "absolute", left: 36, top: 380, width: 928, height: 250 }}>
                  <ThickLine range={DASH.line} w={928} h={230} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#555", marginTop: 20, padding: "0 30px" }}>
                    {["Jan1", "Jan2", "Jan3", "Jan4", "Jan5"].map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
            <Card id="sa-cardB" {...DASH.cardB}>
              <div style={{ padding: "26px 28px" }}>
                <CardHead title="Visibility over time" sub="Daily visibility share across tracked prompts" at={DASH.cardB.at + 2} size={22} />
                <div style={{ marginTop: 46, marginLeft: 50 }}>
                  <Bells range={DASH.curves} w={520} h={220} />
                </div>
                <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 44, fontSize: 16, color: "#333" }}>
                  <span><span style={{ color: "#2FD3B0" }}>●</span> Graza</span>
                  <span><span style={{ color: "#6A5CFF" }}>●</span> Brightland (You)</span>
                </div>
              </div>
            </Card>
            <Card id="sa-cardC" {...DASH.cardC}>
              <div style={{ padding: "34px 36px" }}>
                <CardHead title="Sentiment Distribution" sub="How AI models perceive your brand" at={DASH.cardC.at + 2} icons={false} info />
                <div style={{ marginTop: 34, borderRadius: 20, border: "1px solid rgba(0,0,0,0.08)", background: "#FFF", padding: "28px 34px" }}>
                  <div style={{ fontSize: 30, fontWeight: 500 }}>Net sentiment</div>
                  <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                    <Gauge range={DASH.gauge} size={560} value={82} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, marginTop: 18, opacity: ramp(frame, DASH.legendAt, DASH.legendAt + 8) }}>
                    <span><span style={{ color: "#20C15E" }}>■</span> Positive</span>
                    <span>1,454 · <b>76</b></span>
                  </div>
                </div>
              </div>
            </Card>
            <Card id="sa-cardD" {...DASH.cardD}>
              <div style={{ padding: "26px 28px" }}>
                <CardHead title="Sentiment Score" sub="Sentiment score per brand across LLMs" at={DASH.cardD.at + 2} size={22} info />
                <div style={{ marginTop: 40 }}>
                  <Bars range={[DASH.cardD.at + 6, DASH.cardD.at + 30]} w={500} h={260} values={[{ v: 82, color: "#3B6BFF", icon: "ai/chatgpt.png" }, { v: 66, color: "#6A8CFF", icon: "ai/claude.png" }, { v: 55, color: "#9BB0FF", icon: "ai/gemini.png" }, { v: 44, color: "#F26B5B", icon: "ai/perplexity.webp" }, { v: 36, color: "#F26B5B", icon: "ai/chatgpt.png" }, { v: 30, color: "#F26B5B", icon: "ai/claude.png" }]} />
                </div>
              </div>
            </Card>
            <Card id="sa-cardE" {...DASH.cardE}>
              <div style={{ padding: "26px 28px" }}>
                <div style={{ display: "flex", gap: 26, fontSize: 17, color: "#555", marginBottom: 26 }}>
                  <span style={{ color: "#3B6BFF", fontWeight: 600 }}>▤ Leaderboard</span><span>▤ Positioning Matrix</span><span>▤ Compare</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 18 }}>
                  {[["Visibility rank", "#3 of 12"], ["Share of voice", "18.4%"], ["Avg. sentiment", "64"], ["Top brand", "Graza"]].map(([k, v]) => (
                    <div key={k}>
                      <div style={{ fontSize: 14, color: "#777" }}>{k}</div>
                      <div style={{ fontSize: 26, fontWeight: 600, marginTop: 6 }}>{v}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 30 }}>
                  <BarRows at={DASH.cardE.at + 10} rows={[{ label: "Graza", v: 92, color: "#3B6BFF" }, { label: "Brightland", v: 74, color: "#6A5CFF" }, { label: "Kosterina", v: 58, color: "#9BB0FF" }, { label: "Fat Gold", v: 41, color: "#C9C4B0" }]} />
                </div>
              </div>
            </Card>
            <Card id="sa-cardF" {...DASH.cardF}>
              <div style={{ padding: "26px 28px" }}>
                <CardHead title="Sentiment by Model" sub="Across all AI" at={DASH.cardF.at + 2} size={22} icons={false} info />
                <div style={{ marginTop: 22 }}>
                  <ModelTiles at={DASH.cardF.at + 6} items={[{ name: "ChatGPT", icon: "ai/chatgpt.png", v: 80, delta: "+7.4" }, { name: "Claude", icon: "ai/claude.png", v: 75, delta: "+6.0" }, { name: "Google", icon: "ai/google.svg", v: 70, delta: "+3.6" }, { name: "Perplexity", icon: "ai/perplexity.webp", v: 46, delta: "-1.4" }]} />
                </div>
              </div>
            </Card>
            <Card id="sa-cardG" {...DASH.cardG}>
              <div style={{ padding: "26px 28px" }}>
                <CardHead title="Competitor Sentiment Comparison" sub="How your competitors are perceived" at={DASH.cardG.at + 2} size={22} icons={false} info />
                <div style={{ marginTop: 26 }}>
                  <BarRows at={DASH.cardG.at + 8} rows={[{ label: "Net sentiment", v: 82, color: "#3B6BFF" }, { label: "Positive rate", v: 68, color: "#3B6BFF" }, { label: "Share of voice", v: 52, color: "#C9C4B0" }, { label: "Avg. position", v: 37, color: "#C9C4B0" }]} />
                </div>
              </div>
            </Card>
            <Card id="sa-cardH" {...DASH.cardH}>
              <div style={{ padding: "26px 28px" }}>
                <CardHead title="Metric comparison" sub="Key AI-search signals side by side" at={DASH.cardH.at + 2} size={22} icons={false} />
                <div style={{ display: "grid", gridTemplateColumns: "180px repeat(4, 1fr)", gap: 14, marginTop: 26, fontSize: 17 }}>
                  {["", "Brightland", "Graza", "Kosterina", "Fat Gold"].map((h) => (
                    <div key={h} style={{ color: "#777" }}>{h}</div>
                  ))}
                  {[["Visibility", "22.1%", "28.4%", "23.8%", "15.8%"], ["Share of voice", "50", "22", "20", "18"], ["Avg. sentiment", "72", "68", "61", "56"]].flatMap((row, ri) =>
                    row.map((c, ci) => (
                      <div key={`${ri}-${ci}`} style={{ opacity: ramp(frame, DASH.cardH.at + 8 + ri * 4, DASH.cardH.at + 16 + ri * 4), color: ci === 0 ? "#555" : "#111", fontWeight: ci === 0 ? 400 : 600 }}>
                        {c}
                        {ci > 0 ? <span style={{ display: "block", height: 8, borderRadius: 4, marginTop: 6, background: ["#6A5CFF", "#F5A3C7", "#2FD3B0", "#F2B233"][ci - 1], width: `${40 + ri * 12 + ci * 8}%` }} /> : null}
                      </div>
                    )),
                  )}
                </div>
              </div>
            </Card>
            <Card id="sa-cardI" {...DASH.cardI}>
              <div style={{ padding: "22px 26px" }}>
                <CardHead title="Top sources citing Brightland" sub="Sources most often cited alongside this brand" at={DASH.cardI.at + 2} size={20} icons={false} />
                <div style={{ marginTop: 18 }}>
                  <SourceRows at={DASH.cardI.at + 6} rows={[{ title: "What is the best olive oil for everyday cooking?", domain: "nytimes.com", n: 34, icon: "favicons/nytimes.com.png" }, { title: "The 9 best olive oils, tested by our kitchen", domain: "thespruce.com", n: 45, icon: "favicons/thespruce.com.png" }, { title: "Top alternatives to Graza for finishing dishes", domain: "bhg.com", n: 34, icon: "favicons/bhg.com.png" }]} />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DirectionalBlur>
      <Cursor
        scale={2.2}
        appearAt={DASH.cursorIn}
        stops={[
          { x: 420, y: 980, at: DASH.cursorIn },
          { x: closeScreen.x + 6, y: closeScreen.y + 8, at: DASH.closeAt },
          { x: closeScreen.x + 6, y: closeScreen.y + 8, at: DASH.click, click: true },
        ]}
      />
    </AbsoluteFill>
  );
};

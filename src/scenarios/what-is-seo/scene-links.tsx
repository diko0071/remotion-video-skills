import React from "react";
import { AbsoluteFill } from "remotion";
import { SPRINGS, useSpringAt } from "../../core/motion";
import { StepTitle, Zoom, zoneTop } from "../../kit/explainer";
import { ChainArrow } from "../../kit/chain-arrow";
import { Pop } from "../../kit/pop";
import { FONT, P, StatusPill } from "../../kit/product-ui";
import { GlobeIcon } from "../../kit/ryze-ui/icons";
import { Chip } from "./articles/chip";
import { LIST_ROW_H, ListRow } from "./articles/list-row";
import { BACKLINKS, CHAIN, SITE } from "./data";
import { K_LINKS as K } from "./timings";

const S = 1.8;
const W = 900;
const NODE_W = 184;
const NODE_H = 52;
const NODE_GAP = (W - NODE_W * CHAIN.length) / (CHAIN.length - 1);
const CHAIN_TOP = 70;
const CARD_W = 580;
const CARD_TOP = CHAIN_TOP + NODE_H + 56;
const CARD_H = 52 + BACKLINKS.length * LIST_ROW_H + 12;
const H = CARD_TOP + CARD_H;
const TOP = zoneTop(H * S) + 20;
const nodeX = (i: number) => i * (NODE_W + NODE_GAP);

const Node: React.FC<{ i: number; at: number; glow: number }> = ({ i, at, glow }) => {
  const n = CHAIN[i];
  const you = "you" in n && n.you;
  return (
    <div style={{ position: "absolute", left: nodeX(i), top: CHAIN_TOP, width: NODE_W }}>
      <Pop at={at} from={0.8} rise={10}>
        <div
          className="pg-card"
          style={{
            width: NODE_W,
            height: NODE_H,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 10px",
            fontFamily: FONT,
            boxShadow: you ? `0 0 0 1.5px ${P.brand}, 0 0 0 ${4 * glow}px color-mix(in srgb, ${P.brand} 30%, transparent)` : "0 0 0 1px rgba(15,23,42,0.1)",
          }}
        >
          <span style={{ display: "flex", color: you ? P.brandDeep : P.mutedFg, flex: "none" }}>{GlobeIcon({ size: 16 })}</span>
          <span style={{ minWidth: 0, display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: P.fg, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.site}</span>
            <span style={{ fontSize: 11, color: you ? P.brandDeep : P.mutedFg, fontWeight: you ? 600 : 400 }}>{you ? "Your site" : `DR ${n.dr}`}</span>
          </span>
        </div>
      </Pop>
    </div>
  );
};

export const LinksScene: React.FC = () => {
  const youGlow = useSpringAt(K.newLinks - 4, SPRINGS.smooth, 12);
  const nonCompeting = useSpringAt(K.compete - 2, SPRINGS.pop, 16);
  const label = useSpringAt(0, SPRINGS.smooth, 12);
  return (
    <AbsoluteFill style={{ background: P.bg }}>
      <AbsoluteFill>
        <StepTitle step={6} text="Backlinks from the exchange" at={-8} />
        <Zoom w={W} s={S} top={TOP}>
          <div style={{ position: "relative", width: W, height: H }}>
            <div style={{ position: "absolute", left: 0, top: 0, width: W, textAlign: "center", fontFamily: FONT, fontSize: 13, fontWeight: 600, color: P.mutedFg, opacity: label }}>
              Ryze Backlink Exchange
              <span style={{ marginLeft: 10, display: "inline-block", opacity: nonCompeting, transform: `scale(${0.85 + 0.15 * nonCompeting})` }}>
                <Chip text="Non-competing sites" on={1} />
              </span>
            </div>
            {CHAIN.map((n, i) => (
              <Node key={n.site} i={i} at={2 + i * 4} glow={i === 2 ? youGlow : 0} />
            ))}
            {CHAIN.slice(0, -1).map((n, i) => (
              <ChainArrow
                key={n.site}
                at={K.chains - 6 + i * 5}
                fromX={nodeX(i) + NODE_W - 22}
                toX={nodeX(i + 1) + 22}
                y={CHAIN_TOP}
                lift={34}
                width={2.5}
                head={10}
                stage={{ w: W, h: H }}
              />
            ))}
            <div style={{ position: "absolute", left: (W - CARD_W) / 2, top: CARD_TOP }}>
              <Pop at={K.newLinks - 8} from={0.92} rise={14}>
                <div className="pg-card" style={{ width: CARD_W, height: CARD_H, boxSizing: "border-box", padding: "0 16px", fontFamily: FONT, boxShadow: "0 0 0 1px rgba(15,23,42,0.1), 0 12px 32px rgba(15,23,42,0.06)" }}>
                  <div style={{ height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${P.border}` }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: P.fg }}>Backlinks to {SITE}</span>
                  </div>
                  {BACKLINKS.map((b, i) => (
                    <Pop key={b.site} at={K.newLinks - 2 + i * 4} from={0.96} rise={10}>
                      <div style={{ width: CARD_W - 32 }}>
                        <ListRow
                          title={b.site}
                          sub={b.page}
                          first={i === 0}
                          right={
                            <>
                              <span style={{ fontSize: 13, fontWeight: 600, color: P.fg, fontVariantNumeric: "tabular-nums" }}>DR {b.dr}</span>
                              <StatusPill label="Live" tone="positive" />
                            </>
                          }
                        />
                      </div>
                    </Pop>
                  ))}
                </div>
              </Pop>
            </div>
          </div>
        </Zoom>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

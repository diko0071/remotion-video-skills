import React from "react";
import { C, polyline } from "../launch";
import { Card, CardHead } from "./card";
import { AD_GREEN, AD_RED, CARD_SHADOW } from "./tokens";

export const SPARK = { left: 0, right: 496, top: 0, bottom: 64 } as const;

export const sparkPoint = (values: readonly number[], i: number) => ({
  x: SPARK.left + (i * (SPARK.right - SPARK.left)) / (values.length - 1),
  y: SPARK.bottom - values[i] * (SPARK.bottom - SPARK.top),
});

const sparkPath = (values: readonly number[]) => polyline(values.map((_, i) => sparkPoint(values, i)));

export const SparkCard: React.FC<{
  logo: string;
  title: string;
  sub: string;
  value: string;
  good: boolean;
  values: readonly number[];
  chip?: string;
  draw?: number;
  shadow?: string;
  endDot?: boolean;
}> = ({ logo, title, sub, value, good, values, chip, draw = 1, shadow = CARD_SHADOW, endDot = true }) => {
  const last = values[values.length - 1];
  return (
    <Card w={560} h={214} pad="26px 32px" shadow={shadow}>
      <div style={{ position: "relative", height: "100%" }}>
        <CardHead logo={logo} title={title} sub={sub} />
        <div style={{ position: "absolute", right: 0, top: -6, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <span style={{ fontSize: 50, fontWeight: 800, letterSpacing: "-0.035em", color: good ? C.ink : AD_RED, fontVariantNumeric: "tabular-nums" }}>{value}</span>
          {chip ? (
            <span style={{ padding: "3px 10px 5px", borderRadius: 8, background: good ? AD_GREEN : AD_RED, color: C.white, fontSize: 17, fontWeight: 700 }}>{chip}</span>
          ) : null}
        </div>
        <svg width={SPARK.right} height={SPARK.bottom + 12} style={{ position: "absolute", left: 0, bottom: -4, overflow: "visible" }}>
          <path
            d={sparkPath(values)}
            fill="none"
            stroke={good ? AD_GREEN : AD_RED}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={1 - draw}
          />
          {endDot && draw > 0.98 ? (
            <circle cx={SPARK.right} cy={SPARK.bottom - last * (SPARK.bottom - SPARK.top)} r={9} fill={good ? AD_GREEN : AD_RED} stroke={C.white} strokeWidth={3} />
          ) : null}
        </svg>
      </div>
    </Card>
  );
};

import React from "react";
import { Img } from "remotion";
import { Loader2 } from "lucide-react";
import { FACEBOOK_PATH, META_PATH } from "./brand-paths";
import { asset } from "./theme";

export const RyzeMark: React.FC<{ size: number; white?: boolean; style?: React.CSSProperties }> = ({
  size,
  white,
  style,
}) => (
  <Img
    src={asset("brand/ryze-sun.png")}
    style={{ width: size, height: size * (731 / 714), filter: white ? "invert(1)" : undefined, ...style }}
  />
);

export const MetaLogo: React.FC<{ width: number; style?: React.CSSProperties }> = ({ width, style }) => (
  <Img src={asset("brand/meta-ads.svg")} style={{ width, height: width * (171 / 256), ...style }} />
);

export const InstagramLogo: React.FC<{ size: number }> = ({ size }) => (
  <Img src={asset("brand/instagram.svg")} style={{ width: size, height: size }} />
);

export const Favicon: React.FC<{ domain: string; size: number; radius?: number }> = ({ domain, size, radius = 2 }) => (
  <Img
    src={asset(`brand/fav/${domain}.png`)}
    style={{ width: size, height: size, borderRadius: radius, objectFit: "cover", flexShrink: 0 }}
  />
);

const Brand: React.FC<{ size: number; color: string; d: string; style?: React.CSSProperties }> = ({
  size,
  color,
  d,
  style,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <path d={d} fill={color} />
  </svg>
);

export const MetaMark: React.FC<{ size: number; color: string; style?: React.CSSProperties }> = (p) => (
  <Brand {...p} d={META_PATH} />
);

export const FacebookIcon: React.FC<{ size: number }> = ({ size }) => <Brand size={size} color="#0866ff" d={FACEBOOK_PATH} />;

export const Spinner: React.FC<{ size: number; frame: number; color: string; strokeWidth?: number }> = ({
  size,
  frame,
  color,
  strokeWidth = 2,
}) => (
  <Loader2 size={size} color={color} strokeWidth={strokeWidth} style={{ transform: `rotate(${frame * 12}deg)`, flexShrink: 0 }} />
);


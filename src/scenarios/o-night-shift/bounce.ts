export const hopAt = (f: number, at: number, height: number, len = 14) => {
  const j = f - at;
  return j >= 0 && j <= len ? -height * Math.sin((Math.PI * j) / len) : 0;
};

export const landSquash = (f: number, at: number, amp = 0.16) => {
  const d = f - at;
  return d >= 0 && d < 26 ? amp * Math.exp(-d / 5) * Math.cos(d * 0.8) : 0;
};

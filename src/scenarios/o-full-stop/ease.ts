export const backOut = (t: number, c = 1.9) => {
  const x = t - 1;
  return 1 + (c + 1) * x * x * x + c * x * x;
};

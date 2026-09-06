export const CHART_W = 520;
export const CHART_H = 190;
export const PLOT_L = 42;
export const PLOT_R = 8;
export const PLOT_T = 10;
export const PLOT_B = 22;

export const STACK_W = 560;
export const STACK_H = 250;
export const STACK_L = 46;
export const STACK_R = 10;
export const STACK_T = 12;
export const STACK_B = 24;

export const AXIS_STOPS = [0, 0.25, 0.5, 0.75, 1];
export const AXIS_TICK_INDEXES = [0, 7, 14, 21, 29];

export const linePath = (values: number[], min: number, max: number) =>
  values
    .map((v, i) => {
      const x = PLOT_L + (i / (values.length - 1)) * (CHART_W - PLOT_L - PLOT_R);
      const y =
        CHART_H - PLOT_B - ((v - min) / (max - min || 1)) * (CHART_H - PLOT_T - PLOT_B);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

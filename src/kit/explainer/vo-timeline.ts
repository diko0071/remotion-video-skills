type Marks = Record<string, { words: { word: string; start: number }[] }>;

export const voTimeline = <L extends string>(opts: {
  order: readonly L[];
  durations: Record<L, number>;
  marks: Marks;
  gaps: Record<L, number>;
  first: number;
  fps: number;
}) => {
  const { order, durations, marks, gaps, first, fps } = opts;
  const at = {} as Record<L, number>;
  order.forEach((key, i) => {
    at[key] = i === 0 ? first : at[order[i - 1]] + Math.round(durations[order[i - 1]] * fps) + gaps[order[i - 1]];
  });
  const end = {} as Record<L, number>;
  order.forEach((key) => {
    end[key] = at[key] + Math.round(durations[key] * fps);
  });
  const word = (line: L, w: string, nth = 0) => {
    const words = marks[line].words;
    const hits = words.filter((x) => x.word === w);
    if (!hits[nth]) throw new Error(`word "${w}" #${nth} not in ${line}: ${words.map((x) => x.word).join(" ")}`);
    return at[line] + Math.round(hits[nth].start * fps);
  };
  return { at, end, word, lines: order.map((key) => ({ key, at: at[key] })) };
};

export const cascade = (start: number, gaps: number[]): number[] => {
  const marks = [start];
  for (const gap of gaps) marks.push(marks[marks.length - 1] + gap);
  return marks;
};

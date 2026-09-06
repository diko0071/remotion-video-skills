export const packColumns = <T>(
  items: T[],
  columnCount: number,
  aspectOf: (item: T) => number,
): T[][] => {
  const columns: T[][] = Array.from({ length: columnCount }, () => []);
  const heights = new Array<number>(columnCount).fill(0);
  for (const item of items) {
    let shortest = 0;
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(item);
    const aspect = aspectOf(item);
    heights[shortest] += 1 / (aspect || 0.8);
  }
  return columns;
};

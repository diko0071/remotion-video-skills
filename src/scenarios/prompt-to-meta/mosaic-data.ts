export type MosaicLevel = { src: string; region: readonly [number, number, number, number]; cell: number };

export type Mosaic = { levels: readonly MosaicLevel[]; anchor: readonly [number, number] };

export const MOSAIC_GRID = { cols: 150, rows: 68, unitH: 1.25, k: 12.8 } as const;

export const MOSAICS = {
  sun: {
    anchor: [65.5, 21.5],
    levels: [
      { src: "mosaic/sun-l0.jpg", region: [0, 0, 150, 68], cell: 24 },
      { src: "mosaic/sun-l1.jpg", region: [39, 12.5, 99, 40.5], cell: 80 },
      { src: "mosaic/sun-l2.jpg", region: [57, 18, 76, 28], cell: 256 },
    ],
  },
  sunflowers: {
    anchor: [75, 34],
    levels: [
      { src: "mosaic/sunflowers-l0.jpg", region: [0, 0, 150, 68], cell: 24 },
    ],
  },
  lemons: {
    anchor: [75, 34],
    levels: [
      { src: "mosaic/lemons-l0.jpg", region: [0, 0, 150, 68], cell: 24 },
    ],
  },
  harbor: {
    anchor: [75, 34],
    levels: [
      { src: "mosaic/harbor-l0.jpg", region: [0, 0, 150, 68], cell: 24 },
    ],
  },
  wheat: {
    anchor: [75, 34],
    levels: [
      { src: "mosaic/wheat-l0.jpg", region: [0, 0, 150, 68], cell: 24 },
    ],
  },
  logo: {
    anchor: [74.5, 23.5],
    levels: [
      { src: "mosaic/logo-l0.jpg", region: [0, 0, 150, 68], cell: 24 },
      { src: "mosaic/logo-l1.jpg", region: [45, 13.5, 105, 41.5], cell: 80 },
      { src: "mosaic/logo-l2.jpg", region: [65, 19.9, 84, 29.9], cell: 256 },
    ],
  },
} as const satisfies Record<string, Mosaic>;

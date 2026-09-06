import { packColumns } from "../../masonry-columns";

export type AdTemplate = { file: string; category: string; aspect: number; selected?: boolean };

export const buildTemplateColumns = (items: AdTemplate[], columnCount: number): AdTemplate[][] =>
  packColumns(items, columnCount, (item) => item.aspect);

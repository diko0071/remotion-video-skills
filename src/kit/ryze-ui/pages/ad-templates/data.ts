import { AdTemplate, buildTemplateColumns } from "./types";

export const AD_TEMPLATES: AdTemplate[] = [
  { file: "p-f-candle-co_top-1-57d.jpg", category: "Home & Garden", aspect: 0.563, selected: true },
  { file: "baxter-of-california_top-3-5d.jpg", category: "Beauty & Personal Care", aspect: 1 },
  { file: "homesick_top-1-22d.jpg", category: "Home & Garden", aspect: 0.8, selected: true },
  { file: "crown-affair_top-1-11d.jpg", category: "Beauty & Personal Care", aspect: 0.563 },
  { file: "caraway_top-7-52d.jpg", category: "Home & Garden", aspect: 0.8 },
  { file: "blueland_top-1-78d.jpg", category: "Home & Garden", aspect: 0.563 },
  { file: "dedcool_top-8-29d.jpg", category: "Beauty & Personal Care", aspect: 0.8 },
  { file: "hem_top-2-39d.jpg", category: "Home & Garden", aspect: 1 },
  { file: "otherland_top-2-107d.jpg", category: "Home & Garden", aspect: 0.563, selected: true },
  { file: "brooklinen_top-4-51d.jpg", category: "Home & Garden", aspect: 0.8 },
  { file: "crown-affair_top-10-2d.jpg", category: "Beauty & Personal Care", aspect: 1 },
  { file: "branch-basics_top-2-136d.jpg", category: "Home & Garden", aspect: 0.563 },
  { file: "salt-stone_top-2-135d.jpg", category: "Beauty & Personal Care", aspect: 0.563 },
  { file: "dirty-labs_top-1-78d.jpg", category: "Home & Garden", aspect: 1 },
  { file: "boy-smells_top-5-32d.jpg", category: "Beauty & Personal Care", aspect: 0.8 },
  { file: "casper_top-1-17d.jpg", category: "Home & Garden", aspect: 0.563 },
  { file: "baxter-of-california_top-8-4d.jpg", category: "Beauty & Personal Care", aspect: 0.625 },
  { file: "caraway_top-10-47d.jpg", category: "Home & Garden", aspect: 0.563 },
  { file: "eight-sleep_top-7-29d.jpg", category: "Home & Garden", aspect: 0.8 },
  { file: "dollar-shave-club_top-2-62d.jpg", category: "Beauty & Personal Care", aspect: 0.563 },
  { file: "helix_top-3-145d.jpg", category: "Home & Garden", aspect: 1 },
  { file: "crown-affair_top-7-8d.jpg", category: "Beauty & Personal Care", aspect: 0.563 },
  { file: "blueland_top-2-43d.jpg", category: "Home & Garden", aspect: 1 },
  { file: "caraway_top-8-51d.jpg", category: "Home & Garden", aspect: 0.8 },
  { file: "dollar-shave-club_top-8-17d.jpg", category: "Beauty & Personal Care", aspect: 0.8 },
];

export const AD_TEMPLATE_CATEGORIES = [
  "Beauty & Personal Care",
  "Fashion & Apparel",
  "Food & Beverage",
  "Home & Garden",
  "Pet",
  "Baby & Kids",
  "Electronics",
  "Automotive",
  "Outdoor & Sports",
  "Health & Fitness",
  "Software & SaaS",
  "Finance & Fintech",
  "Healthcare & Medical",
  "Travel & Hospitality",
  "Other",
];

export const AD_TEMPLATE_COLUMN_COUNT = 5;

export const AD_TEMPLATE_COLUMNS = buildTemplateColumns(AD_TEMPLATES, AD_TEMPLATE_COLUMN_COUNT);

export const AD_TEMPLATE_SELECTED_COUNT = AD_TEMPLATES.filter((t) => t.selected).length;

export const AD_TEMPLATE_PAGES = ["1", "2", "3", "…", "13"];

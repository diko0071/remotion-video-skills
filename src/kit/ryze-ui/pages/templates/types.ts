export type Source =
  | "google_ads"
  | "meta_ads"
  | "google_analytics"
  | "google_search_console"
  | "tiktok_ads"
  | "shopify";

export type Item = {
  title: string;
  description: string;
  image: string;
  sources: Source[];
  allPlatforms?: boolean;
  imageAlign?: "top" | "center";
};

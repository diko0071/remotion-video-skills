import { AdBrand, AdCard, DiscoveredBrand, TrackedBrand } from "./types";

export const COMPETITOR_ADS_TITLE = "Competitor Ads";
export const COMPETITOR_ADS_SUB =
  "Live ads from your industry and the competitors you track.";

export const COMPETITOR_TABS = ["Explore", "Tracked Competitors"];

export const COMPETITOR_FILTERS = [
  { id: "industry", label: "All industries" },
  { id: "platform", label: "All platforms" },
  { id: "format", label: "All formats" },
  { id: "duration", label: "Any duration" },
  { id: "status", label: "Any status" },
];
export const COMPETITOR_SORT = "Newest";

export const TRACKED_BRANDS: TrackedBrand[] = [
  {
    name: "Yankee Candle",
    domain: "yankeecandle.com",
    favicon: "comp-ads/yankeecandle.png",
    notify: false,
  },
  {
    name: "Brooklyn Candle Studio",
    domain: "brooklyncandle.com",
    favicon: "comp-ads/brooklyncandle.png",
    notify: false,
  },
  {
    name: "P.F. Candle Co.",
    domain: "pfcandleco.com",
    favicon: "comp-ads/pfcandleco.png",
    notify: false,
  },
];

const EXPLORE_BRANDS: Record<string, AdBrand> = {
  otherland: {
    name: "Otherland",
    domain: "otherland.com",
    favicon: "favicons/otherland.com.png",
  },
  dedcool: {
    name: "DedCool",
    domain: "dedcool.com",
    favicon: "favicons/dedcool.com.png",
  },
  salt: {
    name: "Salt & Stone",
    domain: "saltandstone.com",
    favicon: "favicons/saltandstone.com.png",
  },
  hem: {
    name: "Hem",
    domain: "huehem.com",
    favicon: "favicons/huehem.com.png",
  },
  brooklinen: {
    name: "Brooklinen",
    domain: "brooklinen.com",
    favicon: "favicons/brooklinen.com.png",
  },
};

const [YANKEE, BROOKLYN, PF] = TRACKED_BRANDS;

export const COMPETITOR_ROWS: AdCard[] = [
  {
    id: "a1",
    brand: PF,
    format: "image",
    image: "ad-templates/p-f-candle-co_top-1-57d.jpg",
    mediaAspect: 1080 / 1920,
    headline: "The scent of a Sunday morning, bottled",
    body: "Soy wax in amber glass. Sunbleached, Teakwood & Tobacco, Piñon.",
    cta: "Shop candles",
    landingHost: "pfcandleco.com",
    platform: "meta",
    runningDays: 84,
    active: true,
    tracked: true,
  },
  {
    id: "a2",
    brand: YANKEE,
    format: "image",
    image: "comp-ads/yankee-living.jpg",
    mediaAspect: 1,
    headline: "The fragrance your living room has been missing",
    body: "Signature large jar candles with up to 150 hours of burn time.",
    cta: "Shop now",
    landingHost: "yankeecandle.com",
    platform: "meta",
    runningDays: 91,
    active: true,
    tracked: true,
  },
  {
    id: "a3",
    brand: BROOKLYN,
    format: "image",
    image: "ad-templates/boy-smells_top-5-32d.jpg",
    mediaAspect: 1080 / 1350,
    headline: "Hand-poured in Greenpoint, small batches only",
    body: "Minimalist soy candles inspired by Brooklyn neighborhoods.",
    cta: "Shop the collection",
    landingHost: "brooklyncandle.com",
    platform: "meta",
    runningDays: 34,
    active: true,
    tracked: true,
  },
  {
    id: "a4",
    brand: EXPLORE_BRANDS.otherland,
    format: "image",
    image: "ad-templates/otherland_top-2-107d.jpg",
    mediaAspect: 1080 / 1920,
    headline: "A candle that makes the whole room feel styled",
    body: "Four-wick vessels designed with artists. New drop every season.",
    cta: "Shop the drop",
    landingHost: "otherland.com",
    platform: "meta",
    runningDays: 107,
    active: true,
  },
  {
    id: "a5",
    brand: EXPLORE_BRANDS.dedcool,
    format: "image",
    image: "ad-templates/dedcool_top-8-29d.jpg",
    mediaAspect: 1080 / 1350,
    headline: "Layer it. Wear it. Burn it.",
    body: "Fragrance 01 Taunt, now as a hand-poured candle.",
    cta: "Shop the set",
    landingHost: "dedcool.com",
    platform: "meta",
    runningDays: 12,
    active: true,
  },
  {
    id: "a6",
    brand: EXPLORE_BRANDS.salt,
    format: "image",
    image: "ad-templates/salt-stone_top-2-135d.jpg",
    mediaAspect: 1152 / 2048,
    headline: "Santal 26 for the shelf, not the shower",
    body: "Home fragrance in recycled glass. Free shipping over $75.",
    cta: "Learn more",
    landingHost: "saltandstone.com",
    platform: "meta",
    runningDays: 135,
    active: false,
  },
  {
    id: "a7",
    brand: BROOKLYN,
    format: "image",
    image: "comp-ads/brooklyn-ad.jpg",
    mediaAspect: 1,
    headline: "Hand-poured, small batch, no dyes",
    cta: "Shop now",
    landingHost: "brooklyncandle.com",
    tracked: true,
    platform: "google",
    runningDays: 39,
    active: true,
  },
  {
    id: "a8",
    brand: EXPLORE_BRANDS.brooklinen,
    format: "image",
    image: "ad-templates/brooklinen_top-4-51d.jpg",
    mediaAspect: 1080 / 1350,
    headline: "The bedroom upgrade people actually notice",
    body: "Sheets, candles and everything else that finishes a room.",
    cta: "Shop bundles",
    landingHost: "brooklinen.com",
    platform: "meta",
    runningDays: 51,
    active: true,
  },
  {
    id: "a9",
    brand: PF,
    format: "text",
    headline: "Soy Candles Made In Los Angeles | Free Shipping Over $50",
    body: "Clean-burning soy wax in amber glass. 12.5 oz, 40 to 50 hour burn time.",
    cta: "Shop candles",
    landingHost: "pfcandleco.com",
    platform: "google",
    runningDays: 203,
    active: true,
    tracked: true,
  },
  {
    id: "a10",
    brand: PF,
    format: "image",
    image: "ad-templates/salt-stone_top-5-135d.jpg",
    mediaAspect: 1080 / 1920,
    headline: "The citronella that finally smells good",
    cta: "Shop now",
    landingHost: "pfcandleco.com",
    tracked: true,
    platform: "meta",
    runningDays: 133,
    active: true,
  },
  {
    id: "a11",
    brand: YANKEE,
    format: "image",
    image: "comp-ads/yankee-ad.jpg",
    mediaAspect: 1,
    headline: "The scent of fall, back in the big jar",
    body: "The new seasonal collection, poured to fill the whole house.",
    cta: "See the collection",
    landingHost: "yankeecandle.com",
    tracked: true,
    platform: "google",
    runningDays: 38,
    active: true,
  },
  {
    id: "a12",
    brand: YANKEE,
    format: "text",
    headline: "Yankee Candle® Official Site | Fall Favorites Are Back",
    body: "Shop new autumn scents, 3-wick candles and gifts. Free shipping over $49.",
    cta: "Shop now",
    landingHost: "yankeecandle.com",
    platform: "google",
    runningDays: 12,
    active: true,
    tracked: true,
  },
  {
    id: "a13",
    brand: EXPLORE_BRANDS.salt,
    format: "image",
    image: "ad-templates/salt-stone_top-10-38d.jpg",
    mediaAspect: 1080 / 1920,
    headline: "Everything you put on, made simple",
    body: "Cedar and patchouli, now in an 8 oz vessel.",
    cta: "Shop the scent",
    landingHost: "saltandstone.com",
    platform: "meta",
    runningDays: 38,
    active: true,
  },
];

export const TRACKED_ROWS = COMPETITOR_ROWS.filter((row) => row.tracked);

export const DISCOVERED_BRANDS: DiscoveredBrand[] = [
  {
    name: "Yankee Candle",
    domain: "yankeecandle.com",
    favicon: "comp-ads/yankeecandle.png",
  },
  {
    name: "Brooklyn Candle Studio",
    domain: "brooklyncandlestudio.com",
    favicon: "comp-ads/brooklyncandle.png",
  },
  {
    name: "P.F. Candle Co.",
    domain: "pfcandleco.com",
    favicon: "comp-ads/pfcandleco.png",
  },
  {
    name: "Otherland",
    domain: "otherland.com",
    favicon: "favicons/otherland.com.png",
  },
  {
    name: "Voluspa",
    domain: "voluspa.com",
    favicon: "favicons/voluspa.com.png",
  },
];

export const TRACK_DIALOG = {
  title: "Track a competitor",
  description:
    "Add a brand and domain. We'll start pulling their live Google and Meta ads.",
  nameLabel: "Brand name",
  namePlaceholder: "Surfer SEO",
  domainLabel: "Domain",
  domainPlaceholder: "surferseo.com",
  cancel: "Cancel",
  submit: "Track",
};

export const DISCOVER_DIALOG = {
  title: "Discover your competitors",
  description:
    "We found brands running ads in your space. Pick up to 5 to track.",
  addManually: "Add manually",
  cancel: "Cancel",
  save: "Track selected",
};

export const LIGHTBOX_LABELS = {
  format: "Format",
  platform: "Platform",
  running: "Running",
  status: "Status",
  statusActive: "Active",
  statusInactive: "Inactive",
  openOriginal: "Open original",
  generateSimilar: "Iterate with AI",
};


const EXTRA_BRANDS: Record<string, AdBrand> = {
  baxter: { name: "Baxter of California", domain: "baxterofcalifornia.com", favicon: "comp-ads/fv-baxterofcalifornia.png" },
  boysmells: { name: "Boy Smells", domain: "boysmells.com", favicon: "comp-ads/fv-boysmells.png" },
  crown: { name: "Crown Affair", domain: "crownaffair.com", favicon: "comp-ads/fv-crownaffair.png" },
  dsc: { name: "Dollar Shave Club", domain: "dollarshaveclub.com", favicon: "comp-ads/fv-dollarshaveclub.png" },
  froya: { name: "Froya Organics", domain: "froyaorganics.com", favicon: "comp-ads/fv-froyaorganics.png" },
  dandelion: { name: "Dandelion Chocolate", domain: "dandelionchocolate.com", favicon: "comp-ads/fv-dandelionchocolate.png" },
  magicspoon: { name: "Magic Spoon", domain: "magicspoon.com", favicon: "comp-ads/fv-magicspoon.png" },
  momofuku: { name: "Momofuku Goods", domain: "momofuku.com", favicon: "comp-ads/fv-peachybbq.png" },
  beyond: { name: "Beyond Meat", domain: "beyondmeat.com", favicon: "comp-ads/fv-beyondmeat.png" },
  atoms: { name: "Atoms", domain: "atoms.com", favicon: "comp-ads/fv-atoms.png" },
  missoma: { name: "Missoma", domain: "missoma.com", favicon: "comp-ads/fv-missoma.png" },
  vincero: { name: "Vincero", domain: "vincerowatches.com", favicon: "comp-ads/fv-vincerowatches.png" },
  blueland: { name: "Blueland", domain: "blueland.com", favicon: "comp-ads/fv-blueland.png" },
  caraway: { name: "Caraway", domain: "carawayhome.com", favicon: "comp-ads/fv-carawayhome.png" },
  eightsleep: { name: "Eight Sleep", domain: "eightsleep.com", favicon: "comp-ads/fv-eightsleep.png" },
  helix: { name: "Helix", domain: "helixsleep.com", favicon: "comp-ads/fv-helixsleep.png" },
  dirtylabs: { name: "Dirty Labs", domain: "dirtylabs.com", favicon: "comp-ads/fv-dirtylabs.png" },
};

type ExploreSeed = [string, string, string, number, string, string, "meta" | "google", number, string];

const EXPLORE_SEEDS: ExploreSeed[] = [
  ["x1", "baxter", "ad-templates/baxter-of-california_top-1-9d.jpg", 1, "The grooming shelf, simplified", "Beauty & personal care", "meta", 9, "Shop now"],
  ["x2", "dandelion", "ad-templates/dandelion-chocolate_top-1-55d.jpg", 1, "Single-origin bars, roasted in-house", "Food & beverage", "meta", 55, "Order now"],
  ["x3", "magicspoon", "ad-templates/magic-spoon_top-2-4d.jpg", 1, "Cereal that grew up with you", "Food & beverage", "meta", 4, "Try it"],
  ["x4", "atoms", "ad-templates/atoms_top-5-6d.jpg", 1, "The everyday shoe, perfected", "Fashion & apparel", "meta", 6, "Shop now"],
  ["x5", "blueland", "ad-templates/blueland_top-2-43d.jpg", 1, "Cleaning without the plastic", "Home & garden", "meta", 43, "Learn more"],
  ["x6", "boysmells", "ad-templates/boy-smells_top-5-32d.jpg", 0.8, "Fine fragrance, redefined", "Beauty & personal care", "meta", 32, "Shop now"],
  ["x7", "caraway", "ad-templates/caraway_top-7-52d.jpg", 0.8, "Non-toxic cookware in your colors", "Home & garden", "meta", 52, "Shop the set"],
  ["x8", "dsc", "ad-templates/dollar-shave-club_top-8-17d.jpg", 1, "The razor that shows up on time", "Beauty & personal care", "google", 17, "Join now"],
  ["x9", "eightsleep", "ad-templates/eight-sleep_top-7-29d.jpg", 0.8, "Sleep fitness starts with your bed", "Home & garden", "meta", 29, "Learn more"],
  ["x10", "missoma", "ad-templates/missoma_top-4-44d.jpg", 1, "Layer it your way", "Fashion & apparel", "meta", 44, "Shop now"],
  ["x11", "helix", "ad-templates/helix_top-3-145d.jpg", 1, "The mattress made for how you sleep", "Home & garden", "google", 145, "Take the quiz"],
  ["x12", "froya", "ad-templates/fr-ya-organics_top-6-338d.jpg", 1, "Nordic skincare, organic to the drop", "Beauty & personal care", "meta", 338, "Shop now"],
  ["x13", "vincero", "ad-templates/vincero_top-2-47d.jpg", 1, "Watches built to be worn", "Fashion & apparel", "meta", 47, "Shop now"],
  ["x14", "momofuku", "ad-templates/momofuku-goods_top-2-79d.jpg", 1, "Restaurant-grade pantry staples", "Food & beverage", "meta", 79, "Order now"],
  ["x15", "beyond", "ad-templates/beyond-meat_top-2-45d.jpg", 1, "Plant-based, crave-worthy", "Food & beverage", "google", 45, "Find near you"],
  ["x16", "crown", "ad-templates/crown-affair_top-10-2d.jpg", 1, "The slow ritual for good hair", "Beauty & personal care", "meta", 2, "Shop now"],
  ["x17", "dirtylabs", "ad-templates/dirty-labs_top-1-78d.jpg", 1, "Laundry, minus the chemistry set", "Home & garden", "meta", 78, "Shop now"],
  ["x18", "dandelion", "ad-templates/dandelion-chocolate_top-2-55d.jpg", 1, "Hot chocolate season is here", "Food & beverage", "meta", 55, "Order now"],
];

export const EXPLORE_EXTRA_ROWS: AdCard[] = EXPLORE_SEEDS.map(
  ([id, brand, image, mediaAspect, headline, body, platform, runningDays, cta]) => ({
    id,
    brand: EXTRA_BRANDS[brand],
    format: "image",
    image,
    mediaAspect,
    headline,
    body,
    cta,
    landingHost: EXTRA_BRANDS[brand].domain,
    platform,
    runningDays,
    active: true,
  }),
);

export const NOTIFY_CONFIRM = {
  enableTitle: "Get new-ad alerts?",
  enableDescription: (name: string) => `We'll email you when ${name} launches new ads.`,
  cancel: "Cancel",
  confirm: "Enable",
} as const;

export const CHIP_ALL = "All brands";
export const syncingChipLabel = (name: string) => `Syncing ${name}…`;

export const COMPETITOR_COLUMN_COUNT = 5;
export const CARD_MEDIA_CHROME_RATIO = 0.35;
export const CARD_TEXT_ASPECT = 1.5;
export const CARD_MEDIA_FALLBACK_ASPECT = 0.85;

export const competitorAdAspect = (ad: AdCard): number => {
  if (ad.mediaAspect) return 1 / (1 / ad.mediaAspect + CARD_MEDIA_CHROME_RATIO);
  return ad.format === "text" ? CARD_TEXT_ASPECT : CARD_MEDIA_FALLBACK_ASPECT;
};

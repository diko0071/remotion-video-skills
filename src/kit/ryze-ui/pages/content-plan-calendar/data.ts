import { CalendarDay, CalendarKpi } from "./types";

export const CALENDAR_WEEK: CalendarDay[] = [
  {
    weekday: "Mon",
    date: 10,
    events: [
      { title: "Why your candle tunnels and how to fix it", status: "Published", image: "hero-candles.jpg" },
      { title: "The first burn rule, tested", status: "Published", image: "product-1.jpg" },
    ],
  },
  {
    weekday: "Tue",
    date: 11,
    events: [
      { title: "Small-batch candle brands worth knowing", status: "Published", image: "product-2.jpg" },
      { title: "How we test every scent before launch", status: "Published", image: "banner-candles.jpg" },
    ],
  },
  {
    weekday: "Wed",
    date: 12,
    events: [
      { title: "Clean burning candles: a buyer's checklist", status: "Published", image: "product-3.jpg" },
      { title: "Soot on the jar: causes and fixes", status: "Published", image: "product-1.jpg" },
    ],
  },
  {
    weekday: "Thu",
    date: 13,
    events: [
      { title: "Best candle scents for late summer", status: "Published", image: "hero-candles.jpg" },
      { title: "How to pack candles for shipping", status: "Published", image: "product-2.jpg" },
    ],
  },
  {
    weekday: "Fri",
    date: 14,
    today: true,
    events: [
      { title: "Candle safety at home: 9 rules", status: "Drafted", image: "banner-candles.jpg" },
      { title: "What phthalate-free actually means", status: "Drafted", image: "product-3.jpg" },
    ],
  },
  {
    weekday: "Sat",
    date: 15,
    events: [
      { title: "Non-toxic candles: what to look for on the label", status: "Drafted", image: "product-1.jpg" },
      { title: "Reading a candle ingredient label", status: "Planned" },
    ],
  },
  {
    weekday: "Sun",
    date: 16,
    events: [
      { title: "Wood wick vs cotton wick candles compared", status: "Planned" },
      { title: "Why wood wicks crackle", status: "Planned" },
      { title: "Wick size and jar diameter", status: "Planned" },
    ],
  },
];

export const CALENDAR_SLOTS = 5;

export const CALENDAR_KPIS: CalendarKpi[] = [
  { label: "Total articles", value: "150" },
  { label: "Planned", value: "100" },
  { label: "Drafted", value: "12" },
  { label: "Published", value: "38" },
];

export const CALENDAR_MONTH = "August 2026";

export const CALENDAR_RANGE = "Aug 10 – Aug 16, 2026";

export const CALENDAR_CHIP = { month: "Aug", day: "14" };

export type LibraryAd = {
  src: string;
  w: number;
  h: number;
  days: number;
  start: string;
  video: boolean;
  headline: string;
  body: string;
  winner: number;
};

export const LIBRARY_ADS: LibraryAd[] = [
  { src: "brex/01.jpg", w: 480, h: 600, days: 369, start: "2025-09-23", video: false, headline: "Get started today for free.", body: "Brex gives you up to 20x higher credit limits than traditional corporate credit cards — from day one. Apply in minutes (no personal guarantee required).", winner: 0 },
  { src: "brex/00.jpg", w: 480, h: 600, days: 369, start: "2025-09-23", video: false, headline: "Get started today for free.", body: "Brex gives you up to 20x higher credit limits than traditional corporate credit cards — from day one. Apply in minutes (no personal guarantee required).", winner: 1 },
  { src: "brex/02.jpg", w: 480, h: 600, days: 328, start: "2025-11-03", video: false, headline: "Get started today for free.", body: "Brex gives you up to 20x higher credit limits than traditional corporate credit cards — from day one. Apply in minutes (no personal guarantee required).", winner: 2 },
  { src: "brex/03.jpg", w: 480, h: 600, days: 213, start: "2026-02-26", video: false, headline: "Get started today for free.", body: "Brex gives you up to 20x higher credit limits than traditional corporate credit cards — from day one. Apply in minutes (no personal guarantee required).", winner: 3 },
  { src: "brex/04.jpg", w: 480, h: 600, days: 139, start: "2026-05-11", video: false, headline: "Get started today for free.", body: "Brex gives you up to 20x higher credit limits than traditional corporate credit cards — from day one. Apply in minutes (no personal guarantee required).", winner: -1 },
  { src: "brex/05.jpg", w: 480, h: 600, days: 139, start: "2026-05-11", video: false, headline: "Get started today for free.", body: "Brex gives you up to 20x higher credit limits than traditional corporate credit cards — from day one. Apply in minutes (no personal guarantee required).", winner: -1 },
  { src: "brex/06.jpg", w: 480, h: 600, days: 139, start: "2026-05-11", video: false, headline: "Get started today for free.", body: "Brex gives you up to 20x higher credit limits than traditional corporate credit cards — from day one. Apply in minutes (no personal guarantee required).", winner: -1 },
  { src: "brex/07.jpg", w: 480, h: 600, days: 139, start: "2026-05-11", video: false, headline: "Get started today for free.", body: "Brex gives you up to 20x higher credit limits than traditional corporate credit cards — from day one. Apply in minutes (no personal guarantee required).", winner: -1 },
  { src: "brex/08.jpg", w: 480, h: 853, days: 27, start: "2026-08-31", video: false, headline: "Get started in minutes", body: "Most business bank accounts come with catches. Hidden fees, confusing terms. Brex changes that. We built banking the way it should have always been: fast, easy, and powerful.  Deposits held by Column NA (Member FDIC), see comments for full disclosures.", winner: -1 },
  { src: "brex/09.jpg", w: 480, h: 600, days: 26, start: "2026-09-01", video: false, headline: "Get your first $1,000 on us.", body: "Brex gives your business smarter spend management – corporate cards, expenses, and bill pay in one place. New customers who sign up, activate, and spend $4,000 in their first month get a $1,000 statement credit. Full terms apply.", winner: -1 },
  { src: "brex/10.jpg", w: 480, h: 853, days: 25, start: "2026-09-02", video: false, headline: "No declined cards.", body: "You're closing a deal, not managing card limits. Brex sets spend limits per employee and automatically enforces them. With banking, cards, and expenses all in one place, the right transactions always go through. It's time to get Brex AF.", winner: -1 },
  { src: "brex/11.jpg", w: 480, h: 480, days: 25, start: "2026-09-02", video: true, headline: "One bad expense.", body: "Brex prevents out-of-policy spend before it happens with AI-native controls. Rules set by category, amount, and employee are automatically enforced at every purchase. It's time to get Brex AF.", winner: -1 },
];

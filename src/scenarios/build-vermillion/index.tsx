import { Scenario } from "../../engine/demo/scenario";
import { PAGE_HEIGHT } from "./timings";
import { makeVermillionScene } from "./vermillion-scene";

const storeScene = makeVermillionScene({
  pins: [
    { name: "Uranus ブラックカルセドニー リング", price: "¥26,400", image: "vermillion/pin-01.jpg" },
    { name: "ピアス", price: "¥39,600", image: "vermillion/pin-02.jpg" },
    { name: "ミニパール スライドネックレス", price: "¥23,100", image: "vermillion/pin-03.jpg" },
    { name: "Clarus ブラウンダイヤモンド イヤーカフ", price: "¥36,300", image: "vermillion/pin-04.jpg" },
  ],
  collections: [
    {
      num: "01.",
      name: "SIGN",
      desc: "存在証明の角、生命力を象徴する珊瑚、魔を払うとされた邪視。私達の体だけでなく心を彩ってきたタリスマンとしての装身具は、古来より人々のアイデンティティーとなりました。",
      image: "vermillion/coll-1.jpg",
    },
    {
      num: "02.",
      name: "ZODIAC",
      desc: "夜空に輝く叡智の光。天空に描かれた12星座は私たちにひとつではない自分らしさを教えてくれます。パーソナリティを象徴する、神秘的なタリスマン。",
      image: "vermillion/coll-2.jpg",
    },
  ],
  journal: [
    {
      cat: "Zodiac Compass No. 015",
      title: "ZODIAC COMPASS the four Seasons - Summer -",
      image: "vermillion/journal-01.jpg",
    },
    {
      cat: "Fortune Compass No. 001",
      title: "幸多き一年を呼び寄せる、スペシャルなジュエリー",
      image: "vermillion/journal-03.jpg",
    },
    {
      cat: "Lover's Journal No. 003",
      title: "ファッションとして楽しみながら掘り下げられるジュエリー",
      image: "vermillion/journal-04.jpg",
    },
  ],
});

const SCROLL_DISTANCE = PAGE_HEIGHT - 1010;

export const buildVermillion: Scenario = {
  id: "build-vermillion",
  workspace: "vermillion",
  chatTitle: "Build my Shopify store",
  beats: [
    {
      kind: "prompt",
      text: "Build my Shopify store from this photo",
      attachments: [
        { name: "campaign-01.jpg", image: "vermillion/hero-05-pc.jpg" },
        { name: "campaign-02.jpg", image: "vermillion/hero-06-pc.jpg" },
        { name: "campaign-03.jpg", image: "vermillion/hero-04-pc.jpg" },
      ],
    },
    { kind: "thinking" },
    { kind: "tool", label: "Understanding the task", duration: 38 },
    { kind: "tool", label: "Reading your brand photo", duration: 40 },
    { kind: "thinking", duration: 16 },
    { kind: "tool", label: "Extracting brand colors and type", duration: 36 },
    { kind: "tool", label: "Creating your store", duration: 42 },
    { kind: "artifact", title: "Storefront — VERMILLION", scene: storeScene, buildDuration: 74 },
    { kind: "tool", label: "Designing the hero", duration: 44 },
    { kind: "tool", label: "Adding PICK UP products", async: true, delay: 18, duration: 60 },
    { kind: "tool", label: "Writing collection pages", async: true, delay: 95, duration: 130 },
    { kind: "tool", label: "Adding journal and footer", async: true, delay: 250, duration: 60 },
    { kind: "scroll", duration: 360, distance: SCROLL_DISTANCE },
    {
      kind: "say",
      text: "Your storefront is ready — hero, pick up, both collections, journal and a full footer, all built from your photo. Want me to publish it?",
    },
    { kind: "hold", duration: 20 },
  ],
  tail: 25,
};

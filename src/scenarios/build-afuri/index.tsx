import { Scenario } from "../../engine/demo/scenario";
import { PAGE_HEIGHT, PANEL_VIEW } from "./timings";
import { makeAfuriScene } from "./afuri-scene";

const storeScene = makeAfuriScene({
  products: [
    {
      badge: "NEW",
      name: "阿夫利のひみつS",
      desc: "ひみつビールとのコラボ第2弾。華やかなトロピカルアロマに、柚子の爽やかさと朝倉山椒のスパイス感が重なる、奥深い味わいの一杯です。",
      meters: [4, 2, 2],
      price: "¥ 7,140",
      image: "afuri/product-himitsu-s.jpg",
    },
    {
      badge: "おすすめ",
      name: "阿夫利IPA",
      desc: "AFURI BREWING初のオリジナルDDH HAZY IPA。華やかなトロピカルアロマとまろやかな口当たりが楽しめる、苦味を抑えた飲みやすい一杯です。",
      meters: [5, 3, 4],
      price: "¥ 7,140",
      image: "afuri/product-afuri-ipa.jpg",
    },
    {
      badge: "数量限定",
      name: "YUZU PEACH NE IPA",
      desc: "桃と柚子が香る9バッチのNEW ENGLAND IPA。華やかなホップアロマと爽やかな果実味が楽しめる、軽やかで満足感のある一杯です。",
      meters: [4, 1, 1],
      price: "¥ 7,140",
      image: "afuri/product-yuzu-peach.jpg",
    },
  ],
  about: [
    {
      label: "ABOUT｜AFURI BREWING TAPROOM（仮）",
      title: "阿夫利山のふもと、水、風、人が集まる、みんなの谷",
      desc: "2027年に誕生する、新たなタップルーム。小鮎川の清流と緑に囲まれた谷で、クラフトビールや地元食材の料理、イベントを楽しめる、みんなの遊び場を目指しています。",
      image: "afuri/about-taproom.png",
    },
    {
      label: "ABOUT｜醸造家",
      title: "自然を愛する、兄弟醸造家",
      desc: "醸造を担うのは、個性豊かな井上兄弟。息の合ったコンビが、自由に、美味しいビールを生み出します。",
      image: "afuri/about-brothers.jpg",
    },
  ],
  news: [
    { num: "#11", title: "スーパーになって帰ってきた！", image: "afuri/news-himitsu-s.jpg" },
    { num: "#9", title: "かろやかに遊ぶ柚子と桃", image: "afuri/news-yuzu-peach.jpg" },
    { num: "#8", title: "原点の味、再び。", image: "afuri/news-afuri2.jpg" },
    { num: "#7", title: "Yuzu Sansho IPA", image: "afuri/news-himitsu.jpg" },
  ],
});

const SCROLL_DISTANCE = PAGE_HEIGHT - PANEL_VIEW;

export const buildAfuri: Scenario = {
  id: "build-afuri",
  workspace: "afuri",
  chatTitle: "Build my Shopify store",
  beats: [
    {
      kind: "prompt",
      text: "Build my Shopify store from these brand photos",
      attachments: [
        { name: "campaign.jpg", image: "afuri/kv-01.webp" },
        { name: "beers.jpg", image: "afuri/beer-goods.jpg" },
        { name: "brewers.jpg", image: "afuri/about-brothers.jpg" },
      ],
    },
    { kind: "thinking" },
    { kind: "tool", label: "Understanding the task", duration: 38 },
    { kind: "tool", label: "Reading your brand photos", duration: 40 },
    { kind: "thinking", duration: 16 },
    { kind: "tool", label: "Extracting brand colors and type", duration: 36 },
    { kind: "tool", label: "Creating your store", duration: 42 },
    { kind: "artifact", title: "Storefront — AFURI BREWING", scene: storeScene, buildDuration: 74 },
    { kind: "tool", label: "Designing the hero", duration: 44 },
    { kind: "tool", label: "Adding the beer line up", async: true, delay: 18, duration: 60 },
    { kind: "tool", label: "Writing the about story", async: true, delay: 95, duration: 130 },
    { kind: "tool", label: "Adding news and footer", async: true, delay: 250, duration: 60 },
    { kind: "scroll", duration: 360, distance: SCROLL_DISTANCE },
    {
      kind: "say",
      text: "Your storefront is ready — hero, beer line up, taproom story, news and a full footer, all built from your photos. Want me to publish it?",
    },
    { kind: "hold", duration: 20 },
  ],
  tail: 25,
};

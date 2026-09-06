import React from "react";
import { Img, staticFile } from "remotion";

const g = (file: string) => staticFile(`graza/${file}`);
const acc = (v: string) => ({ ["--acc" as never]: `var(--${v})` }) as React.CSSProperties;

export const Tldr: React.FC = () => (
  <div className="tldr">
    <span className="tldr__label">The short answer</span>
    <p>
      Graza makes three olive oils on purpose: <strong>Sizzle</strong> ($19.99) is the everyday
      cooking oil, <strong>Drizzle</strong> ($22.99) is the bold, peppery finishing oil you never
      heat, and <strong>Frizzle</strong> ($14) is built for serious frying heat. All three are
      squeezed from 100% Picual olives grown on a single farm in Jaén, Spain — no mystery blends.
      The trick isn't finding "the best olive oil." It's matching the oil to the heat: cook with
      Sizzle, finish with Drizzle, fry with Frizzle. Torching a fancy finishing oil in a
      screaming-hot pan just burns money and flavor.
    </p>
  </div>
);

export const Intro: React.FC = () => (
  <>
    <p>
      Somewhere along the way, olive oil got complicated. One bottle for everything, kept above the
      stove (don't), used for everything from searing steak to dressing a salad — and mostly
      tasting like nothing. The fix isn't a more expensive bottle. It's the same move restaurant
      kitchens figured out decades ago: <strong>different oils for different jobs</strong>, in
      squeeze bottles, used fast and replaced often.
    </p>
    <p>
      We went through the whole Graza lineup — the oils, the Trio, the mayo-and-aioli spinoffs,
      even the chips — and ranked what each one is actually for.
    </p>
  </>
);

const WHYS = [
  {
    num: "①",
    title: "One farm, one varietal",
    text: "Every bottle is 100% Picual olives from a single farm in Jaén, Spain. Most supermarket oil is a blend of oils from multiple countries and harvests — smooth, anonymous, forgettable.",
  },
  {
    num: "②",
    title: "Harvest timing = flavor",
    text: "Drizzle is pressed from early-harvest October olives — bolder, greener, peppery. Sizzle comes from the later harvest: mellower, rounder, happy in a hot pan.",
  },
  {
    num: "③",
    title: "The squeeze bottle",
    text: "Chefs have used squeeze bottles forever: no glugs, no drips, easy portioning. It also means you actually use the oil fast — which matters, because olive oil is a fresh product.",
  },
];

export const WhySection: React.FC = () => (
  <>
    <span className="sec-kick">Section 01</span>
    <h2 className="sec">Why single-farm Picual hits different</h2>
    <p className="sec-sub">Three boring-sounding decisions that change how the oil tastes:</p>
    <div className="whys">
      {WHYS.map((w) => (
        <div key={w.title} className="why">
          <div className="why__num">{w.num}</div>
          <b>{w.title}</b>
          <p>{w.text}</p>
        </div>
      ))}
    </div>
    <div className="band">
      <span className="band__kick">Worth knowing</span>
      <div className="band__big">
        Most supermarket "Italian" olive oil isn't from Italy — it's a{" "}
        <em>multi-country blend</em>, bottled months after harvest.
      </div>
      <div className="band__sub">
        Country-of-origin fine print usually reads something like "olive oils of EU and non-EU
        origin." Single-farm, single-varietal oil is the opposite of that — you can trace the
        bottle to the trees.
      </div>
    </div>
  </>
);

type Rank = {
  accent: string;
  num: number;
  img: string;
  job: string;
  name: string;
  badge?: { label: string; pick?: boolean };
  notes: string[];
  text: React.ReactNode;
  price: string;
  priceNote?: string;
  heat?: { label: string; width: number };
};

const RANKS: Rank[] = [
  {
    accent: "lime",
    num: 1,
    img: "sizzle.jpg",
    job: "The workhorse",
    name: "Sizzle",
    badge: { label: "★ Start here", pick: true },
    notes: ["Sauté", "Roast", "Sear", "Eggs"],
    text: "The everyday cooking oil — later-harvest Picual with a mellow, buttery profile and enough stability to handle basically all stovetop and oven work. If you buy one bottle, it's this one: eggs, roasted vegetables, chicken thighs, a Tuesday.",
    price: "$19.99",
    priceNote: "glass bottle",
    heat: { label: "410°F", width: 82 },
  },
  {
    accent: "yellow",
    num: 2,
    img: "drizzle.jpg",
    job: "The finisher",
    name: "Drizzle",
    notes: ["Salads", "Bread", "Beans", "Ice cream (yes)"],
    text: (
      <>
        Early-harvest October olives, pressed for maximum pepper and grass. This is the bold,
        throat-tickling oil you pour over everything <em>after</em> cooking — heat would burn off
        exactly the aromas you paid for. One squeeze upgrades toast, burrata, soup, even vanilla
        ice cream.
      </>
    ),
    price: "$22.99",
    priceNote: "glass bottle",
    heat: { label: "Keep it raw", width: 10 },
  },
  {
    accent: "orange",
    num: 3,
    img: "frizzle.jpg",
    job: "The fryer",
    name: "Frizzle",
    notes: ["Deep-fry", "Wok", "Griddle", "Smash burgers"],
    text: "Built for the heat the other two shouldn't touch: a lighter, cleaner olive oil made for frying, wok work and rip-roaring cast iron. The point of Frizzle is guilt-free volume — squeeze half the bottle into the pan for schnitzel night without wincing at the price.",
    price: "$14.00",
    priceNote: "squeeze bottle",
    heat: { label: "~465°F", width: 93 },
  },
  {
    accent: "blue",
    num: 4,
    img: "trio.png",
    job: "The starter pack",
    name: "The Trio",
    badge: { label: "Best value" },
    notes: ["All three jobs", "Gift-able"],
    text: 'Sizzle + Drizzle + Frizzle in one box — the whole system, one decision. This is the right answer if you\'re starting from zero or converting a "one dusty bottle above the stove" household. Cheaper than buying the three separately.',
    price: "$52.00",
    priceNote: "3 bottles",
  },
  {
    accent: "pink",
    num: 5,
    img: "aioli.jpg",
    job: "The condiment",
    name: '"Garlic" Aioli',
    notes: ["Sandwiches", "Fries", "Crudité"],
    text: "The lineup's condiment era: garlicky aioli made with Graza olive oil, in the same no-mess squeeze format. It turns fries into an event and a BLT into the best sandwich of the month.",
    price: "$9.99",
  },
  {
    accent: "purple",
    num: 6,
    img: "dinner-party.jpg",
    job: "The gift",
    name: 'The "Dinner Party" Pack',
    notes: ["Host gift", "Housewarming"],
    text: "The oils plus party ammunition, boxed and ready to hand over. Bringing this instead of a $15 bottle of wine is the single easiest way to become the most-invited person in your friend group.",
    price: "$79.00",
  },
  {
    accent: "yellow",
    num: 7,
    img: "chips.jpg",
    job: "The snack",
    name: "Olive Oil Potato Chips",
    notes: ["Classic Sea Salt", "Zesty Caesar", "Hot 'n Sweet"],
    text: "What happens when the frying-oil people make chips: potatoes fried in olive oil, four flavors deep. Last on this list only because you can't cook with them — first in our hearts otherwise.",
    price: "$5.99",
    priceNote: "per bag",
  },
];

export const RankSection: React.FC = () => (
  <>
    <span className="sec-kick">Section 02</span>
    <h2 className="sec">The Graza lineup, ranked by job</h2>
    <p className="sec-sub">
      Not "best to worst" — ranked by how hard each one works in a normal kitchen week.
    </p>
    {RANKS.map((r) => (
      <div key={r.num} className="rank" style={acc(r.accent)}>
        <div className="rank__media">
          <span className="rank__num">{r.num}</span>
          <Img src={g(r.img)} />
        </div>
        <div className="rank__body">
          <span className="rank__job">{r.job}</span>
          <div className="rank__head">
            <h3>{r.name}</h3>
            {r.badge ? (
              <span className={`badge${r.badge.pick ? " badge--pick" : ""}`}>{r.badge.label}</span>
            ) : null}
          </div>
          <div className="notes">
            {r.notes.map((n) => (
              <span key={n} className="note">
                {n}
              </span>
            ))}
          </div>
          <p>{r.text}</p>
          <div className="rank__foot">
            <span className="price">
              {r.price}
              {r.priceNote ? <small>{r.priceNote}</small> : null}
            </span>
            {r.heat ? (
              <div className="heat">
                <div className="heat__lbl">
                  <span>Heat ceiling</span>
                  <b>{r.heat.label}</b>
                </div>
                <div className="heat__track">
                  <div className="heat__fill" style={{ width: `${r.heat.width}%` }} />
                </div>
              </div>
            ) : null}
            <span className="rank__shop">Shop it →</span>
          </div>
        </div>
      </div>
    ))}
  </>
);

const TABLE_ROWS = [
  ["lime", "Sizzle", "Everyday cooking — sauté, roast, sear", "Up to ~410°F", "$19.99"],
  ["yellow", "Drizzle", "Finishing — salads, bread, everything raw", "None. Keep it raw", "$22.99"],
  ["orange", "Frizzle", "Frying, wok, griddle, big-batch heat", "Up to ~465°F", "$14.00"],
  ["blue", "The Trio", "All of the above, one box", "—", "$52.00"],
  ["pink", '"Garlic" Aioli', "Dipping, spreading, sandwich-building", "Serve cold", "$9.99"],
  ["purple", "Dinner Party Pack", "Gifting like you mean it", "—", "$79.00"],
  ["yellow", "Potato Chips", "Snacking, pre-dinner crowd control", "Already fried", "$5.99"],
];

export const TableSection: React.FC = () => (
  <>
    <span className="sec-kick">Section 03</span>
    <h2 className="sec">Job-by-job cheat sheet</h2>
    <div className="tblcard">
      <div className="tblwrap">
        <table className="cmp">
          <thead>
            <tr>
              <th>Bottle</th>
              <th>The job</th>
              <th>Heat</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(([color, name, job, heat, price]) => (
              <tr key={name}>
                <td>
                  <span className="dot" style={{ background: `var(--${color})` }} />
                  {name}
                </td>
                <td className="muted">{job}</td>
                <td>{heat}</td>
                <td className="p">{price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
);

const CHART_ROWS = [
  { name: "Frizzle", width: 93, color: "var(--orange)", val: "~465°" },
  { name: "Sizzle", width: 82, color: "var(--lime)", val: "~410°" },
  { name: "Canola", width: 80, color: "#cfc9b4", val: "~400°" },
  { name: "Generic EVOO", width: 75, color: "#a8b573", val: "~375°" },
  { name: "Butter", width: 60, color: "var(--yellow)", val: "~302°" },
];

export const HeatSection: React.FC = () => (
  <>
    <span className="sec-kick">Section 04</span>
    <h2 className="sec">Smoke points, actually explained</h2>
    <p>
      "Never cook with extra virgin olive oil" is the most durable myth in the kitchen. Good EVOO
      handles roughly <strong>375–410°F</strong> — comfortably above normal sauté and roast
      territory. The real reason you don't cook with a great finishing oil isn't danger, it's{" "}
      <strong>waste</strong>: heat evaporates the delicate aromatics first, so the expensive
      peppery stuff literally leaves the pan before you taste it.
    </p>
    <div className="chart">
      <div className="chart__title">Smoke point, °F (approx.)</div>
      <div className="chart__sub">Where each fat taps out — round numbers, real-world kitchen ranges</div>
      {CHART_ROWS.map((r) => (
        <div key={r.name} className="crow">
          <div className="crow__name">{r.name}</div>
          <div className="crow__track">
            <div className="crow__bar" style={{ width: `${r.width}%`, background: r.color }} />
          </div>
          <div className="crow__val">{r.val}</div>
        </div>
      ))}
      <div className="chart__axis">
        <span>0</span>
        <span>125</span>
        <span>250</span>
        <span>375</span>
        <span>500°F</span>
      </div>
      <p className="chart__note">
        <b>No bar for Drizzle</b> — it's built to stay raw. Heating it just burns off the peppery
        early-harvest aromatics you paid for.
      </p>
    </div>
    <figure className="photo">
      <Img src={g("drizzle-dish.jpg")} />
      <figcaption>
        <b>The finishing move:</b> Drizzle goes on after the heat is off — the last thing to touch
        the plate.
      </figcaption>
    </figure>
  </>
);

const PEOPLE = [
  { img: "kareem.jpg", name: "Kareem Rahma", text: "Comedian, host of SubwayTakes — and a two-bottle household." },
  { img: "arjun.jpg", name: "Arjun Narayen", text: "On weeknight cooking, hosting big, and finishing everything with a squeeze." },
  { img: "caroline.jpg", name: "Caroline McKay", text: "Dinner-party maximalism, and why the table always has a squeeze bottle on it." },
];

export const PeopleSection: React.FC = () => (
  <>
    <span className="sec-kick">Friends of Graza</span>
    <h2 className="sec" style={{ fontSize: 36 }}>
      Real people, real squeeze bottles
    </h2>
    <p className="sec-sub">
      The Glog's "Friend of Graza" series visits the kitchens of people who cook the way we like —
      read their interviews:
    </p>
    <div className="people">
      {PEOPLE.map((p) => (
        <div key={p.name} className="person">
          <div className="person__img">
            <Img src={g(p.img)} />
          </div>
          <div className="person__body">
            <span className="person__tag">Friend of Graza</span>
            <b>{p.name}</b>
            <p>{p.text}</p>
            <a>Read the interview →</a>
          </div>
        </div>
      ))}
    </div>
  </>
);

const CHOOSES = [
  { title: '"I cook every single day"', text: "Sizzle — the pan is always on anyway. Buy two." },
  { title: '"I\'m a salad & good-bread person"', text: "Drizzle — peppery, grassy, made to be poured on, never cooked." },
  { title: '"Fry-day is a lifestyle"', text: "Frizzle — schnitzel, wings, smash burgers, no guilt about volume." },
  { title: '"I refuse to choose"', text: "The Trio — all three jobs covered in one box, cheaper than buying separately." },
];

const PICKS = [
  { img: "sizzle.jpg", tag: "★ Start here", name: "Sizzle — cooking oil", price: "$19.99" },
  { img: "drizzle.jpg", name: "Drizzle — finishing oil", price: "$22.99" },
  { img: "frizzle.jpg", name: "Frizzle — frying oil", price: "$14.00" },
  { img: "trio.png", tag: "Best value", name: "The Trio — all three", price: "$52.00" },
];

const FAQS = [
  {
    q: "Is it actually OK to cook with extra virgin olive oil?",
    a: 'Yes. Quality EVOO smokes around 375–410°F, which covers sautéing, roasting and searing with room to spare. The "never heat EVOO" rule is a myth — the real rule is don\'t heat your finishing oil, because heat burns off the delicate aromatics that make it worth the price.',
    open: true,
  },
  {
    q: "What's the real difference between Drizzle and Sizzle?",
    a: "Same olives, different harvest. Drizzle is pressed from early-harvest (October) Picual olives — bolder, greener, more peppery bite. Sizzle comes from the later harvest: a mellower, rounder oil that's happy taking heat. It's a flavor decision, not a quality tier.",
  },
  {
    q: "Why squeeze bottles instead of fancy glass?",
    a: "Because chefs were right: squeeze bottles portion cleanly, don't drip, and make you actually use the oil instead of saving it for special occasions. Olive oil is a fresh product — the best bottle is the one you finish quickly.",
  },
  {
    q: "Does olive oil go bad?",
    a: "It fades rather than spoils — light, heat and air slowly flatten the flavor. Buy sizes you'll finish in a couple of months, keep bottles closed and away from the stove, and if an oil smells like crayons or old walnuts, it's past its window.",
  },
];

export const ClosingSections: React.FC = () => (
  <>
    <span className="sec-kick">Section 05</span>
    <h2 className="sec">Which bottle are you?</h2>
    <p className="sec-sub">Start from how you actually eat, not from the shelf:</p>
    <div className="choose">
      {CHOOSES.map((c) => (
        <div key={c.title} className="ch">
          <b>{c.title}</b>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
    <div className="tip">
      <b>Storage rule:</b> olive oil has three enemies — light, heat and air. Keep bottles closed,
      off the stove and away from the window, and finish an open bottle within 2–3 months. Fresh
      beats fancy, every time.
    </div>
    <figure className="photo">
      <Img src={g("blt.jpg")} />
      <figcaption>
        <b>The aioli in the wild:</b> the Glog's Garlic Aioli BLT — proof that the condiment era is
        going well.
      </figcaption>
    </figure>
    <h2 className="sec" style={{ fontSize: 34 }}>
      Where to start
    </h2>
    <div className="picks">
      {PICKS.map((p) => (
        <div key={p.name} className="pick">
          <div className="pick__media">
            {p.tag ? <span className="pick__tag">{p.tag}</span> : null}
            <Img src={g(p.img)} />
          </div>
          <div className="pick__body">
            <span className="pick__name">{p.name}</span>
            <span className="pick__price">{p.price}</span>
            <span className="pick__btn">Shop now</span>
          </div>
        </div>
      ))}
    </div>
    <span className="sec-kick">Section 06</span>
    <h2 className="sec">FAQ</h2>
    <div className="faq">
      {FAQS.map((f) => (
        <details key={f.q} open={f.open}>
          <summary>
            {f.q} <span className="pm">{f.open ? "+" : "+"}</span>
          </summary>
          {f.open ? <p>{f.a}</p> : null}
        </details>
      ))}
    </div>
    <div className="cta">
      <div>
        <h3>
          Cook. Finish. <em>Fry.</em>
        </h3>
        <p>Three single-farm Picual olive oils, three jobs, one very useful box. Free shipping over $50.</p>
      </div>
      <a>Get the Trio — $52</a>
    </div>
  </>
);

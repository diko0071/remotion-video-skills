import React from "react";

export type Msg = { user?: boolean; body: React.ReactNode; react?: string; hold?: boolean };

const B: React.FC<{ children: React.ReactNode }> = ({ children }) => <b>{children}</b>;
const C: React.FC<{ children: React.ReactNode }> = ({ children }) => <code>{children}</code>;

export const MESSAGES: Msg[] = [
  { user: true, body: "hey! can you check my ad spend for the last week via Ryze?" },
  {
    body: (
      <>
        <p>Last 7 days (Sept 14–21), Meta Ads / Ryze Core via Ryze:</p>
        <p>Total spend: <B>$9,310.92</B></p>
        <ul>
          <li>Impressions: 108,075 | Clicks: 4,894 | Reach: 63,537</li>
          <li>CPM $86.15 | CPC $1.90 | CTR 4.53% | Frequency 1.70</li>
        </ul>
        <p>By campaign:</p>
        <ul>
          <li><B>seo-scan-broad</B> — $9,285.36 (99.7%)</li>
          <li><B>Meta | Start trial [Managed by Ryze]</B> — $25.56</li>
        </ul>
        <p>seo-scan-leads spent nothing this week (paused). And for what it's worth, CPC this week ($1.90) is noticeably better than your 30-day average of $2.25.</p>
      </>
    ),
  },
  { user: true, body: "can you do more detailed analtyitcs?", react: "\u{1F44D}" },
  {
    body: (
      <>
        <p>On it. Where I am right now:</p>
        <p><B>Done:</B> pulled 5 datasets for Sept 14–21 — daily trend, age/gender, device, and ad-level all came back fine. <B>Hit one snag:</B> the placement breakdown got rejected by Meta (can't combine <C>actions</C> with that breakdown type), so I'm retrying it without the actions field.</p>
        <p><B>Interesting wrinkle I'm digging into:</B> the trial event from the audit (<C>start_trial_total</C>) doesn't appear in this week's data at all. Instead there's a "lead" family of events. I'm checking the real totals now — my first count was inflated because I accidentally summed overlapping datasets.</p>
      </>
    ),
    hold: true,
  },
  {
    body: (
      <>
        <p><B>Update.</B> Placement breakdown is in. Real totals for the week:</p>
        <ul>
          <li>Leads (Meta): <B>412</B>, all from <C>lead</C> and <C>onsite_conversion.lead_grouped</C></li>
          <li>Trials (Meta): <B>0</B> — the <C>start_trial_total</C> event stopped reporting on Tuesday</li>
          <li>Trials (your pixel via Ryze): <B>71</B></li>
          <li>Trials (GA4): <B>68</B></li>
        </ul>
        <p>So Meta thinks trials are zero and is optimizing toward leads instead. That explains why CPC looks great and trials don't: it's buying the cheap event.</p>
      </>
    ),
  },
  { user: true, body: "what about age and device? who is actually converting" },
  {
    body: (
      <>
        <p><B>Age/gender</B> (spend → trials, corrected data):</p>
        <ul>
          <li>25–34: $3,412 → 31 trials, CPA <B>$110</B></li>
          <li>35–44: $2,980 → 24 trials, CPA <B>$124</B></li>
          <li>45–54: $1,905 → 9 trials, CPA <B>$212</B></li>
          <li>55+: $1,013 → 2 trials, CPA <B>$507</B></li>
        </ul>
        <p><B>Device:</B> mobile 81% of spend, 74% of trials. Desktop converts 1.6x better per dollar but you're barely buying it (11% of spend).</p>
        <p>55+ is a third of your CPA problem on its own. I'd cap it, not kill it: there are 2 real customers in there.</p>
      </>
    ),
  },
  { user: true, body: "and by ad? which creatives are working" },
  {
    body: (
      <>
        <p>Ad-level, last 7 days, 12 active ads. Three carry the account:</p>
        <ul>
          <li><B>"Fix your SEO in one click"</B> (video, 15s) — $2,140, 29 trials, CPA $74, CTR 6.1%</li>
          <li><B>"Your competitors' best ads"</B> (static) — $1,310, 14 trials, CPA $94</li>
          <li><B>"We write, you approve"</B> (carousel) — $1,090, 11 trials, CPA $99</li>
        </ul>
        <p>Four ads have spent over $400 with zero trials. Two of them are the same creative with different headlines, so Meta split the budget and neither exited learning. <B>Frequency on the top video is 3.4</B> — it's starting to fatigue; CTR fell from 7.8% to 6.1% over the week.</p>
      </>
    ),
  },
  { user: true, body: "ok so what do i do with the 4 dead ones" },
  {
    body: (
      <>
        <p>Pause them. Combined they've spent <B>$1,742</B> this week for nothing, and that budget flows back to the three winners automatically under CBO.</p>
        <p>I checked why they're dead before saying that: two point at the old landing page (<C>/lp-v2</C>, 4.1s LCP on mobile), one has a broken UTM so GA4 files it under direct, and the last one is a duplicate of the winner with a worse hook. None of that is fixable by letting them run longer.</p>
      </>
    ),
  },
  { user: true, body: "wait the landing page is slow? can you check" },
  {
    body: (
      <>
        <p><B>Checked both pages from three regions.</B></p>
        <ul>
          <li><C>/lp-v2</C>: LCP <B>4.1s</B> mobile / 2.2s desktop. A 2.8 MB hero video autoplays above the fold and there is no poster image.</li>
          <li><C>/scan</C> (the page the winners use): LCP <B>1.4s</B> mobile.</li>
        </ul>
        <p>That gap alone explains the CPA difference between the two ad groups. Every extra second on <C>/lp-v2</C> costs you roughly 9% of visitors before they see the form.</p>
        <p><B>Interesting:</B> <C>/lp-v2</C> was your control in the A/B you ran in July. It won back then on desktop. Nobody re-ran it on mobile after the video was added.</p>
      </>
    ),
  },
  { user: true, body: "wait why did the trial event stop on tuesday" },
  {
    body: (
      <>
        <p><B>Checking.</B> Pulled the pixel event log through Ryze for Sept 14–21, hour by hour.</p>
        <ul>
          <li>Mon: <C>StartTrial</C> fires 9–11 times a day, matches Stripe within 1.</li>
          <li>Tue 3:40 PM: last <C>StartTrial</C> event. Nothing after.</li>
          <li>Tue 3:41 PM onward: <C>PageView</C> on <C>/welcome</C> keeps firing, so the page loads. The event just isn't sent.</li>
        </ul>
        <p><B>Hmm.</B> The page is alive, the event is dead. That smells like a deploy, not a Meta issue. Let me check the landing page and then GitHub.</p>
      </>
    ),
  },
  {
    body: (
      <>
        <p><B>Landing page:</B> loads, form submits, redirect to <C>/welcome</C> works. In the page source, the pixel is there, but the <C>fbq('track', 'StartTrial')</C> call is gone.</p>
        <p><B>GitHub:</B> found it. Deploy <C>#1361</C>, Tuesday 3:31 PM, "migrate welcome page to new template". The old template had the StartTrial call inline; the new one loads the pixel from a shared layout that only sends <C>PageView</C>.</p>
        <p>So: trials didn't drop. Tracking did. Since Tuesday, Meta has had 0 trial signals and has been optimizing on leads. That is where this week's CPA went.</p>
      </>
    ),
    hold: true,
  },
  { user: true, body: "fuck. ok can you fix it?" },
  {
    body: (
      <>
        <p><B>Yes.</B> Two things, both through Ryze, both done:</p>
        <ul>
          <li>Restored <C>StartTrial</C> in the Ryze pixel config so it fires on <C>/welcome</C> regardless of template. Verified with a test trial: Meta received it in 4 seconds.</li>
          <li>Backfilled Tue–Sun: 71 trials re-sent to Meta CAPI and GA4 with the original timestamps, deduped by <C>order_id</C> so nothing double-counts.</li>
        </ul>
        <p><B>One more thing I noticed while in there:</B> your <C>Purchase</C> event fires again every time someone refreshes the thank-you page. 194 duplicates in 14 days, plus 23 test orders from your office IP. I added dedup by <C>order_id</C> and an IP filter. Your real ROAS is 2.8, not 4.1.</p>
      </>
    ),
    hold: true,
  },
  { user: true, body: "can you also double check GA4, i dont trust it" },
  {
    body: (
      <>
        <p>Fair. Pulled GA4 directly, not through Meta.</p>
        <ul>
          <li>GA4 <C>purchase</C> events, 14 days: <B>380</B></li>
          <li>Ryze pixel <C>Purchase</C>, same window, before dedup: <B>612</B></li>
          <li>Shopify orders, same window: <B>395</B> (of which 23 are your test orders)</li>
        </ul>
        <p>GA4 is the closest to the truth and it's still 15 short, because its tag loads after consent and about 4% of buyers close the tab before it fires. The pixel was the liar, not GA4. After the dedup all three sit at <B>395 / 395 / 380</B>, which is as aligned as these ever get.</p>
      </>
    ),
  },
  { user: true, body: "what should i change in the campaign now" },
  {
    body: (
      <>
        <p>Now that Meta sees trials again:</p>
        <ul>
          <li>Switch <B>seo-scan-broad</B> optimization from <C>Lead</C> back to <C>StartTrial</C>. I'd do it tonight so the learning phase starts on a full day.</li>
          <li>Keep the budget. Spend was fine; the signal was wrong.</li>
          <li>Re-enable <B>seo-scan-leads</B> only if you want top-of-funnel volume. It was never the problem.</li>
        </ul>
        <p>I'll watch trials hourly for 48 hours and message you if the pixel goes quiet again.</p>
      </>
    ),
  },
  { user: true, body: "thank you, this is insane" },
  { body: <p>Any time. Next time a number looks off, ask me before you touch the budget. Nine times out of ten it's the tracking.</p> },
];

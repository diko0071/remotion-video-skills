# Reference: Amplitude — Agents connectors promo

Source: https://x.com/Amplitude_HQ/status/2062206622450258209 (source.mp4)
32.62s @ 24fps 1920x1080. Map: map-1..7.png (8fps, 261 tiles).

## Measured shot map (30fps frames)

    0-210    hero: tiny blue "Let's dive in" + heading "What do you want
             to know?", composer card fades in below, placeholder types
             "Analyze, learn, or build anything...", cursor travels to "+"
    210-350  connectors panel: white sheet, rows Atlassian/GitHub/Granola/
             Linear/Notion/Sentry/Slack each with a "Connect" chip; cursor
             clicks, chips flip to blue "Connected" in a cascade; panel
             collapses into a row of connector icons INSIDE the composer
    350-470  typing "Pull all Jira tickets in the current sprint and
             identify any issues" — camera zooms INTO the pill while typing,
             send arrow clicked at full zoom
    470-560  answer: prompt becomes a blue chip top-right; card "Active /
             In-Progress Bugs with Error Impact" draws — 4 rows (SPRINT-212
             Dashboard export 34% drop-off 2,847 errors / Search refactor /
             File upload redesign / Notification preferences), rows
             highlight one by one with red/yellow badges
    560-640  typing "Get me more context on the Dashboard Export release
             from Notion" → send → Notion tool card: checklist "Search
             release pages ✓ / Fetch Dashboard Export PRD / Summarize
             findings" ticking through
    640-700  "Finished working" card expands: Notion — PRD read, summary
             paragraph, then "I suggest: Reprioritize SPRINT-212 to P0 …
             Send a weekly ticket health Slack update to #product-sprint",
             two ghost buttons "Update to PD" / "Send weekly Slack update"
    700-761  cursor clicks "Slack - Schedule message" chip → Slack window
             slides in from the right on top of the app (purple sidebar,
             #product-sprint, "Weekly Sprint Health - Week of June 1" with
             At Risk / On Track sections)
    761-873  full-bleed Slack, reaction lands on the message
    873-896  white circle wipe from center-right, Amplitude "A" wave
             draws itself stroke-first
    896-979  blue endcard, "Amplitude" lockup (logo circle + wordmark)

## Why it lands

One continuous product take (0-761 is ONE surface, no cuts) — the story is
carried by in-place morphs: panel → icon chips in the composer, prompt →
chip, card → Slack slide-in. Camera pushes into the pill during typing.
Payoff = the deliverable lands in Slack, full-bleed. Clean white, one blue.

## Build notes

- kit/slack-ui already exists (ported 1:1) — use it for 700-873.
- Connector icons: real favicons (atlassian, github, granola, linear,
  notion, sentry, slack) → public/amplitude/icons/.
- Amplitude logo: real SVG (wave + wordmark).
- Type: geometric sans, tight; Inter acceptable stand-in.
- Palette: bg #FAFBFD, ink #16181D, blue #2160F0 (buttons/chips/endcard),
  table badges red/yellow/green.

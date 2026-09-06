# guide-mcp — Ryze inside Claude, in under a minute

Hook: Ryze ships with an MCP connector — your whole marketing stack,
available inside Claude. One link, one minute.

## Laws
- Content changes only from a visible click (Claude's Enter-send is the one
  product-true exception: the sent bubble follows the finished typing).
- Every VO fact on screen when spoken. No teleports — the Ryze->Claude cut
  is caused by clicking "Open Claude".

## Click script

BEAT 1 — Ryze: the connector (VO 01)
  Screen: Ryze Integrations page, Claude MCP card visible.
  1. Click card "Claude MCP" -> dialog "Connect Claude MCP": the shared
     Ryze MCP URL in a field, Copy icon, "Setup guide" + "Open Claude" buttons.

BEAT 2 — Copy and jump (VO 02)
  2. Click the copy icon -> "Copied" check flashes.
  3. Click "Open Claude" -> CUT to Claude Settings / Connectors.

BEAT 3 — Add in Claude (VO 03)
  4. Click "Add" -> "Add custom connector" popup; the URL types into the
     Remote MCP server URL field (paste), name "Ryze AI".
  5. Click popup "Add" -> popup closes; "Ryze AI — Custom — Connected"
     row appears highlighted in Your connectors.

BEAT 4 — Ask Claude about your marketing (VO 04)
  6. Click Claude composer; type "How is my organic traffic this week?".
     Bubble sends (Enter), Ryze tool rows run (search analytics, GA
     report), serif answer with real numbers.

BEAT 5 — Close (VO 05)
  Screen holds on the answer. Outro lockup.

## VO
00-title "Ryze inside Claude."
01-card  "Ryze ships with an MCP connector — your whole marketing stack,
         available inside Claude. Here's the hookup; it takes a minute.
         Open Integrations and hit Claude MCP."
02-copy  "This is the Ryze connector link — same link for every account,
         you sign in on Claude's side. Copy it — and hit Open Claude."
03-add   "You land in Claude's connector settings. Hit Add, paste the
         link, and add it. That's the whole setup — Ryze is connected."
04-ask   "Now open a chat and just ask about your marketing. Claude walks
         your Search Console, your Analytics, your ad accounts — through
         Ryze — and answers with your real numbers."
05-close "One link — and every Ryze tool lives inside Claude. See you
         there."

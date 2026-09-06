# guide-creatives — Ad Creatives, made by asking

Hook: your creatives library — every ad here was generated for your brand.
Work: hit Generate Creative → agent opens with the request already sent →
answer in plain words + attach your product photos → four on-brand ads land
in the chat → expand to full width. Then the wow: annotate — brush on an ad,
pin two spots, type notes, send — the agent rebuilds that exact ad. Plain
words work too (warmer set). Then: Ad Templates (pick two you love → Use as
reference), Competitor Ads (open one → Generate similar).
Close: back to the library — everything you made is already in it.

Click path (every click has a product source):
1. Generate Creative (creatives page head, `paid-ads/creatives`) → sidebar
   agent opens with prefilled prompt (product: openTask with seeded message).
2. Composer focus → type answer → plus menu → Upload from computer → send
   (product: chat composer + attachment menu).
3. Result creatives grid in chat (chat creative widget), panel expand
   (`agent.expand` — same conversation full width).
4. Brush on a creative → lightbox annotate mode (product:
   `chat-image-dialog.tsx` + `use-image-annotation`): tap spot → numbered
   pin + note composer, second spot, Send.
5. Text feedback: type in composer → send → regenerated set.
6. Rail → Ad Templates: click two cards (select), Use as reference
   (`selection-bar`) → agent builds from references.
7. Rail → Competitor Ads: click an ad → lightbox → Generate similar
   (`comp.lightbox.generate`) → your version in your style.
8. Rail → Ad Creatives: library holds everything made this session.

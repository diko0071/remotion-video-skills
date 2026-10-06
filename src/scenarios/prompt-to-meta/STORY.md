# prompt-to-meta

Reference: Lightreel "largest Meta ads dataset" launch (x.com/lightreelai/status/2097701733812023728), frames in references/lightreel/. Taken from it: a painting built out of real ads, a hard zoom-out from ad tiles to the full picture, hard cuts between painted backgrounds on the beat. Everything after their 23 s ending is our continuation: the product story at full speed.

Hook (0-2.7 s): tight on real ad tiles, "every pixel here / is a live Meta ad."; zoom-out from 20x reveals a Van Gogh style sunset made of 1,048 live Meta ads (Apify Ad Library pull, 40 brands, US, active).
Setup (2.7-5.3 s): the product composer (agent mode) types "Find what's winning in my niche. Make 6 new ads. Launch them on Meta." Cursor clicks send.
Drop (5.3 s, frame 160): the prompt folds into the Tasks bar, background cuts to sunflowers, the wall of 104 live food and drink ads bursts in, a gold scan stamps days live, four long-runners fly out as product ad cards (Liquid Death 150d, Poppi 142d, Graza 114d, Brightland 101d).
Make (9.3-13.3 s): lemons painting; the winners fan with the Fishwife product, merge in a burst, six new ads resolve out of pixels.
Launch (13.3-18.3 s): harbor painting; Meta campaign card fills itself, "Agent wants to run 8 tools", cursor clicks Approve all, Publishing, Active.
Live (18.3-21.7 s): poppy field; the panel slides away, the phone rises: Instagram Feed (double tap), Stories, Reels.
Fly-in (21.7-22.7 s, kick at frame 680): the camera flies forward into the last creative in the phone (the Smoked salmon reel), UI falls away, the frame fills with the ad.
Close (22.7-27.5 s): that ad shrinks into its own tile inside a night-sky mosaic, zoom-out reveals the Ryze sun mark made of ads; "One prompt. Ads live on Meta." and get-ryze.ai land with the final chord (frame 779).

UI is the product's: Plus Jakarta Sans, outline cards (border #e7e0d6, 3 px radius scale), composer with the dark send button (#0f172a, no gold), Tasks list icons (Circle, Loader2, Check in brand), competitor ad card anatomy, approval bar, StatusPill, Switch, lucide icons.

Music: ElevenLabs composition plan, cut on its beat grid (one bar repeated, atempo 1.025, trimmed to 27.5 s) so the drop lands on frame 160 and the final chord on frame 779. It plays inside the composition (public/music/prompt-to-meta.mp3), so there is no music.json.

Sources: live ads via the Apify actor seo-audit uses (automation-lab~facebook-ads-library), paintings and new Fishwife creatives generated with gpt-image-2.5-sunburst, mosaics built from the ads by a local script (not in the repo), Ryze mark and Meta/Instagram icons from the seo-audit product. All third-party images live in public/prompt-to-meta/ (gitignored).

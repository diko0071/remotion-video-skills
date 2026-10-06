# Gumloop "Introducing Gumball" (x.com/MaxBrodeurUrbas/status/2098084379474251777, 46s, 3840x2160)

Replica: `src/scenarios/introducing-agent/` (Ryze skin, wide 1920x1080, 30fps).

Look: pure white ground, one rounded geometric sans (Outfit is the closest we
load), one purple blob mascot with two eyes that peeks over every UI element,
colored role-agents (orange / blue / pink / green), thin colored strokes
(corner tick, arc, underline) drawn next to key words. No camera moves at
all: every transition is a hard cut or an element leaving / arriving.

## Cut list (measured at 24fps from f24/ frames; seconds = frame/24)

| beat                                                                   | frames    | s           |
| ---------------------------------------------------------------------- | --------- | ----------- |
| mascot fills the frame, blinks to happy (f7)                           | 1-11      | 0.0-0.46    |
| shrinks, spins across the top, dips onto a 388x268 black block sliding right, exits top-right | 12-36 | 0.5-1.5 |
| small mascot falls from top-left, one spin, lands with a squash as a letter (f48); "introducing" rises f38, wordmark letters type f40-46 | 38-53 | 1.6-2.2 |
| coloured bots replace letters: orange f48, pink f52, blue f54, purple f56, green f58 | 48-60 | 2.0-2.5 |
| "your always-on" f74 / "always-active" f77 / "cloud agent" f80 (whole lines rise, block re-centres); tick f83, blue underline f86, pink arc f89, green underline f92 | 74-113 | 3.1-4.7 |
| "every email": card slides in 22px from the right f115; pill pops f120 (465x94 -> 495x110); dark panel rises f134-140 (0, 12, 122, 286, 298, 301, 303 px); mascot pops from behind it f136-142 | 114-161 | 4.75-6.7 |
| "every meeting": panel already up, mascot pops over the card's top-right corner f170; card scales 0.9 and lifts on exit f192 | 162-196 | 6.75-8.2 |
| "all the context.": dark pill f200, text types; pill shrinks f214-217, lightens and inflates into the 1539x784 window f218-228; mascot rises from the bottom edge f221-228; doc lines type | 197-261 | 8.2-10.9 |
| "gumball manages / agents across your / entire organization" f262/265/268; tick f274, arc f278, green f283, blue f286 | 262-307 | 10.9-12.8 |
| four notification chips drop in f309/313/317/320; bracket f318, strokes f320-326; stack slides left and shrinks out in 4 frames f336-340 | 308-339 | 12.85-14.1 |
| grid of grey bots; "Searching..." pill enters from the right at ~100px/frame f341-347 then creeps; text types f345-360; blue f356, orange f366, green f375, pink f382; pill slides out left f389 | 340-390 | 14.2-16.25 |
| cluster rises from below f397-410 (top y 727 -> 357), labels pop, legs draw f402-408, hop 46px f408-414 | 391-437 | 16.3-18.2 |
| cluster flies to the top-right at 0.33x f439-446, scatters, purple cursor arrow; "today's tasks" f440; rows type f453/462/470/478 with grey->ink sweep, bot lands at each row end | 438-491 | 18.25-20.5 |
| "and is always reachable" purple -> grey f494-502; rows f506/516/522/526; zoom 1.06 f554 | 492-557 | 20.5-23.2 |
| "gumball routes / to the best / model for the task" word by word f558-590; model marks pop inline f609-612 | 558-629 | 23.25-26.2 |
| mascot over a black Slack pill; typing f634-658 (~1.9 chars/frame); marks pulse in turn f650/658/668; Kimi grows + "Routing to Kimi K3..." f680; pill greys and swaps to Notion f699-706; row swap with x-blur f724-730 | 630-767 | 26.25-32.0 |
| price row: Opus 5 $4.56, count-down f780-792 accelerating; GPT Sol f792, count f803-825; Grok 4.6 f825, count f834-843; Flash v4 $0.48 f846; row lifts f852, "bringing your cost per task" f854, "all the way down" f857 | 768-895 | 32.0-37.3 |
| "gumball has access to all / company knowledge and skills" f896/898; strokes f907-926; 17 skill chips pop with tilt f916-970 while the headline dims; pile shrinks out f960-964 | 896-964 | 37.3-40.2 |
| "all within" f965, "your own" f970; aws f977, tick f980, azure f986, arc f991, gcloud f1001, green f1003, cloud f1014 | 965-1023 | 40.2-42.65 |
| "try at" f1024, caret f1030, types f1032-1046; wordmark f1068 | 1024-1104 | 42.65-46.0 |

## What to steal
- A FACE for the agent that peeks over UI: the mascot is behind every card,
  top edge only, eyes tracking.
- Text lines decorated with tiny coloured strokes drawn after the word lands.
- Dark result panel sliding up over a light window = "the agent did it".
- The status pill INFLATES into the document window (one object carries it).
- Chips and piles EXIT by sliding left and shrinking in 4 frames, never fading.
- Model routing shown as marks under a message: one grows, text streams.
- Price ladder as one row whose number counts down while the model swaps.

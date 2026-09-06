# Guide videos: the mechanics report (written after walkthrough-schedules was deleted, 2026-08-16)

Dmitry killed the first guide because the approach could not scale to 200 of
them. This file is the post-mortem and the contract for every guide from now on.

## What I built, and why it was wrong

I treated a guide as a **slide deck of pages**: one VO line = one beat = one
full-screen page component, faded into the previous one. Every beat mounted its
own copy of the app.

Everything Dmitry saw follows from that single choice:

- **The list "loaded" twice.** Beat 1 was the schedules page; beat 2 was a
  *different* copy of the same page with the panel. A new mount = the entrance
  animation plays again. The viewer sees the app loading a screen they are
  already looking at.
- **The screen flashed on submit.** Beats 2 and 3 were two copies of the same
  screen, cross-faded. Nothing in the product changes when you submit a form —
  only the chat grows. The flash was pure architecture leaking on screen.
- **A pointless click on "Schedules".** Because a beat could only start by
  navigating, I clicked a nav item to reach a page the viewer was already on,
  right after the agent had created the schedule that was already visible in the
  list.

The deeper error: **state changed because the narration moved on**, not because
the user did something. In a product walkthrough that reads as noise — the app
appears to act on its own.

## The mechanics a guide must follow

1. **One app, mounted once.** The shell (navbar, rail, page area, agent panel)
   exists for the whole video. Nothing that stays on screen is ever re-mounted,
   re-faded or re-animated. A screen the viewer has already seen never plays its
   entrance again.
2. **State changes only as the consequence of a visible action.** A click, a
   submit, an agent finishing work. If nothing was clicked, nothing may appear,
   move or reload. The narration never causes a transition; it only decides how
   long a state is held.
3. **Act on the object, not on the menu.** If the agent just created a thing and
   it is on screen — click *that thing*. Navigating back through the sidebar to
   reach something already visible is the tell that the video is being driven by
   the script instead of by the user.
4. **Navigation is only for going somewhere new.** The rail is clicked when the
   viewer genuinely has to change section, never to "restage" a page.
5. **The narration follows the interface, not the other way round.** Write the
   click path first (what a real user does, in order), then write VO lines that
   fit the states that path produces. If a VO line has no state to sit on, it is
   the wrong line.
6. **Camera is static by default** (Dmitry, 2026-08-16). The cursor is the only
   thing that moves between actions. Camera work is opt-in per video, never the
   default for guides.
7. **One timeline of actions.** The scenario declares actions with frames:
   `{at, click: "object", then: state change}`. Duration comes from the VO that
   covers each state. There is no per-beat component tree.

## Shape that satisfies this

A guide scenario is:

- one `AppSession` component: the shell + a route/state resolved **as a function
  of the current frame** (which page is open, is the panel open, how far the
  chat has progressed);
- a list of actions (frame -> click target -> resulting state);
- a list of VO lines pinned to those states;
- one `SceneCursor` over the whole video and one click SFX track.

Pages are swapped inside the same shell, so the navbar, rail and panel never
re-render as new elements. A page that was already visited keeps its settled
state when it is shown again — it does not replay reveals.

## Verification that would have caught this

The contact sheet showed the double load and the flash; I read it and did not
name them because I was checking for my own defects (parks, empty tiles), not
for **causality**. Add these to the pass:

- Does any element appear or animate without a visible cause in the previous
  frames?
- Is any screen shown a second time replaying its entrance?
- Does every click land on the thing the narration is talking about?

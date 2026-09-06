# Cursor motion research — every page read (running log)

1. https://www.canvid.com/features/cursor-movement-smoothing — styles Molasses/Default/Gentle/Stiff = spring tension+friction sliders; no algorithm disclosed.
2. https://www.screenify.studio/blog/2026-04-20-smooth-cursor-recording — reduce raw path to 4-5 control points, bezier through them + moving average; smoothing preserves START and END exactly (only transit changes); over-smoothing = clicks read "near" not "on"; response delay 50-250ms; rubber-banding failure mode.
3. https://docs.smoothcapture.app/guides/look-and-feel/mouse/ — Smooth Motion = cinematic smoothing + smart easing; click = gentle ripple; idle cursor AUTO-HIDES (no wiggle!); motion blur trail on fast moves.
4. https://www.techsmith.com/learn/tutorials/camtasia/cursor-smoothing/ — 4 params: Duration (time between points), Delay (pause BEFORE and AFTER each click), Easing (decelerate into endpoint, accelerate out), Detect Cursor Pauses (stationary >= 1s shown as pause). Cursor PAUSES at clicks — never drifts.
5. github.com/CapSoftware/Cap — crates/rendering/src/cursor_interpolation.rs (833 lines, read in full) — THE production algorithm (open-source Screen Studio): spring-mass-damper simulated at 60Hz from t=0; CLICK LOOKAHEAD: 500ms before a click the spring target SNAPS to the click position (cursor arrives early and rests); 175ms before click the spring stiffens (Snappy: tension 530, friction 40); Drag profile tension 1000 while button down; phase-lead compensation (target sampled friction/tension seconds ahead so the smoothed cursor doesn't lag); shake filter BEFORE simulation (direction reversal via dot<0 + both segments < 0.015uv within 100ms window = dropped); decimation to 60fps + min-dist 1px/1920; settle tail 300ms; NO idle wander anywhere — resting cursor is DEAD STILL.
6. Cap crates/rendering/src/spring_mass_damper.rs — closed-form under/critical/over-damped spring solution per axis; rest thresholds velocity 1e-4, displacement 1e-5 (snap to rest — no endless micro-motion).
7. Cap crates/rendering/src/layers/cursor.rs — click animation: cursor SHRINKS to 0.8 scale over 130ms with smoothstep (get_click_t), that's ALL a click is; idle cursor: after 500ms still → fade OUT over 400ms, fade back in 250ms before movement resumes; motion smear length = per-frame travel, linear, capped 480px.
8. github.com/AsfhtgkDavid/windmouse (src) — bot-motion lib: gravity force toward target + wind (Perlin-ish randomness) while far; wind amplitude DECAYS as distance shrinks so arrival is clean; used to fake humans, explicitly NOT what polished demo videos use.
9. github.com/arevi/wind-mouse (src/index.ts) — same algorithm in TS: wind = randomness clamped by distance; step size from gravity; jitter belongs to TRAVEL phase, never to the stop.
10. https://en.wikipedia.org/wiki/Fitts%27s_law — MT = a + b·log2(D/W+1); two phases: fast ballistic approach + slow corrective phase near the target; smaller targets = slower careful approach. Implication: decelerate INTO the target, tiny settle, no overshoot for big buttons.
11. https://screen.studio/ — marketing: "shaky and rapid movement transformed into smooth glide"; static cursor AUTO-HIDES with animation; cursor size upscaled with hi-res system cursors; motion blur on movement.
12. https://ben.land/post/2021/04/25/windmouse-human-mouse-movement/ — WindMouse in depth: gravity G0=9 toward target + wind W0=3 randomness; CLOSE to target (d<12px) wind only DECAYS (no new randomness) and velocity cap shrinks sqrt(5) per step → clean deceleration; randomness lives in TRAVEL, arrival is convergent; human feel = curved path + variable velocity, NOT endpoint jitter.
13. https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/ — mass/tension/friction; "most of the time my spring animations are not bouncy at all" — high friction ≈ critically damped is the default for natural UI motion; springs beat bezier because of how they slow into the stop.
14. https://getrapidemo.com/features/cursor-smoothing — screen recorded WITHOUT cursor, pointer tracked separately and re-rendered as overlay (same architecture as ours); eased motion between targets; click animations edited after the fact.
15. https://focusee.imobie.com/features/auto-zoom-and-cursor-animation.htm — 8 click effects, 40 cursor styles; cursor auto-HIDES during idle moments ("Smart Cursor Behavior"); zoom centers on click areas.
16. https://www.alexisbacot.com/blog/the-art-of-damping — damping function survey; DOUBLE DAMPER (damp the target AND the value) removes all noise from a moving target — the fix for retarget jitter; every damper must adapt to live target changes, not fixed curves.
17. https://blog.maximeheckel.com/posts/the-physics-behind-spring-animations/ — spring equations; framer defaults stiffness 100 / damping 10 / mass 1; damping dissipates energy → convergence.
18. https://www.aescreens.com/blog/how-to-animate-mouse-cursors-after-effects — (thin: Mouse Pack tool page; click states toggled, no manual technique).
19. https://www.arsturn.com/blog/animate-track-your-mouse-cursor-in-after-effects-a-step-by-step-guide — pro AE practice: smooth recorded paths (Smoother, tolerance 10-20), PAUSE at every interaction ("hover, slide, pause for a second"), motion blur on fast moves; stretch keyframe groups to retime.
20. https://developer.android.com/develop/ui/views/animations/spring-animation — (from search summary) DampingRatio 1.0 = critically damped default for professional motion; bounce only when gesture carried momentum.
21. https://www.carmenansio.com/articles/spring-physics-css/ — (from search summary) sample a real spring equation into linear() points; "smooth preset is a critically damped spring — clean settled arrival, never crossing the target".
22. https://www.techsmith.com/learn/tutorials/camtasia/cursor-effects/ — click effects catalog (Burst/Rings/Ripple/Scaling/Scope/Target/Warp + sound); "Kinetic Cursor" adds momentum (pulled/pushed feel); recommended combo = Sound + Scaling.
23. https://www.smoothcapture.app/blog/mastering-the-product-demonstration-video-in-2026 — "fast cursor movement consistently hurts quality"; slow intentional movement + click ripple + hidden cursor when idle; cut cursor wandering entirely; intentional pauses between steps.
24. https://screen.studio/create/product-demo-videos — record once → auto smoothing; zooms follow cursor; timeline drag editing.
25. https://pmc.ncbi.nlm.nih.gov/articles/PMC2628348/ — pointing = one ballistic bell-shaped submovement covering most of distance + optional tiny terminal submovements; endpoint oscillation is a TERMINATION artifact, more frequent on LARGE targets, not a correction — and it's tiny; healthy motion = one smooth decel into the stop.
26. https://focusee.imobie.com/use-cases/product-demo-video-maker.htm — (search summary) auto-zoom on click areas; cursor effects for small screens.
27. https://www.ngram.com/blog/best-product-demo-video-makers — (search summary) smooth cursor interpolation makes movement "deliberate instead of twitchy"; intentional pauses.
28. https://screencharm.com/blog/product-demo-video-maker — (search summary) Smart Auto-Zoom tracks cursor into menus/buttons on click.
29. https://help.figma.com/hc/en-us/articles/360040522373-Prototype-animations — (fetched via search summary) Figma "Gentle" spring preset for smart animate; easing catalog linear/ease-in-out/back/custom.
30. https://javascript.plainenglish.io/how-to-make-a-custom-cursor-with-lerp-that-follows-pointer-6aa6f92fe48a — lerp cursor follower pattern (paywalled body; concept: pos += (target-pos)*speed).
31. https://medium.com/14islands/developing-a-performant-custom-cursor-89f1688a02eb — lerp = (1-n)a+nb; n→0 heavy lag, n=1 instant; IDLE: when distance < 0.001 CANCEL the loop entirely — the professional cursor STOPS DEAD at rest, no residual motion; render via CSS vars.
32. https://www.evl.uic.edu/ralph/508S99/eases.html — classic CG course: eases = spacing clustered at extremes; spline overshoot at sharp changes is a BUG fixed by tangent tension.
33. https://pixune.com/blog/slow-in-and-slow-out/ — more frames at start/end; TOO much ease = floaty; constant-speed reads mechanical.
34. https://medium.com/animation-appreciation/6-ease-in-ease-out-2c70119bb13 — (search summary) ease principle: slow-fast-slow; robotic without.
35. https://www.animationmentor.com/blog/slow-in-and-slow-out-the-12-basic-principles-of-animation/ — (search summary) spacing widens to speed, constant mid-flight, narrows to stop.
36. https://daveswift.com/screen-studio/ — Screen Studio exposes tension/friction/mass physics; slight cursor ROTATION during movement for natural feel; freeze cursor at video end (no drift to stop button).
37. https://www.1capture.io/blog/screenstudio-review — "shaky movements into elegant glides", cursor resize post-recording (no physics internals).
38. https://www.screenify.studio/blog/2026-04-19-cursor-effects-recording — max TWO effects stacked; one consistent config across all recordings; product demos = smooth cursor alone, tutorials = spotlight+click.
39. https://www.screenify.studio/blog/2026-04-19-highlight-mouse-clicks-recording — ripple 200-300ms, ring 300-500ms, dot 150-250ms; 20-30px radius at 1080p; colors not found in the UI palette.
40. https://github.com/ytrofr/claude-remotion-editor — (search summary) Remotion cursor library: 49 pointer variants, tip-aligned click effects.
41. https://www.remotion.dev/docs/ai/cursor-plugin — (search summary) Remotion's own cursor tooling exists for AI editors.
42. https://gamedevbeginner.com/how-to-follow-the-player-with-a-camera-in-unity-with-or-without-cinemachine/ — lerp-a-percentage-per-frame "never quite reaches target" (misuse); SmoothDamp preferred (natural decel, consistent duration ~0.25s); JITTER cause: measure/update rate mismatch — fix at the SOURCE (interpolate the rigidbody), not the camera.
43. https://www.francescomilanese.com/tutorials-en-all/tut-205-en-unity-2d-smooth-camera-follow.html — lerp lacks damping in final approach; SmoothDamp = progressive speed damping into target.
44. https://www.arcade.software/post/navattic-vs-storylane-vs-arcade-which-should-you-choose-in-2024 — demo-tour tools guide attention with PAN/ZOOM to hotspots more than cursor theatrics.
45. https://nilcoalescing.com/blog/AnimationTimingInSwiftUI/ — Apple presets: smooth = critically damped (no overshoot), snappy = small overshoot, bouncy = visible oscillation; professional = smooth.
46. https://www.arcade.software/post/arcade-vs-navattic — (search summary) record-first capture → hotspot steps.
47. https://gsap.com/docs/v3/Eases/ — default power1.out; ease IS the personality of motion.
48. https://ics.media/en/entry/18730/ — ease-out for anything arriving (lingering end guides attention); strength ladder Sine<Quad<Cubic<Quart<Quint<Expo; ease-out Quint/Expo for strong arrivals; ease-in delays = bad for feedback.
49. https://autozoom.app/blog/adding-cinematic-motion-blur-to-your-screen-recordings — directional blur on fast mouse moves; low blur for text content, medium for demos; blur = professional polish + less eye strain.
50. https://focusee.imobie.com/record-tips/what-is-motion-blur.htm — blur smooths frame-to-frame transitions; strength adjustable post-recording.
51. https://explorable-explanations.com/en/p/easings/ — (search summary) interactive easing cheat sheet, In/Out/InOut families.
52. https://www.easing.dev/ — (search summary) easing graphs reference.
53. https://www.nngroup.com/articles/animation-duration/ — 100-500ms scale; >500ms drags; ease-out for arriving, ease-in for leaving; linear = unnatural; "far more common to be too long than too short".
54. https://m3.material.io/styles/motion/easing-and-duration — (title only, body via search summary) standard vs emphasized; longer duration for longer distance.
55. https://v10.carbondesignsystem.com/guidelines/motion/overview/ — IBM curves: productive standard cubic-bezier(0.2,0,0.38,0.9); durations scale WITH distance (70-700ms); productive motion = subtle, out of the way.
56. https://medium.com/google-design/implementing-motion-9f2839002016 — standard vs emphasized easing; arc vs linear paths; duration/easing = app personality.
57. https://www.nngroup.com/articles/animation-usability/ — (search summary) motion in periphery grabs attention (danger reflex); animation must be brief and subtle.
58. https://uxdesign.cc/ui-animation-please-use-responsibly-e707dbdb12d5 — (search summary) 150-350ms comprehension band.
59. https://tight.studio/resources/how-to-smooth-the-cursor-in-tella/ — Tella records raw (no smoothing); Tight Studio sells: smoothing levels, animation styles, motion blur, LEAN effect (cursor tilts with motion), click highlight — all post-recording.
60. https://blog.codinghorror.com/mouse-ballistics/ — OS acceleration transfer curves: rise moderately then flatten; Windows curve tuned by usability study; macOS curve "cliff" feels wrong — curve SHAPE decides feel.
61. https://www.tella.com/definition/highlight-mouse-click — Loom click highlight = colored circle around cursor on click, adjustable color/size.
62. https://www.tella.com/blog/loom-alternatives — (search summary) Tella auto-zoom follows cursor; Loom: no smoothing.
63. https://motion.dev/tutorials/react-follow-pointer-with-spring — official follow-pointer: damping 3 / stiffness 50 = playful trailing (NOT demo-grade — deliberately bouncy); restDelta 0.001 avoids end-snap.
64. https://dev.to/arielbk/how-to-make-an-advanced-pointer-animation-ts-react-and-framer-motion-2p39 — velocity→opacity mapping via useVelocity; eased shadow values easeOut 1s.
65. https://resprawn.medium.com/when-you-play-a-great-game-it-feels-good-d23761b6eccf — (search summary) juice = subtle reactive effects; hit-stop 40-80ms sells weight.
66. https://hackread.com/the-juice-factor-designing-game-feel/ — (search summary) feedback systems make actions satisfying; restraint.
67. https://www.clueso.io/blog/how-to-make-tasteful-screen-capture-videos — 250-400ms pause AFTER every click; subtle 200-300ms low-opacity click pulse (no drama); zoom push-ins 5-10%; "taste beats tech".
68. https://www.ngram.com/blog/how-to-make-a-software-tutorial-video — pause 2-3s around major actions; cursor slower than feels natural; emphasis ring on busy UIs.
69. https://screenbuddy.xyz/blog/screen-recording-for-tutorials — HALF normal speed cursor was "the single change that improved completion rates most"; 2s pauses between steps; zoom 1s BEFORE the click (anticipation, not surprise).
70. https://developer.apple.com/design/human-interface-guidelines/foundations/motion — (via search summary) motion must be purposeful, physically credible, 100-500ms, feedback-driven; disorientation when motion defies physics.
71. https://www.capcut.com/create/zoom-effects-for-tutorial-videos-guide-attention — (search summary) zoom guides attention to click areas.
72. https://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/ — a = lerp(a,b,1-exp(-lambda*dt)); naive per-frame lerp is framerate-dependent.
73. https://www.gamedeveloper.com/programming/improved-lerp-smoothing- — value = lerp(target, value, exp2(-rate*dt)); rate 1.0 = halfway per second.
74. https://ijirt.org/publishedpaper/IJIRT183343_PAPER.pdf — (abstract via search) bezier control points create the wrist's natural slight arc; ease-in-out matches human reach.
75. https://blog.rainbowmaker.co.kr/game/2019/04/04/smooth-follow-damping.html — (search summary) same exponential damp derivation.
76. http://lolengine.net/blog/2015/05/03/damping-with-delta-time — (search summary) damping with delta time classic.
77. https://www.docsie.io/blog/articles/clueso-vs-guidde-comparison-2026/ — AI pipelines apply cursor path smoothing + auto-zoom as core polish steps.
78. https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion — (search summary) reduced-motion media; scaling/panning large objects = vestibular triggers.
79. https://web.dev/learn/accessibility/motion — (search summary) essential vs non-essential motion split.
80. https://motion.dev/docs/easing-functions — easing catalog + modifiers (reverse/mirror); "duration = how long, easing = how distributed".
81. https://www.clueso.io/solutions/screen-recording-software — Screen Studio "smart motion smoothing" real-time vs Clueso post-recording zoom/blur.
82. https://arxiv.org/pdf/2405.15503 — (search summary) two-thirds power law v = a·k^(-1/3): SPEED DROPS ON CURVES — curved cursor path must slow down through the arc to read natural.
83. https://motioncanvas.io/docs/tweening/ — (search summary, page 403) tween generators, easing on every animatable signal.
84. https://pubmed.ncbi.nlm.nih.gov/25609105/ — (search summary) 2/3 law originates in trajectory PLANNING, not execution noise.

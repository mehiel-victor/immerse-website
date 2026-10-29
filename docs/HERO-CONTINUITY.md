# Hero entry and shared-element defaults — v0.2.0

The default invocation now requires spatial entry into the hero and the same protagonist connecting sections through GSAP ScrollTrigger, alongside temporal section triggers and continuous ambient animation. Explicit user constraints and reduced-motion alternatives remain respected. The [implementation guide](../skills/immerse-website/references/hero-continuity.md) defines states, identity, depth layers, scroll ownership, reversal and acceptance.

## Fresh invocation test

A fresh-context agent received only the short Museu Órbita brief: use the skill to create a Portuguese local demonstration with three scientific instruments, selection, history, return, visit planning, desktop and mobile. No additional hero, depth or shared-element directions were included in that brief. The agent loaded a frozen candidate skill snapshot and received local fonts and GSAP/ScrollTrigger 3.15.0. No earlier demo source, evaluation rubric, private references or corrective parent coaching was supplied.

The generated output used a layered entry sequence, an armillary sphere that grows and then travels into the collection, and the same artwork nodes transferred into and out of the detail dialog. The parent did not edit that generated application. The frozen skill snapshot and original generation notes are included in the evidence archive. Older optional-stack example wording was aligned with the new default after this run; no second generation is claimed for that wording-only alignment.

Independent browser replay in Chrome 156, 1280×800 desktop and 390×844 emulated touch, passed 14 grouped checks:

- Ambient pixel change without input; pause stability and resumption.
- First-scroll entry with increasing protagonist scale and distinct foreground/background transforms.
- Same connected node reaching the collection; destination alignment within 2 px.
- Keyboard selection, same artwork node in each of three stories, and return.
- A finite section-entry tween on entry and reentry, separate from scrub.
- Rapid reversal without duplicated protagonists.
- Fictional visit planning and Escape.
- Mobile layout and touch detail/return.
- Reduced-motion static collection, no ScrollTriggers, stable pixels and usable story.
- Missing GSAP fallback with a usable static collection and story.
- Normal-path runtime/resource errors absent.

The grouped raw results, screenshot samples, recording and runnable source are in [v0.2.0 evidence](https://github.com/mehiel-victor/immerse-website/releases/tag/v0.2.0). These observations demonstrate the requested behavior in this invocation, not universal artistic quality. The illustration is an original interpretative asset, not a museum catalog item.

## Updated directed museum demonstration

The existing compass demonstration was separately refined: a pinned hero presents three depth planes; the original SVG approaches, opens a visual aperture into the scene, and continues into the collection and detail. The same SVG identity survives return. This is directed implementation work, not another independent skill invocation.

It passed 16 common functional checks and 11 focused hero checks covering pin/entry, differing depth transforms, inside composition, same-node progression, destination alignment within 1 px, same-node detail/return, rapid reversal, reduced-motion removal of pin, preference changes while in detail and runtime errors. The finishing pass reran the 11 focused checks after viewport/text/aperture adjustments. Three additional probes passed for direct collection anchors, resize during entry and absent GSAP. The anchor probe exposed a competing entrance transform on the landing slot; the slot now has one position controller and the flight ends at the native collection anchor offset. A sequencing bug that initially collapsed the outward scroll range was fixed before the passing run.

The showcase video is a real browser recording at original elapsed time, captured at 25 fps from 1280×800. The GIF is a smaller, lower-frame-rate excerpt, without acceleration. Neither is a performance benchmark.

## Scope and limits

One independent generation, one domain and one model setting. There is no statistical equivalence claim, physical-phone test, cross-browser certification, screen-reader audit or GPU/FPS benchmark. The previous [v0.1.1 findings](CALIBRATION.md) remain a historical account; the new requirement and fresh invocation address the concrete continuity gap recorded there.

Pinning and layered scale are mechanisms, not proof that every visitor feels immersed. The prototype still needs brand-specific art direction, representative assets, temporal review and user judgment. Installation and metadata checks likewise do not certify animation quality.

## Five depth beats — v0.2.1

The default now requires at least five perceptibly distinct depth beats. The directed museum implements approach, threshold, celestial chart, passage and observatory, with five independently staged physical planes and the same compass continuing into the collection/detail. Camera poses interpolate continuously across beat boundaries; nearby rings/streaks pass while the distant field remains readable. The small progress indicator labels actual scene changes rather than substituting for them. Return from a story explicitly restores the collection viewport after pin refresh, preserving both the SVG node and scroll context.

The pure scene-model check verifies five distinct poses, continuous boundaries, finite perspective, reverse determinism and safe progress bounds. Browser checks sampled all five beats at 1280×800 and emulated 390×844, then reversed them, verified identity, horizontal layout, pause/resume, destination alignment within 1 px and reduced-motion removal of pin/progress. Both viewports passed all ten grouped invariants. The existing 16 common checks, 11 hero checks (now five physical planes) and three navigation/resize/failure probes also passed. Wheel replay was updated to await observed scroll position before sending another gesture; it does not set scene state directly. A finishing pass improves caption contrast and keeps ambient opacity animation on the distant plane; it is not a measured performance benchmark.

The [v0.2.1 package and evidence](https://github.com/mehiel-victor/immerse-website/releases/tag/v0.2.1) contain the updated source, model tests, browser runners, frames and original-timing recording. The v0.2.0 fresh-generation result above remains historical: no new independent generation is claimed for the five-beat extension.

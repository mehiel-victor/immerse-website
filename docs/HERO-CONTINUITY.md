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

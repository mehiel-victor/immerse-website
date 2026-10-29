# Original examples and exploratory calibration

On 2026-10-29, the public art-direction guide regained eight original fictional scenarios, adaptation questions and observable failure conditions. No inspiration-site names or links are included. Extreme immersion, scroll triggers, continuous ambient motion and professional motion direction remain invocation defaults.

## Method

Two fresh-context agents received the same short request: use the skill to create a Portuguese local demonstration of Museu Órbita, a scientific-instrument exhibition, with three instruments, selection, history, return and visit planning, usable on desktop and phone. They received the same fonts and implementation constraints. External browsing, prior demo source and each other's output were excluded.

A used the earlier art-direction guide; B used the revised public guide. The other skill files were byte-identical. Each generated a working HTML/CSS/JS/SVG slice. Neither received the evaluation rubric or corrective coaching before its first result. This tests a constrained, self-contained invocation, not the skill's external research workflow.

## Browser observations

Chrome 156.0.8078.73; desktop 1280×800; mobile viewport/touch emulated at 390×844. Each initial output passed 16 checks: stationary ambient pixels, pause, resume, finite scroll-entry motion, reentry, keyboard selection/return for all three instruments, browser history, a local visit plan, direct detail access, mobile overflow, touch detail/return, reduced-motion stability, reduced-motion selection and runtime/resource errors.

Pause produced identical frames over 700 ms. Reduced motion produced identical frames over 900 ms with no running animations. Scroll entry produced finite CSS transitions after a wheel action stopped. These are behavioral observations, not aesthetic scores or a performance benchmark.

| Creative criterion | A | B |
| --- | --- | --- |
| Structural discovery | Opening instrument reorganizes into a three-piece scene on scroll entry | Opening followed by a conventional gallery; entry reveals alone do not establish equivalent structural immersion |
| Selection and continuity | Selected illustration moves into a split detail composition; return restores focus | Shared-element transition connects the selected illustration and detail; return restores focus |
| Authored composition | Coherent palette and original SVGs; collection title overlaps artwork and mobile detail artwork is small | Coherent palette and original SVGs; better mobile artwork scale, but gallery remains conventional |
| Motion direction | Distinct scene/text timings and ambient cycles; full professional finishing not certified | Distinct shared-element/text timings and ambient cycles; full professional finishing not certified |
| Extreme creative parity | Not established by this single prototype | Not established; passing mechanisms does not resolve the discovery gap |

## Directed correction, recorded separately

After seeing B, the user explicitly requested that the opening compass transition using ScrollTrigger. C is a directed refinement of B, **not another independent skill invocation**. Its original SVG now travels from opening to collection using locally served GSAP/ScrollTrigger 3.15.0, with scroll-linked progress and reversal. The existing section-entry triggers remain time-driven, and ambient loops remain independent. Reduced motion restores static artwork in both positions.

C passed the same 16 functional checks. Eight focused compass checks then verified element identity, intermediate size, destination alignment within 1 px, reverse return, rapid reversals without duplicate travellers, mobile overflow, reduced-motion static alternatives and runtime errors. A later trajectory/text-staging adjustment reran those eight affected checks. The local visit plan was also checked with a future Tuesday in all three variants. C's improvement must not be credited to an unassisted B invocation.

## Evidence and reproducibility

The [v0.1.1 release](https://github.com/mehiel-victor/immerse-website/releases/tag/v0.1.1) includes a calibration evidence archive: generated A/B outputs, directed C, browser runners, results, screenshots, normal-timing recordings and the predeclared protocol. Run the supplied pages and browser checks using the archive instructions. The earlier private skill snapshot is deliberately excluded. Generation is stochastic; replaying the supplied pages is not reproducing the original generation.

The first B runner attempt selected a hidden next-item link as well as a collection link, and failed to recognize an equivalent visit disclaimer. The runner was corrected to scope collection links and recognize the actual disclaimer; B was rerun without changing its application for those corrections. The initial harness diagnostics are retained and labeled.

## Conclusion and limits

The public skill retains the required mechanisms and has concrete original guidance again. This exploratory comparison **does not establish equal extreme immersion or professional animation quality**. It exposed a structural discovery gap that required explicit direction. More independent generations across domains, seeds/model settings and evaluators are needed to assess consistency; this is one sample per initial variant in one domain. No physical phone, other browser, comprehensive accessibility audit or performance equivalence was verified.

A later [v0.2.0 default and fresh invocation](HERO-CONTINUITY.md) adds spatial hero entry and shared-element ScrollTrigger continuity explicitly; the observations above describe v0.1.1.

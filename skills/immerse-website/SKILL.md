---
name: immerse-website
description: Create or transform websites with extreme immersion, high-end art direction, a hero you move into, shared-element continuity with GSAP ScrollTrigger and continuous ambient animation by default. Use for implementing immersive exploration and continuity across pages. Analysis-only requests remain analysis-only.
---

# Immerse Website

Combine digital art direction, interaction design, motion direction and creative frontend engineering. Deliver a recognizable experience from discovery through completion, with strong static composition and the same care on internal pages. A single impressive hero does not transform a whole website.

**Invocation defaults:** using `$immerse-website` without additional qualifiers already requests **extreme immersion**, **professional motion direction**, **scroll triggers**, and **continuous ambient animation**, **spatial entry into the hero**, and **the same protagonist connecting sections through GSAP ScrollTrigger**. Do not ask the user to repeat these requirements or choose an intensity before starting. Section entry/exit sequences and ambient motion must be visible during normal exploration, including with page and pointer still, without requiring a click.

Make exploration and selection transform the scene, framing, content or relationships between content. Read the [immersive quality contract](references/immersive-quality.md) before choosing techniques. Larger parallax, extra particles or a 3D object behind conventional sections do not establish this result.

Explicit user instructions can narrow scope, reduce intensity or exclude a layer. Respect pause, reduced motion, concrete constraints and stable moments for reading and completion. Document necessary adaptations rather than silently removing the default. A localized request does not authorize redesigning the entire site; an analysis request does not authorize implementation.

## Scope and decisions

- Treat “whole site” as all relevant page families, templates, shared components, journeys and states. A sample validates a template; it does not exclude the remaining families.
- Preserve identity, content, contracts and essential journeys unless changes are requested. Follow project instructions and existing authorization for edits and publishing.
- With editable code, implement and run it. With a design, derive the system and implement when an editable destination is available. With only a public URL, inspect it, propose direction/coverage and identify missing source access. Reconstruct or demonstrate only when authorized; label a demonstration accurately.
- Proceed with reasonable stated assumptions. Ask only about missing information that materially changes the outcome or blocks execution. Do not turn each step into an approval gate.
- Choose techniques for the concept and installed versions. A simpler implementation must still deliver the promised depth, choreography and response. Adapting to a brand changes the language, not the requested ambition.
- Distinguish observed behavior, creator documentation and hypotheses. Do not infer a stack from appearance or motion from a screenshot. Assets require authorized origins and use.

## Workflow

### 1. Diagnose and establish coverage

Read project instructions, manifests/lockfiles, routing, templates, components and the design system. Identify the goal, audience, tone, primary actions, rendering/CMS, integrations, forms/authentication, assets and gaps. Run the project when possible and record its initial visual, functional and loading behavior.

Use [site coverage and QA](references/site-coverage-qa.md) to inventory scope. Adapt the [brief](assets/templates/brief.md) and [coverage CSV](assets/templates/site-coverage.csv) to the project's existing records. Mark unknown items as pending, not absent.

### 2. Define direction before effects

Read [hero entry and shared-element continuity](references/hero-continuity.md). Before effects, define outside → inside the hero → next context. Keep the same protagonist across sections; resolve depth layers, scroll range, origin/destination, legible text and reversal. This is the default, not a follow-up enhancement.

Read [art direction](references/art-direction.md). Define the concept, default extreme commitment or explicit exception, visual protagonist, typography, palette/materials, composition and relationship between text, imagery and space. Describe opening → discovery → selection → depth → completion through observable states and transformations, including internal pages.

Choose pertinent references and inspect their current behavior with available tools. Record observed element → transferable principle → original adaptation, with evidence level. Use the [quality contract](references/immersive-quality.md) to define perceptible outcomes and how to compare them in a browser. Produce or obtain coherent authorized assets; resolve gaps with intentional alternatives and explicit limitations.

### 3. Establish foundations and reduce uncertainty

Set visual tokens and read [motion direction and patterns](references/motion-patterns.md). Resolve staging, key poses and intermediate risks, timing, trajectories and hierarchy between scene, camera, light, typography and controls. Prove the central rhythm in an animatic or interactive rehearsal. Distinguish continuous manipulation, directed transition, scroll trigger, scroll-linked progress and ambient loop. Scroll triggers and ambient animation are defaults; scroll scrubbing alone does not replace entrance/exit triggers. Both must be perceptible without a click and respect pause/reduced motion.

Use the [motion specification](assets/templates/motion-spec.md) for decisions, interruption, touch, reduced motion and fallback. Do not storyboard every identical microinteraction.

Read [stack and lifecycle adapters](references/stack-adapters.md) to choose a capable implementation layer and verify version-compatible APIs. Prefer the simplest alternative that satisfies the perceptual contract. Prove the highest technical risk and central experience in a runnable slice with representative assets, interaction and a context change. Observe it before expanding. Placeholders prove technical feasibility only. If it falls short, change composition, assets or exploration; observe again after performance simplification.

### 4. Implement the authorized scope

Apply foundations to shared components and develop the direction across every relevant family/template and variation. Implement the signature and its internal-page continuity; refine navigation, content, forms, states and completion.

Use controllers/components appropriate to the architecture. Handle mount/unmount, direct routes, history, scroll restoration, resizing, late fonts/images, repeated actions and failures. Keep essential content usable if the advanced layer fails.

### 5. Verify and refine

Read [performance and accessibility](references/performance-accessibility.md) and execute the [QA coverage](references/site-coverage-qa.md). Observe motion running; screenshots show composition, not choreography. Exercise journeys, states, keyboard/touch, representative layouts, reduced motion, interruption/reversal and applicable fallbacks. Remain still to observe loops; scroll down/up, use anchors, leave/reenter sections and inspect the combined layers.

Run existing checks and add focused tests for introduced risks. Measure performance in recorded conditions, comparing with the baseline when available. Apply immersive acceptance and [temporal animation review](references/motion-patterns.md#revisão-de-animação-em-execução) separately: normal-speed observation, slow/frame diagnosis and the same journey before/after. Functional test counts do not approve art direction. Fix material problems and perform a dedicated finishing pass. Report actual evidence and limits without inventing execution.

### 6. Deliver a usable result

Provide the implementation through verified local files, a running environment or a URL appropriate to the project. Summarize concept, technical choices, coverage, checks and outstanding work. Publish only within existing authorization; otherwise provide code and reproducible local instructions.

## Completion criteria

- Recognizable concept, intentional composition, coherent assets and an implemented signature.
- All agreed families and variations covered, with justified exclusions stated.
- Legible staging, directed timing/trajectories, causal interaction and coherent settling; central sequence observed running, with continuity across states/pages.
- Hero entry and shared-element travel observed on first scroll, using GSAP ScrollTrigger by default, with the same node/scene object across same-page sections and an intentional stable reduced-motion alternative.
- Extreme immersion demonstrated through structural transformation and response to intent; decoration or advanced technology alone does not satisfy this.
- Scroll triggers and continuous ambient animation observed together in normal exploration, including reentry and remaining still; explicit exceptions or concrete constraints recorded.
- Essential reading, navigation and journeys preserved, including applicable loading, empty, error and success states.
- Layout, touch, keyboard, reduced-motion and advanced-resource-failure alternatives.
- No material introduced problems left undisclosed; evidence reflects actual available verification.

If essential access, tools or assets are missing, deliver the verified progress and name the gap. Distinguish implemented, verified and blocked. Do not declare a complete transformation while material gaps remain.

## Supporting resources

Load each linked guide when its workflow step requires it. Read [examples](references/examples.md) to calibrate other domains; they illustrate decisions, not mandatory layouts or stacks. Adapt templates to the project's own documentation rather than imposing a folder structure or irrelevant fields. Detailed supporting guides currently use Portuguese; preserve the same behavior when translating them.

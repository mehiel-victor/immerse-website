<div align="center">

# Immerse Website

**Give your coding agent a motion director.**

Extreme immersion, scroll-triggered choreography, and continuous ambient motion — built into one reusable skill.

[![License: MIT](https://img.shields.io/badge/License-MIT-a8b98b.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/mehiel-victor/immerse-website?style=flat&color=a8b98b)](https://github.com/mehiel-victor/immerse-website/stargazers)

[Install](#install) · [See the example](#see-it-move) · [How it works](#what-it-changes) · [Contribute](CONTRIBUTING.md) · [Português](docs/README.pt-BR.md)

</div>

![Real browser capture: scrolling through a botanical installation, with movement continuing when scrolling stops.](https://github.com/mehiel-victor/immerse-website/releases/download/v0.1.0/atelie-brisa.gif)

## One short prompt

```text
Use $immerse-website on this project.
```

The default already includes **extreme immersion, professional motion direction, scroll triggers, and continuous ambient animation**. You provide the project and its goal. The agent develops a visual concept, implements it across the authorized scope, and verifies the experience in a browser when tools are available.

This is an **agent skill**, not an animation library or a website template. It guides decisions and implementation using the project's existing stack.

## Install

With the community [Skills CLI](https://github.com/vercel-labs/skills):

```sh
npx skills add mehiel-victor/immerse-website --skill immerse-website
```

For a global Codex installation:

```sh
npx skills add mehiel-victor/immerse-website --skill immerse-website -g -a codex
```

The package follows the Agent Skills format. Codex metadata is included; other compatible agents can load `skills/immerse-website/SKILL.md`. Cross-agent behavior depends on the host's tools and has not been exhaustively tested.

## What it changes

| Layer | Default behavior |
| --- | --- |
| Art direction | A concept, protagonist, typography, materials and composition that belong to the project. |
| Immersive exploration | Choices change the scene, framing or relationships between content. Internal pages develop the same idea. |
| Scroll triggers | Entering or reentering a section starts a directed sequence, with clear interruption behavior. |
| Scroll progress | When useful, scroll position controls a reversible transformation. This complements triggers. |
| Ambient animation | The environment stays alive with the page and pointer still, without requiring a click. |
| Interaction | Gestures and selections receive a causal response, with propagation and settling where appropriate. |
| Accessibility | Pause, reduced motion, keyboard/touch alternatives, readable content and complete fallbacks. |
| Verification | Real navigation and motion checks. Screenshots demonstrate composition; temporal evidence demonstrates movement. |

The skill chooses techniques to fit the concept: CSS, SVG, Web Animations, GSAP, Three.js or another justified layer. It does not require installing all of them. Your content, architecture, forms and business rules remain the constraints.

## See it move

**Ateliê Brisa** is an original, fictional botanical demonstration: six pages, a shared 3D garden, morning-to-dusk changes, scroll-directed flowering and a gesture-driven breeze.

- [Watch the full recording](https://github.com/mehiel-victor/immerse-website/releases/download/v0.1.0/atelie-brisa.mp4) — 27.44 seconds, original timing.
- [Run the example locally](examples/atelie-brisa/README.md) — static files; no application build required.
- [Read the verification scope](docs/VERIFICATION.md).

The GIF is an 18-second excerpt at original speed, reduced to 480 pixels wide and 6 fps for this README. The video was captured at 25 fps. Neither is a device-performance benchmark. The example illustrates one execution, not a prescribed style for every project.

## Use it on your own project

Open your site repository in your agent and invoke the skill. If context is missing, add the site goal and any assets or constraints:

```text
Use $immerse-website on this portfolio. The goal is qualified inquiries.
Preserve the project content and contact form. Use our own photography.
```

Explicit instructions can narrow the scope, reduce intensity or exclude a motion layer. A request to analyze a site remains an analysis request. A public URL alone does not grant access to change its source.

The skill includes a brief, a motion specification and a site-coverage matrix. Agents should adapt them to the project's existing documentation rather than generate unnecessary paperwork.

## Expectations

This skill directs a workflow; it cannot guarantee an award-winning result or fix weak assets automatically. Visual quality needs iteration. It asks the agent to report unverified behavior and concrete limitations instead of treating a green build as creative approval.

Prompts can be written in your preferred language. The skill entrypoint, public overview and contribution guide are in English. Detailed reference guides are currently in Portuguese. English translations that preserve the behavior are welcome.

## Help shape the next example

Share a site you built, a short recording, the agent/stack used, and what worked or failed in [Discussions](https://github.com/mehiel-victor/immerse-website/discussions). Useful reports include both successful results and misses.

Contributions are welcome: original examples, motion refinements, accessibility fixes and translations. See [CONTRIBUTING.md](CONTRIBUTING.md).

If the skill helps your work, **star the repository** so other builders can find it.

## License

[MIT](LICENSE). Vendored dependencies in the example retain their original licenses. See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

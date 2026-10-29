# Contributing

Help make immersive sites more intentional, usable and reproducible.

## Useful contributions

- A small original example with working navigation and a short recording.
- A concrete motion or accessibility failure, with reproducible steps.
- Better guidance supported by real execution in a project.
- Translations that preserve the default intensity, scope and verification rules.

Please avoid generic effect catalogs, copied reference-site assets, unverified quality claims, tracking additions and dependencies that are not necessary for a demonstrated interaction.

## Change the skill

The installable source is `skills/immerse-website/`. Keep the entrypoint concise and detailed guidance in linked references. Preserve the default combination of extreme immersion, scroll triggers and continuous ambient motion, while honoring explicit user instructions and accessibility preferences.

Use a focused branch and pull request. Explain the problem, the resulting decisions or behavior, and what you verified. For motion changes, include a short real-time recording plus reduced-motion behavior. For a skill-only wording change, explain the realistic request it improves; do not claim a browser test you did not run.

## Local checks

Python 3, Node.js and PyYAML are required for the repository validator:

```sh
python3 -m pip install 'PyYAML>=6,<7'
python3 scripts/validate.py
node examples/atelie-brisa/wind-field.test.mjs
```

Before changing a vendored dependency, preserve its license and explain why the change is needed. Never submit credentials, personal contact data or private development logs.

Use Discussions for showcasing results and broad ideas. Use Issues for concrete defects or proposals. Be respectful and constructive.

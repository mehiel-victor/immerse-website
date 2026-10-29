# Verification scope

The initial Ateliê Brisa demonstration was exercised in Chrome 156 on an Intel UHD Graphics desktop using ANGLE/OpenGL.

The development run recorded 62 scenarios: 42 navigation/layout/form/fallback scenarios, 10 gesture scenarios, 8 scroll/ambient/mobile-layout scenarios, and 2 pause/reduced-motion resume scenarios. These counts describe that run, not a standing certification of every future commit or a guarantee for sites generated with this skill.

Checks included real rendered pixels with no input, scroll reversal, section reentry, anchors, natural gesture settling, exact paused frames and deterministic reduced-motion views. Mobile touch and viewports were emulated. A later visual check placed controls outside the reading column in the recording viewport.

The recording is 27.44 seconds with original timing, captured at 25 fps from a 1006×579 viewport and encoded at 1006×578. The README GIF shows an 18-second excerpt at 480 pixels wide and 6 fps; no temporal acceleration is applied.

No physical phone, Safari/Firefox, comprehensive screen-reader audit or real bfcache restoration was verified. Software rendering was substantially slower; adaptive quality reduces resolution, diffuse-lighting cost and shadows. Do not interpret this recording as a performance promise.

Private development traces and machine-specific browser scripts are deliberately omitted. The repository includes reproducible structural checks and the pure wind-field test. CI verifies package structure, local documentation links, JavaScript syntax, deterministic page generation and the wind-field invariants. It does not certify visual quality or run the full historical browser suite.

For a new site, record its own runtime, viewports, actions, outcomes and limitations. A static screenshot supports composition; motion claims need execution or temporal evidence.

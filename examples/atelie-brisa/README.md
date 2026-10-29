# Ateliê Brisa — runnable example

An original, fictional botanical studio used to exercise the skill. Six static pages share a procedural Three.js garden. Scroll controls camera, daylight and flowering; section entry triggers a brief sequence; ambient movement continues when input stops. A separate explorer supports gestures, keyboard and touch alternatives.

## Run

From the repository root:

```sh
python3 -m http.server 8766 --bind 127.0.0.1 --directory examples/atelie-brisa
```

Open <http://127.0.0.1:8766/>. Scroll down and back up, then stop to observe the garden. Try the pause, light and flowering controls. **Criar uma brisa** opens direct manipulation. The example's interface is in Portuguese.

The contact form is a local simulation: nothing is sent or stored. Use fictional inputs. There is no backend.

## Edit and check

Run the generator from this directory:

```sh
node build.mjs
node wind-field.test.mjs
```

Browser-ready HTML files are committed. Fonts and Three.js are local. WebGL failure presents a static SVG alternative; reduced motion uses stable views. See [verification notes](../../docs/VERIFICATION.md) and [third-party licenses](../../THIRD_PARTY_NOTICES.md).

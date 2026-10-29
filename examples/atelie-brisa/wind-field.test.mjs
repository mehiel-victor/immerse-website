import assert from 'node:assert/strict';
import { createWindField } from './wind-field.js';

const roots = [{ x: 0, z: 0 }, { x: 5, z: 0 }, { x: 20, z: 0 }];
const field = createWindField(roots);
field.gust({ x: 0, z: 0 }, { x: 1, z: 0 }, 1);
for (let n = 0; n < 6; n++) field.step(1 / 60);
assert.ok(field.plants[0].x > .01, 'The touched region must respond promptly');
assert.equal(field.plants[1].x, 0, 'Distant plants must wait for propagation');
for (let n = 0; n < 18; n++) field.step(1 / 60);
assert.ok(field.plants[1].x > 0, 'The wave must reach the next plants');
assert.ok(Math.abs(field.plants[0].x) > Math.abs(field.plants[2].x), 'Response must attenuate with distance');
field.calm();
assert.ok(field.energy > 0, 'Calm must preserve the current pose, not teleport');
for (let n = 0; n < 600; n++) field.step(1 / 60);
assert.ok(field.energy < .001, 'The response must settle');

function sample(rate) {
  const instance = createWindField(roots);
  instance.gust({ x: 0, z: 0 }, { x: 1, z: .2 }, 1);
  for (let n = 0; n < rate * 2; n++) instance.step(1 / rate);
  return instance.plants.map(plant => [plant.x, plant.z]);
}
const slow = sample(4), fast = sample(60);
slow.forEach((p, i) => p.forEach((v, j) => assert.ok(Math.abs(v - fast[i][j]) < .01, 'Low frame rate must not stretch simulation time')));
for (let n = 0; n < 300; n++) {
  field.gust({ x: 0, z: 0 }, { x: 1, z: 1 }, 100);
  field.step(1 / 60);
  assert.ok(field.plants.every(p => Number.isFinite(p.x) && Math.hypot(p.x, p.z) <= .721), 'Repeated gestures must stay bounded');
}
field.clear();
field.gust({ x: NaN, z: 0 }, { x: 1, z: 0 }, 1);
field.step(.25);
assert.equal(field.energy, 0, 'Invalid input must not poison the simulation');
console.log('Wind field: propagation, attenuation, settling, time invariance and bounded repeated input passed.');

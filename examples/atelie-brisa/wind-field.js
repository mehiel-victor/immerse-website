/** Bounded spatial impulses with delayed propagation and damped plant response. */
export function createWindField(roots) {
  const plants = roots.map(root => ({ root, x: 0, z: 0, vx: 0, vz: 0 }));
  let pulses = [], time = 0, energy = 0;
  const limit = (value, min, max) => Math.max(min, Math.min(max, value));
  function gust(point, direction, strength) {
    if (![point.x, point.z, direction.x, direction.z, strength].every(Number.isFinite)) return;
    const length = Math.hypot(direction.x, direction.z);
    if (length < .0001 || strength <= 0) return;
    const pulse = { x: point.x, z: point.z, dx: direction.x / length, dz: direction.z / length, strength: limit(strength, 0, 1), start: time };
    // Input sampling frequency must not change how many impulses accumulate.
    if (pulses.length && time - pulses.at(-1).start < .045) pulses[pulses.length - 1] = pulse;
    else pulses.push(pulse);
    if (pulses.length > 8) pulses.shift();
  }
  function step(delta) {
    const dt = limit(delta, 0, .25), count = Math.min(32, Math.max(1, Math.ceil(dt / .008)));
    for (let i = 0; i < count; i++) {
      const h = dt / count; time += h;
      for (const plant of plants) {
        let fx = 0, fz = 0;
        for (const pulse of pulses) {
          const distance = Math.hypot(plant.root.x - pulse.x, plant.root.z - pulse.z);
          const age = time - pulse.start - distance * .026;
          if (age < 0 || age > .65) continue;
          const envelope = Math.sin(Math.min(1, age / .12) * Math.PI / 2) * Math.exp(-age * 6.5);
          const force = pulse.strength * Math.exp(-distance * distance / 28) * envelope * 29;
          fx += pulse.dx * force; fz += pulse.dz * force;
        }
        // The main stem has mass; tips receive separate, faster overlap in the shader.
        plant.vx += (fx - plant.x * 19 - plant.vx * 5.2) * h;
        plant.vz += (fz - plant.z * 19 - plant.vz * 5.2) * h;
        plant.x += plant.vx * h; plant.z += plant.vz * h;
        const magnitude = Math.hypot(plant.x, plant.z);
        if (magnitude > .72) { plant.x *= .72 / magnitude; plant.z *= .72 / magnitude; plant.vx *= .86; plant.vz *= .86; }
        if (!pulses.length && Math.abs(plant.x) + Math.abs(plant.z) + Math.abs(plant.vx) + Math.abs(plant.vz) < .0003) plant.x = plant.z = plant.vx = plant.vz = 0;
      }
      pulses = pulses.filter(pulse => time - pulse.start < 1.1);
    }
    energy = plants.reduce((max, plant) => Math.max(max, Math.hypot(plant.x, plant.z), Math.hypot(plant.vx, plant.vz) * .12), 0);
    return energy;
  }
  function clear() { pulses = []; energy = 0; for (const plant of plants) plant.x = plant.z = plant.vx = plant.vz = 0; }
  return { plants, gust, step, clear, calm() { pulses = []; }, get energy() { return energy; } };
}

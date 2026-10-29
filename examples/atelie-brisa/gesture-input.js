/** Pointer sampling stays separate from the garden's physical response. */
export function bindGestureSurface(surface, { signal, getMode, getOrbit, turnTo, gust, canMove, calm, onGesture }) {
  let drag = null;
  const point = (x, y) => ({ x: x / innerWidth * 2 - 1, y: 1 - y / innerHeight * 2 });
  function release(event) {
    if (!drag || (event?.pointerId !== undefined && event.pointerId !== drag.id)) return;
    const id = drag.id;
    drag = null;
    surface.classList.remove('dragging');
    if (surface.hasPointerCapture(id)) surface.releasePointerCapture(id);
    onGesture('release');
  }
  surface.addEventListener('pointerdown', event => {
    if (drag || event.button !== 0 || (getMode() === 'wind' && !canMove())) return;
    drag = { id: event.pointerId, startX: event.clientX, x: event.clientX, y: event.clientY, t: event.timeStamp, orbit: getOrbit() };
    surface.setPointerCapture(event.pointerId);
    surface.classList.add('dragging');
    onGesture('start');
  }, { signal });
  surface.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    if (getMode() === 'orbit') {
      turnTo(drag.orbit + (event.clientX - drag.startX) / innerWidth * Math.PI * 2);
      return;
    }
    if (!canMove()) { release(); return; }
    const dt = Math.max(8, event.timeStamp - drag.t);
    if (dt < 30) return;
    const dx = event.clientX - drag.x, dy = drag.y - event.clientY;
    const length = Math.hypot(dx, dy);
    if (length > 1) gust({ ...point(event.clientX, event.clientY), dx: dx / length, dy: dy / length, strength: Math.min(1, .18 + length / dt / 1.8) });
    drag.x = event.clientX; drag.y = event.clientY; drag.t = event.timeStamp;
  }, { signal });
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) surface.addEventListener(name, release, { signal });
  window.addEventListener('blur', release, { signal });
  surface.addEventListener('keydown', event => {
    const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] };
    if (event.key === 'Home') { event.preventDefault(); getMode() === 'wind' ? calm() : turnTo(0); return; }
    if (getMode() === 'orbit') {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); turnTo(getOrbit() + (event.key === 'ArrowLeft' ? -.35 : .35)); }
      return;
    }
    if (!arrows[event.key] && ![' ', 'Enter'].includes(event.key)) return;
    event.preventDefault();
    if (!canMove()) return;
    const [dx, dy] = arrows[event.key] || [1, .2];
    gust({ x: 0, y: -.1, dx, dy, strength: .85 });
    onGesture('keyboard');
  }, { signal });
  return release;
}

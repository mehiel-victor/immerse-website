const clamp = value => Math.min(1, Math.max(0, value));
const smooth = value => value * value * (3 - 2 * value);
const poses = [
  { light: 0, bloom: 0 },
  { light: .18, bloom: .05 },
  { light: 1, bloom: .3 },
  { light: .18, bloom: 1 }
];

// Shared progress makes camera, daylight and flowering reversible as one journey.
export function journeyState(progress) {
  const position = Math.min(3, Math.max(0, progress));
  const index = Math.min(2, Math.floor(position));
  const phase = smooth(clamp((position - index - .12) / .76));
  const from = poses[index], to = poses[index + 1];
  return {
    light: from.light + (to.light - from.light) * phase,
    bloom: from.bloom + (to.bloom - from.bloom) * phase
  };
}

// Entrance events are independent from scroll scrubbing: entering starts a brief
// sequence, while scrolling still directly controls the spatial journey.
export function bindScrollEntrances({ reduced, isPaused, animate }) {
  if (!('IntersectionObserver' in window)) return () => {};
  const running = new Map();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const section = entry.target;
      if (!entry.isIntersecting) {
        section.dataset.scrollActive = 'false';
        for (const animation of running.get(section) || []) animation.cancel();
        running.delete(section);
        continue;
      }
      if (section.dataset.scrollActive === 'true') continue;
      section.dataset.scrollActive = 'true';
      section.dataset.scrollEntries = String(Number(section.dataset.scrollEntries || 0) + 1);
      if (reduced.matches || isPaused()) continue;
      const elements = [...section.querySelectorAll('.chapter-copy > *')];
      running.set(section, elements.map((element, index) => animate(element,
        [{ opacity: .25, transform: `translateY(${index === 1 ? 38 : 20}px)`, clipPath: 'inset(0 0 12% 0)' },
          { opacity: 1, transform: 'none', clipPath: 'inset(0)' }],
        { duration: index === 1 ? 1050 : 750, delay: index * 65 }
      )).filter(Boolean));
    }
  }, { rootMargin: '-16% 0px -16% 0px', threshold: .12 });
  document.querySelectorAll('.journey-section').forEach(section => observer.observe(section));
  return () => {
    observer.disconnect();
    for (const animations of running.values()) for (const animation of animations) animation.cancel();
    running.clear();
  };
}

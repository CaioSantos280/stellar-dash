let lastTime = 0;

export function playHoverSound() {
  const now = Date.now();

  // debounce leve (evita spam, mas não quebra UI)
  if (now - lastTime < 60) return;
  lastTime = now;

  const audio = new Audio("/hover.mp3");
  audio.volume = 0.05;

  audio.play().catch(() => {});
}
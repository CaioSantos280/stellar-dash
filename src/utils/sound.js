let isPlaying = false;

export function playHoverSound() {
  if (isPlaying) return;

  isPlaying = true;

  const audio = new Audio("/hover.mp3");
  audio.volume = 0.05;

  audio.play().finally(() => {
    setTimeout(() => {
      isPlaying = false;
    }, 80);
  });
}
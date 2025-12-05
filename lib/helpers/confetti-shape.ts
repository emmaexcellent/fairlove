import confetti from "canvas-confetti"; // npm i canvas-confetti

export const triggerEmojiConfetti = (emoji: string) => {
  if (typeof window === "undefined") return;

  const anyConfetti = confetti as any;

  // Fallback: if shapeFromText isn't available for some reason, just fire normal confetti
  if (!anyConfetti.shapeFromText) {
    confetti({
      particleCount: 80,
      spread: 65,
      origin: { y: 1 },
      scalar: 1.4,
    });
    return;
  }

  const scalar = 2;

  // Create a custom shape from the emoji text
  const emojiShape = anyConfetti.shapeFromText({
    text: emoji,
    scalar, // match scalar here and in options to keep it crisp
  });

  confetti({
    particleCount: 90,
    spread: 100,
    origin: { y: 1 }, // explode from bottom
    scalar,
    shapes: [emojiShape], // use only this emoji as particle
    gravity: 1.1,
    ticks: 200,
  });
};

import { Direction, Target, Instruction } from "../types";
import { DIRECTIONS, TARGETS } from "../config/instructions";

export const generateInstruction = (): Instruction => {
  const direction =
    DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)].value;
  const target = TARGETS[Math.floor(Math.random() * TARGETS.length)].value;

  return {
    id: crypto.randomUUID(),
    direction,
    target,
    timestamp: Date.now(),
  };
};

export const formatInstruction = (
  instruction: Instruction,
  part?: "direction" | "target"
): string => {
  const direction = DIRECTIONS.find((d) => d.value === instruction.direction);
  const target = TARGETS.find((t) => t.value === instruction.target);

  if (!direction || !target) return "";

  if (part === "direction") {
    return `${direction.label} ${direction.symbol}`;
  }

  if (part === "target") {
    return target.label;
  }

  return `${direction.label} ${direction.symbol} ${target.label}`;
};

export const speakInstruction = (instruction: Instruction) => {
  const direction = DIRECTIONS.find((d) => d.value === instruction.direction);
  const target = TARGETS.find((t) => t.value === instruction.target);

  if (!direction || !target) return;

  const utterance = new SpeechSynthesisUtterance();
  utterance.text = `${direction.label}`;
  utterance.lang = "fr-FR";

  utterance.onend = () => {
    setTimeout(() => {
      const targetUtterance = new SpeechSynthesisUtterance();
      targetUtterance.text = `${target.label}`;
      targetUtterance.lang = "fr-FR";
      speechSynthesis.speak(targetUtterance);
    }, 1000);
  };

  speechSynthesis.speak(utterance);
};

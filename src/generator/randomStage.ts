import {
  BOTTLE_COUNT,
  CAPACITY,
  COLOR_COPIES,
  COLOR_SET,
  type Color,
  type GameState,
} from "../core/types.js";

export interface StageConfig {
  readonly capacity?: number;
  readonly bottleCount?: number;
  readonly colors?: readonly Color[];
  readonly colorCopies?: number;
}

function shuffle<T>(items: T[]): T[] {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const current = array[i]!;
    array[i] = array[j]!;
    array[j] = current;
  }
  return array;
}

function isSingleColorBottle(bottle: Color[]): boolean {
  return bottle.length > 0 && bottle.every((color) => color === bottle[0]);
}

export function generateRandomStage(config: StageConfig = {}): GameState {
  const capacity = config.capacity ?? CAPACITY;
  const bottleCount = config.bottleCount ?? BOTTLE_COUNT;
  const colorCopies = config.colorCopies ?? COLOR_COPIES;
  const colors = [...(config.colors ?? COLOR_SET)];
  const effectiveColors = colors.slice(0, 4);
  const filledBottleCount = effectiveColors.length * colorCopies;

  if (colorCopies <= 0) {
    throw new Error("Color copies must be greater than zero.");
  }

  if (bottleCount < filledBottleCount) {
    throw new Error("Bottle count is too small for the requested liquid amount.");
  }

  let shuffled: Color[] = [];
  let attempts = 0;
  do {
    const units = effectiveColors.flatMap((color) =>
      Array.from({ length: capacity * colorCopies }, () => color),
    );
    shuffled = shuffle(units);
    attempts += 1;
  } while (
    attempts < 20 &&
    Array.from({ length: filledBottleCount }, (_, index) =>
      shuffled.slice(index * capacity, (index + 1) * capacity),
    ).every(isSingleColorBottle)
  );

  const bottles: Color[][] = Array.from({ length: bottleCount }, () => []);
  for (let bottleIndex = 0; bottleIndex < filledBottleCount; bottleIndex += 1) {
    bottles[bottleIndex] = shuffled.slice(bottleIndex * capacity, (bottleIndex + 1) * capacity);
  }

  return {
    capacity,
    bottles,
  };
}

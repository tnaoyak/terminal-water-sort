import type { Bottle, GameState } from "./types.js";

function isUniformBottle(bottle: Bottle): boolean {
  if (bottle.length <= 1) {
    return true;
  }

  return bottle.every((color) => color === bottle[0]);
}

export function isSolvedBottle(state: GameState, bottle: Bottle): boolean {
  if (bottle.length === 0) {
    return true;
  }

  return bottle.length === state.capacity && isUniformBottle(bottle);
}

export function isWin(state: GameState): boolean {
  return state.bottles.every((bottle) => isSolvedBottle(state, bottle));
}

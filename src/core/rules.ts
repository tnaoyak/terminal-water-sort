import type { Bottle, Color, GameState } from "./types.js";

export interface Move {
  readonly from: number;
  readonly to: number;
}

export interface MoveValidation {
  readonly ok: boolean;
  readonly reason?: string;
  readonly amount?: number;
}

function topColor(bottle: Bottle): Color | undefined {
  return bottle.at(-1);
}

function countContiguousTopColor(bottle: Bottle): number {
  const top = topColor(bottle);
  if (!top) {
    return 0;
  }

  let count = 0;
  for (let i = bottle.length - 1; i >= 0; i -= 1) {
    if (bottle[i] !== top) {
      break;
    }
    count += 1;
  }

  return count;
}

export function validateMove(state: GameState, move: Move): MoveValidation {
  const { from, to } = move;
  if (from === to) {
    return { ok: false, reason: "移動元と移動先が同じです。" };
  }

  if (
    from < 0 ||
    to < 0 ||
    from >= state.bottles.length ||
    to >= state.bottles.length
  ) {
    return { ok: false, reason: "ボトル番号が範囲外です。" };
  }

  const fromBottle = state.bottles[from]!;
  const toBottle = state.bottles[to]!;

  if (fromBottle.length === 0) {
    return { ok: false, reason: "移動元ボトルが空です。" };
  }

  const freeSlots = state.capacity - toBottle.length;
  if (freeSlots <= 0) {
    return { ok: false, reason: "移動先ボトルに空きがありません。" };
  }

  const sourceTop = topColor(fromBottle);
  const destinationTop = topColor(toBottle);
  if (destinationTop && destinationTop !== sourceTop) {
    return { ok: false, reason: "移動先の最上層が異なる色です。" };
  }

  const amount = Math.min(countContiguousTopColor(fromBottle), freeSlots);
  if (amount <= 0) {
    return { ok: false, reason: "注ぎ替え可能な層がありません。" };
  }

  return { ok: true, amount };
}

export function applyMove(state: GameState, move: Move): MoveValidation {
  const validation = validateMove(state, move);
  if (!validation.ok || !validation.amount) {
    return validation;
  }

  const source = state.bottles[move.from]!;
  const destination = state.bottles[move.to]!;
  const movedColor = source[source.length - 1]!;

  for (let i = 0; i < validation.amount; i += 1) {
    source.pop();
    destination.push(movedColor);
  }

  return validation;
}

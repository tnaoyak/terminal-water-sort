export const CAPACITY = 4;
export const COLOR_SET = ["R", "G", "B", "Y"] as const;
export const BOTTLE_COUNT = 10;

export type Color = (typeof COLOR_SET)[number];
export type Bottle = Color[];

export interface GameState {
  readonly capacity: number;
  readonly bottles: Bottle[];
}

export function cloneState(state: GameState): GameState {
  return {
    capacity: state.capacity,
    bottles: state.bottles.map((bottle) => [...bottle]),
  };
}

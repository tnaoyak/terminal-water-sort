import { describe, expect, it } from "vitest";
import { applyMove, validateMove } from "./rules.js";
import type { GameState } from "./types.js";

describe("rules", () => {
  it("同色連続層をまとめて移動する", () => {
    const state: GameState = {
      capacity: 4,
      bottles: [["R", "R", "G", "G"], ["G"], [], [], [], [], [], [], [], []],
    };

    const result = applyMove(state, { from: 0, to: 1 });

    expect(result.ok).toBe(true);
    expect(result.amount).toBe(2);
    expect(state.bottles[0]).toEqual(["R", "R"]);
    expect(state.bottles[1]).toEqual(["G", "G", "G"]);
  });

  it("移動先の最上層が異色なら拒否する", () => {
    const state: GameState = {
      capacity: 4,
      bottles: [["R"], ["G"], [], [], [], [], [], [], [], []],
    };

    const result = validateMove(state, { from: 0, to: 1 });

    expect(result.ok).toBe(false);
    expect(result.reason).toContain("異なる色");
  });

  it("移動先の空き容量までしか移動しない", () => {
    const state: GameState = {
      capacity: 4,
      bottles: [["R", "R", "R"], ["R", "R", "R"], [], [], [], [], [], [], [], []],
    };

    const result = applyMove(state, { from: 0, to: 1 });

    expect(result.ok).toBe(true);
    expect(result.amount).toBe(1);
    expect(state.bottles[0]).toEqual(["R", "R"]);
    expect(state.bottles[1]).toEqual(["R", "R", "R", "R"]);
  });
});

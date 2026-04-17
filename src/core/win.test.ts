import { describe, expect, it } from "vitest";
import { isWin } from "./win.js";
import type { GameState } from "./types.js";

describe("win", () => {
  it("空または単色満杯ならクリア", () => {
    const state: GameState = {
      capacity: 4,
      bottles: [
        ["R", "R", "R", "R"],
        ["G", "G", "G", "G"],
        ["B", "B", "B", "B"],
        ["Y", "Y", "Y", "Y"],
        [],
        [],
        [],
        [],
        [],
        [],
      ],
    };

    expect(isWin(state)).toBe(true);
  });

  it("混色ボトルがあれば未クリア", () => {
    const state: GameState = {
      capacity: 4,
      bottles: [["R", "R", "R", "G"], [], [], [], [], [], [], [], [], []],
    };

    expect(isWin(state)).toBe(false);
  });
});

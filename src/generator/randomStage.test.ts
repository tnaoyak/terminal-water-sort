import { describe, expect, it } from "vitest";
import { generateRandomStage } from "./randomStage.js";

describe("generateRandomStage", () => {
  it("要件通りの初期盤面サイズを生成する", () => {
    const stage = generateRandomStage();

    expect(stage.capacity).toBe(4);
    expect(stage.bottles.length).toBe(10);
  });

  it("各色が2本分含まれ、容量超過がない", () => {
    const stage = generateRandomStage();
    const all = stage.bottles.flat();

    const counts = all.reduce<Record<string, number>>((acc, color) => {
      acc[color] = (acc[color] ?? 0) + 1;
      return acc;
    }, {});

    expect(counts.R).toBe(8);
    expect(counts.G).toBe(8);
    expect(counts.B).toBe(8);
    expect(counts.Y).toBe(8);
    expect(stage.bottles.every((bottle) => bottle.length <= stage.capacity)).toBe(true);
  });

  it("開始時に8本が満杯で、2本が空になる", () => {
    const stage = generateRandomStage();
    const filled = stage.bottles.filter((bottle) => bottle.length === stage.capacity).length;
    const empty = stage.bottles.filter((bottle) => bottle.length === 0).length;

    expect(filled).toBe(8);
    expect(empty).toBe(2);
  });
});

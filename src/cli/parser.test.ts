import { describe, expect, it } from "vitest";
import { parseCommand } from "./parser.js";

describe("parseCommand", () => {
  it("移動コマンドを0始まりインデックスに変換する", () => {
    const result = parseCommand("1 10");

    expect(result).toEqual({ type: "move", from: 0, to: 9 });
  });

  it("ショートカットコマンドを解釈する", () => {
    expect(parseCommand("q")).toEqual({ type: "quit" });
    expect(parseCommand("r")).toEqual({ type: "restart" });
    expect(parseCommand("n")).toEqual({ type: "new" });
    expect(parseCommand("help")).toEqual({ type: "help" });
  });

  it("不正入力はinvalidを返す", () => {
    const result = parseCommand("12");

    expect(result.type).toBe("invalid");
  });
});

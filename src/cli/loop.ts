import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { applyMove } from "../core/rules.js";
import { cloneState, type GameState } from "../core/types.js";
import { isWin } from "../core/win.js";
import { generateRandomStage } from "../generator/randomStage.js";
import { parseCommand } from "./parser.js";
import { renderBoard } from "./renderer.js";

function helpText(): string {
  return [
    "",
    "Commands",
    "  <from> <to> : 例 1 2",
    "  r           : 現在盤面をリスタート",
    "  n           : 新しいランダム盤面を開始",
    "  help        : ヘルプ表示",
    "  q           : 終了",
    "",
  ].join("\n");
}

export async function runGame(): Promise<void> {
  const rl = createInterface({ input, output });
  let state: GameState = generateRandomStage();
  let initialState: GameState = cloneState(state);
  let message = "開始します。'help' でコマンドを表示できます。";

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      output.write(`${renderBoard(state)}\n`);
      if (message.length > 0) {
        output.write(`${message}\n\n`);
      }
      message = "";

      const answer = await rl.question("> ");
      const parsed = parseCommand(answer);

      if (parsed.type === "quit") {
        output.write("終了します。\n");
        break;
      }

      if (parsed.type === "help") {
        message = helpText();
        continue;
      }

      if (parsed.type === "restart") {
        state = cloneState(initialState);
        message = "現在の盤面をリスタートしました。";
        continue;
      }

      if (parsed.type === "new") {
        state = generateRandomStage();
        initialState = cloneState(state);
        message = "新しいランダム盤面を生成しました。";
        continue;
      }

      if (parsed.type === "invalid") {
        message = parsed.reason;
        continue;
      }

      const result = applyMove(state, { from: parsed.from, to: parsed.to });
      if (!result.ok) {
        message = result.reason ?? "その操作はできません。";
        continue;
      }

      message = `${parsed.from + 1} -> ${parsed.to + 1} に ${result.amount} 層を移動しました。`;

      if (isWin(state)) {
        output.write(`${renderBoard(state)}\n`);
        output.write("クリアです。おめでとうございます。\n");
        break;
      }
    }
  } finally {
    rl.close();
  }
}

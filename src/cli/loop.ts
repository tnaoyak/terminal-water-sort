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
    "  <from> <to> : move liquid (example: 1 2)",
    "  r           : restart current round",
    "  n           : start a new random round",
    "  help        : show this help",
    "  q           : quit game",
    "",
  ].join("\n");
}

export async function runGame(): Promise<void> {
  const rl = createInterface({ input, output });
  let state: GameState = generateRandomStage();
  let initialState: GameState = cloneState(state);
  let message = "Game started. Type 'help' for commands.";
  let isRoundCleared = false;

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
        output.write("Goodbye.\n");
        break;
      }

      if (parsed.type === "help") {
        message = helpText();
        continue;
      }

      if (isRoundCleared) {
        if (parsed.type === "new") {
          state = generateRandomStage();
          initialState = cloneState(state);
          isRoundCleared = false;
          message = "New round started.";
          continue;
        }

        message = "Round cleared. Press 'n' for next round or 'q' to quit.";
        continue;
      }

      if (parsed.type === "restart") {
        state = cloneState(initialState);
        message = "Round restarted.";
        continue;
      }

      if (parsed.type === "new") {
        state = generateRandomStage();
        initialState = cloneState(state);
        message = "New round started.";
        continue;
      }

      if (parsed.type === "invalid") {
        message = parsed.reason;
        continue;
      }

      const result = applyMove(state, { from: parsed.from, to: parsed.to });
      if (!result.ok) {
        message = result.reason ?? "That move is not allowed.";
        continue;
      }

      message = `Moved ${result.amount} layer(s): ${parsed.from + 1} -> ${parsed.to + 1}.`;

      if (isWin(state)) {
        isRoundCleared = true;
        message = "Cleared! Press 'n' for next round or 'q' to quit.";
      }
    }
  } finally {
    rl.close();
  }
}

import type { Bottle, Color, GameState } from "../core/types.js";

const ANSI_BG: Record<Color, string> = {
  R: "\u001b[41m",
  G: "\u001b[42m",
  B: "\u001b[44m",
  Y: "\u001b[43m",
};

const ANSI_RESET = "\u001b[0m";

function supportsAnsiColor(): boolean {
  if (process.env.NO_COLOR) {
    return false;
  }
  return Boolean(process.stdout.isTTY);
}

function renderCell(color: Color | undefined, useAnsi: boolean): string {
  if (!color) {
    return "  ";
  }

  if (!useAnsi) {
    return `${color} `;
  }

  return `${ANSI_BG[color]}  ${ANSI_RESET}`;
}

function renderBottleRow(bottle: Bottle, level: number, useAnsi: boolean): string {
  const color = bottle[level];
  return `│${renderCell(color, useAnsi)}│`;
}

function renderBottleBase(): string {
  return "└──┘";
}

function renderBottleLabel(index: number): string {
  return ` ${String(index + 1).padStart(2, " ")} `;
}

function renderLegend(useAnsi: boolean): string {
  if (!useAnsi) {
    return "Legend: R=Red G=Green B=Blue Y=Yellow";
  }

  return `Legend: ${renderCell("R", true)} R  ${renderCell("G", true)} G  ${renderCell("B", true)} B  ${renderCell("Y", true)} Y`;
}

export function renderBoard(state: GameState): string {
  const useAnsi = supportsAnsiColor();
  const lines: string[] = [];

  lines.push("");
  lines.push("Terminal Water Sort");
  lines.push(renderLegend(useAnsi));
  lines.push("");

  for (let level = state.capacity - 1; level >= 0; level -= 1) {
    const row = state.bottles.map((bottle) => renderBottleRow(bottle, level, useAnsi)).join(" ");
    lines.push(row);
  }

  lines.push(state.bottles.map(() => renderBottleBase()).join(" "));
  lines.push(state.bottles.map((_, index) => renderBottleLabel(index)).join(" "));
  lines.push("");
  lines.push("Command: <from> <to> | r (restart) | n (new) | help | q");
  return lines.join("\n");
}

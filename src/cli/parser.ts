export type ParsedCommand =
  | { readonly type: "move"; readonly from: number; readonly to: number }
  | { readonly type: "restart" }
  | { readonly type: "new" }
  | { readonly type: "help" }
  | { readonly type: "quit" }
  | { readonly type: "invalid"; readonly reason: string };

export function parseCommand(input: string): ParsedCommand {
  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return {
      type: "invalid",
      reason: "入力が空です。例: 1 2",
    };
  }

  switch (trimmed.toLowerCase()) {
    case "q":
    case "quit":
    case "exit":
      return { type: "quit" };
    case "r":
    case "restart":
      return { type: "restart" };
    case "n":
    case "new":
      return { type: "new" };
    case "h":
    case "help":
      return { type: "help" };
    default:
      break;
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length !== 2) {
    return {
      type: "invalid",
      reason: "入力形式が不正です。例: 1 2",
    };
  }

  const fromText = parts[0]!;
  const toText = parts[1]!;
  if (!/^\d+$/.test(fromText) || !/^\d+$/.test(toText)) {
    return {
      type: "invalid",
      reason: "ボトル番号は正の整数で指定してください。例: 1 2",
    };
  }

  const from = Number(fromText);
  const to = Number(toText);
  if (from <= 0 || to <= 0) {
    return {
      type: "invalid",
      reason: "ボトル番号は1以上で指定してください。例: 1 2",
    };
  }

  return { type: "move", from: from - 1, to: to - 1 };
}

#!/usr/bin/env node

import { runGame } from "./cli/loop.js";

void runGame().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`エラーが発生しました: ${message}`);
  process.exitCode = 1;
});

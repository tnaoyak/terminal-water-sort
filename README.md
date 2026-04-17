# Terminal Water Sort

Terminal Water Sort is a command-line water sort puzzle game.

[日本語版はこちら](./README.ja.md)

## Screenshot
![Terminal Water Sort gameplay](https://raw.githubusercontent.com/tnaoyak/terminal-water-sort/main/assets/gameplay-screenshot.png)

## Features
- Vertical bottle rendering with Unicode lines
- ANSI color display with fallback text symbols
- Simple move input in `<from> <to>` format (example: `1 2`)
- Random rounds with 10 bottles (8 filled, 2 empty at start)
- Continue playing after clear (`n` for next round, `q` to quit)

## Requirements
- Node.js 20+

## Quick Start

### Run instantly (recommended)
```bash
npx terminal-water-sort
```

### Install as a command
```bash
npm install -g terminal-water-sort
terminal-water-sort
```

## How to play
- Goal: every bottle must be either empty or full with one color only
- Move input: `1 2` means pour from bottle 1 to bottle 2
- A move is valid when:
  - source bottle is not empty
  - destination bottle has free space
  - destination is empty, or top colors match
- Continuous top layers of the same color move together as much as possible
- After clear, the game stays open (`n` for next round, `q` to quit)

## Commands
- `1 2` pour from bottle 1 to bottle 2
- `r` restart current round
- `n` start a new random round
- `help` show command list
- `q` quit game

## License
MIT License. See `LICENSE`.

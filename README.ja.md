# Terminal Water Sort

Terminal Water Sort は、ターミナル上で遊べるウォーターソート系パズルゲームです。

[English version](./README.md)

## スクリーンショット
![Terminal Water Sort gameplay](https://raw.githubusercontent.com/tnaoyak/terminal-water-sort/main/assets/gameplay-screenshot.png)

## 主な機能
- 縦向きボトル表示（Unicode罫線）
- ANSIカラー表示（非対応環境では記号表示にフォールバック）
- `1 2` 形式のシンプルな操作入力
- ランダムステージ生成（ボトル10本、開始時は8本埋まり＋2本空）
- クリア後も継続可能（`n` で次ラウンド、`q` で終了）

## 動作環境
- Node.js 20 以上

## クイックスタート

### 今すぐ実行（推奨）
```bash
npx terminal-water-sort
```

### コマンドとしてインストール
```bash
npm install -g terminal-water-sort
terminal-water-sort
```

## 遊び方
- 目的: すべてのボトルを「空」または「単色で満杯」にそろえる
- 移動入力: `1 2` は「1番ボトルから2番ボトルへ注ぐ」
- 注ぎ替え可能条件:
  - 移動元が空でない
  - 移動先に空きがある
  - 移動先が空、または移動先最上層と移動元最上層の色が同じ
- 最上層に連続する同色は、可能な範囲でまとめて移動する
- クリア後はゲーム終了せず、`n` で次ラウンドへ進める

## コマンド
- `1 2` 1番から2番へ注ぐ
- `r` 現在ラウンドをリスタート
- `n` 新しいランダムラウンドを開始
- `help` コマンド一覧を表示
- `q` ゲームを終了

## ライセンス
MIT License。詳細は `LICENSE` を参照してください。

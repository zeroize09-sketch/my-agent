# AI 大腦遷移手冊

> 這份文件是 pro-kit 07 生成，記錄你的 AI 分身架構。
> 未來換新電腦、換新 AI 時，照這份走就能一鍵接管。

## 當前架構

- 母體資料夾：`~/Library/Mobile Documents/com~apple~CloudDocs/my-agent`
- 同步管道：iCloud
- GitHub repo：https://github.com/zeroize09-sketch/my-agent（私有）
- 體檢腳本：`000_Agent/scripts/sync-health.sh`
- 檢查頻率：每週一次（週五複盤日）

## 情境 1：換一台新 Mac

1. 新電腦登入同一個 Apple ID，等 iCloud 同步完成
2. 開終端機跑以下指令建立 symlink：
   ```bash
   MOTHER="$HOME/Library/Mobile Documents/com~apple~CloudDocs/my-agent"
   for item in settings.json CLAUDE.md hooks commands agents skills; do
     SRC="$MOTHER/.claude/$item"
     DST="$HOME/.claude/$item"
     [ -e "$SRC" ] && ln -sf "$SRC" "$DST" && echo "✅ $item" || echo "— $item 不存在，跳過"
   done
   ```
3. 跑體檢腳本驗證：
   ```bash
   bash "$HOME/Library/Mobile Documents/com~apple~CloudDocs/my-agent/000_Agent/scripts/sync-health.sh"
   ```
4. 重新登入 Claude Code：`claude auth login`

## 情境 2：換新 AI 大腦（Codex / Gemini / 未來新產品）

確認新 AI 的規則檔命名慣例，再多加一條 symlink：

```bash
MOTHER="$HOME/Library/Mobile Documents/com~apple~CloudDocs/my-agent"
# Codex 讀 AGENTS.md：
ln -s "$MOTHER/CLAUDE.md" "$MOTHER/AGENTS.md"
# Cursor 讀 .cursorrules：
ln -s "$MOTHER/CLAUDE.md" "$MOTHER/.cursorrules"
```

## 情境 3：備份還原

如果操作出錯，從備份還原：

```bash
rm -rf ~/.claude
mv ~/claude-backup-YYYYMMDD-HHMMSS ~/.claude
```

然後重新規劃再跑一次 pro-kit 07。

## 情境 4：更新 GitHub（日常使用）

```bash
cd "$HOME/Library/Mobile Documents/com~apple~CloudDocs/my-agent"
git add -A
git commit -m "update: $(date +%Y-%m-%d) 定期備份"
git push
```

---
name: cards
description: "ZOXE 社群圖卡產生器 — 輸入主題與內容，自動生成 IG/Threads 用的品牌圖卡（1080×1350 PNG）。輸入 /cards + 主題即可啟動。"
---

# ZOXE 社群圖卡產生器（/cards）

把文字內容轉成符合 ZOXE 品牌視覺的社群圖卡，直接輸出可發佈的 PNG 圖片。

---

## 使用方式

- `/cards 標題` — 快速啟動，AI 引導選卡片類型與填內容
- `/cards` — 不帶主題，AI 先問主題

---

## 卡片類型

| 類型 | 模板檔 | 適用場景 |
|:--|:--|:--|
| **cover** | `assets/zoxe/cover.html` | 系列第一張、話題封面、吸睛標題 |
| **content-text** | `assets/zoxe/content-text.html` | 條列重點、知識型內文（1–5 點）|
| **cta** | `assets/zoxe/cta.html` | 結尾行動呼籲、服務推廣、留言引導 |

---

## 執行流程

### Step 1：確認內容

用 **AskUserQuestion** 問類型（cover / content-text / cta），或根據主題自動判斷。

收集對應欄位：

**cover**
- `TITLE`：主標題（建議 6–16 字）
- `SUBTITLE`：副標題（選填，建議 10–20 字）
- `TAG`：標籤文字（選填，例如「室內設計必看」）

**content-text**
- `TITLE`：標題
- `POINTS`：重點條列（2–5 點，每點 20 字以內）
- `FOOTER`：底部備註（選填，例如「by ZOXE 零式設計」）

**cta**
- `TITLE`：主標題
- `CTA_TEXT`：呼籲行動文字（例如「立即諮詢免費方案」）
- `HANDLE`：帳號（預設 `@zoxe.design`）

### Step 2：生成 HTML

1. 讀取對應模板：`000_Agent/skills/cards/assets/zoxe/[type].html`
2. 用內容取代 `{{PLACEHOLDER}}` 佔位符
3. 儲存為暫存檔：`/tmp/card-preview.html`

### Step 3：截圖輸出

執行截圖腳本：
```bash
export PATH="/Users/zeroizexe/.nvm/versions/node/v24.15.0/bin:$PATH"
node "000_Agent/skills/cards/scripts/screenshot.mjs" /tmp/card-preview.html [output-path]
```

輸出路徑格式：`100_Todo/drafts/social-posts/YYYY-MM-DD_[主題]/card-[type].png`

### Step 4：完成

告知瑞克輸出路徑，詢問是否要調整內容或生成其他類型。

---

## 品牌規範摘要（詳見 `200_Reference/DESIGN.md`）

- Primary：`#C5B392`｜Accent：`#00EFB0`｜Dark BG：`#111111`｜Light BG：`#FAFAFA`
- 字體：Noto Sans TC + Inter（Google Fonts CDN）
- 圓角：12px｜間距：8px grid
- 輸出尺寸：1080×1350px（4:5）@ 2x = 2160×2700 PNG

---

## 注意事項

- 紅色系禁止出現在 ZOXE 卡片（保留給 Rick Z. 個人品牌）
- 一張卡最多一個 Accent（#00EFB0）重點元素
- 截圖前確認 `scripts/node_modules/` 已安裝：`cd scripts && npm install`

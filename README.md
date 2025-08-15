# Typersonal - AI 驅動的字型生成平台

> 讓 AI 技術賦能您的創意，輕鬆創造獨特、美觀的字型設計

## 🚀 專案概述

Typersonal 是一個基於 Vue 3 + Nuxt 3 的現代字型設計平台，使用 Firebase 作為後端服務，並整合 AI 技術來協助用戶創建個性化字型。

### ✨ 主要功能

- 🎨 **AI 智慧生成** - 運用人工智慧技術自動生成獨特字型
- 👀 **即時預覽** - 所見即所得的設計體驗
- 📱 **響應式設計** - 完美適配手機、平板和桌面設備
- 🔐 **Google 認證** - 安全便捷的登入系統
- ☁️ **雲端儲存** - Firebase Firestore 資料儲存
- 🎯 **現代化 UI** - 使用 Tailwind CSS 構建精美介面

## 🛠️ 技術堆疊

- **前端框架**: Vue 3 + Nuxt 3
- **樣式**: Tailwind CSS
- **認證**: Firebase Auth (Google 登入)
- **資料庫**: Firebase Firestore
- **部署**: 支援靜態生成和伺服器端渲染

## 📦 安裝與使用

### 1. 安裝依賴

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 開發環境

啟動開發伺服器（預設在 `http://localhost:3000`）：

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

### 3. 建置專案

為生產環境建置應用程式：

```bash
npm run build
# 或 
yarn build
# 或
pnpm build
```

### 4. 預覽建置結果

```bash
npm run preview
# 或
yarn preview  
# 或
pnpm preview
```

## 📁 專案結構

```
├── assets/          # 靜態資源（CSS、圖片等）
├── components/      # Vue 組件
│   ├── AuthComponent.vue
│   ├── MobileOptimized.vue
│   ├── navbar.vue
│   └── SideMenu.vue
├── composables/     # 可組合函數
│   ├── useAuth.js
│   └── useSurvey.js
├── layouts/         # 佈局模板
├── middleware/      # 路由中間件
├── pages/           # 頁面組件（基於檔案的路由）
├── plugins/         # Nuxt 插件
├── public/          # 靜態檔案
└── server/          # 伺服器端程式碼
```

## 🔧 主要頁面

- **首頁** (`/`) - 展示平台特色和功能介紹
- **字型工坊** (`/workshop`) - 字型創作和上傳功能  
- **字型市場** (`/market`) - 字型作品展示和瀏覽
- **創作頁面** (`/create`) - 字型設計工具
- **登入頁面** (`/login`) - 用戶認證

## 🔥 Firebase 配置

專案已整合 Firebase 服務，包括：

- **Authentication**: Google 第三方登入
- **Firestore**: 雲端資料庫
- **Storage**: 檔案儲存（如需要）

Firebase 配置位於 `plugins/firebase.js`，為了協作便利性已直接包含配置資訊。

## 🎨 主題配色

專案使用的主要配色：

- **主色調**: `#E29930` (brand-orange)  
- **次要色調**: `#ea580c` (brand-amber)
- **重點色**: `#3A6B60` (brand-teal)
- **淺色重點**: `#5EA897` (brand-teal-light)

## 📱 響應式設計

專案針對不同裝置進行了優化：

- **手機**: < 640px
- **平板**: 768px - 1024px  
- **桌面**: > 1024px
- **超寬螢幕**: > 1600px

## 🤝 開發團隊

- **開發**: Ryan
- **UI/UX**: 現代化響應式設計
- **技術棧**: Vue 3 + Nuxt 3 + Tailwind CSS + Firebase

## 📄 授權

本專案僅供學習和協作使用。

---

> 💡 如有任何問題或建議，歡迎在專案中提出討論！

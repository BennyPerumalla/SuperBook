# 📚 SuperBook

SuperBook is an **open-source Chrome extension** that enhances your reading experience by providing **instant word definitions** and improved text interaction on any webpage.

---

## 🏷️ Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
![Build](https://img.shields.io/github/actions/workflow/status/your-username/SuperBook/ci.yml?label=build)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
![Status](https://img.shields.io/badge/status-active-success.svg)

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🖥️ Demo](#-demo)
- [🚀 Installation](#-installation)
- [🛠️ Development](#-development-setup)
- [📂 Project Structure](#-project-structure)
- [🔧 Technologies Used](#-technologies-used)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🐛 Bug Reports & Feature Requests](#-bug-reports--feature-requests)
- [📞 Support](#-support)

---

## ✨ Features

- ⚡ **Instant Definitions:** Select any word to get instant dictionary meanings
- 🎨 **Beautiful UI:** Modern, minimal, and accessible design with React + Tailwind CSS
- 🚀 **Fast & Lightweight:** Built with performance and low resource usage in mind
- 🔒 **Privacy-Focused:** Works entirely offline after setup; no data collection
- 🌐 **Universal Compatibility:** Works seamlessly across all websites
- ⌨️ **Keyboard Navigation:** Use ↑/↓ arrows to browse word history
- 📚 **Word History:** Automatically saves and displays recent lookups

---

## 🖥️ Demo

🚧 **Coming soon** — The Chrome Web Store release is under review.

For now, you can test it manually via Developer Mode (see below).

---

## 🚀 Installation

### 🔹 From Chrome Web Store

_Coming soon – extension will be published to the Chrome Web Store._

### 🔹 Manual Installation (Developer Mode)

1. Download or clone this repository

   ```bash
   git clone https://github.com/BennyPerumalla/SuperBook

   ```

2. Open Chrome and go to:

   ```
   chrome://extensions/
   ```

3. Enable **Developer mode** (top right corner)
4. Click **Load unpacked** and select the `public` folder
5. You’ll now see **SuperBook** listed in your extensions

---

## 🛠️ Development Setup

Before starting, ensure you have **Node.js (v16 or higher)** installed.
We recommend using **pnpm** — a fast, disk-efficient package manager.

### 💡 Why pnpm?

`pnpm` is a next-generation package manager that:

- 🚀 **Installs dependencies faster** by using a global content-addressable store
- 💾 **Saves disk space** — shared packages aren’t duplicated across projects
- ⚡ **Improves performance** with efficient caching and linking
- 🧩 **Maintains strict version control**, ensuring consistent builds

In short, it’s **faster**, **leaner**, and **more reliable** than traditional npm installs.

---

### 📦 Install pnpm (if not already installed)

You can install pnpm globally using npm:

```bash
npm install -g pnpm
```

To verify the installation:

```bash
pnpm -v
```

You should see the version number (e.g., `9.0.0` or later).

---

### 🧰 Setup Steps

1. **Fork the repository**

   ```bash
   git clone https://github.com/your-username/SuperBook.git
   cd SuperBook
   ```

2. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Install dependencies using pnpm**

   ```bash
   pnpm install
   ```

4. **Start local development (demo site)**

   ```bash
   pnpm run dev
   ```

5. **Build and test your changes**

   ```bash
   pnpm run build
   ```

---

## 📂 Project Structure

```
SuperBook/
├── public/                      # Extension bundle + web demo static
│   ├── manifest.json            # Chrome Extension Manifest V3
│   ├── background/              # Background service worker (MV3)
│   │   └── background.js
│   ├── content/                 # Content scripts injected on pages
│   │   └── content.js
│   ├── popup/                   # Popup scripts (canonical popup is popup.html)
│   │   └── popup.js
│   ├── styles/                  # CSS for in‑page tooltip/highlights
│   │   └── tooltip.css
│   ├── icons/                   # Extension icons
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   ├── popup.html               # Canonical popup UI (terminal‑style)
│   └── popup-terminal.html      # Alternate popup kept for reference
├── src/                         # React demo app (Vite)
│   ├── components/              # Reusable UI + demo components
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Helpers / utilities
│   └── pages/                   # Demo pages (Index, NotFound)
├── index.html                   # Demo app HTML shell (Vite)
├── package.json                 # Project dependencies
└── vite.config.ts               # Vite setup (alias `@` → ./src)
```

---

## 🔧 Technologies Used

| Category           | Stack                        |
| ------------------ | ---------------------------- |
| **Frontend**       | React 18, TypeScript         |
| **Styling**        | Tailwind CSS, shadcn/ui      |
| **Build Tool**     | Vite                         |
| **Extension API**  | Chrome Extension Manifest V3 |
| **Dictionary API** | Free Dictionary API          |

---

## 🧭 Notes on Architecture

- The extension runtime (MV3) assets live under `public/background/`, `public/content/`, and `public/styles/`, referenced by `public/manifest.json`.
- The popup’s canonical entry is `public/popup.html`. The alternate `public/popup-terminal.html` is retained for reference.
- The React demo app under `src/` showcases the tooltip UX (`DictionaryDemo` + `DictionaryTooltip`) and is separate from the extension popup.

---

## 🤝 Contributing

Contributions are the heart of open-source ❤️

Whether it’s fixing a typo, improving documentation, or adding a new feature — your help is welcome!

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions, guidelines, and best practices before submitting a PR.

---

## 📝 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 🐛 Bug Reports & Feature Requests

If you find a bug or want to suggest an improvement:

- Open an issue here → [GitHub Issues](https://github.com/BennyPerumalla/SuperBook/issues)
- Clearly describe:

  - The problem or suggestion
  - Steps to reproduce (if applicable)
  - Expected vs actual behavior

---

## 📞 Support

If you have questions or need help:

- Check the [Issues](https://github.com/BennyPerumalla/SuperBook/issues) page
- Or create a new issue — we’re happy to assist!

---

**Made with ❤️ by the SuperBook Team**

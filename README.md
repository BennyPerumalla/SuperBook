# 📚 SuperBook

SuperBook is an **open-source Chrome extension** that enhances your reading experience by providing **instant word definitions** and improved text interaction on any webpage.

---

## 🏷️ Badges

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Build](https://img.shields.io/github/actions/workflow/status/your-username/SuperBook/ci.yml?label=build)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)
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

---

## 🖥️ Demo

🚧 **Coming soon** — The Chrome Web Store release is under review.

For now, you can test it manually via Developer Mode (see below).

---

## 🚀 Installation

### 🔹 From Chrome Web Store  
*Coming soon – extension will be published to the Chrome Web Store.*

### 🔹 Manual Installation (Developer Mode)

1. Download or clone this repository  
   ```bash
   git clone https://github.com/BennyPerumalla/SuperBook

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

* 🚀 **Installs dependencies faster** by using a global content-addressable store
* 💾 **Saves disk space** — shared packages aren’t duplicated across projects
* ⚡ **Improves performance** with efficient caching and linking
* 🧩 **Maintains strict version control**, ensuring consistent builds

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

4. **Start local development**

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
├── public/           # Extension files (manifest, icons, background scripts)
├── src/              # React source code
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Helper / utility functions
│   └── pages/        # Extension popup & content scripts
├── manifest.json     # Chrome Extension Manifest V3
└── package.json      # Project dependencies
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

* Open an issue here → [GitHub Issues](https://github.com/your-username/SuperBook/issues)
* Clearly describe:

  * The problem or suggestion
  * Steps to reproduce (if applicable)
  * Expected vs actual behavior

---

## 📞 Support

If you have questions or need help:

* Check the [Issues](https://github.com/your-username/SuperBook/issues) page
* Or create a new issue — we’re happy to assist!

---

**Made with ❤️ by the SuperBook Team**

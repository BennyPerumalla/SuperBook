# 🤝 Contributing to SuperBook

Welcome, and thank you for your interest in contributing to **SuperBook**! 📚  
We’re thrilled to have you here — whether you’re fixing a typo, improving performance, or adding a new feature.  
Every contribution matters. 💪

---

## 🧠 Ways to Contribute

You can help SuperBook grow in many ways:
- 🐛 Report and fix bugs  
- 💡 Suggest new features or improvements  
- 🧹 Refactor or optimize existing code  
- 🎨 Improve UI/UX design
- 📝 Enhance documentation

---

## ⚙️ Development Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **pnpm** package manager

If you don’t have **pnpm** installed yet, install it globally using npm:
```bash
npm install -g pnpm
````

Verify installation:

```bash
pnpm -v
```

---

### Local Setup

1. **Fork the repository**
   Click on the “Fork” button at the top right of this repo to create your copy.

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/SuperBook.git
   cd SuperBook
   ```

3. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies using pnpm**

   ```bash
   pnpm install
   ```

5. **Start local development**

   ```bash
   pnpm run dev
   ```

6. **Build and test your changes**

   ```bash
   pnpm run build
   ```

---

## ✍️ Coding Guidelines

Please follow these conventions to maintain code quality and consistency:

### 🧩 Code Style

* Follow existing **React + TypeScript** patterns.
* Use **Tailwind CSS** for styling (avoid inline styles unless necessary).
* Use **ESLint and Prettier** (if configured) to ensure consistent formatting.

### 🧾 Commit Message Format

Keep commit messages clear and structured.
Use **conventional commit** style:

| Type        | Purpose                                      |
| ----------- | -------------------------------------------- |
| `feat:`     | Add a new feature                            |
| `fix:`      | Fix a bug                                    |
| `docs:`     | Documentation changes                        |
| `style:`    | Code style or formatting changes             |
| `refactor:` | Code restructuring without changing behavior |
| `chore:`    | Minor maintenance or dependency updates      |

**Examples:**

```
feat: add popup animation on word selection
fix: resolve dictionary API 404 error
docs: update installation steps for pnpm
```

---

## 🧪 Pull Request Process

1. Ensure your code builds successfully (`pnpm run build`).
2. Test your changes thoroughly in Chrome’s Developer Mode.
3. Commit using proper messages.
4. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a **Pull Request (PR)** to the `main` branch.
6. Fill in the PR template (if available) describing:

   * What you changed
   * Why it’s needed
   * How it was tested

Once reviewed, your PR will be merged or feedback will be provided.

---

## 🐞 Reporting Bugs

Found a bug? Please help us fix it.

* Open a [GitHub Issue](https://github.com/your-username/SuperBook/issues)
* Include:

  * A clear title and description
  * Steps to reproduce
  * Expected vs actual behavior
  * Screenshots (if relevant)

Use the `bug` label for tracking.

---

## 💡 Feature Requests

Got an idea? We’d love to hear it!

* Open an issue with the label `enhancement`
* Explain your feature clearly:

  * What problem it solves
  * Why it’s valuable
  * Optional: mockups or examples

---

## 🧾 Code of Conduct

Please be kind and respectful to all contributors.
We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).
Harassment or disrespectful behavior will not be tolerated.

---

## 🌍 Community Guidelines

* Keep discussions constructive and friendly.
* Respect maintainers’ review time and feedback.
* Celebrate diversity of ideas — that’s how open source grows!

---

## 💬 Need Help?

If you’re stuck:

* Check existing [Issues](https://github.com/your-username/SuperBook/issues)
* Create a new issue with a `question` label
* Or tag a maintainer in your PR comment

---

## ❤️ A Note from the Team

We built SuperBook to make web reading smarter and smoother — and your contributions make that vision stronger.
Whether it’s your first PR or your fiftieth, **thank you for helping improve SuperBook!**

**Happy contributing! 🚀**

— *The SuperBook Team*

```

---

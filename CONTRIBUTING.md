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

## 🪪 Contribution Workflow

To ensure smooth collaboration and avoid duplicate work:

1. **Find an existing issue** in the [Issues section](https://github.com/BennyPerumalla/SuperBook/issues) that you’d like to work on.

   - If no issue exists for your idea, create a **new one** clearly describing the change or enhancement.

2. **Ask to be assigned**

   - Comment under the issue:

     > “Hey, I’d like to work on this issue. Can you please assign it to me?”

   - Wait until a maintainer **assigns the issue to you** before starting any work.
   - This ensures no two people are working on the same issue.

3. Once assigned, follow the setup and development steps below. ✅

---

## ⚙️ Development Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **pnpm** package manager

If you don’t have **pnpm** installed yet, install it globally using npm:

```bash
npm install -g pnpm
```

Verify installation:

```bash
pnpm -v
```

---

### Local Setup

1. **Fork the repository**
   Click the “Fork” button at the top right of this repo to create your copy.

2. **Clone your fork**

   ```bash
   git clone https://github.com/your-username/SuperBook.git
   cd SuperBook
   ```

3. **Create a new branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install dependencies**

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

- Follow existing **React + TypeScript** patterns.
- Use **Tailwind CSS** for styling (avoid inline styles unless necessary).
- Use **ESLint** and **Prettier** for consistent formatting.

---

### 🧾 Commit Message Format

Use the **Conventional Commit** style for clarity and automation support:

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

5. Open a **Pull Request (PR)** to the `main` branch with relavent screenshots(if needed).
6. Fill in the PR template (if available) describing:

   - What you changed
   - Why it’s needed
   - How it was tested

> ⚠️ **Note:** Only open PRs for issues **assigned to you**. Unassigned PRs may be closed to avoid conflicts.

Once reviewed, your PR will be merged or feedback will be provided.

---

## 🐞 Reporting Bugs

Found a bug? Please help us fix it:

- Open a [GitHub Issue](https://github.com/BennyPerumalla/SuperBook/issues)
- Include:

  - A clear title and description
  - Steps to reproduce
  - Expected vs. actual behavior
  - Screenshots (if relevant)

- Add the `bug` label.

---

## 💡 Feature Requests

Have an idea for improvement?

- Open an issue with the label `enhancement`.
- Explain:

  - What problem it solves
  - Why it’s valuable
  - Optionally include mockups or references

Wait for feedback and assignment before starting work.

---

## 🧾 Code of Conduct

Please be kind and respectful to all contributors.
We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/).
Harassment or disrespectful behavior will not be tolerated.

---

## 🌍 Community Guidelines

- Keep discussions constructive and friendly.
- Respect maintainers’ review time and feedback.
- Celebrate diverse ideas — that’s how open source grows!

---

## 💬 Need Help?

If you’re stuck:

- Check existing [Issues](https://github.com/BennyPerumalla/SuperBook/issues)
- Create a new issue with a `question` label
- Or tag a maintainer in your PR comment

---

## ❤️ A Note from the Team

We built SuperBook to make web reading smarter and smoother — and your contributions make that vision stronger.
Whether it’s your first PR or your fiftieth, **thank you for helping improve SuperBook!**

**Happy contributing! 🚀**
— _The SuperBook Team_

---

Would you like me to add a **“Before You Start” checklist** (like GitHub-style quick bullet points at the top)?
It can make the contribution flow even clearer for first-timers.

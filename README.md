# ArthQuest (Finance Tracker)

**ArthQuest** is a gamified personal finance tracker designed for the Indian market. It turns everyday money management into an RPG-style experience with quests, bosses, gardens, and rewards — so users build healthy finance habits without feeling bored or judged

---

## 🚀 What it is

- **Gamified budgeting & transaction tracking** (XP, badges, quests)
- **Visual progress** (garden growth, boss battles, streaks)
- **Built for India**: works with salary accounts, UPI, EMIs, and common expense patterns
- **No backend required**: runs entirely in the browser using `localStorage`
- **Lightweight tech stack**: vanilla HTML/CSS/JS + Chart.js + Claude API (invoice scanning)

---

## 🎯 Why this exists (Problem Statement)

Many finance apps feel clinical, judgmental, or too complex. People often:

- Forget to log daily spending, breaking the habit loop
- Find debt repayment boring and demotivating
- Feel disconnected from abstract numbers (e.g., savings totals)
- Need a fun way to stay engaged with personal finances

ArthQuest aims to make tracking finances feel like an adventure you want to play every day.

---

## ✅ Core Features (Current / Planned)

### ✅ Existing (Core)
- Transaction logging (income, expense, transfer)
- Charts / reports using Chart.js
- Persistent state in `localStorage`
- Quest & badge system
- Invoice scan integration via Claude API

### 🔧 Priority Fixes (P0)
- Fix duplicate DOM IDs (scan modal, quest/achievement pages)
- Fix Chart.js memory leak (destroy charts before re-creating)
- Add missing EMI page and wiring
- Add onboarding screen: **Demo data** vs **Start fresh**

### ✨ Planned Enhancements (P1/P2)
- Budget limits per category + overspend warning
- Recurring transactions / reminder banner
- Search + filter UX for transaction list
- CSV export of transactions
- Boss payment account selector (choose which account pays a boss)
- Dark mode toggle, split-bill feature, net worth chart

---

## 🛠️ Architecture (From TDD)

- Single-file SPA (no bundler/build system)
- State stored in a single global object `S`, persisted as JSON in `localStorage`
- Rendering is imperative (innerHTML replacement), with each page rendered fully
- UI modals use a CSS `open` class for visibility
- Key invariants:
  - Render functions are idempotent
  - All state mutations persist after every change

---

## 🧪 Known Issues (from PRD)

- Duplicate DOM IDs break modal behavior and scanning
- Chart.js instances are recreated without destroying
- Pages like EMI are missing, causing blank navigation targets
- UI toggles (transaction type) incorrectly show multiple active buttons
- Seed demo data automatically even when the user may want a clean start
- Scan modal saves data to first matching DOM elements due to duplicate IDs

---

## ▶️ Running the App

1. Open `ArthQuest_v2.html` in a modern browser (Chrome/Firefox/Edge).
2. The app runs fully client-side — no server required.

> 💡 Tip: For a full experience, open the browser devtools console to see error logs and debug UI rendering.

---

## 🧩 Development Notes

- `S` is the global app state. Search for `const S =` in the HTML/JS file.
- The app uses `localStorage` keys to persist — you can clear your state from the browser storage pane.
- The transaction UI is built on a page-routing model with `showPage(name)`.

---

## 🏁 Next Steps / How to Contribute

1. Fix critical bugs (DOM IDs, Chart.js cleanup, missing pages)
2. Add onboarding flow (demo vs clean start)
3. Implement P1 features like budgets and recurring transactions
4. Refactor toward modular code (split JS into modules / files)

---

## 📄 References
- **PRD:** `ArthQuest_PRD.docx`
- **TDD:** `ArthQuest_TDD.docx`

---

Happy building! 🎮💰

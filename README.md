# 部首 · Chinese Radicals Explorer

An interactive visual explorer of the Chinese radicals (部首, *bùshǒu*), the building blocks used to classify and look up Chinese characters. Pick a radical to see its pinyin, its meaning, the characters built from it, and how its written form changed over time.

> 🎓 This is a **learning project** I built to practice JavaScript and React for Yan Holtz's D3 + React course. It is meant to be explored and read, not used as a reference dictionary.

---

## ✨ What you can do

- **Browse the radicals.** See the first 100.
- **Inspect a radical.** View its pinyin and its core meaning.
- **Explore derived characters.** See which characters contain the radical and how they relate to it.
- **See historical forms.** Where available, follow the radical's evolution through earlier scripts (oracle bone, bronze, seal).

## 🧠 Why this project

Radicals are one of the most useful entry points into Chinese writing. Once you recognise them, unfamiliar characters stop looking like random strokes and start looking like meaningful compositions. I wanted to make that structure *visible*. This dataset also gave me a structure for practising React.

Learning goals for me:

- **Javascript** and **React** (components, state, UI)
- Designing a clean **data pipeline** that keeps the app fast and independent of external services
- Working with real, messy, multilingual open data

## 🛠️ Tech stack

| Layer | Tools |
|---|---|
| Framework | React + Vite |
| Data pipeline | Node.js build scripts |
| Data source | [Wiktionary](https://en.wiktionary.org/) |

## 📦 How the data works

The app **does not call Wiktionary when it loads**. A separate script fetches the data once, ahead of time, and saves it as a static JSON file that ships with the app.

```
Wiktionary  ──(build script, run manually)──▶  src/data/radicals.json  ──▶  React app
```

This keeps the app fast and avoids putting unnecessary load on Wikimedia's volunteer-run servers.

The fetch script follows Wikimedia's etiquette for automated clients:

- It sends a **descriptive User-Agent** with a contact address, so the requests can be identified.
- It sends **requests one at a time**, with a short pause between them, never in parallel bursts.
- It is **run only when the data needs refreshing**, not on every visit.

## 🚀 Getting started

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
npm install

# 3. (Optional) Refresh the data from Wiktionary
#    A prepared radicals.json is already included, so you only need this to update it.
node scripts/fetch-data.js

# 4. Start the development server
npm run dev
```

## 🗂️ Project structure

```
radicals-explorer/
├── data-raw/          # Raw data downloaded from Wiktionary, before processing
├── public/            # Static assets served as-is
├── scripts/           # Build-time scripts that fetch and prepare the data
├── src/               # App source code
├── index.html         # App entry point
├── vite.config.js     # Vite configuration
├── .oxlintrc.json     # Linter configuration (oxlint)
└── package.json
```


## 📝 Notes & caveats

- **Data quality.** Wiktionary is community-edited. Pinyin, meanings, and historical forms can be incomplete.
- **Meanings are simplified.**
- **Historical forms** are shown only where Wiktionary provides them, so some radicals show empty cells.
- **Snapshot in time.** The dataset reflects Wiktionary at the date of the last fetch.

## 🤝 How it was built

This app was built in close collaboration with **[Claude](https://claude.ai)**, which I used as a coding partner throughout the project.

- **My part:** the idea and scope, the choice of data and what to show, design and interaction decisions, the initial code, testing, reviewing, and iterating on every piece.
- **Claude's part:** writing and debugging much of the React code, explaining concepts as we went, and advising on the data pipeline (for example, the build-time fetching and Wikimedia etiquette described above).

This project was also a learning exercise. With my current knowledge, I could only have built a much simpler version on my own. Instead, I chose to be guided step by step, so I could aim for a better result while learning how a project’s folders and files grow as it develops. At each stage, I focused on understanding why the code is structured the way it is, which made the project a hands-on way to learn the logic behind JavaScript and React.

## 📜 Data attribution & license

Character data comes from **[Wiktionary](https://en.wiktionary.org/)**, licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Content derived from it is shared under the same license.

## 🙏 Acknowledgements

- The Wiktionary editors who document Chinese characters in such depth
- **[Yan Holtz's D3 + React course](https://www.react-graph-gallery.com/react-d3-dataviz-course)** that this project grew out of
- Claude (Anthropic), my coding collaborator on this project

---

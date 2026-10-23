import { useState, useEffect } from "react";
import data from "./data/radicals.json";
// Importing the image (instead of only naming it in the CSS) makes Vite check that the file
// exists, add it to the build, and give us its correct address, also on GitHub Pages
import huaisu from "./assets/huaisu-colophon.webp";
import { LANGS, t } from "./i18n";
import RadicalCard from "./components/RadicalCard";
import HowToRead from "./components/HowToRead";
import RadicalFilter from "./components/RadicalFilter";
import Footer from "./components/Footer";
import "./App.css";

// Text-size levels. Index 1 (100%) is the default.
// One step down, two steps up: the limit.
const SIZES = [0.9, 1, 1.15, 1.3];
const DEFAULT_SIZE = 1;

// Read the size the visitor chose last time (if the browser allows storage)
function loadSize() {
  try {
    const raw = localStorage.getItem("textSize"); // null on the first visit
    const saved = Number(raw);
    return raw !== null && SIZES[saved] ? saved : DEFAULT_SIZE;
  } catch {
    return DEFAULT_SIZE;
  }
}

export default function App() {
  // STATE: values that, when they change, make React re-draw the page
  const [lang, setLang] = useState("en"); // selected language
  const [selected, setSelected] = useState([]); // ids chosen in the filter ([] = show all)
  const [size, setSize] = useState(loadSize); // index into SIZES

  // EFFECT: runs after React draws the page, whenever `size` changes.
  // Used here to remember the choice for the next visit.
  useEffect(() => {
    try {
      localStorage.setItem("textSize", String(size));
    } catch {
      /* storage blocked (e.g. private window): the size just won't be remembered */
    }
  }, [size]);

  // DERIVED DATA: computed from state on every render, never stored separately
  const visible =
    selected.length === 0
      ? data.radicals
      : data.radicals.filter((r) => selected.includes(r.id));

  const canShrink = size > 0;
  const canGrow = size < SIZES.length - 1;

  const tx = t(lang);
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <>
      {/* Faded calligraphy behind the header. It sits OUTSIDE <main>, so it isn't
          zoomed by A+/A− and can reach the right edge of the window on wide screens. */}
      <div
        className="hero-bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${huaisu})` }}
      />

      {/* `zoom` scales text, images and spacing together, and the layout re-flows */}
      <main style={{ zoom: SIZES[size] }}>
        {/* Top bar: both controls on one line, each with its caption */}
        <div className="topbar">
          <span className="ctrl-cap" dir={dir}>
            {tx.language}
          </span>
          <div className="langs">
            {LANGS.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={l === lang ? "active" : ""}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <span className="topbar-sep" aria-hidden="true" />

          <span className="ctrl-cap" dir={dir}>
            {tx.textSize}
          </span>
          <div className="size-ctrl">
            <button
              className="size-down"
              onClick={() => setSize((s) => s - 1)}
              disabled={!canShrink}
              aria-label={tx.smaller}
              title={tx.smaller}
            >
              A<sup>−</sup>
            </button>
            <button
              className="size-up"
              onClick={() => setSize((s) => s + 1)}
              disabled={!canGrow}
              aria-label={tx.larger}
              title={tx.larger}
            >
              A<sup>+</sup>
            </button>
          </div>
        </div>

        <header className="hero">
          <p className="kicker">
            部首 · <span dir={dir}>{tx.kicker}</span>
          </p>
          {/* One <span> per line of the title, from i18n.js */}
          <h1 dir={dir}>
            {tx.title.map((line) => (
              <span key={line} className="title-line">
                {line}
              </span>
            ))}
          </h1>
          <p className="subtitle" dir={dir}>
            {tx.subtitle}
          </p>
        </header>

        <HowToRead radicals={data.radicals} lang={lang} />
        <RadicalFilter
          radicals={data.radicals}
          lang={lang}
          selected={selected}
          onChange={setSelected}
          visibleCount={visible.length}
        />
        <div className="grid">
          {visible.map((r) => (
            <RadicalCard key={r.id} radical={r} lang={lang} />
          ))}
        </div>
        <Footer lang={lang} />
      </main>
    </>
  );
}

import { useState, useEffect } from "react";
import data from "./data/radicals.json";
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

  return (
    // `zoom` scales text, images and spacing together, and the layout re-flows
    <main style={{ zoom: SIZES[size] }}>
      <header className="hero">
        <h1>
          The first 100
          <br />
          Chinese radicals
        </h1>
        <p className="subtitle" dir={lang === "ar" ? "rtl" : "ltr"}>
          {t(lang).subtitle}
        </p>

        <div className="controls">
          {/* Group 1: language */}
          <div className="ctrl-group">
            <span className="ctrl-cap" dir={lang === "ar" ? "rtl" : "ltr"}>
              {t(lang).language}
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
          </div>

          {/* Group 2: text size — small A− / big A+, dots show the current level */}
          <div className="ctrl-group">
            <span className="ctrl-cap" dir={lang === "ar" ? "rtl" : "ltr"}>
              {t(lang).textSize}
            </span>
            <div className="size-ctrl">
              <button
                className="size-down"
                onClick={() => setSize((s) => s - 1)}
                disabled={!canShrink}
                aria-label={t(lang).smaller}
                title={t(lang).smaller}
              >
                A<sup>−</sup>
              </button>
              <button
                className="size-up"
                onClick={() => setSize((s) => s + 1)}
                disabled={!canGrow}
                aria-label={t(lang).larger}
                title={t(lang).larger}
              >
                A<sup>+</sup>
              </button>
            </div>
            <div className="size-dots" aria-hidden="true">
              {SIZES.map((_, i) => (
                <i key={i} className={i === size ? "on" : undefined} />
              ))}
            </div>
          </div>
        </div>
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
      <Footer />
    </main>
  );
}

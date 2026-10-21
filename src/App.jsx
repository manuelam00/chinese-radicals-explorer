import { useState } from "react";
import data from "./data/radicals.json";
import { LANGS, t } from "./i18n";
import RadicalCard from "./components/RadicalCard";
import HowToRead from "./components/HowToRead";
import RadicalFilter from "./components/RadicalFilter";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  // STATE: values that, when they change, make React re-draw the page
  const [lang, setLang] = useState("en"); // selected language
  const [selected, setSelected] = useState([]); // ids chosen in the filter ([] = show all)

  // DERIVED DATA: computed from state on every render, never stored separately
  const visible =
    selected.length === 0
      ? data.radicals
      : data.radicals.filter((r) => selected.includes(r.id));

  return (
    <main>
      <header className="hero">
        <h1>
          The first 100
          <br />
          Chinese radicals
        </h1>
        <p className="subtitle" dir={lang === "ar" ? "rtl" : "ltr"}>
          {t(lang).subtitle}
        </p>

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

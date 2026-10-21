import { useState } from "react";
import { t, nameOf, dirOf } from "../i18n";

// Multiple-choice filter. Props:
//   radicals     – all radicals
//   lang         – current language
//   selected     – array of selected radical ids (state lives in App)
//   onChange     – function App gives us to update that array
//   visibleCount – how many cards are currently shown
export default function RadicalFilter({ radicals, lang, selected, onChange, visibleCount }) {
  // These three only matter inside the filter, so their state lives here
  const [query, setQuery] = useState(""); // text typed in the search box
  const [open, setOpen] = useState(false); // is the dropdown visible?
  const [active, setActive] = useState(0); // which dropdown row is highlighted

  const tx = t(lang);
  const dir = dirOf(lang);
  const q = query.trim().toLowerCase();

  // Dropdown rows: radicals whose name, character or pinyin match the text
  const matches = radicals.filter(
    (r) =>
      !q ||
      nameOf(r, lang).toLowerCase().includes(q) ||
      r.char.includes(q) ||
      (r.pinyin ?? "").toLowerCase().includes(q)
  );

  // Add the id if missing, remove it if already there
  const toggle = (id) =>
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);

  // Choosing a row in the dropdown: toggle it, clear the text, keep the list open
  const pick = (r) => {
    toggle(r.id);
    setQuery("");
    setActive(0);
  };

  // Keyboard support: ↑ ↓ to move, Enter to choose, Esc to close
  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open && matches[active]) {
      e.preventDefault();
      pick(matches[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <section className="filter">
      <div className="filter-head">
        <h2 className="section-title" dir={dir}>{tx.filterTitle}</h2>
        <span className="filter-count" dir={dir}>{tx.showing(visibleCount, radicals.length)}</span>
        {selected.length > 0 && (
          <button className="filter-clear" onClick={() => onChange([])}>
            {tx.showAll}
          </button>
        )}
      </div>

      <div className="search-wrap">
        <input
          className="filter-search"
          type="search"
          dir={dir}
          placeholder={tx.search}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-controls="radical-options"
        />

        {open && (
          // onMouseDown + preventDefault: clicking a row must not blur the input first,
          // otherwise the dropdown would close before the click is registered
          <ul className="dropdown" id="radical-options" role="listbox" onMouseDown={(e) => e.preventDefault()}>
            {matches.length === 0 && <li className="dd-empty" dir={dir}>{tx.noMatch}</li>}
            {matches.map((r, i) => (
              <li
                key={r.id}
                role="option"
                aria-selected={selected.includes(r.id)}
                className={i === active ? "active" : undefined}
                onMouseEnter={() => setActive(i)}
                onClick={() => pick(r)}
              >
                <span className="dd-check">{selected.includes(r.id) ? "✓" : ""}</span>
                <span className="dd-char">{r.char}</span>
                <span dir={dir}>{nameOf(r, lang)}</span>
                <span className="dd-pinyin">{r.pinyin}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pills">
        {radicals.map((r) => (
          <button
            key={r.id}
            className={selected.includes(r.id) ? "pill active" : "pill"}
            onClick={() => toggle(r.id)}
            aria-pressed={selected.includes(r.id)}
          >
            <b>{r.char}</b>
            <span dir={dir}>{nameOf(r, lang)}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

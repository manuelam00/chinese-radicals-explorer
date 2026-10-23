// All interface text, in the four languages.
// Components read from here with t(lang), so adding a language = adding one block.

export const LANGS = ["en", "it", "fr", "ar"];

const UI = {
  en: {
    // The big title, one string per line (you choose where it breaks)
    title: ["The first 100", "Chinese", "radicals"],
    kicker: "An interactive explorer",
    subtitle: "and their historical evolution, from oracle bones to brush",
    howTitle: "How to read a card",
    annChar: "The radical, as it is written today",
    annLabel: "Pronunciation (pinyin) and meaning",
    annForms:
      "Historical forms, from oracle bones to later scripts.\nDashed box? No form available.",
    annDerived: "The 10 most common characters built with this radical",
    good: "good",
    haoText:
      "A popular folk etymology. Research on early script suggests more complex origins.",
    filterTitle: "Explore the radicals",
    search: "Search a meaning…",
    showAll: "Show all",
    showing: (n, total) => `Showing ${n} of ${total}`,
    noMatch: "No matching radical",
    strokeOrder: "Stroke order",
    hoverHint:
      "Tip: rest the mouse on a radical to watch its stroke order, or on a character to see its meaning.",
    language: "Language",
    textSize: "Text size",
    smaller: "Smaller text",
    larger: "Larger text",
  },
  it: {
    title: ["I primi 100", "radicali", "cinesi"],
    kicker: "Un esploratore interattivo",
    subtitle: "e la loro evoluzione storica, dalle ossa oracolari al pennello",
    howTitle: "Come leggere una scheda",
    annChar: "Il radicale, come si scrive oggi",
    annLabel: "Pronuncia (pinyin) e significato",
    annForms:
      "Forme storiche, dalle ossa oracolari alle scritture successive.\nRiquadro tratteggiato? Nessuna forma disponibile.",
    annDerived: "I 10 caratteri più comuni costruiti con questo radicale",
    good: "buono",
    haoText:
      "Un'etimologia popolare. La ricerca sulle scritture antiche suggerisce origini più complesse.",
    filterTitle: "Esplora i radicali",
    search: "Cerca un significato…",
    showAll: "Mostra tutti",
    showing: (n, total) => `${n} di ${total} visibili`,
    noMatch: "Nessun radicale trovato",
    strokeOrder: "Ordine dei tratti",
    hoverHint:
      "Suggerimento: fermati con il mouse su un radicale per vedere l'ordine dei tratti, o su un carattere per leggerne il significato.",
    language: "Lingua",
    textSize: "Dimensione testo",
    smaller: "Testo più piccolo",
    larger: "Testo più grande",
  },
  fr: {
    title: ["Les 100", "premiers", "radicaux chinois"],
    kicker: "Un explorateur interactif",
    subtitle: "et leur évolution historique, des os oraculaires au pinceau",
    howTitle: "Comment lire une fiche",
    annChar: "Le radical, tel qu'on l'écrit aujourd'hui",
    annLabel: "Prononciation (pinyin) et sens",
    annForms:
      "Formes historiques, des os oraculaires aux écritures ultérieures.\nCadre en pointillés ? Aucune forme disponible.",
    annDerived: "Les 10 caractères les plus courants formés avec ce radical",
    good: "bon",
    haoText:
      "Une étymologie populaire. Les recherches sur les écritures anciennes suggèrent des origines plus complexes.",
    filterTitle: "Explorer les radicaux",
    search: "Chercher un sens…",
    showAll: "Tout afficher",
    showing: (n, total) => `${n} sur ${total} affichés`,
    noMatch: "Aucun radical trouvé",
    strokeOrder: "Ordre des traits",
    hoverHint:
      "Astuce : survolez un radical pour voir l'ordre des traits, ou un caractère pour lire son sens.",
    language: "Langue",
    textSize: "Taille du texte",
    smaller: "Texte plus petit",
    larger: "Texte plus grand",
  },
  ar: {
    title: ["أوّل 100", "جذر صيني"],
    kicker: "مستكشف تفاعلي",
    subtitle: "وتطوّرها التاريخي، من عظام العرافة إلى الفرشاة",
    howTitle: "كيف تقرأ البطاقة",
    annChar: "الجذر كما يُكتب اليوم",
    annLabel: "النطق (بينيين) والمعنى",
    annForms:
      "الأشكال التاريخية، من عظام العرافة إلى الخطوط اللاحقة.\nإطار منقّط؟ لا يتوفّر شكل.",
    annDerived: "أكثر 10 أحرف شيوعًا مبنية على هذا الجذر",
    good: "جيّد",
    haoText: "تأصيل شعبي. وتشير أبحاث الخطوط القديمة إلى أصول أكثر تعقيدًا.",
    filterTitle: "استكشف الجذور",
    search: "ابحث عن معنى…",
    showAll: "عرض الكل",
    showing: (n, total) => `عرض ${n} من ${total}`,
    noMatch: "لا يوجد جذر مطابق",
    strokeOrder: "ترتيب الخطوط",
    hoverHint:
      "نصيحة: مرّر الفأرة فوق جذر لترى ترتيب خطوطه، أو فوق حرف لترى معناه.",
    language: "اللغة",
    textSize: "حجم النص",
    smaller: "تصغير النص",
    larger: "تكبير النص",
  },
};

export const t = (lang) => UI[lang] ?? UI.en;

// Text direction: Arabic is written right to left
export const dirOf = (lang) => (lang === "ar" ? "rtl" : "ltr");

// A radical's name in the chosen language, falling back to English
export const nameOf = (radical, lang) =>
  radical?.names?.[lang] ?? radical?.name;

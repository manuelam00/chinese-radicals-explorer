// All interface text, in the four languages.
// Components read from here with t(lang), so adding a language = adding one block.

export const LANGS = ["en", "it", "fr", "ar"];

const UI = {
  en: {
    subtitle: "and their historical evolution",
    howTitle: "How to read a card",
    annChar: "The radical, as it is written today",
    annLabel: "Pronunciation (pinyin) and meaning",
    annForms: "Historical forms, from oracle bones (c. 1200 BCE) to later scripts. A dashed box means no form is attested.",
    annDerived: "The 10 most common characters built with this radical",
    good: "good",
    haoText: "Often explained as “woman + child = good”: a popular folk etymology. Research on early script suggests more complex origins.",
    filterTitle: "Filter radicals",
    search: "Search a meaning…",
    showAll: "Show all",
    showing: (n, total) => `Showing ${n} of ${total}`,
    noMatch: "No matching radical",
    smaller: "Smaller text",
    larger: "Larger text",
  },
  it: {
    subtitle: "e la loro evoluzione storica",
    howTitle: "Come leggere una scheda",
    annChar: "Il radicale, come si scrive oggi",
    annLabel: "Pronuncia (pinyin) e significato",
    annForms: "Forme storiche, dalle ossa oracolari (ca. 1200 a.C.) alle scritture successive. Un riquadro tratteggiato indica che la forma non è attestata.",
    annDerived: "I 10 caratteri più comuni costruiti con questo radicale",
    good: "buono",
    haoText: "Spesso spiegato come «donna + bambino = buono»: un'etimologia popolare. La ricerca sulle scritture antiche suggerisce origini più complesse.",
    filterTitle: "Filtra i radicali",
    search: "Cerca un significato…",
    showAll: "Mostra tutti",
    showing: (n, total) => `${n} di ${total} visibili`,
    noMatch: "Nessun radicale trovato",
    smaller: "Testo più piccolo",
    larger: "Testo più grande",
  },
  fr: {
    subtitle: "et leur évolution historique",
    howTitle: "Comment lire une fiche",
    annChar: "Le radical, tel qu'on l'écrit aujourd'hui",
    annLabel: "Prononciation (pinyin) et sens",
    annForms: "Formes historiques, des os oraculaires (v. 1200 av. J.-C.) aux écritures ultérieures. Un cadre en pointillés signifie qu'aucune forme n'est attestée.",
    annDerived: "Les 10 caractères les plus courants formés avec ce radical",
    good: "bon",
    haoText: "Souvent expliqué comme « femme + enfant = bon » : une étymologie populaire. Les recherches sur les écritures anciennes suggèrent des origines plus complexes.",
    filterTitle: "Filtrer les radicaux",
    search: "Chercher un sens…",
    showAll: "Tout afficher",
    showing: (n, total) => `${n} sur ${total} affichés`,
    noMatch: "Aucun radical trouvé",
    smaller: "Texte plus petit",
    larger: "Texte plus grand",
  },
  ar: {
    subtitle: "وتطوّرها التاريخي",
    howTitle: "كيف تقرأ البطاقة",
    annChar: "الجذر كما يُكتب اليوم",
    annLabel: "النطق (بينيين) والمعنى",
    annForms: "الأشكال التاريخية، من عظام العرافة (نحو 1200 ق.م) إلى الخطوط اللاحقة. يعني الإطار المنقّط أنه لا يوجد شكل موثّق.",
    annDerived: "أكثر 10 أحرف شيوعًا مبنية على هذا الجذر",
    good: "جيّد",
    haoText: "يُفسَّر غالبًا بأنه «امرأة + طفل = جيّد»، وهو تأصيل شعبي. وتشير أبحاث الخطوط القديمة إلى أصول أكثر تعقيدًا.",
    filterTitle: "تصفية الجذور",
    search: "ابحث عن معنى…",
    showAll: "عرض الكل",
    showing: (n, total) => `عرض ${n} من ${total}`,
    noMatch: "لا يوجد جذر مطابق",
    smaller: "تصغير النص",
    larger: "تكبير النص",
  },
};

export const t = (lang) => UI[lang] ?? UI.en;

// Text direction: Arabic is written right to left
export const dirOf = (lang) => (lang === "ar" ? "rtl" : "ltr");

// A radical's name in the chosen language, falling back to English
export const nameOf = (radical, lang) => radical?.names?.[lang] ?? radical?.name;

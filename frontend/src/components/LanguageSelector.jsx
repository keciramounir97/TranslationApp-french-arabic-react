import React from "react";

export const LANGUAGES_LIST = [
  {
    code: "auto",
    name: "Détecter la langue",
    nativeName: "Auto Detect",
    flag: "🌐",
  },
  { code: "fr", name: "Français", nativeName: "Français", flag: "🇫🇷" },
  { code: "ar", name: "Arabe", nativeName: "العربية", flag: "🇸🇦" },
  { code: "en", name: "Anglais", nativeName: "English", flag: "🇬🇧" },
  { code: "es", name: "Espagnol", nativeName: "Español", flag: "🇪🇸" },
  { code: "de", name: "Allemand", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italien", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Portugais", nativeName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russe", nativeName: "Русский", flag: "🇷🇺" },
  { code: "zh", name: "Chinois", nativeName: "中文", flag: "🇨🇳" },
  { code: "ja", name: "Japonais", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Coréen", nativeName: "한국어", flag: "🇰🇷" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "tr", name: "Turc", nativeName: "Türkçe", flag: "🇹🇷" },
  { code: "nl", name: "Néerlandais", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "pl", name: "Polonais", nativeName: "Polski", flag: "🇵🇱" },
  { code: "sv", name: "Suédois", nativeName: "Svenska", flag: "🇸🇪" },
  { code: "el", name: "Grec", nativeName: "Ελληνικά", flag: "🇬🇷" },
  { code: "vi", name: "Vietnamien", nativeName: "Tiếng Việt", flag: "🇻🇳" },
  {
    code: "id",
    name: "Indonésien",
    nativeName: "Bahasa Indonesia",
    flag: "🇮🇩",
  },
  { code: "uk", name: "Ukrainien", nativeName: "Українська", flag: "🇺🇦" },
];

export default function LanguageSelector({
  value,
  onChange,
  allowAuto = false,
  disabled = false,
}) {
  const filteredLanguages = allowAuto
    ? LANGUAGES_LIST
    : LANGUAGES_LIST.filter((l) => l.code !== "auto");

  return (
    <select
      className="lang-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{ fontWeight: 600, fontSize: "0.95rem" }}
    >
      {filteredLanguages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.flag} {lang.name} ({lang.nativeName})
        </option>
      ))}
    </select>
  );
}

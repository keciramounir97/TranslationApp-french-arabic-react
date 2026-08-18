import React from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} - Version 2.0 Full-Stack | 20
          Langues Supportées
        </p>
      </footer>
    </>
  );
}

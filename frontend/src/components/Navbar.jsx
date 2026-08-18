import React from "react";

import { NavLink, Link } from "react-router-dom";

import {
  Languages,
  History,
  Star,
  BookOpen,
  Sun,
  Moon,
  LogIn,
  User,
  LogOut,
  Settings,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { uiLanguage, setUiLanguage, t } = useLanguage();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <Languages size={22} />
          </div>
          <span>{t("appTitle")}</span>
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <Languages size={18} />
            <span>{t("translate")}</span>
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <History size={18} />
            <span>{t("history")}</span>
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <Star size={18} />
            <span>{t("favorites")}</span>
          </NavLink>

          <NavLink
            to="/dictionary"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <BookOpen size={18} />
            <span>{t("dictionary")}</span>
          </NavLink>

          {/* Sélecteur de langue d'interface (i18n) */}
          <select
            className="lang-select"
            value={uiLanguage}
            onChange={(e) => setUiLanguage(e.target.value)}
            title="Langue de l'interface"
          >
            <option value="fr">🇫🇷 FR</option>
            <option value="en">🇬🇧 EN</option>
            <option value="ar">🇸🇦 AR</option>
          </select>

          {/* Bouton bascule de thème (Clair / Sombre) */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? t("themeLight") : t("themeDark")}
          >
            {theme === "dark" ? (
              <Sun size={20} color="#f59e0b" />
            ) : (
              <Moon size={20} color="#6366f1" />
            )}
          </button>

          {/* Authentification / Profil */}
          {user ? (
            <div className="user-profile-badge">
              <span className="user-name" title={user.email}>
                <User
                  size={18}
                  style={{
                    display: "inline",
                    verticalAlign: "middle",
                    marginRight: 4,
                  }}
                />
                {user.name}
              </span>
              <NavLink
                to="/settings"
                className="icon-btn"
                title={t("settings")}
              >
                <Settings size={18} />
              </NavLink>
              <button className="icon-btn" onClick={logout} title={t("logout")}>
                <LogOut size={18} color="#ef4444" />
              </button>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn-primary"
              style={{ padding: "0.4rem 1rem", fontSize: "0.9rem" }}
            >
              <LogIn size={16} />
              <span>{t("login")}</span>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

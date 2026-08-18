import React from 'react';
import { Settings, Moon, Sun, Globe, HardDrive, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { uiLanguage, setUiLanguage, t } = useLanguage();

  return (
    <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Settings size={24} color="var(--accent-primary)" />
        <span>{t('settings')}</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Section Thème */}
        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                <span>Apparence de l'application</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                Basculer entre le mode clair et le mode sombre (enregistré dans le Local Storage).
              </div>
            </div>
            <button className="btn-primary" onClick={toggleTheme} style={{ padding: '0.5rem 1rem' }}>
              {theme === 'dark' ? t('themeLight') : t('themeDark')}
            </button>
          </div>
        </div>

        {/* Section Langue d'interface */}
        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Globe size={18} />
                <span>Langue de l'Interface</span>
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                Choisissez la langue d'affichage des menus et boutons.
              </div>
            </div>
            <select
              className="lang-select"
              value={uiLanguage}
              onChange={(e) => setUiLanguage(e.target.value)}
            >
              <option value="fr">Français (FR)</option>
              <option value="en">English (EN)</option>
              <option value="ar">العربية (AR)</option>
            </select>
          </div>
        </div>

        {/* Section Profil & LocalStorage */}
        {user && (
          <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
            <div style={{ fontWeight: 600, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <ShieldCheck size={18} color="#10b981" />
              <span>Profil Utilisateur Connecté</span>
            </div>
            <div style={{ fontSize: '0.95rem' }}><strong>Nom:</strong> {user.name}</div>
            <div style={{ fontSize: '0.95rem', marginTop: '0.25rem' }}><strong>Email:</strong> {user.email}</div>
          </div>
        )}

        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
          <div style={{ fontWeight: 600, fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <HardDrive size={18} />
            <span>Stockage Local (LocalStorage)</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Le jeton d'authentification, les préférences de thème et la langue choisie sont synchronisés localement dans votre navigateur pour une expérience rapide et réactive.
          </div>
        </div>
      </div>
    </div>
  );
}

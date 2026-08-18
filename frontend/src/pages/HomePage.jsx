import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Copy, Check, Trash2, Star, Sparkles, Send } from 'lucide-react';
import LanguageSelector from '../components/LanguageSelector';
import AudioPlayer from '../components/AudioPlayer';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

export default function HomePage() {
  const { t } = useLanguage();

  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('fr');
  const [targetLang, setTargetLang] = useState('ar');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [providerInfo, setProviderInfo] = useState('');

  // Auto-traduction avec effet debounce (500ms après la frappe)
  useEffect(() => {
    if (!sourceText.trim()) {
      setTranslatedText('');
      setStatusMessage('');
      return;
    }

    const timer = setTimeout(() => {
      handleTranslate();
    }, 550);

    return () => clearTimeout(timer);
  }, [sourceText, sourceLang, targetLang]);

  // Fonction principale de traduction
  const handleTranslate = async () => {
    if (!sourceText.trim()) return;

    setIsLoading(true);
    setStatusMessage('Traduction en cours...');

    try {
      const response = await api.post('/translate', {
        text: sourceText,
        from: sourceLang,
        to: targetLang,
        saveToHistory: true
      });

      setTranslatedText(response.data.translatedText);
      setProviderInfo(response.data.provider || '');
      setStatusMessage('Traduction terminée ✓');
      setIsStarred(false);
    } catch (error) {
      console.error('Erreur traduction:', error);
      setStatusMessage(error.response?.data?.message || 'Erreur lors de la traduction.');
    } finally {
      setIsLoading(false);
    }
  };

  // Inverser les langues et permuter les textes (Fonctionnalité Reverse App)
  const handleSwapLanguages = async () => {
    if (sourceLang === 'auto') return;

    const oldSourceLang = sourceLang;
    const oldTargetLang = targetLang;
    const oldSourceText = sourceText;
    const oldTranslatedText = translatedText;

    // Permuter les sélections de langues
    setSourceLang(oldTargetLang);
    setTargetLang(oldSourceLang);

    // Si on a déjà un texte traduit, il devient le nouveau texte source
    if (oldTranslatedText) {
      setSourceText(oldTranslatedText);
      setTranslatedText(oldSourceText);
    }
  };

  // Copier le texte traduit dans le presse-papier
  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Sauvegarder dans les favoris
  const handleToggleFavorite = async () => {
    if (!sourceText || !translatedText) return;

    try {
      await api.post('/favorites', {
        sourceText,
        translatedText,
        from: sourceLang,
        to: targetLang
      });
      setIsStarred(true);
      setStatusMessage('Ajouté aux favoris ! ★');
    } catch (error) {
      console.error('Erreur favoris:', error);
    }
  };

  // Raccourci clavier Ctrl+Entrée
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleTranslate();
    }
  };

  return (
    <div className="translator-container">
      {/* Barre d'outils de sélection des langues et permutation */}
      <div className="language-toolbar">
        <LanguageSelector
          value={sourceLang}
          onChange={setSourceLang}
          allowAuto={true}
          disabled={isLoading}
        />

        <button
          className="swap-btn"
          onClick={handleSwapLanguages}
          disabled={sourceLang === 'auto' || isLoading}
          title={t('swapLanguages')}
        >
          <ArrowRightLeft size={18} />
        </button>

        <LanguageSelector
          value={targetLang}
          onChange={setTargetLang}
          allowAuto={false}
          disabled={isLoading}
        />
      </div>

      {/* Zone de texte de traduction côte à côte */}
      <div className="translation-grid">
        {/* Carte de texte source */}
        <div className="text-card">
          <textarea
            className="text-area-input"
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t('sourcePlaceholder')}
            rows={7}
            dir={sourceLang === 'ar' ? 'rtl' : 'ltr'}
          />

          <div className="text-card-footer">
            <div className="action-buttons">
              <AudioPlayer text={sourceText} lang={sourceLang === 'auto' ? 'fr' : sourceLang} />
              {sourceText && (
                <button className="icon-btn" onClick={() => setSourceText('')} title={t('clear')}>
                  <Trash2 size={18} color="#ef4444" />
                </button>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="char-counter">{sourceText.length} / 5000</span>
              <button className="btn-primary" onClick={handleTranslate} disabled={isLoading || !sourceText.trim()}>
                <Send size={16} />
                <span>{isLoading ? '...' : t('translate')}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Carte de texte traduit */}
        <div className="text-card" style={{ background: 'var(--bg-glass)' }}>
          <textarea
            className="text-area-input"
            value={translatedText}
            readOnly
            placeholder={t('translationPlaceholder')}
            rows={7}
            dir={targetLang === 'ar' ? 'rtl' : 'ltr'}
          />

          <div className="text-card-footer">
            <div className="action-buttons">
              <AudioPlayer text={translatedText} lang={targetLang} />
              <button className="icon-btn" onClick={handleCopy} disabled={!translatedText} title={t('copy')}>
                {isCopied ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
              </button>
              <button
                className={`icon-btn ${isStarred ? 'starred' : ''}`}
                onClick={handleToggleFavorite}
                disabled={!translatedText}
                title={t('saveFavorite')}
              >
                <Star size={18} fill={isStarred ? "#f59e0b" : "none"} color={isStarred ? "#f59e0b" : "currentColor"} />
              </button>
            </div>

            {providerInfo && (
              <span className="char-counter" style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>
                <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                {providerInfo}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Barre de statut / notifications */}
      {statusMessage && (
        <div style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {statusMessage}
        </div>
      )}
    </div>
  );
}

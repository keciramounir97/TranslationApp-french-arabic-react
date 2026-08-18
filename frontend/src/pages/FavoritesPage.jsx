import React, { useState, useEffect } from 'react';
import { Star, Trash2, ArrowRight, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

export default function FavoritesPage() {
  const { t } = useLanguage();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await api.get('/favorites');
      setFavorites(res.data.favorites || []);
    } catch (err) {
      console.error('Erreur chargement favoris:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (id) => {
    try {
      await api.delete(`/favorites/${id}`);
      setFavorites(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error('Erreur suppression favori:', err);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <Star size={24} color="#f59e0b" fill="#f59e0b" />
        <span>{t('favorites')}</span>
      </h2>

      {loading ? (
        <div>Chargement des favoris...</div>
      ) : favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          Aucune traduction enregistrée dans les favoris. Clique sur l'étoile ★ sur la page principale pour enregistrer une traduction !
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {favorites.map((fav) => (
            <div
              key={fav.id}
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.25rem',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  {fav.from.toUpperCase()} <ArrowRight size={12} style={{ display: 'inline' }} /> {fav.to.toUpperCase()}
                </div>
                <div style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {fav.sourceText}
                </div>
                <div style={{ color: 'var(--accent-primary)', fontWeight: 500, fontSize: '1.05rem', marginTop: '0.25rem' }}>
                  {fav.translatedText}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="icon-btn" onClick={() => handleCopy(fav.translatedText, fav.id)} title={t('copy')}>
                  {copiedId === fav.id ? <Check size={18} color="#10b981" /> : <Copy size={18} />}
                </button>
                <button className="icon-btn" onClick={() => handleRemoveFavorite(fav.id)} title={t('removeFavorite')}>
                  <Trash2 size={18} color="#ef4444" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

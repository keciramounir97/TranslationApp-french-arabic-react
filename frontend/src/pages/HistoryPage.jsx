import React, { useState, useEffect } from 'react';
import { History, Search, Trash2, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

export default function HistoryPage() {
  const { t } = useLanguage();
  const [historyItems, setHistoryItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/history');
      setHistoryItems(res.data.history || []);
    } catch (err) {
      console.error('Erreur chargement historique:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await api.delete(`/history/${id}`);
      setHistoryItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Erreur suppression:', err);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Voulez-vous vraiment effacer tout votre historique ?')) return;
    try {
      await api.delete('/history');
      setHistoryItems([]);
    } catch (err) {
      console.error('Erreur nettoyage:', err);
    }
  };

  const filteredHistory = historyItems.filter(item =>
    item.sourceText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.translatedText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="glass-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={24} color="var(--accent-primary)" />
          <span>{t('history')}</span>
        </h2>

        {historyItems.length > 0 && (
          <button className="btn-primary" onClick={handleClearAll} style={{ background: '#ef4444', padding: '0.5rem 1rem' }}>
            <Trash2 size={16} />
            <span>{t('clearHistory')}</span>
          </button>
        )}
      </div>

      {/* Barre de recherche */}
      <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
        <Search size={18} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
        <input
          type="text"
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
          placeholder={t('searchHistory')}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div>Chargement...</div>
      ) : filteredHistory.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
          Aucun élément dans l'historique de traduction.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                display: 'flex',
                justify: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                  {item.from.toUpperCase()} <ArrowRight size={12} style={{ display: 'inline' }} /> {item.to.toUpperCase()} • {new Date(item.timestamp).toLocaleString()}
                </div>
                <div style={{ fontWeight: 600, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                  {item.sourceText}
                </div>
                <div style={{ color: 'var(--accent-primary)', fontSize: '1rem', marginTop: '0.25rem' }}>
                  {item.translatedText}
                </div>
              </div>

              <button className="icon-btn" onClick={() => handleDeleteItem(item.id)} title="Supprimer">
                <Trash2 size={18} color="#ef4444" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

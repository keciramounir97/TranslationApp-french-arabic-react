import React, { useState } from 'react';
import { BookOpen, Search, Volume2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import AudioPlayer from '../components/AudioPlayer';
import api from '../services/api';

export default function DictionaryPage() {
  const { t } = useLanguage();
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!word.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await api.get(`/dictionary/lookup?word=${encodeURIComponent(word.trim())}&lang=en`);
      setResult(res.data);
    } catch (err) {
      console.error('Erreur dictionnaire:', err);
      setError('Mot non trouvé dans le dictionnaire.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <BookOpen size={24} color="var(--accent-primary)" />
        <span>{t('dictionary')}</span>
      </h2>

      <form onSubmit={handleLookup} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder={t('searchWord')}
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary" disabled={loading || !word.trim()}>
          {loading ? '...' : t('lookup')}
        </button>
      </form>

      {error && <div style={{ color: '#ef4444', textAlign: 'center', padding: '1rem' }}>{error}</div>}

      {result && (
        <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)' }}>{result.word}</h3>
              {result.phonetic && <span style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>{result.phonetic}</span>}
            </div>
            <AudioPlayer text={result.word} lang="en" />
          </div>

          {result.meanings && result.meanings.map((meaning, idx) => (
            <div key={idx} style={{ marginTop: '1.25rem' }}>
              <div style={{ fontStyle: 'italic', fontWeight: 600, color: 'var(--accent-primary)', textTransform: 'lowercase', marginBottom: '0.5rem' }}>
                {meaning.partOfSpeech}
              </div>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {meaning.definitions && meaning.definitions.map((defObj, dIdx) => (
                  <li key={dIdx}>
                    <div style={{ color: 'var(--text-primary)' }}>{defObj.definition}</div>
                    {defObj.example && (
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', marginTop: '0.2rem' }}>
                        "{defObj.example}"
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

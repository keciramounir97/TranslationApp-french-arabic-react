import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer({ text, lang = "fr" }) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!text || !text.trim()) return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Annuler tout audio en cours
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;

      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = () => setSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback audio élément HTML5 via l'API TTS backend
      const audioUrl = `/api/translate/tts?text=${encodeURIComponent(text)}&lang=${lang}`;
      const audio = new Audio(audioUrl);
      setSpeaking(true);
      audio
        .play()
        .then(() => {
          audio.onended = () => setSpeaking(false);
        })
        .catch(() => setSpeaking(false));
    }
  };

  return (
    <button
      className="icon-btn"
      onClick={handleSpeak}
      disabled={!text || !text.trim()}
      title="Écouter la prononciation"
    >
      {speaking ? <VolumeX size={18} color="#ef4444" /> : <Volume2 size={18} />}
    </button>
  );
}

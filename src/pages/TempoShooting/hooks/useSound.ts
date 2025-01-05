import { useState, useCallback, useEffect } from 'react';

export function useSound() {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const context = new AudioContext();
    setAudioContext(context);
    return () => {
      context.close();
    };
  }, []);

  const playMetronomeSound = useCallback(() => {
    if (!isSoundEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Fréquence plus élevée pour un son plus aigu et net
    oscillator.frequency.value = 1200;
    
    // Volume plus faible
    gainNode.gain.value = 0.05;

    // Durée plus courte (50ms au lieu de 100ms)
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    oscillator.stop(audioContext.currentTime + 0.05);
  }, [isSoundEnabled, audioContext]);

  return {
    isSoundEnabled,
    toggleSound: () => setIsSoundEnabled(prev => !prev),
    playMetronomeSound
  };
}
import { useCallback, useEffect, useRef, useState } from "react";

// Wrapper around the browser's SpeechSynthesis API.
// Provides speak(), cancel(), and a `speaking` flag. Autoplay-safe: browsers
// require a prior user gesture, so we expose an `enabled` flag and only speak
// after the user interacts (handled by the parent via a "Start" button).
export function useSpeech() {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);
    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback(
    (text: string, opts?: { rate?: number; pitch?: number; robot?: boolean }) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = opts?.rate ?? 1;
      utter.pitch = opts?.pitch ?? (opts?.robot ? 0.6 : 1);
      utter.volume = 1;
      // Prefer an English voice; when robot=true prefer a deeper male voice for effect.
      const voices = voicesRef.current;
      const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
      const preferred = opts?.robot
        ? en.find((v) => /male|david|daniel|fred|alex/i.test(v.name)) ?? en[0]
        : en.find((v) => /female|samantha|karen|zira|google us english/i.test(v.name)) ?? en[0];
      if (preferred) utter.voice = preferred;
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    },
    [supported]
  );

  const cancel = useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return { speak, cancel, speaking, supported };
}

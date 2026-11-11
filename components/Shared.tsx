"use client";

import { useEffect, useRef, useState } from "react";
import {
  Listener,
  canListen,
  canSpeak,
  estimateSeconds,
  listen,
  pauseSpeaking,
  resumeSpeaking,
  speak,
  stopSpeaking,
} from "@/lib/speech";

// ---------- TextBlock ----------

export function TextBlock({ text, autoSpeak = false }: { text: string; autoSpeak?: boolean }) {
  useEffect(() => {
    if (!autoSpeak) return;
    const t = window.setTimeout(() => speak(text), 300);
    return () => {
      window.clearTimeout(t);
      stopSpeaking();
    };
  }, [text, autoSpeak]);
  return <p className="textblock teaching-enter">{text}</p>;
}

// Grows a textarea to fit its text: one line when empty, up to a limit.
export function autoGrow(el: HTMLTextAreaElement) {
  el.style.height = "auto";
  const h = Math.min(Math.max(el.scrollHeight, 42), 320);
  el.style.height = h + "px";
  el.style.overflowY = el.scrollHeight > 320 ? "auto" : "hidden";
}

// ---------- InputCapture: type or speak ----------
// The textarea is deliberately UNCONTROLLED (ref, no value/onChange state).
// A controlled textarea here caused the "screen refreshes on every letter" bug.

export function InputCapture({
  onSubmit,
  submitLabel = "continue →",
  placeholder = "",
  initialText = "",
  clearOnSubmit = false,
  disabled = false,
}: {
  onSubmit: (text: string) => void;
  submitLabel?: string;
  placeholder?: string;
  initialText?: string;
  clearOnSubmit?: boolean;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const listener = useRef<Listener | null>(null);
  const [listening, setListening] = useState(false);
  const [micAvailable, setMicAvailable] = useState(() => canListen());
  const [note, setNote] = useState("");

  useEffect(() => () => listener.current?.stop(), []);

  const grow = () => {
    const el = ref.current;
    if (el) autoGrow(el);
  };

  // Size correctly when the box opens with text already in it.
  useEffect(() => {
    if (ref.current) autoGrow(ref.current);
  }, []);

  const toggleMic = () => {
    if (listening) {
      listener.current?.stop();
      return;
    }
    stopSpeaking();
    const el = ref.current;
    const base = el && el.value.trim() ? el.value.trim() + " " : "";
    const l = listen({
      onText: (finalText, interim) => {
        if (!ref.current) return;
        ref.current.value = base + finalText + interim;
        grow();
      },
      onStop: (reason) => {
        listener.current = null;
        setListening(false);
        if (reason === "denied") {
          setMicAvailable(false);
          setNote("The microphone is not available here. Typing works the same way.");
        } else if (reason === "error") {
          setNote("Listening stopped. Tap the microphone to continue, or type.");
        }
      },
    });
    if (!l) {
      setMicAvailable(false);
      return;
    }
    listener.current = l;
    setNote("");
    setListening(true);
  };

  const submit = () => {
    const text = ref.current?.value.trim() ?? "";
    if (disabled) return;
    if (!text) {
      setNote("Write or say something first.");
      ref.current?.focus();
      return;
    }
    setNote("");
    listener.current?.stop();
    if (clearOnSubmit && ref.current) {
      ref.current.value = "";
      grow();
    }
    onSubmit(text);
  };

  return (
    <div style={{ width: "100%" }}>
      <textarea
        ref={ref}
        className="field"
        defaultValue={initialText}
        placeholder={placeholder}
        aria-label={placeholder || "Write here"}
        rows={1}
        onInput={() => {
          grow();
          if (note) setNote("");
        }}
        onKeyDown={(e) => {
          // On a keyboard, Enter sends and Shift+Enter makes a new line.
          // On a phone, Enter makes a new line and the button sends.
          const touch = window.matchMedia?.("(pointer: coarse)").matches;
          if (e.key === "Enter" && !e.shiftKey && !touch && !e.nativeEvent.isComposing) {
            e.preventDefault();
            submit();
          }
        }}
      />
      <div className="input-row">
        {micAvailable ? (
          <button
            type="button"
            className={"mic" + (listening ? " on" : "")}
            onClick={toggleMic}
            aria-label={listening ? "Stop listening" : "Speak instead of typing"}
            aria-pressed={listening}
          >
            {listening ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2" width="12" height="12" rx="2" fill="currentColor" /></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            )}
          </button>
        ) : (
          <span />
        )}
        <span className="note" style={{ flex: 1 }} aria-live="polite">
          {listening ? "listening... tap the square when you are done" : note}
        </span>
        <button type="button" className="btn" onClick={submit} disabled={disabled}>
          {submitLabel}
        </button>
      </div>
    </div>
  );
}

// ---------- GuidedSit: full-screen, voice-led, eyes closed ----------

export function GuidedSit({
  label,
  text,
  seconds,
  gapMs = 900,
  onDone,
  onExit,
}: {
  label: string;
  text: string;
  seconds?: number; // fixed length; if absent, sized to the spoken guidance
  gapMs?: number;
  onDone: () => void;
  onExit: () => void;
}) {
  const total = seconds ?? Math.max(40, estimateSeconds(text, gapMs) + 12);
  const [elapsed, setElapsed] = useState(0);
  const [paused, setPaused] = useState(false);
  const [showText, setShowText] = useState(() => !canSpeak());
  const speechDone = useRef(false);
  const finished = useRef(false);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  });

  useEffect(() => {
    speechDone.current = false;
    finished.current = false;
    if (!canSpeak()) speechDone.current = true;
    const t = window.setTimeout(() => speak(text, { gapMs, onDone: () => (speechDone.current = true) }), 600);
    return () => {
      window.clearTimeout(t);
      stopSpeaking();
    };
  }, [text, gapMs]);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setElapsed((e) => e + 0.25), 250);
    return () => window.clearInterval(t);
  }, [paused]);

  useEffect(() => {
    if (finished.current) return;
    // End on time, but never cut the voice off mid-sentence (30s grace).
    if (elapsed >= total && (speechDone.current || elapsed >= total + 30)) {
      finished.current = true;
      doneRef.current();
    }
  }, [elapsed, total]);

  const togglePause = () => {
    if (paused) resumeSpeaking();
    else pauseSpeaking();
    setPaused(!paused);
  };

  const R = 108;
  const C = 2 * Math.PI * R;
  const progress = Math.min(1, elapsed / total);
  const remaining = Math.max(0, Math.ceil(total - elapsed));

  return (
    <main className="screen dark fade-in">
      <div className="topbar">
        <button className="quiet" onClick={onExit}>← leave</button>
        <span className="label">{label}</span>
        <span style={{ width: 52 }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <div className="ring-wrap" role="timer" aria-label={`${remaining} seconds remaining`}>
          <svg viewBox="0 0 230 230" aria-hidden="true">
            <circle cx="115" cy="115" r={R} fill="none" stroke="rgba(242,237,228,0.12)" strokeWidth="1.5" />
            <circle cx="115" cy="115" r={R} fill="none" stroke="var(--canopy)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
          </svg>
          <div className="breath-circle" style={paused ? { animationPlayState: "paused" } : undefined} />
        </div>
        <p className="note" style={{ color: "var(--sky)", marginTop: 22, textAlign: "center" }}>
          {paused ? "paused" : "eyes closed · the voice will guide you"}
        </p>
        {showText && (
          <p className="serif fade-in" style={{ maxWidth: 440, fontSize: 19, lineHeight: 1.65, fontStyle: "italic", textAlign: "center", color: "var(--fog)", marginTop: 8 }}>
            {text}
          </p>
        )}
      </div>
      <div className="topbar" style={{ marginBottom: 0, marginTop: 20 }}>
        <button className="quiet" onClick={() => setShowText(!showText)}>{showText ? "hide text" : "show text"}</button>
        <button className="quiet" onClick={togglePause}>{paused ? "resume" : "pause"}</button>
        <button className="quiet" onClick={() => { if (!finished.current) { finished.current = true; onDone(); } }}>skip →</button>
      </div>
    </main>
  );
}

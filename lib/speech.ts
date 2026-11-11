"use client";

// Voice output (browser text-to-speech) and voice input (browser speech
// recognition). Both are optional: every caller must work when they are absent.

const PREFERRED_VOICES = ["Daniel", "Samantha", "Google UK English Male", "Karen", "Rishi", "Google UK English Female"];

let cachedVoice: SpeechSynthesisVoice | null = null;
let runId = 0;

function synth(): SpeechSynthesis | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  return window.speechSynthesis;
}

function pickVoice(): SpeechSynthesisVoice | null {
  const s = synth();
  if (!s) return null;
  if (cachedVoice) return cachedVoice;
  const voices = s.getVoices();
  if (!voices.length) return null;
  for (const name of PREFERRED_VOICES) {
    const v = voices.find((x) => x.name.includes(name));
    if (v) return (cachedVoice = v);
  }
  cachedVoice = voices.find((v) => v.lang?.startsWith("en")) ?? voices[0];
  return cachedVoice;
}

export function initVoices() {
  const s = synth();
  if (!s) return;
  pickVoice();
  s.onvoiceschanged = () => {
    cachedVoice = null;
    pickVoice();
  };
}

export function canSpeak(): boolean {
  return synth() !== null;
}

function sentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

// Speaks sentence by sentence. Short utterances avoid the Chrome bug that cuts
// long speech off after ~15 seconds, and the gap between them sets the pace.
export function speak(text: string, opts: { gapMs?: number; onDone?: () => void } = {}) {
  const s = synth();
  const done = opts.onDone ?? (() => {});
  if (!s || !text.trim()) {
    done();
    return;
  }
  const id = ++runId;
  s.cancel();
  const parts = sentences(text);
  const gap = opts.gapMs ?? 500;
  let i = 0;
  const next = () => {
    if (id !== runId) return;
    if (i >= parts.length) {
      done();
      return;
    }
    const u = new SpeechSynthesisUtterance(parts[i++]);
    const v = pickVoice();
    if (v) {
      u.voice = v;
      u.lang = v.lang;
    }
    u.rate = 0.82;
    u.pitch = 0.95;
    let advanced = false;
    const advance = () => {
      if (advanced) return;
      advanced = true;
      window.setTimeout(next, gap);
    };
    u.onend = advance;
    u.onerror = advance;
    s.speak(u);
  };
  next();
}

export function stopSpeaking() {
  runId++;
  synth()?.cancel();
}

export function pauseSpeaking() {
  synth()?.pause();
}

export function resumeSpeaking() {
  synth()?.resume();
}

// Rough spoken length at the rate above, including gaps between sentences.
export function estimateSeconds(text: string, gapMs = 500): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(words / 2.1 + (sentences(text).length * gapMs) / 1000);
}

// ---------- voice input ----------

type RecognitionResultEvent = {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
};
type Recognition = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((e: RecognitionResultEvent) => void) | null;
  onerror: ((e: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
  abort: () => void;
};

function recognitionCtor(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => Recognition;
    webkitSpeechRecognition?: new () => Recognition;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function canListen(): boolean {
  return recognitionCtor() !== null;
}

export type Listener = { stop: () => void };

// Keeps listening until stop() is called. Browsers end recognition after a
// silence, so it is restarted for as long as the user has not tapped stop.
export function listen(handlers: {
  onText: (finalText: string, interimText: string) => void;
  onStop: (reason: "user" | "denied" | "error") => void;
}): Listener | null {
  const Ctor = recognitionCtor();
  if (!Ctor) return null;

  let stopped = false;
  let finalText = "";
  let restarts = 0;
  let rec: Recognition | null = null;

  const finish = (reason: "user" | "denied" | "error") => {
    if (stopped) return;
    stopped = true;
    try {
      rec?.stop();
    } catch {}
    handlers.onStop(reason);
  };

  const start = () => {
    rec = new Ctor();
    rec.lang = "en-IN";
    rec.continuous = true;
    rec.interimResults = true;
    rec.onresult = (e) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) finalText += r[0].transcript.trim() + " ";
        else interim += r[0].transcript;
      }
      handlers.onText(finalText, interim);
    };
    rec.onerror = (e) => {
      if (e.error === "not-allowed" || e.error === "service-not-allowed" || e.error === "audio-capture") {
        finish("denied");
      } else if (e.error !== "no-speech" && e.error !== "aborted") {
        finish("error");
      }
    };
    rec.onend = () => {
      if (stopped) return;
      if (restarts++ > 40) return finish("error");
      try {
        start();
      } catch {
        finish("error");
      }
    };
    rec.start();
  };

  try {
    start();
  } catch {
    return null;
  }

  return { stop: () => finish("user") };
}

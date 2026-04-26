"use client";

import { useState, useRef, useEffect } from "react";

type Phase =
  | "input"
  | "loading"
  | "step2"
  | "step3"
  | "phaseA"
  | "phaseB"
  | "phaseC"
  | "teaching"
  | "crisis"
  | "soft_crisis";

interface SessionData {
  step2_reflection?: string;
  step3_question?: string | null;
  phaseA_scan?: string;
  phaseB_breath?: string;
  phaseC_anicca?: string;
  teaching?: string;
  anthology_tag?: string;
  message?: string;
  type?: string;
}

interface Props {
  inputMode: "voice" | "text";
  onEnd: () => void;
}

const BODY_KEYWORDS = /\b(chest|throat|stomach|belly|shoulders|head|jaw|hands|tight|tense|heavy|pain|ache|pressure|flutter|warmth|numbness|tingling|breath|heart|racing|knot|clench)\b/i;

function speak(text: string) {
  if (typeof window === "undefined") return;
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 0.82;
  utt.pitch = 0.95;
  utt.volume = 1;
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v =>
    v.name.includes("Daniel") ||
    v.name.includes("Samantha") ||
    v.name.includes("Google UK English Male") ||
    v.name.includes("Karen")
  );
  if (preferred) utt.voice = preferred;
  window.speechSynthesis.speak(utt);
}

function TextBlock({ text, autoSpeak = false }: { text: string; autoSpeak?: boolean }) {
  useEffect(() => {
    if (autoSpeak) {
      const timer = setTimeout(() => speak(text), 300);
      return () => clearTimeout(timer);
    }
  }, [text, autoSpeak]);

  return (
    <p
      className="serif teaching-enter"
      style={{
        fontSize: "clamp(18px, 4vw, 24px)",
        lineHeight: 1.65,
        color: "var(--bark)",
        textAlign: "center",
        maxWidth: 460,
        margin: "0 auto",
        fontWeight: 300,
        fontStyle: "italic",
      }}
    >
      {text}
    </p>
  );
}

function PhaseTimer({ duration, onComplete, label }: { duration: number; onComplete: () => void; label: string }) {
  const [remaining, setRemaining] = useState(duration);

  useEffect(() => {
    if (remaining <= 0) { onComplete(); return; }
    const t = setTimeout(() => setRemaining(r => r - 1), 1000);
    return () => clearTimeout(t);
  }, [remaining, onComplete]);

  const pct = ((duration - remaining) / duration) * 100;

  return (
    <div style={{ textAlign: "center", marginTop: 32 }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        margin: "0 auto 12px",
        position: "relative",
        background: "var(--fog)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <svg style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="28" fill="none" stroke="var(--fog)" strokeWidth="3" />
          <circle
            cx="32" cy="32" r="28" fill="none"
            stroke="var(--moss)" strokeWidth="3"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - pct / 100)}`}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <span style={{ fontSize: 14, color: "var(--dusk)", fontWeight: 300 }}>{remaining}</span>
      </div>
      <p style={{ fontSize: 11, color: "var(--sky)", letterSpacing: "0.12em", textTransform: "uppercase" }}>{label}</p>
    </div>
  );
}

export default function SessionFlow({ inputMode, onEnd }: Props) {
  const [phase, setPhase] = useState<Phase>("input");
  const [userText, setUserText] = useState("");
  const [step3Answer, setStep3Answer] = useState("");
  const [sessionData, setSessionData] = useState<SessionData>({});
  const [isRecording, setIsRecording] = useState(false);
  const [savedToAnthology, setSavedToAnthology] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputMode === "voice") startListening();
    else textareaRef.current?.focus();
  }, []);

  function startListening() {
    const SR = window.SpeechRecognition || (window as unknown as { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) { setPhase("input"); return; }
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = "en-IN";
    rec.onresult = e => {
      const transcript = e.results[0][0].transcript;
      setUserText(transcript);
      setIsRecording(false);
    };
    rec.onerror = () => setIsRecording(false);
    rec.onend = () => setIsRecording(false);
    recognitionRef.current = rec;
    rec.start();
    setIsRecording(true);
  }

  async function submitInput(text: string) {
    if (!text.trim()) return;
    const hasBodyInfo = BODY_KEYWORDS.test(text);
    setPhase("loading");

    try {
      const res = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput: text, hasBodyInfo }),
      });
      const data: SessionData = await res.json();
      setSessionData(data);

      if (data.type === "crisis") setPhase("crisis");
      else if (data.type === "soft_crisis") setPhase("soft_crisis");
      else setPhase("step2");
    } catch {
      setPhase("input");
    }
  }

  async function submitStep3(answer: string) {
    // Merge step3 answer context, proceed to body scan
    setPhase("phaseA");
    speak(sessionData.phaseA_scan || "");
  }

  function Nav({ label, onClick }: { label: string; onClick: () => void }) {
    return (
      <button
        onClick={onClick}
        style={{
          marginTop: 36,
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 13,
          color: "var(--dusk)",
          letterSpacing: "0.1em",
          padding: "8px 0",
          transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--bark)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--dusk)")}
      >
        {label} →
      </button>
    );
  }

  const Shell = ({ children }: { children: React.ReactNode }) => (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      background: "var(--cream)",
      position: "relative",
    }}>
      {/* Back/close */}
      <button
        onClick={onEnd}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "var(--sky)",
          fontSize: 20,
          lineHeight: 1,
          padding: 8,
          transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "var(--bark)")}
        onMouseLeave={e => (e.currentTarget.style.color = "var(--sky)")}
        aria-label="Return home"
      >
        ←
      </button>
      {children}
    </div>
  );

  // PHASE: INPUT
  if (phase === "input") {
    return (
      <Shell>
        <div style={{ width: "100%", maxWidth: 480, textAlign: "center" }}>
          {inputMode === "voice" ? (
            <div className="slide-up">
              <button
                onClick={isRecording ? undefined : startListening}
                className={isRecording ? "recording-pulse" : ""}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: isRecording ? "var(--ember)" : "var(--bark)",
                  border: "none",
                  cursor: isRecording ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  transition: "background 0.3s",
                }}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                </svg>
              </button>
              <p className="serif" style={{ fontSize: 18, color: "var(--dusk)", fontStyle: "italic", marginBottom: 16 }}>
                {isRecording ? "listening…" : "tap to speak"}
              </p>
              {userText && (
                <div style={{ marginTop: 20 }}>
                  <p style={{ fontSize: 14, color: "var(--bark)", opacity: 0.7, marginBottom: 16, fontStyle: "italic" }}>
                    "{userText}"
                  </p>
                  <button
                    onClick={() => submitInput(userText)}
                    style={{
                      background: "var(--bark)",
                      color: "var(--cream)",
                      border: "none",
                      borderRadius: 2,
                      padding: "12px 28px",
                      fontSize: 13,
                      letterSpacing: "0.1em",
                      cursor: "pointer",
                    }}
                  >
                    continue
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="slide-up">
              <textarea
                ref={textareaRef}
                value={userText}
                onChange={e => setUserText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submitInput(userText);
                  }
                }}
                placeholder=""
                style={{
                  width: "100%",
                  minHeight: 120,
                  background: "transparent",
                  border: "none",
                  borderBottom: "1px solid var(--sky)",
                  outline: "none",
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 20,
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "var(--bark)",
                  lineHeight: 1.6,
                  resize: "none",
                  padding: "8px 0",
                  display: "block",
                  marginBottom: 24,
                }}
              />
              <button
                onClick={() => submitInput(userText)}
                disabled={!userText.trim()}
                style={{
                  background: userText.trim() ? "var(--bark)" : "var(--fog)",
                  color: userText.trim() ? "var(--cream)" : "var(--sky)",
                  border: "none",
                  borderRadius: 2,
                  padding: "12px 28px",
                  fontSize: 13,
                  letterSpacing: "0.1em",
                  cursor: userText.trim() ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
              >
                continue
              </button>
            </div>
          )}
        </div>
      </Shell>
    );
  }

  // PHASE: LOADING
  if (phase === "loading") {
    return (
      <Shell>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--dusk)",
            margin: "0 auto",
            animation: "breathe 1.5s ease-in-out infinite",
          }} />
        </div>
      </Shell>
    );
  }

  // PHASE: STEP 2 — AI Reflection
  if (phase === "step2") {
    return (
      <Shell>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <TextBlock text={sessionData.step2_reflection || ""} autoSpeak={true} />
          <Nav
            label={sessionData.step3_question ? "continue" : "begin the scan"}
            onClick={() => {
              if (sessionData.step3_question) setPhase("step3");
              else {
                setPhase("phaseA");
                speak(sessionData.phaseA_scan || "");
              }
            }}
          />
        </div>
      </Shell>
    );
  }

  // PHASE: STEP 3 — Clarifying question
  if (phase === "step3") {
    return (
      <Shell>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <TextBlock text={sessionData.step3_question || ""} autoSpeak={true} />
          <textarea
            value={step3Answer}
            onChange={e => setStep3Answer(e.target.value)}
            style={{
              width: "100%",
              marginTop: 32,
              background: "transparent",
              border: "none",
              borderBottom: "1px solid var(--sky)",
              outline: "none",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 18,
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--bark)",
              resize: "none",
              padding: "8px 0",
              minHeight: 60,
            }}
          />
          <Nav label="begin the scan" onClick={() => submitStep3(step3Answer)} />
        </div>
      </Shell>
    );
  }

  // PHASE A — Body Scan
  if (phase === "phaseA") {
    return (
      <Shell>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--sky)", textTransform: "uppercase", marginBottom: 32 }}>
            body scan
          </p>
          <TextBlock text={sessionData.phaseA_scan || ""} />
          <PhaseTimer
            duration={38}
            label="observe"
            onComplete={() => {
              setPhase("phaseB");
              speak(sessionData.phaseB_breath || "");
            }}
          />
        </div>
      </Shell>
    );
  }

  // PHASE B — Ānāpāna Breath
  if (phase === "phaseB") {
    return (
      <Shell>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--sky)", textTransform: "uppercase", marginBottom: 32 }}>
            the breath
          </p>
          <TextBlock text={sessionData.phaseB_breath || ""} />
          <PhaseTimer
            duration={38}
            label="watch the breath"
            onComplete={() => {
              setPhase("phaseC");
              speak(sessionData.phaseC_anicca || "");
            }}
          />
        </div>
      </Shell>
    );
  }

  // PHASE C — Anicca Reframe
  if (phase === "phaseC") {
    return (
      <Shell>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--sky)", textTransform: "uppercase", marginBottom: 32 }}>
            anicca
          </p>
          <TextBlock text={sessionData.phaseC_anicca || ""} />
          <PhaseTimer
            duration={30}
            label="this too will pass"
            onComplete={() => {
              setPhase("teaching");
              speak(sessionData.teaching || "");
            }}
          />
        </div>
      </Shell>
    );
  }

  // PHASE: Teaching Surface
  if (phase === "teaching") {
    return (
      <Shell>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--sky)", textTransform: "uppercase", marginBottom: 40 }}>
            a teaching
          </p>

          <div style={{
            borderLeft: "2px solid var(--dusk)",
            paddingLeft: 24,
            marginBottom: 40,
            textAlign: "left",
          }}>
            <p
              className="serif teaching-enter"
              style={{
                fontSize: "clamp(16px, 3.5vw, 21px)",
                lineHeight: 1.7,
                color: "var(--bark)",
                fontWeight: 300,
                fontStyle: "italic",
                margin: 0,
              }}
            >
              {sessionData.teaching}
            </p>
          </div>

          {sessionData.anthology_tag && (
            <p
              className="teaching-enter"
              style={{
                fontSize: 12,
                color: "var(--sky)",
                fontStyle: "italic",
                animationDelay: "0.8s",
                opacity: 0,
                marginBottom: 32,
              }}
            >
              {sessionData.anthology_tag}
            </p>
          )}

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => { setSavedToAnthology(true); }}
              disabled={savedToAnthology}
              style={{
                background: savedToAnthology ? "var(--moss)" : "var(--bark)",
                color: "var(--cream)",
                border: "none",
                borderRadius: 2,
                padding: "12px 24px",
                fontSize: 13,
                letterSpacing: "0.08em",
                cursor: savedToAnthology ? "default" : "pointer",
                transition: "background 0.3s",
              }}
            >
              {savedToAnthology ? "saved to anthology" : "save to anthology"}
            </button>
            <button
              onClick={onEnd}
              style={{
                background: "none",
                border: "1px solid var(--sky)",
                color: "var(--dusk)",
                borderRadius: 2,
                padding: "12px 24px",
                fontSize: 13,
                letterSpacing: "0.08em",
                cursor: "pointer",
              }}
            >
              return
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  // CRISIS SCREEN
  if (phase === "crisis") {
    return (
      <Shell>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <p className="serif" style={{ fontSize: 22, lineHeight: 1.7, color: "var(--bark)", fontStyle: "italic", marginBottom: 40 }}>
            {sessionData.message}
          </p>
          <div style={{
            background: "var(--fog)",
            borderRadius: 4,
            padding: 28,
            textAlign: "left",
            marginBottom: 32,
          }}>
            <p style={{ fontSize: 13, color: "var(--dusk)", marginBottom: 16, letterSpacing: "0.05em" }}>
              people who can be with you right now:
            </p>
            <p style={{ fontSize: 15, color: "var(--bark)", marginBottom: 8 }}>
              <strong style={{ fontWeight: 400 }}>iCall</strong> — 9152987821
            </p>
            <p style={{ fontSize: 15, color: "var(--bark)", marginBottom: 8 }}>
              <strong style={{ fontWeight: 400 }}>Vandrevala Foundation</strong> — 1860-2662-345
            </p>
            <p style={{ fontSize: 13, color: "var(--sage)", marginTop: 16 }}>
              iCall also has chat at icallhelpline.org — if calling feels hard.
            </p>
            <p style={{ fontSize: 12, color: "var(--sky)", marginTop: 12 }}>
              If you're in immediate danger, please call 112.
            </p>
          </div>
          <button onClick={onEnd} style={{
            background: "none", border: "none", color: "var(--dusk)",
            fontSize: 13, cursor: "pointer", letterSpacing: "0.08em",
          }}>
            ← return
          </button>
        </div>
      </Shell>
    );
  }

  // SOFT CRISIS
  if (phase === "soft_crisis") {
    return (
      <Shell>
        <div style={{ maxWidth: 460, textAlign: "center" }}>
          <p className="serif" style={{ fontSize: 22, lineHeight: 1.7, color: "var(--bark)", fontStyle: "italic", marginBottom: 40 }}>
            {sessionData.message}
          </p>
          <button onClick={onEnd} style={{
            background: "none", border: "none", color: "var(--dusk)",
            fontSize: 13, cursor: "pointer", letterSpacing: "0.08em",
          }}>
            ← return
          </button>
        </div>
      </Shell>
    );
  }

  return null;
}

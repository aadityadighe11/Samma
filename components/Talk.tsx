"use client";

import { useEffect, useRef, useState } from "react";
import { InputCapture } from "./Shared";
import { canSpeak, speak, stopSpeaking } from "@/lib/speech";

export type TeachingCard = { id: string; title: string; source: string; gist: string; lessonId: string };

export type TalkTurn =
  | { role: "user"; text: string }
  | { role: "model"; text: string; teachings: TeachingCard[]; suggestAnchor: boolean };

type Status =
  | { name: "idle" }
  | { name: "loading" }
  | { name: "crisis" | "soft_crisis"; message: string }
  | { name: "error"; message: string };

export default function Talk({
  thread,
  setThread,
  onHome,
  onOpenLesson,
  onAnchor,
}: {
  thread: TalkTurn[];
  setThread: (t: TalkTurn[]) => void;
  onHome: () => void;
  onOpenLesson: (lessonId: string) => void;
  onAnchor: (text: string) => void;
}) {
  const [status, setStatus] = useState<Status>({ name: "idle" });
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [voice] = useState(() => canSpeak());
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => () => stopSpeaking(), []);

  useEffect(() => {
    if (thread.length || status.name !== "idle") bottom.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [thread.length, status.name]);

  const send = async (history: TalkTurn[]) => {
    stopSpeaking();
    setSpeakingIndex(null);
    setThread(history);
    setStatus({ name: "loading" });
    try {
      const res = await fetch("/api/talk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.map((t) => ({ role: t.role, text: t.text })) }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          name: "error",
          message:
            res.status === 429
              ? "Too many people are here at this moment. Wait a minute, then try again."
              : "The connection did not hold. What you said is still here.",
        });
        return;
      }
      if (d.type === "crisis" || d.type === "soft_crisis") {
        setStatus({ name: d.type, message: d.message });
        return;
      }
      setThread([
        ...history,
        { role: "model", text: d.reply, teachings: d.teachings ?? [], suggestAnchor: !!d.suggestAnchor },
      ]);
      setStatus({ name: "idle" });
    } catch {
      setStatus({ name: "error", message: "The connection did not hold. What you said is still here." });
    }
  };

  const lastUserText = [...thread].reverse().find((t) => t.role === "user")?.text ?? "";
  const awaitingReply = thread.length > 0 && thread[thread.length - 1].role === "user";

  const toggleSpeak = (i: number, text: string) => {
    if (speakingIndex === i) {
      stopSpeaking();
      setSpeakingIndex(null);
      return;
    }
    setSpeakingIndex(i);
    speak(text, { onDone: () => setSpeakingIndex(null) });
  };

  return (
    <main className="screen">
      <div className="topbar">
        <button className="quiet" onClick={onHome}>← home</button>
        <span className="label">Talk it through</span>
        {thread.length > 0 ? (
          <button className="quiet" onClick={() => { stopSpeaking(); setThread([]); setStatus({ name: "idle" }); }}>start over</button>
        ) : (
          <span style={{ width: 62 }} />
        )}
      </div>

      <div className="column" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: thread.length ? "flex-start" : "center", paddingBottom: 30 }}>
        {thread.length === 0 && status.name === "idle" && (
          <div className="fade-in" style={{ marginBottom: 28 }}>
            <p className="textblock">What is troubling you?</p>
            <p className="note" style={{ textAlign: "center", maxWidth: 420, margin: "14px auto 0" }}>
              Type or speak, in your own words. You will hear what Goenka&rsquo;s teaching says about it.
            </p>
          </div>
        )}

        {thread.map((t, i) =>
          t.role === "user" ? (
            <p key={i} className="turn-user">{t.text}</p>
          ) : (
            <section key={i} className="slide-up" aria-label="Response">
              <div className="turn-reply">
                {t.text.split(/\n+/).map((p, n) => <p key={n}>{p}</p>)}
              </div>
              {voice && (
                <button className="quiet" style={{ padding: "0 0 12px", fontSize: 13 }} onClick={() => toggleSpeak(i, t.text)}>
                  {speakingIndex === i ? "■ stop" : "▸ listen"}
                </button>
              )}
              {t.teachings.map((c) => (
                <div key={c.id} className="card">
                  <div className="card-title">{c.title}</div>
                  <div className="card-source">The Art of Living · {c.source}</div>
                  <div className="card-body">{c.gist}</div>
                  <button className="card-link" onClick={() => onOpenLesson(c.lessonId)}>practise this in Daily Practice →</button>
                </div>
              ))}
              {t.suggestAnchor && (
                <div className="card">
                  <div className="card-body" style={{ marginTop: 0 }}>This is active in you right now. It can be observed directly, for three minutes.</div>
                  <button className="card-link" onClick={() => onAnchor(lastUserText)}>sit with it in Anchor →</button>
                </div>
              )}
            </section>
          )
        )}

        {status.name === "loading" && (
          <p className="serif fade-in" style={{ fontStyle: "italic", color: "var(--stone)", fontSize: 19 }} role="status">listening…</p>
        )}

        {(status.name === "crisis" || status.name === "soft_crisis") && (
          <div className="fade-in" style={{ marginTop: 10 }}>
            <p className="textblock">{status.message}</p>
          </div>
        )}

        {status.name === "error" && (
          <div className="fade-in" style={{ margin: "8px 0 18px" }}>
            <p className="serif" style={{ fontSize: 19, fontStyle: "italic" }}>{status.message}</p>
            {awaitingReply && <button className="btn" onClick={() => send(thread)}>try again</button>}
          </div>
        )}

        {status.name !== "loading" && status.name !== "crisis" && !(status.name === "error" && awaitingReply) && (
          <div style={{ marginTop: thread.length ? 30 : 0 }}>
            <InputCapture
              onSubmit={(text) => send([...thread, { role: "user", text }])}
              submitLabel={thread.length ? "say more →" : "continue →"}
              placeholder={thread.length ? "Say more, or ask about what you just read…" : ""}
              clearOnSubmit
            />
          </div>
        )}

        <p className="note" style={{ marginTop: 26 }}>
          Generated by AI from S.N. Goenka&rsquo;s teaching in <em>The Art of Living</em>. Not a teacher or a therapist. Nothing is saved.
        </p>
        <div ref={bottom} />
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import { LESSONS, LESSONS_BY_ID, Lesson } from "@/lib/lessons";
import { GuidedSit } from "./Shared";
import { speak } from "@/lib/speech";

const KEY = "samma_lessons_complete";

function loadComplete(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function saveComplete(ids: string[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {}
}

export default function DailyPractice({
  lessonId,
  onHome,
  onAnchor,
}: {
  lessonId?: string;
  onHome: () => void;
  onAnchor: () => void;
}) {
  const [complete, setComplete] = useState<string[]>(() => loadComplete());
  const [openId, setOpenId] = useState<string | null>(lessonId && LESSONS_BY_ID[lessonId] ? lessonId : null);
  const [linked] = useState<string | null>(lessonId ?? null);
  const [sitting, setSitting] = useState(false);
  const [sat, setSat] = useState(false);

  const open = (id: string | null) => {
    setSat(false);
    setOpenId(id);
    window.scrollTo(0, 0);
  };

  const lesson: Lesson | null = openId ? LESSONS_BY_ID[openId] : null;

  // Completed lessons, the next one, and any lesson reached from Anchor or Talk.
  const nextIndex = LESSONS.findIndex((l) => !complete.includes(l.id));
  const visible = LESSONS.filter(
    (l, i) => complete.includes(l.id) || i === nextIndex || l.id === linked
  );

  if (lesson && sitting && lesson.guidance && lesson.sitSeconds) {
    return (
      <GuidedSit
        label={`lesson ${lesson.number} · ${Math.round(lesson.sitSeconds / 60)} min`}
        text={lesson.guidance}
        seconds={lesson.sitSeconds}
        gapMs={2600}
        onExit={() => setSitting(false)}
        onDone={() => {
          setSitting(false);
          setSat(true);
          // Eyes are closed, so the end has to be heard.
          window.setTimeout(() => speak("The sitting is over. Open your eyes when you are ready."), 500);
        }}
      />
    );
  }

  if (lesson) {
    const done = complete.includes(lesson.id);
    return (
      <main className="screen fade-in">
        <div className="topbar">
          <button className="quiet" onClick={() => open(null)}>← lessons</button>
          <span className="label">Daily Practice</span>
          <span style={{ width: 62 }} />
        </div>
        <article className="column" style={{ maxWidth: 520 }}>
          <div className="label">Lesson {lesson.number}</div>
          <h1 className="serif" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.15, margin: "8px 0 6px" }}>{lesson.title}</h1>
          <div className="card-source" style={{ marginBottom: 26 }}>From The Art of Living · {lesson.source}</div>

          <div className="prose">
            {lesson.teaching.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <hr className="rule" />

          <div className="label" style={{ marginBottom: 10 }}>The practice</div>
          <p className="serif" style={{ fontSize: 19, fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>{lesson.instruction}</p>

          {lesson.sitSeconds && lesson.guidance && (
            <div style={{ margin: "22px 0 4px" }}>
              <button className="btn" onClick={() => setSitting(true)}>
                {sat ? "sit again" : `begin the sit · ${Math.round(lesson.sitSeconds / 60)} min`}
              </button>
              <p className="note" style={{ marginTop: 10 }}>A voice guides the first minute, then leaves you with it. Sound on, eyes closed.</p>
            </div>
          )}

          {lesson.reflection && (
            <div style={{ marginTop: 26 }}>
              <div className="label" style={{ marginBottom: 8 }}>Reflection</div>
              <p className="serif" style={{ fontSize: 19, lineHeight: 1.55, margin: "0 0 10px" }}>{lesson.reflection}</p>
              {/* Uncontrolled on purpose, and never saved: this is for the writer only. */}
              <textarea className="field" rows={3} aria-label="Reflection (not saved)" style={{ fontSize: 18 }} />
              <p className="note" style={{ marginTop: 6 }}>Not saved anywhere. Writing it is the point.</p>
            </div>
          )}

          {lesson.closing && (
            <p className="serif" style={{ fontSize: 20, fontStyle: "italic", marginTop: 28 }}>{lesson.closing}</p>
          )}

          <div style={{ marginTop: 30 }}>
            {done ? (
              <span className="note">· completed</span>
            ) : (
              <button
                className="btn"
                onClick={() => {
                  const next = [...complete, lesson.id];
                  setComplete(next);
                  saveComplete(next);
                  open(null);
                }}
              >
                mark complete
              </button>
            )}
          </div>

          <div className="card" style={{ marginTop: 34 }}>
            <div className="card-body" style={{ marginTop: 0 }}>{lesson.anchorNote}</div>
            <button className="card-link" onClick={onAnchor}>open Anchor →</button>
          </div>
        </article>
      </main>
    );
  }

  return (
    <main className="screen fade-in">
      <div className="topbar">
        <button className="quiet" onClick={onHome}>← home</button>
        <span className="label">Daily Practice</span>
        <span style={{ width: 52 }} />
      </div>
      <div className="column">
        <p className="serif" style={{ fontSize: 21, lineHeight: 1.55, margin: "6px 0 22px" }}>
          Ten lessons that follow the order of a Vipassana course, each five to seven minutes. One opens after the one before it.
        </p>
        <div>
          {visible.map((l) => (
            <button key={l.id} className="lesson-row" onClick={() => open(l.id)}>
              <span className="lesson-dot" aria-label={complete.includes(l.id) ? "completed" : undefined}>{complete.includes(l.id) ? "·" : ""}</span>
              <span className="lesson-num">{String(l.number).padStart(2, "0")}</span>
              <span className="lesson-title">{l.title}</span>
              <span className="lesson-time">{l.minutes} min</span>
            </button>
          ))}
        </div>
        {nextIndex === -1 && (
          <p className="note" style={{ marginTop: 20 }}>All ten are open. They are meant to be returned to.</p>
        )}
        <p className="note" style={{ marginTop: 30 }}>
          Based on S.N. Goenka&rsquo;s teaching as presented in <em>The Art of Living</em> by William Hart. The full technique is taught in 10-day courses: dhamma.org.
        </p>
      </div>
    </main>
  );
}

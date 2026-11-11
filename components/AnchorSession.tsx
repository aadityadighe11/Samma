"use client";

import { useEffect, useState } from "react";
import Tree from "./Tree";
import { GuidedSit, InputCapture, TextBlock } from "./Shared";
import { stopSpeaking } from "@/lib/speech";
import { failureMessage } from "@/lib/errors";

type Practice = {
  plan: string;
  bodyScan: string;
  breath: string;
  anicca: string;
  teaching: string;
  dailyPracticeLink: { lessonId: string; lessonTitle: string };
};

type Phase =
  | { name: "input" }
  | { name: "loading" }
  | { name: "reflection"; reflection: string; question: string | null }
  | { name: "plan"; practice: Practice }
  | { name: "practice"; practice: Practice; step: 0 | 1 | 2 }
  | { name: "teaching"; practice: Practice }
  | { name: "crisis"; message: string }
  | { name: "soft_crisis"; message: string }
  | { name: "error"; message: string; retry: () => void };

async function post(payload: unknown) {
  const res = await fetch("/api/reflect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.reason || "other");
  return data;
}

const STEPS = [
  { key: "bodyScan", label: "the body" },
  { key: "breath", label: "the breath" },
  { key: "anicca", label: "anicca · change" },
] as const;

export default function AnchorSession({
  initialText = "",
  onHome,
  onOpenLesson,
}: {
  initialText?: string;
  onHome: () => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const [phase, setPhase] = useState<Phase>({ name: "input" });
  const [userInput, setUserInput] = useState("");

  useEffect(() => () => stopSpeaking(), []);

  const fail = (retry: () => void) => (err: unknown) => {
    setPhase({
      name: "error",
      message: failureMessage(err instanceof Error ? err.message : undefined, "What you wrote has not been lost."),
      retry,
    });
  };

  const runTurn2 = (input: string, reflection: string, answer: string) => {
    stopSpeaking();
    setPhase({ name: "loading" });
    post({ turn: 2, userInput: input, reflection, questionAnswer: answer })
      .then((d) => {
        if (d.type === "crisis" || d.type === "soft_crisis") return setPhase({ name: d.type, message: d.message });
        setPhase({ name: "plan", practice: d as Practice });
      })
      .catch(fail(() => runTurn2(input, reflection, answer)));
  };

  const runTurn1 = (input: string) => {
    setUserInput(input);
    setPhase({ name: "loading" });
    post({ turn: 1, userInput: input })
      .then((d) => {
        if (d.type === "crisis" || d.type === "soft_crisis") return setPhase({ name: d.type, message: d.message });
        setPhase({ name: "reflection", reflection: d.reflection, question: d.question });
      })
      .catch(fail(() => runTurn1(input)));
  };

  if (phase.name === "practice") {
    const step = STEPS[phase.step];
    const { practice } = phase;
    return (
      <GuidedSit
        key={step.key}
        label={`${phase.step + 1} of 3 · ${step.label}`}
        text={practice[step.key]}
        onExit={onHome}
        onDone={() =>
          phase.step < 2
            ? setPhase({ name: "practice", practice, step: (phase.step + 1) as 1 | 2 })
            : setPhase({ name: "teaching", practice })
        }
      />
    );
  }

  return (
    <main className="screen">
      <div className="topbar">
        <button className="quiet" onClick={onHome}>← home</button>
        <span className="label">Anchor</span>
        <span style={{ width: 52 }} />
      </div>

      <div className="column" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingBottom: 40 }}>
        {phase.name === "input" && (
          <div className="fade-in">
            <p className="textblock" style={{ marginBottom: 30 }}>What is present right now?</p>
            <InputCapture onSubmit={runTurn1} initialText={initialText} placeholder="Type here, or tap the mic" submitLabel="continue →" />
            <p className="note" style={{ marginTop: 22 }}>Type or speak. A sentence is enough. Nothing is saved.</p>
          </div>
        )}

        {phase.name === "loading" && (
          <div className="fade-in" style={{ textAlign: "center" }}>
            <Tree size={200} />
            <p className="serif" style={{ fontStyle: "italic", color: "var(--stone)", fontSize: 19 }} role="status">listening…</p>
          </div>
        )}

        {phase.name === "reflection" && (
          <div>
            <TextBlock text={phase.question ? `${phase.reflection} ${phase.question}` : phase.reflection} autoSpeak />
            <div className="fade-in-slow" style={{ marginTop: 34 }}>
              {phase.question ? (
                <InputCapture
                  onSubmit={(answer) => runTurn2(userInput, phase.reflection, answer)}
                  placeholder="chest, throat, stomach..."
                  submitLabel="continue →"
                />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <button className="btn" onClick={() => runTurn2(userInput, phase.reflection, "")}>continue →</button>
                </div>
              )}
            </div>
          </div>
        )}

        {phase.name === "plan" && (
          <div style={{ textAlign: "center" }}>
            <TextBlock
              text={phase.practice.plan || "For the next three minutes you will observe the body, then the breath, then how the sensation changes."}
              autoSpeak
            />
            <p className="note fade-in-slow" style={{ margin: "26px auto 26px", maxWidth: 400 }}>
              Sound on. Sit upright. Close your eyes when you begin. A voice will guide you.
            </p>
            <button className="btn fade-in-slow" onClick={() => { stopSpeaking(); setPhase({ name: "practice", practice: phase.practice, step: 0 }); }}>
              begin the practice →
            </button>
          </div>
        )}

        {phase.name === "teaching" && (
          <div>
            <div className="label" style={{ textAlign: "center", marginBottom: 18 }}>the teaching</div>
            <TextBlock text={phase.practice.teaching} autoSpeak />
            <div className="card fade-in-slow" style={{ marginTop: 34 }}>
              <div className="label">Continue this thread in Daily Practice</div>
              <div className="card-title" style={{ marginTop: 6 }}>{phase.practice.dailyPracticeLink.lessonTitle}</div>
              <button className="card-link" onClick={() => onOpenLesson(phase.practice.dailyPracticeLink.lessonId)}>open the lesson →</button>
            </div>
            <div style={{ textAlign: "center", marginTop: 22 }}>
              <button className="quiet" onClick={onHome}>return home</button>
            </div>
          </div>
        )}

        {(phase.name === "crisis" || phase.name === "soft_crisis") && (
          <div className="fade-in">
            <p className="textblock">{phase.message}</p>
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button className="quiet" onClick={onHome}>← return</button>
            </div>
          </div>
        )}

        {phase.name === "error" && (
          <div className="fade-in" style={{ textAlign: "center" }}>
            <p className="textblock" style={{ marginBottom: 26 }}>{phase.message}</p>
            <button className="btn" onClick={phase.retry}>try again</button>
          </div>
        )}
      </div>
    </main>
  );
}

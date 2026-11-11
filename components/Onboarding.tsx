"use client";

import { useState } from "react";
import Tree from "./Tree";

const CARDS = [
  "Samma means right understanding. Not feeling better. Seeing clearly.",
  "When a feeling, a thought or a tension is present, the app helps you meet it directly. Through the body.",
  "Three ways in. Anchor: when you need ground right now. Talk it through: say what is troubling you and hear what the teaching says about it. Daily Practice: build the foundation over time.",
];

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const last = i === CARDS.length - 1;
  return (
    <main className="screen dark center" style={{ position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.13, pointerEvents: "none" }} aria-hidden="true">
        <Tree size={420} />
      </div>
      <div className="column" style={{ position: "relative", textAlign: "center" }}>
        <p key={i} className="textblock fade-in" style={{ minHeight: 190, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {CARDS[i]}
        </p>
        {last && (
          <p className="note fade-in" style={{ color: "var(--sky)", maxWidth: 380, margin: "0 auto 8px" }}>
            This is not a 10-day course, a teacher or a therapist. It is a bridge back to the practice in daily life.
          </p>
        )}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", margin: "22px 0 30px" }} aria-hidden="true">
          {CARDS.map((_, n) => (
            <span key={n} style={{ width: 6, height: 6, borderRadius: 3, background: n === i ? "var(--parchment)" : "rgba(242,237,228,0.25)" }} />
          ))}
        </div>
        <button className="btn" onClick={() => (last ? onDone() : setI(i + 1))}>
          {last ? "Begin" : "Next"}
        </button>
        <div style={{ marginTop: 18, minHeight: 36 }}>
          {!last && <button className="quiet" onClick={onDone}>skip</button>}
          {i > 0 && <button className="quiet" style={{ marginLeft: last ? 0 : 18 }} onClick={() => setI(i - 1)}>back</button>}
        </div>
      </div>
    </main>
  );
}

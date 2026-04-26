"use client";

import { useState } from "react";
import HomeScreen from "@/components/HomeScreen";
import SessionFlow from "@/components/SessionFlow";

export type AppPhase = "home" | "session";

export default function Page() {
  const [phase, setPhase] = useState<AppPhase>("home");
  const [inputMode, setInputMode] = useState<"voice" | "text">("text");

  const startSession = (mode: "voice" | "text") => {
    setInputMode(mode);
    setPhase("session");
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--cream)" }}>
      {phase === "home" && (
        <HomeScreen onStart={startSession} />
      )}
      {phase === "session" && (
        <SessionFlow
          inputMode={inputMode}
          onEnd={() => setPhase("home")}
        />
      )}
    </main>
  );
}

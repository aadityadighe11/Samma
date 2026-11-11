"use client";

import { useEffect, useState } from "react";
import Onboarding from "@/components/Onboarding";
import HomeScreen from "@/components/HomeScreen";
import AnchorSession from "@/components/AnchorSession";
import DailyPractice from "@/components/DailyPractice";
import Talk, { TalkTurn } from "@/components/Talk";
import { initVoices, stopSpeaking } from "@/lib/speech";

type Screen =
  | { name: "boot" }
  | { name: "onboarding" }
  | { name: "home" }
  | { name: "anchor"; initialText?: string; key: number }
  | { name: "talk" }
  | { name: "daily-practice"; lessonId?: string; key: number };

const ONBOARDED = "samma_onboarded";

export default function Page() {
  const [screen, setScreen] = useState<Screen>({ name: "boot" });
  // The Talk conversation lives here so it survives a visit to a lesson and
  // back. It is held in memory only and is gone when the page is closed.
  const [thread, setThread] = useState<TalkTurn[]>([]);

  useEffect(() => {
    initVoices();
    let seen = false;
    try {
      seen = window.localStorage.getItem(ONBOARDED) === "1";
    } catch {}
    // Reading localStorage must wait until the page is in the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setScreen(seen ? { name: "home" } : { name: "onboarding" });
  }, []);

  const go = (next: Screen) => {
    stopSpeaking();
    window.scrollTo(0, 0);
    setScreen(next);
  };
  const home = () => go({ name: "home" });
  const openLesson = (lessonId: string) => go({ name: "daily-practice", lessonId, key: Date.now() });

  switch (screen.name) {
    case "boot":
      return <main className="screen" />;
    case "onboarding":
      return (
        <Onboarding
          onDone={() => {
            try {
              window.localStorage.setItem(ONBOARDED, "1");
            } catch {}
            home();
          }}
        />
      );
    case "home":
      return (
        <HomeScreen
          onAnchor={() => go({ name: "anchor", key: Date.now() })}
          onTalk={() => go({ name: "talk" })}
          onDaily={() => go({ name: "daily-practice", key: Date.now() })}
        />
      );
    case "anchor":
      return <AnchorSession key={screen.key} initialText={screen.initialText} onHome={home} onOpenLesson={openLesson} />;
    case "talk":
      return (
        <Talk
          thread={thread}
          setThread={setThread}
          onHome={home}
          onOpenLesson={openLesson}
          onAnchor={(text) => go({ name: "anchor", initialText: text, key: Date.now() })}
        />
      );
    case "daily-practice":
      return (
        <DailyPractice
          key={screen.key}
          lessonId={screen.lessonId}
          onHome={home}
          onAnchor={() => go({ name: "anchor", key: Date.now() })}
        />
      );
  }
}

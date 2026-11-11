"use client";

import Tree from "./Tree";

type Props = {
  onAnchor: () => void;
  onTalk: () => void;
  onDaily: () => void;
};

export default function HomeScreen({ onAnchor, onTalk, onDaily }: Props) {
  return (
    <main className="screen center fade-in">
      <h1 className="wordmark" style={{ fontWeight: 400, margin: "0 0 10px" }}>Samma</h1>
      <Tree size={220} />
      <nav className="tiles" style={{ marginTop: 18 }} aria-label="Ways to practise">
        <button className="tile" onClick={onAnchor}>
          <svg className="tile-icon" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
            <circle cx="17" cy="17" r="13" />
            <circle cx="17" cy="17" r="3" fill="currentColor" stroke="none" />
          </svg>
          <span>
            <span className="tile-title" style={{ display: "block" }}>Anchor</span>
            <span className="tile-sub" style={{ display: "block" }}>Find ground when you need it. A three-minute guided observation.</span>
          </span>
        </button>
        <button className="tile" onClick={onTalk}>
          <svg className="tile-icon" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 8h22v15H16l-6 5v-5H6z" />
            <path d="M12 13.5h10M12 17.5h6" />
          </svg>
          <span>
            <span className="tile-title" style={{ display: "block" }}>Talk it through</span>
            <span className="tile-sub" style={{ display: "block" }}>Say or type what is troubling you. Hear what the teaching says about it.</span>
          </span>
        </button>
        <button className="tile" onClick={onDaily}>
          <svg className="tile-icon" viewBox="0 0 34 34" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
            <path d="M17 30V14" />
            <path d="M17 20c-7 0-10-4-10-10 6 0 10 3 10 10zM17 16c0-6 3-10 10-11 0 7-4 11-10 11z" />
          </svg>
          <span>
            <span className="tile-title" style={{ display: "block" }}>Daily Practice</span>
            <span className="tile-sub" style={{ display: "block" }}>Ten short lessons, one step at a time.</span>
          </span>
        </button>
      </nav>
    </main>
  );
}

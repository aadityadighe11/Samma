"use client";

import Tree from "./Tree";

interface Props {
  onStart: (mode: "voice" | "text") => void;
}

export default function HomeScreen({ onStart }: Props) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        background: "var(--cream)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 30%, rgba(139,115,85,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* App name */}
      <div className="fade-in" style={{ animationDelay: "0.2s", opacity: 0, marginBottom: 8 }}>
        <span
          className="serif"
          style={{
            fontSize: 13,
            letterSpacing: "0.28em",
            color: "var(--dusk)",
            textTransform: "uppercase",
            fontWeight: 400,
          }}
        >
          Samma
        </span>
      </div>

      {/* Tree */}
      <div className="fade-in-slow" style={{ animationDelay: "0.5s", opacity: 0, marginBottom: 40 }}>
        <Tree size={280} />
      </div>

      {/* Input options */}
      <div
        className="fade-in"
        style={{
          animationDelay: "1.2s",
          opacity: 0,
          display: "flex",
          gap: 20,
          alignItems: "center",
        }}
      >
        {/* Mic button */}
        <button
          onClick={() => onStart("voice")}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "var(--bark)",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "var(--moss)")}
          onMouseLeave={e => (e.currentTarget.style.background = "var(--bark)")}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          aria-label="Voice input"
          title="Speak what's present"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--cream)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="23" />
            <line x1="8" y1="23" x2="16" y2="23" />
          </svg>
        </button>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 28,
            background: "var(--sky)",
            opacity: 0.6,
          }}
        />

        {/* Text button */}
        <button
          onClick={() => onStart("text")}
          style={{
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "transparent",
            border: "1.5px solid var(--dusk)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease, border-color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--bark)")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--dusk)")}
          onMouseDown={e => (e.currentTarget.style.transform = "scale(0.95)")}
          onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
          aria-label="Text input"
          title="Write what's present"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--bark)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </button>
      </div>

      {/* Quiet label */}
      <div
        className="fade-in"
        style={{
          animationDelay: "1.8s",
          opacity: 0,
          marginTop: 20,
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "var(--sky)",
            letterSpacing: "0.08em",
            margin: 0,
            textAlign: "center",
          }}
        >
          speak · or · write
        </p>
      </div>
    </div>
  );
}

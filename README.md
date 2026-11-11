# Samma

A Vipassana-rooted practice app grounded in S.N. Goenka's teaching. Three tiles:

- **Anchor** — say what is present → reflection → one body question → three-minute voice-guided observation → teaching → linked lesson.
- **Talk it through** — type or speak what is troubling you → a contextual response with 1–2 sourced teachings from *The Art of Living*.
- **Daily Practice** — ten short lessons with guided sits.

## Run locally

```
npm install
copy .env.example .env.local     (then paste your Gemini key into .env.local)
npm run dev
```

Open http://localhost:3000. To try the flows without a key: set `SAMMA_MOCK=1` in `.env.local` (canned responses).

## Deploy (Vercel)

Push to GitHub; Vercel redeploys. In Vercel → Settings → Environment Variables set `GEMINI_API_KEY`.
Optional `GEMINI_MODEL` (default `gemini-3.6-flash`) — change it there when Google retires a model; no code change needed.

## Where things live

- `lib/teachings.ts` — the teaching index the Talk tile draws from (edit wording or add entries here)
- `lib/lessons.ts` — the ten Daily Practice lessons
- `lib/gemini.ts` — AI call, voice/safety rules shared by both AI routes
- `app/api/reflect`, `app/api/talk` — the two AI endpoints and their prompts
- `components/Shared.tsx` — text/voice input, guided-sit timer, helpline card

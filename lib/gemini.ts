// Server-side helper for the Gemini API. Uses plain fetch so there is no SDK
// to go out of date. The model is configurable because Google retires model
// names roughly once a year (gemini-2.0-flash stopped working on 1 June 2026).

const DEFAULT_MODELS = ["gemini-3.6-flash", "gemini-flash-latest"];

export type ChatTurn = { role: "user" | "model"; text: string };

export class AiError extends Error {
  status: number;
  constructor(message: string, status = 502) {
    super(message);
    this.status = status;
  }
}

function extractJson(raw: string): unknown {
  const cleaned = raw
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) return JSON.parse(cleaned.slice(start, end + 1));
    throw new AiError("The model did not return valid JSON.");
  }
}

export async function generateJson<T>(system: string, turns: ChatTurn[]): Promise<T> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AiError("GEMINI_API_KEY is not configured on the server.", 500);

  const models = process.env.GEMINI_MODEL
    ? [process.env.GEMINI_MODEL, ...DEFAULT_MODELS]
    : DEFAULT_MODELS;

  const body = JSON.stringify({
    systemInstruction: { parts: [{ text: system }] },
    contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
    generationConfig: { responseMimeType: "application/json", temperature: 0.6 },
  });

  let lastError = "No model responded.";
  let lastStatus = 502;
  for (const model of models) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body,
      }
    );
    if (res.ok) {
      const data = await res.json();
      const text: string | undefined = data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text ?? "")
        .join("");
      if (!text) {
        lastError = "The model returned an empty response.";
        continue;
      }
      return extractJson(text) as T;
    }
    const detail = await res.text().catch(() => "");
    lastError = `Gemini ${model} responded ${res.status}: ${detail.slice(0, 300)}`;
    lastStatus = res.status === 429 ? 429 : 502;
    // A retired or unknown model name gives 404 — try the next one. Anything else is final.
    if (res.status !== 404) break;
  }
  console.error("[samma] " + lastError);
  throw new AiError(lastError, lastStatus);
}

// ---------- shared prompt pieces ----------

export const PHILOSOPHY = `PHILOSOPHICAL CONSTRAINTS (non-negotiable):
- Vedanā (body sensation) is always the entry point. Name the sensation-layer, not the story-layer.
- Equanimity over escape. Never try to make the user feel better. Help them see clearly.
- Anicca as lived fact: point to impermanence as something to observe, not as philosophy or consolation.
- The goal is clear seeing, not comfort.

FORBIDDEN words and phrases: "feel better," "relax," "calm down," "let it go," "release," "fix," "amazing," "great job," "I'm so glad," "I'm sorry to hear"
REQUIRED orientation: "see clearly," "observe," "notice," "what is present," "arising and passing"

VOICE CHARACTER:
- Measured, unhurried. No warmth-performance. No exclamation marks.
- Speak like someone who has sat with reality long enough to speak from it, not about it.
- Neither clinical nor therapist-warm. Plain words. Short sentences.`;

export const SAFETY = `SAFETY — check this before anything else:
- If the message contains suicidal thoughts, intent to self-harm, intent to harm someone else, or signs of psychosis → type "crisis". The message field is 2 short sentences: acknowledge plainly that what they are carrying is heavy, and say that this needs a person, not an app. Do not give any practice or teaching.
- If there are markers of severe, lasting depression or trauma without acute danger → type "soft_crisis". The message field is 2-3 short sentences: say plainly that this deserves the support of a qualified person, and that the practice can sit alongside that support, not replace it.
- Never diagnose. Never give medical advice. Never tell anyone to stop medication or treatment.`;

// A last line of defence that does not depend on the model.
const CRISIS_PATTERNS = [
  /\bkill(ing)? myself\b/i,
  /\bend(ing)? my life\b/i,
  /\bsuicid/i,
  /\bwant to die\b/i,
  /\bdon'?t want to (live|be alive)\b/i,
  /\bbetter off dead\b/i,
  /\b(hurt|harm|cut)(ting)? myself\b/i,
  /\bself[- ]harm/i,
  /\bno reason to live\b/i,
  /\bkill (him|her|them)\b/i,
];

export function looksLikeCrisis(text: string): boolean {
  return CRISIS_PATTERNS.some((re) => re.test(text));
}

export const CRISIS_MESSAGE =
  "What you are carrying is heavy, and it needs a person, not an app. Please reach one of the people below now.";

export function clip(value: unknown, max: number): string {
  return typeof value === "string" ? value.slice(0, max) : "";
}

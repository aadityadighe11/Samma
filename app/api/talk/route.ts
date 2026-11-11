import { NextRequest, NextResponse } from "next/server";
import {
  AiError,
  CRISIS_MESSAGE,
  ChatTurn,
  PHILOSOPHY,
  SAFETY,
  clip,
  generateJson,
  plain,
  reasonFor,
  looksLikeCrisis,
} from "@/lib/gemini";
import { TEACHINGS_BY_ID, teachingIndexForPrompt } from "@/lib/teachings";

const TALK_PROMPT = `You are the voice of Samma, a Vipassana-rooted app grounded in S.N. Goenka's teachings as presented in "The Art of Living" (William Hart). A person has come to talk through something that is troubling them. Your job is to listen accurately, then show them what this teaching says about their exact situation.

${PHILOSOPHY}

${SAFETY}

HOW TO RESPOND (type "talk"):
- reply: 3 to 6 short sentences, plain prose, no lists.
  1. First show you understood their specific situation, use their details, not a generic summary. One sentence.
  2. Then apply the teaching to it concretely: what, in this tradition, is actually happening in them (contact → sensation → reaction; craving; aversion; the story versus the sensation; impermanence; and so on). Make it about their case, their boss, their phone, their sleeplessness, not an abstract lecture.
  3. End with one small thing to observe, or one question that turns attention to what is present in the body. Never more than one question.
- This is a conversation. If there are earlier turns, build on them and do not repeat yourself. If they ask a direct question about the teaching, answer it directly.
- You are not a teacher or a therapist and must not claim to be. Do not teach the full Vipassana technique; if they ask to learn it properly, say that it is taught in 10-day courses (dhamma.org) and that this app is a bridge to practice in daily life.
- Do not give practical life advice (whether to quit the job, leave the partner, send the message). You may say plainly that the decision is theirs, and that it is seen more clearly once the reaction has been observed.
- Do not invent quotations. Do not put words in Goenka's or the Buddha's mouth. Paraphrase only.

- teachingIds: choose 1 or 2 ids from the TEACHING INDEX below that fit this person's situation most closely. Use only ids from the index. Prefer not to repeat ids already used earlier in the conversation unless nothing else fits.
- suggestAnchor: true if the person is in the middle of a strong reaction right now and would be served by a guided observation; otherwise false.

TEACHING INDEX (id | title | source | gist | fits):
${teachingIndexForPrompt()}

Respond ONLY with valid JSON. No markdown. No backticks. No preamble.
{"type":"talk","reply":"...","teachingIds":["..."],"suggestAnchor":false}
or {"type":"crisis","message":"..."} or {"type":"soft_crisis","message":"..."}`;

type TalkOut = {
  type?: string;
  reply?: string;
  teachingIds?: string[];
  suggestAnchor?: boolean;
  message?: string;
};

const MOCK: TalkOut = {
  type: "talk",
  reply:
    "You pick up the phone meaning to check one thing and an hour is gone. In this teaching, what is being chased is not the feed. It is a brief pleasant sensation, and when it fades the hand reaches again. The next time the urge to pick it up comes, wait a few breaths first. What does the urge feel like in the body before you act on it?",
  teachingIds: ["craving-for-sensation", "sankhara"],
  suggestAnchor: false,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const raw: unknown[] = Array.isArray(body?.messages) ? body.messages : [];
    const turns: ChatTurn[] = raw
      .slice(-12)
      .map((m) => {
        const item = m as { role?: string; text?: string };
        return {
          role: item.role === "model" ? ("model" as const) : ("user" as const),
          text: clip(item.text, 4000).trim(),
        };
      })
      .filter((m) => m.text);

    const last = turns[turns.length - 1];
    if (!last || last.role !== "user") {
      return NextResponse.json({ error: "Nothing was shared." }, { status: 400 });
    }
    while (turns.length && turns[0].role !== "user") turns.shift();

    if (looksLikeCrisis(last.text)) {
      return NextResponse.json({ type: "crisis", message: CRISIS_MESSAGE });
    }

    const out =
      process.env.SAMMA_MOCK === "1" ? MOCK : await generateJson<TalkOut>(TALK_PROMPT, turns);

    if (out.type === "crisis" || out.type === "soft_crisis") {
      return NextResponse.json({ type: out.type, message: plain(clip(out.message, 600)) || CRISIS_MESSAGE });
    }
    if (!out.reply) throw new AiError("The model returned an empty reply.");

    const teachings = (Array.isArray(out.teachingIds) ? out.teachingIds : [])
      .map((id) => TEACHINGS_BY_ID[id])
      .filter(Boolean)
      .slice(0, 2)
      .map((t) => ({ id: t.id, title: t.title, source: t.source, gist: t.gist, quote: t.quote, lessonId: t.lessonId }));

    return NextResponse.json({
      type: "talk",
      reply: plain(clip(out.reply, 1800)),
      teachings,
      suggestAnchor: out.suggestAnchor === true,
    });
  } catch (err) {
    const status = err instanceof AiError ? err.status : 500;
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message, reason: reasonFor(err) }, { status });
  }
}

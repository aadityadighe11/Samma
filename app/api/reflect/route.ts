import { NextRequest, NextResponse } from "next/server";
import { AiError, CRISIS_MESSAGE, PHILOSOPHY, SAFETY, clip, generateJson, plain, reasonFor, looksLikeCrisis } from "@/lib/gemini";
import { LESSONS_BY_ID } from "@/lib/lessons";

const TURN1_PROMPT = `You are the voice of Samma, a Vipassana-rooted mindfulness app grounded in S.N. Goenka's teachings.

${PHILOSOPHY}

${SAFETY}

For type "session":
- reflection: 1-2 sentences naming the sensation-layer beneath their story. Not the story. Not comfort. The body. Show that you understood their specific situation.
- question: One question that brings attention to body sensation ("Where in the body is this felt right now?" in words fitted to what they said). If the user already named a body location or sensation, set to null.

Respond ONLY with valid JSON. No markdown. No backticks. No preamble.
{"type":"session","reflection":"...","question":"..." or null}
or {"type":"crisis","message":"..."} or {"type":"soft_crisis","message":"..."}`;

const TURN2_PROMPT = `You are continuing a Samma session. The user has shared what is present and answered a grounding question. Now generate the complete guided practice. It will be read aloud slowly by a voice while the user sits with eyes closed, so write for the ear: short sentences, one instruction at a time.

${PHILOSOPHY}

Return these fields:
- plan: One sentence telling the user what the next three minutes will be, e.g. "For the next three minutes you will observe the tightness in the chest, then the breath, then how the sensation changes." Fit it to what they named.
- bodyScan: A guided observation of roughly 90-110 words, targeted to the location or sensation they named. Start at the named location. Slow, precise, Goenka-cadenced. Use "bring your attention to", "notice whatever is present there", "observe without reacting".
- breath: An ānāpāna breath anchor of roughly 90-110 words. Guide attention to the area below the nostrils, above the upper lip. Natural breath only, never instruct to breathe deeply or change the breath.
- anicca: Roughly 60-80 words. Point to the impermanence of the specific sensation present. Not as philosophy, as direct instruction to observe its arising and passing.
- teaching: 2-3 sentences from Goenka's tradition that speak directly to what was present. Not encouraging. Not comforting. True.
- dailyPracticeLink: choose the single most relevant lesson:
  lesson_01: The Starting Point: why we suffer (blame, reactions to external events)
  lesson_02: Vedanā: the body is the lab (clear body sensations)
  lesson_03: Ānāpāna: the breath as entry point (overwhelm, needing simplicity)
  lesson_04: Sīla: the ground of practice (guilt, conflict, harm)
  lesson_05: The story and the sensation (rumination, strong narrative, blame)
  lesson_06: Working with pain and resistance (physical pain, tension, resistance)
  lesson_07: Saṅkhāra: why patterns repeat (recurring patterns)
  lesson_08: Equanimity: observing without reacting (craving, aversion, wanting things different)
  lesson_09: Mettā: goodwill (interpersonal conflict, grief, hard sessions)
  lesson_10: Continuity: practice in daily life (general integration)

Respond ONLY with valid JSON. No markdown. No backticks.
{"plan":"...","bodyScan":"...","breath":"...","anicca":"...","teaching":"...","dailyPracticeLink":{"lessonId":"lesson_0X"}}`;

type Turn1 = { type?: string; reflection?: string; question?: string | null; message?: string };
type Turn2 = {
  plan?: string;
  bodyScan?: string;
  breath?: string;
  anicca?: string;
  teaching?: string;
  dailyPracticeLink?: { lessonId?: string };
};

const MOCK1: Turn1 = {
  type: "session",
  reflection:
    "Beneath the account of what happened, something is active in the body right now. That is where this can be seen clearly.",
  question: "Where in the body is this felt most strongly at this moment?",
};
const MOCK2: Turn2 = {
  plan: "For the next three minutes you will observe the sensation you named, then the breath, then how the sensation changes.",
  bodyScan:
    "Bring your attention to the place you named. Notice whatever is present there. Do not try to change it. Observe its edges. Observe its texture.",
  breath:
    "Now bring attention to the area below the nostrils, above the upper lip. Feel the breath entering. Feel the breath leaving. Do not change it.",
  anicca: "Return to the sensation. Is it the same as it was? Observe it arising. Observe it passing.",
  teaching:
    "The event is over. What remains is sensation, and the habit of reacting to it. Observed without reaction, it changes.",
  dailyPracticeLink: { lessonId: "lesson_05" },
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const turn = body?.turn === 2 ? 2 : 1;
    const userInput = clip(body?.userInput, 4000).trim();
    if (!userInput) return NextResponse.json({ error: "Nothing was shared." }, { status: 400 });

    if (looksLikeCrisis(userInput) || looksLikeCrisis(clip(body?.questionAnswer, 2000))) {
      return NextResponse.json({ type: "crisis", message: CRISIS_MESSAGE });
    }

    const mock = process.env.SAMMA_MOCK === "1";

    if (turn === 1) {
      const out = mock
        ? MOCK1
        : await generateJson<Turn1>(TURN1_PROMPT, [{ role: "user", text: `User shared: "${userInput}"` }]);
      if (out.type === "crisis" || out.type === "soft_crisis") {
        return NextResponse.json({ type: out.type, message: plain(clip(out.message, 600)) || CRISIS_MESSAGE });
      }
      if (!out.reflection) throw new AiError("The model returned an incomplete reflection.");
      return NextResponse.json({
        type: "session",
        reflection: plain(clip(out.reflection, 600)),
        question: out.question ? plain(clip(out.question, 300)) : null,
      });
    }

    const reflection = clip(body?.reflection, 600);
    const questionAnswer = clip(body?.questionAnswer, 2000).trim();
    const out = mock
      ? MOCK2
      : await generateJson<Turn2>(TURN2_PROMPT, [
          {
            role: "user",
            text: `User originally shared: "${userInput}"\nYour reflection was: "${reflection}"\nWhen asked where this lives in the body, they said: "${
              questionAnswer || "(they had already named a body sensation)"
            }"`,
          },
        ]);
    if (!out.bodyScan || !out.breath || !out.anicca || !out.teaching) {
      throw new AiError("The model returned an incomplete practice.");
    }
    const lesson = LESSONS_BY_ID[out.dailyPracticeLink?.lessonId ?? ""] ?? LESSONS_BY_ID["lesson_02"];
    return NextResponse.json({
      plan: plain(clip(out.plan, 400)),
      bodyScan: plain(clip(out.bodyScan, 1500)),
      breath: plain(clip(out.breath, 1500)),
      anicca: plain(clip(out.anicca, 1200)),
      teaching: plain(clip(out.teaching, 800)),
      dailyPracticeLink: { lessonId: lesson.id, lessonTitle: lesson.title },
    });
  } catch (err) {
    const status = err instanceof AiError ? err.status : 500;
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message, reason: reasonFor(err) }, { status });
  }
}

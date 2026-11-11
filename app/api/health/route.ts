import { NextResponse } from "next/server";
import { generateJson, reasonFor } from "@/lib/gemini";

// Open /api/health in the browser to see why AI responses are failing.
// It never reveals the key itself.
export const dynamic = "force-dynamic";

const ADVICE: Record<string, string> = {
  no_key: "GEMINI_API_KEY is not set in Vercel (Settings > Environment Variables). Add it for Production, then redeploy.",
  bad_key: "Google rejected the key. Create a new key at aistudio.google.com/apikey, replace GEMINI_API_KEY in Vercel, then redeploy.",
  quota: "The key works but its free quota is used up or not enabled. Check the key's project in Google AI Studio.",
  model: "The model name is not available for this key. Set GEMINI_MODEL in Vercel to a current Flash model listed in Google AI Studio, then redeploy.",
  other: "Unexpected error. Send the 'detail' text to Claude.",
};

export async function GET() {
  const keyConfigured = !!process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "(default) gemini-3.6-flash";
  if (process.env.SAMMA_MOCK === "1") return NextResponse.json({ ok: true, mock: true, keyConfigured, model });
  try {
    await generateJson<{ ok: boolean }>('Reply with exactly this JSON: {"ok":true}', [{ role: "user", text: "ping" }]);
    return NextResponse.json({ ok: true, keyConfigured, model });
  } catch (err) {
    const reason = reasonFor(err);
    return NextResponse.json({
      ok: false,
      keyConfigured,
      model,
      reason,
      whatToDo: ADVICE[reason],
      detail: err instanceof Error ? err.message.slice(0, 400) : "",
    });
  }
}

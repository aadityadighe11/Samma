// Daily Practice — ten lessons following the arc of Goenka's teaching as
// presented in "The Art of Living" (William Hart, 1987). Teaching text is
// Samma's own summary of each chapter's point, not quotation.

export type Lesson = {
  id: string;
  number: number;
  title: string;
  minutes: number;
  source: string;
  teaching: string[];
  // Optional exact passage from the book, shown under the teaching. Add
  //   quote: "…",
  // to any lesson below.
  quote?: string;
  instruction: string;
  sitSeconds?: number;
  guidance?: string;
  reflection?: string;
  closing?: string;
  anchorNote: string;
};

export const LESSONS: Lesson[] = [
  {
    id: "lesson_01",
    number: 1,
    title: "The Starting Point: Why We Suffer",
    minutes: 5,
    source: "Ch. 2 — The Starting Point · Ch. 4 — The Root of the Problem",
    teaching: [
      "Everyone suffers. The usual explanation is that something outside went wrong: a person, a situation, a piece of bad luck. Goenka's teaching begins by looking closer.",
      "Something makes contact with the senses or the mind. A sensation arises in the body. The mind reacts to that sensation — wanting more of it if it is pleasant, wanting it gone if it is unpleasant. This happens so quickly that it seems we are reacting to the outside world.",
      "The outside event is the occasion. The cause is the reaction. And if the reaction can be observed instead of obeyed, the chain is interrupted where it starts.",
    ],
    instruction:
      "Sit for three minutes. Find one sensation in the body. Do not name it good or bad. Only: it is present, it is arising, it is passing.",
    sitSeconds: 180,
    guidance:
      "Sit in any position that lets the back stay upright. Close the eyes. Let attention move to the body. Find one sensation. Any sensation. Warmth. Pressure. The touch of clothing. Do not look for a special one. Stay with it. Notice the urge to call it pleasant or unpleasant. Let that urge be there, and keep observing the sensation itself. Is it the same as a moment ago? Keep observing.",
    reflection: "What did you notice when you stopped trying to change what was there?",
    anchorNote: "When you catch yourself blaming a person or a situation, open Anchor.",
  },
  {
    id: "lesson_02",
    number: 2,
    title: "Vedanā: The Body Is the Lab",
    minutes: 6,
    source: "Ch. 3 — The Immediate Cause · Appendix A",
    teaching: [
      "Vedanā means sensation. In this teaching it is not a side detail. It is the hinge on which everything turns.",
      "Every emotion, every craving, every flash of irritation arrives with something physical: heat in the face, a tight throat, a drop in the stomach. This is not a figure of speech. It is how the mind's content becomes observable.",
      "The mind is hard to watch directly. The body is not. So the body becomes the laboratory. Change the relationship to sensation, and the relationship to everything built on it changes too.",
    ],
    instruction:
      "Four minutes. Move attention slowly from the top of the head to the feet. You are not looking for anything. Only noticing what is actually there.",
    sitSeconds: 240,
    guidance:
      "Close the eyes. Bring attention to the top of the head. Notice whatever is present there. Perhaps nothing clear. That is fine. Move to the face. The forehead. The eyes. The jaw. Notice temperature. Pressure. Tingling. Move to the neck and the shoulders. Do not try to loosen anything. Only observe. Move down each arm, to the hands. Now the chest. The stomach. Notice movement, heaviness, ease. The back, from top to bottom. The hips. Each leg, down to the feet. Where the body touches the floor. Wherever there is sensation, observe. Wherever there seems to be none, observe that, and move on.",
    reflection: "Did you find areas you usually ignore? What was it like to look without trying to fix?",
    anchorNote: "When an emotion shows up in the body, Anchor works with it directly.",
  },
  {
    id: "lesson_03",
    number: 3,
    title: "Ānāpāna: The Breath as Entry Point",
    minutes: 7,
    source: "Ch. 6 — The Training of Concentration",
    teaching: [
      "Before Vipassana comes Ānāpāna: awareness of the natural breath at the small area below the nostrils and above the upper lip.",
      "Not deep breathing. Not counted or controlled breathing. The breath exactly as it is — long or short, rough or fine. It is chosen because it is always present and cannot be imagined; it can only be observed.",
      "The mind will wander. That is not failure. Each time it is noticed and brought back, the mind gets a little steadier. That steadiness is what makes the rest of the practice possible.",
    ],
    instruction: "Five minutes of Ānāpāna. Natural breath only.",
    sitSeconds: 300,
    guidance:
      "Close the eyes. Bring attention to the area below the nostrils, above the upper lip. Feel the breath entering. Feel the breath leaving. Do not change it. If it is shallow, it is shallow. If it is deep, it is deep. Only observe. The mind will wander. When you notice it has gone, simply return. No frustration. No judgment. Just return. The wandering is not failure. The returning is the practice. Breath coming in. Breath going out. Stay with the touch of the breath.",
    closing: "This is Ānāpāna. The foundation of everything that follows.",
    anchorNote: "When everything feels like too much, Anchor begins here, with the breath.",
  },
  {
    id: "lesson_04",
    number: 4,
    title: "Sīla: The Ground of Practice",
    minutes: 5,
    source: "Ch. 5 — The Training of Moral Conduct",
    teaching: [
      "Sīla is usually translated as moral conduct. It is easy to hear that as a list of rules handed down from outside. That is not how it is taught here.",
      "An action that harms someone cannot be done with a quiet mind. Before the harsh word or the dishonest act, there is already agitation inside. And afterwards the agitation stays. A mind in that state cannot observe clearly.",
      "So the five precepts — not killing, not stealing, no sexual misconduct, no false speech, no intoxicants — describe the conditions under which the mind becomes still enough to see. They are ground to stand on, not a cage.",
    ],
    instruction:
      "Bring to mind one recent action — something said, done or chosen — that left a residue. Not to judge it. Only: what is still there? Where is it in the body? Sit with that sensation for two minutes.",
    sitSeconds: 120,
    guidance:
      "Close the eyes. Recall the action. Let the memory be there without arguing with it. Now move attention from the memory to the body. Where is the residue felt? The chest. The stomach. The face. Bring attention there. Observe the sensation. Not the reasons. Not the defence. Only the sensation, as it is, changing as it changes.",
    reflection: "What was the sensation like when it was observed without judgment?",
    anchorNote: "When guilt or a conflict with someone keeps returning, open Anchor.",
  },
  {
    id: "lesson_05",
    number: 5,
    title: "The Story and the Sensation",
    minutes: 6,
    source: "Ch. 4 — The Root of the Problem · Ch. 8 — Awareness and Equanimity",
    teaching: [
      "The mind produces narrative without rest: what happened, who was wrong, what should be said next time. None of this is forbidden. But it is not where the work happens.",
      "\"I am angry at her\" is a story. The tightness in the chest is the sensation. One can go round the story for years and only deepen it.",
      "When attention moves from the account of the anger to the physical fact of it, observation has begun. This is why the practice can reach what analysis cannot.",
    ],
    instruction:
      "Bring to mind something that has been occupying you — a worry, a resentment, a longing. For three minutes, each time the story starts, ask: where is this in the body right now?",
    sitSeconds: 180,
    guidance:
      "Close the eyes. Let the thing that has been occupying the mind come forward. The story will start. Let it. Now ask: where is this in the body, right now? Go there. Observe the sensation. The story will start again. That is expected. Ask again: where is this in the body? Return to the sensation. Let the story stay in the background, like a radio in another room. The sensation is in front. Observe it.",
    reflection: "What did you find when you stopped following the story?",
    anchorNote: "When the mind is replaying something on a loop, open Anchor.",
  },
  {
    id: "lesson_06",
    number: 6,
    title: "Working with Pain and Resistance",
    minutes: 6,
    source: "Ch. 7 — The Training of Wisdom · Ch. 8 — Awareness and Equanimity",
    teaching: [
      "Pain, physical or emotional, is not the enemy in this teaching. The reaction to pain is.",
      "Meditators are asked to sit still not to prove endurance but to examine. Looked at closely, what seemed one solid block of pain turns out to be many things: pressure, heat, pulsing — and all of it shifting.",
      "This is anicca, impermanence, met directly rather than believed. And alongside it, something else becomes visible: the resistance to the pain, which is separate from it, and often the heavier of the two.",
    ],
    instruction:
      "Find an area of discomfort in the body right now. Mild tension will do. For four minutes, examine it instead of trying to ease it.",
    sitSeconds: 240,
    guidance:
      "Close the eyes. Find a place of discomfort. Bring attention to it. Do not try to soften it. Examine it. Where exactly are its edges? Is it one sensation, or several? Is there throbbing? Burning? Pressing? Aching? Is it the same now as ten seconds ago? Notice any wish for it to go. That wish is a separate thing. Observe it too. Return to the sensation. Observe its texture. Observe it changing.",
    reflection: "Did the sensation change when you observed it without trying to change it?",
    anchorNote: "When pain or strong resistance is present, Anchor will guide you through it.",
  },
  {
    id: "lesson_07",
    number: 7,
    title: "Saṅkhāra: Why Patterns Repeat",
    minutes: 6,
    source: "Ch. 4 — The Root of the Problem · Ch. 9 — The Goal",
    teaching: [
      "A saṅkhāra is a reaction of the mind, and also the trace that reaction leaves behind. Each time we react with craving or aversion, the same reaction becomes easier the next time.",
      "This is why patterns repeat. It is not a lack of willpower. The groove is being deepened by the very reaction that is regretted afterwards.",
      "The way out is not force. Old reactions surface as sensations in the body. If they are observed and no new reaction is added, they weaken and pass. Each such moment undoes a little of the pattern.",
    ],
    instruction:
      "Bring to mind one pattern that repeats in your life. For three minutes, do not analyse it. Notice the sensation that appears with it, and observe that.",
    sitSeconds: 180,
    guidance:
      "Close the eyes. Let the pattern come to mind. A reaction you know well. Do not explain it. Do not plan to fix it. Notice what appears in the body as you hold it in mind. Bring attention there. Observe the sensation. The urge to act or to turn away may come. Observe the urge as sensation too. Do not add anything. Let it arise. Let it pass.",
    closing: "You just observed a saṅkhāra. Not fixed it. Not analysed it. Observed it. That is the practice.",
    anchorNote: "When the same reaction shows up again, open Anchor before acting on it.",
  },
  {
    id: "lesson_08",
    number: 8,
    title: "Equanimity: Observing Without Reacting",
    minutes: 6,
    source: "Ch. 8 — Awareness and Equanimity",
    teaching: [
      "Equanimity is easily mistaken for indifference. It is the opposite of going numb.",
      "It is the capacity to stay fully present with a sensation, pleasant or unpleasant, without reaching for it or pushing it away. Not suppressing, and not being carried off. Everything is felt, more clearly than before, and nothing is obeyed blindly.",
      "Awareness and equanimity are taught as a pair. Awareness without balance only makes one more sensitive and more reactive. Balance without awareness is a surface calm. The practice is both, together.",
    ],
    instruction:
      "Four minutes. Notice pleasant and unpleasant sensations with the same attention. Do not chase one or push away the other.",
    sitSeconds: 240,
    guidance:
      "Close the eyes. Let attention move through the body. Find a sensation that is pleasant, or neutral. Observe it. Notice any leaning towards it. Now find one that is unpleasant. Observe it with the same attention. Notice any leaning away. Neither is better. Both are sensations. Both are changing. Move between them. Wherever the mind reaches, notice the reaching. Wherever it resists, notice the resisting. Return to simply observing.",
    reflection: "Where did you notice yourself reaching or resisting? What happened when you just watched?",
    anchorNote: "When you want an experience to be different from what it is, open Anchor.",
  },
  {
    id: "lesson_09",
    number: 9,
    title: "Mettā: Goodwill as Completion",
    minutes: 6,
    source: "Ch. 10 — The Art of Living",
    teaching: [
      "A Vipassana sitting ends with mettā: goodwill directed to all beings.",
      "This is not sentiment, and it cannot be manufactured. The teaching is that as aversion is observed and thinned out, goodwill is what remains. Mettā gives that a direction.",
      "It begins wherever it flows without effort and widens from there. Where it does not flow, that is noted, without forcing.",
    ],
    instruction: "Four minutes of guided mettā.",
    sitSeconds: 240,
    guidance:
      "Close the eyes. Notice the body sitting. Begin with yourself. May I be happy. May I be free from suffering. Stay with that for a few breaths. Now bring to mind someone close to you. May you be happy. May you be free from suffering. Now someone neutral. A person you passed today. May you be happy. May you be free from suffering. Now someone difficult. Only as far as it goes. May you be happy. May you be free from suffering. If there is resistance, observe the resistance. Now all beings, near and far. May all beings be happy. May all beings be free from suffering.",
    reflection: "Where did you feel resistance? Where did it flow without effort? Both are information.",
    anchorNote: "After a conflict with someone, Anchor first. Mettā afterwards.",
  },
  {
    id: "lesson_10",
    number: 10,
    title: "Continuity: Practice in Daily Life",
    minutes: 5,
    source: "Ch. 10 — The Art of Living",
    teaching: [
      "The purpose of the practice is not the sitting. It is the rest of the day.",
      "The test comes with eyes open: in traffic, in an argument, in boredom, in the pull to pick up the phone. A course or a sitting is the laboratory. Ordinary life is where the result is applied and checked.",
      "Progress is not measured by special experiences. It is measured by whether reactions are getting shorter and lighter, and whether the gap between sensation and reaction is widening.",
    ],
    instruction:
      "No sitting this time. Think back over the last 24 hours. Find one moment where you reacted — with frustration, craving, fear or judgment. What sensation was present in the body then? Can you locate it now, in memory? Observe it.",
    reflection: "Set one intention for today: one moment where, instead of reacting, you will observe. Write it here.",
    closing: "This is the art of living. Not perfection. Observation.",
    anchorNote: "That one moment today — when it comes, Anchor is here.",
  },
];

export const LESSONS_BY_ID: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

export function lessonListForPrompt(): string {
  return LESSONS.map((l) => `${l.id}: ${l.title}`).join("\n");
}

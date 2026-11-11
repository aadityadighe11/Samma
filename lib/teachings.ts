// Teaching index for the "Talk it through" tile and Anchor sessions.
//
// Each entry is a short paraphrase, in Samma's own words, of a point taught by
// S.N. Goenka as presented in William Hart's "The Art of Living" (1987).
// These are summaries with chapter references, not quotations. The AI may only
// attribute teachings that appear in this index.

export type Teaching = {
  id: string;
  title: string;
  source: string;
  gist: string;
  lessonId: string;
  themes: string;
};

export const TEACHINGS: Teaching[] = [
  {
    id: "reaction-not-event",
    title: "The reaction, not the event",
    source: "Ch. 4 — The Root of the Problem",
    gist: "What happens outside is only the occasion. Suffering starts at the moment the mind reacts to it with liking or disliking. The event cannot be undone; the reaction can be observed.",
    lessonId: "lesson_01",
    themes: "blame, unfairness, someone did something to me, bad day, frustration with circumstances",
  },
  {
    id: "chain-of-reaction",
    title: "Contact, sensation, reaction",
    source: "Ch. 4 — The Root of the Problem",
    gist: "Something meets the senses or the mind, a sensation arises in the body, and the mind reacts to that sensation. It happens so fast that it looks as if we react to the outside world. The link that can be seen and worked with is sensation.",
    lessonId: "lesson_01",
    themes: "triggered, snapped, overreacted, did not know why I reacted, impulsive",
  },
  {
    id: "sensation-is-the-pivot",
    title: "Sensation is the turning point",
    source: "Ch. 3 — The Immediate Cause; Appendix A",
    gist: "Every thought and emotion arrives together with a sensation in the body. That sensation is where a reaction either starts or does not. Attention placed there works on the real cause rather than on its story.",
    lessonId: "lesson_02",
    themes: "anxiety in the body, tight chest, knot in stomach, restlessness, emotion felt physically",
  },
  {
    id: "craving-for-sensation",
    title: "It is the sensation that is craved",
    source: "Ch. 4 — The Root of the Problem",
    gist: "The mind does not actually crave the object — the phone, the food, the praise. It craves the pleasant sensation that comes with it. When the sensation fades the wanting starts again, which is why getting the object never ends the craving.",
    lessonId: "lesson_08",
    themes: "social media, scrolling, phone, distraction, addiction, cravings, shopping, wanting more, validation, likes",
  },
  {
    id: "aversion",
    title: "Pushing away is also a reaction",
    source: "Ch. 4 — The Root of the Problem",
    gist: "Disliking an unpleasant sensation and wanting it gone is the same habit as craving, turned around. The pushing adds a second layer of tension on top of the first.",
    lessonId: "lesson_08",
    themes: "anger, irritation, hatred, cannot stand this, wanting a feeling to stop, dread, avoidance",
  },
  {
    id: "anicca",
    title: "What arises also passes",
    source: "Ch. 7 — The Training of Wisdom",
    gist: "Every sensation, pleasant or painful, is changing every moment. This is to be known by watching it in the body, not accepted as an idea. A mind that has seen change directly stops clinging to what cannot stay and stops fighting what will not last.",
    lessonId: "lesson_06",
    themes: "stuck, this will never end, overwhelm, fear that a feeling is permanent, loss, change, uncertainty",
  },
  {
    id: "this-will-also-change",
    title: "This will also change",
    source: "Story: The Two Rings (Ch. 7)",
    gist: "In the story, one brother inherits a plain ring engraved with the reminder that things change. He reads it in good times and bad, and so is thrown by neither. Good periods end; hard periods end.",
    lessonId: "lesson_06",
    themes: "ups and downs, success and failure, good news, bad news, job loss, breakup, exam results",
  },
  {
    id: "attachment-to-i-and-mine",
    title: "The weight of 'I' and 'mine'",
    source: "Ch. 4 — The Root of the Problem",
    gist: "Much distress comes from holding tightly to an image of oneself, to what one owns, and to one's opinions. The tighter the grip, the more every change or criticism is felt as a personal injury.",
    lessonId: "lesson_05",
    themes: "ego, criticism, insult, reputation, comparison, jealousy, envy, status, being right, argument, imposter",
  },
  {
    id: "story-and-sensation",
    title: "The story and the sensation",
    source: "Ch. 8 — Awareness and Equanimity",
    gist: "Going over who said what and why is not observation; it feeds the reaction. Underneath the story is something physical and present. Observing that, rather than the narrative, is where the practice works.",
    lessonId: "lesson_05",
    themes: "overthinking, rumination, replaying a conversation, cannot stop thinking, resentment, analysing",
  },
  {
    id: "anapana",
    title: "The breath, as it is",
    source: "Ch. 6 — The Training of Concentration",
    gist: "Attention is placed on natural breath at the entrance of the nostrils, without controlling it. The breath is always in the present and it mirrors the state of the mind. Each time attention wanders and is brought back, the mind is being trained.",
    lessonId: "lesson_03",
    themes: "overwhelm, panic, cannot focus, scattered, need something simple, racing mind",
  },
  {
    id: "present-moment",
    title: "Only this moment can be lived",
    source: "Ch. 6 — The Training of Concentration",
    gist: "The mind's habit is to roll in memories of the past or plans and fears about the future. Neither can be acted in. Awareness of what is happening now — breath, sensation — is the only place where anything can actually be done.",
    lessonId: "lesson_03",
    themes: "worry about the future, regret about the past, what if, planning, career anxiety, deadlines, fear of missing out",
  },
  {
    id: "wandering-mind",
    title: "The mind wanders. Returning is the work.",
    source: "Ch. 6 — The Training of Concentration",
    gist: "An untrained mind jumps from object to object; that is its nature, not a personal failure. The instruction is to notice that it has gone and return, patiently, without irritation at oneself.",
    lessonId: "lesson_03",
    themes: "cannot concentrate, distracted, bad at meditation, bored, impatience with self, attention span",
  },
  {
    id: "sila",
    title: "Harming others disturbs the one who harms",
    source: "Ch. 5 — The Training of Moral Conduct",
    gist: "An action that hurts someone cannot be done without first generating agitation in one's own mind. Restraint is therefore not an imposed rule; it is what keeps the mind steady enough to see.",
    lessonId: "lesson_04",
    themes: "guilt, I hurt someone, lied, cheated, moral conflict, shame about an action",
  },
  {
    id: "right-speech",
    title: "Speech that does not wound",
    source: "Ch. 5 — The Training of Moral Conduct",
    gist: "Right speech means refraining from lies, from words that divide people, from harsh words and from idle talk. What remains is speech that is true and useful to the listener.",
    lessonId: "lesson_04",
    themes: "said something harsh, gossip, argument, online comments, difficult conversation, honesty",
  },
  {
    id: "right-livelihood",
    title: "Work that does not harm",
    source: "Ch. 5 — The Training of Moral Conduct",
    gist: "A livelihood should not require breaking one's own conduct or pushing others to break theirs. Whatever the job, the question is whether it is done with the intention of contributing rather than only extracting.",
    lessonId: "lesson_04",
    themes: "work ethics, job dissatisfaction, purpose at work, pressure to cut corners, meaning of career",
  },
  {
    id: "pain-is-not-solid",
    title: "Pain is not one solid thing",
    source: "Ch. 8 — Awareness and Equanimity",
    gist: "Looked at closely and without resistance, an intense sensation turns out to be many smaller sensations — pressure, heat, throbbing — that keep shifting. The resistance to it is a separate thing, and usually the heavier one.",
    lessonId: "lesson_06",
    themes: "physical pain, headache, chronic tension, illness, discomfort, emotional pain that feels unbearable",
  },
  {
    id: "sankhara",
    title: "Why the same pattern returns",
    source: "Ch. 4 — The Root of the Problem; Ch. 9 — The Goal",
    gist: "Each reaction leaves a trace that makes the same reaction more likely next time. A pattern weakens not through force of will but each time its sensation is felt and no new reaction is added.",
    lessonId: "lesson_07",
    themes: "habit, same mistake again, relapse, pattern in relationships, procrastination, self-sabotage, temper",
  },
  {
    id: "seed-and-fruit",
    title: "As the seed, so the fruit",
    source: "Story: Seed and Fruit (Ch. 3)",
    gist: "A bitter seed gives bitter fruit however much one wishes otherwise. The attention belongs on what is being planted now — the present mental action — not on bargaining over results.",
    lessonId: "lesson_07",
    themes: "consequences, wanting different results, regret, why does this keep happening to me, karma",
  },
  {
    id: "equanimity",
    title: "Equanimity is not numbness",
    source: "Ch. 8 — Awareness and Equanimity",
    gist: "Equanimity means feeling everything fully while neither clinging to it nor pushing it away. It is balance, not indifference, and it is what allows a considered action instead of a blind reaction.",
    lessonId: "lesson_08",
    themes: "emotional swings, wanting to stop feeling, detachment, fear of becoming cold, staying steady",
  },
  {
    id: "neither-suppress-nor-express",
    title: "Neither suppress nor act out",
    source: "Ch. 5 — The Training of Moral Conduct",
    gist: "Pushing an emotion down buries it; venting it strengthens the habit. The third option is to observe it — as breath and as sensation — until it loses its strength by itself.",
    lessonId: "lesson_08",
    themes: "anger management, bottling up, outbursts, should I vent, holding it in",
  },
  {
    id: "awareness-and-equanimity",
    title: "Two wings: awareness and equanimity",
    source: "Ch. 8 — Awareness and Equanimity",
    gist: "Awareness without balance becomes more sensitivity and more reaction. Balance without awareness is only a surface calm. The practice needs both together, moment by moment.",
    lessonId: "lesson_08",
    themes: "I notice everything but still react, sensitive, self-aware but stuck, practice not working",
  },
  {
    id: "own-work",
    title: "The path has to be walked",
    source: "Story: To Walk on the Path (Ch. 1)",
    gist: "A man hears the way explained for years and stays where he is, because he never takes a step. Directions do nothing by themselves; no teacher can walk for the student.",
    lessonId: "lesson_10",
    themes: "looking for answers, consuming advice, self-help, podcasts, wanting someone to fix it, motivation",
  },
  {
    id: "swimology",
    title: "Knowing about it is not knowing it",
    source: "Story: Swimology (Introduction)",
    gist: "A learned professor has studied everything except how to swim, and a sailor who has studied nothing can. When the ship goes down, only one kind of knowledge counts. Understanding has to become practice.",
    lessonId: "lesson_10",
    themes: "intellectualising, reading a lot but no change, information overload, theory versus practice",
  },
  {
    id: "doctors-prescription",
    title: "The prescription has to be taken",
    source: "Story: The Doctor's Prescription (Ch. 5)",
    gist: "A patient admires his doctor and recites the prescription daily but never takes the medicine. Respect for a teaching and repeating its words are not the same as applying it.",
    lessonId: "lesson_10",
    themes: "inconsistent practice, I know what to do but do not do it, discipline, starting and stopping",
  },
  {
    id: "realism",
    title: "See what is lost, what remains, then work",
    source: "Story: Filling the Bottle of Oil (Ch. 9)",
    gist: "Three boys each spill half a bottle of oil. One cries over what is gone, one is happy with what is left, and the third sees both and goes to earn enough to refill it. Neither pessimism nor optimism, but realism followed by effort.",
    lessonId: "lesson_10",
    themes: "setback, failure, loss of money, mistake at work, how to move forward, positivity versus realism",
  },
  {
    id: "metta",
    title: "Goodwill is what remains",
    source: "Ch. 10 — The Art of Living",
    gist: "Mettā is not forced affection. As anger and ill will are observed and thinned out, goodwill towards others is what is left. It is practised at the end of a sitting, starting from wherever it flows easily.",
    lessonId: "lesson_09",
    themes: "conflict with family, partner, colleague, forgiveness, grief, loneliness, caring for someone difficult",
  },
  {
    id: "anger-harms-holder",
    title: "Anger burns its holder first",
    source: "Ch. 5 — The Training of Moral Conduct",
    gist: "To generate anger at someone, the mind must first become agitated and the body tense. Whatever happens to the other person, the one who is angry is the first to be harmed by it.",
    lessonId: "lesson_09",
    themes: "rage at a person, revenge, grudge, betrayal, being wronged, road rage",
  },
  {
    id: "practice-in-life",
    title: "The test is daily life",
    source: "Ch. 10 — The Art of Living",
    gist: "The measure of practice is not what happens with eyes closed but whether, in ordinary situations, the gap between a sensation and the reaction to it grows. Progress shows as shorter and lighter reactions, not as special experiences.",
    lessonId: "lesson_10",
    themes: "am I making progress, bringing practice to work, busy life, no time to meditate, real world",
  },
];

export const TEACHINGS_BY_ID: Record<string, Teaching> = Object.fromEntries(
  TEACHINGS.map((t) => [t.id, t])
);

export function teachingIndexForPrompt(): string {
  return TEACHINGS.map(
    (t) => `- ${t.id} | ${t.title} | ${t.source} | ${t.gist} | Fits: ${t.themes}`
  ).join("\n");
}

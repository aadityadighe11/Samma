// Daily Practice: ten lessons following the arc of Goenka's teaching as
// presented in "The Art of Living" (William Hart, 1987). All text here is
// Samma's own paraphrase of each chapter, with the chapter named as source.

export type Lesson = {
  id: string;
  number: number;
  title: string;
  minutes: number;
  source: string;
  teaching: string[];
  // A story from the book, retold briefly in Samma's words.
  story?: { title: string; text: string };
  // How the teaching shows up in an ordinary day.
  daily: string;
  // Optional exact passage from the book, shown under the teaching. Add
  //   quote: "...",
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
    minutes: 7,
    source: "Ch. 2: The Starting Point · Ch. 4: The Root of the Problem",
    teaching: [
      "Everyone suffers. Sometimes it is sharp, like grief or humiliation. More often it is a low, constant dissatisfaction: things are not quite as we want them, and when they are, they do not stay that way. Goenka's teaching begins by admitting this plainly, the way a doctor begins with the illness.",
      "The usual explanation is that something outside went wrong. A person behaved badly. A plan failed. Luck turned. So we try to rearrange the outside world, and when that works for a while, the dissatisfaction returns in a new form.",
      "The teaching asks us to look closer at what actually happens. Something makes contact with one of the senses, or a thought makes contact with the mind. At once the mind recognises it and labels it as good or bad. With that label a sensation arises in the body, pleasant or unpleasant. And then the mind reacts to the sensation: wanting more of the pleasant, wanting to be rid of the unpleasant.",
      "This sequence runs so fast that it seems we are reacting directly to the world. We are not. We are reacting to our own sensations. The event is only the occasion. The reaction is the cause.",
      "Wanting and not wanting, repeated moment after moment, harden into craving and aversion. These are what the teaching calls the root of suffering. Not the boss, not the traffic, not the message that did not arrive.",
      "This is good news of a practical kind. The outside world cannot be controlled. But the reaction happens inside, and what happens inside can be observed. If a reaction is observed instead of obeyed, the chain is interrupted at the place where it starts.",
    ],
    daily:
      "Someone cuts into your lane. Before any thought, there is a jolt in the chest and heat in the face. Then comes the anger, and the story about the other driver. The driver was the occasion. The jolt was the sensation. The anger was the reaction, and it is the only one of the three that is yours.",
    instruction:
      "Sit for three minutes. Find one sensation in the body. Do not name it good or bad. Only know that it is present, that it is arising, that it is passing.",
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
    minutes: 8,
    source: "Ch. 3: The Immediate Cause · Appendix A",
    teaching: [
      "Vedanā means sensation: anything felt in the body. Heat, cold, pressure, tingling, heaviness, pulsing, pain, ease. In this teaching it is not a side detail. It is the hinge on which everything turns.",
      "The mind is described as doing four things, one after another. It becomes aware that something has made contact. It recognises and evaluates it. A sensation arises. It reacts. Of these four, sensation is the one that can be clearly felt, and it sits directly before the reaction.",
      "Every emotion arrives with something physical. Fear tightens the stomach. Anger heats the face and hardens the jaw. Craving pulls forward in the chest. This is not a figure of speech. It is how the content of the mind becomes observable.",
      "The mind by itself is hard to watch. It is quick, and the watcher is easily carried off by what it is watching. The body is slower and more honest. So the body becomes the laboratory, and sensation becomes the thing that is studied.",
      "The teaching makes a strong claim here: we never react to the outside world, only to the sensations it produces in us. If that is true, then learning to feel a sensation without reacting to it changes the relationship to everything built on top of it.",
      "It is also why this is a practice and not a philosophy. The idea can be understood in a minute. Knowing it in the body takes observation, repeated patiently.",
    ],
    story: {
      title: "The Buddha and the Scientist",
      text: "A physicist builds an instrument and measures how rapidly the particles of matter arise and pass away. He knows, as a fact, that nothing solid exists. Yet he still suffers like anyone else, because his knowledge came from an instrument and not from his own experience. The same truth, met directly within the framework of one's own body, is what changes a person.",
    },
    daily:
      "You see a message from someone you have been avoiding. Before you have read it, the stomach has already dropped. That drop is vedanā. Everything you do next, opening it, ignoring it, drafting a sharp reply in your head, is a response to that sensation.",
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
    minutes: 9,
    source: "Ch. 6: The Training of Concentration",
    teaching: [
      "To observe sensation steadily, the mind first has to be able to stay in one place. An untrained mind cannot. It jumps from memory to plan to worry to fantasy, rarely resting on what is happening now.",
      "So the training begins with Ānāpāna: awareness of the natural breath. Attention is placed on the small area below the nostrils and above the upper lip, and kept on the breath as it comes in and goes out.",
      "This is not a breathing exercise. The breath is not deepened, slowed or counted. If it is long, it is known as long. If it is short, it is known as short. The work is only to observe what is already happening.",
      "The breath is chosen for good reasons. It is always available. It cannot be imagined, only felt, so it keeps attention in the present. And it can be controlled, yet it also runs by itself, so watching it leads attention gently from the surface of the mind towards what lies underneath.",
      "The breath also mirrors the mind. When anger or fear arises, the breath turns rough and quick. When the mind settles, the breath becomes fine. By watching the breath, one starts to see the state of the mind without having to think about it.",
      "The mind will wander, perhaps within seconds. This is not failure. It is the very habit the training exists to weaken. The whole instruction is to notice that attention has gone, and bring it back, without irritation. Each return is one repetition of the exercise.",
    ],
    story: {
      title: "The Crooked Milk Pudding",
      text: "A blind boy asks what milk pudding is like. White, says his friend, and to explain white he hands him a crane. The boy feels along its bent neck and decides that pudding must be crooked. Descriptions cannot stand in for experience. Without the faculty to perceive directly, reality always comes out crooked. Concentration is the first step in developing that faculty.",
    },
    daily:
      "You sit down to do one piece of work and within a minute your hand has opened another tab. The moment you notice is the same moment as noticing the mind has left the breath. Coming back, without scolding yourself, is the same skill.",
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
    minutes: 7,
    source: "Ch. 5: The Training of Moral Conduct",
    teaching: [
      "Sīla is usually translated as moral conduct. It is easy to hear that as a list of rules handed down from outside. That is not how it is taught here.",
      "The definition is simple. An action that harms others and disturbs their peace is unwholesome. An action that helps others and adds to their peace is wholesome. No belief is required to apply this test.",
      "The reason for sīla is practical. No one can speak a cruel word or do a dishonest thing with a quiet mind. Before the act there is already agitation: anger, greed, fear. And afterwards the agitation remains. So whoever harms another harms themselves first.",
      "A mind in that state cannot observe clearly. Trying to meditate while continuing to act in ways that stir the mind up is like trying to see the bottom of a pond while churning the water.",
      "The basic form is five precepts: to refrain from killing, from stealing, from sexual misconduct, from false speech, and from intoxicants. Right speech is spelled out further: no lying, no carrying tales that set people against each other, no harsh words, no idle talk.",
      "The tone matters. This is not about guilt or about being good in the eyes of others. Conduct supports concentration. Concentration supports insight. And insight, in turn, makes good conduct natural, because one sees directly what an unwholesome act does to the one who commits it.",
    ],
    story: {
      title: "The Doctor's Prescription",
      text: "A sick man receives a prescription from a doctor he trusts. He goes home, sets up the doctor's picture, bows to it, and recites the prescription every day with great devotion. He does not get better. Only when he takes the medicine does the illness go. A teaching that is admired and repeated, and not applied, is a prescription that is never filled.",
    },
    daily:
      "You send a sarcastic reply and feel a brief satisfaction. An hour later you are still composing defences in your head. That lingering heat is the cost the teaching points to. It was paid by you, whatever happened to the other person.",
    instruction:
      "Bring to mind one recent action, something said, done or chosen, that left a residue. Not to judge it. Only ask what is still there, and where it is in the body. Sit with that sensation for two minutes.",
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
    minutes: 8,
    source: "Ch. 4: The Root of the Problem · Ch. 8: Awareness and Equanimity",
    teaching: [
      "The mind produces narrative without rest: what happened, who was wrong, what should have been said, what will be said next time. None of this is forbidden. But it is not where the work happens.",
      "\"I am angry at her\" is a story. The tightness in the chest is the sensation. One can go round the story for years and only deepen it, because every retelling produces the same sensations and the same reactions to them.",
      "The teaching names several things we cling to: the pleasures of the senses, our opinions and beliefs, and above all the sense of \"I\" and \"mine\". Most stories turn out to be about one of these. My reputation. My plan. My view of how things should be.",
      "Analysing the story has its uses, but it works only at the surface of the mind. The habit of reacting lives deeper, at the level where sensation is felt. That is why understanding a problem perfectly so often changes nothing.",
      "Observation begins when attention moves from the account of the anger to the physical fact of it. The question is no longer why this happened or who is to blame. The question is what is present in the body now.",
      "The story does not need to be pushed away. It can keep talking in the background. Attention is simply placed, again and again, on the sensation in front.",
    ],
    story: {
      title: "Nothing But Seeing",
      text: "A recluse walks the breadth of India to ask the Buddha for the way to liberation. The Buddha gives him one short instruction: in seeing there should be only seeing, in hearing only hearing. Experience without the layer of commentary added on top. The man had practised sincerely for years, and that one instruction was enough.",
    },
    daily:
      "At two in the night you replay a meeting for the tenth time, improving your lines. Each replay tightens the same place in the throat. The replay is the story. The throat is the sensation. Only one of them can be observed directly.",
    instruction:
      "Bring to mind something that has been occupying you: a worry, a resentment, a longing. For three minutes, each time the story starts, ask where this is in the body right now.",
    sitSeconds: 180,
    guidance:
      "Close the eyes. Let the thing that has been occupying the mind come forward. The story will start. Let it. Now ask: where is this in the body, right now? Go there. Observe the sensation. The story will start again. That is expected. Ask again: where is this in the body? Return to the sensation. Let the story stay in the background, like a radio in another room. The sensation is in front. Observe it.",
    reflection: "What did you find when you stopped following the story?",
    anchorNote: "When the mind is replaying something on a loop, open Anchor.",
  },
  {
    id: "lesson_06",
    number: 6,
    title: "Anicca: Working with Pain and Resistance",
    minutes: 8,
    source: "Ch. 7: The Training of Wisdom · Ch. 8: Awareness and Equanimity",
    teaching: [
      "The teaching speaks of three kinds of wisdom. The first is received: what we have heard or read from others. The second is intellectual: what we have reasoned through and found sensible. The third is experiential: what we have seen for ourselves. Only the third frees the mind.",
      "What is to be seen for oneself is anicca, impermanence. Not as an idea that everything changes eventually, but as a fact observable in the body from moment to moment.",
      "Pain is where this becomes most useful. Pain, physical or emotional, is not the enemy in this teaching. The reaction to pain is.",
      "Meditators are asked to sit still, not to prove endurance, but to examine. Looked at closely, what seemed one solid block of pain turns out to be many things: pressure, heat, pulsing, stabbing. And every one of them is shifting.",
      "Something else becomes visible alongside. There is the sensation, and there is the mind's resistance to it: the wish for it to stop, the fear that it will not. These are separate. The resistance is often the heavier of the two.",
      "From seeing change directly, two further things follow. What changes every moment cannot be held, so clinging to it leads to distress. And what changes every moment, beyond our control, is hard to call \"I\" or \"mine\". These are not beliefs to adopt. They are what observation shows.",
    ],
    story: {
      title: "The Two Rings",
      text: "Two brothers divide their inheritance. The elder takes a diamond ring. The younger is left a plain silver one, engraved with a reminder that this will also change. Through good seasons and bad, the elder swings between elation and despair until his health breaks. The younger enjoys the good times, endures the hard ones, and looks at his ring in both.",
    },
    daily:
      "A headache arrives in the afternoon. The first response is to brace against it and count the hours left. Braced, it feels like one solid weight. Examined for a minute, it has edges, a pulse, a place where it is stronger and a place where it is faint.",
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
    minutes: 8,
    source: "Ch. 3: The Immediate Cause · Ch. 4: The Root of the Problem · Ch. 9: The Goal",
    teaching: [
      "A saṅkhāra is a reaction of the mind: the moment of liking or disliking. The same word also names what that reaction leaves behind, a trace that makes the same reaction easier the next time.",
      "Not all reactions weigh the same. A passing dislike fades almost at once. A reaction that is repeated many times, or made with great intensity, leaves a deep mark that can stay for years.",
      "This is why patterns repeat. It is not a lack of willpower or intelligence. The groove is being deepened by the very reaction that is regretted afterwards. Each outburst of temper makes the next one more likely. Each reach for distraction makes the next reach more automatic.",
      "The teaching describes this as action and result. A mental action is a seed, and it gives fruit of its own kind. No amount of wishing afterwards changes what was planted.",
      "The way out is not force. When the mind stops generating new reactions, old ones come to the surface, and they come as sensations in the body. If such a sensation is observed with balance and no new reaction is added, it weakens and passes.",
      "So a difficult sitting, or a difficult moment in the day, is not a sign that something has gone wrong. It may be an old pattern surfacing. Each time it is felt and not fed, a little of it is undone.",
    ],
    story: {
      title: "Seed and Fruit",
      text: "A farmer plants two seeds in the same soil: sugar cane and neem. They receive the same water, the same sun, the same air. One grows sweet in every fibre and the other bitter. Nature is not being kind to one and cruel to the other. It only brings out what the seed contained. To want sweet fruit, one has to attend to what is being planted now.",
    },
    daily:
      "You promise yourself you will not check your phone in bed, and find it in your hand again. The promise was made at the surface. The reach comes from a groove underneath, and it starts as a small restlessness in the hands and chest. That restlessness is the place to look.",
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
    minutes: 8,
    source: "Ch. 8: Awareness and Equanimity",
    teaching: [
      "Equanimity is easily mistaken for indifference. It is the opposite of going numb.",
      "It is the capacity to stay fully present with a sensation, pleasant or unpleasant, without reaching for it or pushing it away. Everything is felt, more clearly than before. Nothing is obeyed blindly.",
      "There are two familiar ways of handling a strong emotion. One is to suppress it, which only pushes it deeper, where it keeps working. The other is to express it, which gives relief for a moment and strengthens the habit. The teaching offers a third way: observe it, as breath and as sensation, until it loses its strength.",
      "Awareness and equanimity are taught as a pair, like the two wings of a bird. Awareness without balance only makes a person more sensitive, and so more reactive. Balance without awareness is a surface calm, with reactions continuing unnoticed below. The practice is both together, moment by moment.",
      "Pleasant sensations are the harder test. It is natural to hold on to them and to measure a sitting, or a day, by how good it felt. But clinging to the pleasant is the same habit as fighting the unpleasant. Both are to be observed as changing.",
      "Equanimity does not mean doing nothing. It means that when action is needed, it comes from a balanced mind and not from a blind reaction. A person can be firm, even forceful, without anger inside.",
    ],
    daily:
      "A colleague takes credit for your work. Swallowing it and saying nothing is suppression. Sending a furious email is expression. The third way is to feel the heat fully, watch it change, and then decide what to say. What you say after that is usually clearer and more effective.",
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
    minutes: 8,
    source: "Ch. 10: The Art of Living",
    teaching: [
      "A Vipassana sitting ends with mettā: goodwill directed to all beings.",
      "This is not sentiment, and it cannot be manufactured. The teaching is that as anger, ill will and fear are observed and thinned out, what remains in the mind is goodwill and compassion. Mettā gives that a direction.",
      "It is described as a kind of sharing. Whatever peace has been gained through one's own practice is offered outward: may others have this too. A mind that has just been agitated has little to offer, which is why mettā comes at the end of a sitting and not at the start.",
      "It is also the test of the practice. If months of observation have not made a person easier to live with, more patient, quicker to forgive, then something in the practice needs attention. The purpose was never private calm alone.",
      "Mettā begins wherever it flows without effort and widens from there: oneself, those who are close, those who are neutral, those who are difficult, all beings. Where it does not flow, that is noted, without forcing and without guilt.",
      "Resistance during mettā is information. It points to where aversion still lives, and that sensation can be observed like any other.",
    ],
    daily:
      "After a quarrel at home, the mind keeps a list of what the other person did. Goodwill cannot be forced on top of that list. But once the heat has been observed and has faded, it becomes possible to wish them well, and the next conversation starts from a different place.",
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
    minutes: 7,
    source: "Ch. 9: The Goal · Ch. 10: The Art of Living",
    teaching: [
      "The purpose of the practice is not the sitting. It is the rest of the day.",
      "The test comes with eyes open: in traffic, in an argument, in boredom, in the pull to pick up the phone. A course or a sitting is the laboratory. Ordinary life is where the result is applied and checked.",
      "Progress is not measured by special experiences during meditation. It is measured by whether reactions are getting shorter and lighter. Where anger once lasted a day, perhaps it now lasts an hour. Where it lasted an hour, a few minutes. And the gap between sensation and reaction slowly widens.",
      "When a strong reaction does come in the middle of the day, the instruction is simple. Notice the breath, which will have changed. Notice the sensation in the body. Even a few moments of this is enough to stop the reaction from multiplying.",
      "The teaching asks for realism. There will be days of failure. The response is neither to pretend all is well nor to despair, but to see what happened and begin again.",
      "And it is clear about its own limits. Reading about the practice, including here, is not the practice. The full technique is learned in a ten-day course, and kept alive by sitting regularly. This app is only a bridge between that and the moments of an ordinary day.",
    ],
    story: {
      title: "Filling the Bottle of Oil",
      text: "A mother sends her sons, one after another, to buy a bottle of oil. Each falls on the way home and spills half. The first comes back in tears over what was lost. The second comes back cheerful about what was saved. The third sees both, and goes out to work for the day to earn enough to fill the bottle again. Not pessimism, not optimism. Realism, and then effort.",
    },
    daily:
      "You meant to stay level in a difficult call and you snapped. Afterwards there are two easy responses: excuse it, or decide you are hopeless at this. The third is to notice how long the heat lasted this time, sit for a few minutes, and carry on.",
    instruction:
      "No sitting this time. Think back over the last 24 hours. Find one moment where you reacted, with frustration, craving, fear or judgment. What sensation was present in the body then? Can you locate it now, in memory? Observe it.",
    reflection: "Set one intention for today: one moment where, instead of reacting, you will observe. Write it here.",
    closing: "This is the art of living. Not perfection. Observation.",
    anchorNote: "That one moment today: when it comes, Anchor is here.",
  },
];

export const LESSONS_BY_ID: Record<string, Lesson> = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

export function lessonListForPrompt(): string {
  return LESSONS.map((l) => `${l.id}: ${l.title}`).join("\n");
}

import { LanguageTestQuestion, LearningPlanMilestone, SevenDayChallengeDay } from '../types';

export const PLACEMENT_TESTS_BY_LANG: Record<string, LanguageTestQuestion[]> = {
  es: [
    {
      id: 'es-1',
      question: '¿Cómo se dice "Good morning, how are you?" en español?',
      translation: 'How do you say "Good morning, how are you?" in Spanish?',
      options: [
        'Buenas noches, ¿dónde estás?',
        'Buenos días, ¿cómo estás?',
        'Hasta luego, ¿qué hora es?',
        'Por favor, ¿cuánto cuesta?'
      ],
      correctAnswer: 1,
      explanation: '"Buenos días, ¿cómo estás?" is the standard morning greeting in Spanish.',
      testedSkill: 'Vocabulary'
    },
    {
      id: 'es-2',
      question: 'Completa la frase: "Yo _____ un café con leche, por favor."',
      translation: 'Complete the sentence: "I _____ a coffee with milk, please."',
      options: ['quisiera', 'quieren', 'quisiste', 'queriendo'],
      correctAnswer: 0,
      explanation: '"Quisiera" is polite conditional first-person ("I would like").',
      testedSkill: 'Grammar'
    },
    {
      id: 'es-3',
      question: 'En un restaurante, el camarero pregunta: "¿Desea pagar con tarjeta o en efectivo?" ¿Qué pregunta?',
      translation: 'At a restaurant, the waiter asks: "Would you like to pay with card or in cash?" What is being asked?',
      options: [
        'If you want sugar or milk',
        'If you want to sit indoors or outdoors',
        'Payment method: credit card or cash',
        'If you want dessert or coffee'
      ],
      correctAnswer: 2,
      explanation: '"Tarjeta o en efectivo" means "card or cash".',
      testedSkill: 'Comprehension'
    },
    {
      id: 'es-4',
      question: 'Para decir que has estado aprendiendo español por 6 meses:',
      translation: 'To say you have been learning Spanish for 6 months:',
      options: [
        'Llevo seis meses aprendiendo español.',
        'Tengo seis meses por aprender.',
        'Hice seis meses español.',
        'Soy seis meses en español.'
      ],
      correctAnswer: 0,
      explanation: '"Llevar + [time] + gerundio" expresses an ongoing continuous duration.',
      testedSkill: 'Grammar'
    },
    {
      id: 'es-5',
      question: '¿Qué respuesta es más adecuada cuando alguien dice "¡Muchas gracias por su ayuda!"?',
      translation: 'What response is most appropriate when someone says "Thank you very much for your help!"?',
      options: [
        '¡De nada! Ha sido un placer.',
        '¡Hasta nunca!',
        'No quiero nada.',
        'Lo siento mucho.'
      ],
      correctAnswer: 0,
      explanation: '"¡De nada! Ha sido un placer" is the warm, native reply ("You are welcome! It was a pleasure").',
      testedSkill: 'Conversation'
    }
  ],
  fr: [
    {
      id: 'fr-1',
      question: 'Comment dit-on "I would like a croissant, please" en français ?',
      translation: 'How do you say "I would like a croissant, please" in French?',
      options: [
        'Je voudrais un croissant, s’il vous plaît.',
        'J’ai un croissant merci.',
        'Je prends la table s’il vous plaît.',
        'Où est le croissant maintenant ?'
      ],
      correctAnswer: 0,
      explanation: '"Je voudrais un croissant, s’il vous plaît" is the polite standard phrasing.',
      testedSkill: 'Vocabulary'
    },
    {
      id: 'fr-2',
      question: 'Complétez : "Hier soir, nous _____ au restaurant."',
      translation: 'Complete: "Last night, we _____ to the restaurant."',
      options: ['sommes allés', 'avons aller', 'allons', 'été'],
      correctAnswer: 0,
      explanation: 'Passé composé with être: "nous sommes allés".',
      testedSkill: 'Grammar'
    },
    {
      id: 'fr-3',
      question: 'À la gare : "Le train en provenance de Lyon aura un retard de 10 minutes." Qu\'annonce le haut-parleur ?',
      translation: 'At the train station: "The train from Lyon will have a 10 minute delay." What is announced?',
      options: [
        'The train is cancelled',
        'The train from Lyon is delayed by 10 minutes',
        'Platform change to track 10',
        'Tickets are sold out'
      ],
      correctAnswer: 1,
      explanation: '"Un retard de 10 minutes" denotes a 10-minute delay.',
      testedSkill: 'Comprehension'
    },
    {
      id: 'fr-4',
      question: 'Quelle est la formule polie pour demander l’addition au restaurant ?',
      translation: 'What is the polite way to ask for the bill at a restaurant?',
      options: [
        'L’addition s’il vous plaît.',
        'Donnez-moi le total tout de suite.',
        'C’est combien la fin ?',
        'Je pars maintenant.'
      ],
      correctAnswer: 0,
      explanation: '"L’addition s’il vous plaît" is the universal polite request for the check.',
      testedSkill: 'Conversation'
    },
    {
      id: 'fr-5',
      question: 'Choisissez le pronom correct : "Ce livre ? Je _____ ai déjà lu."',
      translation: 'Choose the correct pronoun: "This book? I already read _____."',
      options: ['l\'', 'lui', 'y', 'en'],
      correctAnswer: 0,
      explanation: 'Direct object pronoun for masculine singular: "l\'" (le + ai).',
      testedSkill: 'Grammar'
    }
  ],
  ja: [
    {
      id: 'ja-1',
      question: 'レストランで「これをお願いします」と言う時の意味は？',
      translation: 'What does "Kore o onegaishimasu" mean in a restaurant?',
      options: [
        'Where is the restroom?',
        'This one, please.',
        'How much is the total?',
        'Is this delicious?'
      ],
      correctAnswer: 1,
      explanation: '"Kore o onegaishimasu" means "This one, please" when pointing at a menu item.',
      testedSkill: 'Vocabulary'
    },
    {
      id: 'ja-2',
      question: '空欄に入る適切な助詞は？「駅 _____ 行きたいです。」',
      translation: 'Select the right particle: "Eki _____ ikitai desu" (I want to go to the station).',
      options: ['に (ni)', 'を (wo)', 'で (de)', 'が (ga)'],
      correctAnswer: 0,
      explanation: 'Direction/destination of movement verbs takes に (ni) or へ (e).',
      testedSkill: 'Grammar'
    },
    {
      id: 'ja-3',
      question: '店員が「お会計は別々ですか、ご一緒ですか？」と尋ねました。何を聞いていますか？',
      translation: 'The clerk asks if the check is separate or together. What is being asked?',
      options: [
        'Dine in or takeout',
        'Separate checks or paying together',
        'Cash or credit card',
        'Smoking or non-smoking'
      ],
      correctAnswer: 1,
      explanation: '"Betsu-betsu" (separate) vs "go-issho" (together) refers to splitting or combining the bill.',
      testedSkill: 'Comprehension'
    },
    {
      id: 'ja-4',
      question: '「はじめまして、どうぞよろしくおねがいします」に対する最も自然な返事は？',
      translation: 'What is the most natural reply to "Hajimemashite, douzo yoroshiku onegaishimasu"?',
      options: [
        'こちらこそ、よろしくお願いします。',
        'いいえ、結構です。',
        'ごちそうさまでした。',
        'おじゃましました。'
      ],
      correctAnswer: 0,
      explanation: '"Kochira koso, yoroshiku onegaishimasu" ("Likewise, pleased to meet you too").',
      testedSkill: 'Conversation'
    },
    {
      id: 'ja-5',
      question: '「日本語を勉強して3ヶ月になります」の意味は？',
      translation: 'What does "Nihongo o benkyou shite san-kagetsu ni narimasu" mean?',
      options: [
        'I will study Japanese in 3 months.',
        'It has been 3 months since I started studying Japanese.',
        'I only study 3 days a month.',
        'I plan to go to Japan for 3 months.'
      ],
      correctAnswer: 1,
      explanation: 'Expresses duration elapsed since starting.',
      testedSkill: 'Grammar'
    }
  ],
  de: [
    {
      id: 'de-1',
      question: 'Wie sagt man "I would like a glass of water, please" auf Deutsch?',
      translation: 'How do you say "I would like a glass of water, please" in German?',
      options: [
        'Ich möchte ein Glas Wasser, bitte.',
        'Ich habe das Wasser danke.',
        'Wo ist das Wasser jetzt?',
        'Wie viel kostet das Wasser?'
      ],
      correctAnswer: 0,
      explanation: '"Ich möchte ein Glas Wasser, bitte" is the standard polite request.',
      testedSkill: 'Vocabulary'
    },
    {
      id: 'de-2',
      question: 'Welcher Artikel passt? "Ich gehe in _____ Supermarkt (maskulin, Akkusativ)."',
      translation: 'Which article fits? "Ich gehe in _____ Supermarkt."',
      options: ['den', 'der', 'dem', 'des'],
      correctAnswer: 0,
      explanation: 'Accusative masculine following preposition of motion "in" takes "den".',
      testedSkill: 'Grammar'
    },
    {
      id: 'de-3',
      question: 'Im Café fragt die Bedienung: "Zusammen oder getrennt?" Was bedeutet das?',
      translation: 'In a café the waiter asks: "Together or separate?" What does it mean?',
      options: [
        'Sugar or milk?',
        'Pay together or split the bill?',
        'Inside or outside seating?',
        'Now or later?'
      ],
      correctAnswer: 1,
      explanation: '"Zusammen oder getrennt zahlen" is the standard bill splitting question.',
      testedSkill: 'Comprehension'
    },
    {
      id: 'de-4',
      question: 'Was antwortet man höflich auf "Vielen Dank für Ihre Hilfe!"?',
      translation: 'What is the polite reply to "Thank you very much for your help!"?',
      options: [
        'Gern geschehen! / Keine Ursache!',
        'Auf Wiedersehen!',
        'Ich weiß nicht.',
        'Das ist schlecht.'
      ],
      correctAnswer: 0,
      explanation: '"Gern geschehen!" means "You are welcome / my pleasure!"',
      testedSkill: 'Conversation'
    },
    {
      id: 'de-5',
      question: 'Vervollständigen Sie: "Wenn ich mehr Zeit hätte, _____ ich mehr reisen."',
      translation: 'Complete: "If I had more time, I _____ travel more."',
      options: ['würde', 'wurde', 'werde', 'wäre'],
      correctAnswer: 0,
      explanation: 'Konjunktiv II subjunctive with conditional verb "würde".',
      testedSkill: 'Grammar'
    }
  ],
  it: [
    {
      id: 'it-1',
      question: 'Come si dice "A cappuccino and a croissant, please" in italiano?',
      translation: 'How do you say "A cappuccino and a croissant, please" in Italian?',
      options: [
        'Un cappuccino e un cornetto, per favore.',
        'Il conto subito grazie.',
        'Vorrei andare a Roma.',
        'Dov\'è il bagno per favore?'
      ],
      correctAnswer: 0,
      explanation: '"Un cappuccino e un cornetto, per favore" is the iconic Italian breakfast order.',
      testedSkill: 'Vocabulary'
    },
    {
      id: 'it-2',
      question: 'Completa con la forma corretta: "Ieri sera noi _____ una pizza fantastica."',
      translation: 'Complete with correct form: "Last night we _____ a fantastic pizza."',
      options: ['abbiamo mangiato', 'siamo mangiato', 'mangiamo', 'mangiando'],
      correctAnswer: 0,
      explanation: 'Passato prossimo with avere: "abbiamo mangiato".',
      testedSkill: 'Grammar'
    },
    {
      id: 'it-3',
      question: 'Al ristorante il cameriere chiede: "Posso portarvi il conto?" Che cosa chiede?',
      translation: 'At the restaurant the waiter asks: "May I bring you the bill?" What is he asking?',
      options: [
        'If you want dessert',
        'If he can bring you the bill / check',
        'If you liked the food',
        'If you want more water'
      ],
      correctAnswer: 1,
      explanation: '"Il conto" means the check/bill.',
      testedSkill: 'Comprehension'
    },
    {
      id: 'it-4',
      question: 'Quale risposta è più naturale a "Grazie mille per il tuo aiuto!"?',
      translation: 'Which response is most natural to "Thank you so much for your help!"?',
      options: [
        'Prego, di niente! È stato un piacere.',
        'Arrivederci mai più.',
        'Non lo so.',
        'Basta così.'
      ],
      correctAnswer: 0,
      explanation: '"Prego, di niente! È stato un piacere" is the polite standard response.',
      testedSkill: 'Conversation'
    },
    {
      id: 'it-5',
      question: 'Scegli la preposizione articolata corretta: "Vado _____ stazione."',
      translation: 'Choose correct articulated preposition: "I go to the station."',
      options: ['alla', 'nella', 'dalla', 'sulla'],
      correctAnswer: 0,
      explanation: '"a + la = alla" (andare alla stazione).',
      testedSkill: 'Grammar'
    }
  ],
  zh: [
    {
      id: 'zh-1',
      question: '在餐厅点餐时，“请给我一杯水”的意思是？',
      translation: 'In a restaurant, what does "Qǐng gěi wǒ yībēi shuǐ" mean?',
      options: [
        'Please bring me the check.',
        'Please give me a glass of water.',
        'Where is the restroom?',
        'How much does this dish cost?'
      ],
      correctAnswer: 1,
      explanation: '"Qǐng gěi wǒ yībēi shuǐ" translates directly to "Please give me a glass of water."',
      testedSkill: 'Vocabulary'
    },
    {
      id: 'zh-2',
      question: '选择正确的量词（Measure Word）：“我买了两_____咖啡。”',
      translation: 'Select the right measure word: "I bought two _____ of coffee."',
      options: ['杯 (bēi)', '本 (běn)', '张 (zhāng)', '条 (tiáo)'],
      correctAnswer: 0,
      explanation: '杯 (bēi) is the cup/glass measure word for beverages.',
      testedSkill: 'Grammar'
    },
    {
      id: 'zh-3',
      question: '结账时服务员说：“一共八十五块，您扫码还是付现金？” 这句话在问什么？',
      translation: 'The cashier asks if you want to scan QR code or pay cash for 85 RMB. What is being asked?',
      options: [
        'If you want dessert or drinks',
        'Payment method: QR code scan or cash',
        'If you have a VIP membership card',
        'If you need a bag'
      ],
      correctAnswer: 1,
      explanation: '"Sǎo mǎ háishì fù xiànjīn" means "Scan QR code or pay cash".',
      testedSkill: 'Comprehension'
    },
    {
      id: 'zh-4',
      question: '当对方说“谢谢你的帮助！”时，最自然客气的回答是：',
      translation: 'When someone says "Thank you for your help!", the most polite reply is:',
      options: [
        '不客气，不用谢！',
        '再见！',
        '我不知道。',
        '太贵了。'
      ],
      correctAnswer: 0,
      explanation: '"Bù kèqì, bùyòng xiè" means "You are welcome, no need to thank".',
      testedSkill: 'Conversation'
    },
    {
      id: 'zh-5',
      question: '表示正在进行的动作：“我正在_____。”',
      translation: 'Indicates ongoing continuous action: "I am currently _____."',
      options: ['学中文 (xué zhōngwén)', '学了中文', '要学中文', '学过中文'],
      correctAnswer: 0,
      explanation: '正在 (zhèngzài) + verb expresses present progressive action.',
      testedSkill: 'Grammar'
    }
  ]
};

export const DEFAULT_7DAY_CHALLENGE: SevenDayChallengeDay[] = [
  {
    day: 1,
    title: 'Cafe & Ordering Fundamentals',
    scenarioId: 'cafe-order',
    scenarioTitle: 'Ordering at a Local Café',
    task: 'Complete your first 3-minute voice ordering dialogue and ask for the receipt.',
    targetMinutes: 5,
    completed: true,
    rewardBadge: '☕ Morning Barista'
  },
  {
    day: 2,
    title: 'Directions & City Navigation',
    scenarioId: 'metro-directions',
    scenarioTitle: 'Asking for Metro Directions',
    task: 'Ask the station master how to buy a metro ticket and which platform to take.',
    targetMinutes: 5,
    completed: false,
    rewardBadge: '🗺️ City Explorer'
  },
  {
    day: 3,
    title: 'Market Bargaining & Shopping',
    scenarioId: 'market-bargain',
    scenarioTitle: 'Bargaining at Market',
    task: 'Negotiate the price of 2 souvenirs and ask for a 15% discount.',
    targetMinutes: 6,
    completed: false,
    rewardBadge: '🛍️ Smart Shopper'
  },
  {
    day: 4,
    title: 'Social Introductions & Hobbies',
    scenarioId: 'language-exchange',
    scenarioTitle: 'Language Exchange Meetup',
    task: 'Introduce yourself, your profession, and describe two hobbies for 5 turns.',
    targetMinutes: 7,
    completed: false,
    rewardBadge: '🤝 Social Connector'
  },
  {
    day: 5,
    title: 'Dining Experience & Food Preferences',
    scenarioId: 'tapas-bar',
    scenarioTitle: 'Tapas & Dining Preferences',
    task: 'Express dietary preferences, order regional specialties, and compliment the chef.',
    targetMinutes: 8,
    completed: false,
    rewardBadge: '🍷 Gourmet Connoisseur'
  },
  {
    day: 6,
    title: 'Handling Everyday Surprises',
    scenarioId: 'hotel-checkin',
    scenarioTitle: 'Hotel Room Issue & Request',
    task: 'Report a missing AC remote and request an extra pillow in fluent target language.',
    targetMinutes: 8,
    completed: false,
    rewardBadge: '🏨 Travel Pro'
  },
  {
    day: 7,
    title: 'Final Mastery Roleplay & Graduation',
    scenarioId: 'job-interview',
    scenarioTitle: 'Job & Career Pitch',
    task: 'Deliver a fluent 2-minute elevator pitch to unlock your 7-Day Completion Certificate.',
    targetMinutes: 10,
    completed: false,
    rewardBadge: '🎓 Fluency Champion'
  }
];

export const DEFAULT_LEARNING_PLAN_MILESTONES: LearningPlanMilestone[] = [
  {
    dayOrWeek: 'Week 1',
    title: 'Survival Confidence & Essential Roleplays',
    focus: 'Greetings, ordering, asking prices, and basic directions with 0 hesitation.',
    targetMinutes: 15,
    recommendedScenarios: ['cafe-order', 'metro-directions', 'market-bargain'],
    keyGrammarPoint: 'Present tense polite requests & core prepositions'
  },
  {
    dayOrWeek: 'Week 2',
    title: 'Conversational Flow & Storytelling',
    focus: 'Sharing personal experiences, hobbies, and navigating travel scenarios.',
    targetMinutes: 20,
    recommendedScenarios: ['language-exchange', 'hotel-checkin', 'doctor-visit'],
    keyGrammarPoint: 'Past tense storytelling & connectives (because, however, therefore)'
  },
  {
    dayOrWeek: 'Week 3',
    title: 'Nuance, Opinions & Complex Situations',
    focus: 'Expressing nuanced opinions, agreeing/disagreeing, and workplace dialogue.',
    targetMinutes: 25,
    recommendedScenarios: ['job-interview', 'tech-meetup', 'apartment-rental'],
    keyGrammarPoint: 'Subjunctive/conditional forms & indirect polite phrasing'
  },
  {
    dayOrWeek: 'Week 4',
    title: 'Spontaneous Native Fluency & Certification',
    focus: 'Debate, rapid-fire Q&A, idiomatic phrases, and CEFR B2/C1 exit exam.',
    targetMinutes: 30,
    recommendedScenarios: ['ai-custom-debates', 'cultural-exchange', 'advanced-negotiation'],
    keyGrammarPoint: 'Idiomatic expressions, humor, and high-frequency colloquialisms'
  }
];

import { AssessmentSection } from './comprehensiveAssessment';

export const EXTENDED_ASSESSMENTS_BY_LANG: Record<string, AssessmentSection[]> = {
  en: [
    {
      skill: 'Vocabulary',
      title: 'Section 1: Vocabulary & Collocations',
      description: 'Test your grasp of idiomatic expressions and everyday conversational vocabulary.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'en-v1',
          question: 'Which word best completes the sentence? "Before signing the agreement, please read the _____ print carefully."',
          translation: 'Select the standard English idiom for subtle contractual conditions.',
          options: ['fine', 'tiny', 'small', 'soft'],
          correctAnswer: 0,
          explanation: '"Fine print" is the standard collocation for small contractual details.',
          testedSkill: 'Vocabulary'
        },
        {
          id: 'en-v2',
          question: 'What does the idiom "to break the ice" mean in a social context?',
          translation: 'Interpret the common conversational phrase.',
          options: ['To cool a drink', 'To initiate conversation and relieve tension', 'To end an argument quickly', 'To leave a party early'],
          correctAnswer: 1,
          explanation: '"To break the ice" means easing awkwardness when meeting new people.',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'Section 2: Grammar & Structure',
      description: 'Assess conditionals, complex tenses, and prepositional accuracy.',
      icon: 'FileText',
      questions: [
        {
          id: 'en-g1',
          question: 'Choose the correct form: "If we _____ earlier, we wouldn\'t have missed the flight."',
          translation: 'Evaluate third conditional counterfactual structure.',
          options: ['left', 'had left', 'would leave', 'have left'],
          correctAnswer: 1,
          explanation: 'Third conditional requires past perfect ("had left") in the "if" clause.',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'Section 3: Reading Comprehension',
      description: 'Read the short professional memo and extract the key action.',
      icon: 'Glasses',
      questions: [
        {
          id: 'en-r1',
          question: 'Notice: "Due to routine scheduled maintenance, the online portal will be temporarily unavailable from 11 PM to 2 AM UTC this Friday. Automatic recurring payments will process as scheduled on Saturday."',
          translation: 'What will happen during the Friday maintenance window?',
          options: [
            'All bank accounts will be closed permanently',
            'Users cannot access the online portal for three hours',
            'Recurring payments will fail to process',
            'Customer support is only available on Friday evening'
          ],
          correctAnswer: 1,
          explanation: 'The portal is unavailable for 3 hours (11 PM to 2 AM UTC).',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'Section 4: Listening & Audio Comprehension',
      description: 'Listen to the spoken audio and identify the speaker\'s polite request.',
      icon: 'Headphones',
      questions: [
        {
          id: 'en-l1',
          question: 'Listen to the speaker: "Excuse me, would you mind keeping an eye on my laptop for a moment while I grab a coffee?" What is the speaker asking for?',
          translation: 'Identify the conversational intent.',
          options: [
            'To buy them a cup of coffee',
            'To watch over their belongings briefly',
            'To help them repair their computer',
            'To share the cafe table'
          ],
          correctAnswer: 1,
          explanation: '"Keep an eye on" means to watch over something for a brief period.',
          audioPrompt: 'Excuse me, would you mind keeping an eye on my laptop for a moment while I grab a coffee?',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'Section 5: Sentence Formation',
      description: 'Arrange the sentence fragments into a polished formal closing.',
      icon: 'FileText',
      questions: [
        {
          id: 'en-w1',
          question: 'Which sequence arranges these words into correct formal business English? [forward / hearing / looking / to / I / am / you / from]',
          translation: 'Select the properly formatted sentence.',
          options: [
            'I am looking forward to hearing from you.',
            'I forward am looking to hearing you from.',
            'Looking forward I am to hearing from you.',
            'To hearing from you I am forward looking.'
          ],
          correctAnswer: 0,
          explanation: '"I am looking forward to hearing from you" is the canonical polite sign-off.',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'Section 6: Spoken Response & Pronunciation',
      description: 'Pronounce the greeting with clear pacing, natural intonation, and connected speech.',
      icon: 'Mic',
      questions: [
        {
          id: 'en-s1',
          question: 'Speak aloud with clear pronunciation: "Good morning! It is a pleasure to meet you today."',
          translation: 'Practice natural conversational cadence and clear consonant endings.',
          options: [
            'Speak into microphone now',
            'Audio verified with standard pronunciation'
          ],
          correctAnswer: 0,
          explanation: 'Focus on clear vowels, linking "pleasure to", and gentle terminal descent.',
          speakingPromptTarget: 'Good morning! It is a pleasure to meet you today.',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],

  it: [
    {
      skill: 'Vocabulary',
      title: 'Sezione 1: Vocabolario e Collocazioni',
      description: 'Verifica la tua conoscenza delle parole e delle espressioni comuni in italiano.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'it-v1',
          question: 'Quale parola completa la frase? "Al ristorante, alla fine della cena, chiediamo il _____ al cameriere."',
          translation: 'Which word completes the sentence? "At the restaurant, at the end of dinner, we ask the waiter for the _____."',
          options: ['conto', 'biglietto', 'menù', 'passaporto'],
          correctAnswer: 0,
          explanation: '"Il conto" significa the bill/check in italiano.',
          testedSkill: 'Vocabulary'
        },
        {
          id: 'it-v2',
          question: 'Cosa significa l\'espressione "in bocca al lupo"?',
          translation: 'What does the idiom "in bocca al lupo" mean?',
          options: ['Buona fortuna!', 'Attento al pericolo!', 'Ho fame!', 'Vado a dormire'],
          correctAnswer: 0,
          explanation: '"In bocca al lupo" è il modo tradizionale per augurare buona fortuna.',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'Sezione 2: Grammatica e Coniugazione',
      description: 'Valuta la tua padronanza dei tempi verbali e dell\'accordo dei pronomi.',
      icon: 'FileText',
      questions: [
        {
          id: 'it-g1',
          question: 'Scegli la forma corretta: "Ieri sera noi _____ una pizza deliziosa in centro."',
          translation: 'Choose the correct form: "Yesterday evening we _____ a delicious pizza downtown."',
          options: ['abbiamo mangiato', 'mangiamo', 'mangeremo', 'mangiavamo'],
          correctAnswer: 0,
          explanation: 'L\'azione puntuale conclusa nel passato ("ieri sera") richiede il Passato Prossimo con avere: "abbiamo mangiato".',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'Sezione 3: Comprensione del Testo',
      description: 'Leggi il breve avviso e rispondi alla domanda.',
      icon: 'Glasses',
      questions: [
        {
          id: 'it-r1',
          question: 'Avviso: "Il Museo civico rimarrà chiuso il lunedì per restauro. Da martedì a domenica l\'ingresso è gratuito per tutti gli studenti con tesserino valido."',
          translation: 'Notice: The museum is closed on Monday. Tue-Sun free for students with ID.',
          options: [
            'Il museo è sempre a pagamento',
            'Gli studenti entrano gratis dal martedì alla domenica',
            'Il museo è aperto 7 giorni su 7',
            'Il museo è chiuso per sempre'
          ],
          correctAnswer: 1,
          explanation: 'L\'avviso specifica ingresso gratuito per studenti con tesserino da martedì a domenica.',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'Sezione 4: Ascolto e Comprensione Orale',
      description: 'Ascolta la frase e individua la richiesta del cliente al bar.',
      icon: 'Headphones',
      questions: [
        {
          id: 'it-l1',
          question: 'Ascolta l\'audio: "Buongiorno! Vorrei un caffè macchiato e un cornetto alla crema, per favore." Cosa ordina il cliente?',
          translation: 'Listen to the audio. What is the customer ordering?',
          options: [
            'Una pizza e un\'acqua minerale',
            'Un caffè macchiato e un cornetto alla crema',
            'Un tè freddo con limone',
            'Un panino con prosciutto'
          ],
          correctAnswer: 1,
          explanation: 'Il cliente chiede chiaramente "un caffè macchiato e un cornetto alla crema".',
          audioPrompt: 'Buongiorno! Vorrei un caffè macchiato e un cornetto alla crema, per favore.',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'Sezione 5: Costruzione della Frase',
      description: 'Ordina i frammenti per comporre una frase corretta.',
      icon: 'FileText',
      questions: [
        {
          id: 'it-w1',
          question: 'Qual è l\'ordine corretto delle parole? [fine / passare / Vorrei / il / settimana / a / Roma]',
          translation: 'Which order creates the grammatical sentence?',
          options: [
            'Vorrei passare il fine settimana a Roma.',
            'Passare vorrei Roma a fine il settimana.',
            'Il fine vorrei settimana passare Roma a.',
            'A Roma passare il fine vorrei settimana.'
          ],
          correctAnswer: 0,
          explanation: '"Vorrei passare il fine settimana a Roma" rispetta la sintassi naturale italiana.',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'Sezione 6: Risposta Orale e Pronuncia',
      description: 'Pronuncia la frase ad alta voce con accento melodico e doppie consonanti curate.',
      icon: 'Mic',
      questions: [
        {
          id: 'it-s1',
          question: 'Pronuncia ad alta voce: "Ciao! Piacere di conoscerti, come stai?"',
          translation: 'Speak aloud: "Hello! Nice to meet you, how are you?"',
          options: ['Registra la risposta vocale', 'Verifica audio completata'],
          correctAnswer: 0,
          explanation: 'Cura la pronuncia dolce della "c" in "piacere" e "conoscerti".',
          speakingPromptTarget: 'Ciao! Piacere di conoscerti, come stai?',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],

  ja: [
    {
      skill: 'Vocabulary',
      title: 'セクション 1: 語彙と表現 (Vocabulary)',
      description: '日常会話で頻出する日本語の単語とコロケーションを測定します。',
      icon: 'BookOpen',
      questions: [
        {
          id: 'ja-v1',
          question: 'レストランで支払いをするとき、店員さんに何と言いますか？ (At a restaurant, what do you ask the staff when paying?)',
          translation: 'When asking for the bill at a restaurant:',
          options: [
            'お会計をお願いします (Okaikei o onegaishimasu)',
            'ごちそうさまでした (Gochisousama deshita)',
            'いらっしゃいませ (Irasshaimase)',
            'すみません、メニューをください (Sumimasen, menyuu o kudasai)'
          ],
          correctAnswer: 0,
          explanation: '「お会計をお願いします」means "Check/bill, please".',
          testedSkill: 'Vocabulary'
        },
        {
          id: 'ja-v2',
          question: '「おすすめ (Osusume)」の意味は何ですか？',
          translation: 'What does the word "Osusume" mean?',
          options: ['Recommendation / Recommended item', 'Receipt', 'Reservation', 'Discount'],
          correctAnswer: 0,
          explanation: '「おすすめ」means "recommendation" or "suggested pick".',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'セクション 2: 助詞と文法 (Grammar & Particles)',
      description: '助詞 (は・が・に・で・を) と動詞活用の正確さを確認します。',
      icon: 'FileText',
      questions: [
        {
          id: 'ja-g1',
          question: '正しい助詞を選んでください：「私は毎朝カフェ _____ コーヒーを飲みます。」(Choose the right particle)',
          translation: 'Select the particle indicating location of action (at the café):',
          options: ['で (de)', 'に (ni)', 'へ (e)', 'を (o)'],
          correctAnswer: 0,
          explanation: '場所で動作を行う場合は助詞「で」を用います (カフェでコーヒーを飲む)。',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'セクション 3: 読解 (Reading Comprehension)',
      description: '案内文を読み、正しい情報を選択してください。',
      icon: 'Glasses',
      questions: [
        {
          id: 'ja-r1',
          question: '案内：「本日、台風のため午後６時に閉店いたします。明日は通常通り午前１０時より営業いたします。」(Notice)',
          translation: 'Store Notice: Closing today at 6 PM due to typhoon; normal opening tomorrow at 10 AM.',
          options: [
            '今日は終日休業です',
            '今日は午後６時に早く閉店します',
            '明日は午後６時に開店します',
            '台風のため明日も休みです'
          ],
          correctAnswer: 1,
          explanation: '「午後６時に閉店いたします」indicates closing early at 6 PM today.',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'セクション 4: リスニング (Listening Comprehension)',
      description: '音声を聞いて質問に答えてください。',
      icon: 'Headphones',
      questions: [
        {
          id: 'ja-l1',
          question: '音声を聞いてください：「すみません、この電車は渋谷駅に止まりますか？」質問者は何を尋ねていますか？',
          translation: 'Listen to the audio. What is the speaker asking?',
          options: [
            '渋谷駅までの切符の値段',
            'この電車が渋谷駅に停車するかどうか',
            '渋谷駅の出口の場所',
            '次の電車の発車時刻'
          ],
          correctAnswer: 1,
          explanation: '「渋谷駅に止まりますか？」は電車が渋谷駅に停車するかを確認する表現です。',
          audioPrompt: 'すみません、この電車は渋谷駅に止まりますか？',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'セクション 5: 文作成 (Sentence Composition)',
      description: '言葉を正しい語順に並び替えてください。',
      icon: 'FileText',
      questions: [
        {
          id: 'ja-w1',
          question: '正しい日本語の語順を選んでください：[はじめまして / よろしく / どうぞ / お願いします]',
          translation: 'Choose the natural greeting order:',
          options: [
            'はじめまして、どうぞよろしくお願いします。',
            'よろしくどうぞはじめましてお願いします。',
            'お願いしますはじめましてどうぞよろしく。',
            'どうぞはじめましてよろしくお願いします。'
          ],
          correctAnswer: 0,
          explanation: '「はじめまして、どうぞよろしくお願いします」が自然な自己紹介の定番表現です。',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'セクション 6: スピーキング (Spoken Pronunciation)',
      description: 'マイクに向かってハキハキと発音してください。',
      icon: 'Mic',
      questions: [
        {
          id: 'ja-s1',
          question: '発音してください：「こんにちは！おすすめの料理は何ですか？」(Konnichiwa! Osusume no ryouri wa nan desu ka?)',
          translation: 'Speak aloud clearly into the microphone.',
          options: ['音声を録音する', '音声判定完了'],
          correctAnswer: 0,
          explanation: 'ピッチアクセントと語尾のイントネーションを意識して発音しましょう。',
          speakingPromptTarget: 'こんにちは！おすすめの料理は何ですか？',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],

  zh: [
    {
      skill: 'Vocabulary',
      title: '第1部分: 核心词汇与表达 (Vocabulary)',
      description: '测试高频中文实用词汇与习惯搭配。',
      icon: 'BookOpen',
      questions: [
        {
          id: 'zh-v1',
          question: '在餐厅吃完饭后，向服务员结账时应该说什么？',
          translation: 'At a restaurant after finishing your meal, what do you say to the server to pay the bill?',
          options: ['服务员，买单！(Mǎidān)', '服务员，上菜！', '欢迎光临！', '谢谢，再见！'],
          correctAnswer: 0,
          explanation: '“买单” (Mǎidān) 是点单结账的常用表达。',
          testedSkill: 'Vocabulary'
        },
        {
          id: 'zh-v2',
          question: '“不客气” (Bù kèqi) 的意思是什么？',
          translation: 'What does "Bù kèqi" mean?',
          options: ['You are welcome', 'Excuse me / Sorry', 'Goodbye', 'Good morning'],
          correctAnswer: 0,
          explanation: '“不客气”用于回应别人的感谢，意为“You are welcome”。',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: '第2部分: 语法与量词 (Grammar & Measure Words)',
      description: '考查量词搭配与基础语序。',
      icon: 'FileText',
      questions: [
        {
          id: 'zh-g1',
          question: '请选择正确的量词：“桌子上有三 _____ 书和两 _____ 笔。”',
          translation: 'Choose the appropriate measure words for books and pens:',
          options: ['本 / 支 (běn / zhī)', '个 / 张 (gè / zhāng)', '只 / 块 (zhī / kuài)', '件 / 把 (jiàn / bǎ)'],
          correctAnswer: 0,
          explanation: '书的量词是“本”，笔的量词是“支”。',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: '第3部分: 阅读理解 (Reading Comprehension)',
      description: '阅读便条并选择正确答案。',
      icon: 'Glasses',
      questions: [
        {
          id: 'zh-r1',
          question: '通知：“李先生，王经理请您今天下午两点半到三楼会议室开会，请带上项目报告。”',
          translation: 'Notice: Mr. Li, Manager Wang invites you to a meeting at 2:30 PM on the 3rd floor.',
          options: [
            '开会地点在一楼大厅',
            '李先生需要在下午两点半开会并带报告',
            '会议改到明天上午举行',
            '王经理取消了今天的会议'
          ],
          correctAnswer: 1,
          explanation: '通知明确说明下午两点半在三楼会议室开会并要求携带报告。',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: '第4部分: 听力理解 (Listening Comprehension)',
      description: '聆听录音并理解说话人的提问。',
      icon: 'Headphones',
      questions: [
        {
          id: 'zh-l1',
          question: '请听录音：“请问，最近的地铁站在哪里？走路需要多久？”说话人在询问什么？',
          translation: 'Listen to the audio. What is the speaker asking about?',
          options: [
            '公共汽车的票价',
            '最近的地铁站位置及步行时间',
            '高铁的出发时刻表',
            '附近的咖啡馆名称'
          ],
          correctAnswer: 1,
          explanation: '说话人询问了地铁站的位置以及步行所需时间。',
          audioPrompt: '请问，最近的地铁站在哪里？走路需要多久？',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: '第5部分: 组词成句 (Sentence Formation)',
      description: '将下列词语排列成通顺的句子。',
      icon: 'FileText',
      questions: [
        {
          id: 'zh-w1',
          question: '请选择正确的语序：[认识 / 很高兴 / 今天 / 你]',
          translation: 'Choose the correct word order:',
          options: [
            '今天很高兴认识你。(Jīntiān hěn gāoxìng rènshi nǐ.)',
            '认识你今天很高兴。',
            '很高兴你认识今天。',
            '今天你很高兴认识。'
          ],
          correctAnswer: 0,
          explanation: '“今天很高兴认识你”符合中文的时间状语前置及谓语结构。',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: '第6部分: 口语朗读与发音 (Spoken Pronunciation)',
      description: '请清晰朗读并注意声调准确。',
      icon: 'Mic',
      questions: [
        {
          id: 'zh-s1',
          question: '请朗读：“你好！请问这个多少钱？可以便宜一点吗？”',
          translation: 'Speak aloud: "Nǐ hǎo! Qǐngwèn zhège duōshǎo qián? Kěyǐ piányi yīdiǎn ma?"',
          options: ['开始语音录制', '语音测评完成'],
          correctAnswer: 0,
          explanation: '注意“多少钱”与“便宜”的声调起伏。',
          speakingPromptTarget: '你好！请问这个多少钱？可以便宜一点吗？',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],

  pt: [
    {
      skill: 'Vocabulary',
      title: 'Seção 1: Vocabulário e Colocações',
      description: 'Teste de palavras essenciais e expressões idiomáticas em português.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'pt-v1',
          question: 'Ao terminar a refeição no restaurante, o que pedimos ao garçom?',
          translation: 'Upon finishing a meal, what do we ask the waiter for?',
          options: ['A conta', 'O cardápio', 'A chave', 'O bilhete'],
          correctAnswer: 0,
          explanation: '"A conta" é o termo usado para solicitar o pagamento no restaurante.',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'Seção 2: Gramática e Conjugação',
      description: 'Avaliação do uso de pretéritos e preposições (por vs para).',
      icon: 'FileText',
      questions: [
        {
          id: 'pt-g1',
          question: 'Complete a frase: "Ontem nós _____ ao centro histórico e adoramos a visita."',
          translation: 'Complete: "Yesterday we _____ to the historic center and loved the visit."',
          options: ['fomos', 'íamos', 'vamos', 'iremos'],
          correctAnswer: 0,
          explanation: 'Ação concluída no passado ("ontem") exige o Pretérito Perfeito: "fomos".',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'Seção 3: Compreensão de Texto',
      description: 'Leia o bilhete e marque a opção correta.',
      icon: 'Glasses',
      questions: [
        {
          id: 'pt-r1',
          question: 'Aviso: "A biblioteca estará fechada para inventário na sexta-feira. Retornaremos ao horário regular no sábado às 9h."',
          translation: 'Notice: Library closed Friday for inventory; reopening Saturday at 9 AM.',
          options: [
            'A biblioteca fecha permanentemente',
            'Na sexta-feira a biblioteca estará fechada',
            'No sábado a biblioteca não abre',
            'O inventário acontece no domingo'
          ],
          correctAnswer: 1,
          explanation: 'O texto declara que a biblioteca fecha na sexta-feira para inventário.',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'Seção 4: Compreensão Auditiva',
      description: 'Escute a fala e identifique o que a pessoa está perguntando.',
      icon: 'Headphones',
      questions: [
        {
          id: 'pt-l1',
          question: 'Ouça o áudio: "Com licença, você sabe onde fica a farmácia mais próxima daqui?" O que a pessoa procura?',
          translation: 'Listen to the audio. What is the speaker looking for?',
          options: [
            'Uma padaria',
            'Uma farmácia',
            'Uma estação de trem',
            'Um hotel'
          ],
          correctAnswer: 1,
          explanation: 'A pessoa pergunta pela localização da farmácia mais próxima.',
          audioPrompt: 'Com licença, você sabe onde fica a farmácia mais próxima daqui?',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'Seção 5: Formação de Frases',
      description: 'Organize os fragmentos em uma frase elegante.',
      icon: 'FileText',
      questions: [
        {
          id: 'pt-w1',
          question: 'Qual é a ordem correta? [conhecer / Muito / prazer / você / em]',
          translation: 'Choose the correct order:',
          options: [
            'Muito prazer em conhecer você.',
            'Conhecer prazer muito em você.',
            'Em você prazer muito conhecer.',
            'Prazer conhecer muito você em.'
          ],
          correctAnswer: 0,
          explanation: '"Muito prazer em conhecer você" é a saudação formal e calorosa padrão.',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'Seção 6: Pronúncia e Fala Ativa',
      description: 'Pronuncie com clareza a saudação em português.',
      icon: 'Mic',
      questions: [
        {
          id: 'pt-s1',
          question: 'Fale em voz alta: "Olá! Tudo bem com você? É um prazer conversar hoje."',
          translation: 'Speak aloud: "Hello! How are you doing? It is a pleasure to talk today."',
          options: ['Gravar fala agora', 'Verificação de áudio concluída'],
          correctAnswer: 0,
          explanation: 'Atenção à nasalidade de "bem" e ritmo fluido.',
          speakingPromptTarget: 'Olá! Tudo bem com você? É um prazer conversar hoje.',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],

  ko: [
    {
      skill: 'Vocabulary',
      title: '1단계: 핵심 어휘 (Vocabulary)',
      description: '일상 대화에서 필수적인 한국어 단어와 표현을 테스트합니다.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'ko-v1',
          question: '식당에서 식사를 마친 후 결제할 때 직원에게 무엇을 부탁하나요?',
          translation: 'At a restaurant, what do you ask the staff for when paying?',
          options: [
            '계산해 주세요 (Gyesan-hae juseyo)',
            '메뉴판 주세요 (Menyupan juseyo)',
            '물 좀 주세요 (Mul jom juseyo)',
            '안녕히 계세요 (Annyeonghi gyeseyo)'
          ],
          correctAnswer: 0,
          explanation: '"계산해 주세요" means "Please give me the check / bill".',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: '2단계: 문법과 조사 (Grammar & Particles)',
      description: '은/는, 이/가 조사와 공손한 어미(-아요/어요)를 평가합니다.',
      icon: 'FileText',
      questions: [
        {
          id: 'ko-g1',
          question: '빈칸에 들어갈 알맞은 조사는? "저는 내일 친구 _____ 영화를 볼 거예요."',
          translation: 'Choose the correct particle meaning "with a friend":',
          options: ['와/과 (또는 하고) (with)', '에게 (to)', '에서 (at)', '로 (by/toward)'],
          correctAnswer: 0,
          explanation: '"친구와" 또는 "친구하고"는 "with a friend"를 의미하는 동반 조사입니다.',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: '3단계: 읽기 이해 (Reading Comprehension)',
      description: '안내문을 읽고 알맞은 답을 고르세요.',
      icon: 'Glasses',
      questions: [
        {
          id: 'ko-r1',
          question: '카페 공지: "주문하신 음료가 준비되면 진동벨이 울립니다. 픽업대에서 영수증을 보여주세요."',
          translation: 'Notice: When your drink is ready, the buzzer rings. Present your receipt at the pickup counter.',
          options: [
            '음료를 직접 배달해 줍니다',
            '진동벨이 울리면 픽업대로 가서 음료를 받습니다',
            '영수증이 없어도 됩니다',
            '주문은 전화로만 가능합니다'
          ],
          correctAnswer: 1,
          explanation: '진동벨이 울릴 때 픽업대에서 수령한다는 내용입니다.',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: '4단계: 듣기 평가 (Listening Comprehension)',
      description: '음성을 듣고 질문하는 내용을 파악하세요.',
      icon: 'Headphones',
      questions: [
        {
          id: 'ko-l1',
          question: '음성을 들어보세요: "실례합니다, 가장 가까운 지하철역이 어디에 있나요?" 질문자가 찾는 장소는?',
          translation: 'Listen to the audio. What is the speaker looking for?',
          options: ['지하철역 (Subway station)', '버스 정류장 (Bus stop)', '편의점 (Convenience store)', '우체국 (Post office)'],
          correctAnswer: 0,
          explanation: '"가장 가까운 지하철역이 어디에 있나요?"라고 묻고 있습니다.',
          audioPrompt: '실례합니다, 가장 가까운 지하철역이 어디에 있나요?',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: '5단계: 문장 완성 (Sentence Composition)',
      description: '단어 조각을 알맞은 순서로 나열하세요.',
      icon: 'FileText',
      questions: [
        {
          id: 'ko-w1',
          question: '올바른 한국어 인사 문장을 고르세요: [반갑습니다 / 만나서 / 정말]',
          translation: 'Arrange into the correct greeting:',
          options: [
            '만나서 정말 반갑습니다.',
            '정말 반갑습니다 만나서.',
            '반갑습니다 만나서 정말.',
            '만나서 반갑습니다 정말.'
          ],
          correctAnswer: 0,
          explanation: '"만나서 정말 반갑습니다"가 자연스러운 한국어 인사말입니다.',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: '6단계: 말하기와 발음 (Spoken Pronunciation)',
      description: '마이크를 켜고 자연스러운 억양으로 말씀하세요.',
      icon: 'Mic',
      questions: [
        {
          id: 'ko-s1',
          question: '소리 내어 말씀해 보세요: "안녕하세요! 오늘 어떤 대화를 나눠볼까요?"',
          translation: 'Speak aloud into the microphone.',
          options: ['음성 녹음 시작', '발음 테스트 완료'],
          correctAnswer: 0,
          explanation: '친절하고 부드러운 억양으로 끝을 살짝 올려 발음해 보세요.',
          speakingPromptTarget: '안녕하세요! 오늘 어떤 대화를 나눠볼까요?',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],

  ar: [
    {
      skill: 'Vocabulary',
      title: 'القسم الأول: المفردات والتعبيرات (Vocabulary)',
      description: 'اختبار المفردات الأساسية شائعة الاستخدام في اللغة العربية.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'ar-v1',
          question: 'عند الانتهاء من تناول الطعام في المطعم، ماذا تطلب من النادل لدفع الثمن؟',
          translation: 'At the end of a meal in a restaurant, what do you ask the waiter for?',
          options: ['الحساب، من فضلك (The check, please)', 'قائمة الطعام', 'مفتاح الغرفة', 'كوب ماء'],
          correctAnswer: 0,
          explanation: '"الحساب، من فضلك" هي العبارة القياسية لطلب الفاتورة.',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'القسم الثاني: القواعد وتركيب الجمل (Grammar)',
      description: 'تقييم مطابقة الفعل والفاعل وأدوات الربط.',
      icon: 'FileText',
      questions: [
        {
          id: 'ar-g1',
          question: 'اختر الفعل المناسب: "أمس _____ الطلاب إلى المكتبة العامة للقراءة."',
          translation: 'Choose the correct verb form for past action:',
          options: ['ذهبَ (Dhahaba)', 'يذهبُ', 'سيذهبُ', 'اذهبْ'],
          correctAnswer: 0,
          explanation: 'الفعل في بداية الجملة مع الفاعل المذكر المفرد في صيغة الماضي هو "ذهبَ".',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'القسم الثالث: فهم المقروء (Reading)',
      description: 'اقرأ الإشعار القصير وأجب عن السؤال.',
      icon: 'Glasses',
      questions: [
        {
          id: 'ar-r1',
          question: 'إعلان: "يفتح المعرض أبوابه يومياً من الساعة التاسعة صباحاً حتى الثامنة مساءً، والدخول مجاني للأطفال دون سن العاشرة."',
          translation: 'Notice: Exhibition open daily 9 AM - 8 PM; free entry for kids under 10.',
          options: [
            'الدخول مجاني لجميع الأعمار',
            'الأطفال دون سن العاشرة يدخلون مجاناً',
            'المعرض مغلق في المساء',
            'المعرض يفتح يوماً واحداً في الأسبوع فقط'
          ],
          correctAnswer: 1,
          explanation: 'النص يوضح أن الدخول مجاني للأطفال دون سن العاشرة.',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'القسم الرابع: الاستماع والاستيعاب (Listening)',
      description: 'استمع إلى التسجيل وحدد وجهة المتحدث.',
      icon: 'Headphones',
      questions: [
        {
          id: 'ar-l1',
          question: 'استمع للتسجيل: "لو سمحت، أين تقع محطة القطار الرئيسية؟" عن ماذا يستفسر المتحدث؟',
          translation: 'Listen to the audio. What is the speaker inquiring about?',
          options: [
            'موقع محطة القطار الرئيسية (Main train station location)',
            'موعد إقلاع الطائرة',
            'حجز غرفة في الفندق',
            'سعر تذكرة الحافلة'
          ],
          correctAnswer: 0,
          explanation: 'المتحدث يسأل بوضوح عن موقع محطة القطار الرئيسية.',
          audioPrompt: 'لو سمحت، أين تقع محطة القطار الرئيسية؟',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'القسم الخامس: ترتيب الجمل (Writing)',
      description: 'رتّب الكلمات لتكوين جملة ترحيبية صحيحة.',
      icon: 'FileText',
      questions: [
        {
          id: 'ar-w1',
          question: 'ما هو الترتيب الصحيح؟ [بمعرفتك / تشرفت / أهلاً / بك]',
          translation: 'Arrange into the natural greeting:',
          options: [
            'أهلاً بك، تشرفت بمعرفتك.',
            'تشرفت أهلاً بمعرفتك بك.',
            'بمعرفتك تشرفت بك أهلاً.',
            'بك تشرفت بمعرفتك أهلاً.'
          ],
          correctAnswer: 0,
          explanation: '"أهلاً بك، تشرفت بمعرفتك" هي الصيغة الصحيحة والأكثر تهذيباً.',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'القسم السادس: النطق والمحادثة (Speaking)',
      description: 'تحدث بصوت واضح ومخارج حروف دقيقة.',
      icon: 'Mic',
      questions: [
        {
          id: 'ar-s1',
          question: 'انطق بصوت واضح: "مرحباً! كيف حالك اليوم؟ يسعدني التحدث معك."',
          translation: 'Speak aloud clearly with natural Arabic cadence.',
          options: ['تسجيل الصوت الآن', 'تم التحقق من النطق'],
          correctAnswer: 0,
          explanation: 'ركز على نطق حرف "الحاء" و"العين" بوضوح وسلاسة.',
          speakingPromptTarget: 'مرحباً! كيف حالك اليوم؟ يسعدني التحدث معك.',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],

  ru: [
    {
      skill: 'Vocabulary',
      title: 'Раздел 1: Словарный запас (Vocabulary)',
      description: 'Проверка знания частотных слов и речевых оборотов русского языка.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'ru-v1',
          question: 'Какое слово пропущено? "В ресторане после ужина мы просим официанта принести _____."',
          translation: 'Which word is missing? "In a restaurant after dinner we ask the waiter for the _____."',
          options: ['счёт', 'билет', 'меню', 'ключ'],
          correctAnswer: 0,
          explanation: '"Счёт" означает bill / check в ресторане.',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'Раздел 2: Грамматика и падежи (Grammar & Cases)',
      description: 'Оценка знания падежных окончаний и предлогов.',
      icon: 'FileText',
      questions: [
        {
          id: 'ru-g1',
          question: 'Выберите правильную форму: "Вчера мы долго гуляли по красивому _____."',
          translation: 'Choose the correct form (Dative case after "по"):',
          options: ['парку', 'парке', 'парком', 'парка'],
          correctAnswer: 0,
          explanation: 'Предлог "по" с пространственным значением требует дательного падежа: "по красивому парку".',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'Раздел 3: Понимание текста (Reading)',
      description: 'Прочитайте объявление и ответьте на вопрос.',
      icon: 'Glasses',
      questions: [
        {
          id: 'ru-r1',
          question: 'Объявление: "Уважаемые пассажиры! Поезд до Санкт-Петербурга отправляется с третьей платформы в 14:15. Посадка начинается за 20 минут."',
          translation: 'Notice: Train to St. Petersburg departs platform 3 at 14:15; boarding starts 20 mins prior.',
          options: [
            'Поезд отправляется со второй платформы',
            'Посадка начинается в 13:55 с третьей платформы',
            'Поезд задерживается на два часа',
            'Билеты продаются только в поезде'
          ],
          correctAnswer: 1,
          explanation: '14:15 минус 20 минут = 13:55 начало посадки с 3-й платформы.',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'Раздел 4: Аудирование (Listening Comprehension)',
      description: 'Послушайте вопрос и выберите правильный ответ.',
      icon: 'Headphones',
      questions: [
        {
          id: 'ru-l1',
          question: 'Послушайте аудио: "Скажите, пожалуйста, где находится ближайшая аптека?" Что ищет говорящий?',
          translation: 'Listen to the audio. What is the speaker looking for?',
          options: ['Аптеку (Pharmacy)', 'Метро (Metro)', 'Банкомат (ATM)', 'Кафе (Café)'],
          correctAnswer: 0,
          explanation: 'Говорящий спрашивает о ближайшей аптеке.',
          audioPrompt: 'Скажите, пожалуйста, где находится ближайшая аптека?',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'Раздел 5: Порядок слов (Sentence Composition)',
      description: 'Составьте правильное предложение из предложенных слов.',
      icon: 'FileText',
      questions: [
        {
          id: 'ru-w1',
          question: 'Каков правильный порядок слов? [познакомиться / рад / вами / с / Очень]',
          translation: 'Choose the correct order:',
          options: [
            'Очень рад с вами познакомиться.',
            'С вами рад очень познакомиться.',
            'Познакомиться очень вами рад с.',
            'Рад с познакомиться очень вами.'
          ],
          correctAnswer: 0,
          explanation: '"Очень рад с вами познакомиться" — стандартная вежливая фраза при знакомстве.',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'Раздел 6: Разговорная речь и произношение (Speaking)',
      description: 'Произнесите фразу четко с правильным ударением.',
      icon: 'Mic',
      questions: [
        {
          id: 'ru-s1',
          question: 'Произнесите вслух: "Здравствуйте! Как ваши дела? Рад вас видеть."',
          translation: 'Speak aloud clearly into the microphone.',
          options: ['Записать ответ', 'Проверка звука завершена'],
          correctAnswer: 0,
          explanation: 'Обратите внимание на редукцию безударных гласных и четкое "Здравствуйте".',
          speakingPromptTarget: 'Здравствуйте! Как ваши дела? Рад вас видеть.',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],

  hi: [
    {
      skill: 'Vocabulary',
      title: 'खंड 1: शब्दावली और प्रयोग (Vocabulary)',
      description: 'दैनिक बातचीत में उपयोगी हिंदी शब्दों का मूल्यांकन।',
      icon: 'BookOpen',
      questions: [
        {
          id: 'hi-v1',
          question: 'होटल या रेस्टोरेंट में खाना खाने के बाद भुगतान के लिए क्या माँगते हैं?',
          translation: 'At a restaurant after a meal, what do you ask for to pay?',
          options: ['बिल (Bill)', 'मेन्यू (Menu)', 'चाबी (Key)', 'किताब (Book)'],
          correctAnswer: 0,
          explanation: 'भुगतान के लिए "बिल" माँगा जाता है।',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'खंड 2: व्याकरण और परसर्ग (Grammar & Postpositions)',
      description: 'कारक (ने, को, से, में) और काल का सही प्रयोग।',
      icon: 'FileText',
      questions: [
        {
          id: 'hi-g1',
          question: 'सही वाक्य चुनिए: "मैं कल अपने दोस्त के साथ बाज़ार _____।"',
          translation: 'Choose the correct past verb form for "I went to the market with my friend yesterday":',
          options: ['गया था / गई थी', 'जाता हूँ', 'जाऊँगा', 'जा रहा हूँ'],
          correctAnswer: 0,
          explanation: 'बीते हुए समय ("कल") के लिए भूतकाल रूप "गया था" प्रयुक्त होता है।',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'खंड 3: पठन बोध (Reading Comprehension)',
      description: 'सूचना को पढ़कर सही विकल्प चुनिए।',
      icon: 'Glasses',
      questions: [
        {
          id: 'hi-r1',
          question: 'सूचना: "पुस्तकालय सोमवार को बंद रहता है। मंगलवार से रविवार तक सुबह ९ बजे से शाम ६ बजे तक खुला रहेगा।"',
          translation: 'Notice: Library closed Mondays; open Tue-Sun 9 AM - 6 PM.',
          options: [
            'पुस्तकालय सोमवार को खुला रहता है',
            'पुस्तकालय मंगलवार से रविवार तक खुला रहता है',
            'पुस्तकालय हमेशा बंद रहता है',
            'पुस्तकालय केवल रात को खुलता है'
          ],
          correctAnswer: 1,
          explanation: 'सूचना स्पष्ट रूप से बताती है कि मंगलवार से रविवार तक पुस्तकालय खुला रहता है।',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'खंड 4: श्रवण और समझ (Listening)',
      description: 'ऑडियो सुनें और वक्ता का अभिप्राय पहचानें।',
      icon: 'Headphones',
      questions: [
        {
          id: 'hi-l1',
          question: 'ऑडियो सुनिए: "नमस्ते! क्या आप बता सकते हैं कि यहाँ से रेलवे स्टेशन कितनी दूर है?" वक्ता क्या पूछ रहा है?',
          translation: 'Listen to the audio. What is the speaker asking?',
          options: [
            'रेलवे स्टेशन की दूरी (Distance to railway station)',
            'हवाई अड्डे का रास्ता',
            'होटल का किराया',
            'बस का टिकट'
          ],
          correctAnswer: 0,
          explanation: 'वक्ता रेलवे स्टेशन की दूरी के बारे में पूछ रहा है।',
          audioPrompt: 'नमस्ते! क्या आप बता सकते हैं कि यहाँ से रेलवे स्टेशन कितनी दूर है?',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'खंड 5: वाक्य संरचना (Sentence Composition)',
      description: 'शब्दों को सही क्रम में रखकर अर्थपूर्ण वाक्य बनाइए।',
      icon: 'FileText',
      questions: [
        {
          id: 'hi-w1',
          question: 'सही क्रम चुनिए: [हुई / मिलकर / बहुत / आपसे / खुशी]',
          translation: 'Select the correct sentence order:',
          options: [
            'आपसे मिलकर बहुत खुशी हुई।',
            'बहुत हुई खुशी आपसे मिलकर।',
            'खुशी मिलकर बहुत आपसे हुई।',
            'आपसे हुई बहुत मिलकर खुशी।'
          ],
          correctAnswer: 0,
          explanation: '"आपसे मिलकर बहुत खुशी हुई" हिंदी में शिष्टाचार का सुंदर और मानक वाक्य है।',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'खंड 6: मौखिक अभिव्यक्ति और उच्चारण (Speaking)',
      description: 'माइक में स्पष्ट और विनम्र स्वर में बोलिए।',
      icon: 'Mic',
      questions: [
        {
          id: 'hi-s1',
          question: 'ज़ोर से बोलिए: "नमस्ते! आप कैसे हैं? आपसे बात करके बहुत अच्छा लगा।"',
          translation: 'Speak aloud into the microphone.',
          options: ['आवाज़ रिकॉर्ड करें', 'उच्चारण जाँचा गया'],
          correctAnswer: 0,
          explanation: 'स्पष्ट उच्चारण और विनम्र भाव के साथ बोलें।',
          speakingPromptTarget: 'नमस्ते! आप कैसे हैं? आपसे बात करके बहुत अच्छा लगा।',
          testedSkill: 'Speaking'
        }
      ]
    }
  ]
};

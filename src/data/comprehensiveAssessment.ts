import { LanguageTestQuestion, WeeklyPlanBreakdown } from '../types';
import { EXTENDED_ASSESSMENTS_BY_LANG } from './comprehensiveAssessmentsExtended';

export interface AssessmentSection {
  skill: 'Vocabulary' | 'Grammar' | 'Reading' | 'Listening' | 'Writing' | 'Speaking';
  title: string;
  description: string;
  icon: string;
  questions: LanguageTestQuestion[];
}

const BASE_ASSESSMENTS_BY_LANG: Record<string, AssessmentSection[]> = {
  de: [
    {
      skill: 'Vocabulary',
      title: 'Section 1: Vocabulary & Collocations',
      description: 'Test your understanding of high-frequency words and conversational collocations.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'de-v1',
          question: 'Welches Wort passt am besten? "Könnten Sie mir bitte die _____ bringen? Ich möchte bezahlen."',
          translation: 'Which word fits best? "Could you please bring me the _____? I would like to pay."',
          options: ['Speisekarte', 'Rechnung', 'Fahrkarte', 'Zeitung'],
          correctAnswer: 1,
          explanation: '"Die Rechnung" means the bill/check at a café or restaurant.',
          testedSkill: 'Vocabulary'
        },
        {
          id: 'de-v2',
          question: 'Was ist das Gegenteil von "pünktlich"?',
          translation: 'What is the opposite of "punctual"?',
          options: ['höflich', 'verspätet', 'zufrieden', 'vorsichtig'],
          correctAnswer: 1,
          explanation: '"Verspätet" means delayed / late, opposite of "pünktlich".',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'Section 2: Grammar & Word Order',
      description: 'Test your grasp of German verb placement, cases, and conjugations.',
      icon: 'FileText',
      questions: [
        {
          id: 'de-g1',
          question: 'Wählen Sie die richtige Satzstellung: "Weil das Wetter schön ist, _____."',
          translation: 'Choose the correct word order: "Because the weather is nice, _____."',
          options: [
            'wir machen einen Spaziergang',
            'machen wir einen Spaziergang',
            'wir einen Spaziergang machen',
            'einen Spaziergang wir machen'
          ],
          correctAnswer: 1,
          explanation: 'When a subordinate clause (Weil...) comes first, the main clause starts with the verb in 2nd position relative to the sentence: "machen wir...".',
          testedSkill: 'Grammar'
        },
        {
          id: 'de-g2',
          question: 'Welcher Artikel und Fall ist richtig? "Ich helfe _____ (der Mann) bei der Arbeit."',
          translation: 'Which article and case is correct? "I help _____ (the man) with the work."',
          options: ['den Mann', 'dem Mann', 'des Mannes', 'der Mann'],
          correctAnswer: 1,
          explanation: 'The verb "helfen" always requires a Dative object: "dem Mann".',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'Section 3: Reading Comprehension',
      description: 'Read the short notice and answer the contextual question.',
      icon: 'Glasses',
      questions: [
        {
          id: 'de-r1',
          question: 'Laut dem Text: Wann kann Herr Müller sein Paket frühestens abholen?',
          translation: 'According to the text: When can Mr. Müller pick up his parcel at the earliest?',
          readingPassage: 'Sehr geehrte Kundin, sehr geehrter Kunde, wir konnten Ihr Paket heute leider nicht zustellen. Ihre Sendung liegt ab morgen, 10:00 Uhr, in der Postfiliale am Hauptbahnhof für Sie bereit. Bitte bringen Sie einen Lichtbildausweis mit.',
          options: [
            'Heute Abend um 18:00 Uhr',
            'Ab morgen um 10:00 Uhr in der Filiale am Hauptbahnhof',
            'In zwei Wochen bei der Post',
            'Direkt an seiner Haustür'
          ],
          correctAnswer: 1,
          explanation: 'The notice explicitly states: "liegt ab morgen, 10:00 Uhr, in der Postfiliale am Hauptbahnhof für Sie bereit."',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'Section 4: Listening Comprehension',
      description: 'Listen to the native audio message and select the correct answer.',
      icon: 'Headphones',
      questions: [
        {
          id: 'de-l1',
          question: 'Was möchte die Sprecherin reservieren?',
          translation: 'What does the speaker want to reserve?',
          audioPrompt: 'Guten Tag, mein Name ist Sarah Becker. Ich möchte gerne einen Tisch für vier Personen für diesen Freitag um 19 Uhr reservieren. Haben Sie noch Platz?',
          options: [
            'Ein Hotelzimmer für 4 Nächte',
            'Einen Tisch für 4 Personen für Freitag um 19 Uhr',
            'Ein Zugticket nach München',
            'Einen Termin beim Arzt'
          ],
          correctAnswer: 1,
          explanation: 'The audio speaker says: "Ich möchte gerne einen Tisch für vier Personen für diesen Freitag um 19 Uhr reservieren."',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'Section 5: Interactive Writing Construction',
      description: 'Construct the correct written German response to complete the sentence.',
      icon: 'Edit3',
      questions: [
        {
          id: 'de-w1',
          question: 'Übersetzen Sie ins Deutsche: "I would like to order a coffee with milk, please."',
          translation: 'Translate into German: "I would like to order a coffee with milk, please."',
          options: [
            'Ich möchte bitte einen Kaffee mit Milch bestellen.',
            'Ich habe einen Kaffee und Milch bestellt.',
            'Ich trinke Kaffee ohne Milch gerne.',
            'Wo ist der Kaffee mit Milch jetzt?'
          ],
          correctAnswer: 0,
          explanation: '"Ich möchte bitte einen Kaffee mit Milch bestellen" is the natural, grammatically perfect phrasing.',
          writingPromptTarget: 'Ich möchte bitte einen Kaffee mit Milch bestellen.',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'Section 6: Spoken Fluency & Pronunciation',
      description: 'Practice speaking the target phrase aloud with clear native pronunciation.',
      icon: 'Mic',
      questions: [
        {
          id: 'de-s1',
          question: 'Sprechen Sie den Satz laut aus: "Guten Tag, wie geht es Ihnen heute?"',
          translation: 'Pronounce the sentence aloud: "Good day, how are you today?"',
          options: [
            'Guten Tag, wie geht es Ihnen heute?',
            'Auf Wiedersehen und schönen Tag!',
            'Ich verstehe leider kein Deutsch.',
            'Vielen Dank für Ihre Einladung.'
          ],
          correctAnswer: 0,
          explanation: 'Clear German pronunciation with natural melody and correct stress on "Gu-ten Tag" and "Ih-nen".',
          speakingPromptTarget: 'Guten Tag, wie geht es Ihnen heute?',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],
  es: [
    {
      skill: 'Vocabulary',
      title: 'Section 1: Vocabulary & Collocations',
      description: 'Test your understanding of high-frequency Spanish words.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'es-v1',
          question: '¿Qué palabra completa la frase? "Al terminar la cena, pedimos la _____ al camarero."',
          translation: 'What word completes the sentence? "At the end of dinner, we ask the waiter for the _____."',
          options: ['cuenta', 'maleta', 'dirección', 'llave'],
          correctAnswer: 0,
          explanation: '"La cuenta" is the bill/check in Spanish.',
          testedSkill: 'Vocabulary'
        },
        {
          id: 'es-v2',
          question: '¿Cuál es el significado de "apretón de manos"?',
          translation: 'What is the meaning of "handshake"?',
          options: ['Abrazo', 'Saludo con la mano (handshake)', 'Despedida', 'Conversación'],
          correctAnswer: 1,
          explanation: '"Apretón de manos" is a formal handshake greeting.',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'Section 2: Grammar & Conjugation',
      description: 'Evaluate your command of Spanish tenses and verb moods.',
      icon: 'FileText',
      questions: [
        {
          id: 'es-g1',
          question: 'Selecciona la forma verbal correcta: "Ayer nosotros _____ a la playa y descansamos."',
          translation: 'Select the correct verb form: "Yesterday we _____ to the beach and rested."',
          options: ['fuimos', 'íbamos', 'vamos', 'iremos'],
          correctAnswer: 0,
          explanation: '"Ayer" (yesterday) with completed past action takes the pretérito indefinido: "fuimos".',
          testedSkill: 'Grammar'
        },
        {
          id: 'es-g2',
          question: 'Elige la opción correcta: "Es importante que tú _____ todos los días."',
          translation: 'Choose the correct option: "It is important that you _____ every day."',
          options: ['practicas', 'practiques', 'practicó', 'practicando'],
          correctAnswer: 1,
          explanation: 'Impersonal expression of necessity ("Es importante que...") triggers the Present Subjunctive: "practiques".',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'Section 3: Reading Comprehension',
      description: 'Read the short notice and answer the question.',
      icon: 'Glasses',
      questions: [
        {
          id: 'es-r1',
          question: 'Según el texto, ¿a qué hora abre el museo los domingos?',
          translation: 'According to the text, what time does the museum open on Sundays?',
          readingPassage: 'Horario del Museo de Bellas Artes: De martes a sábado de 9:00 a 20:00. Domingos y días festivos de 10:00 a 15:00. Los lunes el museo permanece cerrado por mantenimiento.',
          options: [
            'A las 9:00',
            'A las 10:00',
            'A las 15:00',
            'Está cerrado todo el día'
          ],
          correctAnswer: 1,
          explanation: 'The text specifies: "Domingos y días festivos de 10:00 a 15:00".',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'Section 4: Listening Comprehension',
      description: 'Listen to the native Spanish recording and choose the answer.',
      icon: 'Headphones',
      questions: [
        {
          id: 'es-l1',
          question: '¿Qué problema tiene el viajero?',
          translation: 'What problem does the traveler have?',
          audioPrompt: 'Disculpe, creo que mi equipaje no ha llegado en la cinta número 3. ¿Dónde puedo hacer la reclamación de mi maleta?',
          options: [
            'Perdió su pasaporte',
            'Su maleta no ha llegado en la cinta de equipajes',
            'Llegó tarde al vuelo',
            'Quiere cambiar de asiento'
          ],
          correctAnswer: 1,
          explanation: 'The speaker asks: "¿Dónde puedo hacer la reclamación de mi maleta?" because the luggage did not arrive.',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'Section 5: Written Construction',
      description: 'Translate and construct the sentence in Spanish.',
      icon: 'Edit3',
      questions: [
        {
          id: 'es-w1',
          question: 'Traduce: "I have been learning Spanish for three months."',
          translation: 'Translate: "I have been learning Spanish for three months."',
          options: [
            'Llevo tres meses aprendiendo español.',
            'Tengo tres meses para aprender español.',
            'Hice tres meses en español.',
            'Estoy tres meses con español.'
          ],
          correctAnswer: 0,
          explanation: '"Llevar + [duración] + gerundio" is the natural Spanish idiom for continuous ongoing duration.',
          writingPromptTarget: 'Llevo tres meses aprendiendo español.',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'Section 6: Spoken Fluency',
      description: 'Pronounce the Spanish phrase clearly into the microphone.',
      icon: 'Mic',
      questions: [
        {
          id: 'es-s1',
          question: 'Pronuncia en voz alta: "¡Hola! Mucho gusto en conocerte."',
          translation: 'Pronounce aloud: "Hello! Nice to meet you."',
          options: [
            '¡Hola! Mucho gusto en conocerte.',
            'Buenas tardes, ¿dónde está el metro?',
            'No hablo mucho español.',
            'Hasta mañana por la tarde.'
          ],
          correctAnswer: 0,
          explanation: 'Natural Spanish intonation with warm cadence and correct rolling of syllables.',
          speakingPromptTarget: '¡Hola! Mucho gusto en conocerte.',
          testedSkill: 'Speaking'
        }
      ]
    }
  ],
  fr: [
    {
      skill: 'Vocabulary',
      title: 'Section 1: Vocabulary & Collocations',
      description: 'Test high-yield French vocabulary.',
      icon: 'BookOpen',
      questions: [
        {
          id: 'fr-v1',
          question: 'Quel mot complète la phrase ? "Au restaurant, je demande _____ pour payer."',
          translation: 'Which word completes the sentence? "At the restaurant, I ask for _____ to pay."',
          options: ['l\'addition', 'la serviette', 'la clé', 'le billet'],
          correctAnswer: 0,
          explanation: '"L\'addition" is the restaurant check/bill in French.',
          testedSkill: 'Vocabulary'
        }
      ]
    },
    {
      skill: 'Grammar',
      title: 'Section 2: Grammar & Conjugation',
      description: 'Test French tense and agreement rules.',
      icon: 'FileText',
      questions: [
        {
          id: 'fr-g1',
          question: 'Complétez : "Hier soir, mes amis _____ chez moi pour dîner."',
          translation: 'Complete: "Last night, my friends _____ to my place for dinner."',
          options: ['sont venus', 'ont venu', 'venaient', 'viennent'],
          correctAnswer: 0,
          explanation: 'Venir is a verb of movement conjugated with "être" in Passé Composé: "sont venus" (with plural agreement).',
          testedSkill: 'Grammar'
        }
      ]
    },
    {
      skill: 'Reading',
      title: 'Section 3: Reading Comprehension',
      description: 'Read the short French message and choose the answer.',
      icon: 'Glasses',
      questions: [
        {
          id: 'fr-r1',
          question: 'Quel est l\'objet du message ?',
          translation: 'What is the purpose of the message?',
          readingPassage: 'Chers passagers, en raison de travaux sur la ligne, le départ du TGV pour Bordeaux est retardé de 25 minutes. Nous vous prions de nous excuser pour la gêne occasionnée.',
          options: [
            'Le train est annulé',
            'Le train a un retard de 25 minutes à cause de travaux',
            'Changement de quai pour le train',
            'Le train est arrivé en avance'
          ],
          correctAnswer: 1,
          explanation: 'The announcement indicates a 25-minute delay due to track maintenance ("travaux sur la ligne").',
          testedSkill: 'Reading'
        }
      ]
    },
    {
      skill: 'Listening',
      title: 'Section 4: Listening Comprehension',
      description: 'Listen to the audio and answer the question.',
      icon: 'Headphones',
      questions: [
        {
          id: 'fr-l1',
          question: 'Que désire commander le client ?',
          translation: 'What does the customer want to order?',
          audioPrompt: 'Bonjour, je voudrais une formule déjeuner avec une quiche lorraine, une petite salade et une carafe d’eau, s’il vous plaît.',
          options: [
            'Une quiche lorraine, une salade et de l\'eau',
            'Un café avec un croissant',
            'Une pizza et un soda',
            'Un dessert seulement'
          ],
          correctAnswer: 0,
          explanation: 'The customer orders "une formule déjeuner avec une quiche lorraine, une petite salade et une carafe d’eau".',
          testedSkill: 'Listening'
        }
      ]
    },
    {
      skill: 'Writing',
      title: 'Section 5: Written Construction',
      description: 'Select the polite written French phrasing.',
      icon: 'Edit3',
      questions: [
        {
          id: 'fr-w1',
          question: 'Traduisez : "Could you tell me how to get to the museum, please?"',
          translation: 'Translate: "Could you tell me how to get to the museum, please?"',
          options: [
            'Pourriez-vous m\'indiquer le chemin pour aller au musée, s\'il vous plaît ?',
            'Où est le musée tout de suite ?',
            'Je cherche le musée maintenant avec vous.',
            'Donnez-moi le musée s\'il vous plaît.'
          ],
          correctAnswer: 0,
          explanation: '"Pourriez-vous m\'indiquer le chemin..." is the elegant, polite conditional construction.',
          writingPromptTarget: 'Pourriez-vous m\'indiquer le chemin pour aller au musée, s\'il vous plaît ?',
          testedSkill: 'Writing'
        }
      ]
    },
    {
      skill: 'Speaking',
      title: 'Section 6: Spoken Fluency',
      description: 'Pronounce the sentence with accurate French accent and nasal vowels.',
      icon: 'Mic',
      questions: [
        {
          id: 'fr-s1',
          question: 'Prononcez : "Bonjour, je suis enchanté de faire votre connaissance."',
          translation: 'Pronounce: "Hello, I am delighted to meet you."',
          options: [
            'Bonjour, je suis enchanté de faire votre connaissance.',
            'Au revoir et bonne journée.',
            'Je ne comprends pas le français.',
            'Merci pour votre attention.'
          ],
          correctAnswer: 0,
          explanation: 'Clear pronunciation of "enchanté" with nasal "en" and smooth liaison into "connaissance".',
          speakingPromptTarget: 'Bonjour, je suis enchanté de faire votre connaissance.',
          testedSkill: 'Speaking'
        }
      ]
    }
  ]
};

export const COMPREHENSIVE_ASSESSMENTS_BY_LANG: Record<string, AssessmentSection[]> = {
  ...BASE_ASSESSMENTS_BY_LANG,
  ...EXTENDED_ASSESSMENTS_BY_LANG
};

// Retrieve comprehensive assessment questions specifically tailored for the selected language
export function getComprehensiveAssessmentSections(langId: string, langName?: string): AssessmentSection[] {
  if (COMPREHENSIVE_ASSESSMENTS_BY_LANG[langId]) {
    return COMPREHENSIVE_ASSESSMENTS_BY_LANG[langId];
  }
  
  // Clean fallback
  return COMPREHENSIVE_ASSESSMENTS_BY_LANG.en || COMPREHENSIVE_ASSESSMENTS_BY_LANG.es;
}

export interface LanguageAssessmentProfile {
  category: string;
  categoryTier: 'Tier 1 (Fastest)' | 'Tier 2 (Moderate)' | 'Tier 3 (Challenging)' | 'Tier 4 (Intensive)';
  fsiWeeks: number;
  estimatedHoursToNextLevel: number;
  nextLevel: string;
  linguisticHighlights: { title: string; desc: string }[];
  sampleDiagnosticQuestion: {
    question: string;
    translation: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    audioPrompt?: string;
  };
}

// Language metadata profiles for dynamic sync in FreeAssessmentSection
const LANGUAGE_PROFILES: Record<string, Omit<LanguageAssessmentProfile, 'estimatedHoursToNextLevel' | 'nextLevel'>> = {
  es: {
    category: 'Category I (Romance Language)',
    categoryTier: 'Tier 1 (Fastest)',
    fsiWeeks: 24,
    linguisticHighlights: [
      { title: 'Subjuntivo & Moods', desc: 'Expressing desires, doubt & hypothetical outcomes' },
      { title: 'Ser vs Estar', desc: 'Permanent characteristics vs transient emotional states' },
      { title: 'Rolling "R" & Flow', desc: 'Syllable-timed pacing and liquid liaison vowels' }
    ],
    sampleDiagnosticQuestion: {
      question: '¿Qué palabra completa la frase? "Al terminar la cena, pedimos la _____ al camarero."',
      translation: 'Which word completes the sentence? "At the end of dinner, we ask the waiter for the _____."',
      options: ['cuenta', 'maleta', 'dirección', 'llave'],
      correctAnswer: 0,
      explanation: '"La cuenta" is the restaurant check / bill in Spanish.',
      audioPrompt: 'Al terminar la cena, pedimos la cuenta al camarero.'
    }
  },
  fr: {
    category: 'Category I (Romance Language)',
    categoryTier: 'Tier 1 (Fastest)',
    fsiWeeks: 30,
    linguisticHighlights: [
      { title: 'Liaisons & Elision', desc: 'Smooth phonetic connections between consonant and vowel' },
      { title: 'Passé Composé vs Imparfait', desc: 'Discrete past achievements vs descriptive background' },
      { title: 'Nasal Vowels (an, in, on)', desc: 'Distinct acoustic resonance without English consonant endings' }
    ],
    sampleDiagnosticQuestion: {
      question: 'Quel mot complète la phrase ? "Au restaurant, je demande _____ pour payer."',
      translation: 'Which word completes the sentence? "At the restaurant, I ask for _____ to pay."',
      options: ['l\'addition', 'la serviette', 'la clé', 'le billet'],
      correctAnswer: 0,
      explanation: '"L\'addition" is the restaurant bill in French.',
      audioPrompt: 'Au restaurant, je demande l\'addition pour payer.'
    }
  },
  de: {
    category: 'Category II (Germanic Language)',
    categoryTier: 'Tier 2 (Moderate)',
    fsiWeeks: 36,
    linguisticHighlights: [
      { title: 'Noun Genders & Cases', desc: 'Der, Die, Das across Nominativ, Akkusativ, Dativ & Genitiv' },
      { title: 'Verb-Second (V2) & Nebensatz', desc: 'Strict verb positioning in main vs subordinate clauses' },
      { title: 'Compound Words & Separables', desc: 'Precision morphology and separable prefixes (auf-, an-, ab-)' }
    ],
    sampleDiagnosticQuestion: {
      question: 'Welches Wort passt am besten? "Könnten Sie mir bitte die _____ bringen? Ich möchte bezahlen."',
      translation: 'Which word fits best? "Could you please bring me the _____? I would like to pay."',
      options: ['Speisekarte', 'Rechnung', 'Fahrkarte', 'Zeitung'],
      correctAnswer: 1,
      explanation: '"Die Rechnung" means the bill/check in German.',
      audioPrompt: 'Könnten Sie mir bitte die Rechnung bringen? Ich möchte bezahlen.'
    }
  },
  en: {
    category: 'Category I (Global Germanic)',
    categoryTier: 'Tier 1 (Fastest)',
    fsiWeeks: 24,
    linguisticHighlights: [
      { title: 'Phrasal Verbs & Nuance', desc: 'Dynamic idioms (give up, turn down, look forward to)' },
      { title: 'Conditionals & Perfect Tenses', desc: 'Subtle temporal distinctions (have been doing vs did)' },
      { title: 'Connected Speech & Stress', desc: 'Stress-timed rhythm with vowel reduction (schwa /ə/)' }
    ],
    sampleDiagnosticQuestion: {
      question: 'Which word best completes the sentence? "Before signing the agreement, please read the _____ print carefully."',
      translation: 'Select the standard English idiom for contractual details.',
      options: ['fine', 'tiny', 'small', 'soft'],
      correctAnswer: 0,
      explanation: '"Fine print" is the standard collocation for small contractual stipulations.',
      audioPrompt: 'Before signing the agreement, please read the fine print carefully.'
    }
  },
  it: {
    category: 'Category I (Romance Language)',
    categoryTier: 'Tier 1 (Fastest)',
    fsiWeeks: 24,
    linguisticHighlights: [
      { title: 'Melodic Cadence & Double Consonants', desc: 'Distinct vowel clarity and held geminate consonants' },
      { title: 'Passato Prossimo & Agreement', desc: 'Auxiliary selection (essere vs avere) with participle gender' },
      { title: 'Pronomi Combinati', desc: 'Streamlined clitic pronouns (me lo, te la, ce ne)' }
    ],
    sampleDiagnosticQuestion: {
      question: 'Quale parola completa la frase? "Al ristorante, alla fine della cena, chiediamo il _____ al cameriere."',
      translation: 'Which word completes the sentence? "At the restaurant, we ask the waiter for the _____."',
      options: ['conto', 'biglietto', 'menù', 'passaporto'],
      correctAnswer: 0,
      explanation: '"Il conto" means the restaurant bill in Italian.',
      audioPrompt: 'Al ristorante, alla fine della cena, chiediamo il conto al cameriere.'
    }
  },
  ja: {
    category: 'Category IV (Exceptional Difficulty)',
    categoryTier: 'Tier 4 (Intensive)',
    fsiWeeks: 88,
    linguisticHighlights: [
      { title: 'Particles (は, が, に, で, を)', desc: 'Grammatical markers indicating topic, subject, and location' },
      { title: 'Pitch Accent & Mora Rhythm', desc: 'High-low melodic inflections with steady timing' },
      { title: 'Keigo (Honorific & Humble)', desc: 'Polite register adaptation for social context' }
    ],
    sampleDiagnosticQuestion: {
      question: 'レストランで支払いをするとき、店員さんに何と言いますか？',
      translation: 'At a restaurant, what do you say to the staff when paying the bill?',
      options: [
        'お会計をお願いします (Okaikei o onegaishimasu)',
        'ごちそうさまでした (Gochisousama deshita)',
        'いらっしゃいませ (Irasshaimase)',
        'メニューをください (Menyuu o kudasai)'
      ],
      correctAnswer: 0,
      explanation: '「お会計をお願いします」means "The check, please" in Japanese.',
      audioPrompt: 'すみません、お会計をお願いします。'
    }
  },
  zh: {
    category: 'Category IV (Tonal Logographic)',
    categoryTier: 'Tier 4 (Intensive)',
    fsiWeeks: 88,
    linguisticHighlights: [
      { title: '4 Tones & Neutral Tone', desc: 'Acoustic pitch contours that alter lexical meaning' },
      { title: 'Classifier Measure Words', desc: 'Object categorizers (一本, 两支, 三个) for noun phrases' },
      { title: 'Topic-Prominent Syntax', desc: 'Time-manner-place sequencing with particle aspect markers' }
    ],
    sampleDiagnosticQuestion: {
      question: '在餐厅吃完饭后，向服务员结账时应该说什么？',
      translation: 'At a restaurant after finishing your meal, what do you say to pay the bill?',
      options: ['服务员，买单！(Mǎidān)', '服务员，上菜！', '欢迎光临！', '谢谢，再见！'],
      correctAnswer: 0,
      explanation: '“买单” (Mǎidān) is the standard colloquial phrase for paying the bill.',
      audioPrompt: '服务员，买单，谢谢！'
    }
  },
  pt: {
    category: 'Category I (Romance Language)',
    categoryTier: 'Tier 1 (Fastest)',
    fsiWeeks: 24,
    linguisticHighlights: [
      { title: 'Nasal Diphthongs (-ão, -ãe, -em)', desc: 'Resonant oral-nasal transitions unique to Portuguese' },
      { title: 'Personal Infinitive', desc: 'Inflected verb forms retaining personalized subjects' },
      { title: 'Por vs Para Distinctions', desc: 'Cause/medium versus ultimate goal/destination' }
    ],
    sampleDiagnosticQuestion: {
      question: 'Ao terminar a refeição no restaurante, o que pedimos ao garçom?',
      translation: 'Upon finishing a meal, what do we ask the waiter for?',
      options: ['A conta', 'O cardápio', 'A chave', 'O bilhete'],
      correctAnswer: 0,
      explanation: '"A conta" is the standard term for requesting the bill.',
      audioPrompt: 'Por favor, o senhor pode trazer a conta?'
    }
  },
  ko: {
    category: 'Category IV (Agglutinative Language)',
    categoryTier: 'Tier 4 (Intensive)',
    fsiWeeks: 88,
    linguisticHighlights: [
      { title: 'Hangul Phonology & Batchim', desc: 'Systematic syllable blocks with final consonant assimilation' },
      { title: 'Honorific Verb Stems', desc: 'Layered hierarchical politeness suffixes (-시-, -세요)' },
      { title: 'Topic & Subject Particles', desc: 'Subtle focus contrast between 은/는 and 이/가' }
    ],
    sampleDiagnosticQuestion: {
      question: '식당에서 식사를 마친 후 결제할 때 직원에게 무엇을 부탁하나요?',
      translation: 'At a restaurant, what do you ask the staff for when paying?',
      options: [
        '계산해 주세요 (Gyesan-hae juseyo)',
        '메뉴판 주세요 (Menyupan juseyo)',
        '물 좀 주세요 (Mul jom juseyo)',
        '안녕히 계세요 (Annyeonghi gyeseyo)'
      ],
      correctAnswer: 0,
      explanation: '"계산해 주세요" means "Please bring the bill / check".',
      audioPrompt: '저기요, 계산해 주세요.'
    }
  },
  ar: {
    category: 'Category IV (Semitic Root System)',
    categoryTier: 'Tier 4 (Intensive)',
    fsiWeeks: 88,
    linguisticHighlights: [
      { title: 'Triconsonantal Roots (k-t-b)', desc: 'Deep semantic patterns generating derived nouns and verbs' },
      { title: 'Pharyngeal & Emphatic Consonants', desc: 'Deep throat resonance (ح, خ, ع, ق, ص, ض, ط, ظ)' },
      { title: 'Dual & Plural Agreement', desc: 'Specific grammatical forms for pairs and plural non-humans' }
    ],
    sampleDiagnosticQuestion: {
      question: 'عند الانتهاء من تناول الطعام في المطعم، ماذا تطلب من النادل لدفع الثمن؟',
      translation: 'At the end of a meal in a restaurant, what do you ask the waiter for?',
      options: ['الحساب، من فضلك (The check, please)', 'قائمة الطعام', 'مفتاح الغرفة', 'كوب ماء'],
      correctAnswer: 0,
      explanation: '"الحساب، من فضلك" is the polite standard request for the check.',
      audioPrompt: 'لو سمحت، الحساب من فضلك.'
    }
  },
  ru: {
    category: 'Category III (Slavic Language)',
    categoryTier: 'Tier 3 (Challenging)',
    fsiWeeks: 44,
    linguisticHighlights: [
      { title: '6 Grammatical Cases', desc: 'Inflected endings expressing subject, object, instrument, and location' },
      { title: 'Verbs of Motion', desc: 'Directional unidirectional vs multidirectional verbs (идти vs ходить)' },
      { title: 'Palatalization & Hard/Soft Signs', desc: 'Consonant softening fundamentally altering vowel color' }
    ],
    sampleDiagnosticQuestion: {
      question: 'Какое слово пропущено? "В ресторане после ужина мы просим официанта принести _____."',
      translation: 'Which word is missing? "In a restaurant after dinner we ask the waiter for the _____."',
      options: ['счёт', 'билет', 'меню', 'ключ'],
      correctAnswer: 0,
      explanation: '"Счёт" means the restaurant bill in Russian.',
      audioPrompt: 'Принесите, пожалуйста, счёт.'
    }
  },
  hi: {
    category: 'Category III (Indo-Aryan Language)',
    categoryTier: 'Tier 3 (Challenging)',
    fsiWeeks: 44,
    linguisticHighlights: [
      { title: 'Postpositions & Ergative Case (ने)', desc: 'Markers placed after nouns with past-transitive agreement' },
      { title: 'Retroflex vs Dental Consonants', desc: 'Tongue-curled sounds (ट, ठ, ड, ढ) versus dental sounds (त, थ, द, ध)' },
      { title: 'Aspirated Stops & Tone', desc: 'Breath-released phonemes adding expressive depth' }
    ],
    sampleDiagnosticQuestion: {
      question: 'होटल या रेस्टोरेंट में खाना खाने के बाद भुगतान के लिए क्या माँगते हैं?',
      translation: 'At a restaurant after a meal, what do you ask for to pay?',
      options: ['बिल (Bill)', 'मेन्यू (Menu)', 'चाबी (Key)', 'किताब (Book)'],
      correctAnswer: 0,
      explanation: 'भुगतान के लिए "बिल" माँगा जाता है।',
      audioPrompt: 'कृपया बिल ले आइए।'
    }
  }
};

export function getLanguageAssessmentProfile(langId: string, currentLevel: string): LanguageAssessmentProfile {
  const baseProfile = LANGUAGE_PROFILES[langId] || LANGUAGE_PROFILES.en;
  
  // Calculate CEFR milestone projection adapted to linguistic difficulty tier
  let nextLevel = 'B1';
  let hours = 84;

  const multiplier = baseProfile.categoryTier.includes('Tier 4') ? 1.6
    : baseProfile.categoryTier.includes('Tier 3') ? 1.3
    : baseProfile.categoryTier.includes('Tier 2') ? 1.15 : 1.0;

  switch (currentLevel) {
    case 'A1':
      nextLevel = 'A2';
      hours = Math.round(60 * multiplier);
      break;
    case 'A2':
      nextLevel = 'B1';
      hours = Math.round(84 * multiplier);
      break;
    case 'B1':
      nextLevel = 'B2';
      hours = Math.round(120 * multiplier);
      break;
    case 'B2':
      nextLevel = 'C1';
      hours = Math.round(180 * multiplier);
      break;
    case 'C1':
      nextLevel = 'C2';
      hours = Math.round(220 * multiplier);
      break;
    default:
      nextLevel = 'B1';
      hours = Math.round(84 * multiplier);
  }

  return {
    ...baseProfile,
    nextLevel,
    estimatedHoursToNextLevel: hours
  };
}

// Generate Personalized 4-Week Plan tailored for the target language
export function generatePersonalizedWeeklyPlan(level: string, langName: string): WeeklyPlanBreakdown[] {
  return [
    {
      week: 1,
      title: 'Week 1: Core Vocabulary & Essential Foundation',
      vocabWordsCount: 50,
      grammarLessonsCount: 3,
      speakingExercisesCount: 2,
      testsCount: 1,
      testType: '1 listening diagnostic test',
      focusTopics: [
        `High-frequency ${langName} greetings & social etiquette`,
        'Present tense core verbs & practical sentence structures',
        'Numbers, directions & question starters (Where, Who, How much)'
      ],
      suggestedScenarios: ['Ordering at a Local Café', 'Checking In at a Hotel']
    },
    {
      week: 2,
      title: 'Week 2: Conversational Agility & Practical Scenarios',
      vocabWordsCount: 50,
      grammarLessonsCount: 3,
      speakingExercisesCount: 3,
      testsCount: 1,
      testType: '1 reading comprehension test',
      focusTopics: [
        `Authentic ${langName} transit, asking for recommendations`,
        'Narrating recent activities and past events smoothly',
        'Polite conditional phrasing and courtesy formulas'
      ],
      suggestedScenarios: ['Asking Directions in the City Center', 'Shopping at a Local Market']
    },
    {
      week: 3,
      title: 'Week 3: Spontaneous Dialogue & Nuanced Expressions',
      vocabWordsCount: 60,
      grammarLessonsCount: 4,
      speakingExercisesCount: 3,
      testsCount: 2,
      testType: '2 listening & comprehension tests',
      focusTopics: [
        'Expressing opinions, agreement & constructive debate',
        'Connectors, subordinate clauses & complex logic (although, therefore)',
        `Professional ${langName} dialogues & workplace etiquette`
      ],
      suggestedScenarios: ['Job Interview Discussion', 'Resolving an Issue with Customer Support']
    },
    {
      week: 4,
      title: 'Week 4: Spoken Fluency Simulation & Milestone CEFR Exam',
      vocabWordsCount: 60,
      grammarLessonsCount: 4,
      speakingExercisesCount: 4,
      testsCount: 1,
      testType: '1 milestone CEFR practice exam',
      focusTopics: [
        `Natural ${langName} colloquialisms & authentic speech pacing`,
        'Spontaneous roleplays with AI conversational partner',
        'Full comprehensive fluency evaluation & verified certification'
      ],
      suggestedScenarios: ['Dinner Party with Native Friends', 'Negotiating a Project Agreement']
    }
  ];
}

export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface LanguageConfig {
  id: string;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string; // e.g. 'es-ES', 'fr-FR', 'ja-JP'
  defaultVoice: 'Kore' | 'Puck' | 'Zephyr' | 'Fenrir' | 'Charon';
  hasRomanization: boolean;
  romanizationLabel?: string; // 'Pinyin', 'Romaji', 'Hangul Romanization', 'Transliteration'
  greeting: string;
  samplePhrases: string[];
}

export type ScenarioCategory = 'travel' | 'dining' | 'daily' | 'business' | 'social' | 'emergency' | 'custom';

export interface ScenarioObjective {
  id: string;
  description: string;
  targetConcept?: string;
  completed: boolean;
}

export interface Scenario {
  id: string;
  title: string;
  category: ScenarioCategory;
  level: CEFRLevel;
  icon: string;
  color: string;
  partnerName: string;
  partnerRole: string;
  userRole: string;
  setting: string;
  situation: string;
  imageUrl?: string;
  partnerAvatarUrl?: string;
  systemPromptAddition?: string;
  objectives: ScenarioObjective[];
  starterPrompts: { text: string; translation: string }[];
  isCustom?: boolean;
}

export interface GrammarFeedback {
  hasErrors: boolean;
  score?: number; // 1-100
  corrections: string[];
  naturalAlternative: string;
  explanation: string;
  detectedLevel?: string;
  vocabularyTips?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  translation?: string;
  romanization?: string;
  audioBase64?: string;
  timestamp: number;
  grammarFeedback?: GrammarFeedback;
  pronunciationScore?: number;
  completedObjectiveIds?: string[];
  keyVocab?: { word: string; translation: string; partOfSpeech?: string }[];
  isLoading?: boolean;
}

export interface SavedWord {
  id: string;
  languageId: string;
  word: string;
  translation: string;
  romanization?: string;
  partOfSpeech?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
  notes?: string;
  mastered?: boolean;
  createdAt: number;
}

export interface SessionReport {
  id: string;
  scenarioTitle: string;
  languageName: string;
  languageId: string;
  level: CEFRLevel;
  date: string;
  durationSeconds: number;
  turnsCount: number;
  fluencyScore: number; // 0-100
  accuracyScore: number; // 0-100
  vocabularyScore: number; // 0-100
  overallScore: number; // 0-100
  strengths: string[];
  areasToImprove: string[];
  keyLearnings: string[];
  mistakesReviewed: { original: string; corrected: string; explanation: string }[];
  completedObjectivesCount: number;
  totalObjectivesCount: number;
}

export interface UserStats {
  totalMinutesPracticed: number;
  conversationsCompleted: number;
  wordsLearned: number;
  streakDays: number;
  lastPracticedDate: string;
}

export type GoalMetric = 'minutes' | 'conversations';

export interface DailyGoal {
  targetType: GoalMetric;
  targetValue: number;
  todayMinutesCompleted: number;
  todayConversationsCompleted: number;
  lastActiveDate: string; // 'YYYY-MM-DD'
  goalStreakDays: number;
  history: {
    date: string;
    completed: boolean;
    minutes: number;
    conversations: number;
    targetType: GoalMetric;
    targetValue: number;
  }[];
}

export type AuthProvider = 'google' | 'email' | 'phone' | 'guest';

export type UserGoalId = 'study_abroad' | 'job' | 'travel' | 'immigration' | 'speaking' | 'personal';

export interface UserGoal {
  id: UserGoalId;
  number: number; // 1 to 6
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  targetCEFRLevel: string;
  estimatedWeeks: number;
  dailyMinutes: number;
  badgeLabel: string;
  imageUrl?: string;
  focusSkills: string[];
  sampleScenarios: string[];
  starterRoadmap: {
    week1: string;
    week2: string;
    week3: string;
    week4: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  phoneNumber?: string;
  photoUrl?: string;
  provider: AuthProvider;
  isLoggedIn: boolean;
  selectedGoalId?: UserGoalId;
  createdAt: string;
  lastLoginAt: string;
}

export interface CourseEnrollment {
  isEnrolled: boolean;
  amountPaid: number;
  currency: string;
  enrolledAt?: string;
  transactionId?: string;
  paymentMethod?: string;
  payerName?: string;
  payerEmail?: string;
  orderId?: string;
  userId?: string;
}

export type FunnelStepId = 
  | 'test' 
  | 'score' 
  | 'plan' 
  | 'challenge' 
  | 'paid_course' 
  | 'subscription' 
  | 'certification';

export interface LanguageTestQuestion {
  id: string;
  question: string;
  translation: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  testedSkill: 'Vocabulary' | 'Grammar' | 'Reading' | 'Listening' | 'Writing' | 'Speaking' | 'Comprehension' | 'Conversation';
  audioPrompt?: string;
  readingPassage?: string;
  writingPromptTarget?: string;
  speakingPromptTarget?: string;
}

export interface WeeklyPlanBreakdown {
  week: number;
  title: string;
  vocabWordsCount: number;
  grammarLessonsCount: number;
  speakingExercisesCount: number;
  testsCount: number;
  testType: string;
  focusTopics: string[];
  suggestedScenarios: string[];
}

export interface LanguageTestResult {
  score: number; // 0 to 100
  totalQuestions: number;
  correctCount: number;
  recommendedLevel: CEFRLevel;
  nextLevel: CEFRLevel;
  estimatedHoursToNextLevel: number;
  skillBreakdown: {
    vocabulary: number;
    grammar: number;
    reading: number;
    listening: number;
    writing: number;
    speaking: number;
  };
  personalizedPlan: WeeklyPlanBreakdown[];
  completedAt: string;
  userName?: string;
  userEmail?: string;
}

export interface LearningPlanMilestone {
  dayOrWeek: string;
  title: string;
  focus: string;
  targetMinutes: number;
  recommendedScenarios: string[];
  keyGrammarPoint: string;
}

export interface SevenDayChallengeDay {
  day: number;
  title: string;
  scenarioId: string;
  scenarioTitle: string;
  task: string;
  targetMinutes: number;
  completed: boolean;
  rewardBadge: string;
}

export type LearningObjective = 
  | 'career' 
  | 'travel' 
  | 'university' 
  | 'relocation' 
  | 'exam_prep' 
  | 'hobby';

export interface LeadCaptureData {
  id: string;
  name: string;
  email: string;
  whatsApp: string;
  languageId: string;
  languageName: string;
  currentLevel: CEFRLevel;
  learningObjective: LearningObjective;
  productId: string;
  productTitle: string;
  capturedAt: string;
}

export interface LeadMagnetProduct {
  id: string;
  number: number;
  title: string;
  shortDescription: string;
  badge: string;
  icon: string;
  imageUrl?: string;
  estimatedValue: string;
  format: 'interactive' | 'pdf' | 'audio_pack' | 'roadmap' | 'exam_kit';
  category: 'assessment' | 'challenge' | 'vocab' | 'plan' | 'ai_tools' | 'grammar' | 'exam';
  keyHighlights: string[];
}


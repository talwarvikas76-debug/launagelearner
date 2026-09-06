import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { ScenarioSelector } from './components/ScenarioSelector';
import { ConversationView } from './components/ConversationView';
import { WordInspectorModal } from './components/WordInspectorModal';
import { PronunciationCoachModal } from './components/PronunciationCoachModal';
import { VocabularyBankDrawer } from './components/VocabularyBankDrawer';
import { SessionSummaryModal } from './components/SessionSummaryModal';
import { CustomScenarioModal } from './components/CustomScenarioModal';
import { LiveVoiceModal } from './components/LiveVoiceModal';
import { DailyGoalModal } from './components/DailyGoalModal';
import { CoursePaymentModal } from './components/CoursePaymentModal';
import { AuthModal } from './components/AuthModal';
import { LanguageTestModal } from './components/LanguageTestModal';
import { AssistedPronunciationSpeakerModal } from './components/AssistedPronunciationSpeakerModal';
import { LeadMagnetModal } from './components/LeadMagnetModal';
import { WelcomeGoalModal } from './components/WelcomeGoalModal';
import { DomainHostingModal } from './components/DomainHostingModal';
import { 
  LanguageConfig, 
  CEFRLevel, 
  Scenario, 
  ChatMessage, 
  SavedWord, 
  UserStats, 
  SessionReport,
  DailyGoal,
  GoalMetric,
  CourseEnrollment,
  UserProfile,
  AuthProvider,
  FunnelStepId,
  UserGoalId
} from './types';
import { SUPPORTED_LANGUAGES } from './data/languages';
import { DEFAULT_SCENARIOS } from './data/scenarios';
import { speakText } from './utils/audio';
import { 
  getDefaultDailyGoal, 
  syncDailyGoalWithDate, 
  recordGoalActivity 
} from './utils/goalUtils';

const STORAGE_KEYS = {
  LANGUAGE: 'fluency_lang_id',
  LEVEL: 'fluency_cefr_level',
  SAVED_WORDS: 'fluency_saved_words',
  STATS: 'fluency_user_stats',
  DAILY_GOAL: 'fluency_daily_goal',
  CUSTOM_SCENARIOS: 'fluency_custom_scenarios',
  COURSE_ENROLLMENT: 'fluency_course_enrollment',
  AUTH_USER: 'fluency_auth_user',
  USER_GOAL: 'fluency_user_goal',
};

export default function App() {
  // 1. Language & Level State
  const [currentLanguage, setCurrentLanguage] = useState<LanguageConfig>(() => {
    const savedId = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    return SUPPORTED_LANGUAGES.find((l) => l.id === savedId) || SUPPORTED_LANGUAGES[0];
  });

  const [currentLevel, setCurrentLevel] = useState<CEFRLevel>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LEVEL) as CEFRLevel) || 'A2';
  });

  // User Learning Goal (1 to 6)
  const [selectedGoalId, setSelectedGoalId] = useState<UserGoalId>(() => {
    const savedGoal = localStorage.getItem(STORAGE_KEYS.USER_GOAL) as UserGoalId;
    return savedGoal || 'speaking';
  });
  const [isWelcomeGoalModalOpen, setIsWelcomeGoalModalOpen] = useState(false);

  // 2. Scenarios State
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOM_SCENARIOS);
      if (saved) {
        const custom = JSON.parse(saved);
        return [...custom, ...DEFAULT_SCENARIOS];
      }
    } catch (e) {
      console.warn('Could not parse custom scenarios:', e);
    }
    return DEFAULT_SCENARIOS;
  });

  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const sessionStartTimeRef = useRef<number>(Date.now());

  // 3. User Stats & Vocab Bank
  const [savedWords, setSavedWords] = useState<SavedWord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_WORDS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userStats, setUserStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STATS);
      return saved
        ? JSON.parse(saved)
        : {
            totalMinutesPracticed: 18,
            conversationsCompleted: 3,
            wordsLearned: 14,
            streakDays: 4,
            lastPracticedDate: new Date().toISOString().split('T')[0],
          };
    } catch {
      return {
        totalMinutesPracticed: 18,
        conversationsCompleted: 3,
        wordsLearned: 14,
        streakDays: 4,
        lastPracticedDate: new Date().toISOString().split('T')[0],
      };
    }
  });

  // Daily Goal State
  const [dailyGoal, setDailyGoal] = useState<DailyGoal>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DAILY_GOAL);
      if (saved) {
        return syncDailyGoalWithDate(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not parse daily goal:', e);
    }
    return getDefaultDailyGoal();
  });

  // Course Enrollment State (Payment Gate: Rs. 499/-)
  const [enrollment, setEnrollment] = useState<CourseEnrollment>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSE_ENROLLMENT);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse course enrollment:', e);
    }
    return {
      isEnrolled: false,
      amountPaid: 499,
      currency: 'INR',
    };
  });

  // User Profile & Authentication State (Google, Email, Mobile OTP)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not parse auth user:', e);
    }
    // Default logged in demo profile for immediate seamless preview
    return {
      id: 'usr_google_default',
      name: 'Vikas Talwar',
      email: 'talwarvikas76@gmail.com',
      phoneNumber: '+91 9876543210',
      photoUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Vikas%20Talwar&backgroundColor=4A6B53&textColor=ffffff',
      provider: 'google',
      isLoggedIn: true,
      createdAt: '2026-08-01T00:00:00.000Z',
      lastLoginAt: new Date().toISOString(),
    };
  });

  // 4. Audio Preferences
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // 5. Modals State
  const [inspectingWord, setInspectingWord] = useState<{ word: string; contextSentence: string } | null>(null);
  const [pronunciationData, setPronunciationData] = useState<{ sentence: string; translation?: string } | null>(null);
  const [isVocabBankOpen, setIsVocabBankOpen] = useState(false);
  const [isCustomScenarioModalOpen, setIsCustomScenarioModalOpen] = useState(false);
  const [isLiveVoiceModalOpen, setIsLiveVoiceModalOpen] = useState(false);
  const [isDailyGoalModalOpen, setIsDailyGoalModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentTargetScenario, setPaymentTargetScenario] = useState<string | undefined>(undefined);
  const [pendingScenarioToStart, setPendingScenarioToStart] = useState<Scenario | null>(null);
  const [sessionReport, setSessionReport] = useState<SessionReport | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  
  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalDefaultTab, setAuthModalDefaultTab] = useState<'google' | 'email' | 'phone'>('google');
  const [authModalMessage, setAuthModalMessage] = useState<string | undefined>(undefined);

  // 7-Point Learning Funnel / Diagnostic Modal State
  const [isFunnelModalOpen, setIsFunnelModalOpen] = useState(false);
  const [funnelInitialStep, setFunnelInitialStep] = useState<FunnelStepId>('test');

  // Lead Magnet Modal State (10 Free Study Products)
  const [isLeadMagnetModalOpen, setIsLeadMagnetModalOpen] = useState(false);
  const [selectedLeadMagnetProduct, setSelectedLeadMagnetProduct] = useState<string | undefined>(undefined);

  // Assisted Pronunciation Speaker State
  const [isAssistedSpeakerOpen, setIsAssistedSpeakerOpen] = useState(false);
  const [assistedSpeakerPhraseData, setAssistedSpeakerPhraseData] = useState<{
    phrase: string;
    translation?: string;
    contextSentence?: string;
  } | null>(null);

  // Custom Domain & Hosting Modal State (talktoworld.co.in)
  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, currentLanguage.id);
  }, [currentLanguage.id]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEVEL, currentLevel);
  }, [currentLevel]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_WORDS, JSON.stringify(savedWords));
  }, [savedWords]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DAILY_GOAL, JSON.stringify(dailyGoal));
  }, [dailyGoal]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSE_ENROLLMENT, JSON.stringify(enrollment));
  }, [enrollment]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
    }
  }, [user]);

  const handleOpenAuthModal = (tab: 'google' | 'email' | 'phone' = 'google', message?: string) => {
    setAuthModalDefaultTab(tab);
    setAuthModalMessage(message);
    setIsAuthModalOpen(true);
  };

  const handleSelectGoal = (goalId: UserGoalId) => {
    setSelectedGoalId(goalId);
    localStorage.setItem(STORAGE_KEYS.USER_GOAL, goalId);
  };

  const handleOpenFunnelStep = (step: FunnelStepId = 'test') => {
    setFunnelInitialStep(step);
    setIsFunnelModalOpen(true);
  };

  const handleOpenLeadMagnets = (productId?: string) => {
    setSelectedLeadMagnetProduct(productId);
    setIsLeadMagnetModalOpen(true);
  };

  const handleStartAssessment = () => {
    handleOpenFunnelStep('test');
  };

  const handleOpenAssistedSpeaker = (phrase?: string, translation?: string, contextSentence?: string) => {
    const targetPhrase = phrase || currentLanguage.samplePhrases[0] || 'Hola';
    setAssistedSpeakerPhraseData({
      phrase: targetPhrase,
      translation,
      contextSentence,
    });
    setIsAssistedSpeakerOpen(true);
  };

  const handleLoginSuccess = (loggedInUser: UserProfile) => {
    setUser(loggedInUser);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const handleOpenPaymentModal = (targetScenarioTitle?: string, pendingScenario?: Scenario) => {
    setPaymentTargetScenario(targetScenarioTitle);
    if (pendingScenario) {
      setPendingScenarioToStart(pendingScenario);
    }
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (newEnrollment: CourseEnrollment) => {
    setEnrollment(newEnrollment);
    if (pendingScenarioToStart) {
      handleSelectScenario(pendingScenarioToStart, true);
      setPendingScenarioToStart(null);
    }
  };

  const handleSaveGoal = (targetType: GoalMetric, targetValue: number) => {
    setDailyGoal((prev) => ({
      ...prev,
      targetType,
      targetValue,
    }));
  };

  const handleQuickUpdateTarget = (targetType: GoalMetric, targetValue: number) => {
    setDailyGoal((prev) => ({
      ...prev,
      targetType,
      targetValue,
    }));
  };

  // Start a new conversation session
  const handleSelectScenario = async (scenario: Scenario, bypassEnrollmentCheck: boolean = false) => {
    // 1 Free exercise per language is allowed (e.g. cafe-order). Subsequent practices require enrollment (Rs. 499/-)
    const isFreeScenario = scenario.id === 'cafe-order' || scenario.id === DEFAULT_SCENARIOS[0]?.id;
    if (!enrollment.isEnrolled && !isFreeScenario && !bypassEnrollmentCheck) {
      handleOpenPaymentModal(scenario.title, scenario);
      return;
    }

    // Reset scenario objectives to uncompleted state
    const freshScenario: Scenario = {
      ...scenario,
      objectives: scenario.objectives.map((o) => ({ ...o, completed: false })),
    };
    setActiveScenario(freshScenario);
    sessionStartTimeRef.current = Date.now();
    setIsLoading(true);

    // Initial greeting from AI partner tailored to language, level, and scenario
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLanguage: currentLanguage,
          level: currentLevel,
          scenario: freshScenario,
          messages: [],
          isInitialGreeting: true,
          userMessage: `Start roleplay as ${freshScenario.partnerName}`,
          generateAudio: autoPlayAudio,
          voiceName: currentLanguage.defaultVoice,
        }),
      });

      let data: any = null;
      if (res.ok) {
        data = await res.json();
      }

      const replyText = data?.replyText || `${currentLanguage.greeting} (${freshScenario.partnerName} - ${freshScenario.partnerRole})`;
      const initialMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        translation: data?.translation || 'Hello! Welcome to our conversation.',
        romanization: data?.romanization,
        audioBase64: data?.audioBase64,
        keyVocab: data?.keyVocab,
        timestamp: Date.now(),
      };

      setMessages([initialMessage]);

      if (autoPlayAudio) {
        speakText({
          text: initialMessage.text,
          base64Audio: initialMessage.audioBase64,
          langCode: currentLanguage.speechCode,
          rate: playbackSpeed,
        });
      }
    } catch (e) {
      console.warn('Initial greeting fallback triggered:', e);
      // Resilient fallback message
      const fallbackMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: currentLanguage.greeting,
        translation: 'Hello! How are you doing today?',
        timestamp: Date.now(),
      };
      setMessages([fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Send a user message and receive AI partner response + grammar coach analysis
  const handleSendMessage = async (userText: string) => {
    if (!activeScenario || !userText || typeof userText !== 'string' || !userText.trim()) return;

    const trimmedText = userText.trim();
    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      text: trimmedText,
      timestamp: Date.now(),
    };

    const updatedHistory = [...messages, userMessage];
    setMessages(updatedHistory);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLanguage: currentLanguage,
          level: currentLevel,
          scenario: activeScenario,
          messages: updatedHistory,
          userMessage: trimmedText,
          generateAudio: autoPlayAudio,
          voiceName: currentLanguage.defaultVoice,
        }),
      });

      let data: any = null;
      if (res.ok) {
        data = await res.json();
      }

      if (data) {
        // Update user message with real-time grammar coaching data
        if (data.grammarFeedback) {
          userMessage.grammarFeedback = data.grammarFeedback;
        }

        // Check if any objectives were completed
        if (data.completedObjectiveIds && data.completedObjectiveIds.length > 0) {
          setActiveScenario((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              objectives: prev.objectives.map((obj) =>
                data.completedObjectiveIds.includes(obj.id) ? { ...obj, completed: true } : obj
              ),
            };
          });
        }
      }

      const assistantMessage: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'assistant',
        text: data?.replyText || `${currentLanguage.greeting}. Continuemos.`,
        translation: data?.translation || 'Let us continue our conversation.',
        romanization: data?.romanization,
        audioBase64: data?.audioBase64,
        keyVocab: data?.keyVocab,
        timestamp: Date.now(),
      };

      setMessages([...updatedHistory, assistantMessage]);

      if (autoPlayAudio && assistantMessage.text) {
        speakText({
          text: assistantMessage.text,
          base64Audio: assistantMessage.audioBase64,
          langCode: currentLanguage.speechCode,
          rate: playbackSpeed,
        });
      }
    } catch (err) {
      console.warn('Notice in handleSendMessage, continuing dialogue:', err);
      const fallbackAssistant: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: 'assistant',
        text: `${currentLanguage.greeting}`,
        translation: 'Understood, let us continue!',
        timestamp: Date.now(),
      };
      setMessages([...updatedHistory, fallbackAssistant]);
    } finally {
      setIsLoading(false);
    }
  };

  // Finish session and generate post-session pedagogical evaluation
  const handleFinishSession = async () => {
    if (!activeScenario) return;

    const durationSeconds = Math.max(15, Math.round((Date.now() - sessionStartTimeRef.current) / 1000));
    setIsLoading(true);

    try {
      const res = await fetch('/api/session-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          scenario: activeScenario,
          targetLanguage: currentLanguage,
          level: currentLevel,
          messages,
          durationSeconds,
        }),
      });

      const summaryData = await res.json();

      const report: SessionReport = {
        id: `report-${Date.now()}`,
        scenarioTitle: activeScenario.title,
        languageName: currentLanguage.name,
        languageId: currentLanguage.id,
        level: currentLevel,
        date: new Date().toLocaleDateString(),
        durationSeconds,
        turnsCount: messages.filter((m) => m.sender === 'user').length,
        fluencyScore: summaryData.fluencyScore || 85,
        accuracyScore: summaryData.accuracyScore || 80,
        vocabularyScore: summaryData.vocabularyScore || 88,
        overallScore: summaryData.overallScore || 84,
        strengths: summaryData.strengths || ['Good conversational flow', 'Clear intent'],
        areasToImprove: summaryData.areasToImprove || ['Verb conjugations', 'Connector words'],
        keyLearnings: summaryData.keyLearnings || [],
        mistakesReviewed: summaryData.mistakesReviewed || [],
        completedObjectivesCount: activeScenario.objectives.filter((o) => o.completed).length,
        totalObjectivesCount: activeScenario.objectives.length,
      };

      setSessionReport(report);
      setIsSummaryModalOpen(true);

      // Update user stats and daily goal
      const sessionMinutes = Math.max(1, Math.round(durationSeconds / 60));
      setUserStats((prev) => ({
        ...prev,
        conversationsCompleted: prev.conversationsCompleted + 1,
        totalMinutesPracticed: prev.totalMinutesPracticed + sessionMinutes,
        lastPracticedDate: new Date().toISOString().split('T')[0],
      }));

      setDailyGoal((prev) => {
        const { updatedGoal } = recordGoalActivity(prev, sessionMinutes, 1);
        return updatedGoal;
      });
    } catch (e) {
      console.error('Failed to generate summary report:', e);
      // Fallback simple report
      const fallbackReport: SessionReport = {
        id: `report-${Date.now()}`,
        scenarioTitle: activeScenario.title,
        languageName: currentLanguage.name,
        languageId: currentLanguage.id,
        level: currentLevel,
        date: new Date().toLocaleDateString(),
        durationSeconds,
        turnsCount: messages.filter((m) => m.sender === 'user').length,
        fluencyScore: 86,
        accuracyScore: 82,
        vocabularyScore: 85,
        overallScore: 84,
        strengths: ['Great responsiveness and willingness to practice', 'Natural sentence structure'],
        areasToImprove: ['Continue practicing complex tense agreements'],
        keyLearnings: ['Mastered essential scenario phrases'],
        mistakesReviewed: [],
        completedObjectivesCount: activeScenario.objectives.filter((o) => o.completed).length,
        totalObjectivesCount: activeScenario.objectives.length,
      };
      setSessionReport(fallbackReport);
      setIsSummaryModalOpen(true);

      const sessionMinutes = Math.max(1, Math.round(durationSeconds / 60));
      setUserStats((prev) => ({
        ...prev,
        conversationsCompleted: prev.conversationsCompleted + 1,
        totalMinutesPracticed: prev.totalMinutesPracticed + sessionMinutes,
        lastPracticedDate: new Date().toISOString().split('T')[0],
      }));

      setDailyGoal((prev) => {
        const { updatedGoal } = recordGoalActivity(prev, sessionMinutes, 1);
        return updatedGoal;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Vocab Bank handlers
  const handleSaveWord = (wordData: Omit<SavedWord, 'id' | 'createdAt'>) => {
    const newWord: SavedWord = {
      ...wordData,
      id: `word-${Date.now()}`,
      createdAt: Date.now(),
    };
    setSavedWords((prev) => [newWord, ...prev]);
    setUserStats((prev) => ({ ...prev, wordsLearned: prev.wordsLearned + 1 }));
  };

  const handleRemoveWord = (wordStr: string) => {
    setSavedWords((prev) => prev.filter((w) => w.word.toLowerCase() !== wordStr.toLowerCase()));
  };

  const handleToggleMasteredWord = (id: string) => {
    setSavedWords((prev) =>
      prev.map((w) => (w.id === id ? { ...w, mastered: !w.mastered } : w))
    );
  };

  const handleDeleteSavedWord = (id: string) => {
    setSavedWords((prev) => prev.filter((w) => w.id !== id));
  };

  // Custom Scenario Creator handler
  const handleCustomScenarioCreated = (newScenario: Scenario) => {
    setScenarios((prev) => [newScenario, ...prev]);
    try {
      const customOnly = scenarios.filter((s) => s.isCustom);
      localStorage.setItem(
        STORAGE_KEYS.CUSTOM_SCENARIOS,
        JSON.stringify([newScenario, ...customOnly])
      );
    } catch (e) {
      console.warn('Storage error:', e);
    }
    handleSelectScenario(newScenario);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#2C2C24] flex flex-col font-sans selection:bg-[#D4A373]/30 selection:text-[#2C2C24]">
      {/* Global Navigation Bar */}
      <Navbar
        currentLanguage={currentLanguage}
        onSelectLanguage={setCurrentLanguage}
        currentLevel={currentLevel}
        onSelectLevel={setCurrentLevel}
        userStats={userStats}
        dailyGoal={dailyGoal}
        onOpenGoalModal={() => setIsDailyGoalModalOpen(true)}
        savedWordsCount={savedWords.filter((w) => w.languageId === currentLanguage.id).length}
        onOpenVocabBank={() => setIsVocabBankOpen(true)}
        autoPlayAudio={autoPlayAudio}
        onToggleAutoPlayAudio={() => setAutoPlayAudio(!autoPlayAudio)}
        playbackSpeed={playbackSpeed}
        onChangePlaybackSpeed={setPlaybackSpeed}
        onLogoClick={() => setActiveScenario(null)}
        enrollment={enrollment}
        onOpenPaymentModal={() => handleOpenPaymentModal()}
        user={user}
        onOpenAuthModal={handleOpenAuthModal}
        onSignOut={handleSignOut}
        onOpenPathwayModal={() => handleOpenFunnelStep('test')}
        onOpenAssistedSpeaker={() => handleOpenAssistedSpeaker()}
        onOpenLeadMagnets={handleOpenLeadMagnets}
        selectedGoalId={selectedGoalId}
        onOpenGoalSelectionModal={() => setIsWelcomeGoalModalOpen(true)}
        onOpenDomainModal={() => setIsDomainModalOpen(true)}
      />

      {/* Main Content: Scenario Selector vs Active Conversation */}
      <main className="flex-1 flex flex-col">
        {!activeScenario ? (
          <ScenarioSelector
            scenarios={scenarios}
            selectedLanguage={currentLanguage}
            currentLevel={currentLevel}
            onSelectScenario={handleSelectScenario}
            onOpenCustomScenarioModal={() => {
              if (!enrollment.isEnrolled) {
                handleOpenPaymentModal('Custom AI Scenario Generator');
                return;
              }
              setIsCustomScenarioModalOpen(true);
            }}
            dailyGoal={dailyGoal}
            onOpenGoalModal={() => setIsDailyGoalModalOpen(true)}
            onQuickUpdateTarget={handleQuickUpdateTarget}
            enrollment={enrollment}
            onOpenPaymentModal={(title) => handleOpenPaymentModal(title)}
            user={user}
            onOpenFunnelStep={handleOpenFunnelStep}
            onOpenAssistedSpeaker={() => handleOpenAssistedSpeaker()}
            onOpenLeadMagnets={handleOpenLeadMagnets}
            onStartAssessment={handleStartAssessment}
            selectedGoalId={selectedGoalId}
            onOpenGoalSelectionModal={() => setIsWelcomeGoalModalOpen(true)}
            onOpenDomainModal={() => setIsDomainModalOpen(true)}
          />
        ) : (
          <ConversationView
            scenario={activeScenario}
            language={currentLanguage}
            level={currentLevel}
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            onExit={() => setActiveScenario(null)}
            onFinishSession={handleFinishSession}
            onInspectWord={(word, contextSentence) => setInspectingWord({ word, contextSentence })}
            onPracticePronunciation={(sentence, translation) =>
              setPronunciationData({ sentence, translation })
            }
            onOpenLiveVoiceCall={() => setIsLiveVoiceModalOpen(true)}
            savedWords={savedWords}
            autoPlayAudio={autoPlayAudio}
            playbackSpeed={playbackSpeed}
            onOpenAssistedSpeaker={handleOpenAssistedSpeaker}
          />
        )}
      </main>

      {/* Modals & Drawers */}
      {inspectingWord && (
        <WordInspectorModal
          word={inspectingWord.word}
          contextSentence={inspectingWord.contextSentence}
          language={currentLanguage}
          isOpen={Boolean(inspectingWord)}
          onClose={() => setInspectingWord(null)}
          onSaveWord={handleSaveWord}
          onRemoveWord={handleRemoveWord}
          isSaved={savedWords.some(
            (w) => w.word.toLowerCase() === inspectingWord.word.toLowerCase()
          )}
          onOpenAssistedSpeaker={handleOpenAssistedSpeaker}
        />
      )}

      {pronunciationData && (
        <PronunciationCoachModal
          sentence={pronunciationData.sentence}
          translation={pronunciationData.translation}
          language={currentLanguage}
          isOpen={Boolean(pronunciationData)}
          onClose={() => setPronunciationData(null)}
          onOpenAssistedSpeaker={handleOpenAssistedSpeaker}
        />
      )}

      <VocabularyBankDrawer
        isOpen={isVocabBankOpen}
        onClose={() => setIsVocabBankOpen(false)}
        savedWords={savedWords}
        currentLanguage={currentLanguage}
        onToggleMastered={handleToggleMasteredWord}
        onDeleteWord={handleDeleteSavedWord}
        onOpenAssistedSpeaker={handleOpenAssistedSpeaker}
      />

      <CustomScenarioModal
        isOpen={isCustomScenarioModalOpen}
        onClose={() => setIsCustomScenarioModalOpen(false)}
        language={currentLanguage}
        level={currentLevel}
        onScenarioCreated={handleCustomScenarioCreated}
      />

      {activeScenario && isLiveVoiceModalOpen && (
        <LiveVoiceModal
          isOpen={isLiveVoiceModalOpen}
          onClose={() => setIsLiveVoiceModalOpen(false)}
          scenario={activeScenario}
          language={currentLanguage}
          level={currentLevel}
          messages={messages}
          onNewUserVoiceMessage={handleSendMessage}
          isAITurn={isLoading}
          activeObjectives={activeScenario.objectives}
        />
      )}

      {sessionReport && (
        <SessionSummaryModal
          report={sessionReport}
          language={currentLanguage}
          messages={messages}
          dailyGoal={dailyGoal}
          isOpen={isSummaryModalOpen}
          onClose={() => {
            setIsSummaryModalOpen(false);
            setActiveScenario(null);
          }}
          onRestartScenario={() => {
            setIsSummaryModalOpen(false);
            if (activeScenario) handleSelectScenario(activeScenario);
          }}
          enrollment={enrollment}
          onOpenPaymentModal={() => handleOpenPaymentModal()}
        />
      )}

      {/* Daily Goal Settings Modal */}
      <DailyGoalModal
        isOpen={isDailyGoalModalOpen}
        onClose={() => setIsDailyGoalModalOpen(false)}
        goal={dailyGoal}
        onSaveGoal={handleSaveGoal}
      />

      {/* Course Enrollment & Payment Gate Modal (Rs. 499/-) */}
      <CoursePaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setPendingScenarioToStart(null);
        }}
        onPaymentSuccess={handlePaymentSuccess}
        currentLanguage={currentLanguage}
        targetScenarioTitle={paymentTargetScenario}
        user={user}
        onOpenAuthModal={() => handleOpenAuthModal('google')}
      />

      {/* Authentication Modal (Google, Email, Mobile OTP) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentUser={user}
        defaultTab={authModalDefaultTab}
        initialMessage={authModalMessage}
      />

      {/* 7-Point Learning Pathway & Free Diagnostic Test Modal */}
      <LanguageTestModal
        isOpen={isFunnelModalOpen}
        onClose={() => setIsFunnelModalOpen(false)}
        language={currentLanguage}
        currentLevel={currentLevel}
        enrollment={enrollment}
        user={user}
        onOpenPaymentModal={(title) => handleOpenPaymentModal(title)}
        onSelectLevel={(level) => setCurrentLevel(level)}
        onOpenLeadMagnets={handleOpenLeadMagnets}
        initialStep={funnelInitialStep}
      />

      {/* Lead Magnet Modal: 10 Free Study Products & Qualified Lead Capture */}
      <LeadMagnetModal
        isOpen={isLeadMagnetModalOpen}
        onClose={() => setIsLeadMagnetModalOpen(false)}
        language={currentLanguage}
        currentLevel={currentLevel}
        initialProductId={selectedLeadMagnetProduct}
        onLaunchAssessment={handleStartAssessment}
        onOpenPaymentModal={(title) => handleOpenPaymentModal(title)}
      />

      {/* Assisted Pronunciation Speaker Modal */}
      {isAssistedSpeakerOpen && (
        <AssistedPronunciationSpeakerModal
          isOpen={isAssistedSpeakerOpen}
          onClose={() => setIsAssistedSpeakerOpen(false)}
          initialPhrase={assistedSpeakerPhraseData?.phrase || currentLanguage.samplePhrases[0] || 'Hola'}
          initialTranslation={assistedSpeakerPhraseData?.translation}
          contextSentence={assistedSpeakerPhraseData?.contextSentence}
          language={currentLanguage}
          enrollment={enrollment}
          onOpenPaymentModal={(title) => handleOpenPaymentModal(title)}
        />
      )}

      {/* 👋 Onboarding / Goal Selection Modal (1️⃣ to 6️⃣) */}
      <WelcomeGoalModal
        isOpen={isWelcomeGoalModalOpen}
        onClose={() => setIsWelcomeGoalModalOpen(false)}
        language={currentLanguage}
        user={user}
        selectedGoalId={selectedGoalId}
        onSelectGoal={handleSelectGoal}
        onStartPracticing={() => {
          setIsWelcomeGoalModalOpen(false);
        }}
        onStartAssessment={() => {
          setIsWelcomeGoalModalOpen(false);
          handleStartAssessment();
        }}
      />

      {/* 🌐 Custom Domain & Hosting Setup Modal (talktoworld.co.in) */}
      <DomainHostingModal
        isOpen={isDomainModalOpen}
        onClose={() => setIsDomainModalOpen(false)}
      />
    </div>
  );
}

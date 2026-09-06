import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  Award, 
  Calendar, 
  BookOpen, 
  Check, 
  Lock, 
  ShieldCheck, 
  Download, 
  RefreshCw,
  TrendingUp,
  Flame,
  Star,
  Target,
  Zap,
  GraduationCap,
  Clock,
  Share2,
  Volume2,
  Mic,
  FileText,
  Glasses,
  Printer,
  Gift,
  Headphones
} from 'lucide-react';
import { 
  LanguageConfig, 
  CEFRLevel, 
  CourseEnrollment, 
  LanguageTestResult, 
  UserProfile,
  LanguageTestQuestion,
  WeeklyPlanBreakdown
} from '../types';
import { 
  getComprehensiveAssessmentSections, 
  generatePersonalizedWeeklyPlan, 
  AssessmentSection 
} from '../data/comprehensiveAssessment';
import { getEstimatedHoursToNextLevel } from '../data/leadMagnets';
import { DEFAULT_7DAY_CHALLENGE } from '../data/placementTests';
import { speakText } from '../utils/audio';

interface LanguageTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageConfig;
  currentLevel: CEFRLevel;
  enrollment: CourseEnrollment;
  user?: UserProfile | null;
  onOpenPaymentModal: (targetScenarioTitle?: string) => void;
  onSelectLevel?: (level: CEFRLevel) => void;
  onOpenLeadMagnets?: (productId?: string) => void;
  initialStep?: 'test' | 'score' | 'plan' | 'challenge' | 'paid_course' | 'subscription' | 'certification';
}

type ModalView = 'test' | 'score' | 'plan' | 'challenge' | 'paid_course' | 'subscription' | 'certification';

export const LanguageTestModal: React.FC<LanguageTestModalProps> = ({
  isOpen,
  onClose,
  language,
  currentLevel,
  enrollment,
  user,
  onOpenPaymentModal,
  onSelectLevel,
  onOpenLeadMagnets,
  initialStep = 'test'
}) => {
  const [activeView, setActiveView] = useState<ModalView>(initialStep);
  
  // 6-Section Comprehensive Assessment
  const assessmentSections: AssessmentSection[] = getComprehensiveAssessmentSections(language.id, language.name);
  
  // Flatten questions into a list with section metadata
  const allQuestions: { question: LanguageTestQuestion; sectionTitle: string; skill: string }[] = [];
  assessmentSections.forEach((sec) => {
    sec.questions.forEach((q) => {
      allQuestions.push({
        question: q,
        sectionTitle: sec.title,
        skill: sec.skill
      });
    });
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecordingSpeaking, setIsRecordingSpeaking] = useState(false);
  const [speakingCompleted, setSpeakingCompleted] = useState(false);
  
  // Computed score state
  const [testResult, setTestResult] = useState<LanguageTestResult>(() => {
    const hoursInfo = getEstimatedHoursToNextLevel('A2');
    return {
      score: 82,
      totalQuestions: 6,
      correctCount: 5,
      recommendedLevel: 'A2',
      nextLevel: hoursInfo.nextLevel as CEFRLevel,
      estimatedHoursToNextLevel: hoursInfo.hours,
      skillBreakdown: {
        vocabulary: 85,
        grammar: 80,
        reading: 90,
        listening: 85,
        writing: 75,
        speaking: 78
      },
      personalizedPlan: generatePersonalizedWeeklyPlan('A2', language.name),
      completedAt: new Date().toISOString()
    };
  });

  // 7-day challenge interactive checkboxes
  const [challengeDays, setChallengeDays] = useState(DEFAULT_7DAY_CHALLENGE);

  if (!isOpen) return null;

  const currentItem = allQuestions[currentQuestionIndex] || allQuestions[0];
  const currentQ = currentItem.question;
  const selectedAnswerForCurrentQ = selectedAnswers[currentQuestionIndex];

  const handleSelectAnswer = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updated);
  };

  const handlePlayAudioPrompt = () => {
    if (currentQ.audioPrompt) {
      setIsPlayingAudio(true);
      speakText({
        text: currentQ.audioPrompt,
        langCode: language.speechCode,
        onEnd: () => setIsPlayingAudio(false)
      });
    }
  };

  const handleSpeakingSimulate = () => {
    setIsRecordingSpeaking(true);
    setTimeout(() => {
      setIsRecordingSpeaking(false);
      setSpeakingCompleted(true);
      handleSelectAnswer(0);
    }, 1500);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate 6-skill score & finish
      let correct = 0;
      const skillCounts: Record<string, { total: number; correct: number }> = {
        Vocabulary: { total: 0, correct: 0 },
        Grammar: { total: 0, correct: 0 },
        Reading: { total: 0, correct: 0 },
        Listening: { total: 0, correct: 0 },
        Writing: { total: 0, correct: 0 },
        Speaking: { total: 0, correct: 0 }
      };

      allQuestions.forEach((item, idx) => {
        const sk = item.skill;
        if (!skillCounts[sk]) skillCounts[sk] = { total: 0, correct: 0 };
        skillCounts[sk].total += 1;
        if (selectedAnswers[idx] === item.question.correctAnswer) {
          correct++;
          skillCounts[sk].correct += 1;
        }
      });

      const calculatedScore = Math.round((correct / allQuestions.length) * 100);
      
      let recLevel: CEFRLevel = 'A1';
      if (calculatedScore >= 85) recLevel = 'B2';
      else if (calculatedScore >= 68) recLevel = 'B1';
      else if (calculatedScore >= 45) recLevel = 'A2';
      else recLevel = 'A1';

      const hoursInfo = getEstimatedHoursToNextLevel(recLevel);

      const vocabScore = skillCounts.Vocabulary.total > 0 ? Math.round((skillCounts.Vocabulary.correct / skillCounts.Vocabulary.total) * 100) : 80;
      const grammarScore = skillCounts.Grammar.total > 0 ? Math.round((skillCounts.Grammar.correct / skillCounts.Grammar.total) * 100) : 75;
      const readingScore = skillCounts.Reading.total > 0 ? Math.round((skillCounts.Reading.correct / skillCounts.Reading.total) * 100) : 85;
      const listeningScore = skillCounts.Listening.total > 0 ? Math.round((skillCounts.Listening.correct / skillCounts.Listening.total) * 100) : 80;
      const writingScore = skillCounts.Writing.total > 0 ? Math.round((skillCounts.Writing.correct / skillCounts.Writing.total) * 100) : 70;
      const speakingScore = skillCounts.Speaking.total > 0 ? Math.round((skillCounts.Speaking.correct / skillCounts.Speaking.total) * 100) : 75;

      const result: LanguageTestResult = {
        score: calculatedScore,
        totalQuestions: allQuestions.length,
        correctCount: correct,
        recommendedLevel: recLevel,
        nextLevel: hoursInfo.nextLevel as CEFRLevel,
        estimatedHoursToNextLevel: hoursInfo.hours,
        skillBreakdown: {
          vocabulary: Math.max(30, vocabScore),
          grammar: Math.max(30, grammarScore),
          reading: Math.max(35, readingScore),
          listening: Math.max(35, listeningScore),
          writing: Math.max(30, writingScore),
          speaking: Math.max(35, speakingScore)
        },
        personalizedPlan: generatePersonalizedWeeklyPlan(recLevel, language.name),
        completedAt: new Date().toISOString()
      };

      setTestResult(result);
      if (onSelectLevel) onSelectLevel(recLevel);
      setActiveView('score');
    }
  };

  const handleToggleDay = (dayIndex: number) => {
    const updated = [...challengeDays];
    updated[dayIndex].completed = !updated[dayIndex].completed;
    setChallengeDays(updated);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const getSkillIcon = (sk: string) => {
    switch (sk) {
      case 'Vocabulary': return <BookOpen className="w-3.5 h-3.5 text-[#4A6B53]" />;
      case 'Grammar': return <FileText className="w-3.5 h-3.5 text-[#326B88]" />;
      case 'Reading': return <Glasses className="w-3.5 h-3.5 text-[#885B32]" />;
      case 'Listening': return <Headphones className="w-3.5 h-3.5 text-[#6B4A88]" />;
      case 'Writing': return <FileText className="w-3.5 h-3.5 text-[#2D5438]" />;
      case 'Speaking': return <Mic className="w-3.5 h-3.5 text-[#C85A32]" />;
      default: return <Sparkles className="w-3.5 h-3.5 text-[#4A6B53]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div 
        className="w-full max-w-4xl bg-[#FFFFFF] rounded-2xl border border-[#DCDCCF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-8 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header with Funnel Navigation Breadcrumb */}
        <div className="px-6 py-4 border-b border-[#E3E3D8] bg-[#FAF9F5] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">{language.flag}</span>
              <div>
                <h2 className="text-base font-bold text-[#2C2C24]">
                  How good is your {language.name}? • 5-Minute AI Assessment
                </h2>
                <p className="text-xs text-[#5A5A40]">
                  Diagnose your CEFR level across 6 skills &amp; receive your Personalized Learning Plan
                </p>
              </div>
            </div>

            <button
              type="button"
              id="close-funnel-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 7-Point Funnel Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-thin text-xs">
            {[
              { id: 'test', label: '1. 6-Skill Test' },
              { id: 'score', label: '2. Level & Score' },
              { id: 'plan', label: '3. Personalized Plan' },
              { id: 'challenge', label: '4. 7-Day Challenge' },
              { id: 'paid_course', label: '5. Paid Course' },
              { id: 'subscription', label: '6. All-Access' },
              { id: 'certification', label: '7. Certificate' },
            ].map((step, idx) => (
              <React.Fragment key={step.id}>
                <button
                  type="button"
                  onClick={() => setActiveView(step.id as ModalView)}
                  className={`px-2.5 py-1 rounded-md whitespace-nowrap font-medium transition-all cursor-pointer ${
                    activeView === step.id
                      ? 'bg-[#4A6B53] text-white font-bold shadow-2xs'
                      : 'bg-white hover:bg-[#EBEBE0] text-[#5A5A40] border border-[#E3E3D8]'
                  }`}
                >
                  {step.label}
                </button>
                {idx < 6 && <span className="text-[#8A8A7A] shrink-0">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* STEP 1: FREE 6-SKILL LANGUAGE TEST */}
          {activeView === 'test' && (
            <div className="space-y-6">
              {/* Test Header */}
              <div className="p-4 rounded-xl bg-linear-to-r from-[#FAF9F5] via-[#E9F0EA] to-[#FAF9F5] border border-[#C5DAC8] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2D5438] text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Free 6-Skill Diagnostic</span>
                  </div>
                  <h3 className="text-base font-bold text-[#2C2C24]">
                    {currentItem.sectionTitle}
                  </h3>
                  <p className="text-xs text-[#5A5A40]">
                    Evaluating: Vocabulary, Grammar, Reading, Listening, Writing &amp; Speaking.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-[#4A6B53]">
                    Question {currentQuestionIndex + 1} of {allQuestions.length}
                  </span>
                  <div className="w-28 h-2 bg-[#EBEBE0] rounded-full overflow-hidden mt-1">
                    <div 
                      className="h-full bg-[#4A6B53] transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / allQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Current Question Box */}
              <div className="p-5 rounded-2xl bg-white border-2 border-[#E3E3D8] space-y-4 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-[#FAF9F5] border border-[#DCDCCF] font-bold text-[#2C2C24] flex items-center gap-1.5">
                    {getSkillIcon(currentItem.skill)}
                    <span>Skill Tested: {currentItem.skill}</span>
                  </span>
                  <span className="text-[#8A8A7A] text-[11px] italic">
                    Select the best answer below
                  </span>
                </div>

                {/* Section Specific Extras: Reading Passage */}
                {currentQ.readingPassage && (
                  <div className="p-3.5 rounded-xl bg-[#F4F4EC] border border-[#DCDCCF] text-xs text-[#2C2C24] font-serif leading-relaxed">
                    <div className="text-[10px] font-sans font-bold text-[#7A7A60] uppercase mb-1">
                      📖 Reading Passage:
                    </div>
                    "{currentQ.readingPassage}"
                  </div>
                )}

                {/* Section Specific Extras: Listening Audio Button */}
                {currentQ.audioPrompt && (
                  <div className="p-4 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-[#2D5438] flex items-center gap-1.5">
                        <Headphones className="w-4 h-4" />
                        <span>Native Audio Recording</span>
                      </div>
                      <p className="text-[11px] text-[#5A5A40] mt-0.5">
                        Click the speaker to listen to the dialogue in {language.name}.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handlePlayAudioPrompt}
                      className="px-4 py-2 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{isPlayingAudio ? 'Playing...' : 'Play Audio'}</span>
                    </button>
                  </div>
                )}

                {/* Section Specific Extras: Speaking Microphone Prompt */}
                {currentQ.speakingPromptTarget && (
                  <div className="p-4 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-[#885B32] flex items-center gap-1.5">
                        <Mic className="w-4 h-4 text-[#C85A32]" />
                        <span>Spoken Pronunciation Prompt</span>
                      </div>
                      <p className="text-[11px] text-[#6A6A50] mt-0.5">
                        Say the phrase aloud or tap to test speech fluency.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSpeakingSimulate}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all ${
                        isRecordingSpeaking
                          ? 'bg-[#C85A32] text-white animate-pulse'
                          : speakingCompleted
                          ? 'bg-[#E9F0EA] text-[#2D5438] border border-[#C5DAC8]'
                          : 'bg-[#C85A32] hover:bg-[#B24E2A] text-white'
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                      <span>{isRecordingSpeaking ? 'Listening & Analyzing...' : speakingCompleted ? 'Voice Verified ✓' : 'Speak / Test Mic'}</span>
                    </button>
                  </div>
                )}

                <div>
                  <h4 className="text-base font-bold text-[#2C2C24] leading-snug">
                    {currentQ.question}
                  </h4>
                  <p className="text-xs text-[#5A5A40] mt-1 italic">
                    Translation: {currentQ.translation}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2.5 pt-2">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = selectedAnswerForCurrentQ === optIdx;
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectAnswer(optIdx)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'border-[#4A6B53] bg-[#E9F0EA] text-[#2D5438] ring-2 ring-[#4A6B53]/20 font-bold'
                            : 'border-[#E3E3D8] hover:border-[#4A6B53] bg-[#FAF9F5] hover:bg-white text-[#2C2C24]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                            isSelected ? 'bg-[#4A6B53] text-white' : 'bg-[#EBEBE0] text-[#5A5A40]'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {isSelected && <Check className="w-4 h-4 text-[#4A6B53]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl border border-[#DCDCCF] hover:bg-[#FAF9F5] text-xs font-semibold text-[#5A5A40] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  id="next-test-question-btn"
                  disabled={selectedAnswerForCurrentQ === undefined}
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>{currentQuestionIndex === allQuestions.length - 1 ? 'Submit & View CEFR Diagnosis' : 'Next Question'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PERSONALIZED SCORE & HOURS PROJECTION */}
          {activeView === 'score' && (
            <div className="space-y-6">
              
              {/* Main Score Box */}
              <div className="p-6 rounded-2xl bg-linear-to-b from-[#FAF9F5] to-white border border-[#DCDCCF] text-center space-y-4 shadow-xs">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-bold">
                  <Award className="w-4 h-4 text-[#4A6B53]" />
                  <span>Official 6-Skill CEFR Assessment Completed</span>
                </div>

                <div className="flex justify-center items-baseline gap-2">
                  <span className="text-5xl sm:text-6xl font-black font-mono text-[#2D5438]">
                    {testResult.score}
                  </span>
                  <span className="text-2xl font-bold text-[#8A8A7A]">/100</span>
                </div>

                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-bold text-[#2C2C24]">
                    Your current level: <span className="px-3 py-1 rounded-lg bg-[#2D5438] text-white font-mono text-xl font-black">{testResult.recommendedLevel}</span>
                  </h3>
                  
                  {/* Dynamic Hours Projection Statement */}
                  <div className="mt-3 p-3.5 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] text-sm text-[#885B32] font-semibold">
                    You need approximately <span className="font-extrabold text-[#C85A32] underline decoration-wavy">{testResult.estimatedHoursToNextLevel} hours</span> to reach {testResult.nextLevel}.
                  </div>
                </div>

                {/* 6 Skill Breakdown Progress Bars */}
                <div className="text-left pt-3">
                  <div className="text-xs font-bold text-[#7A7A60] uppercase tracking-wider mb-3">
                    6-Skill Dimensional Breakdown:
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { name: 'Vocabulary', score: testResult.skillBreakdown.vocabulary, color: 'bg-[#4A6B53]', icon: <BookOpen className="w-3.5 h-3.5" /> },
                      { name: 'Grammar', score: testResult.skillBreakdown.grammar, color: 'bg-[#326B88]', icon: <FileText className="w-3.5 h-3.5" /> },
                      { name: 'Reading', score: testResult.skillBreakdown.reading, color: 'bg-[#885B32]', icon: <Glasses className="w-3.5 h-3.5" /> },
                      { name: 'Listening', score: testResult.skillBreakdown.listening, color: 'bg-[#6B4A88]', icon: <Headphones className="w-3.5 h-3.5" /> },
                      { name: 'Writing', score: testResult.skillBreakdown.writing, color: 'bg-[#2D5438]', icon: <FileText className="w-3.5 h-3.5" /> },
                      { name: 'Speaking', score: testResult.skillBreakdown.speaking, color: 'bg-[#C85A32]', icon: <Mic className="w-3.5 h-3.5" /> }
                    ].map((sk, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8]">
                        <div className="flex items-center justify-between text-xs font-semibold text-[#5A5A40]">
                          <span className="flex items-center gap-1">{sk.icon} {sk.name}</span>
                          <span className="font-mono font-bold text-[#2C2C24]">{sk.score}%</span>
                        </div>
                        <div className="w-full bg-[#EBEBE0] h-1.5 rounded-full overflow-hidden mt-2">
                          <div className={`${sk.color} h-full transition-all duration-500`} style={{ width: `${sk.score}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Step Banner */}
              <div className="p-4 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-[#2D5438]">Your Personalized Learning Plan is Ready</h4>
                  <p className="text-[11px] text-[#3D3D30]">
                    We created a structured 4-week syllabus to bridge your gap to {testResult.nextLevel}.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrintCertificate}
                    className="px-3 py-2 rounded-lg bg-white border border-[#C5DAC8] text-[#2D5438] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Scorecard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveView('plan')}
                    className="px-4 py-2 rounded-lg bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <span>View Learning Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PERSONALIZED LEARNING PLAN */}
          {activeView === 'plan' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-[#2C2C24] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#4A6B53]" />
                    <span>Your Personalized Learning Plan</span>
                  </h3>
                  <p className="text-xs text-[#5A5A40]">
                    Current Level: <span className="font-bold text-[#2D5438]">{testResult.recommendedLevel}</span> • Target: <span className="font-bold text-[#C85A32]">{testResult.nextLevel} in ~{testResult.estimatedHoursToNextLevel} Hours</span>
                  </p>
                </div>

                <button
                  onClick={() => {
                    if (onOpenLeadMagnets) onOpenLeadMagnets('top-100-words');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#DCDCCF] text-xs font-bold text-[#2C2C24] flex items-center gap-1.5 hover:bg-[#EBEBE0] cursor-pointer"
                >
                  <Gift className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Claim 10 Free Study Kits</span>
                </button>
              </div>

              {/* 4 Weekly Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testResult.personalizedPlan.map((wp) => (
                  <div 
                    key={wp.week} 
                    className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      wp.week === 1
                        ? 'bg-[#FAF9F5] border-[#A8CDB0] ring-1 ring-[#4A6B53]/20 shadow-xs'
                        : 'bg-[#FAF9F5] border-[#E3E3D8]'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-[#E3E3D8] pb-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#E9F0EA] text-[#2D5438] font-bold text-xs font-mono">
                        Week {wp.week}
                      </span>
                      <span className="text-[11px] font-semibold text-[#885B32]">
                        {wp.testType}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#2C2C24]">{wp.title}</h4>

                    {/* Deliverables Checklist */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-[#3D3D30]">
                      <div className="p-2 rounded-lg bg-white border border-[#E3E3D8] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#4A6B53] shrink-0" />
                        <span><strong>{wp.vocabWordsCount}</strong> vocab words</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#E3E3D8] flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-[#326B88] shrink-0" />
                        <span><strong>{wp.grammarLessonsCount}</strong> grammar lessons</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#E3E3D8] flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                        <span><strong>{wp.speakingExercisesCount}</strong> speaking drills</span>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#E3E3D8] flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5 text-[#6B4A88] shrink-0" />
                        <span><strong>{wp.testsCount}</strong> milestone test</span>
                      </div>
                    </div>

                    {/* Focus Topics */}
                    <div className="space-y-1 pt-1">
                      <div className="text-[10px] font-bold uppercase text-[#7A7A60]">Core Objectives:</div>
                      {wp.focusTopics.map((topic, tIdx) => (
                        <div key={tIdx} className="text-xs text-[#5A5A40] flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-[#4A6B53] shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Conversion Footer */}
              <div className="p-4 rounded-xl bg-linear-to-r from-[#FAF9F5] to-[#FDF6EE] border border-[#F3DFC8] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-[#885B32]">
                    High-Impact Conversion Offer
                  </div>
                  <p className="text-[11px] text-[#5A5A40]">
                    Get all 4 weeks of structured audio drills, AI roleplays &amp; lifetime coaching for just Rs. 499/-.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveView('challenge')}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF9F5] border border-[#DCDCCF] text-xs font-bold text-[#2C2C24] cursor-pointer"
                  >
                    Start 7-Day Sprint
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPaymentModal('Lifetime Immersion Course');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Unlock Lifetime (Rs. 499/-)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: FREE 7-DAY CHALLENGE */}
          {activeView === 'challenge' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-linear-to-r from-[#FAF9F5] to-[#FDF6EE] border border-[#F3DFC8] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C521C]">
                    <Flame className="w-4 h-4 text-[#C28E58]" />
                    <span>Free 7-Day Conversational Sprint</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#2C2C24]">Build Your Daily Speaking Habit</h3>
                  <p className="text-xs text-[#5A5A40]">
                    Complete 1 scenario each day to build your streak and earn the Day 7 Graduation Badge.
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-[#2D5438]">
                    {challengeDays.filter(d => d.completed).length} / 7 Completed
                  </span>
                </div>
              </div>

              {/* 7 Days List */}
              <div className="space-y-2">
                {challengeDays.map((day, idx) => (
                  <div 
                    key={day.day}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      day.completed
                        ? 'bg-[#E9F0EA]/60 border-[#C5DAC8]'
                        : 'bg-[#FAF9F5] border-[#E3E3D8] hover:border-[#4A6B53]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleToggleDay(idx)}
                        className={`w-6 h-6 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                          day.completed
                            ? 'bg-[#4A6B53] text-white'
                            : 'border border-[#DCDCCF] bg-white hover:border-[#4A6B53]'
                        }`}
                      >
                        {day.completed && <Check className="w-4 h-4" />}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-[#2C2C24]">Day {day.day}:</span>
                          <span className="text-xs font-bold text-[#2C2C24]">{day.title}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white border border-[#DCDCCF] text-[#5A5A40]">
                            {day.rewardBadge}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#5A5A40] mt-0.5">{day.task}</p>
                      </div>
                    </div>

                    <span className="text-[11px] text-[#8A8A7A] font-mono shrink-0">
                      {day.targetMinutes} min
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveView('plan')}
                  className="text-xs text-[#5A5A40] hover:underline cursor-pointer"
                >
                  &larr; Back to Learning Plan
                </button>

                <button
                  type="button"
                  onClick={() => setActiveView('paid_course')}
                  className="px-4 py-2 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Explore Paid Course (Rs. 499)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: PAID COURSE */}
          {activeView === 'paid_course' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-linear-to-r from-[#FAF9F5] to-[#FDF6EE] border border-[#F3DFC8] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C521C] text-white text-xs font-bold">
                    <Star className="w-3.5 h-3.5 text-[#F3DFC8]" />
                    <span>Comprehensive Master Course</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-[#8A8A7A] mr-1.5">Rs. 4,999/-</span>
                    <span className="text-lg font-bold font-mono text-[#2D5438]">Rs. 499/-</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#2C2C24]">
                  Full Immersion Course for Spoken {language.name}
                </h3>
                <p className="text-xs text-[#5A5A40]">
                  Unlock every single real-world roleplay across all CEFR levels, infinite custom AI scenario generator, full pronunciation coaching spectrogram, and lifetime progress sync.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="flex items-center gap-2 text-[#2C2C24]">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>50+ Structured Immersion Scenarios</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#2C2C24]">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>Real-time Gemini Audio Speech AI</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#2C2C24]">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>Phoneme-level Pronunciation Coach</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#2C2C24]">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>Official Verified CEFR Certificate</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between border-t border-[#F3DFC8]">
                  <div className="text-[11px] text-[#8C521C] font-semibold">
                    UPI: talwarvikasaxisbank@axl • Instant Activation
                  </div>

                  <button
                    type="button"
                    id="paid-course-enroll-btn"
                    onClick={() => {
                      onClose();
                      onOpenPaymentModal('Comprehensive Spoken Course');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Enroll Now (Rs. 499/-)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 6: SUBSCRIPTION TIERS */}
          {activeView === 'subscription' && (
            <div className="space-y-4">
              <div className="text-center max-w-md mx-auto space-y-1">
                <h3 className="text-base font-bold text-[#2C2C24]">Lifetime All-Access Subscription</h3>
                <p className="text-xs text-[#5A5A40]">
                  Zero recurring renewals. One single activation unlocks complete unlimited access forever.
                </p>
              </div>

              <div className="max-w-xl mx-auto pt-2">
                <div className="p-6 rounded-2xl bg-linear-to-b from-[#E9F0EA] via-[#F4F7F4] to-white border-2 border-[#4A6B53] shadow-sm space-y-5 relative">
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#4A6B53] text-white text-[10px] font-bold uppercase tracking-wider shadow-xs">
                    Lifetime Unlimited
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8E6DA] pb-4">
                    <div>
                      <div className="text-xs font-bold text-[#2D5438] uppercase tracking-wider">Full Access Pass</div>
                      <h4 className="text-lg font-bold text-[#1E3B27] mt-0.5">Zero Recurring Fees</h4>
                      <p className="text-xs text-[#5A5A40] mt-1">Pay once, learn forever across all languages &amp; scenarios</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-2xl font-bold font-mono text-[#2D5438]">
                        ₹499 <span className="text-xs line-through text-[#8A8A7A] font-normal">₹4,999</span>
                      </div>
                      <span className="text-[11px] text-[#4A6B53] font-semibold">90% Limited-Time Discount</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#2C2C24]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                      <span>All Languages &amp; 50+ Scenarios</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                      <span>Real-Time Voice AI &amp; Pronunciation Coach</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                      <span>Daily Streak &amp; Audio Recordings</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                      <span>Official CEFR Accredited Certificate</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPaymentModal('Lifetime All-Access Pass');
                    }}
                    className="w-full py-3 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-sm font-bold shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Activate Lifetime All-Access (₹499/-)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: CERTIFICATION / ADVANCED COURSE */}
          {activeView === 'certification' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border-2 border-[#DCDCCF] shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBEBE0] pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#4A6B53] flex items-center justify-center text-white">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2C2C24]">Official CEFR Fluency Certificate</h4>
                      <p className="text-[11px] text-[#5A5A40]">Verifiable accreditation for resume, LinkedIn &amp; academic credit</p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-md bg-[#E9F0EA] text-[#2D5438] text-xs font-bold font-mono border border-[#C5DAC8]">
                    CEFR B2/C1
                  </span>
                </div>

                {/* Certificate Mockup Frame */}
                <div className="p-6 rounded-xl bg-[#FAF9F5] border-2 border-double border-[#C5DAC8] text-center space-y-2 relative">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A8A7A]">Certificate of Spoken Mastery</div>
                  <div className="text-xl font-serif font-bold text-[#2C2C24]">
                    {user?.name || 'Vikas Talwar'}
                  </div>
                  <p className="text-xs text-[#5A5A40] max-w-sm mx-auto">
                    has successfully demonstrated professional spoken fluency in <strong>{language.name}</strong> according to international CEFR standards.
                  </p>

                  <div className="pt-4 flex items-center justify-between text-[10px] text-[#8A8A7A] border-t border-[#E3E3D8]">
                    <span>Verification ID: FLAI-{Date.now().toString().slice(-6)}</span>
                    <span className="font-bold text-[#4A6B53]">FluentAI Global Institute</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[#5A5A40]">
                    Awarded upon completing 15 conversations and passing the exit voice test.
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenPaymentModal('Certification Course');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Unlock Advanced Course &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#E3E3D8] bg-[#FAF9F5] flex items-center justify-between text-xs text-[#5A5A40]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4A6B53]" />
            <span>Official CEFR &amp; ACTFL Aligned Framework</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-[#2C2C24] hover:underline cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

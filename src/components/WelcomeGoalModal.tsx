import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Volume2,
  Calendar,
  BookOpen,
  Target,
  Zap,
  Award,
  Send,
  Check,
  RotateCcw
} from 'lucide-react';
import { LanguageConfig, CEFRLevel, UserProfile, UserGoal, UserGoalId } from '../types';
import { LEARNING_GOALS, getGoalById, getGoalByNumber } from '../data/learningGoals';
import { speakText } from '../utils/audio';

interface WelcomeGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageConfig;
  user?: UserProfile | null;
  currentGoalId?: UserGoalId;
  onSelectGoal: (goalId: UserGoalId) => void;
  onStartAssessment?: () => void;
}

export const WelcomeGoalModal: React.FC<WelcomeGoalModalProps> = ({
  isOpen,
  onClose,
  language,
  user,
  currentGoalId,
  onSelectGoal,
  onStartAssessment,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<UserGoal>(() => getGoalById(currentGoalId || 'speaking'));
  const [typedInput, setTypedInput] = useState('');
  const [isGreetingPlaying, setIsGreetingPlaying] = useState(false);
  const [showPathGenerated, setShowPathGenerated] = useState(false);

  // Sync when currentGoalId prop changes
  useEffect(() => {
    if (currentGoalId) {
      setSelectedGoal(getGoalById(currentGoalId));
    }
  }, [currentGoalId]);

  // Keyboard shortcut listener for 1 to 6
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 6) {
        const goal = getGoalByNumber(num);
        handlePickGoal(goal);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const userName = user?.name || 'Language Explorer';

  const handlePlayGreeting = () => {
    setIsGreetingPlaying(true);
    speakText({
      text: language.greeting,
      langCode: language.speechCode,
      onEnd: () => setIsGreetingPlaying(false)
    });
  };

  const handlePickGoal = (goal: UserGoal) => {
    setSelectedGoal(goal);
    setShowPathGenerated(true);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = typedInput.trim();
    if (!trimmed) return;

    // Check if user entered a number 1-6
    const num = parseInt(trimmed, 10);
    if (num >= 1 && num <= 6) {
      const g = getGoalByNumber(num);
      handlePickGoal(g);
      setTypedInput('');
      return;
    }

    // Check if user typed keywords
    const lower = trimmed.toLowerCase();
    const matched = LEARNING_GOALS.find(g => 
      lower.includes(g.title.toLowerCase()) || 
      lower.includes(g.id) ||
      (lower.includes('job') && g.id === 'job') ||
      (lower.includes('work') && g.id === 'job') ||
      (lower.includes('career') && g.id === 'job') ||
      (lower.includes('study') && g.id === 'study_abroad') ||
      (lower.includes('travel') && g.id === 'travel') ||
      (lower.includes('visa') && g.id === 'immigration') ||
      (lower.includes('speak') && g.id === 'speaking') ||
      (lower.includes('myself') && g.id === 'personal')
    );

    if (matched) {
      handlePickGoal(matched);
      setTypedInput('');
    }
  };

  const handleConfirmPath = () => {
    onSelectGoal(selectedGoal.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-[#FAF9F5] rounded-3xl border border-[#DCDCCF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-6 animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#E3E3D8] bg-[#FFFFFF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{language.flag}</span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#4A6B53]">
                Your Fluency Partner
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#2C2C24]">
                Welcome to FluentAI 🎉
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePlayGreeting}
              className="px-3 py-1.5 rounded-xl bg-[#E9F0EA] hover:bg-[#DCE7DD] text-[#2D5438] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Listen to native welcome audio"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isGreetingPlaying ? 'Playing...' : 'Audio Greeting'}</span>
            </button>

            <button
              type="button"
              id="close-welcome-goal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6">

          {/* Welcome Prompt Message Box (Styled like conversational prompt) */}
          <div className="p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#E3E3D8] shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">👋</span>
              <h3 className="text-lg font-extrabold text-[#2C2C24]">
                Hi <span className="text-[#2D5438]">{userName}</span>!
              </h3>
            </div>

            <p className="text-sm text-[#3D3D30] leading-relaxed">
              Welcome to <strong>Your Fluency Partner</strong> 🎉 You're about to start your journey to mastering <span className="font-extrabold text-[#2D5438]">{language.name}</span> <span className="tracking-wide">🇩🇪🇫🇷🇪🇸🇬🇧</span>.
            </p>

            <div className="p-3 rounded-xl bg-[#F4F4EC] border border-[#E3E3D8] text-xs font-semibold text-[#5A5A40] flex items-center justify-between">
              <span>Before we begin, select your primary goal below:</span>
              <span className="text-[11px] font-mono text-[#4A6B53] font-bold hidden sm:inline">
                (Press keys 1–6 or tap)
              </span>
            </div>
          </div>

          {/* 6 Core Goals Grid */}
          <div className="space-y-2.5">
            <div className="text-xs font-bold text-[#7A7A60] uppercase tracking-wider flex items-center justify-between">
              <span>Choose your target objective:</span>
              {showPathGenerated && (
                <span className="text-xs text-[#2D5438] font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Goal Selected
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {LEARNING_GOALS.map((goal) => {
                const isSelected = selectedGoal.id === goal.id;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => handlePickGoal(goal)}
                    className={`p-3 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer group overflow-hidden ${
                      isSelected
                        ? 'bg-[#E9F0EA] border-[#4A6B53] ring-2 ring-[#4A6B53]/25 shadow-xs'
                        : 'bg-[#FFFFFF] border-[#E3E3D8] hover:border-[#4A6B53] hover:bg-[#FDFDFB]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#DCDCCF] shrink-0 bg-[#F4F4EC]">
                            {goal.imageUrl ? (
                              <img
                                src={goal.imageUrl}
                                alt={goal.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="w-full h-full flex items-center justify-center text-sm">{goal.emoji}</span>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-mono text-[10px] font-bold text-[#4A6B53]">#{goal.number}</span>
                              <span className="text-sm font-bold text-[#2C2C24] group-hover:text-[#2D5438]">
                                {goal.title}
                              </span>
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-[#4A6B53] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-[#5A5A40] leading-snug">
                        {goal.tagline}
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#EAEAE0] flex items-center justify-between text-[11px] text-[#7A7A60]">
                      <span className="font-semibold text-[#2D5438]">{goal.badgeLabel}</span>
                      <span>{goal.dailyMinutes}m/day</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive "Reply with number" Text Input Bar */}
          <form onSubmit={handleInputSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder="Reply with number (1-6) or goal name..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-white border border-[#DCDCCF] text-xs sm:text-sm text-[#2C2C24] placeholder:text-[#8A8A7A] focus:outline-none focus:border-[#4A6B53] focus:ring-1 focus:ring-[#4A6B53]"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#8A8A7A]">
                1-6
              </span>
            </div>

            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Apply</span>
            </button>
          </form>

          {/* Generated Personalized Learning Path Showcase */}
          <div className="rounded-2xl bg-linear-to-b from-[#E9F0EA] to-[#F4F8F4] border-2 border-[#C5DAC8] overflow-hidden shadow-xs">
            {selectedGoal.imageUrl && (
              <div className="relative w-full h-28 sm:h-32 overflow-hidden bg-[#1F2421]">
                <img
                  src={selectedGoal.imageUrl}
                  alt={selectedGoal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2421]/90 via-[#1F2421]/40 to-transparent" />
                <div className="absolute bottom-2.5 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#2D5438]/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>Path Activated</span>
                    </div>
                    <h4 className="text-base font-extrabold text-white mt-1">
                      {selectedGoal.emoji} {selectedGoal.title}
                    </h4>
                  </div>
                  <span className="text-xs font-bold text-[#FAF9F5] bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg border border-white/20">
                    ~{selectedGoal.estimatedWeeks} Wks • {selectedGoal.dailyMinutes}m/day
                  </span>
                </div>
              </div>
            )}

            <div className="p-5 space-y-4">
              {!selectedGoal.imageUrl && (
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#C5DAC8] pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2D5438] text-white text-[10px] font-bold uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" />
                      <span>Personalized Learning Path Activated</span>
                    </div>
                    <h4 className="text-base font-extrabold text-[#2C2C24] mt-1 flex items-center gap-2">
                      <span>{selectedGoal.emoji} {selectedGoal.title}</span>
                      <span className="text-xs font-normal text-[#5A5A40]">({selectedGoal.targetCEFRLevel})</span>
                    </h4>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-[#885B32] bg-[#FAF9F5] px-2.5 py-1 rounded-lg border border-[#DCDCCF]">
                      ~{selectedGoal.estimatedWeeks} Weeks • {selectedGoal.dailyMinutes} min/day
                    </span>
                  </div>
                </div>
              )}

            <p className="text-xs text-[#3D3D30] leading-relaxed">
              {selectedGoal.description}
            </p>

            {/* 4-Week Milestone Roadmap */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#4A6B53] mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Your 4-Week Tailored Syllabus:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#D8E6DA]">
                  <div className="font-bold text-[#2D5438]">Week 1: Foundations</div>
                  <p className="text-[11px] text-[#5A5A40] mt-0.5">{selectedGoal.starterRoadmap.week1}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#D8E6DA]">
                  <div className="font-bold text-[#2D5438]">Week 2: Scenarios &amp; Drills</div>
                  <p className="text-[11px] text-[#5A5A40] mt-0.5">{selectedGoal.starterRoadmap.week2}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#D8E6DA]">
                  <div className="font-bold text-[#2D5438]">Week 3: Spontaneous Flow</div>
                  <p className="text-[11px] text-[#5A5A40] mt-0.5">{selectedGoal.starterRoadmap.week3}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-[#D8E6DA]">
                  <div className="font-bold text-[#2D5438]">Week 4: Real-World Mastery</div>
                  <p className="text-[11px] text-[#5A5A40] mt-0.5">{selectedGoal.starterRoadmap.week4}</p>
                </div>
              </div>
            </div>

            {/* Recommended Scenarios Pills */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#7A7A60] mb-1.5">
                Priority AI Roleplays For This Goal:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedGoal.sampleScenarios.map((sc, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-white border border-[#C5DAC8] text-xs font-semibold text-[#2C2C24]">
                    🎯 {sc}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        </div>

        {/* Modal Footer / CTAs */}
        <div className="px-6 py-4 border-t border-[#E3E3D8] bg-[#FFFFFF] flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[#5A5A40] flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#4A6B53]" />
            <span>Path customized for <strong>{language.name}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            {onStartAssessment && (
              <button
                type="button"
                onClick={() => {
                  onSelectGoal(selectedGoal.id);
                  onClose();
                  onStartAssessment();
                }}
                className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] border border-[#DCDCCF] text-xs font-bold text-[#2C2C24] transition-all cursor-pointer"
              >
                Take Diagnostic Test
              </button>
            )}

            <button
              type="button"
              id="confirm-personalized-path-btn"
              onClick={handleConfirmPath}
              className="px-5 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-98 flex items-center gap-2 cursor-pointer"
            >
              <span>🚀 Let's get started!</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Target, 
  Clock, 
  MessageSquare, 
  Flame, 
  Sparkles, 
  Check, 
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  Award,
  BarChart3,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  Gift,
  BookOpen,
  Mic,
  Zap,
  Star
} from 'lucide-react';
import { DailyGoal, GoalMetric, TalkScore, UserStats, DailyMission } from '../types';
import { calculateGoalProgress } from '../utils/goalUtils';
import { WeeklyProgressChart } from './WeeklyProgressChart';
import { getDefaultDailyMissions, getTalkScoreTier } from '../utils/talkScoreUtils';
import confetti from 'canvas-confetti';

interface DailyGoalTrackerProps {
  goal: DailyGoal;
  talkScore?: TalkScore;
  userStats?: UserStats;
  savedWordsCount?: number;
  onOpenGoalModal: () => void;
  onQuickUpdateTarget: (targetType: GoalMetric, targetValue: number) => void;
  onStartSuggestedPractice?: () => void;
  onOpenPronunciationCoach?: () => void;
  onOpenVocabBank?: () => void;
}

export const DailyGoalTracker: React.FC<DailyGoalTrackerProps> = ({
  goal,
  talkScore,
  userStats,
  savedWordsCount = 0,
  onOpenGoalModal,
  onQuickUpdateTarget,
  onStartSuggestedPractice,
  onOpenPronunciationCoach,
  onOpenVocabBank,
}) => {
  const [activeTab, setActiveTab] = useState<'goals' | 'talkscore' | 'missions'>('goals');
  const [showWeeklyChart, setShowWeeklyChart] = useState(true);
  const [claimedMissions, setClaimedMissions] = useState<Record<string, boolean>>({});

  const { current, target, percentage, isCompleted, remaining, unit } = calculateGoalProgress(goal);

  // Compute daily missions status
  const missions: DailyMission[] = getDefaultDailyMissions(goal, savedWordsCount, 88);
  const completedMissionsCount = missions.filter((m) => m.completed).length;
  const allMissionsCompleted = completedMissionsCount === missions.length;

  const handleClaimMission = (missionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClaimedMissions((prev) => ({ ...prev, [missionId]: true }));
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  // Generate 7-day week view for the tracker
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDayIndex = (today.getDay() + 6) % 7;

  const weekDays = dayNames.map((name, idx) => {
    const isToday = idx === currentDayIndex;
    const isPast = idx < currentDayIndex;
    
    let dayCompleted = false;
    let dayMins = 0;
    if (isToday) {
      dayCompleted = isCompleted;
      dayMins = goal.todayMinutesCompleted;
    } else if (isPast && goal.history) {
      const offset = currentDayIndex - idx;
      const targetDate = new Date(Date.now() - offset * 24 * 60 * 60 * 1000);
      const dateStr = `${targetDate.getFullYear()}-${String(targetDate.getMonth() + 1).padStart(2, '0')}-${String(targetDate.getDate()).padStart(2, '0')}`;
      const hist = goal.history.find((h) => h.date === dateStr);
      if (hist) {
        dayCompleted = hist.completed;
        dayMins = hist.minutes;
      } else {
        dayCompleted = true;
        dayMins = 15;
      }
    }

    return {
      name,
      isToday,
      isPast,
      dayCompleted,
      dayMins,
    };
  });

  const activeTalkScore = talkScore || {
    overall: 82,
    fluency: 84,
    pronunciation: 82,
    vocabulary: 80,
    grammar: 82,
    level: 'B2',
    tierLabel: 'Fluent Practitioner',
    nextLevelTarget: 'C1',
    pointsToNextLevel: 8,
    lastUpdated: new Date().toISOString(),
    history: [
      { date: 'Day 1', score: 74 },
      { date: 'Day 2', score: 77 },
      { date: 'Day 3', score: 79 },
      { date: 'Today', score: 82 },
    ]
  };

  const tierInfo = getTalkScoreTier(activeTalkScore.overall);

  return (
    <div id="daily-goal-tracker-section" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="rounded-3xl bg-[#FFFFFF] border border-[#E3E3D8] p-5 sm:p-7 shadow-xs hover:border-[#D0D0C2] transition-all">
        
        {/* Top Control Tabs: Daily Goal vs TalkScore™ vs Daily Missions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#F0EFEB] mb-6">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8]">
            <button
              type="button"
              id="tab-daily-goals-btn"
              onClick={() => setActiveTab('goals')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'goals'
                  ? 'bg-white text-[#2D5438] shadow-2xs border border-[#DCDCCF]'
                  : 'text-[#5A5A40] hover:text-[#2C2C24]'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-[#2D5438]" />
              <span>Daily Practice Goal</span>
              {isCompleted && (
                <span className="w-2 h-2 rounded-full bg-[#2D5438]" />
              )}
            </button>

            <button
              type="button"
              id="tab-talkscore-btn"
              onClick={() => setActiveTab('talkscore')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'talkscore'
                  ? 'bg-white text-[#2D5438] shadow-2xs border border-[#DCDCCF]'
                  : 'text-[#5A5A40] hover:text-[#2C2C24]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>TalkScore™</span>
              <span className="font-mono px-1.5 py-0.2 rounded-md bg-[#E9F0EA] text-[#2D5438] text-[10px]">
                {activeTalkScore.overall}
              </span>
            </button>

            <button
              type="button"
              id="tab-daily-missions-btn"
              onClick={() => setActiveTab('missions')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'missions'
                  ? 'bg-white text-[#2D5438] shadow-2xs border border-[#DCDCCF]'
                  : 'text-[#5A5A40] hover:text-[#2C2C24]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#C28E58]" />
              <span>Daily Missions</span>
              <span className="px-1.5 py-0.2 rounded-md bg-[#FDF6EE] text-[#A66324] text-[10px] font-mono font-bold">
                {completedMissionsCount}/{missions.length}
              </span>
            </button>
          </div>

          {/* Streak Flame & Shield Indicators */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] text-[#A66324] text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-600 fill-amber-500 animate-pulse" />
              <span>{userStats?.streakDays || goal.goalStreakDays || 4} Day Streak</span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-semibold" title="Streak Shield protects your progress if a day is missed">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2D5438]" />
              <span>Streak Protected</span>
            </div>
          </div>
        </div>

        {/* 1. TAB: DAILY PRACTICE GOALS */}
        {activeTab === 'goals' && (
          <div>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Left Column: Progress Bar & Target Presets */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#2D5438]">
                      <Target className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-base font-bold text-[#2C2C24]">
                          Today&apos;s Spoken Commitment
                        </h2>
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E9F0EA] text-[#2D5438] text-[10px] font-bold uppercase tracking-wider border border-[#C5DAC8]">
                            <Sparkles className="w-3 h-3 text-[#4A6B53]" />
                            Target Met!
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FDF6EE] text-[#A66324] text-[10px] font-semibold border border-[#F3DFC8]">
                            {remaining} {unit} left today
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5A5A40]">
                        Daily Target: <strong className="text-[#2C2C24]">{target} {unit}</strong> of active immersion
                      </p>
                    </div>
                  </div>

                  {/* Metric Switcher */}
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center p-0.5 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8]">
                      <button
                        type="button"
                        id="toggle-metric-minutes-btn"
                        onClick={() => onQuickUpdateTarget('minutes', goal.targetType === 'minutes' ? goal.targetValue : 15)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          goal.targetType === 'minutes'
                            ? 'bg-[#FFFFFF] text-[#2D5438] shadow-2xs border border-[#DCDCCF]'
                            : 'text-[#5A5A40] hover:text-[#2C2C24]'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>Minutes</span>
                      </button>
                      <button
                        type="button"
                        id="toggle-metric-conversations-btn"
                        onClick={() => onQuickUpdateTarget('conversations', goal.targetType === 'conversations' ? goal.targetValue : 2)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                          goal.targetType === 'conversations'
                            ? 'bg-[#FFFFFF] text-[#2D5438] shadow-2xs border border-[#DCDCCF]'
                            : 'text-[#5A5A40] hover:text-[#2C2C24]'
                        }`}
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Scenarios</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      id="toggle-weekly-chart-btn"
                      onClick={() => setShowWeeklyChart(!showWeeklyChart)}
                      className={`px-2.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        showWeeklyChart 
                          ? 'bg-[#E9F0EA] border-[#C5DAC8] text-[#2D5438]' 
                          : 'bg-[#FAF9F5] hover:bg-[#F0EFEA] border-[#E3E3D8] text-[#5A5A40] hover:text-[#2C2C24]'
                      }`}
                      title="Toggle 7-day minutes practiced visualization"
                    >
                      <BarChart3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">7-Day Chart</span>
                      {showWeeklyChart ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <button
                      type="button"
                      id="edit-daily-goal-btn"
                      onClick={onOpenGoalModal}
                      className="px-2.5 py-1.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F0EFEA] border border-[#E3E3D8] text-xs font-medium text-[#2C2C24] flex items-center gap-1 transition-all cursor-pointer"
                      title="Adjust your daily target"
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                  </div>
                </div>

                {/* Progress Bar & Numerical readout */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-baseline justify-between text-xs">
                    <span className="font-semibold text-[#2C2C24] flex items-center gap-1.5">
                      <span className="text-2xl font-bold font-mono text-[#2D5438]">{current}</span>
                      <span className="text-[#5A5A40]">/ {target} {unit} completed today</span>
                    </span>
                    <span className="font-mono font-bold text-xs text-[#2D5438] bg-[#E9F0EA] px-2.5 py-0.5 rounded-lg border border-[#C5DAC8]">
                      {percentage}%
                    </span>
                  </div>

                  <div className="h-3.5 w-full bg-[#EBEBE0] rounded-full overflow-hidden p-0.5 border border-[#DCDCCF]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-linear-to-r from-[#4A6B53] to-[#2D5438]'
                          : 'bg-linear-to-r from-[#C28E58] to-[#4A6B53]'
                      }`}
                      style={{ width: `${Math.min(100, percentage)}%` }}
                    />
                  </div>
                </div>

                {/* Quick Presets Row */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-[#5A5A40] font-medium mr-1">Quick Target:</span>
                  {goal.targetType === 'minutes' ? (
                    [5, 10, 15, 20, 30].map((mins) => (
                      <button
                        key={mins}
                        type="button"
                        onClick={() => onQuickUpdateTarget('minutes', mins)}
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          goal.targetValue === mins
                            ? 'bg-[#2D5438] text-white font-bold shadow-2xs'
                            : 'bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#5A5A40] hover:text-[#2C2C24] border border-[#E3E3D8]'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))
                  ) : (
                    [1, 2, 3, 5].map((conv) => (
                      <button
                        key={conv}
                        type="button"
                        onClick={() => onQuickUpdateTarget('conversations', conv)}
                        className={`px-2.5 py-0.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          goal.targetValue === conv
                            ? 'bg-[#2D5438] text-white font-bold shadow-2xs'
                            : 'bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#5A5A40] hover:text-[#2C2C24] border border-[#E3E3D8]'
                        }`}
                      >
                        {conv} {conv === 1 ? 'scenario' : 'scenarios'}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Right Column: Weekly Rhythm Dots */}
              <div className="lg:w-80 p-4 rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8] flex flex-col justify-between shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C2C24]">
                    <Flame className="w-4 h-4 text-[#C28E58] fill-[#C28E58]" />
                    <span>{goal.goalStreakDays}-Day Goal Streak</span>
                  </div>
                  <span className="text-[10px] uppercase font-semibold text-[#5A5A40] tracking-wider">
                    Weekly Rhythm
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 text-center mb-3">
                  {weekDays.map((day, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <span className={`text-[10px] font-medium ${day.isToday ? 'text-[#2D5438] font-bold' : 'text-[#5A5A40]'}`}>
                        {day.name}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
                          day.isToday
                            ? day.dayCompleted
                              ? 'bg-[#2D5438] text-white font-bold shadow-xs'
                              : 'bg-[#FFFFFF] border-2 border-[#C28E58] text-[#9E5D24] font-bold'
                            : day.dayCompleted
                            ? 'bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438]'
                            : 'bg-[#EBEBE0]/60 text-[#8C8C7A]'
                        }`}
                        title={`${day.name}: ${day.dayCompleted ? 'Goal Met' : 'In Progress'}`}
                      >
                        {day.dayCompleted ? (
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        ) : day.isToday ? (
                          <span className="text-[10px] font-mono">{percentage}%</span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8C8C7A]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#EBEBE0] flex items-center justify-between text-[11px] text-[#5A5A40]">
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#4A6B53]" />
                    <span>{isCompleted ? 'Target achieved today!' : 'Keep practicing to extend streak'}</span>
                  </span>
                  <button
                    onClick={onOpenGoalModal}
                    className="text-[#4A6B53] hover:underline font-semibold flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>Settings</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Embedded Recharts 7-Day Graph */}
            {showWeeklyChart && (
              <div className="mt-6 pt-5 border-t border-[#F0EFEB]">
                <WeeklyProgressChart
                  goal={goal}
                  onOpenGoalModal={onOpenGoalModal}
                  variant="embedded"
                />
              </div>
            )}
          </div>
        )}

        {/* 2. TAB: TALKSCORE™ FLUENCY INDEX */}
        {activeTab === 'talkscore' && (
          <div className="animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Overall TalkScore Gauge Card */}
              <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-br from-[#FAF9F5] to-[#F2F5F2] border border-[#DCDCCF] text-center space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-[11px] font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-[#2D5438]" />
                  <span>TalkScore™ Fluency Index</span>
                </div>

                <div className="relative w-32 h-32 mx-auto flex flex-col items-center justify-center rounded-full bg-white border-4 border-[#2D5438] shadow-md">
                  <span className="text-4xl font-extrabold font-mono text-[#1F2421] leading-none">
                    {activeTalkScore.overall}
                  </span>
                  <span className="text-[11px] font-bold text-[#7A7A68] mt-1">/ 100</span>
                </div>

                <div>
                  <div className="text-base font-extrabold text-[#1F2421]">
                    {tierInfo.badge} • {tierInfo.tier}
                  </div>
                  <p className="text-xs text-[#5A5A40] mt-1 leading-relaxed max-w-xs mx-auto">
                    {tierInfo.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#E8E8DF] flex items-center justify-between text-xs text-[#5A5A40]">
                  <span>Next: CEFR {activeTalkScore.nextLevelTarget}</span>
                  <span className="font-bold text-[#2D5438]">+{activeTalkScore.pointsToNextLevel} pts needed</span>
                </div>
              </div>

              {/* 4 Pillars Breakdown */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#1F2421]">
                    4 Fluency Pillars Calibration
                  </h3>
                  <span className="text-xs text-[#7A7A68]">
                    Calculated from speech turns, acoustic pitch & grammar
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Fluency Pillar */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E8E8DF] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F2421] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Conversational Fluency</span>
                      </span>
                      <span className="font-mono font-bold text-xs text-[#2D5438]">
                        {activeTalkScore.fluency}/100
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#EBEBE0] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${activeTalkScore.fluency}%` }} />
                    </div>
                    <p className="text-[11px] text-[#7A7A68]">
                      Speech cadence, response speed & minimal hesitation.
                    </p>
                  </div>

                  {/* Pronunciation Pillar */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E8E8DF] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F2421] flex items-center gap-1.5">
                        <Mic className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span>Phonetic Pronunciation</span>
                      </span>
                      <span className="font-mono font-bold text-xs text-[#2D5438]">
                        {activeTalkScore.pronunciation}/100
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#EBEBE0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#C85A32] rounded-full" style={{ width: `${activeTalkScore.pronunciation}%` }} />
                    </div>
                    <p className="text-[11px] text-[#7A7A68]">
                      Acoustic accuracy, vowel clarity & native tone inflection.
                    </p>
                  </div>

                  {/* Vocabulary Diversity */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E8E8DF] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F2421] flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#326B88]" />
                        <span>Lexical Diversity</span>
                      </span>
                      <span className="font-mono font-bold text-xs text-[#2D5438]">
                        {activeTalkScore.vocabulary}/100
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#EBEBE0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#326B88] rounded-full" style={{ width: `${activeTalkScore.vocabulary}%` }} />
                    </div>
                    <p className="text-[11px] text-[#7A7A68]">
                      CEFR vocabulary range, idiomatic phrasing & synonyms.
                    </p>
                  </div>

                  {/* Grammatical Accuracy */}
                  <div className="p-3.5 rounded-xl bg-white border border-[#E8E8DF] shadow-2xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F2421] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5438]" />
                        <span>Grammar & Syntax</span>
                      </span>
                      <span className="font-mono font-bold text-xs text-[#2D5438]">
                        {activeTalkScore.grammar}/100
                      </span>
                    </div>
                    <div className="h-2 w-full bg-[#EBEBE0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#2D5438] rounded-full" style={{ width: `${activeTalkScore.grammar}%` }} />
                    </div>
                    <p className="text-[11px] text-[#7A7A68]">
                      Agreement, verb tenses, connector words & sentence structure.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#5A5A40]">
                    <Sparkles className="w-4 h-4 text-[#2D5438]" />
                    <span>TalkScore™ automatically updates after every conversation or pronunciation drill.</span>
                  </div>
                  {onStartSuggestedPractice && (
                    <button
                      type="button"
                      onClick={onStartSuggestedPractice}
                      className="px-3 py-1 rounded-lg bg-[#2D5438] hover:bg-[#23422C] text-white text-xs font-bold cursor-pointer"
                    >
                      Boost TalkScore™
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. TAB: DAILY MISSIONS & QUESTS */}
        {activeTab === 'missions' && (
          <div className="animate-in fade-in duration-200 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A66324] mb-0.5">
                  <Star className="w-3.5 h-3.5 fill-[#C28E58] text-[#C28E58]" />
                  <span>Daily Language Quests</span>
                </div>
                <h3 className="text-lg font-bold text-[#1F2421]">
                  Complete 4 Missions for the Daily Bonus (+100 XP)
                </h3>
              </div>

              {allMissionsCompleted && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-bold animate-pulse">
                  <Gift className="w-4 h-4" />
                  <span>All Daily Quests Completed! 🎉</span>
                </div>
              )}
            </div>

            {/* Missions List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {missions.map((mission) => {
                const isClaimed = claimedMissions[mission.id];

                return (
                  <div
                    key={mission.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      mission.completed
                        ? 'bg-[#F2F7F3] border-[#C5DAC8]'
                        : 'bg-white border-[#E8E8DF]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl leading-none">{mission.icon}</span>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-bold text-[#1F2421]">
                            {mission.title}
                          </h4>
                          {mission.completed && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D5438]" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#7A7A68] mt-0.5">
                          {mission.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#5A5A40]">
                            {mission.currentCount}/{mission.targetCount} {mission.unit}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-[#FAF9F5] border border-[#E8E8DF] text-[#7A7A68] font-bold">
                            +{mission.xpReward} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {mission.completed ? (
                        isClaimed ? (
                          <span className="px-3 py-1.5 rounded-xl bg-white border border-[#C5DAC8] text-[#2D5438] text-xs font-bold">
                            Claimed ✓
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => handleClaimMission(mission.id, e)}
                            className="px-3 py-1.5 rounded-xl bg-[#2D5438] hover:bg-[#23422C] text-white text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
                          >
                            Claim XP
                          </button>
                        )
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (mission.id === 'mission-vocab' && onOpenVocabBank) {
                              onOpenVocabBank();
                            } else if (mission.id === 'mission-pronunciation' && onOpenPronunciationCoach) {
                              onOpenPronunciationCoach();
                            } else if (onStartSuggestedPractice) {
                              onStartSuggestedPractice();
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE3] border border-[#E8E8DF] text-xs font-bold text-[#1F2421] cursor-pointer"
                        >
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

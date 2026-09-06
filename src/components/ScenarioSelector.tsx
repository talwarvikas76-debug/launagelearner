import React, { useState } from 'react';
import { 
  Coffee, 
  Compass, 
  ShoppingBag, 
  MessageSquareHeart, 
  Briefcase, 
  Stethoscope, 
  UtensilsCrossed, 
  GraduationCap, 
  Plus, 
  Target, 
  ArrowRight,
  Filter,
  Sparkles,
  Bot,
  Lock,
  ShieldCheck,
  Headphones,
  Globe
} from 'lucide-react';
import { Scenario, ScenarioCategory, CEFRLevel, LanguageConfig, DailyGoal, GoalMetric, CourseEnrollment, UserProfile, FunnelStepId, UserGoalId } from '../types';
import { getGoalById } from '../data/learningGoals';
import { DailyGoalTracker } from './DailyGoalTracker';
import { CourseEnrollmentBanner } from './CourseEnrollmentBanner';
import { LearningPathwayFunnel } from './LearningPathwayFunnel';
import { FreeAssessmentSection } from './FreeAssessmentSection';

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  selectedLanguage: LanguageConfig;
  currentLevel: CEFRLevel;
  onSelectScenario: (scenario: Scenario) => void;
  onOpenCustomScenarioModal: () => void;
  dailyGoal: DailyGoal;
  onOpenGoalModal: () => void;
  onQuickUpdateTarget: (targetType: GoalMetric, targetValue: number) => void;
  enrollment: CourseEnrollment;
  onOpenPaymentModal: (targetScenarioTitle?: string) => void;
  user?: UserProfile | null;
  onOpenFunnelStep: (step: FunnelStepId) => void;
  onOpenAssistedSpeaker?: () => void;
  onOpenLeadMagnets?: (productId?: string) => void;
  onStartAssessment?: () => void;
  selectedGoalId?: UserGoalId;
  onOpenGoalSelectionModal?: () => void;
  onOpenDomainModal?: () => void;
}

const CATEGORY_TABS: { id: ScenarioCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Scenarios' },
  { id: 'dining', label: 'Dining & Cafés' },
  { id: 'travel', label: 'Travel & Navigation' },
  { id: 'daily', label: 'Daily Life' },
  { id: 'social', label: 'Casual & Social' },
  { id: 'business', label: 'Career & Work' },
  { id: 'emergency', label: 'Health & Pharmacy' },
  { id: 'custom', label: 'Custom' },
];

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  scenarios,
  selectedLanguage,
  currentLevel,
  onSelectScenario,
  onOpenCustomScenarioModal,
  dailyGoal,
  onOpenGoalModal,
  onQuickUpdateTarget,
  enrollment,
  onOpenPaymentModal,
  user,
  onOpenFunnelStep,
  onOpenAssistedSpeaker,
  onOpenLeadMagnets,
  onStartAssessment,
  selectedGoalId,
  onOpenGoalSelectionModal,
  onOpenDomainModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ScenarioCategory | 'all'>('all');
  const [levelFilter, setLevelFilter] = useState<CEFRLevel | 'all'>('all');

  const activeGoal = getGoalById(selectedGoalId);

  const filteredScenarios = scenarios.filter((s) => {
    const categoryMatch = selectedCategory === 'all' || s.category === selectedCategory;
    const levelMatch = levelFilter === 'all' || s.level === levelFilter;
    return categoryMatch && levelMatch;
  });

  const isFreeScenario = (scenario: Scenario) => {
    return scenario.id === 'cafe-order' || scenario.id === scenarios[0]?.id;
  };

  const handleScenarioClick = (scenario: Scenario) => {
    if (!enrollment.isEnrolled && !isFreeScenario(scenario)) {
      onOpenPaymentModal(scenario.title);
      return;
    }
    onSelectScenario(scenario);
  };

  const handleCustomScenarioClick = () => {
    if (!enrollment.isEnrolled) {
      onOpenPaymentModal('Custom AI Scenario Generator');
      return;
    }
    onOpenCustomScenarioModal();
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'MessageSquareHeart': return <MessageSquareHeart className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'amber': return 'bg-[#FDF6EE] text-[#A66324] border-[#F3DFC8]';
      case 'sky': return 'bg-[#EFF4F8] text-[#365A78] border-[#D0DFEB]';
      case 'emerald': return 'bg-[#E9F0EA] text-[#2D5438] border-[#C5DAC8]';
      case 'rose': return 'bg-[#F9EFEA] text-[#9A4C32] border-[#F0D5C9]';
      case 'indigo': return 'bg-[#F0EFF8] text-[#4E4782] border-[#D6D2EC]';
      case 'red': return 'bg-[#FBEBEB] text-[#9B3838] border-[#F4C8C8]';
      case 'teal': return 'bg-[#EBF5F3] text-[#2C6B60] border-[#C3E4DC]';
      case 'purple': return 'bg-[#F6EEF5] text-[#7A426F] border-[#E8D1E6]';
      default: return 'bg-[#EBEBE0] text-[#3D3D30] border-[#DCDCCF]';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
      
      {/* 🌟 FREE AI LANGUAGE ASSESSMENT & LEAD MAGNET HERO */}
      <FreeAssessmentSection
        language={selectedLanguage}
        currentLevel={currentLevel}
        onStartAssessment={onStartAssessment || (() => onOpenFunnelStep('test'))}
        onOpenLeadMagnets={onOpenLeadMagnets || (() => onOpenFunnelStep('test'))}
        onOpenPaymentModal={() => onOpenPaymentModal('Comprehensive Immersion Course')}
      />

      {/* Hero Welcome banner */}
      <div className="relative rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8] p-6 sm:p-8 mb-6 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-[#EBEBE0] rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#4A6B53]" />
              <span>Interactive Immersion Practice</span>
            </div>
            
            {onOpenDomainModal && (
              <button
                type="button"
                id="hero-domain-status-btn"
                onClick={onOpenDomainModal}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#F5F5F0] border border-[#DCDCCF] text-xs font-mono text-[#2C2C24] transition-colors cursor-pointer shadow-2xs"
                title="View domain configuration for talktoworld.co.in"
              >
                <Globe className="w-3.5 h-3.5 text-[#4A6B53]" />
                <span className="font-semibold text-[#2D5438]">talktoworld.co.in</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </button>
            )}
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#2C2C24] mb-3">
            Practice Spoken {selectedLanguage.name} with your AI Conversation Partner
          </h1>
          
          <p className="text-[#5A5A40] text-sm sm:text-base leading-relaxed mb-6">
            Choose a real-world roleplay scenario below. Your AI partner will converse with you in native{' '}
            <span className="font-semibold text-[#2D5438]">{selectedLanguage.nativeName}</span>, provide live grammar and pronunciation coaching, and guide you through practical objectives.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="create-custom-scenario-hero-btn"
              onClick={handleCustomScenarioClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-semibold text-sm transition-all shadow-xs active:scale-98 cursor-pointer"
            >
              {enrollment.isEnrolled ? (
                <Plus className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4 text-[#C5DAC8]" />
              )}
              <span>Create Custom Scenario</span>
            </button>

            <button
              type="button"
              id="open-pathway-hero-btn"
              onClick={() => onOpenFunnelStep('test')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#2C2C24] font-bold text-sm border border-[#DCDCCF] transition-all active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#4A6B53]" />
              <span>Free Diagnostic Test</span>
            </button>

            {onOpenAssistedSpeaker && (
              <button
                type="button"
                id="open-assisted-speaker-hero-btn"
                onClick={onOpenAssistedSpeaker}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#E9F0EA] hover:bg-[#DCE7DD] text-[#2D5438] font-bold text-sm border border-[#C5DAC8] transition-all active:scale-98 cursor-pointer shadow-2xs"
              >
                <Headphones className="w-4 h-4 text-[#4A6B53]" />
                <span>Assisted Pronunciation Speaker</span>
              </button>
            )}

            {!enrollment.isEnrolled && (
              <button
                type="button"
                id="unlock-course-hero-btn"
                onClick={() => onOpenPaymentModal()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#2C2C24] font-bold text-sm border border-[#DCDCCF] transition-all active:scale-98 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#4A6B53]" />
                <span>Enroll in Course (Rs. 499/-)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 7-Step Learning Pathway Funnel */}
      <LearningPathwayFunnel
        language={selectedLanguage}
        currentLevel={currentLevel}
        enrollment={enrollment}
        user={user}
        onOpenStep={onOpenFunnelStep}
        onOpenPaymentModal={onOpenPaymentModal}
      />

      {/* Course Enrollment & Payment Status Banner */}
      <CourseEnrollmentBanner
        enrollment={enrollment}
        onOpenPaymentModal={onOpenPaymentModal}
      />

      {/* Daily Goal Tracking Widget */}
      <DailyGoalTracker
        goal={dailyGoal}
        onOpenGoalModal={onOpenGoalModal}
        onQuickUpdateTarget={onQuickUpdateTarget}
      />

      {/* 🎯 Active Personalized Learning Goal Strip */}
      <div className="rounded-2xl bg-linear-to-r from-[#FAF9F5] via-[#F4F7F4] to-[#FAF9F5] border border-[#D5E4D7] p-4 sm:p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-xl border border-[#C5DAC8] overflow-hidden shrink-0 shadow-2xs bg-[#E9F0EA]">
            {activeGoal.imageUrl ? (
              <>
                <img
                  src={activeGoal.imageUrl}
                  alt={activeGoal.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center text-lg drop-shadow-sm">
                  {activeGoal.emoji}
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl">
                {activeGoal.emoji}
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#2D5438] text-white">
                Goal #{activeGoal.number}: {activeGoal.title}
              </span>
              <span className="text-xs text-[#5A5A40] font-medium">
                Target: <strong>{activeGoal.targetCEFRLevel}</strong>
              </span>
            </div>
            <p className="text-xs sm:text-sm font-bold text-[#2C2C24] mt-1">
              {activeGoal.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="text-[11px] font-mono font-semibold text-[#666650] hidden md:inline">
            ~{activeGoal.estimatedWeeks} wks • {activeGoal.dailyMinutes}m/day
          </span>
          {onOpenGoalSelectionModal && (
            <button
              type="button"
              id="change-learning-goal-btn"
              onClick={onOpenGoalSelectionModal}
              className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EBEBE0] border border-[#DCDCCF] text-xs font-bold text-[#2C2C24] transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>Change Goal (1-6)</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs & Level Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E3E3D8]">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#2C2C24] text-[#FAF9F5] font-semibold shadow-xs'
                  : 'text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Level filter chips */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto shrink-0">
          <div className="flex items-center gap-1 text-xs text-[#5A5A40] mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Level:</span>
          </div>
          {(['all', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                levelFilter === lvl
                  ? 'bg-[#E9F0EA] text-[#2D5438] font-bold border border-[#C5DAC8]'
                  : 'bg-[#EBEBE0]/70 text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#E2E2D5]'
              }`}
            >
              {lvl === 'all' ? 'All' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Custom Scenario Generator Card */}
        <button
          id="custom-scenario-card-btn"
          onClick={handleCustomScenarioClick}
          className="group text-left rounded-2xl bg-[#FAF9F5] border-2 border-dashed border-[#DCDCCF] hover:border-[#4A6B53] p-6 flex flex-col justify-between transition-all hover:bg-[#FFFFFF] active:scale-99 min-h-[260px] shadow-xs cursor-pointer relative"
        >
          {!enrollment.isEnrolled && (
            <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-[#FDF6EE] border border-[#F3DFC8] text-[#8C521C] text-[10px] font-bold flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Full Pass (Rs. 499)</span>
            </div>
          )}

          <div>
            <div className="w-12 h-12 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#4A6B53] mb-4 group-hover:scale-105 group-hover:bg-[#DEEADB] transition-all">
              {enrollment.isEnrolled ? (
                <Plus className="w-6 h-6" />
              ) : (
                <Lock className="w-5 h-5 text-[#4A6B53]" />
              )}
            </div>
            <h3 className="text-lg font-bold text-[#2C2C24] group-hover:text-[#4A6B53] transition-colors mb-2">
              Generate Any Scenario with AI
            </h3>
            <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
              Describe any situation (e.g. haggling for antiques, renting an apartment, discussing politics) and Gemini will design custom personas and objectives.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs font-semibold text-[#4A6B53]">
            <span>{enrollment.isEnrolled ? 'Launch AI Scenario Builder' : 'Unlock Custom Builder (Rs. 499/-)'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Existing Scenarios */}
        {filteredScenarios.map((scenario) => {
          const colorClass = getColorClasses(scenario.color);
          const isRecommended = scenario.level === currentLevel;
          const isFree = isFreeScenario(scenario);

          return (
            <div
              key={scenario.id}
              className={`group rounded-2xl bg-[#FFFFFF] border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs relative ${
                !enrollment.isEnrolled && isFree
                  ? 'border-[#4A6B53] ring-1 ring-[#4A6B53]/30 hover:shadow-md'
                  : isRecommended
                  ? 'border-[#4A6B53]/60 hover:border-[#4A6B53] hover:shadow-md'
                  : 'border-[#E3E3D8] hover:border-[#C8C8BA] hover:shadow-md'
              }`}
            >
              <div>
                {/* Visual Cover Banner with Overlay */}
                {scenario.imageUrl ? (
                  <div className="relative w-full h-36 overflow-hidden border-b border-[#E3E3D8] bg-[#F4F4EC]">
                    <img
                      src={scenario.imageUrl}
                      alt={scenario.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-xs backdrop-blur-xs bg-white/95 ${colorClass}`}>
                        {getIconComponent(scenario.icon)}
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        {!enrollment.isEnrolled && (
                          isFree ? (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#E9F0EA]/95 text-[#2D5438] border border-[#C5DAC8] flex items-center gap-1 shadow-2xs backdrop-blur-xs">
                              <Sparkles className="w-2.5 h-2.5 text-[#4A6B53]" />
                              <span>1st Free</span>
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#FDF6EE]/95 text-[#8C521C] border border-[#F3DFC8] flex items-center gap-1 backdrop-blur-xs">
                              <Lock className="w-2.5 h-2.5" />
                              <span>Next Up</span>
                            </span>
                          )
                        )}
                        {isRecommended && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#2D5438]/90 text-white backdrop-blur-xs">
                            Recommended
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-white/95 text-[#2C2C24] border border-white/40 shadow-2xs">
                          {scenario.level}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Partner Avatar Overlay */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-2 drop-shadow-sm">
                        {scenario.partnerAvatarUrl && (
                          <img
                            src={scenario.partnerAvatarUrl}
                            alt={scenario.partnerName}
                            referrerPolicy="no-referrer"
                            className="w-6 h-6 rounded-full object-cover border border-white/90 shadow-xs shrink-0"
                          />
                        )}
                        <span className="font-semibold text-xs text-white drop-shadow-sm">
                          {scenario.partnerName} <span className="text-white/80 font-normal">({scenario.partnerRole})</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 pb-0 flex items-start justify-between gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border shadow-xs ${colorClass}`}>
                      {getIconComponent(scenario.icon)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-[#EBEBE0] text-[#2C2C24] border border-[#DCDCCF]">
                        {scenario.level}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-5">
                  {/* Scenario Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#2C2C24] group-hover:text-[#4A6B53] transition-colors mb-1.5 line-clamp-1">
                    {scenario.title}
                  </h3>
                  
                  {!scenario.imageUrl && (
                    <div className="text-xs text-[#4A6B53] font-medium mb-3 flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5" />
                      <span>Partner: {scenario.partnerName} ({scenario.partnerRole})</span>
                    </div>
                  )}

                  <p className="text-xs text-[#5A5A40] leading-relaxed mb-4 line-clamp-2">
                    {scenario.situation}
                  </p>

                  {/* Objectives Pill Count */}
                  <div className="flex items-center gap-1.5 text-xs text-[#5A5A40] mb-2 bg-[#FAF9F5] px-3 py-2 rounded-lg border border-[#E3E3D8]">
                    <Target className="w-3.5 h-3.5 text-[#4A6B53] shrink-0" />
                    <span>{scenario.objectives.length} Target Objectives</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  id={`start-scenario-${scenario.id}`}
                  onClick={() => handleScenarioClick(scenario)}
                  className={`w-full py-2.5 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all active:scale-98 shadow-xs cursor-pointer ${
                    enrollment.isEnrolled || isFree
                      ? 'bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5]'
                      : 'bg-[#FAF9F5] hover:bg-[#FDF6EE] text-[#8C521C] border border-[#F3DFC8]'
                  }`}
                >
                {enrollment.isEnrolled ? (
                  <>
                    <span>Start Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : isFree ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Start Free Practice</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#C28E58]" />
                    <span>Unlock Next Practice (<span className="line-through text-[#9E7A5A]">₹4,999</span> <span className="text-[#2D5438]">₹499</span>)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

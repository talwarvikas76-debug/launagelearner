import React, { useState } from 'react';
import { 
  ArrowRight,
  Filter,
  Sparkles,
  Lock,
  Plus,
  Compass,
  Briefcase,
  Coffee,
  RotateCcw
} from 'lucide-react';
import { Scenario, CEFRLevel, LanguageConfig, DailyGoal, GoalMetric, CourseEnrollment, UserProfile, FunnelStepId, UserGoalId } from '../types';
import { LanguageSpotlightBanner } from './GermanSpotlightBanner';
import { LearningPathwayFunnel } from './LearningPathwayFunnel';
import { PricingSection } from './PricingSection';
import { SUPPORTED_LANGUAGES } from '../data/languages';

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  selectedLanguage: LanguageConfig;
  currentLevel: CEFRLevel;
  onSelectLanguage?: (lang: LanguageConfig) => void;
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

export type ContextFilter = 'all' | 'travel' | 'career' | 'daily';

const CONTEXT_FILTERS: { 
  id: ContextFilter; 
  label: string; 
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}[] = [
  { 
    id: 'all', 
    label: 'All Scenarios', 
    icon: Sparkles,
    description: 'Explore all immersive conversation topics'
  },
  { 
    id: 'travel', 
    label: 'Travel', 
    icon: Compass,
    description: 'Airports, hotels, transit, and exploring new cities'
  },
  { 
    id: 'career', 
    label: 'Career', 
    icon: Briefcase,
    description: 'Interviews, client presentations, and business pitching'
  },
  { 
    id: 'daily', 
    label: 'Daily Life', 
    icon: Coffee,
    description: 'Cafés, artisan markets, flats, dining, and casual chats'
  },
];

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  scenarios,
  selectedLanguage,
  currentLevel,
  onSelectLanguage,
  onSelectScenario,
  onOpenCustomScenarioModal,
  enrollment,
  onOpenPaymentModal,
  user,
  onOpenFunnelStep,
  onStartAssessment,
}) => {
  const [contextFilter, setContextFilter] = useState<ContextFilter>('all');
  const [levelFilter, setLevelFilter] = useState<CEFRLevel | 'all'>('all');

  const handleSwitchToGerman = () => {
    const german = SUPPORTED_LANGUAGES.find((l) => l.id === 'de');
    if (german && onSelectLanguage) {
      onSelectLanguage(german);
    }
  };

  const getScenarioContext = (scenario: Scenario): 'travel' | 'career' | 'daily' => {
    if (scenario.category === 'travel') return 'travel';
    if (scenario.category === 'business') return 'career';
    return 'daily'; // covers daily, dining, social, emergency
  };

  const filteredScenarios = scenarios.filter((s) => {
    const sContext = getScenarioContext(s);
    const contextMatch = contextFilter === 'all' || sContext === contextFilter;
    const levelMatch = levelFilter === 'all' || s.level === levelFilter;
    return contextMatch && levelMatch;
  });

  const getCountForContext = (ctx: ContextFilter) => {
    if (ctx === 'all') return scenarios.length;
    return scenarios.filter((s) => getScenarioContext(s) === ctx).length;
  };

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

  const starterScenario = scenarios.find((s) => s.id === 'cafe-order') || scenarios[0];

  return (
    <div className="w-full flex flex-col items-center bg-[#F6F7F2]">
      
      {/* Dynamic Language Immersion Spotlight Banner with Image and Text Overlay */}
      <LanguageSpotlightBanner
        currentLanguage={selectedLanguage}
        onSelectLanguage={onSelectLanguage || handleSwitchToGerman}
        onStartScenario={() => {
          if (starterScenario) {
            handleScenarioClick(starterScenario);
          }
        }}
      />

      {/* 3. Immersive Scenarios Section */}
      <section id="scenarios-section" className="w-full pt-4 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1F2421] tracking-tight">
                Immersive Scenarios
              </h2>
              <p className="text-sm text-[#7A7A68] mt-1 font-normal">
                Real-world conversations in {selectedLanguage.name} with authentic native personas.
              </p>
            </div>

            {/* Level Filter Chips */}
            <div className="flex items-center gap-1.5 self-start md:self-auto bg-white p-1 rounded-xl border border-[#E8E8DF] shadow-2xs">
              <div className="flex items-center gap-1 text-[11px] font-bold text-[#7A7A68] px-2">
                <Filter className="w-3 h-3" />
                <span className="hidden sm:inline">Level:</span>
              </div>
              {(['all', 'A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    levelFilter === lvl
                      ? 'bg-[#2F523A] text-white shadow-2xs'
                      : 'text-[#555546] hover:bg-[#F5F5F0]'
                  }`}
                >
                  {lvl === 'all' ? 'All' : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Dedicated Horizontal Context Filter Bar ('Travel', 'Career', 'Daily Life') */}
          <div className="mb-8 w-full">
            <div className="bg-white/80 backdrop-blur-xs p-1.5 rounded-2xl border border-[#E8E8DF] shadow-2xs flex items-center gap-2 overflow-x-auto scrollbar-thin">
              {CONTEXT_FILTERS.map((filter) => {
                const IconComponent = filter.icon;
                const isSelected = contextFilter === filter.id;
                const count = getCountForContext(filter.id);

                return (
                  <button
                    key={filter.id}
                    type="button"
                    id={`context-filter-${filter.id}`}
                    onClick={() => setContextFilter(filter.id)}
                    className={`group flex items-center gap-2.5 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#2F523A] text-white shadow-xs'
                        : 'text-[#555546] hover:text-[#1F2421] hover:bg-[#F5F5F0]'
                    }`}
                  >
                    <IconComponent 
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isSelected ? 'text-[#D8EADB]' : 'text-[#7A7A68]'
                      }`} 
                    />
                    <span>{filter.label}</span>
                    <span 
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold ${
                        isSelected 
                          ? 'bg-white/20 text-white' 
                          : 'bg-[#F0EFEB] text-[#7A7A68]'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Context Summary */}
            <div className="mt-2.5 px-1 flex items-center justify-between text-xs text-[#7A7A68]">
              <span>
                Showing <strong className="text-[#1F2421] font-semibold">{filteredScenarios.length}</strong> {contextFilter === 'all' ? 'total' : contextFilter} {filteredScenarios.length === 1 ? 'scenario' : 'scenarios'}
                {levelFilter !== 'all' && <> at level <strong className="text-[#1F2421]">{levelFilter}</strong></>}
              </span>
              {(contextFilter !== 'all' || levelFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setContextFilter('all');
                    setLevelFilter('all');
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2F523A] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Empty State if filter combination has no matches */}
          {filteredScenarios.length === 0 && (
            <div className="bg-white rounded-3xl border border-[#E8E8DF] p-10 text-center space-y-4 max-w-lg mx-auto my-8">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F5F0] text-[#7A7A68] flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1F2421]">No matching scenarios found</h3>
                <p className="text-xs text-[#7A7A68] mt-1">
                  There are no {contextFilter} scenarios currently listed for level {levelFilter}.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setLevelFilter('all');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#F5F5F0] hover:bg-[#EBEBE3] text-xs font-bold text-[#1F2421] cursor-pointer"
                >
                  Show all levels for {contextFilter}
                </button>
                <button
                  type="button"
                  onClick={handleCustomScenarioClick}
                  className="px-4 py-2 rounded-xl bg-[#2F523A] hover:bg-[#23422C] text-xs font-bold text-white cursor-pointer"
                >
                  Generate with AI
                </button>
              </div>
            </div>
          )}

          {/* Photographic Cinematic Grid (Matching Screenshot Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Custom AI Generator Card */}
            <div
              id="custom-scenario-card"
              onClick={handleCustomScenarioClick}
              className="group rounded-3xl bg-white border-2 border-dashed border-[#DCDCCF] hover:border-[#2F523A] p-6 flex flex-col justify-between transition-all hover:shadow-md cursor-pointer min-h-[380px] text-left"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#2F523A] group-hover:scale-105 transition-transform">
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#2F523A] mb-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Gemini AI Engine</span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1F2421] group-hover:text-[#2F523A] transition-colors leading-tight">
                    Create Custom Scenario
                  </h3>
                  <p className="text-xs text-[#555546] leading-relaxed mt-2">
                    Describe any specific conversation (negotiating a flat lease in Tokyo, ordering tapas in Madrid, or an executive pitch in Berlin) and practice with a tailored AI partner.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0EFEB] flex items-center justify-between text-xs font-bold text-[#2F523A]">
                <span>{enrollment.isEnrolled ? 'Launch Custom Builder' : 'Unlock Builder (₹999)'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Photographic Cards (Directly matching reference screenshot) */}
            {filteredScenarios.map((scenario) => {
              const isFree = isFreeScenario(scenario);
              const isUnlocked = enrollment.isEnrolled || isFree;

              return (
                <div
                  key={scenario.id}
                  onClick={() => handleScenarioClick(scenario)}
                  className="group rounded-3xl bg-white border border-[#E8E8DF] shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all overflow-hidden flex flex-col justify-between cursor-pointer relative min-h-[380px]"
                >
                  {/* High-Resolution Photographic Image Container */}
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#1F2421]">
                    <img
                      src={scenario.imageUrl}
                      alt={scenario.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient overlay for typography readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />

                    {/* Top Right Corner: CEFR Level Badge (Matching Screenshot) */}
                    <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                      {!enrollment.isEnrolled && !isFree && (
                        <span className="px-2 py-1 rounded-xl text-[10px] font-bold bg-black/60 text-white/90 border border-white/20 shadow-xs backdrop-blur-md flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-300" />
                          <span>₹999</span>
                        </span>
                      )}

                      <span className="px-3 py-1 rounded-xl text-xs font-mono font-extrabold bg-white text-[#1F2421] shadow-xs">
                        {scenario.level}
                      </span>
                    </div>

                    {/* Bottom Image Overlay: Title & Partner */}
                    <div className="absolute bottom-4 left-4 right-4 text-left space-y-2">
                      <div className="flex items-center gap-2">
                        {scenario.partnerAvatarUrl && (
                          <img
                            src={scenario.partnerAvatarUrl}
                            alt={scenario.partnerName}
                            referrerPolicy="no-referrer"
                            className="w-5 h-5 rounded-full object-cover border border-white/80 shadow-2xs shrink-0"
                          />
                        )}
                        <span className="text-[11px] font-medium text-white/80">
                          {scenario.partnerName} • {scenario.partnerRole}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow-sm">
                        {scenario.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom: Clean White Button (Matching Screenshot) */}
                  <div className="p-4 sm:p-5 bg-white flex flex-col justify-between flex-1 space-y-3.5 text-left">
                    <p className="text-xs text-[#7A7A68] leading-relaxed line-clamp-2">
                      {scenario.situation}
                    </p>

                    <button
                      type="button"
                      id={`start-roleplay-${scenario.id}`}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-2xs border border-[#E8E8DF] active:scale-98 cursor-pointer ${
                        isUnlocked
                          ? 'bg-white hover:bg-[#F5F5F0] text-[#1F2421] hover:border-[#C5DAC8]'
                          : 'bg-[#FAF9F5] hover:bg-[#FDF4EB] text-[#8C521C] border-[#F3DFC8]'
                      }`}
                    >
                      {isUnlocked ? (
                        <>
                          <span>Start Roleplay</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5 text-[#C28E58]" />
                          <span>Unlock All Scenarios (₹999)</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* 4. Learning Pathway Funnel */}
      <div id="learning-pathway-funnel" className="w-full">
        <LearningPathwayFunnel
          language={selectedLanguage}
          currentLevel={currentLevel}
          enrollment={enrollment}
          user={user}
          onOpenStep={onOpenFunnelStep}
          onOpenPaymentModal={onOpenPaymentModal}
        />
      </div>

      {/* 5. Pricing Section */}
      <div id="pricing-section" className="w-full">
        <PricingSection
          enrollment={enrollment}
          onOpenPaymentModal={() => onOpenPaymentModal('TalkToWorld Lifetime All-Access Pass')}
        />
      </div>

    </div>
  );
};

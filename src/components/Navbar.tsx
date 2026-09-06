import React, { useState } from 'react';
import { 
  Globe2, 
  Sparkles, 
  BookMarked, 
  Volume2, 
  Flame, 
  Settings2, 
  ChevronDown, 
  Check,
  Target,
  Lock,
  Award,
  User,
  LogOut,
  ShieldCheck,
  Smartphone,
  Mail,
  Headphones,
  Gift
} from 'lucide-react';
import { LanguageConfig, CEFRLevel, UserStats, DailyGoal, CourseEnrollment, UserProfile, UserGoalId } from '../types';
import { SUPPORTED_LANGUAGES, CEFR_LEVELS } from '../data/languages';
import { getGoalById } from '../data/learningGoals';
import { calculateGoalProgress } from '../utils/goalUtils';

interface NavbarProps {
  currentLanguage: LanguageConfig;
  onSelectLanguage: (lang: LanguageConfig) => void;
  currentLevel: CEFRLevel;
  onSelectLevel: (level: CEFRLevel) => void;
  userStats: UserStats;
  dailyGoal: DailyGoal;
  onOpenGoalModal: () => void;
  savedWordsCount: number;
  onOpenVocabBank: () => void;
  autoPlayAudio: boolean;
  onToggleAutoPlayAudio: () => void;
  playbackSpeed: number;
  onChangePlaybackSpeed: (speed: number) => void;
  onLogoClick: () => void;
  enrollment: CourseEnrollment;
  onOpenPaymentModal: () => void;
  user?: UserProfile | null;
  onOpenAuthModal: (tab?: 'google' | 'email' | 'phone') => void;
  onSignOut: () => void;
  onOpenPathwayModal?: () => void;
  onOpenAssistedSpeaker?: (phrase?: string) => void;
  onOpenLeadMagnets?: (productId?: string) => void;
  selectedGoalId?: UserGoalId;
  onOpenGoalSelectionModal?: () => void;
  onOpenDomainModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onSelectLanguage,
  currentLevel,
  onSelectLevel,
  userStats,
  dailyGoal,
  onOpenGoalModal,
  savedWordsCount,
  onOpenVocabBank,
  autoPlayAudio,
  onToggleAutoPlayAudio,
  playbackSpeed,
  onChangePlaybackSpeed,
  onLogoClick,
  enrollment,
  onOpenPaymentModal,
  user,
  onOpenAuthModal,
  onSignOut,
  onOpenPathwayModal,
  onOpenAssistedSpeaker,
  onOpenLeadMagnets,
  selectedGoalId,
  onOpenGoalSelectionModal,
  onOpenDomainModal,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);
  const [audioMenuOpen, setAudioMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const activeLevelConfig = CEFR_LEVELS.find(l => l.level === currentLevel) || CEFR_LEVELS[2];
  const goalProgress = calculateGoalProgress(dailyGoal);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF9F5]/90 backdrop-blur-md border-b border-[#E3E3D8] text-[#2C2C24] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand */}
        <button
          id="nav-logo-btn"
          onClick={onLogoClick}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-98"
        >
          <div className="w-10 h-10 rounded-xl bg-[#EAE8DD] border border-[#D8D5C8] flex items-center justify-center text-[#4A6B53] group-hover:bg-[#E2DFD2] group-hover:border-[#C8C5B8] transition-all shadow-xs">
            <Sparkles className="w-5 h-5 text-[#4A6B53]" />
          </div>
          <div>
            <div className="font-semibold text-base tracking-tight text-[#2C2C24] flex items-center gap-1.5">
              <span>TalkToWorld</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#E9F0EA] text-[#2D5438] font-mono font-medium border border-[#C5DAC8]">
                AI Native
              </span>
            </div>
            <p className="text-xs text-[#5A5A40] hidden sm:block">talktoworld.co.in • Real-time Immersion</p>
          </div>
        </button>

        {/* Center: Language & Level Selectors */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="relative">
            <button
              id="language-select-btn"
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setLevelDropdownOpen(false);
                setAudioMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F5F5F0] border border-[#DCDCCF] hover:border-[#C8C8BA] text-sm font-medium text-[#2C2C24] shadow-xs transition-all"
            >
              <span className="text-lg leading-none">{currentLanguage.flag}</span>
              <span className="hidden md:inline">{currentLanguage.name}</span>
              <span className="text-xs text-[#5A5A40] font-normal hidden lg:inline">({currentLanguage.nativeName})</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5A5A40] ml-0.5" />
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)} 
                />
                <div className="absolute left-0 mt-2 w-64 rounded-xl bg-[#FFFFFF] border border-[#DCDCCF] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#5A5A40] border-b border-[#EBEBE0] mb-1 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-[#4A6B53]" />
                    Target Practice Language
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = lang.id === currentLanguage.id;
                      return (
                        <button
                          key={lang.id}
                          onClick={() => {
                            onSelectLanguage(lang);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                            isSelected
                              ? 'bg-[#E9F0EA] text-[#2D5438] font-medium border border-[#C5DAC8]'
                              : 'text-[#2C2C24] hover:bg-[#F5F5F0]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl leading-none">{lang.flag}</span>
                            <div>
                              <div className="leading-snug">{lang.name}</div>
                              <div className="text-xs text-[#5A5A40]">{lang.nativeName}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#4A6B53]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* CEFR Level Selector */}
          <div className="relative">
            <button
              id="cefr-level-btn"
              onClick={() => {
                setLevelDropdownOpen(!levelDropdownOpen);
                setLangDropdownOpen(false);
                setAudioMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#F5F5F0] border border-[#DCDCCF] hover:border-[#C8C8BA] text-sm font-medium text-[#2C2C24] shadow-xs transition-all"
            >
              <span className="px-1.5 py-0.2 text-xs font-bold font-mono rounded bg-[#E9F0EA] text-[#2D5438] border border-[#C5DAC8]">
                {currentLevel}
              </span>
              <span className="hidden sm:inline text-xs text-[#3D3D30]">{activeLevelConfig.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#5A5A40]" />
            </button>

            {levelDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLevelDropdownOpen(false)} 
                />
                <div className="absolute right-0 sm:left-0 mt-2 w-72 rounded-xl bg-[#FFFFFF] border border-[#DCDCCF] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-2 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#5A5A40] border-b border-[#EBEBE0] mb-1">
                    Select Your CEFR Proficiency Level
                  </div>
                  <div className="space-y-1">
                    {CEFR_LEVELS.map((lvl) => {
                      const isSelected = lvl.level === currentLevel;
                      return (
                        <button
                          key={lvl.level}
                          onClick={() => {
                            onSelectLevel(lvl.level);
                            setLevelDropdownOpen(false);
                          }}
                          className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors ${
                            isSelected
                              ? 'bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438]'
                              : 'hover:bg-[#F5F5F0] text-[#2C2C24]'
                          }`}
                        >
                          <span className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-[#EBEBE0] text-[#2C2C24] border border-[#DCDCCF] shrink-0 mt-0.5">
                            {lvl.level}
                          </span>
                          <div className="flex-1">
                            <div className="text-sm font-medium leading-none text-[#2C2C24] mb-1">{lvl.title}</div>
                            <div className="text-xs text-[#5A5A40]">{lvl.desc}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#4A6B53] shrink-0 mt-0.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Learning Goal Selector / Personalized Path */}
          {onOpenGoalSelectionModal && (
            <button
              type="button"
              id="learning-goal-btn"
              onClick={onOpenGoalSelectionModal}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EFEA] border border-[#DCDCCF] hover:border-[#C8C8BA] text-xs font-semibold text-[#2C2C24] shadow-2xs transition-all cursor-pointer"
              title="Change your learning goal and customized path"
            >
              <span className="text-sm">{getGoalById(selectedGoalId).emoji}</span>
              <span className="text-xs text-[#2D5438] font-bold">
                {getGoalById(selectedGoalId).title}
              </span>
            </button>
          )}
        </div>

        {/* Right side: Course Pass, Goal, Streak, Audio settings, Vocab Bank */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Course Enrollment Status / Unlock Button */}
          {enrollment.isEnrolled ? (
            <button
              type="button"
              id="nav-course-pass-enrolled-btn"
              onClick={onOpenPaymentModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-semibold shadow-xs hover:bg-[#DCEADA] transition-all cursor-pointer"
              title="Course Enrolled • Lifetime Access (Click to view receipt)"
            >
              <Award className="w-3.5 h-3.5 text-[#2D5438]" />
              <span className="hidden md:inline">Course Pass</span>
              <span className="text-[10px] font-mono font-bold px-1 rounded bg-[#2D5438] text-white">PRO</span>
            </button>
          ) : (
            <button
              type="button"
              id="nav-unlock-course-btn"
              onClick={onOpenPaymentModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#C28E58] text-[#8C521C] hover:bg-[#FDF6EE] text-xs font-bold shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Unlock full course: 1 Free exercise included, all next practices for Rs. 499/- (Regular Rs. 4,999/-)"
            >
              <Lock className="w-3.5 h-3.5 text-[#C28E58]" />
              <span>Unlock (<span className="line-through text-[#9E7A5A]">₹4,999</span> <span className="text-[#2D5438]">₹499</span>)</span>
            </button>
          )}

          {/* Daily Goal Quick-Button */}
          <button
            id="nav-daily-goal-btn"
            onClick={onOpenGoalModal}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold shadow-xs transition-all active:scale-98 cursor-pointer ${
              goalProgress.isCompleted
                ? 'bg-[#E9F0EA] border-[#C5DAC8] text-[#2D5438] hover:bg-[#DCEADA]'
                : 'bg-[#FAF9F5] border-[#DCDCCF] text-[#2C2C24] hover:bg-[#F0EFEA]'
            }`}
            title={`Daily Goal: ${goalProgress.current}/${goalProgress.target} ${goalProgress.unit} (${goalProgress.percentage}%) - Click to customize`}
          >
            <Target className={`w-3.5 h-3.5 ${goalProgress.isCompleted ? 'text-[#2D5438]' : 'text-[#4A6B53]'}`} />
            <span className="hidden xs:inline">{goalProgress.current}/{goalProgress.target} {goalProgress.unit}</span>
            <span className={`px-1 rounded text-[10px] font-mono font-bold ${goalProgress.isCompleted ? 'bg-[#2D5438] text-white' : 'bg-[#EBEBE0] text-[#5A5A40]'}`}>
              {goalProgress.percentage}%
            </span>
          </button>

          {/* Daily Streak */}
          <div 
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FDF6EE] border border-[#F3DFC8] text-[#9E5D24] text-xs font-semibold shadow-xs"
            title={`${userStats.streakDays} Day Practice Streak`}
          >
            <Flame className="w-3.5 h-3.5 text-[#C28E58] fill-[#C28E58]" />
            <span>{userStats.streakDays}d</span>
          </div>

          {/* Audio Quick Settings */}
          <div className="relative">
            <button
              id="audio-settings-btn"
              onClick={() => {
                setAudioMenuOpen(!audioMenuOpen);
                setLangDropdownOpen(false);
                setLevelDropdownOpen(false);
              }}
              aria-label="Audio and speech settings"
              className={`p-2 rounded-lg border transition-all ${
                autoPlayAudio
                  ? 'bg-[#FFFFFF] border-[#DCDCCF] text-[#4A6B53] hover:text-[#3E5A45] hover:bg-[#F5F5F0]'
                  : 'bg-[#EBEBE0]/60 border-[#DCDCCF] text-[#5A5A40] hover:text-[#2C2C24]'
              }`}
              title="Voice & Audio Settings"
            >
              <Volume2 className="w-4 h-4" />
            </button>

            {audioMenuOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setAudioMenuOpen(false)} />
                <div className="absolute right-0 mt-2 w-60 rounded-xl bg-[#FFFFFF] border border-[#DCDCCF] shadow-xl p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-xs font-semibold text-[#2C2C24] mb-2 flex items-center gap-1.5">
                    <Settings2 className="w-3.5 h-3.5 text-[#4A6B53]" />
                    Speech & Voice Settings
                  </div>

                  {/* Auto-play toggle */}
                  <label className="flex items-center justify-between py-2 border-b border-[#EBEBE0] cursor-pointer">
                    <span className="text-xs text-[#3D3D30]">Auto-play AI Voice</span>
                    <input
                      type="checkbox"
                      checked={autoPlayAudio}
                      onChange={onToggleAutoPlayAudio}
                      className="w-4 h-4 accent-[#4A6B53] rounded cursor-pointer"
                    />
                  </label>

                  {/* Playback speed */}
                  <div className="pt-2">
                    <div className="text-[11px] text-[#5A5A40] mb-1.5">Audio Playback Speed</div>
                    <div className="grid grid-cols-3 gap-1">
                      {[0.75, 1.0, 1.25].map((spd) => (
                        <button
                          key={spd}
                          onClick={() => onChangePlaybackSpeed(spd)}
                          className={`py-1 rounded text-xs font-mono transition-colors ${
                            playbackSpeed === spd
                              ? 'bg-[#4A6B53] text-[#FAF9F5] font-bold'
                              : 'bg-[#EBEBE0] text-[#3D3D30] hover:bg-[#E2E2D5]'
                          }`}
                        >
                          {spd}x
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Free Diagnostic Test & Roadmap Button */}
          {onOpenPathwayModal && (
            <button
              type="button"
              id="nav-pathway-btn"
              onClick={onOpenPathwayModal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#E9F0EA] hover:bg-[#DCE7DD] border border-[#C5DAC8] text-[#2D5438] font-bold text-xs sm:text-sm shadow-2xs transition-all active:scale-98 cursor-pointer"
              title="View 5-Minute AI Assessment & Free Diagnostic Test"
            >
              <Sparkles className="w-4 h-4 text-[#4A6B53]" />
              <span className="hidden md:inline">Free Assessment</span>
              <span className="md:hidden">Test</span>
            </button>
          )}

          {/* 10 Free Study Kits / Lead Magnets Button */}
          {onOpenLeadMagnets && (
            <button
              type="button"
              id="nav-lead-magnets-btn"
              onClick={() => onOpenLeadMagnets('top-100-words')}
              className="hidden lg:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EFEA] border border-[#DCDCCF] text-[#2C2C24] font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Claim 10 Free Study Products (100 Words, Cheat Sheet, 90-Day Roadmap)"
            >
              <Gift className="w-4 h-4 text-[#C85A32]" />
              <span>10 Free Kits</span>
            </button>
          )}

          {/* Assisted Pronunciation Speaker Button */}
          {onOpenAssistedSpeaker && (
            <button
              type="button"
              id="nav-assisted-speaker-btn"
              onClick={() => onOpenAssistedSpeaker()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EFEA] border border-[#DCDCCF] text-[#2C2C24] font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Assisted Native Pronunciation Speaker & Syllable Coach"
            >
              <Headphones className="w-4 h-4 text-[#4A6B53]" />
              <span className="hidden xl:inline">Assisted Speaker</span>
              <span className="xl:hidden">Speaker</span>
            </button>
          )}

          {/* Vocabulary Bank Button */}
          <button
            id="vocab-bank-btn"
            onClick={onOpenVocabBank}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F0EFEA] border border-[#DCDCCF] text-[#2C2C24] font-medium text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            <BookMarked className="w-4 h-4 text-[#4A6B53]" />
            <span className="hidden lg:inline">Saved Words</span>
            {savedWordsCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#4A6B53] text-white text-[11px] font-mono font-bold">
                {savedWordsCount}
              </span>
            )}
          </button>

          {/* Domain & Hosting Setup Button */}
          {onOpenDomainModal && (
            <button
              type="button"
              id="nav-domain-btn"
              onClick={onOpenDomainModal}
              className="hidden md:flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#E9F0EA] hover:bg-[#DCE7DD] border border-[#C5DAC8] text-[#2D5438] font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Domain & Hosting Setup: talktoworld.co.in (DNS, Cloud Run, SSL)"
            >
              <Globe2 className="w-4 h-4 text-[#4A6B53]" />
              <span className="font-mono text-xs">talktoworld.co.in</span>
            </button>
          )}

          {/* User Sign-In / Account Profile */}
          {user?.isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                id="user-profile-menu-btn"
                onClick={() => {
                  setUserMenuOpen(!userMenuOpen);
                  setLangDropdownOpen(false);
                  setLevelDropdownOpen(false);
                  setAudioMenuOpen(false);
                }}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-white border border-[#DCDCCF] hover:border-[#4A6B53] shadow-2xs transition-all cursor-pointer"
                title={`${user.name} (${user.email || user.phoneNumber})`}
              >
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#C5DAC8]"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-[#4A6B53] text-white font-bold text-xs flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden xl:inline text-xs font-semibold text-[#2C2C24] max-w-[90px] truncate">
                  {user.name}
                </span>
                <ChevronDown className="w-3 h-3 text-[#5A5A40]" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#DCDCCF] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-3">
                    {/* User Card */}
                    <div className="flex items-start gap-3 pb-3 border-b border-[#EBEBE0]">
                      {user.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#C5DAC8]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#4A6B53] text-white font-bold text-sm flex items-center justify-center">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-[#2C2C24] truncate">{user.name}</div>
                        <div className="text-[11px] text-[#5A5A40] truncate">
                          {user.email || user.phoneNumber}
                        </div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E9F0EA] text-[#2D5438] border border-[#C5DAC8] inline-flex items-center gap-1">
                            {user.provider === 'google' ? (
                              <>
                                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24">
                                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                                </svg>
                                <span>Google</span>
                              </>
                            ) : user.provider === 'phone' ? (
                              <>
                                <Smartphone className="w-2.5 h-2.5" />
                                <span>Mobile OTP</span>
                              </>
                            ) : (
                              <>
                                <Mail className="w-2.5 h-2.5" />
                                <span>Email</span>
                              </>
                            )}
                          </span>

                          {enrollment.isEnrolled ? (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FDF6EE] text-[#8C521C] border border-[#F3DFC8]">
                              PRO Pass
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-medium bg-[#FAF9F5] text-[#5A5A40] border border-[#DCDCCF]">
                              Free Tier
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Summary Mini-Widget */}
                    <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] grid grid-cols-3 text-center">
                      <div>
                        <div className="text-[10px] text-[#5A5A40]">Streak</div>
                        <div className="text-xs font-bold text-[#9E5D24]">{userStats.streakDays}d 🔥</div>
                      </div>
                      <div className="border-x border-[#E3E3D8]">
                        <div className="text-[10px] text-[#5A5A40]">Words</div>
                        <div className="text-xs font-bold text-[#2D5438]">{userStats.wordsLearned}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#5A5A40]">Practices</div>
                        <div className="text-xs font-bold text-[#2C2C24]">{userStats.conversationsCompleted}</div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="space-y-1 pt-1">
                      {onOpenDomainModal && (
                        <button
                          type="button"
                          onClick={() => {
                            setUserMenuOpen(false);
                            onOpenDomainModal();
                          }}
                          className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#FAF9F5] text-xs font-medium text-[#2C2C24] flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Globe2 className="w-3.5 h-3.5 text-[#4A6B53]" />
                            <span>Domain: talktoworld.co.in</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#2D5438] bg-[#E9F0EA] px-1.5 py-0.5 rounded border border-[#C5DAC8]">
                            DNS / Setup
                          </span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onOpenAuthModal('google');
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#FAF9F5] text-xs font-medium text-[#2C2C24] flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>Switch Account</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-[#8A8A7A]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setUserMenuOpen(false);
                          onSignOut();
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#FDF0ED] text-xs font-medium text-[#9E2A2B] flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              id="nav-signin-btn"
              onClick={() => onOpenAuthModal('google')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] active:bg-[#344C3A] text-white text-xs font-bold shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Sign in with Google, Email, or Mobile number"
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

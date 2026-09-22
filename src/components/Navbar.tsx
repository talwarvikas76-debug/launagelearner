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
  Headphones,
  Gift,
  Compass,
  Zap,
  Smartphone,
  Mail
} from 'lucide-react';
import { LanguageConfig, CEFRLevel, UserStats, DailyGoal, CourseEnrollment, UserProfile, UserGoalId } from '../types';
import { SUPPORTED_LANGUAGES, CEFR_LEVELS } from '../data/languages';
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
  onOpenDomainModal,
}) => {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const goalProgress = calculateGoalProgress(dailyGoal);

  const scrollToScenarios = () => {
    onLogoClick(); // if in conversation, exit to main selector
    setTimeout(() => {
      const el = document.getElementById('scenarios-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F6F7F2]/95 backdrop-blur-md border-b border-[#E8E8DF] text-[#1F2421] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            id="nav-logo-btn"
            onClick={onLogoClick}
            className="flex items-center gap-2.5 text-left group transition-transform active:scale-98 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#2F523A] flex items-center justify-center text-white shadow-2xs group-hover:bg-[#23422C] transition-all">
              <Sparkles className="w-4 h-4 text-[#D8EADB]" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-[#1F2421]">
              TalkToWorld
            </span>
          </button>
        </div>

        {/* Center Links (Matching Screenshot: Previews, About, Pricing, Speaking, Contact) */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[#555546]">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('voice-preview-widget');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else scrollToScenarios();
            }}
            className="hover:text-[#1F2421] transition-colors cursor-pointer"
          >
            Previews
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('learning-pathway-funnel');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="hover:text-[#1F2421] transition-colors cursor-pointer"
          >
            About
          </button>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('pricing-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else onOpenPaymentModal('TalkToWorld Lifetime Pass');
            }}
            className="hover:text-[#1F2421] transition-colors cursor-pointer"
          >
            Pricing
          </button>

          <button
            type="button"
            onClick={scrollToScenarios}
            className="hover:text-[#1F2421] transition-colors cursor-pointer font-semibold text-[#2F523A]"
          >
            Speaking
          </button>

          <button
            type="button"
            onClick={() => onOpenPaymentModal('TalkToWorld Support & Coaching')}
            className="hover:text-[#1F2421] transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right Side: Language Switcher & Profile/Streak/Level Pill */}
        <div className="flex items-center gap-3">
          
          {/* Target Language Dropdown Selector */}
          <div className="relative">
            <button
              id="language-select-btn"
              onClick={() => {
                setLangDropdownOpen(!langDropdownOpen);
                setProfileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white hover:bg-[#F4F4EE] border border-[#DCDCCF] hover:border-[#B8B8A8] text-xs font-semibold text-[#1F2421] shadow-2xs transition-all cursor-pointer"
              title="Change practice language"
            >
              <span className="text-base leading-none">{currentLanguage.flag}</span>
              <span className="font-bold hidden sm:inline">{currentLanguage.name}</span>
              <ChevronDown className="w-3 h-3 text-[#7A7A68]" />
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#DCDCCF] shadow-xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[#7A7A68] border-b border-[#F0EFEB] mb-1 flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-[#2F523A]" />
                    Select Language
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-0.5 scrollbar-thin">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = lang.id === currentLanguage.id;
                      return (
                        <button
                          key={lang.id}
                          onClick={() => {
                            onSelectLanguage(lang);
                            setLangDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                            isSelected
                              ? 'bg-[#E9F0EA] text-[#2F523A] font-bold border border-[#C5DAC8]'
                              : 'text-[#1F2421] hover:bg-[#F5F5F0]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg leading-none">{lang.flag}</span>
                            <div>
                              <div className="font-bold leading-tight">{lang.name}</div>
                              <div className="text-[10px] text-[#7A7A68]">{lang.nativeName}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#2F523A]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Consolidated User Profile, Streak & Level Pill (Matching Screenshot: [Avatar] | 4d 🔥 | A2 Elementary | English) */}
          <div className="relative">
            <button
              type="button"
              id="nav-profile-streak-btn"
              onClick={() => {
                setProfileMenuOpen(!profileMenuOpen);
                setLangDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F5F5F0] border border-[#DCDCCF] hover:border-[#B8B8A8] shadow-2xs transition-all cursor-pointer text-xs font-medium text-[#1F2421]"
              title="View profile, streak, and level details"
            >
              {/* User Avatar */}
              <img
                src={user?.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt="User"
                className="w-6 h-6 rounded-full object-cover border border-[#C5DAC8]"
              />

              {/* Streak */}
              <div className="flex items-center gap-1 font-bold text-[#A66324]">
                <span className="text-[#C28E58]">|</span>
                <span>{userStats.streakDays || 4}d</span>
                <span className="text-sm leading-none">🔥</span>
              </div>

              {/* CEFR Level & Target Language */}
              <div className="hidden sm:flex items-center gap-1 text-[#555546] font-semibold text-[11px]">
                <span className="text-[#DCDCCF]">|</span>
                <span>{currentLevel === 'A1' ? 'A1 Beginner' : currentLevel === 'A2' ? 'A2 Elementary' : currentLevel === 'B1' ? 'B1 Intermediate' : currentLevel === 'B2' ? 'B2 Upper-Int' : 'C1 Advanced'}</span>
                <span className="text-[#DCDCCF]">|</span>
                <span className="text-[#1F2421] font-bold">{currentLanguage.name}</span>
              </div>

              <ChevronDown className="w-3 h-3 text-[#7A7A68]" />
            </button>

            {/* Consolidated Dropdown Panel */}
            {profileMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setProfileMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-[#DCDCCF] shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-3.5">
                  
                  {/* User Profile Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#F0EFEB]">
                    <div className="flex items-center gap-2.5">
                      {user?.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#C5DAC8]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#2D5438] text-white font-bold text-sm flex items-center justify-center">
                          {user?.isLoggedIn && user.name ? user.name.charAt(0).toUpperCase() : <User className="w-5 h-5 text-white" />}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#1F2421] truncate">
                          {user?.isLoggedIn ? user.name : 'Guest Learner'}
                        </div>
                        <div className="text-[11px] text-[#6B705C] truncate">
                          {user?.isLoggedIn ? (user.email || user.phoneNumber) : 'Session saved in browser'}
                        </div>
                      </div>
                    </div>

                    {!user?.isLoggedIn ? (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          onOpenAuthModal('google');
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#2D5438] hover:bg-[#23422C] text-white text-[11px] font-bold cursor-pointer"
                      >
                        Sign In
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          onSignOut();
                        }}
                        className="p-1.5 rounded-lg text-[#9B3838] hover:bg-[#FDF0ED] cursor-pointer"
                        title="Sign Out"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Daily Goal & Streak Metrics Card */}
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E8DF] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#2C2C24]">
                        <Target className="w-3.5 h-3.5 text-[#2D5438]" />
                        <span>Daily Practice Goal</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          onOpenGoalModal();
                        }}
                        className="text-[11px] text-[#2D5438] hover:underline font-bold cursor-pointer"
                      >
                        Edit Goal
                      </button>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-[#5A5A40]">
                        <span>{goalProgress.current} / {goalProgress.target} {goalProgress.unit}</span>
                        <span className="font-bold text-[#2D5438] font-mono">{goalProgress.percentage}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#E5E5DA] overflow-hidden">
                        <div 
                          className="h-full bg-[#2D5438] rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, goalProgress.percentage)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-center">
                      <div className="p-2 rounded-lg bg-white border border-[#EBEBE0]">
                        <div className="text-[10px] text-[#7A7A68]">Current Streak</div>
                        <div className="text-xs font-bold text-[#A66324] mt-0.5 flex items-center justify-center gap-1">
                          <Flame className="w-3 h-3 text-[#C28E58] fill-[#C28E58]" />
                          <span>{userStats.streakDays} Days</span>
                        </div>
                      </div>
                      <div className="p-2 rounded-lg bg-white border border-[#EBEBE0]">
                        <div className="text-[10px] text-[#7A7A68]">Completed</div>
                        <div className="text-xs font-bold text-[#1F2421] mt-0.5">
                          {userStats.conversationsCompleted} Sessions
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vocabulary Bank Quick Access */}
                  <button
                    type="button"
                    onClick={() => {
                      setProfileMenuOpen(false);
                      onOpenVocabBank();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white hover:bg-[#F5F5F0] border border-[#DCDCCF] text-xs font-semibold text-[#2C2C24] transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-[#2D5438]" />
                      <span>Vocabulary Bank</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#2D5438] text-white text-[10px] font-mono font-bold">
                      {savedWordsCount} words
                    </span>
                  </button>

                  {/* Audio & Speech Controls */}
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E8E8DF] space-y-2">
                    <div className="text-[11px] font-bold text-[#5A5A40] flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-[#2D5438]" />
                      <span>Audio &amp; Voice Settings</span>
                    </div>

                    <label className="flex items-center justify-between py-1 cursor-pointer">
                      <span className="text-xs text-[#2C2C24]">Auto-play AI Voice</span>
                      <input
                        type="checkbox"
                        checked={autoPlayAudio}
                        onChange={onToggleAutoPlayAudio}
                        className="w-4 h-4 accent-[#2D5438] rounded cursor-pointer"
                      />
                    </label>

                    <div className="pt-1">
                      <div className="text-[10px] text-[#7A7A68] mb-1">Playback Speed</div>
                      <div className="grid grid-cols-3 gap-1">
                        {[0.75, 1.0, 1.25].map((spd) => (
                          <button
                            key={spd}
                            onClick={() => onChangePlaybackSpeed(spd)}
                            className={`py-1 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer ${
                              playbackSpeed === spd
                                ? 'bg-[#2D5438] text-white'
                                : 'bg-white text-[#5A5A40] border border-[#DCDCCF] hover:bg-[#EBEBE0]'
                            }`}
                          >
                            {spd}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Tools Links */}
                  <div className="space-y-1 pt-1 text-xs">
                    {onOpenPathwayModal && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          onOpenPathwayModal();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F5F5F0] text-[#2C2C24] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#2D5438]" />
                          <span>CEFR 5-Min Diagnostic Test</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#2D5438]">Free</span>
                      </button>
                    )}

                    {onOpenAssistedSpeaker && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          onOpenAssistedSpeaker();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F5F5F0] text-[#2C2C24] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Headphones className="w-3.5 h-3.5 text-[#2D5438]" />
                          <span>Assisted Pronunciation Speaker</span>
                        </div>
                      </button>
                    )}

                    {onOpenLeadMagnets && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          onOpenLeadMagnets('top-100-words');
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F5F5F0] text-[#2C2C24] flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <Gift className="w-3.5 h-3.5 text-[#C85A32]" />
                          <span>10 Free Study Kits</span>
                        </div>
                        <span className="text-[10px] font-bold text-[#C85A32]">Download</span>
                      </button>
                    )}

                    {onOpenDomainModal && (
                      <button
                        type="button"
                        onClick={() => {
                          setProfileMenuOpen(false);
                          onOpenDomainModal();
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F5F5F0] text-[#7A7A68] flex items-center justify-between cursor-pointer text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <Globe2 className="w-3.5 h-3.5" />
                          <span>talktoworld.co.in</span>
                        </div>
                        <span className="text-[10px] text-[#2D5438] font-mono">Live</span>
                      </button>
                    )}
                  </div>

                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

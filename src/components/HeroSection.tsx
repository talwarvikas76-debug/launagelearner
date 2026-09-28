import React, { useState } from 'react';
import { 
  ArrowRight, 
  Mic, 
  Volume2, 
  Users, 
  Sparkles, 
  Globe2,
  CheckCircle2,
  Compass,
  Briefcase,
  GraduationCap,
  Plane,
  HeartHandshake,
  Award
} from 'lucide-react';
import { LanguageConfig, Scenario, CourseEnrollment, UserGoalId } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { speakText } from '../utils/audio';

interface HeroSectionProps {
  language: LanguageConfig;
  starterScenario?: Scenario;
  onStartFreeTrial: () => void;
  onOpenDiagnosticTest: () => void;
  enrollment: CourseEnrollment;
  onSelectLanguage?: (lang: LanguageConfig) => void;
  selectedGoalId?: UserGoalId;
  onOpenGoalSelectionModal?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  starterScenario,
  onStartFreeTrial,
  onOpenDiagnosticTest,
  onSelectLanguage,
  selectedGoalId = 'speaking',
  onOpenGoalSelectionModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const partnerName = starterScenario?.partnerName || 'Lucas';
  const partnerRole = starterScenario?.partnerRole || 'Café Barista';
  const partnerAvatar = 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80';

  const sampleDialoguePrompt = language.id === 'es'
    ? '¡Hola! ¿Qué te preparo hoy?'
    : language.id === 'fr'
    ? 'Bonjour ! Que puis-je vous servir aujourd’hui ?'
    : language.id === 'de'
    ? 'Hallo! Was darf ich dir heute bringen?'
    : language.id === 'it'
    ? 'Ciao! Cosa posso prepararti oggi?'
    : language.id === 'ja'
    ? 'いらっしゃいませ！本日は何にされますか？'
    : language.id === 'ko'
    ? '안녕하세요! 무엇을 주문하시겠어요?'
    : language.id === 'zh'
    ? '您好！今天想喝点什么？'
    : language.id === 'pt'
    ? 'Olá! O que gostaria de pedir hoje?'
    : language.id === 'ru'
    ? 'Здравствуйте! Что вам приготовить сегодня?'
    : language.id === 'ar'
    ? 'أهلاً بك! ماذا تحب أن تطلب اليوم؟'
    : language.id === 'hi'
    ? 'नमस्ते! आज आप क्या लेना पसंद करेंगे?'
    : 'Welcome! What can I get started for you today?';

  const handlePlayVoice = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    speakText({
      text: sampleDialoguePrompt,
      langCode: language.speechCode,
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const PRIMARY_GOALS: { id: UserGoalId; title: string; emoji: string }[] = [
    { id: 'study_abroad', title: 'Study Abroad', emoji: '🎓' },
    { id: 'job', title: 'Job & Career', emoji: '💼' },
    { id: 'travel', title: 'Travel & Relocation', emoji: '✈️' },
    { id: 'immigration', title: 'Visa & Immigration', emoji: '🛂' },
    { id: 'speaking', title: 'Spoken Fluency', emoji: '🗣️' },
    { id: 'personal', title: 'Personal Interest', emoji: '🌟' },
  ];

  return (
    <section className="relative w-full pt-8 pb-12 sm:pt-12 sm:pb-16 bg-[#F6F7F2] border-b border-[#E8E8DF]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean Typography, Language Switcher & Direct Action */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Top Brand Pill & Live AI Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#2D5438]" />
                <span>Next-Gen Spoken AI Partner</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#E3E3D8] text-xs font-medium text-[#5A5A40]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Real-Time Voice • Zero Judgment</span>
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#1F2421] leading-[1.12]">
              Speak <span className="text-[#2F523A] underline decoration-[#C5DAC8] underline-offset-6">{language.name} {language.flag}</span> Confidently from Day One.
            </h1>

            {/* Subheadline */}
            <p className="text-[#555546] text-base sm:text-lg sm:leading-relaxed max-w-xl font-normal">
              Spontaneous, natural voice conversations with adaptive AI partners. Instant pronunciation coach, turn-by-turn grammar feedback, and certified CEFR progression.
            </p>

            {/* Fast 11-Language Picker Bar */}
            <div className="pt-1">
              <div className="text-[11px] font-bold text-[#7A7A68] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#2F523A]" />
                <span>Choose your target language (11 Available):</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = lang.id === language.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => onSelectLanguage && onSelectLanguage(lang)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#2F523A] text-white shadow-2xs ring-2 ring-[#2F523A]/30'
                          : 'bg-white hover:bg-[#F0EFEB] text-[#1F2421] border border-[#E3E3D8]'
                      }`}
                    >
                      <span className="text-sm leading-none">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6 Primary Goals Quick Chips */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-[#7A7A68] uppercase tracking-wider mb-1.5">
                <span>Select Your Speaking Goal:</span>
                {onOpenGoalSelectionModal && (
                  <button
                    type="button"
                    onClick={onOpenGoalSelectionModal}
                    className="text-[#2F523A] hover:underline normal-case font-semibold cursor-pointer"
                  >
                    View Goal Roadmap →
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRIMARY_GOALS.map((goal) => {
                  const isSelected = selectedGoalId === goal.id;
                  return (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={onOpenGoalSelectionModal}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] font-bold'
                          : 'bg-white hover:bg-[#F5F5F0] border border-[#E3E3D8] text-[#555546]'
                      }`}
                    >
                      <span>{goal.emoji}</span>
                      <span>{goal.title}</span>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-[#2D5438]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                id="hero-start-speaking-btn"
                onClick={onStartFreeTrial}
                className="px-7 py-3.5 rounded-xl bg-[#2F523A] hover:bg-[#25422E] text-white font-bold text-base transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer flex items-center gap-2 group"
              >
                <span>Start Speaking Now (Free Trial)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                type="button"
                id="hero-diagnostic-link"
                onClick={onOpenDiagnosticTest}
                className="text-xs sm:text-sm font-semibold text-[#555546] hover:text-[#2F523A] transition-colors inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4 decoration-[#DCDCCF] hover:decoration-[#2F523A]"
              >
                <span>Take 5-Min Diagnostic Level Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Realistic iPhone Mockup with Floating Hints & Live Sound Wave */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[330px] sm:max-w-[360px]">
              
              {/* Floating Tooltip Pill: Pronunciation (Left) */}
              <div className="absolute top-[28%] -left-6 sm:-left-10 z-30 bg-white border border-[#E8E8DF] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-2xl px-3.5 py-2 text-left animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="text-[10px] text-[#7A7A68] font-medium leading-none mb-1">
                  Pronunciation:
                </div>
                <div className="text-xs font-extrabold text-[#2F523A] leading-none flex items-center gap-1">
                  <span>94% Acoustic Match!</span>
                </div>
              </div>

              {/* Floating Tooltip Pill: Grammar Hint (Top Right) */}
              <div className="absolute top-[14%] -right-4 sm:-right-8 z-30 bg-white border border-[#E8E8DF] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-2xl px-3.5 py-2 text-left max-w-[200px] animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-[10px] text-[#7A7A68] font-medium leading-none mb-0.5">
                  Instant Feedback:
                </div>
                <div className="text-xs font-bold text-[#1F2421] leading-tight">
                  Natural sentence flow ✓
                </div>
              </div>

              {/* Smartphone Frame (Sleek Curvilinear Shell) */}
              <div className="relative rounded-[44px] p-3 bg-gradient-to-b from-[#333533] via-[#1F201F] to-[#141514] shadow-[0_25px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/30 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                
                {/* Outer Edge Accent Highlight */}
                <div className="absolute inset-0 rounded-[44px] ring-1 ring-white/20 pointer-events-none" />

                {/* Inner Screen Canvas */}
                <div className="relative rounded-[36px] overflow-hidden bg-white text-[#1F2421] px-5 pt-3 pb-7 min-h-[470px] flex flex-col justify-between shadow-inner">
                  
                  {/* Phone Status Bar & Dynamic Island */}
                  <div className="relative w-full flex items-center justify-between pt-1 pb-3">
                    <span className="text-xs font-semibold text-[#1F2421] pl-2 font-mono">
                      9:41
                    </span>

                    <div className="absolute left-1/2 -translate-x-1/2 top-1 w-22 h-4.5 bg-[#141514] rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#1F2421] mr-2.5" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2F523A]/80" />
                    </div>

                    <div className="flex items-center gap-1 pr-2">
                      <div className="w-3.5 h-2 rounded-xs border border-[#1F2421] relative flex items-center p-0.5">
                        <div className="w-2 h-full bg-[#1F2421]" />
                      </div>
                    </div>
                  </div>

                  {/* Partner Portrait & Identity */}
                  <div className="flex flex-col items-center pt-2 pb-1 space-y-2">
                    <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gray-100 shadow-md">
                      <img
                        src={partnerAvatar}
                        alt={partnerName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="text-center pt-0.5">
                      <h3 className="text-base font-extrabold text-[#1F2421] leading-tight">
                        {partnerName}
                      </h3>
                      <p className="text-xs text-[#7A7A68] font-medium mt-0.5">
                        {partnerRole} • {language.name}
                      </p>
                    </div>

                    {/* Dialogue Bubble */}
                    <div className="w-full bg-[#F4F5F0] rounded-2xl p-3 text-xs text-[#2C2C24] font-medium text-center border border-[#E3E3D8]">
                      &ldquo;{sampleDialoguePrompt}&rdquo;
                    </div>

                    {/* Green Audio Waveform */}
                    <div 
                      onClick={() => handlePlayVoice()}
                      className="flex items-center justify-center gap-1 h-9 w-full px-4 py-1.5 cursor-pointer hover:opacity-85 transition-opacity"
                      title="Click to hear native speech"
                    >
                      {[25, 45, 70, 95, 60, 85, 100, 75, 90, 50, 65, 40, 80, 55, 30].map((height, i) => (
                        <div
                          key={i}
                          className="w-[2.5px] rounded-full bg-[#2F523A] transition-all duration-300"
                          style={{
                            height: isPlayingAudio 
                              ? `${Math.max(20, Math.sin(i * 0.8 + Date.now() / 150) * 80 + 20)}%`
                              : `${height * 0.5}%`,
                            opacity: isPlayingAudio ? 1 : 0.8
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Controls */}
                  <div className="flex items-center justify-center gap-5 pt-2 pb-1">
                    <button
                      type="button"
                      onClick={() => handlePlayVoice()}
                      className="w-11 h-11 rounded-full bg-[#F5F5F0] hover:bg-[#EBEBE3] text-[#555546] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                      title="Play sample partner audio"
                    >
                      {isPlayingAudio ? (
                        <Volume2 className="w-5 h-5 text-[#2F523A] animate-pulse" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-[#555546]" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={onStartFreeTrial}
                      className="w-13 h-13 rounded-full bg-[#2F523A] hover:bg-[#25422E] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer group"
                      title="Start voice interaction"
                    >
                      <Mic className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>

                    <button
                      type="button"
                      onClick={onOpenDiagnosticTest}
                      className="w-11 h-11 rounded-full bg-[#F5F5F0] hover:bg-[#EBEBE3] text-[#555546] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                      title="View CEFR diagnostic test"
                    >
                      <Users className="w-5 h-5 text-[#555546]" />
                    </button>
                  </div>

                  {/* Home Bar Indicator */}
                  <div className="w-28 h-1 bg-[#1F2421]/20 rounded-full mx-auto mt-1" />

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Mic, 
  Volume2, 
  Users,
  Sparkles,
  Play
} from 'lucide-react';
import { LanguageConfig, Scenario, CourseEnrollment } from '../types';
import { speakText } from '../utils/audio';

interface HeroSectionProps {
  language: LanguageConfig;
  starterScenario?: Scenario;
  onStartFreeTrial: () => void;
  onOpenDiagnosticTest: () => void;
  enrollment: CourseEnrollment;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  starterScenario,
  onStartFreeTrial,
  onOpenDiagnosticTest,
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

  return (
    <section className="relative w-full pt-8 pb-14 sm:pt-14 sm:pb-20 bg-[#F6F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Clean Typography & Direct Action */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#1F2421] leading-[1.12]">
              Speak {language.name} Confidently<br className="hidden sm:inline" /> from Day One.
            </h1>

            {/* Subheadline */}
            <p className="text-[#555546] text-base sm:text-lg sm:leading-relaxed max-w-xl font-normal">
              Practice spontaneous conversations with your personal AI language partner — real-time voice coaching, zero judgment.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                id="hero-start-speaking-btn"
                onClick={onStartFreeTrial}
                className="px-8 py-3.5 rounded-xl bg-[#2F523A] hover:bg-[#25422E] text-white font-bold text-base transition-all shadow-xs hover:shadow-md active:scale-98 cursor-pointer flex items-center gap-2"
              >
                <span>Start Speaking Now (Free Trial)</span>
              </button>

              <button
                type="button"
                id="hero-diagnostic-link"
                onClick={onOpenDiagnosticTest}
                className="text-xs sm:text-sm font-semibold text-[#555546] hover:text-[#2F523A] transition-colors inline-flex items-center gap-1.5 cursor-pointer underline underline-offset-4 decoration-[#DCDCCF] hover:decoration-[#2F523A]"
              >
                <span>Or take the 2-min level check</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Right Column: Realistic iPhone Mockup with Floating Hints */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[370px]">
              
              {/* Floating Tooltip Pill: Pronunciation (Left) */}
              <div className="absolute top-[28%] -left-6 sm:-left-12 z-30 bg-white border border-[#E8E8DF] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-2xl px-4 py-2.5 text-left animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="text-[11px] text-[#7A7A68] font-medium leading-none mb-1">
                  Pronunciation:
                </div>
                <div className="text-xs font-extrabold text-[#2F523A] leading-none flex items-center gap-1">
                  <span>94% Natural!</span>
                </div>
              </div>

              {/* Floating Tooltip Pill: Grammar Hint 1 (Top Right) */}
              <div className="absolute top-[15%] -right-4 sm:-right-8 z-30 bg-white border border-[#E8E8DF] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-2xl px-4 py-2.5 text-left max-w-[210px] animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="text-[11px] text-[#7A7A68] font-medium leading-none mb-1">
                  Grammar hint:
                </div>
                <div className="text-xs font-bold text-[#1F2421] leading-tight">
                  Use &ldquo;look forward to + ing&rdquo;
                </div>
              </div>

              {/* Floating Tooltip Pill: Grammar Hint 2 (Bottom Right) */}
              <div className="absolute bottom-[28%] -right-4 sm:-right-10 z-30 bg-white border border-[#E8E8DF] shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-2xl px-4 py-2.5 text-left max-w-[210px] animate-in fade-in slide-in-from-right-4 duration-700">
                <div className="text-[11px] text-[#7A7A68] font-medium leading-none mb-1">
                  Grammar hint:
                </div>
                <div className="text-xs font-bold text-[#1F2421] leading-tight">
                  Use &ldquo;look forward to + ing&rdquo;
                </div>
              </div>

              {/* Smartphone Frame (Sleek Curvilinear Shell with Subtle Angle) */}
              <div className="relative rounded-[46px] p-3 bg-gradient-to-b from-[#333533] via-[#1F201F] to-[#141514] shadow-[0_25px_60px_rgba(0,0,0,0.18)] ring-1 ring-black/30 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                
                {/* Outer Edge Accent Highlight */}
                <div className="absolute inset-0 rounded-[46px] ring-1 ring-white/20 pointer-events-none" />

                {/* Inner Screen Canvas */}
                <div className="relative rounded-[38px] overflow-hidden bg-white text-[#1F2421] px-6 pt-3 pb-8 min-h-[490px] flex flex-col justify-between shadow-inner">
                  
                  {/* Phone Status Bar & Dynamic Island */}
                  <div className="relative w-full flex items-center justify-between pt-1 pb-4">
                    {/* Time */}
                    <span className="text-xs font-semibold text-[#1F2421] pl-2 font-mono">
                      9:41
                    </span>

                    {/* Dynamic Island Pill */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-1 w-24 h-5 bg-[#141514] rounded-full flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1F2421] mr-3" />
                      <div className="w-2 h-2 rounded-full bg-[#2F523A]/80" />
                    </div>

                    {/* Battery & Signal Icons */}
                    <div className="flex items-center gap-1.5 pr-2">
                      <div className="w-3.5 h-2 rounded-xs border border-[#1F2421] relative flex items-center p-0.5">
                        <div className="w-2 h-full bg-[#1F2421]" />
                      </div>
                    </div>
                  </div>

                  {/* Partner Portrait & Identity */}
                  <div className="flex flex-col items-center pt-3 pb-1 space-y-2">
                    {/* Circular Avatar */}
                    <div className="relative w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden border-2 border-gray-100 shadow-md">
                      <img
                        src={partnerAvatar}
                        alt={partnerName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Name & Role */}
                    <div className="text-center pt-1">
                      <h3 className="text-lg font-extrabold text-[#1F2421] leading-tight">
                        {partnerName}
                      </h3>
                      <p className="text-xs text-[#7A7A68] font-medium mt-0.5">
                        {partnerRole}
                      </p>
                    </div>

                    {/* Green Audio Waveform */}
                    <div 
                      onClick={() => handlePlayVoice()}
                      className="flex items-center justify-center gap-1 h-10 w-full px-6 py-2 cursor-pointer hover:opacity-80 transition-opacity"
                      title="Click to hear speech"
                    >
                      {[25, 45, 70, 95, 60, 85, 100, 75, 90, 50, 65, 40, 80, 55, 30].map((height, i) => (
                        <div
                          key={i}
                          className="w-[2.5px] rounded-full bg-[#2F523A] transition-all duration-300"
                          style={{
                            height: isPlayingAudio 
                              ? `${Math.max(20, Math.sin(i * 0.8 + Date.now() / 150) * 80 + 20)}%`
                              : `${height * 0.55}%`,
                            opacity: isPlayingAudio ? 1 : 0.85
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Controls */}
                  <div className="flex items-center justify-center gap-6 pt-2 pb-1">
                    {/* Speaker / Audio Trigger Button */}
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

                    {/* Primary Green Microphone Button */}
                    <button
                      type="button"
                      onClick={onStartFreeTrial}
                      className="w-13 h-13 rounded-full bg-[#2F523A] hover:bg-[#25422E] text-white flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer group"
                      title="Start voice interaction"
                    >
                      <Mic className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Community / People Button */}
                    <button
                      type="button"
                      onClick={onOpenDiagnosticTest}
                      className="w-11 h-11 rounded-full bg-[#F5F5F0] hover:bg-[#EBEBE3] text-[#555546] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                      title="View CEFR diagnostic and peer learning"
                    >
                      <Users className="w-5 h-5 text-[#555546]" />
                    </button>
                  </div>

                  {/* Home Bar Indicator */}
                  <div className="w-28 h-1 bg-[#1F2421]/20 rounded-full mx-auto mt-2" />

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

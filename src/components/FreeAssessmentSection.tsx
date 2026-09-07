import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Clock,
  BookOpen,
  Headphones,
  FileText,
  Mic,
  Glasses,
  Flame,
  Download,
  Gift,
  ShieldCheck,
  TrendingUp,
  Volume2,
  VolumeX,
  RotateCcw,
  Layers,
  Check,
  HelpCircle
} from 'lucide-react';
import { LanguageConfig, CEFRLevel } from '../types';
import { getLanguageAssessmentProfile } from '../data/comprehensiveAssessment';
import { speakText } from '../utils/audio';

interface FreeAssessmentSectionProps {
  language: LanguageConfig;
  currentLevel: CEFRLevel;
  onStartAssessment: () => void;
  onOpenLeadMagnets: (productId?: string) => void;
  onOpenPaymentModal: () => void;
}

export const FreeAssessmentSection: React.FC<FreeAssessmentSectionProps> = ({
  language,
  currentLevel,
  onStartAssessment,
  onOpenLeadMagnets,
  onOpenPaymentModal,
}) => {
  // Sync profile dynamically with selected language and current level
  const profile = getLanguageAssessmentProfile(language.id, currentLevel);
  const sampleQ = profile.sampleDiagnosticQuestion;

  // Interactive Mini-Quiz state for instant landing page preview
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  // Reset interactive preview when selected language changes
  useEffect(() => {
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsPlayingAudio(false);
  }, [language.id, currentLevel]);

  const handleOptionClick = (idx: number) => {
    if (hasSubmitted) return;
    setSelectedOption(idx);
    setHasSubmitted(true);
  };

  const handlePlayAudio = () => {
    if (sampleQ.audioPrompt) {
      setIsPlayingAudio(true);
      speakText({
        text: sampleQ.audioPrompt,
        langCode: language.speechCode,
        onEnd: () => setIsPlayingAudio(false)
      });
    }
  };

  const handleResetSample = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedOption(null);
    setHasSubmitted(false);
  };

  return (
    <section className="relative w-full mb-8 overflow-hidden rounded-3xl bg-gradient-to-b from-[#F4F4EC] to-[#FAF9F5] border border-[#DCDCCF] p-6 sm:p-8 lg:p-10 shadow-sm">
      
      {/* Decorative ambient background blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E1EDE3] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#F5EBE1] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Top Badges & Highlights - Dynamically Synced */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-bold uppercase tracking-wider shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#4A6B53]" />
              <span>Certified {language.name} Diagnostic</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3E3D8] text-[11px] font-semibold text-[#5A5A40]">
              <span className="text-base">{language.flag}</span>
              <span>{language.nativeName}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#5A5A40]">
            <span className="flex items-center gap-1 bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#DCDCCF]">
              <Clock className="w-3.5 h-3.5 text-[#4A6B53]" /> 5-Min AI Test
            </span>
            <span className="flex items-center gap-1 bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#DCDCCF]">
              <Layers className="w-3.5 h-3.5 text-[#885B32]" /> {profile.categoryTier}
            </span>
            <span className="flex items-center gap-1 bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#DCDCCF]">
              <Award className="w-3.5 h-3.5 text-[#C85A32]" /> CEFR Standard
            </span>
          </div>
        </div>

        {/* Main Headline & Interactive Sample Question Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-8">
          
          {/* Left Column: Language Headline & Action Buttons */}
          <div className="lg:col-span-7 text-left space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#4A6B53] uppercase tracking-wider mb-2">
                <span>{profile.category}</span>
                <span>•</span>
                <span>Target: CEFR {profile.nextLevel}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2C2C24]">
                How good is your{' '}
                <span className="text-[#2D5438] underline decoration-[#A8CDB0] underline-offset-6 inline-flex items-center gap-2">
                  <span>{language.name}</span>
                  <span className="text-3xl sm:text-4xl">{language.flag}</span>
                </span>
                ?
              </h2>
            </div>
            
            <p className="text-[#5A5A40] text-base sm:text-lg leading-relaxed">
              Take our free 5-minute interactive AI assessment specifically calibrated for{' '}
              <strong className="text-[#2C2C24] font-bold">{language.name} ({language.nativeName})</strong>. We evaluate all{' '}
              <span className="font-bold text-[#2C2C24]">6 CEFR core skills</span>, diagnose your exact level, and build your customized weekly roadmap.
            </p>

            {/* Language-Specific Tested Features */}
            <div className="p-3.5 rounded-2xl bg-white/80 border border-[#E3E3D8] shadow-2xs space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B53]" />
                <span>Calibrated for {language.name} Nuances:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                {profile.linguisticHighlights.map((item, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-[#FAF9F5] border border-[#EBEBE0]">
                    <div className="font-bold text-[#2C2C24]">{item.title}</div>
                    <div className="text-[10px] text-[#7A7A60] leading-tight mt-0.5">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="start-assessment-top-cta"
                onClick={onStartAssessment}
                className="px-6 py-3.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-extrabold text-sm sm:text-base transition-all shadow-md active:scale-98 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#D1E7D6]" />
                <span>Start Full 5-Min Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="explore-kits-top-cta"
                onClick={() => onOpenLeadMagnets('top-100-words')}
                className="px-4 py-3.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#2C2C24] font-bold text-xs sm:text-sm border border-[#DCDCCF] transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
              >
                <Gift className="w-4 h-4 text-[#C85A32]" />
                <span>10 Free {language.name} Study Kits</span>
              </button>
            </div>
          </div>

          {/* Right Column: Live Interactive Quick Diagnostic Card for Chosen Language */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border-2 border-[#DCDCCF] shadow-md bg-white overflow-hidden transition-all">
              
              {/* Card Header with Audio button */}
              <div className="p-3.5 bg-[#FAF9F5] border-b border-[#E3E3D8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{language.flag}</span>
                  <div>
                    <div className="text-xs font-bold text-[#2C2C24]">Interactive Quick Diagnostic</div>
                    <div className="text-[10px] text-[#5A5A40]">1-Question Benchmark Preview</div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {sampleQ.audioPrompt && (
                    <button
                      type="button"
                      onClick={handlePlayAudio}
                      title="Listen to native audio prompt"
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isPlayingAudio
                          ? 'bg-[#2D5438] text-white animate-pulse'
                          : 'bg-[#E9F0EA] hover:bg-[#D8E6DB] text-[#2D5438] border border-[#C5DAC8]'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isPlayingAudio ? 'Playing...' : 'Audio'}</span>
                    </button>
                  )}

                  {hasSubmitted && (
                    <button
                      type="button"
                      onClick={handleResetSample}
                      title="Try another question"
                      className="p-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#5A5A40] border border-[#E3E3D8] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Question Body */}
              <div className="p-4 sm:p-5 space-y-3.5">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#4A6B53] font-bold">
                    Target Skill: Vocabulary &amp; Context
                  </span>
                  <div className="text-sm sm:text-base font-bold text-[#2C2C24] mt-1 leading-snug">
                    {sampleQ.question}
                  </div>
                  {sampleQ.translation && (
                    <div className="text-xs text-[#7A7A60] italic mt-1">
                      {sampleQ.translation}
                    </div>
                  )}
                </div>

                {/* Options list */}
                <div className="space-y-2 pt-1">
                  {sampleQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === sampleQ.correctAnswer;
                    
                    let btnStyle = 'border-[#E3E3D8] hover:border-[#4A6B53] bg-[#FAF9F5] hover:bg-white text-[#2C2C24]';
                    if (hasSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'border-[#4A6B53] bg-[#E9F0EA] text-[#2D5438] font-bold shadow-2xs';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'border-[#C85A32] bg-[#FDF6EE] text-[#C85A32]';
                      } else {
                        btnStyle = 'border-[#EBEBE0] bg-[#FAF9F5] text-[#8A8A7A] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleOptionClick(idx)}
                        disabled={hasSubmitted}
                        className={`w-full p-2.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {hasSubmitted && isCorrect && (
                          <Check className="w-4 h-4 text-[#4A6B53] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Banner upon selecting an answer */}
                {hasSubmitted && (
                  <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#DCDCCF] space-y-2 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${selectedOption === sampleQ.correctAnswer ? 'text-[#2D5438]' : 'text-[#C85A32]'}`}>
                        {selectedOption === sampleQ.correctAnswer ? 'Correct! Excellent linguistic precision.' : 'Good attempt! Review the nuance below:'}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#E9F0EA] text-[#2D5438] text-[10px] font-mono font-bold">
                        CEFR {currentLevel} Check
                      </span>
                    </div>

                    <p className="text-xs text-[#5A5A40] leading-relaxed">
                      {sampleQ.explanation}
                    </p>

                    <button
                      type="button"
                      onClick={onStartAssessment}
                      className="w-full py-2 px-3 rounded-lg bg-[#4A6B53] hover:bg-[#3E5A45] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#D1E7D6]" />
                      <span>Take Full 5-Min {language.name} Assessment</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Footer Banner */}
              <div className="p-3 bg-[#FAF9F5] flex items-center justify-between text-xs text-[#5A5A40] border-t border-[#E3E3D8]">
                <span className="flex items-center gap-1.5 font-semibold text-[#2D5438]">
                  <CheckCircle2 className="w-4 h-4 text-[#4A6B53]" />
                  6 Skills Benchmarked
                </span>
                <span className="font-mono text-[#7A7A60]">FSI {profile.fsiWeeks} Wk Syllabus</span>
              </div>

            </div>
          </div>
        </div>

        {/* 6 Core Skills Evaluated Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { name: 'Vocabulary', icon: <BookOpen className="w-4 h-4 text-[#4A6B53]" />, desc: 'Collocations & Core Lexicon' },
            { name: 'Grammar', icon: <FileText className="w-4 h-4 text-[#326B88]" />, desc: 'Tenses, Cases & Word Order' },
            { name: 'Reading', icon: <Glasses className="w-4 h-4 text-[#885B32]" />, desc: 'Context & Inference' },
            { name: 'Listening', icon: <Headphones className="w-4 h-4 text-[#6B4A88]" />, desc: 'Native Audio Dialogue' },
            { name: 'Writing', icon: <FileText className="w-4 h-4 text-[#2D5438]" />, desc: 'Sentence Construction' },
            { name: 'Speaking', icon: <Mic className="w-4 h-4 text-[#C85A32]" />, desc: 'Pronunciation & Cadence' }
          ].map((skill, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8] hover:border-[#A8CDB0] transition-all flex flex-col items-center text-center shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-[#F4F4EC] group-hover:bg-[#E9F0EA] flex items-center justify-center mb-2 transition-colors">
                {skill.icon}
              </div>
              <span className="text-xs font-bold text-[#2C2C24]">{skill.name}</span>
              <span className="text-[10px] text-[#7A7A60] leading-tight mt-0.5">{skill.desc}</span>
            </div>
          ))}
        </div>

        {/* What You Receive Output Projection - Dynamically Synced */}
        <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#DCDCCF] shadow-sm mb-8">
          <div className="text-xs font-bold text-[#7A7A60] uppercase tracking-wider mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#4A6B53]" />
              <span>Instant Output After Your 5-Minute {language.name} Test:</span>
            </div>
            <span className="text-[11px] font-mono text-[#2D5438] bg-[#E9F0EA] px-2 py-0.5 rounded border border-[#C5DAC8]">
              {language.name} • {profile.categoryTier}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box 1: Dynamic CEFR Level Diagnosis */}
            <div className="p-4 rounded-xl bg-[#F4F4EC] border border-[#E3E3D8] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#5A5A40]">1. Certified CEFR Diagnosis</span>
                <div className="text-2xl font-black text-[#2D5438] mt-1 flex items-baseline gap-2">
                  <span>Your current level:</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#2D5438] text-[#FAF9F5] text-lg font-mono">{currentLevel}</span>
                </div>
              </div>
              <p className="text-xs text-[#6A6A50] mt-2">
                Detailed radar breakdown across all 6 skills with benchmark percentiles for {language.name}.
              </p>
            </div>

            {/* Box 2: Target Hours Milestone */}
            <div className="p-4 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#885B32]">2. Target Milestone Projection</span>
                <div className="text-lg font-bold text-[#885B32] mt-1 leading-snug">
                  You need approximately <span className="font-extrabold text-[#C85A32] underline decoration-wavy underline-offset-2">{profile.estimatedHoursToNextLevel} hours</span> to reach {profile.nextLevel}.
                </div>
              </div>
              <p className="text-xs text-[#8A6A40] mt-2">
                Calibrated for {profile.category} at 15–20 minutes/day with interactive roleplays.
              </p>
            </div>

            {/* Box 3: Personalized Weekly Syllabus */}
            <div className="p-4 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#2D5438]">3. Personalized Weekly Syllabus</span>
                <div className="text-sm font-bold text-[#2C2C24] mt-1">
                  Week 1 Focus for {language.name}:
                </div>
                <ul className="text-xs text-[#3D3D30] space-y-1 mt-1 font-medium">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0" />
                    <span>50 high-frequency {language.name} words</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0" />
                    <span>{profile.linguisticHighlights[0]?.title || 'Grammar foundation'}</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0" />
                    <span>2 voice drills &amp; 1 listening test</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            id="start-free-assessment-hero-btn"
            onClick={onStartAssessment}
            className="px-6 py-3.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-extrabold text-sm sm:text-base transition-all shadow-md active:scale-98 flex items-center gap-2.5 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-[#D1E7D6]" />
            <span>Take Free 5-Minute {language.name} Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="explore-free-lead-magnets-btn"
            onClick={() => onOpenLeadMagnets('top-100-words')}
            className="px-5 py-3.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#2C2C24] font-bold text-sm sm:text-base border border-[#DCDCCF] transition-all active:scale-98 flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Gift className="w-4 h-4 text-[#C85A32]" />
            <span>Explore 10 Free {language.name} Study Kits</span>
          </button>

          <button
            onClick={() => onOpenLeadMagnets('top-100-words')}
            className="px-4 py-3.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#5A5A40] hover:text-[#2C2C24] font-semibold text-xs sm:text-sm border border-dashed border-[#DCDCCF] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#4A6B53]" />
            <span>Claim 100 Most Important Words Pack</span>
          </button>
        </div>

        {/* Lead Magnet Mini Banner List */}
        <div className="mt-8 pt-6 border-t border-[#E3E3D8] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-[#6A6A50]">
          <span className="text-[#2C2C24] font-bold">10 Free {language.name} Resources:</span>
          <button onClick={() => onOpenLeadMagnets('level-test')} className="hover:text-[#2D5438] cursor-pointer">1. Level Test</button>
          <span className="text-[#C5DAC8]">•</span>
          <button onClick={() => onOpenLeadMagnets('speaking-challenge')} className="hover:text-[#2D5438] cursor-pointer">2. 7-Day Speaking Challenge</button>
          <span className="text-[#C5DAC8]">•</span>
          <button onClick={() => onOpenLeadMagnets('top-100-words')} className="hover:text-[#2D5438] cursor-pointer">3. 100 Words Pack</button>
          <span className="text-[#C5DAC8]">•</span>
          <button onClick={() => onOpenLeadMagnets('learning-plan-30day')} className="hover:text-[#2D5438] cursor-pointer">4. 30-Day Plan</button>
          <span className="text-[#C5DAC8]">•</span>
          <button onClick={() => onOpenLeadMagnets('grammar-cheat-sheet')} className="hover:text-[#2D5438] cursor-pointer">6. Grammar Cheat Sheet</button>
          <span className="text-[#C5DAC8]">•</span>
          <button onClick={() => onOpenLeadMagnets('roadmap-90-days')} className="hover:text-[#2D5438] cursor-pointer">9. 90-Day Roadmap</button>
        </div>

      </div>
    </section>
  );
};

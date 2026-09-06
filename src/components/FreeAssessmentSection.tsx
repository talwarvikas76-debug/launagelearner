import React from 'react';
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
  TrendingUp
} from 'lucide-react';
import { LanguageConfig, CEFRLevel } from '../types';

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
  return (
    <section className="relative w-full mb-8 overflow-hidden rounded-3xl bg-linear-to-b from-[#F4F4EC] to-[#FAF9F5] border border-[#DCDCCF] p-6 sm:p-8 lg:p-10 shadow-sm">
      
      {/* Decorative ambient background blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E1EDE3] rounded-full blur-3xl opacity-60 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#F5EBE1] rounded-full blur-3xl opacity-50 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* Top Badges & Highlights */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-bold uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#4A6B53]" />
            <span>Free Certified Diagnostic</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#5A5A40]">
            <span className="flex items-center gap-1 bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#DCDCCF]">
              <Clock className="w-3.5 h-3.5 text-[#4A6B53]" /> 5-Minute Assessment
            </span>
            <span className="flex items-center gap-1 bg-[#FAF9F5] px-2.5 py-1 rounded-full border border-[#DCDCCF]">
              <Award className="w-3.5 h-3.5 text-[#C85A32]" /> CEFR A1–C2 Standard
            </span>
          </div>
        </div>

        {/* Main Headline & Hero Visual Presentation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-8">
          <div className="lg:col-span-7 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#2C2C24] mb-4">
              How good is your <span className="text-[#2D5438] underline decoration-[#A8CDB0] underline-offset-6">{language.name}</span>?
            </h2>
            
            <p className="text-[#5A5A40] text-base sm:text-lg leading-relaxed mb-6">
              Take our free 5-minute interactive AI assessment. We evaluate all <span className="font-bold text-[#2C2C24]">6 core language skills</span>, diagnose your exact CEFR level, and generate your customized weekly roadmap.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                id="start-assessment-top-cta"
                onClick={onStartAssessment}
                className="px-6 py-3.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-extrabold text-sm sm:text-base transition-all shadow-md active:scale-98 flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#D1E7D6]" />
                <span>Start Free Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="explore-kits-top-cta"
                onClick={() => onOpenLeadMagnets('top-100-words')}
                className="px-4 py-3 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#2C2C24] font-bold text-xs sm:text-sm border border-[#DCDCCF] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Gift className="w-4 h-4 text-[#C85A32]" />
                <span>10 Free Study Kits</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCDCCF] shadow-md bg-white group">
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#2D5438]">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=700&q=80"
                  alt="Language learners studying with AI Fluency Partner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                
                {/* Floating Flag & Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-[#2C2C24] shadow-xs">
                  <span className="text-sm">{language.flag}</span>
                  <span>{language.name} Diagnostic</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#2D5438]/90 text-[#FAF9F5] text-[10px] font-mono font-bold backdrop-blur-xs">
                  AI Live Testing
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-medium text-[#A8CDB0]">Real-Time Diagnostic</div>
                      <div className="text-sm font-extrabold text-white">Interactive Voice & Lexicon Test</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-white/80">Average Score</div>
                      <div className="text-sm font-mono font-bold text-white">A2 / B1</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF9F5] flex items-center justify-between text-xs text-[#5A5A40] border-t border-[#E3E3D8]">
                <span className="flex items-center gap-1.5 font-semibold text-[#2D5438]">
                  <CheckCircle2 className="w-4 h-4 text-[#4A6B53]" />
                  6 Skills Benchmarked
                </span>
                <span className="font-mono text-[#7A7A60]">Instant Download</span>
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
            { name: 'Speaking', icon: <Mic className="w-4 h-4 text-[#C85A32]" />, desc: 'Pronunciation & Fluency' }
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

        {/* What You Receive Preview Card (The High Conversion Box) */}
        <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#DCDCCF] shadow-sm mb-8">
          <div className="text-xs font-bold text-[#7A7A60] uppercase tracking-wider mb-4 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#4A6B53]" />
            <span>Instant Output After Your 5-Minute Test:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Box 1: Level */}
            <div className="p-4 rounded-xl bg-[#F4F4EC] border border-[#E3E3D8] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#5A5A40]">1. Certified CEFR Diagnosis</span>
                <div className="text-2xl font-black text-[#2D5438] mt-1 flex items-baseline gap-2">
                  <span>Your current level:</span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#2D5438] text-[#FAF9F5] text-lg font-mono">A2</span>
                </div>
              </div>
              <p className="text-xs text-[#6A6A50] mt-2">
                Detailed radar breakdown across all 6 skills with benchmark percentiles.
              </p>
            </div>

            {/* Box 2: Hours Target */}
            <div className="p-4 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#885B32]">2. Target Milestone Projection</span>
                <div className="text-lg font-bold text-[#885B32] mt-1 leading-snug">
                  You need approximately <span className="font-extrabold text-[#C85A32] underline decoration-wavy underline-offset-2">84 hours</span> to reach B1.
                </div>
              </div>
              <p className="text-xs text-[#8A6A40] mt-2">
                Paced at 15 minutes/day with daily conversational milestones.
              </p>
            </div>

            {/* Box 3: Weekly Plan */}
            <div className="p-4 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-semibold text-[#2D5438]">3. Personalized Learning Plan</span>
                <div className="text-sm font-bold text-[#2C2C24] mt-1">
                  Week 1 Focus:
                </div>
                <ul className="text-xs text-[#3D3D30] space-y-1 mt-1 font-medium">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53]" /> 50 vocabulary words
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53]" /> 3 grammar lessons
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53]" /> 2 speaking exercises &amp; 1 listening test
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
            <span>Take Free 5-Minute Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="explore-free-lead-magnets-btn"
            onClick={() => onOpenLeadMagnets('top-100-words')}
            className="px-5 py-3.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#2C2C24] font-bold text-sm sm:text-base border border-[#DCDCCF] transition-all active:scale-98 flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Gift className="w-4 h-4 text-[#C85A32]" />
            <span>Explore 10 Free Study Kits</span>
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
          <span className="text-[#2C2C24] font-bold">10 Free Products Available:</span>
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

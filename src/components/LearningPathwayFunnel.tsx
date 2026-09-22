import React, { useState } from 'react';
import { 
  Sparkles, 
  Award, 
  BookOpen, 
  GraduationCap, 
  ArrowRight, 
  Check, 
  ChevronRight,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { LanguageConfig, CourseEnrollment, UserProfile, CEFRLevel } from '../types';

interface LearningPathwayFunnelProps {
  language: LanguageConfig;
  currentLevel: CEFRLevel;
  enrollment: CourseEnrollment;
  user?: UserProfile | null;
  onOpenStep: (step: 'test' | 'score' | 'plan' | 'challenge' | 'paid_course' | 'subscription' | 'certification') => void;
  onOpenPaymentModal: (targetScenarioTitle?: string) => void;
}

export const LearningPathwayFunnel: React.FC<LearningPathwayFunnelProps> = ({
  language,
  currentLevel,
  enrollment,
  onOpenStep,
  onOpenPaymentModal
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const stages = [
    {
      id: 'diagnostic',
      stepNum: 1,
      title: 'Quick Diagnostic',
      subtitle: 'Discover your CEFR level',
      desc: '5-minute adaptive assessment of vocabulary, grammar, and auditory comprehension.',
      badge: '100% Free',
      badgeColor: 'bg-[#E9F0EA] text-[#2F523A] border-[#C5DAC8]',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
      icon: Sparkles,
      onClick: () => onOpenStep('test'),
      actionLabel: 'Take Test',
      status: 'Ready',
    },
    {
      id: 'roadmap',
      stepNum: 2,
      title: 'Targeted Roadmap',
      subtitle: 'Tailored AI daily missions',
      desc: 'Personalized 30-day curriculum focusing strictly on your conversational gaps.',
      badge: 'Custom AI Plan',
      badgeColor: 'bg-[#EFF4F8] text-[#365A78] border-[#D0DFEB]',
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=600&q=80',
      icon: BookOpen,
      onClick: () => onOpenStep('plan'),
      actionLabel: 'View Plan',
      status: 'Active',
    },
    {
      id: 'immersion',
      stepNum: 3,
      title: 'Daily Voice Immersion',
      subtitle: 'Interactive AI roleplays',
      desc: 'Spontaneous dialogues with realistic avatars, instant pronunciation coaching, and zero judgment.',
      badge: 'Voice Coach',
      badgeColor: 'bg-[#FDF6EE] text-[#8C521C] border-[#F3DFC8]',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
      icon: Sparkles,
      onClick: () => {
        const el = document.getElementById('scenarios-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      },
      actionLabel: 'Explore Scenarios',
      status: 'Available',
    },
    {
      id: 'certification',
      stepNum: 4,
      title: 'Certified Fluency',
      subtitle: 'CEFR B2/C1 credentials',
      desc: 'Official verified certificate with digital verification link and career milestone badge.',
      badge: 'Accredited',
      badgeColor: 'bg-[#E9F0EA] text-[#2F523A] border-[#C5DAC8]',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
      icon: GraduationCap,
      onClick: () => onOpenStep('certification'),
      actionLabel: 'View Certificate',
      status: enrollment.isEnrolled ? 'Unlocked' : 'Included',
    },
  ];

  return (
    <section className="w-full py-12 border-t border-[#E8E8DF]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2F523A] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proven 4-Stage Pathway</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421]">
            Your Journey to Fluent {language.name}
          </h2>
          <p className="text-sm text-[#555546]">
            A clear, structured learning progression from initial assessment to verified speaking confidence.
          </p>
        </div>

        {/* Clean Horizontal Stepper */}
        <div className="relative">
          {/* Connecting Progress Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/3 left-12 right-12 h-0.5 bg-[#E2E2D6] -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {stages.map((stage) => {
              return (
                <div
                  key={stage.id}
                  className="rounded-2xl bg-white border border-[#E8E8DF] shadow-[0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-[#C5DAC8] transition-all group"
                >
                  {/* High-Resolution Photographic Card Header */}
                  <div className="relative w-full h-36 overflow-hidden bg-[#1F2421]">
                    <img
                      src={stage.imageUrl}
                      alt={stage.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Step Number Badge */}
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-[#2F523A] text-white font-bold text-xs flex items-center justify-center shadow-md">
                      {stage.stepNum}
                    </div>

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-xs ${stage.badgeColor}`}>
                        {stage.badge}
                      </span>
                    </div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-2.5 left-3 right-3 text-left">
                      <h3 className="font-extrabold text-base text-white leading-snug drop-shadow-sm">
                        {stage.title}
                      </h3>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2.5 text-left flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#2F523A]">
                        {stage.subtitle}
                      </p>
                      <p className="text-xs text-[#555546] leading-relaxed mt-1">
                        {stage.desc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-3 border-t border-[#F0EFEB]">
                      <button
                        type="button"
                        onClick={stage.onClick}
                        className="w-full py-2 px-3 rounded-xl bg-[#FAF9F5] hover:bg-[#E9F0EA] border border-[#DCDCCF] hover:border-[#C5DAC8] text-xs font-bold text-[#1F2421] hover:text-[#2F523A] flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>{stage.actionLabel}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Collapsible Pricing & Certification Details Accordion */}
        <div className="mt-8 max-w-3xl mx-auto">
          <button
            type="button"
            onClick={() => setAccordionOpen(!accordionOpen)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E8E8DF] shadow-xs hover:bg-[#FAF9F5] transition-all text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#2D5438]" />
              <div>
                <div className="text-xs sm:text-sm font-bold text-[#1F2421]">
                  View Detailed Certification &amp; Syllabus Specifications
                </div>
                <div className="text-[11px] text-[#7A7A68]">
                  CEFR standard guidelines, evaluation criteria, and lifetime access perks
                </div>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#7A7A68] transition-transform ${accordionOpen ? 'rotate-180' : ''}`} />
          </button>

          {accordionOpen && (
            <div className="mt-2 p-5 rounded-2xl bg-white border border-[#E8E8DF] text-xs text-[#555546] space-y-3 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="font-bold text-[#1F2421]">CEFR Assessment Rubric</div>
                  <p>All dialogues are evaluated against official European Framework criteria (fluency, grammatical range, lexical resource, and phonetic clarity).</p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[#1F2421]">Verified Digital Certificate</div>
                  <p>Upon completing your required conversation hours and diagnostic exam, receive an accredited certificate shareable to LinkedIn.</p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[#1F2421]">Full Access Pricing (₹999)</div>
                  <p>One-time payment for lifetime access to all 8+ languages, 50+ realistic scenarios, and unlimited voice coaching with zero recurring fees.</p>
                </div>
                <div className="space-y-1">
                  <div className="font-bold text-[#1F2421]">Immediate Support &amp; Verification</div>
                  <p>Official support at support@talktoworld.co.in with instant certificate verification on talktoworld.co.in.</p>
                </div>
              </div>

              {!enrollment.isEnrolled && (
                <div className="pt-3 border-t border-[#F0EFEB] flex justify-end">
                  <button
                    type="button"
                    onClick={() => onOpenPaymentModal()}
                    className="px-4 py-2 rounded-xl bg-[#2D5438] hover:bg-[#23422C] text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Unlock Lifetime Pass for ₹999
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

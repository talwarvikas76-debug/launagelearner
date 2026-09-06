import React from 'react';
import { 
  Sparkles, 
  Award, 
  BookOpen, 
  Flame, 
  Star, 
  CreditCard, 
  GraduationCap, 
  ArrowDown, 
  ArrowRight, 
  Check, 
  ChevronRight,
  ShieldCheck,
  Zap
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
  user,
  onOpenStep,
  onOpenPaymentModal
}) => {
  const steps = [
    {
      id: 'test' as const,
      num: '01',
      title: 'FREE LANGUAGE TEST',
      subtitle: '5-min Diagnostic Quiz',
      desc: `Adaptive test in ${language.name} assessing vocabulary, listening & grammar`,
      tag: '100% Free',
      tagColor: 'bg-[#E9F0EA] text-[#2D5438] border-[#C5DAC8]',
      icon: Sparkles,
      iconBg: 'bg-[#E9F0EA] text-[#4A6B53]',
      actionText: 'Take Free Test',
      isCompleted: true,
    },
    {
      id: 'score' as const,
      num: '02',
      title: 'Personalized Score',
      subtitle: 'CEFR Assessment',
      desc: 'Instant proficiency report with granular skill breakdown (0-100)',
      tag: 'Instant AI Report',
      tagColor: 'bg-[#FAF9F5] text-[#5A5A40] border-[#DCDCCF]',
      icon: Award,
      iconBg: 'bg-[#FAF9F5] text-[#8C521C]',
      actionText: 'View Score',
      isCompleted: true,
    },
    {
      id: 'plan' as const,
      num: '03',
      title: 'AI-generated Learning Plan',
      subtitle: '4-Week Custom Syllabus',
      desc: 'Smart weekly milestones targeting your specific weak points & speaking goals',
      tag: 'Custom AI Roadmap',
      tagColor: 'bg-[#EFF4F8] text-[#365A78] border-[#D0DFEB]',
      icon: BookOpen,
      iconBg: 'bg-[#EFF4F8] text-[#365A78]',
      actionText: 'View AI Plan',
      isCompleted: false,
    },
    {
      id: 'challenge' as const,
      num: '04',
      title: 'Free 7-day challenge',
      subtitle: 'Habit Sprint',
      desc: 'Daily 5-minute interactive speaking missions with reward badges',
      tag: 'Daily Streak',
      tagColor: 'bg-[#FDF6EE] text-[#8C521C] border-[#F3DFC8]',
      icon: Flame,
      iconBg: 'bg-[#FDF6EE] text-[#C28E58]',
      actionText: 'Start Challenge',
      isCompleted: false,
    },
    {
      id: 'paid_course' as const,
      num: '05',
      title: 'Paid course',
      subtitle: 'Rs. 499/- (Special Offer)',
      desc: 'Lifetime full access to all scenarios, AI speech coach & native voices',
      tag: 'Special ₹499 (was ₹4,999)',
      tagColor: 'bg-[#E9F0EA] text-[#2D5438] border-[#C5DAC8] font-bold',
      icon: Star,
      iconBg: 'bg-[#4A6B53] text-white',
      actionText: enrollment.isEnrolled ? 'Enrolled ✓' : 'Enroll ₹499',
      isCompleted: enrollment.isEnrolled,
    },
    {
      id: 'subscription' as const,
      num: '06',
      title: 'Subscription',
      subtitle: 'Lifetime All-Access',
      desc: 'Single one-time payment with zero recurring fees or renewal charges',
      tag: 'No Recurring Fees',
      tagColor: 'bg-[#FAF9F5] text-[#5A5A40] border-[#DCDCCF]',
      icon: CreditCard,
      iconBg: 'bg-[#FAF9F5] text-[#4E4782]',
      actionText: 'View All-Access',
      isCompleted: enrollment.isEnrolled,
    },
    {
      id: 'certification' as const,
      num: '07',
      title: 'Certification / advanced course',
      subtitle: 'Official CEFR Diploma',
      desc: 'Verified accredited certificate of fluency for resume & LinkedIn',
      tag: 'CEFR B2/C1 Diploma',
      tagColor: 'bg-[#F6EEF5] text-[#7A426F] border-[#E8D1E6]',
      icon: GraduationCap,
      iconBg: 'bg-[#F6EEF5] text-[#7A426F]',
      actionText: 'View Certificate',
      isCompleted: false,
    },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8] p-5 sm:p-7 mb-8 shadow-xs overflow-hidden">
      {/* Funnel Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E3E3D8]">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#4A6B53]" />
            <span>Structured Fluency Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2C2C24]">
            Your Complete Spoken {language.name} Learning Pathway
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5A40] mt-1">
            Follow the 7-step proven methodology from initial free diagnosis to certified native-like fluency.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <button
            type="button"
            id="open-free-diagnostic-btn"
            onClick={() => onOpenStep('test')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Take Free Language Test</span>
          </button>
        </div>
      </div>

      {/* Vertical Step-by-Step Cascading Flowchart with ↓ Connectors */}
      <div className="pt-6 max-w-4xl mx-auto space-y-3">
        {steps.map((step, idx) => {
          const IconComp = step.icon;
          return (
            <React.Fragment key={step.id}>
              {/* Step Card */}
              <div 
                onClick={() => onOpenStep(step.id)}
                className="group relative rounded-xl bg-white border border-[#E3E3D8] hover:border-[#4A6B53] hover:shadow-md p-4 sm:p-5 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Left: Step Number, Icon, & Text */}
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-black/5 shadow-2xs group-hover:scale-105 transition-transform ${step.iconBg}`}>
                    <IconComp className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-black text-[#8A8A7A]">
                        STEP {step.num}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#2C2C24] group-hover:text-[#4A6B53] transition-colors">
                        {step.title}
                      </h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border ${step.tagColor}`}>
                        {step.tag}
                      </span>
                    </div>

                    <p className="text-xs text-[#5A5A40] leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Right: Action Button / Badge */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0F0EA]">
                  <span className="text-[11px] font-semibold text-[#8A8A7A] sm:hidden">
                    {step.subtitle}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (step.id === 'paid_course' && !enrollment.isEnrolled) {
                        onOpenPaymentModal('Paid Course Enrollment');
                      } else {
                        onOpenStep(step.id);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      step.id === 'paid_course' && !enrollment.isEnrolled
                        ? 'bg-[#4A6B53] hover:bg-[#3E5A45] text-white shadow-2xs'
                        : 'bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#2C2C24] border border-[#DCDCCF]'
                    }`}
                  >
                    <span>{step.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#8A8A7A] group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Explicit Down Arrow Indicator (↓) between steps */}
              {idx < steps.length - 1 && (
                <div className="flex flex-col items-center justify-center py-1">
                  <div className="w-0.5 h-3 bg-[#DCDCCF]" />
                  <div className="w-6 h-6 rounded-full bg-[#FAF9F5] border border-[#DCDCCF] flex items-center justify-center text-[#4A6B53] shadow-2xs my-0.5">
                    <ArrowDown className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <div className="w-0.5 h-3 bg-[#DCDCCF]" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Pathway Footer Note */}
      <div className="mt-7 pt-4 border-t border-[#E3E3D8] flex flex-wrap items-center justify-between text-xs text-[#5A5A40] gap-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#4A6B53]" />
          <span>CEFR Aligned (A1 to C1) • Immediate Speech Diagnosis • 100% Satisfaction Guaranteed</span>
        </div>

        <div className="text-[11px] font-mono text-[#8A8A7A]">
          Direct UPI: talwarvikasaxisbank@axl
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Award, 
  Zap, 
  Globe2,
  ArrowRight
} from 'lucide-react';
import { CourseEnrollment } from '../types';

interface PricingSectionProps {
  enrollment: CourseEnrollment;
  onOpenPaymentModal: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  enrollment,
  onOpenPaymentModal,
}) => {
  const benefits = [
    'Unlimited AI Roleplay practice across all 8+ languages',
    'Real-time pronunciation & grammar feedback on every spoken turn',
    'Custom AI-generated syllabus tailored to your personal goals',
    'Access to all current and upcoming scenarios (Travel, Business, Social, Medical)',
    'Official CEFR Language Proficiency Certificate upon milestone completion',
    'Lifetime access with zero recurring monthly subscription fees'
  ];

  return (
    <section id="pricing-section" className="w-full py-12 sm:py-16 bg-[#FAF9F5] border-t border-[#E8E8DF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lifetime Investment</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1F2421]">
            One Simple Pass. Unlimited Fluency.
          </h2>
          <p className="text-sm text-[#555546]">
            Try your first sample scenario for free. Upgrade anytime for lifetime all-scenario access.
          </p>
        </div>

        {/* Focused Card */}
        <div className="rounded-3xl bg-white border-2 border-[#2D5438]/20 shadow-[0_15px_40px_rgba(45,84,56,0.08)] p-6 sm:p-10 relative overflow-hidden">
          
          {/* Pro Pill Banner */}
          <div className="absolute top-0 right-0 bg-[#2D5438] text-white px-5 py-1.5 rounded-bl-2xl text-xs font-extrabold tracking-wider uppercase">
            Special Launch Offer
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Value & Benefits */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#1F2421]">
                  TalkToWorld All-Access Pass
                </h3>
                <p className="text-xs sm:text-sm text-[#6B705C] mt-1">
                  Full unrestricted access to interactive conversational AI across all languages.
                </p>
              </div>

              {/* Social Proof Avatars */}
              <div className="flex items-center gap-3 py-1">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                    alt="Learner"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                    alt="Learner"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
                    alt="Learner"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
                    alt="Learner"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                    alt="Learner"
                    className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-2xs"
                  />
                </div>
                <div className="text-xs text-[#555546]">
                  <span className="font-bold text-[#1F2421]">14,800+</span> active speakers • <span className="text-[#C28E58] font-bold">★ 4.9/5</span>
                </div>
              </div>

              {/* Benefits Checklist */}
              <ul className="space-y-2.5">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2C2C24]">
                    <div className="w-5 h-5 rounded-full bg-[#E9F0EA] text-[#2F523A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Price & CTA */}
            <div className="md:col-span-5 p-6 rounded-2xl bg-[#FAF9F5] border border-[#E8E8DF] text-center space-y-4">
              
              <div className="space-y-1">
                <div className="text-xs text-[#7A7A68] line-through font-mono">
                  Regular Price: ₹9,999
                </div>
                <div className="flex items-baseline justify-center gap-1.5">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#1F2421] tracking-tight">
                    ₹999
                  </span>
                  <span className="text-xs text-[#555546] font-semibold">
                    one-time
                  </span>
                </div>
                <div className="text-[11px] text-[#2D5438] font-bold">
                  Save 90% Today • Lifetime Validity
                </div>
              </div>

              {enrollment.isEnrolled ? (
                <div className="p-3.5 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] font-bold text-sm flex items-center justify-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>You Have Full Access ✓</span>
                </div>
              ) : (
                <button
                  type="button"
                  id="pricing-unlock-btn"
                  onClick={onOpenPaymentModal}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#2D5438] hover:bg-[#23422C] text-white font-bold text-sm shadow-md hover:shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4 text-[#D8EADB]" />
                  <span>Get Full Access Now</span>
                  <ArrowRight className="w-4 h-4 text-[#D8EADB]" />
                </button>
              )}

              {/* Trust & Payment Badges */}
              <div className="pt-2 border-t border-[#E8E8DF] space-y-2 text-[11px] text-[#7A7A68]">
                <div className="flex items-center justify-center gap-1.5 text-[#2D5438] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Secure 256-bit Encrypted Checkout</span>
                </div>
                <div className="flex items-center justify-center gap-2 font-mono text-[10px] text-[#555546] flex-wrap">
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#DCDCCF]">UPI</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#DCDCCF]">GPay</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#DCDCCF]">PhonePe</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#DCDCCF]">Paytm</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#DCDCCF]">Cards</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#DCDCCF]">NetBanking</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

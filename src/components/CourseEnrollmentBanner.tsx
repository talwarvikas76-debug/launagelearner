import React from 'react';
import { 
  Lock, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Star,
  Zap,
  Check
} from 'lucide-react';
import { CourseEnrollment } from '../types';

interface CourseEnrollmentBannerProps {
  enrollment: CourseEnrollment;
  onOpenPaymentModal: (targetScenarioTitle?: string) => void;
}

export const CourseEnrollmentBanner: React.FC<CourseEnrollmentBannerProps> = ({
  enrollment,
  onOpenPaymentModal,
}) => {
  if (enrollment.isEnrolled) {
    return (
      <div className="mb-6 p-4 rounded-2xl bg-linear-to-r from-[#E9F0EA] via-[#F1F6F2] to-[#FAF9F5] border border-[#C5DAC8] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4A6B53] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-bold text-[#2D5438]">
                Course Access Active: Pro Student Pass
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#4A6B53] text-white text-[10px] font-bold uppercase tracking-wider">
                Full Access
              </span>
            </div>
            <p className="text-xs text-[#3D5C45] mt-0.5">
              All scenarios, AI live voice practice, custom prompts &amp; certifications are unlocked.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => onOpenPaymentModal()}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F5F5F0] border border-[#C5DAC8] text-xs font-semibold text-[#2D5438] flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Receipt ({enrollment.transactionId || `Rs. ${enrollment.amountPaid || 999} Paid`})</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-linear-to-br from-[#FAF9F5] via-[#FFFDF8] to-[#F5F2EB] border-2 border-[#C28E58]/40 hover:border-[#C28E58]/80 transition-all shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Offer details */}
        <div className="space-y-2.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF6EE] border border-[#F3DFC8] text-[#8C521C] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#C28E58]" />
            <span>Free Sample for Each Language • 10% Immediate Discount</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[#2C2C24]">
            Try a Sample Free in Each Language • Full Course for <span className="line-through text-[#8A8A7A]">Rs. 9,999/-</span> <span className="text-[#2D5438] font-mono">Rs. 999/-</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#5A5A40] leading-relaxed">
            Practice an individual free sample scenario in each language. After completion, check your <strong>Diagnostic Performance Indicators</strong> and claim an exclusive <strong>10% Immediate Joining Discount (Rs. 899/-)</strong>!
          </p>

          {/* Quick Value Highlights */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-[#3D3D30]">
            <div className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-[#4A6B53] stroke-[2.5]" />
              <span>1 Free Starter Practice in All 12 Languages</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-[#4A6B53] stroke-[2.5]" />
              <span>50+ Roleplays &amp; AI Custom Generator</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <Check className="w-3.5 h-3.5 text-[#4A6B53] stroke-[2.5]" />
              <span>Instant UPI &amp; Cards (GPay, PhonePe, Paytm)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Action Card */}
        <div className="flex flex-col items-start lg:items-end gap-2.5 shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-semibold text-[#8A8A7A] line-through decoration-[#B84242] decoration-2">
              Rs. 9,999/-
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#2D5438]">
              Rs. 999/-
            </span>
          </div>

          <button
            type="button"
            id="banner-enroll-now-btn"
            onClick={() => onOpenPaymentModal()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] active:bg-[#344C3A] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            <span>Unlock Full Course Pass (Rs. 999)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1.5 text-[11px] text-[#5A5A40]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B53]" />
            <span>Instant UPI &amp; Cards • Lifetime Access</span>
          </div>
        </div>
      </div>
    </div>
  );
};

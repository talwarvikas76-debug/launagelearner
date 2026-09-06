import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Smartphone, 
  Building, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Download, 
  RefreshCw, 
  Zap, 
  Star, 
  Copy,
  User
} from 'lucide-react';
import { CourseEnrollment, LanguageConfig, UserProfile } from '../types';

interface CoursePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (enrollmentData: CourseEnrollment) => void;
  currentLanguage?: LanguageConfig;
  targetScenarioTitle?: string;
  userEmail?: string;
  user?: UserProfile | null;
  onOpenAuthModal?: () => void;
}

type PaymentTab = 'upi' | 'card' | 'netbanking' | 'wallet';

export const CoursePaymentModal: React.FC<CoursePaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  currentLanguage,
  targetScenarioTitle,
  userEmail = 'talwarvikas76@gmail.com',
  user,
  onOpenAuthModal,
}) => {
  const [activeTab, setActiveTab] = useState<PaymentTab>('upi');
  
  // Customer details
  const [payerName, setPayerName] = useState(user?.name || 'Vikas Talwar');
  const [payerEmail, setPayerEmail] = useState(user?.email || userEmail || 'talwarvikas76@gmail.com');
  const [payerPhone, setPayerPhone] = useState(user?.phoneNumber?.replace(/\D/g, '') || '9876543210');

  useEffect(() => {
    if (user) {
      if (user.name) setPayerName(user.name);
      if (user.email) setPayerEmail(user.email);
      if (user.phoneNumber) setPayerPhone(user.phoneNumber.replace(/\D/g, ''));
    }
  }, [user, isOpen]);
  
  // Payment Form States - Defaulting to registered user UPI: talwarvikasaxisbank@axl
  const [upiId, setUpiId] = useState('talwarvikasaxisbank@axl');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'axis' | 'gpay' | 'phonepe' | 'paytm' | 'other'>('axis');
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [cardNumber, setCardNumber] = useState('4532 8921 4455 1920');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('789');
  const [cardName, setCardName] = useState('Vikas Talwar');
  const [selectedBank, setSelectedBank] = useState('Axis Bank');
  const [selectedWallet, setSelectedWallet] = useState('Paytm');

  // Processing & Success states
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [processingStatus, setProcessingStatus] = useState('Connecting to payment gateway...');
  const [completedEnrollment, setCompletedEnrollment] = useState<CourseEnrollment | null>(null);

  if (!isOpen) return null;

  const handleProcessPayment = () => {
    setPaymentStep('processing');
    setProcessingStatus('Securing 256-bit encrypted checkout...');

    setTimeout(() => {
      setProcessingStatus('Verifying payment of Rs. 499/- with bank...');
    }, 900);

    setTimeout(() => {
      setProcessingStatus('Authorizing course enrollment & creating student credentials...');
    }, 1800);

    setTimeout(() => {
      const txnId = `TXN_IND_${Math.floor(100000 + Math.random() * 900000)}`;
      const orderId = `ORD_COURSE_${Math.floor(10000 + Math.random() * 90000)}`;
      const now = new Date().toISOString();

      const newEnrollment: CourseEnrollment = {
        isEnrolled: true,
        amountPaid: 499,
        currency: 'INR',
        enrolledAt: now,
        transactionId: txnId,
        orderId: orderId,
        paymentMethod: activeTab.toUpperCase(),
        payerName: payerName || 'Valued Learner',
        payerEmail: payerEmail || userEmail,
      };

      setCompletedEnrollment(newEnrollment);
      setPaymentStep('success');
      onPaymentSuccess(newEnrollment);
    }, 2800);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={paymentStep === 'processing' ? undefined : onClose} 
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-[#FFFFFF] border border-[#DCDCCF] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-[#E3E3D8] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#2D5438]">
              <Lock className="w-5 h-5 text-[#4A6B53]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-[#2C2C24]">
                  Course Enrollment Checkout
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#E9F0EA] text-[#2D5438] text-[10px] font-bold uppercase tracking-wider border border-[#C5DAC8]">
                  90% OFF Pass
                </span>
              </div>
              <p className="text-xs text-[#5A5A40]">
                1 free exercise per language included • Unlock full curriculum for <span className="line-through text-[#8A8A7A]">Rs. 4,999/-</span> <span className="font-bold text-[#2D5438] text-sm">Rs. 499/-</span>
              </p>
            </div>
          </div>

          {paymentStep !== 'processing' && (
            <button
              id="close-payment-modal-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* STEP 1: Form & Course Benefits */}
          {paymentStep === 'form' && (
            <>
              {/* Context Alert if targeted from a specific locked scenario */}
              {targetScenarioTitle && (
                <div className="p-3.5 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#C28E58] shrink-0 mt-0.5" />
                  <div className="text-xs text-[#8C521C]">
                    <span className="font-bold">Next Practice Locked:</span> 1 free exercise is included for every language. To practice{' '}
                    <span className="font-semibold text-[#2C2C24]">&ldquo;{targetScenarioTitle}&rdquo;</span> and unlock all 50+ roleplays, custom AI scenario builder, and certifications across all 6 languages, enroll below for <span className="line-through">Rs. 4,999/-</span> <span className="font-bold text-[#2D5438]">Rs. 499/-</span>.
                  </div>
                </div>
              )}

              {/* Course Overview Card */}
              <div className="p-4 rounded-xl bg-linear-to-br from-[#FAF9F5] to-[#F5F4EE] border border-[#E3E3D8] shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E3E3D8]">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4A6B53] uppercase tracking-wider mb-1">
                      <Star className="w-3.5 h-3.5 fill-[#4A6B53]" />
                      <span>Complete Spoken Fluency Course</span>
                    </div>
                    <h3 className="text-base font-bold text-[#2C2C24]">
                      AI Language Immersion &amp; Practice Pass
                    </h3>
                    <p className="text-xs text-[#5A5A40] mt-0.5">
                      1 Free Exercise / Language • All 6 Languages • CEFR A1–C1 • Lifetime Full Access
                    </p>
                  </div>

                  {/* Price Tag with 4999 strike-through and 499 charged */}
                  <div className="sm:text-right shrink-0 bg-white sm:bg-transparent p-3 sm:p-0 rounded-lg border sm:border-0 border-[#E3E3D8]">
                    <div className="text-xs font-semibold text-[#8A8A7A] line-through decoration-[#B84242] decoration-2">
                      Original: Rs. 4,999/-
                    </div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-[#2D5438] font-mono">
                      Rs. 499/-
                    </div>
                    <div className="text-[10px] text-[#4A6B53] font-bold uppercase tracking-wider bg-[#E9F0EA] px-2 py-0.5 rounded border border-[#C5DAC8] inline-block">
                      90% OFF • Save Rs. 4,500/-
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 text-xs text-[#3D3D30]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>Unlimited AI Spoken Scenario Practice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>Real-Time Grammar &amp; Fluency Scoring</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>Pronunciation Coach &amp; Audio Transcripts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>Custom Scenario Builder with AI Prompts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>Daily Goal Tracking &amp; Weekly Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] shrink-0" />
                    <span>PDF Performance Reports &amp; Audio Export</span>
                  </div>
                </div>
              </div>

              {/* Student / Payer Details */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
                    Student &amp; Billing Details
                  </label>
                  {user?.isLoggedIn ? (
                    <span className="text-[11px] font-semibold text-[#2D5438] bg-[#E9F0EA] px-2 py-0.5 rounded border border-[#C5DAC8] flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#4A6B53]" />
                      <span>Linked to {user.name}</span>
                    </span>
                  ) : onOpenAuthModal ? (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenAuthModal();
                      }}
                      className="text-[11px] font-bold text-[#4A6B53] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <User className="w-3 h-3" />
                      <span>Sign In with Google/Email/Mobile</span>
                    </button>
                  ) : null}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#5A5A40] mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-semibold text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#5A5A40] mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-semibold text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#5A5A40] mb-1 font-medium">Mobile Number (India)</label>
                    <input
                      type="tel"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-semibold text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                      placeholder="9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Tabs */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-2.5">
                  Select Payment Method (Rs. 499/-)
                </label>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('upi')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      activeTab === 'upi'
                        ? 'bg-[#E9F0EA] border-[#4A6B53] text-[#2D5438] font-bold shadow-xs'
                        : 'bg-[#FAF9F5] border-[#E3E3D8] text-[#5A5A40] hover:text-[#2C2C24]'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">UPI</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      activeTab === 'card'
                        ? 'bg-[#E9F0EA] border-[#4A6B53] text-[#2D5438] font-bold shadow-xs'
                        : 'bg-[#FAF9F5] border-[#E3E3D8] text-[#5A5A40] hover:text-[#2C2C24]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">Card</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('netbanking')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      activeTab === 'netbanking'
                        ? 'bg-[#E9F0EA] border-[#4A6B53] text-[#2D5438] font-bold shadow-xs'
                        : 'bg-[#FAF9F5] border-[#E3E3D8] text-[#5A5A40] hover:text-[#2C2C24]'
                    }`}
                  >
                    <Building className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">Net Banking</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('wallet')}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      activeTab === 'wallet'
                        ? 'bg-[#E9F0EA] border-[#4A6B53] text-[#2D5438] font-bold shadow-xs'
                        : 'bg-[#FAF9F5] border-[#E3E3D8] text-[#5A5A40] hover:text-[#2C2C24]'
                    }`}
                  >
                    <Zap className="w-4 h-4 mx-auto mb-1" />
                    <div className="text-xs">Wallets</div>
                  </button>
                </div>

                {/* TAB 1: UPI */}
                {activeTab === 'upi' && (
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#2C2C24]">Pay with UPI Apps &amp; VPA</span>
                      <span className="text-[10px] text-[#4A6B53] font-bold bg-[#E9F0EA] px-2 py-0.5 rounded border border-[#C5DAC8]">
                        Instant Activation
                      </span>
                    </div>

                    {/* Official Beneficiary / Merchant UPI Box */}
                    <div className="p-3 rounded-lg bg-linear-to-r from-[#E9F0EA] to-[#FAF9F5] border border-[#C5DAC8] flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] font-bold text-[#4A6B53] uppercase tracking-wider">
                          Official Merchant &amp; Beneficiary UPI ID
                        </div>
                        <div className="text-xs font-mono font-bold text-[#2D5438] mt-0.5">
                          talwarvikasaxisbank@axl
                        </div>
                        <div className="text-[11px] text-[#5A5A40]">
                          Beneficiary: <span className="font-medium text-[#2C2C24]">Vikas Talwar</span> • Axis Bank
                        </div>
                      </div>

                      <button
                        type="button"
                        id="copy-upi-id-btn"
                        onClick={() => {
                          navigator.clipboard.writeText('talwarvikasaxisbank@axl');
                          setCopiedUpi(true);
                          setTimeout(() => setCopiedUpi(false), 2000);
                        }}
                        className="px-2.5 py-1.5 rounded-md bg-white hover:bg-[#F5F5F0] border border-[#C5DAC8] text-xs font-semibold text-[#2D5438] flex items-center gap-1 transition-all shadow-2xs cursor-pointer shrink-0"
                      >
                        {copiedUpi ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#4A6B53]" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#4A6B53]" />
                            <span>Copy UPI</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* UPI App Selection */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'axis', name: 'Axis Bank / AXL', handle: 'axl', customId: 'talwarvikasaxisbank@axl' },
                        { id: 'gpay', name: 'Google Pay', handle: 'okhdfcbank', customId: 'vikas@okhdfcbank' },
                        { id: 'phonepe', name: 'PhonePe', handle: 'ybl', customId: 'vikas@ybl' },
                        { id: 'paytm', name: 'Paytm UPI', handle: 'paytm', customId: 'vikas@paytm' },
                      ].map((app) => (
                        <button
                          key={app.id}
                          type="button"
                          onClick={() => {
                            setSelectedUpiApp(app.id as any);
                            setUpiId(app.customId);
                          }}
                          className={`p-2 rounded-lg border text-center text-xs font-semibold transition-all cursor-pointer ${
                            selectedUpiApp === app.id
                              ? 'bg-[#FFFFFF] border-[#4A6B53] text-[#2D5438] shadow-xs'
                              : 'bg-[#FFFFFF] border-[#DCDCCF] text-[#5A5A40] hover:border-[#4A6B53]'
                          }`}
                        >
                          {app.name}
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-[11px] text-[#5A5A40] font-medium">UPI ID / Virtual Payment Address (VPA)</label>
                        <span className="text-[10px] text-[#4A6B53] font-semibold">Auto-verified</span>
                      </div>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-mono font-bold text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                        placeholder="talwarvikasaxisbank@axl"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: Card */}
                {activeTab === 'card' && (
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] space-y-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-[#2C2C24]">Credit or Debit Card</span>
                      <span className="text-[10px] text-[#5A5A40]">Visa, Mastercard, RuPay</span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#5A5A40] mb-1 font-medium">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-mono font-bold text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                        placeholder="4532 8921 4455 1920"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-[#5A5A40] mb-1 font-medium">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-mono text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-[#5A5A40] mb-1 font-medium">CVV</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-mono text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                          placeholder="•••"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: Net Banking */}
                {activeTab === 'netbanking' && (
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] space-y-3">
                    <div className="text-xs font-bold text-[#2C2C24] mb-1">Select Bank</div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-2.5 rounded-lg border text-xs font-medium text-left transition-all ${
                            selectedBank === bank
                              ? 'bg-[#FFFFFF] border-[#4A6B53] text-[#2D5438] font-bold shadow-xs'
                              : 'bg-[#FFFFFF] border-[#DCDCCF] text-[#5A5A40] hover:border-[#4A6B53]'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: Wallets */}
                {activeTab === 'wallet' && (
                  <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] space-y-3">
                    <div className="text-xs font-bold text-[#2C2C24] mb-1">Select Wallet</div>
                    <div className="grid grid-cols-3 gap-2">
                      {['Paytm', 'Amazon Pay', 'PhonePe Wallet'].map((w) => (
                        <button
                          key={w}
                          type="button"
                          onClick={() => setSelectedWallet(w)}
                          className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                            selectedWallet === w
                              ? 'bg-[#FFFFFF] border-[#4A6B53] text-[#2D5438] font-bold shadow-xs'
                              : 'bg-[#FFFFFF] border-[#DCDCCF] text-[#5A5A40] hover:border-[#4A6B53]'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Trust Badge / Security */}
              <div className="flex items-center justify-between text-[11px] text-[#5A5A40] pt-2 border-t border-[#E3E3D8]">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#4A6B53]" />
                  <span>256-bit SSL Encrypted &amp; RBI Compliant Payment Gateway</span>
                </div>
                <span className="font-semibold text-[#2C2C24]">Amount: Rs. 499/- (Inclusive of GST)</span>
              </div>
            </>
          )}

          {/* STEP 2: Processing Animation */}
          {paymentStep === 'processing' && (
            <div className="py-12 px-4 text-center space-y-6 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-[#E9F0EA] border-2 border-[#4A6B53] flex items-center justify-center mx-auto text-[#2D5438]">
                <RefreshCw className="w-8 h-8 animate-spin text-[#4A6B53]" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#2C2C24] mb-1.5">
                  Processing Course Enrollment
                </h3>
                <p className="text-xs text-[#5A5A40] max-w-sm mx-auto font-medium">
                  {processingStatus}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] max-w-xs mx-auto text-xs space-y-1.5 text-left">
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Course:</span>
                  <span className="font-bold text-[#2C2C24]">Spoken Fluency Course</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Amount:</span>
                  <span className="font-bold text-[#2D5438]">Rs. 499/-</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5A5A40]">Payer:</span>
                  <span className="font-semibold text-[#2C2C24]">{payerName}</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Success & Receipt */}
          {paymentStep === 'success' && completedEnrollment && (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="p-5 rounded-2xl bg-[#E9F0EA] border border-[#C5DAC8] text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#4A6B53] text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold text-[#2D5438]">
                  Course Enrollment Successful!
                </h3>
                <p className="text-xs text-[#3D5C45] max-w-md mx-auto">
                  Payment of <span className="font-bold">Rs. 499/-</span> confirmed. You now have full lifetime access to all spoken roleplay practices, custom scenario builders, and AI tutoring.
                </p>
              </div>

              {/* Official Tax Invoice / Receipt Card */}
              <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#DCDCCF] space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-[#E3E3D8] pb-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#2C2C24]">
                    <FileText className="w-4 h-4 text-[#4A6B53]" />
                    <span>Payment Receipt &amp; Student Pass</span>
                  </div>
                  <span className="font-mono font-bold text-[#2D5438] bg-white px-2 py-0.5 rounded border border-[#C5DAC8]">
                    PAID • Rs. 499.00
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px]">
                  <div>
                    <span className="text-[#5A5A40] block">Transaction ID</span>
                    <span className="font-mono font-bold text-[#2C2C24]">{completedEnrollment.transactionId}</span>
                  </div>
                  <div>
                    <span className="text-[#5A5A40] block">Order ID</span>
                    <span className="font-mono font-semibold text-[#2C2C24]">{completedEnrollment.orderId}</span>
                  </div>
                  <div>
                    <span className="text-[#5A5A40] block">Date &amp; Time</span>
                    <span className="font-semibold text-[#2C2C24]">{new Date().toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[#5A5A40] block">Student Name</span>
                    <span className="font-semibold text-[#2C2C24]">{completedEnrollment.payerName}</span>
                  </div>
                  <div>
                    <span className="text-[#5A5A40] block">Student Email</span>
                    <span className="font-semibold text-[#2C2C24]">{completedEnrollment.payerEmail}</span>
                  </div>
                  <div>
                    <span className="text-[#5A5A40] block">Merchant / Payee VPA</span>
                    <span className="font-mono font-bold text-[#2D5438]">talwarvikasaxisbank@axl</span>
                  </div>
                  <div>
                    <span className="text-[#5A5A40] block">Access Level</span>
                    <span className="font-bold text-[#2D5438]">Lifetime Unlocked</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E3E3D8] flex items-center justify-between text-[11px] text-[#5A5A40]">
                  <span>Base Fee: Rs. 422.88 + 18% GST: Rs. 76.12 = Total Rs. 499/-</span>
                  <button
                    type="button"
                    onClick={handlePrintReceipt}
                    className="flex items-center gap-1 text-[#4A6B53] hover:underline font-semibold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E3E3D8] bg-[#FAF9F5] flex items-center justify-between gap-3">
          {paymentStep === 'form' && (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                id="confirm-pay-499-btn"
                onClick={handleProcessPayment}
                className="px-6 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] active:bg-[#344C3A] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 active:scale-98 cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Pay Rs. 499/- &amp; Unlock Full Course</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

          {paymentStep === 'processing' && (
            <div className="w-full text-center text-xs text-[#5A5A40] font-medium py-1">
              Please do not refresh or close this window...
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="w-full flex items-center justify-end">
              <button
                type="button"
                id="start-practicing-enrolled-btn"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 active:scale-98 cursor-pointer"
              >
                <span>Start Practicing Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

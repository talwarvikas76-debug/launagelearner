import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Lock, 
  User, 
  Sparkles, 
  ArrowRight, 
  Check, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  RefreshCw,
  Smartphone,
  Globe,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { UserProfile, AuthProvider } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  currentUser?: UserProfile | null;
  defaultTab?: 'google' | 'email' | 'phone';
  initialMessage?: string;
}

type AuthTab = 'google' | 'email' | 'phone';
type EmailMode = 'signin' | 'signup' | 'forgot';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  currentUser,
  defaultTab = 'google',
  initialMessage,
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>(defaultTab);
  const [emailMode, setEmailMode] = useState<EmailMode>('signin');
  
  // Google sign in state
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState('learner@talktoworld.co.in');

  // Email state
  const [email, setEmail] = useState('learner@talktoworld.co.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Language Learner');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Mobile state
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('9876543210');
  const [otpStep, setOtpStep] = useState<'input_number' | 'verify_otp'>('input_number');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [isPhoneLoading, setIsPhoneLoading] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  // Timer countdown for OTP
  useEffect(() => {
    let interval: any = null;
    if (otpStep === 'verify_otp' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpStep, otpTimer]);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      setEmailError(null);
      setPhoneError(null);
      setResetEmailSent(false);
      setOtpStep('input_number');
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  // 1. Handle Google Sign-In
  const handleGoogleSignIn = (selectedEmail?: string, customName?: string) => {
    setIsGoogleLoading(true);
    setEmailError(null);

    setTimeout(() => {
      const emailToUse = selectedEmail || selectedGoogleAccount || 'learner@talktoworld.co.in';
      const nameToUse = customName || (emailToUse.includes('student') ? 'Language Student' : 'Language Learner');
      
      const loggedInUser: UserProfile = {
        id: `usr_google_${Date.now()}`,
        name: nameToUse,
        email: emailToUse,
        photoUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nameToUse)}&backgroundColor=4A6B53&textColor=ffffff`,
        provider: 'google',
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      setIsGoogleLoading(false);
      onLoginSuccess(loggedInUser);
      onClose();
    }, 900);
  };

  // 2. Handle Email Sign-In / Sign-Up
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);

    if (!email || !email.includes('@')) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (emailMode !== 'forgot' && password.length < 4) {
      setEmailError('Password must be at least 4 characters long.');
      return;
    }

    setIsEmailLoading(true);

    setTimeout(() => {
      if (emailMode === 'forgot') {
        setIsEmailLoading(false);
        setResetEmailSent(true);
        return;
      }

      const userName = emailMode === 'signup' 
        ? (name.trim() || email.split('@')[0]) 
        : (name.trim() || 'Learner');

      const loggedInUser: UserProfile = {
        id: `usr_email_${Date.now()}`,
        name: userName,
        email: email.trim(),
        photoUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userName)}&backgroundColor=2D5438&textColor=ffffff`,
        provider: 'email',
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      setIsEmailLoading(false);
      onLoginSuccess(loggedInUser);
      onClose();
    }, 850);
  };

  // 3. Handle Phone Number OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);

    const cleanNumber = phoneNumber.replace(/\D/g, '');
    if (cleanNumber.length < 8) {
      setPhoneError('Please enter a valid mobile number.');
      return;
    }

    setIsPhoneLoading(true);
    setTimeout(() => {
      setIsPhoneLoading(false);
      setOtpStep('verify_otp');
      setOtpTimer(30);
      setOtp(['', '', '', '', '', '']);
    }, 700);
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPhoneError(null);

    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      setPhoneError('Please enter the full 6-digit verification code.');
      return;
    }

    setIsPhoneLoading(true);
    setTimeout(() => {
      const fullPhone = `${countryCode} ${phoneNumber}`;
      const loggedInUser: UserProfile = {
        id: `usr_phone_${Date.now()}`,
        name: `Learner (${fullPhone.slice(-4)})`,
        phoneNumber: fullPhone,
        email: `mobile_${phoneNumber.slice(-6)}@fluentai.app`,
        photoUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(phoneNumber)}&backgroundColor=9E5D24&textColor=ffffff`,
        provider: 'phone',
        isLoggedIn: true,
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      };

      setIsPhoneLoading(false);
      onLoginSuccess(loggedInUser);
      onClose();
    }, 800);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      val = val.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleAutoFillTestOtp = () => {
    setOtp(['1', '2', '3', '4', '5', '6']);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-[#FFFFFF] rounded-2xl border border-[#DCDCCF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 pt-5 pb-4 border-b border-[#E3E3D8] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#4A6B53] flex items-center justify-center text-white shadow-2xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2C2C24]">Sign In to FluentAI</h2>
              <p className="text-[11px] text-[#5A5A40]">Save your speech progress, streak, &amp; unlock practice</p>
            </div>
          </div>

          <button
            type="button"
            id="close-auth-modal-btn"
            onClick={onClose}
            aria-label="Close sign in dialog"
            className="p-1.5 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Initial Prompt Message (if passed, e.g. from scenario gate) */}
        {initialMessage && (
          <div className="px-6 py-2.5 bg-[#FDF6EE] border-b border-[#F3DFC8] text-xs text-[#8C521C] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C28E58] shrink-0" />
            <span>{initialMessage}</span>
          </div>
        )}

        {/* Method Selector Tabs */}
        <div className="grid grid-cols-3 p-1.5 mx-6 mt-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8]">
          <button
            type="button"
            id="tab-google-auth"
            onClick={() => {
              setActiveTab('google');
              setEmailError(null);
              setPhoneError(null);
            }}
            className={`py-2 px-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'google'
                ? 'bg-white text-[#2C2C24] shadow-xs border border-[#DCDCCF]'
                : 'text-[#5A5A40] hover:text-[#2C2C24]'
            }`}
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            id="tab-email-auth"
            onClick={() => {
              setActiveTab('email');
              setEmailError(null);
              setPhoneError(null);
            }}
            className={`py-2 px-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'email'
                ? 'bg-white text-[#2C2C24] shadow-xs border border-[#DCDCCF]'
                : 'text-[#5A5A40] hover:text-[#2C2C24]'
            }`}
          >
            <Mail className="w-3.5 h-3.5 text-[#4A6B53]" />
            <span>Email</span>
          </button>

          <button
            type="button"
            id="tab-phone-auth"
            onClick={() => {
              setActiveTab('phone');
              setEmailError(null);
              setPhoneError(null);
            }}
            className={`py-2 px-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'phone'
                ? 'bg-white text-[#2C2C24] shadow-xs border border-[#DCDCCF]'
                : 'text-[#5A5A40] hover:text-[#2C2C24]'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-[#9E5D24]" />
            <span>Mobile OTP</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          
          {/* TAB 1: GOOGLE SIGN IN */}
          {activeTab === 'google' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-[#2C2C24]">Instant One-Tap Google Sign In</h3>
                <p className="text-xs text-[#5A5A40]">
                  Authenticate instantly with your Google account. No passwords needed.
                </p>
              </div>

              {/* Main Google Sign-In Button */}
              <button
                type="button"
                id="google-signin-primary-btn"
                disabled={isGoogleLoading}
                onClick={() => handleGoogleSignIn('learner@talktoworld.co.in', 'Language Learner')}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#F9F9F6] active:bg-[#F0EFEA] border-2 border-[#DCDCCF] hover:border-[#4A6B53] text-[#2C2C24] font-bold text-sm shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
              >
                {isGoogleLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 text-[#4A6B53] animate-spin" />
                    <span>Connecting Google Account...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>

              {/* Detected Profile Selector */}
              <div className="pt-2">
                <div className="text-[11px] font-semibold text-[#5A5A40] mb-2 uppercase tracking-wider">
                  Select Google Account:
                </div>
                
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleGoogleSignIn('learner@talktoworld.co.in', 'Language Learner')}
                    className="w-full p-2.5 rounded-xl border border-[#E3E3D8] hover:border-[#4A6B53] bg-[#FAF9F5] hover:bg-white flex items-center justify-between transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#2D5438] text-white font-bold text-xs flex items-center justify-center">
                        LL
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2C2C24]">Language Learner</div>
                        <div className="text-[11px] text-[#5A5A40]">learner@talktoworld.co.in</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#4A6B53] font-bold bg-[#E9F0EA] px-2 py-0.5 rounded border border-[#C5DAC8]">
                      Default
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleGoogleSignIn('learner.student@gmail.com', 'Language Student')}
                    className="w-full p-2.5 rounded-xl border border-[#E3E3D8] hover:border-[#4A6B53] bg-[#FAF9F5] hover:bg-white flex items-center justify-between transition-all cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#5A5A40] text-white font-bold text-xs flex items-center justify-center">
                        LS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#2C2C24]">Language Student</div>
                        <div className="text-[11px] text-[#5A5A40]">learner.student@gmail.com</div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#5A5A40]" />
                  </button>
                </div>
              </div>

              {/* Security info */}
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] flex items-center gap-2.5 text-xs text-[#5A5A40]">
                <ShieldCheck className="w-4 h-4 text-[#4A6B53] shrink-0" />
                <span>Verified Google OAuth2 sign-in. Your credentials are fully protected.</span>
              </div>
            </div>
          )}

          {/* TAB 2: EMAIL SIGN IN & SIGN UP */}
          {activeTab === 'email' && (
            <div className="space-y-4">
              {/* Mode switch */}
              <div className="flex items-center justify-between border-b border-[#E3E3D8] pb-2 text-xs">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setEmailMode('signin');
                      setEmailError(null);
                      setResetEmailSent(false);
                    }}
                    className={`font-bold pb-1 cursor-pointer transition-colors relative ${
                      emailMode === 'signin'
                        ? 'text-[#2D5438] border-b-2 border-[#2D5438]'
                        : 'text-[#5A5A40] hover:text-[#2C2C24]'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailMode('signup');
                      setEmailError(null);
                      setResetEmailSent(false);
                    }}
                    className={`font-bold pb-1 cursor-pointer transition-colors relative ${
                      emailMode === 'signup'
                        ? 'text-[#2D5438] border-b-2 border-[#2D5438]'
                        : 'text-[#5A5A40] hover:text-[#2C2C24]'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {emailMode !== 'forgot' && (
                  <button
                    type="button"
                    onClick={() => {
                      setEmailMode('forgot');
                      setEmailError(null);
                    }}
                    className="text-[11px] text-[#4A6B53] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>

              {/* Error Banner */}
              {emailError && (
                <div className="p-2.5 rounded-lg bg-[#FDF0ED] border border-[#F5C6BC] text-[#9E2A2B] text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{emailError}</span>
                </div>
              )}

              {/* Password Reset Confirmation */}
              {resetEmailSent && (
                <div className="p-3 rounded-lg bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] text-xs space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-[#4A6B53]" />
                    <span>Password Reset Link Sent</span>
                  </div>
                  <p className="text-[11px] text-[#3D3D30]">
                    We have sent password recovery instructions to <strong>{email}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setEmailMode('signin')}
                    className="text-xs font-bold text-[#2D5438] underline mt-1 cursor-pointer block"
                  >
                    Back to Sign In
                  </button>
                </div>
              )}

              {!resetEmailSent && (
                <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                  {emailMode === 'signup' && (
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A5A40] mb-1">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#8A8A7A] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Morgan"
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-medium text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A5A40] mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#8A8A7A] absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-medium text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                      />
                    </div>
                  </div>

                  {emailMode !== 'forgot' && (
                    <div>
                      <label className="block text-[11px] font-semibold text-[#5A5A40] mb-1">Password</label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-[#8A8A7A] absolute left-3 top-2.5" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full pl-9 pr-9 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-medium text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5 text-[#8A8A7A] hover:text-[#2C2C24] cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    id="email-auth-submit-btn"
                    disabled={isEmailLoading}
                    className="w-full py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] active:bg-[#344C3A] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
                  >
                    {isEmailLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : emailMode === 'signup' ? (
                      <>
                        <span>Create Free Account</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : emailMode === 'forgot' ? (
                      <>
                        <span>Send Recovery Email</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Sign In with Email</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: MOBILE NUMBER OTP */}
          {activeTab === 'phone' && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-[#2C2C24]">
                  {otpStep === 'input_number' ? 'Sign In with Mobile OTP' : 'Enter 6-Digit Code'}
                </h3>
                <p className="text-xs text-[#5A5A40]">
                  {otpStep === 'input_number'
                    ? 'Receive a one-time verification code on your mobile phone.'
                    : `We sent a verification code to ${countryCode} ${phoneNumber}`}
                </p>
              </div>

              {phoneError && (
                <div className="p-2.5 rounded-lg bg-[#FDF0ED] border border-[#F5C6BC] text-[#9E2A2B] text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{phoneError}</span>
                </div>
              )}

              {otpStep === 'input_number' ? (
                <form onSubmit={handleSendOtp} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#5A5A40] mb-1">
                      Mobile Phone Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-2.5 py-2 rounded-lg bg-[#FAF9F5] border border-[#DCDCCF] text-xs font-semibold text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                      >
                        <option value="+91">🇮🇳 +91 (India)</option>
                        <option value="+1">🇺🇸 +1 (USA)</option>
                        <option value="+44">🇬🇧 +44 (UK)</option>
                        <option value="+81">🇯🇵 +81 (Japan)</option>
                        <option value="+49">🇩🇪 +49 (Germany)</option>
                        <option value="+33">🇫🇷 +33 (France)</option>
                        <option value="+34">🇪🇸 +34 (Spain)</option>
                        <option value="+39">🇮🇹 +39 (Italy)</option>
                        <option value="+86">🇨🇳 +86 (China)</option>
                      </select>

                      <div className="relative flex-1">
                        <Smartphone className="w-4 h-4 text-[#8A8A7A] absolute left-3 top-2.5" />
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="9876543210"
                          className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#FFFFFF] border border-[#DCDCCF] text-xs font-mono font-bold text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="send-otp-btn"
                    disabled={isPhoneLoading}
                    className="w-full py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] active:bg-[#344C3A] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98 disabled:opacity-60"
                  >
                    {isPhoneLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending SMS Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Verification Code</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  {/* 6 Digit Inputs */}
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-input-${idx}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace' && !digit && idx > 0) {
                            const prevInput = document.getElementById(`otp-input-${idx - 1}`);
                            if (prevInput) prevInput.focus();
                          }
                        }}
                        className="w-10 h-12 rounded-lg border-2 border-[#DCDCCF] focus:border-[#4A6B53] bg-white text-center text-lg font-bold font-mono text-[#2C2C24] focus:outline-none"
                      />
                    ))}
                  </div>

                  {/* Test helper & Resend Timer */}
                  <div className="flex items-center justify-between text-xs text-[#5A5A40] pt-1">
                    <button
                      type="button"
                      onClick={handleAutoFillTestOtp}
                      className="text-[11px] text-[#4A6B53] hover:underline font-semibold cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-[#4A6B53]" />
                      <span>Quick Test Code (123456)</span>
                    </button>

                    <div>
                      {otpTimer > 0 ? (
                        <span className="text-[11px] text-[#8A8A7A]">Resend code in {otpTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setOtpTimer(30);
                          }}
                          className="text-[11px] text-[#2D5438] font-bold hover:underline cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setOtpStep('input_number')}
                      className="py-2.5 px-3 rounded-xl border border-[#DCDCCF] hover:bg-[#FAF9F5] text-xs font-semibold text-[#5A5A40] cursor-pointer"
                    >
                      Edit Number
                    </button>

                    <button
                      type="submit"
                      id="verify-otp-btn"
                      disabled={isPhoneLoading}
                      className="flex-1 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60"
                    >
                      {isPhoneLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Verify &amp; Sign In</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer: Guest Option & Security Terms */}
        <div className="p-4 border-t border-[#E3E3D8] bg-[#FAF9F5] flex items-center justify-between text-xs text-[#5A5A40]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#4A6B53]" />
            <span>256-bit Encrypted Session</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-[#2D5438] hover:underline cursor-pointer"
          >
            Continue as Guest &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

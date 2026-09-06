import React, { useState, useEffect } from 'react';
import {
  X,
  Sparkles,
  CheckCircle2,
  Download,
  BookOpen,
  Calendar,
  Flame,
  Bot,
  FileText,
  Headphones,
  TrendingUp,
  Award,
  ArrowRight,
  Printer,
  Volume2,
  Search,
  Check,
  ShieldCheck,
  Zap,
  Globe,
  Share2,
  Lock,
  ChevronRight
} from 'lucide-react';
import {
  LanguageConfig,
  CEFRLevel,
  LeadMagnetProduct,
  LeadCaptureData,
  LearningObjective
} from '../types';
import {
  FREE_LEAD_PRODUCTS,
  TOP_100_WORDS_BY_LANG,
  GRAMMAR_CHEAT_SHEETS,
  NINETY_DAY_ROADMAP
} from '../data/leadMagnets';
import { speakText } from '../utils/audio';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageConfig;
  currentLevel: CEFRLevel;
  initialProductId?: string;
  onLaunchAssessment?: () => void;
  onLaunchChallenge?: () => void;
  onLaunchAiPartner?: () => void;
  onOpenPaymentModal?: (title?: string) => void;
}

const STORAGE_LEAD_KEY = 'linguaflow_captured_lead';

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({
  isOpen,
  onClose,
  language,
  currentLevel,
  initialProductId = 'top-100-words',
  onLaunchAssessment,
  onLaunchChallenge,
  onLaunchAiPartner,
  onOpenPaymentModal
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(initialProductId);
  
  // Lead state
  const [lead, setLead] = useState<LeadCaptureData | null>(() => {
    const saved = localStorage.getItem(STORAGE_LEAD_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  // Lead capture form fields
  const [name, setName] = useState(lead?.name || '');
  const [email, setEmail] = useState(lead?.email || '');
  const [countryCode, setCountryCode] = useState('+1');
  const [whatsAppNumber, setWhatsAppNumber] = useState(lead?.whatsApp ? lead.whatsApp.replace(/^\+\d+\s*/, '') : '');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(lead?.currentLevel || currentLevel);
  const [learningObjective, setLearningObjective] = useState<LearningObjective>(lead?.learningObjective || 'career');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [justUnlocked, setJustUnlocked] = useState(false);

  // 100-words interactive viewer state
  const [wordSearch, setWordSearch] = useState('');
  const [selectedWordCategory, setSelectedWordCategory] = useState<string>('all');
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Sync initial product if changed
  useEffect(() => {
    if (initialProductId) {
      setSelectedProductId(initialProductId);
    }
  }, [initialProductId]);

  if (!isOpen) return null;

  const currentProduct = FREE_LEAD_PRODUCTS.find((p) => p.id === selectedProductId) || FREE_LEAD_PRODUCTS[0];

  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!whatsAppNumber.trim() || whatsAppNumber.replace(/\D/g, '').length < 6) {
      setErrorMsg('Please enter your WhatsApp/Phone number.');
      return;
    }

    setIsSubmitting(true);

    const fullWhatsApp = `${countryCode} ${whatsAppNumber.trim()}`;

    const leadPayload: LeadCaptureData = {
      id: `lead-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      whatsApp: fullWhatsApp,
      languageId: language.id,
      languageName: language.name,
      currentLevel: selectedLevel,
      learningObjective,
      productId: currentProduct.id,
      productTitle: currentProduct.title,
      capturedAt: new Date().toISOString()
    };

    // Save locally
    localStorage.setItem(STORAGE_LEAD_KEY, JSON.stringify(leadPayload));
    setLead(leadPayload);

    // Also persist to server endpoint in background
    try {
      await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadPayload)
      });
    } catch (err) {
      console.warn('Lead capture server sync notice:', err);
    }

    setIsSubmitting(false);
    setJustUnlocked(true);
  };

  // Get word list for current language
  const wordList = TOP_100_WORDS_BY_LANG[language.id] || TOP_100_WORDS_BY_LANG.es;
  const filteredWords = wordList.filter((w) => {
    const matchesSearch =
      w.word.toLowerCase().includes(wordSearch.toLowerCase()) ||
      w.translation.toLowerCase().includes(wordSearch.toLowerCase());
    const matchesCategory = selectedWordCategory === 'all' || w.category === selectedWordCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(wordList.map((w) => w.category)))];
  const grammarData = GRAMMAR_CHEAT_SHEETS[language.id] || GRAMMAR_CHEAT_SHEETS.es;

  const handlePrintOrDownload = () => {
    window.print();
  };

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <Award className="w-5 h-5 text-[#4A6B53]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#C85A32]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#2D5438]" />;
      case 'Calendar': return <Calendar className="w-5 h-5 text-[#326B88]" />;
      case 'Bot': return <Bot className="w-5 h-5 text-[#6B4A88]" />;
      case 'FileText': return <FileText className="w-5 h-5 text-[#885B32]" />;
      case 'Download': return <Download className="w-5 h-5 text-[#3E5A45]" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-[#326B88]" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-[#4A6B53]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#C85A32]" />;
      default: return <Sparkles className="w-5 h-5 text-[#4A6B53]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-5xl my-8 bg-[#FAF9F5] rounded-2xl border border-[#E3E3D8] shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3E3D8] bg-[#F4F4EC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-xl shadow-2xs">
              🎁
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#2C2C24]">Free Language Learning Study Hub</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#E9F0EA] text-[#2D5438] text-xs font-bold border border-[#C5DAC8]">
                  100% Free
                </span>
              </div>
              <p className="text-xs text-[#5A5A40]">
                High-yield resources & diagnostic tools for <span className="font-semibold text-[#2D5438]">{language.name} ({language.nativeName})</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Sidebar: Product List */}
          <div className="lg:col-span-4 border-r border-[#E3E3D8] bg-[#FAF9F5] p-3 space-y-1.5 overflow-y-auto max-h-[75vh]">
            <div className="px-3 py-2 text-xs font-bold text-[#7A7A60] uppercase tracking-wider">
              10 Free Products
            </div>

            {FREE_LEAD_PRODUCTS.map((prod) => {
              const isSelected = prod.id === selectedProductId;
              return (
                <button
                  key={prod.id}
                  onClick={() => setSelectedProductId(prod.id)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'bg-[#E9F0EA] border-[#A8CDB0] shadow-2xs'
                      : 'bg-[#FAF9F5] border-transparent hover:border-[#E3E3D8] hover:bg-[#F4F4EC]'
                  }`}
                >
                  <div className="relative w-11 h-11 rounded-lg overflow-hidden border border-[#DCDCCF] shrink-0 bg-[#F4F4EC]">
                    {prod.imageUrl ? (
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-1.5">
                        {getProductIcon(prod.icon)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className="text-xs font-bold text-[#2C2C24] truncate">
                        {prod.number}. {prod.title}
                      </span>
                      <span className="text-[10px] font-semibold text-[#2D5438] px-1.5 py-0.2 rounded-full bg-[#FAF9F5] border border-[#C5DAC8] shrink-0">
                        {prod.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#6A6A50] line-clamp-1 leading-tight">
                      {prod.shortDescription}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Content Area: Either Lead Capture Form or Unlocked Product Viewer */}
          <div className="lg:col-span-8 p-6 bg-[#FAF9F5] overflow-y-auto max-h-[75vh]">
            
            {/* If lead has not been submitted yet */}
            {!lead ? (
              <div className="max-w-xl mx-auto space-y-6">
                
                {/* Product Preview Card */}
                <div className="rounded-2xl bg-[#F4F4EC] border border-[#E3E3D8] overflow-hidden shadow-xs">
                  {currentProduct.imageUrl && (
                    <div className="relative w-full h-36 overflow-hidden bg-[#1F2421]">
                      <img
                        src={currentProduct.imageUrl}
                        alt={currentProduct.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-[#E9F0EA]/90 text-[#2D5438] text-xs font-bold border border-[#C5DAC8] backdrop-blur-xs">
                          Free Resource #{currentProduct.number}
                        </span>
                        <span className="text-xs font-bold text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/20">
                          {currentProduct.estimatedValue} (Free Today)
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <h3 className="text-lg font-bold text-white drop-shadow-sm">
                          {currentProduct.title}
                        </h3>
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    {!currentProduct.imageUrl && (
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-[#E9F0EA] text-[#2D5438] text-xs font-bold border border-[#C5DAC8]">
                          Free Resource #{currentProduct.number}
                        </span>
                        <span className="text-xs font-bold text-[#885B32] bg-[#FDF6EE] px-2 py-0.5 rounded border border-[#F3DFC8]">
                          {currentProduct.estimatedValue} (Free Today)
                        </span>
                      </div>
                    )}

                    {!currentProduct.imageUrl && (
                      <h3 className="text-xl font-bold text-[#2C2C24] mb-2">
                        {currentProduct.title}
                      </h3>
                    )}

                    <p className="text-sm text-[#5A5A40] mb-4">
                      {currentProduct.shortDescription}
                    </p>

                    <div className="space-y-2">
                      <div className="text-xs font-bold text-[#2C2C24] uppercase tracking-wide">
                        What's Included:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentProduct.keyHighlights.map((hl, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#3D3D30]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lead Form */}
                <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8] shadow-xs">
                  <div className="text-center mb-5">
                    <h4 className="text-base font-bold text-[#2C2C24]">
                      Unlock Instant Free Access to all 10 Resources
                    </h4>
                    <p className="text-xs text-[#6A6A50] mt-1">
                      Enter your details below to get immediate access and receive your study kit on WhatsApp &amp; Email.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 mb-4 rounded-xl bg-[#FDF2F2] border border-[#F5C2C2] text-xs text-[#991B1B]">
                      {errorMsg}
                    </div>
                  )}

                  <form onSubmit={handleCaptureSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3D3D30] mb-1">
                          Your Full Name <span className="text-[#C85A32]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Johnson"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCDCCF] bg-[#FAF9F5] text-sm text-[#2C2C24] placeholder-[#9A9A80] focus:outline-hidden focus:border-[#4A6B53] focus:ring-2 focus:ring-[#4A6B53]/20"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3D3D30] mb-1">
                          Email Address <span className="text-[#C85A32]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCDCCF] bg-[#FAF9F5] text-sm text-[#2C2C24] placeholder-[#9A9A80] focus:outline-hidden focus:border-[#4A6B53] focus:ring-2 focus:ring-[#4A6B53]/20"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-xs font-semibold text-[#3D3D30] mb-1">
                        WhatsApp / Phone Number <span className="text-[#C85A32]">*</span>
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="px-3 py-2.5 rounded-xl border border-[#DCDCCF] bg-[#FAF9F5] text-xs font-semibold text-[#2C2C24] shrink-0"
                        >
                          <option value="+1">🇺🇸 +1 (US/CA)</option>
                          <option value="+91">🇮🇳 +91 (IN)</option>
                          <option value="+44">🇬🇧 +44 (UK)</option>
                          <option value="+49">🇩🇪 +49 (DE)</option>
                          <option value="+33">🇫🇷 +33 (FR)</option>
                          <option value="+34">🇪🇸 +34 (ES)</option>
                          <option value="+39">🇮🇹 +39 (IT)</option>
                          <option value="+55">🇧🇷 +55 (BR)</option>
                          <option value="+81">🇯🇵 +81 (JP)</option>
                          <option value="+82">🇰🇷 +82 (KR)</option>
                          <option value="+86">🇨🇳 +86 (CN)</option>
                          <option value="+971">🇦🇪 +971 (UAE)</option>
                          <option value="+61">🇦🇺 +61 (AU)</option>
                        </select>
                        <input
                          type="tel"
                          required
                          value={whatsAppNumber}
                          onChange={(e) => setWhatsAppNumber(e.target.value)}
                          placeholder="e.g. 98765 43210"
                          className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#DCDCCF] bg-[#FAF9F5] text-sm text-[#2C2C24] placeholder-[#9A9A80] focus:outline-hidden focus:border-[#4A6B53] focus:ring-2 focus:ring-[#4A6B53]/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Current Level */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3D3D30] mb-1">
                          Current Level in {language.name}
                        </label>
                        <select
                          value={selectedLevel}
                          onChange={(e) => setSelectedLevel(e.target.value as CEFRLevel)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCDCCF] bg-[#FAF9F5] text-sm text-[#2C2C24]"
                        >
                          <option value="A1">A1 - Complete Beginner</option>
                          <option value="A2">A2 - Elementary / Basic</option>
                          <option value="B1">B1 - Intermediate</option>
                          <option value="B2">B2 - Upper Intermediate</option>
                          <option value="C1">C1 - Advanced / Fluent</option>
                        </select>
                      </div>

                      {/* Learning Objective */}
                      <div>
                        <label className="block text-xs font-semibold text-[#3D3D30] mb-1">
                          Primary Learning Objective
                        </label>
                        <select
                          value={learningObjective}
                          onChange={(e) => setLearningObjective(e.target.value as LearningObjective)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCDCCF] bg-[#FAF9F5] text-sm text-[#2C2C24]"
                        >
                          <option value="career">💼 Career Growth &amp; Job Promotion</option>
                          <option value="travel">✈️ Travel &amp; Cultural Immersion</option>
                          <option value="university">🎓 University Studies / Study Abroad</option>
                          <option value="relocation">🏡 Relocation, Visa &amp; PR</option>
                          <option value="exam_prep">📝 Official Certification / Exam</option>
                          <option value="hobby">🌟 Personal Passion &amp; Hobby</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3 px-5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-bold text-sm transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Unlocking Resources...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Get Free Access to All 10 Resources</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* UNLOCKED VIEW: Product Specific Viewers */
              <div className="space-y-6">
                
                {/* User Welcome Banner */}
                <div className="p-4 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2D5438]" />
                      <span className="text-xs font-bold text-[#2D5438]">
                        Welcome {lead.name}! All 10 Free Products are Unlocked.
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5A5A40] mt-0.5">
                      Language: <span className="font-semibold">{language.name}</span> • Level: <span className="font-semibold">{lead.currentLevel}</span> • Goal: <span className="capitalize font-semibold">{lead.learningObjective}</span>
                    </p>
                  </div>

                  <button
                    onClick={handlePrintOrDownload}
                    className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#C5DAC8] text-[#2D5438] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#DCE7DD] transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print / Save PDF</span>
                  </button>
                </div>

                {/* PRODUCT 1: Language Level Test */}
                {selectedProductId === 'level-test' && (
                  <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8] text-center space-y-4">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-2xl">
                        🎓
                      </div>
                      <h3 className="text-xl font-bold text-[#2C2C24]">
                        5-Minute Comprehensive AI Language Assessment
                      </h3>
                      <p className="text-sm text-[#5A5A40] max-w-lg mx-auto">
                        Evaluate all 6 key skills: Vocabulary, Grammar, Reading, Listening, Writing &amp; Speaking. Get your certified CEFR level and exact study hours needed to reach the next milestone.
                      </p>

                      <div className="flex justify-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            onClose();
                            if (onLaunchAssessment) onLaunchAssessment();
                          }}
                          className="px-6 py-3 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-bold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Start 5-Minute Assessment Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRODUCT 2: 7-Day Speaking Challenge */}
                {selectedProductId === 'speaking-challenge' && (
                  <div className="space-y-4">
                    <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8] text-center space-y-4">
                      <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FDF2EC] border border-[#F5D5C6] flex items-center justify-center text-2xl">
                        🔥
                      </div>
                      <h3 className="text-xl font-bold text-[#2C2C24]">
                        7-Day Conversational Speaking Challenge
                      </h3>
                      <p className="text-sm text-[#5A5A40] max-w-lg mx-auto">
                        7 structured spoken missions designed to break hesitation and build fluent spontaneous reflexes in {language.name}.
                      </p>

                      <div className="flex justify-center gap-3 pt-2">
                        <button
                          onClick={() => {
                            onClose();
                            if (onLaunchChallenge) onLaunchChallenge();
                          }}
                          className="px-6 py-3 rounded-xl bg-[#C85A32] hover:bg-[#B24E2A] text-[#FAF9F5] font-bold text-sm transition-all shadow-xs flex items-center gap-2 cursor-pointer"
                        >
                          <Flame className="w-4 h-4" />
                          <span>Launch 7-Day Challenge Dashboard</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRODUCT 3: 100 Most Important Words */}
                {selectedProductId === 'top-100-words' && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold text-[#2C2C24]">
                          100 High-Yield {language.name} Words
                        </h3>
                        <p className="text-xs text-[#6A6A50]">
                          The foundational core vocabulary that covers 50%+ of daily spoken encounters.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setFlashcardMode(!flashcardMode)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                            flashcardMode
                              ? 'bg-[#4A6B53] text-[#FAF9F5] border-[#3E5A45]'
                              : 'bg-[#FAF9F5] text-[#2C2C24] border-[#DCDCCF] hover:bg-[#EBEBE0]'
                          }`}
                        >
                          {flashcardMode ? '📋 List View' : '🃏 Flashcard Mode'}
                        </button>
                      </div>
                    </div>

                    {/* Search & Filters */}
                    {!flashcardMode && (
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[200px]">
                          <Search className="w-4 h-4 text-[#8A8A70] absolute left-3 top-2.5" />
                          <input
                            type="text"
                            value={wordSearch}
                            onChange={(e) => setWordSearch(e.target.value)}
                            placeholder={`Search ${language.name} or English words...`}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DCDCCF] bg-[#FAF9F5] text-xs text-[#2C2C24] placeholder-[#8A8A70]"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setSelectedWordCategory(cat)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer ${
                                selectedWordCategory === cat
                                  ? 'bg-[#4A6B53] text-[#FAF9F5]'
                                  : 'bg-[#EBEBE0] text-[#5A5A40] hover:text-[#2C2C24]'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Flashcard View */}
                    {flashcardMode ? (
                      <div className="p-8 rounded-2xl bg-[#F4F4EC] border border-[#E3E3D8] text-center max-w-md mx-auto space-y-4">
                        <div className="text-xs font-bold text-[#7A7A60] uppercase">
                          Card {flashcardIndex + 1} of {filteredWords.length}
                        </div>

                        <div
                          onClick={() => setIsFlipped(!isFlipped)}
                          className="min-h-[160px] p-6 rounded-xl bg-[#FAF9F5] border border-[#DCDCCF] shadow-sm flex flex-col items-center justify-center cursor-pointer transition-all hover:border-[#4A6B53]"
                        >
                          {!isFlipped ? (
                            <>
                              <span className="text-2xl font-bold text-[#2C2C24] mb-2">
                                {filteredWords[flashcardIndex]?.word}
                              </span>
                              <span className="text-xs text-[#7A7A60]">
                                (Click to reveal English meaning)
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="text-xl font-bold text-[#2D5438] mb-1">
                                {filteredWords[flashcardIndex]?.translation}
                              </span>
                              <span className="text-xs text-[#5A5A40] italic">
                                {filteredWords[flashcardIndex]?.exampleSentence}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          <button
                            onClick={() => {
                              setIsFlipped(false);
                              setFlashcardIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#DCDCCF] text-xs font-semibold text-[#2C2C24] cursor-pointer"
                          >
                            Previous
                          </button>

                          <button
                            onClick={() => {
                              if (filteredWords[flashcardIndex]) {
                                speakText({ text: filteredWords[flashcardIndex].word, langCode: language.speechCode });
                              }
                            }}
                            className="p-2 rounded-lg bg-[#E9F0EA] border border-[#C5DAC8] text-[#2D5438] cursor-pointer"
                            title="Play Native Audio"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => {
                              setIsFlipped(false);
                              setFlashcardIndex((prev) => (prev < filteredWords.length - 1 ? prev + 1 : 0));
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#FAF9F5] border border-[#DCDCCF] text-xs font-semibold text-[#2C2C24] cursor-pointer"
                          >
                            Next Card
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Table / List View */
                      <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1">
                        {filteredWords.map((item, idx) => (
                          <div
                            key={item.id || idx}
                            className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] hover:border-[#C5DAC8] transition-all flex items-center justify-between gap-3"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-[#2C2C24] text-sm">{item.word}</span>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EBEBE0] text-[#5A5A40]">
                                  {item.partOfSpeech}
                                </span>
                              </div>
                              <div className="text-xs text-[#2D5438] font-medium mt-0.5">
                                {item.translation}
                              </div>
                              {item.exampleSentence && (
                                <div className="text-[11px] text-[#6A6A50] italic mt-1">
                                  "{item.exampleSentence}" — {item.exampleTranslation}
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => speakText({ text: item.word, langCode: language.speechCode })}
                              className="p-2 rounded-lg bg-[#E9F0EA] text-[#2D5438] hover:bg-[#DCE7DD] border border-[#C5DAC8] transition-colors cursor-pointer shrink-0"
                              title="Listen"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* PRODUCT 6: Grammar Cheat Sheet */}
                {selectedProductId === 'grammar-cheat-sheet' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#2C2C24]">
                          {grammarData.languageName} Grammar Cheat Sheet
                        </h3>
                        <p className="text-xs text-[#6A6A50]">
                          High-yield grammatical formulas, tense conjugations &amp; common trap avoidance.
                        </p>
                      </div>

                      <button
                        onClick={handlePrintOrDownload}
                        className="px-3 py-1.5 rounded-lg bg-[#4A6B53] text-[#FAF9F5] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#3E5A45] cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export PDF</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {grammarData.sections.map((sec, sIdx) => (
                        <div key={sIdx} className="p-4 rounded-xl bg-[#F4F4EC] border border-[#E3E3D8] space-y-3">
                          <h4 className="font-bold text-sm text-[#2C2C24]">{sec.title}</h4>
                          <p className="text-xs text-[#5A5A40]">{sec.description}</p>
                          
                          <div className="space-y-2">
                            {sec.rules.map((r, rIdx) => (
                              <div key={rIdx} className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E3E3D8] text-xs space-y-1">
                                <div className="font-bold text-[#2D5438]">{r.concept}</div>
                                <div className="text-[#3D3D30] font-mono text-[11px]">{r.rule}</div>
                                <div className="text-[#5A5A40] italic">
                                  Ex: <span className="font-semibold text-[#2C2C24]">{r.example}</span> ({r.translation})
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}

                      {/* Common Pitfalls */}
                      <div className="p-4 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] space-y-3">
                        <h4 className="font-bold text-sm text-[#885B32] flex items-center gap-2">
                          <span>⚠️ Top Learner Pitfalls to Avoid</span>
                        </h4>
                        <div className="space-y-2">
                          {grammarData.commonPitfalls.map((p, pIdx) => (
                            <div key={pIdx} className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E3E3D8] text-xs space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[#991B1B] line-through font-semibold">❌ {p.mistake}</span>
                                <span className="text-[#15803D] font-bold">✅ {p.correction}</span>
                              </div>
                              <p className="text-[11px] text-[#6A6A50]">{p.explanation}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PRODUCT 9: 90-Day Roadmap */}
                {selectedProductId === 'roadmap-90-days' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#2C2C24]">
                          Learn {language.name} in 90 Days Roadmap
                        </h3>
                        <p className="text-xs text-[#6A6A50]">
                          A 3-phase structured framework from beginner to confident B2 conversationalist.
                        </p>
                      </div>

                      <button
                        onClick={handlePrintOrDownload}
                        className="px-3 py-1.5 rounded-lg bg-[#4A6B53] text-[#FAF9F5] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#3E5A45] cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Roadmap</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {NINETY_DAY_ROADMAP.map((phase) => (
                        <div key={phase.phase} className="p-4 rounded-xl bg-[#F4F4EC] border border-[#E3E3D8] space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-sm text-[#2C2C24]">{phase.title}</h4>
                            <span className="text-xs font-bold text-[#2D5438] bg-[#E9F0EA] px-2 py-0.5 rounded border border-[#C5DAC8]">
                              {phase.daysRange} • {phase.targetCEFR}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {phase.weeklyBreakdown.map((wb, wIdx) => (
                              <div key={wIdx} className="p-3 rounded-lg bg-[#FAF9F5] border border-[#E3E3D8] text-xs space-y-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-[#2D5438]">{wb.week}</span>
                                  <span className="text-[10px] text-[#7A7A60] font-mono">+{wb.vocabCount} words</span>
                                </div>
                                <p className="font-medium text-[#2C2C24]">{wb.focus}</p>
                                <p className="text-[11px] text-[#5A5A40]">Grammar: {wb.grammarTopic}</p>
                                <p className="text-[11px] text-[#885B32] font-semibold">🎯 {wb.speakingMilestone}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fallback for other products */}
                {['learning-plan-30day', 'ai-conversation-partner', 'vocabulary-pdf', 'pronunciation-test', 'exam-prep-packs'].includes(selectedProductId) && (
                  <div className="p-6 rounded-2xl bg-[#F4F4EC] border border-[#E3E3D8] text-center space-y-4">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF9F5] border border-[#C5DAC8] flex items-center justify-center text-2xl shadow-xs">
                      {getProductIcon(currentProduct.icon)}
                    </div>
                    <h3 className="text-xl font-bold text-[#2C2C24]">
                      {currentProduct.title} for {language.name}
                    </h3>
                    <p className="text-sm text-[#5A5A40] max-w-lg mx-auto">
                      {currentProduct.shortDescription}
                    </p>

                    <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] max-w-md mx-auto text-left space-y-2">
                      <div className="text-xs font-bold text-[#2C2C24] uppercase tracking-wider">
                        Available in this kit:
                      </div>
                      {currentProduct.keyHighlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-[#3D3D30]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#4A6B53] shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap justify-center gap-3 pt-2">
                      <button
                        onClick={handlePrintOrDownload}
                        className="px-5 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-bold text-xs flex items-center gap-2 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download Complete Study Material</span>
                      </button>

                      {onOpenPaymentModal && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenPaymentModal();
                          }}
                          className="px-5 py-2.5 rounded-xl bg-[#FAF9F5] hover:bg-[#EBEBE0] text-[#2C2C24] font-bold text-xs border border-[#DCDCCF] flex items-center gap-2 cursor-pointer"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#4A6B53]" />
                          <span>Unlock Lifetime Complete Course (Rs. 499/-)</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

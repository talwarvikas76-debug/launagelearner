import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, ArrowRight, CheckCircle2, MessageSquare, Headphones, Globe2 } from 'lucide-react';
import { LanguageConfig } from '../types';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { speakText, stopAllSpeech } from '../utils/audio';

export interface LanguageTheme {
  id: string;
  name: string;
  flag: string;
  headline: string;
  nativeSlogan: string;
  badge: string;
  description: string;
  featurePills: string[];
  imageUrl: string;
  imageAlt: string;
  audioSample: string;
  speechCode: string;
}

const LANGUAGE_THEMES: Record<string, LanguageTheme> = {
  en: {
    id: 'en',
    name: 'English',
    flag: '🇬🇧',
    headline: 'Speak English Confidently',
    nativeSlogan: 'Speak fluently and naturally',
    badge: 'ENGLISH IMMERSION SPOTLIGHT',
    description: 'Master authentic conversations with native British and American AI personas. Navigate London cafés, New York job interviews, and everyday conversations with real-time feedback.',
    featurePills: ['London & New York Scenarios', 'Idioms & Phrasal Verbs Coach', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'London iconic architecture and street atmosphere - Speak English Confidently',
    audioSample: "Hello! Ready to speak English fluently and confidently? Let's practice together!",
    speechCode: 'en-US',
  },
  de: {
    id: 'de',
    name: 'German',
    flag: '🇩🇪',
    headline: 'Speak German Confidently',
    nativeSlogan: 'Sprich fließend und natürlich',
    badge: 'GERMAN IMMERSION SPOTLIGHT',
    description: 'Real-world conversations in authentic German with native AI personas. Order at Berlin cafés, prepare for job interviews in Munich, and master grammar naturally with zero fear.',
    featurePills: ['Berlin Café & Munich Scenarios', 'Der, Die, Das & Cases Coach', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1599946347371-68eb71b16afc?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Berlin architecture and lively café atmosphere - Speak German Confidently',
    audioSample: 'Hallo! Bereit, fließend und selbstbewusst Deutsch zu sprechen? Lass uns gemeinsam üben!',
    speechCode: 'de-DE',
  },
  es: {
    id: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    headline: 'Speak Spanish Confidently',
    nativeSlogan: 'Habla con fluidez y naturalidad',
    badge: 'SPANISH IMMERSION SPOTLIGHT',
    description: 'Immerse yourself in authentic Spanish with native conversational partners. Order tapas in Madrid, chat in Barcelona, and master subjunctive verb moods naturally.',
    featurePills: ['Madrid & Barcelona Scenarios', 'Subjunctive & Ser/Estar Coach', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Madrid city and vibrant street life - Speak Spanish Confidently',
    audioSample: '¡Hola! ¿Listo para hablar español con total confianza? ¡Vamos a practicar juntos!',
    speechCode: 'es-ES',
  },
  fr: {
    id: 'fr',
    name: 'French',
    flag: '🇫🇷',
    headline: 'Speak French Confidently',
    nativeSlogan: 'Parlez avec aisance et naturel',
    badge: 'FRENCH IMMERSION SPOTLIGHT',
    description: 'Speak French with authentic flair and flawless pronunciation. Order croissants in Paris, discuss culture in Lyon, and master subtle liaisons with instant feedback.',
    featurePills: ['Paris Bistro & Lyon Scenarios', 'Liaison & Accent Coaching', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Parisian street and café atmosphere - Speak French Confidently',
    audioSample: 'Bonjour ! Prêt à parler français avec fluidité et assurance ? Entraînons-nous ensemble !',
    speechCode: 'fr-FR',
  },
  ja: {
    id: 'ja',
    name: 'Japanese',
    flag: '🇯🇵',
    headline: 'Speak Japanese Confidently',
    nativeSlogan: '自然に、自信を持って日本語を話そう',
    badge: 'JAPANESE IMMERSION SPOTLIGHT',
    description: 'Engage in realistic Japanese roleplays with native personas. Order ramen in Shibuya, navigate Kyoto stations, and master polite Keigo and natural particles.',
    featurePills: ['Tokyo Izakaya & Kyoto Scenarios', 'Polite Keigo & Particles Coach', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Kyoto historic street and architecture - Speak Japanese Confidently',
    audioSample: 'こんにちは！自信を持って自然な日本語を話す準備はできましたか？一緒に練習しましょう！',
    speechCode: 'ja-JP',
  },
  it: {
    id: 'it',
    name: 'Italian',
    flag: '🇮🇹',
    headline: 'Speak Italian Confidently',
    nativeSlogan: 'Parla con naturalezza e sicurezza',
    badge: 'ITALIAN IMMERSION SPOTLIGHT',
    description: 'Experience spontaneous Italian conversation. Order an espresso in Rome, explore Florence markets, and master expressive idioms and past tenses.',
    featurePills: ['Rome Trattoria & Milan Scenarios', 'Passato Prossimo & Idioms', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Rome historic piazza and café - Speak Italian Confidently',
    audioSample: 'Ciao! Sei pronto a parlare italiano con sicurezza e naturalezza? Esercitiamoci insieme!',
    speechCode: 'it-IT',
  },
  zh: {
    id: 'zh',
    name: 'Mandarin',
    flag: '🇨🇳',
    headline: 'Speak Mandarin Confidently',
    nativeSlogan: '流利自如地讲中文',
    badge: 'MANDARIN IMMERSION SPOTLIGHT',
    description: 'Break through tone anxiety and speak Mandarin naturally. Order dim sum in Shanghai, bargain in Beijing markets, and master pinyin tones with real-time AI.',
    featurePills: ['Beijing & Shanghai Scenarios', 'Tones & Pinyin Fluency Coach', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Traditional and modern architecture - Speak Mandarin Confidently',
    audioSample: '你好！准备好自信流利地说中文了吗？让我们一起来练习吧！',
    speechCode: 'zh-CN',
  },
  pt: {
    id: 'pt',
    name: 'Portuguese',
    flag: '🇵🇹',
    headline: 'Speak Portuguese Confidently',
    nativeSlogan: 'Fale com fluência e naturalidade',
    badge: 'PORTUGUESE IMMERSION SPOTLIGHT',
    description: 'Speak Portuguese with natural rhythm and confidence. Order pastéis de nata in Lisbon, chat on Rio beaches, and perfect your open vowels and daily idioms.',
    featurePills: ['Lisbon & Rio Scenarios', 'Pronunciation & Rhythm Coach', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1513677785800-9df79ae4b10b?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Lisbon scenic streets and tram - Speak Portuguese Confidently',
    audioSample: 'Olá! Pronto para falar português com total confiança? Vamos praticar juntos!',
    speechCode: 'pt-BR',
  },
  ko: {
    id: 'ko',
    name: 'Korean',
    flag: '🇰🇷',
    headline: 'Speak Korean Confidently',
    nativeSlogan: '자연스럽고 자신 있게 한국어로 말해요',
    badge: 'KOREAN IMMERSION SPOTLIGHT',
    description: 'Step directly into Seoul life. Order street food in Hongdae, talk with K-drama nuance, and master honorific levels and polite conversation.',
    featurePills: ['Seoul Café & Hongdae Scenarios', 'Honorifics & Particles Coach', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Seoul city and lively modern street - Speak Korean Confidently',
    audioSample: '안녕하세요! 자신 있고 자연스럽게 한국어로 대화할 준비 되셨나요? 함께 연습해 봐요!',
    speechCode: 'ko-KR',
  },
  ar: {
    id: 'ar',
    name: 'Arabic',
    flag: '🇸🇦',
    headline: 'Speak Arabic Confidently',
    nativeSlogan: 'تحدث بثقة وطلاقة',
    badge: 'ARABIC IMMERSION SPOTLIGHT',
    description: 'Speak Arabic with clarity and poise. Navigate bustling souks in Cairo, conduct business in Dubai, and master expressive conversation with AI.',
    featurePills: ['Cairo & Dubai Scenarios', 'Modern Standard & Pronunciation', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Arabic architecture and city - Speak Arabic Confidently',
    audioSample: 'مرحباً! هل أنت مستعد للتحدث باللغة العربية بثقة وطلاقة؟ دعنا نتمرن معاً!',
    speechCode: 'ar-SA',
  },
  hi: {
    id: 'hi',
    name: 'Hindi',
    flag: '🇮🇳',
    headline: 'Speak Hindi Confidently',
    nativeSlogan: 'आत्मविश्वास और सहजता से हिन्दी बोलें',
    badge: 'HINDI IMMERSION SPOTLIGHT',
    description: 'Converse naturally in Hindi for travel, family, and business. Order chai in Delhi, navigate local markets in Jaipur, and build effortless fluency.',
    featurePills: ['Delhi & Mumbai Scenarios', 'Colloquial & Everyday Fluency', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Heritage architecture and streets - Speak Hindi Confidently',
    audioSample: 'नमस्ते! क्या आप आत्मविश्वास और सहजता से हिन्दी बोलने के लिए तैयार हैं? चलिए अभ्यास करते हैं!',
    speechCode: 'hi-IN',
  },
};

interface LanguageSpotlightBannerProps {
  currentLanguage?: LanguageConfig;
  onSelectLanguage?: (lang: LanguageConfig) => void;
  onStartScenario?: () => void;
  // Legacy props for compatibility
  onSelectGerman?: () => void;
  isCurrentLanguageGerman?: boolean;
}

export const LanguageSpotlightBanner: React.FC<LanguageSpotlightBannerProps> = ({
  currentLanguage,
  onSelectLanguage,
  onStartScenario,
  onSelectGerman,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Determine current active language (default to English if not provided)
  const activeLang = currentLanguage || SUPPORTED_LANGUAGES.find((l) => l.id === 'en') || SUPPORTED_LANGUAGES[0];

  // Lookup theme or fallback dynamically
  const theme: LanguageTheme = LANGUAGE_THEMES[activeLang.id] || {
    id: activeLang.id,
    name: activeLang.name,
    flag: activeLang.flag,
    headline: `Speak ${activeLang.name} Confidently`,
    nativeSlogan: activeLang.nativeName || 'Speak fluently and naturally',
    badge: `${activeLang.name.toUpperCase()} IMMERSION SPOTLIGHT`,
    description: `Real-world conversations in authentic ${activeLang.name} with native AI personas. Build spontaneous confidence, improve pronunciation, and speak naturally.`,
    featurePills: [`${activeLang.name} Scenarios`, 'Grammar & Vocabulary Coach', 'Real-Time Voice AI'],
    imageUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=85',
    imageAlt: `${activeLang.name} cultural atmosphere - Speak ${activeLang.name} Confidently`,
    audioSample: activeLang.greeting,
    speechCode: activeLang.speechCode,
  };

  // Stop any active audio playback when the selected language changes
  useEffect(() => {
    stopAllSpeech();
    setIsPlayingAudio(false);
  }, [activeLang.id]);

  const handlePlaySample = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) {
      stopAllSpeech();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    speakText({
      text: theme.audioSample,
      langCode: theme.speechCode,
      voiceName: activeLang.defaultVoice,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleAction = () => {
    if (onStartScenario) {
      onStartScenario();
    } else if (onSelectGerman) {
      onSelectGerman();
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      {/* Container with High-Resolution Photographic Image and Text Overlay */}
      <div 
        id="language-confidently-banner"
        className="relative w-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.14)] border border-[#E8E8DF] group bg-[#1F2421]"
      >
        {/* Photographic Background Image: Adapts Automatically to the Selected Language */}
        <img
          key={theme.id}
          src={theme.imageUrl}
          alt={theme.imageAlt}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out animate-fadeIn"
        />

        {/* Deep Cinematic Overlay Gradients for Optimal Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />

        {/* In-flow Primary Text Overlay Content with Guaranteed Responsive Clearance */}
        <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[460px] sm:min-h-[500px] text-left gap-6 sm:gap-8">
          
          {/* Top Bar on Image: Country Flag, Immersion Badge & Audio Preview */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wide shadow-sm">
              <span className="text-base">{theme.flag}</span>
              <span>{theme.badge}</span>
              <span className="text-emerald-400 font-mono text-[11px]">• CEFR A1 - C1</span>
            </div>

            {/* Native Audio Preview Button on Overlay */}
            <button
              type="button"
              onClick={handlePlaySample}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full backdrop-blur-md border text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95 ${
                isPlayingAudio
                  ? 'bg-emerald-500/90 border-emerald-400 text-white shadow-emerald-500/30 ring-2 ring-emerald-400/40'
                  : 'bg-black/40 hover:bg-black/60 border-white/20 text-white'
              }`}
              title={isPlayingAudio ? 'Click to stop sample audio' : `Click to hear native ${theme.name} pronunciation`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4 text-white animate-pulse" />
                  <span>Stop Audio ({theme.name})</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Listen in {theme.name}</span>
                </>
              )}
            </button>
          </div>

          {/* Center / Hero Overlay Text - Changes Automatically on Language Selection */}
          <div className="max-w-2xl space-y-3.5 my-auto py-2">
            {/* Distinctive Subtitle Tag */}
            <div className="text-emerald-400 font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>{theme.nativeSlogan}</span>
            </div>

            {/* The Dynamic Text Overlay: "Speak [Language] Confidently" */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.12] drop-shadow-md">
              {theme.headline}
            </h2>

            {/* Subtitle / Descriptive Copy in Overlay */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl font-normal drop-shadow-sm">
              {theme.description}
            </p>

            {/* Feature Pills Overlay */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {theme.featurePills.map((pill, idx) => (
                <div key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 text-xs text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{pill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Area: Action Buttons & Quick Language Switcher */}
          <div className="pt-4 border-t border-white/15 space-y-4">
            
            {/* Action Buttons: Fully Framed with Clear Bounds */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                id="language-start-speaking-btn"
                onClick={handleAction}
                className="flex-shrink-0 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#1F2421] font-extrabold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl active:scale-98 cursor-pointer flex items-center justify-center gap-2.5 group/btn"
              >
                <MessageSquare className="w-4 h-4 text-[#1F2421] shrink-0" />
                <span className="whitespace-nowrap">Practice {theme.name} Scenarios</span>
                <ArrowRight className="w-4 h-4 text-[#1F2421] shrink-0 group-hover/btn:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handlePlaySample}
                className={`flex-shrink-0 px-5 py-3.5 sm:py-4 rounded-xl backdrop-blur-md border font-bold text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-sm active:scale-98 ${
                  isPlayingAudio
                    ? 'bg-emerald-600/90 border-emerald-400 text-white ring-2 ring-emerald-400/50 shadow-lg'
                    : 'bg-white/15 hover:bg-white/25 border-white/25 text-white'
                }`}
                title={isPlayingAudio ? 'Click to stop audio sample' : `Try authentic ${theme.name} voice sample`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4 text-white shrink-0 animate-pulse" />
                    <span className="whitespace-nowrap">Stop {theme.name} Audio</span>
                  </>
                ) : (
                  <>
                    <Headphones className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="whitespace-nowrap">Try {theme.name} Voice Sample</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Interactive Language Switcher Bar on the Banner */}
            {onSelectLanguage && (
              <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-thin">
                <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider shrink-0 flex items-center gap-1">
                  <Globe2 className="w-3 h-3 text-emerald-400" />
                  <span>Switch Language:</span>
                </span>
                {SUPPORTED_LANGUAGES.map((lang) => {
                  const isSelected = lang.id === activeLang.id;
                  return (
                    <button
                      key={lang.id}
                      type="button"
                      onClick={() => {
                        stopAllSpeech();
                        setIsPlayingAudio(false);
                        onSelectLanguage(lang);
                      }}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-400 text-[#1F2421] font-extrabold shadow-sm scale-102'
                          : 'bg-white/10 hover:bg-white/20 text-white/90 border border-white/15 font-medium'
                      }`}
                      title={`Switch practice language to ${lang.name}`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  );
                })}
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

// Also export as GermanSpotlightBanner for backwards compatibility
export const GermanSpotlightBanner = LanguageSpotlightBanner;


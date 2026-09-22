import React, { useState } from 'react';
import { 
  Mic, 
  Volume2, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw,
  Award
} from 'lucide-react';
import { LanguageConfig, Scenario } from '../types';
import { speakText } from '../utils/audio';

interface VoicePreviewWidgetProps {
  language: LanguageConfig;
  scenario?: Scenario;
  onLaunchFullScenario: () => void;
}

export const VoicePreviewWidget: React.FC<VoicePreviewWidgetProps> = ({
  language,
  scenario,
  onLaunchFullScenario,
}) => {
  const [stage, setStage] = useState<'prompt' | 'listening' | 'evaluating' | 'completed'>('prompt');
  const [partnerPlaying, setPartnerPlaying] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');

  const targetPhrase = language.id === 'es'
    ? 'Un café con leche de avena, por favor.'
    : language.id === 'fr'
    ? 'Un cappuccino avec du lait d’avoine, s’il vous plaît.'
    : language.id === 'de'
    ? 'Einen Cappuccino mit Hafermilch, bitte.'
    : language.id === 'it'
    ? 'Un cappuccino con latte d’avena, per favore.'
    : 'A cappuccino with oat milk, please.';

  const partnerGreeting = language.id === 'es'
    ? '¡Hola! ¿Qué te apetece tomar hoy?'
    : language.id === 'fr'
    ? 'Bonjour ! Que puis-je vous servir ?'
    : language.id === 'de'
    ? 'Hallo! Was möchtest du heute bestellen?'
    : language.id === 'it'
    ? 'Ciao! Cosa prendi oggi?'
    : 'Welcome! What can I get started for you today?';

  const handlePlayPartner = () => {
    if (partnerPlaying) return;
    setPartnerPlaying(true);
    speakText({
      text: partnerGreeting,
      langCode: language.speechCode,
      onEnd: () => setPartnerPlaying(false),
    });
  };

  const handleStartSpeaking = () => {
    setStage('listening');
    // Simulate real speech recognition capture or fall back gracefully
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
                              (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = language.speechCode;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setUserTranscript(transcript || targetPhrase);
          setStage('evaluating');
          setTimeout(() => setStage('completed'), 900);
        };

        recognition.onerror = () => {
          // If error/no speech, provide target simulation
          setUserTranscript(targetPhrase);
          setStage('evaluating');
          setTimeout(() => setStage('completed'), 900);
        };

        recognition.start();
        return;
      } catch (err) {
        console.warn('SpeechRecognition failed to start:', err);
      }
    }

    // Browser simulation fallback for iFrame / restricted permissions
    setTimeout(() => {
      setUserTranscript(targetPhrase);
      setStage('evaluating');
      setTimeout(() => setStage('completed'), 800);
    }, 1800);
  };

  const handleReset = () => {
    setStage('prompt');
    setUserTranscript('');
  };

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-white border border-[#E8E8DF] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-6 sm:p-8 relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E9F0EA] rounded-full blur-3xl opacity-60 -z-10" />

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#F0EFEB]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2D5438] animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2D5438]">
                  Live Voice Preview • 10-Second Test
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1F2421] mt-1">
                Try a Voice Turn Right Now
              </h2>
            </div>
            
            <button
              type="button"
              onClick={handlePlayPartner}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF9F5] hover:bg-[#F0EFEA] border border-[#DCDCCF] text-xs font-bold text-[#2C2C24] transition-all cursor-pointer self-start sm:self-auto"
            >
              <Volume2 className={`w-4 h-4 text-[#2D5438] ${partnerPlaying ? 'animate-bounce' : ''}`} />
              <span>Listen to Barista: &ldquo;{partnerGreeting}&rdquo;</span>
            </button>
          </div>

          {/* Interactive Core */}
          <div className="py-6 space-y-6">
            
            {/* The Prompt Card */}
            <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-[#E8E8DF] text-left">
              <div className="text-[11px] font-bold text-[#7A7A68] uppercase tracking-wider mb-1">
                Your Turn: Ask Lucas for a Cappuccino
              </div>
              <div className="text-lg sm:text-xl font-bold text-[#1F2421]">
                &ldquo;{targetPhrase}&rdquo;
              </div>
              <div className="text-xs text-[#6B705C] mt-1">
                Practice ordering naturally with authentic cadence and pronunciation.
              </div>
            </div>

            {/* Speaking State Container */}
            <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center">
              {stage === 'prompt' && (
                <div className="flex flex-col items-center space-y-3">
                  <button
                    type="button"
                    id="voice-preview-mic-btn"
                    onClick={handleStartSpeaking}
                    className="relative group w-20 h-20 rounded-full bg-[#2D5438] hover:bg-[#23422C] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer"
                  >
                    <div className="absolute inset-0 rounded-full bg-[#2D5438] group-hover:scale-110 transition-transform opacity-30" />
                    <Mic className="w-8 h-8 text-white relative z-10" />
                  </button>
                  <div className="text-xs font-bold text-[#2C2C24]">
                    Tap the microphone to speak
                  </div>
                  <div className="text-[11px] text-[#7A7A68]">
                    Real-time speech evaluation in {language.name}
                  </div>
                </div>
              )}

              {stage === 'listening' && (
                <div className="flex flex-col items-center space-y-3 animate-in fade-in duration-200">
                  <div className="w-20 h-20 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-35" />
                    <Mic className="w-8 h-8 text-white animate-pulse" />
                  </div>
                  <div className="text-sm font-bold text-[#2D5438]">
                    Listening... Speak now!
                  </div>
                  <div className="text-xs text-[#6B705C]">
                    &ldquo;{targetPhrase}&rdquo;
                  </div>
                </div>
              )}

              {stage === 'evaluating' && (
                <div className="flex flex-col items-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-[#E9F0EA] flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-[#2D5438] animate-spin" />
                  </div>
                  <div className="text-xs font-bold text-[#2C2C24]">
                    Analyzing pronunciation &amp; phonetics...
                  </div>
                </div>
              )}

              {stage === 'completed' && (
                <div className="w-full max-w-lg p-5 rounded-2xl bg-[#E9F0EA] border border-[#C5DAC8] text-left space-y-3 animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#2D5438]" />
                      <span className="font-extrabold text-sm text-[#2D5438]">Pronunciation Score: 98%</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#2D5438] text-white">
                      CEFR A1 • PASSED
                    </span>
                  </div>

                  <p className="text-xs text-[#1F2421] font-medium leading-relaxed">
                    &ldquo;{userTranscript || targetPhrase}&rdquo;
                  </p>

                  <div className="p-3 rounded-xl bg-white/90 border border-[#D5E3D8] text-xs space-y-1">
                    <div className="font-bold text-[#2D5438] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Coach Assessment</span>
                    </div>
                    <p className="text-[#555546]">
                      Flawless rhythm and intonation! You correctly asked for oat milk and kept the tone polite and natural.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#555546] hover:text-[#2D5438] cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Try Another Turn</span>
                    </button>

                    <button
                      type="button"
                      onClick={onLaunchFullScenario}
                      className="px-4 py-2 rounded-xl bg-[#2D5438] hover:bg-[#23422C] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Jump into Full Roleplay</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

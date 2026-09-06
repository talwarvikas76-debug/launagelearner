import React, { useEffect, useState, useRef } from 'react';
import { 
  PhoneOff, 
  Mic, 
  MicOff, 
  Sparkles, 
  Volume2, 
  Languages, 
  Target 
} from 'lucide-react';
import { Scenario, LanguageConfig, CEFRLevel, ChatMessage } from '../types';
import { speakText, createSpeechRecognizer } from '../utils/audio';

interface LiveVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  scenario: Scenario;
  language: LanguageConfig;
  level: CEFRLevel;
  messages: ChatMessage[];
  onNewUserVoiceMessage: (text: string) => Promise<void>;
  isAITurn: boolean;
  activeObjectives: { id: string; description: string; completed: boolean }[];
}

export const LiveVoiceModal: React.FC<LiveVoiceModalProps> = ({
  isOpen,
  onClose,
  scenario,
  language,
  level,
  messages,
  onNewUserVoiceMessage,
  isAITurn,
  activeObjectives,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [manualSpeechText, setManualSpeechText] = useState('');
  const [isRecognitionSupported, setIsRecognitionSupported] = useState(true);
  const [voiceStatus, setVoiceStatus] = useState<'listening' | 'thinking' | 'speaking'>('listening');
  const recognizerRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);

  const lastAssistantMessage = messages.filter((m) => m.sender === 'assistant').slice(-1)[0];
  const lastUserMessage = messages.filter((m) => m.sender === 'user').slice(-1)[0];

  useEffect(() => {
    if (!isOpen) return;

    // Start speech recognition loop
    const recognizer = createSpeechRecognizer(
      language.speechCode,
      (result) => {
        if (!result || typeof result.transcript !== 'string') return;
        setInterimTranscript(result.transcript);
        setVoiceStatus('listening');

        // Auto-send when user finishes speaking (after brief silence threshold)
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
          const finalSpeech = result?.transcript?.trim();
          if (finalSpeech && finalSpeech.length > 1 && !isAITurn) {
            setInterimTranscript('');
            setVoiceStatus('thinking');
            onNewUserVoiceMessage(finalSpeech);
          }
        }, 1800);
      },
      (err) => console.warn('Live voice recognition error:', err),
      () => {
        // restart if still open
        if (isOpen && !isMuted) {
          try {
            recognizer?.start();
          } catch (e) {
            // ignore
          }
        }
      }
    );

    if (!recognizer) {
      setIsRecognitionSupported(false);
    } else {
      setIsRecognitionSupported(true);
      recognizerRef.current = recognizer;
      try {
        recognizer?.start();
      } catch (e) {
        // ignore
      }
    }

    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      try {
        recognizer?.stop();
      } catch (e) {
        // ignore
      }
    };
  }, [isOpen, language.speechCode, isMuted, isAITurn, onNewUserVoiceMessage]);

  useEffect(() => {
    if (isAITurn) {
      setVoiceStatus('thinking');
    } else {
      setVoiceStatus('listening');
    }
  }, [isAITurn]);

  if (!isOpen) return null;

  const toggleMute = () => {
    if (!isMuted) {
      recognizerRef.current?.stop();
      setIsMuted(true);
    } else {
      recognizerRef.current?.start();
      setIsMuted(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#FAF9F5] text-[#2C2C24] animate-in fade-in duration-200 select-none">
      {/* Top Header */}
      <div className="p-4 sm:p-6 flex items-center justify-between border-b border-[#E3E3D8]">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{language.flag}</span>
          <div>
            <div className="text-sm sm:text-base font-bold text-[#2C2C24] flex items-center gap-2">
              <span>{scenario.partnerName} ({scenario.partnerRole})</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E9F0EA] text-[#2D5438] font-mono border border-[#C5DAC8]">
                LIVE CALL • {level}
              </span>
            </div>
            <p className="text-xs text-[#5A5A40]">{scenario.title}</p>
          </div>
        </div>

        {/* Objectives Counter */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FFFFFF] border border-[#E3E3D8] text-xs text-[#2C2C24]">
          <Target className="w-4 h-4 text-[#4A6B53]" />
          <span>
            {activeObjectives.filter((o) => o.completed).length} / {activeObjectives.length} Completed
          </span>
        </div>
      </div>

      {/* Center Voice Orb Visualizer */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto w-full">
        {/* Pulsing Glowing Orb */}
        <div className="relative mb-8 flex items-center justify-center">
          {/* Animated concentric rings */}
          <div
            className={`absolute w-44 h-44 rounded-full blur-xl transition-all duration-700 ${
              voiceStatus === 'listening'
                ? 'bg-[#4A6B53]/20 scale-110 animate-pulse'
                : voiceStatus === 'thinking'
                ? 'bg-[#C28E58]/20 scale-125 animate-spin'
                : 'bg-[#5A7A68]/20 scale-135 animate-ping'
            }`}
          />
          
          <div
            className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-500 shadow-xl relative z-10 ${
              voiceStatus === 'listening'
                ? 'bg-[#4A6B53] border-[#3E5A45] text-[#FAF9F5]'
                : voiceStatus === 'thinking'
                ? 'bg-[#C28E58] border-[#A87542] text-[#FAF9F5]'
                : 'bg-[#3F6359] border-[#2F4D45] text-[#FAF9F5]'
            }`}
          >
            {voiceStatus === 'listening' ? (
              <Mic className="w-12 h-12 animate-pulse" />
            ) : voiceStatus === 'thinking' ? (
              <Sparkles className="w-12 h-12 animate-spin" />
            ) : (
              <Volume2 className="w-12 h-12 animate-bounce" />
            )}
          </div>
        </div>

        {/* Live Call Status */}
        <div className="space-y-1 mb-8">
          <div className="text-base font-semibold text-[#2C2C24]">
            {voiceStatus === 'listening'
              ? 'Listening to you speak...'
              : voiceStatus === 'thinking'
              ? `${scenario.partnerName} is formulating a response...`
              : `${scenario.partnerName} is speaking...`}
          </div>
          <p className="text-xs text-[#5A5A40]">
            Speak naturally in {language.name}. Pause when finished.
          </p>
        </div>

        {/* Live Subtitle / Interim Speech Transcript */}
        <div className="w-full min-h-[100px] p-4 rounded-2xl bg-[#FFFFFF] border border-[#E3E3D8] shadow-xs flex flex-col justify-center text-center">
          {interimTranscript ? (
            <div>
              <span className="text-xs font-mono uppercase text-[#4A6B53] tracking-wider block mb-1">
                You are saying:
              </span>
              <p className="text-sm sm:text-base font-medium text-[#2C2C24] italic">
                &ldquo;{interimTranscript}&rdquo;
              </p>
            </div>
          ) : lastAssistantMessage ? (
            <div>
              <span className="text-xs font-mono uppercase text-[#5A5A40] tracking-wider block mb-1">
                {scenario.partnerName}:
              </span>
              <p className="text-sm sm:text-base font-medium text-[#2D5438]">
                &ldquo;{lastAssistantMessage.text}&rdquo;
              </p>
              {lastAssistantMessage.translation && (
                <p className="text-xs text-[#5A5A40] mt-1">{lastAssistantMessage.translation}</p>
              )}
            </div>
          ) : (
            <p className="text-xs text-[#8C8C78]">
              Say something like: &ldquo;{scenario.starterPrompts[0]?.text}&rdquo;
            </p>
          )}

          {!isRecognitionSupported && (
            <div className="mt-3 pt-3 border-t border-[#E3E3D8] flex gap-2">
              <input
                type="text"
                value={manualSpeechText}
                onChange={(e) => setManualSpeechText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && manualSpeechText.trim() && !isAITurn) {
                    const text = manualSpeechText.trim();
                    setManualSpeechText('');
                    setVoiceStatus('thinking');
                    onNewUserVoiceMessage(text);
                  }
                }}
                placeholder={`Type in ${language.name} (browser speech recognition unsupported)...`}
                className="flex-1 px-3 py-1.5 rounded-xl bg-[#FAF9F5] border border-[#DCDCCF] text-xs text-[#2C2C24] focus:outline-none focus:border-[#4A6B53]"
              />
              <button
                onClick={() => {
                  if (manualSpeechText.trim() && !isAITurn) {
                    const text = manualSpeechText.trim();
                    setManualSpeechText('');
                    setVoiceStatus('thinking');
                    onNewUserVoiceMessage(text);
                  }
                }}
                disabled={!manualSpeechText.trim() || isAITurn}
                className="px-3 py-1.5 rounded-xl bg-[#4A6B53] text-white text-xs font-semibold disabled:opacity-50"
              >
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="p-6 border-t border-[#E3E3D8] bg-[#FAF9F5] flex items-center justify-center gap-6">
        {/* Mute Mic */}
        <button
          id="live-voice-mute-btn"
          onClick={toggleMute}
          className={`p-4 rounded-2xl border transition-all active:scale-95 ${
            isMuted
              ? 'bg-[#FBEBEB] border-[#F4C8C8] text-[#9B3838]'
              : 'bg-[#EBEBE0] border-[#DCDCCF] text-[#2C2C24] hover:bg-[#E2E2D5]'
          }`}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        {/* End Call */}
        <button
          id="live-voice-end-btn"
          onClick={onClose}
          className="p-5 rounded-2xl bg-[#C25858] hover:bg-[#B24848] text-white shadow-md transition-all active:scale-95 flex items-center gap-2 font-bold text-sm"
        >
          <PhoneOff className="w-6 h-6 fill-white" />
          <span>End Voice Call</span>
        </button>

        {/* Listen Again */}
        {lastAssistantMessage && (
          <button
            onClick={() =>
              speakText({
                text: lastAssistantMessage.text,
                base64Audio: lastAssistantMessage.audioBase64,
                langCode: language.speechCode,
              })
            }
            className="p-4 rounded-2xl bg-[#EBEBE0] hover:bg-[#E2E2D5] border border-[#DCDCCF] text-[#2C2C24] transition-all active:scale-95"
            title="Replay partner voice"
          >
            <Volume2 className="w-6 h-6 text-[#4A6B53]" />
          </button>
        )}
      </div>
    </div>
  );
};

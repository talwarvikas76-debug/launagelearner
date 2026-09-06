import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  Send, 
  Mic, 
  MicOff, 
  Sparkles, 
  Target, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft, 
  PhoneCall, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  Check, 
  Bot, 
  User, 
  VolumeX, 
  AlertCircle,
  Wand2,
  Headphones
} from 'lucide-react';
import { 
  Scenario, 
  LanguageConfig, 
  CEFRLevel, 
  ChatMessage, 
  SavedWord 
} from '../types';
import { speakText, createSpeechRecognizer } from '../utils/audio';

interface ConversationViewProps {
  scenario: Scenario;
  language: LanguageConfig;
  level: CEFRLevel;
  messages: ChatMessage[];
  onSendMessage: (text: string) => Promise<void>;
  isLoading: boolean;
  onExit: () => void;
  onFinishSession: () => void;
  onInspectWord: (word: string, contextSentence: string) => void;
  onPracticePronunciation: (sentence: string, translation?: string) => void;
  onOpenLiveVoiceCall: () => void;
  savedWords: SavedWord[];
  autoPlayAudio: boolean;
  playbackSpeed: number;
  onOpenAssistedSpeaker?: (phrase: string, translation?: string, contextSentence?: string) => void;
}

export const ConversationView: React.FC<ConversationViewProps> = ({
  scenario,
  language,
  level,
  messages,
  onSendMessage,
  isLoading,
  onExit,
  onFinishSession,
  onInspectWord,
  onPracticePronunciation,
  onOpenLiveVoiceCall,
  savedWords,
  autoPlayAudio,
  playbackSpeed,
  onOpenAssistedSpeaker,
}) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showObjectives, setShowObjectives] = useState(false);
  const [showTranslations, setShowTranslations] = useState<Record<string, boolean>>({});
  const [showRomanizations, setShowRomanizations] = useState<Record<string, boolean>>({});
  const [showGrammarExplanation, setShowGrammarExplanation] = useState<Record<string, boolean>>({});
  const [currentlySpeakingId, setCurrentlySpeakingId] = useState<string | null>(null);
  const [hintHelperOpen, setHintHelperOpen] = useState(false);
  const [hintInput, setHintInput] = useState('');
  const [hintResult, setHintResult] = useState<{ text: string; translation: string } | null>(null);
  const [isGeneratingHint, setIsGeneratingHint] = useState(false);
  const [speechNotice, setSpeechNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognizerRef = useRef<any>(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle Speech Recognition for voice input in chat bar
  const toggleSpeechInput = () => {
    if (isRecording) {
      recognizerRef.current?.stop();
      setIsRecording(false);
      return;
    }

    setSpeechNotice(null);
    const recognizer = createSpeechRecognizer(
      language.speechCode,
      (res) => {
        setInputText(res.transcript);
      },
      (err) => {
        console.warn('Speech recognizer notice:', err);
        setIsRecording(false);
        setSpeechNotice('Microphone unavailable or permission denied. You can type your message.');
        setTimeout(() => setSpeechNotice(null), 4000);
      },
      () => {
        setIsRecording(false);
      }
    );

    if (recognizer) {
      recognizerRef.current = recognizer;
      try {
        recognizer.start();
        setIsRecording(true);
      } catch (e) {
        console.warn('Could not start recognition:', e);
      }
    } else {
      setSpeechNotice('Speech recognition is not supported in this browser. Please type your reply.');
      setTimeout(() => setSpeechNotice(null), 4000);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText || !inputText.trim() || isLoading) return;

    if (isRecording) {
      recognizerRef.current?.stop();
      setIsRecording(false);
    }

    const textToSend = inputText.trim();
    setInputText('');
    await onSendMessage(textToSend);
  };

  const handlePlayAudio = (msg: ChatMessage) => {
    if (!msg?.text) return;
    if (currentlySpeakingId === msg.id) {
      setCurrentlySpeakingId(null);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      return;
    }

    setCurrentlySpeakingId(msg.id);
    speakText({
      text: msg.text,
      base64Audio: msg.audioBase64,
      langCode: language.speechCode,
      rate: playbackSpeed,
      onStart: () => setCurrentlySpeakingId(msg.id),
      onEnd: () => setCurrentlySpeakingId(null),
    });
  };

  const handleAskHowToSay = async () => {
    if (!hintInput || !hintInput.trim()) return;
    setIsGeneratingHint(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetLanguage: language,
          level,
          scenario,
          messages: [],
          userMessage: `How do I say in ${language.name} for this scenario: "${hintInput.trim()}"? Provide only the translation.`,
          generateAudio: false,
        }),
      });
      const data = await res.json();
      if (data?.replyText) {
        setHintResult({
          text: data.replyText,
          translation: hintInput.trim(),
        });
      }
    } catch (e) {
      console.warn('Hint request error:', e);
    } finally {
      setIsGeneratingHint(false);
    }
  };

  const latestAssistantMessage = messages.filter((m) => m.sender === 'assistant').slice(-1)[0];
  const completedObjectivesCount = scenario.objectives.filter((o) => o.completed).length;

  return (
    <div className="w-full h-[calc(100vh-4rem)] max-w-5xl mx-auto flex flex-col bg-[#F5F5F0] text-[#2C2C24] border-x border-[#E3E3D8] shadow-sm relative">
      {/* Top Header Bar */}
      <div className="p-3.5 sm:p-4 border-b border-[#E3E3D8] bg-[#FFFFFF]/95 backdrop-blur-md flex items-center justify-between gap-2 shrink-0 z-20">
        <div className="flex items-center gap-3">
          <button
            id="back-to-scenarios-btn"
            onClick={onExit}
            aria-label="Back to scenario selection"
            className="p-2 rounded-xl text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
            title="Exit Scenario"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#4A6B53] font-bold shadow-xs overflow-hidden">
                {scenario.partnerAvatarUrl ? (
                  <img
                    src={scenario.partnerAvatarUrl}
                    alt={scenario.partnerName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#4A6B53] rounded-full border-2 border-[#FFFFFF]" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-[#2C2C24]">{scenario.partnerName}</span>
                <span className="text-xs text-[#5A5A40] hidden sm:inline">({scenario.partnerRole})</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#EBEBE0] text-[#3D3D30] font-mono">
                  {level}
                </span>
              </div>
              <p className="text-xs text-[#4A6B53] font-medium truncate max-w-[200px] sm:max-w-md">
                {scenario.title}
              </p>
            </div>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Objectives Toggle Button */}
          <button
            id="toggle-objectives-btn"
            onClick={() => setShowObjectives(!showObjectives)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              completedObjectivesCount === scenario.objectives.length && scenario.objectives.length > 0
                ? 'bg-[#E9F0EA] text-[#2D5438] border-[#C5DAC8]'
                : 'bg-[#EBEBE0] text-[#3D3D30] border-[#DCDCCF] hover:bg-[#E2E2D5]'
            }`}
          >
            <Target className="w-4 h-4 text-[#4A6B53]" />
            <span className="hidden sm:inline">Goals</span>
            <span className="font-mono">
              ({completedObjectivesCount}/{scenario.objectives.length})
            </span>
            {showObjectives ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Hands-free Voice Call Mode */}
          <button
            id="open-live-voice-call-btn"
            onClick={onOpenLiveVoiceCall}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBEBE0] hover:bg-[#E2E2D5] border border-[#DCDCCF] text-[#2D5438] text-xs font-semibold transition-all active:scale-95 shadow-xs"
            title="Hands-free Voice Call Mode"
          >
            <PhoneCall className="w-4 h-4" />
            <span className="hidden md:inline">Voice Call</span>
          </button>

          {/* End Session & View Report */}
          <button
            id="finish-session-btn"
            onClick={onFinishSession}
            className="px-3.5 py-1.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" />
            <span>Finish</span>
          </button>
        </div>
      </div>

      {/* Collapsible Objectives Drawer */}
      {showObjectives && (
        <div className="p-4 bg-[#FAF9F5] border-b border-[#E3E3D8] animate-in slide-in-from-top-2 duration-150 z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#5A5A40] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#4A6B53]" />
              <span>Roleplay Mission Objectives</span>
            </div>
            <span className="text-xs font-mono text-[#2D5438] font-bold">
              {Math.round((completedObjectivesCount / Math.max(1, scenario.objectives.length)) * 100)}% Complete
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {scenario.objectives.map((obj) => (
              <div
                key={obj.id}
                className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 transition-all ${
                  obj.completed
                    ? 'bg-[#E9F0EA] border-[#C5DAC8] text-[#2D5438]'
                    : 'bg-[#FFFFFF] border-[#E3E3D8] text-[#3D3D30]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {obj.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#4A6B53] fill-[#4A6B53]/20" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-[#B0B0A0]" />
                  )}
                </div>
                <div className="leading-snug">{obj.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Messages Scroll View */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin">
        {/* Scenario Intro Card with Situational Cover Photo */}
        <div className="rounded-2xl bg-[#FAF9F5] border border-[#E3E3D8] overflow-hidden shadow-xs">
          {scenario.imageUrl && (
            <div className="relative w-full h-32 sm:h-36 overflow-hidden bg-[#1F2421]">
              <img
                src={scenario.imageUrl}
                alt={scenario.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F2421]/85 via-[#1F2421]/30 to-transparent" />
              <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                <div>
                  <div className="text-[11px] font-semibold text-[#A8CDB0] uppercase tracking-wider">
                    {scenario.setting}
                  </div>
                  <h4 className="text-sm sm:text-base font-extrabold text-white">
                    {scenario.title}
                  </h4>
                </div>
                {scenario.partnerAvatarUrl && (
                  <img
                    src={scenario.partnerAvatarUrl}
                    alt={scenario.partnerName}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white/80 shadow-xs shrink-0 hidden sm:block"
                  />
                )}
              </div>
            </div>
          )}

          <div className="p-4 text-xs sm:text-sm text-[#5A5A40] space-y-2">
            {!scenario.imageUrl && (
              <div className="flex items-center gap-2 text-[#4A6B53] font-semibold">
                <Sparkles className="w-4 h-4" />
                <span>Scenario Setting & Context</span>
              </div>
            )}
            <p className="leading-relaxed text-[#3D3D30]">{scenario.situation}</p>
            <div className="flex items-center gap-4 pt-1 text-xs text-[#5A5A40]">
              <span>👤 You: <strong className="text-[#2C2C24]">{scenario.userRole}</strong></span>
              <span>🤖 Partner: <strong className="text-[#2C2C24]">{scenario.partnerName} ({scenario.partnerRole})</strong></span>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          const showTrans = showTranslations[msg.id];
          const showRoman = showRomanizations[msg.id];
          const showGrammar = showGrammarExplanation[msg.id];
          const isSpeaking = currentlySpeakingId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} group animate-in fade-in duration-150`}
            >
              {/* Partner Avatar */}
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#4A6B53] shrink-0 mt-1 shadow-xs overflow-hidden">
                  {scenario.partnerAvatarUrl ? (
                    <img
                      src={scenario.partnerAvatarUrl}
                      alt={scenario.partnerName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Bot className="w-4 h-4" />
                  )}
                </div>
              )}

              {/* Message Bubble Container */}
              <div className={`max-w-[88%] sm:max-w-[78%] space-y-2`}>
                <div
                  className={`p-4 rounded-2xl border transition-all ${
                    isUser
                      ? 'bg-[#4A6B53] border-[#3E5C46] text-[#FAF9F5] rounded-tr-xs shadow-xs'
                      : 'bg-[#FFFFFF] border-[#E3E3D8] text-[#2C2C24] rounded-tl-xs shadow-xs'
                  }`}
                >
                  {/* Romanization / Transliteration */}
                  {!isUser && msg.romanization && (
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-xs font-mono text-[#8B5E3C] tracking-wide">
                        {showRoman !== false ? msg.romanization : ''}
                      </span>
                    </div>
                  )}

                  {/* Main Dialogue Text (Words clickable for quick dictionary) */}
                  <div className="text-base sm:text-lg leading-relaxed font-medium">
                    {msg.text.split(' ').map((word, i) => {
                      const cleanWord = word.replace(/[.,!?;:"'()]/g, '');
                      const isSaved = savedWords.some((w) => w.word.toLowerCase() === cleanWord.toLowerCase());

                      return (
                        <span
                          key={i}
                          onClick={() => {
                            if (cleanWord.length > 0) {
                              onInspectWord(cleanWord, msg.text);
                            }
                          }}
                          className={`inline-block cursor-pointer px-0.5 rounded transition-colors ${
                            isUser
                              ? 'hover:bg-[#3E5A45]'
                              : 'hover:bg-[#E9F0EA] hover:text-[#2D5438]'
                          } ${
                            isSaved
                              ? isUser
                                ? 'underline decoration-[#FAF9F5]/70 decoration-2 underline-offset-4'
                                : 'underline decoration-[#4A6B53]/50 decoration-2 underline-offset-4'
                              : ''
                          }`}
                          title="Click word to inspect & save"
                        >
                          {word}{' '}
                        </span>
                      );
                    })}
                  </div>

                  {/* English Translation */}
                  {msg.translation && (showTrans || isUser) && (
                    <div className={`pt-2 mt-2 border-t text-xs sm:text-sm ${
                      isUser ? 'border-[#3E5C46] text-[#E0ECE2]' : 'border-[#EBEBE0] text-[#5A5A40]'
                    }`}>
                      {msg.translation}
                    </div>
                  )}

                  {/* Bottom Controls / Tools inside Bubble */}
                  <div className={`pt-2 mt-2 border-t flex flex-wrap items-center justify-between gap-2 text-xs ${
                    isUser ? 'border-[#3E5C46] text-[#E0ECE2]' : 'border-[#EBEBE0] text-[#5A5A40]'
                  }`}>
                    <div className="flex items-center gap-1.5">
                      {/* Audio Playback Button */}
                      <button
                        onClick={() => handlePlayAudio(msg)}
                        aria-label={isSpeaking ? "Pause audio" : "Play native audio"}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                          isSpeaking
                            ? 'bg-[#4A6B53] text-[#FAF9F5] border-[#3E5A45] font-semibold animate-pulse'
                            : isUser
                            ? 'bg-[#3E5C46] hover:bg-[#344F3C] border-[#344F3C] text-[#FAF9F5]'
                            : 'bg-[#EBEBE0] hover:bg-[#E2E2D5] border-[#DCDCCF] text-[#2D5438]'
                        }`}
                        title="Listen to native pronunciation"
                      >
                        {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        <span>{isSpeaking ? 'Playing' : 'Listen'}</span>
                      </button>

                      {/* Assisted Native Speaker & Syllables Coach */}
                      {onOpenAssistedSpeaker && (
                        <button
                          onClick={() => onOpenAssistedSpeaker(msg.text, msg.translation, msg.text)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                            isUser
                              ? 'hover:bg-[#3E5C46] text-[#FAF9F5]'
                              : 'hover:bg-[#EBEBE0] text-[#4A6B53] font-semibold'
                          }`}
                          title="Open Assisted Speaker for slow playback, syllable breakdown & mouth guide"
                        >
                          <Headphones className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Assisted Speaker</span>
                        </button>
                      )}

                      {/* Translation Toggle for Assistant */}
                      {!isUser && msg.translation && (
                        <button
                          onClick={() =>
                            setShowTranslations((prev) => ({
                              ...prev,
                              [msg.id]: !prev[msg.id],
                            }))
                          }
                          className="px-2 py-1 rounded-lg hover:bg-[#EBEBE0] text-[#5A5A40] hover:text-[#2C2C24] transition-colors cursor-pointer"
                        >
                          {showTrans ? 'Hide Translation' : 'Translate'}
                        </button>
                      )}

                      {/* Practice Pronouncing user or assistant line */}
                      <button
                        onClick={() => onPracticePronunciation(msg.text, msg.translation)}
                        className={`px-2 py-1 rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                          isUser
                            ? 'hover:bg-[#3E5C46] text-[#FAF9F5]'
                            : 'hover:bg-[#EBEBE0] text-[#5A5A40] hover:text-[#2D5438]'
                        }`}
                        title="Open Pronunciation Coach"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Practice Accent</span>
                      </button>
                    </div>

                    <span className={`text-[10px] font-mono ${isUser ? 'text-[#D0E2D4]' : 'text-[#8C8C78]'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                {/* Key Vocab Chips (Assistant) */}
                {!isUser && msg.keyVocab && msg.keyVocab.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pl-1">
                    <span className="text-[11px] text-[#5A5A40] font-medium">Key vocab:</span>
                    {msg.keyVocab.map((kv, idx) => (
                      <button
                        key={idx}
                        onClick={() => onInspectWord(kv.word, msg.text)}
                        className="px-2 py-0.5 rounded-lg bg-[#FFFFFF] hover:bg-[#E9F0EA] border border-[#E3E3D8] hover:border-[#C5DAC8] text-[11px] text-[#2D5438] font-medium transition-all shadow-xs"
                      >
                        <span className="font-bold">{kv.word}</span>
                        <span className="text-[#5A5A40] ml-1">({kv.translation})</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Real-time Grammar Feedback Card (User messages) */}
                {isUser && msg.grammarFeedback && (
                  <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#E3E3D8] text-xs space-y-2 animate-in fade-in duration-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-semibold text-[#4A6B53]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          {msg.grammarFeedback.hasErrors
                            ? 'Grammar & Fluency Coach'
                            : '✨ Natural & Fluent Phrasing!'}
                        </span>
                      </div>

                      {msg.grammarFeedback.detectedLevel && (
                        <span className="px-1.5 py-0.2 rounded bg-[#EBEBE0] text-[#3D3D30] font-mono text-[10px]">
                          {msg.grammarFeedback.detectedLevel}
                        </span>
                      )}
                    </div>

                    {/* Natural Native Alternative */}
                    {msg.grammarFeedback.naturalAlternative && (
                      <div className="bg-[#FAF9F5] p-2.5 rounded-lg border border-[#E3E3D8]">
                        <span className="text-[11px] text-[#5A5A40] block mb-0.5">
                          💡 More Natural Native Way:
                        </span>
                        <div className="text-[#2C2C24] font-semibold text-xs sm:text-sm">
                          &ldquo;{msg.grammarFeedback.naturalAlternative}&rdquo;
                        </div>
                      </div>
                    )}

                    {/* Explanation toggle */}
                    {msg.grammarFeedback.explanation && (
                      <div>
                        <button
                          onClick={() =>
                            setShowGrammarExplanation((prev) => ({
                              ...prev,
                              [msg.id]: !prev[msg.id],
                            }))
                          }
                          className="text-[11px] text-[#4A6B53] hover:underline flex items-center gap-1 font-medium"
                        >
                          <HelpCircle className="w-3 h-3" />
                          <span>{showGrammar ? 'Hide explanation' : 'Why is this better?'}</span>
                        </button>
                        {showGrammar && (
                          <p className="text-[11px] text-[#5A5A40] leading-relaxed mt-1.5 p-2 rounded-lg bg-[#FAF9F5] border border-[#E3E3D8]">
                            {msg.grammarFeedback.explanation}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#4A6B53] shrink-0 mt-1 shadow-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#4A6B53] shrink-0 shadow-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] border border-[#E3E3D8] text-[#5A5A40] text-xs flex items-center gap-2 rounded-tl-xs shadow-xs">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-[#4A6B53] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 bg-[#4A6B53] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 bg-[#4A6B53] rounded-full animate-bounce" />
              </div>
              <span>{scenario.partnerName} is typing in {language.name}...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Smart Suggested Replies Bar */}
      {latestAssistantMessage && !isLoading && (
        <div className="px-4 py-2 bg-[#FAF9F5] border-t border-[#E3E3D8] flex items-center gap-2 overflow-x-auto scrollbar-thin">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5A5A40] shrink-0 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#4A6B53]" />
            <span>Suggested:</span>
          </span>

          {scenario.starterPrompts.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(s.text)}
              className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F2F2EB] border border-[#DCDCCF] hover:border-[#4A6B53]/40 text-xs text-[#2C2C24] whitespace-nowrap transition-all text-left shadow-xs"
              title={s.translation}
            >
              <span>{s.text}</span>
            </button>
          ))}

          {/* Quick Helper Button */}
          <button
            onClick={() => setHintHelperOpen(!hintHelperOpen)}
            className="px-2.5 py-1.5 rounded-xl bg-[#EBEBE0] hover:bg-[#E2E2D5] text-[#2D5438] text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>How do I say...</span>
          </button>
        </div>
      )}

      {/* "How do I say..." Popup Drawer */}
      {hintHelperOpen && (
        <div className="p-3.5 bg-[#FAF9F5] border-t border-[#E3E3D8] flex flex-col sm:flex-row items-center gap-2 animate-in slide-in-from-bottom duration-150">
          <input
            type="text"
            value={hintInput}
            onChange={(e) => setHintInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskHowToSay()}
            placeholder={`Ask in English: "How do I ask for the bill?"`}
            className="flex-1 px-3 py-2 rounded-xl bg-[#FFFFFF] border border-[#DCDCCF] text-xs text-[#2C2C24] placeholder-[#8C8C78] focus:outline-none focus:border-[#4A6B53] w-full"
          />
          <button
            onClick={handleAskHowToSay}
            disabled={isGeneratingHint || !hintInput.trim()}
            className="px-4 py-2 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] disabled:opacity-50 text-[#FAF9F5] font-semibold text-xs whitespace-nowrap w-full sm:w-auto"
          >
            {isGeneratingHint ? 'Translating...' : 'Translate to Target'}
          </button>

          {hintResult && (
            <button
              onClick={() => {
                setInputText(hintResult.text);
                setHintHelperOpen(false);
              }}
              className="p-2 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] text-xs text-[#2D5438] text-left hover:bg-[#DEEADB]"
            >
              Use: &ldquo;{hintResult.text}&rdquo;
            </button>
          )}
        </div>
      )}

      {/* Speech Notice Toast */}
      {speechNotice && (
        <div className="px-4 py-2 bg-[#FDF6EE] border-t border-[#F3DFC8] text-[#A66324] text-xs flex items-center gap-2 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{speechNotice}</span>
        </div>
      )}

      {/* Bottom Message Input Bar */}
      <div className="p-3 sm:p-4 border-t border-[#E3E3D8] bg-[#FFFFFF]/95 backdrop-blur-md shrink-0">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          {/* Microphone Recording Button */}
          <button
            type="button"
            id="chat-mic-btn"
            onClick={toggleSpeechInput}
            aria-label={isRecording ? "Stop speech recording" : "Start speech recording"}
            className={`p-3 rounded-xl border transition-all active:scale-95 ${
              isRecording
                ? 'bg-[#C25858] text-white border-[#B24848] shadow-md shadow-[#C25858]/20 animate-pulse'
                : 'bg-[#EBEBE0] hover:bg-[#E2E2D5] border-[#DCDCCF] text-[#4A6B53]'
            }`}
            title={isRecording ? 'Listening... click to stop' : `Speak in ${language.name}`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            id="chat-text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              isRecording
                ? `Listening to your ${language.name}...`
                : `Reply in ${language.name} (${language.nativeName})...`
            }
            className="flex-1 px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#DCDCCF] text-sm text-[#2C2C24] placeholder-[#8C8C78] focus:outline-none focus:border-[#4A6B53] transition-colors"
          />

          {/* Send Button */}
          <button
            type="submit"
            id="chat-send-btn"
            disabled={!inputText.trim() || isLoading}
            aria-label="Send message"
            className="p-3 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] disabled:opacity-40 disabled:hover:bg-[#4A6B53] text-[#FAF9F5] font-bold transition-all shadow-xs active:scale-95 flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

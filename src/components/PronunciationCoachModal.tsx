import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Volume2, 
  Mic, 
  Square, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  Headphones
} from 'lucide-react';
import { LanguageConfig } from '../types';
import { speakText, VoiceRecorder, createSpeechRecognizer } from '../utils/audio';

interface PronunciationCoachModalProps {
  sentence: string;
  translation?: string;
  language: LanguageConfig;
  isOpen: boolean;
  onClose: () => void;
  onOpenAssistedSpeaker?: (phrase: string, translation?: string) => void;
}

interface EvaluationResult {
  score: number;
  phoneticBreakdown: string;
  feedback: string;
  soundTips: string[];
  wordAccuracies?: { word: string; accuracy: 'great' | 'good' | 'needs-practice' }[];
}

export const PronunciationCoachModal: React.FC<PronunciationCoachModalProps> = ({
  sentence,
  translation,
  language,
  isOpen,
  onClose,
  onOpenAssistedSpeaker,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [userTranscript, setUserTranscript] = useState('');
  const [isPlayingReference, setIsPlayingReference] = useState(false);
  const [slowRate, setSlowRate] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const recorderRef = useRef<VoiceRecorder | null>(null);
  const recognizerRef = useRef<any>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        recognizerRef.current?.stop();
      } catch {}
      if (recorderRef.current && recorderRef.current.isRecording()) {
        recorderRef.current.stop().catch(() => {});
      }
    };
  }, []);

  if (!isOpen) return null;

  const handlePlayReference = () => {
    setIsPlayingReference(true);
    speakText({
      text: sentence,
      langCode: language.speechCode,
      rate: slowRate ? 0.75 : 1.0,
      onEnd: () => setIsPlayingReference(false),
    });
  };

  const startPractice = async () => {
    try {
      setEvaluation(null);
      setUserTranscript('');
      setIsRecording(true);

      // Start audio recording
      const recorder = new VoiceRecorder();
      recorderRef.current = recorder;
      await recorder.start();

      // Start Web Speech recognition for real-time text matching
      const recognizer = createSpeechRecognizer(
        language.speechCode,
        (res) => {
          setUserTranscript(res.transcript);
        },
        (err) => console.warn('Speech recognizer notice:', err),
        () => {}
      );

      if (recognizer) {
        recognizerRef.current = recognizer;
        try {
          recognizer.start();
        } catch (e) {
          console.warn('Speech recognition already started');
        }
      }
    } catch (err) {
      console.warn('Failed to start microphone:', err);
      setIsRecording(false);
      setMicError('Microphone access is unavailable or was blocked. Please check browser permissions.');
    }
  };

  const stopPractice = async () => {
    setIsRecording(false);
    setIsEvaluating(true);

    try {
      // Stop speech recognition
      if (recognizerRef.current) {
        try {
          recognizerRef.current.stop();
        } catch (e) {
          // ignore
        }
      }

      // Stop recorder
      let base64Audio = '';
      let mimeType = 'audio/webm';
      if (recorderRef.current && recorderRef.current.isRecording()) {
        const audioData = await recorderRef.current.stop();
        base64Audio = audioData.base64;
        mimeType = audioData.mimeType;
      }

      // Send to server for pronunciation evaluation
      const response = await fetch('/api/pronunciation-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetPhrase: sentence,
          targetLanguage: language.name,
          userTranscript: userTranscript,
          audioBase64: base64Audio,
          mimeType,
        }),
      });

      if (!response.ok) throw new Error('Evaluation failed');
      const data = await response.json();
      setEvaluation(data);
    } catch (err) {
      console.error('Pronunciation evaluation error:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-[#2D5438] bg-[#E9F0EA] border-[#C5DAC8]';
    if (score >= 70) return 'text-[#A66324] bg-[#FDF6EE] border-[#F3DFC8]';
    return 'text-[#9B3838] bg-[#FBEBEB] border-[#F4C8C8]';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] border border-[#E3E3D8] shadow-2xl p-6 overflow-hidden text-[#2C2C24]">
        {/* Close Button */}
        <button
          id="close-pronunciation-modal-btn"
          onClick={onClose}
          aria-label="Close pronunciation modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#4A6B53]">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#2C2C24]">Pronunciation & Accent Coach</h2>
            <p className="text-xs text-[#5A5A40]">Master the rhythm and intonation of this sentence</p>
          </div>
        </div>

        {/* Target Sentence Card */}
        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] mb-5">
          <div className="text-lg font-bold text-[#2C2C24] leading-relaxed mb-1">
            {sentence}
          </div>
          {translation && (
            <p className="text-xs text-[#5A5A40] mb-3">{translation}</p>
          )}

          {/* Reference Audio Player */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E3E3D8]">
            <div className="flex items-center gap-2">
              <button
                id="play-ref-sentence-btn"
                onClick={handlePlayReference}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                  isPlayingReference
                    ? 'bg-[#4A6B53] text-[#FAF9F5] border-[#3E5A45]'
                    : 'bg-[#EBEBE0] text-[#2D5438] border-[#DCDCCF] hover:bg-[#E2E2D5]'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isPlayingReference ? 'Playing Native Audio...' : 'Listen'}</span>
              </button>

              <button
                onClick={() => setSlowRate(!slowRate)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  slowRate
                    ? 'bg-[#FDF6EE] text-[#A66324] border border-[#F3DFC8] font-bold'
                    : 'bg-[#EBEBE0] text-[#5A5A40] hover:text-[#2C2C24]'
                }`}
                title="Toggle slow playback speed"
              >
                {slowRate ? '🐢 0.75x Slow' : '⚡ 1.0x Normal'}
              </button>
            </div>

            {onOpenAssistedSpeaker && (
              <button
                onClick={() => onOpenAssistedSpeaker(sentence, translation)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E9F0EA] hover:bg-[#DCE7DD] border border-[#C5DAC8] text-[#2D5438] text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-2xs"
                title="Open Assisted Speaker for syllable-by-syllable slow breakdown & mouth guide"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Assisted Speaker (Syllables &amp; Posture)</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Recording Area */}
        <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] mb-5 text-center">
          {isRecording ? (
            <div className="space-y-4">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#C25858]/20 animate-ping absolute" />
                <div className="w-16 h-16 rounded-full bg-[#C25858] flex items-center justify-center text-white relative z-10 shadow-lg">
                  <Mic className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-[#2C2C24]">Listening to your pronunciation...</p>
                <p className="text-xs text-[#5A5A40] font-mono mt-1 italic">
                  {userTranscript ? `"${userTranscript}"` : 'Speak the sentence now...'}
                </p>
              </div>

              <button
                id="stop-pronunciation-record-btn"
                onClick={stopPractice}
                className="px-5 py-2 rounded-xl bg-[#C25858] hover:bg-[#B24848] text-white font-semibold text-xs flex items-center gap-2 mx-auto shadow-md"
              >
                <Square className="w-4 h-4 fill-white" />
                <span>Stop & Evaluate</span>
              </button>
            </div>
          ) : isEvaluating ? (
            <div className="py-4 flex flex-col items-center">
              <Loader2 className="w-8 h-8 text-[#4A6B53] animate-spin mb-3" />
              <p className="text-sm font-semibold text-[#2C2C24]">AI Phonetic Analysis in Progress...</p>
              <p className="text-xs text-[#5A5A40] mt-1">Comparing stress, phonemes, and cadence</p>
            </div>
          ) : (
            <div className="space-y-3">
              {micError && (
                <div className="p-2.5 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] text-xs text-[#A66324] flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-[#C28E58]" />
                  <span>{micError}</span>
                </div>
              )}
              <p className="text-xs text-[#5A5A40]">
                Click below and read the sentence out loud into your microphone.
              </p>
              <button
                id="start-pronunciation-record-btn"
                onClick={startPractice}
                className="px-6 py-3 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-bold text-sm flex items-center gap-2 mx-auto shadow-sm active:scale-95 transition-transform"
              >
                <Mic className="w-4 h-4" />
                <span>Record My Voice</span>
              </button>
            </div>
          )}
        </div>

        {/* Evaluation Results */}
        {evaluation && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Score & Phonetics Header */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8]">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg border ${getScoreColor(evaluation.score)}`}>
                  {evaluation.score}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#2C2C24] flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-[#C28E58]" />
                    <span>Pronunciation Score</span>
                  </div>
                  <div className="text-xs font-mono text-[#2D5438] mt-0.5 font-bold">
                    {evaluation.phoneticBreakdown}
                  </div>
                </div>
              </div>

              <button
                onClick={startPractice}
                className="p-2 rounded-lg bg-[#EBEBE0] hover:bg-[#E2E2D5] text-[#3D3D30] text-xs flex items-center gap-1.5 transition-colors"
                title="Try again"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Try Again</span>
              </button>
            </div>

            {/* Word Accuracy Tagging */}
            {evaluation.wordAccuracies && evaluation.wordAccuracies.length > 0 && (
              <div>
                <div className="text-[11px] font-semibold text-[#5A5A40] uppercase tracking-wider mb-1.5">
                  Word by Word Breakdown
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.wordAccuracies.map((w, idx) => {
                    const isGreat = w.accuracy === 'great';
                    const isGood = w.accuracy === 'good';
                    return (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 ${
                          isGreat
                            ? 'bg-[#E9F0EA] text-[#2D5438] border-[#C5DAC8]'
                            : isGood
                            ? 'bg-[#FDF6EE] text-[#A66324] border-[#F3DFC8]'
                            : 'bg-[#FBEBEB] text-[#9B3838] border-[#F4C8C8]'
                        }`}
                      >
                        {isGreat ? (
                          <CheckCircle2 className="w-3 h-3 text-[#4A6B53]" />
                        ) : (
                          <AlertCircle className="w-3 h-3 text-[#C28E58]" />
                        )}
                        <span>{w.word}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Overall Feedback & Sound Tips */}
            <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] space-y-2">
              <p className="text-xs text-[#2C2C24] leading-relaxed font-medium">
                {evaluation.feedback}
              </p>

              {evaluation.soundTips && evaluation.soundTips.length > 0 && (
                <div className="space-y-1 pt-1 border-t border-[#E3E3D8]">
                  <div className="text-[11px] font-semibold text-[#4A6B53] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Accent Tuning Tips</span>
                  </div>
                  {evaluation.soundTips.map((tip, i) => (
                    <div key={i} className="text-xs text-[#5A5A40] flex items-start gap-1.5">
                      <span className="text-[#4A6B53] font-bold">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

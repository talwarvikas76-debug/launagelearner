import React, { useEffect, useState } from 'react';
import { 
  X, 
  Volume2, 
  Bookmark, 
  BookmarkCheck, 
  Sparkles, 
  Loader2, 
  BookOpen, 
  Layers,
  Headphones
} from 'lucide-react';
import { SavedWord, LanguageConfig } from '../types';
import { speakText } from '../utils/audio';

interface WordDetails {
  word: string;
  translation: string;
  romanization?: string;
  partOfSpeech?: string;
  cefrLevel?: string;
  definition: string;
  culturalOrGrammarNote?: string;
  examples: { sentence: string; translation: string }[];
  synonyms?: string[];
}

interface WordInspectorModalProps {
  word: string;
  contextSentence?: string;
  language: LanguageConfig;
  isOpen: boolean;
  onClose: () => void;
  onSaveWord: (wordData: Omit<SavedWord, 'id' | 'createdAt'>) => void;
  onRemoveWord?: (word: string) => void;
  isSaved: boolean;
  onOpenAssistedSpeaker?: (phrase: string, translation?: string) => void;
}

export const WordInspectorModal: React.FC<WordInspectorModalProps> = ({
  word,
  contextSentence,
  language,
  isOpen,
  onClose,
  onSaveWord,
  onRemoveWord,
  isSaved,
  onOpenAssistedSpeaker,
}) => {
  const [details, setDetails] = useState<WordDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    if (!isOpen || !word) return;

    let isMounted = true;
    setLoading(true);
    setError(null);
    setDetails(null);

    fetch('/api/explain-word', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        word,
        contextSentence,
        targetLanguage: language.name,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load word analysis');
        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setDetails(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Could not fetch explanation');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, word, contextSentence, language.name]);

  if (!isOpen) return null;

  const handlePlayWordAudio = () => {
    if (!word) return;
    setIsPlayingAudio(true);
    speakText({
      text: word,
      langCode: language.speechCode,
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleToggleSave = () => {
    if (isSaved) {
      onRemoveWord?.(word);
    } else if (details) {
      onSaveWord({
        languageId: language.id,
        word: details.word || word,
        translation: details.translation || '',
        romanization: details.romanization,
        partOfSpeech: details.partOfSpeech,
        exampleSentence: details.examples?.[0]?.sentence,
        exampleTranslation: details.examples?.[0]?.translation,
        notes: details.culturalOrGrammarNote,
        mastered: false,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] border border-[#E3E3D8] shadow-2xl p-6 overflow-hidden text-[#2C2C24]">
        {/* Close Button */}
        <button
          id="close-word-modal-btn"
          onClick={onClose}
          aria-label="Close word details modal"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Loading State */}
        {loading && (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <Loader2 className="w-8 h-8 text-[#4A6B53] animate-spin mb-3" />
            <p className="text-sm font-medium text-[#2C2C24]">Analyzing &quot;{word}&quot; in {language.name}...</p>
            <p className="text-xs text-[#5A5A40] mt-1">Retrieving etymology, context, and examples</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="py-8 text-center">
            <p className="text-sm text-[#9B3838] mb-3">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#EBEBE0] hover:bg-[#E2E2D5] text-[#2C2C24] text-xs font-semibold"
            >
              Close
            </button>
          </div>
        )}

        {/* Loaded Word Details */}
        {!loading && details && (
          <div className="space-y-5">
            {/* Header: Word, Transliteration, Voice, Save Toggle */}
            <div className="flex items-start justify-between gap-4 border-b border-[#E3E3D8] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-[#2C2C24]">{details.word}</h2>
                  <button
                    id="listen-word-audio-btn"
                    onClick={handlePlayWordAudio}
                    aria-label="Listen to word pronunciation"
                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                      isPlayingAudio
                        ? 'bg-[#4A6B53] text-[#FAF9F5] border-[#3E5A45]'
                        : 'bg-[#EBEBE0] text-[#2D5438] border-[#DCDCCF] hover:bg-[#E2E2D5]'
                    }`}
                    title="Listen to native pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {onOpenAssistedSpeaker && (
                    <button
                      id="open-word-assisted-speaker-btn"
                      onClick={() => onOpenAssistedSpeaker(details.word, details.translation)}
                      aria-label="Open in Assisted Speaker"
                      className="px-2.5 py-1 rounded-lg border border-[#C5DAC8] bg-[#E9F0EA] hover:bg-[#DCE7DD] text-[#2D5438] text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-2xs"
                      title="Open Assisted Native Speaker for slow playback, syllable breakdown & mouth guide"
                    >
                      <Headphones className="w-3.5 h-3.5" />
                      <span>Assisted Speaker</span>
                    </button>
                  )}
                </div>

                {details.romanization && (
                  <p className="text-sm font-mono text-[#8B5E3C] mb-1">{details.romanization}</p>
                )}

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {details.partOfSpeech && (
                    <span className="px-2 py-0.5 rounded bg-[#EBEBE0] text-[#3D3D30] border border-[#DCDCCF] font-mono">
                      {details.partOfSpeech}
                    </span>
                  )}
                  {details.cefrLevel && (
                    <span className="px-2 py-0.5 rounded bg-[#E9F0EA] text-[#2D5438] border border-[#C5DAC8] font-mono font-bold">
                      {details.cefrLevel}
                    </span>
                  )}
                </div>
              </div>

              {/* Bookmark Button */}
              <button
                id="toggle-save-word-btn"
                onClick={handleToggleSave}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all active:scale-95 ${
                  isSaved
                    ? 'bg-[#E9F0EA] border-[#C5DAC8] text-[#2D5438] hover:bg-[#DEEADB]'
                    : 'bg-[#EBEBE0] border-[#DCDCCF] text-[#3D3D30] hover:bg-[#E2E2D5]'
                }`}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-[#4A6B53]" />
                    <span>Saved in Bank</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4" />
                    <span>Save Word</span>
                  </>
                )}
              </button>
            </div>

            {/* Translation & Definition */}
            <div>
              <div className="text-lg font-semibold text-[#2D5438] mb-1">
                {details.translation}
              </div>
              <p className="text-xs sm:text-sm text-[#3D3D30] leading-relaxed">
                {details.definition}
              </p>
            </div>

            {/* Cultural / Grammar Note */}
            {details.culturalOrGrammarNote && (
              <div className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#4A6B53] shrink-0 mt-0.5" />
                <div className="text-xs text-[#3D3D30] leading-relaxed">
                  <span className="font-semibold text-[#2D5438]">Linguistic Context: </span>
                  {details.culturalOrGrammarNote}
                </div>
              </div>
            )}

            {/* Example Sentences */}
            {details.examples && details.examples.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#5A5A40] uppercase tracking-wider mb-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#4A6B53]" />
                  <span>Real Context Examples</span>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1 scrollbar-thin">
                  {details.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-lg bg-[#FAF9F5] border border-[#E3E3D8] hover:border-[#C8C8BA] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-medium text-[#2C2C24] mb-0.5">
                          {ex.sentence}
                        </div>
                        <button
                          onClick={() => speakText({ text: ex.sentence, langCode: language.speechCode })}
                          aria-label="Listen to example sentence"
                          className="text-[#5A5A40] hover:text-[#4A6B53] transition-colors shrink-0 p-0.5"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[#5A5A40]">{ex.translation}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Synonyms */}
            {details.synonyms && details.synonyms.length > 0 && (
              <div className="flex items-center gap-2 pt-2 border-t border-[#E3E3D8] text-xs">
                <Layers className="w-3.5 h-3.5 text-[#5A5A40]" />
                <span className="text-[#5A5A40] font-medium">Related:</span>
                <div className="flex flex-wrap gap-1">
                  {details.synonyms.map((syn, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-[#EBEBE0] text-[#3D3D30] text-[11px]">
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

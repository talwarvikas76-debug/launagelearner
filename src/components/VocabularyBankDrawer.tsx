import React, { useState } from 'react';
import { 
  X, 
  BookMarked, 
  Volume2, 
  Trash2, 
  CheckCircle, 
  RotateCw, 
  Layers, 
  Search, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { SavedWord, LanguageConfig } from '../types';
import { speakText } from '../utils/audio';

interface VocabularyBankDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedWords: SavedWord[];
  currentLanguage: LanguageConfig;
  onToggleMastered: (id: string) => void;
  onDeleteWord: (id: string) => void;
  onOpenAssistedSpeaker?: (phrase: string, translation?: string) => void;
}

export const VocabularyBankDrawer: React.FC<VocabularyBankDrawerProps> = ({
  isOpen,
  onClose,
  savedWords,
  currentLanguage,
  onToggleMastered,
  onDeleteWord,
  onOpenAssistedSpeaker,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'flashcards'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const currentLangWords = savedWords.filter(
    (w) => w.languageId === currentLanguage.id || !w.languageId
  );

  const filteredWords = currentLangWords.filter((w) => {
    const q = searchQuery.toLowerCase();
    return (
      w.word.toLowerCase().includes(q) ||
      w.translation.toLowerCase().includes(q) ||
      (w.exampleSentence && w.exampleSentence.toLowerCase().includes(q))
    );
  });

  const handleNextCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % Math.max(1, currentLangWords.length));
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + currentLangWords.length) % Math.max(1, currentLangWords.length));
  };

  const currentCard = currentLangWords[flashcardIndex];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#2C2C24]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-md h-full bg-[#FFFFFF] border-l border-[#E3E3D8] text-[#2C2C24] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E3E3D8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#4A6B53]">
              <BookMarked className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2C2C24] flex items-center gap-2">
                <span>Vocabulary Bank</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#EBEBE0] text-[#3D3D30] font-mono">
                  {currentLangWords.length}
                </span>
              </h2>
              <p className="text-xs text-[#5A5A40]">{currentLanguage.name} phrases & words</p>
            </div>
          </div>

          <button
            id="close-vocab-drawer-btn"
            onClick={onClose}
            aria-label="Close vocabulary bank"
            className="p-2 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs (Word List vs Flashcards) */}
        <div className="p-4 border-b border-[#E3E3D8] bg-[#FAF9F5] flex gap-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'list'
                ? 'bg-[#2C2C24] text-[#FAF9F5] shadow-xs'
                : 'text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Saved List</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('flashcards');
              setIsFlipped(false);
            }}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'flashcards'
                ? 'bg-[#4A6B53] text-[#FAF9F5] shadow-xs'
                : 'text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flashcard Drill</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {currentLangWords.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#5A5A40]">
              <BookMarked className="w-12 h-12 text-[#A0A090] mb-3" />
              <p className="text-sm font-medium text-[#2C2C24]">No saved words yet</p>
              <p className="text-xs text-[#5A5A40] mt-1 max-w-xs leading-relaxed">
                During your conversations, click on any word or key vocabulary tag to inspect definitions and save them here!
              </p>
            </div>
          ) : activeTab === 'list' ? (
            <>
              {/* Search Bar */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 text-[#5A5A40] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search words, meanings..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#FAF9F5] border border-[#DCDCCF] text-xs text-[#2C2C24] placeholder-[#8C8C78] focus:outline-none focus:border-[#4A6B53]"
                />
              </div>

              {/* Word List */}
              <div className="space-y-2.5">
                {filteredWords.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all ${
                      item.mastered
                        ? 'bg-[#FAF9F5]/60 border-[#E3E3D8]/60 opacity-80'
                        : 'bg-[#FAF9F5] border-[#E3E3D8] hover:border-[#C8C8BA]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-[#2C2C24]">{item.word}</span>
                        <button
                          onClick={() => speakText({ text: item.word, langCode: currentLanguage.speechCode })}
                          aria-label="Listen to word"
                          className="text-[#5A5A40] hover:text-[#4A6B53] p-0.5 transition-colors cursor-pointer"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        {onOpenAssistedSpeaker && (
                          <button
                            onClick={() => onOpenAssistedSpeaker(item.word, item.translation)}
                            aria-label="Open in Assisted Pronunciation Speaker"
                            className="p-1 rounded-md bg-[#E9F0EA] hover:bg-[#DCE7DD] text-[#2D5438] transition-colors cursor-pointer"
                            title="Assisted Speaker: Slow audio, syllable breakdown & mouth guide"
                          >
                            <Headphones className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onToggleMastered(item.id)}
                          aria-label={item.mastered ? "Mark as unmastered" : "Mark as mastered"}
                          className={`p-1 rounded-md transition-colors ${
                            item.mastered
                              ? 'text-[#2D5438] bg-[#E9F0EA]'
                              : 'text-[#8C8C78] hover:text-[#2C2C24]'
                          }`}
                          title={item.mastered ? 'Mastered' : 'Mark as Mastered'}
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteWord(item.id)}
                          aria-label="Delete word"
                          className="p-1 text-[#8C8C78] hover:text-[#9B3838] rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {item.romanization && (
                      <p className="text-xs font-mono text-[#8B5E3C] mb-1">{item.romanization}</p>
                    )}

                    <p className="text-xs font-medium text-[#2D5438] mb-1.5">{item.translation}</p>

                    {item.exampleSentence && (
                      <div className="text-[11px] text-[#5A5A40] bg-[#FFFFFF] p-2 rounded-lg border border-[#E3E3D8]">
                        <div className="text-[#2C2C24]">{item.exampleSentence}</div>
                        {item.exampleTranslation && (
                          <div className="text-[#5A5A40] mt-0.5">{item.exampleTranslation}</div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Interactive Flashcards Mode */
            currentCard && (
              <div className="h-full flex flex-col justify-between py-4">
                {/* Counter */}
                <div className="flex items-center justify-between text-xs text-[#5A5A40] mb-2">
                  <span>Card {flashcardIndex + 1} of {currentLangWords.length}</span>
                  <span className="font-semibold text-[#2D5438]">{currentCard.mastered ? '✨ Mastered' : '📖 Learning'}</span>
                </div>

                {/* 3D Flip Card */}
                <div
                  onClick={() => setIsFlipped(!isFlipped)}
                  className="w-full flex-1 min-h-[260px] rounded-2xl bg-[#FAF9F5] border-2 border-[#DCDCCF] hover:border-[#4A6B53] p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all shadow-sm select-none group"
                >
                  {!isFlipped ? (
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#4A6B53]">
                        Target Word
                      </span>
                      <h3 className="text-3xl font-bold text-[#2C2C24]">{currentCard.word}</h3>
                      {currentCard.romanization && (
                        <p className="text-sm font-mono text-[#8B5E3C]">{currentCard.romanization}</p>
                      )}
                      <p className="text-xs text-[#5A5A40] pt-4 flex items-center justify-center gap-1">
                        <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
                        <span>Tap to reveal meaning</span>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#5A5A40]">
                        English Meaning
                      </span>
                      <h3 className="text-2xl font-bold text-[#2D5438]">{currentCard.translation}</h3>
                      {currentCard.exampleSentence && (
                        <div className="text-xs text-[#3D3D30] bg-[#FFFFFF] p-3 rounded-xl max-w-xs mt-2 border border-[#E3E3D8]">
                          <p className="font-medium text-[#2C2C24]">{currentCard.exampleSentence}</p>
                          {currentCard.exampleTranslation && (
                            <p className="text-[#5A5A40] mt-1">{currentCard.exampleTranslation}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="pt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={handlePrevCard}
                    aria-label="Previous flashcard"
                    className="p-3 rounded-xl bg-[#EBEBE0] hover:bg-[#E2E2D5] text-[#2C2C24] transition-colors shadow-xs"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => speakText({ text: currentCard.word, langCode: currentLanguage.speechCode })}
                    className="flex-1 py-3 rounded-xl bg-[#EBEBE0] hover:bg-[#E2E2D5] text-[#2C2C24] text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                  >
                    <Volume2 className="w-4 h-4 text-[#4A6B53]" />
                    <span>Pronounce</span>
                  </button>

                  <button
                    onClick={() => {
                      onToggleMastered(currentCard.id);
                      handleNextCard();
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>{currentCard.mastered ? 'Keep in Bank' : 'Mark Mastered'}</span>
                  </button>

                  <button
                    onClick={handleNextCard}
                    aria-label="Next flashcard"
                    className="p-3 rounded-xl bg-[#EBEBE0] hover:bg-[#E2E2D5] text-[#2C2C24] transition-colors shadow-xs"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

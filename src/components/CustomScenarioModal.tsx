import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Loader2, 
  Wand2, 
  Lightbulb 
} from 'lucide-react';
import { Scenario, LanguageConfig, CEFRLevel } from '../types';

interface CustomScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: LanguageConfig;
  level: CEFRLevel;
  onScenarioCreated: (scenario: Scenario) => void;
}

const INSPIRATION_IDEAS = [
  'Ordering street tacos and spicy salsas at a night market in Mexico City',
  'Checking into a traditional Japanese Ryokan and asking about hot springs etiquette',
  'Renting an apartment in Berlin: discussing lease terms, deposit, and utilities',
  'Asking a barista in Rome for the best local coffee beans to take home',
  'Discussing favorite modern movies and sci-fi books at a Parisian bookstore',
  'Reporting a lost passport at the consular office and asking for replacement procedures',
];

export const CustomScenarioModal: React.FC<CustomScenarioModalProps> = ({
  isOpen,
  onClose,
  language,
  level,
  onScenarioCreated,
}) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt || !prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          targetLanguage: language,
          level,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate scenario');
      }

      const newScenario: Scenario = await response.json();
      onScenarioCreated(newScenario);
      onClose();
    } catch (err: any) {
      console.error('Scenario generation error:', err);
      setError(err.message || 'Could not generate scenario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] border border-[#E3E3D8] shadow-2xl p-6 overflow-hidden text-[#2C2C24]">
        {/* Close button */}
        <button
          id="close-custom-scenario-modal-btn"
          onClick={onClose}
          aria-label="Close custom scenario builder"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#4A6B53]">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#2C2C24]">AI Custom Scenario Builder</h2>
            <p className="text-xs text-[#5A5A40]">
              Create any custom roleplay situation in {language.name} ({level})
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#2C2C24] mb-1.5">
              Describe your scenario idea:
            </label>
            <textarea
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I want to practice ordering authentic dim sum and asking about gluten-free dumplings in Hong Kong..."
              className="w-full p-3 rounded-xl bg-[#FAF9F5] border border-[#DCDCCF] text-xs sm:text-sm text-[#2C2C24] placeholder-[#8C8C78] focus:outline-none focus:border-[#4A6B53] transition-all resize-none"
              required
            />
          </div>

          {/* Quick Idea Starters */}
          <div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-[#5A5A40] uppercase tracking-wider mb-2">
              <Lightbulb className="w-3.5 h-3.5 text-[#C28E58]" />
              <span>Or click an inspiration prompt:</span>
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
              {INSPIRATION_IDEAS.map((idea, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setPrompt(idea)}
                  className="w-full text-left p-2 rounded-lg bg-[#FAF9F5] hover:bg-[#EBEBE0] border border-[#E3E3D8] text-[11px] text-[#3D3D30] hover:text-[#2D5438] transition-colors truncate"
                >
                  &ldquo;{idea}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-[#9B3838] bg-[#FBEBEB] p-2.5 rounded-lg border border-[#F4C8C8]">
              {error}
            </p>
          )}

          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#EBEBE0] hover:bg-[#E2E2D5] text-[#2C2C24] text-xs font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="px-5 py-2 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] disabled:opacity-50 text-[#FAF9F5] text-xs font-bold flex items-center gap-2 shadow-xs transition-all active:scale-98"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Designing Scenario...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Scenario</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Target, 
  Clock, 
  MessageSquare, 
  Check, 
  Sparkles, 
  Flame, 
  Award,
  Zap
} from 'lucide-react';
import { DailyGoal, GoalMetric } from '../types';

interface DailyGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: DailyGoal;
  onSaveGoal: (targetType: GoalMetric, targetValue: number) => void;
}

const MINUTE_PRESETS = [
  { value: 5, label: '5 min', desc: 'Casual brush-up & warm-up', icon: Zap },
  { value: 10, label: '10 min', desc: 'Steady daily habit builder', icon: Clock },
  { value: 15, label: '15 min', desc: 'Recommended for rapid fluency', badge: 'Popular', icon: Sparkles },
  { value: 20, label: '20 min', desc: 'Deep scenario immersion', icon: Flame },
  { value: 30, label: '30 min', desc: 'Intensive conversation practice', icon: Award },
];

const CONVERSATION_PRESETS = [
  { value: 1, label: '1 scenario', desc: 'Quick daily check-in', icon: MessageSquare },
  { value: 2, label: '2 scenarios', desc: 'Recommended daily practice', badge: 'Popular', icon: Sparkles },
  { value: 3, label: '3 scenarios', desc: 'High retention & multi-role', icon: Flame },
  { value: 5, label: '5 scenarios', desc: 'Mastery challenge', icon: Award },
];

export const DailyGoalModal: React.FC<DailyGoalModalProps> = ({
  isOpen,
  onClose,
  goal,
  onSaveGoal,
}) => {
  const [selectedType, setSelectedType] = useState<GoalMetric>(goal.targetType);
  const [selectedValue, setSelectedValue] = useState<number>(goal.targetValue);
  const [isCustom, setIsCustom] = useState<boolean>(() => {
    const presets = goal.targetType === 'minutes' ? MINUTE_PRESETS : CONVERSATION_PRESETS;
    return !presets.some((p) => p.value === goal.targetValue);
  });
  const [customInput, setCustomInput] = useState<string>(String(goal.targetValue));

  if (!isOpen) return null;

  const handleTypeChange = (type: GoalMetric) => {
    setSelectedType(type);
    setIsCustom(false);
    if (type === 'minutes') {
      setSelectedValue(15);
      setCustomInput('15');
    } else {
      setSelectedValue(2);
      setCustomInput('2');
    }
  };

  const handleSave = () => {
    let finalValue = selectedValue;
    if (isCustom) {
      const parsed = parseInt(customInput, 10);
      if (!isNaN(parsed) && parsed > 0) {
        finalValue = Math.min(selectedType === 'minutes' ? 180 : 20, Math.max(1, parsed));
      } else {
        finalValue = selectedType === 'minutes' ? 15 : 2;
      }
    }
    onSaveGoal(selectedType, finalValue);
    onClose();
  };

  const currentPresets = selectedType === 'minutes' ? MINUTE_PRESETS : CONVERSATION_PRESETS;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-lg rounded-2xl bg-[#FFFFFF] border border-[#DCDCCF] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#E3E3D8] bg-[#FAF9F5] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#E9F0EA] border border-[#C5DAC8] flex items-center justify-center text-[#2D5438]">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2C2C24]">Set Daily Practice Target</h2>
              <p className="text-xs text-[#5A5A40]">Consistency builds native language reflexes</p>
            </div>
          </div>
          <button
            id="close-daily-goal-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Target Metric Selection: Minutes vs Conversations */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-2.5">
              Goal Tracking Metric
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                id="goal-metric-minutes-btn"
                onClick={() => handleTypeChange('minutes')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  selectedType === 'minutes'
                    ? 'bg-[#E9F0EA] border-[#4A6B53] text-[#2D5438] shadow-xs'
                    : 'bg-[#FAF9F5] border-[#E3E3D8] text-[#2C2C24] hover:border-[#C8C8BA]'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedType === 'minutes' ? 'bg-[#4A6B53] text-white' : 'bg-[#EBEBE0] text-[#5A5A40]'}`}>
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Minutes per Day</div>
                  <div className="text-[11px] text-[#5A5A40] mt-0.5">Track spoken time</div>
                </div>
              </button>

              <button
                type="button"
                id="goal-metric-conversations-btn"
                onClick={() => handleTypeChange('conversations')}
                className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  selectedType === 'conversations'
                    ? 'bg-[#E9F0EA] border-[#4A6B53] text-[#2D5438] shadow-xs'
                    : 'bg-[#FAF9F5] border-[#E3E3D8] text-[#2C2C24] hover:border-[#C8C8BA]'
                }`}
              >
                <div className={`p-2 rounded-lg ${selectedType === 'conversations' ? 'bg-[#4A6B53] text-white' : 'bg-[#EBEBE0] text-[#5A5A40]'}`}>
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold">Scenarios per Day</div>
                  <div className="text-[11px] text-[#5A5A40] mt-0.5">Track roleplay dialogues</div>
                </div>
              </button>
            </div>
          </div>

          {/* Preset Targets */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5A5A40] mb-2.5">
              Select Target {selectedType === 'minutes' ? 'Duration' : 'Count'}
            </label>
            <div className="space-y-2">
              {currentPresets.map((preset) => {
                const isSelected = !isCustom && selectedValue === preset.value;
                const IconComponent = preset.icon;

                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => {
                      setIsCustom(false);
                      setSelectedValue(preset.value);
                      setCustomInput(String(preset.value));
                    }}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all text-left ${
                      isSelected
                        ? 'bg-[#E9F0EA] border-[#4A6B53] text-[#2D5438] shadow-xs'
                        : 'bg-[#FFFFFF] border-[#E3E3D8] text-[#2C2C24] hover:bg-[#FAF9F5] hover:border-[#C8C8BA]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#4A6B53]/20 text-[#2D5438]' : 'bg-[#FAF9F5] text-[#5A5A40]'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold flex items-center gap-2">
                          <span>{preset.label}</span>
                          {preset.badge && (
                            <span className="px-1.5 py-0.2 text-[9px] font-semibold uppercase tracking-wider rounded-full bg-[#D4A373]/20 text-[#9E5D24] border border-[#D4A373]/30">
                              {preset.badge}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#5A5A40]">{preset.desc}</div>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isSelected ? 'bg-[#4A6B53] border-[#4A6B53] text-white' : 'border-[#DCDCCF]'}`}>
                      {isSelected && <Check className="w-3 h-3" />}
                    </div>
                  </button>
                );
              })}

              {/* Custom Value Option */}
              <div className={`p-3 rounded-xl border transition-all ${
                isCustom 
                  ? 'bg-[#E9F0EA] border-[#4A6B53]' 
                  : 'bg-[#FFFFFF] border-[#E3E3D8] hover:bg-[#FAF9F5]'
              }`}>
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setIsCustom(true)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isCustom ? 'bg-[#4A6B53]/20 text-[#2D5438]' : 'bg-[#FAF9F5] text-[#5A5A40]'}`}>
                      <Target className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#2C2C24]">Custom Daily Target</div>
                      <div className="text-[11px] text-[#5A5A40]">
                        Enter your exact preferred {selectedType === 'minutes' ? 'minutes' : 'scenarios'}
                      </div>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${isCustom ? 'bg-[#4A6B53] border-[#4A6B53] text-white' : 'border-[#DCDCCF]'}`}>
                    {isCustom && <Check className="w-3 h-3" />}
                  </div>
                </div>

                {isCustom && (
                  <div className="mt-3 pt-3 border-t border-[#C5DAC8] flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max={selectedType === 'minutes' ? 180 : 20}
                      value={customInput}
                      onChange={(e) => {
                        setCustomInput(e.target.value);
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val)) setSelectedValue(val);
                      }}
                      className="w-24 px-3 py-1.5 rounded-lg bg-white border border-[#4A6B53] text-sm font-bold text-[#2C2C24] text-center focus:outline-none"
                    />
                    <span className="text-xs text-[#2D5438] font-medium">
                      {selectedType === 'minutes' ? 'minutes per day' : 'conversations per day'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Research / Motivational Callout */}
          <div className="p-3.5 rounded-xl bg-[#FDF6EE] border border-[#F3DFC8] flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#C28E58] shrink-0 mt-0.5" />
            <div className="text-[11px] text-[#8C521C] leading-relaxed">
              <span className="font-bold">Linguistic Tip:</span> Short daily sessions (10-15 mins) activate active recall and synaptic consolidation far more effectively than one long weekly study session.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#E3E3D8] bg-[#FAF9F5] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#5A5A40] hover:text-[#2C2C24] hover:bg-[#EBEBE0] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            id="save-daily-goal-btn"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 active:scale-98"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Save Daily Goal</span>
          </button>
        </div>
      </div>
    </div>
  );
};

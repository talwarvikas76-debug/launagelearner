import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  Clock, 
  RotateCcw, 
  Check, 
  BookOpen,
  FileDown,
  Download,
  FileJson,
  Loader2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { SessionReport, LanguageConfig, ChatMessage, DailyGoal, CourseEnrollment } from '../types';
import { generatePDFReport, exportSessionBundle, exportSessionJSON } from '../utils/exportUtils';
import { calculateGoalProgress } from '../utils/goalUtils';

interface SessionSummaryModalProps {
  report: SessionReport | null;
  language: LanguageConfig;
  messages?: ChatMessage[];
  dailyGoal?: DailyGoal;
  isOpen: boolean;
  onClose: () => void;
  onRestartScenario: () => void;
  enrollment?: CourseEnrollment;
  onOpenPaymentModal?: () => void;
}

export const SessionSummaryModal: React.FC<SessionSummaryModalProps> = ({
  report,
  language,
  messages = [],
  dailyGoal,
  isOpen,
  onClose,
  onRestartScenario,
  enrollment,
  onOpenPaymentModal,
}) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingBundle, setIsExportingBundle] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && report) {
      // Trigger festive celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [isOpen, report]);

  if (!isOpen || !report) return null;

  const goalProgress = dailyGoal ? calculateGoalProgress(dailyGoal) : null;

  const handleDownloadPDF = async () => {
    setIsExportingPDF(true);
    try {
      generatePDFReport(report, language, messages);
      setExportNotice('PDF summary downloaded successfully!');
      setTimeout(() => setExportNotice(null), 4000);
    } catch (err) {
      console.warn('PDF export error:', err);
      setExportNotice('Could not generate PDF. Please try again.');
      setTimeout(() => setExportNotice(null), 4000);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportBundle = () => {
    setIsExportingBundle(true);
    try {
      exportSessionBundle(report, language, messages);
      setExportNotice('Full session & audio archive downloaded successfully!');
      setTimeout(() => setExportNotice(null), 4000);
    } catch (err) {
      console.warn('Bundle export error:', err);
      setExportNotice('Could not export session bundle.');
      setTimeout(() => setExportNotice(null), 4000);
    } finally {
      setIsExportingBundle(false);
    }
  };

  const handleExportJSON = () => {
    try {
      exportSessionJSON(report, language, messages);
      setExportNotice('Session JSON archive downloaded!');
      setTimeout(() => setExportNotice(null), 4000);
    } catch (err) {
      console.warn('JSON export error:', err);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-[#2D5438] border-[#C5DAC8] bg-[#E9F0EA]';
    if (score >= 70) return 'text-[#A66324] border-[#F3DFC8] bg-[#FDF6EE]';
    return 'text-[#9B3838] border-[#F4C8C8] bg-[#FBEBEB]';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2C2C24]/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#FFFFFF] border border-[#E3E3D8] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto text-[#2C2C24] scrollbar-thin">
        {/* Top Trophy Banner */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#FDF6EE] border border-[#F3DFC8] flex items-center justify-center text-[#C28E58] mx-auto mb-3 shadow-xs">
            <Trophy className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#2C2C24]">Practice Session Completed!</h2>
          <p className="text-xs sm:text-sm text-[#5A5A40] mt-1">
            {report.scenarioTitle} • {report.languageName} ({report.level})
          </p>
        </div>

        {/* Score Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${getScoreColor(report.overallScore)}`}>
            <div className="text-2xl sm:text-3xl font-mono font-black">{report.overallScore}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider mt-1">Overall Score</div>
          </div>

          <div className="p-4 rounded-xl border border-[#E3E3D8] bg-[#FAF9F5] flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-mono font-bold text-[#2C2C24]">{report.fluencyScore}</div>
            <div className="text-[11px] text-[#5A5A40] font-medium uppercase tracking-wider mt-1">Fluency</div>
          </div>

          <div className="p-4 rounded-xl border border-[#E3E3D8] bg-[#FAF9F5] flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-mono font-bold text-[#2C2C24]">{report.accuracyScore}</div>
            <div className="text-[11px] text-[#5A5A40] font-medium uppercase tracking-wider mt-1">Grammar</div>
          </div>

          <div className="p-4 rounded-xl border border-[#E3E3D8] bg-[#FAF9F5] flex flex-col items-center justify-center text-center">
            <div className="text-2xl font-mono font-bold text-[#2C2C24]">{report.vocabularyScore}</div>
            <div className="text-[11px] text-[#5A5A40] font-medium uppercase tracking-wider mt-1">Vocabulary</div>
          </div>
        </div>

        {/* Key Stats Bar */}
        <div className="flex flex-wrap items-center justify-around gap-4 p-3.5 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] mb-6 text-xs text-[#3D3D30]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#4A6B53]" />
            <span>Practice Time: {Math.max(1, Math.round(report.durationSeconds / 60))} mins</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Target className="w-4 h-4 text-[#C28E58]" />
            <span>Objectives: {report.completedObjectivesCount} / {report.totalObjectivesCount}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#4A6B53]" />
            <span>Dialogue Turns: {report.turnsCount}</span>
          </div>
        </div>

        {/* Daily Goal Impact Card */}
        {goalProgress && (
          <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] mb-6 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-bold text-[#2C2C24]">
                <Target className="w-4 h-4 text-[#4A6B53]" />
                <span>Today&apos;s Daily Goal Progress</span>
              </div>
              <span className="font-mono font-bold text-[#2D5438]">
                {goalProgress.current} / {goalProgress.target} {goalProgress.unit} ({goalProgress.percentage}%)
              </span>
            </div>
            <div className="h-2.5 w-full bg-[#EBEBE0] rounded-full overflow-hidden border border-[#DCDCCF]">
              <div
                className="h-full bg-linear-to-r from-[#C28E58] to-[#4A6B53] rounded-full transition-all duration-500"
                style={{ width: `${goalProgress.percentage}%` }}
              />
            </div>
            {goalProgress.isCompleted && (
              <p className="text-[11px] text-[#2D5438] font-semibold flex items-center gap-1 pt-0.5">
                <Check className="w-3.5 h-3.5" />
                <span>Congratulations! You reached your daily practice target today.</span>
              </p>
            )}
          </div>
        )}

        {/* Strengths & Growth Areas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Strengths */}
          <div className="p-4 rounded-xl bg-[#E9F0EA]/70 border border-[#C5DAC8] space-y-2">
            <div className="text-xs font-bold text-[#2D5438] uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#4A6B53]" />
              <span>Key Strengths</span>
            </div>
            <div className="space-y-1.5">
              {report.strengths.map((str, idx) => (
                <div key={idx} className="text-xs text-[#2C2C24] flex items-start gap-1.5 leading-relaxed">
                  <span className="text-[#4A6B53] font-bold">•</span>
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Areas */}
          <div className="p-4 rounded-xl bg-[#FDF6EE]/80 border border-[#F3DFC8] space-y-2">
            <div className="text-xs font-bold text-[#A66324] uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#C28E58]" />
              <span>Next Steps Focus</span>
            </div>
            <div className="space-y-1.5">
              {report.areasToImprove.map((area, idx) => (
                <div key={idx} className="text-xs text-[#2C2C24] flex items-start gap-1.5 leading-relaxed">
                  <span className="text-[#C28E58] font-bold">•</span>
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mistake Reviews & Explanations */}
        {report.mistakesReviewed && report.mistakesReviewed.length > 0 && (
          <div className="mb-6 space-y-3">
            <div className="text-xs font-bold text-[#5A5A40] uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#4A6B53]" />
              <span>Review Corrections from Dialogue</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {report.mistakesReviewed.map((m, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#9B3838] line-through font-mono">&quot;{m.original}&quot;</span>
                    <span className="text-[#5A5A40]">→</span>
                    <span className="text-[#2D5438] font-bold font-mono">&quot;{m.corrected}&quot;</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A40]">{m.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offline Export & Downloads Section */}
        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E3E3D8] mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-[#2C2C24] uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-4 h-4 text-[#4A6B53]" />
              <span>Export & Offline Study</span>
            </div>
            <span className="text-[11px] text-[#5A5A40]">Offline Review</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Download PDF Option */}
            <button
              id="export-pdf-summary-btn"
              type="button"
              onClick={handleDownloadPDF}
              disabled={isExportingPDF}
              className="px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F3ED] border border-[#DCDCCF] hover:border-[#4A6B53]/40 text-[#2C2C24] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs group"
            >
              {isExportingPDF ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#4A6B53]" />
              ) : (
                <FileDown className="w-4 h-4 text-[#4A6B53] group-hover:scale-110 transition-transform" />
              )}
              <span>Download PDF Summary</span>
            </button>

            {/* Export Session & Audio Bundle Option */}
            <button
              id="export-session-audio-bundle-btn"
              type="button"
              onClick={handleExportBundle}
              disabled={isExportingBundle}
              className="px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F3ED] border border-[#DCDCCF] hover:border-[#C28E58]/40 text-[#2C2C24] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs group"
            >
              {isExportingBundle ? (
                <Loader2 className="w-4 h-4 animate-spin text-[#C28E58]" />
              ) : (
                <Download className="w-4 h-4 text-[#C28E58] group-hover:scale-110 transition-transform" />
              )}
              <span>Export Session & Audio File</span>
            </button>
          </div>

          {/* Quick JSON download link & notification */}
          <div className="flex items-center justify-between text-[11px] text-[#5A5A40] pt-1">
            <span>Includes dialogue transcript, grammar notes, & scores</span>
            <button
              onClick={handleExportJSON}
              className="text-[#4A6B53] hover:underline flex items-center gap-1 font-medium cursor-pointer"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>Raw JSON</span>
            </button>
          </div>

          {exportNotice && (
            <div className="p-2 rounded-lg bg-[#E9F0EA] border border-[#C5DAC8] text-xs text-[#2D5438] flex items-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5 shrink-0" />
              <span>{exportNotice}</span>
            </div>
          )}

          {/* Next Practice Upgrade Callout for non-enrolled users */}
          {enrollment && !enrollment.isEnrolled && (
            <div className="p-4 rounded-xl bg-linear-to-r from-[#FAF9F5] to-[#FDF6EE] border border-[#F3DFC8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8C521C]">
                  <Sparkles className="w-3.5 h-3.5 text-[#C28E58]" />
                  <span>Ready for your Next Practice?</span>
                </div>
                <p className="text-xs text-[#5A5A40]">
                  Unlock all 50+ roleplay scenarios across all 6 languages for <span className="line-through text-[#8A8A7A]">Rs. 4,999/-</span> <span className="font-bold text-[#2D5438]">Rs. 499/-</span>.
                </p>
              </div>

              {onOpenPaymentModal && (
                <button
                  type="button"
                  id="summary-upgrade-btn"
                  onClick={() => {
                    onClose();
                    onOpenPaymentModal();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#4A6B53] hover:bg-[#3E5A45] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Unlock Course (Rs. 499)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#E3E3D8]">
          <button
            id="summary-restart-btn"
            onClick={onRestartScenario}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#EBEBE0] hover:bg-[#E2E2D5] text-[#2C2C24] font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Practice Again</span>
          </button>

          <button
            id="summary-finish-btn"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#4A6B53] hover:bg-[#3E5A45] text-[#FAF9F5] font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Done & Return to Scenarios</span>
          </button>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Clock,
  HelpCircle,
  Check,
  Lightbulb,
  User,
  Users,
  Package,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  ColumnOptionItem,
  ComputerId,
  FloorVerifiedBadge,
  Language,
  LayerNumber,
  RoomState,
} from '../../types';
import { getScenarioById } from '../../data/scenarios';
import { OSI_LAYERS } from '../../data/layers';
import { t } from '../../data/translations';
import { getColumnOptionsForFloor } from '../../data/layerColumns';
import { playSuccessSound, playErrorSound, playPacketWhoosh } from '../../utils/audio';
import { LayerIllustration } from '../Common/LayerIllustration';

interface StudentChallengeProps {
  currentComputer: ComputerId;
  currentLayer: LayerNumber;
  playerName: string;
  roomState: RoomState;
  currentLang: Language;
  onOptionVerified: (badge: FloorVerifiedBadge) => void;
  onAdvanceFloor: () => void;
  onOpenCheatSheet: () => void;
  onSwitchRole: (computer: ComputerId, layer: LayerNumber) => void;
}

export const StudentChallenge: React.FC<StudentChallengeProps> = ({
  currentComputer,
  currentLayer,
  playerName,
  roomState,
  currentLang,
  onOptionVerified,
  onAdvanceFloor,
  onOpenCheatSheet,
  onSwitchRole,
}) => {
  const [selectedIds, setSelectedIds] = React.useState<Record<string, 'correct' | 'wrong'>>({});
  const [activeExplanation, setActiveExplanation] = React.useState<ColumnOptionItem | null>(null);
  const [isRolePickerOpen, setIsRolePickerOpen] = React.useState<boolean>(false);

  const texts = t[currentLang];
  const scenario = getScenarioById(roomState?.scenarioId || 'http_browser');
  const layerMeta = OSI_LAYERS.find((l) => l.layer === currentLayer);
  const isSender = currentComputer === 'A';

  const isMyTurn =
    roomState?.activeComputer === currentComputer &&
    roomState?.activeLayer === currentLayer &&
    roomState?.gameStatus === 'playing';

  const floorData = React.useMemo(() => {
    return getColumnOptionsForFloor(scenario, currentComputer, currentLayer);
  }, [scenario, currentComputer, currentLayer]);

  const allOptions = React.useMemo(() => {
    return [
      ...floorData.pduAndProtocol,
      ...floorData.addressAndPorts,
      ...floorData.processAndActions,
    ];
  }, [floorData]);

  const totalRequiredCorrect = React.useMemo(() => {
    return allOptions.filter((opt) => opt.isCorrect).length;
  }, [allOptions]);

  const currentCorrectCount = React.useMemo(() => {
    return Object.entries(selectedIds).filter(([_, status]) => status === 'correct').length;
  }, [selectedIds]);

  const isFloorCompleted = totalRequiredCorrect > 0 && currentCorrectCount >= totalRequiredCorrect;

  React.useEffect(() => {
    setSelectedIds({});
    setActiveExplanation(null);
  }, [currentComputer, currentLayer, roomState?.activeComputer, roomState?.activeLayer, roomState?.scenarioId]);

  const handleItemClick = (item: ColumnOptionItem) => {
    if (selectedIds[item.id] === 'correct') {
      setActiveExplanation(item);
      return;
    }

    if (item.isCorrect) {
      playSuccessSound();
      setSelectedIds((prev) => ({ ...prev, [item.id]: 'correct' }));
      setActiveExplanation(item);

      onOptionVerified({
        id: item.id,
        labelHe: item.badgeLabelHe,
        labelAr: item.badgeLabelAr,
        category: item.category,
      });

      if (currentCorrectCount + 1 >= totalRequiredCorrect) {
        confetti({
          particleCount: 85,
          spread: 80,
          origin: { y: 0.65 },
        });
      }
    } else {
      playErrorSound();
      // Gentle warning state - no harsh red
      setSelectedIds((prev) => ({ ...prev, [item.id]: 'wrong' }));
      setActiveExplanation(item);
    }
  };

  // Distinct PDU pill style
  const getPduBadgeStyle = (layer: LayerNumber) => {
    switch (layer) {
      case 7:
      case 6:
      case 5:
        return 'bg-[#FFEDD5] border-[#FDBA74] text-[#9A3412]';
      case 4:
        return 'bg-[#ECFCCB] border-[#84CC16] text-[#365314] font-black ring-2 ring-[#BEF264]';
      case 3:
        return 'bg-[#DCFCE7] border-[#22C55E] text-[#14532D] font-black ring-2 ring-[#86EFAC]';
      case 2:
        return 'bg-[#D1FAE5] border-[#10B981] text-[#064E3B] font-black ring-2 ring-[#6EE7B7]';
      case 1:
        return 'bg-[#CCFBF1] border-[#14B8A6] text-[#134E4A] font-black ring-2 ring-[#5EEAD4]';
    }
  };

  // Friendly icons and emojis to aid memory
  const getFriendlyEmoji = (iconName: string, nameHe: string) => {
    if (nameHe.includes('נתונים') || iconName === 'FileText') return '📄';
    if (nameHe.includes('HTTP') || iconName === 'Globe') return '🌐';
    if (nameHe.includes('DNS') || iconName === 'Search') return '🔍';
    if (nameHe.includes('SMTP') || iconName === 'Send') return '✉️';
    if (nameHe.includes('IMAP') || iconName === 'Inbox') return '📥';
    if (nameHe.includes('FTP') || iconName === 'FolderDown') return '📁';
    if (nameHe.includes('DHCP') || iconName === 'RadioTower') return '📡';
    if (nameHe.includes('SSH') || iconName === 'Terminal') return '💻';
    if (nameHe.includes('VoIP') || iconName === 'Video') return '📹';
    if (nameHe.includes('ICMP') || iconName === 'Activity') return '🔔';
    if (nameHe.includes('הצפנ') || iconName === 'Lock') return '🔐';
    if (nameHe.includes('שיחה') || iconName === 'MessagesSquare') return '💬';
    if (nameHe.includes('מקטע') || iconName === 'Boxes') return '📦';
    if (nameHe.includes('חבילה') || iconName === 'Package') return '✉️';
    if (nameHe.includes('מסגרת') || iconName === 'Cpu') return '🗂️';
    if (nameHe.includes('ביט') || iconName === 'Binary') return '⚡';
    if (nameHe.includes('ראוטר') || iconName === 'Network' || iconName === 'Compass') return '🧭';
    if (nameHe.includes('פורט')) return '🚪';
    if (nameHe.includes('MAC')) return '🏷️';
    if (nameHe.includes('CRC')) return '🛡️';
    return '⭐';
  };

  const renderColumn = (
    titleHe: string,
    titleAr: string,
    items: ColumnOptionItem[],
    colNum: number,
    colorTheme: { bg: string; border: string; tagBg: string; text: string }
  ) => {
    return (
      <div
        className={`flex-1 min-w-[280px] rounded-3xl p-4 flex flex-col gap-3 shadow-sm border-2 ${colorTheme.bg} ${colorTheme.border}`}
      >
        {/* Column Header */}
        <div className="flex items-center justify-between pb-2 border-b border-[#E6E0D2]">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#FFFDF9] text-[#44403C] shadow-2xs flex items-center justify-center font-black text-xs border border-[#DDD6C4]">
              {colNum}
            </span>
            <span className="font-black text-sm text-[#1C1917]">
              {currentLang === 'he' ? titleHe : titleAr}
            </span>
          </div>
          <span className="text-xs bg-[#FFFDF9] px-2.5 py-0.5 rounded-full font-bold text-[#57534E] border border-[#DDD6C4]">
            {items.filter((i) => selectedIds[i.id] === 'correct').length}/
            {items.filter((i) => i.isCorrect).length}
          </span>
        </div>

        {/* Options Cards */}
        <div className="flex flex-col gap-2.5">
          {items.map((item) => {
            const status = selectedIds[item.id];
            const isCorrect = status === 'correct';
            const isWrong = status === 'wrong';
            const emoji = getFriendlyEmoji(item.iconName, item.nameHe);

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`w-full text-right p-3.5 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 shadow-2xs cursor-pointer select-none ${
                  isCorrect
                    ? 'bg-[#DCFCE7] border-[#86EFAC] text-[#14532D] shadow-sm scale-[1.01]'
                    : isWrong
                    ? 'bg-[#FEF3C7] border-[#FCD34D] text-[#78350F]'
                    : 'bg-[#FFFDF9] border-[#E8E2D2] hover:border-[#93C5FD] text-[#292524]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-2xs ${
                      isCorrect
                        ? 'bg-[#BBF7D0]'
                        : isWrong
                        ? 'bg-[#FDE68A]'
                        : 'bg-[#F5F2EB]'
                    }`}
                  >
                    {emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="font-black text-sm text-[#1C1917] leading-snug">
                      {currentLang === 'he' ? item.nameHe : item.nameAr}
                    </div>
                    <div className="text-xs text-[#57534E] mt-0.5 leading-tight">
                      {currentLang === 'he' ? item.subtextHe : item.subtextAr}
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {isCorrect && (
                    <div className="w-6 h-6 rounded-full bg-[#10B981] text-white flex items-center justify-center font-black shadow-2xs">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}
                  {isWrong && (
                    <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-white flex items-center justify-center font-black text-xs shadow-2xs">
                      ?
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 p-2 sm:p-4 pb-20">
      {/* Top Banner: Matching User Infographic + Prominent PDU Message Type */}
      <div className="bg-[#FAF7F0] border-2 border-[#E4DEC8] rounded-3xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Layer Graphic from Infographic */}
          <LayerIllustration layer={currentLayer} size="lg" />

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#1D4ED8] bg-[#DBEAFE] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]">
                {isSender ? 'בניין שולח א׳ (Encapsulation)' : 'בניין מקבל ב׳ (Decapsulation)'}
              </span>
              <span className="text-xs font-black text-[#92400E] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                קומה {currentLayer} מתוך 7
              </span>
              <span className="text-xs font-medium text-[#57534E]">
                {playerName}
              </span>
            </div>

            <h2 className="font-black text-xl text-[#1C1917] mt-1">
              {currentLang === 'he' ? layerMeta?.nameHe : layerMeta?.nameAr}
            </h2>

            {/* Prominent PDU Highlight */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="text-xs font-bold text-[#57534E]">
                סוג ההודעה בקומה שלך:
              </span>
              <span
                className={`text-xs sm:text-sm px-3 py-1 rounded-xl border-2 font-black shadow-2xs ${getPduBadgeStyle(
                  currentLayer
                )}`}
              >
                {currentLang === 'he' ? layerMeta?.pduHe : layerMeta?.pduAr}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Role Switcher & Flowchart Guide */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={() => setIsRolePickerOpen(!isRolePickerOpen)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#EFEAE0] hover:bg-[#E5DFD3] text-[#44403C] text-xs font-bold transition-colors cursor-pointer border border-[#DDD6C4]"
          >
            <Users className="w-4 h-4 text-[#2563EB]" />
            <span>החלף תפקיד (1-14)</span>
          </button>

          <button
            onClick={onOpenCheatSheet}
            className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#DBEAFE] hover:bg-[#BFDBFE] text-[#1D4ED8] text-xs font-bold transition-colors cursor-pointer border border-[#93C5FD]"
          >
            <HelpCircle className="w-4 h-4" />
            <span>רמזים ותרשים</span>
          </button>
        </div>
      </div>

      {/* 14-Role Quick Switcher Drawer */}
      {isRolePickerOpen && (
        <div className="bg-[#FFFDF9] border-2 border-[#E4DEC8] rounded-3xl p-4 shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-black text-xs text-[#1C1917]">
              בחר את התפקיד שלך בכיתה (עד 14 משתתפים שונים):
            </span>
            <button
              onClick={() => setIsRolePickerOpen(false)}
              className="text-xs text-[#78716C] hover:text-[#1C1917] font-bold"
            >
              ✕ סגור
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Computer A: Floors 7 down to 1 */}
            <div className="p-3 bg-[#EFF6FF] rounded-2xl border border-[#BFDBFE]">
              <div className="font-black text-xs text-[#1D4ED8] mb-2 flex items-center gap-1">
                <span>🏢 מחשב א׳ (שולח - אריזה Encapsulation):</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[7, 6, 5, 4, 3, 2, 1].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      onSwitchRole('A', lvl as LayerNumber);
                      setIsRolePickerOpen(false);
                    }}
                    className={`py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      currentComputer === 'A' && currentLayer === lvl
                        ? 'bg-[#2563EB] text-white shadow-xs'
                        : 'bg-[#FFFDF9] text-[#1E3A8A] hover:bg-[#DBEAFE]'
                    }`}
                  >
                    קומה {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Computer B: Floors 1 up to 7 */}
            <div className="p-3 bg-[#ECFDF5] rounded-2xl border border-[#A7F3D0]">
              <div className="font-black text-xs text-[#065F46] mb-2 flex items-center gap-1">
                <span>🏢 מחשב ב׳ (מקבל - פריקה Decapsulation):</span>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[1, 2, 3, 4, 5, 6, 7].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      onSwitchRole('B', lvl as LayerNumber);
                      setIsRolePickerOpen(false);
                    }}
                    className={`py-1.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                      currentComputer === 'B' && currentLayer === lvl
                        ? 'bg-[#059669] text-white shadow-xs'
                        : 'bg-[#FFFDF9] text-[#064E3B] hover:bg-[#D1FAE5]'
                    }`}
                  >
                    קומה {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Turn Status Message */}
      <div
        className={`p-3.5 rounded-2xl border-2 flex items-center justify-between text-xs font-bold ${
          isMyTurn
            ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#78350F]'
            : 'bg-[#FAF7F0] border-[#E4DEC8] text-[#57534E]'
        }`}
      >
        <div className="flex items-center gap-2">
          {isMyTurn ? (
            <Clock className="w-4 h-4 text-[#D97706] animate-pulse" />
          ) : (
            <User className="w-4 h-4 text-[#78716C]" />
          )}
          <span>
            {isMyTurn
              ? '🎯 עכשיו תורך לבחור את כל מה ששייך לקומה שלך!'
              : `⏳ החבילה נמצאת כעת ב${
                  roomState?.activeComputer === 'A' ? 'בניין א׳ (שולח)' : 'בניין ב׳ (מקבל)'
                }, קומה ${roomState?.activeLayer}. אנא המתן לתורך.`}
          </span>
        </div>

        <span className="text-[11px] bg-[#FFFDF9] px-2.5 py-1 rounded-xl border border-[#E5DFD3]">
          {currentCorrectCount} מתוך {totalRequiredCorrect} בחירות נכונות
        </span>
      </div>

      {/* 3 Columns Pool of Options (Arranged in columns per user request) */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Column 1: PDU & Protocol */}
        {renderColumn(
          '1. יחידת נתונים ופרוטוקול',
          '1. وحدة البيانات والبروتوكول',
          floorData.pduAndProtocol,
          1,
          {
            bg: 'bg-[#FAF7F0]',
            border: 'border-[#E4DEC8]',
            tagBg: 'bg-[#DBEAFE]',
            text: 'text-[#1D4ED8]',
          }
        )}

        {/* Column 2: Addressing & Ports */}
        {renderColumn(
          '2. כתובות ומספרי פורט',
          '2. العناوين والمنافذ',
          floorData.addressAndPorts,
          2,
          {
            bg: 'bg-[#FAF7F0]',
            border: 'border-[#E4DEC8]',
            tagBg: 'bg-[#FEF3C7]',
            text: 'text-[#92400E]',
          }
        )}

        {/* Column 3: Processes & Actions */}
        {renderColumn(
          '3. פעולות ותהליכים בשכבה',
          '3. العمليات والإجراءات',
          floorData.processAndActions,
          3,
          {
            bg: 'bg-[#FAF7F0]',
            border: 'border-[#E4DEC8]',
            tagBg: 'bg-[#DCFCE7]',
            text: 'text-[#166534]',
          }
        )}
      </div>

      {/* Contextual Encouraging Explanation / Hint Drawer */}
      {activeExplanation && (
        <div
          className={`p-4 rounded-3xl border-2 shadow-sm animate-fadeIn ${
            selectedIds[activeExplanation.id] === 'correct'
              ? 'bg-[#DCFCE7] border-[#86EFAC] text-[#14532D]'
              : 'bg-[#FEF3C7] border-[#FCD34D] text-[#78350F]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              {selectedIds[activeExplanation.id] === 'correct' ? (
                <div className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 stroke-[3]" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#F59E0B] text-white flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
              )}

              <div>
                <h4 className="font-black text-sm">
                  {selectedIds[activeExplanation.id] === 'correct'
                    ? 'כל הכבוד! בחירה נכונה ומדויקת 🌟'
                    : 'לא נורא, ממשיכים לנסות! רמז פדגוגי 💡'}
                </h4>
                <p className="text-xs mt-1 leading-relaxed font-medium">
                  {selectedIds[activeExplanation.id] === 'correct'
                    ? currentLang === 'he'
                      ? activeExplanation.explanationHe
                      : activeExplanation.explanationAr
                    : currentLang === 'he'
                    ? activeExplanation.hintHe
                    : activeExplanation.hintAr}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveExplanation(null)}
              className="text-xs font-bold px-2 py-1 rounded-lg bg-black/10 hover:bg-black/20 transition-colors"
            >
              ✕ סגור
            </button>
          </div>
        </div>
      )}

      {/* Completion & Next Floor Button */}
      {isFloorCompleted && (
        <div className="sticky bottom-4 z-20 bg-[#FFFDF9] border-2 border-[#86EFAC] rounded-3xl p-4 shadow-xl flex items-center justify-between gap-4 animate-bounce">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#10B981] text-white flex items-center justify-center text-xl shadow-xs">
              🎉
            </div>
            <div>
              <div className="font-black text-sm text-[#14532D]">
                הקומה הושלמה בהצלחה מלאה!
              </div>
              <div className="text-xs text-[#166534]">
                כל המרכיבים הנדרשים נארזו ונבדקו.
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playPacketWhoosh();
              onAdvanceFloor();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
          >
            <span>העבר לקומה הבאה</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      )}
    </div>
  );
};

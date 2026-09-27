import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Language, RoomState } from '../../types';
import { t } from '../../data/translations';
import { playSabotageAlert } from '../../utils/audio';

interface SabotageControlsProps {
  roomState: RoomState;
  currentLang: Language;
  onTriggerSabotage: (type: 'packetLoss' | 'bitError' | 'latency') => void;
  onClearSabotage: () => void;
}

export const SabotageControls: React.FC<SabotageControlsProps> = ({
  roomState,
  currentLang,
  onTriggerSabotage,
  onClearSabotage,
}) => {
  const texts = t[currentLang];
  const isVoIPScenario = roomState?.scenarioId === 'voip_rtp';

  const handleSabotage = (type: 'packetLoss' | 'bitError' | 'latency') => {
    playSabotageAlert();
    onTriggerSabotage(type);
  };

  const hasActiveSabotage =
    roomState?.sabotage?.packetLoss ||
    roomState?.sabotage?.bitError ||
    roomState?.sabotage?.latency;

  return (
    <div className="bg-[#FAF7F0] rounded-3xl border-2 border-[#E4DEC8] p-4 shadow-sm">
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E6E0D2]">
        <div className="flex items-center gap-2 text-[#1C1917] font-black text-xs sm:text-sm">
          <span className="text-xl">🎛️</span>
          <span>סימולציות ותקלות רשת (למורה לתרגול בכיתה):</span>
        </div>

        {hasActiveSabotage && (
          <button
            onClick={onClearSabotage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs bg-[#EFEAE0] hover:bg-[#E5DFD3] text-[#44403C] font-bold transition-colors cursor-pointer border border-[#DDD6C4]"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>נקה תקלות וחזור לשגרה</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          onClick={() => handleSabotage('packetLoss')}
          className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 text-xs text-right font-bold transition-all cursor-pointer ${
            roomState?.sabotage?.packetLoss
              ? 'bg-[#FEE2E2] border-[#F87171] text-[#991B1B] ring-2 ring-[#FECACA]'
              : 'bg-[#FFFDF9] border-[#E8E2D2] hover:border-[#F87171] text-[#292524]'
          }`}
        >
          <span className="text-2xl">📦💨</span>
          <div>
            <div className="font-black text-[#1C1917]">איבוד חבילה בדרך</div>
            <div className="text-[11px] text-[#78716C] font-normal leading-tight">
              {isVoIPScenario ? 'ב-VoIP: אין שידור חוזר!' : 'בחינת מנגנון שידור חוזר (TCP)'}
            </div>
          </div>
        </button>

        <button
          onClick={() => handleSabotage('bitError')}
          className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 text-xs text-right font-bold transition-all cursor-pointer ${
            roomState?.sabotage?.bitError
              ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#78350F] ring-2 ring-[#FDE68A]'
              : 'bg-[#FFFDF9] border-[#E8E2D2] hover:border-[#F59E0B] text-[#292524]'
          }`}
        >
          <span className="text-2xl">⚡👾</span>
          <div>
            <div className="font-black text-[#1C1917]">שיבוש אות / שגיאת CRC</div>
            <div className="text-[11px] text-[#78716C] font-normal leading-tight">
              היפוך ביט בכבל ובדיקת שכבה 2
            </div>
          </div>
        </button>

        <button
          onClick={() => handleSabotage('latency')}
          className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 text-xs text-right font-bold transition-all cursor-pointer ${
            roomState?.sabotage?.latency
              ? 'bg-[#EDE9FE] border-[#8B5CF6] text-[#5B21B6] ring-2 ring-[#DDD6FE]'
              : 'bg-[#FFFDF9] border-[#E8E2D2] hover:border-[#8B5CF6] text-[#292524]'
          }`}
        >
          <span className="text-2xl">🐢⏱️</span>
          <div>
            <div className="font-black text-[#1C1917]">עיכוב רשת (Lag)</div>
            <div className="text-[11px] text-[#78716C] font-normal leading-tight">
              עומס בנתבים ובחינת זיכרון חוצץ
            </div>
          </div>
        </button>
      </div>

      {hasActiveSabotage && (
        <div className="mt-3 p-3 rounded-2xl bg-[#FEF3C7] border border-[#FDE68A] text-[#78350F] text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span>📢</span>
            <span>
              {currentLang === 'he'
                ? roomState.sabotage.messageHe || 'הודעת תקלה כיתתית מופעלת'
                : roomState.sabotage.messageAr || 'تنبيه عطل مفعل'}
            </span>
          </div>
          <button
            onClick={onClearSabotage}
            className="px-2.5 py-1 rounded-lg bg-black/10 hover:bg-black/20 text-[11px]"
          >
            אישור ותיקון
          </button>
        </div>
      )}
    </div>
  );
};

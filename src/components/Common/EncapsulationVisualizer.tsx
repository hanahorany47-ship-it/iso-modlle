import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  Package,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { ComputerId, Language, LayerNumber, RoomState } from '../../types';
import { OSI_LAYERS } from '../../data/layers';
import { getScenarioById } from '../../data/scenarios';

interface EncapsulationVisualizerProps {
  roomState: RoomState;
  currentLang: Language;
}

export const EncapsulationVisualizer: React.FC<EncapsulationVisualizerProps> = ({
  roomState,
  currentLang,
}) => {
  const activeComp = roomState?.activeComputer || 'A';
  const activeLayer = roomState?.activeLayer || 7;
  const isSender = activeComp === 'A';
  const scenario = getScenarioById(roomState?.scenarioId || 'http_browser');
  const layerMeta = OSI_LAYERS.find((l) => l.layer === activeLayer);

  // Determine current PDU name based on active layer
  const getCurrentPdu = (layer: LayerNumber) => {
    switch (layer) {
      case 7:
      case 6:
      case 5:
        return {
          he: 'נתונים (Data)',
          ar: 'بيانات (Data)',
          en: 'Data',
          color: 'bg-[#FED7AA] text-[#9A3412] border-[#F97316]',
          badgeBg: 'bg-[#F97316]',
          descHe: 'הודעת המשתמש הגולמית המקורית (Data Payload)',
        };
      case 4:
        return {
          he: 'מקטע (Segment)',
          ar: 'قطعة (Segment)',
          en: 'Segment',
          color: 'bg-[#ECFCCB] text-[#365314] border-[#84CC16]',
          badgeBg: 'bg-[#65A30D]',
          descHe: 'הנתונים חולקו למקטעים ונוספה כותרת TCP/UDP עם פורטים ומספרי רצף',
        };
      case 3:
        return {
          he: 'חבילה (Packet)',
          ar: 'חבילה / حزمة (Packet)',
          en: 'Packet',
          color: 'bg-[#DCFCE7] text-[#14532D] border-[#22C55E]',
          badgeBg: 'bg-[#16A34A]',
          descHe: 'נוספה כותרת רשת עם כתובות IP מקור ויעד לניתוב עולמי',
        };
      case 2:
        return {
          he: 'מסגרת (Frame)',
          ar: 'إطار (Frame)',
          en: 'Frame',
          color: 'bg-[#D1FAE5] text-[#064E3B] border-[#10B981]',
          badgeBg: 'bg-[#059669]',
          descHe: 'נוספה כותרת MAC מקור ויעד + סוגר לבדיקת שגיאות (CRC Checksum)',
        };
      case 1:
        return {
          he: 'ביטים (Bits - 0101)',
          ar: 'بتات (Bits - 0101)',
          en: 'Bits',
          color: 'bg-[#CCFBF1] text-[#134E4A] border-[#14B8A6]',
          badgeBg: 'bg-[#0D9488]',
          descHe: 'המסגרת הומרה לפולסים של מתח חשמלי / פולסי אור / גלי רדיו בכבל',
        };
    }
  };

  const pduInfo = getCurrentPdu(activeLayer);

  // Headers present at each layer during Encapsulation (Computer A) and Decapsulation (Computer B)
  // In A: layer 7 has only data. As layer decreases, headers are added.
  // In B: layer 1 has all headers. As layer increases, headers are stripped off.
  const hasMacHeader = isSender ? activeLayer <= 2 : activeLayer <= 2;
  const hasIpHeader = isSender ? activeLayer <= 3 : activeLayer <= 3;
  const hasTransportHeader = isSender ? activeLayer <= 4 : activeLayer <= 4;
  const hasSessionHeader = isSender ? activeLayer <= 5 : activeLayer <= 5;
  const hasPresentationHeader = isSender ? activeLayer <= 6 : activeLayer <= 6;
  const isBitsStream = activeLayer === 1;

  return (
    <div className="w-full bg-[#FAF7F0] border-2 border-[#E4DEC8] rounded-3xl p-4 shadow-sm flex flex-col gap-3">
      {/* Top Banner: Process Name + Glowing Current PDU Pill */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-2 border-b border-[#E6E0D2]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#10B981] flex items-center justify-center text-white text-lg shadow-2xs">
            {isSender ? <ArrowDown className="w-5 h-5 animate-bounce" /> : <ArrowUp className="w-5 h-5 animate-bounce" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-sm text-[#1C1917]">
                {isSender
                  ? 'תהליך אריזה (Encapsulation) 📦'
                  : 'תהליך פריקה (Decapsulation) 📬'}
              </span>
              <span className="text-[11px] font-bold text-[#57534E]">
                {isSender ? 'בניין א׳ שולח (7 ➔ 1)' : 'בניין ב׳ מקבל (1 ➔ 7)'}
              </span>
            </div>
            <p className="text-xs text-[#78716C] font-medium">
              {isSender
                ? 'בכל קומה מטה, השכבה עוטפת את ההודעה בכותרת נוספת (Header)'
                : 'בכל קומה מעלה, השכבה מאמתת ומסירה את הכותרת שלה (Header Stripping)'}
            </p>
          </div>
        </div>

        {/* Big Prominent Current PDU Type Badge */}
        <div className="flex items-center gap-2 bg-[#FFFDF9] border-2 border-[#DDD6C4] px-4 py-2 rounded-2xl shadow-2xs">
          <span className="text-xs font-bold text-[#57534E]">
            סוג ההודעה בקומה זו (PDU):
          </span>
          <span
            className={`px-3 py-1 rounded-xl text-xs sm:text-sm font-black text-white shadow-2xs flex items-center gap-1.5 ${pduInfo.badgeBg}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{currentLang === 'he' ? pduInfo.he : pduInfo.ar}</span>
          </span>
        </div>
      </div>

      {/* Visual Animated Packet Structure (Headers attached or stripped) */}
      <div className="p-3 bg-[#FFFDF9] rounded-2xl border border-[#E8E2D2] flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#57534E]">
          <span className="flex items-center gap-1.5">
            <Package className="w-4 h-4 text-[#2563EB]" />
            <span>מבנה החבילה כפי שהיא נראית כעת בשכבה {activeLayer}:</span>
          </span>
          <span className="text-[11px] text-[#059669]">
            {pduInfo.descHe}
          </span>
        </div>

        {/* Live Packet Header Chain */}
        {!isBitsStream ? (
          <div className="flex items-center gap-1.5 overflow-x-auto py-2 px-1 text-xs font-bold select-none justify-center flex-wrap">
            {/* Layer 2: Frame Header (MAC) */}
            {hasMacHeader && (
              <div
                className={`px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 shadow-2xs ${
                  activeLayer === 2
                    ? 'bg-[#A7F3D0] border-[#059669] text-[#064E3B] ring-2 ring-[#34D399] scale-105'
                    : 'bg-[#D1FAE5] border-[#6EE7B7] text-[#065F46]'
                }`}
              >
                <span>🏷️ כותרת MAC</span>
                <span className="text-[10px] font-mono opacity-80">(L2 Header)</span>
              </div>
            )}

            {/* Layer 3: Network Header (IP) */}
            {hasIpHeader && (
              <div
                className={`px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 shadow-2xs ${
                  activeLayer === 3
                    ? 'bg-[#BBF7D0] border-[#16A34A] text-[#14532D] ring-2 ring-[#4ADE80] scale-105'
                    : 'bg-[#DCFCE7] border-[#86EFAC] text-[#15803D]'
                }`}
              >
                <span>🧭 כותרת IP</span>
                <span className="text-[10px] font-mono opacity-80">(L3 Header)</span>
              </div>
            )}

            {/* Layer 4: Transport Header (TCP/UDP + Port) */}
            {hasTransportHeader && (
              <div
                className={`px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 shadow-2xs ${
                  activeLayer === 4
                    ? 'bg-[#D9F99D] border-[#65A30D] text-[#365314] ring-2 ring-[#A3E635] scale-105'
                    : 'bg-[#ECFCCB] border-[#BEF264] text-[#4D7C0F]'
                }`}
              >
                <span>📦 כותרת {scenario.protocolL4}</span>
                <span className="text-[10px] font-mono opacity-80">(L4 Port {scenario.ports.slice(0, 7)})</span>
              </div>
            )}

            {/* Layer 5: Session Header */}
            {hasSessionHeader && (
              <div
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 shadow-2xs ${
                  activeLayer === 5
                    ? 'bg-[#FEF08A] border-[#CA8A04] text-[#713F12] ring-2 ring-[#FACC15] scale-105'
                    : 'bg-[#FEF9C3] border-[#FDE047] text-[#854D0E]'
                }`}
              >
                <span>💬 Session ID</span>
              </div>
            )}

            {/* Layer 6: Presentation Encryption Flag */}
            {hasPresentationHeader && (
              <div
                className={`px-2.5 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 shadow-2xs ${
                  activeLayer === 6
                    ? 'bg-[#FED7AA] border-[#EA580C] text-[#7C2D12] ring-2 ring-[#FB923C] scale-105'
                    : 'bg-[#FFEDD5] border-[#FDBA74] text-[#9A3412]'
                }`}
              >
                <span>🔐 הצפנת TLS</span>
              </div>
            )}

            {/* Original Payload (Data) */}
            <div
              className={`px-4 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1.5 shadow-2xs ${
                activeLayer === 7
                  ? 'bg-[#FFEDD5] border-[#F97316] text-[#9A3412] ring-2 ring-[#FB923C] scale-105'
                  : 'bg-[#FFF7ED] border-[#FDBA74] text-[#C2410C]'
              }`}
            >
              <span>📄 נתוני הודעה (Payload Data)</span>
            </div>

            {/* Layer 2 Trailer: CRC / FCS Checksum */}
            {hasMacHeader && (
              <div
                className={`px-3 py-1.5 rounded-xl border-2 transition-all flex items-center gap-1 shadow-2xs ${
                  activeLayer === 2
                    ? 'bg-[#A7F3D0] border-[#059669] text-[#064E3B] ring-2 ring-[#34D399] scale-105'
                    : 'bg-[#D1FAE5] border-[#6EE7B7] text-[#065F46]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>סוגר בדיקת CRC</span>
                <span className="text-[10px] font-mono opacity-80">(L2 Trailer)</span>
              </div>
            )}
          </div>
        ) : (
          /* Layer 1: Converted to pure bits */
          <div className="p-3 bg-[#E6FFFA] border-2 border-[#14B8A6] rounded-xl flex items-center justify-center gap-2">
            <span className="text-xl">⚡</span>
            <div className="font-mono text-sm sm:text-base font-black text-[#0F766E] tracking-widest animate-pulse">
              01001000 01100101 01101100 01101100 01101111 00100001
            </div>
            <span className="text-xs font-bold text-[#115E59] bg-[#CCFBF1] px-2 py-0.5 rounded-md border border-[#5EEAD4]">
              פולסי אור/חשמל בכבל
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

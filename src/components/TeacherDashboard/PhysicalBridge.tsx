import React from 'react';
import { Cable, Wifi, Radio, Zap } from 'lucide-react';
import { Language, TransmissionMedia, RoomState } from '../../types';
import { t } from '../../data/translations';

interface PhysicalBridgeProps {
  roomState: RoomState;
  currentLang: Language;
  onSelectMedia: (media: TransmissionMedia) => void;
}

export const PhysicalBridge: React.FC<PhysicalBridgeProps> = ({
  roomState,
  currentLang,
  onSelectMedia,
}) => {
  const texts = t[currentLang];
  const isTransmittingOnL1 =
    (roomState?.activeComputer === 'A' && roomState?.activeLayer === 1) ||
    (roomState?.activeComputer === 'B' && roomState?.activeLayer === 1);

  const mediaOptions: Array<{
    id: TransmissionMedia;
    nameHe: string;
    nameAr: string;
    emoji: string;
    speed: string;
    color: string;
  }> = [
    {
      id: 'fiber',
      nameHe: 'סיב אופטי (פולסי אור)',
      nameAr: 'ألياف بصرية (نبضات ضوء)',
      emoji: '💡',
      speed: '10 Gbps',
      color: 'bg-[#CFFAFE] border-[#06B6D4] text-[#155E75]',
    },
    {
      id: 'copper',
      nameHe: 'כבל נחושת RJ45',
      nameAr: 'كابل نحاسي',
      emoji: '🔌',
      speed: '1 Gbps',
      color: 'bg-[#FEF3C7] border-[#F59E0B] text-[#78350F]',
    },
    {
      id: 'wifi',
      nameHe: 'אלחוטי Wi-Fi',
      nameAr: 'لاسلكي Wi-Fi',
      emoji: '📶',
      speed: '600 Mbps',
      color: 'bg-[#D1FAE5] border-[#10B981] text-[#065F46]',
    },
    {
      id: 'satellite',
      nameHe: 'לוויין בחלל',
      nameAr: 'أقمار صناعية',
      emoji: '🛰️',
      speed: '150 Mbps',
      color: 'bg-[#EDE9FE] border-[#8B5CF6] text-[#5B21B6]',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F0] rounded-3xl border-2 border-[#E4DEC8] p-4 shadow-sm flex flex-col gap-3">
      {/* Media Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pb-2 border-b border-[#E6E0D2]">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌉</span>
          <span className="text-xs sm:text-sm font-black text-[#1C1917]">
            הכבל והתווך הפיזי המקשר בין הבניינים (שכבה 1):
          </span>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {mediaOptions.map((opt) => {
            const isSelected = roomState?.transmissionMedia === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectMedia(opt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all border-2 cursor-pointer ${
                  isSelected
                    ? `${opt.color} shadow-xs ring-2 ring-[#93C5FD] scale-105`
                    : 'bg-[#FFFDF9] border-[#E8E2D2] text-[#57534E] hover:bg-[#EFEAE0]'
                }`}
              >
                <span>{opt.emoji}</span>
                <span>{currentLang === 'he' ? opt.nameHe : opt.nameAr}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Friendly Animated Cable Pipeline */}
      <div className="py-2.5 px-4 bg-[#FFFDF9] rounded-2xl border border-[#E8E2D2] flex items-center justify-between overflow-hidden">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] bg-[#EFF6FF] px-2.5 py-1 rounded-xl shadow-2xs border border-[#BFDBFE]">
          <span>🚪 יציאה מבניין א׳</span>
        </div>

        {/* Cable Stream with Floating Bits */}
        <div className="flex-1 mx-4 relative h-6 flex items-center justify-center">
          <div className="w-full h-2 bg-[#EAE4D4] rounded-full overflow-hidden relative">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isTransmittingOnL1
                  ? 'bg-gradient-to-r from-[#2563EB] via-[#10B981] to-[#F59E0B] animate-pulse w-full'
                  : 'bg-[#DDD6C4] w-full'
              }`}
            />
          </div>

          {/* Friendly Bit Flow Animation */}
          <div className="absolute inset-0 flex items-center justify-around pointer-events-none text-xs font-mono font-black text-[#059669]">
            <span className="animate-ping delay-100">0</span>
            <span className="animate-pulse delay-200">1</span>
            <span className="animate-ping delay-300">0</span>
            <span className="animate-pulse delay-400">1</span>
            <span className="animate-ping delay-500">1</span>
            <span className="animate-pulse delay-600">0</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-[#065F46] bg-[#ECFDF5] px-2.5 py-1 rounded-xl shadow-2xs border border-[#A7F3D0]">
          <span>כניסה לבניין ב׳ 🚪</span>
        </div>
      </div>
    </div>
  );
};

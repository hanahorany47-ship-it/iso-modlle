import React from 'react';
import { LayerNumber } from '../../types';

interface LayerIllustrationProps {
  layer: LayerNumber;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const LayerIllustration: React.FC<LayerIllustrationProps> = ({
  layer,
  size = 'md',
  animated = false,
}) => {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  switch (layer) {
    // ==================== LAYER 7: Application (Orange Banner) ====================
    // Web Browser (Google/HTTP) + PC Monitor + Mail Envelope
    case 7:
      return (
        <div className={`flex items-center gap-2 ${isSm ? 'scale-90' : isLg ? 'scale-110' : ''}`}>
          <div className="relative flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#FFF7ED] border-2 border-[#FDBA74] shadow-xs">
            {/* Browser Window Mockup */}
            <div className="w-12 h-9 rounded-lg bg-white border border-[#F97316] shadow-2xs flex flex-col overflow-hidden">
              <div className="h-2.5 bg-[#FFEDD5] border-b border-[#FED7AA] flex items-center px-1 gap-0.5">
                <span className="w-1 h-1 rounded-full bg-[#EF4444]" />
                <span className="w-1 h-1 rounded-full bg-[#F59E0B]" />
                <span className="w-1 h-1 rounded-full bg-[#10B981]" />
                <div className="flex-1 mx-1 bg-white h-1.5 rounded-xs border border-[#FDBA74] flex items-center px-0.5">
                  <span className="text-[5px] text-[#C2410C] font-mono leading-none">http://</span>
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center bg-[#FFFDF9]">
                <span className="text-[7px] font-black text-[#EA580C]">Google</span>
              </div>
            </div>

            {/* PC Monitor + Mail Letter */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <span className="text-lg">🖥️</span>
                <span className="absolute -top-1 -right-1 text-xs animate-bounce">✉️</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-black text-[#9A3412] leading-tight">
                דפדפן ומייל
              </div>
              <div className="text-[9px] font-semibold text-[#EA580C]">
                Network process
              </div>
            </div>
          </div>
        </div>
      );

    // ==================== LAYER 6: Presentation (Bronze / Caramel) ====================
    // Safe Locker + Green Padlock + Packaging into Box + TLS
    case 6:
      return (
        <div className={`flex items-center gap-2 ${isSm ? 'scale-90' : isLg ? 'scale-110' : ''}`}>
          <div className="relative flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#FEF3C7] border-2 border-[#FCD34D] shadow-xs">
            {/* Safe with Green Lock */}
            <div className="w-10 h-9 rounded-lg bg-[#78350F] border border-[#B45309] shadow-2xs flex flex-col items-center justify-center relative">
              <div className="w-7 h-5 rounded-xs bg-[#451A03] border border-[#92400E] flex items-center justify-center">
                <span className="text-xs">🔐</span>
              </div>
              <span className="text-[6px] text-[#FDE68A] font-bold font-mono">TLS/SSL</span>
            </div>

            {/* Person Packaging Letters */}
            <div className="flex items-center">
              <span className="text-base">📦</span>
              <span className="text-xs -mr-1">🏷️</span>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-black text-[#78350F] leading-tight">
                הצפנה ופורמט
              </div>
              <div className="text-[9px] font-semibold text-[#B45309]">
                Data encryption
              </div>
            </div>
          </div>
        </div>
      );

    // ==================== LAYER 5: Session (Olive Gold) ====================
    // Suspension Bridge between hosts (Interhost communication)
    case 5:
      return (
        <div className={`flex items-center gap-2 ${isSm ? 'scale-90' : isLg ? 'scale-110' : ''}`}>
          <div className="relative flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#FEF9C3] border-2 border-[#FDE047] shadow-xs">
            {/* Suspension Bridge SVG */}
            <div className="w-11 h-9 rounded-lg bg-[#FEF08A] border border-[#EAB308] shadow-2xs flex items-center justify-center p-0.5">
              <svg viewBox="0 0 40 24" className="w-full h-full text-[#854D0E] fill-none stroke-current stroke-1">
                {/* Bridge Pillars */}
                <line x1="8" y1="2" x2="8" y2="22" strokeWidth="2" />
                <line x1="32" y1="2" x2="32" y2="22" strokeWidth="2" />
                {/* Main Suspension Cables */}
                <path d="M 0,6 Q 8,18 20,18 Q 32,18 40,6" strokeWidth="1.5" />
                {/* Deck */}
                <line x1="0" y1="18" x2="40" y2="18" strokeWidth="2" />
              </svg>
            </div>

            {/* Conversation Dialog Sockets */}
            <div className="flex flex-col items-center">
              <span className="text-sm">💬</span>
              <span className="text-[7px] font-mono font-bold text-[#713F12]">SESSION</span>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-black text-[#713F12] leading-tight">
                גשר שיחה וסשן
              </div>
              <div className="text-[9px] font-semibold text-[#A16207]">
                Interhost comm.
              </div>
            </div>
          </div>
        </div>
      );

    // ==================== LAYER 4: Transport (Lime Green) ====================
    // Cargo Boxes with Seq numbers (Seq 1, 2) + TCP/UDP Port stamp
    case 4:
      return (
        <div className={`flex items-center gap-2 ${isSm ? 'scale-90' : isLg ? 'scale-110' : ''}`}>
          <div className="relative flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#ECFCCB] border-2 border-[#BEF264] shadow-xs">
            {/* Numbered Segments (Cargo Containers) */}
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-0.5">
                <div className="px-1 py-0.5 bg-[#65A30D] text-white rounded-xs text-[7px] font-black shadow-2xs">
                  Seq 1
                </div>
                <div className="px-1 py-0.5 bg-[#4D7C0F] text-white rounded-xs text-[7px] font-black shadow-2xs">
                  Seq 2
                </div>
              </div>
              <div className="px-1.5 py-0.5 bg-[#A3E635] text-[#365314] rounded-xs text-[7px] font-black text-center border border-[#65A30D]">
                Port 80/443
              </div>
            </div>

            {/* Transport Handshake */}
            <div className="text-center">
              <span className="text-base">📦</span>
              <div className="text-[7px] font-black text-[#4D7C0F]">TCP/UDP</div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-black text-[#365314] leading-tight">
                מקטעי תחבורה
              </div>
              <div className="text-[9px] font-semibold text-[#4D7C0F]">
                End-to-end reliab.
              </div>
            </div>
          </div>
        </div>
      );

    // ==================== LAYER 3: Network (Medium Green) ====================
    // Cylindrical Routers with crossed arrows + Courier with IP Envelope
    case 3:
      return (
        <div className={`flex items-center gap-2 ${isSm ? 'scale-90' : isLg ? 'scale-110' : ''}`}>
          <div className="relative flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#DCFCE7] border-2 border-[#86EFAC] shadow-xs">
            {/* Router Disk Symbol */}
            <div className="w-10 h-9 rounded-lg bg-[#16A34A] border border-[#15803D] shadow-2xs flex flex-col items-center justify-center p-0.5">
              <svg viewBox="0 0 32 32" className="w-6 h-6 text-white stroke-current fill-none stroke-2">
                <circle cx="16" cy="16" r="13" />
                {/* 4 crossed router arrows */}
                <path d="M 8 16 L 24 16 M 20 12 L 24 16 L 20 20" />
                <path d="M 16 8 L 16 24 M 12 20 L 16 24 L 20 20" />
              </svg>
            </div>

            {/* Courier with IP Address */}
            <div className="flex flex-col items-center">
              <span className="text-sm">🧭</span>
              <span className="text-[7px] font-mono font-black text-[#15803D] bg-white px-0.5 rounded-xs border border-[#86EFAC]">
                IP ADDR
              </span>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-black text-[#14532D] leading-tight">
                ראוטרים וניתוב
              </div>
              <div className="text-[9px] font-semibold text-[#15803D]">
                Path determination
              </div>
            </div>
          </div>
        </div>
      );

    // ==================== LAYER 2: Data Link (Emerald Green) ====================
    // Switch + Large MAC Address Luggage Tag + NIC Card + CRC Check
    case 2:
      return (
        <div className={`flex items-center gap-2 ${isSm ? 'scale-90' : isLg ? 'scale-110' : ''}`}>
          <div className="relative flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#D1FAE5] border-2 border-[#6EE7B7] shadow-xs">
            {/* Switch & Wi-Fi Antennas */}
            <div className="w-10 h-9 rounded-lg bg-[#065F46] border border-[#047857] shadow-2xs flex flex-col items-center justify-center p-1">
              <div className="flex gap-0.5 mb-1">
                <span className="w-1 h-1 rounded-full bg-[#34D399]" />
                <span className="w-1 h-1 rounded-full bg-[#34D399]" />
                <span className="w-1 h-1 rounded-full bg-[#F59E0B]" />
              </div>
              <span className="text-[6px] text-white font-mono font-bold">SWITCH</span>
            </div>

            {/* Large Hanging MAC Address Luggage Tag */}
            <div className="px-1.5 py-0.5 bg-white border border-[#059669] rounded-xs shadow-2xs text-center">
              <div className="text-[7px] font-black text-[#047857] leading-none">MAC TAG</div>
              <div className="text-[6px] font-mono font-bold text-[#065F46] leading-tight">
                00-0C-F1...
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-black text-[#064E3B] leading-tight">
                מתגים וכתובת MAC
              </div>
              <div className="text-[9px] font-semibold text-[#047857]">
                Physical addressing
              </div>
            </div>
          </div>
        </div>
      );

    // ==================== LAYER 1: Physical (Bright Vibrant Green) ====================
    // Blue RJ45 Ethernet Connector with copper pins + Stream of 0101 Bits
    case 1:
      return (
        <div className={`flex items-center gap-2 ${isSm ? 'scale-90' : isLg ? 'scale-110' : ''}`}>
          <div className="relative flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#CCFBF1] border-2 border-[#5EEAD4] shadow-xs">
            {/* Blue RJ45 Ethernet Plug */}
            <div className="w-11 h-9 rounded-lg bg-[#0284C7] border border-[#0369A1] shadow-2xs flex flex-col items-center justify-center relative p-0.5">
              <div className="w-7 h-4 bg-[#E0F2FE] rounded-xs border border-[#38BDF8] flex items-center justify-center gap-0.5">
                {/* 8 copper contact pins */}
                <div className="w-0.5 h-2 bg-[#F59E0B] rounded-xs" />
                <div className="w-0.5 h-2 bg-[#F59E0B] rounded-xs" />
                <div className="w-0.5 h-2 bg-[#F59E0B] rounded-xs" />
                <div className="w-0.5 h-2 bg-[#F59E0B] rounded-xs" />
                <div className="w-0.5 h-2 bg-[#F59E0B] rounded-xs" />
              </div>
              <span className="text-[6px] text-white font-mono font-bold mt-0.5">RJ45</span>
            </div>

            {/* Glowing Binary Bit Stream */}
            <div className="flex flex-col items-center">
              <div className="text-[8px] font-mono font-black text-[#0F766E] tracking-tighter animate-pulse">
                01011101
              </div>
              <span className="text-[7px] font-bold text-[#115E59]">BIT PULSES</span>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-black text-[#134E4A] leading-tight">
                כבל RJ45 ואותות
              </div>
              <div className="text-[9px] font-semibold text-[#0F766E]">
                Media & binary
              </div>
            </div>
          </div>
        </div>
      );
  }
};

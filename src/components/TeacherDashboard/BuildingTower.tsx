import React from 'react';
import {
  ArrowDown,
  ArrowUp,
  User,
  Check,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';
import { ComputerId, FloorVerifiedBadge, Language, LayerNumber, RoomState } from '../../types';
import { OSI_LAYERS } from '../../data/layers';
import { t } from '../../data/translations';
import { LayerIllustration } from '../Common/LayerIllustration';

interface BuildingTowerProps {
  computer: ComputerId;
  roomState: RoomState;
  currentLang: Language;
  onSelectRole?: (computer: ComputerId, layer: LayerNumber) => void;
}

export const BuildingTower: React.FC<BuildingTowerProps> = ({
  computer,
  roomState,
  currentLang,
  onSelectRole,
}) => {
  const isSender = computer === 'A';
  const texts = t[currentLang];

  // 7 down to 1 for visual stack
  const orderedLayers = [...OSI_LAYERS].sort((a, b) => b.layer - a.layer);

  const getFloorStatus = (layer: LayerNumber) => {
    const isCurrentActive =
      roomState?.activeComputer === computer && roomState?.activeLayer === layer;

    if (isCurrentActive && roomState?.gameStatus === 'playing') {
      return 'active';
    }

    if (isSender) {
      if (
        roomState?.activeComputer === 'B' ||
        (roomState?.activeComputer === 'A' && roomState?.activeLayer < layer)
      ) {
        return 'completed';
      }
    } else {
      if (roomState?.gameStatus === 'completed') {
        return 'completed';
      }
      if (roomState?.activeComputer === 'B' && roomState?.activeLayer > layer) {
        return 'completed';
      }
    }

    return 'idle';
  };

  const getAssignedPlayer = (layer: LayerNumber) => {
    const player = Object.values(roomState?.players || {}).find(
      (p) => p.computer === computer && p.layer === layer
    );
    return player ? player.name : null;
  };

  const getLayerBadges = (layer: LayerNumber): FloorVerifiedBadge[] => {
    const key = `${computer}_${layer}`;
    return (roomState?.floorBadges && roomState.floorBadges[key]) || [];
  };

  // Distinct PDU pill style for each layer per curriculum requirements
  const getPduBadgeStyle = (layer: LayerNumber) => {
    switch (layer) {
      case 7:
      case 6:
      case 5:
        return 'bg-[#FFEDD5] border-[#FDBA74] text-[#9A3412]';
      case 4:
        return 'bg-[#ECFCCB] border-[#BEF264] text-[#365314] font-black ring-1 ring-[#84CC16]';
      case 3:
        return 'bg-[#DCFCE7] border-[#86EFAC] text-[#14532D] font-black ring-1 ring-[#22C55E]';
      case 2:
        return 'bg-[#D1FAE5] border-[#6EE7B7] text-[#064E3B] font-black ring-1 ring-[#10B981]';
      case 1:
        return 'bg-[#CCFBF1] border-[#5EEAD4] text-[#134E4A] font-black ring-1 ring-[#14B8A6]';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-[320px] max-w-[580px] relative select-none">
      {/* Friendly Building Roof with Warm Gable & Flag */}
      <div className="w-full flex flex-col items-center">
        {/* Triangular Roof Gable */}
        <div className="relative w-full flex justify-center">
          <div
            className={`w-0 h-0 border-l-[150px] sm:border-l-[190px] border-l-transparent border-r-[150px] sm:border-r-[190px] border-r-transparent border-b-[50px] sm:border-b-[60px] ${
              isSender ? 'border-b-[#2563EB]' : 'border-b-[#059669]'
            } drop-shadow-sm`}
          />

          {/* Roof Flag with Gentle Animation */}
          <div className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-center z-10">
            <div className="w-1.5 h-11 bg-[#78716C] rounded-full" />
            <div
              className={`px-3 py-1 rounded-r-xl text-xs font-black text-white shadow-xs ${
                isSender ? 'bg-[#F59E0B]' : 'bg-[#10B981]'
              }`}
            >
              {isSender ? '🚩 מחשב שולח א׳ (Encapsulation)' : '🏁 מחשב מקבל ב׳ (Decapsulation)'}
            </div>
          </div>
        </div>

        {/* Building Title Banner */}
        <div
          className={`w-full py-2.5 px-4 rounded-t-3xl shadow-sm text-white flex items-center justify-between ${
            isSender
              ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6]'
              : 'bg-gradient-to-r from-[#059669] to-[#10B981]'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl">
              🏢
            </div>
            <div>
              <h3 className="font-black text-base leading-tight">
                {isSender ? 'בניין א׳: המחשב השולח' : 'בניין ב׳: המחשב המקבל'}
              </h3>
              <p className="text-[11px] text-white/90 font-medium">
                {isSender
                  ? 'אריזה (Encapsulation) מלמעלה למטה ⬇️'
                  : 'פריקה (Decapsulation) מלמטה למעלה ⬆️'}
              </p>
            </div>
          </div>

          <div className="px-3 py-1 rounded-2xl bg-white/20 backdrop-blur-xs text-white text-xs font-black flex items-center gap-1.5">
            {isSender ? (
              <>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                <span>קומה 7 ➔ 1</span>
              </>
            ) : (
              <>
                <ArrowUp className="w-3.5 h-3.5 animate-bounce" />
                <span>קומה 1 ➔ 7</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Building Body - 7 Floors Stacked Cleanly */}
      <div className="bg-[#FAF7F0] border-4 border-t-0 border-[#E4DEC8] rounded-b-3xl p-3 shadow-md flex flex-col gap-2 relative">
        {orderedLayers.map((layerMeta) => {
          const status = getFloorStatus(layerMeta.layer);
          const assignedName = getAssignedPlayer(layerMeta.layer);
          const verifiedBadges = getLayerBadges(layerMeta.layer);
          const isCurrentActive =
            roomState?.activeComputer === computer && roomState?.activeLayer === layerMeta.layer;

          return (
            <div
              key={layerMeta.layer}
              onClick={() => onSelectRole?.(computer, layerMeta.layer)}
              className={`rounded-2xl p-2.5 transition-all duration-300 cursor-pointer border-2 ${
                status === 'active'
                  ? 'bg-[#FFFBEB] border-[#F59E0B] ring-4 ring-[#FDE68A]/60 shadow-md scale-[1.01]'
                  : status === 'completed'
                  ? 'bg-[#F0FDF4] border-[#86EFAC] text-slate-800'
                  : 'bg-[#FFFDF9] border-[#E8E2D2] hover:border-[#93C5FD] text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                {/* Left: Floor Badge & Layer Info + Prominent PDU Pill */}
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Floor number tile */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex flex-col items-center justify-center font-black text-xs shrink-0 shadow-2xs ${
                      status === 'active'
                        ? 'bg-[#F59E0B] text-white ring-2 ring-white'
                        : status === 'completed'
                        ? 'bg-[#10B981] text-white'
                        : 'bg-[#EAE4D4] text-[#57534E]'
                    }`}
                  >
                    <span className="text-[9px] font-medium leading-none opacity-80">קומה</span>
                    <span className="text-sm font-black leading-none">{layerMeta.layer}</span>
                  </div>

                  {/* Layer Name & Crystal Clear PDU Label */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-black text-xs sm:text-sm text-[#1C1917] tracking-tight">
                        {currentLang === 'he' ? layerMeta.nameHe : layerMeta.nameAr}
                      </span>
                    </div>

                    {/* Prominent PDU Message Type Badge */}
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-[10px] text-[#78716C] font-semibold">סוג הודעה:</span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-lg border font-black shadow-2xs ${getPduBadgeStyle(
                          layerMeta.layer
                        )}`}
                      >
                        {currentLang === 'he' ? layerMeta.pduHe : layerMeta.pduAr}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Exact Visual from Uploaded Infographic & Status */}
                <div className="flex items-center gap-2 shrink-0">
                  {/* Layer illustration matching user image */}
                  <div className="hidden sm:block">
                    <LayerIllustration layer={layerMeta.layer} size="sm" />
                  </div>

                  {/* Status Indicator: NO RED ERROR TO PREVENT EMBARRASSMENT */}
                  {status === 'active' && (
                    <div className="flex items-center gap-1.5 bg-[#F59E0B] text-white px-3 py-1 rounded-full text-xs font-black shadow-xs animate-pulse">
                      <Clock className="w-3.5 h-3.5" />
                      <span>תור התלמיד/ה</span>
                    </div>
                  )}

                  {status === 'completed' && (
                    <div className="flex items-center gap-1.5 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-black shadow-xs">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>הושלם</span>
                    </div>
                  )}

                  {/* Assigned Student Tag */}
                  <div className="flex items-center gap-1 px-2 py-1 rounded-xl text-[11px] font-bold bg-[#EFEAE0] border border-[#DDD6C4] text-[#44403C]">
                    <User className="w-3 h-3 text-[#2563EB]" />
                    <span className="truncate max-w-[65px]">
                      {assignedName || (currentLang === 'he' ? 'תלמיד/ה' : 'طالب')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Badges chosen by student in Real-time */}
              {verifiedBadges.length > 0 && (
                <div className="mt-2 pt-2 border-t border-[#E8E2D2] flex items-center gap-1.5 flex-wrap">
                  {verifiedBadges.map((badge) => (
                    <span
                      key={badge.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#14532D] text-xs font-bold shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 text-[#15803D] stroke-[3]" />
                      <span>{currentLang === 'he' ? badge.labelHe : badge.labelAr}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Building Entrance with Network Jack & Cozy Welcome */}
        <div className="mt-1 pt-2 border-t-2 border-dashed border-[#DDD6C4] flex items-center justify-between px-3 text-xs text-[#57534E] font-bold">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚪</span>
            <span>כניסת הבניין (כרטיס רשת וכבל)</span>
          </div>
          <span className="text-[11px] text-[#2563EB] font-bold">
            {isSender ? 'חיבור לכבל הרשת המרכזי ➔' : 'קליטת האותות מהכבל ➔'}
          </span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Volume2, VolumeX, Globe2, Monitor, Smartphone, HelpCircle } from 'lucide-react';
import { Language } from '../../types';
import { t } from '../../data/translations';
import { toggleMute, getMuteState } from '../../utils/audio';

interface HeaderProps {
  currentLang: Language;
  onToggleLang: () => void;
  activeView: 'teacher' | 'student';
  onSwitchView: (view: 'teacher' | 'student') => void;
  roomId: string;
  onOpenFlowchart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onToggleLang,
  activeView,
  onSwitchView,
  roomId,
  onOpenFlowchart,
}) => {
  const [muted, setMuted] = React.useState(getMuteState());

  const handleMute = () => {
    const isNowMuted = toggleMute();
    setMuted(isNowMuted);
  };

  const texts = t[currentLang];

  return (
    <header className="bg-[#FAF7F0] border-b-2 border-[#E4DEC8] px-4 py-3 sticky top-0 z-40 text-[#1C1917] flex items-center justify-between shadow-xs">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2563EB] to-[#3B82F6] shadow-xs text-2xl text-white">
          🏢
        </div>
        <div>
          <h1 className="font-black text-lg md:text-xl tracking-tight leading-tight flex items-center gap-2 text-[#1C1917]">
            <span>NetTower</span>
            <span className="text-xs bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE] px-2.5 py-0.5 rounded-full font-bold">
              מודל 7 השכבות
            </span>
          </h1>
          <p className="text-xs text-[#78716C] font-medium hidden sm:block">
            משחק רשתות ידידותי ומעצים לכיתה
          </p>
        </div>
      </div>

      {/* Center: View Switcher */}
      <div className="flex items-center bg-[#EFEAE0] p-1 rounded-2xl border border-[#DDD6C4]">
        <button
          onClick={() => onSwitchView('teacher')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer ${
            activeView === 'teacher'
              ? 'bg-[#2563EB] text-white shadow-xs'
              : 'text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>{texts.teacherView}</span>
        </button>
        <button
          onClick={() => onSwitchView('student')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer ${
            activeView === 'student'
              ? 'bg-[#059669] text-white shadow-xs'
              : 'text-[#57534E] hover:text-[#1C1917]'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>{texts.studentView}</span>
        </button>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenFlowchart}
          title={texts.flowchartGuide}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-[#92400E] hover:bg-[#FDE68A] text-xs font-black transition-all cursor-pointer shadow-2xs"
        >
          <HelpCircle className="w-4 h-4 text-[#D97706]" />
          <span className="hidden md:inline">{texts.flowchartGuide}</span>
        </button>

        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EFEAE0] border border-[#DDD6C4] text-xs font-mono font-bold text-[#57534E]">
          <span className="text-[#A8A29E]">חדר:</span>
          <span className="font-black text-[#2563EB]">{roomId}</span>
        </div>

        <button
          onClick={handleMute}
          className="p-2 rounded-xl bg-[#EFEAE0] hover:bg-[#E5DFD3] text-[#57534E] transition-colors cursor-pointer border border-[#DDD6C4]"
          title={muted ? 'בטל השתקה' : 'השתק'}
        >
          {muted ? (
            <VolumeX className="w-4 h-4 text-[#DC2626]" />
          ) : (
            <Volume2 className="w-4 h-4 text-[#44403C]" />
          )}
        </button>

        <button
          onClick={onToggleLang}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#EFEAE0] hover:bg-[#E5DFD3] text-xs font-bold text-[#44403C] transition-colors cursor-pointer border border-[#DDD6C4]"
          title="שנה שפה / تغيير اللغة"
        >
          <Globe2 className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>{currentLang === 'he' ? 'עברית' : 'العربية'}</span>
        </button>
      </div>
    </header>
  );
};

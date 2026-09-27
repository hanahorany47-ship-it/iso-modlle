import React from 'react';
import { X, BookOpen, Layers } from 'lucide-react';
import { Language } from '../../types';

interface StudentFlowchartProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const StudentFlowchart: React.FC<StudentFlowchartProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-2xs">
      <div className="bg-[#FAF7F0] border-2 border-[#E4DEC8] rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col shadow-2xl overflow-hidden text-[#1C1917]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E6E0D2] bg-[#FFFDF9]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💡</span>
            <h3 className="font-black text-sm text-[#1C1917]">
              רמזים מהירים לקומה שלך
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-[#EFEAE0] hover:bg-[#E5DFD3] text-[#57534E]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick cheat sheet */}
        <div className="p-4 overflow-y-auto space-y-3 text-xs">
          <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#E4DEC8]">
            <h4 className="font-black text-[#1D4ED8] mb-1">
              כלל אצבע לפרוטוקול תחבורה (שכבה 4):
            </h4>
            <p className="text-[#57534E]">
              • <strong>TCP:</strong> כשיש חשיבות לדיוק ואמינות (אינטרנט, מייל, הורדת קובץ).
              <br />
              • <strong>UDP:</strong> כשחשובה מהירות ללא עיכוב (DNS, שיחת וידאו חיה, DHCP).
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#E4DEC8]">
            <h4 className="font-black text-[#15803D] mb-1">
              יחידות הנתונים (PDU) מלמעלה למטה:
            </h4>
            <p className="text-[#57534E]">
              • שכבות 7-5: <strong>Data (נתונים)</strong>
              <br />• שכבה 4: <strong>Segment (מקטע)</strong>
              <br />• שכבה 3: <strong>Packet (חבילה)</strong>
              <br />• שכבה 2: <strong>Frame (מסגרת)</strong>
              <br />• שכבה 1: <strong>Bits (ביטים)</strong>
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#FFFDF9] border border-[#E4DEC8]">
            <h4 className="font-black text-[#92400E] mb-1">
              מספרי פורט נפוצים (שכבה 4):
            </h4>
            <p className="text-[#57534E]">
              • 80 = HTTP (גלישה רגילה) | 443 = HTTPS (גלישה מאובטחת)
              <br />• 53 = DNS (תרגום שמות אתרים)
              <br />• 25 = SMTP (שליחת מייל) | 143/993 = IMAP (קבלת מייל)
              <br />• 22 = SSH (התחברות מאובטחת) | 20/21 = FTP (קבצים)
            </p>
          </div>
        </div>

        <div className="p-3 border-t border-[#E6E0D2] bg-[#FFFDF9] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#2563EB] text-white font-bold text-xs"
          >
            הבנתי, תודה!
          </button>
        </div>
      </div>
    </div>
  );
};

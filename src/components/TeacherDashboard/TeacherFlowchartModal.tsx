import React from 'react';
import { X, BookOpen, Layers } from 'lucide-react';
import { Language } from '../../types';
import { t } from '../../data/translations';
import { ALL_SCENARIOS } from '../../data/scenarios';

interface TeacherFlowchartModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const TeacherFlowchartModal: React.FC<TeacherFlowchartModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [activeTab, setActiveTab] = React.useState<'table' | 'scenarios'>('table');
  const texts = t[currentLang];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/40 backdrop-blur-2xs overflow-y-auto">
      <div className="bg-[#FAF7F0] border-2 border-[#E4DEC8] rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-[#1C1917]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#E6E0D2] bg-[#FFFDF9]">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">📖</span>
            <div>
              <h2 className="font-black text-base sm:text-lg text-[#1C1917]">
                מדריך החלטות ותרשימי זרימה: מודל 7 השכבות OSI
              </h2>
              <p className="text-xs text-[#78716C] font-medium">
                דף עזר נוח וברור לתלמיד ולכיתה
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-[#EFEAE0] p-1 rounded-2xl text-xs font-bold border border-[#DDD6C4]">
              <button
                onClick={() => setActiveTab('table')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'table'
                    ? 'bg-[#2563EB] text-white shadow-2xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                טבלת פרוטוקולים ופורטים
              </button>
              <button
                onClick={() => setActiveTab('scenarios')}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'scenarios'
                    ? 'bg-[#2563EB] text-white shadow-2xs'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                פירוט 9 התרחישים
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#EFEAE0] hover:bg-[#E5DFD3] text-[#57534E] transition-colors cursor-pointer border border-[#DDD6C4]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {activeTab === 'table' ? (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-2xl border-2 border-[#E4DEC8] shadow-2xs bg-[#FFFDF9]">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-[#EFEAE0] text-[#1C1917] font-black border-b border-[#E4DEC8] text-xs">
                      <th className="p-3">שם המשימה</th>
                      <th className="p-3">פרוטוקול אפליקציה L7</th>
                      <th className="p-3">פרוטוקול תחבורה L4</th>
                      <th className="p-3">מספר פורט</th>
                      <th className="p-3">דגש חשוב לזכור</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFEAE0] font-bold text-xs">
                    <tr className="hover:bg-[#FAF7F0]">
                      <td className="p-3">🌐 גלישה באינטרנט</td>
                      <td className="p-3 text-[#1D4ED8]">HTTP / HTTPS</td>
                      <td className="p-3 text-[#15803D]">TCP (אמין)</td>
                      <td className="p-3 text-[#92400E]">80 / 443</td>
                      <td className="p-3 text-[#57534E] font-normal">HTTPS מוצפן ב-TLS בשכבה 6</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]">
                      <td className="p-3">🔍 תרגום כתובת אתר (DNS)</td>
                      <td className="p-3 text-[#1D4ED8]">DNS</td>
                      <td className="p-3 text-[#7E22CE]">UDP (מהיר)</td>
                      <td className="p-3 text-[#92400E]">53</td>
                      <td className="p-3 text-[#57534E] font-normal">חבילה קצרה, ללא חלוקה למקטעים</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]">
                      <td className="p-3">✉️ שליחת דואר (SMTP)</td>
                      <td className="p-3 text-[#1D4ED8]">SMTP</td>
                      <td className="p-3 text-[#15803D]">TCP (אמין)</td>
                      <td className="p-3 text-[#92400E]">25 / 587</td>
                      <td className="p-3 text-[#57534E] font-normal">שליחה בלבד, חלוקה למקטעים עם Seq</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]">
                      <td className="p-3">📥 קבלת דואר (IMAP/POP3)</td>
                      <td className="p-3 text-[#1D4ED8]">IMAP / POP3</td>
                      <td className="p-3 text-[#15803D]">TCP (אמין)</td>
                      <td className="p-3 text-[#92400E]">143, 993, 110, 995</td>
                      <td className="p-3 text-[#57534E] font-normal">משיכת וסנכרון דואר משרת</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]">
                      <td className="p-3">📁 הורדת קובץ (FTP)</td>
                      <td className="p-3 text-[#1D4ED8]">FTP</td>
                      <td className="p-3 text-[#15803D]">TCP (אמין)</td>
                      <td className="p-3 text-[#92400E]">20 (נתונים), 21 (בקרה)</td>
                      <td className="p-3 text-[#57534E] font-normal">2 ערוצים נפרדים בשיחה (שכבה 5)</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]">
                      <td className="p-3">📡 קבלת כתובת אוטומטית</td>
                      <td className="p-3 text-[#1D4ED8]">DHCP</td>
                      <td className="p-3 text-[#7E22CE]">UDP (מהיר)</td>
                      <td className="p-3 text-[#92400E]">67 (שרת), 68 (לקוח)</td>
                      <td className="p-3 text-[#57534E] font-normal">שידור Broadcast לכל הרשת (255.255.255.255)</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]">
                      <td className="p-3">📹 שיחת וידאו / זום</td>
                      <td className="p-3 text-[#1D4ED8]">RTP / VoIP</td>
                      <td className="p-3 text-[#7E22CE]">UDP (מהיר)</td>
                      <td className="p-3 text-[#92400E]">דינמי (5060)</td>
                      <td className="p-3 text-[#7E22CE] font-black">חוק מיוחד: אין שידור חוזר אם אבד!</td>
                    </tr>
                    <tr className="hover:bg-[#FAF7F0]">
                      <td className="p-3">💻 התחברות מרחוק (SSH)</td>
                      <td className="p-3 text-[#1D4ED8]">SSH / Telnet</td>
                      <td className="p-3 text-[#15803D]">TCP (אמין)</td>
                      <td className="p-3 text-[#92400E]">SSH: 22, Telnet: 23</td>
                      <td className="p-3 text-[#57534E] font-normal">SSH מוצפן ב-L6, Telnet עובר גלוי!</td>
                    </tr>
                    <tr className="bg-[#FEF3C7]">
                      <td className="p-3 font-black text-[#78350F]">🔔 בדיקת פינג (PING)</td>
                      <td className="p-3 text-[#92400E] font-black">ICMP</td>
                      <td className="p-3 text-[#92400E] font-black">דילוג על שכבה 4!</td>
                      <td className="p-3 text-[#78350F] font-black">ללא פורט</td>
                      <td className="p-3 text-[#92400E] font-black">מכשול רמה 2: פועל בשכבה 3 בלבד!</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {ALL_SCENARIOS.map((sc) => (
                <div key={sc.id} className="p-3.5 rounded-2xl bg-[#FFFDF9] border-2 border-[#E4DEC8]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-black text-[#1C1917] text-sm">{sc.titleHe}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]">
                      רמה {sc.level}
                    </span>
                  </div>
                  <p className="text-xs text-[#57534E] mb-2 font-medium">{sc.descriptionHe}</p>
                  <div className="flex items-center gap-3 text-xs font-bold text-[#44403C] flex-wrap">
                    <span>פרוטוקול: {sc.protocolL7}</span>
                    <span>•</span>
                    <span>תחבורה: {sc.protocolL4}</span>
                    <span>•</span>
                    <span>פורט: {sc.ports}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3.5 border-t border-[#E6E0D2] bg-[#FFFDF9] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs cursor-pointer shadow-2xs"
          >
            סגור מדריך וחזור למשחק
          </button>
        </div>
      </div>
    </div>
  );
};

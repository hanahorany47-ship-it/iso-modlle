import React from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  RotateCcw,
  Trophy,
  Timer,
  ChevronDown,
} from 'lucide-react';
import {
  ComputerId,
  FloorVerifiedBadge,
  Language,
  LayerNumber,
  RoomState,
  TransmissionMedia,
} from './types';
import { ALL_SCENARIOS, getScenarioById, getScenariosByLevel } from './data/scenarios';
import { OSI_LAYERS } from './data/layers';
import { t } from './data/translations';
import { Header } from './components/Common/Header';
import { BuildingTower } from './components/TeacherDashboard/BuildingTower';
import { PhysicalBridge } from './components/TeacherDashboard/PhysicalBridge';
import { SabotageControls } from './components/TeacherDashboard/SabotageControls';
import { TeacherFlowchartModal } from './components/TeacherDashboard/TeacherFlowchartModal';
import { StudentChallenge } from './components/StudentMobile/StudentChallenge';
import { StudentFlowchart } from './components/StudentMobile/StudentFlowchart';
import { EncapsulationVisualizer } from './components/Common/EncapsulationVisualizer';
import {
  createInitialRoomState,
  fetchRoomState,
  pushRoomState,
  subscribeToLocalSync,
} from './utils/sync';

export default function App() {
  const [currentLang, setCurrentLang] = React.useState<Language>('he');
  const [activeView, setActiveView] = React.useState<'teacher' | 'student'>('teacher');
  const [roomId, setRoomId] = React.useState<string>('NET7');
  const [roomState, setRoomState] = React.useState<RoomState>(() =>
    createInitialRoomState('NET7')
  );

  const [studentComputer, setStudentComputer] = React.useState<ComputerId>('A');
  const [studentLayer, setStudentLayer] = React.useState<LayerNumber>(7);
  const [studentName, setStudentName] = React.useState<string>('תלמיד/ה');

  const [isFlowchartOpen, setIsFlowchartOpen] = React.useState<boolean>(false);
  const [isStudentGuideOpen, setIsStudentGuideOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    let isMounted = true;

    fetchRoomState(roomId).then((state) => {
      if (isMounted && state) {
        setRoomState({
          ...state,
          floorBadges: state.floorBadges || {},
          players: state.players || {},
        });
      }
    });

    const unsubscribe = subscribeToLocalSync((incomingState) => {
      if (incomingState && incomingState.id === roomId) {
        setRoomState({
          ...incomingState,
          floorBadges: incomingState.floorBadges || {},
          players: incomingState.players || {},
        });
      }
    });

    const interval = setInterval(async () => {
      try {
        const remote = await fetchRoomState(roomId);
        if (isMounted && remote) {
          setRoomState({
            ...remote,
            floorBadges: remote.floorBadges || {},
            players: remote.players || {},
          });
        }
      } catch {}
    }, 800);

    return () => {
      isMounted = false;
      unsubscribe();
      clearInterval(interval);
    };
  }, [roomId]);

  React.useEffect(() => {
    if (roomState?.gameStatus !== 'playing' || !roomState?.startTime) return;

    const timer = setInterval(() => {
      setRoomState((prev) => {
        if (!prev || prev.gameStatus !== 'playing') return prev;
        const now = Date.now();
        const elapsed = Math.floor((now - (prev.startTime || now)) / 1000);
        return { ...prev, elapsedSeconds: elapsed };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [roomState?.gameStatus, roomState?.startTime]);

  const updateState = (updater: (prev: RoomState) => RoomState) => {
    setRoomState((prev) => {
      const next = updater(prev);
      pushRoomState(next);
      return next;
    });
  };

  const texts = t[currentLang];
  const currentScenario = getScenarioById(roomState?.scenarioId || 'http_browser');

  const handleStartGame = () => {
    updateState((prev) => ({
      ...prev,
      gameStatus: 'playing',
      activeComputer: 'A',
      activeLayer: 7,
      stepIndex: 0,
      floorBadges: {},
      startTime: Date.now(),
      elapsedSeconds: 0,
      completedTime: undefined,
      sabotage: { packetLoss: false, bitError: false, latency: false },
    }));
  };

  const handleResetGame = () => {
    updateState((prev) => ({
      ...prev,
      gameStatus: 'lobby',
      activeComputer: 'A',
      activeLayer: 7,
      stepIndex: 0,
      floorBadges: {},
      startTime: null,
      elapsedSeconds: 0,
      completedTime: undefined,
      sabotage: { packetLoss: false, bitError: false, latency: false },
    }));
  };

  const handleSelectLevel = (level: 1 | 2) => {
    const scenarios = getScenariosByLevel(level);
    updateState((prev) => ({
      ...prev,
      level,
      scenarioId: scenarios[0]?.id || 'http_browser',
      gameStatus: 'lobby',
      activeComputer: 'A',
      activeLayer: 7,
      floorBadges: {},
      startTime: null,
      elapsedSeconds: 0,
      completedTime: undefined,
    }));
  };

  const handleSelectScenario = (scenarioId: string) => {
    updateState((prev) => ({
      ...prev,
      scenarioId,
      gameStatus: 'lobby',
      activeComputer: 'A',
      activeLayer: 7,
      floorBadges: {},
      startTime: null,
      elapsedSeconds: 0,
      completedTime: undefined,
    }));
  };

  const handleSelectMedia = (media: TransmissionMedia) => {
    updateState((prev) => ({
      ...prev,
      transmissionMedia: media,
    }));
  };

  const handleTriggerSabotage = (type: 'packetLoss' | 'bitError' | 'latency') => {
    const isVoIP = roomState?.scenarioId === 'voip_rtp';
    let msgHe = 'תקלת רשת הוזרקה למערכת!';
    let msgAr = 'تم إدخال عطل في الشبكة!';

    if (type === 'packetLoss') {
      msgHe = isVoIP
        ? 'חבילה נאבדה! אך ב-VoIP/RTP אין שידור חוזר - ממשיכים בזמן אמת!'
        : 'איבוד חבילה זוהה! שכבת התחבורה נדרשת לשלוח Retransmit.';
      msgAr = isVoIP
        ? 'فُقدت حزمة! ولكن في VoIP/RTP لا يوجد إعادة إرسال - يستمر البث بالوقت الفعلي!'
        : 'تم اكتشاف فقدان حزمة! طبقة النقل مطالبة بإعادة الإرسال Retransmit.';
    } else if (type === 'bitError') {
      msgHe = 'שגיאת ביט בכבל! שכבה 2 תדחה את ה-Frame בגלל כישלון בבדיקת CRC.';
      msgAr = 'خطأ في البتات بالكابل! سترفض الطبقة 2 الإطار بسبب فشل فحص CRC.';
    } else if (type === 'latency') {
      msgHe = 'השהיית רשת גבוהה! נדרשת ספיגה ב-Jitter Buffer.';
      msgAr = 'تأخير شبكي عالٍ! يلزم الاستيعاب في مخزن Jitter Buffer.';
    }

    updateState((prev) => ({
      ...prev,
      sabotage: {
        ...(prev.sabotage || {}),
        [type]: true,
        messageHe: msgHe,
        messageAr: msgAr,
        triggeredAt: Date.now(),
      },
    }));
  };

  const handleClearSabotage = () => {
    updateState((prev) => ({
      ...prev,
      sabotage: { packetLoss: false, bitError: false, latency: false },
    }));
  };

  const handleOptionVerified = (badge: FloorVerifiedBadge) => {
    updateState((prev) => {
      const key = `${prev.activeComputer}_${prev.activeLayer}`;
      const existing = (prev.floorBadges && prev.floorBadges[key]) || [];
      if (existing.some((b) => b.id === badge.id)) return prev;

      return {
        ...prev,
        floorBadges: {
          ...(prev.floorBadges || {}),
          [key]: [...existing, badge],
        },
      };
    });
  };

  const handleAdvanceFloor = () => {
    updateState((prev) => {
      let nextComputer = prev.activeComputer;
      let nextLayer = prev.activeLayer;
      let nextStatus = prev.gameStatus;
      let completedTime = prev.completedTime;

      if (prev.activeComputer === 'A') {
        if (prev.activeLayer > 1) {
          nextLayer = (prev.activeLayer - 1) as LayerNumber;
        } else {
          nextComputer = 'B';
          nextLayer = 1;
        }
      } else {
        if (prev.activeLayer < 7) {
          nextLayer = (prev.activeLayer + 1) as LayerNumber;
        } else {
          nextStatus = 'completed';
          completedTime = prev.elapsedSeconds;
          confetti({
            particleCount: 160,
            spread: 100,
            origin: { y: 0.5 },
          });
        }
      }

      // Automatically sync student view to next active floor
      setStudentComputer(nextComputer);
      setStudentLayer(nextLayer);

      return {
        ...prev,
        activeComputer: nextComputer,
        activeLayer: nextLayer,
        gameStatus: nextStatus,
        completedTime,
      };
    });
  };

  return (
    <div
      dir={currentLang === 'he' || currentLang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-[#F8F6F0] text-[#1C1917] flex flex-col font-sans selection:bg-[#DBEAFE]"
    >
      <Header
        currentLang={currentLang}
        onToggleLang={() => setCurrentLang((l) => (l === 'he' ? 'ar' : 'he'))}
        activeView={activeView}
        onSwitchView={setActiveView}
        roomId={roomId}
        onOpenFlowchart={() => setIsFlowchartOpen(true)}
      />

      {activeView === 'teacher' ? (
        <main className="flex-1 p-3 md:p-6 flex flex-col gap-4 max-w-7xl mx-auto w-full">
          {/* Top Control Bar with Gentle Warm Styling */}
          <div className="bg-[#FAF7F0] border-2 border-[#E4DEC8] rounded-3xl p-4 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <div className="flex bg-[#EFEAE0] p-1 rounded-2xl border border-[#DDD6C4]">
                <button
                  onClick={() => handleSelectLevel(1)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    roomState?.level === 1
                      ? 'bg-[#2563EB] text-white shadow-2xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {texts.level1}
                </button>
                <button
                  onClick={() => handleSelectLevel(2)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    roomState?.level === 2
                      ? 'bg-[#7C3AED] text-white shadow-2xs'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {texts.level2}
                </button>
              </div>

              <div className="relative flex-1 min-w-[260px]">
                <select
                  value={roomState?.scenarioId || 'http_browser'}
                  onChange={(e) => handleSelectScenario(e.target.value)}
                  className="w-full bg-[#FFFDF9] border-2 border-[#E4DEC8] text-[#1C1917] text-xs sm:text-sm font-bold rounded-2xl px-3.5 py-2 appearance-none cursor-pointer focus:outline-hidden focus:border-[#2563EB]"
                >
                  {getScenariosByLevel(roomState?.level || 1).map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {currentLang === 'he' ? sc.titleHe : sc.titleAr}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-[#78716C] absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#FEF3C7] rounded-2xl border border-[#FDE68A] text-[#78350F] font-bold">
                <Timer className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs">שעון כיתתי:</span>
                <span className="text-sm font-black">
                  {Math.floor((roomState?.elapsedSeconds || 0) / 60)
                    .toString()
                    .padStart(2, '0')}
                  :
                  {((roomState?.elapsedSeconds || 0) % 60).toString().padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {roomState?.gameStatus !== 'playing' ? (
                  <button
                    onClick={handleStartGame}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>התחל שידור חבילה 🚀</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetGame}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#EFEAE0] hover:bg-[#E5DFD3] text-[#44403C] font-bold text-xs transition-colors cursor-pointer border border-[#DDD6C4]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>איפוס</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Active Mission Card with warm, gentle pastel tones */}
          <div className="bg-[#FAF7F0] border-2 border-[#E4DEC8] rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h4 className="font-black text-[#1C1917] text-sm sm:text-base">
                  {currentLang === 'he' ? currentScenario.titleHe : currentScenario.titleAr}
                </h4>
                <p className="text-[#57534E] font-medium">
                  {currentLang === 'he' ? currentScenario.subtitleHe : currentScenario.subtitleAr}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-bold text-xs flex-wrap justify-end">
              <span className="bg-[#DBEAFE] text-[#1D4ED8] px-3 py-1 rounded-xl border border-[#BFDBFE]">
                פרוטוקול: {currentScenario.protocolL7}
              </span>
              <span className="bg-[#CCFBF1] text-[#0F766E] px-3 py-1 rounded-xl border border-[#99F6E4]">
                תחבורה: {currentScenario.protocolL4} ({currentScenario.ports})
              </span>
              <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-xl border border-[#FDE68A]">
                גודל: {currentScenario.dataSize}
              </span>
            </div>
          </div>

          {/* Live Encapsulation & Decapsulation Animated Visualizer & PDU Monitor */}
          <EncapsulationVisualizer
            roomState={roomState}
            currentLang={currentLang}
          />

          {/* Two 7-Story Illustrated Buildings */}
          <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 mt-2">
            <BuildingTower
              computer="A"
              roomState={roomState}
              currentLang={currentLang}
              onSelectRole={(comp, layer) => {
                setStudentComputer(comp);
                setStudentLayer(layer);
                setActiveView('student');
              }}
            />

            <BuildingTower
              computer="B"
              roomState={roomState}
              currentLang={currentLang}
              onSelectRole={(comp, layer) => {
                setStudentComputer(comp);
                setStudentLayer(layer);
                setActiveView('student');
              }}
            />
          </div>

          {/* Physical Bridge between the Buildings (Layer 1) */}
          <PhysicalBridge
            roomState={roomState}
            currentLang={currentLang}
            onSelectMedia={handleSelectMedia}
          />

          {/* Teacher Sabotage & Failure Simulation Controls */}
          <SabotageControls
            roomState={roomState}
            currentLang={currentLang}
            onTriggerSabotage={handleTriggerSabotage}
            onClearSabotage={handleClearSabotage}
          />

          {/* Victory Modal */}
          {roomState?.gameStatus === 'completed' && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
              <div className="bg-[#FAF7F0] border-4 border-[#86EFAC] rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl flex flex-col items-center gap-4 animate-scaleUp">
                <div className="w-20 h-20 rounded-full bg-[#DCFCE7] flex items-center justify-center text-4xl shadow-inner">
                  🏆
                </div>
                <div>
                  <h3 className="text-2xl font-black text-[#14532D]">
                    החבילה הגיעה ליעדה בהצלחה!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#166534] mt-1 font-medium">
                    כל 14 השלבים (7 שלבי אריזה + 7 שלבי פריקה) בוצעו במלואם ללא שגיאות!
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF9] border border-[#BBF7D0] w-full flex items-center justify-around font-bold text-sm">
                  <div>
                    <span className="text-[#57534E] text-xs block">זמן ריצה כיתתי:</span>
                    <span className="text-lg font-black text-[#15803D]">
                      {roomState.completedTime ? `${roomState.completedTime} שניות` : 'הושלם!'}
                    </span>
                  </div>
                  <div className="h-8 w-px bg-[#E4DEC8]" />
                  <div>
                    <span className="text-[#57534E] text-xs block">רמת קושי:</span>
                    <span className="text-lg font-black text-[#2563EB]">
                      רמה {roomState.level}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full">
                  <button
                    onClick={handleResetGame}
                    className="flex-1 py-3 rounded-2xl bg-[#059669] hover:bg-[#047857] text-white font-black text-sm shadow-md transition-all cursor-pointer"
                  >
                    התחל משימה חדשה
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : (
        <main className="flex-1 p-2 sm:p-4 max-w-5xl mx-auto w-full flex flex-col gap-4">
          <EncapsulationVisualizer
            roomState={roomState}
            currentLang={currentLang}
          />
          <StudentChallenge
            currentComputer={studentComputer}
            currentLayer={studentLayer}
            playerName={studentName}
            roomState={roomState}
            currentLang={currentLang}
            onOptionVerified={handleOptionVerified}
            onAdvanceFloor={handleAdvanceFloor}
            onOpenCheatSheet={() => setIsStudentGuideOpen(true)}
            onSwitchRole={(comp, layer) => {
              setStudentComputer(comp);
              setStudentLayer(layer);
            }}
          />
        </main>
      )}

      {/* Teacher Flowchart and Decision Cheat Sheet Modal */}
      <TeacherFlowchartModal
        isOpen={isFlowchartOpen}
        onClose={() => setIsFlowchartOpen(false)}
        currentLang={currentLang}
      />

      {/* Student Quick Help Modal */}
      <StudentFlowchart
        isOpen={isStudentGuideOpen}
        onClose={() => setIsStudentGuideOpen(false)}
        currentLang={currentLang}
      />
    </div>
  );
}

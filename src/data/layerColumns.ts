import { ColumnOptionItem, ComputerId, LayerNumber, Scenario } from '../types';

export function getColumnOptionsForFloor(
  scenario: Scenario,
  computer: ComputerId,
  layer: LayerNumber
): {
  pduAndProtocol: ColumnOptionItem[];
  addressAndPorts: ColumnOptionItem[];
  processAndActions: ColumnOptionItem[];
} {
  const isSender = computer === 'A';
  const scId = scenario.id;

  // Defaults per layer
  const pduList: ColumnOptionItem[] = [];
  const addressList: ColumnOptionItem[] = [];
  const actionList: ColumnOptionItem[] = [];

  // ==================== LAYER 7 (Application) ====================
  if (layer === 7) {
    // Column 1: PDU & Protocol
    pduList.push(
      {
        id: 'pdu_data_l7',
        category: 'pdu_protocol',
        nameHe: 'יחידת נתונים: Data (נתונים)',
        nameAr: 'وحدة البيانات: Data (بيانات)',
        subtextHe: 'יחידת ה-PDU של שכבות האפליקציה (7-5)',
        subtextAr: 'وحدة PDU لطبقات التطبيقات (7-5)',
        iconName: 'FileText',
        isCorrect: true,
        explanationHe: 'מדויק! בשכבות העליונות 7, 6 ו-5 יחידת הנתונים נקראת Data (נתונים).',
        explanationAr: 'دقيق! في الطبقات العليا 7 و 6 و 5 تسمى وحدة البيانات Data.',
        hintHe: 'זכור: בשכבה 7 הנתונים נקראים פשוט Data.',
        hintAr: 'تذكر: في الطبقة 7 تسمى البيانات Data.',
        badgeLabelHe: 'PDU: Data (נתונים)',
        badgeLabelAr: 'PDU: Data (بيانات)',
      },
      {
        id: 'proto_http_https',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: HTTP / HTTPS',
        nameAr: 'بروتوكول: HTTP / HTTPS',
        subtextHe: 'לטעינת דפי אינטרנט בדפדפן',
        subtextAr: 'لتحميل صفحات الويب بالمتصفح',
        iconName: 'Globe',
        isCorrect: scId === 'http_browser',
        explanationHe: 'נכון! גלישה באינטרנט נעשית באמצעות פרוטוקול HTTP או HTTPS המאובטח.',
        explanationAr: 'صحيح! تصفح الويب يتم عبر بروتوكول HTTP أو HTTPS الآمن.',
        hintHe: 'חשוב באיזה פרוטוקול מתחילה כל כתובת אתר אינטרנט.',
        hintAr: 'فكر بالبروتوكول الذي يبدأ به عنوان أي موقع ويب.',
        badgeLabelHe: 'פרוטוקול: HTTPS / HTTP',
        badgeLabelAr: 'بروتوكول: HTTPS / HTTP',
      },
      {
        id: 'proto_dns',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: DNS',
        nameAr: 'بروتوكول: DNS',
        subtextHe: 'תרגום שם מתחם (Domain) לכתובת IP',
        subtextAr: 'ترجمة اسم النطاق إلى عنوان IP',
        iconName: 'Search',
        isCorrect: scId === 'dns_lookup',
        explanationHe: 'נכון! DNS הוא ספר הטלפונים של הרשת המתרגם שמות אתרים לכתובות IP.',
        explanationAr: 'صحيح! نظام DNS هو دليل هواتف الشبكة لترجمة أسماء النطاقات.',
        hintHe: 'תרגום שם אתר מתבצע באמצעות פרוטוקול DNS.',
        hintAr: 'ترجمة اسم الموقع تتم عبر بروتوكول DNS.',
        badgeLabelHe: 'פרוטוקול: DNS',
        badgeLabelAr: 'بروتوكول: DNS',
      },
      {
        id: 'proto_smtp',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: SMTP',
        nameAr: 'بروتوكول: SMTP',
        subtextHe: 'לשליחת דואר אלקטרוני יוצא בלבד',
        subtextAr: 'لإرسال البريد الصادر فقط',
        iconName: 'Send',
        isCorrect: scId === 'smtp_email',
        explanationHe: 'נכון! SMTP משמש בלעדית לשליחת דואר יוצא.',
        explanationAr: 'صحيح! يستخدم SMTP حصرياً لإرسال البريد الصادر.',
        hintHe: 'שליחת מייל נעשית באמצעות Simple Mail Transfer Protocol.',
        hintAr: 'إرسال البريد يتم عبر SMTP.',
        badgeLabelHe: 'פרוטוקול: SMTP (שליחה)',
        badgeLabelAr: 'بروتوكول: SMTP (إرسال)',
      },
      {
        id: 'proto_imap_pop3',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: IMAP / POP3',
        nameAr: 'بروتوكول: IMAP / POP3',
        subtextHe: 'לקבלה ולסנכרון דואר משרת',
        subtextAr: 'لاستلام ومزامنة البريد من الخادم',
        iconName: 'Inbox',
        isCorrect: scId === 'imap_pop3',
        explanationHe: 'מעולה! IMAP ו-POP3 מיועדים למשיכת דואר משרת ללקוח.',
        explanationAr: 'ممتاز! يستخدم IMAP و POP3 لجلب البريد من الخادم.',
        hintHe: 'משיכת וסנכרון דואר מתבצעים באמצעות IMAP או POP3.',
        hintAr: 'جلب ومزامنة البريد يتم عبر IMAP أو POP3.',
        badgeLabelHe: 'פרוטוקול: IMAP/POP3 (משיכה)',
        badgeLabelAr: 'بروتوكول: IMAP/POP3 (جلب)',
      },
      {
        id: 'proto_ftp',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: FTP',
        nameAr: 'بروتوكول: FTP',
        subtextHe: 'העברה והורדה של קבצים משרת',
        subtextAr: 'نقل وتنزيل الملفات من الخادم',
        iconName: 'FolderDown',
        isCorrect: scId === 'ftp_download',
        explanationHe: 'נכון! הורדת קבצים ייעודית מבוצעת באמצעות FTP.',
        explanationAr: 'صحيح! تنزيل الملفات يتم بواسطة FTP.',
        hintHe: 'File Transfer Protocol = FTP.',
        hintAr: 'اختصار نقل الملفات هو FTP.',
        badgeLabelHe: 'פרוטוקול: FTP',
        badgeLabelAr: 'بروتوكول: FTP',
      },
      {
        id: 'proto_dhcp',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: DHCP',
        nameAr: 'بروتوكול: DHCP',
        subtextHe: 'קבלת כתובת IP והגדרות רשת אוטומטיות',
        subtextAr: 'الحصول على عنوان IP والإعدادات تلقائياً',
        iconName: 'RadioTower',
        isCorrect: scId === 'dhcp_config',
        explanationHe: 'נכון! מכשיר חדש ללא כתובת IP משתמש ב-DHCP כדי לבקש הגדרות.',
        explanationAr: 'صحيح! جهاز جديد بدون عنوان IP يستخدم DHCP لطلب الإعدادات.',
        hintHe: 'בקשת כתובת אוטומטית ברשת נעשית על ידי DHCP.',
        hintAr: 'طلب عنوان تلقائي يتم عبر DHCP.',
        badgeLabelHe: 'פרוטוקול: DHCP',
        badgeLabelAr: 'بروتوكول: DHCP',
      },
      {
        id: 'proto_ssh_telnet',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: SSH (או Telnet)',
        nameAr: 'بروتوكول: SSH (أو Telnet)',
        subtextHe: 'התחברות למסוף פקודות מרוחק (CLI)',
        subtextAr: 'الاتصال بطرفية الأوامر عن بعد (CLI)',
        iconName: 'Terminal',
        isCorrect: scId === 'ssh_telnet',
        explanationHe: 'נכון! התחברות לניהול שרת מרוחק נעשית ב-SSH (מאובטח) או Telnet.',
        explanationAr: 'صحيح! إدارة الخوادم عن بعد تتم عبر SSH أو Telnet.',
        hintHe: 'פרוטוקול מסוף פקודות מאובטח נקרא SSH.',
        hintAr: 'بروتوكول الطرفية الآمن يسمى SSH.',
        badgeLabelHe: 'פרוטוקול: SSH / Telnet',
        badgeLabelAr: 'بروتوكول: SSH / Telnet',
      },
      {
        id: 'proto_voip_rtp',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: RTP / VoIP',
        nameAr: 'بروتوكول: RTP / VoIP',
        subtextHe: 'שידור והזרמת וידאו ושמע בזמן אמת',
        subtextAr: 'بث الوسائط والصوت بالوقت الفعلي',
        iconName: 'Video',
        isCorrect: scId === 'voip_rtp',
        explanationHe: 'מדויק! הזרמת וידאו וקול בשיחות חיות נעשית ב-RTP (Real-time Transport Protocol).',
        explanationAr: 'دقيق! بث الفيديو والصوت بالوقت الفعلي يتم بواسطة RTP.',
        hintHe: 'הזרמת וידאו חי בזמן אמת נעשית ב-RTP.',
        hintAr: 'بث الفيديو الحي يتم عبر RTP.',
        badgeLabelHe: 'פרוטוקול: RTP / VoIP',
        badgeLabelAr: 'بروتوكول: RTP / VoIP',
      },
      {
        id: 'proto_icmp',
        category: 'pdu_protocol',
        nameHe: 'פרוטוקול: ICMP (בדיקת PING)',
        nameAr: 'بروتوكول: ICMP (فحص PING)',
        subtextHe: 'בדיקת קישוריות והודעות בקרה ברשת',
        subtextAr: 'فحص الاتصالية ورسائل التحكم بالشبكة',
        iconName: 'Activity',
        isCorrect: scId === 'ping_icmp',
        explanationHe: 'נכון מאוד! פקודת PING יוצרת הודעת בקרה של פרוטוקול ICMP.',
        explanationAr: 'صحيح جداً! أمر PING ينشئ رسالة تحكم لبروتوكול ICMP.',
        hintHe: 'בדיקת פינג משתמשת בפרוטוקול ICMP.',
        hintAr: 'فحص البينغ يستخدم بروتوكול ICMP.',
        badgeLabelHe: 'הודעת: ICMP Echo Request',
        badgeLabelAr: 'رسالة: ICMP Echo Request',
      }
    );

    // Column 2: Addressing / Application Targets
    addressList.push(
      {
        id: 'target_url',
        category: 'address_port',
        nameHe: 'כתובת יעד: URL של האתר (google.com)',
        nameAr: 'عنوان الهدف: رابط الموقع URL',
        subtextHe: 'כתובת לוגית אפליקטיבית להורדת תוכן',
        subtextAr: 'عنوان تطبيقي منطقي لتحميل المحتوى',
        iconName: 'Compass',
        isCorrect: scId === 'http_browser' || scId === 'dns_lookup',
        explanationHe: 'נכון! היישום פונה לכתובת ה-URL המבוקשת.',
        explanationAr: 'صحيح! يتوجه التطبيق لرابط الـ URL المطلوب.',
        hintHe: 'גלישה או תרגום דורשים כתובת דומיין / URL.',
        hintAr: 'التصفح أو الترجمة يتطلب رابط URL.',
        badgeLabelHe: 'יעד: URL/דומיין',
        badgeLabelAr: 'الهدف: رابط URL',
      },
      {
        id: 'target_email_box',
        category: 'address_port',
        nameHe: 'כתובת דואר: student@school.edu',
        nameAr: 'عنوان البريد: student@school.edu',
        subtextHe: 'זיהוי תיבת הנמען/השולח באפליקציה',
        subtextAr: 'تحديد صندوق المستلم/المرسل',
        iconName: 'AtSign',
        isCorrect: scId === 'smtp_email' || scId === 'imap_pop3',
        explanationHe: 'נכון! פעולות דואר דורשות הגדרת תיבת דואר אלקטרוני.',
        explanationAr: 'صحيح! عمليات البريد تتطلب تحديد عنوان البريد.',
        hintHe: 'פעולות מייל מתבססות על כתובות דואר.',
        hintAr: 'عمليات البريد تعتمد على عناوين البريد.',
        badgeLabelHe: 'נמען: Mailbox Address',
        badgeLabelAr: 'المستلم: Mailbox Address',
      },
      {
        id: 'target_remote_host',
        category: 'address_port',
        nameHe: 'יעד שרת ניהול: Server CLI IP / Port',
        nameAr: 'هدف خادم الإدارة: Server CLI IP',
        subtextHe: 'התחברות לשליטה במכונה מרוחקת',
        subtextAr: 'اتصال للتحكم بجهاز بعيد',
        iconName: 'Server',
        isCorrect: scId === 'ssh_telnet' || scId === 'ftp_download' || scId === 'ping_icmp',
        explanationHe: 'נכון! פעולה זו פונה לשרת/מחשב יעד מוגדר ברשת.',
        explanationAr: 'صحيح! هذه العملية تتوجه لخادم هدف محدد.',
        hintHe: 'בחר ביעד שרת/מכונה מרוחקת.',
        hintAr: 'اختر هدف الخادم البعيد.',
        badgeLabelHe: 'יעד: שרת מרוחק',
        badgeLabelAr: 'الهدف: خادم بعيد',
      },
      {
        id: 'target_broadcast_dhcp',
        category: 'address_port',
        nameHe: 'יעד שידור: Broadcast לכל הרשת המקומית',
        nameAr: 'هدف البث: Broadcast لكافة الشبكة',
        subtextHe: 'איתור שרת DHCP ללא כתובת קיימת',
        subtextAr: 'البحث عن خادم DHCP بدون عنوان مسبق',
        iconName: 'Radio',
        isCorrect: scId === 'dhcp_config',
        explanationHe: 'מדויק! DHCP Discover משודר ב-Broadcast לכל שרתי הרשת.',
        explanationAr: 'دقيق! يبث DHCP Discover لكل خوادم الشبكة.',
        hintHe: 'מכשיר חדש ללא IP משדר Broadcast.',
        hintAr: 'جهاز جديد دون IP يبث Broadcast.',
        badgeLabelHe: 'יעד: Broadcast כיתתי/מקומי',
        badgeLabelAr: 'الهدف: بث عام Broadcast',
      }
    );

    // Column 3: Processes & Actions
    actionList.push(
      {
        id: 'act_generate_request',
        category: 'process_action',
        nameHe: isSender ? 'יצירת בקשת המשתמש באפליקציה' : 'קבלת המידע והצגתו בתוכנה למשתמש',
        nameAr: isSender ? 'إنشاء طلب المستخدم بالتطبيق' : 'استلام البيانات وعرضها بالبرنامج',
        subtextHe: isSender ? 'הפעלת הפקודה בהתאם לסוג התוכנה' : 'הצגת התוצאה הסופית על המסך',
        subtextAr: isSender ? 'تشغيل الأمر حسب نوع البرنامج' : 'عرض النتيجة النهائية على الشاشة',
        iconName: 'Sparkles',
        isCorrect: true,
        explanationHe: isSender
          ? 'מעולה! שכבה 7 מתחילה בהפקת בקשת המשתמש ביישום.'
          : 'כל הכבוד! שכבה 7 מציגה את התוצאה הסופית והמלאה למשתמש.',
        explanationAr: isSender
          ? 'ممتاز! تبدأ الطبقة 7 بإنشاء طلب المستخدم بالتطبيق.'
          : 'أحسنت! تعرض الطبقة 7 النتيجة النهائية للمستخدم.',
        hintHe: isSender ? 'שכבה 7 מייצרת את הבקשה מהיישום.' : 'שכבה 7 מציגה את המידע לתוכנה.',
        hintAr: isSender ? 'الطبقة 7 تنشئ الطلب.' : 'الطبقة 7 تعرض البيانات للبرنامج.',
        badgeLabelHe: isSender ? 'פעולה: יצירת בקשה' : 'סיום: הצגה ביישום',
        badgeLabelAr: isSender ? 'إجراء: إنشاء الطلب' : 'اكتمال: العرض بالتطبيق',
      }
    );
  }

  // ==================== LAYER 6 (Presentation) ====================
  else if (layer === 6) {
    pduList.push(
      {
        id: 'pdu_data_l6',
        category: 'pdu_protocol',
        nameHe: 'יחידת נתונים: Data (נתונים)',
        nameAr: 'وحدة البيانات: Data (بيانات)',
        subtextHe: 'נתונים מפורמטים או מוצפנים',
        subtextAr: 'بيانات منسقة أو مشفرة',
        iconName: 'FileText',
        isCorrect: true,
        explanationHe: 'נכון! בשכבה 6 היחידה היא עדיין Data.',
        explanationAr: 'صحيح! في الطبقة 6 الوحدة لا تزال Data.',
        hintHe: 'בשכבה 6 יחידת הנתונים היא Data.',
        hintAr: 'في الطبقة 6 وحدة البيانات هي Data.',
        badgeLabelHe: 'PDU: Data (נתונים)',
        badgeLabelAr: 'PDU: Data (بيانات)',
      }
    );

    addressList.push(
      {
        id: 'format_tls',
        category: 'address_port',
        nameHe: isSender ? 'הצפנת TLS / SSL (מפתחות הצפנה)' : 'פענוח הצפנת TLS / SSL',
        nameAr: isSender ? 'تشفير TLS / SSL' : 'فك تشفير TLS / SSL',
        subtextHe: 'הגנה על המידע (HTTPS, IMAP/POP3 מוצפן, SSH)',
        subtextAr: 'حماية البيانات الحساسة',
        iconName: 'Lock',
        isCorrect: scId === 'http_browser' || scId === 'imap_pop3' || scId === 'ssh_telnet' || scId === 'smtp_email',
        explanationHe: 'מדויק! שכבה 6 אחראית על הצפנה ופענוח אבטחה ב-TLS או SSH.',
        explanationAr: 'دقيق! الطبقة 6 مسؤولة عن التشفير وفك التشفير عبر TLS أو SSH.',
        hintHe: 'עבור שירותים מאובטחים שכבה 6 עוסקת בהצפנה/פענוח TLS.',
        hintAr: 'للخدمات الآمنة تختص الطبقة 6 بتشفير/فك تشفير TLS.',
        badgeLabelHe: isSender ? 'אבטחה: הצפנת TLS' : 'אבטחה: פענוח TLS',
        badgeLabelAr: isSender ? 'أمان: تشفير TLS' : 'أمان: فك تشفير TLS',
      },
      {
        id: 'format_plain',
        category: 'address_port',
        nameHe: 'פורמט בינארי תקני ללא הצפנה (Plain / Standard)',
        nameAr: 'تنسيق قياسي دون تشفير (Plain)',
        subtextHe: 'לפרוטוקולים פשוטים כמו DNS, DHCP, ICMP או Telnet',
        subtextAr: 'للبروتوكولات البسيطة مثل DNS و DHCP و ICMP',
        iconName: 'FileCode',
        isCorrect: scId === 'dns_lookup' || scId === 'dhcp_config' || scId === 'ping_icmp' || scId === 'ftp_download',
        explanationHe: 'נכון! בפרוטוקולים אלו שכבה 6 מעבירה את הנתונים במבנה בינארי תקני.',
        explanationAr: 'صحيح! في هذه البروتوكولات تمرر الطبقة 6 البيانات بتنسيق قياسي.',
        hintHe: 'בשאילתות קצרות ופשוטות אין צורך בהצפנת TLS כבדה.',
        hintAr: 'في الاستعلامات البسيطة لا يلزم تشفير معقد.',
        badgeLabelHe: 'פורמט: בינארי תקני',
        badgeLabelAr: 'تنسيق: بنية قياسية',
      }
    );

    actionList.push(
      {
        id: 'act_mime_codec',
        category: 'process_action',
        nameHe: scId === 'voip_rtp' ? 'דחיסת וידאו H.264 / AAC' : scId === 'smtp_email' ? 'קידוד קבצים MIME (Base64)' : 'פרמוט הנתונים למבנה קריא',
        nameAr: scId === 'voip_rtp' ? 'ضغط الفيديو H.264' : 'ترميز الملفات وتنسيق البيانات',
        subtextHe: 'התאמת תוכן המדיה או הקבצים להעברה ברשת',
        subtextAr: 'تكييف محتوى الوسائط والملفات للنقل',
        iconName: 'Cpu',
        isCorrect: true,
        explanationHe: 'מצוין! שכבה 6 מתמחה בדחיסה, קידוד (MIME) ופרמוט נתונים.',
        explanationAr: 'ممتاز! تختص الطبقة 6 بالضغط والترميز (MIME) وتنسيق البيانات.',
        hintHe: 'שכבה 6 היא שכבת הפרזנטציה והקידוד.',
        hintAr: 'الطبقة 6 هي طبقة التقديم والترميز.',
        badgeLabelHe: scId === 'voip_rtp' ? 'עיבוד: דחיסת H.264' : 'עיבוד: קידוד ופרמוט',
        badgeLabelAr: 'معالجة: ترميز وتنسيق',
      }
    );
  }

  // ==================== LAYER 5 (Session) ====================
  else if (layer === 5) {
    pduList.push(
      {
        id: 'pdu_data_l5',
        category: 'pdu_protocol',
        nameHe: 'יחידת נתונים: Data (נתונים)',
        nameAr: 'وحدة البيانات: Data (بيانات)',
        subtextHe: 'נתוני שיחה מסונכרנים',
        subtextAr: 'بيانات جلسة متزامنة',
        iconName: 'FileText',
        isCorrect: true,
        explanationHe: 'נכון! גם בשכבה 5 יחידת המידע נקראת Data.',
        explanationAr: 'صحيح! في الطبقة 5 تسمى وحدة البيانات Data.',
        hintHe: 'PDU בשכבה 5 הוא Data.',
        hintAr: 'وحدة PDU في الطبقة 5 هي Data.',
        badgeLabelHe: 'PDU: Data (נתונים)',
        badgeLabelAr: 'PDU: Data (بيانات)',
      }
    );

    addressList.push(
      {
        id: 'session_identifier',
        category: 'address_port',
        nameHe: 'מזהה שיחה: Session ID / Transaction ID',
        nameAr: 'معرف الجلسة: Session ID / Transaction ID',
        subtextHe: 'מזהה ייחודי לשיוך תשובות ובקשות בין היישומים',
        subtextAr: 'معرف فريد لربط الطلبات بالاستجابات',
        iconName: 'Key',
        isCorrect: true,
        explanationHe: 'מדויק! שכבה 5 מייצרת או מאמתת מזהה שיחה ייחודי.',
        explanationAr: 'دقيق! تنشئ الطبقة 5 أو تتحقق من معرف جلسة فريد.',
        hintHe: 'שכבת ה-Session מנהלת Session ID.',
        hintAr: 'طبقة الجلسة تدير الـ Session ID.',
        badgeLabelHe: 'מזהה: Session ID ייחודי',
        badgeLabelAr: 'المعرف: Session ID',
      }
    );

    actionList.push(
      {
        id: 'act_ftp_channels',
        category: 'process_action',
        nameHe: scId === 'ftp_download' ? 'ניהול 2 ערוצים נפרדים (בקרה + נתונים)' : 'פתיחה, ניהול וסנכרון ערוץ הדיאלוג',
        nameAr: scId === 'ftp_download' ? 'إدارة قناتين (تحكم + بيانات)' : 'فتح وإدارة ومزامنة قناة الحوار',
        subtextHe: 'שמירה על רצף השיחה בין שני המחשבים',
        subtextAr: 'الحفاظ على تسلسل الحوار بين الجهازين',
        iconName: 'MessagesSquare',
        isCorrect: true,
        explanationHe: 'כל הכבוד! שכבה 5 פותחת ומנהלת את הדיאלוג והסנכרון בין הקצוות.',
        explanationAr: 'أحسنت! تفتح الطبقة 5 وتدير الحوار والتزامن بين الطرفين.',
        hintHe: 'שכבת השיחה אחראית על ניהול הדיאלוג.',
        hintAr: 'طبقة الجلسة مسؤولة عن إدارة الحوار.',
        badgeLabelHe: scId === 'ftp_download' ? 'דיאלוג: 2 ערוצי שיחה' : 'דיאלוג: שיחה פעילה ומסונכרנת',
        badgeLabelAr: 'الحوار: جلسة نشطة ومتزامنة',
      }
    );
  }

  // ==================== LAYER 4 (Transport) ====================
  else if (layer === 4) {
    // CRITICAL: Check if this scenario is ICMP/PING!
    if (scId === 'ping_icmp') {
      pduList.push(
        {
          id: 'opt_icmp_skip_l4',
          category: 'pdu_protocol',
          nameHe: '⚠️ שאלת מכשול: דילוג מלא על שכבה 4! ICMP פועל ב-L3 בלבד!',
          nameAr: '⚠️ سؤال الخدعة: تخطي كامل للطبقة 4! ICMP يعمل في L3 فقط!',
          subtextHe: 'בפרוטוקול ICMP אין שימוש ב-TCP/UDP ואין פורטים!',
          subtextAr: 'في بروتوكول ICMP لا يوجد TCP/UDP ولا توجد منافذ!',
          iconName: 'ShieldAlert',
          isCorrect: true,
          explanationHe: 'מדהים! גאוני! ענית נכון על שאלת המכשול של רמה 2! ICMP פועל ישירות בתוך שכבת הרשת (3) ומדלג על שכבה 4 לחלוטין.',
          explanationAr: 'مذهل وعبقري! إجابة صحيحة على سؤال الخدعة! يعمل ICMP داخل طبقة الشبكة 3 مباشرة ويتخطى الطبقة 4 كلياً.',
          hintHe: 'עיין בטבלה: ICMP פועל בשכבה 3 ומדלג על שכבה 4!',
          hintAr: 'راجع الجدول: ICMP يعمل في الطبقة 3 ويتخطى الطبقة 4!',
          badgeLabelHe: '⚠️ דילוג: ICMP פועל ב-L3 בלבד!',
          badgeLabelAr: '⚠️ تخطي: يعمل في L3 فقط!',
        },
        {
          id: 'pdu_tcp_wrong_icmp',
          category: 'pdu_protocol',
          nameHe: 'פרוטוקול: TCP ומקטע Segment',
          nameAr: 'بروتوكول: TCP ومقطع Segment',
          subtextHe: 'חיבור אמין עם לחיצת יד',
          subtextAr: 'اتصال موثوق مع مصافحة',
          iconName: 'Boxes',
          isCorrect: false,
          explanationHe: 'שגיאה! ICMP אינו משתמש ב-TCP כלל! הוא מוטמע ישירות ב-IP.',
          explanationAr: 'خطأ! لا يستخدم ICMP بروتوكول TCP أبداً، هو مدمج في IP مباشرة.',
          hintHe: 'זכור: ICMP מדלג על שכבה 4!',
          hintAr: 'تذكر: ICMP يتخطى الطبقة 4!',
          badgeLabelHe: 'שגוי ב-ICMP',
          badgeLabelAr: 'خطأ في ICMP',
        }
      );
      addressList.push({
        id: 'no_port_icmp',
        category: 'address_port',
        nameHe: 'ללא מספר פורט (No Port - שדה Type/Code בלבד)',
        nameAr: 'دون رقم منفذ (حقل Type/Code فقط)',
        subtextHe: 'ל-ICMP אין מספרי פורט',
        subtextAr: 'لا يملك ICMP أرقام منافذ',
        iconName: 'Slash',
        isCorrect: true,
        explanationHe: 'נכון! ל-ICMP אין מושג של מספרי פורט (רק שדות Type ו-Code בתוך שכבה 3).',
        explanationAr: 'صحيح! ليس لـ ICMP مفهوم أرقام المنافذ بل حقول Type و Code بالطبقة 3.',
        hintHe: 'ב-ICMP אין פורטים.',
        hintAr: 'في ICMP لا توجد منافذ.',
        badgeLabelHe: 'פורט: ללא פורט (L3)',
        badgeLabelAr: 'المنفذ: دون منفذ (L3)',
      });
      actionList.push({
        id: 'pass_to_l3',
        category: 'process_action',
        nameHe: 'העברה ישירה לשכבת הרשת (שכבה 3)',
        nameAr: 'تمرير مباشر لطبقة الشبكة (الطبقة 3)',
        subtextHe: 'ללא יצירת חיבור תחבורתי',
        subtextAr: 'دون إنشاء اتصال نقل',
        iconName: 'ArrowDown',
        isCorrect: true,
        explanationHe: 'מדויק! החבילה עוברת ישירות לשכבה 3.',
        explanationAr: 'دقيق! تنتقل الحزمة مباشرة للطبقة 3.',
        hintHe: 'העברה ישירה ל-L3.',
        hintAr: 'تمرير مباشر لـ L3.',
        badgeLabelHe: 'מעבר: ישירות ל-L3',
        badgeLabelAr: 'انتقال: مباشر لـ L3',
      });
    } else {
      // Standard Scenarios L4
      const isTCP = scenario.protocolL4 === 'TCP';

      pduList.push(
        {
          id: 'pdu_tcp_segment',
          category: 'pdu_protocol',
          nameHe: 'PDU: מקטע (Segment) ב-TCP',
          nameAr: 'PDU: قطعة (Segment) في TCP',
          subtextHe: 'פרוטוקול TCP אמין עם אישור הגעה וסדר',
          subtextAr: 'بروتوكول TCP موثوق مع تأكيد وترتيب',
          iconName: 'Boxes',
          isCorrect: isTCP,
          explanationHe: isTCP
            ? 'נכון מאוד! פרוטוקול זה דורש אמינות 100% ולכן משתמש ב-TCP Segment.'
            : 'שגוי. תרחיש זה דורש מהירות וזמן אמת ולכן משתמש ב-UDP ולא ב-TCP.',
          explanationAr: isTCP
            ? 'صحيح جداً! هذا السيناريو يتطلب موثوقية 100% لذا يستخدم TCP Segment.'
            : 'غير صحيح. هذا السيناريو يتطلب سرعة ووقتاً حقيقياً لذا يستخدم UDP.',
          hintHe: 'בדוק האם השירות דורש אמינות (TCP) או מהירות/זמן אמת (UDP).',
          hintAr: 'تحقق هل الخدمة تتطلب موثوقية (TCP) أم سرعة (UDP).',
          badgeLabelHe: 'PDU: מקטע TCP',
          badgeLabelAr: 'PDU: مقطع TCP',
        },
        {
          id: 'pdu_udp_datagram',
          category: 'pdu_protocol',
          nameHe: 'PDU: חבילת נתונים (Datagram) ב-UDP',
          nameAr: 'PDU: حزمة بيانات (Datagram) في UDP',
          subtextHe: 'פרוטוקול UDP מהיר ללא Handshake וללא עיכובים',
          subtextAr: 'بروتوكול UDP سريع دون مصافحة ودون تأخير',
          iconName: 'Zap',
          isCorrect: !isTCP,
          explanationHe: !isTCP
            ? 'מדויק! תרחיש זה (DNS / DHCP / VoIP) דורש מהירות מרבית ופועל ב-UDP Datagram.'
            : 'שגוי. שירות זה דורש אמינות מושלמת של כל בית (TCP) ולא UDP.',
          explanationAr: !isTCP
            ? 'دقيق! هذا السيناريو (DNS / DHCP / VoIP) يتطلب أقصى سرعة ويعمل بـ UDP Datagram.'
            : 'غير صحيح. هذه الخدمة تتطلب موثوقية كاملة لكل بايت (TCP).',
          hintHe: 'DNS, DHCP ושיחות וידאו בזמן אמת עובדים ב-UDP.',
          hintAr: 'يعمل DNS و DHCP ومكالمات الفيديو الحية عبر UDP.',
          badgeLabelHe: 'PDU: Datagram ב-UDP',
          badgeLabelAr: 'PDU: Datagram بـ UDP',
        }
      );

      // Ports options
      addressList.push(
        {
          id: 'port_80_443',
          category: 'address_port',
          nameHe: 'פורט 80 (HTTP) או 443 (HTTPS)',
          nameAr: 'منفذ 80 (HTTP) أو 443 (HTTPS)',
          subtextHe: 'לגלישה בדפי אינטרנט',
          subtextAr: 'لتصفح صفحات الويب',
          iconName: 'Globe',
          isCorrect: scId === 'http_browser',
          explanationHe: 'נכון! דפדפנים פונים לפורט 80 או 443 המאובטח.',
          explanationAr: 'صحيح! المتصفحات تتوجه للمنفذ 80 أو 443 الآمن.',
          hintHe: 'פורט האתרים הוא 80 / 443.',
          hintAr: 'منفذ المواقع هو 80 / 443.',
          badgeLabelHe: 'פורט: 443 (HTTPS) / 80',
          badgeLabelAr: 'المنفذ: 443 / 80',
        },
        {
          id: 'port_53',
          category: 'address_port',
          nameHe: 'פורט 53 (DNS Query)',
          nameAr: 'منفذ 53 (استعلام DNS)',
          subtextHe: 'לשרתי תרגום שמות דומיין',
          subtextAr: 'لخوادم ترجمة النطاقات',
          iconName: 'Search',
          isCorrect: scId === 'dns_lookup',
          explanationHe: 'נכון! שרתי DNS מאזינים בפורט 53.',
          explanationAr: 'صحيح! خوادم DNS تستمع في المنفذ 53.',
          hintHe: 'עיין בטבלת הסיכום: פורט DNS הוא 53.',
          hintAr: 'راجع جدول المنافذ: منفذ DNS هو 53.',
          badgeLabelHe: 'פורט: 53 (DNS)',
          badgeLabelAr: 'المنفذ: 53 (DNS)',
        },
        {
          id: 'port_25_587',
          category: 'address_port',
          nameHe: 'פורט 25 או 587 (SMTP)',
          nameAr: 'منفذ 25 أو 587 (SMTP)',
          subtextHe: 'לשליחת מייל יוצא',
          subtextAr: 'لإرسال البريد الصادر',
          iconName: 'Send',
          isCorrect: scId === 'smtp_email',
          explanationHe: 'נכון! SMTP משתמש בפורט 25 או 587.',
          explanationAr: 'صحيح! يستخدم SMTP المنفذ 25 أو 587.',
          hintHe: 'פורט שליחת דואר הוא 25/587.',
          hintAr: 'منفذ إرسال البريد هو 25/587.',
          badgeLabelHe: 'פורט: 25 / 587 (SMTP)',
          badgeLabelAr: 'المنفذ: 25 / 587 (SMTP)',
        },
        {
          id: 'port_imap_pop3',
          category: 'address_port',
          nameHe: 'פורט IMAP 143/993 או POP3 110/995',
          nameAr: 'منفذ IMAP 143/993 أو POP3 110/995',
          subtextHe: 'למשיכת וסנכרון דואר',
          subtextAr: 'لجلب ومزامنة البريد',
          iconName: 'Inbox',
          isCorrect: scId === 'imap_pop3',
          explanationHe: 'מדויק! אלו הפורטים הייעודיים לקבלת דואר.',
          explanationAr: 'دقيق! هذه المنافذ المخصصة لاستقبال البريد.',
          hintHe: 'פורטי משיכת דואר הם 143/993 או 110/995.',
          hintAr: 'منافذ جلب البريد هي 143/993 أو 110/995.',
          badgeLabelHe: 'פורט: IMAP 143/993, POP3',
          badgeLabelAr: 'المنفذ: IMAP 143/993',
        },
        {
          id: 'port_ftp_20_21',
          category: 'address_port',
          nameHe: 'פורט 21 (בקרה) ופורט 20 (נתונים)',
          nameAr: 'منفذ 21 (تحكم) ومنفذ 20 (بيانات)',
          subtextHe: 'להורדת קובץ ב-FTP',
          subtextAr: 'لتنزيل الملفات بـ FTP',
          iconName: 'FolderDown',
          isCorrect: scId === 'ftp_download',
          explanationHe: 'נכון מאוד! FTP מפריד בין פורט 21 לפקודות לפורט 20 להעברת הקובץ.',
          explanationAr: 'صحيح جداً! يفصل FTP بين المنفذ 21 للأوامر والمنفذ 20 لنقل الملف.',
          hintHe: 'פורטי FTP הם 20 ו-21.',
          hintAr: 'منافذ FTP هي 20 و 21.',
          badgeLabelHe: 'פורט: 21 (בקרה) ו-20 (מידע)',
          badgeLabelAr: 'المنفذ: 21 و 20',
        },
        {
          id: 'port_dhcp_67_68',
          category: 'address_port',
          nameHe: 'פורט 67 (שרת) ופורט 68 (לקוח)',
          nameAr: 'منفذ 67 (خادم) ومنفذ 68 (عميل)',
          subtextHe: 'להודעות הגדרת רשת ב-DHCP',
          subtextAr: 'لرسائل إعداد الشبكة بـ DHCP',
          iconName: 'RadioTower',
          isCorrect: scId === 'dhcp_config',
          explanationHe: 'נכון! שרת ה-DHCP מאזין בפורט 67 והלקוח ב-68.',
          explanationAr: 'صحيح! يستمع خادم DHCP في المنفذ 67 والعميل في 68.',
          hintHe: 'פורטי DHCP הם 67 ו-68.',
          hintAr: 'منافذ DHCP هي 67 و 68.',
          badgeLabelHe: 'פורט: 67 (שרת) / 68 (לקוח)',
          badgeLabelAr: 'المنفذ: 67 / 68',
        },
        {
          id: 'port_ssh_22_23',
          category: 'address_port',
          nameHe: 'פורט 22 (SSH מאובטח) או 23 (Telnet)',
          nameAr: 'منفذ 22 (SSH آمن) أو 23 (Telnet)',
          subtextHe: 'למסוף פקודות מרוחק',
          subtextAr: 'لطرفية الأوامر عن بعد',
          iconName: 'Terminal',
          isCorrect: scId === 'ssh_telnet',
          explanationHe: 'נכון! פורט 22 משמש ל-SSH.',
          explanationAr: 'صحيح! المنفذ 22 مخصص لـ SSH.',
          hintHe: 'פורט SSH הוא 22.',
          hintAr: 'منفذ SSH هو 22.',
          badgeLabelHe: 'פורט: 22 (SSH)',
          badgeLabelAr: 'المنفذ: 22 (SSH)',
        },
        {
          id: 'port_voip_dynamic',
          category: 'address_port',
          nameHe: 'פורט UDP דינמי / 5060 (RTP/VoIP)',
          nameAr: 'منفذ UDP ديناميكي (RTP/VoIP)',
          subtextHe: 'להזרמת מדיה רציפה בזמן אמת',
          subtextAr: 'لبث الوسائط المستمر بالوقت الفعلي',
          iconName: 'Video',
          isCorrect: scId === 'voip_rtp',
          explanationHe: 'נכון! שיחות וידאו מקצות פורט UDP מהיר להזרמה.',
          explanationAr: 'صحيح! تخصص مكالمات الفيديو منفذ UDP سريع للبث.',
          hintHe: 'פורט מדיה בזמן אמת ב-UDP.',
          hintAr: 'منفذ وسائط بالوقت الفعلي في UDP.',
          badgeLabelHe: 'פורט: UDP מדיה דינמי',
          badgeLabelAr: 'المنفذ: UDP وسائط',
        }
      );

      // Actions / Rules
      actionList.push(
        {
          id: 'act_seq_retransmit',
          category: 'process_action',
          nameHe: isSender
            ? 'חלוקה למקטעים והצמדת מספרי סדר (Seq Numbers)'
            : 'הרכבת המקטעים לפי Seq ובקשת Retransmit אם חסר',
          nameAr: isSender
            ? 'تقسيم إلى مقاطع وإرفاق أرقام تسلسل (Seq)'
            : 'تجميع المقاطع حسب Seq وطلب إعادة الإرسال عند النقص',
          subtextHe: 'מנגנון אמינות מלא של TCP',
          subtextAr: 'آلية موثوقية كاملة في TCP',
          iconName: 'ListOrdered',
          isCorrect: isTCP,
          explanationHe: isTCP
            ? 'מעולה! TCP מחלק למקטעים, ממספר ב-Seq ודורש שידור חוזר במקרה של אובדן.'
            : 'בפרוטוקול זה (UDP) אין מספרי Seq ואין שידורים חוזרים!',
          explanationAr: isTCP
            ? 'ممتاز! يقسم TCP لمقاطع مع أرقام Seq ويطلب إعادة الإرسال عند الفقدان.'
            : 'في UDP لا توجد أرقام تسلسل ولا إعادة إرسال!',
          hintHe: 'TCP משתמש במספרי Seq לאמינות.',
          hintAr: 'يستخدم TCP أرقام Seq للموثوقية.',
          badgeLabelHe: isSender ? 'תהליך: חלוקה ומספור Seq' : 'תהליך: הרכבת Seq ובדיקת חוסרים',
          badgeLabelAr: 'تسلسل: أرقام Seq وتحقق',
        },
        {
          id: 'act_voip_rule',
          category: 'process_action',
          nameHe: '⚠️ חוק מיוחד ב-VoIP: אין Retransmission אם חבילה נאבדת!',
          nameAr: '⚠️ قاعدة خاصة في VoIP: لا يوجد Retransmission عند الفقدان!',
          subtextHe: 'עדיף גליץ׳ קטן מאשר לקפוא ולהמתין בשיחה חיה',
          subtextAr: 'نفضل تشويشاً بسيطاً على تجميد المكالمة الحية',
          iconName: 'FastForward',
          isCorrect: scId === 'voip_rtp',
          explanationHe: 'מצוין! בשיחות וידאו בזמן אמת, חבילה שנאבדה אינה נשלחת שוב כדי לשמור על שידור רציף ללא עיכוב.',
          explanationAr: 'ممتاز! في مكالمات الفيديو الحية لا يطلب إعادة الإرسال للحفاظ على استمرار البث.',
          hintHe: 'חוק רמה 2 בווידאו: אין שידור חוזר!',
          hintAr: 'قاعدة المستوى 2 في الفيديو: لا إعادة إرسال!',
          badgeLabelHe: 'חוק: אין Retransmit ב-VoIP!',
          badgeLabelAr: 'قاعدة: لا Retransmit في VoIP!',
        }
      );
    }
  }

  // ==================== LAYER 3 (Network) ====================
  else if (layer === 3) {
    pduList.push(
      {
        id: 'pdu_ip_packet',
        category: 'pdu_protocol',
        nameHe: 'יחידת נתונים: חבילה (Packet)',
        nameAr: 'وحدة البيانات: حزمة (Packet)',
        subtextHe: 'יחידת ה-PDU המרכזית של שכבת הרשת',
        subtextAr: 'وحدة PDU المركزية لطبقة الشبكة',
        iconName: 'Package',
        isCorrect: true,
        explanationHe: 'נכון מאוד! יחידת הנתונים בשכבה 3 נקראת תמיד חבילה (Packet).',
        explanationAr: 'صحيح جداً! تسمى وحدة البيانات في الطبقة 3 دائماً حزمة (Packet).',
        hintHe: 'בשכבה 3 היחידה היא Packet (חבילה).',
        hintAr: 'في الطبقة 3 الوحدة هي Packet (حزمة).',
        badgeLabelHe: 'PDU: חבילה (Packet)',
        badgeLabelAr: 'PDU: حزمة (Packet)',
      }
    );

    addressList.push(
      {
        id: 'ip_src_dst_unicast',
        category: 'address_port',
        nameHe: 'כתובת IP מקור ו-IP יעד (למשל: 192.168.1.10 ➔ 142.250.185.78)',
        nameAr: 'عنوان IP المصدر و IP الوجهة (Unicast)',
        subtextHe: 'כתובות לוגיות לניתוב עולמי ברשת',
        subtextAr: 'عناوين منطقية للتوجيه عبر الشبكة',
        iconName: 'Network',
        isCorrect: scId !== 'dhcp_config',
        explanationHe: 'נכון! חבילת IP מכילה כתובת מקור וכתובת יעד לצורך ניתוב על ידי נתבים.',
        explanationAr: 'صحيح! تحتوي حزمة IP على عنوان المصدر والوجهة للتوجيه بواسطة الموجهات.',
        hintHe: 'שכבה 3 מוסיפה כתובות IP מקור ויעד.',
        hintAr: 'تضيف الطبقة 3 عناوين IP المصدر والهدف.',
        badgeLabelHe: 'כתובות: IP מקור ויעד',
        badgeLabelAr: 'عناوين: IP المصدر والهدف',
      },
      {
        id: 'ip_broadcast_dhcp',
        category: 'address_port',
        nameHe: 'IP מיוחד ב-DHCP: מקור 0.0.0.0, יעד 255.255.255.255 (Broadcast)',
        nameAr: 'IP خاص في DHCP: المصدر 0.0.0.0، الوجهة 255.255.255.255',
        subtextHe: 'שידור לכל הרשת כי למכשיר אין עדיין כתובת',
        subtextAr: 'بث عام للجميع لأن الجهاز لا يملك عنواناً بعد',
        iconName: 'Radio',
        isCorrect: scId === 'dhcp_config',
        explanationHe: 'כל הכבוד! למכשיר חדש אין עדיין IP ולכן מקורו 0.0.0.0 ויעדו 255.255.255.255.',
        explanationAr: 'أحسنت! جهاز جديد بدون IP يكون مصدره 0.0.0.0 ووجهته 255.255.255.255.',
        hintHe: 'ב-DHCP הכתובת היא Broadcast (255.255.255.255).',
        hintAr: 'في DHCP العنوان هو بث عام 255.255.255.255.',
        badgeLabelHe: 'IP: שידור 255.255.255.255 (Broadcast)',
        badgeLabelAr: 'IP: بث 255.255.255.255',
      }
    );

    actionList.push(
      {
        id: 'act_routing_ip',
        category: 'process_action',
        nameHe: isSender
          ? 'הוספת כותרת ה-IP וקביעת מסלול ניתוב (Routing)'
          : 'אימות כתובת IP היעד והסרת כותרת ה-IP (העברה ל-L4)',
        nameAr: isSender
          ? 'إضافة ترويسة IP وتحديد مسار التوجيه'
          : 'التحقق من IP الهدف وإزالة ترويسة IP (تمرير لـ L4)',
        subtextHe: 'עבודה מול נתבים (Routers)',
        subtextAr: 'التعامل مع الموجهات (Routers)',
        iconName: 'Compass',
        isCorrect: true,
        explanationHe: 'מדויק! שכבה 3 אחראית על ניתוב חבילות לפי כתובות IP.',
        explanationAr: 'دقيق! الطبقة 3 مسؤولة عن توجيه الحزم حسب عناوين IP.',
        hintHe: 'שכבה 3 אחראית על ניתוב (Routing).',
        hintAr: 'الطبقة 3 مسؤولة عن التوجيه.',
        badgeLabelHe: isSender ? 'ניתוב: הוספת כותרת IP' : 'ניתוב: אימות והסרת כותרת IP',
        badgeLabelAr: 'توجيه: معالجة ترويسة IP',
      }
    );
  }

  // ==================== LAYER 2 (Data Link) ====================
  else if (layer === 2) {
    pduList.push(
      {
        id: 'pdu_frame',
        category: 'pdu_protocol',
        nameHe: 'PDU: מסגרת (Frame)',
        nameAr: 'PDU: إطار (Frame)',
        subtextHe: 'יחידת הנתונים של שכבת ערוץ הנתונים',
        subtextAr: 'وحدة البيانات لطبقة ربط البيانات',
        iconName: 'Cpu',
        isCorrect: true,
        explanationHe: 'נכון מאוד! בשכבה 2 החבילה נעטפת ב-Frame (מסגרת).',
        explanationAr: 'صحيح جداً! في الطبقة 2 تغلف الحزمة بإطار (Frame).',
        hintHe: 'יחידת ה-PDU בשכבה 2 היא Frame.',
        hintAr: 'وحدة PDU في الطبقة 2 هي Frame.',
        badgeLabelHe: 'PDU: מסגרת (Frame)',
        badgeLabelAr: 'PDU: إطار (Frame)',
      }
    );

    addressList.push(
      {
        id: 'mac_addresses_standard',
        category: 'address_port',
        nameHe: scId === 'dhcp_config'
          ? 'MAC יעד ל-Broadcast: FF:FF:FF:FF:FF:FF'
          : 'כתובת MAC מקור ו-MAC יעד (מתג/נתב ברירת מחדל)',
        nameAr: scId === 'dhcp_config'
          ? 'MAC الوجهة للبث: FF:FF:FF:FF:FF:FF'
          : 'عنوان MAC المصدر و MAC الوجهة',
        subtextHe: 'כתובת פיזית חומרתית של כרטיס הרשת (NIC)',
        subtextAr: 'عنوان فيزيائي عتادي لبطاقة الشبكة',
        iconName: 'Hash',
        isCorrect: true,
        explanationHe: 'מדויק! שכבה 2 משתמשת בכתובות MAC חומרתיות.',
        explanationAr: 'دقيق! تستخدم الطبقة 2 عناوين MAC العتادية.',
        hintHe: 'שכבה 2 פועלת עם כתובות MAC.',
        hintAr: 'الطبقة 2 تعمل بعناوين MAC.',
        badgeLabelHe: scId === 'dhcp_config' ? 'MAC: Broadcast (FF:FF:..)' : 'MAC: מקור ויעד חומרתי',
        badgeLabelAr: 'MAC: عنوان عتادي',
      }
    );

    actionList.push(
      {
        id: 'act_crc_fcs',
        category: 'process_action',
        nameHe: isSender
          ? 'חישוב קוד בדיקת שגיאות CRC / FCS והוספתו בסוף ה-Frame'
          : 'בדיקת תקינות CRC לשלילת שגיאות ביט (והשלכת פגום)',
        nameAr: isSender
          ? 'حساب رمز فحص الأخطاء CRC وإضافته في ذيل الإطار'
          : 'فحص سلامة CRC لنفي أخطاء البتات (وإهمال التالف)',
        subtextHe: 'מנגנון בקרת שגיאות חומרתי',
        subtextAr: 'آلية التحكم في الأخطاء العتادية',
        iconName: 'ShieldCheck',
        isCorrect: true,
        explanationHe: 'מצוין! סוגר ה-CRC מוודא שאף ביט לא השתבש במהלך השידור.',
        explanationAr: 'ممتاز! ذيل CRC يضمن عدم تشوه أي بت أثناء الإرسال.',
        hintHe: 'שכבה 2 מחשבת או בודקת קוד CRC.',
        hintAr: 'الطبقة 2 تحسب أو تفحص رمز CRC.',
        badgeLabelHe: isSender ? 'שלמות: חישוב קוד CRC' : 'שלמות: אימות תקינות CRC',
        badgeLabelAr: 'سلامة: فحص CRC',
      }
    );
  }

  // ==================== LAYER 1 (Physical) ====================
  else if (layer === 1) {
    pduList.push(
      {
        id: 'pdu_bits',
        category: 'pdu_protocol',
        nameHe: 'PDU: ביטים (Bits - 0 ו-1)',
        nameAr: 'PDU: بتات (Bits - 0 و 1)',
        subtextHe: 'היחידה הבסיסית ביותר במחשבים',
        subtextAr: 'الوحدة الأساسية الأبسط في الحواسيب',
        iconName: 'Binary',
        isCorrect: true,
        explanationHe: 'מדויק! בשכבה הפיזית הנתונים מיוצגים אך ורק כרצף ביטים (0/1).',
        explanationAr: 'دقيق! في الطبقة المادية تمثل البيانات كتيار بتات فقط (0/1).',
        hintHe: 'בשכבה 1 היחידה היא ביטים (Bits).',
        hintAr: 'في الطبقة 1 الوحدة هي Bits.',
        badgeLabelHe: 'PDU: ביטים (0101)',
        badgeLabelAr: 'PDU: بتات (0101)',
      }
    );

    addressList.push(
      {
        id: 'media_signals',
        category: 'address_port',
        nameHe: 'אותות פיזיים: פולסי אור / מתח חשמלי / גלי רדיו',
        nameAr: 'إشارات فيزيائية: نبضات ضوئية / جهد كهربائي / موجات',
        subtextHe: 'בתווך השידור שנבחר (סיב, נחושת, אלחוט)',
        subtextAr: 'في وسط النقل المختار (ألياف، نحاس، لاسلكي)',
        iconName: 'Zap',
        isCorrect: true,
        explanationHe: 'נכון! השכבה הפיזית מעבירה פולסים ואותות דרך התווך הפיזי.',
        explanationAr: 'صحيح! تنقل الطبقة المادية نبضات وإشارات عبر الوسط الفيزيائي.',
        hintHe: 'שכבה 1 מעבירה אותות ופולסים.',
        hintAr: 'الطبقة 1 تنقل إشارات ونبضات.',
        badgeLabelHe: 'תווך: אותות ופולסים',
        badgeLabelAr: 'وسط: إشارات ونبضات',
      }
    );

    actionList.push(
      {
        id: 'act_modulation_bits',
        category: 'process_action',
        nameHe: isSender
          ? 'אפנון והמרה לאותות פיזיים ושידור בקו'
          : 'קליטת האותות ודגימתם חזרה לרצף ביטים (0 ו-1)',
        nameAr: isSender
          ? 'تعديل الإشارات وتحويلها لنبضات فيزيائية وبثها'
          : 'استقبال الإشارات وعينات البتات الثنائية (0 و 1)',
        subtextHe: 'פעולת מקלט/משדר (Transceiver)',
        subtextAr: 'عملية جهاز الاستقبال والإرسال',
        iconName: 'Radio',
        isCorrect: true,
        explanationHe: 'מעולה! השכבה הפיזית מקודדת את הביטים לאותות ומשדרת/קולטת אותם.',
        explanationAr: 'ممتاز! تقوم الطبقة المادية بترميز البتات لإشارات وبثها أو التقاطها.',
        hintHe: 'שכבה 1 ממירה בין ביטים לאותות בקו.',
        hintAr: 'الطبقة 1 تحول بين البتات والإشارات في الخط.',
        badgeLabelHe: isSender ? 'שידור: המרה לאותות' : 'קליטה: המרה חזרה לביטים',
        badgeLabelAr: 'بث/استقبال: معالجة الإشارات',
      }
    );
  }

  return {
    pduAndProtocol: pduList,
    addressAndPorts: addressList,
    processAndActions: actionList,
  };
}

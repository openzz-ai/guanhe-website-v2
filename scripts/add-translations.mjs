#!/usr/bin/env node
/**
 * 向 voerkai18n 语言包批量注入新词条。
 * 用法：node scripts/add-translations.mjs
 * 翻译数据内嵌在下方 TRANSLATIONS 数组：
 *   - mode: 'all'  七语种全部提供翻译（UI 元素）
 *   - mode: 'en'   仅提供英文，非中文语言统一填英文（长正文，外贸惯例）
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const LANG_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'languages')

const TRANSLATIONS = [
  // ---------- 导航与通用 ----------
  { mode: 'all', key: '产品中心', cht: '產品中心', en: 'Products', jp: '製品センター', de: 'Produkte', ara: 'المنتجات', kor: '제품' },
  { mode: 'all', key: '语言', cht: '語言', en: 'Language', jp: '言語', de: 'Sprache', ara: 'اللغة', kor: '언어' },
  { mode: 'all', key: '快捷导航', cht: '快捷導航', en: 'Quick Links', jp: 'クイックナビ', de: 'Schnellzugriff', ara: 'روابط سريعة', kor: '빠른 링크' },
  { mode: 'all', key: '联系方式', cht: '聯繫方式', en: 'Contact', jp: '連絡先', de: 'Kontakt', ara: 'معلومات الاتصال', kor: '연락처' },
  { mode: 'all', key: '查看详情', cht: '查看詳情', en: 'View Details', jp: '詳細を見る', de: 'Details', ara: 'التفاصيل', kor: '자세히 보기' },
  { mode: 'all', key: '了解更多', cht: '瞭解更多', en: 'Learn More', jp: '詳しくはこちら', de: 'Mehr erfahren', ara: 'اعرف المزيد', kor: '더 보기' },

  // ---------- 首页 ----------
  { mode: 'all', key: '高端品质铸就安全', cht: '高端品質鑄就安全', en: 'High-end Quality Ensures Safety', jp: '高品質が安全を実現', de: 'Hochwertige Qualität schafft Sicherheit', ara: 'جودة عالية تضمن الأمان', kor: '프리미엄 품질이 안전을 만듭니다' },
  { mode: 'all', key: '三十年管道及配件出口经验 · 产品远销全球 30 多个国家和地区', cht: '三十年管道及配件出口經驗 · 產品遠銷全球 30 多個國家和地區', en: '30+ years of pipe & fitting export experience · Sold to 30+ countries and regions', jp: '30年以上の配管・継手輸出実績 · 世界30以上の国・地域へ販売', de: 'Über 30 Jahre Exporterfahrung · Vertrieb in über 30 Länder', ara: 'أكثر من 30 عامًا من خبرة التصدير · مبيعات في أكثر من 30 دولة ومنطقة', kor: '30년 이상 배관·부속 수출 경험 · 30개국 이상 판매' },
  { mode: 'all', key: '浏览产品', cht: '瀏覽產品', en: 'Browse Products', jp: '製品を見る', de: 'Produkte ansehen', ara: 'تصفح المنتجات', kor: '제품 보기' },
  { mode: 'all', key: '始建于', cht: '始建於', en: 'Founded in', jp: '設立', de: 'Gegründet', ara: 'تأسست عام', kor: '설립' },
  { mode: 'all', key: '年出口贸易经验', cht: '年出口貿易經驗', en: 'Years of Export Experience', jp: '年の輸出経験', de: 'Jahre Exporterfahrung', ara: 'سنة خبرة في التصدير', kor: '년 수출 경험' },
  { mode: 'all', key: '家管路配件供应商', cht: '家管路配件供應商', en: 'Pipe Fitting Suppliers', jp: '社の配管部品サプライヤー', de: 'Rohrleitungs-Zulieferer', ara: 'مورد قطع الأنابيب', kor: '배관 부품 공급사' },
  { mode: 'all', key: '个国家和地区', cht: '個國家和地區', en: 'Countries & Regions', jp: 'の国・地域', de: 'Länder und Regionen', ara: 'دولة ومنطقة', kor: '개 국가 및 지역' },
  { mode: 'all', key: '需要产品报价或技术支持？', cht: '需要產品報價或技術支持？', en: 'Need a Quotation or Technical Support?', jp: '見積りや技術サポートが必要ですか？', de: 'Angebot oder technische Unterstützung benötigt?', ara: 'هل تحتاج إلى عرض سعر أو دعم فني؟', kor: '견적이나 기술 지원이 필요하신가요?' },
  { mode: 'all', key: '欢迎留下您的需求，我们将尽快与您联系', cht: '歡迎留下您的需求，我們將盡快與您聯繫', en: 'Leave your requirements and we will contact you as soon as possible', jp: 'ご要望をお残しください。早急にご連絡いたします', de: 'Hinterlassen Sie Ihre Anfrage — wir melden uns schnellstmöglich', ara: 'اترك طلبك وسنتواصل معك في أقرب وقت', kor: '요구사항을 남겨주시면 빠르게 연락드리겠습니다' },
  { mode: 'all', key: '立即咨询', cht: '立即諮詢', en: 'Inquire Now', jp: '今すぐ問い合わせ', de: 'Jetzt anfragen', ara: 'استفسر الآن', kor: '지금 문의하기' },
  { mode: 'all', key: '钢管、管件、法兰专业出口商，执行 ASME / ANSI / API / DIN / EN / JIS 等国际标准', cht: '鋼管、管件、法蘭專業出口商，執行 ASME / ANSI / API / DIN / EN / JIS 等國際標準', en: 'Professional exporter of steel pipes, fittings and flanges to ASME / ANSI / API / DIN / EN / JIS standards', jp: '鋼管・継手・フランジの専門輸出業者、ASME / ANSI / API / DIN / EN / JIS 等国際規格に準拠', de: 'Professioneller Exporteur von Rohren, Formstücken und Flanschen nach ASME / ANSI / API / DIN / EN / JIS', ara: 'مصدر محترف للأنابيب والوصلات والفلنجات وفق معايير ASME / ANSI / API / DIN / EN / JIS', kor: 'ASME / ANSI / API / DIN / EN / JIS 국제 표준의 강관·관부속·플랜지 전문 수출업체' },
  { mode: 'en', key: '大连管和件管道有限公司前身为新易欧国际贸易有限公司，始建于1993年，坐落于东北三省最大的港口城市——辽宁大连。基于大连得天独厚的优越地理条件与东北三省雄厚的工业基础，公司经过三十余年的经营，不断发展壮大。', en: 'Dalian Pipe & Fitting Engineering Co., Ltd., formerly Xinyi\'ou International Trade Co., Ltd., was founded in 1993 in Dalian, Liaoning — the largest port city in Northeast China. Leveraging Dalian\'s geographic advantages and the strong industrial base of the three northeastern provinces, the company has grown steadily over 30+ years.' },
  { mode: 'en', key: '从管路配件出口起步，逐步发展为集钢管、管件、法兰于一体的综合出口企业，与国内外几十家大型钢厂及 40 多家配件供应商建立了稳定合作关系。', en: 'Starting from pipe fittings export, we have grown into a comprehensive exporter of steel pipes, fittings and flanges, with stable partnerships with dozens of major steel mills and 40+ fitting suppliers.' },

  // ---------- 产品页 ----------
  { mode: 'all', key: '钢管产品', cht: '鋼管產品', en: 'Steel Pipes', jp: '鋼管製品', de: 'Stahlrohre', ara: 'أنابيب الصلب', kor: '강관 제품' },
  { mode: 'all', key: '管件产品', cht: '管件產品', en: 'Pipe Fittings', jp: '管継手製品', de: 'Rohrformstücke', ara: 'وصلات الأنابيب', kor: '관 부속 제품' },
  { mode: 'all', key: '法兰产品', cht: '法蘭產品', en: 'Flanges', jp: 'フランジ製品', de: 'Flansche', ara: 'الفلنجات', kor: '플랜지 제품' },
  { mode: 'all', key: '结构管/输送流体管/低中压锅炉管/高压锅炉管/石油裂化管/化肥设备用管/船用管/油套管', cht: '結構管/輸送流體管/低中壓鍋爐管/高壓鍋爐管/石油裂化管/化肥設備用管/船用管/油套管', en: 'Structural / fluid conveyance / low & medium pressure boiler / high pressure boiler / cracking / fertilizer / marine pipes, oil casing & tubing', jp: '構造用/圧力配管/低中圧ボイラー管/高圧ボイラー管/石油精製管/化学工業用管/船用管/ケーシング・チュービング', de: 'Struktur-/Fluidleitungs-/Kesselrohre, Ölfeld-Rohre, Meerwasserrohre', ara: 'أنابيب إنشائية / نقل السوائل / مراجل الضغط المنخفض والمتوسط والمرتفع / التكسير / الأسمدة / البحرية / الأنابيب المبطنة', kor: '구조용/유체수송/저중압 보일러/고압 보일러/원유 정제/비료설비/선박용 관, 오일 케이싱·튜빙' },
  { mode: 'all', key: '碳钢管件/不锈钢管件/合金管件：弯头、三通、四通、异径管、管帽等', cht: '碳鋼管件/不鏽鋼管件/合金管件：彎頭、三通、四通、異徑管、管帽等', en: 'Carbon steel / stainless / alloy fittings: elbows, tees, crosses, reducers, caps, etc.', jp: '炭素鋼・ステンレス・合金鋼継手：エルボ、ティー、クロス、レデューサー、キャップなど', de: 'Fitting aus Carbon-/Edelstahl/Legierungsstahl: Bögen, T-Stücke, Reduzierungen, Kappen', ara: 'وصلات من الصلب الكربوني/غير القابل للصدأ/السبيكة: أكواع، ثلاثيات، مخفضات، أغطية', kor: '탄소강/스테인리스/합금 관부속: 엘보, 티, 크로스, 리듀서, 캡 등' },
  { mode: 'all', key: '碳钢/不锈钢法兰，覆盖 ANSI、API、MSS、DIN、UNI、KS、JIS 等标准', cht: '碳鋼/不鏽鋼法蘭，覆蓋 ANSI、API、MSS、DIN、UNI、KS、JIS 等標準', en: 'Carbon & stainless steel flanges covering ANSI, API, MSS, DIN, UNI, KS, JIS standards', jp: '炭素鋼・ステンレスフランジ、ANSI、API、MSS、DIN、UNI、KS、JIS 等規格対応', de: 'Carbon- und Edelstahlflansche nach ANSI, API, MSS, DIN, UNI, KS, JIS', ara: 'فلنجات من الصلب الكربوني وغير القابل للصدأ تغطي معايير ANSI وAPI وMSS وDIN وUNI وKS وJIS', kor: '탄소강/스테인리스 플랜지, ANSI·API·MSS·DIN·UNI·KS·JIS 표준 지원' },
  { mode: 'all', key: '执行标准', cht: '執行標準', en: 'Standards', jp: '執行規格', de: 'Normen', ara: 'المعايير', kor: '표준' },
  { mode: 'all', key: '搜索规格表：如 B16.9、A53、壁厚、弯头、150# …', cht: '搜索規格表：如 B16.9、A53、壁厚、彎頭、150# …', en: 'Search spec sheets: e.g. B16.9, A53, wall thickness, elbow, 150#…', jp: '規格表を検索：B16.9、A53、肉厚、エルボ、150# など', de: 'Datenblätter suchen: z.B. B16.9, A53, Wanddicke, Bogen, 150#…', ara: 'ابحث في جداول المواصفات: مثل B16.9، A53، سماكة الجدار، كوع، 150#', kor: '규격표 검색: 예. B16.9, A53, 두께, 엘보, 150#' },
  { mode: 'all', key: '未找到匹配的规格表，请尝试其他关键词', cht: '未找到匹配的規格表，請嘗試其他關鍵詞', en: 'No matching spec sheets found, please try other keywords', jp: '一致する規格表が見つかりません。他のキーワードをお試しください', de: 'Keine passenden Datenblätter gefunden, bitte andere Schlüsselwörter versuchen', ara: 'لم يتم العثور على جداول مواصفات مطابقة، جرّب كلمات مفتاحية أخرى', kor: '일치하는 규격표가 없습니다. 다른 키워드를 시도해 주세요' },
  { mode: 'all', key: '产品实物', cht: '產品實物', en: 'Product Photos', jp: '製品写真', de: 'Produktfotos', ara: 'صور المنتجات', kor: '제품 사진' },

  // ---------- 关于页 ----------
  { mode: 'all', key: '三十年专注管道产品出口，与全球客户共创双赢', cht: '三十年專注管道產品出口，與全球客戶共創雙贏', en: '30 years focused on pipe product export, creating win-win with global customers', jp: '30年にわたり配管製品の輸出に専念し、世界中のお客様とウィンウィンを創造', de: '30 Jahre fokussiert auf Rohrexport — Win-win mit Kunden weltweit', ara: '30 عامًا من التركيز على تصدير منتجات الأنابيب، وخلق المكاسب المتبادلة مع العملاء حول العالم', kor: '30년간 배관 제품 수출에 집중, 전 세계 고객과 상생 실현' },
  { mode: 'all', key: '公司概况', cht: '公司概況', en: 'Overview', jp: '会社概要', de: 'Überblick', ara: 'نظرة عامة', kor: '회사 개요' },
  { mode: 'all', key: '经营转型', cht: '經營轉型', en: 'Transformation', jp: '事業転換', de: 'Transformation', ara: 'التحول', kor: '사업 전환' },
  { mode: 'all', key: '供货体系', cht: '供貨體系', en: 'Supply Chain', jp: 'サプライ体制', de: 'Lieferkette', ara: 'سلسلة التوريد', kor: '공급 체계' },
  { mode: 'all', key: '市场与理念', cht: '市場與理念', en: 'Markets & Philosophy', jp: '市場と理念', de: 'Märkte & Philosophie', ara: 'الأسواق والفلسفة', kor: '시장과 이념' },
  { mode: 'all', key: '合作钢厂', cht: '合作鋼廠', en: 'Partner Steel Mills', jp: '提携製鉄所', de: 'Partner-Stahlwerke', ara: 'مصانع الصلب الشريكة', kor: '협력 제철소' },
  { mode: 'all', key: '出口市场', cht: '出口市場', en: 'Export Markets', jp: '輸出市場', de: 'Exportmärkte', ara: 'أسواق التصدير', kor: '수출 시장' },
  { mode: 'all', key: '经营理念', cht: '經營理念', en: 'Our Philosophy', jp: '経営理念', de: 'Unsere Philosophie', ara: 'فلسفتنا', kor: '경영 이념' },
  { mode: 'all', key: '信誉第一', cht: '信譽第一', en: 'Reputation First', jp: '信頼第一', de: 'Reputation zuerst', ara: 'السمعة أولاً', kor: '신뢰 우선' },
  { mode: 'all', key: '以质量求生存', cht: '以質量求生存', en: 'Surviving on Quality', jp: '品質で生存', de: 'Qualität als Grundlage', ara: 'البقاء بالجودة', kor: '품질로 생존' },
  { mode: 'all', key: '以信誉得发展', cht: '以信譽得發展', en: 'Growing on Trust', jp: '信頼で発展', de: 'Wachstum durch Vertrauen', ara: 'التطور بالثقة', kor: '신뢰로 발전' },
  { mode: 'all', key: '客户至上，与供应商和客户建立长期稳定的合作关系', cht: '客戶至上，與供應商和客戶建立長期穩定的合作關係', en: 'Customer foremost — building long-term stable partnerships with suppliers and customers', jp: '顧客第一 — サプライヤーとお客様と長期安定な協力関係を構築', de: 'Kunden zuerst — langfristige stabile Partnerschaften', ara: 'العميل أولاً — شراكات طويلة الأمد ومستقرة', kor: '고객 최우선 — 공급자·고객과 장기 안정적 파트너십' },
  { mode: 'all', key: '严格执行国际标准，确保每一批产品满足客户要求', cht: '嚴格執行國際標準，確保每一批產品滿足客戶要求', en: 'Strictly following international standards to ensure every batch meets customer requirements', jp: '国際規格を厳格に実行し、全ロットが顧客要件を満たすことを確保', de: 'Strikte Einhaltung internationaler Normen für jede Charge', ara: 'تنفيذ صارم للمعايير الدولية لضمان مطابقة كل دفعة', kor: '국제 표준을 엄격히 적용해 모든 배치가 고객 요구 충족' },
  { mode: 'all', key: '诚信为本，愿与广大客户一起开创双赢局面，共创美好未来', cht: '誠信為本，願與廣大客戶一起開創雙贏局面，共創美好未來', en: 'Integrity-based — creating win-win results and a brighter future with customers worldwide', jp: '誠信を基本に、多くのお客様とウィンウィンと明るい未来を共に', de: 'Auf Integrität basierend — gemeinsame Win-win-Zukunft', ara: 'النزاهة أساساً — مستقبل مربح للجميع مع عملائنا', kor: '성실을 바탕으로 고객과 함께 상생의 미래 창조' },

  // ---------- 联系页 ----------
  { mode: 'all', key: '公司地址', cht: '公司地址', en: 'Address', jp: '住所', de: 'Adresse', ara: 'العنوان', kor: '주소' },
  { mode: 'all', key: '电话', cht: '電話', en: 'Phone', jp: '電話', de: 'Telefon', ara: 'هاتف', kor: '전화' },
  { mode: 'all', key: '手机', cht: '手機', en: 'Mobile', jp: '携帯', de: 'Mobil', ara: 'جوال', kor: '휴대폰' },
  { mode: 'all', key: '传真', cht: '傳真', en: 'Fax', jp: 'FAX', de: 'Fax', ara: 'فاكس', kor: '팩스' },
  { mode: 'all', key: '在线留言', cht: '在線留言', en: 'Online Message', jp: 'オンラインメッセージ', de: 'Online-Nachricht', ara: 'رسالة عبر الإنترنت', kor: '온라인 문의' },
  { mode: 'all', key: '请填写以下信息，提交后我们将尽快回复您', cht: '請填寫以下信息，提交後我們將盡快回復您', en: 'Fill in the form below and we will reply as soon as possible', jp: '以下の情報をご記入ください。送信後すぐにご返信いたします', de: 'Bitte ausfüllen — wir antworten schnellstmöglich', ara: 'يرجى ملء النموذج التالي وسنرد عليك في أقرب وقت', kor: '아래 정보를 입력해 주시면 빠르게 회신드리겠습니다' },
  { mode: 'all', key: '提交留言', cht: '提交留言', en: 'Submit Message', jp: 'メッセージを送信', de: 'Nachricht senden', ara: 'إرسال الرسالة', kor: '문의 보내기' },
  { mode: 'all', key: '留言已提交，我们会尽快与您联系', cht: '留言已提交，我們會盡快與您聯繫', en: 'Message submitted — we will contact you soon', jp: 'メッセージが送信されました。すぐにご連絡いたします', de: 'Nachricht gesendet — wir melden uns in Kürze', ara: 'تم إرسال الرسالة — سنتواصل معك قريبًا', kor: '문의가 접수되었습니다. 곧 연락드리겠습니다' },
  { mode: 'all', key: '留言失败，请您再次重试', cht: '留言失敗，請您再次重試', en: 'Submission failed, please try again', jp: '送信に失敗しました。もう一度お試しください', de: 'Senden fehlgeschlagen, bitte erneut versuchen', ara: 'فشل الإرسال، يرجى المحاولة مرة أخرى', kor: '전송 실패, 다시 시도해 주세요' },
  { mode: 'all', key: '请填写您的称呼', cht: '請填寫您的稱呼', en: 'Please enter your name', jp: 'お名前を入力してください', de: 'Bitte Namen eingeben', ara: 'يرجى إدخال اسمك', kor: '이름을 입력해 주세요' },
  { mode: 'all', key: '请填写您的联系方式', cht: '請填寫您的聯繫方式', en: 'Please enter your contact information', jp: '連絡先を入力してください', de: 'Bitte Kontaktdaten eingeben', ara: 'يرجى إدخال بيانات الاتصال', kor: '연락처를 입력해 주세요' },
  { mode: 'all', key: '请填写留言内容', cht: '請填寫留言內容', en: 'Please enter your message', jp: 'メッセージを入力してください', de: 'Bitte Nachricht eingeben', ara: 'يرجى إدخال رسالتك', kor: '문의 내용을 입력해 주세요' },
  { mode: 'all', key: '您输入的过长', cht: '您輸入的過長', en: 'Input is too long', jp: '入力が長すぎます', de: 'Eingabe zu lang', ara: 'الإدخال طويل جدًا', kor: '입력이 너무 깁니다' },
  { mode: 'all', key: '辽ICP备XXXXXXXX号', cht: '遼ICP備XXXXXXXX號', en: 'Liao ICP No. XXXXXXXX', jp: '遼ICP備XXXXXXXX号', de: 'Liao ICP Nr. XXXXXXXX', ara: 'رقم ICP لياو XXXXXXXX', kor: '랴오 ICP号 XXXXXXXX' },

  // ---------- 国家/地区 ----------
  { mode: 'all', key: '日本', cht: '日本', en: 'Japan', jp: '日本', de: 'Japan', ara: 'اليابان', kor: '일본' },
  { mode: 'all', key: '韩国', cht: '韓國', en: 'South Korea', jp: '韓国', de: 'Südkorea', ara: 'كوريا الجنوبية', kor: '한국' },
  { mode: 'all', key: '新加坡', cht: '新加坡', en: 'Singapore', jp: 'シンガポール', de: 'Singapur', ara: 'سنغافورة', kor: '싱가포르' },
  { mode: 'all', key: '印度', cht: '印度', en: 'India', jp: 'インド', de: 'Indien', ara: 'الهند', kor: '인도' },
  { mode: 'all', key: '美国', cht: '美國', en: 'USA', jp: 'アメリカ', de: 'USA', ara: 'الولايات المتحدة', kor: '미국' },
  { mode: 'all', key: '加拿大', cht: '加拿大', en: 'Canada', jp: 'カナダ', de: 'Kanada', ara: 'كندا', kor: '캐나다' },
  { mode: 'all', key: '澳大利亚', cht: '澳大利亞', en: 'Australia', jp: 'オーストラリア', de: 'Australien', ara: 'أستراليا', kor: '호주' },
  { mode: 'all', key: '意大利', cht: '意大利', en: 'Italy', jp: 'イタリア', de: 'Italien', ara: 'إيطاليا', kor: '이탈리아' },
  { mode: 'all', key: '以色列', cht: '以色列', en: 'Israel', jp: 'イスラエル', de: 'Israel', ara: 'إسرائيل', kor: '이스라엘' },
  { mode: 'all', key: '俄罗斯', cht: '俄羅斯', en: 'Russia', jp: 'ロシア', de: 'Russland', ara: 'روسيا', kor: '러시아' },
  { mode: 'all', key: '沙特阿拉伯', cht: '沙特阿拉伯', en: 'Saudi Arabia', jp: 'サウジアラビア', de: 'Saudi-Arabien', ara: 'السعودية', kor: '사우디아라비아' },
  { mode: 'all', key: '土库曼斯坦', cht: '土庫曼斯坦', en: 'Turkmenistan', jp: 'トルクメニスタン', de: 'Turkmenistan', ara: 'تركمانستان', kor: '투르크메니스탄' },
  { mode: 'all', key: '埃及', cht: '埃及', en: 'Egypt', jp: 'エジプト', de: 'Ägypten', ara: 'مصر', kor: '이집트' },
  { mode: 'all', key: '南非', cht: '南非', en: 'South Africa', jp: '南アフリカ', de: 'Südafrika', ara: 'جنوب أفريقيا', kor: '남아공' },

  // ---------- 电子样本 ----------
  { mode: 'all', key: '电子样本', cht: '電子樣本', en: 'E-Catalog', jp: '電子カタログ', de: 'E-Katalog', ara: 'الكتالوج الإلكتروني', kor: '전자 카탈로그' },
  { mode: 'all', key: '公司产品样本册完整在线版，可翻页浏览、缩放查看与章节跳转', cht: '公司產品樣本冊完整在線版，可翻頁瀏覽、縮放查看與章節跳轉', en: 'Complete online version of the company product catalog — browse, zoom and jump by chapter', jp: '会社製品カタログの完全オンライン版。ページめくり・拡大・章ジャンプに対応', de: 'Vollständige Online-Version des Produktkatalogs — Blättern, Zoomen, Kapitelsprünge', ara: 'النسخة الكاملة عبر الإنترنت من كتالوج منتجات الشركة — تصفح وتكبير وقفزات بين الفصول', kor: '회사 제품 카탈로그 전체 온라인 버전 — 페이지 넘기기, 확대, 장 이동 지원' },
  { mode: 'all', key: '点击放大', cht: '點擊放大', en: 'Click to zoom', jp: 'クリックで拡大', de: 'Klick zum Zoomen', ara: 'انقر للتكبير', kor: '클릭하여 확대' },

  // ---------- 数据检索 ----------
  { mode: 'all', key: '规格图纸', cht: '規格圖紙', en: 'Spec Sheets', jp: '規格図', de: 'Datenblätter', ara: 'جداول المواصفات', kor: '규격 도면' },
  { mode: 'all', key: '数据检索', cht: '數據檢索', en: 'Data Search', jp: 'データ検索', de: 'Datensuche', ara: 'البحث في البيانات', kor: '데이터 검색' },
  { mode: 'all', key: '输入任意值筛选：如 2、Sch40、150、610…', cht: '輸入任意值篩選：如 2、Sch40、150、610…', en: 'Filter by any value: e.g. 2, Sch40, 150, 610…', jp: '任意の値で絞り込み：例 2、Sch40、150、610…', de: 'Nach beliebigem Wert filtern: z.B. 2, Sch40, 150, 610…', ara: 'تصفية بأي قيمة: مثل 2، Sch40، 150، 610', kor: '임의 값으로 필터: 예. 2, Sch40, 150, 610' },
  { mode: 'all', key: '查看原表图片', cht: '查看原表圖片', en: 'View Original Sheet', jp: '原表画像を見る', de: 'Original ansehen', ara: 'عرض الجدول الأصلي', kor: '원본 표 보기' },
  { mode: 'all', key: '数据由视觉识别从原表提取，供快速检索参考；正式报价或设计前请点击"查看原表图片"核对原始数据。', cht: '數據由視覺識別從原表提取，供快速檢索參考；正式報價或設計前請點擊"查看原表圖片"核對原始數據。', en: 'Data is extracted from the original sheets by visual recognition for quick reference. Please verify against the original sheet before formal quotation or design.', jp: 'データは視覚認識により原表から抽出されたものです。正式な見積りや設計の前に原表画像でご確認ください。', de: 'Daten wurden per visueller Erkennung aus den Originaltabellen extrahiert. Bitte vor Angebot/Design mit dem Original abgleichen.', ara: 'تم استخراج البيانات من الجداول الأصلية بالتعرف البصري كمرجع سريع. يرجى التحقق من الجدول الأصلي قبل التسعير أو التصميم الرسمي.', kor: '데이터는 시각 인식으로 원본 표에서 추출되어 빠른 검색 참고용입니다. 정식 견적·설계 전 원본 표로 확인하십시오.' },
  { mode: 'all', key: '该品类数据正在提取整理中，敬请期待', cht: '該品類數據正在提取整理中，敬請期待', en: 'Data for this category is being extracted — coming soon', jp: 'このカテゴリのデータは抽出準備中です', de: 'Daten für diese Kategorie werden extrahiert — bald verfügbar', ara: 'جاري استخراج بيانات هذه الفئة — قريبًا', kor: '이 카테고리 데이터 추출 준비 중입니다' },

  // ---------- 简介正文（英文供非中文语言） ----------
  { mode: 'en', key: '公司始建之初以经营出口各种管路配件为主，包括碳钢、不锈钢弯头、三通、异径管、管帽，可执行 ASME B16.9、B16.28、JIS、DIN、GOST 等标准；法兰包括 ANSI、API、MSS、DIN、UNI、KS、JIS 等标准。', en: 'Initially focused on exporting pipe fittings — carbon steel and stainless elbows, tees, reducers and caps to ASME B16.9, B16.28, JIS, DIN and GOST standards — along with flanges complying with ANSI, API, MSS, DIN, UNI, KS and JIS standards.' },
  { mode: 'en', key: '随着我国经济基础及钢铁产业不断壮大，公司经营方向也从单一经营配件，逐渐转型到经营出口各种管材，以迎合国际市场对管材及其配套配件的全面需求。', en: 'As China\'s economy and steel industry expanded, the company gradually transformed from fittings-only trading to exporting a full range of steel pipes, meeting international demand for pipes and matching accessories.' },
  { mode: 'en', key: '钢管包括碳钢、不锈钢、合金钢等材料，可执行的标准包括 ASTM、ASME、API 5L、API 5CT、DIN、EN、GOST 等。', en: 'Pipes cover carbon steel, stainless steel and alloy steel, manufactured to ASTM, ASME, API 5L, API 5CT, DIN, EN and GOST standards.' },
  { mode: 'en', key: '公司本着信誉第一、客户至上的原则，形成并建立了稳定的供货基地：管路配件供货商 40 多家；钢管合作企业包括 TPCO、CSST、衡阳华菱、青山钢铁、扬州、建龙钢铁、宝钢、包钢、鞍钢、通钢、烟台钢管、辽阳大型钢、青钢、无锡无缝、承德钢铁等几十家大型碳钢、不锈钢、无缝焊缝管生产企业，并与其中的烟台钢铁建立了投资股份关系。', en: 'Adhering to reputation first and customer foremost, we have built a stable supply base: 40+ fitting suppliers, plus partnerships with dozens of major mills — TPCO, CSST, Hengyang Valin, Tsingshan, Jianlong, Bao Steel, Baogang, Anshan, Tonggang, Yantai Steel Tube, Liaoyang, Wuxi Seamless, Chengde and more — including an equity relationship with Yantai Steel.' },
  { mode: 'en', key: '产品销售范围从初始的日本、韩国、新加坡、印度，发展到美国、加拿大、澳大利亚、意大利、以色列、俄罗斯、沙特阿拉伯、土库曼斯坦、埃及、南非等众多国家和地区。', en: 'Sales have grown from the initial markets of Japan, South Korea, Singapore and India to over 30 countries and regions including the USA, Canada, Australia, Italy, Israel, Russia, Saudi Arabia, Turkmenistan, Egypt and South Africa.' },
  { mode: 'en', key: '公司本着诚信为本的原则，以质量求生存、以信誉得发展，愿以更加满意的产品和服务，与广大客户一起开创双赢局面，共创美好未来。', en: 'Guided by integrity, surviving on quality and growing on reputation, we look forward to creating win-win partnerships and a brighter future with customers worldwide.' }
]

const LANG_FILES = { zh: 'zh.js', cht: 'cht.js', en: 'en.js', jp: 'jp.js', de: 'de.js', ara: 'ara.js', kor: 'kor.js' }

function readLangFile(name) {
  return readFileSync(join(LANG_DIR, name), 'utf8')
}

function appendEntry(src, id, value) {
  // 在 "export default {" 之后插入新行
  const marker = 'export default {'
  const idx = src.indexOf(marker)
  if (idx === -1) throw new Error(`marker not found`)
  const insertAt = idx + marker.length
  const line = `\n    ${JSON.stringify(String(id))}: ${JSON.stringify(value)},`
  return src.slice(0, insertAt) + line + src.slice(insertAt)
}

// ---- 读取 idMap，找已有 key 与最大 id ----
const idMapSrc = readLangFile('idMap.js')
const existingKeys = new Set()
let maxId = 0
for (const m of idMapSrc.matchAll(/"((?:[^"\\]|\\.)+)":\s*(\d+)/g)) {
  existingKeys.add(m[1])
  const id = parseInt(m[2], 10)
  if (id > maxId) maxId = id
}

// ---- 读取语言文件 ----
const langSrc = {}
const langWrite = {}
for (const [lang, file] of Object.entries(LANG_FILES)) {
  langSrc[lang] = readLangFile(file)
  langWrite[lang] = langSrc[lang]
}

let added = 0
let skipped = 0
let nextId = maxId

for (const entry of TRANSLATIONS) {
  if (existingKeys.has(entry.key)) {
    skipped++
    continue
  }
  nextId++
  // 累积 idMap 新行（最后统一写入）
  langWrite.__idMapAppend = (langWrite.__idMapAppend || '') + `\n    ${JSON.stringify(entry.key)}: ${nextId},`

  // zh 原文
  langWrite.zh = appendEntry(langWrite.zh, nextId, entry.key)
  // 各语言
  for (const lang of ['cht', 'en', 'jp', 'de', 'ara', 'kor']) {
    let value
    if (entry.mode === 'all') {
      value = entry[lang]
    } else {
      // mode en：非中文语言统一英文；cht 用简体原文占位（后续可补繁化）
      value = lang === 'cht' ? entry.key : entry.en
    }
    if (value == null) value = entry.key
    langWrite[lang] = appendEntry(langWrite[lang], nextId, value)
  }
  added++
}

// 写回 idMap（统一一次插入）
let finalIdMap = idMapSrc
if (langWrite.__idMapAppend) {
  const marker = 'export default {'
  const insertAt = finalIdMap.indexOf(marker) + marker.length
  finalIdMap = finalIdMap.slice(0, insertAt) + langWrite.__idMapAppend + finalIdMap.slice(insertAt)
}
writeFileSync(join(LANG_DIR, 'idMap.js'), finalIdMap)
for (const [lang, file] of Object.entries(LANG_FILES)) {
  writeFileSync(join(LANG_DIR, file), langWrite[lang])
}

console.log(`词条注入完成：新增 ${added} 条，跳过已存在 ${skipped} 条，id 范围 ${maxId + 1}-${nextId}`)

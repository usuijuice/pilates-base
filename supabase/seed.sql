-- シードデータ: cities, areas, studios

-- 市区データ
INSERT INTO cities (slug, name) VALUES
  ('chiyoda', '千代田区'),
  ('chuo', '中央区'),
  ('shinjuku', '新宿区'),
  ('bunkyo', '文京区'),
  ('taito', '台東区'),
  ('sumida', '墨田区'),
  ('koto', '江東区'),
  ('shinagawa', '品川区'),
  ('meguro', '目黒区'),
  ('ota', '大田区'),
  ('setagaya', '世田谷区'),
  ('shibuya', '渋谷区'),
  ('nakano', '中野区'),
  ('suginami', '杉並区'),
  ('toshima', '豊島区'),
  ('kita', '北区'),
  ('arakawa', '荒川区'),
  ('itabashi', '板橋区'),
  ('nerima', '練馬区'),
  ('adachi', '足立区'),
  ('katsushika', '葛飾区'),
  ('edogawa', '江戸川区'),
  ('hachioji', '八王子市'),
  ('tachikawa', '立川市'),
  ('musashino', '武蔵野市'),
  ('mitaka', '三鷹市'),
  ('akishima', '昭島市'),
  ('machida', '町田市'),
  ('koganei', '小金井市'),
  ('kodaira', '小平市'),
  ('kokubunji', '国分寺市'),
  ('komae', '狛江市'),
  ('kiyose', '清瀬市'),
  ('higashikurume', '東久留米市'),
  ('hamura', '羽村市'),
  ('nishitokyo', '西東京市');

-- エリアデータ
INSERT INTO areas (slug, name, city_id) VALUES
  ('sasazuka', '笹塚', (SELECT id FROM cities WHERE slug = 'shibuya'));

-- スタジオデータ
INSERT INTO studios (
  name, address, area_id, nearest_station, phone, description,
  pricing_plan, has_trial_lesson, has_unlimited_plan, has_machine,
  has_online_support, has_locker, has_shower, allows_male,
  features, business_hours, official_website
) VALUES
(
  'クラブピラティス 笹塚店',
  '〒151-0073 東京都渋谷区笹塚1-48-14 笹塚ショッピングモールTwenty One 2階',
  (SELECT id FROM areas WHERE slug = 'sasazuka'),
  '京王線笹塚駅より徒歩1分',
  '03-4400-0944',
  'リフォーマー等のマシンピラティス専門スタジオ。体験当日入会で入会金無料。',
  '月4回プラン（EFT4）: 13,090円（税込） / 月8回プラン（EFT8）: 24,090円（税込） / 通い放題プラン（UNLIMITED）: 37,290円（税込） / 入会金: 5,500円（税込）※体験当日入会で無料',
  TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE,
  ARRAY['リフォーマー等のマシンピラティス専門', '体験レッスン30分・無料', '駅から徒歩1分の好立地'],
  '月～金: 7:00～21:00 / 土日: 7:00～18:00',
  'https://clubpilates.co.jp/studio/sasazuka/'
),
(
  'ピラティスミラー 笹塚',
  '〒151-0073 東京都渋谷区笹塚1-59-6 メティス笹塚ビル1F',
  (SELECT id FROM areas WHERE slug = 'sasazuka'),
  '京王線・京王新線 笹塚駅',
  '',
  'KONAMI運営のピラティススタジオ。リフォーマーを使用したレッスンを提供。',
  '入会金: 11,000円（税込） / 月会費プラン: 11,000円（税込・月6回まで）※7回目以降は1回1,100円 / チケットプラン: 2,750円（税込/1回） / プライベートレッスン: 30分4,400円、50分6,600円（税込）',
  TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE,
  ARRAY['リフォーマー使用', '体験レッスン2,200円（税込）', 'プライベートレッスン対応'],
  'レッスンスケジュールによる（休館日: 毎週火曜日）',
  'https://www.konami.com/sportsclub/pilatesmirror/sasazuka/'
),
(
  'PILATES STUDIO Mind & Body',
  '〒151-0073 東京都渋谷区笹塚2-7-10 浜中ビル7F',
  (SELECT id FROM areas WHERE slug = 'sasazuka'),
  '京王線/京王新線 笹塚駅から徒歩3分',
  '03-6300-0752',
  'マシンピラティス対応のスタジオ。プライベート、セミプライベート、グループレッスンを提供。',
  '入会金: 5,500円（税込） / マシン・プライベート: 8,800円（税込/1回） / マシン・セミプライベート: 5,500円（税込/1人） / グループ・マット: 3,300円（税込） / グループ・リフォーマー: 5,500円（税込）',
  TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE,
  ARRAY['マシンピラティス対応', 'プライベート・セミプライベート・グループレッスン', '体験レッスンあり'],
  '要問い合わせ',
  'https://mind-and-body.jp/'
),
(
  'パーソナルマシンピラティスYUZU 笹塚店',
  '〒151-0073 東京都渋谷区笹塚1丁目56-6 90C（9階）',
  (SELECT id FROM areas WHERE slug = 'sasazuka'),
  '笹塚駅徒歩3分',
  '',
  'リフォーマー、キャデラック、チェア、バレル完備のパーソナルマシンピラティススタジオ。',
  '女性料金: 4回券 31,600円（税込）/ 8回券 61,600円（税込）/ 12回券 86,400円（税込）/ 都度払い 8,800円（税込） / 男性料金: 4回券 39,600円（税込）/ 8回券 77,600円（税込）/ 12回券 106,800円（税込）/ 都度払い 11,000円（税込）',
  TRUE, FALSE, TRUE, FALSE, FALSE, FALSE, TRUE,
  ARRAY['リフォーマー、キャデラック、チェア、バレル完備', '体験レッスン5,500円（税込）', 'パーソナル指導専門'],
  '月～日 8:15～21:45',
  'https://yuzu-pilates.com/studios/sasazuka/'
),
(
  'パーソナルマシンピラティス＆ジム ELEMENT 笹塚A1店',
  '〒151-0073 東京都渋谷区笹塚1-50-1 Daiwa笹塚タワー スポーツクラブA-1笹塚',
  (SELECT id FROM areas WHERE slug = 'sasazuka'),
  '笹塚駅から徒歩6分',
  '',
  'マシンピラティス専門のパーソナルジム。30分レッスンで通いやすい。',
  '30分レッスン月4回: 22,000円（税込） / 30分レッスン月8回: 40,000円（税込） / 30分レッスン通い放題: 55,000円（税込） / 入会金: 33,000円（税込）※体験当日入会で半額',
  TRUE, TRUE, TRUE, FALSE, FALSE, FALSE, TRUE,
  ARRAY['マシンピラティス専門', '体験レッスン3,300円（税込）', '30分レッスンで通いやすい'],
  '10:00～22:00（休館日: 毎月5日・15日）',
  'https://element-gym.com/element-top/pilates/pilates-all/sasazuka-a1/'
);

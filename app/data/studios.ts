// Studio data type
export interface Studio {
  id: number;
  name: string;
  address: string;
  area: string;
  nearestStation: string;
  phone: string;
  description: string;
  pricingPlan: string;
  hasTrialLesson: boolean;
  hasUnlimitedPlan: boolean;
  hasMachine: boolean;
  hasOnlineSupport: boolean;
  hasLocker: boolean;
  hasShower: boolean;
  allowsMale: boolean;
  features: string[];
  businessHours: string;
  officialWebsite: string;
}

// Mock data for Pilates studios
export const pilatesStudios: Studio[] = [
  {
    id: 1,
    name: "クラブピラティス 笹塚店",
    address:
      "〒151-0073 東京都渋谷区笹塚1-48-14 笹塚ショッピングモールTwenty One 2階",
    area: "渋谷区",
    nearestStation: "京王線笹塚駅より徒歩1分",
    phone: "",
    description:
      "リフォーマー等のマシンピラティス専門スタジオ。体験当日入会で入会金無料。",
    pricingPlan:
      "月4回プラン（EFT4）: 13,090円（税込） / 月8回プラン（EFT8）: 24,090円（税込） / 通い放題プラン（UNLIMITED）: 37,290円（税込） / 入会金: 5,500円（税込）※体験当日入会で無料",
    hasTrialLesson: true,
    hasUnlimitedPlan: true,
    hasMachine: true,
    hasOnlineSupport: false,
    hasLocker: false,
    hasShower: false,
    allowsMale: true,
    features: [
      "リフォーマー等のマシンピラティス専門",
      "体験レッスン30分・無料",
      "駅から徒歩1分の好立地",
    ],
    businessHours: "月～金: 7:00～21:00 / 土日: 7:00～18:00",
    officialWebsite: "https://clubpilates.co.jp/studio/sasazuka/",
  },
  {
    id: 2,
    name: "ピラティスミラー 笹塚",
    address: "〒151-0073 東京都渋谷区笹塚1-59-6 メティス笹塚ビル1F",
    area: "渋谷区",
    nearestStation: "京王線・京王新線 笹塚駅",
    phone: "",
    description:
      "KONAMI運営のピラティススタジオ。リフォーマーを使用したレッスンを提供。",
    pricingPlan:
      "入会金: 11,000円（税込） / 月会費プラン: 11,000円（税込・月6回まで）※7回目以降は1回1,100円 / チケットプラン: 2,750円（税込/1回） / プライベートレッスン: 30分4,400円、50分6,600円（税込）",
    hasTrialLesson: true,
    hasUnlimitedPlan: false,
    hasMachine: true,
    hasOnlineSupport: false,
    hasLocker: false,
    hasShower: false,
    allowsMale: true,
    features: [
      "リフォーマー使用",
      "体験レッスン2,200円（税込）",
      "プライベートレッスン対応",
    ],
    businessHours: "レッスンスケジュールによる（休館日: 毎週火曜日）",
    officialWebsite:
      "https://www.konami.com/sportsclub/pilatesmirror/sasazuka/",
  },
  {
    id: 3,
    name: "PILATES STUDIO Mind & Body",
    address: "〒151-0073 東京都渋谷区笹塚2-7-10 浜中ビル7F",
    area: "渋谷区",
    nearestStation: "京王線/京王新線 笹塚駅から徒歩3分",
    phone: "",
    description:
      "マシンピラティス対応のスタジオ。プライベート、セミプライベート、グループレッスンを提供。",
    pricingPlan:
      "入会金: 5,500円（税込） / マシン・プライベート: 8,800円（税込/1回） / マシン・セミプライベート: 5,500円（税込/1人） / グループ・マット: 3,300円（税込） / グループ・リフォーマー: 5,500円（税込）",
    hasTrialLesson: true,
    hasUnlimitedPlan: false,
    hasMachine: true,
    hasOnlineSupport: false,
    hasLocker: false,
    hasShower: false,
    allowsMale: true,
    features: [
      "マシンピラティス対応",
      "プライベート・セミプライベート・グループレッスン",
      "体験レッスンあり",
    ],
    businessHours: "要問い合わせ",
    officialWebsite: "https://mind-and-body.jp/",
  },
  {
    id: 4,
    name: "パーソナルマシンピラティスYUZU 笹塚店",
    address: "〒151-0073 東京都渋谷区笹塚1丁目56-6 90C（9階）",
    area: "渋谷区",
    nearestStation: "笹塚駅徒歩3分",
    phone: "",
    description:
      "リフォーマー、キャデラック、チェア、バレル完備のパーソナルマシンピラティススタジオ。",
    pricingPlan:
      "女性料金: 4回券 31,600円（税込）/ 8回券 61,600円（税込）/ 12回券 86,400円（税込）/ 都度払い 8,800円（税込） / 男性料金: 4回券 39,600円（税込）/ 8回券 77,600円（税込）/ 12回券 106,800円（税込）/ 都度払い 11,000円（税込）",
    hasTrialLesson: true,
    hasUnlimitedPlan: false,
    hasMachine: true,
    hasOnlineSupport: false,
    hasLocker: false,
    hasShower: false,
    allowsMale: true,
    features: [
      "リフォーマー、キャデラック、チェア、バレル完備",
      "体験レッスン5,500円（税込）",
      "パーソナル指導専門",
    ],
    businessHours: "月～日 8:15～21:45",
    officialWebsite: "https://yuzu-pilates.com/studios/sasazuka/",
  },
  {
    id: 5,
    name: "パーソナルマシンピラティス＆ジム ELEMENT 笹塚A1店",
    address:
      "〒151-0073 東京都渋谷区笹塚1-50-1 Daiwa笹塚タワー スポーツクラブA-1笹塚",
    area: "渋谷区",
    nearestStation: "笹塚駅から徒歩6分",
    phone: "",
    description:
      "マシンピラティス専門のパーソナルジム。30分レッスンで通いやすい。",
    pricingPlan:
      "30分レッスン月4回: 22,000円（税込） / 30分レッスン月8回: 40,000円（税込） / 30分レッスン通い放題: 55,000円（税込） / 入会金: 33,000円（税込）※体験当日入会で半額",
    hasTrialLesson: true,
    hasUnlimitedPlan: true,
    hasMachine: true,
    hasOnlineSupport: false,
    hasLocker: false,
    hasShower: false,
    allowsMale: true,
    features: [
      "マシンピラティス専門",
      "体験レッスン3,300円（税込）",
      "30分レッスンで通いやすい",
    ],
    businessHours: "10:00～22:00（休館日: 毎月5日・15日）",
    officialWebsite:
      "https://element-gym.com/element-top/pilates/pilates-all/sasazuka-a1/",
  },
];

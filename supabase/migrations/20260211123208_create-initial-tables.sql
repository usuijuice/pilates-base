-- 都道府県テーブル
CREATE TABLE prefectures (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE prefectures IS '都道府県情報';
COMMENT ON COLUMN prefectures.slug IS 'URLパス用スラッグ（例: tokyo）';
COMMENT ON COLUMN prefectures.name IS '都道府県表示名（例: 東京都）';

-- 市区町村テーブル
CREATE TABLE municipalities (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  prefecture_slug TEXT NOT NULL REFERENCES prefectures(slug) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE municipalities IS '市区町村情報';
COMMENT ON COLUMN municipalities.slug IS 'URLパス用スラッグ（例: shibuya）';
COMMENT ON COLUMN municipalities.name IS '市区町村表示名（例: 渋谷区）';

CREATE INDEX idx_municipalities_prefecture_slug ON municipalities(prefecture_slug);

-- エリアテーブル
CREATE TABLE areas (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  municipality_slug TEXT NOT NULL REFERENCES municipalities(slug) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE areas IS 'エリア情報（駅・地域単位）';
COMMENT ON COLUMN areas.slug IS 'URLパス用スラッグ（例: sasazuka）';
COMMENT ON COLUMN areas.name IS 'エリア表示名（例: 笹塚）';

CREATE INDEX idx_areas_municipality_slug ON areas(municipality_slug);

-- スタジオテーブル
CREATE TABLE studios (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  area_slug TEXT NOT NULL REFERENCES areas(slug) ON DELETE RESTRICT,
  address TEXT NOT NULL,
  nearest_station TEXT NOT NULL,
  phone TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  pricing_plan TEXT NOT NULL DEFAULT '',
  has_trial_lesson BOOLEAN NOT NULL DEFAULT FALSE,
  has_unlimited_plan BOOLEAN NOT NULL DEFAULT FALSE,
  has_machine BOOLEAN NOT NULL DEFAULT FALSE,
  has_online_support BOOLEAN NOT NULL DEFAULT FALSE,
  has_locker BOOLEAN NOT NULL DEFAULT FALSE,
  has_shower BOOLEAN NOT NULL DEFAULT FALSE,
  allows_male BOOLEAN NOT NULL DEFAULT FALSE,
  features TEXT[] NOT NULL DEFAULT '{}',
  business_hours TEXT NOT NULL DEFAULT '',
  official_website TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE studios IS 'ピラティススタジオ情報';

CREATE INDEX idx_studios_area_slug ON studios(area_slug);

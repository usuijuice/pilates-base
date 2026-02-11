-- 市区テーブル
CREATE TABLE cities (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE cities IS '市区情報';
COMMENT ON COLUMN cities.slug IS 'URLパス用スラッグ（例: shibuya）';
COMMENT ON COLUMN cities.name IS '市区表示名（例: 渋谷区）';

-- エリアテーブル
CREATE TABLE areas (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  city_id BIGINT NOT NULL REFERENCES cities(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE areas IS 'エリア情報（駅・地域単位）';
COMMENT ON COLUMN areas.slug IS 'URLパス用スラッグ（例: sasazuka）';
COMMENT ON COLUMN areas.name IS 'エリア表示名（例: 笹塚）';

CREATE INDEX idx_areas_city_id ON areas(city_id);

-- スタジオテーブル
CREATE TABLE studios (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  area_id BIGINT NOT NULL REFERENCES areas(id) ON DELETE RESTRICT,
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

CREATE INDEX idx_studios_area_id ON studios(area_id);

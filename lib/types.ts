/** Supabase studios テーブルの行型（snake_case） */
export interface DbStudio {
  id: number;
  name: string;
  address: string;
  area_id: number;
  nearest_station: string;
  phone: string;
  description: string;
  pricing_plan: string;
  has_trial_lesson: boolean;
  has_unlimited_plan: boolean;
  has_machine: boolean;
  has_online_support: boolean;
  has_locker: boolean;
  has_shower: boolean;
  allows_male: boolean;
  features: string[];
  business_hours: string;
  official_website: string;
  created_at: string;
  updated_at: string;
}

/** Supabase areas テーブルの行型 */
export interface DbArea {
  id: number;
  slug: string;
  name: string;
  ward_id: number;
  created_at: string;
  updated_at: string;
}

/** Supabase wards テーブルの行型 */
export interface DbWard {
  id: number;
  slug: string;
  name: string;
  created_at: string;
  updated_at: string;
}

/** アプリケーション側で使用する Studio 型（camelCase） */
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

/** DB行 → アプリ用 Studio に変換 */
export function toStudio(row: DbStudio, areaName: string): Studio {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    area: areaName,
    nearestStation: row.nearest_station,
    phone: row.phone,
    description: row.description,
    pricingPlan: row.pricing_plan,
    hasTrialLesson: row.has_trial_lesson,
    hasUnlimitedPlan: row.has_unlimited_plan,
    hasMachine: row.has_machine,
    hasOnlineSupport: row.has_online_support,
    hasLocker: row.has_locker,
    hasShower: row.has_shower,
    allowsMale: row.allows_male,
    features: row.features,
    businessHours: row.business_hours,
    officialWebsite: row.official_website,
  };
}

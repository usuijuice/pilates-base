import { cacheLife } from "next/cache";
import type { Tables } from "@/lib/database.types";
import { supabase } from "@/lib/supabase";

/** 全スタジオを取得（エリア名を結合） */
export async function getAllStudios(limit?: number) {
  "use cache";
  cacheLife("max");
  let query = supabase
    .from("studios")
    .select("*, areas(name)")
    .order("name");
  if (limit !== undefined) {
    query = query.limit(limit);
  }
  const { data, error } = await query;

  if (error) {
    throw new Error(`スタジオの取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const areaName = row.areas.name;
    const { areas: _, ...studioRow } = row;
    return { ...studioRow, area: areaName };
  });
}

/** スラッグでスタジオを1件取得 */
export async function getStudioBySlug(slug: string) {
  "use cache";
  cacheLife("max");
  const { data, error } = await supabase
    .from("studios")
    .select("*, areas(name)")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw new Error(`スタジオの取得に失敗しました: ${error.message}`);
  }

  if (!data) return null;

  const areaName = data.areas.name;
  const { areas: _, ...studioRow } = data;
  return { ...studioRow, area: areaName };
}

/** エリアのスラッグでスタジオ一覧を取得 */
export async function getStudiosByAreaSlug(slug: string) {
  "use cache";
  cacheLife("max");

  const { data, error } = await supabase
    .from("studios")
    .select("*")
    .eq("area_slug", slug)
    .order("name");

  if (error) {
    throw new Error(`スタジオの取得に失敗しました: ${error.message}`);
  }

  // エリア名を取得
  const area = await getAreaBySlug(slug);
  const areaName = area?.name ?? "";

  return (data ?? []).map((row) => ({ ...row, area: areaName }));
}

/** スラッグでエリア情報を取得 */
export async function getAreaBySlug(
  slug: string,
): Promise<Tables<"areas"> | null> {
  "use cache";
  cacheLife("max");
  const { data, error } = await supabase
    .from("areas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`エリアの取得に失敗しました: ${error.message}`);
  }

  return data ?? null;
}

/** 全エリアのスラッグ一覧を取得（generateStaticParams 用） */
export async function getAllAreaSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("max");
  const { data, error } = await supabase.from("areas").select("slug");

  if (error) {
    throw new Error(`エリア一覧の取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => row.slug);
}

/** 全都道府県を取得 */
export async function getAllPrefectures(): Promise<Tables<"prefectures">[]> {
  "use cache";
  cacheLife("max");
  const { data, error } = await supabase
    .from("prefectures")
    .select("*")
    .order("slug");

  if (error) {
    throw new Error(`都道府県の取得に失敗しました: ${error.message}`);
  }

  return data ?? [];
}

/** スタジオが存在する市区町村のみ取得 */
export async function getAllMunicipalities(): Promise<
  Tables<"municipalities">[]
> {
  "use cache";
  cacheLife("max");
  // スタジオが存在するエリアのarea_slugを取得
  const { data: studioData, error: studioError } = await supabase
    .from("studios")
    .select("area_slug");

  if (studioError) {
    throw new Error(`スタジオの取得に失敗しました: ${studioError.message}`);
  }

  const areaSlugs = [...new Set((studioData ?? []).map((s) => s.area_slug))];
  if (areaSlugs.length === 0) return [];

  // そのエリアが属するmunicipality_slugを取得
  const { data: areaData, error: areaError } = await supabase
    .from("areas")
    .select("municipality_slug")
    .in("slug", areaSlugs);

  if (areaError) {
    throw new Error(`エリアの取得に失敗しました: ${areaError.message}`);
  }

  const municipalitySlugs = [
    ...new Set((areaData ?? []).map((a) => a.municipality_slug)),
  ];
  if (municipalitySlugs.length === 0) return [];

  // 該当する市区町村のみ取得
  const { data, error } = await supabase
    .from("municipalities")
    .select("*")
    .in("slug", municipalitySlugs)
    .order("slug");

  if (error) {
    throw new Error(`市区町村の取得に失敗しました: ${error.message}`);
  }

  return data ?? [];
}

/** スタジオが存在するエリアのみ取得（市区町村スラッグ付き） */
export async function getAllAreas(): Promise<Tables<"areas">[]> {
  "use cache";
  cacheLife("max");
  // スタジオが存在するarea_slugを取得
  const { data: studioData, error: studioError } = await supabase
    .from("studios")
    .select("area_slug");

  if (studioError) {
    throw new Error(`スタジオの取得に失敗しました: ${studioError.message}`);
  }

  const areaSlugs = [...new Set((studioData ?? []).map((s) => s.area_slug))];
  if (areaSlugs.length === 0) return [];

  // 該当するエリアのみ取得
  const { data, error } = await supabase
    .from("areas")
    .select("*, municipalities(slug)")
    .in("slug", areaSlugs)
    .order("slug");

  if (error) {
    throw new Error(`エリアの取得に失敗しました: ${error.message}`);
  }

  return data ?? [];
}

/** 都道府県スラッグ + 市区町村スラッグ + エリアスラッグでエリアを取得 */
export async function getAreaBySlugs(
  prefSlug: string,
  citySlug: string,
  areaSlug: string,
): Promise<
  | (Tables<"areas"> & { municipalityName: string; prefectureName: string })
  | null
> {
  "use cache";
  cacheLife("max");
  // 市区町村をスラッグで取得し、都道府県スラッグも確認
  const { data: municipalityData, error: municipalityError } = await supabase
    .from("municipalities")
    .select("*, prefectures(name)")
    .eq("slug", citySlug)
    .eq("prefecture_slug", prefSlug)
    .single();

  if (municipalityError) {
    if (municipalityError.code === "PGRST116") return null;
    throw new Error(
      `市区町村の取得に失敗しました: ${municipalityError.message}`,
    );
  }
  if (!municipalityData) return null;

  // そのmunicipality_slugに属するエリアをスラッグで取得
  const { data: areaData, error: areaError } = await supabase
    .from("areas")
    .select("*")
    .eq("slug", areaSlug)
    .eq("municipality_slug", citySlug)
    .single();

  if (areaError) {
    if (areaError.code === "PGRST116") return null;
    throw new Error(`エリアの取得に失敗しました: ${areaError.message}`);
  }
  if (!areaData) return null;

  return {
    ...areaData,
    municipalityName: municipalityData.name,
    prefectureName: municipalityData.prefectures.name,
  };
}

/** generateStaticParams 用: 全 prefSlug/citySlug/areaSlug の組み合わせを取得 */
export async function getAllPrefCityAreaSlugs(): Promise<
  { prefSlug: string; citySlug: string; areaSlug: string }[]
> {
  "use cache";
  cacheLife("max");
  const { data, error } = await supabase
    .from("areas")
    .select("slug, municipalities(slug, prefectures(slug))");

  if (error) {
    throw new Error(`エリア一覧の取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    prefSlug: row.municipalities.prefectures.slug,
    citySlug: row.municipalities.slug,
    areaSlug: row.slug,
  }));
}

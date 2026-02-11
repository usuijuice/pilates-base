import { supabase } from "@/lib/supabase";
import type { Area, City, DbArea, DbCity, DbStudio, Studio } from "@/lib/types";
import { toStudio } from "@/lib/types";

/** 全スタジオを取得（エリア名を結合） */
export async function getAllStudios(): Promise<Studio[]> {
  const { data, error } = await supabase
    .from("studios")
    .select("*, areas(name)")
    .order("id");

  if (error) {
    throw new Error(`スタジオの取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const areaName = (row.areas as unknown as { name: string })?.name ?? "";
    const { areas: _, ...studioRow } = row;
    return toStudio(studioRow as DbStudio, areaName);
  });
}

/** IDでスタジオを1件取得 */
export async function getStudioById(id: number): Promise<Studio | null> {
  const { data, error } = await supabase
    .from("studios")
    .select("*, areas(name)")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null; // not found
    throw new Error(`スタジオの取得に失敗しました: ${error.message}`);
  }

  if (!data) return null;

  const areaName = (data.areas as unknown as { name: string })?.name ?? "";
  const { areas: _, ...studioRow } = data;
  return toStudio(studioRow as DbStudio, areaName);
}

/** エリアのスラッグでスタジオ一覧を取得 */
export async function getStudiosByAreaSlug(slug: string): Promise<Studio[]> {
  // まずエリアを取得
  const area = await getAreaBySlug(slug);
  if (!area) return [];

  const { data, error } = await supabase
    .from("studios")
    .select("*")
    .eq("area_id", area.id)
    .order("id");

  if (error) {
    throw new Error(`スタジオの取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => toStudio(row as DbStudio, area.name));
}

/** スラッグでエリア情報を取得 */
export async function getAreaBySlug(slug: string): Promise<DbArea | null> {
  const { data, error } = await supabase
    .from("areas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`エリアの取得に失敗しました: ${error.message}`);
  }

  return data as DbArea | null;
}

/** 全エリアのスラッグ一覧を取得（generateStaticParams 用） */
export async function getAllAreaSlugs(): Promise<string[]> {
  const { data, error } = await supabase.from("areas").select("slug");

  if (error) {
    throw new Error(`エリア一覧の取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => row.slug);
}

/** スタジオが存在する市区のみ取得 */
export async function getAllCities(): Promise<City[]> {
  // スタジオが存在するエリアのarea_idを取得
  const { data: studioData, error: studioError } = await supabase
    .from("studios")
    .select("area_id");

  if (studioError) {
    throw new Error(`スタジオの取得に失敗しました: ${studioError.message}`);
  }

  const areaIds = [...new Set((studioData ?? []).map((s) => s.area_id))];
  if (areaIds.length === 0) return [];

  // そのエリアが属するcity_idを取得
  const { data: areaData, error: areaError } = await supabase
    .from("areas")
    .select("city_id")
    .in("id", areaIds);

  if (areaError) {
    throw new Error(`エリアの取得に失敗しました: ${areaError.message}`);
  }

  const cityIds = [...new Set((areaData ?? []).map((a) => a.city_id))];
  if (cityIds.length === 0) return [];

  // 該当する市区のみ取得
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .in("id", cityIds)
    .order("id");

  if (error) {
    throw new Error(`市区の取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const r = row as DbCity;
    return { id: r.id, slug: r.slug, name: r.name };
  });
}

/** スタジオが存在するエリアのみ取得（市区スラッグ付き） */
export async function getAllAreas(): Promise<Area[]> {
  // スタジオが存在するarea_idを取得
  const { data: studioData, error: studioError } = await supabase
    .from("studios")
    .select("area_id");

  if (studioError) {
    throw new Error(`スタジオの取得に失敗しました: ${studioError.message}`);
  }

  const areaIds = [...new Set((studioData ?? []).map((s) => s.area_id))];
  if (areaIds.length === 0) return [];

  // 該当するエリアのみ取得
  const { data, error } = await supabase
    .from("areas")
    .select("*, cities(slug)")
    .in("id", areaIds)
    .order("id");

  if (error) {
    throw new Error(`エリアの取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => {
    const citySlug = (row.cities as unknown as { slug: string })?.slug ?? "";
    const { cities: _, ...areaRow } = row;
    const r = areaRow as DbArea;
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      cityId: r.city_id,
      citySlug,
    };
  });
}

/** 市区スラッグ + エリアスラッグでエリアを取得 */
export async function getAreaBySlugs(
  citySlug: string,
  areaSlug: string,
): Promise<(DbArea & { cityName: string }) | null> {
  // まず市区をスラッグで取得
  const { data: cityData, error: cityError } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", citySlug)
    .single();

  if (cityError) {
    if (cityError.code === "PGRST116") return null;
    throw new Error(`市区の取得に失敗しました: ${cityError.message}`);
  }
  if (!cityData) return null;

  const city = cityData as DbCity;

  // そのcity_idに属するエリアをスラッグで取得
  const { data: areaData, error: areaError } = await supabase
    .from("areas")
    .select("*")
    .eq("slug", areaSlug)
    .eq("city_id", city.id)
    .single();

  if (areaError) {
    if (areaError.code === "PGRST116") return null;
    throw new Error(`エリアの取得に失敗しました: ${areaError.message}`);
  }
  if (!areaData) return null;

  return { ...(areaData as DbArea), cityName: city.name };
}

/** generateStaticParams 用: 全 citySlug/areaSlug の組み合わせを取得 */
export async function getAllCityAreaSlugs(): Promise<
  { citySlug: string; areaSlug: string }[]
> {
  const { data, error } = await supabase
    .from("areas")
    .select("slug, cities(slug)");

  if (error) {
    throw new Error(`エリア一覧の取得に失敗しました: ${error.message}`);
  }

  return (data ?? []).map((row) => ({
    citySlug: (row.cities as unknown as { slug: string })?.slug ?? "",
    areaSlug: row.slug,
  }));
}

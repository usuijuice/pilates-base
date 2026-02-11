import { supabase } from "@/lib/supabase";
import type { DbArea, DbStudio, Studio } from "@/lib/types";
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

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Tables } from "@/lib/database.types";

interface AreaNavigatorProps {
  prefectures: Tables<"prefectures">[];
  municipalities: Tables<"municipalities">[];
  areas: Tables<"areas">[];
}

export function AreaNavigator({
  prefectures,
  municipalities,
  areas,
}: AreaNavigatorProps) {
  const router = useRouter();
  const [selectedPrefectureSlug, setSelectedPrefectureSlug] = useState<
    string | null
  >(null);
  const [selectedMunicipalitySlug, setSelectedMunicipalitySlug] = useState<
    string | null
  >(null);

  /** 選択された都道府県に属する市区町村のみ */
  const filteredMunicipalities = municipalities.filter(
    (municipality) => municipality.prefecture_slug === selectedPrefectureSlug,
  );

  /** 選択された市区町村に属するエリアのみ */
  const filteredAreas = areas.filter(
    (area) => area.municipality_slug === selectedMunicipalitySlug,
  );

  function handlePrefectureChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    setSelectedPrefectureSlug(value || null);
    setSelectedMunicipalitySlug(null);
  }

  function handleMunicipalityChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    const value = event.target.value;
    setSelectedMunicipalitySlug(value || null);
  }

  function handleAreaChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const areaSlug = event.target.value;
    if (areaSlug && selectedPrefectureSlug && selectedMunicipalitySlug) {
      router.push(
        `/area/${selectedPrefectureSlug}/${selectedMunicipalitySlug}/${areaSlug}`,
      );
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-stone-700">
        エリアからスタジオを探す
      </h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* 都道府県ドロップダウン */}
        <div className="flex-1">
          <label
            htmlFor="prefecture-select"
            className="mb-1 block text-sm font-medium text-stone-600"
          >
            都道府県
          </label>
          <select
            id="prefecture-select"
            value={selectedPrefectureSlug ?? ""}
            onChange={handlePrefectureChange}
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 shadow-sm transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200"
          >
            <option value="">都道府県を選択してください</option>
            {prefectures.map((prefecture) => (
              <option key={prefecture.slug} value={prefecture.slug}>
                {prefecture.name}
              </option>
            ))}
          </select>
        </div>

        {/* 市区町村ドロップダウン */}
        <div className="flex-1">
          <label
            htmlFor="municipality-select"
            className="mb-1 block text-sm font-medium text-stone-600"
          >
            市区町村
          </label>
          <select
            id="municipality-select"
            value={selectedMunicipalitySlug ?? ""}
            onChange={handleMunicipalityChange}
            disabled={
              selectedPrefectureSlug === null ||
              filteredMunicipalities.length === 0
            }
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 shadow-sm transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
          >
            <option value="">
              {selectedPrefectureSlug === null
                ? "都道府県を先に選択してください"
                : filteredMunicipalities.length === 0
                  ? "市区町村がありません"
                  : "市区町村を選択してください"}
            </option>
            {filteredMunicipalities.map((municipality) => (
              <option key={municipality.slug} value={municipality.slug}>
                {municipality.name}
              </option>
            ))}
          </select>
        </div>

        {/* エリアドロップダウン */}
        <div className="flex-1">
          <label
            htmlFor="area-select"
            className="mb-1 block text-sm font-medium text-stone-600"
          >
            エリア
          </label>
          <select
            id="area-select"
            value=""
            onChange={handleAreaChange}
            disabled={
              selectedMunicipalitySlug === null || filteredAreas.length === 0
            }
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 shadow-sm transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
          >
            <option value="">
              {selectedMunicipalitySlug === null
                ? "市区町村を先に選択してください"
                : filteredAreas.length === 0
                  ? "エリアがありません"
                  : "エリアを選択してください"}
            </option>
            {filteredAreas.map((area) => (
              <option key={area.slug} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

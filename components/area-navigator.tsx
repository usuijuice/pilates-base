"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { Area, City } from "@/lib/types";

interface AreaNavigatorProps {
  cities: City[];
  areas: Area[];
}

export function AreaNavigator({ cities, areas }: AreaNavigatorProps) {
  const router = useRouter();
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);

  /** 選択された市区に属するエリアのみ */
  const filteredAreas = useMemo(() => {
    if (selectedCityId === null) return [];
    return areas.filter((a) => a.cityId === selectedCityId);
  }, [areas, selectedCityId]);

  /** 選択中の市区のスラッグ */
  const selectedCitySlug = useMemo(() => {
    if (selectedCityId === null) return "";
    return cities.find((c) => c.id === selectedCityId)?.slug ?? "";
  }, [cities, selectedCityId]);

  function handleCityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setSelectedCityId(value ? Number(value) : null);
  }

  function handleAreaChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const areaSlug = e.target.value;
    if (areaSlug && selectedCitySlug) {
      router.push(`/studio/area/${selectedCitySlug}/${areaSlug}`);
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-stone-700">
        エリアからスタジオを探す
      </h2>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        {/* 市区ドロップダウン */}
        <div className="flex-1">
          <label
            htmlFor="city-select"
            className="mb-1 block text-sm font-medium text-stone-600"
          >
            市区
          </label>
          <select
            id="city-select"
            value={selectedCityId ?? ""}
            onChange={handleCityChange}
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 shadow-sm transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200"
          >
            <option value="">市区を選択してください</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
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
            disabled={selectedCityId === null || filteredAreas.length === 0}
            className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-700 shadow-sm transition-colors focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400"
          >
            <option value="">
              {selectedCityId === null
                ? "市区を先に選択してください"
                : filteredAreas.length === 0
                  ? "エリアがありません"
                  : "エリアを選択してください"}
            </option>
            {filteredAreas.map((area) => (
              <option key={area.id} value={area.slug}>
                {area.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { AreaNavigator } from "@/components/area-navigator";
import {
  getAllAreas,
  getAllMunicipalities,
  getAllPrefectures,
  getAllStudios,
} from "@/lib/studios";

export default async function Home() {
  const [pilatesStudios, prefectures, municipalities, areas] =
    await Promise.all([
      getAllStudios(5),
      getAllPrefectures(),
      getAllMunicipalities(),
      getAllAreas(),
    ]);
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-rose-300">
            全国のピラティス教室
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            全国のピラティススタジオ情報を検索できます
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* エリアナビゲーション */}
        <AreaNavigator
          prefectures={prefectures}
          municipalities={municipalities}
          areas={areas}
        />

        {/* スタジオ一覧 */}
        <div className="mt-8 flex flex-col gap-6">
          {pilatesStudios.map((studio) => (
            <Link
              key={studio.slug}
              href={`/studio/${studio.slug}`}
              className="block rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-rose-400">
                {studio.name}
              </h2>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-stone-600">住所:</span>{" "}
                  {studio.address}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium text-stone-600">電話:</span>{" "}
                  {studio.phone}
                </p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {studio.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

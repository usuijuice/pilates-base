import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCityAreaSlugs,
  getAreaBySlugs,
  getStudiosByAreaSlug,
} from "@/lib/studios";

export async function generateStaticParams() {
  const slugs = await getAllCityAreaSlugs();
  return slugs.map(({ citySlug, areaSlug }) => ({ citySlug, areaSlug }));
}

export default async function CityAreaPage({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string }>;
}) {
  const { citySlug, areaSlug } = await params;
  const area = await getAreaBySlugs(citySlug, areaSlug);

  if (!area) {
    notFound();
  }

  const studios = await getStudiosByAreaSlug(areaSlug);

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* パンくずナビ */}
          <nav className="mb-3 text-sm text-stone-500">
            <Link href="/" className="hover:text-rose-400 transition-colors">
              トップ
            </Link>
            <span className="mx-2">›</span>
            <span className="text-stone-600">{area.cityName}</span>
            <span className="mx-2">›</span>
            <span className="font-medium text-stone-700">{area.name}</span>
          </nav>
          <h1 className="text-3xl font-bold text-rose-300">
            {area.name}のピラティススタジオ
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {area.cityName} {area.name}エリアのピラティススタジオ一覧（
            {studios.length}件）
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {studios.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <p className="text-stone-500">
              このエリアにはまだスタジオが登録されていません。
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {studios.map((studio) => (
              <Link
                key={studio.id}
                href={`/studio/${studio.id}`}
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
        )}

        {/* トップページに戻るリンク */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg bg-rose-100 px-6 py-3 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-200"
          >
            ← トップページに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}

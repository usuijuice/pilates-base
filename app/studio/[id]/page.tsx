import Link from "next/link";
import { notFound } from "next/navigation";
import { pilatesStudios } from "@/app/data/studios";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return pilatesStudios.map((studio) => ({
    id: studio.id.toString(),
  }));
}

export default async function StudioPage({ params }: PageProps) {
  const { id } = await params;
  const studio = pilatesStudios.find((s) => s.id === Number.parseInt(id, 10));

  if (!studio) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="sticky top-0 z-10 bg-white shadow-sm dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← 一覧に戻る
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
            {studio.name}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-md dark:bg-zinc-800">
          {/* Description */}
          <div className="mb-8">
            <p className="text-zinc-700 dark:text-zinc-300">
              {studio.description}
            </p>
          </div>

          {/* Features */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              特徴
            </h2>
            <ul className="space-y-2">
              {studio.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start text-zinc-700 dark:text-zinc-300"
                >
                  <span className="mr-2 mt-1 text-blue-600 dark:text-blue-400">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Pricing */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              料金プラン
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300">
              {studio.pricingPlan}
            </p>
          </section>

          {/* Facilities & Services */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              設備・サービス
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasTrialLesson ? "text-green-600 dark:text-green-400" : "text-zinc-400"}`}
                >
                  {studio.hasTrialLesson ? "✓" : "✗"}
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  体験レッスン
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasUnlimitedPlan ? "text-green-600 dark:text-green-400" : "text-zinc-400"}`}
                >
                  {studio.hasUnlimitedPlan ? "✓" : "✗"}
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  通い放題
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasMachine ? "text-green-600 dark:text-green-400" : "text-zinc-400"}`}
                >
                  {studio.hasMachine ? "✓" : "✗"}
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  マシン
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasOnlineSupport ? "text-green-600 dark:text-green-400" : "text-zinc-400"}`}
                >
                  {studio.hasOnlineSupport ? "✓" : "✗"}
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  オンライン対応
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasLocker ? "text-green-600 dark:text-green-400" : "text-zinc-400"}`}
                >
                  {studio.hasLocker ? "✓" : "✗"}
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  ロッカー
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasShower ? "text-green-600 dark:text-green-400" : "text-zinc-400"}`}
                >
                  {studio.hasShower ? "✓" : "✗"}
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  シャワー
                </span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.allowsMale ? "text-green-600 dark:text-green-400" : "text-zinc-400"}`}
                >
                  {studio.allowsMale ? "✓" : "✗"}
                </span>
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  男性利用可
                </span>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              アクセス
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  住所
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {studio.address}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  最寄駅
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {studio.nearestStation}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  エリア
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {studio.area}
                </p>
              </div>
            </div>
          </section>

          {/* Business Hours */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              営業時間
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300">
              {studio.businessHours}
            </p>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              お問い合わせ
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  電話番号
                </p>
                <p className="text-zinc-700 dark:text-zinc-300">
                  {studio.phone}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  公式サイト
                </p>
                <a
                  href={studio.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {studio.officialWebsite}
                </a>
              </div>
            </div>
          </section>

          {/* Back to list button */}
          <div className="mt-8 border-t border-zinc-200 pt-6 dark:border-zinc-700">
            <Link
              href="/"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              一覧に戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

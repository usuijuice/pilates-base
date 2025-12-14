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
    <div className="min-h-screen bg-stone-50">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-rose-300 hover:text-rose-400 font-medium"
          >
            ← 一覧に戻る
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-rose-300">
            {studio.name}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed">
              {studio.description}
            </p>
          </div>

          {/* Features */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-rose-400">特徴</h2>
            <ul className="space-y-2 bg-stone-50 p-6 rounded-lg">
              {studio.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start text-gray-600 leading-relaxed"
                >
                  <span className="mr-2 mt-1 text-rose-300 font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Pricing */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-rose-400">
              料金プラン
            </h2>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-rose-200">
              <p className="text-gray-700 leading-relaxed">
                {studio.pricingPlan}
              </p>
            </div>
          </section>

          {/* Facilities & Services */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-rose-400">
              設備・サービス
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 bg-stone-50 p-6 rounded-lg">
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasTrialLesson ? "text-rose-300" : "text-gray-300"}`}
                >
                  {studio.hasTrialLesson ? "✓" : "✗"}
                </span>
                <span className="text-sm text-gray-700">体験レッスン</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasUnlimitedPlan ? "text-rose-300" : "text-gray-300"}`}
                >
                  {studio.hasUnlimitedPlan ? "✓" : "✗"}
                </span>
                <span className="text-sm text-gray-700">通い放題</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasMachine ? "text-rose-300" : "text-gray-300"}`}
                >
                  {studio.hasMachine ? "✓" : "✗"}
                </span>
                <span className="text-sm text-gray-700">マシン</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasOnlineSupport ? "text-rose-300" : "text-gray-300"}`}
                >
                  {studio.hasOnlineSupport ? "✓" : "✗"}
                </span>
                <span className="text-sm text-gray-700">オンライン対応</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasLocker ? "text-rose-300" : "text-gray-300"}`}
                >
                  {studio.hasLocker ? "✓" : "✗"}
                </span>
                <span className="text-sm text-gray-700">ロッカー</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasShower ? "text-rose-300" : "text-gray-300"}`}
                >
                  {studio.hasShower ? "✓" : "✗"}
                </span>
                <span className="text-sm text-gray-700">シャワー</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.allowsMale ? "text-rose-300" : "text-gray-300"}`}
                >
                  {studio.allowsMale ? "✓" : "✗"}
                </span>
                <span className="text-sm text-gray-700">男性利用可</span>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-rose-400">
              アクセス
            </h2>
            <div className="space-y-3 bg-stone-50 p-6 rounded-lg">
              <div>
                <p className="text-sm font-medium text-stone-600">住所</p>
                <p className="text-gray-700 mt-1">{studio.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-600">最寄駅</p>
                <p className="text-gray-700 mt-1">{studio.nearestStation}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-600">エリア</p>
                <p className="text-gray-700 mt-1">{studio.area}</p>
              </div>
            </div>
          </section>

          {/* Business Hours */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-rose-400">
              営業時間
            </h2>
            <div className="bg-stone-50 p-6 rounded-lg">
              <p className="text-gray-700">{studio.businessHours}</p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-rose-400">
              お問い合わせ
            </h2>
            <div className="space-y-3 bg-stone-50 p-6 rounded-lg">
              <div>
                <p className="text-sm font-medium text-stone-600">電話番号</p>
                <p className="text-gray-700 mt-1">{studio.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-600">公式サイト</p>
                <a
                  href={studio.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-rose-300 hover:text-rose-400 transition-colors mt-1 inline-block"
                >
                  {studio.officialWebsite}
                </a>
              </div>
            </div>
          </section>

          {/* Back to list button */}
          <div className="mt-8 border-t border-amber-200 pt-6">
            <Link
              href="/"
              className="inline-block rounded-full bg-rose-300 px-12 py-4 text-white font-semibold transition-all hover:bg-rose-400 shadow-sm hover:shadow-md"
            >
              一覧に戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

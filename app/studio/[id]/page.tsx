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
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-sm text-[#d4a5a5] hover:text-[#c09090] font-medium"
          >
            ← 一覧に戻る
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-[#d4a5a5]">
            {studio.name}
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          {/* Description */}
          <div className="mb-8">
            <p className="text-[#4a4a4a] leading-relaxed">
              {studio.description}
            </p>
          </div>

          {/* Features */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-[#c09090]">特徴</h2>
            <ul className="space-y-2 bg-[#fdfbf8] p-6 rounded-lg">
              {studio.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start text-[#666] leading-relaxed"
                >
                  <span className="mr-2 mt-1 text-[#d4a5a5] font-bold">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Pricing */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-[#c09090]">
              料金プラン
            </h2>
            <div className="bg-[#fef9f3] p-6 rounded-lg border-l-4 border-[#e5c4c4]">
              <p className="text-[#555] leading-relaxed">
                {studio.pricingPlan}
              </p>
            </div>
          </section>

          {/* Facilities & Services */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-[#c09090]">
              設備・サービス
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 bg-[#fdfbf8] p-6 rounded-lg">
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasTrialLesson ? "text-[#d4a5a5]" : "text-[#ccc]"}`}
                >
                  {studio.hasTrialLesson ? "✓" : "✗"}
                </span>
                <span className="text-sm text-[#555]">体験レッスン</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasUnlimitedPlan ? "text-[#d4a5a5]" : "text-[#ccc]"}`}
                >
                  {studio.hasUnlimitedPlan ? "✓" : "✗"}
                </span>
                <span className="text-sm text-[#555]">通い放題</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasMachine ? "text-[#d4a5a5]" : "text-[#ccc]"}`}
                >
                  {studio.hasMachine ? "✓" : "✗"}
                </span>
                <span className="text-sm text-[#555]">マシン</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasOnlineSupport ? "text-[#d4a5a5]" : "text-[#ccc]"}`}
                >
                  {studio.hasOnlineSupport ? "✓" : "✗"}
                </span>
                <span className="text-sm text-[#555]">オンライン対応</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasLocker ? "text-[#d4a5a5]" : "text-[#ccc]"}`}
                >
                  {studio.hasLocker ? "✓" : "✗"}
                </span>
                <span className="text-sm text-[#555]">ロッカー</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.hasShower ? "text-[#d4a5a5]" : "text-[#ccc]"}`}
                >
                  {studio.hasShower ? "✓" : "✗"}
                </span>
                <span className="text-sm text-[#555]">シャワー</span>
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-2 ${studio.allowsMale ? "text-[#d4a5a5]" : "text-[#ccc]"}`}
                >
                  {studio.allowsMale ? "✓" : "✗"}
                </span>
                <span className="text-sm text-[#555]">男性利用可</span>
              </div>
            </div>
          </section>

          {/* Location */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-[#c09090]">
              アクセス
            </h2>
            <div className="space-y-3 bg-[#fdfbf8] p-6 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#8b6f6f]">住所</p>
                <p className="text-[#555] mt-1">{studio.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#8b6f6f]">最寄駅</p>
                <p className="text-[#555] mt-1">{studio.nearestStation}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#8b6f6f]">エリア</p>
                <p className="text-[#555] mt-1">{studio.area}</p>
              </div>
            </div>
          </section>

          {/* Business Hours */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-[#c09090]">
              営業時間
            </h2>
            <div className="bg-[#fdfbf8] p-6 rounded-lg">
              <p className="text-[#555]">{studio.businessHours}</p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-8">
            <h2 className="mb-4 text-xl font-semibold text-[#c09090]">
              お問い合わせ
            </h2>
            <div className="space-y-3 bg-[#fdfbf8] p-6 rounded-lg">
              <div>
                <p className="text-sm font-medium text-[#8b6f6f]">電話番号</p>
                <p className="text-[#555] mt-1">{studio.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#8b6f6f]">公式サイト</p>
                <a
                  href={studio.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4a5a5] hover:text-[#c09090] transition-colors mt-1 inline-block"
                >
                  {studio.officialWebsite}
                </a>
              </div>
            </div>
          </section>

          {/* Back to list button */}
          <div className="mt-8 border-t border-[#f0e4d7] pt-6">
            <Link
              href="/"
              className="inline-block rounded-full bg-[#d4a5a5] px-12 py-4 text-white font-semibold transition-all hover:bg-[#c09090] shadow-sm hover:shadow-md"
            >
              一覧に戻る
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

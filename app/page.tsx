import Link from "next/link";
import { pilatesStudios } from "./data/studios";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[#d4a5a5]">
            全国のピラティス教室
          </h1>
          <p className="mt-2 text-sm text-[#666]">
            全国のピラティススタジオ情報を検索できます
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {pilatesStudios.map((studio) => (
            <Link
              key={studio.id}
              href={`/studio/${studio.id}`}
              className="block rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-[#c09090]">
                {studio.name}
              </h2>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-[#555]">
                  <span className="font-medium text-[#8b6f6f]">住所:</span>{" "}
                  {studio.address}
                </p>
                <p className="text-sm text-[#555]">
                  <span className="font-medium text-[#8b6f6f]">電話:</span>{" "}
                  {studio.phone}
                </p>
                <p className="mt-3 text-sm text-[#666] leading-relaxed">
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

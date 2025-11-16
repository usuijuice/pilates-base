import Link from "next/link";
import { pilatesStudios } from "./data/studios";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="sticky top-0 z-10 bg-white shadow-sm dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            全国のピラティス教室
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            全国のピラティススタジオ情報を検索できます
          </p>
          <div className="mt-4">
            <Link
              href="/stations"
              className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              最寄駅別で探す
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          {pilatesStudios.map((studio) => (
            <Link
              key={studio.id}
              href={`/studio/${studio.id}`}
              className="block rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-800"
            >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {studio.name}
              </h2>
              <div className="mt-4 space-y-2">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium">住所:</span> {studio.address}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium">電話:</span> {studio.phone}
                </p>
                <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-300">
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

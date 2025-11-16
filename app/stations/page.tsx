import Link from "next/link";
import { pilatesStudios } from "@/app/data/studios";

export default function StationsPage() {
  // Extract station name from nearestStation field (e.g., "渋谷駅徒歩5分" -> "渋谷駅")
  const extractStationName = (nearestStation: string): string => {
    const match = nearestStation.match(/^(.+駅)/);
    return match ? match[1] : nearestStation;
  };

  // Group studios by station
  const studiosByStation = pilatesStudios.reduce(
    (acc, studio) => {
      const stationName = extractStationName(studio.nearestStation);
      if (!acc[stationName]) {
        acc[stationName] = [];
      }
      // Limit to 5 studios per station
      if (acc[stationName].length < 5) {
        acc[stationName].push(studio);
      }
      return acc;
    },
    {} as Record<string, typeof pilatesStudios>,
  );

  // Sort stations alphabetically
  const sortedStations = Object.keys(studiosByStation).sort();

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
            最寄駅別スタジオ一覧
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            各駅ごとに最大5件のスタジオを表示しています
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          {sortedStations.map((stationName) => (
            <section key={stationName}>
              <h2 className="mb-4 text-2xl font-semibold text-zinc-900 dark:text-white">
                {stationName}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {studiosByStation[stationName].map((studio) => (
                  <Link
                    key={studio.id}
                    href={`/studio/${studio.id}`}
                    className="block rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-800"
                  >
                    <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {studio.name}
                    </h3>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium">最寄駅:</span>{" "}
                        {studio.nearestStation}
                      </p>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        <span className="font-medium">住所:</span>{" "}
                        {studio.address}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

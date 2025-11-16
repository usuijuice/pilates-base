import Link from "next/link";
import { pilatesStudios } from "@/app/data/studios";

export default function StationsPage() {
  // Extract station name from nearestStation field (e.g., "渋谷駅徒歩5分" -> "渋谷駅")
  const extractStationName = (nearestStation: string): string => {
    const match = nearestStation.match(/^(.+駅)/);
    return match ? match[1] : nearestStation;
  };

  // Helper function to convert station name to URL-friendly ID
  const stationNameToId = (stationName: string): string => {
    return stationName.replace(/駅$/, "");
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
            駅を選択してスタジオを表示
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedStations.map((stationName) => (
            <Link
              key={stationName}
              href={`/station/${stationNameToId(stationName)}`}
              className="block rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-800"
            >
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                {stationName}
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {studiosByStation[stationName].length}件のスタジオ
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

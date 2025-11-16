import Link from "next/link";
import { notFound } from "next/navigation";
import { pilatesStudios } from "@/app/data/studios";

interface PageProps {
  params: Promise<{ stationId: string }>;
}

// Helper function to extract station name from nearestStation field
const extractStationName = (nearestStation: string): string => {
  const match = nearestStation.match(/^(.+駅)/);
  return match ? match[1] : nearestStation;
};

// Helper function to convert station name to URL-friendly ID
const stationNameToId = (stationName: string): string => {
  // Remove "駅" suffix for cleaner URLs
  return stationName.replace(/駅$/, "");
};

// Helper function to convert URL ID back to station name
const stationIdToName = (stationId: string): string | null => {
  // Get all unique stations
  const stations = Array.from(
    new Set(
      pilatesStudios.map((studio) => extractStationName(studio.nearestStation)),
    ),
  );

  // Find matching station by adding back "駅" suffix
  const stationNameWithSuffix = `${stationId}駅`;
  return stations.includes(stationNameWithSuffix)
    ? stationNameWithSuffix
    : null;
};

// Generate static params for all stations
export async function generateStaticParams() {
  const stations = Array.from(
    new Set(
      pilatesStudios.map((studio) => extractStationName(studio.nearestStation)),
    ),
  );

  return stations.map((station) => ({
    stationId: stationNameToId(station),
  }));
}

export default async function StationPage({ params }: PageProps) {
  const { stationId: encodedStationId } = await params;
  // Decode the URL-encoded station ID
  const stationId = decodeURIComponent(encodedStationId);
  const stationName = stationIdToName(stationId);

  if (!stationName) {
    notFound();
  }

  // Get studios for this station (limit to 5)
  const studiosForStation = pilatesStudios
    .filter(
      (studio) => extractStationName(studio.nearestStation) === stationName,
    )
    .slice(0, 5);

  if (studiosForStation.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="sticky top-0 z-10 bg-white shadow-sm dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            href="/stations"
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← 駅一覧に戻る
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-white">
            {stationName}のスタジオ
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            {studiosForStation.length}件のスタジオ
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {studiosForStation.map((studio) => (
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
                  <span className="font-medium">最寄駅:</span>{" "}
                  {studio.nearestStation}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium">住所:</span> {studio.address}
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

// Mock data for Pilates studios
const pilatesStudios = [
  {
    id: 1,
    name: "ピラティススタジオ 東京本店",
    address: "東京都渋谷区渋谷1-2-3",
    phone: "03-1234-5678",
    description:
      "初心者から上級者まで、丁寧な指導で人気のピラティススタジオです。",
  },
  {
    id: 2,
    name: "Zen Pilates 大阪",
    address: "大阪府大阪市北区梅田2-4-5",
    phone: "06-9876-5432",
    description: "マットピラティスとマシンピラティスの両方が楽しめるスタジオ。",
  },
  {
    id: 3,
    name: "ピラティスラボ 横浜",
    address: "神奈川県横浜市西区みなとみらい3-6-1",
    phone: "045-123-4567",
    description: "パーソナルトレーニングに特化したプライベートスタジオ。",
  },
  {
    id: 4,
    name: "Body & Mind Pilates 名古屋",
    address: "愛知県名古屋市中区栄4-5-6",
    phone: "052-234-5678",
    description: "ヨガとピラティスを融合したユニークなクラスが人気。",
  },
  {
    id: 5,
    name: "ピラティススタジオ 福岡天神",
    address: "福岡県福岡市中央区天神2-3-4",
    phone: "092-345-6789",
    description: "リフォーマーを使った本格的なピラティスが体験できます。",
  },
  {
    id: 6,
    name: "Core Balance Pilates 札幌",
    address: "北海道札幌市中央区大通西5-7-8",
    phone: "011-456-7890",
    description: "体幹トレーニングに重点を置いたプログラムが充実。",
  },
  {
    id: 7,
    name: "ピラティスハウス 仙台",
    address: "宮城県仙台市青葉区一番町3-2-1",
    phone: "022-567-8901",
    description: "少人数制のグループレッスンで丁寧な指導が受けられます。",
  },
  {
    id: 8,
    name: "Urban Pilates 神戸",
    address: "兵庫県神戸市中央区三宮町1-4-5",
    phone: "078-678-9012",
    description: "都会的な雰囲気の中で最新のピラティスメソッドを提供。",
  },
  {
    id: 9,
    name: "ピラティスアンドウェルネス 京都",
    address: "京都府京都市下京区四条通烏丸東入ル",
    phone: "075-789-0123",
    description: "伝統とモダンが融合した落ち着いた空間でピラティスを。",
  },
  {
    id: 10,
    name: "Flow Pilates 広島",
    address: "広島県広島市中区紙屋町2-6-7",
    phone: "082-890-1234",
    description: "流れるような動きを重視したフロースタイルのピラティス。",
  },
];

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
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pilatesStudios.map((studio) => (
            <div
              key={studio.id}
              className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:bg-zinc-800"
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
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

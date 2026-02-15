import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <nav>
            <Link
              href="/privacy-policy"
              className="text-sm text-stone-600 hover:text-rose-400 transition-colors"
            >
              プライバシーポリシー
            </Link>
          </nav>
          <p className="text-sm text-stone-500">&copy; 2026 Pilates Base</p>
        </div>
      </div>
    </footer>
  );
}

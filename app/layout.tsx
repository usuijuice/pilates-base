import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import { Footer } from "@/components/footer";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

function getMetadataBase() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const candidate =
    envUrl && envUrl.length > 0 ? envUrl : "http://localhost:3000";

  try {
    return new URL(candidate);
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: "全国のピラティス教室 | Pilates Base",
  description: "全国のピラティス教室・スタジオ情報を検索できるサイトです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased font-sans`}>
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}

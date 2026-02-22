import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pilates Base",
    short_name: "Pilates Base",
    description: "全国のピラティス教室・スタジオ情報を検索できるサイトです。",
    start_url: "/",
    display: "standalone",
    lang: "ja",
    icons: [
      { src: "/favicon.ico", type: "image/x-icon", sizes: "any" },
      { src: "/pilates.svg", type: "image/svg+xml", sizes: "any" },
    ],
  };
}

import type { MetadataRoute } from "next";
import {
  getAllAreaSlugs,
  getAllPrefCityAreaSlugs,
  getAllStudios,
} from "@/lib/studios";

function getBaseUrl() {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const baseUrl =
    envUrl && envUrl.length > 0 ? envUrl : "http://localhost:3000";
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function toAbsoluteUrl(baseUrl: string, path: string) {
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();

  const [studios, recommendAreaSlugs, areaSlugs] = await Promise.all([
    getAllStudios(),
    getAllAreaSlugs(),
    getAllPrefCityAreaSlugs(),
  ]);

  const paths = new Set<string>(["/", "/privacy-policy"]);

  studios.forEach((studio) => {
    paths.add(`/studio/${studio.slug}`);
  });

  recommendAreaSlugs.forEach((slug) => {
    paths.add(`/recommend/${slug}`);
  });

  areaSlugs.forEach(({ prefSlug, citySlug, areaSlug }) => {
    paths.add(`/area/${prefSlug}/${citySlug}/${areaSlug}`);
  });

  const lastModified = new Date();

  return Array.from(paths).map((path) => ({
    url: toAbsoluteUrl(baseUrl, path),
    lastModified,
  }));
}

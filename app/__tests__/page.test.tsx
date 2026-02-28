import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Page from "../page";

const mockStudios = [
  {
    slug: "test-studio",
    name: "テストスタジオ",
    area_slug: "shibuya",
    address: "東京都渋谷区道玄坂1-1-1",
    nearest_station: "渋谷駅",
    phone: "03-1234-5678",
    description: "テスト用のスタジオです",
    pricing_plan: "月額10,000円",
    has_trial_lesson: true,
    has_unlimited_plan: true,
    has_machine: true,
    has_online_support: true,
    has_locker: true,
    has_shower: true,
    allows_male: true,
    features: [],
    business_hours: "09:00-21:00",
    official_website: "https://example.com",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    area: "渋谷",
  },
];

const mockPrefectures = [
  {
    name: "東京都",
    slug: "tokyo",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

const mockMunicipalities = [
  {
    name: "渋谷区",
    slug: "shibuya",
    prefecture_slug: "tokyo",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

const mockAreas = [
  {
    name: "笹塚",
    slug: "sasazuka",
    municipality_slug: "shibuya",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

vi.mock("@/lib/studios", () => ({
  getAllStudios: vi.fn(() => Promise.resolve(mockStudios)),
  getAllPrefectures: vi.fn(() => Promise.resolve(mockPrefectures)),
  getAllMunicipalities: vi.fn(() => Promise.resolve(mockMunicipalities)),
  getAllAreas: vi.fn(() => Promise.resolve(mockAreas)),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("ホームページ", async () => {
  render(await Page());

  it("タイトルと説明文を表示する", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: "全国のピラティス教室" }),
    ).toBeDefined();
    expect(
      screen.getByText("全国のピラティススタジオ情報を検索できます"),
    ).toBeDefined();
  });

  it("スタジオ情報を表示する", () => {
    expect(screen.getByText(mockStudios[0].name)).toBeDefined();
    expect(screen.getByText(mockStudios[0].address)).toBeDefined();
    expect(screen.getByText(mockStudios[0].phone)).toBeDefined();
    expect(screen.getByText(mockStudios[0].description)).toBeDefined();
  });
});

import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import Page from "../page";

const mockStudios = [
  {
    slug: "test-studio",
    name: "テストスタジオ",
    area_slug: "sasazuka",
    address: "東京都渋谷区笹塚1-1-1",
    nearest_station: "笹塚駅",
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
    area: "笹塚",
  },
];

const mockPrefectures = [
  {
    slug: "tokyo",
    name: "東京都",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

const mockMunicipalities = [
  {
    slug: "shibuya",
    name: "渋谷区",
    prefecture_slug: "tokyo",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

const mockAreas = [
  {
    slug: "sasazuka",
    name: "笹塚",
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

describe("ホームページ", () => {
  beforeAll(async () => {
    render(await Page());
  });

  it("タイトルと説明文を表示する", () => {
    expect(
      screen.getByRole("heading", { level: 1, name: "全国のピラティス教室" }),
    ).toBeDefined();
    expect(
      screen.getByText("全国のピラティススタジオ情報を検索できます"),
    ).toBeDefined();
  });

  it("スタジオ情報を表示する", () => {
    expect(
      screen.getByRole("link", {
        name: `${mockStudios[0].name} 住所: ${mockStudios[0].address} 電話: ${mockStudios[0].phone} ${mockStudios[0].description}`,
      }),
    ).toBeDefined();
    expect(
      screen.getByRole("heading", { level: 2, name: mockStudios[0].name }),
    ).toBeDefined();
    expect(screen.getByText(mockStudios[0].address)).toBeDefined();
    expect(screen.getByText(mockStudios[0].phone)).toBeDefined();
    expect(screen.getByText(mockStudios[0].description)).toBeDefined();
  });
});

import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Page from "../page";

const makeStudio = (i: number) => ({
  slug: `test-studio-${i}`,
  name: `テストスタジオ${i}`,
  address: `東京都渋谷区${i}-1-1`,
  phone: `03-0000-000${i}`,
  description: `テスト用のスタジオ${i}です`,
  area: "渋谷",
  allows_male: true,
  area_slug: "shibuya",
  business_hours: "09:00-21:00",
  created_at: "2023-01-01T00:00:00Z",
  features: [`特徴${i}`],
  has_locker: true,
  has_machine: true,
  has_online_support: true,
  has_shower: true,
  has_trial_lesson: true,
  has_unlimited_plan: true,
  nearest_station: "渋谷駅",
  official_website: `https://example-${i}.com`,
  pricing_plan: `月額${i}0,000円`,
  updated_at: "2023-01-01T00:00:00Z",
});

const mockArea = {
  created_at: "2023-01-01T00:00:00Z",
  municipality_slug: "shibuya",
  name: "渋谷",
  slug: "shibuya-area",
  updated_at: "2023-01-01T00:00:00Z",
};

vi.mock("@/lib/studios", () => ({
  getAllAreaSlugs: vi.fn(() => Promise.resolve(["shibuya-area"])),
  getAreaBySlug: vi.fn(() => Promise.resolve(mockArea)),
  getStudiosByAreaSlug: vi.fn(() =>
    Promise.resolve([1, 2, 3, 4, 5, 6, 7].map(makeStudio)),
  ),
}));

vi.mock("next/navigation", () => ({
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

test("recommend page renders at most 5 studios", async () => {
  const jsx = await Page({
    params: Promise.resolve({ slug: "shibuya-area" }),
  });
  render(jsx);

  // Verify the 5th studio is displayed
  expect(screen.getByText("テストスタジオ5")).toBeDefined();

  // Verify the 6th studio is NOT displayed
  expect(screen.queryByText("テストスタジオ6")).toBeNull();

  // Verify ranking positions 1-5 are shown
  expect(screen.getByText("1位：テストスタジオ1")).toBeDefined();
  expect(screen.getByText("5位：テストスタジオ5")).toBeDefined();
});

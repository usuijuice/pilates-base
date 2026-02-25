import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Page from "../page";

// Mock data for studios
const mockStudios = [
  {
    slug: "test-studio-1",
    name: "テストスタジオ",
    address: "東京都渋谷区道玄坂1-1-1",
    phone: "03-1234-5678",
    description: "テスト用のスタジオです",
    area: "渋谷",
    allows_male: true,
    area_slug: "shibuya",
    business_hours: "09:00-21:00",
    created_at: "2023-01-01T00:00:00Z",
    features: [],
    has_locker: true,
    has_machine: true,
    has_online_support: true,
    has_shower: true,
    has_trial_lesson: true,
    has_unlimited_plan: true,
    nearest_station: "渋谷駅",
    official_website: "https://example.com",
    pricing_plan: "月額10,000円",
    updated_at: "2023-01-01T00:00:00Z",
  },
];

const mockPrefectures = [
  {
    created_at: "2023-01-01T00:00:00Z",
    name: "東京都",
    slug: "tokyo",
    updated_at: "2023-01-01T00:00:00Z",
  },
];

const mockMunicipalities = [
  {
    created_at: "2023-01-01T00:00:00Z",
    name: "渋谷区",
    prefecture_slug: "tokyo",
    slug: "shibuya",
    updated_at: "2023-01-01T00:00:00Z",
  },
];

const mockAreas = [
  {
    created_at: "2023-01-01T00:00:00Z",
    municipality_slug: "shibuya",
    name: "渋谷",
    slug: "shibuya-area",
    updated_at: "2023-01-01T00:00:00Z",
  },
];

// Mock lib/studios functions
vi.mock("@/lib/studios", () => ({
  getAllStudios: vi.fn(() => Promise.resolve(mockStudios)),
  getAllPrefectures: vi.fn(() => Promise.resolve(mockPrefectures)),
  getAllMunicipalities: vi.fn(() => Promise.resolve(mockMunicipalities)),
  getAllAreas: vi.fn(() => Promise.resolve(mockAreas)),
}));

// Mock AreaNavigator component
vi.mock("@/components/area-navigator", () => ({
  AreaNavigator: () => <div data-testid="area-navigator">Area Navigator</div>,
}));

test("Page renders with mocked studio data", async () => {
  // Call async Server Component and get JSX
  const jsx = await Page();
  render(jsx);

  // Verify page title is displayed
  expect(
    screen.getByRole("heading", { level: 1, name: "全国のピラティス教室" }),
  ).toBeDefined();

  // Verify studio name is displayed
  expect(screen.getByText("テストスタジオ")).toBeDefined();

  // Verify studio information is displayed
  expect(screen.getByText("03-1234-5678")).toBeDefined();
  expect(screen.getByText("東京都渋谷区道玄坂1-1-1")).toBeDefined();
  expect(screen.getByText("テスト用のスタジオです")).toBeDefined();

  // Verify AreaNavigator is rendered
  expect(screen.getByTestId("area-navigator")).toBeDefined();
});

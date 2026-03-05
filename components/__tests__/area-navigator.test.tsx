import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AreaNavigator } from "../area-navigator";

const mockPush = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const prefectures = [
  {
    slug: "tokyo",
    name: "東京都",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    slug: "osaka",
    name: "大阪府",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

const municipalities = [
  {
    slug: "shibuya",
    name: "渋谷区",
    prefecture_slug: "tokyo",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
  {
    slug: "shinjuku",
    name: "新宿区",
    prefecture_slug: "tokyo",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

const areas = [
  {
    slug: "sasazuka",
    name: "笹塚",
    municipality_slug: "shibuya",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  },
];

describe("エリアナビゲーター", () => {
  beforeEach(() => {
    mockPush.mockClear();
    render(
      <AreaNavigator
        prefectures={prefectures}
        municipalities={municipalities}
        areas={areas}
      />,
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("ヘッダーを表示する", () => {
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "エリアからスタジオを探す",
      }),
    ).toBeDefined();
  });

  it("都道府県、市区町村、エリアのセレクトボックスを表示する", () => {
    expect(screen.getByRole("combobox", { name: "都道府県" })).toBeDefined();
    expect(screen.getByRole("combobox", { name: "市区町村" })).toBeDefined();
    expect(screen.getByRole("combobox", { name: "エリア" })).toBeDefined();
  });

  it("都道府県の選択肢を表示する", () => {
    expect(screen.getByRole("option", { name: "東京都" })).toBeDefined();
    expect(screen.getByRole("option", { name: "大阪府" })).toBeDefined();
  });

  it("初期状態で市区町村とエリアが無効になっている", () => {
    expect(
      screen
        .getByRole("combobox", { name: "市区町村" })
        .getAttribute("disabled"),
    ).toBeDefined();
    expect(
      screen.getByRole("combobox", { name: "エリア" }).getAttribute("disabled"),
    ).toBeDefined();
  });

  it("都道府県未選択時に市区町村とエリアのプレースホルダーを表示する", () => {
    expect(
      screen.getByRole("option", { name: "都道府県を先に選択してください" }),
    ).toBeDefined();
    expect(
      screen.getByRole("option", { name: "市区町村を先に選択してください" }),
    ).toBeDefined();
  });

  it("都道府県を選択すると市区町村が有効になりフィルタされた選択肢を表示する", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "tokyo" },
    });

    expect(
      screen
        .getByRole("combobox", { name: "市区町村" })
        .getAttribute("disabled"),
    ).toBeNull();
    expect(
      screen.getByRole("option", { name: "市区町村を選択してください" }),
    ).toBeDefined();
    expect(screen.getByRole("option", { name: "渋谷区" })).toBeDefined();
    expect(screen.getByRole("option", { name: "新宿区" })).toBeDefined();
  });

  it("該当する市区町村がない場合にプレースホルダーを表示する", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "osaka" },
    });

    expect(
      screen
        .getByRole("combobox", { name: "市区町村" })
        .getAttribute("disabled"),
    ).toBeDefined();
    expect(
      screen.getByRole("option", { name: "市区町村がありません" }),
    ).toBeDefined();
  });

  it("市区町村を選択するとエリアが有効になりフィルタされた選択肢を表示する", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "tokyo" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "市区町村" }), {
      target: { value: "shibuya" },
    });

    expect(
      screen.getByRole("combobox", { name: "エリア" }).getAttribute("disabled"),
    ).toBeNull();
    expect(
      screen.getByRole("option", { name: "エリアを選択してください" }),
    ).toBeDefined();
    expect(screen.getByRole("option", { name: "笹塚" })).toBeDefined();
  });

  it("該当するエリアがない場合にプレースホルダーを表示する", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "tokyo" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "市区町村" }), {
      target: { value: "shinjuku" },
    });

    expect(
      screen.getByRole("combobox", { name: "エリア" }).getAttribute("disabled"),
    ).toBeDefined();
    expect(
      screen.getByRole("option", { name: "エリアがありません" }),
    ).toBeDefined();
  });

  it("エリアを選択すると正しいURLにナビゲーションする", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "tokyo" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "市区町村" }), {
      target: { value: "shibuya" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "エリア" }), {
      target: { value: "sasazuka" },
    });

    expect(mockPush).toHaveBeenCalledWith("/area/tokyo/shibuya/sasazuka");
  });

  it("エリアを空文字に戻した場合ナビゲーションしない", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "tokyo" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "市区町村" }), {
      target: { value: "shibuya" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "エリア" }), {
      target: { value: "" },
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("都道府県を変更すると市区町村がリセットされる", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "tokyo" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "市区町村" }), {
      target: { value: "shibuya" },
    });

    expect(
      screen.queryByRole("option", { name: "渋谷区", selected: true }),
    ).not.toBeNull();

    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "osaka" },
    });

    expect(
      screen.queryByRole("option", { name: "渋谷区", selected: true }),
    ).toBeNull();
    expect(
      screen.getByRole("combobox", { name: "エリア" }).getAttribute("disabled"),
    ).toBeDefined();
  });

  it("都道府県を空文字に戻すと市区町村が無効になる", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "tokyo" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "" },
    });

    expect(
      screen
        .getByRole("combobox", { name: "市区町村" })
        .getAttribute("disabled"),
    ).toBeDefined();
    expect(
      screen.getByRole("option", { name: "都道府県を先に選択してください" }),
    ).toBeDefined();
  });

  it("市区町村を空文字に戻すとエリアが無効になる", () => {
    fireEvent.change(screen.getByRole("combobox", { name: "都道府県" }), {
      target: { value: "tokyo" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "市区町村" }), {
      target: { value: "shibuya" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: "市区町村" }), {
      target: { value: "" },
    });

    expect(
      screen.getByRole("combobox", { name: "エリア" }).getAttribute("disabled"),
    ).toBeDefined();
    expect(
      screen.getByRole("option", { name: "市区町村を先に選択してください" }),
    ).toBeDefined();
  });
});

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
  { slug: "tokyo", name: "東京都", created_at: "", updated_at: "" },
  { slug: "osaka", name: "大阪府", created_at: "", updated_at: "" },
];

const municipalities = [
  {
    slug: "shibuya",
    name: "渋谷区",
    prefecture_slug: "tokyo",
    created_at: "",
    updated_at: "",
  },
  {
    slug: "shinjuku",
    name: "新宿区",
    prefecture_slug: "tokyo",
    created_at: "",
    updated_at: "",
  },
];

const areas = [
  {
    slug: "sasazuka",
    name: "笹塚",
    municipality_slug: "shibuya",
    created_at: "",
    updated_at: "",
  },
];

function getPrefSelect() {
  return screen.getByRole("combobox", {
    name: "都道府県",
  }) as HTMLSelectElement;
}

function getMunicipalitySelect() {
  return screen.getByRole("combobox", {
    name: "市区町村",
  }) as HTMLSelectElement;
}

function getAreaSelect() {
  return screen.getByRole("combobox", {
    name: "エリア",
  }) as HTMLSelectElement;
}

describe("エリアナビゲーター", () => {
  afterEach(() => {
    cleanup();
  });

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

  it("ヘッダーを表示する", () => {
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "エリアからスタジオを探す",
      }),
    ).toBeDefined();
  });

  it("都道府県、市区町村、エリアのセレクトボックスを表示する", () => {
    expect(getPrefSelect()).toBeDefined();
    expect(getMunicipalitySelect()).toBeDefined();
    expect(getAreaSelect()).toBeDefined();
  });

  it("都道府県の選択肢を表示する", () => {
    expect(screen.getByText("東京都")).toBeDefined();
    expect(screen.getByText("大阪府")).toBeDefined();
  });

  it("初期状態で市区町村が無効になっている", () => {
    expect(getMunicipalitySelect().disabled).toBe(true);
  });

  it("初期状態でエリアが無効になっている", () => {
    expect(getAreaSelect().disabled).toBe(true);
  });

  it("都道府県未選択時に市区町村のプレースホルダーを表示する", () => {
    expect(screen.getByText("都道府県を先に選択してください")).toBeDefined();
  });

  it("市区町村未選択時にエリアのプレースホルダーを表示する", () => {
    expect(screen.getByText("市区町村を先に選択してください")).toBeDefined();
  });

  it("都道府県を選択すると市区町村が有効になりフィルタされた選択肢を表示する", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "tokyo" } });

    expect(getMunicipalitySelect().disabled).toBe(false);
    expect(screen.getByText("渋谷区")).toBeDefined();
    expect(screen.getByText("新宿区")).toBeDefined();
    expect(screen.getByText("市区町村を選択してください")).toBeDefined();
  });

  it("該当する市区町村がない場合にプレースホルダーを表示する", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "osaka" } });

    expect(getMunicipalitySelect().disabled).toBe(true);
    expect(screen.getByText("市区町村がありません")).toBeDefined();
  });

  it("市区町村を選択するとエリアが有効になりフィルタされた選択肢を表示する", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "tokyo" } });
    fireEvent.change(getMunicipalitySelect(), {
      target: { value: "shibuya" },
    });

    expect(getAreaSelect().disabled).toBe(false);
    expect(screen.getByText("笹塚")).toBeDefined();
    expect(screen.getByText("エリアを選択してください")).toBeDefined();
  });

  it("該当するエリアがない場合にプレースホルダーを表示する", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "tokyo" } });
    fireEvent.change(getMunicipalitySelect(), {
      target: { value: "shinjuku" },
    });

    expect(getAreaSelect().disabled).toBe(true);
    expect(screen.getByText("エリアがありません")).toBeDefined();
  });

  it("エリアを選択すると正しいURLにナビゲーションする", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "tokyo" } });
    fireEvent.change(getMunicipalitySelect(), {
      target: { value: "shibuya" },
    });
    fireEvent.change(getAreaSelect(), {
      target: { value: "sasazuka" },
    });

    expect(mockPush).toHaveBeenCalledWith("/area/tokyo/shibuya/sasazuka");
  });

  it("エリアを空文字に戻した場合ナビゲーションしない", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "tokyo" } });
    fireEvent.change(getMunicipalitySelect(), {
      target: { value: "shibuya" },
    });
    fireEvent.change(getAreaSelect(), { target: { value: "" } });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("都道府県を変更すると市区町村がリセットされる", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "tokyo" } });
    fireEvent.change(getMunicipalitySelect(), {
      target: { value: "shibuya" },
    });

    fireEvent.change(getPrefSelect(), { target: { value: "osaka" } });

    expect(getMunicipalitySelect().value).toBe("");
    expect(getAreaSelect().disabled).toBe(true);
  });

  it("都道府県を空文字に戻すと市区町村が無効になる", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "tokyo" } });
    fireEvent.change(getPrefSelect(), { target: { value: "" } });

    expect(getMunicipalitySelect().disabled).toBe(true);
    expect(screen.getByText("都道府県を先に選択してください")).toBeDefined();
  });

  it("市区町村を空文字に戻すとエリアが無効になる", () => {
    fireEvent.change(getPrefSelect(), { target: { value: "tokyo" } });
    fireEvent.change(getMunicipalitySelect(), {
      target: { value: "shibuya" },
    });
    fireEvent.change(getMunicipalitySelect(), { target: { value: "" } });

    expect(getAreaSelect().disabled).toBe(true);
    expect(screen.getByText("市区町村を先に選択してください")).toBeDefined();
  });
});

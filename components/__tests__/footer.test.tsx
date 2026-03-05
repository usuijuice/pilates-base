import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../footer";

describe("フッター", () => {
  render(<Footer />);

  it("各項目を表示する", () => {
    expect(screen.getByRole("contentinfo")).toBeDefined();
    expect(screen.getByRole("navigation")).toBeDefined();
    expect(
      screen.getByRole("link", { name: "プライバシーポリシー" }),
    ).toBeDefined();
    expect(screen.getByText("© 2026 Pilates Base")).toBeDefined();
  });
});

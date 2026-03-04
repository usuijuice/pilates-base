import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "../footer";

describe("フッター", () => {
  render(<Footer />);

  it("各項目を表示する", () => {
    expect(screen.getByText("プライバシーポリシー")).toBeDefined();
    expect(screen.getByText("© 2026 Pilates Base")).toBeDefined();
  });
});

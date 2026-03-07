import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://pilates-base.com/");
  await page.getByLabel("都道府県").selectOption("tokyo");
  await page.getByLabel("市区町村").selectOption("shibuya");
  await page.getByLabel("エリア").selectOption("sasazuka");
  await expect(
    page.getByRole("heading", { name: "笹塚のピラティススタジオ" }),
  ).toBeVisible();
});

import { expect, test } from "@playwright/test";

test.describe("商品フィルター機能", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/ch15-01-03/ex14");
  });

  test("初期状態ですべての商品が表示されている", async ({ page }) => {
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });

  test("食品を選択すると食品のみ表示される", async ({ page }) => {
    await page.getByTestId("select").selectOption("food");
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeHidden();
    await expect(page.getByTestId("stationery2")).toBeHidden();
  });

  test("文房具を選択すると文房具のみ表示される", async ({ page }) => {
    await page.getByTestId("select").selectOption("stationery");
    await expect(page.getByTestId("food1")).toBeHidden();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });

  test("すべてを選択すると全ての商品が再表示される", async ({ page }) => {
    await page.getByTestId("select").selectOption("stationery");
    await page.getByTestId("select").selectOption("all");
    await expect(page.getByTestId("food1")).toBeVisible();
    await expect(page.getByTestId("stationery1")).toBeVisible();
    await expect(page.getByTestId("stationery2")).toBeVisible();
  });
});

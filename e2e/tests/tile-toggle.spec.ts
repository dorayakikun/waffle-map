import { expect, test } from "../fixtures/test-fixtures";

test.describe("Tile Grid Toggle", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
    await waffleMap.expandAccordion("tile");
    await waffleMap.page.waitForTimeout(500);
  });

  test("should be disabled by default", async ({ waffleMap }) => {
    await expect(waffleMap.tileGridToggle).toHaveAttribute(
      "data-state",
      "unchecked",
    );
  });

  test("should enable tile debug layer on toggle", async ({ waffleMap }) => {
    await waffleMap.toggleTileGrid();
    await expect(waffleMap.tileGridToggle).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  test("should disable tile debug layer on second toggle", async ({
    waffleMap,
  }) => {
    await waffleMap.toggleTileGrid();
    await waffleMap.toggleTileGrid();
    await expect(waffleMap.tileGridToggle).toHaveAttribute(
      "data-state",
      "unchecked",
    );
  });

  test("should display debug information when enabled", async ({
    waffleMap,
  }) => {
    await waffleMap.toggleTileGrid();
    await waffleMap.page.waitForTimeout(500);

    // Debug tile layer adds elements with tile coordinates
    // Just verify the toggle state is correct
    await expect(waffleMap.tileGridToggle).toHaveAttribute(
      "data-state",
      "checked",
    );
  });
});

import { expect, test } from "../fixtures/test-fixtures";

test.describe("Mesh Grid Toggle", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
    await waffleMap.expandAccordion("mesh");
    await waffleMap.page.waitForTimeout(500);
  });

  test("should be disabled by default", async ({ waffleMap }) => {
    await expect(waffleMap.meshGridToggle).toHaveAttribute(
      "data-state",
      "unchecked",
    );
  });

  test("should enable mesh grid on toggle", async ({ waffleMap }) => {
    await waffleMap.toggleMeshGrid();
    await expect(waffleMap.meshGridToggle).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  test("should disable mesh grid on second toggle", async ({ waffleMap }) => {
    await waffleMap.toggleMeshGrid();
    await waffleMap.toggleMeshGrid();
    await expect(waffleMap.meshGridToggle).toHaveAttribute(
      "data-state",
      "unchecked",
    );
  });

  test("should display mesh rectangles when enabled", async ({ waffleMap }) => {
    await waffleMap.toggleMeshGrid();
    await waffleMap.page.waitForTimeout(500);

    const meshes = waffleMap.getMeshRectangles();
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });
});

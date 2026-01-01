import { expect, test } from "../fixtures/test-fixtures";

test.describe("Mesh Code Input", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
    await waffleMap.expandAccordion("meshcode");
    // Wait for accordion animation to complete
    await waffleMap.page.waitForTimeout(500);
  });

  test("should have dots as default separator", async ({ waffleMap }) => {
    await expect(waffleMap.separatorSelect).toHaveValue(".");
  });

  test("should switch separator to commas", async ({ waffleMap }) => {
    await waffleMap.separatorSelect.selectOption(",");
    await expect(waffleMap.separatorSelect).toHaveValue(",");
  });

  test("should display mesh for valid code with dots", async ({ waffleMap }) => {
    await waffleMap.inputMeshCodes("5339-35-97.5339-35-98");
    await waffleMap.page.waitForTimeout(500);

    const meshes = waffleMap.getMeshRectangles();
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display mesh for valid code with commas", async ({
    waffleMap,
  }) => {
    await waffleMap.separatorSelect.selectOption(",");
    await waffleMap.inputMeshCodes("5339-35-97,5339-35-98");
    await waffleMap.page.waitForTimeout(500);

    const meshes = waffleMap.getMeshRectangles();
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should show error for invalid mesh code", async ({ waffleMap }) => {
    await waffleMap.inputMeshCodes("invalid-code");
    await waffleMap.page.waitForTimeout(300);

    await expect(waffleMap.meshCodeErrorMessage).toBeVisible();
  });

  test("should update placeholder based on separator", async ({ waffleMap }) => {
    const initialPlaceholder =
      await waffleMap.meshCodeInput.getAttribute("placeholder");
    expect(initialPlaceholder).toContain(".");

    await waffleMap.separatorSelect.selectOption(",");

    const newPlaceholder =
      await waffleMap.meshCodeInput.getAttribute("placeholder");
    expect(newPlaceholder).toContain(",");
  });
});

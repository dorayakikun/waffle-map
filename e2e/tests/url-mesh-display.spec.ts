import { expect, test } from "../fixtures/test-fixtures";

test.describe("URL Mesh Display", () => {
  test("should display mesh when navigating to URL with comma-separated meshcodes", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97,5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(1000);

    // Check that user input meshes are displayed (green color)
    const meshes = waffleMap.page.locator('path[stroke="#4F46E5"]');
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display mesh when navigating to URL with dot-separated meshcodes", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97.5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(1000);

    // Check that user input meshes are displayed
    const meshes = waffleMap.page.locator('path[stroke="#4F46E5"]');
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should populate input field with meshcodes from URL", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97,5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(500);

    // Open Mesh Code accordion
    await waffleMap.expandAccordion("meshcode");

    // Check input field value
    await expect(waffleMap.meshCodeInput).toHaveValue("5339-35-97,5339-35-98");
  });

  test("should set separator based on URL format (comma)", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97,5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(500);

    // Open Mesh Code accordion
    await waffleMap.expandAccordion("meshcode");

    // Check separator is set to comma
    await expect(waffleMap.separatorSelect).toHaveValue(",");
  });

  test("should set separator based on URL format (dot)", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97.5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(500);

    // Open Mesh Code accordion
    await waffleMap.expandAccordion("meshcode");

    // Check separator is set to dot
    await expect(waffleMap.separatorSelect).toHaveValue(".");
  });

  test("should display single meshcode from URL", async ({ waffleMap }) => {
    await waffleMap.page.goto("/5339-35-97/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(1000);

    // Check that user input mesh is displayed
    const meshes = waffleMap.page.locator('path[stroke="#4F46E5"]');
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should work normally when navigating to root URL", async ({
    waffleMap,
  }) => {
    await waffleMap.goto();

    // Map should be visible
    await expect(waffleMap.mapContainer).toBeVisible();

    // No user input meshes should be displayed initially
    await waffleMap.expandAccordion("meshcode");
    await expect(waffleMap.meshCodeInput).toHaveValue("");
  });

  test("should fit map bounds to meshcode area", async ({ waffleMap }) => {
    await waffleMap.page.goto("/5339-35-97/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(1500);

    // Get the mesh rectangle position to verify it's visible
    const meshes = waffleMap.page.locator('path[stroke="#4F46E5"]');
    await expect(meshes.first()).toBeVisible();
  });
});

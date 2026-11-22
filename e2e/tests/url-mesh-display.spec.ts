import { expect, test } from "../fixtures/test-fixtures";
import { MESH_COLORS } from "../../src/theme/constants";

test.describe("URL Mesh Display", () => {
  test("should display mesh when navigating to URL with comma-separated meshcodes", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97,5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(1000);

    const meshes = waffleMap.page.locator(`path[stroke="${MESH_COLORS.userInput}"]`);
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should display mesh when navigating to URL with dot-separated meshcodes", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97.5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(1000);

    const meshes = waffleMap.page.locator(`path[stroke="${MESH_COLORS.userInput}"]`);
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should populate input field with meshcodes from URL", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97,5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(500);

    await waffleMap.expandAccordion("meshcode");

    await expect(waffleMap.meshCodeInput).toHaveValue("5339-35-97,5339-35-98");
  });

  test("should set separator based on URL format (comma)", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97,5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(500);

    await waffleMap.expandAccordion("meshcode");

    await expect(waffleMap.separatorSelect).toHaveValue(",");
  });

  test("should set separator based on URL format (dot)", async ({
    waffleMap,
  }) => {
    await waffleMap.page.goto("/5339-35-97.5339-35-98/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(500);

    await waffleMap.expandAccordion("meshcode");

    await expect(waffleMap.separatorSelect).toHaveValue(".");
  });

  test("should display single meshcode from URL", async ({ waffleMap }) => {
    await waffleMap.page.goto("/5339-35-97/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(1000);

    const meshes = waffleMap.page.locator(`path[stroke="${MESH_COLORS.userInput}"]`);
    const count = await meshes.count();
    expect(count).toBeGreaterThan(0);
  });

  test("should work normally when navigating to root URL", async ({
    waffleMap,
  }) => {
    await waffleMap.goto();

    await expect(waffleMap.mapContainer).toBeVisible();

    await waffleMap.expandAccordion("meshcode");
    await expect(waffleMap.meshCodeInput).toHaveValue("");
  });

  test("should fit map bounds to meshcode area", async ({ waffleMap }) => {
    await waffleMap.page.goto("/5339-35-97/");
    await waffleMap.mapContainer.waitFor({ state: "visible" });
    await waffleMap.page.waitForTimeout(1500);

    const meshes = waffleMap.page.locator(`path[stroke="${MESH_COLORS.userInput}"]`);
    await expect(meshes.first()).toBeVisible();
  });
});

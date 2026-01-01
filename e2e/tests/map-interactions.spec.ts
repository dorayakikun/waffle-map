import { expect, test } from "../fixtures/test-fixtures";

test.describe("Map Interactions", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
  });

  test("should render map container", async ({ waffleMap }) => {
    await expect(waffleMap.mapContainer).toBeVisible();
  });

  test("should have zoom controls visible", async ({ waffleMap }) => {
    const zoomIn = waffleMap.page.locator(".leaflet-control-zoom-in");
    const zoomOut = waffleMap.page.locator(".leaflet-control-zoom-out");

    await expect(zoomIn).toBeVisible();
    await expect(zoomOut).toBeVisible();
  });

  test("should zoom in with zoom control button", async ({ waffleMap }) => {
    const zoomIn = waffleMap.page.locator(".leaflet-control-zoom-in");

    // Click zoom in button
    await zoomIn.click();
    await waffleMap.page.waitForTimeout(500);

    // Map should still be functional
    await expect(waffleMap.mapContainer).toBeVisible();
  });

  test("should zoom out with zoom control button", async ({ waffleMap }) => {
    const zoomOut = waffleMap.page.locator(".leaflet-control-zoom-out");

    // Click zoom out button
    await zoomOut.click();
    await waffleMap.page.waitForTimeout(500);

    // Map should still be functional
    await expect(waffleMap.mapContainer).toBeVisible();
  });

  test("should pan map with drag", async ({ waffleMap }) => {
    const box = await waffleMap.mapContainer.boundingBox();
    if (!box) throw new Error("Map container not found");

    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    await waffleMap.page.mouse.move(centerX, centerY);
    await waffleMap.page.mouse.down();
    await waffleMap.page.mouse.move(centerX + 100, centerY + 100, { steps: 10 });
    await waffleMap.page.mouse.up();

    // Map should still be functional
    await expect(waffleMap.mapContainer).toBeVisible();
  });

  test("should display tile layer", async ({ waffleMap }) => {
    const tiles = waffleMap.page.locator(".leaflet-tile-loaded");
    await expect(tiles.first()).toBeVisible();
  });

  test("should display attribution", async ({ waffleMap }) => {
    const attribution = waffleMap.page.locator(".leaflet-control-attribution");
    await expect(attribution).toBeVisible();
    await expect(attribution).toContainText("OpenStreetMap");
  });
});

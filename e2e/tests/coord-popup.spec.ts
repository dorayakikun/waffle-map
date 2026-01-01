import { expect, test } from "../fixtures/test-fixtures";

test.describe("Coordinate Popup", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
  });

  test("should show popup on right-click", async ({ waffleMap }) => {
    await waffleMap.rightClickOnMap(400, 300);
    await waffleMap.waitForPopup();

    const popup = waffleMap.page.locator(".leaflet-popup");
    await expect(popup).toBeVisible();
  });

  test("should display scales in popup", async ({ waffleMap }) => {
    await waffleMap.rightClickOnMap(400, 300);
    await waffleMap.waitForPopup();

    const popup = waffleMap.page.locator(".leaflet-popup-content");
    await expect(popup).toContainText("Scales");
  });

  test("should display mesh codes for different scales", async ({
    waffleMap,
  }) => {
    await waffleMap.rightClickOnMap(400, 300);
    await waffleMap.waitForPopup();

    const popup = waffleMap.page.locator(".leaflet-popup-content");
    // Check for scale entries
    await expect(popup).toContainText("scale1:");
  });

  test("should close popup on map click", async ({ waffleMap }) => {
    await waffleMap.rightClickOnMap(400, 300);
    await waffleMap.waitForPopup();

    // Click elsewhere on the map
    await waffleMap.mapContainer.click({ position: { x: 200, y: 200 } });

    const popup = waffleMap.page.locator(".leaflet-popup");
    await expect(popup).not.toBeVisible();
  });
});

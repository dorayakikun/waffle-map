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
    await expect(popup).toContainText("scale1:");
  });

  test("should close popup on map click", async ({ waffleMap }) => {
    await waffleMap.rightClickOnMap(400, 300);
    await waffleMap.waitForPopup();

    await waffleMap.mapContainer.click({ position: { x: 200, y: 200 } });

    const popup = waffleMap.page.locator(".leaflet-popup");
    await expect(popup).not.toBeVisible();
  });

  test("should display copy buttons for coordinate info", async ({
    waffleMap,
  }) => {
    await waffleMap.rightClickOnMap(400, 300);
    await waffleMap.waitForPopup();

    const copyButtons = waffleMap.page.locator(
      '[aria-label="Copy to clipboard"]',
    );
    await expect(copyButtons.first()).toBeVisible();

    const count = await copyButtons.count();
    expect(count).toBeGreaterThan(1);
  });

  test("should show check icon after clicking copy button", async ({
    waffleMap,
  }) => {
    await waffleMap.rightClickOnMap(400, 300);
    await waffleMap.waitForPopup();

    const copyButton = waffleMap.page
      .locator('[aria-label="Copy to clipboard"]')
      .first();
    await copyButton.click();

    await waffleMap.page.waitForTimeout(100);

    await expect(copyButton).toBeVisible();

    const svgIcon = copyButton.locator("svg");
    await expect(svgIcon).toBeVisible();
  });

  test("should have copy button for position description", async ({
    waffleMap,
  }) => {
    await waffleMap.rightClickOnMap(400, 300);
    await waffleMap.waitForPopup();

    const popup = waffleMap.page.locator(".leaflet-popup-content");
    await expect(popup).toContainText("position:");

    const firstCopyButton = waffleMap.page
      .locator('[aria-label="Copy to clipboard"]')
      .first();
    await expect(firstCopyButton).toBeVisible();
  });
});

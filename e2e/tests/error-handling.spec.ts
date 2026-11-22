import { expect, test } from "../fixtures/test-fixtures";

test.describe("Error Handling", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
  });

  test("should handle empty marker input gracefully", async ({ waffleMap }) => {
    await waffleMap.expandAccordion("marker");
    await waffleMap.page.waitForTimeout(500);
    await waffleMap.putMarkerButton.click();

    await expect(waffleMap.markerErrorMessage).toBeVisible();
  });

  test("should handle non-numeric marker input", async ({ waffleMap }) => {
    await waffleMap.expandAccordion("marker");
    await waffleMap.page.waitForTimeout(500);
    await waffleMap.putMarker("abc,xyz");

    await expect(waffleMap.markerErrorMessage).toContainText("Invalid format for lat");
  });

  test("should handle malformed coordinate format", async ({ waffleMap }) => {
    await waffleMap.expandAccordion("marker");
    await waffleMap.page.waitForTimeout(500);
    await waffleMap.putMarker("35.6762");

    await expect(waffleMap.markerErrorMessage).toContainText("expected lat,lng");
  });

  test("should recover from error state", async ({ waffleMap }) => {
    await waffleMap.expandAccordion("marker");
    await waffleMap.page.waitForTimeout(500);

    await waffleMap.putMarker("invalid");
    await expect(waffleMap.markerErrorMessage).toBeVisible();

    await waffleMap.putMarker("35.6762,139.6503");

    const markers = waffleMap.getMapMarkers();
    await expect(markers).toHaveCount(1);
  });

  test("should handle rapid toggle clicks", async ({ waffleMap }) => {
    await waffleMap.expandAccordion("mesh");
    await waffleMap.page.waitForTimeout(500);

    await waffleMap.toggleMeshGrid();
    await waffleMap.toggleMeshGrid();
    await waffleMap.toggleMeshGrid();

    await expect(waffleMap.meshGridToggle).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  test("should handle switching sections", async ({ waffleMap }) => {
    await waffleMap.expandAccordion("marker");
    await waffleMap.page.waitForTimeout(500);
    await expect(waffleMap.markerInput).toBeVisible();

    await waffleMap.expandAccordion("meshcode");
    await waffleMap.page.waitForTimeout(500);
    await expect(waffleMap.meshCodeInput).toBeVisible();

    await waffleMap.expandAccordion("tile");
    await waffleMap.page.waitForTimeout(500);
    await expect(waffleMap.tileGridToggle).toBeVisible();
  });
});

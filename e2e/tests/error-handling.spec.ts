import { expect, test } from "../fixtures/test-fixtures";

test.describe("Error Handling", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
  });

  test("should handle empty marker input gracefully", async ({ waffleMap }) => {
    await waffleMap.expandAccordion("marker");
    await waffleMap.page.waitForTimeout(500);
    await waffleMap.putMarkerButton.click();

    // Should show error but not crash
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

    // Trigger error
    await waffleMap.putMarker("invalid");
    await expect(waffleMap.markerErrorMessage).toBeVisible();

    // Fix input - degree is default, so valid coords should work
    await waffleMap.putMarker("35.6762,139.6503");

    // Error should clear and marker should be added
    const markers = waffleMap.getMapMarkers();
    await expect(markers).toHaveCount(1);
  });

  test("should handle rapid toggle clicks", async ({ waffleMap }) => {
    await waffleMap.expandAccordion("mesh");
    await waffleMap.page.waitForTimeout(500);

    // Rapid toggle clicks
    await waffleMap.toggleMeshGrid();
    await waffleMap.toggleMeshGrid();
    await waffleMap.toggleMeshGrid();

    // Should end in checked state (odd number of clicks)
    await expect(waffleMap.meshGridToggle).toHaveAttribute(
      "data-state",
      "checked",
    );
  });

  test("should handle switching sections", async ({ waffleMap }) => {
    // Open marker section
    await waffleMap.expandAccordion("marker");
    await waffleMap.page.waitForTimeout(500);
    await expect(waffleMap.markerInput).toBeVisible();

    // Switch to mesh code section
    await waffleMap.expandAccordion("meshcode");
    await waffleMap.page.waitForTimeout(500);
    await expect(waffleMap.meshCodeInput).toBeVisible();

    // Switch to tile section
    await waffleMap.expandAccordion("tile");
    await waffleMap.page.waitForTimeout(500);
    await expect(waffleMap.tileGridToggle).toBeVisible();
  });
});

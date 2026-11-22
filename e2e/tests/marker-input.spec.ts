import { expect, test } from "../fixtures/test-fixtures";

test.describe("Marker Input", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
    await waffleMap.expandAccordion("marker");
    await waffleMap.page.waitForTimeout(500);
  });

  test("should display placeholder text", async ({ waffleMap }) => {
    await expect(waffleMap.markerInput).toBeVisible();
    await expect(waffleMap.markerInput).toHaveAttribute("placeholder", "lat,lng");
  });

  test("should add marker on valid input", async ({ waffleMap }) => {
    await waffleMap.putMarker("35.6762,139.6503");

    const markers = waffleMap.getMapMarkers();
    await expect(markers).toHaveCount(1);
  });

  test("should add multiple markers", async ({ waffleMap }) => {
    await waffleMap.putMarker("35.6762,139.6503");
    await waffleMap.putMarker("35.0116,135.7681");

    const markers = waffleMap.getMapMarkers();
    await expect(markers).toHaveCount(2);
  });

  test("should remove all markers", async ({ waffleMap }) => {
    await waffleMap.putMarker("35.6762,139.6503");

    await waffleMap.removeMarkersButton.click();

    const markers = waffleMap.getMapMarkers();
    await expect(markers).toHaveCount(0);
  });

  test("should show error for invalid format", async ({ waffleMap }) => {
    await waffleMap.putMarker("invalid");

    await expect(waffleMap.markerErrorMessage).toBeVisible();
    await expect(waffleMap.markerErrorMessage).toContainText("Invalid format");
  });

  test("should accept millisecond coordinates", async ({ waffleMap }) => {
    await waffleMap.selectUnit("millisec");
    await waffleMap.putMarker("128433000,502692000");

    const markers = waffleMap.getMapMarkers();
    await expect(markers).toHaveCount(1);
  });

  test("should display input and buttons in two rows (stacked layout)", async ({
    waffleMap,
  }) => {
    const inputBox = await waffleMap.markerInput.boundingBox();
    expect(inputBox).not.toBeNull();

    const putButtonBox = await waffleMap.putMarkerButton.boundingBox();
    expect(putButtonBox).not.toBeNull();

    expect(putButtonBox!.y).toBeGreaterThan(inputBox!.y + inputBox!.height - 10);
  });

  test("should have Put and Remove buttons on the same row", async ({
    waffleMap,
  }) => {
    const putButtonBox = await waffleMap.putMarkerButton.boundingBox();
    expect(putButtonBox).not.toBeNull();

    const removeButtonBox = await waffleMap.removeMarkersButton.boundingBox();
    expect(removeButtonBox).not.toBeNull();

    expect(Math.abs(putButtonBox!.y - removeButtonBox!.y)).toBeLessThan(5);
  });

  test("should have full-width input in stacked layout", async ({
    waffleMap,
  }) => {
    const inputBox = await waffleMap.markerInput.boundingBox();
    expect(inputBox).not.toBeNull();

    expect(inputBox!.width).toBeGreaterThan(100);
  });
});

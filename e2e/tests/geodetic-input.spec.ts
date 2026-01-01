import { expect, test } from "../fixtures/test-fixtures";

test.describe("Geodetic Input", () => {
  test.beforeEach(async ({ waffleMap }) => {
    await waffleMap.goto();
  });

  test("should have default unit as degree", async ({ waffleMap }) => {
    await expect(waffleMap.unitSelect).toHaveValue("degree");
  });

  test("should have default datum as WGS84", async ({ waffleMap }) => {
    await expect(waffleMap.datumSelect).toHaveValue("WGS84");
  });

  test("should switch unit to millisec", async ({ waffleMap }) => {
    await waffleMap.selectUnit("millisec");
    await expect(waffleMap.unitSelect).toHaveValue("millisec");
  });

  test("should switch datum to Tokyo", async ({ waffleMap }) => {
    await waffleMap.selectDatum("Tokyo");
    await expect(waffleMap.datumSelect).toHaveValue("Tokyo");
  });

  test("should persist selection after interaction", async ({ waffleMap }) => {
    await waffleMap.selectUnit("millisec");
    await waffleMap.selectDatum("Tokyo");

    // Interact with accordion
    await waffleMap.expandAccordion("marker");

    // Verify selections persist
    await expect(waffleMap.unitSelect).toHaveValue("millisec");
    await expect(waffleMap.datumSelect).toHaveValue("Tokyo");
  });
});

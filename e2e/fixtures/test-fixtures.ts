import { test as base, type Locator, type Page } from "@playwright/test";

export class WaffleMapPage {
  readonly page: Page;

  // Geodetic Input selectors
  readonly unitSelect: Locator;
  readonly datumSelect: Locator;

  // Marker Input selectors
  readonly markerInput: Locator;
  readonly putMarkerButton: Locator;
  readonly removeMarkersButton: Locator;
  readonly markerErrorMessage: Locator;

  // Mesh Code Input selectors
  readonly meshCodeInput: Locator;
  readonly separatorSelect: Locator;
  readonly meshCodeErrorMessage: Locator;

  // Toggle selectors
  readonly tileGridToggle: Locator;
  readonly meshGridToggle: Locator;

  // Accordion triggers
  readonly tileGridAccordion: Locator;
  readonly meshGridAccordion: Locator;
  readonly markerAccordion: Locator;
  readonly meshCodeAccordion: Locator;

  // Map container
  readonly mapContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    // Geodetic Input - using NativeSelect.Field (native <select> element)
    // First select is for unit, second is for datum
    this.unitSelect = page.locator("select").first();
    this.datumSelect = page.locator("select").nth(1);

    // Accordion triggers
    this.tileGridAccordion = page.getByRole("button", { name: "Tile Grid" });
    this.meshGridAccordion = page.getByRole("button", { name: "Mesh Grid" });
    this.markerAccordion = page.getByRole("button", { name: "Marker" });
    this.meshCodeAccordion = page.getByRole("button", { name: "Mesh Code" });

    // Marker Input - in Chakra UI 3, the id is on the input itself
    this.markerInput = page.locator("#markerInput");
    this.putMarkerButton = page.getByRole("button", { name: /Put/i });
    this.removeMarkersButton = page.getByRole("button", { name: /Remove/i });
    this.markerErrorMessage = page.locator("[data-part='error-text']").first();

    // Mesh Code Input - in Chakra UI 3, the id is on the input itself
    // Use data-part to distinguish between input and select with same id
    this.meshCodeInput = page.locator("input#meshCodeInput");
    this.separatorSelect = page.locator("select#meshCodeInput");
    this.meshCodeErrorMessage = page.locator("[data-part='error-text']").last();

    // Toggles - Chakra UI Switch with data-part="control"
    this.tileGridToggle = page.locator(
      "#tileToggle [data-part='root']",
    );
    this.meshGridToggle = page.locator(
      "#meshToggle [data-part='root']",
    );

    // Map
    this.mapContainer = page.locator(".leaflet-container");
  }

  async goto() {
    await this.page.goto("/");
    await this.mapContainer.waitFor({ state: "visible" });
    // Wait for tiles to start loading
    await this.page.waitForTimeout(1000);
  }

  async expandAccordion(section: "tile" | "mesh" | "marker" | "meshcode") {
    const accordionMap = {
      tile: this.tileGridAccordion,
      mesh: this.meshGridAccordion,
      marker: this.markerAccordion,
      meshcode: this.meshCodeAccordion,
    };
    await accordionMap[section].click();
    await this.page.waitForTimeout(300);
  }

  async selectUnit(unit: "degree" | "millisec") {
    await this.unitSelect.selectOption(unit);
  }

  async selectDatum(datum: "Tokyo" | "WGS84") {
    await this.datumSelect.selectOption(datum);
  }

  async putMarker(latLng: string) {
    await this.markerInput.fill(latLng);
    await this.putMarkerButton.click();
  }

  async inputMeshCodes(codes: string) {
    await this.meshCodeInput.fill(codes);
  }

  async toggleMeshGrid() {
    await this.meshGridToggle.click();
  }

  async toggleTileGrid() {
    await this.tileGridToggle.click();
  }

  async rightClickOnMap(x: number, y: number) {
    const box = await this.mapContainer.boundingBox();
    if (!box) throw new Error("Map container not found");
    await this.page.mouse.click(box.x + x, box.y + y, { button: "right" });
  }

  getMapMarkers(): Locator {
    return this.page.locator(".leaflet-marker-icon");
  }

  getMeshRectangles(): Locator {
    return this.page.locator(".leaflet-interactive[stroke]");
  }

  async waitForPopup() {
    await this.page.locator(".leaflet-popup").waitFor({ state: "visible" });
  }
}

export const test = base.extend<{ waffleMap: WaffleMapPage }>({
  waffleMap: async ({ page }, use) => {
    const waffleMap = new WaffleMapPage(page);
    await use(waffleMap);
  },
});

export { expect } from "@playwright/test";

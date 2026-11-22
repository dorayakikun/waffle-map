import { test as base, type Locator, type Page } from "@playwright/test";

export class WaffleMapPage {
  readonly page: Page;

  readonly unitSelect: Locator;
  readonly datumSelect: Locator;

  readonly markerInput: Locator;
  readonly putMarkerButton: Locator;
  readonly removeMarkersButton: Locator;
  readonly markerErrorMessage: Locator;

  readonly meshCodeInput: Locator;
  readonly separatorSelect: Locator;
  readonly meshCodeErrorMessage: Locator;

  readonly tileGridToggle: Locator;
  readonly meshGridToggle: Locator;

  readonly tileGridAccordion: Locator;
  readonly meshGridAccordion: Locator;
  readonly markerAccordion: Locator;
  readonly meshCodeAccordion: Locator;

  readonly mapContainer: Locator;

  constructor(page: Page) {
    this.page = page;

    this.unitSelect = page.locator("select").first();
    this.datumSelect = page.locator("select").nth(1);

    this.tileGridAccordion = page.getByRole("button", { name: "Tile Grid" });
    this.meshGridAccordion = page.getByRole("button", { name: "Mesh Grid" });
    this.markerAccordion = page.getByRole("button", { name: "Marker" });
    this.meshCodeAccordion = page.getByRole("button", { name: "Mesh Code" });

    this.markerInput = page.locator("#markerInput");
    this.putMarkerButton = page.getByRole("button", { name: /Put/i });
    this.removeMarkersButton = page.getByRole("button", { name: /Remove/i });
    this.markerErrorMessage = page.locator("[data-part='error-text']").first();

    this.meshCodeInput = page.locator("input#meshCodeInput");
    this.separatorSelect = page.locator("select#meshCodeSeparator");
    this.meshCodeErrorMessage = page.locator("[data-part='error-text']").last();

    this.tileGridToggle = page.locator(
      "#tileToggle [data-part='root']",
    );
    this.meshGridToggle = page.locator(
      "#meshToggle [data-part='root']",
    );

    this.mapContainer = page.locator(".leaflet-container");
  }

  async goto() {
    await this.page.goto("/");
    await this.mapContainer.waitFor({ state: "visible" });
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

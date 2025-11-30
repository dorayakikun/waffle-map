import { describe, it, expect, vi, afterEach } from "vitest";
import { replaceOgTags } from "../ogTransform";

describe("replaceOgTags", () => {
    const newUrl = "https://example.com/new-image.png";

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("should replace both og:image and twitter:image when present", () => {
        const html = `
      <html>
        <head>
          <meta property="og:image" content="old.png" />
          <meta name="twitter:image" content="old.png" />
        </head>
      </html>
    `;
        const result = replaceOgTags(html, newUrl);
        expect(result).toContain(`<meta property="og:image" content="${newUrl}" />`);
        expect(result).toContain(`<meta name="twitter:image" content="${newUrl}" />`);
    });

    it("should warn and skip if og:image is missing", () => {
        const consoleSpy = vi.spyOn(console, "warn");
        const html = `
      <html>
        <head>
          <meta name="twitter:image" content="old.png" />
        </head>
      </html>
    `;
        const result = replaceOgTags(html, newUrl);
        expect(result).toContain(`<meta name="twitter:image" content="${newUrl}" />`);
        expect(consoleSpy).toHaveBeenCalledWith("Warning: og:image meta tag not found in the HTML.");
    });

    it("should warn and skip if twitter:image is missing", () => {
        const consoleSpy = vi.spyOn(console, "warn");
        const html = `
      <html>
        <head>
          <meta property="og:image" content="old.png" />
        </head>
      </html>
    `;
        const result = replaceOgTags(html, newUrl);
        expect(result).toContain(`<meta property="og:image" content="${newUrl}" />`);
        expect(consoleSpy).toHaveBeenCalledWith("Warning: twitter:image meta tag not found in the HTML.");
    });

    it("should warn for both if both are missing", () => {
        const consoleSpy = vi.spyOn(console, "warn");
        const html = `<html><head></head></html>`;
        const result = replaceOgTags(html, newUrl);
        expect(result).toBe(html);
        expect(consoleSpy).toHaveBeenCalledWith("Warning: og:image meta tag not found in the HTML.");
        expect(consoleSpy).toHaveBeenCalledWith("Warning: twitter:image meta tag not found in the HTML.");
    });
});

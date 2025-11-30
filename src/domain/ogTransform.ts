/**
 * Replaces the content of og:image and twitter:image meta tags in the HTML string.
 * This function assumes that the input HTML contains these tags.
 * If a tag is missing, it logs a warning and skips the replacement for that tag.
 *
 * @param html The original HTML string.
 * @param newUrl The new URL to set for the image tags.
 * @returns The modified HTML string.
 */
export const replaceOgTags = (html: string, newUrl: string): string => {
    let updatedHtml = html;

    // Check and replace og:image
    const ogImageRegex = /<meta property="og:image" content="[^"]*"\s*\/?>/;
    if (ogImageRegex.test(updatedHtml)) {
        updatedHtml = updatedHtml.replace(
            ogImageRegex,
            `<meta property="og:image" content="${newUrl}" />`
        );
    } else {
        console.warn("Warning: og:image meta tag not found in the HTML.");
    }

    // Check and replace twitter:image
    const twitterImageRegex = /<meta name="twitter:image" content="[^"]*"\s*\/?>/;
    if (twitterImageRegex.test(updatedHtml)) {
        updatedHtml = updatedHtml.replace(
            twitterImageRegex,
            `<meta name="twitter:image" content="${newUrl}" />`
        );
    } else {
        console.warn("Warning: twitter:image meta tag not found in the HTML.");
    }

    return updatedHtml;
};

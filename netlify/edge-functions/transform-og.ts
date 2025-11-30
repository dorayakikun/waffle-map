import { Context } from "https://edge.netlify.com";

export default async (request: Request, context: Context) => {
    const url = new URL(request.url);
    const meshcodes = url.searchParams.get("meshcodes");

    // Get the response from the origin
    const response = await context.next();
    const page = await response.text();

    // If no meshcodes, return the original page
    if (!meshcodes) {
        return response;
    }

    // Construct the dynamic OGP image URL
    // We use the origin from the request to ensure it matches the deployed site
    const origin = url.origin;
    const ogImageUrl = `${origin}/.netlify/functions/og-image?meshcodes=${encodeURIComponent(meshcodes)}`;

    // Replace the static OGP tags with the dynamic ones
    // We use a regex to find the existing tags and replace their content
    const updatedPage = page
        .replace(
            /<meta property="og:image" content="[^"]*"\s*\/?>/,
            `<meta property="og:image" content="${ogImageUrl}" />`
        )
        .replace(
            /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
            `<meta name="twitter:image" content="${ogImageUrl}" />`
        );

    return new Response(updatedPage, response);
};

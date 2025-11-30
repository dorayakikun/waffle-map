import { Context } from "https://edge.netlify.com";
import { replaceOgTags } from "../../src/domain/ogTransform.ts";

export default async (request: Request, context: Context) => {
    const url = new URL(request.url);
    const meshcodes = url.searchParams.get("meshcodes");

    // If no meshcodes, return the original response immediately
    if (!meshcodes) {
        return context.next();
    }

    // Get the response from the origin
    const response = await context.next();
    const contentType = response.headers.get("content-type") || "";

    // If the response is not HTML, return it as is
    if (!contentType.includes("text/html")) {
        return response;
    }

    const page = await response.text();

    // Construct the dynamic OGP image URL
    // We use the origin from the request to ensure it matches the deployed site
    const origin = url.origin;
    const ogImageUrl = `${origin}/.netlify/functions/og-image?meshcodes=${encodeURIComponent(meshcodes)}`;

    // Replace the static OGP tags with the dynamic ones using the utility function
    const updatedPage = replaceOgTags(page, ogImageUrl);

    return new Response(updatedPage, response);
};

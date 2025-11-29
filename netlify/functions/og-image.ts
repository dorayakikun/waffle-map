import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
    const meshcodes = event.queryStringParameters?.meshcodes;

    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: { width: 1200, height: 630 },
        executablePath: await chromium.executablePath(),
        headless: (chromium as any).headless,
    });

    const page = await browser.newPage();

    // Replace with your actual deployed URL or a local test URL if applicable
    // For production, this should be the URL of the deployed site
    const baseUrl = process.env.URL || "http://localhost:8080";
    const url = meshcodes ? `${baseUrl}/?meshcodes=${meshcodes}` : baseUrl;

    await page.goto(url, {
        waitUntil: "networkidle0",
    });

    const screenshot = await page.screenshot({ type: "png", encoding: "base64" });

    await browser.close();

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "image/png",
        },
        body: screenshot as string,
        isBase64Encoded: true,
    };
};

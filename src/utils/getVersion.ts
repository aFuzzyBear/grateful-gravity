import puppeteer from 'puppeteer';

declare global {
  interface Window {
    jQuery?: { fn: { jquery: string } };
    $?: { fn: { jquery: string } };
  }
}

const launchOpts = process?.env.CHROMIUM_FLAGS
  ? { args: process?.env.CHROMIUM_FLAGS.split(/\s+/) }
  : {};

let browser
export async function checkForJQuery(url) {
  const sanitizeURL = !url.match(/http|https|www/g) ? new URL(`https://www.${url}`.toLowerCase()).toString() : new URL(url.toLowerCase()).toString()
  browser = await puppeteer.launch(launchOpts);
  const page = await browser.newPage();
  try {
    await page.goto(sanitizeURL, {
      timeout: 60000,
      waitUntil: "domcontentloaded"
    });

    // Evaluate the page to get jQuery version
    const jQueryVersion = await page.evaluate(() => {
      // Check if jQuery is defined and return its version
      return window.jQuery ? window.jQuery.fn.jquery : 'jQuery is not used';
    });
    console.log(`Does the site use jQuery?`, jQueryVersion);
    return jQueryVersion
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }

}


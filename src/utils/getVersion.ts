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
  
  function sanitizeURL(inputURL) {
    try {
      let url = new URL(inputURL);
      return url.toString(); // URL is valid and normalized
    } catch (error) {
      // Input is not a valid URL; attempt to prepend "http://" or "https://"
      try {
        let url = new URL(`https://${inputURL}`);
        return url.toString(); // Assume HTTPS if the scheme was missing
      } catch (error) {
        throw new Error('Invalid URL provided.');
      }
    }
  }
let browser
export async function checkForJQuery(url) {
  const cleanURL = sanitizeURL(url)
  browser = await puppeteer.launch(launchOpts);
  const page = await browser.newPage();
  try {
    await page.goto(cleanURL, {
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


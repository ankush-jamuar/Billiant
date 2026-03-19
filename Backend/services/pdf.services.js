import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";

export const generatePdfFromHtml = async (html) => {
  const isProduction = process.env.NODE_ENV === "production";

  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: isProduction
      ? await chromium.executablePath()
      : undefined,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
  });

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfUint8Array = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "40px", right: "30px", bottom: "40px", left: "30px" },
  });

  await browser.close();
  return Buffer.from(pdfUint8Array);
};
import puppeteer from "puppeteer";

export const generatePdfFromHtml = async (html) => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu"
    ]
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdfUint8Array = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "40px",
      right: "30px",
      bottom: "40px",
      left: "30px",
    },
  });

  await browser.close();

  return Buffer.from(pdfUint8Array);
};
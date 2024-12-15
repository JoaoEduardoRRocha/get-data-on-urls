const puppeteer = require("puppeteer");

async function scrapePage(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    const linkCheckoutSelector = 'a[href*="checkout"], a[href*="pay"]';
    const ticketSelector = "option, div, span, strong, p";
    const tecnologiaKeywords = {
      "wordpress/elementor": ["wp-content", "elementor"],
      atomicat: ["atomicat"],
      "greatsoftware/greatpages": ["greatsoftware", "greatpages"],
      clickfunnels: ["clickfunnels"],
      framer: ["framer"],
      webflow: ["webflow"],
    };

    const linkCheckout = await page
      .$eval(linkCheckoutSelector, (el) => el.href)
      .catch(() => "-");

    const ticket = await page.$$eval(ticketSelector, (elements) => {
      const regex = /R\$\s?\d{1,3}(?:\.\d{3})*(?:,\d{2})?/;
      for (const el of elements) {
        const text = el.textContent.trim();
        if (regex.test(text)) return text.match(regex)[0];
      }
      return "-";
    });

    const htmlContent = await page.content();
    let tecnologia = "Não identificado";
    for (const [name, keywords] of Object.entries(tecnologiaKeywords)) {
      if (keywords.some((term) => htmlContent.includes(term))) {
        tecnologia = name;
        break;
      }
    }

    await browser.close();

    return { linkCheckout, ticket, tecnologia };
  } catch (error) {
    console.error(`Erro ao processar ${url}:`, error);
    await browser.close();
    return { linkCheckout: "Erro", ticket: "Erro", tecnologia: "Erro" };
  }
}

module.exports = scrapePage;

const xlsx = require("xlsx");
const scrapePage = require("./scraper");

async function processExcel(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
  const colIndices = {
    dominio: 3, 
    link_checkout: 4,
    tecnologia: 6,
    ticket: 7,
  };
  for (let i = 5; i < data.length; i++) {
    const row = data[i];
    const url = row[colIndices.dominio];

    if (!url) continue; 
    try {
      const { linkCheckout, ticket, tecnologia } = await scrapePage(url);
      row[colIndices.link_checkout] = linkCheckout;
      row[colIndices.tecnologia] = tecnologia;
      row[colIndices.ticket] = ticket;
    } catch (error) {
      console.error(`Erro ao processar ${url}:`, error);
      row[colIndices.link_checkout] = "Erro";
      row[colIndices.tecnologia] = "Erro";
      row[colIndices.ticket] = "Erro";
    }
  }
  const updatedSheet = xlsx.utils.aoa_to_sheet(data);
  workbook.Sheets[sheetName] = updatedSheet;
  xlsx.writeFile(workbook, "PlanilhaDeDados_Atualizada.xlsx");
}

processExcel("PlanilhaDeDados.xlsx");

# **Web Scraper - Atualização de Planilha com Node.js**

Este projeto realiza **web scraping** em URLs de uma planilha Excel, coleta informações como tecnologias utilizadas nos sites, links de checkout e tickets médios, e atualiza os dados diretamente na planilha.

## **Funcionalidades**
1. Lê URLs da coluna **D** da planilha `PlanilhaDeDados.xlsx` (a partir da linha 6).
2. Realiza **web scraping** para:
   - Identificar **links de checkout**.
   - Extrair valores monetários (**tickets médios**) encontrados na página.
   - Detectar **tecnologias utilizadas** nos sites.
3. Atualiza a planilha com os resultados nas colunas:
   - **E**: `link_checkout`
   - **G**: `tecnologia`
   - **H**: `ticket`
4. Gera uma nova planilha atualizada: **`PlanilhaDeDados_Atualizada.xlsx`**.

---

## **Requisitos**
- **Node.js** (versão 16 ou superior recomendada).
- **NPM** (instalado junto com o Node.js).
- Planilha **`PlanilhaDeDados.xlsx`** contendo as URLs na coluna D.

---

## **Instalação**
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/web-scraper-nodejs.git
   
   cd web-scraper-nodejs

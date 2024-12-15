"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scraper_1 = __importDefault(require("./scraper"));
const XLSX = __importStar(require("xlsx"));
const fs = __importStar(require("fs"));
// 1. Leia o arquivo XLSX
const workbook = XLSX.readFile("PlanilhaDeDados.xlsx"); // Substitua pelo nome do seu arquivo
const sheetName = workbook.SheetNames[0];
const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
// 2. Extraia as URLs da coluna 'url_biblioteca' (ajuste o nome conforme sua planilha)
const urls = data.map((row) => row.url_biblioteca); // Ajuste o nome da coluna
// 3. Verifique se há URLs válidas na planilha
if (!urls || urls.length === 0) {
    console.error("Nenhuma URL foi encontrada na planilha. Verifique o arquivo e tente novamente.");
    process.exit(1); // Encerra o programa
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const results = [];
    // 4. Execute o scraping para cada URL
    for (const url of urls) {
        console.log(`Iniciando scraping para: ${url}`);
        const data = yield (0, scraper_1.default)(url);
        results.push(data);
    }
    // 5. Exiba os resultados no console
    console.log("Resultados do scraping:", results);
    // 6. Salve os resultados em um arquivo JSON
    fs.writeFileSync("resultados.json", JSON.stringify(results, null, 2), "utf-8");
    console.log("Resultados salvos no arquivo: resultados.json");
}))();

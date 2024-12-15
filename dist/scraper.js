"use strict";
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
const puppeteer_1 = __importDefault(require("puppeteer"));
function scrapePage(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const browser = yield puppeteer_1.default.launch({ headless: true });
        const page = yield browser.newPage();
        try {
            yield page.goto(url, { waitUntil: "domcontentloaded" });
            // Seletores (ajuste conforme a estrutura dos sites)
            const linkCheckoutSelector = 'a[href*="checkout"], a[href*="pay"], a.buy-now';
            const playerSelector = 'iframe[src*="youtube"], iframe[src*="vimeo"], .player';
            const tecnologiaSelector = 'meta[generator], footer, script[src]'; // Exemplo genérico
            const ticketSelector = '.price, .ticket'; // Exemplo genérico
            // Extração dos dados
            const linkCheckout = yield page.$eval(linkCheckoutSelector, el => el.href).catch(() => "Não encontrado");
            const player = yield page.$eval(playerSelector, el => el.tagName).catch(() => "Não encontrado");
            const tecnologia = yield page.$eval(tecnologiaSelector, el => el.outerHTML).catch(() => "Não encontrado");
            const ticket = yield page.$eval(ticketSelector, el => { var _a; return ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || ""; }).catch(() => "Não encontrado");
            return {
                url,
                linkCheckout,
                player,
                tecnologia,
                ticket,
            };
        }
        catch (error) {
            console.error(`Erro ao acessar ${url}:`, error);
            return { url, linkCheckout: "Erro", player: "Erro", tecnologia: "Erro", ticket: "Erro" };
        }
        finally {
            yield browser.close();
        }
    });
}
exports.default = scrapePage;

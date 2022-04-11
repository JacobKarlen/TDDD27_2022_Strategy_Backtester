import { KPI } from "../models/borsdata";

export const kpis: KPI[] = [
      {
        kpiId: 1,
        abbreviation: "DY",
        nameSv: "Direktavkastning",
        nameEn: "Dividend Yield",
        format: "%",
        isString: false
      },
      {
        kpiId: 2,
        abbreviation: "PE",
        nameSv: "P/E",
        nameEn: "P/E",
        format: null,
        isString: false
      },
      {
        kpiId: 3,
        abbreviation: "PS",
        nameSv: "P/S",
        nameEn: "P/S",
        format: null,
        isString: false
      },
      {
        kpiId: 4,
        abbreviation: "PB",
        nameSv: "P/B",
        nameEn: "P/B",
        format: null,
        isString: false
      },
      {
        kpiId: 5,
        abbreviation: "RPS",
        nameSv: "Omsättning/Aktie",
        nameEn: "Revenue/share",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 6,
        abbreviation: "EPS",
        nameSv: "Vinst/Aktie",
        nameEn: "Earnings/share",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 7,
        abbreviation: "DIV",
        nameSv: "Utdelning",
        nameEn: "Dividend",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 8,
        abbreviation: "BVPS",
        nameSv: "Eget Kapital/Aktie",
        nameEn: "Book value/share",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 9,
        abbreviation: "PEX",
        nameSv: "P/(E)x",
        nameEn: "P/(E)x",
        format: null,
        isString: false
      },
      {
        kpiId: 10,
        abbreviation: "EVEBIT",
        nameSv: "EV/EBIT",
        nameEn: "EV/EBIT",
        format: null,
        isString: false
      },
      {
        kpiId: 11,
        abbreviation: "EVEBITDA",
        nameSv: "EV/EBITDA",
        nameEn: "EV/EBITDA",
        format: null,
        isString: false
      },
      {
        kpiId: 12,
        abbreviation: "EVE",
        nameSv: "EV/E",
        nameEn: "EV/E",
        format: null,
        isString: false
      },
      {
        kpiId: 13,
        abbreviation: "EVFCF",
        nameSv: "EV/FCF",
        nameEn: "EV/FCF",
        format: null,
        isString: false
      },
      {
        kpiId: 15,
        abbreviation: "EVS",
        nameSv: "EV/S",
        nameEn: "EV/S",
        format: null,
        isString: false
      },
      {
        kpiId: 16,
        abbreviation: "EEV",
        nameSv: "E/EV (%)",
        nameEn: "E/EV (%)",
        format: "%",
        isString: false
      },
      {
        kpiId: 17,
        abbreviation: "EBITEV",
        nameSv: "EBIT/EV (%)",
        nameEn: "EBIT/EV (%)",
        format: "%",
        isString: false
      },
      {
        kpiId: 18,
        abbreviation: "PBtang",
        nameSv: "P/B-tang",
        nameEn: "P/B-tang",
        format: null,
        isString: false
      },
      {
        kpiId: 19,
        abbreviation: "PEG",
        nameSv: "PEG",
        nameEn: "PEG",
        format: null,
        isString: false
      },
      {
        kpiId: 20,
        abbreviation: "DIVPO",
        nameSv: "Utdelningsandel",
        nameEn: "Dividend Payout",
        format: null,
        isString: false
      },
      {
        kpiId: 21,
        abbreviation: "YOC",
        nameSv: "YieldOnCost",
        nameEn: "YieldOnCost",
        format: null,
        isString: false
      },
      {
        kpiId: 22,
        abbreviation: "TDY",
        nameSv: "Total Direktavkastning",
        nameEn: "Total dividend yield",
        format: null,
        isString: false
      },
      {
        kpiId: 23,
        abbreviation: "FCFPS",
        nameSv: "FCF / Aktie",
        nameEn: "FCF growth",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 24,
        abbreviation: "FCFM",
        nameSv: "FCF Marginal%",
        nameEn: "FCF margin%",
        format: "%",
        isString: false
      },
      {
        kpiId: 25,
        abbreviation: "CAPEX",
        nameSv: "Capex %",
        nameEn: "Capex %",
        format: "%",
        isString: false
      },
      {
        kpiId: 26,
        abbreviation: "DIVFCF",
        nameSv: "Utdelning/FCF",
        nameEn: "Dividend/FCF",
        format: "%",
        isString: false
      },
      {
        kpiId: 27,
        abbreviation: "EFCF",
        nameSv: "Vinst/FCF",
        nameEn: "Earnings/FCF",
        format: null,
        isString: false
      },
      {
        kpiId: 28,
        abbreviation: "GM",
        nameSv: "Bruttomarginal",
        nameEn: "Gross margin",
        format: "%",
        isString: false
      },
      {
        kpiId: 29,
        abbreviation: "OM",
        nameSv: "Rörelsemarginal",
        nameEn: "Operating margin",
        format: "%",
        isString: false
      },
      {
        kpiId: 30,
        abbreviation: "PM",
        nameSv: "Vinstmarginal",
        nameEn: "Profit margin",
        format: "%",
        isString: false
      },
      {
        kpiId: 31,
        nameSv: "FCF-marginal",
        nameEn: "FCF margin",
        format: "%",
        isString: false
      },
      {
        kpiId: 32,
        nameSv: "EBITDA-marginal",
        nameEn: "EBITDA margin",
        format: "%",
        isString: false
      },
      {
        kpiId: 33,
        nameSv: "Avkastning På EK",
        nameEn: "Return on Equity",
        format: "%",
        isString: false
      },
      {
        kpiId: 34,
        nameSv: "Avkastning på T",
        nameEn: "Return on Assets",
        format: "%",
        isString: false
      },
      {
        kpiId: 35,
        nameSv: "Avkastning på T-G",
        nameEn: "Return on tangible assets",
        format: "%",
        isString: false
      },
      {
        kpiId: 36,
        nameSv: "ROC",
        nameEn: "Return on Capital",
        format: null,
        isString: false
      },
      {
        kpiId: 37,
        nameSv: "ROIC",
        nameEn: "Return on Invested capital",
        format: null,
        isString: false
      },
      {
        kpiId: 38,
        nameSv: "Omsättningshastighet",
        nameEn: "Assets Turnover",
        format: null,
        isString: false
      },
      {
        kpiId: 39,
        nameSv: "Soliditet",
        nameEn: "Equity ratio",
        format: "%",
        isString: false
      },
      {
        kpiId: 40,
        nameSv: "Skuldsättningsgrad",
        nameEn: "Debt to Equity",
        format: null,
        isString: false
      },
      {
        kpiId: 41,
        nameSv: "Nettoskuld",
        nameEn: "Net Debt",
        format: "%",
        isString: false
      },
      {
        kpiId: 42,
        nameSv: "Nettoskuld/EBITDA",
        nameEn: "Net Debt / EBITDA",
        format: null,
        isString: false
      },
      {
        kpiId: 44,
        nameSv: "Balanslikviditet",
        nameEn: "Current ratio",
        format: null,
        isString: false
      },
      {
        kpiId: 45,
        nameSv: "Rör.kap/L.f.skulder",
        nameEn: "W.Cap/N.C.liab.",
        format: null,
        isString: false
      },
      {
        kpiId: 46,
        nameSv: "Kassa-%",
        nameEn: "Cash-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 49,
        nameSv: "Enterprise Value",
        nameEn: "Enterprise Value",
        format: null,
        isString: false
      },
      {
        kpiId: 50,
        nameSv: "Börsvärde",
        nameEn: "Market Cap",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 51,
        nameSv: "OP-marginal",
        nameEn: "OCF margin",
        format: "%",
        isString: false
      },
      {
        kpiId: 53,
        nameSv: "Omsättning",
        nameEn: "Revenue",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 54,
        nameSv: "EBITDA",
        nameEn: "EBITDA",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 55,
        nameSv: "Rörelseresultat",
        nameEn: "Operating income",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 56,
        nameSv: "Vinst",
        nameEn: "Earnings",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 57,
        nameSv: "Totala Tillgångar",
        nameEn: "Total Assets",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 58,
        nameSv: "Eget Kapital",
        nameEn: "Total Equity",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 60,
        nameSv: "Nettoskuld",
        nameEn: "Net Debt",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 61,
        nameSv: "Antal Aktier",
        nameEn: "Number of Shares",
        format: "M",
        isString: false
      },
      {
        kpiId: 62,
        nameSv: "Operativ Kassaflöde",
        nameEn: "Operating Cash Flow",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 63,
        nameSv: "Fritt Kassaflöde",
        nameEn: "Free Cash Flow",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 64,
        nameSv: "Capex",
        nameEn: "Capex",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 65,
        nameSv: "Året Kassaflöde",
        nameEn: "Cash flow for the year",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 66,
        nameSv: "Ordinarie Utdelning",
        nameEn: "Ordinary Dividend",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 68,
        nameSv: "Operativ kassaflöde/Aktie",
        nameEn: "Operating Cash Flow/share",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 69,
        nameSv: "Årets kassaflöde/Aktie",
        nameEn: "Cash flow - year/share",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 70,
        nameSv: "EBIT / Aktie",
        nameEn: "EBIT / Share",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 71,
        nameSv: "EBITDA/Aktie",
        nameEn: "EBITA/share",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 73,
        nameSv: "Nettoskuld/Aktie",
        nameEn: "Net Debt/share",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 74,
        nameSv: "P/EBITDA",
        nameEn: "P/EBITDA",
        format: null,
        isString: false
      },
      {
        kpiId: 75,
        nameSv: "P/EBIT",
        nameEn: "P/EBIT",
        format: null,
        isString: false
      },
      {
        kpiId: 76,
        nameSv: "P/FCF",
        nameEn: "P/FCF",
        format: null,
        isString: false
      },
      {
        kpiId: 78,
        nameSv: "EV/OP",
        nameEn: "EV/OCF",
        format: null,
        isString: false
      },
      {
        kpiId: 92,
        nameSv: "Immat.tillgång.-%",
        nameEn: "Intang.assets-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 93,
        nameSv: "Rörelsekapital-%",
        nameEn: "Workingcapital-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 94,
        nameSv: "Omsättningstillväxt",
        nameEn: "Revenue growth",
        format: "%",
        isString: false
      },
      {
        kpiId: 96,
        nameSv: "EBIT Tillväxt",
        nameEn: "EBIT Growth",
        format: "%",
        isString: false
      },
      {
        kpiId: 97,
        nameSv: "Vinsttillväxt",
        nameEn: "Earnings growth",
        format: "%",
        isString: false
      },
      {
        kpiId: 98,
        nameSv: "Utdelningstillväxt",
        nameEn: "Dividend growth",
        format: "%",
        isString: false
      },
      {
        kpiId: 99,
        nameSv: "Tillväxt Eget Kapital",
        nameEn: "Book Value growth",
        format: "%",
        isString: false
      },
      {
        kpiId: 100,
        nameSv: "Tillväxt Totala Tillgångar",
        nameEn: "Assets growth",
        format: "%",
        isString: false
      },
      {
        kpiId: 125,
        nameSv: "Vinst före skatt",
        nameEn: "Profit  before tax",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 126,
        nameSv: "Immateriella tillgångar",
        nameEn: "Intangible assets",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 127,
        nameSv: "Materiella tillgångar",
        nameEn: "Tangible assets",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 128,
        nameSv: "Finansiella tillgångar",
        nameEn: "Financial assets",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 129,
        nameSv: "Anläggningstillgångar",
        nameEn: "Non-current assets",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 130,
        nameSv: "Kassa",
        nameEn: "Cash",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 131,
        nameSv: "Omsättningstillgångar",
        nameEn: "Current assets",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 132,
        nameSv: "Långfristiga skulder",
        nameEn: "Non-current liabilities",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 133,
        nameSv: "Kortfristiga skulder",
        nameEn: "Current liabilities",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 134,
        nameSv: "Totala Skulder och Eget kapital",
        nameEn: "Total Equity and Liabilities",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 135,
        nameSv: "Bruttoresultat",
        nameEn: "Gross profit",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 137,
        nameSv: "Totala Skulder",
        nameEn: "Total liabilities",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 138,
        nameSv: "Kassaflöde-Finansiering",
        nameEn: "Cash flow - Financing",
        format: "MCURR",
        isString: false
      },
      {
        kpiId: 140,
        nameSv: "Årets kassaflöde marginal",
        nameEn: "Cash flow - year marginal",
        format: "%",
        isString: false
      },
      {
        kpiId: 148,
        nameSv: "Ordinarie Direktavkastning",
        nameEn: "Ordinary Dividend Yield",
        format: "CURR",
        isString: false
      },
      {
        kpiId: 151,
        nameSv: "Kursutveckling",
        nameEn: "Performance",
        format: null,
        isString: false
      },
      {
        kpiId: 152,
        nameSv: "Total avkastning",
        nameEn: "Total return",
        format: null,
        isString: false
      },
      {
        kpiId: 153,
        nameSv: "Senaste Kurs / Högsta-Lägsta",
        nameEn: "Latest Price / High-Low",
        format: null,
        isString: false
      },
      {
        kpiId: 158,
        nameSv: "MA(50) / MA(200)",
        nameEn: "MA(50) / MA(200)",
        format: null,
        isString: false
      },
      {
        kpiId: 159,
        nameSv: "RSI",
        nameEn: "RSI",
        format: null,
        isString: false
      },
      {
        kpiId: 160,
        nameSv: "RSI - Trend",
        nameEn: "RSI - Trend",
        format: null,
        isString: false
      },
      {
        kpiId: 161,
        nameSv: "Bollinger band",
        nameEn: "Bollinger band",
        format: null,
        isString: false
      },
      {
        kpiId: 163,
        nameSv: "Magic Formula",
        nameEn: "Magic Formula",
        format: null,
        isString: false
      },
      {
        kpiId: 164,
        nameSv: "Graham Strategi",
        nameEn: "Graham Strategy",
        format: null,
        isString: false
      },
      {
        kpiId: 165,
        nameSv: "Utdelningsstrategin",
        nameEn: "Dividend Strategy",
        format: null,
        isString: false
      },
      {
        kpiId: 167,
        nameSv: "F-Score",
        nameEn: "F-Score",
        format: null,
        isString: false
      },
      {
        kpiId: 168,
        nameSv: "Noteringshistorik",
        nameEn: "Listing history",
        format: null,
        isString: false
      },
      {
        kpiId: 169,
        nameSv: "Relativ Kursutveckling",
        nameEn: "Relative Performance",
        format: null,
        isString: false
      },
      {
        kpiId: 170,
        nameSv: "Tradingvolym",
        nameEn: "Tradingvolume",
        format: null,
        isString: false
      },
      {
        kpiId: 171,
        nameSv: "F-Score & Graham",
        nameEn: "F-Score & Graham",
        format: null,
        isString: false
      },
      {
        kpiId: 172,
        nameSv: "F-Score & Utdelning",
        nameEn: "F-Score & Dividend",
        format: null,
        isString: false
      },
      {
        kpiId: 173,
        nameSv: "F-Score & Graham Utdelning",
        nameEn: "F-Score & Graham Dividend",
        format: null,
        isString: false
      },
      {
        kpiId: 174,
        nameSv: "Vinstsstabilitet",
        nameEn: "Earnings Stability",
        format: null,
        isString: false
      },
      {
        kpiId: 175,
        nameSv: "EBIT Stabil",
        nameEn: "EBIT Stabil",
        format: null,
        isString: false
      },
      {
        kpiId: 176,
        nameSv: "EBITDA Stabil",
        nameEn: "EBITDA Stabil",
        format: null,
        isString: false
      },
      {
        kpiId: 177,
        nameSv: "Utdelningsstabilitet",
        nameEn: "Dividend Stability",
        format: null,
        isString: false
      },
      {
        kpiId: 178,
        nameSv: "Kassaflödesstabilitet",
        nameEn: "Cash Flow Stability",
        format: null,
        isString: false
      },
      {
        kpiId: 179,
        nameSv: "Fritt Kassaflöde",
        nameEn: "Free Cash Flow",
        format: null,
        isString: false
      },
      {
        kpiId: 180,
        nameSv: "Antal dagar till nästa rapport",
        nameEn: "Number of days to next report",
        format: null,
        isString: false
      },
      {
        kpiId: 181,
        nameSv: "Antal dagar efter uppdatering",
        nameEn: "Number of days after update",
        format: null,
        isString: false
      },
      {
        kpiId: 190,
        nameSv: "Net-Nets",
        nameEn: "Net-Nets",
        format: null,
        isString: false
      },
      {
        kpiId: 201,
        nameSv: "Nästa Rapportdatum",
        nameEn: "Next Reportdate",
        format: null,
        isString: true
      },
      {
        kpiId: 202,
        nameSv: "Uppdaterade Rapportdatum",
        nameEn: "Updated Reportdate",
        format: null,
        isString: true
      },
      {
        kpiId: 203,
        nameSv: "OMXS30",
        nameEn: "OMXS30",
        format: null,
        isString: false
      },
      {
        kpiId: 204,
        nameSv: "OMXH25",
        nameEn: "OMXH25",
        format: null,
        isString: false
      },
      {
        kpiId: 205,
        nameSv: "OMXC20",
        nameEn: "OMXC20",
        format: null,
        isString: false
      },
      {
        kpiId: 206,
        nameSv: "OSEBX25",
        nameEn: "OSEBX25",
        format: null,
        isString: false
      },
      {
        kpiId: 207,
        nameSv: "Genomsnittlig Blankning Blankning 1 vecka",
        nameEn: "Average Short-Selling Short-Selling 1 week",
        format: null,
        isString: false
      },
      {
        kpiId: 208,
        nameSv: "Genomsnittlig Blankning 1 månad",
        nameEn: "Average Short-Selling 1 month",
        format: null,
        isString: false
      },
      {
        kpiId: 209,
        nameSv: "Genomsnittlig Blankning 3 månader",
        nameEn: "Average Short-Selling 3 months",
        format: null,
        isString: false
      },
      {
        kpiId: 210,
        nameSv: "Genomsnittlig Blankning 1 år",
        nameEn: "Average Short-Selling 1 year",
        format: null,
        isString: false
      },
      {
        kpiId: 211,
        nameSv: "Blankningsförändring Blankning 1 vecka",
        nameEn: "Short-Selling Change Short-Selling 1 week",
        format: null,
        isString: false
      },
      {
        kpiId: 212,
        nameSv: "Blankningsförändring 1 månad",
        nameEn: "Short-Selling Change 1 month",
        format: null,
        isString: false
      },
      {
        kpiId: 213,
        nameSv: "Återköp Mkr 1 månad",
        nameEn: "Buyback Million 1 month",
        format: null,
        isString: false
      },
      {
        kpiId: 214,
        nameSv: "Återköp Mkr 3 månader",
        nameEn: "Buyback Million 3 months",
        format: null,
        isString: false
      },
      {
        kpiId: 215,
        nameSv: "Återköp Mkr 1 år",
        nameEn: "Buyback Million 1 year",
        format: null,
        isString: false
      },
      {
        kpiId: 216,
        nameSv: "Investor",
        nameEn: "Investor",
        format: null,
        isString: false
      },
      {
        kpiId: 217,
        nameSv: "Industrivärden",
        nameEn: "Industrivärden",
        format: null,
        isString: false
      },
      {
        kpiId: 218,
        nameSv: "Lundbergs",
        nameEn: "Lundbergs",
        format: null,
        isString: false
      },
      {
        kpiId: 219,
        nameSv: "Kinnevik",
        nameEn: "Kinnevik",
        format: null,
        isString: false
      },
      {
        kpiId: 220,
        nameSv: "Latour",
        nameEn: "Latour",
        format: null,
        isString: false
      },
      {
        kpiId: 221,
        nameSv: "Svolder",
        nameEn: "Svolder",
        format: null,
        isString: false
      },
      {
        kpiId: 223,
        nameSv: "Creades",
        nameEn: "Creades",
        format: null,
        isString: false
      },
      {
        kpiId: 224,
        nameSv: "Öresund",
        nameEn: "Öresund",
        format: null,
        isString: false
      },
      {
        kpiId: 225,
        nameSv: "Traction",
        nameEn: "Traction",
        format: null,
        isString: false
      },
      {
        kpiId: 226,
        nameSv: "AllBright Index Föregående års Index",
        nameEn: "AllBright Index Previous years Index",
        format: null,
        isString: false
      },
      {
        kpiId: 227,
        nameSv: "AllBright Index Senaste Index",
        nameEn: "AllBright Index Latest Index",
        format: null,
        isString: false
      },
      {
        kpiId: 228,
        nameSv: "AllBright Förändring Förändring",
        nameEn: "AllBright Change Change",
        format: null,
        isString: false
      },
      {
        kpiId: 229,
        nameSv: "Insider Köp 1 Vecka",
        nameEn: "Insider Buy 1 Week",
        format: null,
        isString: false
      },
      {
        kpiId: 230,
        nameSv: "Insider Köp 1 månad",
        nameEn: "Insider Buy 1 month",
        format: null,
        isString: false
      },
      {
        kpiId: 231,
        nameSv: "Insider Köp 3 månader",
        nameEn: "Insider Buy 3 months",
        format: null,
        isString: false
      },
      {
        kpiId: 232,
        nameSv: "Insider Köp 12 månader",
        nameEn: "Insider Buy 12 months",
        format: null,
        isString: false
      },
      {
        kpiId: 233,
        nameSv: "Insider Sälj 1 Vecka",
        nameEn: "Insider Sell 1 Week",
        format: null,
        isString: false
      },
      {
        kpiId: 234,
        nameSv: "Insider Sälj 1 månad",
        nameEn: "Insider Sell 1 month",
        format: null,
        isString: false
      },
      {
        kpiId: 235,
        nameSv: "Insider Sälj 3 månader",
        nameEn: "Insider Sell 3 months",
        format: null,
        isString: false
      },
      {
        kpiId: 236,
        nameSv: "Insider Sälj 12 månader",
        nameEn: "Insider Sell 12 months",
        format: null,
        isString: false
      },
      {
        kpiId: 237,
        nameSv: "Insider Netto 1 Vecka",
        nameEn: "Insider Net 1 Week",
        format: null,
        isString: false
      },
      {
        kpiId: 238,
        nameSv: "Insider Netto 1 månad",
        nameEn: "Insider Net 1 month",
        format: null,
        isString: false
      },
      {
        kpiId: 239,
        nameSv: "Insider Netto 3 månader",
        nameEn: "Insider Net 3 months",
        format: null,
        isString: false
      },
      {
        kpiId: 240,
        nameSv: "Insider Netto 12 månader",
        nameEn: "Insider Net 12 months",
        format: null,
        isString: false
      },
      {
        kpiId: 241,
        nameSv: "Största ägarens kapital",
        nameEn: "Largest shareholders capital",
        format: null,
        isString: false
      },
      {
        kpiId: 242,
        nameSv: "Andra största ägarens kapital",
        nameEn: "Second largest shareholders capital",
        format: null,
        isString: false
      },
      {
        kpiId: 243,
        nameSv: "Tredje största ägarens kapital",
        nameEn: "Third largest shareholders capital",
        format: null,
        isString: false
      },
      {
        kpiId: 244,
        nameSv: "Största ägarens röster",
        nameEn: "Largest shareholders votes",
        format: null,
        isString: false
      },
      {
        kpiId: 245,
        nameSv: "Andra största ägarens röster",
        nameEn: "Second largest shareholders votes",
        format: null,
        isString: false
      },
      {
        kpiId: 246,
        nameSv: "Tredje största ägarens röster",
        nameEn: "Third largest shareholders votes",
        format: null,
        isString: false
      },
      {
        kpiId: 247,
        nameSv: "Namnet på största ägare",
        nameEn: "The name of the largest shareholder",
        format: null,
        isString: true
      },
      {
        kpiId: 248,
        nameSv: "Namnet på andra största ägare",
        nameEn: "The name of the second largest shareholder",
        format: null,
        isString: true
      },
      {
        kpiId: 249,
        nameSv: "Namnet på tredje största ägare",
        nameEn: "The name of the third largest shareholders",
        format: null,
        isString: true
      },
      {
        kpiId: 250,
        nameSv: "Lannebo Sverige Innehav-%",
        nameEn: "Lannebo Sweden Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 251,
        nameSv: "Lannebo Sverige Förändring",
        nameEn: "Lannebo Sweden Change",
        format: null,
        isString: false
      },
      {
        kpiId: 252,
        nameSv: "Lannebo Småbolag Innehav-%",
        nameEn: "Lannebo SmallCap Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 253,
        nameSv: "Lannebo Småbolag Förändring",
        nameEn: "Lannebo SmallCap Change",
        format: null,
        isString: false
      },
      {
        kpiId: 254,
        nameSv: "Carnegie Sverige Innehav-%",
        nameEn: "Carnegie Sweden Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 255,
        nameSv: "Carnegie Sverige Förändring",
        nameEn: "Carnegie Sweden Change",
        format: null,
        isString: false
      },
      {
        kpiId: 256,
        nameSv: "Carnegie Småbolag Innehav-%",
        nameEn: "Carnegie SmallCap Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 257,
        nameSv: "Carnegie Småbolag Förändring",
        nameEn: "Carnegie SmallCap Change",
        format: null,
        isString: false
      },
      {
        kpiId: 258,
        nameSv: "Didner & Gerge Aktiefond Innehav-%",
        nameEn: "Didner & Gerge Equity Fund Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 259,
        nameSv: "Didner & Gerge Aktiefond Förändring",
        nameEn: "Didner & Gerge Equity Fund Change",
        format: null,
        isString: false
      },
      {
        kpiId: 260,
        nameSv: "Didner & Gerge Småbolag Innehav-%",
        nameEn: "Didner & Gerge SmallCap Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 261,
        nameSv: "Didner & Gerge Småbolag Förändring",
        nameEn: "Didner & Gerge SmallCap Change",
        format: null,
        isString: false
      },
      {
        kpiId: 262,
        nameSv: "Didner & Gerge MicroCap Innehav-%",
        nameEn: "Didner & Gerge MicroCap Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 263,
        nameSv: "Didner & Gerge MicroCap Förändring",
        nameEn: "Didner & Gerge MicroCap Change",
        format: null,
        isString: false
      },
      {
        kpiId: 264,
        nameSv: "Spiltan Sverigefond Innehav-%",
        nameEn: "Spiltan Sweden fund Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 265,
        nameSv: "Spiltan Sverigefond Förändring",
        nameEn: "Spiltan Sweden fund Change",
        format: null,
        isString: false
      },
      {
        kpiId: 266,
        nameSv: "Spiltan Dalarna Innehav-%",
        nameEn: "Spiltan Dalarna Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 267,
        nameSv: "Spiltan Dalarna Förändring",
        nameEn: "Spiltan Dalarna Change",
        format: null,
        isString: false
      },
      {
        kpiId: 268,
        nameSv: "Spiltan Småland Innehav-%",
        nameEn: "Spiltan Småland Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 269,
        nameSv: "Spiltan Småland Förändring",
        nameEn: "Spiltan Småland Change",
        format: null,
        isString: false
      },
      {
        kpiId: 270,
        nameSv: "Avanza Zero Innehav-%",
        nameEn: "Avanza Zero Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 271,
        nameSv: "Avanza Zero Förändring",
        nameEn: "Avanza Zero Change",
        format: null,
        isString: false
      },
      {
        kpiId: 272,
        nameSv: "Nordnet Superfonden Innehav-%",
        nameEn: "Nordnet Superfund Holdings-%",
        format: "%",
        isString: false
      },
      {
        kpiId: 273,
        nameSv: "Nordnet Superfonden Förändring",
        nameEn: "Nordnet Superfund Change",
        format: null,
        isString: false
      },
      {
        kpiId: 274,
        nameSv: "Investmentbolag Substansvärde",
        nameEn: "Holding Companies Net Assests Value",
        format: null,
        isString: false
      },
      {
        kpiId: 275,
        nameSv: "Investmentbolag Substansrabatt",
        nameEn: "Holding Companies NAV Discount",
        format: null,
        isString: false
      },
      {
        kpiId: 276,
        nameSv: "Investmentbolag Tillväxt 3 mån",
        nameEn: "Holding Companies Growth 3 m",
        format: null,
        isString: false
      },
      {
        kpiId: 277,
        nameSv: "Fastigheter Substansvärde",
        nameEn: "Real Estate Net Assests Value",
        format: null,
        isString: false
      },
      {
        kpiId: 278,
        nameSv: "Fastigheter Räntetäckningsgrad",
        nameEn: "Real Estate Interest Cover Ratio",
        format: null,
        isString: false
      },
      {
        kpiId: 279,
        nameSv: "Fastigheter Belåningsgrad",
        nameEn: "Real Estate Loan-to-value Ratio",
        format: null,
        isString: false
      },
      {
        kpiId: 280,
        nameSv: "Fastigheter Uthyrningsgrad",
        nameEn: "Real Estate Occupancy Rate",
        format: null,
        isString: false
      },
      {
        kpiId: 281,
        nameSv: "Driftöverskott Fastigheter Mkr",
        nameEn: "Net operating income Real Estate SEK M",
        format: null,
        isString: false
      },
      {
        kpiId: 282,
        nameSv: "Driftöverskott Fastigheter Per Aktie",
        nameEn: "Net operating income Real Estate Per Share",
        format: null,
        isString: false
      },
      {
        kpiId: 283,
        nameSv: "Driftöverskott Fastigheter Driftmarginal",
        nameEn: "Net operating income Real Estate Operating margin",
        format: null,
        isString: false
      },
      {
        kpiId: 284,
        nameSv: "Förvaltningsresultat Fastigheter Mkr",
        nameEn: "Property income Real Estate SEK M",
        format: null,
        isString: false
      },
      {
        kpiId: 285,
        nameSv: "Förvaltningsresultat Fastigheter Per Aktie",
        nameEn: "Property income Real Estate Per Share",
        format: null,
        isString: false
      },
      {
        kpiId: 286,
        nameSv: "Förvaltningsresultat Fastigheter Förvaltningsmarginal",
        nameEn: "Property income Real Estate Property margin",
        format: null,
        isString: false
      },
      {
        kpiId: 287,
        nameSv: "Fastigheter Substansrabatt",
        nameEn: "Real Estate NAV Discount",
        format: null,
        isString: false
      },
      {
        kpiId: 288,
        nameSv: "Driftöverskott Fastigheter P / Driftöverskott",
        nameEn: "Net operating income Real Estate P / Net Operating",
        format: null,
        isString: false
      },
      {
        kpiId: 289,
        nameSv: "Förvaltningsresultat Fastigheter P / Förvaltning",
        nameEn: "Property income Real Estate P / Property profit",
        format: null,
        isString: false
      },
      {
        kpiId: 290,
        nameSv: "Banker K/I-Tal",
        nameEn: "Banks C/I-Ratio",
        format: null,
        isString: false
      },
      {
        kpiId: 291,
        nameSv: "Banker Kreditförluster",
        nameEn: "Banks Credit losses",
        format: null,
        isString: false
      },
      {
        kpiId: 292,
        nameSv: "Banker Kärnprimärkapital",
        nameEn: "Banks Common Equity Tier 1",
        format: null,
        isString: false
      },
      {
        kpiId: 293,
        nameSv: "Banker Primärkapital",
        nameEn: "Banks Tier 1 capital",
        format: null,
        isString: false
      },
      {
        kpiId: 294,
        nameSv: "Banker Total Kapitalrelation",
        nameEn: "Banks Capital adequacy",
        format: null,
        isString: false
      },
      {
        kpiId: 295,
        nameSv: "Banker Inlåning / Utlåning",
        nameEn: "Banks Deposits / Lendings",
        format: null,
        isString: false
      },
      {
        kpiId: 296,
        nameSv: "Banker Likviditetstäckning (LCR)",
        nameEn: "Banks Liquidity Coverage Ratio (LCR)",
        format: null,
        isString: false
      },
      {
        kpiId: 307,
        nameSv: "Jus. NCAV / aktie",
        nameEn: "Adj. NCAV / share",
        format: null,
        isString: false
      },
      {
        kpiId: 308,
        nameSv: "NCAV/aktie",
        nameEn: "NCAV/share",
        format: null,
        isString: false
      },
      {
        kpiId: 309,
        nameSv: "Jus. Kurs / NCAV",
        nameEn: "Adj. Price / NCAV",
        format: null,
        isString: false
      },
      {
        kpiId: 310,
        nameSv: "Kurs/NCAV",
        nameEn: "Price/NCAV",
        format: null,
        isString: false
      },
      {
        kpiId: 311,
        nameSv: "Volatilitet H-L %",
        nameEn: "Volatility H-L %",
        format: "%",
        isString: false
      },
      {
        kpiId: 312,
        nameSv: "Volatilitet Standardavvikelse",
        nameEn: "Volatility Standard deviation",
        format: null,
        isString: false
      },
      {
        kpiId: 313,
        nameSv: "Volym",
        nameEn: "Volume",
        format: null,
        isString: false
      },
      {
        kpiId: 314,
        nameSv: "Volym Trend",
        nameEn: "Volume Trend",
        format: null,
        isString: false
      },
      {
        kpiId: 315,
        nameSv: "Gap Ned",
        nameEn: "Gap Down",
        format: null,
        isString: false
      },
      {
        kpiId: 316,
        nameSv: "Gap Upp",
        nameEn: "Gap Up",
        format: null,
        isString: false
      },
      {
        kpiId: 317,
        nameSv: "Medelvärde",
        nameEn: "Moving Average",
        format: null,
        isString: false
      },
      {
        kpiId: 318,
        nameSv: "Senaste Kurs / MA",
        nameEn: "Latest Price / MA",
        format: null,
        isString: false
      },
      {
        kpiId: 321,
        nameSv: "Bollinger Avstånd",
        nameEn: "Bollinger Distance",
        format: null,
        isString: false
      },
      {
        kpiId: 322,
        nameSv: "BB - Avstånd",
        nameEn: "BB - Distance",
        format: null,
        isString: false
      }
    ]
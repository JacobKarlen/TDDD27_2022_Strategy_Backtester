export interface Country {
    id: number;
    name: string;
}
export interface Countries extends Array<Country>{}

export interface Market {
    id: number;
    name: string;
    countryId: number;
    isIndex: boolean;
    exchangeName: string;
}
export interface Markets extends Array<Market>{}

export interface Sector {
    id: number;
    name: string;
}
export interface Sectors extends Array<Sector>{}

export interface Branch {
    id: number;
    name: string;
    sectorId: number;
}
export interface Branches extends Array<Branch>{}

export interface KPI {
    kpiId: number;
    abbreviation?: string;
    nameSv: string;
    nameEn: string;
    format: string | null;
    isString: boolean;
}

export interface Instrument{
    insId: number;
    name: string;
    urlName: string;
    instrument: number;
    isin: string;
    ticker: string;
    yahoo: string;
    sectorId: number;
    marketId: number;
    branchId: number;
    countryId: number;
    listingDate: Date;
}
export interface Instruments extends Array<Instrument>{}


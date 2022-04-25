import { Countries, Markets, Sectors, Branches } from "./borsdata"

export interface Filter {
    numberOfStocks: number;
    selectionCriteria: String;
    maxFilterValue: number;
    minFilterValue: number;
    formula: String;
}

export interface StrategyMetadata {
    strategyName: String; 
    accessStatus: String;

    startDate: Date;
    endDate: Date;

    transactionCost: number;
    rebalanceFrequency: String;

    countries: Countries;  
    markets: Markets;

    sectors: Sectors;
    branches: Branches;
 
    filters: Filter[]
}



export interface MonthlyRebalance {
    month: string;
    date: string;
}
export interface YearlyRebalance {
    year: string;
    months: MonthlyRebalance[]
}
export interface RebalanceSchedule extends Array<YearlyRebalance> {}
import { Countries, Markets, Sectors, Branches } from "./borsdata"

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
 
    filters: [
        {          
            numberOfStocks: number;
            selectionCriteria: String;
            maxFilterValue: number;
            minFilterValue: number;
            formula: String;
        }
    ]
}

export interface YearlyStrategyStatistics {
    count: number;
    mean: number;
    std: number;
    min: number;
    '25%': number;
    '50%': number;
    '75%': number;
    max: number;
    return: number;
}

export interface SummaryStrategyStatistics {
    totalReturn: number;
    cagr: number;
}

export interface YearlyStrategyResult {
    statistics: YearlyStrategyStatistics;
    months: {
        [month: string]: number;
    } 
}

export interface StrategyResult {
    statistics: SummaryStrategyStatistics;
    years : {
        [year: string]: YearlyStrategyStatistics;
    }
}

export interface Strategy {
    metadata: StrategyMetadata,
    result: StrategyResult,
    user: any
}
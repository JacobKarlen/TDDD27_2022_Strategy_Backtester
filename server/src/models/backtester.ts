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
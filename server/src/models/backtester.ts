import { number } from "mathjs";
import { Countries, Markets, Sectors, Branches } from "./borsdata"
import { Schema, model, Model, HydratedDocument } from "mongoose";
import mongoose from "mongoose";

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

export interface IStrategy {
    metadata: StrategyMetadata,
    result: StrategyResult,
    user: Schema.Types.ObjectId | undefined
}



// const strategyMetadataSchema = new Schema<StrategyMetadata>({
//     strategyName: { type: String , required: true },
//     accessStatus: { type: String , required: true },

//     startDate: { type: Date , required: true },
//     endDate: { type: Date , required: true },

//     transactionCost: { type: Number , required: true },
//     rebalanceFrequency: { type: String , required: true },

//     countries: { type: Object , required: true },
//     markets: Markets;

//     sectors: Sectors;
//     branches: Branches;
 
//     filters: Filter[]
 
// });

const strategySchema = new Schema<IStrategy>({
    metadata: { type: Schema.Types.Mixed , required: true },
    result: { type: Schema.Types.Mixed , required: true },
    user: { type: Schema.Types.ObjectId, required: true }
});


export const Strategy = model<IStrategy>('Strategy', strategySchema)

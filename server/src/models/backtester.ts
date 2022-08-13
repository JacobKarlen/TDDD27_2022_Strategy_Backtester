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

export interface Transaction {
    sid: Number;
    ticker: String;
    direction: String;
    entry_date: Date;
    avg_entry_price: Number;
    exit_date: Date;
    avg_exit_price: Number;
    holding_period: Number;
    stop_loss: Number;
    open_quantity: Number;
}

export interface Execution {
    date: Date;
    transaction_id: Number;
    sid: Number;
    ticker: String;
    indicator: String;
    buy_sell: String;
    order_type: String;
    commission: Number;
    quantity: Number;
    price: Number;
    currency: String;
}

export interface PortfolioSnapshot {
    date: Date;
    cash: Number;
    market_value: Number;
    equity: Number;
    leverage: Number;
    unrealized_pnl: Number;
}

export interface PositionSnapshot {
    date: Date;
    sid: Number;
    ticker: String;
    quantity: Number;
    entry_price: Number;
    current_price: Number;
    stop_loss: Number;
    market_value: Number;
    unrealized_pnl: Number;
}

export interface StrategyResult {
    totalReturn: Number;
    maxDrawdown: Number;
    cagr: Number;

    transactions: Array<Transaction>;
    executions: Array<Execution>;
    portfolioSnapshots: Array<PortfolioSnapshot>;
    positionSnapshots: Array<PositionSnapshot>;
}

export interface StrategyStatus {
    status: String;
    message: String;
}

export interface IStrategy {
    metadata: StrategyMetadata,
    status: StrategyStatus,
    result?: StrategyResult,
    user: Schema.Types.ObjectId | undefined,
    username: String
}

const strategySchema = new Schema<IStrategy>({
    metadata: { type: Schema.Types.Mixed , required: true },
    status: { type: Schema.Types.Mixed, required: true },
    result: { type: Schema.Types.Mixed , required: false },
    user: { type: Schema.Types.ObjectId, required: true },
    username: { type: Schema.Types.String, required: true }
});


export const Strategy = model<IStrategy>('Strategy', strategySchema)

import { Countries, Markets, Sectors, Branches } from "./borsdata"

export interface Transaction {
    sid: number;
    ticker: String;
    direction: String;
    entry_date: Date;
    avg_entry_price: number;
    exit_date: Date;
    avg_exit_price: number;
    holding_period: number;
    stop_loss: number;
    open_quantity: number;
}

export interface Execution {
    date: Date;
    transaction_id: number;
    sid: number;
    ticker: String;
    indicator: String;
    buy_sell: String;
    order_type: String;
    commission: number;
    quantity: number;
    price: number;
    currency: String;
}

export interface PortfolioSnapshot {
    date: Date;
    cash: number;
    market_value: number;
    equity: number;
    leverage: number;
    unrealized_pnl: number;
}

export interface PositionSnapshot {
    date: Date;
    sid: number;
    ticker: String;
    quantity: number;
    entry_price: number;
    current_price: number;
    stop_loss: number;
    market_value: number;
    unrealized_pnl: number;
}

export interface StrategyResult {
    totalReturn: number;
    maxDrawdown: number;
    cagr: number;

    transactions: Array<Transaction>;
    executions: Array<Execution>;
    portfolioSnapshots: Array<PortfolioSnapshot>;
    positionSnapshots: Array<PositionSnapshot>;
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

export interface StrategyStatus {
    status: String;
    message: String;
}


export interface Strategy {
    metadata: StrategyMetadata,
    status: StrategyStatus,
    result?: StrategyResult,
    user: String | undefined,
    username: String
}
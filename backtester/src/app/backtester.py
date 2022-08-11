import pytz
import queue
import random
import time
import json
import os
import math
import requests

import functools as ft
from datetime import datetime as dt
from urllib.error import HTTPError
from dotenv import load_dotenv
from mathjspy import MathJS
from pathlib import Path
import pandas as pd

from .events import FillEvent, OrderEvent
from .portfolio import Portfolio
from .models import StrategyMetadata

load_dotenv()
mjs = MathJS()
utc=pytz.UTC
portfolio = Portfolio()

class BorsdataAPI():
    """
    API wrapper for the Börsdata API used to retrieve stock kpi and
    price data used in the strategy backtests.
    """
    
    def __init__(self):
        self.BASE_URL = 'https://apiservice.borsdata.se/v1'
        self.API_KEY = os.getenv('BORSDATA_API_KEY')
        self.req_count = 0
        
    def fetch(self, route):
        """
        General function used for API calls against borsdata. Used to limit
        the requests within the limitations of the API license.

        Args:
            route (str): borsdata api url route

        Returns:
            obj | bool: returns the response object from the api call or False
            if an error is encountered.
        """
        if self.req_count % 10 == 0:
            time.sleep(1)
        try:
            self.req_count += 1
            res = requests.get(f"{self.BASE_URL}{route}", { "authKey": self.API_KEY, "maxCount": 20 })
        except HTTPError:
            print("Error with 3rd party Borsdata API")
            return False
        else:
            return res.json()
    
    def fetch_instruments(self):
        """
        Function for fetching a list of all currently traded instruments.

        Returns:
            List[Instrument]: a list of instrument objects
        """
        instruments = self.fetch('/instruments')
        if instruments: return instruments['instruments'] 
        else: return []
    
    def fetch_kpis_metadata(self):
        """
        Function for fetching a list of all kpis and related metadata
        where historical data is available.

        Returns:
            List[kpiHistoryMetadata]: 
        """
        kpis_metadata = self.fetch('/instruments/kpis/metadata')
        if kpis_metadata: return kpis_metadata['kpiHistoryMetadatas']
        else: return []
    
    def fetch_kpis_summary(self, ins_id):
        """
        Fetch a kpi summary with historical kpi values for a summary set
        of kpis for an instrument with the specified borsdata instrument id.

        Args:
            ins_id (int): borsdata instrument id

        Returns:
            List[KpiSummary]: a list of summary kpis for the specified instrument.
        """
        kpis_summary = self.fetch(f"/instruments/{ins_id}/kpis/year/summary")
        if kpis_summary: return kpis_summary['kpis']
        else: return []

# instantiate borsdata API wrapper
borsdata  = BorsdataAPI()

def get_instrument_list(markets, branches):
    """
    Get a list of all the common stock instruments
    within the specified markets and branches.

    Args:
        markets (List[Market]): A list of Market objects (representing stock markets, such as OMX Largecap)
        branches (List[Branch]): A list of Branch objects (representing branches, such as Banks or Oil & Gas)

    Returns:
        List[Instrument]: A list of common stock instruments based on specified markets and branches.
    """
    instruments = borsdata.fetch_instruments()

    market_ids = list(map(lambda m: m.get('id'), markets))
    branch_ids = list(map(lambda b: b.get('id'), branches)) 
    instrument_ids = [0, 3] # A and B stock types
    
    instruments = list(filter(
        lambda i: i.get('marketId') in market_ids and 
            i.get('branchId') in branch_ids and 
            i.get('instrument') in instrument_ids, 
        instruments)
    )
    return instruments

    
def save_summary_kpis_list():
    """
    Internal function for saving list of available summary KPIs. KPI abbreviations
    need to be added manually for added ease of use in specifying filter formulas.
    """
    kpis_metadata = borsdata.fetch_kpis_metadata()
    kpis_summary = borsdata.fetch_kpis_summary(3)
    
    kpi_ids = list(map(lambda kpi: kpi.get('KpiId'), kpis_summary))
    kpis = list(filter(lambda kpi: kpi.get('kpiId') in kpi_ids, kpis_metadata))
    
    # write the of summary kpis to a json file
    with open('data.json', 'w') as f:
        json.dump(kpis, f, indent=4, sort_keys=True)
    
    
    
def get_kpis_list_from_filters(filters):
    """
    Get a list of all the kpis included/used in the collection
    of filter formulas specified as a parameter.

    Args:
        filters (List[Filter]): a list of Filter objects

    Returns:
        List[KPI]: A list of KPIs included in at least one of the filter formulas.
    """
     # build one string of all filter formula strings combined 
    formulas = list(map(lambda f: f.get('formula'), filters))
    formula_str = str(ft.reduce(lambda s1, s2: s1 +''+ s2, formulas))

    # read in a lsit of kpis saved in a static json file
    script_location = Path(__file__).absolute().parent
    file_location = script_location / 'kpis.json'
    kpis_file = file_location.open()
    kpis = json.load(kpis_file)
    
    # return a list of all the kpis where the kpi abbreviation
    # is included in the combined filter formula string.
    return list(
        filter(lambda kpi: 
            kpi.get('abbreviation') and 
            (formula_str.find(kpi.get('abbreviation')) != -1),
            kpis)
        )


def get_kpis_summary_for_instruments(instruments, kpis_list):
    """
    Returns a combined and aligned pandas DataFrame of historical KPI
    data for the specified instruments and kpis.

    Args:
        instruments (List[Instrument]): A list of instruments on the borsdata format.
        kpis_list (List[KPI]): A list of KPIs.

    Returns:
        pd.DataFrame: A combined pandas DataFrame with historical KPI data for each
        KPI and instrument specified as function parameters.
    """
    # Used as a map to get the corresponding KPI abbreviations for the KPIs
    kpis_dict = {}
    for kpi in kpis_list:
        kpis_dict[kpi['kpiId']] = kpi['abbreviation']
        
    dfs = []
    for instrument in instruments:
        kpis_summary = borsdata.fetch_kpis_summary(instrument['insId'])
        
        # Convert KPI Summary from API call to pandas DataFrame
        df = pd.json_normalize(kpis_summary, record_path=['values'],  meta=['KpiId'])
    
        # Only keep KPIs specified in kpis_list
        df = df[df['KpiId'].isin(list(kpis_dict.keys()))]
        df['ins_id'] = instrument['insId']
        df['abbreviation'] = df['KpiId'].transform(lambda id: kpis_dict[id])
        df.set_index(['ins_id', 'KpiId', 'y'], inplace=True)
        dfs.append(df)
    
    # Return a combined DataFrame of kpis for all instruments
    return pd.concat(dfs, axis=0)

        
def get_pricedata_for_instruments(instruments, start, end):
    """
    Returns a pandas dataframe of aligned pricedata for all instruments
    in the supplied instrument list (from cached pricedata). 

    The reasons for using cached price data is that the API limitations
    would make it an issue to fetch it remotely for each backtest and the
    backtests would take much longer time.

    Args:
        instruments (List[Instrument]): A list of instruments to get price data for.
        start (date): Start date where the period of price data begins.
        end (date): End date where the period of price data ends.

    Returns:
       pd.DataFrame: A pandas DataFrame of aligned price data for all instruments
       in the specified list between start and end dates.
    """
    dfs = []
    for instrument in instruments:
        df = pd.read_csv(f"./pricedata/{instrument['insId']} {instrument['ticker']}.csv")
        df['ticker'] = instrument['ticker']
        df['ins_id'] = instrument['insId']
        dfs.append(df)
    
    # combine each instrument df into one df with aligned dates as index
    df = pd.concat(dfs, axis=0)
    df = df.set_index('date')
    df.index = pd.to_datetime(df.index)
    df = df[['ticker', 'ins_id', 'open', 'high', 'low', 'close', 'volume']]
    df = df.sort_index()
    
    # calculate correct start and end dates based on data and user input
    start = start if start.replace(tzinfo=utc) > df.index[0].replace(tzinfo=utc) else df.index[0]
    end = end if end.replace(tzinfo=utc) < df.index[-1].replace(tzinfo=utc) else df.index[-1]
    
    start = dt.combine(start.date(), dt.min.time())
    end = dt.combine(end.date(), dt.min.time())  
    
    return df.loc[start:end]
    
  

def calculate_rebalance_dates(data, freq):
    """
    Returns a list of dates where rebalancing should take place based on a DataFrame
    of stock price data and a frequency string ('M', 'Q', 'Y').

    Args:
        data (pd.DataFrame): A pandas DataFrame of stock price data.
        freq (str): A string representation of rebalance frequency (e.g. 'M', 'Q', 'Y')

    Returns:
        List[date]: A list of dates where the rebalancing should take place.
    """
    return list(
        data.groupby(
            pd.Grouper(freq=freq)).apply(lambda df: df.index.max()
        )
    )

def get_next_trade_date(data, date, sid):
    """
    Get the next date where the stock with id sid trades based on a specified date
    and a DataFrame of stock price data.

    Args:
        data (pd.DataFrame): A pandas DataFrame of stock price data.
        date (date): A given date.
        sid (int): An instrument id for a particular stock.

    Returns:
        date | bool: returns the next trading date for the given stock or false if the
        stock never trades again after the specified date.
    """
    try:
        return data.loc[( data.index > date) & (data['ins_id'] == sid) ].iloc[0].name
    except IndexError:
        return False
    
def get_prev_trade_date(data, date, sid):
    """
    Get the previous date where a stock id sid traded based on a specified date
    and a DataFrame of stock price data.

    Args:
        data (pd.DataFrame): A pandas DataFrame of stock price data.
        date (date): A given date.
         sid (int): An instrument id for a particular stock.

    Returns:
        date | bool: returns the next trading date for the given stock or false if the
        stock never trades again after the specified date.
    """
    try:
        return data.loc[( data.index < date ) & (data['ins_id'] == sid) ].iloc[-1].name
    except IndexError:
        return False

def rebalance_portfolio(data, date, price_data, number_of_stocks):
    """
    Core function that implements the rebalancing logic of a backtest. The function
    calculates the amount of shares to buy or sell based on current portfolio structure
    and issues buy and sell orders to be filled at the next market open (BOD).

    Args:
        data (pd.DataFrame): A pandas DataFrame of the stocks of the new target portfolio.
        date (date): A given date where rebalancing takes place.
        price_data (pd.DataFrame): A pandas DataFrame of all stock price data.
        number_of_stocks (int): Number of stocks to select based on the user defined formulas.
    """
    
 
    size_factor = 1 / number_of_stocks # fixed percentage position sizing
    open_pos = portfolio.get_open_positions()
            
    if not open_pos.empty:
        # sell existing positions that aren't in new candidate list
        for sid, df in open_pos.groupby('sid'):
            if sid not in list(data['ins_id']):

                ticker, open_quantity = df.iloc[0][['ticker', 'open_quantity']]
                trade_date = get_next_trade_date(price_data, date, sid)
                price = price_data.loc[
                    (price_data.index == trade_date) &
                    (price_data['ins_id'] == sid), 'open'][0]
                
                # Add a sell order for the next trade date
                portfolio.pending_orders.put(
                    OrderEvent(
                        get_next_trade_date(price_data, date, sid), 
                        sid, ticker, 'MKT', open_quantity, price,
                        0, 'SELL', 'rebalance sell'
                    )
                )
    
    if not data.empty:
        # rebalance all positions in candidate list to target size
        for ins_id, df in data.groupby('ins_id'):
            
            trade_date = get_next_trade_date(price_data, date, ins_id)
            # if the stock never trades again, ignore it from the rebalance
            if not trade_date: break 
            
            price = price_data.loc[
                (price_data.index == trade_date) & 
                (price_data['ins_id'] == ins_id), 'open'][0]
            
            quantity = math.floor(size_factor * portfolio.get_portfolio_equity() / price)
            
            ticker = df['ticker'][0]
    
            # take a potentially existing position into account and adjust
            # the quantity to reach the target position size.
            curr_size = portfolio.get_current_position_size(
                ins_id, get_prev_trade_date(price_data, date, ins_id)
            )
 
            size = size_factor - curr_size
            order_cost = size * portfolio.get_portfolio_equity()
            
            quantity = math.floor(order_cost / price)
            
            # adjust the position size based on available cash.
            cash = portfolio.get_available_cash()
            if order_cost <= cash:
                quantity =  math.floor(order_cost / price) 
            else:
                quantity =  math.floor(cash / price)
                        
            # issue a buy order if quantity is positive
            if quantity > 0:
                portfolio.pending_orders.put(
                    OrderEvent(
                        trade_date, ins_id, ticker, 
                        'MKT', quantity, price, 0, 
                        'BUY', 'rebalance buy'
                    )
                )
            # issue a sell order if the quantity is negative
            if quantity < 0:
                quantity = abs(quantity)
                available_quantity = portfolio.get_available_quantity(ins_id)
                if quantity > available_quantity:
                    quantity = available_quantity
                    
                portfolio.pending_orders.put(
                    OrderEvent(
                        trade_date, ins_id, ticker, 
                        'MKT', quantity, price, 0, 
                        'SELL', 'rebalance sell'
                    )
                )
        

def execute_orders(date):
    """
    A function that executes all pending orders for the given date,
    generates fill events for executed orders and updates the pending
    orders left.

    Args:
        date (date): The current date of execution.
    """
    order_backlog = queue.Queue()
    while True:
        try:
            order = portfolio.pending_orders.get(False)
        except queue.Empty:
            break
        else:
            if order.datetime == date:
                order.print_order()
                # generate a fill event for the executed order.
                portfolio.update_fill(
                    FillEvent(
                        order.datetime, order.sid, order.ticker,
                        'OMX', order.quantity, order.order_price,
                        order.stop_loss, order.direction, 
                        order.order_type, order.quantity * order.order_price,
                        'SEK', order.indicator, None
                    )
                )
                
            else:
                # if the specified date isn't the current date, put the
                # order back into the backlog of pending orders.
                # (Could be that the given stock didn't trade that day)
                order_backlog.put(order)
                
    portfolio.pending_orders = order_backlog

def get_backtest_results(pf):
    """
    A function for getting a results summary object of the backtest to return to
    the express server for storing. The summary is created based on
    the portfolio instance of the backtest that contains dataframes
    for all executions, portfolio snapshots and position snapshots.

    Args:
        pf (Portfolio): A Portfolio instance containing all data about executions,
        transactions, position snapshots and portfolio snapshots.

    Returns:
        obj: A summary object describing the backtest result and strategy performance.
    """
    
    results = {}
    trs = pf.transactions.where(pf.transactions.open_quantity == 0).dropna(how='all')
    print(pf.transactions.tail())
    wins = trs.where((trs.open_quantity == 0) & (trs.avg_entry_price < trs.avg_exit_price)).dropna(how='all')
    losses = trs.where(trs.avg_entry_price >= trs.avg_exit_price).dropna(how='all')
    
    
   
    # results['winRate'] = wins['avg_entry_price'].count() / pf.transactions['avg_entry_price'].count()
    # results['avgWin'] = ((wins.avg_exit_price - wins.avg_entry_price) / wins.avg_entry_price).mean()    
    # results['avgLoss'] = ((losses.avg_exit_price - losses.avg_entry_price) / losses.avg_entry_price).mean()
    # results['avgWinHoldingPeriod'] = wins.holding_period.mean()
    # results['avgLossHoldingPeriod'] = losses.holding_period.mean()
    
    rolling_max = pf.portfolio_snapshots['equity'].cummax()
    daily_drawdown = pf.portfolio_snapshots['equity'] / rolling_max - 1.0
    results['maxDrawdown'] = daily_drawdown.cummin().iloc[-1]
    
    results['cagr'] = (pf.portfolio_snapshots.iloc[-1]['equity'] / pf.portfolio_snapshots.iloc[0]['equity']) **(1/((pf.portfolio_snapshots.index[-1] - pf.portfolio_snapshots.index[0]).days / 365.25)) - 1 
    
    
    return results
    

def run_backtest(md: StrategyMetadata):
    """
    The Heart of the backtester, running the actual backtest and everything that it involves.
    The function takes in a StrategyMetadata object containing all the information
    describing the strategy that is specified by the user and sent from the front-end.

    Args:
        md (StrategyMetadata): An object containing the complete strategy description.

    Returns:
        obj: Returns a backtest result object with a summary of the strategy performance.
    """
    
    instruments = get_instrument_list(md.markets, md.branches)
    
    price_data = get_pricedata_for_instruments(instruments, md.startDate, md.endDate)
    rebalance_dates = calculate_rebalance_dates(price_data, md.rebalanceFrequency)
    
    kpis_list = get_kpis_list_from_filters(md.filters)
    kpis_data = get_kpis_summary_for_instruments(instruments, kpis_list)

    for i, (date, date_df) in enumerate(price_data.groupby(level=0)):
        # for each date in the selected period
        data = price_data.loc[date].copy()
        
        if date in rebalance_dates: 
            # rebalance portfolio at each rebalance date
            
            for filter in md.filters:
                # apply each user-defined filter in a pipeline
            
                for ins_id, df in data.groupby('ins_id'):
                    # set scope of kpis at rebalance date and calculate formula value for each instrument
                    scope = {}
                    for kpi in kpis_list:
                        # delay kpi data with one year to avoid look-ahead bias
                        scope[kpi['abbreviation']] = kpis_data.loc[pd.IndexSlice[ins_id, kpi['kpiId'], date.year-1], 'v']
                    mjs.update(scope)     
    
                    # Leverage mathjspy to evaluate the filter formulas the same way as in the front-end.
                    data.loc[data.ins_id == ins_id, 'f_val'] = mjs.eval(filter['formula'])
                
                # filter out instruments based on filter criterias and update data ahead
                # of next filter iteration to be applied
                
                data = data.where(
                    (data['f_val'] >= filter['minFilterValue']) & 
                    (data['f_val'] <= filter['maxFilterValue'])
                ).dropna(how='all')
                   
                ascending = False if filter['selectionCriteria'] == 'highest' else True
                data = data.sort_values(by=['f_val'], ascending=ascending)
                data = data.iloc[:filter['numberOfStocks']]

            rebalance_portfolio(data, date, price_data, filter['numberOfStocks'])
        
        # Each trading date, execute any pending orders for the current date.
        execute_orders(date)
        # take snapshot of current positions and on an aggregated portfolio level.
        portfolio.take_snapshot(date, data) 
        
    return get_backtest_results(portfolio)

    
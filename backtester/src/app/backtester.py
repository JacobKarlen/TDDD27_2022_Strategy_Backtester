import queue
import random
from urllib.error import HTTPError
import pandas as pd

from .events import FillEvent, OrderEvent

from .portfolio import Portfolio
from .models import StrategyMetadata
import numpy as np

from datetime import datetime as dt
import pytz
utc=pytz.UTC

import time
import json
import functools as ft
import os
from pathlib import Path
import math

from dotenv import load_dotenv
load_dotenv()

from mathjspy import MathJS
mjs = MathJS()

import requests
from http import HTTPStatus

portfolio = Portfolio()

class BorsdataAPI():
    
    def __init__(self):
        self.BASE_URL = 'https://apiservice.borsdata.se/v1'
        self.API_KEY = os.getenv('BORSDATA_API_KEY')
        self.req_count = 0
        
    def fetch(self, route):
        if self.req_count % 10 == 0:
            time.sleep(1)
        try:
            self.req_count = self.req_count + 1
            res = requests.get(f"{self.BASE_URL}{route}", { "authKey": self.API_KEY, "maxCount": 20 })
        except HTTPError:
            print("Error with 3rd party Borsdata API")
            return False
        else:
            return res.json()
    
    def fetch_instruments(self):
        instruments = self.fetch('/instruments')
        if instruments: return instruments['instruments'] 
        else: return []
    
    def fetch_kpis_metadata(self):
        kpis_metadata = self.fetch('/instruments/kpis/metadata')
        if kpis_metadata: return kpis_metadata['kpiHistoryMetadatas']
        else: return []
    
    def fetch_kpis_summary(self, ins_id):
        kpis_summary = self.fetch(f"/instruments/{ins_id}/kpis/year/summary")
        if kpis_summary: return kpis_summary['kpis']
        else: return []

# instantiate borsdata API
borsdata  = BorsdataAPI()

def get_instrument_list(markets, branches):
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
    Internal function for saving list of available summary KPIs. Abbreviations
    need to be added manually for added user friendlyness in the formulas.
    """
    kpis_metadata = borsdata.fetch_kpis_metadata()
    kpis_summary = borsdata.fetch_kpis_summary(3)
    
    kpi_ids = list(map(lambda kpi: kpi.get('KpiId'), kpis_summary))
    kpis = list(filter(lambda kpi: kpi.get('kpiId') in kpi_ids, kpis_metadata))
    
    with open('data.json', 'w') as f:
        json.dump(kpis, f, indent=4, sort_keys=True)
    
    
    
def get_kpis_list_from_filters(filters):
    formulas = list(map(lambda f: f.get('formula'), filters))
    formula_str = str(ft.reduce(lambda s1, s2: s1 +''+ s2, formulas))

    script_location = Path(__file__).absolute().parent
    file_location = script_location / 'kpis.json'
    
    kpis_file = file_location.open()
    kpis = json.load(kpis_file)
    
    kpis = list(filter(lambda kpi: kpi.get('abbreviation') and (formula_str.find(kpi.get('abbreviation')) != -1), kpis))
    return kpis

def get_kpis_summary_for_instruments(instruments, kpis_list):
    """
    
    """
    kpis_dict = {}
    for kpi in kpis_list:
        kpis_dict[kpi['kpiId']] = kpi['abbreviation']
        
    dfs = []
    for instrument in instruments:
        kpis_summary = borsdata.fetch_kpis_summary(instrument['insId'])
        
        df = pd.json_normalize(kpis_summary, record_path=['values'],  meta=['KpiId'])
        #df.set_index(['KpiId', 'y'], inplace=True)
        #df['abbreviation'] = df['KpiId'].filter(lambda id: id in kpis_dict.keys).transform(lambda id: kpis_dict[str(id)])
        #print(df[df.KpiId in kpis_dict.keys])
        df = df[df['KpiId'].isin(list(kpis_dict.keys()))]
        df['ins_id'] = instrument['insId']
        df['abbreviation'] = df['KpiId'].transform(lambda id: kpis_dict[id])
        df.set_index(['ins_id', 'KpiId', 'y'], inplace=True)
        dfs.append(df)

      
    df = pd.concat(dfs, axis=0)
    return df
    
# def _combine_price_kpis_data(price_data, kpis_data, kpis_list):
    
#     for kpi in kpis_list:
#         abbrev = kpi['abbreviation']
        
#         for ins_id, df in price_data.groupby('ins_id'):
#             price_data[abbrev] = kpis_data
        
def get_pricedata_for_instruments(instruments, start, end):
    """
    Construct a pandas dataframe of aligned pricedata for all instruments
    in the supplied instrument list (from cached pricedata). 
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
    df = df.loc[start:end]
    
    return df

def calculate_rebalance_dates(data, freq):
    rb_dates = list(data.groupby(pd.Grouper(freq=freq)).apply(lambda df: df.index.max()))
    return rb_dates

def get_next_trade_date(data, date, sid):
    try:
        return data.loc[( data.index > date) & (data['ins_id'] == sid) ].iloc[0].name
    except IndexError:
        return False
    
def get_prev_trade_date(data, date, sid):
    try:
        return data.loc[( data.index < date ) & (data['ins_id'] == sid) ].iloc[-1].name
    except IndexError:
        return False

def rebalance_portfolio(data, date, price_data, number_of_stocks):
    # rebalance portfolio and generate orders that will be filled at next open
    size_factor = 1 / number_of_stocks
    # (data contains the new portfolio)
    open_pos = portfolio.get_open_positions()
            
    if not open_pos.empty:
        # sell existing positions that aren't in new candidate list
        for sid, df in open_pos.groupby('sid'):
            if sid not in list(data['ins_id']):

                ticker, open_quantity = df.iloc[0][['ticker', 'open_quantity']]
                trade_date = get_next_trade_date(price_data, date, sid)
                price = price_data.loc[(price_data.index == trade_date) & (price_data['ins_id'] == sid), 'open'][0]
                portfolio.pending_orders.put(OrderEvent(get_next_trade_date(price_data, date, sid), sid, ticker, 'MKT', open_quantity, price, 0, 'SELL', 'rebalance sell'))
    
    if not data.empty:
        for ins_id, df in data.groupby('ins_id'):
            
            trade_date = get_next_trade_date(price_data, date, ins_id)
            if not trade_date: break
            price = price_data.loc[(price_data.index == trade_date) & (price_data['ins_id'] == ins_id), 'open'][0]
            quantity = math.floor(size_factor * portfolio.get_portfolio_equity() / price)
            
            ticker = df['ticker'][0]
    
            curr_size = portfolio.get_current_position_size(ins_id, get_prev_trade_date(price_data, date, ins_id))
            
            size = size_factor - curr_size
            order_cost = size * portfolio.get_portfolio_equity()

          
            quantity = math.floor(order_cost / price)
            
            cash = portfolio.get_available_cash()
            if order_cost <= cash:
                quantity =  math.floor(order_cost / price) 
            else:
                quantity =  math.floor(cash / price)
                
            
            
            print(ticker, quantity, "available cash:", cash)
        
        
            if quantity > 0:
                portfolio.pending_orders.put(OrderEvent(trade_date, ins_id, ticker, 'MKT', quantity, price, 0, 'BUY', 'rebalance buy'))
            if quantity < 0:
                quantity = abs(quantity)
                available_quantity = portfolio.get_available_quantity(ins_id)
                if quantity > available_quantity:
                    quantity = available_quantity
                    
                portfolio.pending_orders.put(OrderEvent(trade_date, ins_id, ticker, 'MKT', quantity, price, 0, 'SELL', 'rebalance sell'))
        

def execute_orders(date):
    order_backlog = queue.Queue()
    while True:
        try:
            order = portfolio.pending_orders.get(False)
        except queue.Empty:
            break
        else:
            print(order.datetime, date)
            if order.datetime == date:
                order.print_order()
                portfolio.update_fill(FillEvent(order.datetime, order.sid, order.ticker,
                                   'OMX', order.quantity, order.order_price, order.stop_loss, order.direction, order.order_type, order.quantity * order.order_price, 'SEK', order.indicator, None))
                
            else:
                order_backlog.put(order)
                
    portfolio.pending_orders = order_backlog

    

def getBacktestResult():
    df_data = {} # used for annual statistics

    res = {
        "years": {}
    }

    # generate monthly returns
    for year in range(2002, 2022):
        res["years"][str(year)] = {
            "months": {}
        }
        df_data[str(year)] = {}
        for month in range(1, 13):
            df_data[str(year)][str(month)] = res["years"][str(year)]["months"][str(month)] = random.randint(-6,8) / 100

    # calculate summary statistics
    stats = pd.DataFrame(df_data).describe().to_dict()
    for key in stats:
        res["years"][key]["statistics"] = stats[key]

    # calculate annual return
    for year in range(2002, 2022): 
        ar = 1
        for month in range(1, 13):
            ar *= (1 + res["years"][str(year)]["months"][str(month)])
        res["years"][str(year)]["statistics"]["return"] = ar

    # calculate total return and cagr
    total_return = 1
    annual_std = 0
    for year in range(2002, 2022): 
        total_return *=  res["years"][str(year)]["statistics"]["return"]
        annual_std += res["years"][str(year)]["statistics"]["return"]
    cagr = total_return**(1 / 20)

    res["statistics"] = {
        "totalReturn": total_return,
        "cagr": cagr
    }
    return res
    

def run_backtest(md: StrategyMetadata):
    instruments = get_instrument_list(md.markets, md.branches)
    
    price_data = get_pricedata_for_instruments(instruments, md.startDate, md.endDate)
    rebalance_dates = calculate_rebalance_dates(price_data, md.rebalanceFrequency)
    
    kpis_list = get_kpis_list_from_filters(md.filters)
    kpis_data = get_kpis_summary_for_instruments(instruments, kpis_list)

    for i, (date, date_df) in enumerate(price_data.groupby(level=0)): # for each date in the selected period
        data = price_data.loc[date].copy()
        
        if date in rebalance_dates: # rebalance portfolio
            
            for filter in md.filters: # apply each filter in a pipeline
            
                for ins_id, df in data.groupby('ins_id'):
                    # set scope of kpis at rebalance date and calculate formula value for each instrument
                    scope = {}
                    for kpi in kpis_list:
                        # delay kpi data with one year to avoid look-ahead bias
                        scope[kpi['abbreviation']] = kpis_data.loc[pd.IndexSlice[ins_id, kpi['kpiId'], date.year-1], 'v']
                    mjs.update(scope)     
    
                    data.loc[data.ins_id == ins_id, 'f_val'] = mjs.eval(filter['formula'])
                # filter out instruments based on filter criterias and update data ahead of next filter to be applied
                data = data.where((data['f_val'] >= filter['minFilterValue']) & (data['f_val'] <= filter['maxFilterValue'])).dropna(how='all')     
                ascending = False if filter['selectionCriteria'] == 'highest' else True
                data = data.sort_values(by=['f_val'], ascending=ascending)
                data = data.iloc[:filter['numberOfStocks']]

            rebalance_portfolio(data, date, price_data, filter['numberOfStocks'])
        
        execute_orders(date)
        portfolio.take_snapshot(date, data) # take snapshot of current positions and on an aggregated portfolio level
        
    print(portfolio.portfolio_snapshots.tail(15))


    
import random
from urllib.error import HTTPError
import pandas as pd
from .models import StrategyMetadata
import numpy as np

import os
from dotenv import load_dotenv

import requests
from http import HTTPStatus

        # let data = await getBorsdataData('/instruments')
        # let instruments: Instruments = data.instruments

        # let stocks = instruments.filter((i: Instrument) => {
        #         return (
        #             sm.markets.map((m: Market) => m.id).includes(i.marketId) &&
        #             sm.branches.map((b: Branch) => b.id).includes(i.branchId)
        #         )
        #     }
        # )
        
        # let filterString: String = sm.filters.map((f: Filter) => f.formula).reduce(
        #     (s1: String, s2: String): String => s1 + '' + s2)

        # let kpisNeeded = kpis.splice(0, 29).filter((k: KPI) => {
        #     return k.abbreviation && filterString.indexOf(k.abbreviation) != -1
        # })


def get_instruments(countries, markets, sectors, branches):
    URL = "https://apiservice.borsdata.se/v1/instruments/"
    try:
        res = requests.get(URL, { "authKey": os.getenv('BORSDATA_API_KEY') })
        if res.status_code == HTTPStatus.OK:
            instruments = res.json()['instruments']      
            market_ids = list(map(lambda m: m.get('id'), markets))
            branch_ids = list(map(lambda b: b.get('id'), branches)) 
            instruments = list(filter(lambda i: i.get('marketId') in market_ids and i.get('branchId') in branch_ids, instruments))
            return instruments
        else:
            return False
    except HTTPError:
        return False

load_dotenv()

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
    instruments = get_instruments(md.countries, md.markets, md.sectors, md.branches)
    
    if instruments: print(instruments)
    else: print("nope")
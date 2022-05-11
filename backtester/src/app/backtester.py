import random
from urllib.error import HTTPError
import pandas as pd
from .models import StrategyMetadata
import numpy as np

import json
import functools as ft
import os
from dotenv import load_dotenv
load_dotenv()

import requests
from http import HTTPStatus


def get_instrument_list(countries, markets, sectors, branches):
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

def get_kpi_list(filters):
    formulas = list(map(lambda f: f.get('formula'), filters))
    formula_str = str(ft.reduce(lambda s1, s2: s1 +''+ s2, formulas))
    
    from pathlib import Path

    script_location = Path(__file__).absolute().parent
    file_location = script_location / 'kpis.json'
    
    kpi_file = file_location.open()
    kpis = json.load(kpi_file)[0:30]

    kpis = list(filter(lambda kpi: kpi.get('abbreviation') and (formula_str.find(kpi.get('abbreviation')) != -1), kpis))
    
    print(formula_str)
    print(kpis)
    
def _save_summary_kpis():
    """
    Internal function for saving list of available summary KPIs. Abbreviations
    need to be added manually for added user friendlyness in the formulas.
    """
    meta_URL = "https://apiservice.borsdata.se/v1/instruments/kpis/metadata"
    kpis_URL = "https://apiservice.borsdata.se/v1/instruments/3/kpis/year/summary"
    try:
        res = requests.get(kpis_URL, { "authKey": os.getenv('BORSDATA_API_KEY'), "maxCount": 20 })
        meta_res = requests.get(meta_URL, { "authKey": os.getenv('BORSDATA_API_KEY') })
        if res.status_code == HTTPStatus.OK:
            kpis = res.json()['kpis']
            meta = meta_res.json()['kpiHistoryMetadatas']
            
            kpi_ids = list(map(lambda kpi: kpi.get('KpiId'), kpis))
            kpis = list(filter(lambda kpi: kpi.get('kpiId') in kpi_ids, meta))

            with open('data.json', 'w') as f:
                json.dump(kpis, f, indent=4, sort_keys=True)
        else:
            return False
    except HTTPError:
        return False




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
    instruments = get_instrument_list(md.countries, md.markets, md.sectors, md.branches)
    
    if instruments: print(instruments)
    else: print("nope")

    print(get_kpi_list(md.filters))
    
    _save_summary_kpis()
    
import random
from urllib.error import HTTPError
import pandas as pd
from .models import StrategyMetadata
import numpy as np
from datetime import datetime as dt

import time
import json
import functools as ft
import os
from pathlib import Path

from dotenv import load_dotenv
load_dotenv()

import requests
from http import HTTPStatus

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

def _get_instrument_list(markets, branches):
    instruments = borsdata.fetch_instruments()

    market_ids = list(map(lambda m: m.get('id'), markets))
    branch_ids = list(map(lambda b: b.get('id'), branches)) 
    instruments = list(filter(lambda i: i.get('marketId') in market_ids and i.get('branchId') in branch_ids, instruments))
    return instruments

    
def _save_summary_kpis_list():
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
    
    
    
def _get_kpis_list_from_filters(filters):
    formulas = list(map(lambda f: f.get('formula'), filters))
    formula_str = str(ft.reduce(lambda s1, s2: s1 +''+ s2, formulas))

    script_location = Path(__file__).absolute().parent
    file_location = script_location / 'kpis.json'
    
    kpis_file = file_location.open()
    kpis = json.load(kpi_file)
    
    kpis = list(filter(lambda kpi: kpi.get('abbreviation') and (formula_str.find(kpi.get('abbreviation')) != -1), kpis))
    return kpis

def _get_kpis_summary_for_instruments(instruments):
    
    for instrument in instruments:
        kpis_summary = borsdata.fetch_kpis_summary(instrument['insId'])
        #print(pd.DataFrame(kpis_summary))
        df = pd.json_normalize(kpis_summary, record_path=['values'],  meta=['KpiId'])
        df.set_index(['KpiId', 'y'], inplace=True)
        print(df)
        
def _get_pricedata_for_instruments(instruments):
    
    for instrument in instruments:
        print(pd.read_csv(f"./pricedata/{instrument['insId']} {instrument['ticker']}.csv"))


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
    instruments = _get_instrument_list(md.markets, md.branches)
    
    _get_kpis_summary_for_instruments(instruments)
    
    _get_pricedata_for_instruments(instruments)
    
    if instruments:
        #_fetch_summary_kpis(instruments)
        print(instruments)

    
    
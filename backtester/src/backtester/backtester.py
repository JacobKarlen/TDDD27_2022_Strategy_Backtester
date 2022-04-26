import random
import pandas as pd
import numpy as np

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
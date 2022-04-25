import random
import pandas as pd
import numpy as np

def getBacktestResult():
    res = {}

    # generate monthly returns
    for year in range(2002, 2022):
        res[str(year)] = {}
        for month in range(1, 13):
            res[str(year)][str(month)] = random.randint(-6,8) / 100

    # calculate summary statistics
    stats = pd.DataFrame(res).describe().to_dict()
    for key in stats:
        res[key]["statistics"] = stats[key]

    # calculate annual return
    for year in range(2002, 2022): 
        ar = 1
        for month in range(1, 13):
            ar *= (1 + res[str(year)][str(month)])
        res[str(year)]["statistics"]["return"] = ar

    # calculate total return and cagr
    total_return = 1
    annual_std = 0
    for year in range(2002, 2022): 
        total_return *=  res[str(year)]["statistics"]["return"]
        annual_std += res[str(year)]["statistics"]["return"]
    cagr = total_return**(1 / 20)
    
    res["statistics"] = {
        "totalReturn": total_return,
        "cagr": cagr
    }
    return res
from datetime import datetime as dt
from fastapi import FastAPI
from .backtester import getBacktestResult, run_backtest
from .models import RequestBody, StrategyMetadata
import requests
app = FastAPI(debug=True)

@app.post("/backtester")
def read_backtester(body: RequestBody):
    # change input to also take in strategyId (ObjectID) and use that when sending post request back w. results
    result = run_backtest(body.md)
    
    # print(result)
    # requests.post('http://express-server.dev/api/backtester/results', json={
    #     'strategyId': body.id,
    #     'result': result
    # })
    return {
        'strategyId': body.id,
        'result': result
    }

@app.get("/")
def read_root():
    return { "message": "in root route" }
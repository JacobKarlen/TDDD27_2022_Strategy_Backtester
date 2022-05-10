from datetime import datetime as dt
from fastapi import FastAPI
from .backtester import getBacktestResult, run_backtest
from .models import StrategyMetadata

app = FastAPI(debug=True)

@app.post("/backtester")
def read_backtester(metadata: StrategyMetadata):
    run_backtest(metadata)
    return { "result": getBacktestResult() }

@app.get("/")
def read_root():
    return { "message": "in root route" }
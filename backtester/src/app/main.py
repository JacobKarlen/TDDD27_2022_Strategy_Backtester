from fastapi import FastAPI
from .backtester import run_backtest
from .models import RequestBody
app = FastAPI(debug=True)

@app.post("/backtester")
def read_backtester(body: RequestBody):
    """
    Main backtester route for running backtests.

    Args:
        body (RequestBody): The expected request body with strategy metadata
        defining the strategy and an id representing the mongodb strategy id.

    Returns:
        obj: return object with strategy id and  backtest results.
    """
    result = run_backtest(body.md)

    return {
        'strategyId': body.id,
        'result': result
    }

@app.get("/")
def read_root():
    return { "message": "in root route" }
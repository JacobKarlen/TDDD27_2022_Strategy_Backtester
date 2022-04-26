from fastapi import FastAPI
import backtester.backtester as backtester

app = FastAPI(debug=True)

@app.get("/backtester")
def read_backtester():
    print("in python backtester")
    return { "result": backtester.getBacktestResult() }

@app.get("/")
def read_root():
    return { "message": "in root route" }
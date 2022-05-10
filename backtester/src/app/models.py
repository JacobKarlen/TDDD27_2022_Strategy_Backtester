from pydantic import BaseModel
from datetime import datetime

class StrategyMetadata(BaseModel):

    strategyName: str
    accessStatus: str

    startDate: datetime
    endDate: datetime

    transactionCost: float
    rebalanceFrequency: str

    countries: list 
    markets: list

    sectors: list
    branches: list
 
    filters: list
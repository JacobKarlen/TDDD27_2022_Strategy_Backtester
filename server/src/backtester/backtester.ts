import { StrategyMetadata, RebalanceSchedule, YearlyRebalance, MonthlyRebalance, Filter } from "../models/backtester";
import { Branch, Instrument, Instruments, Market, KPI } from "../models/borsdata";
import { getBorsdataData } from "../routes/borsdata";
import { generateRebalanceSchedule } from "./helpers";

import { kpis } from "../data/kpis";


/*
Test if it is reasonable to perform backtests in node
*/
export async function runBacktest(sm: StrategyMetadata) {

    try {

        let data = await getBorsdataData('/instruments')
        let instruments: Instruments = data.instruments

        let stocks = instruments.filter((i: Instrument) => {
                return (
                    sm.markets.map((m: Market) => m.id).includes(i.marketId) &&
                    sm.branches.map((b: Branch) => b.id).includes(i.branchId)
                )
            }
        )
        
        let filterString: String = sm.filters.map((f: Filter) => f.formula).reduce(
            (s1: String, s2: String): String => s1 + '' + s2)

        let kpisNeeded = kpis.splice(0, 29).filter((k: KPI) => {
            return k.abbreviation && filterString.indexOf(k.abbreviation) != -1
        })


        console.log(kpisNeeded)
        let scope = {
            PE: '"'
        }

        

        let rebalanceSchedule: RebalanceSchedule = generateRebalanceSchedule(sm.startDate, sm.endDate);

        for (let y = 0; y < rebalanceSchedule.length; y++) {
            for (let m = 0; m < rebalanceSchedule[y].months.length; m++) {
                console.log(rebalanceSchedule[y].months[m].date)
            }
        }

    } catch (e) {
        console.log('Error: ', e)
    }  

}
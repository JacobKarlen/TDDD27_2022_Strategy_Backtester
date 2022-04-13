import { StrategyMetadata } from "../models/backtester";
import { Branch, Instrument, Instruments, Market } from "../models/borsdata";
import { getBorsdataData } from "../routes/borsdata";
import { generateRebalanceSchedule } from "./helpers";


/*
Test if it is reasonable to perform backtests in node
*/
export async function runBacktest(sm: StrategyMetadata) {

    try {
        let data = await getBorsdataData('/instruments')
        let instruments: Instruments = data.instruments

        let universe = instruments.filter((i: Instrument) => {
                return (
                    sm.markets.map((m: Market) => m.id).includes(i.marketId) &&
                    sm.branches.map((b: Branch) => b.id).includes(i.branchId)
                )
            }
        )
        console.log(universe.map((i:Instrument) => i.name))
        console.log(universe.length)    

        console.log(generateRebalanceSchedule(sm.startDate, sm.endDate)[0]);

    } catch (e) {
        console.log('Error: ', e)
    }  

}
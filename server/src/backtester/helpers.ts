import { trading_dates } from "../data/trading_dates";

interface MonthlyRebalance {
    month: string;
    date: string;
}
interface YearlyRebalance {
    year: string;
    months: MonthlyRebalance[]
}
interface RebalanceSchedule extends Array<YearlyRebalance> {}

export function generateRebalanceSchedule(startDate: Date, endDate: Date): RebalanceSchedule {

    let start = startDate.toLocaleString('sv-SE').split('T')[0].split('-');
    let end = endDate.toLocaleString('sv-SE').split('T')[0].split('-');

    let startYear = parseInt(start[0]);
    let endYear    = parseInt(end[0]);
    
    let schedule: RebalanceSchedule= [];

  
    for(let i = startYear; i <= endYear; i++) {
        let yearlyRebalance: YearlyRebalance = { year: i.toString(), months: [] } 
        let endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
        let startMon = i === startYear ? parseInt(start[1]) : 0;
      for(let j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        let month = j+1;
        let displayMonth = month < 10 ? '0'+month : month;

        let day = 1
        let date = [i, displayMonth, '0'+day].join('-')

        while (!trading_dates.includes(date)) {
            // make sure market open on scheduled rebalance day
            date = [i, displayMonth, '0'+day++].join('-')
        }

        yearlyRebalance.months.push({
            month: displayMonth.toString(), 
            date: date
        });
      }
      schedule.push(yearlyRebalance)
    }
    return schedule;
  }

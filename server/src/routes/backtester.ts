import { Router, Request, Response } from "express";
import { StrategyMetadata, StrategyResult, IStrategy, Strategy } from "../models/backtester";
import { checkAuthenticated } from "../auth/auth-middleware";
import { HydratedDocument } from "mongoose";

const http = require('http')

export const backtesterRouter = Router();

export const getBacktestResult = async (): Promise<any> => {
    // used to request backtester api
    // currently serves fake generated results
    let URL = `http://backtester-api.dev:8000/backtester` 

    return new Promise((resolve, reject) => {
        http.get(URL, (res: any) => {
            // assemble data chunks into complete response body
            let data = ''
            
            res.on('data', (chunk: string) => { 
        
                data += chunk })
            res.on('end', () => { resolve(JSON.parse(data)) })
            
        }).on('error', (error: Error) => {
            console.log("Error: ", error)
            reject()
        })
    })
   
}

backtesterRouter.post('/backtester/run', checkAuthenticated, async (req: Request, res: Response) => {
    let strategyMetadata: StrategyMetadata = req.body
    // currently gets random backtest result generated from python api

    try {
        let data = await getBacktestResult()
        let result: StrategyResult = data.result

        let strategy: IStrategy = {
            metadata: strategyMetadata,
            result: result,
            user: req.user?._id
        }

        let savedStrategy = await (new Strategy(strategy)).save()

        res.status(200).json(savedStrategy)
    
    } catch (e) {
        console.log(e)
        res.status(503).json({ "message": "error with python backtester"})
    }  
   
})

backtesterRouter.get('/strategies', checkAuthenticated, (req: Request, res: Response) => {
    Strategy.find({}, async (err: Error, strategies: HydratedDocument<IStrategy>) => {
        res.json(strategies);
    });
})
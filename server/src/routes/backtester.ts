import { Router, Request, Response } from "express";
import { StrategyMetadata, StrategyResult, IStrategy, Strategy } from "../models/backtester";
import { checkAuthenticated } from "../auth/auth-middleware";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";

const http = require('http')

export const backtesterRouter = Router();

export const getBacktestResult = async (metadata: StrategyMetadata, strategyId: mongoose.Types.ObjectId): Promise<any> => {
    // used to request backtester api
    // currently serves fake generated results
    let URL = `http://backtester-api.dev:8000/backtester` 

    return new Promise((resolve, reject) => {
        const req = http.request({
            hostname: 'backtester-api.dev',
            port: 8000,
            path: '/backtester',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }, (res: any) => {
            // assemble data chunks into complete response body
            let data = ''
            
            res.on('data', (chunk: string) => { 
                data += chunk 
            })
            res.on('end', () => { resolve(JSON.parse(data)) })
            
        }).on('error', (error: Error) => {
            console.log("Error: ", error)
            reject()
        })
        req.on('error', (error: Error) => {
            console.error(error)
        })
        req.write(JSON.stringify({ md: metadata, id: strategyId }))
        req.end()
        console.log("in getBacktestResult")
    })
   
}

backtesterRouter.post('/backtester/run', checkAuthenticated, async (req: Request, res: Response) => {
    let strategyMetadata: StrategyMetadata = req.body
    // currently gets random backtest result generated from python api

    try {
        let strategy: IStrategy = {
            metadata: strategyMetadata,
            user: req.user?._id,
            username: req.user?.username || ""
        }

        let savedStrategy = await (new Strategy(strategy)).save()

        getBacktestResult(strategyMetadata, savedStrategy._id)

        res.status(200).json(savedStrategy)
    
    } catch (e) {
        console.log(e)
        res.status(503).json({ "message": "error with python backtester"})
    }  
   
})


backtesterRouter.post('/backtester/post/results', async (req: Request, res: Response) => {
    // need to get the strategy id or something to verify and use when updating result
    let data = req.body
    let strategyId = data.strategyId
    try {
        await Strategy.updateOne({ _id: strategyId }, { $set: { result: data.result }})
        res.status(200).json({ "message": "result successfully added to strategy"})
    } catch (e) {
        res.send(503).json({ "error": "the result was not added to the specified strategy"})
    }  
    
})

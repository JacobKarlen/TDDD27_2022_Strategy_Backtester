import { Router, Request, Response } from "express";
import { StrategyMetadata, StrategyResult, IStrategy, Strategy } from "../models/backtester";
import { checkAuthenticated } from "../auth/auth-middleware";
import { HydratedDocument } from "mongoose";
import mongoose from "mongoose";

const http = require('http')

export const backtesterRouter = Router();

export const getBacktestResult = async (metadata: StrategyMetadata, strategyId: mongoose.Types.ObjectId): Promise<any> => {
    // used to request backtester api
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
            res.on('end', () => { 
                try {
                    resolve(JSON.parse(data)) 
                } catch (e) {
                    Strategy.updateOne({ _id: strategyId }, { $set: { status: {
                        status: 'failed',
                        message: 'The strategy backtest failed due to a server error.' 
                    }}})
                }
                
            })
            
        })

        req.on('error', (error: Error) => {
            console.error(error)
            Strategy.updateOne({ _id: strategyId }, { $set: { status: {
                status: 'failed',
                message: 'The strategy backtest failed due to a server error.' 
            }}})
            reject()
        })
        
        req.write(JSON.stringify({ md: metadata, id: strategyId }))
        req.end()
    })
   
}

backtesterRouter.post('/backtester/run', checkAuthenticated, async (req: Request, res: Response) => {
    let strategyMetadata: StrategyMetadata = req.body

    try {
        let strategy: IStrategy = {
            metadata: strategyMetadata,
            status: {
                status: 'started',
                message: 'The strategy backtest is currently running, come back later for the results.',
            },
            user: req.user?._id,
            username: req.user?.username || ""
        }

        let savedStrategy = await (new Strategy(strategy)).save()

        getBacktestResult(strategyMetadata, savedStrategy._id).then(async (data) => {
            // this part is async, and so the 
            try {
                await Strategy.updateOne({ _id: data.strategyId }, { $set: { result: data.result, status: {
                    status: 'finished',
                    message: 'The strategy backtest successfully finished.' 
                }}})
            } catch (e) {
                await Strategy.updateOne({ _id: data.strategyId }, { $set: { status: {
                    status: 'failed',
                    message: 'The strategy backtest failed due to a server error.' 
                }}})
                console.error("Error; The result was not added to the specified strategy")
            }  
        })

        res.status(200).json(savedStrategy)
    
    } catch (e) {
        console.error(e)
        res.status(503).json({ "message": "Error with python backtester. Failed to start backtest."})
    }  
   
})

backtesterRouter.post('/backtester/results', async (req: Request, res: Response) => {
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

import { runBacktest } from "../backtester/backtester";
import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user";

const http = require('http')


const axios = require('axios');

export const backtesterRouter = Router();

export const getBacktestResult = async (): Promise<any> => {
    // used to request backtester api
    // currently serves fake generated results
    let URL = `http://backtester-api.dev:8040/backtester` 

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

backtesterRouter.get('/backtester/run', async (req: Request, res: Response) => {
    let backtestMetadata = req.body

    try {
        let data = await getBacktestResult()
        res.status(200).json(data)
    
    } catch (e) {
        console.log(e)
        res.status(503).json({ "message": "error with python backtester"})
    }  
   
})
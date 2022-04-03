import { Router, Request, Response } from "express";
const https = require('https')
import { config } from "../config";
require("dotenv").config({ path: "../../.env" })

export const borsdataRouter = Router();

const API_BASE_URI = 'https://apiservice.borsdata.se/v1'

borsdataRouter.get('/borsdata/markets', async (req: Request, res: Response) => {
    const API_KEY = process.env.BORSDATA_API_KEY

    https.get(`${API_BASE_URI}/markets?authKey=${API_KEY}`, (b_res: any) => {

        console.log(`${API_BASE_URI}/markets?authKey=${API_KEY}`)
        let data = ''
        b_res.on('data', (chunk: string) => {
            data += chunk
        })

        b_res.on('end', () => {
           res.json(JSON.parse(data))
        })
        
    }).on('error', (error: Error) => {
        console.log("Error: ", error)
        res.json({ message: "An error occured on the server"})
    })

})
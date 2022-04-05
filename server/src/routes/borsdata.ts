import { Router, Request, Response } from "express";
const https = require('https')
import { config } from "../config";
require("dotenv").config({ path: "../../.env" })

export const borsdataRouter = Router();

const API_BASE_URI = 'https://apiservice.borsdata.se/v1'

const getBorsdataData = (path: string, res: Response) => {
    const API_KEY = process.env.BORSDATA_API_KEY

    https.get(`${API_BASE_URI}${path}?authKey=${API_KEY}`, (b_res: any) => {

        let data = ''
        b_res.on('data', (chunk: string) => {
            data += chunk
        })

        b_res.on('end', () => {
            return res.json(JSON.parse(data))
        })
        
    }).on('error', (error: Error) => {
        console.log("Error: ", error)
        return res.json({ message: "An error occured on the server while requesting borsdata api"})
    })
}

borsdataRouter.get('/borsdata/markets', async (req: Request, res: Response) => {
   getBorsdataData('/markets', res)
})

borsdataRouter.get('/borsdata/countries', async (req: Request, res: Response) => {
    getBorsdataData('/countries', res)
 })

 borsdataRouter.get('/borsdata/branches', async (req: Request, res: Response) => {
    getBorsdataData('/branches', res)
 })

 
 borsdataRouter.get('/borsdata/sectors', async (req: Request, res: Response) => {
    getBorsdataData('/sectors', res)
 })
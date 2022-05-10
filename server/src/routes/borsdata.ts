import { Router, Request, Response } from "express";
import { Branches, Countries, Instruments, Markets, Sectors } from "models/borsdata";
const https = require('https')
import { config } from "../config";

require("dotenv").config({ path: "../../.env" })

export const borsdataRouter = Router();

const API_BASE_URI = 'https://apiservice.borsdata.se/v1'

// potential TODO: refactor using middleware

export const getBorsdataData = async (path: string): Promise<any> => {
    // async function for fetching data from borsdata api
    const API_KEY = process.env.BORSDATA_API_KEY
    let URL = `${API_BASE_URI}${path}?authKey=${API_KEY}`

    return new Promise((resolve, reject) => {
        https.get(URL, (res: any) => {
            // assemble data chunks into complete response body
            let data = ''
            res.on('data', (chunk: string) => { data += chunk })
            res.on('end', () => { resolve(JSON.parse(data)) })
            
        }).on('error', (error: Error) => {
            console.log("Error: ", error)
            reject()
        })
    })
   
}


borsdataRouter.get('/borsdata/countries', async (req: Request, res: Response) => {
    try {
        let data = await getBorsdataData('/countries')
        let countries: Countries = data.countries
        res.status(200).json(countries)
    } catch (e) {
        console.log('Error: ', e)
        res.status(503).json({ "message": "error with 3rd party service"})
    }  
 })

borsdataRouter.get('/borsdata/markets', async (req: Request, res: Response) => {
    try {
        let data = await getBorsdataData('/markets')
        let markets: Markets = data.markets
        res.status(200).json(markets)
    } catch (e) {
        console.log('Error: ', e)
        res.status(503).json({ "message": "error with 3rd party service"})
    }  
})

borsdataRouter.get('/borsdata/sectors', async (req: Request, res: Response) => {
    try {
        let data = await getBorsdataData('/sectors')
        let sectors: Sectors = data.sectors
        res.status(200).json(sectors)
    } catch (e) {
        console.log('Error: ', e)
        res.status(503).json({ "message": "error with 3rd party service"})
    } 
 })

 borsdataRouter.get('/borsdata/branches', async (req: Request, res: Response) => {
    try {
        let data = await getBorsdataData('/branches')
        let branches: Branches = data.branches
        res.status(200).json(branches)
    } catch (e) {
        console.log('Error: ', e)
        res.status(503).json({ "message": "error with 3rd party service"})
    }  
 })




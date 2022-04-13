import { runBacktest } from "../backtester/backtester";
import { Router, Request, Response } from "express";
import { User, IUser } from "../models/user";
const bcrypt = require("bcrypt");

export const backtesterRouter = Router();

backtesterRouter.post('/backtester/run', async (req: Request, res: Response) => {
    let backtestMetadata = req.body

    runBacktest(backtestMetadata)

    res.status(200).json({ "message": "backtest successfully started"})
})
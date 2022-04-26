import { Router, Request, Response } from "express";
import { IStrategy, Strategy } from "../models/backtester";
import { checkAuthenticated } from "../auth/auth-middleware";
import { HydratedDocument } from "mongoose";

export const strategyRouter = Router();

strategyRouter.get('/strategies/all', checkAuthenticated, (req: Request, res: Response) => {
    Strategy.find({}, async (err: Error, strategies: HydratedDocument<IStrategy>) => {
        res.json(strategies);
    });
})

strategyRouter.get('/strategies/my', checkAuthenticated, (req: Request, res: Response) => {
    Strategy.find({ user: req.user?._id }, async (err: Error, strategies: HydratedDocument<IStrategy>) => {
        res.json(strategies);
    });
})
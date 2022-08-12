import { Router, Request, Response } from "express";
import { IStrategy, Strategy } from "../models/backtester";
import { checkAuthenticated } from "../auth/auth-middleware";
import { HydratedDocument } from "mongoose";
import { User, IUser } from "../models/user";

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

strategyRouter.get('/users/:username/strategies/', checkAuthenticated, (req: Request, res: Response) => {
    let username = req.params.username
    User.find({ username: username }, async (err: Error, users: HydratedDocument<IUser[]>) => {
        
        let userId = users[0]._id

        Strategy.find({ user: userId }, async (err: Error, strategies: HydratedDocument<IStrategy[]>) => {
            if (userId.equals(req.user?._id)) {
                res.json(strategies)
            } else {
                res.json(strategies.filter((strategy: IStrategy) => strategy.metadata.accessStatus == 'public'))
            }
            
        });

    })
    
})

strategyRouter.get('/users/:username/strategies/:strategyName', checkAuthenticated, (req: Request, res: Response) => {
    let { username, strategyName } = req.params
    Strategy.findOne({ 'username': username, 'metadata.strategyName': strategyName }, async (err: Error, strategy: HydratedDocument<IStrategy>) => { 
     
        if (strategy.user && strategy.user == req.user?._id) {
            res.json(strategy)
        } else if (strategy.metadata.accessStatus === 'public') {
            res.json(strategy)
        }    
    })
    
})
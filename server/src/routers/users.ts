import { Router, Request, Response } from "express";
import { IStrategy, Strategy } from "../models/backtester";
import { checkAuthenticated } from "../auth/auth-middleware";
import { HydratedDocument } from "mongoose";
import { User, IUser } from "../models/user";

import mongoose from 'mongoose';

export const usersRouter = Router();

usersRouter.put('/users/follow/:username', checkAuthenticated, async (req: Request, res: Response) => {
    let userId = req.user?._id
    let username = req.params.username

    User.find({ username: username }, async (err: Error, users: HydratedDocument<IUser[]>) => {
        try {        
            let id = users[0]._id
            if (userId != null && id.equals(userId)) {
                return res.status(400).json({ 'error': 'you are not allowed to follow yourself'})
            } 
        
            let u1 = await User.updateOne({ _id: userId, following: { $not: { $elemMatch: { $eq: id }}} }, { $addToSet: { following: id }})
            let u2 = await User.updateOne({ _id: id, followers: { $not: { $elemMatch: { $eq: userId }}} }, { $addToSet: { followers: userId}})
            
            if (!u1 || !u2) return res.status(404).json({ 'error': 'unable to follow user ' + username})

            return res.status(200).json({ 'message': 'you are now following user ' +username })
        } catch (e: any) {
            return res.status(400).json({ 'error': e.message })
        }
    });
})

usersRouter.put('/users/unfollow/:username', checkAuthenticated, async (req: Request, res: Response) => {
    let userId = req.user?._id
    let username = req.params.username
    User.find({ username: username }, async (err: Error, users: HydratedDocument<IUser[]>) => {
        try {        
            let id = users[0]._id

            if (userId != null && id.equals(userId)) {
                return res.status(400).json({ 'error': 'you are not allowed to unfollow yourself'})
            } 
        
            let u1 = await User.updateOne({ _id: userId, following: { $elemMatch: { $eq: id }} }, { $pull: { following: id }})
            let u2 = await User.updateOne({ _id: id, followers: { $elemMatch: { $eq: userId }} }, { $pull: { followers: userId}})
            
            if (!u1 || !u2) return res.status(404).json({ 'error': 'unable to unfollow user ' + username})

            return res.status(200).json({ 'message': 'you are no longer following user ' +username })
        } catch (e: any) {
            return res.status(400).json({ 'error': e.message })
        }
    });
})

usersRouter.get('/following', checkAuthenticated, async (req: Request, res: Response) => { 
    let following = req.user?.following;
    User.find({ _id: { $in: following } }, async (err: Error, users: HydratedDocument<IUser[]>) => {
        res.status(200).json(users)
    })
})

usersRouter.get('/users', checkAuthenticated, (req: Request, res: Response) => {
    User.find({}, async (err: Error, users: HydratedDocument<IUser>) => {
        res.json(users);
    });
})


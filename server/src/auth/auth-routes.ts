import { Router, Request, Response } from "express";
import { Error, HydratedDocument } from "mongoose";
import { User, IUser } from "../models/user";
import passport from "passport";
const bcrypt = require("bcrypt");

export const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
    let userInfo = req.body
    let userExists = await User.userExists(userInfo.username, userInfo.email)

    if (userExists) return res.json(userExists)

    let savedUser = await (new User(userInfo)).save()
    res.json({ "user": savedUser })
})

authRouter.post('/login', async(req: Request, res: Response, next: Function) => {
    passport.authenticate('local', function(error, user, info) {
        if (error) return next(error)
        if (!user) return res.json(info)
        
        req.logIn(user, function(error) {
            if (error) return next(error)
            return res.json({ "user": user })
        })
    })(req, res, next)
})

authRouter.delete('/logout', async (req: Request, res: Response) => {
    req.logOut()
    res.json({ message: "You have been logged out"})
})

authRouter.get('/users', (req: Request, res: Response) => {
    User.find({}, async (err: Error, users: HydratedDocument<IUser>) => {
        res.json(users);
    });
})

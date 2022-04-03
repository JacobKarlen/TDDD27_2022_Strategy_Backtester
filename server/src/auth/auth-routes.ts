import { Router, Request, Response } from "express";
import { Error, HydratedDocument } from "mongoose";
import { User, IUser } from "../models/user";
import passport from "passport";
import { checkAuthenticated } from "./auth-middleware";
const bcrypt = require("bcrypt");

export const authRouter = Router();

authRouter.post('/register', async (req: Request, res: Response) => {
    let userInfo = req.body
    let message = await User.userExists(userInfo.username, userInfo.email)
    // userExists returns an error message if username/email already in use, false otherwise

    if (message) return res.status(400).json(message)

    let savedUser = await (new User(userInfo)).save()
    res.status(201).json({ "user": savedUser })
})

authRouter.post('/login', async(req: Request, res: Response, next: Function) => {
    passport.authenticate('local', function(error, user, message) {
        if (error) return next(error)
        if (!user) return res.status(401).json(message)
        
        req.logIn(user, function(error) {
            if (error) return next(error)
            return res.status(200).json({ "user": user })
        })
    })(req, res, next)
})

authRouter.delete('/logout', async (req: Request, res: Response) => {
    req.logOut()
    res.status(200).json({ message: "You have been logged out"})
})

authRouter.get('/users', checkAuthenticated, (req: Request, res: Response) => {
    User.find({}, async (err: Error, users: HydratedDocument<IUser>) => {
        res.json(users);
    });
})


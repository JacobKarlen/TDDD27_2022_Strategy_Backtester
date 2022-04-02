const LocalStrategy = require("passport-local");
import { PassportStatic }  from "passport";
import { User, IUser } from "../models/user";
import { Types } from "mongoose";

export function initialize(passport: PassportStatic) {
    const authenticateUser = async (username: string, password: string, done: Function) => {
        User.authenticate(username, password)
            .then((user: IUser | boolean) => {
                if (user) done(null, user)
                else done(null, false, { message: 'Incorrect username or password'})
            })
            .catch(error => done(error))

    }

    passport.use(new LocalStrategy({ usernameField: 'username'}, authenticateUser))
    
    passport.serializeUser((user: any, done: Function) => {
        done(null, user._id)
    })
    passport.deserializeUser((id: Types.ObjectId, done: Function) => {
        User.findById(id, (error: Error, user: IUser) => {
            if (error) return done(error)
            done(null, user)
        })
    })

}

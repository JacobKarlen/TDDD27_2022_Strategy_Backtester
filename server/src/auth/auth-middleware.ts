import { Request, Response } from "express"

export let checkAuthenticated = (req: Request, res: Response, next: Function) => {
    if (req.isAuthenticated()) return next()

    res.status(401).json({ message: "Authentification failed"})
}
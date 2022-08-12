import { Router, Request, Response } from "express";

export const router = Router();

router.get('/helloworld', (req: Request, res: Response) => {
    res.json({
        "message": "hello worlds!"
    });
});
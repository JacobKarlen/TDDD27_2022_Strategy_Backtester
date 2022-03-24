import { Router, Request, Response } from "express";

export const router = Router();

router.get('/helloworld', async (req: Request, res: Response) => {
    res.json({
        "message": "hello world!" 
    });
});
import {Request, Response } from 'express';
import CreateDraft from '../services/create_draft_service';

export default class DraftController{
    public handler(req: Request, res: Response){
        const deposit = new CreateDraft().execute(req.body)
        res.send({
            data: deposit,
            message: "Success",
            status: 200
        })
    }
}
import {Request, Response } from 'express';
import GetExtract from '../services/get_extract_service';

export default class ExtractController{
    public async handler(req: Request, res: Response){
        const extract = await new GetExtract().execute(req.body)
        res.send({
            data: extract,
            message: "Success",
            status: 200
        })
    }
}
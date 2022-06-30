import {Request, Response } from 'express';
const _ = require('underscore');
import GetExtract from '../services/get_extract_service';
export default class ExtractController{
    public async handler(req: Request, res: Response){
        const extract = await new GetExtract().execute(req.body)
        extract.account = _.omit(extract.account,'id','password','user_id')        
        res.send({
            data: extract,
            message: "Success",
            status: 200
        })
    }
}
import {Request, Response } from 'express';
const _ = require('underscore');
import { Result } from '../utils/result';
import ExtractResponse from '../model/extract_response_model';
import GetExtract from '../services/get_extract_service';
export default class ExtractController{
    public async handler(req: Request, res: Response){
        const data: Result<ExtractResponse> = await new GetExtract().execute(req.body)
        if(data.isFailure){
            return res.send({
                data: data.error.message,
                message: data.error.name,
                status: data.error.status
            }) 
        }
        const extract = data.getValue()
        extract.account = _.omit(extract.account,'id','password','user_id')        
        res.send({
            data: extract,
            message: "Success",
            status: 200
        })
    }
}
import {Request, Response } from 'express';
import CreateDraft from '../services/create_draft_service';
import DraftResponse from '../model/draft_response_model';
import { Result } from '../utils/result';
const _ = require('underscore')
export default class DraftController{
    public async handler(req: Request, res: Response){
        const data: Result<DraftResponse> = await new CreateDraft().execute(req.body)
        if(data.isFailure){ 
            console.log(data.error)
            return res.send({
                data: data.error.message,
                message: data.error.name,
                status: data.error.status
            })
        }
        const deposit = data.getValue()
        const payload = _.omit(deposit,'destiny_account','id')
        payload.draft = _.omit(payload.draft,'account','destiny_account')
        payload.account = _.omit(deposit.account,'id','password','user_id','created_at')
        res.send({
            data: payload,
            message: "Success",
            status: 200
        })
    }
}
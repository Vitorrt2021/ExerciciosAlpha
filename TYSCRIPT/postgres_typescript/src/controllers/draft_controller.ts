import {Request, Response } from 'express';
import CreateDraft from '../services/create_draft_service';
const _ = require('underscore')
export default class DraftController{
    public async handler(req: Request, res: Response){
        const deposit = await new CreateDraft().execute(req.body)
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
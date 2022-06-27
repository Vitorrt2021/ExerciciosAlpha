import {Request, Response } from 'express';
import CreateDraft from '../services/create_draft_service';
const _ = require('underscore')
export default class DraftController{
    public async handler(req: Request, res: Response){
        const deposit = await new CreateDraft().execute(req.body)
        const payload = _.omit(deposit,'destiny_account','account','id')
        res.send({
            data: payload,
            message: "Success",
            status: 200
        })
    }
}
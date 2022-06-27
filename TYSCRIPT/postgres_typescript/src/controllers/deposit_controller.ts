import {Request, Response } from 'express';
import CreateDeposit from '../services/create_deposit_service';
const _ = require('underscore')
export default class DepositController{
    public async handler(req: Request, res: Response){
        const deposit = await new CreateDeposit().execute(req.body)
        const payload = _.omit(deposit,'id','account','destiny_account')
        res.send({
            data: payload,
            message: "Success",
            status: 200
        })
    }
}
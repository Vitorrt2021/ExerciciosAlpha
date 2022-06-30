import {Request, Response } from 'express';
import CreateDeposit from '../services/create_deposit_service';
const _ = require('underscore')
export default class DepositController{
    public async handler(req: Request, res: Response){
        const deposit = await new CreateDeposit().execute(req.body)
        const payload = _.omit(deposit,'destiny_account')
        payload.deposit = _.omit(deposit.deposit,'account','destiny_account')
        payload.account = _.omit(deposit.account,'id','password','user_id','created_at')
        
        res.send({
            data: payload,
            message: "Success",
            status: 200
        })
    }
}
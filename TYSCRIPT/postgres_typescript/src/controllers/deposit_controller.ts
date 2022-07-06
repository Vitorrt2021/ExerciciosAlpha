import {Request, Response } from 'express';
import CreateDeposit from '../services/create_deposit_service';
import { Result } from '../utils/result';
const _ = require('underscore')
import DepositResponse from '../model/deposit_response_model';
export default class DepositController{
    public async handler(req: Request, res: Response){
        const data: Result<DepositResponse> = await new CreateDeposit().execute(req.body)
        if(data.isFailure){
          return res.send({
                    data: data.error.message,
                    message: data.error.name,
                    status: data.error.status
                })  
        }
        const deposit = data.getValue()
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
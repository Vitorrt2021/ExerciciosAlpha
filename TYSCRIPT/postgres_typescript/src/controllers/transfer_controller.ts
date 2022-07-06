import {Request, Response } from 'express';
import CreateTransfer from '../services/create_transfer_service';
import { Result } from '../utils/result';
import TransferResponse from '../model/transfer_response_model';
const _ = require('underscore')

export default class TransferController{
    public async handler(req: Request, res: Response){
        const transfer: Result<TransferResponse> = await new CreateTransfer().execute(req.body)     
        if(transfer.isFailure){
            return res.send({
                data: transfer.error.message,
                message: transfer.error.name,
                status: transfer.error.status
            })
        }
        const data = transfer.getValue()   
        data.origin_account = _.omit(data.origin_account,'id','password','user_id','created_at')
        data.destiny_account = _.omit(data.destiny_account,'id','password','user_id','created_at')
        data.transaction =  _.omit(data.transaction,'destiny_account','account')
        res.send({
            data: data,
            message: "Success",
            status: 200
        })
    }
}
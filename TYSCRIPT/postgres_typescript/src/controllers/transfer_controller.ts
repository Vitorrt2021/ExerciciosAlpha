import {Request, Response } from 'express';
import CreateTransfer from '../services/create_transfer_service';
const _ = require('underscore')

export default class TransferController{
    public async handler(req: Request, res: Response){
        const transfer = await new CreateTransfer().execute(req.body)        
        transfer.origin_account = _.omit(transfer.origin_account,'id','password','user_id','created_at')
        transfer.destiny_account = _.omit(transfer.destiny_account,'id','password','user_id','created_at')
        transfer.transaction =  _.omit(transfer.transaction,'destiny_account','account')
        res.send({
            data: transfer,
            message: "Success",
            status: 200
        })
    }
}
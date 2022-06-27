import {Request, Response } from 'express';
import CreateTransfer from '../services/create_transfer_service';
const _ = require('underscore')

export default class TransferController{
    public async handler(req: Request, res: Response){
        const transfer = await new CreateTransfer().execute(req.body)
        const payload = _.omit(transfer,'id','account','destiny_account')        
        res.send({
            data: payload,
            message: "Success",
            status: 200
        })
    }
}
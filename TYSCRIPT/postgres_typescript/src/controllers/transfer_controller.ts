import {Request, Response } from 'express';
import CreateTransfer from '../services/create_transfer_service';

export default class TransferController{
    public async handler(req: Request, res: Response){
        const transfer = await new CreateTransfer().execute(req.body)
        res.send({
            data: transfer,
            message: "Success",
            status: 200
        })
    }
}
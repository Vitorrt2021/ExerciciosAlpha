import {Request, Response } from 'express';
import CreateDeposit from '../services/create_deposit_service';

export default class DepositController{
    public handler(req: Request, res: Response){
        const deposit = new CreateDeposit().execute(req.body)
        res.send({
            data: deposit,
            message: "Success",
            status: 200
        })
    }
}
import {Request, Response } from 'express';
import CreateDeposit from '../services/create_deposit_service';

export default class DepositController{
    public async handler(req: Request, res: Response){
        const deposit = await new CreateDeposit().execute(req.body)
        res.send({
            data: deposit,
            message: "Success",
            status: 200
        })
    }
}
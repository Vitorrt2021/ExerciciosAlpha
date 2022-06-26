import { Request, Response } from 'express';
import IAccount from '../model/account_model';
import CreateAccount from '../services/create_account_service';

export default class CreateAccountController {
  public async handler(req: Request, res: Response) {
    const account: IAccount = await new CreateAccount().execute(req.body);
    res.send({
      data: account,
      message: 'Success',
      status: 200,
    });
  }
}

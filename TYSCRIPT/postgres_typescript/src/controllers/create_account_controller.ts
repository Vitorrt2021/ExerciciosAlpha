import { Request, Response } from 'express';
import IAccount from '../model/account_model';
import CreateAccount from '../services/create_account_service';
const _ = require('underscore')
export default class CreateAccountController {
  public async handler(req: Request, res: Response) {
    const account: IAccount = await new CreateAccount().execute(req.body);
    const payload = _.omit(account, 'user_id','password','id');

    res.send({
      data: payload,
      message: 'Success',
      status: 201,
    });
  }
}

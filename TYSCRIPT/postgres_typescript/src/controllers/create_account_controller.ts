import { Request, Response } from 'express';
import IAccount from '../model/account_model';
import CreateAccountResponse from '../model/create_account_response_model';
import CreateAccount from '../services/create_account_service';
const _ = require('underscore')
import { Result } from '../utils/result';
export default class CreateAccountController {
  public async handler(req: Request, res: Response) {
    const createAccountResult: Result<CreateAccountResponse> = await new CreateAccount().execute(req.body);
    if(createAccountResult.isFailure){
      return res.send({
        data: createAccountResult.error.message,
        message: createAccountResult.error.name,
        status: createAccountResult.error.status,
      })
    }
    const data = createAccountResult.getValue()
    data.account = _.omit(data.account, 'user_id','password','id');
    data.user = _.omit(data.user, 'user_id','password','id');

    res.send({
      data: data,
      message: 'Success',
      status: 201,
    });
  }
}

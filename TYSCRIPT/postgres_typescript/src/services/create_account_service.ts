import { v4 as uuidv4 } from 'uuid';
import CreateUser from './create_user_service';
import getRandomInt from '../utils/random';
import ValidateAccount from '../validator/account_validate';
import AccountTable from '../repositories/db/account';
import AccountRequest from '../model/account_request_model';
import IAccount from '../model/account_model';
import CreateAccountResponse from '../model/create_account_response_model';
const bcrypt = require('bcrypt');

export default class CreateAccount{
  async execute(params: AccountRequest): Promise<CreateAccountResponse> {
    const userId: string = await new CreateUser().execute(params);
    const account:IAccount = await this.createAccount(userId, params);    
    return {user: params, account: account};
  }

  async createAccount(userId: string, params: AccountRequest): Promise<IAccount> { 
    new ValidateAccount().execute(params);
    const account:IAccount = this.buildAccount(userId, params);
    await new AccountTable().insert(account);
    return account;
  }

  private buildAccount(userId: string, params: AccountRequest): IAccount {
    const encriptedPassword = this.encriptPassword(params.password);
    return {
      user_id: userId,
      password: encriptedPassword,
      email: params.email,
      agency_number: getRandomInt(100, 999),
      agency_verification_code: getRandomInt(1, 9),
      account_number: getRandomInt(10000, 99999),
      account_verification_code: getRandomInt(1, 9),
      balance: 0,
      id: uuidv4(),
    };
  }
  
  private encriptPassword(password: string):string {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}

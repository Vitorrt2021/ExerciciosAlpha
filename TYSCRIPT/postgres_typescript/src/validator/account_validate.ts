import { BadRequest } from "../error/errors";
import AccountRequest from "../model/account_request_model";
class ValidateAccount {
  public execute(params: AccountRequest): boolean {
    this.emailValidate(params);
    this.passwordValidate(params);
    return true;
  }
  
  private passwordValidate(params: AccountRequest) {
    if (!('password' in params)) {
      throw new BadRequest('Password is required');
    }
    const { password } = params;
    if (password.length !== 4) {
      throw new BadRequest('Password must be 4 digits');
    }
    const onlyNumbersRegex = /^[0-9]+$/;
    if (!onlyNumbersRegex.test(password)) {
      throw new BadRequest('Password must contain only numbers');
    }
  }


  private emailValidate(params: AccountRequest) {
    if (!('email' in params)) {
      throw new BadRequest('Email is required');
    }
    const { email } = params;
    if (email.length > 60) {
      throw new BadRequest('Email is too long');
    }
    const regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
    if (!regex.test(email)) {
      throw new BadRequest('Invalid email');
    }
  }
}

export default ValidateAccount;

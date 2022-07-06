import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import DraftRequest from '../model/draft_request_model';
const bcrypt = require('bcrypt');
import { Result } from '../utils/result';
export default class ValidateDraft {
  public async execute(params: DraftRequest): Promise<Result<boolean>> {
    const valueValidate = this.validateValue(params);
    if(valueValidate.isFailure){
      return Result.fail(valueValidate.error)
    }
    const accountValidate = await this.validateAccount(params)
    if(accountValidate.isFailure){
      return Result.fail(accountValidate.error)
    }
    const accountId = await new AccountTable().find(params.account);
    if(accountId.isFailure){
      return Result.fail(new BadRequest("Account don't exist"))
    }
    const passwordValidate = await this.validatePassword(accountId.getValue(),params);
    if(passwordValidate.isFailure){
      return Result.fail(passwordValidate.error)
    }
    const moneyValidate = await this.haveEnoughMoney(accountId.getValue(), params);
    if(moneyValidate.isFailure){
      return Result.fail(moneyValidate.error)
    }
    return Result.ok()
  }

  private async validateAccount(params: DraftRequest): Promise<Result<boolean>> {
    if (!('account' in params)) {
      return Result.fail(new BadRequest('Need account to make draft'))
    }
    const { account } = params;
    const accountId = await new AccountTable().find(account);
    if (!accountId) {
      return Result.fail(new BadRequest("Account don't exist"))
    }
    const ownerCpf = await new AccountTable().isOwner(accountId.getValue())
    if(ownerCpf.isFailure){
      return Result.fail(ownerCpf.error)
    }
    const isOwner = ownerCpf.getValue()[0]?.cpf === account.cpf
    if (!isOwner) {
      return Result.fail(new BadRequest("Account is not yours"))
    }
    return Result.ok()
  }

  private validateValue(params: DraftRequest): Result<boolean> {
    if (!('value' in params)) {
      return Result.fail(new BadRequest('Need value'))
    }
    if (params.value <= 0) {
      return Result.fail(new BadRequest('Value must be greater than zero'))
    }
    return Result.ok()
  }

  private async validatePassword(accountId: string, params: DraftRequest): Promise<Result<boolean>> { 
    if (!('password' in params.account)) {
      return Result.fail(new BadRequest('Account password is required'))
    }
    const passwordHash = await new AccountTable().getPassword(accountId);
    const passwordIsCorrect = bcrypt.compareSync(params.account.password, passwordHash);
    if (!passwordIsCorrect) {    
      return Result.fail(new BadRequest('Wrong password'))
    }
    return Result.ok()
  }

  private async haveEnoughMoney(accountId: string,params: DraftRequest): Promise<Result<boolean>> {
    const money = await new AccountTable().getBalance(accountId);
    const tax = 4
    if (money < params.value + tax) {
      return Result.fail(new BadRequest('Insufficient funds'))
    }
    return Result.ok()
  }
}

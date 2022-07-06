import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import DepositRequest from '../model/deposit_request_model';
import { Result } from '../utils/result';
import { result } from 'underscore';
export default class ValidateDeposit {
  public async execute(params: DepositRequest): Promise<Result<boolean>> {
    const accountValidate = await this.validateAccount(params);
    if(accountValidate.isFailure){
      return Result.fail(accountValidate.error)
    }
    const valueValidate = this.validateValue(params)
    if(valueValidate.isFailure){
      return  Result.fail(valueValidate.error)  
    }
    return Result.ok();
  }

  private async validateAccount(params: DepositRequest): Promise<Result<boolean>> {
    if (!('account' in params)) {
      return Result.fail(new BadRequest('Need account to make deposit'))
    }
    const { account } = params;
    const accountId = await new AccountTable().find(account);
    if (accountId.isFailure) {
      return Result.fail(accountId.error)
    }
    const ownerCpf = await new AccountTable().isOwner(accountId.getValue())
    const isOwner = ownerCpf.getValue()[0]?.cpf === account.cpf
    if (!isOwner) {
      return Result.fail(new BadRequest("Account is not yours"))
    }
    return Result.ok()
  }
  
  private validateValue(params: DepositRequest): Result<boolean>{
    if (!('value' in params)) {
      return Result.fail(new BadRequest('Need value'))
    }
    if (params.value <= 0) {
      return Result.fail(new BadRequest('Value must be greater than zero'))
    }
    return Result.ok()
  }
}

import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import DepositRequest from '../model/deposit_request_model';
export default class ValidateDeposit {
  public async execute(params: DepositRequest): Promise<boolean> {
    await this.validateAccount(params);
    this.validateValue(params)
    return true;
  }

  private async validateAccount(params: DepositRequest) {
    if (!('account' in params)) {
      throw new BadRequest('Need account to make deposit');
    }
    const { account } = params;
    const accountId = await new AccountTable().find(account);
     if (!accountId) {
      throw new BadRequest("Account don't exist");
    }
    const ownerCpf = await new AccountTable().isOwner(accountId)
    const isOwner = ownerCpf[0]?.cpf === account.cpf
    if (!isOwner) {
      throw new BadRequest("Account is not yours");
    }

  }
  
  private validateValue(params: DepositRequest):void {
    if (!('value' in params)) {
      throw new BadRequest('Need value');
    }
    if (params.value <= 0) {
      throw new BadRequest('Value must be greater than zero');
    }
  }
}

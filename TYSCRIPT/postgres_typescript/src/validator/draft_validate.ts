import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import DraftRequest from '../model/draft_request_model';
const bcrypt = require('bcrypt');

export default class ValidateDraft {
  public async execute(params: DraftRequest): boolean {
    this.validateValue(params);
    await this.validateAccount(params)

    const accountId = await new AccountTable().find(params.account);
    await this.validatePassword(accountId,params);
    await this.haveEnoughMoney(accountId, params);

    return true;
  }

  private async validateAccount(params: DraftRequest) {
    if (!('account' in params)) {
      throw new BadRequest('Need account to make draft');
    }
    const { account } = params;
    const accountId = await new AccountTable().find(account);
    if (!accountId) {
      throw new BadRequest("Account don't exist");
    }
  }

  private validateValue(params: DraftRequest):void {
    if (!('value' in params)) {
      throw new BadRequest('Need value');
    }
    if (params.value <= 0) {
      throw new BadRequest('Value must be greater than zero');
    }
  }

  private async validatePassword(accountId: string, params: DraftRequest): Promise<void> { 
    if (!('password' in params.account)) {
      throw new BadRequest('Account password is required');
    }
    const passwordHash = await new AccountTable().getPassword(accountId);
    const passwordIsCorrect = bcrypt.compareSync(params.account.password, passwordHash);
    if (!passwordIsCorrect) {
      throw new BadRequest('Wrong password');
    }
  }

  private async haveEnoughMoney(accountId: string,params: DraftRequest): Promise<void> {
    const money = await new AccountTable().getBalance(accountId);
    if (money < params.value) {
      throw new BadRequest('Insufficient funds');
    }
  }
}

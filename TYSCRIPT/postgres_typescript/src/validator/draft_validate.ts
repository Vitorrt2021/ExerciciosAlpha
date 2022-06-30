import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import DraftRequest from '../model/draft_request_model';
const bcrypt = require('bcrypt');

export default class ValidateDraft {
  public async execute(params: DraftRequest): Promise<boolean> {
    this.validateValue(params);
    await this.validateAccount(params)
    
    const accountId = await new AccountTable().find(params.account);
    if(!accountId){
      throw new BadRequest("Account don't exist")
    }
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
    const ownerCpf = await new AccountTable().isOwner(accountId)
    const isOwner = ownerCpf[0]?.cpf === account.cpf
    if (!isOwner) {
      throw new BadRequest("Account is not yours");
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
    const tax = 4
    if (money < params.value + tax) {
      throw new BadRequest('Insufficient funds');
    }
  }
}

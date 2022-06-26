import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import ExtractRequest from '../model/extract_request_mode';
const bcrypt = require('bcrypt');

export default class ValidateExtract {
  public async execute(params: ExtractRequest): Promise<boolean> {
    await this.validateAccount(params);
    const accountId = await new AccountTable().find(params.account);
    if(!accountId){
      throw new BadRequest("Account don't exist")
    }
    await this.validatePassword(accountId, params);

    return true;
  }

  private async validateAccount(params: ExtractRequest) {
    if (!('account' in params)) {
      throw new BadRequest('Need account to make draft');
    }
    const { account } = params;
    const accountId = await new AccountTable().find(account);
    if (!accountId) {
      throw new BadRequest("Account don't exist");
    }
  }

  private async validatePassword(accountId: string, params: ExtractRequest): Promise<void> {
    if (!('password' in params.account)) {
      throw new BadRequest('Account password is required');
    }
    const passwordHash = await new AccountTable().getPassword(accountId);
    const passwordIsCorrect = bcrypt.compareSync(params.account.password, passwordHash);
    if (!passwordIsCorrect) {
      throw new BadRequest('Wrong password');
    }
  }
}

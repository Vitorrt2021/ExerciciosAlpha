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
    const ownerCpf = await new AccountTable().isOwner(accountId)
    const isOwner = ownerCpf[0]?.cpf === account.cpf
    if (!isOwner) {
      throw new BadRequest("Account is not yours");
    }
  }
}

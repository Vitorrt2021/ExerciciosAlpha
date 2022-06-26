import AccountTable from '../repositories/db/account';
import ValidateExtract from '../validator/extract_validate';
import ExtractRequest from '../model/extract_request_mode';
import { BadRequest } from '../error/errors';
export default class GetExtract {
  public async execute(params: ExtractRequest) {
    await new ValidateExtract().execute(params)
    const accountId = await new AccountTable().find(params.account);
    if(!accountId) throw new BadRequest("Account don't exist")
    
    const extract = await new AccountTable().extract(accountId);
    const balance_available = await new AccountTable().getBalance(accountId);
    return {
      balance_available,
      'transactions': extract
    };
  }
}

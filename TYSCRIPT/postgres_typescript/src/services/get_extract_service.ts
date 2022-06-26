import AccountTable from '../repositories/db/account';
import ValidateExtract from '../validator/extract_validate';

export default class GetExtract {
  public async execute(params: ExtractRequest) {
    await new ValidateExtract().execute(params)
    const account_id = await new AccountTable().find(params.account);
    const extract = await new AccountTable().extract(account_id);
    const balance_available = await new AccountTable().getBalance(account_id);
    return {
      balance_available,
      'transactions': extract
    };
  }
}

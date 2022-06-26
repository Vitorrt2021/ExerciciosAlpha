import { v4 as uuidv4 } from 'uuid';
import ITransaction from '../model/transaction_model';
import TransactionTable from '../repositories/db/transaction';
import ValidateDraft from '../validator/draft_validate';
import AccountTable from '../repositories/db/account';
import DraftRequest from '../model/draft_request_model';
import { BadRequest } from '../error/errors';
export default class CreateDraft {
  private tax = 4;

  public async execute(params: DraftRequest) {

    await new ValidateDraft().execute(params);
    const {account, value} = params
    const accountId = await new AccountTable().find(account);
    if(!accountId){
      throw new BadRequest("Account don't exist")
    }
    const totalValue = value + this.tax;
    const draft: ITransaction = this.buildDraft(accountId, totalValue, value);

    await new AccountTable().draft(accountId, totalValue);
    await new TransactionTable().insert(draft);

    return draft;
  }


  private buildDraft(accountId: string, totalValue: number, value: number): ITransaction {
    return {
      account: accountId,
      id: uuidv4(),
      type: 'draft',
      destiny_account: null,
      value: parseFloat(value.toFixed(2)),
      total_value: parseFloat(totalValue.toFixed(2)),
      tax: parseFloat(this.tax.toFixed(2)),
    };
  }
}

import AccountTable from '../repositories/db/account';
import ValidateExtract from '../validator/extract_validate';
import ExtractRequest from '../model/extract_request_mode';
import { BadRequest } from '../error/errors';
import ExtractQuery from '../model/extract_query_model';
export default class GetExtract {
  public async execute(params: ExtractRequest) {
    await new ValidateExtract().execute(params)
    const accountId = await new AccountTable().find(params.account);
    if(!accountId) throw new BadRequest("Account don't exist")
    
    const extract = await new AccountTable().extract(accountId);
    const balance_available = await new AccountTable().getBalance(accountId);
    console.log(extract)
    const transactions = await this.extractTreatment(extract)
    return {
      balance_available,
      'transactions': transactions
    };
  }

  private async extractTreatment(extract: Array<ExtractQuery>): Promise<any>{
    const result = []
    let transaction: any
    for await (transaction of extract) {
      console.log(transaction)
      if(transaction.receive_transfer){
        const origin = await new AccountTable().getName(transaction.origin_account)
        result.push({
          type: transaction.type,
          value: transaction.value,
          date: transaction.date,
          origin: origin
        })
      }else if(!transaction.receive_transfer && transaction.type === 'transfer'){
        const destiny = await new AccountTable().getName(transaction.destiny_account)
        result.push({
          type: transaction.type,
          value: transaction.value,
          date: transaction.date,
          destiny: destiny 
        })
      }else{
        result.push({
          type: transaction.type,
          value: transaction.value,
          date: transaction.date,
        })
      }
    }
    return result
  }
}

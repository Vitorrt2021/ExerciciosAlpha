import AccountTable from '../repositories/db/account';
import ValidateExtract from '../validator/extract_validate';
import ExtractRequest from '../model/extract_request_mode';
import ExtractQuery from '../model/extract_query_model';
import { Result } from '../utils/result';
import ExtractResponse from '../model/extract_response_model';
export default class GetExtract {
  public async execute(params: ExtractRequest): Promise<Result<ExtractResponse>> {
    await new ValidateExtract().execute(params)
    const accountId = await new AccountTable().find(params.account);
    if(accountId.isFailure) {
      return Result.fail(accountId.error)
    }
    const extract = await new AccountTable().extract(accountId.getValue());
    const account =  await new AccountTable().get(accountId.getValue());
    if(account?.isFailure){
      return Result.fail(account.error)
    }

    const transactions = await this.extractTreatment(extract)
    return Result.ok({
      account: account?.getValue(),
      'transactions': transactions
    });
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
          tax:transaction.tax ,
          origin: origin
        })
      }else if(!transaction.receive_transfer && transaction.type === 'transfer'){
        const destiny = await new AccountTable().getName(transaction.destiny_account)
        result.push({
          type: transaction.type,
          value: transaction.value,
          date: transaction.date,
          tax:transaction.tax ,
          destiny: destiny 
        })
      }else{
        result.push({
          type: transaction.type,
          value: transaction.value,
          tax:transaction.tax ,
          date: transaction.date,
        })
      }
    }
    return result
  }
}

import { v4 as uuidv4 } from 'uuid';
import ValidateTransfer from '../validator/transfer_validate';
import TransactionTable from '../repositories/db/transaction';
import AccountTable from '../repositories/db/account';
import ITransaction from '../model/transaction_model';
import TransferRequest from '../model/transfer_request_model';
import { Result } from '../utils/result';
import TransferResponse from '../model/transfer_response_model';
export default class CreateTransfer {
  private tax = 1;

  async execute(params: TransferRequest): Promise<Result<TransferResponse>> {
    await new ValidateTransfer().execute(params);

    const originId: Result<string> = await new AccountTable().find(params.origin_account);
    const destinyId: Result<string> = await new AccountTable().find(params.destiny_account);
    if(originId.isFailure){
      return Result.fail<TransferResponse>(originId.error)
    }
    if(destinyId.isFailure){
      return Result.fail<TransferResponse>(destinyId.error)
    }
    const totalValue = params.value + this.tax;
    const transfer: ITransaction = this.buildTransfer(originId.getValue(), destinyId.getValue(), totalValue, params.value);

    const destinyResult = await new AccountTable().deposit(destinyId.getValue(), totalValue);
    if(destinyResult.isFailure){
      return Result.fail(destinyResult.error)
    }
    const destiny = destinyResult.getValue()
    destiny.cpf = params.destiny_account.cpf
    const originResult = await new AccountTable().draft(originId.getValue(), params.value);
    if(originResult.isFailure){
      return Result.fail(originResult.error)
    }
    const origin = originResult.getValue()
    origin.cpf = params.origin_account.cpf
    const transaction: Result<ITransaction> = await new TransactionTable().insert(transfer);
    if(transaction.isFailure){
      return Result.fail<TransferResponse>(transaction.error)
    }
    return Result.ok<TransferResponse>({
      destiny_account: destiny,
      origin_account: origin,
      transaction: transaction.getValue()
    });
  }
  private buildTransfer(originId: string, destinyId: string, totalValue: number, value: number):ITransaction {
    return {
      account: originId,
      id: uuidv4(),
      type: 'transfer',
      destiny_account: destinyId,
      value: parseFloat(value.toFixed(2)),
      total_value: parseFloat(totalValue.toFixed(2)),
      tax: parseFloat(this.tax.toFixed(2)),
    };
  }
}

import { v4 as uuidv4 } from 'uuid';
import ValidateTransfer from '../validator/transfer_validate';
import TransactionTable from '../repositories/db/transaction';
import AccountTable from '../repositories/db/account';
import ITransaction from '../model/transaction_model';
import TransferRequest from '../model/transfer_request_model';
import { BadRequest } from '../error/errors';
export default class CreateTransfer {
  private tax = 1;

  async execute(params: TransferRequest) {
    await new ValidateTransfer().execute(params);

    const originId = await new AccountTable().find(params.origin_account);
    const destinyId = await new AccountTable().find(params.destiny_account);
    if(!originId){
      throw new BadRequest("Origin account don't exist")
    }
    if(!destinyId){
      throw new BadRequest("Destiny account don't exist")
    }
    const totalValue = params.value + this.tax;
    const transfer: ITransaction = this.buildTransfer(originId, destinyId, totalValue, params.value);

    const destinyResult = await new AccountTable().deposit(destinyId, totalValue);
    destinyResult.cpf = params.destiny_account.cpf
    const originResult = await new AccountTable().draft(originId, params.value);
    originResult.cpf = params.origin_account.cpf
    const transaction = await new TransactionTable().insert(transfer);
    return {
      destiny_account: destinyResult,
      origin_account: originResult,
      transaction: transaction
    };
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

import { v4 as uuidv4 } from 'uuid';
import ValidateTransfer from '../validator/transfer_validate';
import TransactionTable from '../repositories/db/transaction';
import AccountTable from '../repositories/db/account';
import ITransaction from '../model/transaction_model';

export default class CreateTransfer {
  private tax = 1;

  async execute(params: TransferResquest) {
    await new ValidateTransfer().execute(params);

    const originId = await new AccountTable().find(params.origin_account);
    const destinyId = await new AccountTable().find(params.destiny_account);

    const totalValue = params.value - this.tax;
    const transfer: ITransaction = this.buildTransfer(originId, destinyId, totalValue, params.value);

    await new AccountTable().deposit(destinyId, totalValue);
    await new AccountTable().draft(originId, params.value);
    await new TransactionTable().insert(transfer);
    return transfer;
  }

  private buildTransfer(originId: string, destinyId: string, totalValue: string, value: number):ITransaction {
    return {
      account: originId,
      id: uuidv4(),
      type: 'transfer',
      destiny_account: destinyId,
      value: value.toFixed(2),
      total_value: totalValue.toFixed(2),
      tax: this.tax.toFixed(2),
    };
  }
}

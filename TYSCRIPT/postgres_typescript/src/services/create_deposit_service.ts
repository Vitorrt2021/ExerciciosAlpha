import { v4 as uuidv4 } from 'uuid';
import ITransaction from '../model/transaction_model';
import AccountTable from '../repositories/db/account';
import ValidateDeposit from '../validator/deposit_validate';
import TransactionTable from '../repositories/db/transaction';
import DepositRequest from '../model/deposit_request_model';
import { BadRequest } from '../error/errors';
export default class CreateDeposit {
  public async execute(params: DepositRequest) {
    await new ValidateDeposit().execute(params);

    
    const accountId = await new AccountTable().find(params.account);
    if(!accountId){
      throw new BadRequest("Account don't exist")
    }

    const {value} = params
    const tax = this.calculateTax(value);
    const totalValue = value - tax;
    const deposit: ITransaction = this.buildDeposit(accountId, value, totalValue, tax)

    await new AccountTable().deposit(accountId, totalValue)
    await new TransactionTable().insert(deposit)
    return deposit;
  }
  
  private buildDeposit(accountId: string, value: number, totalValue: number, tax: number): ITransaction{
    return {
      account: accountId,
      id: uuidv4(),
      destiny_account: null,
      type: 'deposit',
      value: parseFloat(value.toFixed(2)),
      total_value: parseFloat(totalValue.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)), 
    };
  }

  private calculateTax(value: number):number {
    const tax: number = 0.01;
    return value * tax;
  }
}

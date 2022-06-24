import { v4 as uuidv4 } from 'uuid';
import ITransaction from '../model/transaction_model';
import ValidateDeposit from '../validator/deposit_validate'

export default class CreateDeposit{
    execute(req: any){
        const deposit: ITransaction = {
            account: req.account,
            date: new Date().toISOString(),
            transaction_id: uuidv4(),
            type: 'deposit',
            value: req.value
        } 
        
        new ValidateDeposit().isValid(deposit)

        return deposit
    }    
}
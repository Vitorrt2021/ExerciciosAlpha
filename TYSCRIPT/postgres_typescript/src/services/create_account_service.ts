import { v4 as uuidv4 } from 'uuid';
import IAccount from '../model/account_model';

export default class CreateAccount{
    public accounts: Array<IAccount> = []
    
    execute(req: any): IAccount{
        const account:IAccount = {
            agency: req.agency, 
            agency_check_digit: req.agency_check_digit ,
            account_number: req.account_number,
            check_digit: req.check_digit ,
            balance: req.balance,
            id: uuidv4()   
        }

        this.accounts.push(account)
        return account
    }
}
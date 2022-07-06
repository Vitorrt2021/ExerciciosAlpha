import ITransaction from './transaction_model'
import IAccount from './account_model'

interface DepositResponse{
    deposit: ITransaction,
    account: IAccount
}

export default DepositResponse
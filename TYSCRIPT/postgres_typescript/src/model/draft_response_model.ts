import ITransaction from './transaction_model'
import IAccount from './account_model'

interface DraftResponse{
    draft: ITransaction,
    account: IAccount
}

export default DraftResponse
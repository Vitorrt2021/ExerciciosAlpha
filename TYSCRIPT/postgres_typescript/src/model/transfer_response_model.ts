import IAccount from "./account_model"
import ITransaction from "./transaction_model"

interface TransferResponse{
    destiny_account: IAccount,
    origin_account: IAccount,
    transaction: ITransaction
}
export default TransferResponse
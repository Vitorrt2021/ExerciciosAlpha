import IAccount from "./account_model"

interface TransferRequest{
    origin_account: IAccount
    destiny_account: IAccount
    value: number
}

export default TransferRequest
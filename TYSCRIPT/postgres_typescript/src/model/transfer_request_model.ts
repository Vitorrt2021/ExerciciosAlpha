import IAccount from "./account_model"

interface TransferResquest{
    origin_account: IAccount
    destiny_account: IAccount
    value: number
}

export default TransferResquest
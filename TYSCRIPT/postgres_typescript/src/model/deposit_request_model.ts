import IAccount from "./account_model"

interface DepositRequest{
    account: IAccount
    value: number
}

export default DepositRequest
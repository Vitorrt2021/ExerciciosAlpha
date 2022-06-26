import IAccount from "./account_model"

interface DraftRequest{
    account: IAccount
    value: number
}

export default DraftRequest
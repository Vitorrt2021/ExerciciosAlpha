import IAccount from "./account_model"

interface ExtractResponse{
    account: IAccount,
    transactions: any
}

export default ExtractResponse
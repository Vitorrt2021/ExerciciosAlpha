import IAccount from './account_model'

interface ITransaction{
    transaction_id: string 
    type: string 
    value: number
    date: string 
    account: IAccount
}

export default ITransaction
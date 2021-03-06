import IAccount from './account_model'

interface ITransaction{
    id: string 
    type: string 
    value: number
    account: string
    destiny_account: string | null 
    tax: number 
    total_value: number
}

export default ITransaction
interface IAccount {
    agency_number: number
    agency_verification_code: number 
    account_number: number 
    account_verification_code : number 
    balance: number
    password: string
    id: string
    email: string
    user_id: string
    cpf?: string
}

export default IAccount
import CreateAccount from '../../src/services/create_account_service'
import IAccount from '../../src/model/account_model'

describe('CreateAccount',()=>{
    describe('should have',()=>{
        const newAccount = {
            agency: 555,
            agency_check_digit: 4 ,
            account_number: 12345, 
            check_digit: 1 ,
            balance: 0.0
        }       
        const account: IAccount = new CreateAccount().execute(newAccount)
        test('agency',()=>{
            expect(account.agency).toBe(555)
        })
        test('agency check digit',()=>{
            expect(account.agency_check_digit).toBe(4)
        })
        test('account number',()=>{
            expect(account.account_number).toBe(12345)
        })
        test('check digit',()=>{
            expect(account.check_digit).toBe(1)
        })
        test('id',()=>{
            expect(account.id).not.toBeNull()
        })
    })
})
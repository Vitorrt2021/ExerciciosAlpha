import ITransaction from "../model/transaction_model"
import { BadRequest } from "../error/errors"

export default class ValidateDeposit{
    public isValid(deposit: ITransaction): boolean{
        return true
    }
}
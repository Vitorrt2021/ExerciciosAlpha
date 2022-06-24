import ITransfer from "../model/transfer_model"
import { BadRequest } from "../error/errors"

export default class ValidateTransfer{
    public isValid(deposit: ITransfer): boolean{
        return true
    }
}
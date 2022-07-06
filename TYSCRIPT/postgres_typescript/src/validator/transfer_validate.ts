import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import TransferRequest from '../model/transfer_request_model';
import { Result } from '../utils/result';
const bcrypt = require('bcrypt');

export default class ValidateTransfer {
  public async execute(params: TransferRequest): Promise<Result<boolean>> {
    const valueValidate = this.validateValue(params);
    if(valueValidate.isFailure){
      return Result.fail<boolean>(valueValidate.error)
    }
    const accountValidate = this.validateOriginAccount(params);
    if(accountValidate.isFailure){
      return Result.fail<boolean>(accountValidate.error)
    }
    const validateDestiny  = await this.validateDestinyAccount(params);
    if(validateDestiny.isFailure){
      return Result.fail<boolean>(validateDestiny.error)
    }

    const originId = await this.getOriginId(params);    
    if(originId.isFailure){
      return Result.fail<boolean>(originId.error)
    }

    const passwordValidate = await this.validatePassword(originId.getValue(), params);
    if(passwordValidate.isFailure){
      return Result.fail<boolean>(passwordValidate.error)
    }

    const moneyValidate = await this.haveEnoughMoney(originId.getValue(), params.value);
    if(moneyValidate.isFailure){
      return Result.fail<boolean>(moneyValidate.error)
    }

    return Result.ok();
  }

  private async getOriginId(params: TransferRequest): Promise<Result<string>> {
    const originId = await new AccountTable().find(params.origin_account);
    if (originId.isFailure) {
      return Result.fail<string>(new BadRequest("Origin account don't exist"))   
    }
    const {origin_account} = params
    if(!('cpf' in origin_account)){
      return Result.fail<string>(new BadRequest("Origin account cpf is required")  )   
    }
    const ownerCpf = await new AccountTable().isOwner(originId.getValue())
    const isOwner = ownerCpf.getValue()[0]?.cpf === origin_account.cpf
    if (!isOwner) {
      return Result.fail<string>(new BadRequest("Origin account is not yours"))   
    }
    return Result.ok<string>(originId.getValue());
  }

  private async validateDestinyAccount(params: TransferRequest): Promise<Result<string>> {
    if (!('destiny_account' in params)) {
      return Result.fail<string>(new BadRequest('Need destiny account'))   
  
    }
    const destinyId = await new AccountTable().find(params.destiny_account);
    if (destinyId.isFailure) {
      return Result.fail<string>(new BadRequest("Destiny account don't exist"))
    }
    const {destiny_account} = params
    if(!('cpf' in destiny_account)){
      return Result.fail<string>(new BadRequest("Destiny account cpf is required"))  
    }
    const ownerCpf = await new AccountTable().isOwner(destinyId.getValue())
    const isOwner = ownerCpf.getValue()[0]?.cpf === destiny_account.cpf
    if (!isOwner) {
      return Result.fail<string>(new BadRequest("Destiny account have wrong cpf yours"))
    }
    return Result.ok()
  }

  private validateOriginAccount(params: TransferRequest): Result<string> {
    if (!('origin_account' in params)) {
      return Result.fail<string>(new BadRequest('Need origin account'))
    }
    return Result.ok()
  }

  private validateValue(params: TransferRequest): Result<string> {
    if (!('value' in params)) {
      return Result.fail<string>(new BadRequest('Need value'));
    }
    if (params.value <= 0) {
      return Result.fail<string>(new BadRequest('Value must be greater than zero'))
    }
    return Result.ok()
  }

  private async validatePassword(accountId: string, params: TransferRequest): Promise<Result<string>> {
    if (!('password' in params.origin_account)) {
      return Result.fail<string>(new BadRequest('Origin account password is required'))
    }
    const passwordHash = await new AccountTable().getPassword(accountId);
    const passwordIsCorrect = bcrypt.compareSync(params.origin_account.password, passwordHash);
    if (!passwordIsCorrect) {
      return Result.fail<string>(new BadRequest('Wrong password'))
    }
    return Result.ok()
  }

  private async haveEnoughMoney(accountId: string, value: number): Promise<Result<string>> {
    const money = await new AccountTable().getBalance(accountId);
    const tax = 1
    if (money < value + tax) {
      return Result.fail<string>(new BadRequest('Insufficient funds'));
    }
    return Result.ok()
  }
}

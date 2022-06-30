import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import TransferRequest from '../model/transfer_request_model';
const bcrypt = require('bcrypt');

export default class ValidateTransfer {
  public async execute(params: TransferRequest): Promise<boolean> {
    this.validateValue(params);
    this.validateOriginAccount(params);
    await this.validateDestinyAccount(params);

    const originId = await this.getOriginId(params);
    await this.validatePassword(originId, params);
    await this.haveEnoughMoney(originId, params.value);

    return true;
  }

  private async getOriginId(params: TransferRequest): Promise<string> {
    const originId = await new AccountTable().find(params.origin_account);
    if (!originId) {
      throw new BadRequest("Origin account don't exist");
    }
    const {origin_account} = params
    if(!('cpf' in origin_account)){
      throw new BadRequest("Origin account cpf is required");  
    }
    const ownerCpf = await new AccountTable().isOwner(originId)
    const isOwner = ownerCpf[0]?.cpf === origin_account.cpf
    if (!isOwner) {
      throw new BadRequest("Origin account is not yours");
    }
    return originId;
  }

  private async validateDestinyAccount(params: TransferRequest): Promise<void> {
    if (!('destiny_account' in params)) {
      throw new BadRequest('Need destiny account');
    }
    const destinyId = await new AccountTable().find(params.destiny_account);
    if (!destinyId) {
      throw new BadRequest("Destiny account don't exist");
    }
    const {destiny_account} = params
    if(!('cpf' in destiny_account)){
      throw new BadRequest("Destiny account cpf is required");  
    }
    const ownerCpf = await new AccountTable().isOwner(destinyId)
    const isOwner = ownerCpf[0]?.cpf === destiny_account.cpf
    if (!isOwner) {
      throw new BadRequest("Destiny account have wrong cpf yours");
    }
  }

  private validateOriginAccount(params: TransferRequest): void {
    if (!('origin_account' in params)) {
      throw new BadRequest('Need origin account');
    }
  }

  private validateValue(params: TransferRequest):void {
    if (!('value' in params)) {
      throw new BadRequest('Need value');
    }
    if (params.value <= 0) {
      throw new BadRequest('Value must be greater than zero');
    }
  }

  private async validatePassword(accountId: string, params: TransferRequest): Promise<void> {
    if (!('password' in params.origin_account)) {
      throw new BadRequest('Origin account password is required');
    }
    const passwordHash = await new AccountTable().getPassword(accountId);
    const passwordIsCorrect = bcrypt.compareSync(params.origin_account.password, passwordHash);
    if (!passwordIsCorrect) {
      throw new BadRequest('Wrong password');
    }
  }

  private async haveEnoughMoney(accountId: string, value: number): Promise<void> {
    const money = await new AccountTable().getBalance(accountId);
    const tax = 1
    if (money < value + tax) {
      throw new BadRequest('Insufficient funds');
    }
  }
}

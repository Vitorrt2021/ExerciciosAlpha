import { BadRequest } from '../error/errors';
import AccountTable from '../repositories/db/account';
import TransferResquest from '../model/transfer_request_model';
const bcrypt = require('bcrypt');

export default class ValidateTransfer {
  public async execute(params: TransferResquest): boolean {
    this.validateValue(params);
    this.validateOriginAccount(params);
    await this.validateDestinyAccount(params);

    const originId = await this.getOriginId(params);
    await this.validatePassword(originId, params);
    await this.haveEnoughMoney(originId, params.value);

    return true;
  }

  private async getOriginId(params: TransferResquest): Promise<string> {
    const originId = await new AccountTable().find(params.origin_account);
    if (!originId) {
      throw new BadRequest("Origin account don't exist");
    }
    return originId;
  }

  private async validateDestinyAccount(params: TransferResquest): Promise<void> {
    if (!('destiny_account' in params)) {
      throw new BadRequest('Need destiny account');
    }
    const destinyId = await new AccountTable().find(params.destiny_account);
    if (!destinyId) {
      throw new BadRequest("Destiny account don't exist");
    }
  }

  private validateOriginAccount(params): void {
    if (!('origin_account' in params)) {
      throw new BadRequest('Need origin account');
    }
  }

  private validateValue(params):void {
    if (!('value' in params)) {
      throw new BadRequest('Need value');
    }
    if (params.value <= 0) {
      throw new BadRequest('Value must be greater than zero');
    }
  }

  private async validatePassword(accountId: string, params): Promise<void> {
    if (!('password' in params.origin_account)) {
      throw new BadRequest('Origin account password is required');
    }
    const passwordHash = await new AccountTable().getPassword(accountId);
    const passwordIsCorrect = bcrypt.compareSync(params.origin_account.password, passwordHash);
    if (!passwordIsCorrect) {
      throw new BadRequest('Wrong password');
    }
  }

  private async haveEnoughMoney(accountId: string, value): Promise<void> {
    const money = await new AccountTable().getBalance(accountId);
    if (money < value) {
      throw new BadRequest('Insufficient funds');
    }
  }
}

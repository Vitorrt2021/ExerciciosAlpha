import { v4 as uuidv4 } from 'uuid';
import ValidateUser from '../validator/user_validate';
import IUser from '../model/user_model';
import UserTable from '../repositories/db/user';
import AccountRequest from '../model/account_request_model';
export default class CreateUser {
  async execute(params: any): Promise<string> {

    new ValidateUser().execute(params);
    const id = await new UserTable().findByCpf(params.cpf);
    if (id) return id;
    const user: IUser = this.build(params);
    await new UserTable().insert(user);
    return user.id;
  }

  build(params: AccountRequest): IUser {
    return {
      name: params.name,
      cpf: params.cpf,
      birthdate: params.birthdate,
      id: uuidv4(),
    };
  }
}

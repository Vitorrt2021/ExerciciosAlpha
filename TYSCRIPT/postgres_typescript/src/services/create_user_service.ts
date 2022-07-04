import { v4 as uuidv4 } from 'uuid';
import ValidateUser from '../validator/user_validate';
import IUser from '../model/user_model';
import UserTable from '../repositories/db/user';
import AccountRequest from '../model/account_request_model';
import { Result } from '../utils/result';
import { InternalServerError } from '../error/errors';
export default class CreateUser {
  async execute(params: any): Promise<Result<string>> {
    const userValidate = new ValidateUser().execute(params);
    if(userValidate.isFailure){
      return Result.fail<string>(userValidate.error)
    }
    const id: Result<string> = await new UserTable().findByCpf(params.cpf);

    if (id.isFailure && id.error instanceof InternalServerError){
      return Result.fail<string>(id.error);
    }
    if (id.isSuccess){
      return Result.ok<string>(id.getValue())
    }

    const user: IUser = this.build(params);
    
    const insertSuccess: Result<boolean> = await new UserTable().insert(user);
    if(insertSuccess.isFailure){
      return Result.fail<string>(insertSuccess.error)
    }
    return Result.ok<string>(user.id);
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

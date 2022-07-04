import { BadRequest } from '../error/errors';
import AccountRequest from '../model/account_request_model';
import { Result } from '../utils/result';
class ValidateUser{
  public execute(params: AccountRequest): Result<boolean> {
    const nameValidate = this.nameValidate(params); 
    if(nameValidate.isFailure){
      return Result.fail<boolean>(nameValidate.error)
    }
    const cpfValidate = this.cpfValidate(params);
    if(cpfValidate.isFailure){
      return Result.fail<boolean>(cpfValidate.error)
    }

    const dateValidate = this.dateOfBirthValidate(params);
    if(dateValidate.isFailure){
      return Result.fail<boolean>(dateValidate.error)
    }

    return Result.ok<boolean>(true)
  }

  private cpfValidate(params: AccountRequest): Result<boolean> {
    if (!('cpf' in params)) {
      return Result.fail<boolean>(new BadRequest("Cpf is required"))
    }
    const { cpf } = params;

    if (cpf.length !== 11) {
      return Result.fail<boolean>(new BadRequest("Cpf must be 11 digits"))
    }
    const onlyNumbersRegex = /^[0-9]+$/;
    if (!onlyNumbersRegex.test(cpf)) {  
      return Result.fail<boolean>(new BadRequest("Cpf must contain only numbers"))
    }
    return Result.ok<boolean>(true)
  }

  private nameValidate(params: AccountRequest): Result<boolean>{
    if (!('name' in params)) {
      return Result.fail<boolean>(new BadRequest("Name is required"))
    }
    const { name } = params;
    if (name.length > 60) {   
      return Result.fail<boolean>(new BadRequest("Name is too long"))
    }
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (!regex.test(name)) {
      return Result.fail<boolean>(new BadRequest("Invalid name"))
    }
    return Result.ok<boolean>(true)
  }

  private dateOfBirthValidate(params: AccountRequest): Result<boolean> {
    if (!('birthdate' in params)) {
      return Result.fail<boolean>(new BadRequest("Birthdate is required")) 
    }
    const { birthdate } = params;
    const regex = /^((?:(?=29[\/\-.]0?2[\/\-.](?:[1-9]\d)?(?:[02468][048]|[13579][26])(?!\d))29)|(?:(?=31[\/\-.](?!11)0?[13578]|1[02])31)|(?:(?=\d?\d[\/\-.]\d?\d[\/\-.])(?!29[\/\-.]0?2)(?!31)(?:[12][0-9]|30|0?[1-9])))[\/\-.](0?[1-9]|1[0-2])[\/\-.]((?:[1-9]\d)?\d{2})$/;
    if (!regex.test(birthdate)) {   
      return Result.fail<boolean>(new BadRequest("Invalid birth date"))
    }
    return Result.ok<boolean>(true)
  }
}

export default ValidateUser;

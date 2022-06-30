import { BadRequest } from '../error/errors';
import AccountRequest from '../model/account_request_model';
class ValidateUser {
  public execute(params: AccountRequest): boolean {
    this.nameValidate(params); 
    this.cpfValidate(params);
    this.dateOfBirthValidate(params);

    return true;
  }

  private cpfValidate(params: AccountRequest) {
    if (!('cpf' in params)) {
      throw new BadRequest('Cpf is required');
    }
    const { cpf } = params;

    if (cpf.length !== 11) {
      throw new BadRequest('Cpf must be 11 digits');
    }
    const onlyNumbersRegex = /^[0-9]+$/;
    if (!onlyNumbersRegex.test(cpf)) {
      throw new BadRequest('Cpf must contain only numbers');
    }
  }

  private nameValidate(params: AccountRequest) {
    if (!('name' in params)) {
      throw new BadRequest('Name is required');
    }
    const { name } = params;
    if (name.length > 60) {
      throw new BadRequest('Name is too long');
    }
    const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    if (!regex.test(name)) {
      throw new BadRequest('Invalid name');
    }
  }

  private dateOfBirthValidate(params: AccountRequest) {
    if (!('birthdate' in params)) {
      throw new BadRequest('Birthdate is required');
    }
    const { birthdate } = params;
    const regex = /^((?:(?=29[\/\-.]0?2[\/\-.](?:[1-9]\d)?(?:[02468][048]|[13579][26])(?!\d))29)|(?:(?=31[\/\-.](?!11)0?[13578]|1[02])31)|(?:(?=\d?\d[\/\-.]\d?\d[\/\-.])(?!29[\/\-.]0?2)(?!31)(?:[12][0-9]|30|0?[1-9])))[\/\-.](0?[1-9]|1[0-2])[\/\-.]((?:[1-9]\d)?\d{2})$/;
    if (!regex.test(birthdate)) {
      throw new BadRequest('Invalid birth date');
    }
  }
}

export default ValidateUser;

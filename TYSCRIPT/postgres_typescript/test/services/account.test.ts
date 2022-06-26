import CreateAccount from '../../src/services/create_account_service';
import IAccount from '../../src/model/account_model';

describe('CreateAccount', () => {
  const newAccount = {
    name: 'Vitor',
    email: 'vitorrt2015@gmail.com',
    cpf: '31568262353',
    birthdate: '28/05/2003',
    id: '1234123123',
  };
  const password = 2122;
  const account: IAccount = new CreateAccount().createAccount(newAccount, password);
});

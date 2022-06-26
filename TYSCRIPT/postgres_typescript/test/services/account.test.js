"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_account_service_1 = __importDefault(require("../../src/services/create_account_service"));
describe('CreateAccount', () => {
    const newAccount = {
        name: 'Vitor',
        email: 'vitorrt2015@gmail.com',
        cpf: '31568262353',
        birthdate: '28/05/2003',
        id: '1234123123',
    };
    const password = 2122;
    const account = new create_account_service_1.default().createAccount(newAccount, password);
});

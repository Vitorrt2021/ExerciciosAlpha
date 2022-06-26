"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const create_user_service_1 = __importDefault(require("../../src/services/create_user_service"));
const errors_1 = require("../../src/error/errors");
describe('CreateUser', () => {
    describe('should have', () => {
        const newUser = {
            name: 'Vitor',
            email: "vitorrt2015@gmail.com",
            cpf: '31568262353',
            birthdate: '28/05/2003',
        };
        const user = new create_user_service_1.default().execute(newUser);
        test('name', () => {
            expect(user.name).toBe('Vitor');
        });
        test('date of birth', () => {
            expect(user.birthdate).toBe('28/05/2003');
        });
        test('email', () => {
            expect(user.email).toBe('vitorrt2015@gmail.com');
        });
        test('cpf', () => {
            expect(user.cpf).toBe('31568262353');
        });
        test('id', () => {
            expect(user.id).not.toBeNull();
        });
    });
    describe('Should be throw error with invalid ', () => {
        const newUser = {
            name: 'Vitor',
            email: "vitorrt2015@gmail.com",
            cpf: '31568262353',
            date_of_birth: '28/05/2003'
        };
        test('name', () => {
            newUser.name = 'sada22';
            expect(() => new create_user_service_1.default().execute(newUser)).toThrow(errors_1.BadRequest);
        });
        test('date of birth', () => {
            newUser.date_of_birth = '22/22/222';
            expect(() => new create_user_service_1.default().execute(newUser)).toThrow(errors_1.BadRequest);
        });
        test('email', () => {
            newUser.email = 'sasd2.com';
            expect(() => new create_user_service_1.default().execute(newUser)).toThrow(errors_1.BadRequest);
        });
        test('cpf', () => {
            newUser.cpf = '22231232';
            expect(() => new create_user_service_1.default().execute(newUser)).toThrow(errors_1.BadRequest);
        });
    });
});

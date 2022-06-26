"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/app"));
describe('POST /accounts', () => {
    describe('with correct post data', () => {
        const payload = {
            name: 'Vitor',
            email: 'vitorrt2015@gmail.com',
            cpf: '31568262353',
            password: 1234,
            birthdate: '28/05/2003',
        };
        it('should return success', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertest_1.default)(app_1.default).post('/accounts').send(payload);
            expect(result.statusCode).toEqual(200);
        }));
        it('should return correct account information', () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const result = yield (0, supertest_1.default)(app_1.default).post('/accounts').send(payload);
            const expectKeys = ['agency', 'agency_check_digit', 'user_id', 'id', 'password', 'account_number', 'check_digit', 'balance'];
            const resultKeys = Object.keys((_a = result.body) === null || _a === void 0 ? void 0 : _a.data);
            expect(resultKeys.sort()).toEqual(expectKeys.sort());
        }));
        it('should return in correct format', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield (0, supertest_1.default)(app_1.default).post('/accounts').send(payload);
            const expectKeys = ['data', 'message', 'status'];
            const resultKeys = Object.keys(result.body);
            expect(resultKeys).toEqual(expectKeys);
        }));
    });
});

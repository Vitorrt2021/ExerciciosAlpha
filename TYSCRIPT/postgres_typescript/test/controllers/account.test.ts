import request from 'supertest';
import app from '../../src/app';

describe('POST /accounts', () => {
  describe('with correct post data', () => {
    const payload = {
      name: 'Vitor',
      email: 'vitorrt2015@gmail.com',
      cpf: '31568262353',
      password: 1234,
      birthdate: '28/05/2003',
    };
    it('should return success', async () => {
      const result = await request(app).post('/accounts').send(payload);
      expect(result.statusCode).toEqual(200);
    });

    it('should return correct account information', async () => {
      const result = await request(app).post('/accounts').send(payload);
      const expectKeys = ['agency', 'agency_check_digit','user_id','id','password' ,'account_number', 'check_digit', 'balance'];
      const resultKeys = Object.keys(result.body?.data);
      expect(resultKeys.sort()).toEqual(expectKeys.sort());
    });

    it('should return in correct format', async () => {
      const result = await request(app).post('/accounts').send(payload);
      const expectKeys = ['data', 'message', 'status'];
      const resultKeys = Object.keys(result.body);
      expect(resultKeys).toEqual(expectKeys);
    });
  });
});

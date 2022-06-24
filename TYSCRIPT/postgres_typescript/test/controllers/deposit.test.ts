import request from 'supertest';
import app from '../../src/app';

describe('POST /deposit', () => {
  describe('with correct post data', () => {
    const payload = {
      account: {
        agency: 555,
        agency_check_digit: 4,
        account_number: 12345,
        check_digit: 1,
      },
      value: 100,
    };

    it('should return success', async () => {
      const result = await request(app).post('/deposit').send(payload);
      expect(result.statusCode).toEqual(200);
    });

    it('should return in correct format', async () => {
      const result = await request(app).post('/deposit').send(payload);
      const expectKeys = ['data', 'message', 'status'];
      const resultKeys = Object.keys(result.body);
      expect(resultKeys).toEqual(expectKeys);
    });

    it('should return correct deposit information', async () => {
      const result = await request(app).post('/deposit').send(payload);
      const expectKeys = ['transaction_id', 'type', 'value', 'date', 'account'];
      const resultKeys = Object.keys(result.body?.data);
      expect(resultKeys.sort()).toEqual(expectKeys.sort());
    });
  });
});

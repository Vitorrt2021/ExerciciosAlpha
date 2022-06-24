import request from "supertest";
import app from '../../src/app';

describe("POST /accounts", () => {
    describe('with correct post data',()=>{
        const payload = {
            agency: '555',
            agency_check_digit: 4 ,
            account_number: '00012345', 
            check_digit: 1 ,
            balance: 0.0
        }       
        it("should return success", async () => {
            const result = await request(app).post("/accounts").send(payload);
            expect(result.statusCode).toEqual(200);
        });

        it("should return correct account information", async () => {
            const result = await request(app).post("/accounts").send(payload);
            const expectKeys = ['agency','agency_check_digit','account_number','check_digit','balance','id']
            const resultKeys = Object.keys(result.body?.data) 
            expect(resultKeys).toEqual(expectKeys);
        });

        it("should return in correct format", async () => {
            const result = await request(app).post("/accounts").send(payload);
            const expectKeys = ['data','message','status']
            const resultKeys = Object.keys(result.body) 
            expect(resultKeys).toEqual(expectKeys);
        });
    })
});
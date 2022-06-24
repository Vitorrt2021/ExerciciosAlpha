import request from "supertest";
import app from '../../src/app';

describe("POST /users", () => {
  describe('with post request with correct data',()=>{
    const payload = {
      name:'Vitor',
      email: "vitorrt2015@gmail.com",
      cpf:'31568262353',
      date_of_birth:'28/05/2003'
    }
    it("should return success", async () => {       
      const result = await request(app).post("/users").send(payload);
      expect(result.statusCode).toEqual(200);
    });

    it("should return expect keys", async () => {       
      const result = await request(app).post("/users").send(payload);
      const expectKeys = ['data','message','status']
      const resultKeys = Object.keys(result.body)
      expect(resultKeys).toEqual(expectKeys)  
    });

    it("should return expect users informations", async () => {       
      const result = await request(app).post("/users").send(payload);
      const expectKeys = ['name','email','cpf','date_of_birth','id']
      const resultKeys = Object.keys(result.body.data)
      expect(resultKeys).toEqual(expectKeys)  
    });
 
  })
  
});

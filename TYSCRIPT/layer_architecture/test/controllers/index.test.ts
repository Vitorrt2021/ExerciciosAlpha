import request from "supertest";
import app from '../../src/app';

describe("GET /ping", () => {
  it("should return ping", async () => {
    const result = await request(app).get("/ping");
    expect(result.text).toEqual("pong");
    expect(result.statusCode).toEqual(200);
  });
});
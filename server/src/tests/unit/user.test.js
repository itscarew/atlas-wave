const request = require("supertest");
const app = require("../../../app");


describe("GET /user", () => {
  it("It should respond with all the users", () => {
    return request(app)
      .get("/user")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });
});

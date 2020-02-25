const request = require("supertest");
const app = require("../../src/app");

describe("Customers", () => {
  it("GET / should respond customers which have imageSrc property", async () => {
    const { body: actualCustomer } = await request(app)
      .get("/customers")
      .expect(200);

    expect(actualCustomer[0]).toEqual({ imageSrc: expect.any(String) });
  });
});

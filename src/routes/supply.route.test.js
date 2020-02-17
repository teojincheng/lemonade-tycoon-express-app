const request = require("supertest");
const app = require("../../src/app");
const Supply = require("../../src/models/supply.model");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

describe("supplies", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      await mongoose.connect(mongoUri);
    } catch (err) {
      next(err);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const suppliesData = [
      {
        name: "Sugar",
        qty: 5,
        costPrice: 0.4
      }
    ];
    await Supply.create(suppliesData);
  });

  afterEach(async () => {
    await Supply.deleteMany();
  });

  it("POST /supplies should add a new supply item and respond with new item", async () => {
    const itemData = {
      name: "Lemon",
      qty: 50,
      costPrice: 0.4
    };

    const expectedData = {
      name: "Lemon",
      qty: 50
    };

    const { body: actualResponse } = await request(app)
      .post("/supplies")
      .send(itemData)
      .expect(201);

    expect(actualResponse).toEqual(expectedData);
  });

  it("PATCH /supplies/:name should update the correct supply item and respond with the updated item", async () => {
    const itemData = {
      name: "Sugar",
      qty: 1
    };
    const { body: actualResponse } = await request(app)
      .patch(`/supplies/${itemData.name}`)
      .send(itemData)
      .expect(200);

    expect(actualResponse).toEqual(itemData);
  });
});

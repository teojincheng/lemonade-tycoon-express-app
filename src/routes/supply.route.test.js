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
    const suppliesData = {
      items: [
        {
          name: "Sugar",
          qty: 5,
          costPrice: 0.4
        }
      ]
    };
    await Supply.create(suppliesData);
  });

  afterEach(async () => {
    await Supply.deleteMany();
  });

  it("POST /supplies should create new supply items and respond with new items", async () => {
    const SuppliesData = [
      {
        name: "Lemon",
        qty: 5,
        costPrice: 0.4
      },
      {
        name: "Ice",
        qty: 5,
        costPrice: 0.4
      }
    ];

    const { body: actualResponse } = await request(app)
      .post("/supplies")
      .send(SuppliesData)
      .expect(201);

    expect(actualResponse).toEqual(SuppliesData);
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

  it("PATCH /supplies should update multiple supply items and respond with the updated items", async () => {
    const newData = [
      {
        name: "Lemon",
        qty: 1
      },
      {
        name: "Ice",
        qty: 1
      }
    ];

    const { body: actualResponse } = await request(app)
      .patch("/supplies")
      .send(newData)
      .expect(200);

    expect(actualResponse).toEqual(newData);
  });

  it("GET /supplies should retrieve all the supply items and respond with them.", async () => {
    const expectedData = [
      {
        name: "Sugar",
        qty: 5,
        costPrice: 0.4
      }
    ];
    const { body: actualResponse } = await request(app)
      .get("/supplies")
      .expect(200);

    expect(actualResponse).toEqual(expectedData);
  });

  it("DELETE supplies should delete the supplies document and return a response which shows the supply items being deleted ", async () => {
    const expectedData = [
      {
        name: "Sugar",
        qty: 5,
        costPrice: 0.4
      }
    ];

    const { body: actualResponse } = await request(app)
      .delete("/supplies")
      .expect(200);

    expect(actualResponse).toEqual(expectedData);
  });
});

const request = require("supertest");
const app = require("../app");
const DayStat = require("../models/dayStat.model");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

describe("dayStatistics", () => {
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
    const statsData = {
      dayNumber: 1,
      costPerCup: 0.9,
      sellingPricePerCup: 1,
      cupsSold: 2
    };
    await DayStat.create(statsData);
  });

  afterEach(async () => {
    await DayStat.deleteMany();
  });

  it("POST /statistics should add a new day stat entry and respond with new item", async () => {
    const statsData = {
      dayNumber: 2,
      costPerCup: 0.9,
      sellingPricePerCup: 1,
      cupsSold: 2
    };
    const { body: actualResponse } = await request(app)
      .post("/statistics")
      .send(statsData)
      .expect(201);

    expect(actualResponse).toEqual(statsData);
  });
});

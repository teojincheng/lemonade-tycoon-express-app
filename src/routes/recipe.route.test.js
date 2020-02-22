const request = require("supertest");
const app = require("../../src/app");
const Recipe = require("../../src/models/recipe.model");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

describe("recipes", () => {
  let mongoServer;
  beforeAll(async () => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      await mongoose.connect(mongoUri);
    } catch (err) {
      console.error(err);
    }
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    const recipesData = [
      {
        name: "Lemon",
        qty: 5
      },
      {
        name: "Sugar",
        qty: 5
      }
    ];
    await Recipe.create(recipesData);
  });

  afterEach(async () => {
    await Recipe.deleteMany();
  });

  it("POST /recipes should add a new recipe item and respond with new item", async () => {
    const itemData = {
      name: "Ice",
      qty: 1
    };

    const { body: actualResponse } = await request(app)
      .post("/recipes")
      .expect(201)
      .send(itemData);

    expect(actualResponse).toEqual(itemData);
  });

  it("PATCH /recipes/:name shoupld update the recipe item and respond with update items", async () => {
    const itemData = {
      name: "Lemon",
      qty: 3
    };

    const { body: actualResponse } = await request(app)
      .patch(`/recipes/${itemData.name}`)
      .send(itemData)
      .expect(200);

    expect(actualResponse).toEqual(itemData);
  });

  it("DELETE /recipes should delete the recipes documents and respond with the deleted recipe items", async () => {
    const expectedData = [
      {
        name: "Lemon",
        qty: 5
      },
      {
        name: "Sugar",
        qty: 5
      }
    ];

    const { body: actualResponse } = await request(app)
      .delete("/recipes")
      .expect(200);

    expect(actualResponse).toEqual(expectedData);
  });
});

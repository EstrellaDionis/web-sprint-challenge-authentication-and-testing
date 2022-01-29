const request = require("supertest");
const server = require("./server");
const db = require("../data/dbConfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe("POST /register", () => {
  test("Creating a user returns a 201", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "Captain Marvel", password: "foobar" });

    expect(res.status).toBe(201);
  });
  test("Creating a user returns the user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({ username: "Captain America", password: "foobar" });

    expect(res.body.id).toBe(2);
    expect(res.body.username).toBe("Captain America");
  });
});

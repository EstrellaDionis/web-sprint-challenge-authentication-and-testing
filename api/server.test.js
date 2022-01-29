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

describe("POST /login", () => {
  test("Logging in returns status of 200", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "Captain Marvel", password: "foobar" });

    expect(res.status).toBe(200);
  });
  test("Logging in returns welcome message", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "Captain Marvel", password: "foobar" });

    expect(res.body.message).toBe("welcome, Captain Marvel");
  });
});

describe("GET /jokes", () => {
  test("Without token we get error", async () => {
    const res = await request(server).get("/api/jokes");

    expect(res.status).toBe(401);
  });

  test("With token we get the jokes", async () => {
    const login = await request(server)
      .post("/api/auth/login")
      .send({ username: "Captain Marvel", password: "foobar" });

    const token = login.body.token;

    const res = await request(server)
      .get("/api/jokes")
      .set("Header", { authorization: token });

    expect(res.status).toBe(200);
  });
});

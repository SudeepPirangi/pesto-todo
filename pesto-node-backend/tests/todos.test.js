const mongoose = require("mongoose");
const request = require("supertest");

const app = require("../src/server");
const { connectDatabase, disconnectDatabase } = require("../src/config/mongo");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await connectDatabase();
});

/* Closing database connection after each test. */
afterEach(async () => {
  await disconnectDatabase();
});

let allTodos = [];
let todoId = "";

// tests Create operation
describe("POST /todos", () => {
  it("should create a todo", async () => {
    const res = await request(app).post("/todos").send({
      title: "Prepare testcases again",
      description: "do this for both frontend and backend",
      status: "to-do",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Prepare testcases again");
  });
});

// tests Read all operation
describe("GET /todos", () => {
  it("should return all todos", async () => {
    const res = await request(app).get("/todos");
    allTodos = res.body;
    todoId = allTodos[allTodos.length - 1]._id;
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

// tests Read operation
describe("GET /todos/:id", () => {
  it("should return a todo", async () => {
    const res = await request(app).get(`/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe("Prepare testcases again");
  });

  it("should return 'Id not found' error", async () => {
    const res = await request(app).get(`/todos/66280636d61f955f95b00232`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Id not found");
  });
});

// tests Update operation
describe("PATCH /todos/:id", () => {
  it("should update a todo", async () => {
    const res = await request(app).patch(`/todos/${todoId}`).send({
      status: "in-progress",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("in-progress");
  });

  it("should return 'Id not found' error", async () => {
    const res = await request(app).get(`/todos/66280636d61f955f95b00232`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Id not found");
  });
});

// tests Delete operation
describe("DELETE /todos/:id", () => {
  it("should delete a todo", async () => {
    const res = await request(app).delete(`/todos/${todoId}`);
    expect(res.statusCode).toBe(200);
  });

  it("should return 'Id not found' error", async () => {
    const res = await request(app).get(`/todos/66280636d61f955f95b00232`);
    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Id not found");
  });
});

// exit jest in dev (not for production)
// in ideal case it is recommended to use mock data than getting from db
process.exit();

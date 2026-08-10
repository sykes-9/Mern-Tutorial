const request = require("supertest");
const express = require("express");

const { healthCheck } = require("./controllers/healthController");

const app = express();

app.get("/api/health", healthCheck);

test("GET /api/health returns 200 and OK status", async () => {
  const response = await request(app).get("/api/health");

  expect(response.statusCode).toBe(200);
  expect(response.body.status).toBe("OK");
});

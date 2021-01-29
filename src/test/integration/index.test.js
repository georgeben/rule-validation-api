const request = require("supertest");
const { expect } = require("chai");
const app = require("../../app");

const agent = request(app);

describe("******** Smoke test ******", () => {
  it("GET /", (done) => {
    agent
      .get("/")
      .set("Content-Type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal("My Rule-Validation API");
          expect(response.status).to.equal("success");
          done();
        } catch (error) {
          done(error);
        }
      });
  });
});

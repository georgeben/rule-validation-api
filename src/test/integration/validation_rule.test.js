const request = require("supertest");
const { expect } = require("chai");
const app = require("../../app");

const agent = request(app);

describe("********* Validate Rule endpoint *********", () => {
  it("POST /validate-rule - rule missing", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({})
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal("rule is required.");
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - rule is of an invalid type", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: 14,
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal("rule should be an object.");
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - rule.field missing", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {},
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal("rule.field is required.");
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - rule.condition missing", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "balance",
        },
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal("rule.condition is required.");
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - invalid condition", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "balance",
          condition: "lol",
        },
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal(
            "rule.condition must be one of eq,neq,gt,gte,contains.",
          );
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });
  it("POST /validate-rule - rule.condition_value missing", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "balance",
          condition: "eq",
        },
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal(
            "rule.condition_value is required.",
          );
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });
  it("POST /validate-rule - data missing", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "balance",
          condition: "eq",
          condition_value: 1000,
        },
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal("data is required.");
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });
  it("POST /validate-rule - data is of an invalid type", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "balance",
          condition: "eq",
          condition_value: 1000,
        },
        data: 100,
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal(
            "data should be a|an object,array,string.",
          );
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - field missing in data", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "balance",
          condition: "eq",
          condition_value: 1000,
        },
        data: "hello",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal(
            "field balance is missing from data.",
          );
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - nesting greater than two levels", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "user.account.balance",
          condition: "eq",
          condition_value: 1000,
        },
        data: "hello",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal(
            "Nesting of field should not be more than two levels.",
          );
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - EX1 (successful validation)", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "missions.count",
          condition: "gte",
          condition_value: 30,
        },
        data: {
          name: "James Holden",
          crew: "Rocinante",
          age: 34,
          position: "Captain",
          missions: {
            count: 45,
            successful: 44,
            failed: 1,
          },
        },
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal(
            "field missions.count successfully validated.",
          );
          expect(response.status).to.equal("success");
          expect(response.data).to.be.an("object");
          const { validation } = response.data;
          expect(validation.error).to.equal(false);
          expect(validation.field).to.equal("missions.count");
          expect(validation.field_value).to.equal(45);
          expect(validation.condition).to.equal("gte");
          expect(validation.condition_value).to.equal(30);
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - EX2 (failed validation)", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "0",
          condition: "eq",
          condition_value: "a",
        },
        data: "damien-marley",
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal("field 0 failed validation.");
          expect(response.status).to.equal("error");
          expect(response.data).to.be.an("object");
          const { validation } = response.data;
          expect(validation.error).to.equal(true);
          expect(validation.field).to.equal("0");
          expect(validation.field_value).to.equal("d");
          expect(validation.condition).to.equal("eq");
          expect(validation.condition_value).to.equal("a");
          done();
        } catch (error) {
          done(error);
        }
      });
  });

  it("POST /validate-rule - EX3 (failed validation)", (done) => {
    agent
      .post("/validate-rule")
      .set("Content-Type", "application/json")
      .send({
        rule: {
          field: "5",
          condition: "contains",
          condition_value: "rocinante",
        },
        data: ["The Nauvoo", "The Razorback", "The Roci", "Tycho"],
      })
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err, res) => {
        try {
          if (err) throw err;
          const response = res.body;
          expect(response.message).to.equal("field 5 is missing from data.");
          expect(response.status).to.equal("error");
          expect(response.data).to.equal(null);
          done();
        } catch (error) {
          done(error);
        }
      });
  });
});

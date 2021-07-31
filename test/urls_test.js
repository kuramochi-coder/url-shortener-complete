const assert = require("chai").assert;
const testUrl = "https://www.amazon.com/";

const axios = require("axios");
const config = require("../config/default.json");
const baseUrl = config.baseUrl;

describe("Url APIs", () => {
  describe("GET /api/urls", () => {
    it("Should GET all the urls", () => {
      axios.get(`${baseUrl}/api/urls`).then((response) => {
        assert.equal(response.status, "200");
        assert.typeOf(response.data, "array");
        assert.isAbove(response.data.length, 1);
      });
    });
  });

  describe("POST /api/urls", () => {
    it("Should POST test url", () => {
      axios.post(`${baseUrl}/api/urls`, { full: testUrl }).then((response) => {
        assert.equal(response.status, "200");
        assert.notEqual(response.data, undefined);
      });
    });
  });

  describe("POST /api/urls/update", () => {
    it("Should UPDATE test url", () => {
      axios.get(`${baseUrl}/api/urls`).then((response) => {
        // console.log(response.data);
        if (response.data) {
          response.data.map((urldata) => {
            if (urldata.full == testUrl) {
              axios
                .post(`${baseUrl}/api/urls/update`, {
                  _id: urldata._id,
                  short: "test",
                })
                .then((response) => {
                  assert.equal(response.status, "200");
                });
            }
          });
        }
      });
    });
  });

  describe("DELETE /api/urls/:id", () => {
    it("Should DELETE test url", () => {
      axios.get(`${baseUrl}/api/urls`).then((response) => {
        // console.log(response.data);
        if (response.data) {
          response.data.map((urldata) => {
            if (urldata.full == testUrl) {
              axios
                .delete(`${baseUrl}/api/urls/${urldata._id}`)
                .then((response) => {
                  assert.equal(response.status, "200");
                });
            }
          });
        }
      });
    });
  });
});

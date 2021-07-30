const assert = require("chai").assert;
const ShortUrl = require("../models/url.model");
const testUrl = "https://www.amazon.com/";

const axios = require("axios");
const config = require("../config/default.json");
const baseUrl = config.baseUrl;

describe("Url APIs", () => {
  describe("GET /api/urls", () => {
    it("Should GET all the urls", () => {
      axios.get(`${baseUrl}/api/urls`).then((res, data) => {
        assert.equal(res, "200");
        assert.typeOf(data, "array");
        assert.isAbove(data.length, 1);
        assert.notEqual(data, undefined);
      });
    });
  });

  describe("POST /api/urls", () => {
    it("Should POST test url", () => {
      axios.post(`${baseUrl}/api/urls`, { full: testUrl }).then((res, data) => {
        assert.equal(res, "200");
        assert.notEqual(data, undefined);
      });
    });
  });

  describe("POST /api/urls/update", () => {
    it("Should UPDATE test url", () => {
      const testUrlObj = ShortUrl.findOne({ full: testUrl });

      axios
        .post(`${baseUrl}/api/urls/update`, {
          _id: testUrlObj._id,
          short: "test",
        })
        .then((res, data) => {
          assert.equal(res, "200");
          assert.notEqual(data, undefined);
        });
    });
  });

  describe("DELETE /api/urls/:id", () => {
    it("Should DELETE test url"),
      () => {
        testUrlObj = ShortUrl.findOne({ full: testUrl });

        console.log(testUrlObj);
        const id = testUrlObj._id;

        axios.delete(`${baseUrl}/api/urls/${id}`).then((res, data) => {
          assert.equal(res, "200");
          assert.notEqual(data, undefined);
        });
      };
  });
});

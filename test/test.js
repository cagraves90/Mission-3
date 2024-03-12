const sum = require("../sum");

const request = require("supertest");
const app = require("../index.js");

// -------------------------------------------------- Unit tests for API 1 ----------------------------------------------------------------- //

describe("car value calculation", () => {
  test("input string should equal num", () => {
    expect(sum.calcString("Honda")).toBe(4200);
  });
  test("car year should be 2014", () => {
    expect(sum.carYear(2014)).toBe(2014);
  });
  test("Car Value should be 6214", () => {
    expect(sum.carValue(4200, 2014)).toBe(6214);
  });
});

describe("Wrong input should give errors", () => {
  test("car model of number type should be error", () => {
    expect(sum.calcString(400)).toBe("Invalid Car Model input");
  });

  test("car year of -2014 should be error", () => {
    expect(sum.carYear(-2014)).toBe("Invalid year");
  });

  test("car Value with negative num should be error", () => {
    expect(sum.carValue(4200, -2014)).toBe("Invalid input");
  });
  test("calcString with number typed as string should be error", () => {
    expect(sum.carValue("4200", -2014)).toBe("Invalid input");
  });
});

// ------------------------------------------------------- Unit Tests for API 2 ------------------------------------------ //

// describe("API 2 string array and length to equal claim risk", () => {
//   test("string should equal 3 matches", () => {
//     expect(
//       sum.riskRating(
//         "My only claim was a bump into my house's garage door that left a bump on my car. There are no other scratches"
//       )
//     ).toStrictEqual(3);
//   });
//   test("string should equal 0 matches, therefore claim risk of 1", () => {
//     expect(
//       sum.riskRating("I have no accidents, so should have a low risk rating.")
//     ).toStrictEqual(1);
//   });
// });

//--------------------------------------------------------- Unit Test for API 3 -------------------------------------------- //

describe("API 3 final quote in month and year format", () => {
  test("final quote should be 186 yearly and 15.50", () => {
    expect(sum.finalQuote(6214, 3)).toStrictEqual({
      monthly_premium: 15.5,
      yearly_premium: 186,
    });
  });
});
// --------------------------------------------------------- API endpoints using Jest and Supertest ------------------------------------------ ////

// --------------------------------- Extra code seeing how get requests work in Supertest --------//
describe("GET /carInfo", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/carInfo");
    expect(response.statusCode).toBe(200);
  });

  test("should specify json in the content type header", async () => {
    const response = await request(app).get("/carInfo");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

// ---------------------------------------------------- API ENDPOINT 1 FOR CAR VALUE ------------------------------------------------ //

describe(" /carValueInput API1 Sunny day scenarios", () => {
  test("Calculate car value for valid input of year and model", async () => {
    const response = await request(app)
      .post("/carValueInput")
      .send({ model: "Honda", year: 2014 });

    expect(response.statusCode).toBe(200);
    expect(sum.calcString("Honda")).toBe(4200);
    expect(sum.carYear(2014)).toBe(2014);
    expect(sum.carValue(4200, 2014)).toBe(6214);
  });
});

describe(" /carValueInput API 1 error test cases", () => {
  test("should return status 400 and error invalid input, if model input is null", async () => {
    const response = await request(app)
      .post("/carValueInput")
      .send({ model: null, year: 2020 });
    expect(response.status).toBe(400);
    expect(sum.carValue(null, 2020)).toBe("Invalid input");
  });

  test("should return status 400 and error invalid input, if year input is null", async () => {
    const response = await request(app)
      .post("/carValueInput")
      .send({ model: "Honda", year: null });
    expect(response.status).toBe(400);
    expect(sum.carValue("Honda", null)).toBe("Invalid input");
  });

  test("should return status 400 and error invalid input, if year is a negative number", async () => {
    const response = await request(app)
      .post("/carValueInput")
      .send({ model: "Honda", year: -2000 });
    expect(response.status).toBe(400);
    expect(sum.carValue("Honda", -2000)).toBe("Invalid input");
  });

  test("should return status 400 and invalid input, if year is a string", async () => {
    const response = await request(app)
      .post("/carValueInput")
      .send({ model: "Honda", year: "twenty twenty" });
    expect(response.status).toBe(400);
    expect(sum.carValue("Honda", "twenty twenty")).toBe("Invalid input");
  });

  test("should return status 400  and invalid car model input if model is typed as a number", async () => {
    const response = await request(app)
      .post("/carValueInput")
      .send({ model: 911, year: 2000 });
    expect(response.status).toBe(400);
    expect(sum.calcString(911)).toBe("Invalid Car Model input");
  });
});

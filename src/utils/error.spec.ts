import { catchError } from "./error";

describe("error.ts", () => {
  it("should return catchError", () => {
    const error = catchError(new Error("hello world"));

    expect(error).toStrictEqual("hello world");
  });

  it("should return empty string if error not passed", () => {
    const error = catchError("hello world");

    expect(error).toStrictEqual("");
  });
});

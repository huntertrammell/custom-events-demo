import { mockFetch } from "./mockFetch";
import { vi } from "vitest";

describe("mockFetch.ts", () => {
  it("should mock fetch method for /api/test", async () => {
    mockFetch();

    const testObj = {
      hello: "world",
    };

    const response = await fetch("/api/test", {
      method: "POST",
      body: JSON.stringify(testObj),
    });

    const data = await response.json();

    expect(data).toStrictEqual(testObj);
  });

  it("should mock fetch method for /api/test/error", async () => {
    mockFetch();

    const testObj = {
      status: 500,
      ok: false,
    };

    const response = await fetch("/api/test/error");

    expect(response).toStrictEqual(testObj);
  });

  it("should return normal fetch method", async () => {
    const testObj = { hello: "world" };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(testObj),
      } as unknown as Promise<Response>)
    );

    mockFetch();

    const response = await fetch("https://google.com/api/anything");
    const data = await response.json();

    expect(data).toStrictEqual(testObj);
  });
});

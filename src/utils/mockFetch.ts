export function mockFetch() {
  const coreFetch = window.fetch;

  window.fetch = (input, init) => {
    if (input === "/api/test") {
      return new Promise((resolve) => {
        resolve({
          status: 200,
          ok: true,
          json: () => Promise.resolve(JSON.parse(init?.body as string)),
        } as unknown as Response);
      });
    } else if (input === "/api/test/error") {
      return new Promise((resolve) => {
        resolve({
          status: 500,
          ok: false,
        } as unknown as Response);
      });
    } else {
      return coreFetch(input, init);
    }
  };
}

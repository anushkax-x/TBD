import { FLOWMINT_API_URL, resolveApiUrl } from "./config";

describe("resolveApiUrl", () => {
  it("uses the configured local API URL", () => {
    expect(resolveApiUrl("http://localhost:3002", "localhost")).toBe("http://localhost:3002");
  });

  it("falls back to the local API when nothing is configured", () => {
    expect(resolveApiUrl(undefined, "localhost")).toBe("http://localhost:3001");
  });

  it("sends flowmint.works to the production API when the configured URL is local", () => {
    expect(resolveApiUrl("http://localhost:3001", "flowmint.works")).toBe(FLOWMINT_API_URL);
    expect(resolveApiUrl("http://localhost:3002/", "www.flowmint.works")).toBe(FLOWMINT_API_URL);
    expect(resolveApiUrl(undefined, "flowmint.works")).toBe(FLOWMINT_API_URL);
  });

  it("keeps an explicit non-local API URL on the production host", () => {
    expect(resolveApiUrl("https://api.example.com", "flowmint.works")).toBe(
      "https://api.example.com",
    );
  });
});

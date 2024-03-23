import { describe, expect, it, vi } from "vitest";
import createWebSocketUrl from "../../src/helpers/createWebSocketUrl";
import { config } from "../../src/config/config";

const url = config.backendWsUrl;

describe("createWebSocketUrl", () => {
  it("param", async () => {
    const param = "?param=1";
    const result = createWebSocketUrl(param);
    expect(result).toBe(url + param);
  });
  it("empty param + token", () => {
    const emptyParam = "";
    const token = "token";
    const result = createWebSocketUrl(emptyParam, token);
    expect(result).toBe(url + `?access_token=${token}`);
  });
  it("param + token", async () => {
    const param = "?param=1";
    const token = "token";
    const result = createWebSocketUrl(param, token);
    expect(result).toBe(url + `?param=1&access_token=${token}`);
  });
  it("empty param + undefined token", async () => {
    const emptyParam = "";
    const token = undefined;
    const result = createWebSocketUrl(emptyParam, token);
    expect(result).toBe(url);
  });
  it("param + undefined token", async () => {
    const param = "?param=1";
    const token = undefined;
    const result = createWebSocketUrl(param, token);
    expect(result).toBe(url + param);
  });
});

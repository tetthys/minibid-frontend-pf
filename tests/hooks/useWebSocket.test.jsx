import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Cookies from "js-cookie";
import useWebSocket from "../../src/hooks/useWebSocket";

class MockWebSocket {
  url;
  protocol;

  constructor(url, protocol) {
    this.url = url;
    this.protocol = protocol;
  }
}

describe("useWebSocket", () => {
  const fakeUrl = "";

  beforeEach(() => {
    Cookies.get = vi.fn().mockImplementation((key) => "token");
  });

  it("cookie + url + undefined array", async () => {
    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        dependencies: [undefined, undefined],
      })
    );
    expect(result.current.wsCli).toBeFalsy();
  });

  it("cookie + url + empty array", async () => {
    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        WebSocketClass: MockWebSocket,
      })
    );
    expect(result.current.wsCli).toBeTruthy();
    expect(
      result.current.wsCli.url.endsWith("access_token=token")
    ).toBeTruthy();
  });

  it("cookie + url + defined array", async () => {
    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        dependencies: [true, true],
        WebSocketClass: MockWebSocket,
      })
    );
    expect(result.current.wsCli).toBeTruthy();
    expect(
      result.current.wsCli.url.endsWith("access_token=token")
    ).toBeTruthy();
  });

  it("no cookie + url + undefined array", async () => {
    Cookies.get = vi.fn().mockImplementation((key) => undefined);

    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        dependencies: [undefined, undefined],
        WebSocketClass: MockWebSocket,
      })
    );
    expect(result.current.wsCli).toBeFalsy();
  });

  it("no cookie + url + empty array", async () => {
    Cookies.get = vi.fn().mockImplementation((key) => undefined);

    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        WebSocketClass: MockWebSocket,
      })
    );
    expect(result.current.wsCli).toBeFalsy();
  });

  it("no cookie + url + defined array", async () => {
    Cookies.get = vi.fn().mockImplementation((key) => undefined);

    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        dependencies: [true, true],
        WebSocketClass: MockWebSocket,
      })
    );
    expect(result.current.wsCli).toBeFalsy();
  });

  // When allowGuest = true
  it("cookie + url + undefined array + allowGuest", async () => {
    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        dependencies: [undefined, undefined],
        allowGuest: true,
        WebSocketClass: MockWebSocket,
      })
    );

    expect(result.current.wsCli).toBeFalsy();
  });

  it("cookie + url + empty array + allowGuest", async () => {
    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        allowGuest: true,
        WebSocketClass: MockWebSocket,
      })
    );

    expect(result.current.wsCli).toBeTruthy();
    expect(
      result.current.wsCli.url.endsWith("access_token=token")
    ).toBeTruthy();
  });

  it("cookie + url + defined array + allowGuest", async () => {
    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        dependencies: [true, true],
        allowGuest: true,
        WebSocketClass: MockWebSocket,
      })
    );

    expect(result.current.wsCli).toBeTruthy();
    expect(
      result.current.wsCli.url.endsWith("access_token=token")
    ).toBeTruthy();
  });

  it("no cookie + url + undefined array + allowGuest", async () => {
    Cookies.get = vi.fn().mockImplementation((key) => undefined);
    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        dependencies: [undefined, undefined],
        allowGuest: true,
        WebSocketClass: MockWebSocket,
      })
    );

    expect(result.current.wsCli).toBeFalsy();
  });

  it("no cookie + url + empty array + allowGuest", async () => {
    Cookies.get = vi.fn().mockImplementation((key) => undefined);

    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        allowGuest: true,
        WebSocketClass: MockWebSocket,
      })
    );

    expect(result.current.wsCli).toBeTruthy();
  });

  it("no cookie + url + defined array + allowGuest", async () => {
    Cookies.get = vi.fn().mockImplementation((key) => undefined);

    const { result } = renderHook(() =>
      useWebSocket({
        url: fakeUrl,
        dependencies: [true, true],
        allowGuest: true,
        WebSocketClass: MockWebSocket,
      })
    );

    expect(result.current.wsCli).toBeTruthy();
  });
});

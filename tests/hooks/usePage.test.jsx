import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import usePage from "../../src/hooks/usePage";

describe("usePage", () => {
  it("return page", () => {
    const { result } = renderHook(usePage);
    expect(result.current.page).toBe(1);
  });
  it("return setPage", () => {
    const { result } = renderHook(usePage);
    expect(result.current.setPage).toBeTruthy();
  });
});

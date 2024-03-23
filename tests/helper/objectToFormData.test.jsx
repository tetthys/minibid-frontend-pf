import { describe, expect, it, vi } from "vitest";
import objectToFormData from "../../src/helpers/objectToFormData";

describe("objectToFormData", () => {
  it("constant property", async () => {
    const formData = objectToFormData({
      a: 1,
    });
    expect(formData.get("a")).toBe("1");
  });

  it("array property", async () => {
    const formData = objectToFormData({
      arr: [1, 2, 3],
    });
    expect(formData.getAll("arr")).toEqual(["1", "2", "3"]);
  });

  it("empty array property", async () => {
    const formData = objectToFormData({
      arr: [],
    });
    expect(formData.getAll("arr")).toEqual([]);
  });

  // FormData just simply covert object to string
  it("object property", async () => {
    const formData = objectToFormData({
      a: { a: 1, b: 2 },
    });
    expect(typeof formData.get("a")).toBe("string");
  });

  it("undefined property", async () => {
    const formData = objectToFormData({
      a: undefined,
    });
    expect(formData.get("a")).toBeFalsy();
  });

  // ! Multer can't read
  // it("array property", async () => {
  //   const formData = objectToFormData({
  //     arr: [1, 2, 3],
  //   });
  //   expect(formData.get("arr[0]")).toBe("1");
  //   expect(formData.get("arr[1]")).toBe("2");
  //   expect(formData.get("arr[2]")).toBe("3");
  // });
});

import { describe, expect, it } from "vitest";
import renderImage from "../../src/helpers/renderImage";
import { config } from "../../src/config/config";

const imageUrl =
  "https://www.desktopbackground.org/download/2048x1152/2015/11/02/1036213_lion-hd-wallpapers-collection-42_2880x1800_h.jpg";
const pathWithSlash = "/uploads/something.jpg";
const pathNotWithSlash = "uploads/something.jpg";

describe("renderImage", () => {
  it("imageUrl", async () => {
    expect(renderImage(imageUrl)).toBe(imageUrl);
  });
  it("pathWithSlash", async () => {
    expect(renderImage(pathWithSlash)).toBe(
      `${config.backendHttpUrl}/uploads/something.jpg`
    );
  });
  it("pathNotWithSlash", async () => {
    expect(renderImage(pathNotWithSlash)).toBe(
      `${config.backendHttpUrl}/uploads/something.jpg`
    );
  });
});

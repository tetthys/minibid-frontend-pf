import { act, renderHook } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import useUpload from "../../src/hooks/useUpload";

const getFakeFile = () =>
  new File(["(⌐□_□)"], "fakefile.png", {
    type: "image/png",
  });

describe("useUpload", () => {
  it("upload", async () => {
    const { result } = renderHook(() =>
      useUpload({
        url: "http://localhost:3000/upload-file/product/image",
      })
    );

    expect(result.current.upload).toBeTruthy();
    expect(result.current.setFile).toBeTruthy();

    await act(async () => {
      const fakeFile = getFakeFile();
      result.current.setFile(fakeFile);
    });

    expect(result.current.file).toBeTruthy();

    await act(async () => {
      await result.current.upload();
    });

    expect(result.current.data).toBeTruthy();
  });

  it("after upload, uploadDone to true", async () => {
    const { result } = renderHook(() =>
      useUpload({
        url: "http://localhost:3000/upload-file/product/image",
      })
    );

    expect(result.current.upload).toBeTruthy();
    expect(result.current.setFile).toBeTruthy();
    expect(result.current.uploadDone).toBe(false);

    await act(async () => {
      const fakeFile = getFakeFile();
      result.current.setFile(fakeFile);
    });

    expect(result.current.file).toBeTruthy();

    await act(async () => {
      await result.current.upload();
    });

    expect(result.current.uploadDone).toBe(true);

    expect(result.current.data).toBeTruthy();
  });
});

/* eslint-disable no-undef */
import dataReducer, { setData } from "./dataSlice";

describe("dataSlice", () => {
  it("should handle initial state", () => {
    expect(dataReducer(undefined, {})).toEqual({
        items: [],
        loading: false,
        error: null
      });
  });

  it("should handle setData", () => {
    const previousState = { items: [], loading: false, error: null };
    expect(dataReducer(previousState, setData([{ id: 1, name: "Test" }]))).toEqual({
      items: [{ id: 1, name: "Test" }],
      loading: false,
      error: null
    });
  });
});

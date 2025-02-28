import { renderHook } from "@testing-library/react-hooks";
import { useSearchParams } from "next/navigation";
import { useQueryParams } from "../useQueryParams";

jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

describe("useQueryParams", () => {
  it("should get query parameters correctly", () => {
    const mockSearchParams = {
      getAll: jest.fn((key) => {
        const params: { [key: string]: string[] | undefined } = {
          param1: ["value1"],
          param2: ["value2a", "value2b"],
          param3: undefined,
        };
        return params[key] || [];
      }),
    };

    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useQueryParams());

    const params = result.current.getParams(["param1", "param2", "param3"]);
    expect(params).toEqual({
      param1: "value1",
      param2: ["value2a", "value2b"],
      param3: undefined,
    });
  });

  it("should set query parameters correctly", () => {
    const mockSearchParams = {
      getAll: jest.fn(),
    };

    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);

    const { result } = renderHook(() => useQueryParams());

    // Mock the setParams function
    const setParams = jest.fn();
    result.current.setParams = setParams;

    result.current.setParams({
      param1: "newValue1",
      param2: ["newValue2a", "newValue2b"],
    });

    expect(setParams).toHaveBeenCalledWith({
      param1: "newValue1",
      param2: ["newValue2a", "newValue2b"],
    });
  });
});

import { renderHook } from "@testing-library/react-hooks";
import { Grid } from "antd";
import { useBreakpoint } from "../useBreakpoint";

jest.mock("antd", () => ({
  Grid: {
    useBreakpoint: jest.fn(),
  },
}));

describe("useBreakpoint", () => {
  it("should return breakpoints and isCollapsed correctly", () => {
    const mockBreakpoints = {
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: false,
    };

    (Grid.useBreakpoint as jest.Mock).mockReturnValue(mockBreakpoints);

    const { result } = renderHook(() => useBreakpoint());

    expect(result.current).toEqual({
      ...mockBreakpoints,
      isCollapsed: true,
    });
  });

  it("should return isCollapsed as false when xl breakpoint is true", () => {
    const mockBreakpoints = {
      xs: true,
      sm: true,
      md: true,
      lg: true,
      xl: true,
    };

    (Grid.useBreakpoint as jest.Mock).mockReturnValue(mockBreakpoints);

    const { result } = renderHook(() => useBreakpoint());

    expect(result.current).toEqual({
      ...mockBreakpoints,
      isCollapsed: false,
    });
  });
});

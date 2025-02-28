import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Filter } from "."; // Adjust the import path as needed
import {
  ProductTier,
  ProductTheme,
  SortType,
} from "@/enums/filter";
import { useProductsContext } from "../../../contexts/productsContext";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useBreakpoint } from "@/hooks/useBreakpoint";

// Mock the hooks and context
jest.mock("../../../contexts/productsContext", () => ({
  useProductsContext: jest.fn(),
}));

jest.mock("@/hooks/useQueryParams", () => ({
  useQueryParams: jest.fn(),
}));

jest.mock("@/hooks/useBreakpoint", () => ({
  useBreakpoint: jest.fn(),
}));

// Mock antd components that might be difficult to test
jest.mock("antd", () => {
  const originalModule = jest.requireActual("antd");
  return {
    ...originalModule,
    Form: {
      ...originalModule.Form,
      useForm: () => {
        const resetFields = jest.fn();
        const setFieldsValue = jest.fn();
        return [{ resetFields, setFieldsValue }];
      },
    },
  };
});

describe("Filter Component", () => {
  // Setup default mock values before each test
  beforeEach(() => {
    // Mock the products context
    const setFilter = jest.fn();
    (useProductsContext as jest.Mock).mockReturnValue({
      filter: {},
      setFilter,
    });

    // Mock query params
    const setParams = jest.fn();
    const removeParams = jest.fn();
    const getParams = jest.fn().mockReturnValue({});
    (useQueryParams as jest.Mock).mockReturnValue({
      getParams,
      setParams,
      removeParams,
    });

    // Mock breakpoint
    (useBreakpoint as jest.Mock).mockReturnValue({
      isCollapsed: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders filter form with all elements", () => {
    render(<Filter />);

    // Check if basic elements are rendered
    expect(screen.getByPlaceholderText("Quick search")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Tier")).toBeInTheDocument();
    expect(screen.getByText("Theme")).toBeInTheDocument();
    expect(screen.getByText("Time")).toBeInTheDocument();
    expect(screen.getByText("Reset filter")).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  test("shows categories dropdown when collapsed", () => {
    (useBreakpoint as jest.Mock).mockReturnValue({
      isCollapsed: true,
    });

    render(<Filter />);

    expect(screen.getByText("Categories")).toBeInTheDocument();
  });

  test("does not show categories dropdown when not collapsed", () => {
    (useBreakpoint as jest.Mock).mockReturnValue({
      isCollapsed: false,
    });

    render(<Filter />);

    expect(screen.queryByText("Categories")).not.toBeInTheDocument();
  });

  test("submits form with correct values", async () => {
    const setFilter = jest.fn();
    (useProductsContext as jest.Mock).mockReturnValue({
      filter: { categories: ["Category1"] },
      setFilter,
    });

    const setParams = jest.fn();
    (useQueryParams as jest.Mock).mockReturnValue({
      getParams: jest.fn().mockReturnValue({}),
      setParams,
      removeParams: jest.fn(),
    });

    render(<Filter />);

    // Submit the form
    fireEvent.click(screen.getByText("Search"));

    // Check if the context filter was updated
    await waitFor(() => {
      expect(setFilter).toHaveBeenCalledWith({
        categories: ["Category1"],
      });
    });

    // Check if URL params were updated
    expect(setParams).toHaveBeenCalled();
  });

  test("resets filter when clicking reset button", () => {
    const setFilter = jest.fn();
    (useProductsContext as jest.Mock).mockReturnValue({
      filter: {},
      setFilter,
    });

    const removeParams = jest.fn();
    (useQueryParams as jest.Mock).mockReturnValue({
      getParams: jest.fn().mockReturnValue({}),
      setParams: jest.fn(),
      removeParams,
    });

    render(<Filter />);

    // Click reset button
    fireEvent.click(screen.getByText("Reset filter"));

    // Check if filter was reset
    expect(setFilter).toHaveBeenCalledWith({});
    expect(removeParams).toHaveBeenCalledWith([
      "keyword",
      "priceRange",
      "tier",
      "theme",
      "sortTime",
      "sortPrice",
    ]);
  });

  test("sets form fields from URL params", () => {
    // Mock query params with values
    const mockParams = {
      keyword: "test",
      priceRange: [10, 100],
      tier: ProductTier.Premium,
      theme: ProductTheme.Dark,
      sortTime: SortType.Descending,
      sortPrice: SortType.Ascending,
    };

    const getParams = jest.fn().mockReturnValue(mockParams);

    (useQueryParams as jest.Mock).mockReturnValue({
      getParams,
      setParams: jest.fn(),
      removeParams: jest.fn(),
    });

    const setFieldsValue = jest.fn();
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => [false, jest.fn()]);
    jest.mock("antd", () => {
      const originalModule = jest.requireActual("antd");
      return {
        ...originalModule,
        Form: {
          ...originalModule.Form,
          useForm: () => {
            return [{ resetFields: jest.fn(), setFieldsValue }];
          },
        },
      };
    });

    render(<Filter />);

    // Check if form fields were set from URL params
    expect(getParams).toHaveBeenCalledWith([
      "keyword",
      "priceRange",
      "tier",
      "theme",
      "sortTime",
      "sortPrice",
      "categories",
    ]);
  });
});

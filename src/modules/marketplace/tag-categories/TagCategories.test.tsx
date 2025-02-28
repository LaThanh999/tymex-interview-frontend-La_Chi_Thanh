import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TagCategories } from "./index"; // Adjust the import path if necessary
import { ProductsContext } from "../../../contexts/productsContext";
import { useQueryParams } from "@/hooks/useQueryParams";

jest.mock("lodash.debounce", () => jest.fn((fn) => fn));

jest.mock("@/hooks/useQueryParams");

const mockSetParams = jest.fn();
const mockRemoveParams = jest.fn();

(useQueryParams as jest.Mock).mockReturnValue({
  setParams: mockSetParams,
  removeParams: mockRemoveParams,
});

const mockSetFilter = jest.fn();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithContext = (filter: any) => {
  return render(
    <ProductsContext.Provider value={{ filter, setFilter: mockSetFilter }}>
      <TagCategories />
    </ProductsContext.Provider>
  );
};

describe("TagCategories", () => {
  it("renders correctly", () => {
    const filter = { categories: [] };
    renderWithContext(filter);

    expect(screen.getByText(/All/i)).toBeInTheDocument();
  });

  it("handles category change correctly", () => {
    const filter = { categories: [] };
    renderWithContext(filter);

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "Shoes" },
    });

    expect(mockSetFilter).toHaveBeenCalledWith({
      ...filter,
      categories: ["Shoes"],
    });
    expect(mockSetParams).toHaveBeenCalledWith({ categories: ["Shoes"] });
  });

  it("handles empty category change correctly", () => {
    const filter = { categories: ["Shoes"] };
    renderWithContext(filter);

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "" } });

    expect(mockSetFilter).toHaveBeenCalledWith({ ...filter, categories: [] });
    expect(mockRemoveParams).toHaveBeenCalledWith(["categories"]);
  });
});
